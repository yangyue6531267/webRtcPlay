import { SoftHandlerInitOpts, MediaConfig } from "../soft-handler";


/**
 * 错误码定义
 */
export const CONST_CODE = {
    /** 软手柄服务端返回错误码对应的文本消息 */
    SHANDLE_FAILED_CODE: {
        1001 : "账号或密码错误",
        1002 : "该帐号已连接",
        1004 : "没有鉴权",
        9001 : "SIP号码已注册,抢注册失败",
        // 下面是 SIP 协议错误码，对应呼叫失败的返回
        404 : "没有找到对应的设备",
        408 : "呼叫超时",
        486 : "对方正忙",
        487 : "对方挂断",
        488 : "对方拒绝",
    } as {[key: number]: string},
};

/**
 * 默认的初始化参数
 */
export const DEF_INIT_OPTS: SoftHandlerInitOpts = Object.freeze({
    configs: {
        janusUrl: "",
        autoRegister: true,
        ringFile: "",
    },
    registerInfo: {
        username: "",
        displayName: "",
        sipServerIp: "127.0.0.1",
        sipServerPort: 5060,
    },
});

/**
 * 默认的媒体选项
 */
export const DEF_MEDIA_OPTS: MediaConfig = Object.freeze({
    audioSend: true,
    audioRecv: true,
    videoSend: false,
    videoRecv: false
});

/**
 * Janus SIP 事件类型
 */
export const SipEvent = {
    /** 呼入通知 */
    INCOMING_CALL : "incomingcall",
    /** 振铃通知 */
    RINGING : "ringing",
    /** 应答通知 */
    ACCEPTED : "accepted",
    /** 挂机通知（对端挂断） */
    HANGUP : "hangup",
    /** 主动挂机通知（本机挂机后服务器确认） */
    HANGINGUP : "hangingup",
    /** 注册失败通知 */
    REGISTRATION_FAILED : "registration_failed",
    /** 注册成功通知 */
    REGISTERED : "registered",
    /** 注消结果通知 */
    UNREGISTERING : "unregistering",
    /** 呼叫操作结果通知 */
    CALLING : "calling",
    /** 应答操作结果通知（通话建立）（对端应答、本机应答） */
    ACCEPT_REPLY : "accept_reply",
    /** 返呼确认通知 */
    NEW_ACCEPTED : "new_accepted",
    /** 更新媒体流 */
    UPDATING : "updating",
}

