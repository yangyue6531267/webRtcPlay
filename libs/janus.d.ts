declare namespace JanusJS {
	interface Dependencies {
		adapter: any;
		WebSocket: (server: string, protocol: string) => WebSocket;
		isArray: (array: any) => array is Array<any>;
		extension: () => boolean;
		httpAPICall: (url: string, options: any) => void;
	}

	interface DependenciesResult {
		adapter: any;
		newWebSocket: (server: string, protocol: string) => WebSocket;
		isArray: (array: any) => array is Array<any>;
		extension: () => boolean;
		httpAPICall: (url: string, options: any) => void;
	}

	enum DebugLevel {
		Trace = 'trace',
		Debug = 'debug',
		Log = 'log',
		Warning = 'warn',
		Error = 'error'
	}

	/** SDP信息 */
	interface JSEP {
		/** 类型，如："offer"、"answer" */
		type: string;
		/** SDP描述字符串 */
		sdp: string;
	}

	/** 初始化选项 */
	interface InitOptions {
		/** 是否输出 janus 内部日志 */
		debug?: boolean | 'all' | DebugLevel[];
		/** 初始化完成后的回调 */
		callback?: () => void;
		/** 依赖库相关对象 */
		dependencies?: DependenciesResult;
	}

	interface ConstructorOptions {
		/**
		 * the url for janus-server, ex: "wss://127.0.0.1:3030/janus".
		 * （如果使用数组指定多个不同的服务，在尝试连接第一个失败后，将尝试连接第二个，……，直到尝试完所有的再触发失败回调）
		 */
		server: string | string[];
		/**
		 * custom the uri for stun ice-server, ex: [{urls: "stun:stun.l.google.com:19302"}]
		 */
		iceServers?: RTCIceServer[];
		/** Whether IPv6 candidates should be gathered */
		ipv6?: boolean;
		/** Whether we should enable the withCredentials flag for XHR requests */
		withCredentials?: boolean;
		/** Optional max events */
		max_poll_events?: number;
		/** Whether we should destroy this session when onbeforeunload is called */
		destroyOnUnload?: boolean;
		/** Token to use (only if the token based authentication mechanism is enabled) */
		token?: string;
		/** API secret to use (only if the shared API secret is enabled) */
		apisecret?: string;
		/** 通过 WebSockets 发送 keep-alive 消息的周期 (ms), 默认为 25000 */
		keepAlivePeriod?: number;
		/** 发送 long-poll 请求的超时时间 (ms), 默认为 60000 */
		longPollTimeout?: number;
		/**
		 * 当连上 janus 服务的回调
		 */
		success?: () => void;
		/**
		 * 当连接产生错误时的回调
		 */
		error?: (error: string) => void;
		/**
		 * 当与后台的连接销毁时的回调
		 * （若 destroy(opts) 方法参数中的 notifyDestroyed 设置为 false 将不触发该回调）
		 */
		destroyed?: () => void;
	}
	
	interface ReconnectOptions {
		success?: Function;
		error?: (error: any) => void;
	}

	interface DestroyOptions {
		/** 是否清理已附加的所有 plugin-handler，默认为 false；若清理，下次初始化时需重新调用 Janus.attach(...)，初始化需要的插件。 */
		cleanupHandles?: boolean
		/** 是否触发初始化传入的 destroyed() 回调函数，默认为 true */
		notifyDestroyed?: boolean
		/** 
		 * 是否直接断开连接，默认为 false；一般在页面 unload 时调用；
		 * 设置为 true 直接断开连接，false 等待服务端响应后再断开
		 * （注：同一个 WebSockets 连接中可能有多个 session）
		 */
		unload?: boolean
		/** 销毁成功后的回调 */
		success?: () => void
		/** 出现错误时的回调 */
		error?: (error: string) => void
	}

	enum MessageType {
		Recording = 'recording',
		Starting = 'starting',
		Started = 'started',
		Stopped = 'stopped',
		SlowLink = 'slow_link',
		Preparing = 'preparing',
		Refreshing = 'refreshing'
	}

	interface Message {
		result?: MessageResult;
		error?: Error;
	}

	interface MessageResult { }

	interface MsgCommonResult extends MessageResult {
		status: MessageType;
		id?: string;
		uplink?: number;
	}

	interface GetInfoOptions {
		success?: (data: any) => void;
		error?: (error: string) => void;
	}

	/** attach 插件的参数 */
	interface PluginOptions {
		/**
		 * 插件标识字符串，与后台插件标识相对应
		 */
		plugin: string;
		/**
		 * 初始化插件时直传给后台的 opaque_id 的值
		 */
		opaqueId?: string;
		/**
		 * 初始化插件时直传给后台的 loop_index 的值
		 */
		loopIndex?: any;
		/** 
		 * Token to use (only if the token based authentication mechanism is enabled)
		 * 缺省使用 janus 初始化时传入的值
		 */
		token?: string;
		dataChannelOptions?: RTCDataChannelInit;
		/** 
		 * 插件初始化成功后的回调
		 * @param handle 插件操作句柄，后续可通过该句柄进行相关操作
		 */
		success?: (handle: PluginHandle) => void;
		/** 产生错误后的回调 */
		error?: (error: string) => void;
		/**
		 * 是否正在准备媒体流（本地、对端）。
		 * 当开始准备媒体流时为 true，当处理完或者失败时为 false。
		 */
		consentDialog?: (on: boolean) => void;
		/**
		 * WebRTC PeerConnection 的连接状态，由信令交互触发（服务端通知）。
		 * 连接成功为 true，断开连接为 false 并传递 reason 参数
		 */
		webrtcState?: (isConnected: boolean, reason?: string) => void;
		/**
		 * ICE(交互式网络连接) 连接状态变化通知，由 oniceconnectionstatechange 事件触发。
		 * 其值来自 RTCPeerConnection.iceConnectionState。
		 */
		iceState?: (state: RTCIceConnectionState) => void;
		/**
		 * 媒体流传输状态变化通知，由信令交互触发（服务端通知）。
		 * 是否开始接收 音频/视频 流。
		 */
		mediaState?: (medium: 'audio' | 'video', receiving: boolean, mid?: number) => void;
		/**
		 * 丢包率测试，由信令交互触发（服务端通知）。
		 * @param uplink 传输方向
		 * @param lost 丢包率
		 */
		slowLink?: (uplink: boolean, lost: number) => void;
		/**
		 * 接收到后台发过来消息的回调，在此进行相关消息处理
		 * @param message 消息内容
		 * @param jsep 对端SDP信息
		 */
		onmessage?: (message: Message, jsep?: JSEP) => void;
		/** 
		 * 本地媒体流就绪后的回调，媒体流来着本地查找到的视频/音频设备。
		 * 在此绑定本地视频标签（可查看本地摄像头拍摄的内容）
		 */
		onlocalstream?: (stream: MediaStream) => void;
		/** 
		 * 对端媒体流就绪后的回调，媒体流来着WebRTC中网络接收到的媒体数据。
		 * 在此绑定对端视频标签（查看对端视频）或者音频标签（播放对端音频）
		 */
		onremotestream?: (stream: MediaStream) => void;
		/**
		 * 当 DataChannel 打开时的回调
		 */
		ondataopen?: (label: string, protocol: string) => void;
		/**
		 * 从 DataChannel 中接收到数据时触发
		 */
		ondata?: (data: any, label: string) => void;
		/** 
		 * 在一通呼叫结束后的回调，可在此清理呼叫过程中产生的对象
		 */
		oncleanup?: () => void;
		/**
		 * 当前插件被detach之后的回调
		 * （收到服务端返回的 detached 消息时触发）
		 */
		ondetached?: () => void;
	}

	/* 废弃，使用 OfferOptions
	interface OfferParams {
		media?: {
			audioSend?: boolean;
			audioRecv?: boolean;
			videoSend?: boolean;
			videoRecv?: boolean;
			audio?: boolean | { deviceId: string };
			video?:
				| boolean
				| { deviceId: string }
				| 'lowres'
				| 'lowres-16:9'
				| 'stdres'
				| 'stdres-16:9'
				| 'hires'
				| 'hires-16:9';
			data?: boolean;
			failIfNoAudio?: boolean;
			failIfNoVideo?: boolean;
			screenshareFrameRate?: number;
		};
		trickle?: boolean;
		stream?: MediaStream;
		success: Function;
		error: (error: any) => void;
	}
	*/

	/** createOffer 的参数 */
	interface OfferOptions {
		/** 媒体能力启用开关 */
		media?: MediaOptions;
		trickle?: boolean;
		/** 传入自定义的媒体传输流 */
		stream?: MediaStream;
		iceRestart?: boolean;
		simulcast?: boolean;
		simulcast2?: boolean;
		simulcastMaxBitrates?: {high?: number, medium?: number, low?: number};
		/** 自定义传输参数，调用 RTCPeerConnection.addTransceiver(..) 时传入 */
		sendEncodings?: RTCRtpEncodingParameters[];
		/** 一些网络协议层面的设置，参考 RTCPeerConnection 的第2个构造参数 */
		rtcConstraints?: any[];
		senderTransforms?: any;
		receiverTransforms?: any;
		/** 自定义修改 SDP 内容，将修改后的内容替换到入参上 */
		customizeSdp?: (jsep: JSEP) => void;
		/** 操作成功后的回调 */
		success?: (jsep: JSEP) => void;
		/** 产生错误后的回调 */
		error?: (error: string | Error | DOMException) => void;
	}

	/** createAnswer 的参数 */
	interface AnswerOptions extends OfferOptions {
		/** 对端的 SDP 信息，createAnswer 时传入 */
		jsep?: JSEP;
	}

	/** 媒体能力开关选项 */
	interface MediaOptions {
		/** 
		 * 是否启用音频，或者指定音频输入设备ID。
		 * 参考：https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia 
		 */
		audio?: boolean | MediaTrackConstraints;
		/**
		 * 是否启用视频，或者指定视频输入设备ID，
		 * 或者指定几种固定的视频分辨率模式，或者指定“屏幕分享”来源。
		 * 参考：https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia 
		 */
		video?: boolean | MediaTrackConstraints | VideoRes | VideoSource;
		/** 是否启用数据通道 */
		data?: boolean;
		//
		addAudio?: boolean;
		removeAudio?: boolean;
		replaceAudio?: boolean;
		//
		addVideo?: boolean;
		removeVideo?: boolean;
		replaceVideo?: boolean;
		//
		addData?: boolean;
		//
		audioSend?: boolean;
		audioRecv?: boolean;
		videoSend?: boolean;
		videoRecv?: boolean;
		failIfNoAudio?: boolean;
		failIfNoVideo?: boolean;
		// 当 video 为 VideoSource 中的选项时
		screenshareFrameRate?: number;
		screenshareHeight?: number;
		screenshareWidth?: number;
		captureDesktopAudio?: number;
	}

	interface PluginMessage {
		/** 待传输的消息体 */
		message: {
			request: string;
			[otherProps: string]: any;
		};
		/** 待发送给对端的本地SDP内容 */
		jsep?: JSEP;
		/** 发送成功后的回调 */
		success?: (data?: any) => void;
		/** 产生错误后的回调 */
		error?: (error: string) => void;
	}

	interface DtmfMessage {
		/** dtmf 消息参数 */
		dtmf: {
			/** 待发送的 DTMF 代码字符串，指定空字符串将清空当前还未发出的DTMF缓冲区 */
			tones: string;
			/** 每段DTMF音频的持续时间(ms)，默认 100，取值必须在 40~6000 之间 */
			duration?: number;
			/** 各段DTMF音频间的间隔时间(ms)，默认 70，不小于 30 */
			gap?: number;
		};
		/** 发送成功后的回调 */
		success?: () => void;
		/** 产生错误后的回调 */
		error?: (error: string) => void;
	}

	interface DataMessage {
		/** 待传输的数据，与 text 选其一 */
		data?: any;
		/** 待传输的文本，与 data 选其一 */
		text?: string;
		/** 数据通道标签，可以通过标签来区分多个通道 */
		label?: string;
		/** 在数据传输通道中所使用的封装协议，如：json、raw，可自行定义但同时需要自行处理 */
		protocol?: string;
		/** 发送成功后的回调 */
		success?: () => void;
		/** 产生错误后的回调 */
		error?: (error: string) => void;
	}

	/**
	 * 插件操作对象，可通过该对象与后台通信
	 */
	interface PluginHandle {
		/**
		 * 插件标识字符串，与后台插件标识相对应
		 */
		plugin: string;
		/**
		 * 操作对象标识（由后台返回）
		 */
		id: string;
		/**
		 * 鉴权 token 值
		 */
		token?: string;
		/**
		 * 该操作对象是否已被销毁
		 */
		detached : boolean;
		/**
		 * WebRTC 初始化参数
		 */
		webrtcStuff: {
			/** 是否启动 */
			started: boolean,
			/** 本地媒体流 */
			myStream: MediaStream,
			streamExternal: boolean,
			/** 对端媒体流 */
			remoteStream: MediaStream,
			mySdp: any,
			mediaConstraints: any,
			/** 连接对象 */
			pc: RTCPeerConnection,
			dataChannelOptions: RTCDataChannelInit,
			/** 已创建的各个数据通道 */
			dataChannel: { [label: string]: RTCDataChannel; },
			/** 已创建的 DTMFSender */
			dtmfSender: RTCDTMFSender,
			trickle: boolean,
			iceDone: boolean,
			/** 本地或对端的音量（janus内部使用，定时刷新） */
			volume: { [stream: string]: {
				/** 本轮次获取到的音量大小 */
				value: number,
				/** 获取音量的定时器id */
				timer: number
			}; },
			/** 码率信息（janus 内部使用，定时刷新） */
			bitrate: {
				/** 本轮次计算出的码率，如："123 kbits/sec" */
				value: string,
				/** 当前接收到的字节数 */
				bsnow : number,
				/** 上一轮接收到的字节数 */
				bsbefore : number,
				/** 当前时间戳 */
				tsnow : number,
				/** 上一轮时间戳 */
				tsbefore : number,
				/** 计算码率的定时器id */
				timer : number
			}
		};
		/** 获取操作对象标识 */
		getId(): string;
		/** 获取插件标识字符串 */
		getPlugin(): string;
		/** 获取对端流中的音量 */
		getVolume(): number;
		/** 获取对端流中的音量 */
		getRemoteVolume(): number;
		/** 获取本地流中的音量 */
		getLocalVolume(): number;
		/**
		 * 向后台发送插件消息
		 */
		send(message: PluginMessage): void;
		/**
		 * 根据本地的媒体参数构造一个准备发给对端的本地SDP信息，并初始化本地媒体流对象
		 */
		createOffer(options: OfferOptions): void;
		/**
		 * 根据对端SDP及本地的媒体参数，初始化本地的媒体流对象（触发SDP协商过程），可得到一个准备发给对端的本地SDP信息
		 */
		createAnswer(options: AnswerOptions): void;
		/**
		 * 将对端的SDP内容设置到本地WebRTC对象上（触发SDP协商过程）
		 */
		handleRemoteJsep(options: RemoteJsepOptions): void;
		/**
		 * 发送一个DTMF消息
		 */
		dtmf(message: DtmfMessage): void;
		/**
		 * 通过数据通道（DataChannel）发送消息
		 */
		data(message: DataMessage): void;
		/** 音频流是否被静音 */
		isAudioMuted(): boolean;
		/** 音频流静音 */
		muteAudio(): void;
		/** 音频流取消静音 */
		unmuteAudio(): void;
		/** 视频流是否被静音 */
		isVideoMuted(): boolean;
		/** 视频流静音 */
		muteVideo(): void;
		/** 视频流取消静音 */
		unmuteVideo(): void;
		/** 获取过去一段时间的传输码率，如："123 kbits/sec"（每秒钟更新一次） */
		getBitrate(): string;
		/** 
		 * 发送一个挂断请求，并清理媒体流
		 * @param sendRequest 是否向后台发送挂断请求，默认为 false 不发送
		 */
		hangup(sendRequest?: boolean): void;
		/**
		 * 销毁该插件操作对象
		 */
		detach(options?: PluginDetachOptions): void;
	}

	interface PluginDetachOptions {
		/** 是否在销毁前向后台发起请求 */
		noRequest?: boolean;
		/** 销毁成功后的回调 */
		success?: () => void;
		/** 发送错误后的回调 */
		error?: (error: string) => void;
	}

	interface RemoteJsepOptions {
		jsep: JSEP;
		/** 自定义修改 SDP 内容，将修改后的内容替换到入参上 */
		customizeSdp?: (jsep: JSEP) => void;
		/** 操作成功后的回调 */
		success?: () => void;
		/** 产生错误后的回调 */
		error?: (error: string) => void;
	}

	/** 几种视频分辨率，由 janus.js 中转移成具体的分辨率数值 */
	type VideoRes = "hires" | "hires-16:9"
					| "hdres" 
					| "fhdres" 
					| "stdres" | "stdres-16:9"
					| "lowres" | "lowres-16:9"
					| "4kres";
	/** “屏幕分享”时的视频来源 */
	type VideoSource = "screen" | "window";


	class Janus {
		/** reference to webrtc-adapter library */
		static webRTCAdapter: any;
		static safariVp8: boolean;
		/** 生成janus依赖库配置对象 */
		static useDefaultDependencies(deps: Partial<Dependencies>): DependenciesResult;
		static useOldDependencies(deps: Partial<Dependencies>): DependenciesResult;
		/** Stop all tracks from a given stream */
		static stopAllTracks(stream: MediaStream): void;
		/** 初始化 janus */
		static init(options: InitOptions): void;
		/** Helper method to check whether WebRTC is supported by this browser */
		static isWebrtcSupported(): boolean;
		/** Helper method to check whether devices can be accessed by this browser (e.g., not possible via plain HTTP) */
		static isGetUserMediaAvailable(): boolean;
		// 日志输出相关函数
		static debug(...args: any[]): void;
		static log(...args: any[]): void;
		static warn(...args: any[]): void;
		static error(...args: any[]): void;
		/** Helper method to create random identifiers (e.g., transaction) */
		static randomString(length: number): string;
		/** Helper methods to attach a stream to a video element (previously part of adapter.js) */
		static attachMediaStream(element: HTMLMediaElement, stream: MediaStream): void;
		/** Helper methods to reattach a stream to a video element (previously part of adapter.js) */
		static reattachMediaStream(to: HTMLMediaElement, from: HTMLMediaElement): void;
		/** Helper method to enumerate devices */
		static listDevices(callback: (devices: MediaDeviceInfo[]) => void, config?: MediaStreamConstraints): void;

		/**
		 * 为 janus 连接创建一个 session
		 * （注：一个 WebSockets 连接对应一个 session，通过 session_id 标识）
		 */
		constructor(options: ConstructorOptions);

		/** get server url */
		getServer(): string;
		/** connection complete */
		isConnected(): boolean;
		/** get the session-id of connection */
		getSessionId(): string;
		/** get info on the server */
		getInfo(options: GetInfoOptions): void;
		/** create a plugin handle */
		attach(options: PluginOptions): void;
		/** create a new session of connection */
		reconnect(options: ReconnectOptions): void;
		/** destroy a session of connection */
		destroy(options: DestroyOptions): void;
	}
}

