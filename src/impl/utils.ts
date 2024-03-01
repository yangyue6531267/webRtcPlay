import Janus from "../../libs/janus";
import { MediaConfig } from '../soft-handler';

/**
 * 判断当前页面是否是https
 */
export function isHttps() {
    return location.protocol === "https:";
}

/**
 * 公共方法
 * 是否有声卡设备
 * 异步方法  结果保存在window.hasAudioInputDevices中 true or false
 */
export function checkMediaDevices() {
    let w: any = window;
    if (w.checkAudioDevicesStatus != undefined && w.hasAudioInputDevices != undefined) {
        //已检测
        return;
    }
    //参数初始化，防止为空报错
    w.checkAudioDevicesStatus = false;
    w.hasAudioInputDevices = false;
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        console.error("Not support enumerateDevices(), plase use https to access.");
        return;
    }
    var startTime = new Date().getTime();
    // 列出相机和麦克风.
    navigator.mediaDevices.enumerateDevices()
        .then(function(devices) {
            devices.forEach(function(device) {
                if (device.kind == "audioinput") {
                    //判断到1个就返回true
                    w.hasAudioInputDevices = true;
                }
            });
            w.checkAudioDevicesStatus = true;
            console.log("检查音频输入设备总计耗时: " + (new Date().getTime() - startTime) + "ms");
        })
        .catch(function(err) {
            console.error(err.name + ": " + err.message);
        });
}

/**
 * 拼接SIP地址
 * @param user 用户名
 * @param server 服务器地址
 * @param port 服务器端口
 * @returns SIP地址
 */
export function makeSipUri(user: string, server?: string, port?: number) {
    server = server || "127.0.0.1";
    port = port || 5060;
    return `sip:${user}@${server}:${port}`;
}

/**
 * 从SIP地址中解析出用户名
 * @param sipUri SIP地址
 */
export function getUserFromSipUri(sipUri: string): string {
    return sipUri.split('@')[0];
}

/**
 * 根据简单配置项填充完整配置项
 * @param media 通话媒体流配置
 */
export function fillMediaConfig(media: MediaConfig): MediaConfig {
    if (media.audio !== undefined) {
        media.audioSend = media.audioRecv = media.audio;
    }
    if (media.video !== undefined) {
        media.videoSend = media.videoRecv = media.video;
    }
    return media;
}


/**
 * 列出设备列表
 */
export async function listDevices(): Promise<MediaDeviceInfo[]> {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        throw new Error("Not support enumerateDevices(), plase use https to access.");
    }
    let devices = await navigator.mediaDevices.enumerateDevices();
    console.log('listDevices enumerateDevices find : ', devices?.length);
    if (devices.length > 0 && devices[0].deviceId) {
        return devices;
    }
    // 无法正常获取设备列表，需先申请设备权限
    try {
        // 先尝试申请音频和视频设备
        await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    } catch(err) {
        // 如果没有视频设备则再尝试仅申请音频设备
        try {
            await navigator.mediaDevices.getUserMedia({ audio: true });
        } catch(err) {
            return devices;
        }
    }
    return navigator.mediaDevices.enumerateDevices();
}

