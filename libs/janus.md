# janus.js 的使用

关于 janus.js 的使用可以参考官网的示例文件：
https://github.com/meetecho/janus-gateway/tree/master/html

## 关于 janus.js 的升级注意事项

- 此处的 janus.js 文件是基于官网某个版本 janus.js 的修改，其中增加了部分我们私有的功能（调试过程中发现问题的处理）。若需要升级 janus.js 文件，应当获取的官网最新js后，仔细与之对比内容后再升级。
- 比较稳妥的做法是：逐一对比两个文件的内容差异处，辨认其逻辑确认没问题后仅将需要改动的部分逐一替换为新内容。
- janus.js 中的功能逻辑大多是与后台程序相对应的。所以，在并入时，需要确定后台程序也同步更新后，才能将官网 janus.js 中的相应功能并入。否则，可能会导致程序功能异常。

官网最新 janus.js 获取：https://github.com/meetecho/janus-gateway/blob/master/html/janus.js

## 兼容性
### 浏览器兼容性
WebRTC 相关的API已经能够被当前主流浏览器所支持，当然不同浏览器或者同一浏览器的不同版本之间可能存在一些差异，受支持的程度或者提供的API存在差异。一些差异可以通过 `webrtc-adaptor` 来弥补，比如调用API的不同，但根源上不支持的功能这个浏览器始终是不能支持，比如所支持的视频编码格式。

当前已知受支持的浏览器：
- 桌面端：
    - Chrome 56+
    - Firefox 59+
    - Edge 79+
    - Safari 11+
- 移动端：
    - Chrome Android 56+
    - Firefox Android 59+
    - Safari iOS 11+
    - 微信 最新版
    - 钉钉 最新版
参考：https://caniuse.com/?search=WebRTC

### 使用 https
为避免不必要的麻烦，应当使用 https 来发布和调试。

不少媒体（设备）相关的 API ，在浏览器中都有限制，只能在 https 的域中才能使用，并且最好能提供正规是互联网证书和域名。
比如：`navigator.mediaDevices.getUserMedia()`、`navigator.mediaDevices.enumerateDevices()`，在http下或非正式签名的https下访问时，会导致调用失败。
（非 https 访问，`navigator.mediaDevices` 为 `undefined`，开发调试时可通过调整浏览器参数规避这个问题，但正式发布后必须使用 https 方式访问）

而，像 微信、钉钉 等程序内部加载的网页中，如果不是以正规证书的 https 方式访问，连 `navigator.mediaDevices` 属性都没有，直接导致调用失败无法使用。


## 基本用法

### 依赖程序
janus 依赖 `webrtc-adapter.js` 这是个用于弥补不同浏览器见WebRTC相关API差异的库，可以通过 npm 安装：
```bash
npm install webrtc-adapter
```

### 初始化 janus 库
在使用前，需要先初始化janus库，在初始化完成后才能与后台建立连接创建 janus 的操作对象。
```js
// 导入依赖的 webrtc-adapter.js
import adapter from 'webrtc-adapter';
// 初始化 janus 库
Janus.init({
    // 传入依赖库 webrtc-adapter.js 的引用
    dependencies: Janus.useDefaultDependencies({ adapter }),
    // 初始化成功后的回调
    callback: () => {
        // 这里可以判断当前浏览器是否支持 WebRTC
        if (!Janus.isWebrtcSupported()) {
            console.error("当前浏览器不支持 WebRTC！");
        }
        // 建立 janus 连接等后续操作
        ...
    }
});
```

