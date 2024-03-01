import { DeviceControl } from "../soft-handler";
import JanusHandler from "./janus-handler";
import { listDevices } from "./utils";

// 所有的音频输入设备
let voiceDevices: MediaDeviceInfo[];
// 所有的视频输入设备
let videoDevices: MediaDeviceInfo[];

function prepareDevices() {
    if (typeof voiceDevices != "undefined") {
        return Promise.resolve();
    }
    // 遍历设备，统计各类设备数量
    return listDevices().then(devices => {
        voiceDevices = [];
        videoDevices = [];
        devices.forEach(d => {
            if (d.kind == "audioinput") {
                voiceDevices.push(d);
            } else if (d.kind == "videoinput") {
                videoDevices.push(d);
            }
        });
        console.log("a, v: ", voiceDevices.length, videoDevices.length);
    }).catch(err => {
        console.error(err.name + ": " + err.message);
    });
}

/**
 * 设备控制管理
 */
export default class DeviceControlImpl implements DeviceControl {

    #handle: JanusHandler;

    #curVoiceIdx: number = 0;

    // 听筒的设备索引
    public voiceHeadphoneIndex: number = 1;
    // 外放的设备索引
    public voiceSpeakerIndex: number = 2;

    constructor(handle: JanusHandler) {
        this.#handle = handle;
        // 扫描当前可用的设备
        prepareDevices().then(() => {
            // 根据音频输入设备的数量设置外放形式的默认索引号（猜测）
            if (voiceDevices.length < 2) {
                this.voiceHeadphoneIndex = -1;
                this.voiceSpeakerIndex = -1;
            } else if (voiceDevices.length < 3) {
                this.voiceHeadphoneIndex = 0;
                this.voiceSpeakerIndex = 1;
            } else {
                this.voiceHeadphoneIndex = 1;
                this.voiceSpeakerIndex = 2;
            }
            // 默认使用前置摄像头
            if (this.hasMultiVideoDevice) {
                this.updateFrontCamera(true);
            }
        });
    }

    get hasMultiVoiceDevice(): boolean {
        return voiceDevices?.length > 1;
    }

    get hasMultiVideoDevice(): boolean {
        return videoDevices?.length > 1;
    }

    get currentVoiceIndex(): number {
        return this.#curVoiceIdx;
    }

    get currentVoiceDevId(): string {
        if (this.#curVoiceIdx < 0 || this.#curVoiceIdx >= voiceDevices.length) {
            return "";
        }
        let dev = voiceDevices[this.#curVoiceIdx];
        return dev.deviceId;
    }

    get currentFrontCamera(): boolean {
        return !!this.#handle.deviceConfig?.frontCamera;
    }

    async toggleVoiceDevice(): Promise<[number, string, string]> {
        if (!this.hasMultiVoiceDevice) {
            throw new Error("未找到多个麦克风无法进行切换");
        }
        if (this.voiceHeadphoneIndex < 0 || this.voiceHeadphoneIndex >= voiceDevices.length || isNaN(this.voiceHeadphoneIndex)) {
            throw new Error("错误的 voiceHeadphoneIndex");
        }
        if (this.voiceSpeakerIndex < 0 || this.voiceSpeakerIndex >= voiceDevices.length || isNaN(this.voiceSpeakerIndex)) {
            throw new Error("错误的 voiceSpeakerIndex");
        }
        // 在外放和听筒之间切换
        if (this.#curVoiceIdx != this.voiceSpeakerIndex) {
            this.#curVoiceIdx = this.voiceSpeakerIndex;
        } else {
            this.#curVoiceIdx = this.voiceHeadphoneIndex;
        }
        // 音频设备信息
        let dev = voiceDevices[this.#curVoiceIdx];
        // 更新设备配置值
        if (!this.#handle.deviceConfig) {
            this.#handle.deviceConfig = { audioDeviceId: dev.deviceId };
        } else {
            this.#handle.deviceConfig.audioDeviceId = dev.deviceId;
        }
        // 需要重新创建媒体流
        if (this.#handle.talking) {
            await this.#handle.updateMediaStream();
        }
        return [this.#curVoiceIdx, dev.deviceId, dev.label];
    }

    async updateVoiceSpeaker(value: boolean): Promise<void> {
        if (!this.hasMultiVoiceDevice) {
            throw new Error("未找到多个音频设备无法进行切换");
        }
        if (this.voiceHeadphoneIndex < 0 || this.voiceHeadphoneIndex >= voiceDevices.length || isNaN(this.voiceHeadphoneIndex)) {
            throw new Error("错误的 voiceHeadphoneIndex");
        }
        if (this.voiceSpeakerIndex < 0 || this.voiceSpeakerIndex >= voiceDevices.length || isNaN(this.voiceSpeakerIndex)) {
            throw new Error("错误的 voiceSpeakerIndex");
        }
        // 在外放和听筒之间切换
        if (value) {
            this.#curVoiceIdx = this.voiceSpeakerIndex;
        } else {
            this.#curVoiceIdx = this.voiceHeadphoneIndex;
        }
        // 音频设备信息
        let dev = voiceDevices[this.#curVoiceIdx];
        // 更新设备配置值
        if (!this.#handle.deviceConfig) {
            this.#handle.deviceConfig = { audioDeviceId: dev.deviceId };
        } else {
            this.#handle.deviceConfig.audioDeviceId = dev.deviceId;
        }
        console.log("updateVoiceSpeaker:", this.#handle.deviceConfig);
        // 如果在通话过程中，需要重新创建媒体流
        if (this.#handle.talking) {
            await this.#handle.updateMediaStream();
        }
    }

    async updateFrontCamera(value: boolean): Promise<void> {
        if (!this.hasMultiVideoDevice) {
            throw new Error("未找到多个摄像头无法进行切换");
        }
        // 先设置配置值
        if (!this.#handle.deviceConfig) {
            this.#handle.deviceConfig = { frontCamera: value };
        } else {
            this.#handle.deviceConfig.frontCamera = value;
        }
        console.log("updateFrontCamera:", this.#handle.deviceConfig);
        // 如果在通话过程中，需要重新创建媒体流
        if (this.#handle.talking) {
            await this.#handle.updateMediaStream();
        }
    }

    async enableCamera(value: boolean): Promise<void> {
        this.#handle.enableCamera(value);
    }

};

