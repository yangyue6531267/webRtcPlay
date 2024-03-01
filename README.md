# 软手柄

基于 WebRTC 的软手柄，基于 janus 开发。

# 注意

注意！注意！注意！

由于通话需要采集 当前PC、设备 的 音频、视频 需要浏览器具备使用这些设备的权限，故 需要通过 https 的方式访问页面。


## 概述
通过 janus 后台的插件 "janus.plugin.sipserver" 实现的软手柄操作，以支持 SIP 的软电话功能。

大致功能实现说明：
- 在 janus-handler.ts 中，初始化时 attach 服务端插件 "janus.plugin.sipserver"，初始化得到 sipcall 属性（后续操作都基于该对象进行）
- 向后台发送消息使用 sipcall.send(...)
- 在插件初始化传入的 onmessage 回调中处理服务端发送过来的消息
- 建立呼叫需要双方先进行 SDP 协商，可通过 sipcall.createOffer(...)/createAnswer(...) 来分别创建 SDP 信息
- 媒体流的 STUN 协商由浏览器的 WebRTC 机制自动完成，可通过 SDP 信息中的 candicate、ice 相关字段控制
- 媒体流建立后可在 onremotestream/onlocalstream 中得到媒体流对象，可通过 Janus.attachMediaStream(...) 绑定到 audio/video 元素上

关于 janus.js 的使用说明，参考：[libs\janus.md](libs/janus.md)

WebRTC 底层的交互流程参考：
- https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Signaling_and_video_calling#signaling_transaction_flow
- https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Connectivity#the_entire_exchange_in_a_complicated_diagram

发起呼叫，建立通话的大致过程：
1. A端 createOffer，将 sdp 通过信令传递给 B端；（sdp包含媒体信息）
2. B端 createAnswer，传入A的sdp，并得到 B的sdp，将 B的sdp 通过信令传递给 A端
3. A端 通过 sdp 构造 ICE candidate，传递给 B；（candidate包含本地网络信息，IP端口等）
4. B端 传入 A的 candidate，得到合适的 B端 candidate，传递给 A；
此时媒体通道建立的信息都已具备，建立媒体通道。


注意：通过“返呼”的形式，将主动发起呼叫操作改为被动接听，以解决移动端发起呼叫与通用话机/App之间不能正常通话的问题。（关键是 sdp 的构造兼容问题）



## 信令流程概述

以下信令交互过程仅针对插件 janus.plugin.sipserver 中的内容进行概要说明。
- S，表示本机发出的 {janus:"message",body:{request:xxx,...}} 中 request 的值。
- R，表示收到服务端发来的 {janus:"event",plugindata:{plugin:"ja...sip...",data:{result:{event:xxx}}}} 中 event 的值。

呼入：
- 呼入后接听：
R:incomingcall -> S:accept -> R:accept_reply
- 呼入后挂断：
R:incomingcall -> S:hangup -> R:haningup

呼出：（返呼）
- 呼出后对端接听：
S:new_call -> R:calling -> R:new_accepted -> S:new_accept -> R:accept_reply
- 呼出后对端挂断：
S:new_call -> R:calling -> R:new_accepted -> S:new_accept -> R:accept_reply -> R:hangup
- 呼出后本机挂断：
S:new_call -> R:calling -> S:hangup -> R:hangingup


通话中挂断：
- 本机挂断：
S:hangup -> R:haningup
- 对端挂断：
R:hangup


## 媒体流建立信令流程

呼出媒体流建立信令流程：
```text
> new_call,transaction:1,uri
< calling,transaction:1,call_id
< new_accepted,transaction:1,call_id,offer:sdp(audio,mid:0,sendrecv,candidate;video,mid:1,sendrecv,candidate;)
> new_accept,transaction:2,answer:sdp(audio,mid:0,sendrecv;video,mid:1,sendrecv;)
< accept_reply,transaction:2,call_id
> candidate,192.168.130.75 40420
> candidate,127.0.0.1 40036
> candidate,127.0.0.1 44096
> candidate,10.89.58.131 41901
> candidate,completed
< webrtcup
< media,audio,receiving,mid:0
< media,video,receiving,mid:1
```

呼入媒体流建立信令流程：
```text
< incomingcall,call_id,username,video:true,audio:true,offer:sdp(audio,mid:0,sendrecv,candidate;video,mid:1,sendrecv,candidate;)
> accept,transaction:1,answer:sdp(audio,mid:0,sendrecv;video,mid:1,sendrecv;)
< accept_reply,call_id
> candidate,192.168.130.75 40420
> candidate,127.0.0.1 40036
> candidate,127.0.0.1 44096
> candidate,10.89.58.131 41901
> candidate,completed
< webrtcup
< media,audio,receiving,mid:0
< media,video,receiving,mid:1
```


## 媒体流建立程序处理过程

呼出过程：
```text
> 发出信令 new_call 给服务器
< 收到信令 new_accepted 得到服务器构造的 offer:sdp
- 根据 offer:sdp 调用 createAnswer() 得到本机 answer:sdp
  - 内部调用 prepareWebrtc() 通过 getUserMedia() 获取本地媒体流对象
  - 得到本地媒体流对象后调用 streamsDone() 并传入得到的媒体流对象
  - 创建 RTCPeerConnection 对象
  - 事件 RTCPeerConnection.onicecandidate 得到本机 candidate ，调用 sendTrickleCandidate() 发给服务端（触发多次）
  - 事件 RTCPeerConnection.ontrack 触发 onremotestream 回调，上层可将对端媒体流对象绑定给播放标签
  - 通过 RTCPeerConnection.addTrack() 将本地媒体流绑定到传输通道上
  - 通过 RTCPeerConnection.setRemoteDescription() 设置对端 offer:sdp
    - 如果对端 offer:sdp 中有 candidate 信息，则调用 RTCPeerConnection.addIceCandidate() 传入该值
    - 调用内部 createAnswer() 创建本机 answer:sdp
      - 通过 RTCPeerConnection.createAnswer() 创建本机 answer:sdp
      - 通过 RTCPeerConnection.setLocalDescription() 设置本机 answer:sdp
      - 触发创建成功回调，带入本机 answer:sdp
> 发出信令 new_accept 并携带 answer:sdp 给服务器
```






