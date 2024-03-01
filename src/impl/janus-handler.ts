
import adapter from 'webrtc-adapter';
import Janus, { JanusJS } from '../../libs/janus';
import { CONST_CODE, DEF_MEDIA_OPTS } from './constants';
import { MediaConfig, SoftHandlerInitOpts, SoftHandlerEvent, DeviceConfig, VideoContainerOpts } from '../soft-handler';
import { fillMediaConfig, isHttps, makeSipUri } from './utils';
import EventDispatcher from './event-dispatcher';
import MsgProcess from './msg-process';
import AsyncOps from './async-ops';

/**
 * 基于 janus 实现的软手柄
 */
export default class JanusHandler {

    // janus 对象
    #janus: Janus | null = null;

    // sip 插件操作句柄
    #sipcall: JanusJS.PluginHandle | undefined;

    // 注册账号标识
    username: string | null | undefined;

    // 正在进行通话的 call_id
    callId: string | null | undefined;

    // 当前是否正在通话过程中
    get talking(): boolean {
        return !!this.callId;
    }

    // 当前通话的对端号码
    remoteSipUri: string | null | undefined;

    // 当前通话的媒体配置
    currentMedia: MediaConfig | null | undefined;

    // 所使用的音视频设备
    deviceConfig: DeviceConfig | undefined;

    // 本地媒体流
    stream: MediaStream | null = null;

    // 用于播放通话音频的元素
    audioElm: HTMLAudioElement | undefined;
    // 用于播放通话视频的元素
    videoElm: HTMLVideoElement | undefined;
    // 用于播放本地视频的元素
    videoLocalElm: HTMLVideoElement | undefined;

    // 暂存的呼入信息对象
    remoteJsep: JanusJS.JSEP | null | undefined;

    // 暂存的媒体配置
    backMedia: MediaConfig | undefined;

    /** 当前是否在通话中（呼入到达或者发起呼叫开始，到挂断为止） */
    calling = false; 

    // 事件派发器
    listener = new EventDispatcher();

    // 消息处理器
    #msgProcess = new MsgProcess(this);

    // 异步操作管理
    asyncOps = new AsyncOps();

    constructor(
        /** 初始化参数 */
        public opts: SoftHandlerInitOpts
    ) {
        // 创建音频元素用于播放通话音频
        this.audioElm = document.createElement("audio");
        this.audioElm.autoplay = true;
        this.audioElm.controls = true;
        this.audioElm.style.display = "none";
        document.body.appendChild(this.audioElm);
        // 创建视频元素用于播放对方视频
        this.videoElm = document.createElement("video");
        this.videoElm.autoplay = true;
        this.videoElm.setAttribute("playsinline", "");
        this.videoElm.setAttribute('webkit-playsinline', "");
        this.videoElm.setAttribute('x5-video-player-type', 'h5-page');
        this.videoElm.controls = false;
        // this.videoElm.style.display = 'none';
        this.opts.configs.remoteVideo?.appendChild(this.videoElm);
        // 创建视频元素用于播放本地视频
        this.videoLocalElm = document.createElement("video");
        this.videoLocalElm.autoplay = true;
        this.videoElm.setAttribute("playsinline", "");
        this.videoElm.setAttribute('webkit-playsinline', "");
        this.videoElm.setAttribute('x5-video-player-type', 'h5-page');
        this.videoLocalElm.controls = false;
        this.videoLocalElm.muted = true; // 避免声音回环
        // this.videoLocalElm.style.display = 'none';
        this.opts.configs.localVideo?.appendChild(this.videoLocalElm);
    }

    /**
     * 初始化
     */
    async initialize(): Promise<void> {
        await this.#initJanus();
        await this.#initHandler();
    }