///////////////////////////////////////////////////////////////////////////////
// 下面是公司内部自定义的插件消息内容

// for janus plugin "janus.plugin.sipserver"
declare namespace JanusJS {
	/** 在SIP插件下扩展出的 Message 对象内容 */
	interface SipMessage extends Message {
		result?: MsgSipResult;
		sip: "event";
        call_id: string;
		error_code?: number;
    }
	/**
	 * 在SIP插件下的通用返回消息内容
	 */
	interface MsgSipResult extends MessageResult {
		event: string;
		code?: number;
		reason?: string;
		username?: string;
	}
	/**
	 * 在SIP插件下的呼入消息内容
	 */
	interface MsgSipInCall extends MsgSipResult {
		type?: SipInCallType;
		displayname?: string;
		audio?: boolean;
		video?: boolean;
	}
	/** 
	 * 呼入类型
     * - call_dispatch_out  其他操作员 调度呼叫or邀请入会, 通知号码为发起动作的操作员手柄号(也可配制成中心号)
     * - call_dispatch	   调度呼入通知,通知号码为调度中心号
     * - other_call_handle  其他操作员进行‘除’ 调度呼叫or邀请入会 外的调度操作,如:组呼通知，点名等, 通知号码为操作中心号
     * - self_call_handle   操作员调度呼叫or拉会or群组操作 自己, 通知号码为操作中心 - 自动应答
     * - user_call_user	   直接拨号呼叫,通知号码为发起人号码
	 */
	type SipInCallType = "other_call_handle" | "self_call_handle" | "call_dispatch" | "call_dispatch_out" | "user_call_user";
}

///////////////////////////////////////////////////////////////////////////////

export default JanusJS.Janus;
export { JanusJS };
