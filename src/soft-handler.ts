
/**
 * 软手柄初始化参数
 */
export interface SoftHandlerInitOpts {
    /** 软手柄基本配置 */
    configs: {
        /** janus 服务地址 */
        janusUrl: string;
        /** 是否自动注册，默认为 true，为 false 时需要手动调用 register */
        autoRegister?: boolean;
        /** 来电铃声URL（mp3文件） */
        ringFile?: string;
        /** 是否启用视频 */
        videoEnable?: boolean | "true";
        /** 放置本地视频的元素（div） */
        localVideo?: HTMLDivElement;
        /** 放置对端视频的元素（div） */
        remoteVideo?: HTMLDivElement;
        /** 是否开启 janus 的调试输出 */
        debugJanus?: boolean;
    },
    /** 软手柄注册参数 */
    registerInfo?: RegisterParams,
    /** 操作回调函数 */
    callbacks?: {
    }
}

/**
 * 界面上放置视频元素的容器
 */
export interface VideoContainerOpts {
    /** 放置本地视频的元素（div） */
    localVideo?: HTMLDivElement;
    /** 放置对端视频的元素（div） */
    remoteVideo?: HTMLDivElement;
}

/**
 * 软手柄注册参数
 */
export interface RegisterParams {
    /** 注册用户名 */
    username: string;
    /** 显示名称，默认同 username */
    displayName?: string;
    /** SIP服务的IP地址 */
    sipServerIp?: string;
    /** SIP服务的端口 */
    sipServerPort?: number;
}

/**
 * 音视频设备参数
 */
export interface DeviceConfig {
    /** 音频设备 */
    audioDeviceId?: string;
    /** 视频设备 */
    videoDeviceId?: string;
    /** 使用手机的前置还是后置摄像头，true - 使用前置摄像头，false - 使用后置摄像头 */
    frontCamera?: boolean;
    /** 是否开启本地摄像头，true - 开启摄像头，false - 禁用摄像头（不向对方发视频流） */
    enableCamera?: boolean;
}

/**
 * 通话媒体流配置
 */
export interface MediaConfig {
    /** 是否发送和接收音频，默认为 true；设置该值会覆盖 audioSend、audioRecv */
    audio?: boolean;
    /** 是否发送和接收视频，默认为 false；设置该值会覆盖 videoSend、videoRecv */
    video?: boolean;
    /** 是否发送音频，默认为 true */
    audioSend?: boolean;
    /** 是否接收音频，默认为 true */
    audioRecv?: boolean;
    /** 是否发送视频，默认为 false */
    videoSend?: boolean;
    /** 是否接收视频，默认为 false */
    videoRecv?: boolean;
    /** 是否切换音频（通话中），默认为 false */
    replaceAudio?: boolean;
    /** 是否切换摄像头（通话中），默认为 false */
    replaceVideo?: boolean;
}

/**
 * 软手柄事件
 */
export enum SoftHandlerEvent {
    /**
     * 自动发起注册，参数无内容
     */
    AUTO_REG = "register/autoRegister",
    /**
     * 注册结果通知，参数字段：
     * - event：注册结果。succ - 成功，fail - 失败
     * - code：失败状态码
     * - reason：失败原因
     */
    REG_RESULT = "registerResult",
    /**
     * 注销结果通知，参数无内容
     */
    UNREG_RESULT = "unregisterResult",
    /**
     * 发生错误，参数字段：
     * - code：错误码
     * - message：错误信息描述
     */
    ERROR = "error",
    /**
     * 有新呼入到达，参数字段：
     * - telNumber：呼入电话号码
     * - displayName：呼入SIP协议中携带的显示名称（通常同号码）
     */
    IN_CALL = "incomingcall",
    /**
     * 有新呼入并已自动应答（仅针对操作员）
     */
    IN_CALL_ANSWER = "incomingcall/autoAnswer",
    /**
     * 对端振铃通知，参数字段：
     * - callId：通话ID
     */
    RINGING = "ringing",
    /**
     * 对端已接听通知，参数字段：
     * - callId：通话ID
     */
    ACCEPTED = "accepted",
    /**
     * 对端挂机通知，参数字段：
     * - callId：通话ID
     * - code：挂机状态码
     */
    HANGUP = "hangup",
    /**
     * 本机主动挂机完成，参数无内容
     */
    HANGUP_RESULT = "hangupResult",
    /**
     * 本机正在发起呼叫，参数字段：
     * - callId：通话ID
     */
    CALL_RESULT = "callingResult",
    /**
     * 本机应答呼入，参数字段：
     * - callId：通话ID
     */
    ANSWER_RESULT = "answerResult",
}


/**
 * 设备控制操作接口，比如：切换摄像头、外放 等操作。
 */
export interface DeviceControl {

    /** 是否有多个音频输入设备可供切换，如果为 false 表示无法切换音频外放（移动端切换音频输入设备即可切换音频输出） */
    readonly hasMultiVoiceDevice:boolean;
    /** 是否有多个视频输入设备可供切换，如果为 false 表示无法切换摄像头 */
    readonly hasMultiVideoDevice:boolean;