    /** 初始化并创建 janus 操作对象 */
    #initJanus(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            // 初始化 janus 环境
            Janus.init({
                debug: this.opts?.configs.debugJanus || false,
                dependencies: Janus.useDefaultDependencies({adapter}),
                callback: () => {
                if (!Janus.isWebrtcSupported()) {
                    reject(new Error("不支持 WebRTC"));
                    return;
                }
                // janus 服务地址
                let janusUrl = this.opts.configs.janusUrl;
                // 创建 janus 操作对象
                this.#janus = new Janus({
                    server: isHttps() ? janusUrl.replace('ws:', 'wss:') : janusUrl,
                    success: () => {
                        console.log("Janus服务连接成功！");
                        resolve();
                    },
                    error: (error) => {
                        console.error("Janus服务连接失败或中断！", error);
                        reject(new Error("Janus服务连接失败或中断！"));
                    },
                    destroyed: () => {
                        console.log("Janus服务连接销毁！");
                    }
                });
                //
                console.log("Janus 初始化成功");
            }});
        });
    }

    /**
     * 初始化软手柄
     */
    #initHandler(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            let self = this;
            //
            this.#janus?.attach({
                plugin: "janus.plugin.sipserver",
                opaqueId: "sip-" + Janus.randomString(12),

                success: function(pluginHandle) {
                    console.log("Janus插件初始化成功");
                    self.#sipcall = pluginHandle;
                    resolve();
                    // 开启自动注册，则发起注册，并派发自动注册消息
                    if (self.opts.configs.autoRegister) {
                        self.register(self.opts.registerInfo?.username || '');
                        self.listener.dispatch(SoftHandlerEvent.AUTO_REG, {});
                    }
                    // pluginCallbacks.succCallback && pluginCallbacks.succCallback();
                },

                error: function(error) {
                    console.error(`Janus插件初始化失败：${error}`);
                    reject(typeof(error) === "string" ? new Error(error) : error);
                    // pluginCallbacks.errorCallback && pluginCallbacks.errorCallback(error);
                },

                consentDialog: function(on) {
                    console.log("Consent dialog should be " + (on ? "on" : "off") + " now");
                },

                // ICE(交互式网络连接) 连接状态变化，来自 RTCPeerConnection
                iceState: function(state) {
                    console.log("ICE state changed to " + state);
                },
                // 来自信令
                mediaState: function(medium, on) {
                    console.log("Janus " + (on ? "started" : "stopped") + " receiving our " + medium);
                },
                // 来自信令
                webrtcState: function(on, reason) {
                    console.log("Janus says our WebRTC PeerConnection is " + (on ? "up" : "down") + " now: " + reason);
                },

                onmessage: (msg, jsep) => self.#msgProcess.onMessage(msg as JanusJS.SipMessage, jsep),

                // 处理远端媒体流，来自 RTCPeerConnection.ontrack
                onremotestream: function(stream: MediaStream) {
                    console.log('on remote stream', stream);
                    console.log( stream.getTracks() );
                    // 获取并启用音频流
                    let audioTracks = stream.getAudioTracks();
                    if (audioTracks.length > 0) {
                        audioTracks[0].enabled = true;
                        console.log("remote audio tracks:", audioTracks);
                    }
                    // 获取视频流
                    let videoTracks = stream.getVideoTracks();
                    // 绑定视频流、音频流到视频元素
                    if (self.videoElm) {
                        if (self.videoElm.srcObject) {
                            self.videoElm.srcObject = null;
                        }
                        if (videoTracks.length > 0) {
                            videoTracks[0].enabled = true;
                            console.log("remote video tracks:", videoTracks);
                            //
                            Janus.attachMediaStream(self.videoElm, stream);
                            console.log("bind remote video");
                        }
                    }
                    // 在无视频时，才绑定音频流到音频元素
                    if (self.audioElm && videoTracks.length < 1) {
                        if (self.audioElm.srcObject) {
                            self.audioElm.srcObject = null;
                        }
                        Janus.attachMediaStream(self.audioElm, stream);
                        console.log("bind remote audio");
                    }
                },

                // 处理本地媒体流，来自查找到的本地媒体设备
                onlocalstream: function(stream: MediaStream) {
                    console.log('on local stream', stream);
                    console.log( stream.getTracks() );
                    self.stream = stream;
                    let audioTracks = stream.getAudioTracks();
                    if (audioTracks.length > 0) {
                        audioTracks[0].enabled = true;
                    }
                    if (self.videoLocalElm) {
                        let videoTracks = stream.getVideoTracks();
                        if (videoTracks.length > 0) {
                            videoTracks[0].enabled = isEnabled(self.deviceConfig?.enableCamera, true);
                            Janus.attachMediaStream(self.videoLocalElm, stream);
                            console.log("bind local video");
                        }
                    }
                },

                //清理
                oncleanup: function() {
                    console.log('oncleanup');
                    self.stream = null;
                    if (self.audioElm) {
                        self.audioElm.srcObject = null;
                    }
                    if (self.videoElm) {
                        self.videoElm.srcObject = null;
                    }
                    if (self.videoLocalElm) {
                        self.videoLocalElm.srcObject = null;
                    }
                }
            });
        });
    }

    /** 填充对端 JSEP 信息 */
    handleRemoteJsep(params: { jsep: JanusJS.JSEP }): void {
        this.#sipcall?.handleRemoteJsep(params);
    }

    /**
     * 销毁：Janus销毁、资源释放
     */
    destroy(): Promise<void> {
        let self = this;
        return new Promise<void>(resolve => {
            // 删除创建出的元素
            if (self.audioElm) {
                self.audioElm.srcObject = null;
                document.body.removeChild(self.audioElm);
                delete self.audioElm;
            }
            if (self.videoElm) {
                self.videoElm.srcObject = null;
                self.opts.configs.remoteVideo?.removeChild(self.videoElm);
                delete self.videoElm;
            }
            if (self.videoLocalElm) {
                self.videoLocalElm.srcObject = null;
                self.opts.configs.localVideo?.removeChild(self.videoLocalElm);
                delete self.videoLocalElm;
            }
            // 销毁 janus 对象
            this.#janus?.destroy({
                success: () => {
                    self.#janus = null;
                    resolve();
                    self.listener.dispose();
                },
                // asyncRequest: true,
                notifyDestroyed: true,
            });
        });
    }

    // 异步方式发送插件消息
    private send(msg: JanusJS.PluginMessage): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (!this.#sipcall) {
                reject(new Error("not initialized for sip-server."));
                return;
            }
            this.#sipcall.send(Object.assign(msg, {
                success: resolve,
                error: reject
            }));
        });
    }

    /**
     * 注册软手柄
     * @param username 注册号码
     * @param displayName 显示名称
     */
     async register(username: string, displayName?: string) {
        let sipUri = makeSipUri(username, this.opts.registerInfo?.sipServerIp, this.opts.registerInfo?.sipServerPort);
        displayName = displayName || username;
        //
        let opPromise = this.asyncOps.makeOpPromise("register");
        //
        let body = { 
            request: "register",
            proxy: sipUri,
            display_name: displayName,
            username: username,
        };
        try {
        await this.send({ message: body });
        console.log("软手柄注册, sipUri = " + sipUri + ", 显示名称 = " + displayName + ", 注册号码 = " + username);
            //
            return opPromise;
        } catch(err) {
            this.asyncOps.opRejected("register", err);
        }
    }

    /**
     * 注销软手柄
     */
    async unregister() {
        //
        let opPromise = this.asyncOps.makeOpPromise("unregister");
        //
        let body = { 
            request: "unregister"
        };
        try {
        await this.send({ message: body });
        console.log("软手柄注销, 注册号码 = " + this.username);
            //
            return opPromise;
        } catch(err) {
            this.asyncOps.opRejected("unregister", err);
        }
    }

    /**
     * 发起呼叫
     * @param sipUri SIP地址
     * @param media 媒体选项
     */
    call(sipUri: string, media?: MediaConfig) {
        let opPromise = this.asyncOps.makeOpPromise("call");
        //
        media = media || {};
        fillMediaConfig(media);
        let _media = Object.assign(Object.assign({}, DEF_MEDIA_OPTS), media);
        console.log(_media);
        let isVideoCall = media?.video || media?.videoSend;
        console.log("createOffer", _media, this.deviceConfig);
        // return new Promise<void>((resolve, reject) => {
        this.#sipcall?.createOffer({
            media: makeMediaData(_media, this.deviceConfig),
            success: async (jsep: JanusJS.JSEP) => {
                let body = {
                    request: "call",
                    uri: sipUri,
                    video: isVideoCall ? "1" : "0",
                };
                try {
                    await this.send({ message: body, jsep: jsep });
                    console.log("软手柄呼叫，sipUri = " + sipUri, jsep);
                    console.log("local sdp = ", jsep.sdp);
                    this.remoteSipUri = sipUri;
                    // 记录当前通话所使用的媒体参数
                    this.currentMedia = Object.assign({}, media);
                    // resolve();
                } catch (error) {
                    // reject(error);
                    this.asyncOps.opRejected("call", error);
                }
            },
            error: (error: unknown) => {
                console.error(error);
                console.error(fmtError(error));
                // reject(error);
                this.asyncOps.opRejected("call", error);
            }
        });
        // });
        return opPromise;
    }

    /**
     * 以返呼方式发起呼叫
     * （移动端网页上发起呼叫无法正常通话，但接听可正常通话。故，将呼叫操作转换为接听形式）
     * 
     * @param sipUri SIP地址
     * @param media 媒体选项
     */
    async newcall(sipUri: string, media?: MediaConfig) {
        //
        let opPromise = this.asyncOps.makeOpPromise("new_call");
        //
        this.backMedia = media;
        let isVideoCall = media?.video || media?.videoSend;
        let body = {
            request: "new_call",
            uri: sipUri,
            video: isVideoCall ? "1" : "0",
        };
        try {
        await this.send({ message: body });
        console.log("软手柄返呼，sipUri = " + sipUri);
        this.remoteSipUri = sipUri;
        // 记录当前通话所使用的媒体参数
        this.currentMedia = Object.assign({}, media);
            //
            return opPromise;
        } catch(err) {
            this.asyncOps.opRejected("new_call", err);
        }
    }

    /**
     * 返呼确认
     */
    newAccepted(remoteJsep?: JanusJS.JSEP) {
        let media = this.backMedia || {};
        fillMediaConfig(media);
        let _media = Object.assign(Object.assign({}, DEF_MEDIA_OPTS), media);
        if (remoteJsep) {
            // 移动端需替换成该值
            // remoteJsep.sdp = remoteJsep.sdp.replace(/profile-level-id=(\w+);/, "profile-level-id=42e01f;")
            remoteJsep.sdp = remoteJsep.sdp.replace(/profile-level-id=(\w+);/, "profile-level-id=42e00d;")
        }
        console.log("createAnswer", _media, this.deviceConfig);
        this.#sipcall?.createAnswer({
            jsep: remoteJsep,
            media: makeMediaData(_media, this.deviceConfig),
            success: (jsep: JanusJS.JSEP) => {
                let body = {
                    request: "new_accept",
                };
                this.#sipcall?.send({ message: body, jsep: jsep });
                console.log("返呼确认，local sdp = ", jsep.sdp);
            },
            error: (error: unknown) => {
                console.error(error);
                console.error(fmtError(error));
            }
        });
    }

    /**
     * 应答呼入
     * @param media 媒体选项
     */
    answer(media?: MediaConfig) {
        //
        let opPromise = this.asyncOps.makeOpPromise("accept");
        //
        //console.log(this.callId, this.calling)
        // 检查是否有呼入信息
        if (!this.remoteJsep) {
            throw new Error("not found call-info, nothing to answer");
        }
        //
        media = media || {};
        fillMediaConfig(media);
        let _media = Object.assign(Object.assign({}, DEF_MEDIA_OPTS), media);
        let remoteJsep = this.remoteJsep;
        this.remoteJsep = undefined;
        if (remoteJsep) {
            // TODO : 移动端需替换成该值
            // 将视频流中下面这一行 profile-level-id 的值替换成 "42e01f"，移动端浏览器才能正常处理
            // a=fmtp:106 profile-level-id=640028;max-mbps=1048576;max-fs=8160;max-fps=3000;
            // remoteJsep.sdp = remoteJsep.sdp.replace("428028", "42e01f");
            // remoteJsep.sdp = remoteJsep.sdp.replace("640028", "42e01f");
            // remoteJsep.sdp = remoteJsep.sdp.replace(/profile-level-id=(\w+);/, "profile-level-id=42e01f;")
            remoteJsep.sdp = remoteJsep.sdp.replace(/profile-level-id=(\w+);/, "profile-level-id=42e01f;")
        }
        console.log("createAnswer", _media, this.deviceConfig);
        // return new Promise<void>((resolve, reject) => {
        this.#sipcall?.createAnswer({
            jsep: remoteJsep,
            media: makeMediaData(_media, this.deviceConfig),
            success: async (jsep: JanusJS.JSEP) => {
                let body = {
                    request: "accept",
                };
                try {
                    await this.send({ message: body, jsep: jsep });
                    console.log("软手柄应答");
                    console.log("local sdp = ", jsep.sdp);
                    // 记录当前通话所使用的媒体参数
                    this.currentMedia = Object.assign({}, media);
                    // resolve();
                } catch (error) {
                    // reject(error);
                    this.asyncOps.opRejected("accept", error);
                }
            },
            error: (error: unknown) => {
                console.error(error);
                console.error(fmtError(error));
                // reject(error);
                this.asyncOps.opRejected("accept", error);
            }
        });
        // });
        return opPromise;
    }

    /**
     * 在通话过程中更新媒体流
     */
    updateMediaStream() {
        if (!this.talking) {
            throw new Error("当前不在通话中");
        }
        // 生成“完成”promise对象，以便在服务端返回后再触发当前操作的完成
        let opPromise = this.asyncOps.makeOpPromise("update");
        // 获取当前通话所使用的媒体参数
        let _media = Object.assign({}, this.currentMedia);
        //
        console.log("createOffer", _media, this.deviceConfig);
        this.#sipcall?.createOffer({
            media: makeMediaData(_media, this.deviceConfig, true),
            success: async (jsep: JanusJS.JSEP) => {
                let body = {
                    request: "update",
                };
                try {
                    await this.send({ message: body, jsep: jsep });
                    console.log("更新媒体流，sipUri = " + this.remoteSipUri, jsep);
                    console.log("local sdp = ", jsep.sdp);
                    // resolve();
                } catch (error) {
                    // reject(error);
                    this.asyncOps.opRejected("update", error);
                }
            },
            error: (error: unknown) => {
                console.error(error);
                console.error(fmtError(error));
                // reject(error);
                this.asyncOps.opRejected("update", error);
            }
        });
        // });
        // 返回预先生成的promise对象，在切换完成后再触发本操作的“完成”
        return opPromise;
    }

    /**
     * 是否启用本地摄像头，true - 启用摄像头，false - 禁用摄像头（不向对方发送图像）
     */
    enableCamera(enabled: boolean) {
        // 如果在通话中，先判断是否是视频通话（只有视频通话才能切换摄像头的开关）
        if (this.talking && !isVideoCall(this.currentMedia)) {
            throw new Error("当前不是视频通话");
        }
        // 如果在通话建立前，则仅更新配置项中的值
        if (!this.deviceConfig) {
            this.deviceConfig = { enableCamera: enabled };
        } else {
            this.deviceConfig.enableCamera = enabled;
        }
        // 如果在通话中，则通过切换本地媒体流中的视频流是否启用的方式
        if (this.talking && this.stream) {
            let videoTracks = this.stream.getVideoTracks();
            if (videoTracks.length > 0) {
                videoTracks[0].enabled = enabled;
                console.log("enableCamera", enabled, videoTracks[0]);
            }
        }
    }

    /**
     * 软手柄挂起/取消挂起
     */
    hold(holdType: string) {
        let body = { 
            request: holdType
        };
        this.#sipcall?.send({ message: body });
        console.log("软手柄" + (holdType == 'hold' ? "挂起" : "取消挂起"));
    }

    /**
     * 软手柄挂断
     */
    async hangup() {
        //
        let opPromise = this.asyncOps.makeOpPromise("hangup");
        //
        let body = { 
            request: "hangup"
        };
        try {
        await this.send({ message: body });
        console.log("软手柄挂断");
            //
            return opPromise;
        } catch(err) {
            this.asyncOps.opRejected("hangup", err);
        }
    }

    // 清除当前通话缓存信息
    clearCurrentCall() {
        this.remoteJsep = null;
        this.remoteSipUri = null;
        this.currentMedia = null;
    }


    /**
     * 设置放置视频元素的容器元素
     */
    setVideoContainer(opts: VideoContainerOpts) {
        if (!opts) {
            throw new Error("opts can not be null");
        }
        // 如果设置了新容器，则将视频元素添加到新容器中；否则，从旧容器中移除视频元素
        if (opts.remoteVideo) {
            this.videoElm && opts.remoteVideo.appendChild(this.videoElm);
        } else {
            this.videoElm && this.opts.configs.remoteVideo?.removeChild(this.videoElm);
        }
        this.opts.configs.remoteVideo = opts.remoteVideo;
        //
        if (opts.localVideo) {
            this.videoLocalElm && opts.localVideo.appendChild(this.videoLocalElm);
        } else {
            this.videoLocalElm && this.opts.configs.localVideo?.removeChild(this.videoLocalElm);
        }
        this.opts.configs.localVideo = opts.localVideo;
    }

    /**
     * 列出设备列表
     */
    listDevices() {
        return new Promise<MediaDeviceInfo[]>(resolve => {
            Janus.listDevices((devices: MediaDeviceInfo[]) => resolve(devices));
        });
    }

    setDevice(deviceConfig: DeviceConfig) {
        this.deviceConfig = deviceConfig;
    }

    /**
     * 将播放设备设置为静音
     * @param mute 是否静音
     */
    setAudioOutputMuted(mute: boolean) {
        if (this.audioElm) {
            this.audioElm.muted = mute;
        }
        if (this.videoElm) {
            this.videoElm.muted = mute;
        }
    }

    /**
     * 当前播放设备是否静音
     */
    isAudioOutputMuted(): boolean {
        return !!(this.audioElm?.muted && this.videoElm?.muted);
    }

    /**
     * 将麦克风设备设置为静音或取消静音
     */
    setAudioInputMuted(mute: boolean) {
        this.stream?.getAudioTracks().forEach(track => track.enabled = !mute);
    }

    /**
     * 当前麦克风设备是否静音
     */
    isAudioInputMuted(): boolean {
        return !!(this.stream && this.stream.getAudioTracks().every(track => !track.enabled));
    }

}

