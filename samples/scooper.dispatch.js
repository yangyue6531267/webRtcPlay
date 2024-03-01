/**
 * SCOOPER Dispatch JavaScript library
 * browser support: IE8+, Chrome, FireFox
 * 3rd-part library request: require.js, cometd.js, jquery
 * scooper library request: scooper.sse.js, scooper.util.js
 *
 * @author jiangwj 2016-04
 */

(function (window, factory) {
    if (typeof define === 'function' && define.amd) {
        define('scooper.dispatch', ['jquery', 'scooper.sse'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = window.document ?
            factory(jQuery, scooper.sse) :
            factory(require('jquery'), require('scooper.sse'));
    } else {
        factory(jQuery, scooper.sse);
    }
}(typeof window !== 'undefined' ? window : this, function ($, scooper_sse) {
    'use strict';

    // 使用方法一：（所有框架同域名）
    //
    // 初始化
    // 在顶层框架中调用：
    // scooper.dispatch.initialize("main");
    // 在下层框架中调用：
    // scooper.dispatch.initialize("sub");
    //
    // 设置服务端连接
    // 在顶层框架中调用：
    // scooper.dispatch.login(user,pass);
    // 或（如果在后台已经建立连接，并返回token，则直接设置token，无需调用login）
    // scooper.dispatch.setToken(token);

    // 在多框架(frame)程序中，确保所有框架内仅使用一路调度API；（置于顶层框架中）
    // 如果顶层框架中不存在 scooper.dispatch 的注册，并且与当前框架不在同一个域名中；则直接在本页面中使用。
    // （考虑到第三方公司项目使用 iframe 内嵌我司调度网页）
    // 各框架之间应该使用 window.postMessage 来进行通信。

    // 判断是否处于顶层框架
    if (!scooper.util.isTopFrame()) {
        // 如果在下层框架，则找到顶层框架
        // TODO 使用 DispatchProxy 来向顶层框架转发消息来调用调度相关功能；顶层框架中对这些消息进行处理
        // var topFrame = scooper.util.findTopFrame();
        // // 如果顶层框架中存在 scooper.sse 则直接使用该对象
        // if (typeof(topFrame.window.scooper) != "undefined" && topFrame.window.scooper.dispatch) {
        // 	return window.scooper.dispatch = topFrame.window.scooper.dispatch;
        // }
    }
    // 判断当前页面是否引入过 scooper.util
    if (typeof (scooper.util) == "undefined") throw new Error('scooper.util.js is required!');
    // 判断是否成功导入 scooper.sse
    if (!scooper_sse) throw new Error('scooper.sse.js is required!');

    // 如果与调度网页后台处于不同域名，则需要设置该值
    var remoteBaseUrl = null;

    function getBaseUrl() {
        return remoteBaseUrl ? remoteBaseUrl : scooper.util.baseUrl;
    }

    function apiUrl(path) {
        return getBaseUrl() + 'api' + path;
    }

    // 查找顶层窗口（注：相同域名下使用）
    // 查找调度主连接所在窗口
    function findMainFrame(w) {
        w = w || window;
        try {
            w = w || window;
            //
            while (w != w.parent) {
                if (w.scooper && w.scooper.dispatch
                    && w.scooper.dispatch.getType() == "main") {
                    return w;
                }
                w = w.parent;
            }
            return w.top;
        } catch (e) {
            alert("调度主连接获取异常，请查询是否存在跨域初始的异常");
            return w;
        }
    }

    // constants
    var event_const = {
        CONN_CNG: "connectionChanged",		//连接(调度登录,cometd连接)状态变化通知
        CHANGE_CFG: "changeConfigNotify",		//配置变化通知
        CALL_IN: "callInChanged",			//呼叫：呼入队列变化通知(新增/去除)
        CALL_HOLD: "callHoldChanged",			//呼叫：保持队列变化通知(新增/去除)
        CALL_STS: "telStatusChanged",			//呼叫：号码状态变化通知
        CALL_RECORD: "recordStatusChanged",		//【废弃】
        RECORD_NOTIFY: "recordNotify",			//呼叫：通话记录 & 录音/录像 记录通知
        RECORD_STATUS_NOTIFY: "recordStatusNotify",	//呼叫：通话录音状态
        MEET_STS: "meetStatusChanged",		//会议：会场状态变化通知(新增/去除/锁定/录音/放音/编辑 等)
        MEET_MEM: "meetMemberChanged",		//会议：会场成员状态变化通知(新增/去除/等级)
        MEET_LST: "meetListChanged",			//会议：会场列表变化通知(新增/去除)
        MEET_RECORD_NOTIFY: "meetRecordNotify",					//会议：会议记录 & 会议录音/录像 记录通知
        MEET_MEM_RECORD_NOTIFY: "meetMemRecordNotify",			//会议：会场历史  成员记录通知
        MEET_MEM_RECORD_DEL_ALL_NOTIFY: "meetMemRecordDelNotify",	//会议：会场历史  成员记录清空
        DATA_INIT: "dataInitailized",			//基础：js库数据加载完成通知
        METHOD_RT: "methodResponse",			//基础：api调用响应通知
        PACK_RES_DATA: "respData",				//基础：所有调度请求的响应通知
        SHANDLE_CALL_NOTIFY: "shandleCallNotify",		//软手柄呼叫通知(需要上层业务触发摘机或挂机选择)
        SHANDLE_HANGUP_NOTIFY: "shandleHangupNotify",	//软手柄挂断通知(需要上层业务关闭呼叫弹窗) - 不影响呼入队列功能/交互
        SHANDLE_REGISTER_NOTIFY: "shandleRegisterNotify", //软手柄注册/抢注册相关的通知 shandle_const
        MEET_SCREEN_SET_INDEX: "meetScreenSetIndex", // 分屏信息
        MEET_MIX_SCREEN: "meetMixScreen", // 混屏信息
    };
    var status_const = {
        OFFLINE: "callst_offline",			//离线
        IDLE: "callst_idle",				//空闲
        WAITRING: "callst_waitring",			//预振铃
        CALLRING: "callst_ring",				//振铃中
        CALLANSWER: "callst_answer",				//应答
        CALLHOLD: "callst_hold",				//保持中
        CALLTRANSFING: "callst_transfering",		//转接中
        CALLTRANSFER: "callst_transfer",			//转接
        CALLTURNING: "callst_turning",			//轮询中
        DOUBLETALK: "callst_doubletalk",			//双方通话
        MEET: "callst_meet",				//在会场中
        BREAKIN: "callst_breakin",			//强插
        MONITOR: "callst_monitor",			//监听通话
        CALLINWAITANSWER: "callst_callinwaitanswer",	//呼入未应答
        MONITORRING: "callst_monitorring",		//双方直接通话响铃
        MONITORANSWER: "callst_monitoranswer",		//双方直接通话
        MONITOROFFHOOK: "callst_monitoroffhook"		//监听摘机
    };
    var shandle_const = {
        REGISTER_SUCC: "register_succ",          //软手柄注册成功
        REGISTER_FAIL: "register_fail",          //软手柄注册失败
        REGISTERED: "registered",                //手柄已注册 - 提示已注册，是否要抢注册
        PREEMPT_REGISTER: "preempt_register",    //软手柄被抢注册,当前页注销 - 提示被抢注册，当前页强制注销注册
        //PREEMPT_REGISTER_SUCC: "preempt_register_succ", //手柄抢注册成功 - REGISTER_SUCC代替
        PREEMPT_REGISTER_FAIL: "preempt_register_fail",  //手柄抢注册失败 - 可能是号码非软手柄注册，无法触发强制注销
        DEREGISTER: "deregister",                //软手柄注销,注册状态中断

        "register_succ": "软手柄注册成功!",
        "register_fail": "软手柄注册失败!",
        "registered": "手柄已注册!",
        "preempt_register": "软手柄被抢注册,当前页注销!",
        //"preempt_register_succ": "软手柄被抢注册,当前页注销",
        "preempt_register_fail": "手柄抢注册失败!",
        "deregister": "软手柄注销"
    }

    /**
     * 调度相关操作
     *
     * 事件：
     * connectionChanged
     * callInChanged
     * telStatusChanged
     * meetStatusChanged
     * meetMemberChanged
     */
    function Dispatch() {
        var self = this;
        var dispatch = this;
        var initialized = false;
        var subscribed = false; 		//消息订阅注册标志位
        var connected = false; 			// 与调度后台的连接状态
        var webConnected = false; 		//与Web后台的cometd连接状态
        var firstWebConnected = true;
        var firstLogin = true;
        var scAuth = null;				// sc-auth.js 中的鉴权管理对象
        var token = '';
        /** @deprecated */
        var accountToken = '';
        var account = '';
        var accountPo = '';				//操作员对象
        var loginExamine = '';  		//客户端登入后网页端登入标识位
        var useShandle = false;			//是否使用软手柄(在初始化时设置,优先级大于配置开关)
        var sse = new scooper.SSE("dispatch");		//消息订阅对象
        var dom = document.createElement('div');	//js库派发事件的dom元素

        /** 获取当前的 token 值，以 scAuth 中的值为优先 */
        function _token() {
            return (scAuth ? scAuth.token : null) || token;
        }

        /**SSE 连接状态变化回调*/
        function onSSEConnectionCallback(sseConnected) {
            webConnected = sseConnected;
            // fire events
            fireListens(event_const.CONN_CNG, (sseConnected && connected));
            //初始化消息订阅
            if (webConnected && firstWebConnected) {
                linkCometdMsg();
            }
            if (sseConnected) firstWebConnected = false;
        }

        /**服务端过来的登录状态 变化通知*/
        function onConnected(msg) {
            // {"data":true,"channel":"/conn"}
            var data = msg.data;
            if (!data || account != data.account) return;
            connected = data.connected;
            // fire events
            fireListens(event_const.CONN_CNG, connected);
        }

        /**调度后台派发的 change_cfg 通知*/
        function onConfigChanged(msg) {
            // {type,value}
            var data = msg.data;
            fireListens(event_const.CHANGE_CFG, data);
        }

        /**设置对应网页调度后台服务地址  默认"/dispatch-web"*/
        this.setRemoteBaseUrl = function (val) {
            sse.setRemoteBaseUrl(val);
        };

        /** 连接标识，如果是Web服务端调用接口连接；需要先使用代码设置该值，再进行后续操作（呼叫等） */
        this.getToken = function () {
            return _token();
        };
        /**
         * @deprecated
         * 切换账号token  -  接口废弃
         */
        this.setToken = function (val) {
            var needLoad = (token != val);
            //
            this.token = val;
            //
            if (needLoad) {
                // 当设置新的token时重新订阅
                initialized = false;
                self.initialize();
                //
                loadConnection();
                loadAllDatas();
            }
        };

        /**
         * @deprecated
         * 登录账号的 token；当采用js方式内嵌到其它共用 DB_SC_CORE.T_ACCOUNT 的程序可实现后台自动登录；
         */
        this.getAccountToken = function () {
            return accountToken;
        };
        /**@deprecated*/
        this.setAccountToken = function (val) {
            var changed = (accountToken != val);
            //
            accountToken = val;
            //
            if (changed) {
                pullDispatchToken();
            }
        };

        /**获取当前帐号的操作员信息*/
        this.getDispatchOper = function () {
            return accountPo;
        }

        /**@deprecated*/
        function pullDispatchToken() {
            var param = {
                'accountToken': accountToken
            };
            $.getJSON(getBaseUrl() + 'api/conn/getDispatchToken', param, function (ret) {
                if (ret && ret.code == 0) {
                    account = ret.data.account;
                    self.setToken(ret.data.token);
                }
            });
        }

        /** 呼叫相关操作 */
        this.calls = new Call();
        /** 会议相关操作 */
        this.meets = new Meet();
        /** 是否连接调度后台 */
        this.isConnected = function () {
            return _token() && connected && webConnected;
        };
        /** js库初始化 */
        this.initialize = function (conf) {
            if (initialized) return;
            initialized = true;
            // 初始化 sc-auth.js 中的鉴权对象
            scAuth = conf && conf["scAuth"];
            //1、设置是否使用软手柄的标志位
            useShandle = conf["useShandle"];
            //2、初始化sse消息对象并设置回调方法
            sse.setConnectionCallback(onSSEConnectionCallback);
            sse.initialize();
            //3、初始化获取loginExamine,保障操作员异地登录不抢占
            getLoginExamine();

            //4、页面心跳机制
            $.getJSON(apiUrl('/conn/getHearTime'), "", function (ret) {
                if (ret.code == 0 && ret.data) {
                    setInterval(heartKeep, ret.data);
                } else {
                    setInterval(heartKeep, 45000);
                }
            });

            //5、数据加载完全,初始化软手柄(保障调度登录 & 操作员手柄信息获取)
            dispatch.listen(event_const.DATA_INIT, function (data) {
                if (conf && conf.useShandle) {
                    // Websocket()
                    window.shandleUtil.init();
                } else console.log("上层业务设置不使用软手柄！");
            })
            //6、刷新动作监听
            window.onunload = function (e) {
                if (conf && conf.useShandle) {
                    //刷新界面前注销软手柄
                    window.shandleUtil.deregister();
                    return "deregister shandle";
                }
            };
        };

        // function Websocket() {
        //     //建立连接
        //     let prefix = window.location.host;
        //     let protocol = window.location.protocol;
        //     let auth = window.auth
        //     let wsPrefix = 'ws://';
        //     if (protocol && protocol.indexOf('https') > -1) {
        //         wsPrefix = 'wss://'
        //     }
        //     let accountPos = scooper.dispatch.getDispatchOper();
        //     const opAsrServer = wsPrefix + prefix + '/dispatch-web/websocket/' + accountPos["id"];
        //     let ws = new WebSocket(opAsrServer);
        //     ws.onopen = function () {
        //         console.log("建立websocket连接")
        //         let param = {
        //             topic: "heart",
        //             data: "ping",
        //         }
        //         ws.send(JSON.stringify(param));
        //         setInterval(() => {
        //             ws.send(JSON.stringify(param));
        //         }, 5000)
        //     };
        //     ws.onmessage = function (evt) {
        //         let data = evt.data;
        //         if (data === "soft-register") {
        //             window.shandleUtil.init();
        //         }
        //     }
        //     //连接发生错误的回调方法
        //     ws.onerror = function (event) {
        //         console.log("WebSocket:发生错误");
        //         //避免重复连接
        //         let lockReconnect = false, tt;
        //         //websocket重连
        //         if (lockReconnect) {
        //             return;
        //         }
        //         lockReconnect = true;
        //         tt && clearTimeout(tt);
        //         tt = setTimeout(function () {
        //             console.log('重连中...');
        //             lockReconnect = false;
        //             Websocket()
        //         }, 4000);
        //     };
        // }

        /**初始化消息订阅 和 回调设置*/
        function linkCometdMsg() {
            //操作员登录返回不存在  或 cometd连接网页调度后台未建立成功,则拒绝触发消息订阅
            if (!accountPo || !webConnected) return;
            //获取调度操作员信息
            var accId = accountPo.id;
            if (!subscribed) {
                subscribed = true;

                var accTopic = accId ? "/" + accId : "";	//主题通道追加账号标识
                console.log("连接成功，开启消息推送");
                sse.subscribe('/conn', onConnected);
                sse.subscribe(accTopic + '/server/config', onConfigChanged);
                //增加数据状态变化通知
                self.calls.initialize(accId, useShandle);
                self.meets.initialize(accId);
            }
        }

        /** 网页端和后台创建心跳机制 */
        var heartKeep = function () {
            if (_token()) {
                var jsonData = {
                    "token": _token(),
                    "loginExamine": loginExamine
                }
                $.getJSON(apiUrl('/conn/heartKeep'), jsonData, function (ret) {
                });
            }
        }

        /** 销毁 */
        this.destroy = function () {
            var accId = accountPo.id;
            self.calls.destroy(accId);
            self.meets.destroy(accId);
            initialized = false;
            subscribed = false;
        };

        /** 设置客户端登入后的网页端同步登入字符串 */
        this.setloginExamine = function (loginExamines) {
            if (loginExamines && loginExamines != "") {
                loginExamine = loginExamines;
            }
        };

        /** 获取url中的loginExamine,支持操作员多处登录(防止两个客户端-非网页,指两个web后台) */
        function getLoginExamine() {
            if (loginExamine) return loginExamine;

            var url = window.location.href;
            try {
                if (url.indexOf("loginExamine") == -1 && window.top) {
                    url = window.top.location.href;
                }
                var portRule = /loginExamine=\d+&?/;
                var loginExamineParam = url.match(portRule);
                if (loginExamineParam) {
                    loginExamine = loginExamineParam[0].replace("loginExamine=", "").replace("&", "");
                    console.log("loginExamine:" + loginExamine);
                }
                return loginExamine;
            } catch (e) {
                console.log("获取loginExamine异常", e);
            }
        }

        /** 与调度服务器建立连接
         * @param user 账号名
         * @param pass 密码,SHA256加密
         * */
        this.login = function (user, pass) {
            $.getJSON(apiUrl('/conn'), {'user': user, 'pass': pass}, function (ret) {
                // {code,data{token,reuse}}
                account = ret.data.account;
                token = ret.data.token;
                if (ret.data.accountPo) {
                    accountPo = ret.data.accountPo;
                    if (firstLogin) {
                        linkCometdMsg();
                        loadAllDatas();
                    }
                    firstLogin = false;
                }
            });
        };
        /** 根据token和后台建立服务 */
        this.loginByToken = function (loginToken, fn) {
            $.getJSON(apiUrl('/conn/connectionByToken'), {
                'token': loginToken,
                "loginExamine": loginExamine
            }, function (ret) {
                if (ret.code == 0) {
                    // {code,data{token,reuse}}
                    account = ret.data.account;
                    token = ret.data.token;
                    if (ret.data.accountPo) {
                        accountPo = ret.data.accountPo;
                        if (firstLogin) {
                            linkCometdMsg();
                            loadAllDatas();
                        }
                        firstLogin = false;
                    }
                } else {
                    console.log(ret.message);
                }
                if (fn) fn(ret);
            });
        };

        /**
         * @deprecated
         * 获取登录连接状态
         **/
        function loadConnection() {
            var param = {'token': _token()};
            //
            $.getJSON(apiUrl("/conn/connected"), param, function (ret) {
                if (ret) {
                    connected = ret.data.connected;
                    if (connected) {
                        account = ret.data.account;
                    } else {
                        account = '';
                    }
                    fireListens(event_const.CONN_CNG, connected);
                }
            });
        }

        /** 如果是已经登录，加载所有数据 */
        function loadAllDatas() {
            // 检查数据是否都加载完成，加载完成则派发事件
            var chk_complete = (function () {
                var _count = 0;
                var _max = 0;// 总共需加载的次数
                return function () {
                    _max++;
                    return function (o) {
                        _count++;
                        if (_count >= _max) {
                            fireListens(event_const.DATA_INIT, true);
                        }
                    };
                };
            })();
            //
            self.calls.listStatus(chk_complete());
            self.calls.listCallIn(chk_complete());
            self.meets.listMeets(chk_complete());
        }

        /** 操作员调度登出 */
        this.logout = function () {
            if (!_token()) return;
            $.getJSON(apiUrl('/conn/logout'), {'token': _token()}, function () {
                token = '';
            });
        };
        /** 向后台发送 change_cfg 消息*/
        this.sendChangeCfg = function (type, value, fn) {
            checkLogin();
            var param = {
                'token': _token(),
                'type': type,
                'value': value
            };
            $.getJSON(apiUrl('/conn/changeCfg'), param, function (data) {
                fireMethodResponse(data);
                if (fn)
                    fn(data);
            });
        };
        /** 暂离 */
        this.centerOut = function (telArr, fn) {
            checkLogin();
            if (!telArr || telArr.length == 0) throw new Error("telArr can't be empty!");
            var param = {
                'token': _token(),
                'tels': telArr.join(",")
            };
            $.getJSON(apiUrl('/dispatch/centerOut'), param, function (data) {
                fireMethodResponse(data);
                if (fn) fn(data);
            });
        };
        /** 取消暂离 */
        this.centerIn = function (fn) {
            checkLogin();
            $.getJSON(apiUrl('/dispatch/centerIn'), {'token': _token()}, function (data) {
                fireMethodResponse(data);
                if (fn) fn(data);
            });
        };
        /** 手柄鉴权 */
        this.setOperTel = function (tel, fn) {
            checkLogin();
            if (!tel) throw new Error("tel can't be empty!");
            var param = {
                'token': _token(),
                'tel': tel
            }
            $.getJSON(apiUrl('/dispatch/setOperTel'), param, function (data) {
                fireMethodResponse(data);
                if (fn) fn(data);
            });
        };
        /**js库事件派发管理*/
        this.listen = function (evtType, fn) {
            $(dom).on(evtType, fn);
        };
        this.unlisten = function (evtType, fn) {
            $(dom).unbind(evtType, fn);
        };
        this.fireListen = function (evtType, data) {
            fireListens(evtType, data);
        };

        //
        function fireListens(evtType, data) {
            var dataCopy = $.extend(true, {}, data);
            var e = $.Event(evtType, {'msg': dataCopy});
            if (dataCopy && dataCopy.timeStamp) {
                e.timeStamp = dataCopy.timeStamp;
            }
            $(dom).trigger(e);
        }

        /**调用js库方法的统一回调事件派发*/
        function fireMethodResponse(data) {
            fireListens(event_const.METHOD_RT, data);
        }

        /**验证是否登录，或者 token 是否被设置*/
        function checkLogin() {
            if (!_token()) {
                throw new Error('token is empty! (you need login or set token first)');
            }
        }

        /**呼叫相关操作*/
        function Call() {
            var self = this;
            // 当前的号码状态集合 tel:{tel,status,recording}
            var telStatus = {};
            // 当前的呼入号码集合 {tel,time}
            var callIns = [];
            //上层配置是否使用软手柄
            var useShandle;

            this.requestCallStatus = function (fn) {
                if (fn) {
                    fn(telStatus);
                }
            };
            this.requestTelStatus = function (tel, fn) {
                if (fn) {
                    fn(telStatus[tel]);
                }
            };
            this.requestCallIns = function (fn) {
                if (fn) fn(callIns);
            }

            //
            function callUrl(path) {
                return apiUrl('/call' + path);
            }

            /** 号码状态变化消息接收回调方法 */
            function onCallStatusNotify(msg) {
                // {"data":{"status":"callst_idle","recording":false,"tel":"5010"},"channel":"/call/status"}
                var data = msg.data;
                //
                var sts = updateTelStatus(data);
                // fire events
                if (data.notifyType) {
                    fireListens(event_const.CALL_RECORD, sts);
                } else {
                    fireListens(event_const.CALL_STS, sts);
                }
            }

            /** 保持队列变化 - 消息接收回调方法 */
            function onCallHoldNotify(msg) {
                var data = msg.data;
                fireListens(event_const.CALL_HOLD, data);
            }

            /** 呼叫录音状态变化 - 消息接收回调方法 TO_DO 重复 */
            function onCallRecordStatusNotify(msg) {
                var data = msg.data;
                //
                var sts = updateTelStatus(data);
                // fire events
                if (data.notifyType) {
                    fireListens(event_const.CALL_RECORD, sts);
                }
            }

            /**通话记录 & 通话录音/录像  通知变化 - 消息接收回调方法*/
            function onRecordNotify(msg) {
                //{businessId, notifyType:呼叫类型, callId:呼叫id, recId:数据记录id, recordStatus:录音状态, callerNumber:主叫号码, calledNumber}
                //record_call_notify: 录音;  record_call_av_notify: 录像通知;  call_record_notify:通话记录
                var data = msg.data;
                //        	console.log("recordCall", data);
                if (data.notifyType) {
                    fireListens(event_const.RECORD_NOTIFY, data);
                }
            }

            /**呼叫录音状态变化 - 消息接收回调方法  TO_DO 重复*/
            function onRecordStatusNotify(msg) {
                //{tel:通知号码, conNumber通话号码, recordStatus}
                var data = msg.data;
                var tel = data.tel;
                if (tel) {
                    var sts = telStatus[data.tel];
                    if (sts) {
                        sts.recording = data.recordStatus == "ON";
                    }
                }
                //        	console.log("recordStatus", data);
                fireListens(event_const.RECORD_STATUS_NOTIFY, data);
            }

            /** 跟新号码状态缓存 */
            function updateTelStatus(data) {
                var sts = telStatus[data.tel];
                if (sts) {
                    sts.tel = data.tel;
                    sts.notifyType = data.notifyType;

                    sts.handleNumber = data.handleNumber;
                    sts.conNumber = data.conNumber;

                    sts.timeStamp = data.timeStamp;
                    sts.time = data.time;
                    sts.meetLevel = data.meetLevel;
                    if (!data.notifyType) {
                        sts.status = data.status;
                        sts.meetId = data.meetId;
                        sts.videoInfo = data.videoInfo;
                        sts.recording = data.recording;
                    } else {
                        sts.businessId = data.businessId;
                        sts.callId = data.callId;
                        sts.dataRecid = data.dataRecid;
                        if ("record_call_notify" == data.notifyType) {
                            sts.recording = data.recording;
                        }
                    }
                } else {
                    telStatus[data.tel] = sts = {
                        'tel': data.tel,
                        'status': data.status,
                        'recording': data.recording,
                        'handleNumber': data.handleNumber,
                        'meetId': data.meetId,
                        'videoInfo': data.videoInfo,
                        'timeStamp': data.timeStamp,

                        'businessId': data.businessId,
                        'callId': data.callId,
                        'conNumber': data.conNumber,
                        'dataRecid': data.dataRecid,
                        'meetLevel': data.meetLevel
                    };
                }
                return sts;
            }

            /** 呼入队列变化通知 */
            function onCallInNotify(msg) {
                // {"data":{"tel":"5010","add":true,"time":14001010111,"videoInfo":"video/audio"},"channel":"/call/in","usrLevel":2}
                var data = msg.data;
                //
                var type;
                if (data.add) {
                    type = 'add'
                    addCallIn(data);
                } else {
                    type = 'del';
                    removeCallInByTel(data.tel);
                }
                // fire events
                fireListens(event_const.CALL_IN, {'type': type, 'data': data, 'usrLevel': data.usrLevel});
            }

            /**按号码 在呼入队列中查找*/
            function findCallInByTel(tel) {
                for (var i = 0; i < callIns.length; i++) {
                    var c = callIns[i];
                    if (c && c.tel == tel) {
                        return c;
                    }
                }
                return null;
            }

            /** 添加到呼入队列中 */
            function addCallIn(data) {
                var callInTemp = findCallInByTel(data.tel);
                if (callInTemp != null) {
                    callInTemp.time = data.time;
                    callInTemp.usrLevel = data.usrLevel;
                    callInTemp.suffixNum = data.suffixNum;
                    callInTemp.videoInfo = data.videoInfo;
                } else {
                    callIns.push(data);
                }
            }

            /** 从呼入队列中移除 */
            function removeCallInByTel(tel) {
                for (var i = callIns.length - 1; i >= 0; i--) {
                    if (callIns[i] && callIns[i].tel == tel) {
                        callIns.splice(i, 1);
                    }
                }
            }

            /**组呼结果 - 消息接收回调方法*/
            function onRespData(msg) {
                var data = msg.data;
                /*{id: 10000, type: 'make_call', result:'success||fail', reason: '', 其他具体根据调度协议来识别}*/
                var type = data.type;
                fireListens(event_const.PACK_RES_DATA, {'type': type, 'data': data});
            }

            /**软手柄抢注册通知，当前页注销软手柄*/
            function onShandlePreemptRegister(msg) {
                var data = msg.data;
                var tel = data.tel;
                var accountPo = scooper.dispatch.getDispatchOper();
                if (accountPo && accountPo["mainTel"] == tel) {
                    // 160修改修改registed
                    if (!shandleUtil.getSHandle() || !shandleUtil.getSHandle().registed) {
                        console.log("软手柄未注册，无需注销!");
                        return;
                    } else {
                        shandleUtil.fireRegisterEvent(shandle_const.PREEMPT_REGISTER);
                    }
                    shandleUtil.deregister();
                }
            }

            this.initialize = function (accId, useShandle) {
                //
                this.useShandle = useShandle;
                var accTopic = accId ? "/" + accId : "";	//主题通道追加账号标识
                sse.subscribe(accTopic + '/call/status', onCallStatusNotify);
                sse.subscribe(accTopic + '/call/hold', onCallHoldNotify);
                sse.subscribe(accTopic + '/call/record/status', onCallRecordStatusNotify);
                sse.subscribe(accTopic + '/call/record', onRecordNotify);
                sse.subscribe(accTopic + '/call/recordStatus', onRecordStatusNotify);
                sse.subscribe(accTopic + '/call/in', onCallInNotify);
                sse.subscribe(accTopic + '/respData', onRespData);
                if (useShandle) {
                    sse.subscribe("/shandlePreemptRegister", onShandlePreemptRegister);
                }
            }
            this.destroy = function (accId) {
                var accTopic = accId ? "/" + accId : "";	//主题通道追加账号标识
                sse.unsubscribe(accTopic + '/call/status');
                sse.unsubscribe(accTopic + '/call/hold');
                sse.unsubscribe(accTopic + '/call/record/status');
                sse.unsubscribe(accTopic + '/call/record');
                sse.unsubscribe(accTopic + '/call/recordStatus');
                sse.unsubscribe(accTopic + '/call/in');
                sse.unsubscribe(accTopic + '/respData');
            }
            //
            this.listStatus = function (fn) {
                checkLogin();
                $.getJSON(callUrl('/listStatus'), {'token': _token(), 'loginExamine': loginExamine}, function (data) {
                    // {code,total,list:[{tel,status,recording}]}
                    if (!data.list) data.list = data.data;
                    if (data && data.list && data.list.length) {
                        for (var i = 0; i < data.list.length; i++) {
                            updateTelStatus(data.list[i]);
                        }
                    }
                    //
                    if (fn) fn(data);
                });
            };
            /** 查询呼入队列 */
            this.listCallIn = function (fn) {
                checkLogin();
                $.getJSON(callUrl('/listCallIn'), {'token': _token()}, function (data) {
                    // {code,total,list:[{tel,time}]}
                    if (!data.list) data.list = data.data;
                    if (data && data.list && data.list.length) {
                        for (var i = 0; i < data.list.length; i++) {
                            addCallIn(data.list[i]);
                        }
                    }
                    //
                    if (fn) fn(data);
                });
            };
            /**查询呼入号码对象*/
            this.findCallInByTel = function (tel) {
                checkLogin();
                if (!callIns) return false;
                var callInFind = null;
                $.each(callIns, function (i, callIn) {
                    if (callIn.tel == tel) {
                        callInFind = callIn;
                        return false;
                    }
                })
                return callInFind;
            }
            /** 查询保持列表 */
            this.listHold = function (fn) {
                checkLogin();
                $.getJSON(callUrl('/listHold'), {'token': _token()}, function (data) {
                    if (!data.list) data.list = data.data;
                    if (fn) fn(data);
                });
            }

            //
            function requestNoParam(path, fn) {
                checkLogin();
                $.getJSON(callUrl(path), {'token': _token()}, function (data) {
                    fireMethodResponse(data);
                    if (fn) fn(data);
                });
            }

            function requestWithTel(path, tel, businessId, fn) {
                checkLogin();
                $.getJSON(callUrl(path), {'token': _token(), 'tel': tel, 'businessId': businessId}, function (data) {
                    fireMethodResponse(data);
                    if (fn) fn(data);
                });
            }

            function requestWithGroupId(path, groupId, autoAnswer, allAudience) {
                checkLogin();
                $.getJSON(callUrl(path), {
                    'token': _token(),
                    'groupId': groupId,
                    'autoAnswer': autoAnswer,
                    'allAudience': allAudience
                }, function (data) {
                    fireMethodResponse(data);
                });
            }

            //
            this.makeCall = function (tel, businessId) {
                requestWithTel('/makeCall', tel, businessId);
            };
            this.makeAudioCall = function (tel, businessId) {
                requestWithTel('/makeAudioCall', tel, businessId);
            };
            this.makeVideoCall = function (tel, businessId) {
                requestWithTel('/makeVideoCall', tel, businessId);
            };
            this.hungUp = function (tel) {
                requestWithTel('/hungup', tel);
            };
            this.shandleHungUp = function () {
                window.shandleUtil.hungUp();
            };
            this.answer = function (tel, businessId) {
                requestWithTel('/answer', tel, businessId, function (data) {
                    if (data.code == 0) {
                        window.shandleUtil.dispAnswer(tel);
                    }
                });
            };
            this.shandleAnswer = function (isVideoAnswer) {
                window.shandleUtil.answer(isVideoAnswer);
            };
            /**软手柄抢注册*/
            this.shandlePreemptRegister = ()=> {
                if (useShandle) {
                    console.log("未启动软手柄注册,无法抢注册");
                    return;
                }
                checkLogin();
                var mainTel = scooper.dispatch.getDispatchOper()["mainTel"];
                //触发抢注册,通知原注册方注销软手柄
                requestNoParam('/shandlePreemptRegister', function (data) {
                    if (data.code == 0) {
                        var count = 0;
                        //定时任务判断是否原注册注销，触发新的软手柄注册动作
                        var shandlePreemptRegisterIndex = setInterval(function () {
                            if (count == 5) {
                                //抢注册失败, 可能原因是号码非软手柄注册,无法强制注销原注册
                                // 如果还未注销就直接注册，c端去踢掉在线用户
                                shandleUtil.register(mainTel);
                                // shandleUtil.fireRegisterEvent(shandle_const.PREEMPT_REGISTER_FAIL);
                                clearInterval(shandlePreemptRegisterIndex);
                                return;
                            }
                            scooper.dispatch.calls.requestTelStatus(mainTel, function (data) {
                                if (data && data.status == status_const.OFFLINE) {   //强制注销完成，发起软手柄注册
                                    shandleUtil.register(mainTel);
                                    clearInterval(shandlePreemptRegisterIndex);
                                }
                            });
                            count++;
                        }, 1000);
                    }
                })
            }
            this.answerAll = function () {
                requestNoParam('/answerAll', function (data) {
                    //如果是软手柄，群答后会触发挂断和重新的呼叫通知，并且类型为self_call_handle,软手柄js库会自动应答
                });
            };
            this.rollCall = function (telArr) {
                checkLogin();
                if (!telArr || telArr.length == 0) throw new Error("telArr can't be empty!");
                $.getJSON(callUrl('/rollCall'), {'token': _token(), 'tels': telArr.join(",")}, function (data) {
                    fireMethodResponse(data);
                });
            };
            this.stopRollCall = function () {
                checkLogin();
                requestNoParam('/stopRollCall', function (data) {
                    fireMethodResponse(data);
                });
            };
            /**
             * @param telArr 轮询操作号码数组
             * @param isOnce true:一人接通就结束轮询
             * @param isJoinMeet true:多人入会(依次呼叫入会，使用场景较少，一般使用选呼) - 该模式下isOnce建议设置为false
             */
            this.groupTurn = function (telArr, isOnce, isJoinMeet) {
                checkLogin();
                if (!telArr || telArr.length == 0) throw new Error("telArr can't be empty!");
                var param = {
                    'token': _token(),
                    'tels': telArr.join(","),
                    'isOnce': isOnce,
                    'isJoinMeet': isJoinMeet
                }
                $.getJSON(callUrl('/groupTurn'), param, function (data) {
                    fireMethodResponse(data);
                });
            };
            this.stopGroupTurn = function () {
                checkLogin();
                requestNoParam('/stopGroupTurn', function (data) {
                    fireMethodResponse(data);
                });
            };
            this.hold = function (tel) {
                requestWithTel('/hold', tel);
            };
            this.unhold = function (tel) {
                requestWithTel('/unhold', tel);
            };
            this.transfer = function (from, to, businessId) {
                checkLogin();
                $.getJSON(callUrl('/transfer'), {
                    'token': _token(),
                    'from': from,
                    'to': to,
                    'businessId': businessId
                }, function (data) {
                    fireMethodResponse(data);
                });
            };
            this.retrieve = function (tel) {
                requestWithTel('/retrieve', tel);
            };
            this.tripleMonitor = function (tel) {
                requestWithTel('/tripleMonitor', tel);
            };
            this.tripleBreakin = function (tel) {
                requestWithTel('/tripleBreakin', tel);
            };
            this.tripleHungup = function (tel) {
                requestWithTel('/tripleHungup', tel);
            };
            this.callRecord = function (tel) {
                requestWithTel('/callRecord', tel);
            };
            this.callRecordEnd = function (tel) {
                requestWithTel('/callRecordEnd', tel);
            };
            this.groupCall = function (groupId, autoAnswer, allAudience) {
                requestWithGroupId('/groupCall', groupId, autoAnswer, allAudience);
            };
            this.groupCancel = function (groupId) {
                requestWithGroupId('/groupCancel', groupId);
            };
            /**
             * @param meetId 传值，则新建会场meetId设置成传值,采取新建会场的模式进行(要保证唯一)
             * @param autoAnswer  是否需要被叫自动应答，需要被叫支持 boolean
             * @param allAudience 是否都禁言入会(广播模式) boolean
             */
            this.selectCall = function (telArr, meetId, autoAnswer, allAudience, fn) {
                if (!telArr || telArr.length == 0) throw new Error("telArr can't be empty!");
                checkLogin();
                var param = {
                    'token': _token(),
                    'meetId': meetId,
                    'tels': telArr.join(','),
                    'autoAnswer': autoAnswer,
                    'allAudience': allAudience
                }
                $.getJSON(callUrl('/selectCall'), param, function (data) {
                    if (fn) fn(data);
                    fireMethodResponse(data);
                });
            };
            this.selectCancel = function (meetId) {
                var param = {
                    'token': _token(),
                    'meetId': meetId
                }
                $.getJSON(callUrl('/selectCancel'), param, function (data) {
                    fireMethodResponse(data);
                });
            };
            /**
             * 组呼同振
             * @param memIds      操作的成员id列表 Array
             * @param autoAnswer  是否需要被叫自动应答，需要被叫设备支持 boolean
             * @param allAudience 是否都禁言入会(广播模式) boolean
             */
            this.groupSame = function (memIds, autoAnswer, allAudience) {
                if (!memIds || memIds.length == 0) throw new Error("memIds can't be empty!");
                checkLogin();
                var param = {
                    'token': _token(),
                    'memberIds': memIds.join(","),
                    'autoAnswer': autoAnswer,
                    'allAudience': allAudience
                }
                $.getJSON(callUrl('/groupSame'), param, function (data) {
                    fireMethodResponse(data);
                });
            };

            //
            /**@deprecated*/
            function requestGroupNotify(param, type, times, notifyId, confirm) {
                checkLogin();
                //
                param['token'] = _token();
                if (type) param["type"] = type;
                if (times && !isNaN(times)) param["times"] = times;
                if (notifyId) param["notifyId"] = notifyId;
                if (confirm) param["confirm"] = confirm;
                //
                $.ajax({
                    type: 'post',
                    traditional: true,
                    url: callUrl('/groupNotify'),
                    data: param,
                    success: function (ret) {
                        fireMethodResponse(ret);
                    }
                });
            }

            /**
             * @param type  notify : 通知音录音，call_record : 通话录音，text : TTS（playfile携带文字）。
             */
            this.groupNotify = function (groupId, files, type, times, notifyId) {
                if (!groupId) throw new Error("groupId can't be empty!");
                if (!files) throw new Error("files can't be empty!");
                //
                var param = {
                    "groupId": groupId,
                    "files": files
                };
                //
                requestGroupNotify(param, type, times, notifyId);
            };
            /**
             * @param type  notify:通知音录音;  call_record:通话录音  text:TTS（playfile携带文字）。
             */
            this.selectNotify = function (telArr, files, type, times, notifyId, confirm) {
                if (!telArr || telArr.length == 0) throw new Error("选呼成员不能为空!");
                if (!files) throw new Error("files can't be empty!");
                //
                var param = {
                    "tels": telArr.join(","),
                    "files": files
                };
                if (type == "text") param["files"] = files;
                //
                requestGroupNotify(param, type, times, notifyId, confirm);
            };
            // 同振
            this.makeCallSame = function (telArr, meetId) {
                checkLogin();
                if (!telArr) throw new Error("同振号码不能为空!");
                //
                var param = {
                    "token": _token(),
                    "tels": telArr.join(","),
                    "meetId": meetId
                };

                $.getJSON(callUrl('/makeCallSame'), param, function (data) {
                    fireMethodResponse(data);
                });
            };
            /**
             * 通知音操作
             * @param tel
             * @param title
             * @param opType  record:录制; play:播放通知音; del:删除通知音;
             *                  re_record:重新录制，对某个通知音进行重录
             *                  finish:结束录制，只有录制和重新录制后调用结束录制才有效。
             * @param filename 通知音文件名,当opType为play、del和re_record时, 必须携带该值。
             */
            this.notifyRecordOP = function (tel, title, opType, filename) {
                checkLogin();
                var param = {
                    "token": _token(),
                    "tel": tel,
                    "title": title,
                    "opType": opType,
                    "filename": filename
                }
                $.getJSON(callUrl('/notifyRecordOP'), param, function (data) {
                    fireMethodResponse(data);
                });
            }
        }

        // 会议相关操作
        function Meet() {
            var self = this;
            // 当前存在的会场集合 {id,name,locked,playvoice,recording,members}
            // members:[{meetId,tel,level}]
            var meets = [];

            this.requestMeets = function (fn) {
                if (fn) fn(meets);
            }
            this.requestMeet = function (meetId, fn) {
                var meet = findMeetById(meetId);
                if (fn) fn(meet ? meet : null);
            }
            this.requestMeetMembers = function (meetId, fn) {
                var meet = findMeetById(meetId);
                if (fn) fn(meet ? meet.members : null);
            };
            this.requestMeetMember = function (meetId, tel, fn) {
                if (fn) {
                    fn(findMeetMember(meetId, tel));
                }
            };

            //
            function findMeetMember(meetId, tel) {
                var meet = findMeetById(meetId);
                if (!meet) return null;
                for (var i = 0; i < meet.members.length; i++) {
                    var mem = meet.members[i];
                    if (mem && mem.tel == tel) {
                        return mem;
                    }
                }
                return null;
            }

            //
            function meetUrl(path) {
                return apiUrl('/meet' + path);
            }

            //
            function onMeetStatusNotify(msg) {
                // {"data":{"playvoice":false,"meetId":"1008","destroy":false,"recording":false,"meetName":"默认","locked":false},"channel":"/meet/status"}
                var data = msg.data;
                if (!data || !data.meetId) return;
                console.log("onMeetStatusNotify data===", data);
                //
                var meet = findMeetById(data.meetId);
                if (meet == null) {
                    // add
                    meet = addMeetByData(data);
                } else {
                    //会场是否重新激活，如其他操作员登录，登出，再登录，
                    //本操作员在三种状态切换时都会一直存在这个登出操作员的会场，但是再登录时需要理解为会场新增，触发会场列表变动通知
                    var meetReBuild = false;
                    // meet destory.update by yeb
                    if (data.hasOwnProperty('destroy')) {
                        if (data.meetName == data.meetId && !data.destroy) {
                            meetReBuild = true;
                        }
                        meet.destroy = data.destroy;
                    }
                    if (data.destroy === true) {
                        removeMeetById(data.meetId);
                    }
                    // update
                    if (data.createUserName != null) meet.createUserName = data.createUserName;
                    if (data.meetCreateId != null) meet.createId = data.meetCreateId;
                    if (data.meetName != null) meet.meetName = data.meetName || data.meetId;
                    if (data.hasOwnProperty('locked')) meet.locked = data.locked;
                    if (data.hasOwnProperty('playvoice')) meet.playvoice = data.playvoice;
                    if (data.hasOwnProperty('recording')) meet.recording = data.recording;

                    if (data.hasOwnProperty('meetAccess')) meet.meetAccess = data.meetAccess;
                    if (data.hasOwnProperty('timeBegin') && data.timeBegin) meet.timeBegin = data.timeBegin;
                    if (data.hasOwnProperty('timeEnd')) meet.timeEnd = data.timeEnd;
                    if (data.hasOwnProperty('passwdSpeaker')) meet.passwdSpeaker = data.passwdSpeaker;
                    if (data.hasOwnProperty('passwdAudience')) meet.passwdAudience = data.passwdAudience;
                    if (data.hasOwnProperty('meetType')) {
                        meet.meetType = data.meetType;
                        if (meet.meetType === "MEET_RESERVE") {
                            if (data.hasOwnProperty('members')) {
                                meet.members = data.members || [];
                            }
                        }
                    }
                    meet.chairman = data.chairman ? data.chairman : '';
                    meet.ctrlName = data.ctrlName ? data.ctrlName : '';
                    meet.ctrlTel = data.ctrlTel ? data.ctrlTel : '';
                    meetReBuild && fireListens(event_const.MEET_LST, {'type': 'add', 'meet': meet});
                }
                // fire events
                fireListens(event_const.MEET_STS, meet);
            }

            function onMeetJoinNotify(msg) {
                // {"data":{"meetId":"1008","tel":"5012","level":"speak"},"channel":"/meet/status"}
                var data = msg.data;
                //
                var meet = findMeetById(data.meetId) || addMeetByData(data);
                //
                for (var i = 0; i < meet.members.length; i++) {
                    var mem = meet.members[i];
                    if (mem && mem.tel == data.tel) return;
                }
                meet.members.push({
                    'meetId': data.meetId,
                    'tel': data.tel,
                    'level': data.level // speak|audience|chairman
                });
                // fire events
                fireListens(event_const.MEET_MEM, {
                    'type': 'join',
                    'meetId': data.meetId,
                    'tel': data.tel,
                    'level': data.level
                });
            }

            function onMeetLeaveNotify(msg) {
                // {"data":{"meetId":"1008","tel":"5012"},"channel":"/meet/status"}
                var data = msg.data;
                if (!data || !data.meetId) return;
                //
                var meet = findMeetById(data.meetId);
                if (!meet) return;
                //
                for (var i = meet.members.length - 1; i >= 0; i--) {
                    var mem = meet.members[i];
                    if (mem && mem.tel == data.tel) {
                        meet.members.splice(i, 1);
                    }
                }
                // fire events
                fireListens(event_const.MEET_MEM, {'type': 'leave', 'meetId': data.meetId, 'tel': data.tel});
            }

            function onMeetMemStsNotify(msg) {
                // {"data":{"meetId":"1008","tel":"5012","level":"speak"},"channel":"/meet/status"}
                var data = msg.data;
                if (!data || !data.meetId) return;
                //
                console.log("onMeetMemStsNotify data===", data);
                var meet = findMeetById(data.meetId);
                if (!meet) return;
                //
                for (var i = meet.members.length - 1; i >= 0; i--) {
                    var mem = meet.members[i];
                    if (mem && mem.tel == data.tel) {
                        mem.level = data.level;
                    }
                }
                // fire events
                fireListens(event_const.MEET_MEM, {
                    'type': 'level',
                    'meetId': data.meetId,
                    'tel': data.tel,
                    'level': data.level
                });
            }

            /**会场记录  会议录音/录像记录 通知*/
            function onMeetRecordNotify(msg) {
                //{businessId, notifyType: 通知类型, recId:记录id, meetId:会议id, recordStatus:ON|OFF 会议录音状态，只用于录音通知}
                //record_ call_notify: 录音;  record_call_av_notify: 录像通知;  meet_record_notify:会议记录
                var data = msg.data;
                //        	console.log("meetRecordCall", data);
                if (data.notifyType) {
                    fireListens(event_const.MEET_RECORD_NOTIFY, data);
                }
            }

            /**会场历史 成员记录 通知*/
            function onMeetMemRecordNotify(msg) {
                var data = msg.data;
                fireListens(event_const.MEET_MEM_RECORD_NOTIFY, data);
            }

            /**会场历史 成员记录清空 通知(会场结束  或  人员清退超过1分钟)*/
            function onMeetMemRecordDelNotify(msg) {
                var data = msg.data;
                fireListens(event_const.MEET_MEM_RECORD_DEL_ALL_NOTIFY, data);
            }

            /** 会场分屏信息通知 */
            function onMeetScreenSetIndex(msg) {
                var data = msg.data;
                fireListens(event_const.MEET_SCREEN_SET_INDEX, data);
            }


            /** 混屏开关通知 */
            function onMeetMixScreen(msg) {
                var data = msg.data;
                fireListens(event_const.MEET_MIX_SCREEN, data);
            }

            //
            function findMeetById(meetId) {
                for (var i = 0; i < meets.length; i++) {
                    var meet = meets[i];
                    if (meet && meet.id == meetId) {
                        return meet;
                    }
                }
                return null;
            }

            //
            function findMeetAndUpdate(meet) {
                if (!meet) return null;
                for (var i = 0; i < meets.length; i++) {
                    var o = meets[i];
                    if (o && o.id == meet.id) {
                        return updateMeetObject(o, meet);
                    }
                }
                return null;
            }

            // (oldValue,newValue)
            function updateMeetObject(o, n) {
                o.createId = n.createId || o.createId;
                o.meetName = n.meetName || o.meetName;
                o.type = n.type || o.type;
                o.locked = n.locked || o.locked;
                o.playvoice = n.playvoice || o.playvoice;
                o.recording = n.recording || o.recording;
                o.chairman = n.chairman || o.chairman;
                o.ctrlName = n.ctrlName || o.ctrlName;
                o.members = n.members.length ? n.members : o.members;
                o.timeBegin = n.timeBegin || o.timeBegin;

                o.timeEnd = n.timeEnd || o.timeEnd;
                o.meetType = n.meetType || o.meetType;
                o.meetAccess = n.meetAccess || o.meetAccess;
                o.passwdSpeaker = n.passwdSpeaker || o.passwdSpeaker;
                o.passwdAudience = n.passwdAudience || o.passwdAudience;
                o.createUserName = n.createUserName || o.createUserName;

                return o;
            }

            /**转化后台获取会议信息城前端会议缓存对象*/
            function transMeetData(data) {
                if (!data) return null;

                var meet = {
                    'createId': data.meetCreateId,
                    'id': data.meetId,
                    'meetName': data.meetName || data.meetId,
                    'type': data.meetType,
                    'locked': data.locked,
                    'playvoice': data.playvoice,
                    'recording': data.recording,
                    'chairman': data.chairman,
                    'ctrlName': data.ctrlName,
                    'ctrlTel': data.ctrlTel,
                    'members': [], // {meetId,tel,level}
                    'timeBegin': data.timeBegin || "",
                    'timeEnd': data.timeEnd || "",
                    'meetType': data.meetType || "",
                    'meetAttr': data.meetAttr || "",
                    'meetAccess': data.meetAccess || "",
                    'passwdSpeaker': data.passwdSpeaker || "",
                    'passwdAudience': data.passwdAudience || "",
                    'createUserName': data.createUserName || "",
                };
                meet.meetType = meet.meetType || (meet.meetAttr || "");
                //
                if (data.members) {
                    for (var i = 0; i < data.members.length; i++) {
                        var mem = data.members[i];
                        meet.members.push({
                            'meetId': mem.meetId,
                            'tel': mem.tel,
                            'level': mem.level
                        });
                    }
                }
                return meet;
            }

            function addMeetByData(data) {
                var meet = transMeetData(data);
                // add or update
                var o = findMeetAndUpdate(meet);
                if (o) {
                    meet = o;
                } else {
                    meets.push(meet);
                    // fire events
                    fireListens(event_const.MEET_LST, {'type': 'add', 'meet': meet});
                }
                return meet;
            }

            //
            function removeMeetById(meetId) {
                for (var i = meets.length - 1; i >= 0; i--) {
                    var meet = meets[i];
                    if (meet && meet.id == meetId) {
                        meets.splice(i, 1);
                        // fire events
                        fireListens(event_const.MEET_LST, {'type': 'remove', 'meet': meet});
                    }
                }
            }

            //
            this.initialize = function (accId) {
                var accTopic = accId ? "/" + accId : "";	//主题通道追加账号标识
                sse.subscribe(accTopic + '/meet/status', onMeetStatusNotify);
                sse.subscribe(accTopic + '/meet/join', onMeetJoinNotify);
                sse.subscribe(accTopic + '/meet/leave', onMeetLeaveNotify);
                sse.subscribe(accTopic + '/meet/memsts', onMeetMemStsNotify);
                sse.subscribe(accTopic + '/meet/record', onMeetRecordNotify);
                sse.subscribe(accTopic + '/meet/memRecord', onMeetMemRecordNotify);
                sse.subscribe(accTopic + '/meet/memRecordDelALL', onMeetMemRecordDelNotify);
                sse.subscribe('/meetScreenSetIndex', onMeetScreenSetIndex);
                sse.subscribe('/meetMixScreen', onMeetMixScreen);
            }
            this.destroy = function (accId) {
                var accTopic = accId ? "/" + accId : "";	//主题通道追加账号标识
                sse.unsubscribe(accTopic + '/meet/status');
                sse.unsubscribe(accTopic + '/meet/join');
                sse.unsubscribe(accTopic + '/meet/leave');
                sse.unsubscribe(accTopic + '/meet/memsts');
                sse.unsubscribe(accTopic + '/meet/record');
                sse.unsubscribe(accTopic + '/meet/memRecord');
                sse.unsubscribe(accTopic + '/meet/memRecordDelALL');
                sse.unsubscribe('/meetScreenSetIndex', onMeetScreenSetIndex);
                sse.unsubscribe('/meetMixScreen', onMeetMixScreen);
            }
            //
            this.listMeets = function (fn) {
                checkLogin();
                $.getJSON(meetUrl('/listMeets'), {'token': _token()}, function (data) {
                    if (!data.list) data.list = data.data;
                    // {code,total,list:[{meetId,meetName,recording,playvoice,locked,members:[{meetId,tel}]}]}
                    if (data && data.list && data.list.length) {
                        for (var i = 0; i < data.list.length; i++) {
                            addMeetByData(data.list[i]);
                        }
                    }
                    //
                    if (fn) fn(data);
                });
            };

            this.listMyMeets = function (fn) {
                checkLogin();
                $.getJSON(meetUrl('/listMyMeets'), {'token': _token()}, function (data) {
                    if (!data.list) data.list = data.data;
                    // {code,total,list:[{meetId,meetName,recording,playvoice,locked,members:[{meetId,tel}]}]}
                    if (data && data.list && data.list.length) {
                        for (var i = 0; i < data.list.length; i++) {
                            addMeetByData(data.list[i]);
                        }
                    }
                    //
                    if (fn) fn(data);
                });
            };

            /**获取操作员相关会议列表的 成员记录列表*/
            this.listMeetsRecord = function (fn) {
                checkLogin();
                $.getJSON(meetUrl('/listMeetsRecord'), {'token': _token()}, function (data) {
                    if (fn) fn(data);
                });
            }
            /**@deprecated 获取单个会议  的成员记录列表*/
            this.listDispMeetRecord = function (meetId, fn) {
                checkLogin();
                var param =
                    $.getJSON('/dispatch-web/data/dispMeetRecord/listDispMeetRecord', {
                        'meetId': meetId,
                        'token': _token()
                    }, function (data) {
                        if (fn) fn(data);
                    });
            }
            //获取单个会场
            this.getMeet = function (meetId, fn) {
                checkLogin();
                $.getJSON(meetUrl('/getMeet'), {'token': _token(), 'meetId': meetId}, function (data) {
                    if (data.code == 0) {
                        var meet = transMeetData(data.data);
                        if (fn) fn(meet);
                    }
                });
            };
            this.createMeet = function (name, businessId, fn) {
                checkLogin();
                $.getJSON(meetUrl('/createMeet'), {
                    'token': _token(),
                    'name': name,
                    'businessId': businessId
                }, function (data) {
                    if (fn) fn(data);
                    fireMethodResponse(data);
                })
            };
            this.createMeetDetail = function (name, businessId, fn, meetAccess, meetAttr, timeBegin,
                                              timeEnd, passwdSpeaker, passwdAudience, meetMembers, defineAttr, videoInfo) {
                checkLogin();
                var param = {
                    'token': _token(),
                    'businessId': businessId,
                    'name': name,
                    'meetAccess': meetAccess,
                    'meetAttr': meetAttr || 'MEET_INSTANT',
                    'timeBegin': timeBegin,
                    'timeEnd': timeEnd,
                    'passwdSpeaker': passwdSpeaker,
                    'passwdAudience': passwdAudience,
                    'meetMembers': meetMembers,
                    'defineAttr': defineAttr,
                    'videoInfo': videoInfo
                }
                $.getJSON(meetUrl('/createMeet'), param, function (data) {
                    if (fn) fn(data);
                    fireMethodResponse(data);
                })
            }
            this.editMeet = function (meetId, meetName, fn, meetAccess, meetAttr, timeBegin,
                                      timeEnd, passwdSpeaker, passwdAudience, meetMembers) {
                checkLogin();
                var param = {
                    'token': _token(),
                    'meetId': meetId,
                    'name': meetName,
                    'meetAccess': meetAccess,
                    'meetAttr': meetAttr || 'MEET_RESERVE',
                    'timeBegin': timeBegin,
                    'timeEnd': timeEnd,
                    'passwdSpeaker': passwdSpeaker,
                    'passwdAudience': passwdAudience,
                    'meetMembers': meetMembers
                }
                _loadJson(meetUrl('/editMeet'), param, function (data) {
                    if (fn) fn(data);
                    fireMethodResponse(data);
                })
            }

            //
            function requestWithMeetId(path, meetId) {
                checkLogin();
                $.getJSON(meetUrl(path), {'token': _token(), 'id': meetId}, function (data) {
                    fireMethodResponse(data);
                });
            }

            //
            this.endMeet = function (meetId) {
                requestWithMeetId('/endMeet', meetId);
            }
            this.destroyMeet = function (meetId) {
                requestWithMeetId('/destroyMeet', meetId);
            }
            this.lock = function (meetId) {
                requestWithMeetId('/lock', meetId);
            }
            this.unlock = function (meetId) {
                requestWithMeetId('/unlock', meetId);
            }
            this.startRecord = function (meetId) {
                requestWithMeetId('/startRecord', meetId);
            }
            this.stopRecord = function (meetId) {
                requestWithMeetId('/stopRecord', meetId);
            }
            this.startPlayVoice = function (meetId) {
                requestWithMeetId('/startPlayVoice', meetId);
            }
            this.stopPlayVoice = function (meetId) {
                requestWithMeetId('/stopPlayVoice', meetId);
            }
            // meet-member actions
            //
            function requestAsMeetMember(path, meetId, tel, level, businessId, autoAnswer, meetAccess, controllerTel,memType) {
                checkLogin();
                if (!level) level = '';
                $.getJSON(meetUrl(path), {
                    'token': _token(), 'id': meetId, 'tel': tel, 'level': level,
                    'businessId': businessId, 'autoAnswer': autoAnswer, 'meetAccess': meetAccess,
                    'controllerTel': controllerTel, 'memType': memType
                }, function (data) {
                    fireMethodResponse(data);
                });
            }

            this.getMeetRecord = function (meetId, tel, fn) {
                var param = {
                    'token': _token(),
                    'meetId': meetId,
                    'tel': tel
                };
                $.getJSON(meetUrl('/getMeetRecord'), param, function (data) {
                    if (fn) fn(data);
                    fireMethodResponse(data);
                })
            };
            this.joinMember = function (meetId, tel, businessId, level, autoAnswer, memType) {
                meetId = meetId || account;
                requestAsMeetMember('/joinMember', meetId, tel, level, businessId, autoAnswer, memType);
            };
            /**
             * @param memberArr  批量入会人员列表,格式  ["号码1,角色","号码2","号码3,角色"] Ex: ["1001,speak", "1001,chairman","1003"]
             * @param
             */
            this.joinMembers = function (meetId, memberArr, businessId, autoAnswer) {
                meetId = meetId || account;
                if (!memberArr || memberArr.length == 0) throw new Error("memberArr can't be empty!");
                var members = memberArr.join(";")
                _loadJson(meetUrl("/joinMembers"), {
                    'token': _token(),
                    'id': meetId,
                    'members': members,
                    'businessId': businessId,
                    'autoAnswer': autoAnswer
                }, function (data) {
                    fireMethodResponse(data);
                });
            };
            this.joinAudioMember = function (meetId, tel, businessId, level, autoAnswer, controllerTel, memType) {
                meetId = meetId || account;
                requestAsMeetMember('/joinAudioMember', meetId, tel, level, businessId, autoAnswer, controllerTel, memType);
            };
            this.joinVideoMember = function (meetId, tel, businessId, level, autoAnswer, meetAccess,controllerTel, memType) {
                meetId = meetId || account;
                requestAsMeetMember('/joinVideoMember', meetId, tel, level, businessId, autoAnswer, meetAccess, controllerTel, memType);
            };
            this.changeMemberLevel = function (meetId, tel, level) {
                requestAsMeetMember('/changeMemberLevel', meetId, tel, level);
            };
            this.changeMemberToController = function (meetId, controllerTel) {
                requestAsMeetMember('/changeMemberController', meetId, controllerTel);
            };
            this.changeMemberToSpeaker = function (meetId, tel) {
                self.changeMemberLevel(meetId, tel, "speak");
            };
            this.changeMemberToAudience = function (meetId, tel) {
                self.changeMemberLevel(meetId, tel, "audience");
            };
            this.changeMemberToChairman = function (meetId, tel) {
                self.changeMemberLevel(meetId, tel, "chairman");
            };

            function requestAsLiteMeetMember(path, meetId, tel) {
                checkLogin();
                $.getJSON(meetUrl(path), {'token': _token(), 'id': meetId, 'tel': tel}, function (data) {
                    fireMethodResponse(data);
                });
            }

            this.kickMember = function (meetId, tel) {
                requestAsLiteMeetMember('/kickMember', meetId, tel);
            };
            this.privateTalk = function (meetId, tel) {
                requestAsLiteMeetMember('/privateTalk', meetId, tel);
            };
            this.backToMeet = function (meetId, tel) {
                requestAsLiteMeetMember('/backToMeet', meetId, tel);
            };
        }
    };

    function SHandleUtil() {
        var self = this;
        //软手柄对象
        var shandle = null;
        //软手柄配置参数清单
        var shandleSet;
        /*
         * 调度应答号码
         * 调度应答为选择号码的过程，不会实际出发摘机动作，
         * 在触发调度应答后，首先触发挂断，然后再触发呼入，必须在再次触发呼入后进行自动摘机的动作(否则找不到对应的呼入对象)
         */
        var dispAnswerTel;
        /** 是否具备视频通话的业务能力(后台配置)*/
        var videoEnable = false;

        this.init = function (initConunt) {
            let isHttps = 'https:' == document.location.protocol ? true : false
            // if (!isHttps) {
            //     console.error("当前网页不是https,无法初始化软手柄");
            //     return;
            // }

            var accountPO = scooper.dispatch.getDispatchOper();
            if (!accountPO || !accountPO["mainTel"]) {
                initConunt = initConunt ? initConunt : 0;
                if (initConunt < 5) {
                    setTimeout(function () {
                        self.init(++initConunt);
                    }, 1000);
                }
                console.error("主手柄未获取到，无法初始化软手柄");
                return;
            }
            var mainTel = accountPO["mainTel"];
            $.post(getBaseUrl() + "conf/shandle", {},  (data)=> {
                    if (data.code == 0 && data.data) {
                    self.shandleSet = data.data.shandle;
                    //判断是否配置开启软手柄业务能力
                    var searchParams = new URLSearchParams(window.location.href);
                    // 使用 get() 方法检索参数值
                    var parameterValue = searchParams.get('memJoinType');
                    if (parameterValue) {
                        self.shandleSet["disp.shandle.use"]='true'
                    }
                    
                    if (self.shandleSet["disp.shandle.use"] !== "true") {
                        console.log("配置禁用软手柄！");
                        return;
                    } else {
                        //判断软手柄对应号码是否注册，如注册则派发通知，做弹窗提示并支持抢注册
                        scooper.dispatch.calls.listStatus((data)=> {
                            if (data.code == 0) {
                                var findMainTelOnline = false;
                                $.each(data.data, function (i, telStatus) {
                                    if (telStatus.tel == mainTel && telStatus.status != status_const.OFFLINE) {
                                        findMainTelOnline = true;
                                        return false;
                                    }
                                })
                                if (findMainTelOnline) {
                                    self.fireRegisterEvent(shandle_const.REGISTERED);
                                } else {
                                    self.register(mainTel);
                                }
                            }
                        })
                    }
                } else {
                    console.error("获取软手柄配置失败")
                }
            });
        }

        this.register = function (mainTel) {
            if (!self.shandleSet) {
                console.log("未加载软手柄配置！");
                return;
            }

            if (self.shandleSet["disp.shandle.use"] !== "true") {
                console.log("配置禁用软手柄！");
                return;
            }
            //软手柄振铃音
            var ringFilePath = (remoteBaseUrl || "/dispatch-web") + "/data/file/downloadRingFile";
            var ringFile = self.shandleSet["disp.shandle.ring.use"] == "true" ? ringFilePath : "";
            requirejs(home, ["scooper.shandle"], function (ShandleHandle) {
                // console.log("ShandleHandle", ShandleHandle)
                self.videoEnable = self.shandleSet["disp.shandle.video.enable"];
                if (shandle) {
                    shandle.destroy()
                    shandle = null
                }
                console.log('registerResult', '正在进行注册...')
                // console.log("janus地址-----",self.shandleSet["disp.shandle.janus.url"])
                // let server = 'wss://192.168.130.204:9999/janus/'
                var ishttps = 'https:' == document.location.protocol ? true : false
                let server = self.shandleSet['disp.shandle.janus.url'];
                // let server = 'ws://192.168.106.57:8188/janus/'
                // let server = ''

                // if (ishttps) {
                //     //https
                //     server = 'wss://' + document.location.host + '/janus/'
                //     // console.log('servr2---',server);
                // } else {
                //     //http
                //     server = 'ws://' + document.location.host + '/janus/'
                //     // console.log('servr3---',server);
                // }
                try {
                    ShandleHandle.createSoftHandler({
                        configs: {
                            janusUrl: server,
                            autoRegister: true,
                            ringFile: ringFile,
                        },
                        registerInfo: {
                            username: mainTel,
                            //显示名称
                            displayName: mainTel,
                            //sipserver ip
                            sipServerIp: self.shandleSet["disp.shandle.sipserver.ip"] || "127.0.0.1",
                            //sipserver port
                            sipServerPort: self.shandleSet["disp.shandle.sipserver.port"] || 5060,
                        },
                    }).then((res) => {
                        shandle = res;
                        console.log('创建软手柄成功', shandle)
                        // 初始化WebRTC事件
                        self.initListenEvent(ShandleHandle.SoftHandlerEvent);
                    }, (err) => {
                        console.log(err)
                    })
                } catch (e) {
                    console.error(e)
                    console.log('registerResult', `注册失败:${e.message}`)
                }
            })
        }
        /**注销软手柄*/
        this.deregister = function () {
            if (shandle && shandle.registed) {
                shandle.unregister();
                shandle.destroy()
            }
        }

        this.audioClose = function (mute) {
            // 输入设备禁音
            if (shandle) {
                shandle.audioInputMuted = mute;
            }
        }

        this.audioOutClose = function (mute) {
            // 输出设备静音
            if (shandle) {
                shandle.audioOutputMuted = mute;
            }
        }

        this.shadleType = function (type,{isFunction,mute}) {
            if (shandle) {
                isFunction?shandle.deviceControl[type](mute):shandle[type]=mute;
            }
        }

        this.updateVoiceSpeaker = function (mute) {
            //切换音频设备 切换音频输出为 外放/听筒（移动端）
            if (shandle) {
                shandle.deviceControl.updateVoiceSpeaker(mute);
            }
        }

        this.enableCamera = function (mute) {
            // 开启/关闭摄像头。
            if (shandle) {
                shandle.deviceControl.enableCamera(mute);
            }
        }

        this.getSHandle = function () {
            return shandle;
        }

        /**
         * 调度应答
         */
        this.dispAnswer = function (tel) {
            if (!shandle) return;
            self.dispAnswerTel = tel;
            //调度应答发起超过5s后,调度应答的号码还是设置的应答号码,则表示应答流程异常，清除缓存的应答号码
            setTimeout(function () {
                if (self.dispAnswerTel == tel) {
                    self.dispAnswerTel = "";
                }
            }, 5000);
        }

        /**
         * 软手柄应答
         * @param isVideoAnswer boolean,是否视频应答（同时要判断是否配置支持了软手柄视频应答功能,传入参数方式优先）
         */
        this.answer = function (isVideoAnswer) {
            if (!shandle) return;
            var videoSendEnable = self.videoEnable === "true";
            // if (undefined !== isVideoAnswer) {
            //     videoSendEnable = isVideoAnswer;
            // }
            // shandle.answer({ audioSend: true, videoSend: videoSendEnable, audioRecv: true, videoRecv: false })
            shandle.answer({video: true})
        }

        /**
         * 软手柄应答
         * @param isVideoAnswer boolean,是否视频应答（同时要判断是否配置支持了软手柄视频应答功能）
         */
        this.hungUp = function () {
            if (!shandle) return;
            //挂断
            shandle.hangup();
        }

        /**
         * 初始化事件监听
         */
        this.initListenEvent = function (SoftHandlerEvent) {
            shandle.on(SoftHandlerEvent.REG_RESULT, (e) => {
                if (e.event == "succ") {	//注册成功
                    console.log('registerResult', '注册成功')
                    self.fireRegisterEvent(shandle_const.REGISTER_SUCC);
                } else if (e.event == "fail") {	//注册失败
                    console.log(
                        'registerResult',
                        `注册失败,错误码:${e.code},错误原因:${e.reason}`
                    )
                } else {
                    if (e.code == "9001") {  //软手柄已注册,确认是否抢注册
                        self.fireRegisterEvent(shandle_const.REGISTERED);
                    } else self.fireRegisterEvent(shandle_const.REGISTER_FAIL);
                }
            });
            shandle.on(SoftHandlerEvent.RINGING, (e) => {
                console.log(info, e);
            });
            shandle.on(SoftHandlerEvent.HANGUP, (e) => {
                scooper.dispatch.fireListen(event_const.SHANDLE_HANGUP_NOTIFY, e);
                console.log('inCallInfo', '已挂断', e)
            })

            shandle.on(SoftHandlerEvent.HANGUP_RESULT, (e) => {
                console.log('inCallInfo', '本机主动挂机完成,挂断', e)
            })
            shandle.on(SoftHandlerEvent.IN_CALL, (e) => {
                var info = e.displayName + "(号码: " + e.telNumber + ") 来电";
                var notifyType = e.notifyType;
                console.log(info, e);
                //type 枚举
                //1.call_dispatch_out  其他操作员 调度呼叫or邀请入会, 通知号码为发起动作的操作员手柄号(也可配制成中心号)
                //2.call_dispatch	   调度呼入通知,通知号码为调度中心号
                //3.other_call_handle  其他操作员进行‘除’ 调度呼叫or邀请入会 外的调度操作,如:组呼通知，点名等, 通知号码为操作中心号
                //4.self_call_handle   操作员调度呼叫or拉会or群组操作 自己, 通知号码为操作中心 - 自动应答
                //5.user_call_user	   直接拨号呼叫,通知号码为发起人号码

                //调度应答，如果来电是刚刚(5s)以内调度操作的应答号码,则直接触发自动摘机
                if (self.dispAnswerTel == e.telNumber && notifyType === "call_dispatch") {
                    console.log("调度呼入应答,操作号码:" + e.telNumber);
                    var videoSendEnable = (e.video == true && self.videoEnable);
                    shandle.answer({audioSend: true, videoSend: videoSendEnable, audioRecv: true, videoRecv: false})
                } else {
                    //调度呼入通知不派发到业务上层(调度呼入本身有呼入面板,避免重复)
                    if (notifyType === "call_dispatch") return;
                    //派发给上层业务，显示来显弹窗
                    scooper.dispatch.fireListen(event_const.SHANDLE_CALL_NOTIFY, e);
                }
            })
            // IN_CALL_ANSWER
            shandle.on(SoftHandlerEvent.IN_CALL_ANSWER, (e) => {
                console.log('IN_CALL_ANSWER', '来电', e)
                shandle.answer({video:true})
            });
        }

        /**
         * 软手柄注册，抢注册等相关通知
         */
        this.fireRegisterEvent = function (code, msg) {
            var data = {
                "type": code,
                "msg": msg || shandle_const[code]
            }
            console.log("软手柄注册/抢注册状态通知, type:" + data.type + ", msg:" + data.msg);
            scooper.dispatch.fireListen(event_const.SHANDLE_REGISTER_NOTIFY, data);
        }

        this.callbacks = {
            janusErrorCallback: function () {
                self.fireRegisterEvent(shandle_const.REGISTER_FAIL, "janus服务连接失败或中断!");
            },
            janusDestroyCallback: function () {
                self.fireRegisterEvent(shandle_const.DEREGISTER, "janus服务连接销毁,软手柄注销!");
            },
            pluginErrorCallback: function () {
                self.fireRegisterEvent(shandle_const.REGISTER_FAIL, "janus服务登录失败!");
            }
        }
    }

    /** 子页面中的；通过引用来调用主页面中的功能（相同域名下） */
    function DispatchSub() {
        // 如果在与主连接在同一域名下，则直接通过框架引用对象

        // 对主框架中 scooper.dispatch 的引用（相同域名下）
        var dispatch = null;
        //
        this.initialize = function () {
            var topFrame = findMainFrame();
            dispatch = topFrame.scooper.dispatch;
        };
        this.destroy = function () {
            dispatch = null;
        };
        this.getToken = function () {
            checkInit();
            return dispatch.getToken();
        };
        this.setToken = function (val) {
            checkInit();
            dispatch.setToken(val);
        };
        this.getAccountToken = function () {
            checkInit();
            if (dispatch.hasOwnProperty('getAccountToken')) {
                return dispatch.getAccountToken();
            }
            return '';
        }
        this.setAccountToken = function (val) {
            checkInit();
            if (dispatch.hasOwnProperty('setAccountToken')) {
                dispatch.setAccountToken(val);
            }
        }

        this.sendChangeCfg = function (type, value, fn) {
            checkInit();
            dispatch.sendChangeCfg(type, value, fn);
        };
        //暂离
        this.centerOut = function (telArr, fn) {
            checkInit();
            dispatch.centerOut(telArr, fn);
        };
        //取消暂离
        this.centerIn = function (fn) {
            checkInit();
            dispatch.centerIn(fn);
        };
        //手柄鉴权
        this.setOperTel = function (tel, fn) {
            checkInit();
            dispatch.setOperTel(tel, fn);
        };

        //
        function checkInit() {
            if (!dispatch) {
                throw new Error("not initialized");
            }
        }

        //
        this.login = function (user, pass) { /* do nothing */
        };
        //
        this.loginByToken = function (token, fn) {    //父层已登录，子层只做转台反馈
            $.getJSON(apiUrl('/conn/connectionByToken'), {'token': token}, function (ret) {
                if (fn) fn(ret);
            });
        };

        this.setloginExamine = function (loginExamines) {
        };
        this.logout = function () { /* do nothing */
        };
        //
        this.listen = function (evtType, fn) {
            checkInit();
            dispatch.listen(evtType, fn);
        };
        this.unlisten = function (evtType, fn) {
            checkInit();
            dispatch.unlisten(evtType, fn);
        };
        this.fireListen = function (evtType, data) {
            checkInit();
            dispatch.fireListen(evtType, data);
        };
        this.getDispatchOper = function () {
            checkInit();
            return dispatch.getDispatchOper();
        };
        // 呼叫相关操作
        this.calls = {
            'requestCallStatus': function (fn) {
                checkInit();
                dispatch.calls.requestCallStatus(fn);
            },
            'requestTelStatus': function (tel, fn) {
                checkInit();
                dispatch.calls.requestTelStatus(tel, fn);
            },
            'requestCallIns': function (fn) {
                checkInit();
                dispatch.calls.requestCallIns(fn);
            },
            'listStatus': function (fn) {
                checkInit();
                dispatch.calls.listStatus(fn);
            },
            'listHold': function (fn) {
                checkInit();
                dispatch.calls.listHold(fn);
            },
            'listCallIn': function (fn) {
                checkInit();
                dispatch.calls.listCallIn(fn);
            },
            'findCallInByTel': function (tel) {
                checkInit();
                return dispatch.calls.findCallInByTel(tel);
            },
            /** 呼叫 */
            'makeCall': function (tel, businessId) {
                checkInit();
                dispatch.calls.makeCall(tel, businessId);
            },
            /** 呼叫 */
            'makeAudioCall': function (tel, businessId) {
                checkInit();
                dispatch.calls.makeAudioCall(tel, businessId);
            },
            /** 视频呼叫 */
            'makeVideoCall': function (tel, businessId) {
                checkInit();
                dispatch.calls.makeVideoCall(tel, businessId);
            },
            'hungUp': function (tel) {
                checkInit();
                dispatch.calls.hungUp(tel);
            },
            /** 软手柄挂断 */
            'shandleHungUp': function () {
                checkInit();
                dispatch.calls.shandleHungUp();
            },
            /** 应答 */
            'answer': function (tel, businessId) {
                checkInit();
                dispatch.calls.answer(tel, businessId);
            },
            /**软手柄应答*/
            'shandleAnswer': function (isVideoAnswer) {
                checkInit();
                dispatch.calls.shandleAnswer(isVideoAnswer);
            },
            /**软手柄抢注册*/
            'shandlePreemptRegister': function () {
                checkInit();
                dispatch.calls.shandlePreemptRegister();
            },
            'answerAll': function () {
                checkInit();
                dispatch.calls.answerAll();
            },
            "rollCall": function (telArr) {
                checkInit();
                dispatch.calls.rollCall(telArr);
            },
            "stopRollCall": function () {
                checkInit();
                dispatch.calls.stopRollCall();
            },
            "groupTurn": function (telArr, isOnce, isJoinMeet) {
                checkInit();
                dispatch.calls.groupTurn(telArr, isOnce, isJoinMeet);
            },
            "stopGroupTurn": function () {
                checkInit();
                dispatch.calls.stopGroupTurn();
            },
            'hold': function (tel) {
                checkInit();
                dispatch.calls.hold(tel);
            },
            'unhold': function (tel) {
                checkInit();
                dispatch.calls.unhold(tel);
            },
            /** 转接 */
            'transfer': function (from, to, businessId) {
                checkInit();
                dispatch.calls.transfer(from, to, businessId);
            },
            /** 取消转接 **/
            'retrieve': function (tel) {
                checkInit();
                dispatch.calls.retrieve(tel);
            },
            'tripleMonitor': function (tel) {
                checkInit();
                dispatch.calls.tripleMonitor(tel);
            },
            'tripleBreakin': function (tel) {
                checkInit();
                dispatch.calls.tripleBreakin(tel);
            },
            'tripleHungup': function (tel) {
                checkInit();
                dispatch.calls.tripleHungup(tel);
            },
            'callRecord': function (tel) {
                checkInit();
                dispatch.calls.callRecord(tel);
            },
            'callRecordEnd': function (tel) {
                checkInit();
                dispatch.calls.callRecordEnd(tel);
            },
            'groupCall': function (groupId, autoAnswer, allAudience) {
                checkInit();
                dispatch.calls.groupCall(groupId, autoAnswer, allAudience);
            },
            'groupCancel': function (groupId) {
                checkInit();
                dispatch.calls.groupCancel(groupId);
            },
            'selectCall': function (telArr, meetId, autoAnswer, allAudience, fn) {
                checkInit();
                dispatch.calls.selectCall(telArr, meetId, autoAnswer, allAudience, fn);
            },
            'selectCancel': function (meetId) {
                checkInit();
                dispatch.calls.selectCancel(meetId);
            },
            'groupSame': function (memIds, autoAnswer, allAudience) {
                checkInit();
                dispatch.calls.groupSame(memIds, autoAnswer, allAudience);
            },
            /**@deprecated*/
            'groupNotify': function (groupId, files, type, times, notifyId) {
                checkInit();
                dispatch.calls.groupNotify(groupId, files, type, times, notifyId);
            },
            'selectNotify': function (telArr, files, type, times, notifyId, confirm) {
                checkInit();
                dispatch.calls.selectNotify(telArr, files, type, times, notifyId, confirm);
            },
            'makeCallSame': function (telArr, meetId) {
                checkInit();
                dispatch.calls.makeCallSame(telArr, meetId);
            },
            'notifyRecordOP': function (tel, title, opType, filename) {
                checkInit();
                dispatch.calls.notifyRecordOP(tel, title, opType, filename);
            }
        };
        // 会议相关操作
        this.meets = {
            'requestMeets': function (fn) {
                checkInit();
                dispatch.meets.requestMeets(fn);
            },
            'requestMeet': function (meetId, fn) {
                checkInit();
                dispatch.meets.requestMeet(meetId, fn);
            },
            'requestMeetMembers': function (meetId, fn) {
                checkInit();
                dispatch.meets.requestMeetMembers(meetId, fn);
            },
            'requestMeetMember': function (meetId, tel, fn) {
                checkInit();
                dispatch.meets.requestMeetMember(meetId, tel, fn);
            },
            'listMeets': function (fn) {
                checkInit();
                dispatch.meets.listMeets(fn);
            },
            'listMyMeets': function (fn) {
                checkInit();
                dispatch.meets.listMyMeets(fn);
            },
            'listMeetsRecord': function (fn) {
                checkInit();
                dispatch.meets.listMeetsRecord(fn);
            },
            'listDispMeetRecord': function (meetId, fn) {
                checkInit();
                dispatch.meets.listDispMeetRecord(meetId, fn);
            },
            'getMeet': function (meetId, fn) {
                checkInit();
                dispatch.meets.getMeet(meetId, fn);
            },
            'createMeet': function (name, businessId, fn) {
                checkInit();
                dispatch.meets.createMeet(name, businessId, fn);
            },
            'createMeetDetail': function (name, businessId, fn, meetAccess, meetAttr, timeBegin,
                                          timeEnd, passwdSpeaker, passwdAudience, meetMembers, defineAttr, videoInfo) {
                checkInit();
                dispatch.meets.createMeetDetail(name, businessId, fn, meetAccess, meetAttr, timeBegin,
                    timeEnd, passwdSpeaker, passwdAudience, meetMembers, defineAttr, videoInfo);
            },
            'editMeet': function (meetId, meetName, fn, meetAccess, meetAttr, timeBegin,
                                  timeEnd, passwdSpeaker, passwdAudience, meetMembers) {
                checkInit();
                dispatch.meets.editMeet(meetId, meetName, fn, meetAccess, meetAttr, timeBegin,
                    timeEnd, passwdSpeaker, passwdAudience, meetMembers);
            },
            'endMeet': function (meetId) {
                checkInit();
                dispatch.meets.endMeet(meetId);
            },
            'destroyMeet': function (meetId) {
                checkInit();
                dispatch.meets.destroyMeet(meetId);
            },
            'lock': function (meetId) {
                checkInit();
                dispatch.meets.lock(meetId);
            },
            'unlock': function (meetId) {
                checkInit();
                dispatch.meets.unlock(meetId);
            },
            'startRecord': function (meetId) {
                checkInit();
                dispatch.meets.startRecord(meetId);
            },
            'stopRecord': function (meetId) {
                checkInit();
                dispatch.meets.stopRecord(meetId);
            },
            'startPlayVoice': function (meetId) {
                checkInit();
                dispatch.meets.startPlayVoice(meetId);
            },
            'stopPlayVoice': function (meetId) {
                checkInit();
                dispatch.meets.stopPlayVoice(meetId);
            },
            'getMeetRecord': function (meetId, tel, fn) {
                checkInit();
                dispatch.meets.getMeetRecord(meetId, tel, fn);
            },
            'joinMember': function (meetId, tel, businessId, level, autoAnswer, memType) {
                checkInit();
                dispatch.meets.joinMember(meetId, tel, businessId, level, autoAnswer, memType);
            },
            'joinMembers': function (meetId, memberArr, businessId, autoAnswer) {
                checkInit();
                dispatch.meets.joinMembers(meetId, memberArr, businessId, autoAnswer);
            },
            'joinAudioMember': function (meetId, tel, businessId, level, autoAnswer, controllerTel, memType) {
                checkInit();
                dispatch.meets.joinAudioMember(meetId, tel, businessId, level, autoAnswer, controllerTel, memType);
            },
            'joinVideoMember': function (meetId, tel, businessId, level, autoAnswer, meetAccess, controllerTel,memType) {
                checkInit();
                dispatch.meets.joinVideoMember(meetId, tel, businessId, level, autoAnswer, meetAccess, controllerTel,memType);
            },
            'changeMemberLevel': function (meetId, tel, level) {
                checkInit();
                dispatch.meets.changeMemberLevel(meetId, tel, level);
            },
            'changeMemberToSpeaker': function (meetId, tel) {
                checkInit();
                dispatch.meets.changeMemberToSpeaker(meetId, tel);
            },
            'changeMemberToAudience': function (meetId, tel) {
                checkInit();
                dispatch.meets.changeMemberToAudience(meetId, tel);
            },
            'changeMemberToChairman': function (meetId, tel) {
                checkInit();
                dispatch.meets.changeMemberToChairman(meetId, tel);
            },
            'changeMemberToController': function (meetId, controllerTel) {
                checkInit();
                dispatch.meets.changeMemberToController(meetId, controllerTel);
            },
            'kickMember': function (meetId, tel) {
                checkInit();
                dispatch.meets.kickMember(meetId, tel);
            },
            'privateTalk': function (meetId, tel) {
                checkInit();
                dispatch.meets.privateTalk(meetId, tel);
            },
            'backToMeet': function (meetId, tel) {
                checkInit();
                dispatch.meets.backToMeet(meetId, tel);
            }
        };
    }

    /** 跨域调用（子页面、顶层框架） */
    function DispatchXDomain() {
        // TODO 与使用 dispatch 的框架处于不同域名，则通过发送消息来实现；

        this.initialize = function () {
            //
        };
        this.destroy = function () {
            //
        };
    };

    /** 封装各层框架中的实现 */
    function DispatchProxy() {
        var self = this;
        //
        var _type = null;
        var dispatch = null;

        //
        function checkInit() {
            if (!dispatch) {
                throw new Error("not initialized");
            }
        }

        /** 如果与调度网页后台处于不同域名，则需要在一开始就设置该值为调度网页后台的地址（包含 contextPath ） */
        this.setRemoteBaseUrl = function (val) {
            remoteBaseUrl = val;
            if (dispatch && dispatch.hasOwnProperty('setRemoteBaseUrl')) {
                dispatch.setRemoteBaseUrl(val);
            }
        };
        /** 获取当前调用方式：main, sub, xdomain */
        this.getType = function () {
            return _type;
        };
        //
        this.getToken = function () {
            if (dispatch.hasOwnProperty('getToken')) {
                return dispatch.getToken();
            }
            return '';
        }
        this.setToken = function (val) {
            if (dispatch.hasOwnProperty('setToken')) {
                dispatch.setToken(val);
            }
        }
        //
        this.isConnected = function () {
            if (dispatch.hasOwnProperty('isConnected')) {
                return dispatch.isConnected();
            }
            return false;
        }

        /**    登录账号的 token；当采用js方式内嵌到其它共用 DB_SC_CORE.T_ACCOUNT 的程序可实现后台自动登录； */
        this.getAccountToken = function () {
            if (dispatch.hasOwnProperty('getAccountToken')) {
                return dispatch.getAccountToken();
            }
            return '';
        }
        this.setAccountToken = function (val) {
            if (dispatch.hasOwnProperty('setAccountToken')) {
                dispatch.setAccountToken(val);
            }
        }

        /**
         * 初始化
         * @param type   main-作为主框架存在； sub-是作为子页面的组件存在； xdomain-跨域调用
         * @param conf   Object 配置对象
         */
        this.initialize = function (type, conf) {

            try {
                if (!type && window.top != window && window.top.scooper.dispatch) {
                    type = "sub";
                }
            } catch (error) {
                //当跨域，或者top.scooper不存在时
            }
            if (!type) type = "main";
            console.log(type);
            if (_type == type && dispatch) {
                console.log("重复初始化dispatch对象,跳过");
                return;
            }
            switch (type) {
                case "main":
                    dispatch = new Dispatch();
                    break;
                case "sub":
                    dispatch = new DispatchSub();
                    break;
                case "xdomain":
                    dispatch = new DispatchXDomain();
                    break;
                default:
                    throw new Error("unknow type:" + type);
            }
            _type = type;
            //
            if (remoteBaseUrl) {
                self.setRemoteBaseUrl(remoteBaseUrl);
            }
            //非顶层 或 初次加载,不进行软手柄的注册
            conf = conf ? conf : {};
            if (type == "main" && conf["useShandle"]) this.useShandle = true;
            else conf["useShandle"] = false;
            dispatch.initialize(conf);
        };
        this.destroy = function () {
            checkInit();
            dispatch.destroy();
        };
        //
        this.login = function (user, pass) {
            checkInit();
            dispatch.login(user, pass);
        };
        //
        this.setloginExamine = function (loginExamines) {
            checkInit();
            dispatch.setloginExamine(loginExamines);
        }
        //
        this.loginByToken = function (token, fn) {
            checkInit();
            dispatch.loginByToken(token, fn);
        };
        this.logout = function () {
            checkInit();
            dispatch.logout();
        };
        this.sendChangeCfg = function (type, value, fn) {
            checkInit();
            dispatch.sendChangeCfg(type, value, fn);
        };
        this.centerOut = function (telArr, fn) {
            checkInit();
            dispatch.centerOut(telArr, fn);
        };
        this.centerIn = function (fn) {
            checkInit();
            dispatch.centerIn(fn);
        };
        this.setOperTel = function (tel, fn) {
            checkInit();
            dispatch.setOperTel(tel, fn);
        };
        this.listen = function (evtType, fn) {
            checkInit();
            dispatch.listen(evtType, fn);
        };
        this.unlisten = function (evtType, fn) {
            checkInit();
            dispatch.unlisten(evtType, fn);
        };
        this.fireListen = function (evtType, data) {
            checkInit();
            dispatch.fireListen(evtType, data);
        };
        this.getDispatchOper = function () {
            checkInit();
            return dispatch.getDispatchOper();
        };
        // 呼叫相关操作
        this.calls = {
            'requestCallStatus': function (fn) {
                checkInit();
                dispatch.calls.requestCallStatus(fn);
            },
            'requestTelStatus': function (tel, fn) {
                checkInit();
                dispatch.calls.requestTelStatus(tel, fn);
            },
            'requestCallIns': function (fn) {
                checkInit();
                dispatch.calls.requestCallIns(fn);
            },
            'listStatus': function (fn) {
                checkInit();
                dispatch.calls.listStatus(fn);
            },
            'listHold': function (fn) {
                checkInit();
                dispatch.calls.listHold(fn);
            },
            'listCallIn': function (fn) {
                checkInit();
                dispatch.calls.listCallIn(fn);
            },
            'findCallInByTel': function (tel) {
                checkInit();
                return dispatch.calls.findCallInByTel(tel);
            },
            /** 呼叫 */
            'makeCall': function (tel, businessId) {
                checkInit();
                dispatch.calls.makeCall(tel, businessId);
            },
            /** 音频呼叫 */
            'makeAudioCall': function (tel, businessId) {
                checkInit();
                dispatch.calls.makeAudioCall(tel, businessId);
            },
            /** 视频呼叫 */
            'makeVideoCall': function (tel, businessId) {
                checkInit();
                dispatch.calls.makeVideoCall(tel, businessId);
            },
            'hungUp': function (tel) {
                checkInit();
                dispatch.calls.hungUp(tel);
            },
            'shandleHungUp': function () {
                checkInit();
                dispatch.calls.shandleHungUp();
            },
            'answer': function (tel, businessId) {
                checkInit();
                dispatch.calls.answer(tel, businessId);
            },
            'shandleAnswer': function (isVideoAnswer) {
                checkInit();
                dispatch.calls.shandleAnswer(isVideoAnswer);
            },
            /**软手柄抢注册*/
            'shandlePreemptRegister': function () {
                checkInit();
                dispatch.calls.shandlePreemptRegister();
            },
            'answerAll': function () {
                checkInit();
                dispatch.calls.answerAll();
            },
            "rollCall": function (telArr) {
                checkInit();
                dispatch.calls.rollCall(telArr);
            },
            "stopRollCall": function () {
                checkInit();
                dispatch.calls.stopRollCall();
            },
            "groupTurn": function (telArr, isOnce, isJoinMeet) {
                checkInit();
                dispatch.calls.groupTurn(telArr, isOnce, isJoinMeet);
            },
            "stopGroupTurn": function () {
                checkInit();
                dispatch.calls.stopGroupTurn();
            },
            'hold': function (tel) {
                checkInit();
                dispatch.calls.hold(tel);
            },
            'unhold': function (tel) {
                checkInit();
                dispatch.calls.unhold(tel);
            },
            'transfer': function (from, to, businessId) {
                checkInit();
                dispatch.calls.transfer(from, to, businessId);
            },
            'retrieve': function (tel) {
                checkInit();
                dispatch.calls.retrieve(tel);
            },
            'tripleMonitor': function (tel) {
                checkInit();
                dispatch.calls.tripleMonitor(tel);
            },
            'tripleBreakin': function (tel) {
                checkInit();
                dispatch.calls.tripleBreakin(tel);
            },
            'tripleHungup': function (tel) {
                checkInit();
                dispatch.calls.tripleHungup(tel);
            },
            'callRecord': function (tel) {
                checkInit();
                dispatch.calls.callRecord(tel);
            },
            'callRecordEnd': function (tel) {
                checkInit();
                dispatch.calls.callRecordEnd(tel);
            },
            'groupCall': function (groupId, autoAnswer, allAudience) {
                checkInit();
                dispatch.calls.groupCall(groupId, autoAnswer, allAudience);
            },
            'groupCancel': function (groupId) {
                checkInit();
                dispatch.calls.groupCancel(groupId);
            },
            'selectCall': function (telArr, meetId, autoAnswer, allAudience, fn) {
                checkInit();
                dispatch.calls.selectCall(telArr, meetId, autoAnswer, allAudience, fn);
            },
            'selectCancel': function (meetId) {
                checkInit();
                dispatch.calls.selectCancel(meetId);
            },
            'groupSame': function (memIds, autoAnswer, allAudience) {
                checkInit();
                dispatch.calls.groupSame(memIds, autoAnswer, allAudience);
            },
            /**@deprecated*/
            'groupNotify': function (groupId, files, type, times, notifyId) {
                checkInit();
                dispatch.calls.groupNotify(groupId, files, type, times, notifyId);
            },
            'selectNotify': function (telArr, files, type, times, notifyId, confirm) {
                checkInit();
                dispatch.calls.selectNotify(telArr, files, type, times, notifyId, confirm);
            },
            'makeCallSame': function (telArr, meetId) {
                checkInit();
                dispatch.calls.makeCallSame(telArr, meetId);
            },
            'notifyRecordOP': function (tel, title, opType, filename) {
                checkInit();
                dispatch.calls.notifyRecordOP(tel, title, opType, filename);
            }
        };
        // 会议相关操作
        this.meets = {
            'requestMeets': function (fn) {
                checkInit();
                dispatch.meets.requestMeets(fn);
            },
            'requestMeet': function (meetId, fn) {
                checkInit();
                dispatch.meets.requestMeet(meetId, fn);
            },
            'requestMeetMembers': function (meetId, fn) {
                checkInit();
                dispatch.meets.requestMeetMembers(meetId, fn);
            },
            'requestMeetMember': function (meetId, tel, fn) {
                checkInit();
                dispatch.meets.requestMeetMember(meetId, tel, fn);
            },
            'listMeets': function (fn) {
                checkInit();
                dispatch.meets.listMeets(fn);
            },
            'listMyMeets': function (fn) {
                checkInit();
                dispatch.meets.listMyMeets(fn);
            },
            'listMeetsRecord': function (fn) {
                checkInit();
                dispatch.meets.listMeetsRecord(fn);
            },
            'listDispMeetRecord': function (meetId, fn) {
                checkInit();
                dispatch.meets.listDispMeetRecord(meetId, fn);
            },
            'getMeet': function (meetId, fn) {
                checkInit();
                dispatch.meets.getMeet(meetId, fn);
            },
            'createMeet': function (name, businessId, fn) {
                checkInit();
                dispatch.meets.createMeet(name, businessId, fn);
            },
            'createMeetDetail': function (name, businessId, fn, meetAccess, meetAttr, timeBegin,
                                          timeEnd, passwdSpeaker, passwdAudience, meetMembers, defineAttr, videoInfo) {
                checkInit();
                dispatch.meets.createMeetDetail(name, businessId, fn, meetAccess, meetAttr, timeBegin,
                    timeEnd, passwdSpeaker, passwdAudience, meetMembers, defineAttr, videoInfo);
            },
            'editMeet': function (meetId, meetName, fn, meetAccess, meetAttr, timeBegin,
                                  timeEnd, passwdSpeaker, passwdAudience, meetMembers) {
                checkInit();
                dispatch.meets.editMeet(meetId, meetName, fn, meetAccess, meetAttr, timeBegin,
                    timeEnd, passwdSpeaker, passwdAudience, meetMembers);
            },
            'endMeet': function (meetId) {
                checkInit();
                dispatch.meets.endMeet(meetId);
            },
            'destroyMeet': function (meetId) {
                checkInit();
                dispatch.meets.destroyMeet(meetId);
            },
            'lock': function (meetId) {
                checkInit();
                dispatch.meets.lock(meetId);
            },
            'unlock': function (meetId) {
                checkInit();
                dispatch.meets.unlock(meetId);
            },
            'startRecord': function (meetId) {
                checkInit();
                dispatch.meets.startRecord(meetId);
            },
            'stopRecord': function (meetId) {
                checkInit();
                dispatch.meets.stopRecord(meetId);
            },
            'startPlayVoice': function (meetId) {
                checkInit();
                dispatch.meets.startPlayVoice(meetId);
            },
            'stopPlayVoice': function (meetId) {
                checkInit();
                dispatch.meets.stopPlayVoice(meetId);
            },
            'getMeetRecord': function (meetId, tel, fn) {
                checkInit();
                dispatch.meets.getMeetRecord(meetId, tel, fn);
            },
            'joinMember': function (meetId, tel, businessId, level, autoAnswer, memType) {
                checkInit();
                dispatch.meets.joinMember(meetId, tel, businessId, level, autoAnswer, memType);
            },
            'joinMembers': function (meetId, memberArr, businessId, autoAnswer) {
                checkInit();
                dispatch.meets.joinMembers(meetId, memberArr, businessId, autoAnswer);
            },
            'joinAudioMember': function (meetId, tel, businessId, level, autoAnswer, controllerTel,memType) {
                checkInit();
                dispatch.meets.joinAudioMember(meetId, tel, businessId, level, autoAnswer, controllerTel,memType);
            },
            'joinVideoMember': function (meetId, tel, businessId, level, autoAnswer, meetAccess, controllerTel,memType) {
                checkInit();
                dispatch.meets.joinVideoMember(meetId, tel, businessId, level, autoAnswer, meetAccess, controllerTel,memType);
            },
            'changeMemberLevel': function (meetId, tel, level) {
                checkInit();
                dispatch.meets.changeMemberLevel(meetId, tel, level);
            },
            'changeMemberToSpeaker': function (meetId, tel) {
                checkInit();
                dispatch.meets.changeMemberToSpeaker(meetId, tel);
            },
            'changeMemberToAudience': function (meetId, tel) {
                checkInit();
                dispatch.meets.changeMemberToAudience(meetId, tel);
            },
            'changeMemberToChairman': function (meetId, tel) {
                checkInit();
                dispatch.meets.changeMemberToChairman(meetId, tel);
            },
            'changeMemberToController': function (meetId, controllerTel) {
                checkInit();
                dispatch.meets.changeMemberToController(meetId, controllerTel);
            },
            'kickMember': function (meetId, tel) {
                checkInit();
                dispatch.meets.kickMember(meetId, tel);
            },
            'privateTalk': function (meetId, tel) {
                checkInit();
                dispatch.meets.privateTalk(meetId, tel);
            },
            'backToMeet': function (meetId, tel) {
                checkInit();
                dispatch.meets.backToMeet(meetId, tel);
            }
        };
    }


    /**
     * ajax加载
     * @param url    请求地址
     * @param param    请求参数,json格式
     * @param retfn    回调方法
     * @param isSyn    是否同步，true:同步 false:异步(默认)
     */
    function _loadJson(url, param, retfn, isSyn) {
        //
        $.ajax({
            'method': 'POST',
            'url': url,
            'data': param,
            'dataType': 'json',
            'async': !isSyn,
            'success': function (data) {
                if (data.code != 0) {
                    if (data.code == 1004) {
                        $("#lose-conn-info span").text(data.message);
                        //显示遮照
                        scooper.util.overlay.show($("#lose-conn-info"));
                        $('#lose-conn-info').show();
                    }
                    console.error('加载数据失败：' + JSON.stringify(data.message) + ", " + url);
                }
                if (retfn) retfn(data);
            },
            'error': function (e) {
                console.error("加载数据异常" + url, e);
            }
        });
    }

    // 常量定义
    Dispatch.prototype.event_const = event_const;
    DispatchSub.prototype.event_const = event_const;
    DispatchProxy.prototype.event_const = event_const;
    DispatchXDomain.prototype.event_const = event_const;
    DispatchProxy.prototype.status_const = status_const;

    window.shandleUtil = new SHandleUtil();
    return window.scooper.dispatch = new DispatchProxy();
}));