    /** 当前音频输入设备的索引 */
    readonly currentVoiceIndex:number;
    /** 当前音频输入设备的设备ID */
    readonly currentVoiceDevId:string;

    /** 当前是否使用移动端前置摄像头。true - 前置摄像头，false - 后置摄像头 */
    readonly currentFrontCamera: boolean;

    /** 听筒的设备索引 */
    voiceHeadphoneIndex: number;
    /** 外放的设备索引 */
    voiceSpeakerIndex: number;

    /**
     * 切换音频输入设备，如果有多个音频输入设备，则在索引 1，2 之间切换
     * （可通过 voiceHeadphoneIndex、voiceSpeakerIndex 来设置这两个用于切换的索引值，必须确保这两个值在允许的范围内）
     * @return 返回切换后的设备信息 [索引, 设备ID, 设备名]（注意，设备名可能为空）
     * @throws 当不具备多个音频输入时抛出异常
     */
    toggleVoiceDevice():Promise<[number, string, string]>;

    /**
     * 切换音频输出为 外放/听筒（移动端）。本质上是切换音频输入设备（移动端切换音频输入设备即可切换音频输出），如果有多个音频输入设备，则在索引 1，2 之间切换
     * （可通过 voiceHeadphoneIndex、voiceSpeakerIndex 来设置这两个用于切换的索引值，必须确保这两个值在可用的范围内）
     * @param value 是否切换为外放。true - 使用外放，false - 使用听筒
     * @throws 当不具备多个音频输入时抛出异常
     */
    updateVoiceSpeaker(value: boolean): Promise<void>;

    /**
     * 切换前置摄像头，可在建立通话之前切换，或者通话过程中切换。
     * 在通话之前切换时，立即完成。在建立通话时，使用该配置建立通话。
     * 在通话过程中切换时，通过返回的promise对象判断是否完成。需要根据新配置重新构造流，有可能会失败。
     * 
     * 注意：无法在建立通话的过程中进行切换 —— 发起通话后，还未建立通话的过程中无法切换。
     * 
     * @param value 是否使用移动端前置摄像头。true - 前置摄像头，false - 后置摄像头
     */
    updateFrontCamera(value: boolean): Promise<void>;

    /**
     * 打开/关闭本地摄像头
     * （可在通话过程中调用，也可在建立通话前调用）
     * 
     * @param value 是否启用摄像头。true - 启用摄像头，false - 禁用摄像头（不向对方发送图像）
     */
    enableCamera(value: boolean): Promise<void>;

}


/**
 * 软手柄操作接口
 */
export interface SoftHandler {
    /**
     * 当前js库版本号
     */
    readonly version: string;

    /**
     * 是否注册成功
     */
    readonly registed: boolean;

    /**
     * 注册成功的用户名
     */
    readonly username: string | null | undefined;

    /**
     * 是否正在进行通话
     */
    readonly talking: boolean;

    /**
     * 正在进行通话的标识
     */
    readonly callId: string | null | undefined;

    /**
     * 注册当前软手柄
     * @param username 用户名
     */
    register(username: string): Promise<void>;

    /**
     * 注册当前软手柄
     * @param opts 注册参数
     */
    register(opts: RegisterParams): Promise<void>;

    /**
     * 注销当前软手柄
     */
    unregister(): Promise<void>;

    /**
     * 销毁当前软手柄操作对象
     * （将会触发 unregister 并销毁所申请的资源）
     */
    destroy(): Promise<void>;

    /**
     * 发起呼叫
     * @param called 被叫号码
     * @param media 媒体流配置
     */
    call(called: string, media?: MediaConfig): Promise<void>;

    /**
     * 发起返呼
     * @param called 被叫号码
     * @param media 媒体流配置
     */
    newcall(called: string, media?: MediaConfig): Promise<void>;

    /**
     * 应答呼入
     * @param media 媒体流配置
     */
    answer(media?: MediaConfig): Promise<void>;

    /**
     * 挂断当前通话
     */
    hangup(): Promise<void>;

    /**
     * 添加事件监听器
     * @param event 事件名称
     * @param callback 回调函数
     */
    on(event: SoftHandlerEvent, callback: Function, key?: string): void;

    /**
     * 取消事件监听器
     * @param event 事件名称
     * @param callback 
     */
    off(event: SoftHandlerEvent, callback: Function): void;

    /**
     * 设置界面上放置视频元素的容器（如果设置了新容器，则将视频元素添加到新容器中；否则，从旧容器中移除视频元素）
     * @param opts 视频元素容器选项
     */
    setVideoContainer(opts: VideoContainerOpts): void;

    /**
     * 列出设备列表
     */
    listDevices(): Promise<MediaDeviceInfo[]>;

    /**
     * 当前音频输出是否静音
     */
    audioOutputMuted: boolean;

    /**
     * 当前音频输入是否静音
     */
    audioInputMuted: boolean;

    /**
     * 设备控制操作接口
     */
    readonly deviceControl: DeviceControl;

}

