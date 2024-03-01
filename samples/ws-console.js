// ws-console
// 方便在移动端调试网页，将 console 输出 通过 WebSocket 发送到服务器上的指定路径，在服务器控制台中查看网页输出
;(function() {

console.log('ws-console.js');

// 是否在钉钉或微信中
function isDdWx() {
    let ua = navigator.userAgent;
    return ua.indexOf('DingTalk') > 0 || ua.indexOf('WeChat') > 0 || ua.indexOf('Mobile') > 0 ;
}

// 将网页console.log输出的内容输出到 WebSocket 中（便于不具备条件的移动端调试程序）
function initWsConsole() {
    // 在钉钉、微信中才需要
    if (!isDdWx()) {
        console.log('not dd or wx, ignored.')
        return;
    }
    console.log('initWsConsole');
    let preLogs = preLog();
    let wsServer;
    if (location.protocol == 'https:') {
        wsServer = `wss://${location.host}/sch/io/`;
    } else {
        wsServer = `ws://${location.host}/sch/io/`;
    }
    let ws = new WebSocket(wsServer);
    ws.onopen = () => {
        console.log('connected.')
        window.console.log = makeWsLog('LOG');
        window.console.info = makeWsLog('INF');
        window.console.warn = makeWsLog('WAR');
        window.console.error = makeWsLog('ERR');
        //
        preLogs.done();
        // 心跳保活（否则，隔段时间就断了）
        setInterval(() => {ws.send('')}, 10000);
    };
    const makeWsLog = type => function() {
        let msg = parseArguments(arguments);
        ws.send(`[${type}] ${msg}`);
    };
    //
    function preLog() {
        var store = [];
        store.push({ type: 'SYS', msg: "URL: " + location.href });
        store.push({ type: 'SYS', msg: "UA : " + navigator.userAgent });
        //
        const makePreLog = type => function() {
            let msg = parseArguments(arguments);
            store.push({ type, msg });
        };
        window.console.log = makePreLog('LOG');
        window.console.info = makePreLog('INF');
        window.console.warn = makePreLog('WAR');
        window.console.error = makePreLog('ERR');
        //
        return { done: () => {
            store.forEach(o => ws.send(`[${o.type}] ${o.msg}`));
            store = [];
        } };
    }
}

function parseArguments(args) {
    let msg = '';
    for (var i = 0; i < args.length; i++) {
        if (i > 0) {
            msg += ', ';
        }
        let o = args[i];
        msg += fmtValue(o);
    }
    return msg;
}

function fmtValue(o) {
    return typeof o == 'object' ? fmtObject(o) : o;
}

function fmtObject(o) {
    if (o instanceof Array) {
        return '[' + o.reduce(function(p, c, i) {
            return p + fmtValue(c) + ',';
        }, '') + ']';
    }
    if (o instanceof MediaStream) {
        return 'MediaStream' + JSON.stringify({ id: o.id, active: o.active });
    }
    if (o instanceof MediaStreamTrack) {
        return 'MediaStreamTrack' + JSON.stringify({ kind: o.kind, id: o.id, label: o.label, enabled: o.enabled, muted: o.muted, readyState: o.readyState });
    }
    return JSON.stringify(o);
}

initWsConsole();

})();