
import { createSoftHandler, listMediaDevices, SoftHandler, SoftHandlerEvent } from '../src';

let softHandler: SoftHandler | null = null;
console.log(SoftHandlerEvent);

window.onerror = function(msg, src, line, col, err) {
    console.error(`${msg}; ${src}; ${line}, ${col}; ${err}`);
};
window.addEventListener("unhandledrejection", function(event) {
    console.error(event.reason);
});

let enableCheckboxes: Function;
let checkCheckboxes: Function;

// 绑定界面事件
(function() {
    let btnRegister = document.getElementById("btnRegister");
    let btnUnregister = document.getElementById("btnUnregister");
    let btnAudioCall = document.getElementById("btnAudioCall");
    let btnVideoCall = document.getElementById("btnVideoCall");
    let btnBackCall = document.getElementById("btnBackCall");
    let btnVideoRecv = document.getElementById("btnVideoRecv");
    let btnAudioAnswer = document.getElementById("btnAudioAnswer");
    let btnVideoAnswer = document.getElementById("btnVideoAnswer");
    let btnHangup = document.getElementById("btnHangup");
    let btnSetDevice = document.getElementById('btnSetDevice');
    let chkAudioInputMute = document.getElementById('chkAudioInputMute') as HTMLInputElement;
    let chkAudioOutputMute = document.getElementById('chkAudioOutputMute') as HTMLInputElement;
    let chkFrontCamera = document.getElementById('chkFrontCamera') as HTMLInputElement;
    let btnChangeCamera = document.getElementById("btnChangeCamera");
    let btnChangeAudio = document.getElementById("btnChangeAudio");
    let chkEnableCamera = document.getElementById('chkEnableCamera') as HTMLInputElement;
    //
    enableCheckboxes = () => {
        let initialized = !!softHandler;
        let talking = initialized && softHandler?.talking;
        chkAudioInputMute.disabled = !talking;
        chkAudioOutputMute.disabled = !talking;
        chkFrontCamera.disabled = !initialized;
        chkEnableCamera.disabled = !initialized;
        if (softHandler) {
            chkFrontCamera.checked = softHandler.deviceControl.currentFrontCamera;
        }
        console.log('enable checkboxes', initialized);
    }
    checkCheckboxes = () => {
        if (softHandler) {
            chkAudioInputMute.checked = softHandler.audioInputMuted;
            chkAudioOutputMute.checked = softHandler.audioOutputMuted;
        }
    }

    // 注册
    btnRegister?.addEventListener("click", async function() {
        if (softHandler) {
            await softHandler.destroy();
            softHandler = null;
        }
        fillTextLabel("registerResult", "正在进行注册...");
        //
        let server = getTextValue("txtServer");
        let username = getTextValue("txtUsername");
        try {
            softHandler = await createSoftHandler({
                configs: {
                    janusUrl: server,
                    autoRegister: true,
                    localVideo: document.getElementById("localVideo") as HTMLDivElement,
                    remoteVideo: document.getElementById("remoteVideo") as HTMLDivElement,
                    debugJanus: true,
                },
                registerInfo: {
                    username: username,
                },
            });
            console.log("创建软手柄成功", softHandler);
            //
            initWebRtcEvent();
            // fillTextLabel("registerResult", "注册成功");
        } catch(e) {
            console.error(e);
            fillTextLabel("registerResult", `注册失败:${e.message}`);
        }
    });

    // 注销
    btnUnregister?.addEventListener("click", async function() {
        fillTextLabel("registerResult", softHandler ? "正在进行注销..." : "");
        if (softHandler) {
            await softHandler.unregister();
            console.log("已注销");
        }
    });

    // 音频呼叫
    btnAudioCall?.addEventListener("click", function() {
        let called = getTextValue("txtCalled");
        softHandler?.newcall(called);
    });
    // 视频呼叫
    btnVideoCall?.addEventListener("click", function() {
        let called = getTextValue("txtCalled");
        softHandler?.call(called, {video: true});
    });
    // 视频返呼
    btnBackCall?.addEventListener("click", function() {
        let called = getTextValue("txtCalled");
        try {
            if (softHandler?.deviceControl.hasMultiVideoDevice) {
                softHandler?.deviceControl.updateFrontCamera(chkFrontCamera.checked);
            }
        } catch(err) {
            console.error(err);
        }
        softHandler?.newcall(called, {video: true});
    });
    // 视频收发
    btnVideoRecv?.addEventListener("click", function() {
        let called = getTextValue("txtCalled");
        softHandler?.call(called, { audio: false, video: true });
    });

    // 音频接听
    btnAudioAnswer?.addEventListener("click", function() {
        softHandler?.answer();
    });
    // 视频接听
    btnVideoAnswer?.addEventListener("click", function() {
        try {
            if (softHandler?.deviceControl.hasMultiVideoDevice) {
                softHandler?.deviceControl.updateFrontCamera(chkFrontCamera.checked);
            }
        } catch(err) {
            console.error(err);
        }
        softHandler?.answer({video: true});
    });
    // 挂断
    btnHangup?.addEventListener("click", function() {
        softHandler?.hangup();
    });
    //
    initDevices();
    // 设置设备
    btnSetDevice?.addEventListener("click", function() {
        if (!softHandler) {
            alert('请先注册');
            return;
        }
        // softHandler.setDevice({
        //     audioDeviceId: (document.getElementById("selAudioDevice") as HTMLSelectElement).value,
        //     videoDeviceId: (document.getElementById("selVideoDevice") as HTMLSelectElement).value,
        // });
    });
    // 通话过程中切换摄像头
    btnChangeCamera?.addEventListener("click", async function() {
        if (!softHandler?.talking) {
            alert('请先发起或接听呼叫');
            return;
        }
        try {
            await softHandler.deviceControl.updateFrontCamera(chkFrontCamera.checked);
            console.log('切换摄像头为：', chkFrontCamera.checked ? '前置' : '后置')
        } catch(err) {
            alert(err);
        }
    });
    // 通话过程中开启/关闭摄像头
    chkEnableCamera?.addEventListener('click', async function() {
        console.log('chkEnableCamera', chkEnableCamera.checked);
        chkEnableCamera.disabled = true;
        try {
            await softHandler?.deviceControl.enableCamera(chkEnableCamera.checked);
        } catch(err) {
            alert(err);
        }
        chkEnableCamera.disabled = false;
    });
    // 通话过程中切换音频
    btnChangeAudio?.addEventListener("click", async function() {
        if (!softHandler?.talking) {
            alert('请先发起或接听呼叫');
            return;
        }
        try {
            let dev = await softHandler.deviceControl.toggleVoiceDevice();
            console.log('切换音频设备为：', dev);
        } catch(err) {
            alert(err);
        }
    });
    //
    enableCheckboxes();
    //
    chkAudioInputMute.addEventListener("change", function() {
        console.log('before', 'v', softHandler?.audioInputMuted, 'c', chkAudioInputMute.checked);
        if (softHandler) softHandler.audioInputMuted = chkAudioInputMute.checked;
        console.log('after', 'v', softHandler?.audioInputMuted, 'c', chkAudioInputMute.checked);
    });
    chkAudioOutputMute.addEventListener("change", function() {
        console.log('before', 'v', softHandler?.audioOutputMuted, 'c', chkAudioOutputMute.checked);
        if (softHandler) softHandler.audioOutputMuted = chkAudioOutputMute.checked;
        console.log('after', 'v', softHandler?.audioOutputMuted, 'c', chkAudioOutputMute.checked);
    });
    //
    initServerText();
})();

