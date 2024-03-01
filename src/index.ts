
export * from "./soft-handler";

import { SoftHandler, SoftHandlerInitOpts } from "./soft-handler";
import WebRtcSoftHandler from "./impl/soft-handler-impl";
import { listDevices } from "./impl/utils";
import DeviceControlImpl from "./impl/device-control-impl";

/**
 * 创建一个新的软手柄操作对象
 * @param opts 初始化参数
 * @returns 软手柄操作对象
 */
export async function createSoftHandler(opts: SoftHandlerInitOpts): Promise<SoftHandler> {
    let handler = new WebRtcSoftHandler(opts);
    await handler.initialize();
    return handler;
}

/**
 * 返回当前机器的音视频设备列表
 * @returns 找到的设备列表
 * @throws 当不支持设备相关API时，或者调用失败时
 */
export async function listMediaDevices(): Promise<MediaDeviceInfo[]> {
    return listDevices();
}