### 与后台建立连接，创建操作对象
在janus库初始化完成之后，我们就可以与janus后台服务建立连接了。
```js
// 创建 janus 连接，并返回操作对象（后续都使用该对象进行操作）
let janus = new Janus({
    // janus后台服务地址（ws对应http、wss对应https）
    server: 'wss://192.168.103.204:9999/janus/',
    // 建立连接成功后的回调
    success: () => { ... },
    // 当连接销毁时的回调
    destroyed: () => { ... },
    // 连接失败或连接中断时的回调
    error: (error) => { ... }
});
```
注意：由于当代浏览器的安全限制，不少媒体（设备）相关的功能，需要在 https 协议（并且不少还要求是拥有正规证书的域名），才能正常使用。所以，这里建议使用 https（wss），并且最好能提供正规是互联网证书和域名。

### 初始化janus插件
Janus实质上是提供了一套基于WebRTC交互的框架，其中包含了一些内置的默认流程，我们也可以自定义流程，实现我们自己的功能逻辑。Janus的所有交互流程都是基于“插件”机制实现（包括内置的流程，和我们自定义的流程）。可以认为，一个Janus的插件，对应的就是一套信令交互的流程。
若需要使用Janus的这套信令，我们就必选先初始化插件。
```js
// 初始化我们自定义的“janus.plugin.sipserver”插件
janus.attach({
    // 插件名称，在后台注册的插件名称
    plugin: 'janus.plugin.sipserver',
    // 随机产生一个客户端标识，用于区分不同的客户端
    opaqueId: 'sip-' + Janus.randomString(12),
    // 初始化成功后的回调
    success: (pluginHandle) => {
        // 可以把回调传入的插件句柄保存起来，以便后续使用
        self.sipHandle = pluginHandle;
        ...
    },
    // 初始化失败后的回调
    error: (error) => { ... },
    // 接收到服务端插件发送的消息时的回调
    onmessage: (msg, jsep) => { ... },
    // 当远端媒体流通道建立时的回调，可以在这里进行视频、音频元素的绑定动作
    onremotestream: (stream) => { ... },
    // 当本机媒体流就绪时的回调，可以在这里进行视频、音频元素的绑定动作
    onlocalstream: (stream) => { ... },
    // 当通话断开时执行清理动作的回调
    oncleanup: () => { ... }
});
```
注意：插件的初始化过程，同时也伴随着与后台的信令交互，会询问后台是否支持这个插件，如果后台不支持，则会初始化失败。

### 媒体流与元素绑定
当接收到媒体流后，需要将声音播放出来或者图像绘制出来。我们通过将媒体流与audio/video元素进行绑定来实现该功能。
```js
janus.attach({
    ...,
    // 对端的媒体流处理
    onremotestream: (stream) => {
        let videoTracks = stream.getVideoTracks();
        if (videoTracks.length === 0) {
            console.log('No video stream found');
        } else {
            videoTracks[0].enabled = true;
            // 将媒体流绑定到视频标签DOM元素上
            Janus.attachMediaStream(videoElm, stream);
        }
    },
    // 本机的媒体流处理
    onlocalstream: (stream) => {
        // 同上...
    },
    ...
});
```

### 发送信令给后台
通过插件句柄上的`send(...)`方法，我们可以向后台发送信令。
```js
self.sipHandle.send({
    // 发送的信令内容
    message: {
        request: 'register',
        username: 'davy',
        ...
    }
});
```

### 接收并处理后台发过来的信令消息
通过插件初始化传入的`onmessage(...)`回调函数来接收后台发来的信令消息。
```js
janus.attach({
    ...,
    // 接收到后台发来的信令消息
    onmessage = (msg, jsep) => {
        // 其中 msg 是信令消息的内容，传输的基本上都是插件自定义的内容
        // 其中 jsep 是信令消息的结构体（其中包含了 SDP 和 ICE 回应）
    },
    ...
});
```

