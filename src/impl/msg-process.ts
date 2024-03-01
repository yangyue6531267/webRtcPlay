
import { JanusJS } from "../../libs/janus";
import { SoftHandlerEvent } from "../soft-handler";
import { CONST_CODE, SipEvent } from "./constants";
import JanusHandler from "./janus-handler";

/** 消息处理函数 */
interface MsgAction {
    (msg: JanusJS.SipMessage, jsep?: JanusJS.JSEP): void;
}

/**
 * 处理Janus派发出的消息
 */
export default class MsgProcess {

    // 消息处理函数
    msgActions: { [key: string]: MsgAction } = {};

    constructor(
        private handler: JanusHandler
    ) {
        /* -------  另一方操作通知 ------- */
        this.msgActions[SipEvent.INCOMING_CALL] = this.incomingcall.bind(this);
        this.msgActions[SipEvent.RINGING] = this.ringing.bind(this);
        this.msgActions[SipEvent.ACCEPTED] = this.accepted.bind(this);
        this.msgActions[SipEvent.HANGUP] = this.hangup.bind(this);
        /* ------- 手柄操作结果通知 ------ */	
        this.msgActions[SipEvent.HANGINGUP] = this.hangupResult.bind(this);
        this.msgActions[SipEvent.REGISTRATION_FAILED] = msg => this.registerResult(msg, "fail");
        this.msgActions[SipEvent.REGISTERED] = msg => this.registerResult(msg, "succ");
        this.msgActions[SipEvent.UNREGISTERING] = this.unregisterResult.bind(this);
        this.msgActions[SipEvent.CALLING] = this.callingResult.bind(this);
        this.msgActions[SipEvent.ACCEPT_REPLY] = this.answerResult.bind(this);
        this.msgActions[SipEvent.NEW_ACCEPTED] = this.newAccepted.bind(this);
        this.msgActions[SipEvent.UPDATING] = this.updating.bind(this);
    }

    onMessage(msg: JanusJS.SipMessage, jsep?: JanusJS.JSEP) {
        console.log(msg, jsep);
        jsep && console.log("remote sdp = ", jsep.sdp);
        //先关闭振铃音
        // MSG_CALLBACK.ringFile(false);

        let msgErrCode = msg.error_code;
        if (msgErrCode) {
            let errorMsg = CONST_CODE.SHANDLE_FAILED_CODE[msgErrCode] || '错误码：' + msgErrCode;
            console.error("错误码：" + msgErrCode + "," + errorMsg);
            this.handler.listener.dispatch(SoftHandlerEvent.ERROR, {code: msgErrCode, message: errorMsg});
            return false;
        }

        let result = msg.result;
        if (!result) return;
        let resultErrCode = result.code;
        if (resultErrCode && 200 != resultErrCode) {
            let errorMsg = CONST_CODE.SHANDLE_FAILED_CODE[resultErrCode] || '错误码：' + resultErrCode;
            console.error("错误码：" + resultErrCode + "," + errorMsg);
            this.handler.listener.dispatch(SoftHandlerEvent.ERROR, {code: resultErrCode,  message: errorMsg});
        }

        // 事件响应
        let event = result.event;
        if (!event) return;

        const act = this.msgActions[event];
        if (act) {
            act(msg, jsep);
        } else {
            console.log('event：' + event);
        }
    }

    /**
     * 呼叫通知（来电）
     */
    incomingcall(message: JanusJS.SipMessage, jsep?: JanusJS.JSEP) {
        // MSG_CALLBACK.ringFile(true, _self._opts.configs.ringFile);
        // 正在通话状态则忽略
        if (this.handler.calling) {
            return;
        }
        //
        this.handler.remoteJsep = jsep;
        this.handler.calling = true;

        var callId = message.call_id;
        var result = message.result as JanusJS.MsgSipInCall;
        let type = result?.type;
        let telNumber = result?.username;

        let videoEnable = this.handler.opts.configs.videoEnable;

        this.handler.remoteSipUri = telNumber;

        //type 枚举
        //1.call_dispatch_out  其他操作员 调度呼叫or邀请入会, 通知号码为发起动作的操作员手柄号(也可配制成中心号)
        //2.call_dispatch	   调度呼入通知,通知号码为调度中心号
        //3.other_call_handle  其他操作员进行‘除’ 调度呼叫or邀请入会 外的调度操作,如:组呼通知，点名等, 通知号码为操作中心号
        //4.self_call_handle   操作员调度呼叫or拉会or群组操作 自己, 通知号码为操作中心 - 自动应答
        //5.user_call_user	   直接拨号呼叫,通知号码为发起人号码

        // 如果是自动摘机，同时派发自动摘机通知
        if (type === "self_call_handle") {
            // 自己呼叫自己 ，自动应答
            videoEnable = result?.video && videoEnable == "true";
            this.handler.listener.dispatch(SoftHandlerEvent.IN_CALL_ANSWER, {
                callId: callId,
                telNumber: telNumber,
                displayName: result?.displayname,
                video: videoEnable,
                audio: result?.audio
            });
        } else {
            var param = {
                callId: callId,
                telNumber: telNumber,
                displayName: result?.displayname,
                video: result?.video,
                audio: result?.audio,
                notifyType: type
            }
            this.handler.listener.dispatch(SoftHandlerEvent.IN_CALL, param);
        }
        console.log("振铃通知， telNumber = " + telNumber + (type === "self_call_handle" ? ", 自动应答" : ""));
    }