// 初始化WebRTC事件
function initWebRtcEvent(): void {
    if (!softHandler) {
        console.error("not initialized");
        return;
    }
    softHandler.on(SoftHandlerEvent.REG_RESULT, e => {
        if(e.event == "succ") {	//注册成功
            fillTextLabel("registerResult", "注册成功");
        } else if(e.event == "fail") {	//注册失败
            fillTextLabel("registerResult", `注册失败,错误码:${e.code},错误原因:${e.reason}`);
        }
        enableCheckboxes();
    });
    softHandler.on(SoftHandlerEvent.UNREG_RESULT, e => {
        console.log(e);
        fillTextLabel("registerResult", "已注销");
        enableCheckboxes();
    });
    softHandler.on(SoftHandlerEvent.CALL_RESULT, e => {
        let text = `正在呼叫...`;
        fillTextLabel("inCallInfo", text);
        enableCheckboxes();
        checkCheckboxes();
    });
    softHandler.on(SoftHandlerEvent.ACCEPTED, e => {
        let text = `已接通：${e.telNumber}, callId:${e.callId}`;
        fillTextLabel("inCallInfo", text);
        enableCheckboxes();
        checkCheckboxes();
    });
    softHandler.on(SoftHandlerEvent.IN_CALL, e => {
        let text = `${e.displayName}(号码: ${e.telNumber}) 来电`;
        fillTextLabel("inCallInfo", text);
        enableCheckboxes();
        checkCheckboxes();
    });
    softHandler.on(SoftHandlerEvent.ANSWER_RESULT, e => {
        let text = `已接听`;
        fillTextLabel("inCallInfo", text);
        enableCheckboxes();
        checkCheckboxes();
    });
    softHandler.on(SoftHandlerEvent.HANGUP, e => {
        fillTextLabel("inCallInfo", "已挂断");
        enableCheckboxes();
    });
    softHandler.on(SoftHandlerEvent.HANGUP_RESULT, e => {
        fillTextLabel("inCallInfo", "已挂断");
        enableCheckboxes();
    });
}