### 建立通话的媒体协商
在发起呼叫、接听呼叫时，我们需要进行媒体协商，即通过插件句柄上的`createOffer(...)`、`createAnswer(...)`方法来建立通话的媒体协商描述字符串（SDP）。
> 解释：SDP 是媒体协商的描述字符串，它描述了媒体流的组成、流速、编码格式等信息，还带有本机的网络信息（IP、端口等）。
> 由于通话双方所具备的媒体能力可能不同（如：所支持的 音频/视频编码、分辨率、采样率、码率 等），就需要双方一起沟通选择一个双方都支持的，或者选择使用哪种更合适。这整个沟通交互的过程，就是媒体协商。
> 比如，有一方支持 H.264、VP8，另一方只支持 H.264，那么就选择使用 H.264。
> 比如，有一方不支持视频，另一方支持视频，最终也有可能由视频通话降级为音频通话。
```js
...
// 在发起呼叫时，创建发送给对端的SDP
self.sipHandle.createOffer({
    // 媒体选项
    media: {
        audio: true,
        video: true,
    },
    // 成功创建 SDP 后的回调
    success: (jsep) => {
        // 其中 jsep 包含了发送给对端的SDP内容
        // 可以通过 send 发送给对端
        self.sipHandle.send({
            message: { ... },
            jsep: jsep,
        });
    },
    // 产生错误时的回调
    error: (error) => { ... }
});
...
// 在本机接听对端过来的呼叫时，设置对端的SDP给浏览器，并创建发送给对端的SDP
self.sipHandle.createAnswer({
    // 接收到的对端的SDP（给浏览器做参考）
    jsep: remoteJsep,
    // 媒体选项
    media: {
        audio: true,
        video: videoDeviceId, // 这里也可以指定使用哪个摄像头
    },
    // 成功创建 SDP 后的回调
    success: (jsep) => {
        // 其中 jsep 包含了发送给对端的SDP内容
        // 可以通过 send 发送给对端
        self.sipHandle.send({
            message: { ... },
            jsep: jsep,
        });
    },
    // 产生错误时的回调
    error: (error) => { ... }
});
...
// 收到服务端发过来的对端接听通知时
function onRemoteAccepted(message, jsep) => {
    // 将对端的 SDP 内容设置给浏览器（否则无法建立媒体通道）
    self.sipHandle.handleRemoteJsep({ jsep: remoteJsep });
    ...
}
```

注意：由于媒体能力是 硬件、软件 的固有能力，所以 SDP 是由浏览器的API所产生的。而，媒体协商过程也是由浏览器接收到对端的SDP后自动进行，无法人为干预。我们所能做的只是，控制什么时候产生SDP，如何传递给另一方，以及如何将对端传递过来的SDP交给浏览器。
另外，我们可以在接收到对端的 sdp 后，调整其中的部分内容，再设置给浏览器，以到达更好的效果，但这也只是一种 hack 手段，并不是正规的媒体协商过程，如果操作不当反而容易使程序产生错误。没有特殊原因，我们不建议这样做。



## 调试程序

### 断点调试

我们通常调试程序时习惯下断点，监控程序的执行过程，这没有问题。

不过，需要注意的是，WebRTC 是个实时性要求较高的过程，而且大部分是异步过程，在与服务端交互的过程中，若中间某个流程如果被阻塞了一段时间之后，可能会导致整个流程因超时而中止。

所以，遇到这种情况不用感到奇怪，我们还可以结合日志进行调试。建议采用 局部断点+日志输出 的调试方法，在调试过程中可以使用断点调试局部过程，使用日志观察流程的执行，在某些关键节点也可以采用日志输出需要观察的值。在信令交互阶段应当尽量减少断点中断的次数，因为这极有可能因中断的延迟导致整个流程交互逻辑的变化。

### 日志输出

在调试程序时，可以把 janus 的日志开关打开，即可在控制台输出 janus 内部日志。Janus 的内部日志可以帮助我们监控程序的交互流程，和关键节点中的程序状态。

Janus 的内部日志，可通过其初始化参数中的 `debug` 选项开启，如：
```js
Janus.init({
    debug: true,    // 开启janus内部日志输出
    ...             // 别的选项
});
```


