import { DeviceConfig, DeviceControl, MediaConfig, RegisterParams, SoftHandler, SoftHandlerEvent, SoftHandlerInitOpts, VideoContainerOpts } from "../soft-handler";
import { DEF_INIT_OPTS } from "./constants";
import JanusHandler from './janus-handler';
import DeviceControlImpl from './device-control-impl';
import { checkMediaDevices, makeSipUri } from "./utils";

// 当前js库版本号
const VERSION = "__VERSION__";

/**
 * 基于WebRTC的软手柄操作对象
 */
export default class WebRtcSoftHandler implements SoftHandler {

    /** 当前js库版本号 */
    get version() {
        return VERSION;
    }

    get registed(): boolean {
        return !!this.#handler?.username;
    }

    get username(): string | null | undefined {
        return this.#handler.username;
    }

    get talking(): boolean {
        return this.#handler.talking;
    }

    get callId(): string | null | undefined {
        return this.#handler.callId;
    }

    #opts: SoftHandlerInitOpts;
    #handler: JanusHandler;
    #deviceControl: DeviceControl;

    constructor(opts: SoftHandlerInitOpts) {
        if (!opts) {
            throw new Error("WebRtcSoftHandler 的参数 opts 不能为空");
        }
        this.#opts = Object.assign(Object.assign({}, DEF_INIT_OPTS), opts);
        checkMediaDevices();
        this.#handler = new JanusHandler(this.#opts);
        this.#deviceControl = new DeviceControlImpl(this.#handler);
    }

    initialize(): Promise<void> {
        return this.#handler.initialize();
    }

    register(username: string): Promise<void>;
    register(opts: RegisterParams): Promise<void>;
    register(opts: any): Promise<void> {
        if (typeof opts === "string") {
            opts = { username: opts };
        }
        return this.#handler.register(opts.username, opts.displayName);
    }

    unregister(): Promise<void> {
        return this.#handler.unregister();
    }

    destroy(): Promise<void> {
        return this.#handler.destroy();
    }

    call(called: string, media?: MediaConfig): Promise<void> {
        let sipUri = makeSipUri(called, this.#opts.registerInfo?.sipServerIp, this.#opts.registerInfo?.sipServerPort);
        return this.#handler.call(sipUri, media);
    }

    newcall(called: string, media?: MediaConfig): Promise<void> {
        let sipUri = makeSipUri(called, this.#opts.registerInfo?.sipServerIp, this.#opts.registerInfo?.sipServerPort);
        return this.#handler.newcall(sipUri, media);
    }

    answer(media?: MediaConfig): Promise<void> {
        return this.#handler.answer(media);
    }

    hangup(): Promise<void> {
        return this.#handler.hangup();
    }

    on(event: SoftHandlerEvent, callback: Function, key?: string): void {
        this.#handler.listener.addListener(event, callback, key);
    }

    off(event: SoftHandlerEvent, callback: Function): void {
        this.#handler.listener.removeListener(event, callback);
    }

    setVideoContainer(opts: VideoContainerOpts): void {
        this.#handler.setVideoContainer(opts);
    }

    listDevices(): Promise<MediaDeviceInfo[]> {
        return this.#handler.listDevices();
    }

    setDevice(deviceConfig: DeviceConfig): void {
        console.warn("此接口已过时，请使用 softHandler.deviceControl.xxx 进行设备控制");
        this.#handler.setDevice(deviceConfig);
    }

    get audioOutputMuted(): boolean {
        return this.#handler.isAudioOutputMuted();
    }
    set audioOutputMuted(value: boolean) {
        this.#handler.setAudioOutputMuted(value);
    }

    get audioInputMuted(): boolean {
        return this.#handler.isAudioInputMuted();
    }
    set audioInputMuted(value: boolean) {
        this.#handler.setAudioInputMuted(value);
    }

    get deviceControl(): DeviceControl {
        return this.#deviceControl;
    }

}