// 获取文本框的值
function getTextValue(id: string): string {
    let elem = document.getElementById(id) as HTMLInputElement;
    if (!elem) {
        return "";
    }
    return elem.value;
}

// 显示消息
function fillTextLabel(id: string, text: string): void {
    let elem = document.getElementById(id);
    if (!elem) {
        return;
    }
    elem.innerText = text;
}

// 初始化设备列表
async function initDevices() {
    // 先清除设备列表
    document.getElementById("selAudioDevice")!.innerHTML = '';
    document.getElementById("selVideoDevice")!.innerHTML = '';
    //
    try {
        console.log("initDevices");
    let devIdx = { audio: 0, video: 0 };
    let devices = await listMediaDevices();
    console.log(devices);
    devices && devices.forEach(device => {
        console.log("dev: " + device.kind + ", " + device.groupId + ", " + device.label + ", " + device.deviceId);
        let option = document.createElement("option");
        option.value = device.deviceId;
        option.innerText = device.label || device.deviceId;
        if (device.kind == 'audioinput') {
            devIdx.audio++;
            if (!device.label) {
                option.innerText = `音频设备${devIdx.audio}`;
            }
            document.getElementById("selAudioDevice")!.appendChild(option);
        } else if (device.kind == 'videoinput') {
            devIdx.video++;
            if (!device.label) {
                option.innerText = `视频设备${devIdx.video}`;
            }
            document.getElementById("selVideoDevice")!.appendChild(option);
        }
    });
    } catch(err) {
        console.error(err);
    }
}

// 初始化 txtServer 框内容
function initServerText() {
    let txtServer = document.getElementById("txtServer") as HTMLInputElement;
    if (!txtServer || txtServer.value) {
        return;
    }
    // 根据当前页面地址填充服务器地址
    if (location.protocol == 'https:') {
        txtServer.value = `wss://${location.host}/janus/`;
    } else {
        txtServer.value = `ws://${location.host}/janus/`;
    }
}