    /**
     * 对端振铃通知
     */
    ringing(message: JanusJS.SipMessage) {
        // MSG_CALLBACK.ringFile(true, _self._opts.configs.ringFile);
        var callId = message.call_id;
        this.handler.listener.dispatch(SoftHandlerEvent.RINGING, {callId: callId});
        console.log("振铃通知， callId = " + callId);
    }

    /**
     * 对端应答通知
     */
    accepted(message: JanusJS.SipMessage, jsep?: JanusJS.JSEP) {
        // 收到对端应答通知时，设置对端JSEP（否则无法建立媒体通道）
        this.handler.handleRemoteJsep({ jsep: jsep! });
        //
        var callId = message.call_id;
        var result = message.result;
        var telNumber = result?.username;
        this.handler.callId = callId;
        this.handler.listener.dispatch(SoftHandlerEvent.ACCEPTED, {callId: callId, telNumber: telNumber});
        console.log("应答通知， callId = " + callId + ", telNumber" + telNumber);
    }
    
    /**
     * 对端挂断通知
     */
    hangup(message: JanusJS.SipMessage) {
        // 如果还未建立通话，则清除掉正在进行的呼叫
        this.handler.asyncOps.opRejected("call");
        this.handler.asyncOps.opRejected("new_call");
        //
        this.handler.calling = false;
        var callId = message.call_id;
        var result = message.result;
        this.handler.callId = null;
        this.handler.listener.dispatch(SoftHandlerEvent.HANGUP, {callId: callId, code: result?.code, reason: result?.reason});
        console.log("挂断通知， callId = " + callId);
        //
        this.handler.clearCurrentCall();
    }
    
    /**
     * 本机主动挂断结果
     * 服务器收到挂断后确认该操作
     */
    hangupResult(message: JanusJS.SipMessage) {
        this.handler.asyncOps.opResovled("hangup");
        // 如果还未建立通话，则清除掉正在进行的呼叫
        this.handler.asyncOps.opRejected("call");
        this.handler.asyncOps.opRejected("new_call");
        //
        this.handler.calling = false;
        var callId = message.call_id;
        var result = message.result;
        this.handler.callId = null;
        this.handler.listener.dispatch(SoftHandlerEvent.HANGUP_RESULT, {callId: callId, code: result?.code, reason: result?.reason});
        console.log("软手柄挂断通知， callId = " + callId);
        //
        this.handler.clearCurrentCall();
    }

    /**
     * 软手柄注册结果
     * @param type 成功：succ  失败： fail
     */
    registerResult(message: JanusJS.SipMessage, type: 'succ' | 'fail') {
        var result = message.result;
        if (type == 'succ') {
            this.handler.asyncOps.opResovled("register");
            var telNumber = result?.username;
            this.handler.username = telNumber;
            this.handler.listener.dispatch(SoftHandlerEvent.REG_RESULT, {event: "succ", telNumber: telNumber});
            console.log("注册成功通知");
        } else {
            this.handler.asyncOps.opRejected("register");
            this.handler.username = null;
            this.handler.listener.dispatch(SoftHandlerEvent.REG_RESULT, {event: "fail", code: result?.code, reason: result?.reason});
            console.log("注册失败通知");
        }
    }

    /**
     * 软手柄注销结果
     */
    unregisterResult(message: JanusJS.SipMessage) {
        this.handler.asyncOps.opResovled("unregister");
        //
        var result = message.result;
        var event = result?.event;
        var telNumber = result?.username;
        this.handler.username = null;
        this.handler.listener.dispatch(SoftHandlerEvent.UNREG_RESULT, {event: event, telNumber: telNumber});
        console.log("注销结果通知");
    }

    /**
     * 软手柄呼叫操作结果
     */
    callingResult(message: JanusJS.SipMessage) {
        var callId = message.call_id;
        this.handler.listener.dispatch(SoftHandlerEvent.CALL_RESULT, {callId: callId});
    }

    /**
     * 软手柄应答操作结果（通话建立）
     * 对端应答（对应 call、new_call 的返回）
     * 本机应答（对应 accept）
     */
    answerResult(message: JanusJS.SipMessage) {
        this.handler.asyncOps.opResovled("call");
        this.handler.asyncOps.opResovled("new_call");
        this.handler.asyncOps.opResovled("accept");
        //
        var callId = message.call_id;
        this.handler.callId = callId;
        this.handler.listener.dispatch(SoftHandlerEvent.ANSWER_RESULT, {callId: callId});
    }

    /**
     * 返呼确认（服务端收到“返呼”后返回 SDP）
     */
    newAccepted(message: JanusJS.SipMessage, jsep?: JanusJS.JSEP) {
        // 收到对端应答通知时，设置对端JSEP（否则无法建立媒体通道）
        this.handler.handleRemoteJsep({ jsep: jsep! });
        //
        this.handler.newAccepted(jsep);
        // message: { call_id: '', result: { event: 'new_accepted', username: '' } }
        var callId = message.call_id;
        var result = message.result;
        var telNumber = result?.username;
        this.handler.callId = callId;
        this.handler.listener.dispatch(SoftHandlerEvent.ACCEPTED, {callId: callId, telNumber: telNumber});
        console.log("返呼通知 - 对端应答，callId = " + callId + ", telNumber = " + telNumber);
    }

    /**
     * 更新媒体流
     */
    updating(message: JanusJS.SipMessage, jsep?: JanusJS.JSEP) {
        let callId = message.call_id;
        this.handler.callId = callId;
        console.log("更新媒体，callId = " + callId);
        //
        this.handler.asyncOps.opResovled("update");
    }

}