/**
 * 提取错误对象中的信息
 */
function fmtError(err: any) {
    if (err instanceof Error) {
        return err.message;
    } else if (err.message) {
        return err.message;
    } else if (typeof err == 'string') {
        return err;
    }
    return JSON.stringify(err);
}

/**
 * 构造最终调用 janus 时传递的媒体参数
 */
function makeMediaData(media: MediaConfig, device?: DeviceConfig, replace?: boolean) {
    let deviceData: any = {};
    if (device) {
        // 在移动端音频输出设备的切换与音频输入设备切换同步
        if (device.audioDeviceId) {
            if (replace) {
                media.replaceAudio = true;
            }
            deviceData.audio = {
                deviceId: { exact: device.audioDeviceId },
            };
        }
        // 在电脑端通过设置设备ID来切换摄像头
        if (device.videoDeviceId) {
            if (replace) {
                media.replaceVideo = true;
            }
            deviceData.video = {
                deviceId: { exact: device.videoDeviceId },
            };
        }
        // 使用前置或后置摄像头
        if (typeof device.frontCamera != 'undefined') {
            if (replace) {
                media.replaceVideo = true;
            }
            // 在移动端，通过设置 facingMode 来切换摄像头；其它端，通过设置 deviceId 来切换摄像头。
            deviceData.video = {
                facingMode: device.frontCamera ? "user" : "environment"
            };
        }
    }
    return Object.assign(media, deviceData);
}

/**
 * 根据记录的媒体参数判断当前通话是否是视频通话
 */
function isVideoCall(media?: MediaConfig | null): boolean {
    return !!media && !!(media?.video || media?.videoRecv || media?.videoSend);
}

/**
 * 判断某个值是否启用
 */
function isEnabled(value: boolean | undefined, defValue: boolean): boolean {
    if (typeof value == "undefined") {
        return defValue;
    }
    return value;
}

