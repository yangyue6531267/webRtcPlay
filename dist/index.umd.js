(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ScSoftHandler = {}));
})(this, (function (exports) { 'use strict';

    function _mergeNamespaces(n, m) {
        m.forEach(function (e) {
            e && typeof e !== 'string' && !Array.isArray(e) && Object.keys(e).forEach(function (k) {
                if (k !== 'default' && !(k in n)) {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        });
        return Object.freeze(n);
    }

    /**
     * 软手柄初始化参数
     */

    /**
     * 界面上放置视频元素的容器
     */

    /**
     * 软手柄注册参数
     */

    /**
     * 音视频设备参数
     */

    /**
     * 通话媒体流配置
     */

    /**
     * 软手柄事件
     */
    exports.SoftHandlerEvent = void 0;

    /**
     * 设备控制操作接口，比如：切换摄像头、外放 等操作。
     */
    (function (SoftHandlerEvent) {
      SoftHandlerEvent["AUTO_REG"] = "register/autoRegister";
      SoftHandlerEvent["REG_RESULT"] = "registerResult";
      SoftHandlerEvent["UNREG_RESULT"] = "unregisterResult";
      SoftHandlerEvent["ERROR"] = "error";
      SoftHandlerEvent["IN_CALL"] = "incomingcall";
      SoftHandlerEvent["IN_CALL_ANSWER"] = "incomingcall/autoAnswer";
      SoftHandlerEvent["RINGING"] = "ringing";
      SoftHandlerEvent["ACCEPTED"] = "accepted";
      SoftHandlerEvent["HANGUP"] = "hangup";
      SoftHandlerEvent["HANGUP_RESULT"] = "hangupResult";
      SoftHandlerEvent["CALL_RESULT"] = "callingResult";
      SoftHandlerEvent["ANSWER_RESULT"] = "answerResult";
    })(exports.SoftHandlerEvent || (exports.SoftHandlerEvent = {}));

    function _defineProperty(obj, key, value) {
      key = _toPropertyKey(key);
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _toPrimitive(input, hint) {
      if (typeof input !== "object" || input === null) return input;
      var prim = input[Symbol.toPrimitive];
      if (prim !== undefined) {
        var res = prim.call(input, hint || "default");
        if (typeof res !== "object") return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (hint === "string" ? String : Number)(input);
    }
    function _toPropertyKey(arg) {
      var key = _toPrimitive(arg, "string");
      return typeof key === "symbol" ? key : String(key);
    }
    function _classPrivateFieldGet(receiver, privateMap) {
      var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get");
      return _classApplyDescriptorGet(receiver, descriptor);
    }
    function _classPrivateFieldSet(receiver, privateMap, value) {
      var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set");
      _classApplyDescriptorSet(receiver, descriptor, value);
      return value;
    }
    function _classExtractFieldDescriptor(receiver, privateMap, action) {
      if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to " + action + " private field on non-instance");
      }
      return privateMap.get(receiver);
    }
    function _classApplyDescriptorGet(receiver, descriptor) {
      if (descriptor.get) {
        return descriptor.get.call(receiver);
      }
      return descriptor.value;
    }
    function _classApplyDescriptorSet(receiver, descriptor, value) {
      if (descriptor.set) {
        descriptor.set.call(receiver, value);
      } else {
        if (!descriptor.writable) {
          throw new TypeError("attempted to set read only private field");
        }
        descriptor.value = value;
      }
    }
    function _classPrivateMethodGet(receiver, privateSet, fn) {
      if (!privateSet.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
      }
      return fn;
    }
    function _checkPrivateRedeclaration(obj, privateCollection) {
      if (privateCollection.has(obj)) {
        throw new TypeError("Cannot initialize the same private elements twice on an object");
      }
    }
    function _classPrivateFieldInitSpec(obj, privateMap, value) {
      _checkPrivateRedeclaration(obj, privateMap);
      privateMap.set(obj, value);
    }
    function _classPrivateMethodInitSpec(obj, privateSet) {
      _checkPrivateRedeclaration(obj, privateSet);
      privateSet.add(obj);
    }

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    var check = function (it) {
      return it && it.Math == Math && it;
    };

    // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
    var global$g =
      // eslint-disable-next-line es/no-global-this -- safe
      check(typeof globalThis == 'object' && globalThis) ||
      check(typeof window == 'object' && window) ||
      // eslint-disable-next-line no-restricted-globals -- safe
      check(typeof self == 'object' && self) ||
      check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
      // eslint-disable-next-line no-new-func -- fallback
      (function () { return this; })() || Function('return this')();

    // iterable DOM collections
    // flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
    var domIterables = {
      CSSRuleList: 0,
      CSSStyleDeclaration: 0,
      CSSValueList: 0,
      ClientRectList: 0,
      DOMRectList: 0,
      DOMStringList: 0,
      DOMTokenList: 1,
      DataTransferItemList: 0,
      FileList: 0,
      HTMLAllCollection: 0,
      HTMLCollection: 0,
      HTMLFormElement: 0,
      HTMLSelectElement: 0,
      MediaList: 0,
      MimeTypeArray: 0,
      NamedNodeMap: 0,
      NodeList: 1,
      PaintRequestList: 0,
      Plugin: 0,
      PluginArray: 0,
      SVGLengthList: 0,
      SVGNumberList: 0,
      SVGPathSegList: 0,
      SVGPointList: 0,
      SVGStringList: 0,
      SVGTransformList: 0,
      SourceBufferList: 0,
      StyleSheetList: 0,
      TextTrackCueList: 0,
      TextTrackList: 0,
      TouchList: 0
    };

    var documentAll$2 = typeof document == 'object' && document.all;

    // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
    var IS_HTMLDDA = typeof documentAll$2 == 'undefined' && documentAll$2 !== undefined;

    var documentAll_1 = {
      all: documentAll$2,
      IS_HTMLDDA: IS_HTMLDDA
    };

    var $documentAll$1 = documentAll_1;

    var documentAll$1 = $documentAll$1.all;

    // `IsCallable` abstract operation
    // https://tc39.es/ecma262/#sec-iscallable
    var isCallable$j = $documentAll$1.IS_HTMLDDA ? function (argument) {
      return typeof argument == 'function' || argument === documentAll$1;
    } : function (argument) {
      return typeof argument == 'function';
    };

    var isCallable$i = isCallable$j;
    var $documentAll = documentAll_1;

    var documentAll = $documentAll.all;

    var isObject$8 = $documentAll.IS_HTMLDDA ? function (it) {
      return typeof it == 'object' ? it !== null : isCallable$i(it) || it === documentAll;
    } : function (it) {
      return typeof it == 'object' ? it !== null : isCallable$i(it);
    };

    var global$f = global$g;
    var isObject$7 = isObject$8;

    var document$1 = global$f.document;
    // typeof document.createElement is 'object' in old IE
    var EXISTS$1 = isObject$7(document$1) && isObject$7(document$1.createElement);

    var documentCreateElement$2 = function (it) {
      return EXISTS$1 ? document$1.createElement(it) : {};
    };

    // in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
    var documentCreateElement$1 = documentCreateElement$2;

    var classList = documentCreateElement$1('span').classList;
    var DOMTokenListPrototype$1 = classList && classList.constructor && classList.constructor.prototype;

    var domTokenListPrototype = DOMTokenListPrototype$1 === Object.prototype ? undefined : DOMTokenListPrototype$1;

    var fails$i = function (exec) {
      try {
        return !!exec();
      } catch (error) {
        return true;
      }
    };

    var fails$h = fails$i;

    var functionBindNative = !fails$h(function () {
      // eslint-disable-next-line es/no-function-prototype-bind -- safe
      var test = (function () { /* empty */ }).bind();
      // eslint-disable-next-line no-prototype-builtins -- safe
      return typeof test != 'function' || test.hasOwnProperty('prototype');
    });

    var NATIVE_BIND$3 = functionBindNative;

    var FunctionPrototype$2 = Function.prototype;
    var call$e = FunctionPrototype$2.call;
    var uncurryThisWithBind = NATIVE_BIND$3 && FunctionPrototype$2.bind.bind(call$e, call$e);

    var functionUncurryThis = NATIVE_BIND$3 ? uncurryThisWithBind : function (fn) {
      return function () {
        return call$e.apply(fn, arguments);
      };
    };

    var uncurryThis$k = functionUncurryThis;

    var toString$6 = uncurryThis$k({}.toString);
    var stringSlice$6 = uncurryThis$k(''.slice);

    var classofRaw$2 = function (it) {
      return stringSlice$6(toString$6(it), 8, -1);
    };

    var uncurryThis$j = functionUncurryThis;
    var fails$g = fails$i;
    var classof$6 = classofRaw$2;

    var $Object$4 = Object;
    var split$3 = uncurryThis$j(''.split);

    // fallback for non-array-like ES3 and non-enumerable old V8 strings
    var indexedObject = fails$g(function () {
      // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
      // eslint-disable-next-line no-prototype-builtins -- safe
      return !$Object$4('z').propertyIsEnumerable(0);
    }) ? function (it) {
      return classof$6(it) == 'String' ? split$3(it, '') : $Object$4(it);
    } : $Object$4;

    // we can't use just `it == null` since of `document.all` special case
    // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
    var isNullOrUndefined$4 = function (it) {
      return it === null || it === undefined;
    };

    var isNullOrUndefined$3 = isNullOrUndefined$4;

    var $TypeError$a = TypeError;

    // `RequireObjectCoercible` abstract operation
    // https://tc39.es/ecma262/#sec-requireobjectcoercible
    var requireObjectCoercible$4 = function (it) {
      if (isNullOrUndefined$3(it)) throw $TypeError$a("Can't call method on " + it);
      return it;
    };

    // toObject with fallback for non-array-like ES3 strings
    var IndexedObject$1 = indexedObject;
    var requireObjectCoercible$3 = requireObjectCoercible$4;

    var toIndexedObject$5 = function (it) {
      return IndexedObject$1(requireObjectCoercible$3(it));
    };

    var sharedExports = {};
    var shared$4 = {
      get exports(){ return sharedExports; },
      set exports(v){ sharedExports = v; },
    };

    var isPure = false;

    var global$e = global$g;

    // eslint-disable-next-line es/no-object-defineproperty -- safe
    var defineProperty$6 = Object.defineProperty;

    var defineGlobalProperty$3 = function (key, value) {
      try {
        defineProperty$6(global$e, key, { value: value, configurable: true, writable: true });
      } catch (error) {
        global$e[key] = value;
      } return value;
    };

    var global$d = global$g;
    var defineGlobalProperty$2 = defineGlobalProperty$3;

    var SHARED = '__core-js_shared__';
    var store$3 = global$d[SHARED] || defineGlobalProperty$2(SHARED, {});

    var sharedStore = store$3;

    var store$2 = sharedStore;

    (shared$4.exports = function (key, value) {
      return store$2[key] || (store$2[key] = value !== undefined ? value : {});
    })('versions', []).push({
      version: '3.26.1',
      mode: 'global',
      copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
      license: 'https://github.com/zloirock/core-js/blob/v3.26.1/LICENSE',
      source: 'https://github.com/zloirock/core-js'
    });

    var requireObjectCoercible$2 = requireObjectCoercible$4;

    var $Object$3 = Object;

    // `ToObject` abstract operation
    // https://tc39.es/ecma262/#sec-toobject
    var toObject$5 = function (argument) {
      return $Object$3(requireObjectCoercible$2(argument));
    };

    var uncurryThis$i = functionUncurryThis;
    var toObject$4 = toObject$5;

    var hasOwnProperty = uncurryThis$i({}.hasOwnProperty);

    // `HasOwnProperty` abstract operation
    // https://tc39.es/ecma262/#sec-hasownproperty
    // eslint-disable-next-line es/no-object-hasown -- safe
    var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
      return hasOwnProperty(toObject$4(it), key);
    };

    var uncurryThis$h = functionUncurryThis;

    var id = 0;
    var postfix = Math.random();
    var toString$5 = uncurryThis$h(1.0.toString);

    var uid$2 = function (key) {
      return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$5(++id + postfix, 36);
    };

    var global$c = global$g;
    var isCallable$h = isCallable$j;

    var aFunction = function (argument) {
      return isCallable$h(argument) ? argument : undefined;
    };

    var getBuiltIn$5 = function (namespace, method) {
      return arguments.length < 2 ? aFunction(global$c[namespace]) : global$c[namespace] && global$c[namespace][method];
    };

    var getBuiltIn$4 = getBuiltIn$5;

    var engineUserAgent = getBuiltIn$4('navigator', 'userAgent') || '';

    var global$b = global$g;
    var userAgent = engineUserAgent;

    var process = global$b.process;
    var Deno = global$b.Deno;
    var versions = process && process.versions || Deno && Deno.version;
    var v8 = versions && versions.v8;
    var match, version;

    if (v8) {
      match = v8.split('.');
      // in old Chrome, versions of V8 isn't V8 = Chrome / 10
      // but their correct versions are not interesting for us
      version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
    }

    // BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
    // so check `userAgent` even if `.v8` exists, but 0
    if (!version && userAgent) {
      match = userAgent.match(/Edge\/(\d+)/);
      if (!match || match[1] >= 74) {
        match = userAgent.match(/Chrome\/(\d+)/);
        if (match) version = +match[1];
      }
    }

    var engineV8Version = version;

    /* eslint-disable es/no-symbol -- required for testing */

    var V8_VERSION = engineV8Version;
    var fails$f = fails$i;

    // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
    var symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails$f(function () {
      var symbol = Symbol();
      // Chrome 38 Symbol has incorrect toString conversion
      // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
      return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
        // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
        !Symbol.sham && V8_VERSION && V8_VERSION < 41;
    });

    /* eslint-disable es/no-symbol -- required for testing */

    var NATIVE_SYMBOL$1 = symbolConstructorDetection;

    var useSymbolAsUid = NATIVE_SYMBOL$1
      && !Symbol.sham
      && typeof Symbol.iterator == 'symbol';

    var global$a = global$g;
    var shared$3 = sharedExports;
    var hasOwn$a = hasOwnProperty_1;
    var uid$1 = uid$2;
    var NATIVE_SYMBOL = symbolConstructorDetection;
    var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

    var WellKnownSymbolsStore = shared$3('wks');
    var Symbol$1 = global$a.Symbol;
    var symbolFor = Symbol$1 && Symbol$1['for'];
    var createWellKnownSymbol = USE_SYMBOL_AS_UID$1 ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1;

    var wellKnownSymbol$e = function (name) {
      if (!hasOwn$a(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
        var description = 'Symbol.' + name;
        if (NATIVE_SYMBOL && hasOwn$a(Symbol$1, name)) {
          WellKnownSymbolsStore[name] = Symbol$1[name];
        } else if (USE_SYMBOL_AS_UID$1 && symbolFor) {
          WellKnownSymbolsStore[name] = symbolFor(description);
        } else {
          WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
        }
      } return WellKnownSymbolsStore[name];
    };

    var isObject$6 = isObject$8;

    var $String$3 = String;
    var $TypeError$9 = TypeError;

    // `Assert: Type(argument) is Object`
    var anObject$c = function (argument) {
      if (isObject$6(argument)) return argument;
      throw $TypeError$9($String$3(argument) + ' is not an object');
    };

    var objectDefineProperties = {};

    var fails$e = fails$i;

    // Detect IE8's incomplete defineProperty implementation
    var descriptors = !fails$e(function () {
      // eslint-disable-next-line es/no-object-defineproperty -- required for testing
      return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
    });

    var DESCRIPTORS$b = descriptors;
    var fails$d = fails$i;

    // V8 ~ Chrome 36-
    // https://bugs.chromium.org/p/v8/issues/detail?id=3334
    var v8PrototypeDefineBug = DESCRIPTORS$b && fails$d(function () {
      // eslint-disable-next-line es/no-object-defineproperty -- required for testing
      return Object.defineProperty(function () { /* empty */ }, 'prototype', {
        value: 42,
        writable: false
      }).prototype != 42;
    });

    var objectDefineProperty = {};

    var DESCRIPTORS$a = descriptors;
    var fails$c = fails$i;
    var createElement = documentCreateElement$2;

    // Thanks to IE8 for its funny defineProperty
    var ie8DomDefine = !DESCRIPTORS$a && !fails$c(function () {
      // eslint-disable-next-line es/no-object-defineproperty -- required for testing
      return Object.defineProperty(createElement('div'), 'a', {
        get: function () { return 7; }
      }).a != 7;
    });

    var NATIVE_BIND$2 = functionBindNative;

    var call$d = Function.prototype.call;

    var functionCall = NATIVE_BIND$2 ? call$d.bind(call$d) : function () {
      return call$d.apply(call$d, arguments);
    };

    var uncurryThis$g = functionUncurryThis;

    var objectIsPrototypeOf = uncurryThis$g({}.isPrototypeOf);

    var getBuiltIn$3 = getBuiltIn$5;
    var isCallable$g = isCallable$j;
    var isPrototypeOf$1 = objectIsPrototypeOf;
    var USE_SYMBOL_AS_UID = useSymbolAsUid;

    var $Object$2 = Object;

    var isSymbol$2 = USE_SYMBOL_AS_UID ? function (it) {
      return typeof it == 'symbol';
    } : function (it) {
      var $Symbol = getBuiltIn$3('Symbol');
      return isCallable$g($Symbol) && isPrototypeOf$1($Symbol.prototype, $Object$2(it));
    };

    var $String$2 = String;

    var tryToString$2 = function (argument) {
      try {
        return $String$2(argument);
      } catch (error) {
        return 'Object';
      }
    };

    var isCallable$f = isCallable$j;
    var tryToString$1 = tryToString$2;

    var $TypeError$8 = TypeError;

    // `Assert: IsCallable(argument) is true`
    var aCallable$3 = function (argument) {
      if (isCallable$f(argument)) return argument;
      throw $TypeError$8(tryToString$1(argument) + ' is not a function');
    };

    var aCallable$2 = aCallable$3;
    var isNullOrUndefined$2 = isNullOrUndefined$4;

    // `GetMethod` abstract operation
    // https://tc39.es/ecma262/#sec-getmethod
    var getMethod$4 = function (V, P) {
      var func = V[P];
      return isNullOrUndefined$2(func) ? undefined : aCallable$2(func);
    };

    var call$c = functionCall;
    var isCallable$e = isCallable$j;
    var isObject$5 = isObject$8;

    var $TypeError$7 = TypeError;

    // `OrdinaryToPrimitive` abstract operation
    // https://tc39.es/ecma262/#sec-ordinarytoprimitive
    var ordinaryToPrimitive$1 = function (input, pref) {
      var fn, val;
      if (pref === 'string' && isCallable$e(fn = input.toString) && !isObject$5(val = call$c(fn, input))) return val;
      if (isCallable$e(fn = input.valueOf) && !isObject$5(val = call$c(fn, input))) return val;
      if (pref !== 'string' && isCallable$e(fn = input.toString) && !isObject$5(val = call$c(fn, input))) return val;
      throw $TypeError$7("Can't convert object to primitive value");
    };

    var call$b = functionCall;
    var isObject$4 = isObject$8;
    var isSymbol$1 = isSymbol$2;
    var getMethod$3 = getMethod$4;
    var ordinaryToPrimitive = ordinaryToPrimitive$1;
    var wellKnownSymbol$d = wellKnownSymbol$e;

    var $TypeError$6 = TypeError;
    var TO_PRIMITIVE = wellKnownSymbol$d('toPrimitive');

    // `ToPrimitive` abstract operation
    // https://tc39.es/ecma262/#sec-toprimitive
    var toPrimitive$1 = function (input, pref) {
      if (!isObject$4(input) || isSymbol$1(input)) return input;
      var exoticToPrim = getMethod$3(input, TO_PRIMITIVE);
      var result;
      if (exoticToPrim) {
        if (pref === undefined) pref = 'default';
        result = call$b(exoticToPrim, input, pref);
        if (!isObject$4(result) || isSymbol$1(result)) return result;
        throw $TypeError$6("Can't convert object to primitive value");
      }
      if (pref === undefined) pref = 'number';
      return ordinaryToPrimitive(input, pref);
    };

    var toPrimitive = toPrimitive$1;
    var isSymbol = isSymbol$2;

    // `ToPropertyKey` abstract operation
    // https://tc39.es/ecma262/#sec-topropertykey
    var toPropertyKey$3 = function (argument) {
      var key = toPrimitive(argument, 'string');
      return isSymbol(key) ? key : key + '';
    };

    var DESCRIPTORS$9 = descriptors;
    var IE8_DOM_DEFINE$1 = ie8DomDefine;
    var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
    var anObject$b = anObject$c;
    var toPropertyKey$2 = toPropertyKey$3;

    var $TypeError$5 = TypeError;
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    var $defineProperty = Object.defineProperty;
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;
    var ENUMERABLE = 'enumerable';
    var CONFIGURABLE$1 = 'configurable';
    var WRITABLE = 'writable';

    // `Object.defineProperty` method
    // https://tc39.es/ecma262/#sec-object.defineproperty
    objectDefineProperty.f = DESCRIPTORS$9 ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
      anObject$b(O);
      P = toPropertyKey$2(P);
      anObject$b(Attributes);
      if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
        var current = $getOwnPropertyDescriptor$1(O, P);
        if (current && current[WRITABLE]) {
          O[P] = Attributes.value;
          Attributes = {
            configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
            enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
            writable: false
          };
        }
      } return $defineProperty(O, P, Attributes);
    } : $defineProperty : function defineProperty(O, P, Attributes) {
      anObject$b(O);
      P = toPropertyKey$2(P);
      anObject$b(Attributes);
      if (IE8_DOM_DEFINE$1) try {
        return $defineProperty(O, P, Attributes);
      } catch (error) { /* empty */ }
      if ('get' in Attributes || 'set' in Attributes) throw $TypeError$5('Accessors not supported');
      if ('value' in Attributes) O[P] = Attributes.value;
      return O;
    };

    var ceil = Math.ceil;
    var floor$4 = Math.floor;

    // `Math.trunc` method
    // https://tc39.es/ecma262/#sec-math.trunc
    // eslint-disable-next-line es/no-math-trunc -- safe
    var mathTrunc = Math.trunc || function trunc(x) {
      var n = +x;
      return (n > 0 ? floor$4 : ceil)(n);
    };

    var trunc = mathTrunc;

    // `ToIntegerOrInfinity` abstract operation
    // https://tc39.es/ecma262/#sec-tointegerorinfinity
    var toIntegerOrInfinity$4 = function (argument) {
      var number = +argument;
      // eslint-disable-next-line no-self-compare -- NaN check
      return number !== number || number === 0 ? 0 : trunc(number);
    };

    var toIntegerOrInfinity$3 = toIntegerOrInfinity$4;

    var max$2 = Math.max;
    var min$2 = Math.min;

    // Helper for a popular repeating case of the spec:
    // Let integer be ? ToInteger(index).
    // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
    var toAbsoluteIndex$2 = function (index, length) {
      var integer = toIntegerOrInfinity$3(index);
      return integer < 0 ? max$2(integer + length, 0) : min$2(integer, length);
    };

    var toIntegerOrInfinity$2 = toIntegerOrInfinity$4;

    var min$1 = Math.min;

    // `ToLength` abstract operation
    // https://tc39.es/ecma262/#sec-tolength
    var toLength$2 = function (argument) {
      return argument > 0 ? min$1(toIntegerOrInfinity$2(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
    };

    var toLength$1 = toLength$2;

    // `LengthOfArrayLike` abstract operation
    // https://tc39.es/ecma262/#sec-lengthofarraylike
    var lengthOfArrayLike$3 = function (obj) {
      return toLength$1(obj.length);
    };

    var toIndexedObject$4 = toIndexedObject$5;
    var toAbsoluteIndex$1 = toAbsoluteIndex$2;
    var lengthOfArrayLike$2 = lengthOfArrayLike$3;

    // `Array.prototype.{ indexOf, includes }` methods implementation
    var createMethod$1 = function (IS_INCLUDES) {
      return function ($this, el, fromIndex) {
        var O = toIndexedObject$4($this);
        var length = lengthOfArrayLike$2(O);
        var index = toAbsoluteIndex$1(fromIndex, length);
        var value;
        // Array#includes uses SameValueZero equality algorithm
        // eslint-disable-next-line no-self-compare -- NaN check
        if (IS_INCLUDES && el != el) while (length > index) {
          value = O[index++];
          // eslint-disable-next-line no-self-compare -- NaN check
          if (value != value) return true;
        // Array#indexOf ignores holes, Array#includes - not
        } else for (;length > index; index++) {
          if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
        } return !IS_INCLUDES && -1;
      };
    };

    var arrayIncludes = {
      // `Array.prototype.includes` method
      // https://tc39.es/ecma262/#sec-array.prototype.includes
      includes: createMethod$1(true),
      // `Array.prototype.indexOf` method
      // https://tc39.es/ecma262/#sec-array.prototype.indexof
      indexOf: createMethod$1(false)
    };

    var hiddenKeys$4 = {};

    var uncurryThis$f = functionUncurryThis;
    var hasOwn$9 = hasOwnProperty_1;
    var toIndexedObject$3 = toIndexedObject$5;
    var indexOf$1 = arrayIncludes.indexOf;
    var hiddenKeys$3 = hiddenKeys$4;

    var push$4 = uncurryThis$f([].push);

    var objectKeysInternal = function (object, names) {
      var O = toIndexedObject$3(object);
      var i = 0;
      var result = [];
      var key;
      for (key in O) !hasOwn$9(hiddenKeys$3, key) && hasOwn$9(O, key) && push$4(result, key);
      // Don't enum bug & hidden keys
      while (names.length > i) if (hasOwn$9(O, key = names[i++])) {
        ~indexOf$1(result, key) || push$4(result, key);
      }
      return result;
    };

    // IE8- don't enum bug keys
    var enumBugKeys$3 = [
      'constructor',
      'hasOwnProperty',
      'isPrototypeOf',
      'propertyIsEnumerable',
      'toLocaleString',
      'toString',
      'valueOf'
    ];

    var internalObjectKeys$1 = objectKeysInternal;
    var enumBugKeys$2 = enumBugKeys$3;

    // `Object.keys` method
    // https://tc39.es/ecma262/#sec-object.keys
    // eslint-disable-next-line es/no-object-keys -- safe
    var objectKeys$2 = Object.keys || function keys(O) {
      return internalObjectKeys$1(O, enumBugKeys$2);
    };

    var DESCRIPTORS$8 = descriptors;
    var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
    var definePropertyModule$4 = objectDefineProperty;
    var anObject$a = anObject$c;
    var toIndexedObject$2 = toIndexedObject$5;
    var objectKeys$1 = objectKeys$2;

    // `Object.defineProperties` method
    // https://tc39.es/ecma262/#sec-object.defineproperties
    // eslint-disable-next-line es/no-object-defineproperties -- safe
    objectDefineProperties.f = DESCRIPTORS$8 && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
      anObject$a(O);
      var props = toIndexedObject$2(Properties);
      var keys = objectKeys$1(Properties);
      var length = keys.length;
      var index = 0;
      var key;
      while (length > index) definePropertyModule$4.f(O, key = keys[index++], props[key]);
      return O;
    };

    var getBuiltIn$2 = getBuiltIn$5;

    var html$1 = getBuiltIn$2('document', 'documentElement');

    var shared$2 = sharedExports;
    var uid = uid$2;

    var keys = shared$2('keys');

    var sharedKey$3 = function (key) {
      return keys[key] || (keys[key] = uid(key));
    };

    /* global ActiveXObject -- old IE, WSH */

    var anObject$9 = anObject$c;
    var definePropertiesModule = objectDefineProperties;
    var enumBugKeys$1 = enumBugKeys$3;
    var hiddenKeys$2 = hiddenKeys$4;
    var html = html$1;
    var documentCreateElement = documentCreateElement$2;
    var sharedKey$2 = sharedKey$3;

    var GT = '>';
    var LT = '<';
    var PROTOTYPE = 'prototype';
    var SCRIPT = 'script';
    var IE_PROTO$1 = sharedKey$2('IE_PROTO');

    var EmptyConstructor = function () { /* empty */ };

    var scriptTag = function (content) {
      return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
    };

    // Create object with fake `null` prototype: use ActiveX Object with cleared prototype
    var NullProtoObjectViaActiveX = function (activeXDocument) {
      activeXDocument.write(scriptTag(''));
      activeXDocument.close();
      var temp = activeXDocument.parentWindow.Object;
      activeXDocument = null; // avoid memory leak
      return temp;
    };

    // Create object with fake `null` prototype: use iframe Object with cleared prototype
    var NullProtoObjectViaIFrame = function () {
      // Thrash, waste and sodomy: IE GC bug
      var iframe = documentCreateElement('iframe');
      var JS = 'java' + SCRIPT + ':';
      var iframeDocument;
      iframe.style.display = 'none';
      html.appendChild(iframe);
      // https://github.com/zloirock/core-js/issues/475
      iframe.src = String(JS);
      iframeDocument = iframe.contentWindow.document;
      iframeDocument.open();
      iframeDocument.write(scriptTag('document.F=Object'));
      iframeDocument.close();
      return iframeDocument.F;
    };

    // Check for document.domain and active x support
    // No need to use active x approach when document.domain is not set
    // see https://github.com/es-shims/es5-shim/issues/150
    // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
    // avoid IE GC bug
    var activeXDocument;
    var NullProtoObject = function () {
      try {
        activeXDocument = new ActiveXObject('htmlfile');
      } catch (error) { /* ignore */ }
      NullProtoObject = typeof document != 'undefined'
        ? document.domain && activeXDocument
          ? NullProtoObjectViaActiveX(activeXDocument) // old IE
          : NullProtoObjectViaIFrame()
        : NullProtoObjectViaActiveX(activeXDocument); // WSH
      var length = enumBugKeys$1.length;
      while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys$1[length]];
      return NullProtoObject();
    };

    hiddenKeys$2[IE_PROTO$1] = true;

    // `Object.create` method
    // https://tc39.es/ecma262/#sec-object.create
    // eslint-disable-next-line es/no-object-create -- safe
    var objectCreate = Object.create || function create(O, Properties) {
      var result;
      if (O !== null) {
        EmptyConstructor[PROTOTYPE] = anObject$9(O);
        result = new EmptyConstructor();
        EmptyConstructor[PROTOTYPE] = null;
        // add "__proto__" for Object.getPrototypeOf polyfill
        result[IE_PROTO$1] = O;
      } else result = NullProtoObject();
      return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
    };

    var wellKnownSymbol$c = wellKnownSymbol$e;
    var create$3 = objectCreate;
    var defineProperty$5 = objectDefineProperty.f;

    var UNSCOPABLES = wellKnownSymbol$c('unscopables');
    var ArrayPrototype$1 = Array.prototype;

    // Array.prototype[@@unscopables]
    // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
    if (ArrayPrototype$1[UNSCOPABLES] == undefined) {
      defineProperty$5(ArrayPrototype$1, UNSCOPABLES, {
        configurable: true,
        value: create$3(null)
      });
    }

    // add a key to Array.prototype[@@unscopables]
    var addToUnscopables$1 = function (key) {
      ArrayPrototype$1[UNSCOPABLES][key] = true;
    };

    var iterators = {};

    var global$9 = global$g;
    var isCallable$d = isCallable$j;

    var WeakMap$2 = global$9.WeakMap;

    var weakMapBasicDetection = isCallable$d(WeakMap$2) && /native code/.test(String(WeakMap$2));

    var createPropertyDescriptor$5 = function (bitmap, value) {
      return {
        enumerable: !(bitmap & 1),
        configurable: !(bitmap & 2),
        writable: !(bitmap & 4),
        value: value
      };
    };

    var DESCRIPTORS$7 = descriptors;
    var definePropertyModule$3 = objectDefineProperty;
    var createPropertyDescriptor$4 = createPropertyDescriptor$5;

    var createNonEnumerableProperty$5 = DESCRIPTORS$7 ? function (object, key, value) {
      return definePropertyModule$3.f(object, key, createPropertyDescriptor$4(1, value));
    } : function (object, key, value) {
      object[key] = value;
      return object;
    };

    var NATIVE_WEAK_MAP = weakMapBasicDetection;
    var global$8 = global$g;
    var isObject$3 = isObject$8;
    var createNonEnumerableProperty$4 = createNonEnumerableProperty$5;
    var hasOwn$8 = hasOwnProperty_1;
    var shared$1 = sharedStore;
    var sharedKey$1 = sharedKey$3;
    var hiddenKeys$1 = hiddenKeys$4;

    var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
    var TypeError$3 = global$8.TypeError;
    var WeakMap$1 = global$8.WeakMap;
    var set, get, has;

    var enforce = function (it) {
      return has(it) ? get(it) : set(it, {});
    };

    var getterFor = function (TYPE) {
      return function (it) {
        var state;
        if (!isObject$3(it) || (state = get(it)).type !== TYPE) {
          throw TypeError$3('Incompatible receiver, ' + TYPE + ' required');
        } return state;
      };
    };

    if (NATIVE_WEAK_MAP || shared$1.state) {
      var store$1 = shared$1.state || (shared$1.state = new WeakMap$1());
      /* eslint-disable no-self-assign -- prototype methods protection */
      store$1.get = store$1.get;
      store$1.has = store$1.has;
      store$1.set = store$1.set;
      /* eslint-enable no-self-assign -- prototype methods protection */
      set = function (it, metadata) {
        if (store$1.has(it)) throw TypeError$3(OBJECT_ALREADY_INITIALIZED);
        metadata.facade = it;
        store$1.set(it, metadata);
        return metadata;
      };
      get = function (it) {
        return store$1.get(it) || {};
      };
      has = function (it) {
        return store$1.has(it);
      };
    } else {
      var STATE = sharedKey$1('state');
      hiddenKeys$1[STATE] = true;
      set = function (it, metadata) {
        if (hasOwn$8(it, STATE)) throw TypeError$3(OBJECT_ALREADY_INITIALIZED);
        metadata.facade = it;
        createNonEnumerableProperty$4(it, STATE, metadata);
        return metadata;
      };
      get = function (it) {
        return hasOwn$8(it, STATE) ? it[STATE] : {};
      };
      has = function (it) {
        return hasOwn$8(it, STATE);
      };
    }

    var internalState = {
      set: set,
      get: get,
      has: has,
      enforce: enforce,
      getterFor: getterFor
    };

    var objectGetOwnPropertyDescriptor = {};

    var objectPropertyIsEnumerable = {};

    var $propertyIsEnumerable = {}.propertyIsEnumerable;
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    var getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

    // Nashorn ~ JDK8 bug
    var NASHORN_BUG = getOwnPropertyDescriptor$2 && !$propertyIsEnumerable.call({ 1: 2 }, 1);

    // `Object.prototype.propertyIsEnumerable` method implementation
    // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
    objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
      var descriptor = getOwnPropertyDescriptor$2(this, V);
      return !!descriptor && descriptor.enumerable;
    } : $propertyIsEnumerable;

    var DESCRIPTORS$6 = descriptors;
    var call$a = functionCall;
    var propertyIsEnumerableModule$1 = objectPropertyIsEnumerable;
    var createPropertyDescriptor$3 = createPropertyDescriptor$5;
    var toIndexedObject$1 = toIndexedObject$5;
    var toPropertyKey$1 = toPropertyKey$3;
    var hasOwn$7 = hasOwnProperty_1;
    var IE8_DOM_DEFINE = ie8DomDefine;

    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

    // `Object.getOwnPropertyDescriptor` method
    // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
    objectGetOwnPropertyDescriptor.f = DESCRIPTORS$6 ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
      O = toIndexedObject$1(O);
      P = toPropertyKey$1(P);
      if (IE8_DOM_DEFINE) try {
        return $getOwnPropertyDescriptor(O, P);
      } catch (error) { /* empty */ }
      if (hasOwn$7(O, P)) return createPropertyDescriptor$3(!call$a(propertyIsEnumerableModule$1.f, O, P), O[P]);
    };

    var makeBuiltInExports = {};
    var makeBuiltIn$3 = {
      get exports(){ return makeBuiltInExports; },
      set exports(v){ makeBuiltInExports = v; },
    };

    var DESCRIPTORS$5 = descriptors;
    var hasOwn$6 = hasOwnProperty_1;

    var FunctionPrototype$1 = Function.prototype;
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    var getDescriptor = DESCRIPTORS$5 && Object.getOwnPropertyDescriptor;

    var EXISTS = hasOwn$6(FunctionPrototype$1, 'name');
    // additional protection from minified / mangled / dropped function names
    var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
    var CONFIGURABLE = EXISTS && (!DESCRIPTORS$5 || (DESCRIPTORS$5 && getDescriptor(FunctionPrototype$1, 'name').configurable));

    var functionName = {
      EXISTS: EXISTS,
      PROPER: PROPER,
      CONFIGURABLE: CONFIGURABLE
    };

    var uncurryThis$e = functionUncurryThis;
    var isCallable$c = isCallable$j;
    var store = sharedStore;

    var functionToString = uncurryThis$e(Function.toString);

    // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
    if (!isCallable$c(store.inspectSource)) {
      store.inspectSource = function (it) {
        return functionToString(it);
      };
    }

    var inspectSource$2 = store.inspectSource;

    var fails$b = fails$i;
    var isCallable$b = isCallable$j;
    var hasOwn$5 = hasOwnProperty_1;
    var DESCRIPTORS$4 = descriptors;
    var CONFIGURABLE_FUNCTION_NAME$1 = functionName.CONFIGURABLE;
    var inspectSource$1 = inspectSource$2;
    var InternalStateModule$4 = internalState;

    var enforceInternalState = InternalStateModule$4.enforce;
    var getInternalState$3 = InternalStateModule$4.get;
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    var defineProperty$4 = Object.defineProperty;

    var CONFIGURABLE_LENGTH = DESCRIPTORS$4 && !fails$b(function () {
      return defineProperty$4(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
    });

    var TEMPLATE = String(String).split('String');

    var makeBuiltIn$2 = makeBuiltIn$3.exports = function (value, name, options) {
      if (String(name).slice(0, 7) === 'Symbol(') {
        name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
      }
      if (options && options.getter) name = 'get ' + name;
      if (options && options.setter) name = 'set ' + name;
      if (!hasOwn$5(value, 'name') || (CONFIGURABLE_FUNCTION_NAME$1 && value.name !== name)) {
        if (DESCRIPTORS$4) defineProperty$4(value, 'name', { value: name, configurable: true });
        else value.name = name;
      }
      if (CONFIGURABLE_LENGTH && options && hasOwn$5(options, 'arity') && value.length !== options.arity) {
        defineProperty$4(value, 'length', { value: options.arity });
      }
      try {
        if (options && hasOwn$5(options, 'constructor') && options.constructor) {
          if (DESCRIPTORS$4) defineProperty$4(value, 'prototype', { writable: false });
        // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
        } else if (value.prototype) value.prototype = undefined;
      } catch (error) { /* empty */ }
      var state = enforceInternalState(value);
      if (!hasOwn$5(state, 'source')) {
        state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
      } return value;
    };

    // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
    // eslint-disable-next-line no-extend-native -- required
    Function.prototype.toString = makeBuiltIn$2(function toString() {
      return isCallable$b(this) && getInternalState$3(this).source || inspectSource$1(this);
    }, 'toString');

    var isCallable$a = isCallable$j;
    var definePropertyModule$2 = objectDefineProperty;
    var makeBuiltIn$1 = makeBuiltInExports;
    var defineGlobalProperty$1 = defineGlobalProperty$3;

    var defineBuiltIn$7 = function (O, key, value, options) {
      if (!options) options = {};
      var simple = options.enumerable;
      var name = options.name !== undefined ? options.name : key;
      if (isCallable$a(value)) makeBuiltIn$1(value, name, options);
      if (options.global) {
        if (simple) O[key] = value;
        else defineGlobalProperty$1(key, value);
      } else {
        try {
          if (!options.unsafe) delete O[key];
          else if (O[key]) simple = true;
        } catch (error) { /* empty */ }
        if (simple) O[key] = value;
        else definePropertyModule$2.f(O, key, {
          value: value,
          enumerable: false,
          configurable: !options.nonConfigurable,
          writable: !options.nonWritable
        });
      } return O;
    };

    var objectGetOwnPropertyNames = {};

    var internalObjectKeys = objectKeysInternal;
    var enumBugKeys = enumBugKeys$3;

    var hiddenKeys = enumBugKeys.concat('length', 'prototype');

    // `Object.getOwnPropertyNames` method
    // https://tc39.es/ecma262/#sec-object.getownpropertynames
    // eslint-disable-next-line es/no-object-getownpropertynames -- safe
    objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
      return internalObjectKeys(O, hiddenKeys);
    };

    var objectGetOwnPropertySymbols = {};

    // eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
    objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

    var getBuiltIn$1 = getBuiltIn$5;
    var uncurryThis$d = functionUncurryThis;
    var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
    var getOwnPropertySymbolsModule$1 = objectGetOwnPropertySymbols;
    var anObject$8 = anObject$c;

    var concat$2 = uncurryThis$d([].concat);

    // all object keys, includes non-enumerable and symbols
    var ownKeys$1 = getBuiltIn$1('Reflect', 'ownKeys') || function ownKeys(it) {
      var keys = getOwnPropertyNamesModule.f(anObject$8(it));
      var getOwnPropertySymbols = getOwnPropertySymbolsModule$1.f;
      return getOwnPropertySymbols ? concat$2(keys, getOwnPropertySymbols(it)) : keys;
    };

    var hasOwn$4 = hasOwnProperty_1;
    var ownKeys = ownKeys$1;
    var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
    var definePropertyModule$1 = objectDefineProperty;

    var copyConstructorProperties$1 = function (target, source, exceptions) {
      var keys = ownKeys(source);
      var defineProperty = definePropertyModule$1.f;
      var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (!hasOwn$4(target, key) && !(exceptions && hasOwn$4(exceptions, key))) {
          defineProperty(target, key, getOwnPropertyDescriptor(source, key));
        }
      }
    };

    var fails$a = fails$i;
    var isCallable$9 = isCallable$j;

    var replacement = /#|\.prototype\./;

    var isForced$1 = function (feature, detection) {
      var value = data[normalize(feature)];
      return value == POLYFILL ? true
        : value == NATIVE ? false
        : isCallable$9(detection) ? fails$a(detection)
        : !!detection;
    };

    var normalize = isForced$1.normalize = function (string) {
      return String(string).replace(replacement, '.').toLowerCase();
    };

    var data = isForced$1.data = {};
    var NATIVE = isForced$1.NATIVE = 'N';
    var POLYFILL = isForced$1.POLYFILL = 'P';

    var isForced_1 = isForced$1;

    var global$7 = global$g;
    var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
    var createNonEnumerableProperty$3 = createNonEnumerableProperty$5;
    var defineBuiltIn$6 = defineBuiltIn$7;
    var defineGlobalProperty = defineGlobalProperty$3;
    var copyConstructorProperties = copyConstructorProperties$1;
    var isForced = isForced_1;

    /*
      options.target         - name of the target object
      options.global         - target is the global object
      options.stat           - export as static methods of target
      options.proto          - export as prototype methods of target
      options.real           - real prototype method for the `pure` version
      options.forced         - export even if the native feature is available
      options.bind           - bind methods to the target, required for the `pure` version
      options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
      options.unsafe         - use the simple assignment of property instead of delete + defineProperty
      options.sham           - add a flag to not completely full polyfills
      options.enumerable     - export as enumerable property
      options.dontCallGetSet - prevent calling a getter on target
      options.name           - the .name of the function if it does not match the key
    */
    var _export = function (options, source) {
      var TARGET = options.target;
      var GLOBAL = options.global;
      var STATIC = options.stat;
      var FORCED, target, key, targetProperty, sourceProperty, descriptor;
      if (GLOBAL) {
        target = global$7;
      } else if (STATIC) {
        target = global$7[TARGET] || defineGlobalProperty(TARGET, {});
      } else {
        target = (global$7[TARGET] || {}).prototype;
      }
      if (target) for (key in source) {
        sourceProperty = source[key];
        if (options.dontCallGetSet) {
          descriptor = getOwnPropertyDescriptor$1(target, key);
          targetProperty = descriptor && descriptor.value;
        } else targetProperty = target[key];
        FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
        // contained in target
        if (!FORCED && targetProperty !== undefined) {
          if (typeof sourceProperty == typeof targetProperty) continue;
          copyConstructorProperties(sourceProperty, targetProperty);
        }
        // add a flag to not completely full polyfills
        if (options.sham || (targetProperty && targetProperty.sham)) {
          createNonEnumerableProperty$3(sourceProperty, 'sham', true);
        }
        defineBuiltIn$6(target, key, sourceProperty, options);
      }
    };

    var fails$9 = fails$i;

    var correctPrototypeGetter = !fails$9(function () {
      function F() { /* empty */ }
      F.prototype.constructor = null;
      // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
      return Object.getPrototypeOf(new F()) !== F.prototype;
    });

    var hasOwn$3 = hasOwnProperty_1;
    var isCallable$8 = isCallable$j;
    var toObject$3 = toObject$5;
    var sharedKey = sharedKey$3;
    var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

    var IE_PROTO = sharedKey('IE_PROTO');
    var $Object$1 = Object;
    var ObjectPrototype = $Object$1.prototype;

    // `Object.getPrototypeOf` method
    // https://tc39.es/ecma262/#sec-object.getprototypeof
    // eslint-disable-next-line es/no-object-getprototypeof -- safe
    var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? $Object$1.getPrototypeOf : function (O) {
      var object = toObject$3(O);
      if (hasOwn$3(object, IE_PROTO)) return object[IE_PROTO];
      var constructor = object.constructor;
      if (isCallable$8(constructor) && object instanceof constructor) {
        return constructor.prototype;
      } return object instanceof $Object$1 ? ObjectPrototype : null;
    };

    var fails$8 = fails$i;
    var isCallable$7 = isCallable$j;
    var isObject$2 = isObject$8;
    var getPrototypeOf$1 = objectGetPrototypeOf;
    var defineBuiltIn$5 = defineBuiltIn$7;
    var wellKnownSymbol$b = wellKnownSymbol$e;

    var ITERATOR$6 = wellKnownSymbol$b('iterator');
    var BUGGY_SAFARI_ITERATORS$1 = false;

    // `%IteratorPrototype%` object
    // https://tc39.es/ecma262/#sec-%iteratorprototype%-object
    var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;

    /* eslint-disable es/no-array-prototype-keys -- safe */
    if ([].keys) {
      arrayIterator = [].keys();
      // Safari 8 has buggy iterators w/o `next`
      if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
      else {
        PrototypeOfArrayIteratorPrototype = getPrototypeOf$1(getPrototypeOf$1(arrayIterator));
        if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
      }
    }

    var NEW_ITERATOR_PROTOTYPE = !isObject$2(IteratorPrototype$2) || fails$8(function () {
      var test = {};
      // FF44- legacy iterators case
      return IteratorPrototype$2[ITERATOR$6].call(test) !== test;
    });

    if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};

    // `%IteratorPrototype%[@@iterator]()` method
    // https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
    if (!isCallable$7(IteratorPrototype$2[ITERATOR$6])) {
      defineBuiltIn$5(IteratorPrototype$2, ITERATOR$6, function () {
        return this;
      });
    }

    var iteratorsCore = {
      IteratorPrototype: IteratorPrototype$2,
      BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
    };

    var defineProperty$3 = objectDefineProperty.f;
    var hasOwn$2 = hasOwnProperty_1;
    var wellKnownSymbol$a = wellKnownSymbol$e;

    var TO_STRING_TAG$3 = wellKnownSymbol$a('toStringTag');

    var setToStringTag$4 = function (target, TAG, STATIC) {
      if (target && !STATIC) target = target.prototype;
      if (target && !hasOwn$2(target, TO_STRING_TAG$3)) {
        defineProperty$3(target, TO_STRING_TAG$3, { configurable: true, value: TAG });
      }
    };

    var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
    var create$2 = objectCreate;
    var createPropertyDescriptor$2 = createPropertyDescriptor$5;
    var setToStringTag$3 = setToStringTag$4;
    var Iterators$4 = iterators;

    var returnThis$1 = function () { return this; };

    var iteratorCreateConstructor = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
      var TO_STRING_TAG = NAME + ' Iterator';
      IteratorConstructor.prototype = create$2(IteratorPrototype$1, { next: createPropertyDescriptor$2(+!ENUMERABLE_NEXT, next) });
      setToStringTag$3(IteratorConstructor, TO_STRING_TAG, false);
      Iterators$4[TO_STRING_TAG] = returnThis$1;
      return IteratorConstructor;
    };

    var isCallable$6 = isCallable$j;

    var $String$1 = String;
    var $TypeError$4 = TypeError;

    var aPossiblePrototype$1 = function (argument) {
      if (typeof argument == 'object' || isCallable$6(argument)) return argument;
      throw $TypeError$4("Can't set " + $String$1(argument) + ' as a prototype');
    };

    /* eslint-disable no-proto -- safe */

    var uncurryThis$c = functionUncurryThis;
    var anObject$7 = anObject$c;
    var aPossiblePrototype = aPossiblePrototype$1;

    // `Object.setPrototypeOf` method
    // https://tc39.es/ecma262/#sec-object.setprototypeof
    // Works with __proto__ only. Old v8 can't work with null proto objects.
    // eslint-disable-next-line es/no-object-setprototypeof -- safe
    var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
      var CORRECT_SETTER = false;
      var test = {};
      var setter;
      try {
        // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
        setter = uncurryThis$c(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
        setter(test, []);
        CORRECT_SETTER = test instanceof Array;
      } catch (error) { /* empty */ }
      return function setPrototypeOf(O, proto) {
        anObject$7(O);
        aPossiblePrototype(proto);
        if (CORRECT_SETTER) setter(O, proto);
        else O.__proto__ = proto;
        return O;
      };
    }() : undefined);

    var $$3 = _export;
    var call$9 = functionCall;
    var FunctionName = functionName;
    var isCallable$5 = isCallable$j;
    var createIteratorConstructor$1 = iteratorCreateConstructor;
    var getPrototypeOf = objectGetPrototypeOf;
    var setPrototypeOf = objectSetPrototypeOf;
    var setToStringTag$2 = setToStringTag$4;
    var createNonEnumerableProperty$2 = createNonEnumerableProperty$5;
    var defineBuiltIn$4 = defineBuiltIn$7;
    var wellKnownSymbol$9 = wellKnownSymbol$e;
    var Iterators$3 = iterators;
    var IteratorsCore = iteratorsCore;

    var PROPER_FUNCTION_NAME = FunctionName.PROPER;
    var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
    var IteratorPrototype = IteratorsCore.IteratorPrototype;
    var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
    var ITERATOR$5 = wellKnownSymbol$9('iterator');
    var KEYS = 'keys';
    var VALUES = 'values';
    var ENTRIES = 'entries';

    var returnThis = function () { return this; };

    var iteratorDefine = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
      createIteratorConstructor$1(IteratorConstructor, NAME, next);

      var getIterationMethod = function (KIND) {
        if (KIND === DEFAULT && defaultIterator) return defaultIterator;
        if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
        switch (KIND) {
          case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
          case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
          case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
        } return function () { return new IteratorConstructor(this); };
      };

      var TO_STRING_TAG = NAME + ' Iterator';
      var INCORRECT_VALUES_NAME = false;
      var IterablePrototype = Iterable.prototype;
      var nativeIterator = IterablePrototype[ITERATOR$5]
        || IterablePrototype['@@iterator']
        || DEFAULT && IterablePrototype[DEFAULT];
      var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
      var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
      var CurrentIteratorPrototype, methods, KEY;

      // fix native
      if (anyNativeIterator) {
        CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
        if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
          if (getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
            if (setPrototypeOf) {
              setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
            } else if (!isCallable$5(CurrentIteratorPrototype[ITERATOR$5])) {
              defineBuiltIn$4(CurrentIteratorPrototype, ITERATOR$5, returnThis);
            }
          }
          // Set @@toStringTag to native iterators
          setToStringTag$2(CurrentIteratorPrototype, TO_STRING_TAG, true);
        }
      }

      // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
      if (PROPER_FUNCTION_NAME && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
        if (CONFIGURABLE_FUNCTION_NAME) {
          createNonEnumerableProperty$2(IterablePrototype, 'name', VALUES);
        } else {
          INCORRECT_VALUES_NAME = true;
          defaultIterator = function values() { return call$9(nativeIterator, this); };
        }
      }

      // export additional methods
      if (DEFAULT) {
        methods = {
          values: getIterationMethod(VALUES),
          keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
          entries: getIterationMethod(ENTRIES)
        };
        if (FORCED) for (KEY in methods) {
          if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
            defineBuiltIn$4(IterablePrototype, KEY, methods[KEY]);
          }
        } else $$3({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
      }

      // define iterator
      if (IterablePrototype[ITERATOR$5] !== defaultIterator) {
        defineBuiltIn$4(IterablePrototype, ITERATOR$5, defaultIterator, { name: DEFAULT });
      }
      Iterators$3[NAME] = defaultIterator;

      return methods;
    };

    // `CreateIterResultObject` abstract operation
    // https://tc39.es/ecma262/#sec-createiterresultobject
    var createIterResultObject$2 = function (value, done) {
      return { value: value, done: done };
    };

    var toIndexedObject = toIndexedObject$5;
    var addToUnscopables = addToUnscopables$1;
    var Iterators$2 = iterators;
    var InternalStateModule$3 = internalState;
    var defineProperty$2 = objectDefineProperty.f;
    var defineIterator$1 = iteratorDefine;
    var createIterResultObject$1 = createIterResultObject$2;
    var DESCRIPTORS$3 = descriptors;

    var ARRAY_ITERATOR = 'Array Iterator';
    var setInternalState$3 = InternalStateModule$3.set;
    var getInternalState$2 = InternalStateModule$3.getterFor(ARRAY_ITERATOR);

    // `Array.prototype.entries` method
    // https://tc39.es/ecma262/#sec-array.prototype.entries
    // `Array.prototype.keys` method
    // https://tc39.es/ecma262/#sec-array.prototype.keys
    // `Array.prototype.values` method
    // https://tc39.es/ecma262/#sec-array.prototype.values
    // `Array.prototype[@@iterator]` method
    // https://tc39.es/ecma262/#sec-array.prototype-@@iterator
    // `CreateArrayIterator` internal method
    // https://tc39.es/ecma262/#sec-createarrayiterator
    var es_array_iterator = defineIterator$1(Array, 'Array', function (iterated, kind) {
      setInternalState$3(this, {
        type: ARRAY_ITERATOR,
        target: toIndexedObject(iterated), // target
        index: 0,                          // next index
        kind: kind                         // kind
      });
    // `%ArrayIteratorPrototype%.next` method
    // https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
    }, function () {
      var state = getInternalState$2(this);
      var target = state.target;
      var kind = state.kind;
      var index = state.index++;
      if (!target || index >= target.length) {
        state.target = undefined;
        return createIterResultObject$1(undefined, true);
      }
      if (kind == 'keys') return createIterResultObject$1(index, false);
      if (kind == 'values') return createIterResultObject$1(target[index], false);
      return createIterResultObject$1([index, target[index]], false);
    }, 'values');

    // argumentsList[@@iterator] is %ArrayProto_values%
    // https://tc39.es/ecma262/#sec-createunmappedargumentsobject
    // https://tc39.es/ecma262/#sec-createmappedargumentsobject
    var values = Iterators$2.Arguments = Iterators$2.Array;

    // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
    addToUnscopables('keys');
    addToUnscopables('values');
    addToUnscopables('entries');

    // V8 ~ Chrome 45- bug
    if (DESCRIPTORS$3 && values.name !== 'values') try {
      defineProperty$2(values, 'name', { value: 'values' });
    } catch (error) { /* empty */ }

    var global$6 = global$g;
    var DOMIterables = domIterables;
    var DOMTokenListPrototype = domTokenListPrototype;
    var ArrayIteratorMethods = es_array_iterator;
    var createNonEnumerableProperty$1 = createNonEnumerableProperty$5;
    var wellKnownSymbol$8 = wellKnownSymbol$e;

    var ITERATOR$4 = wellKnownSymbol$8('iterator');
    var TO_STRING_TAG$2 = wellKnownSymbol$8('toStringTag');
    var ArrayValues = ArrayIteratorMethods.values;

    var handlePrototype = function (CollectionPrototype, COLLECTION_NAME) {
      if (CollectionPrototype) {
        // some Chrome versions have non-configurable methods on DOMTokenList
        if (CollectionPrototype[ITERATOR$4] !== ArrayValues) try {
          createNonEnumerableProperty$1(CollectionPrototype, ITERATOR$4, ArrayValues);
        } catch (error) {
          CollectionPrototype[ITERATOR$4] = ArrayValues;
        }
        if (!CollectionPrototype[TO_STRING_TAG$2]) {
          createNonEnumerableProperty$1(CollectionPrototype, TO_STRING_TAG$2, COLLECTION_NAME);
        }
        if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
          // some Chrome versions have non-configurable methods on DOMTokenList
          if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
            createNonEnumerableProperty$1(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
          } catch (error) {
            CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
          }
        }
      }
    };

    for (var COLLECTION_NAME in DOMIterables) {
      handlePrototype(global$6[COLLECTION_NAME] && global$6[COLLECTION_NAME].prototype, COLLECTION_NAME);
    }

    handlePrototype(DOMTokenListPrototype, 'DOMTokenList');

    /**
     * 错误码定义
     */
    const CONST_CODE = {
      /** 软手柄服务端返回错误码对应的文本消息 */
      SHANDLE_FAILED_CODE: {
        1001: "账号或密码错误",
        1002: "该帐号已连接",
        1004: "没有鉴权",
        9001: "SIP号码已注册,抢注册失败",
        // 下面是 SIP 协议错误码，对应呼叫失败的返回
        404: "没有找到对应的设备",
        408: "呼叫超时",
        486: "对方正忙",
        487: "对方挂断",
        488: "对方拒绝"
      }
    };

    /**
     * 默认的初始化参数
     */
    const DEF_INIT_OPTS = Object.freeze({
      configs: {
        janusUrl: "",
        autoRegister: true,
        ringFile: ""
      },
      registerInfo: {
        username: "",
        displayName: "",
        sipServerIp: "127.0.0.1",
        sipServerPort: 5060
      }
    });

    /**
     * 默认的媒体选项
     */
    const DEF_MEDIA_OPTS = Object.freeze({
      audioSend: true,
      audioRecv: true,
      videoSend: false,
      videoRecv: false
    });

    /**
     * Janus SIP 事件类型
     */
    const SipEvent = {
      /** 呼入通知 */
      INCOMING_CALL: "incomingcall",
      /** 振铃通知 */
      RINGING: "ringing",
      /** 应答通知 */
      ACCEPTED: "accepted",
      /** 挂机通知（对端挂断） */
      HANGUP: "hangup",
      /** 主动挂机通知（本机挂机后服务器确认） */
      HANGINGUP: "hangingup",
      /** 注册失败通知 */
      REGISTRATION_FAILED: "registration_failed",
      /** 注册成功通知 */
      REGISTERED: "registered",
      /** 注消结果通知 */
      UNREGISTERING: "unregistering",
      /** 呼叫操作结果通知 */
      CALLING: "calling",
      /** 应答操作结果通知（通话建立）（对端应答、本机应答） */
      ACCEPT_REPLY: "accept_reply",
      /** 返呼确认通知 */
      NEW_ACCEPTED: "new_accepted",
      /** 更新媒体流 */
      UPDATING: "updating"
    };

    var wellKnownSymbol$7 = wellKnownSymbol$e;

    var TO_STRING_TAG$1 = wellKnownSymbol$7('toStringTag');
    var test = {};

    test[TO_STRING_TAG$1] = 'z';

    var toStringTagSupport = String(test) === '[object z]';

    var TO_STRING_TAG_SUPPORT = toStringTagSupport;
    var isCallable$4 = isCallable$j;
    var classofRaw$1 = classofRaw$2;
    var wellKnownSymbol$6 = wellKnownSymbol$e;

    var TO_STRING_TAG = wellKnownSymbol$6('toStringTag');
    var $Object = Object;

    // ES3 wrong here
    var CORRECT_ARGUMENTS = classofRaw$1(function () { return arguments; }()) == 'Arguments';

    // fallback for IE11 Script Access Denied error
    var tryGet = function (it, key) {
      try {
        return it[key];
      } catch (error) { /* empty */ }
    };

    // getting tag from ES6+ `Object.prototype.toString`
    var classof$5 = TO_STRING_TAG_SUPPORT ? classofRaw$1 : function (it) {
      var O, tag, result;
      return it === undefined ? 'Undefined' : it === null ? 'Null'
        // @@toStringTag case
        : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag
        // builtinTag case
        : CORRECT_ARGUMENTS ? classofRaw$1(O)
        // ES3 arguments fallback
        : (result = classofRaw$1(O)) == 'Object' && isCallable$4(O.callee) ? 'Arguments' : result;
    };

    var classof$4 = classof$5;

    var $String = String;

    var toString$4 = function (argument) {
      if (classof$4(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
      return $String(argument);
    };

    var anObject$6 = anObject$c;

    // `RegExp.prototype.flags` getter implementation
    // https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
    var regexpFlags$1 = function () {
      var that = anObject$6(this);
      var result = '';
      if (that.hasIndices) result += 'd';
      if (that.global) result += 'g';
      if (that.ignoreCase) result += 'i';
      if (that.multiline) result += 'm';
      if (that.dotAll) result += 's';
      if (that.unicode) result += 'u';
      if (that.unicodeSets) result += 'v';
      if (that.sticky) result += 'y';
      return result;
    };

    var fails$7 = fails$i;
    var global$5 = global$g;

    // babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
    var $RegExp$2 = global$5.RegExp;

    var UNSUPPORTED_Y$1 = fails$7(function () {
      var re = $RegExp$2('a', 'y');
      re.lastIndex = 2;
      return re.exec('abcd') != null;
    });

    // UC Browser bug
    // https://github.com/zloirock/core-js/issues/1008
    var MISSED_STICKY = UNSUPPORTED_Y$1 || fails$7(function () {
      return !$RegExp$2('a', 'y').sticky;
    });

    var BROKEN_CARET = UNSUPPORTED_Y$1 || fails$7(function () {
      // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
      var re = $RegExp$2('^r', 'gy');
      re.lastIndex = 2;
      return re.exec('str') != null;
    });

    var regexpStickyHelpers = {
      BROKEN_CARET: BROKEN_CARET,
      MISSED_STICKY: MISSED_STICKY,
      UNSUPPORTED_Y: UNSUPPORTED_Y$1
    };

    var fails$6 = fails$i;
    var global$4 = global$g;

    // babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
    var $RegExp$1 = global$4.RegExp;

    var regexpUnsupportedDotAll = fails$6(function () {
      var re = $RegExp$1('.', 's');
      return !(re.dotAll && re.exec('\n') && re.flags === 's');
    });

    var fails$5 = fails$i;
    var global$3 = global$g;

    // babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
    var $RegExp = global$3.RegExp;

    var regexpUnsupportedNcg = fails$5(function () {
      var re = $RegExp('(?<a>b)', 'g');
      return re.exec('b').groups.a !== 'b' ||
        'b'.replace(re, '$<a>c') !== 'bc';
    });

    /* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
    /* eslint-disable regexp/no-useless-quantifier -- testing */
    var call$8 = functionCall;
    var uncurryThis$b = functionUncurryThis;
    var toString$3 = toString$4;
    var regexpFlags = regexpFlags$1;
    var stickyHelpers = regexpStickyHelpers;
    var shared = sharedExports;
    var create$1 = objectCreate;
    var getInternalState$1 = internalState.get;
    var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
    var UNSUPPORTED_NCG = regexpUnsupportedNcg;

    var nativeReplace = shared('native-string-replace', String.prototype.replace);
    var nativeExec = RegExp.prototype.exec;
    var patchedExec = nativeExec;
    var charAt$6 = uncurryThis$b(''.charAt);
    var indexOf = uncurryThis$b(''.indexOf);
    var replace$4 = uncurryThis$b(''.replace);
    var stringSlice$5 = uncurryThis$b(''.slice);

    var UPDATES_LAST_INDEX_WRONG = (function () {
      var re1 = /a/;
      var re2 = /b*/g;
      call$8(nativeExec, re1, 'a');
      call$8(nativeExec, re2, 'a');
      return re1.lastIndex !== 0 || re2.lastIndex !== 0;
    })();

    var UNSUPPORTED_Y = stickyHelpers.BROKEN_CARET;

    // nonparticipating capturing group, copied from es5-shim's String#split patch.
    var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

    var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

    if (PATCH) {
      patchedExec = function exec(string) {
        var re = this;
        var state = getInternalState$1(re);
        var str = toString$3(string);
        var raw = state.raw;
        var result, reCopy, lastIndex, match, i, object, group;

        if (raw) {
          raw.lastIndex = re.lastIndex;
          result = call$8(patchedExec, raw, str);
          re.lastIndex = raw.lastIndex;
          return result;
        }

        var groups = state.groups;
        var sticky = UNSUPPORTED_Y && re.sticky;
        var flags = call$8(regexpFlags, re);
        var source = re.source;
        var charsAdded = 0;
        var strCopy = str;

        if (sticky) {
          flags = replace$4(flags, 'y', '');
          if (indexOf(flags, 'g') === -1) {
            flags += 'g';
          }

          strCopy = stringSlice$5(str, re.lastIndex);
          // Support anchored sticky behavior.
          if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt$6(str, re.lastIndex - 1) !== '\n')) {
            source = '(?: ' + source + ')';
            strCopy = ' ' + strCopy;
            charsAdded++;
          }
          // ^(? + rx + ) is needed, in combination with some str slicing, to
          // simulate the 'y' flag.
          reCopy = new RegExp('^(?:' + source + ')', flags);
        }

        if (NPCG_INCLUDED) {
          reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
        }
        if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

        match = call$8(nativeExec, sticky ? reCopy : re, strCopy);

        if (sticky) {
          if (match) {
            match.input = stringSlice$5(match.input, charsAdded);
            match[0] = stringSlice$5(match[0], charsAdded);
            match.index = re.lastIndex;
            re.lastIndex += match[0].length;
          } else re.lastIndex = 0;
        } else if (UPDATES_LAST_INDEX_WRONG && match) {
          re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
        }
        if (NPCG_INCLUDED && match && match.length > 1) {
          // Fix browsers whose `exec` methods don't consistently return `undefined`
          // for NPCG, like IE8. NOTE: This doesn't work for /(.?)?/
          call$8(nativeReplace, match[0], reCopy, function () {
            for (i = 1; i < arguments.length - 2; i++) {
              if (arguments[i] === undefined) match[i] = undefined;
            }
          });
        }

        if (match && groups) {
          match.groups = object = create$1(null);
          for (i = 0; i < groups.length; i++) {
            group = groups[i];
            object[group[0]] = match[group[1]];
          }
        }

        return match;
      };
    }

    var regexpExec$2 = patchedExec;

    var $$2 = _export;
    var exec$3 = regexpExec$2;

    // `RegExp.prototype.exec` method
    // https://tc39.es/ecma262/#sec-regexp.prototype.exec
    $$2({ target: 'RegExp', proto: true, forced: /./.exec !== exec$3 }, {
      exec: exec$3
    });

    var NATIVE_BIND$1 = functionBindNative;

    var FunctionPrototype = Function.prototype;
    var apply$1 = FunctionPrototype.apply;
    var call$7 = FunctionPrototype.call;

    // eslint-disable-next-line es/no-reflect -- safe
    var functionApply = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND$1 ? call$7.bind(apply$1) : function () {
      return call$7.apply(apply$1, arguments);
    });

    var classofRaw = classofRaw$2;
    var uncurryThis$a = functionUncurryThis;

    var functionUncurryThisClause = function (fn) {
      // Nashorn bug:
      //   https://github.com/zloirock/core-js/issues/1128
      //   https://github.com/zloirock/core-js/issues/1130
      if (classofRaw(fn) === 'Function') return uncurryThis$a(fn);
    };

    // TODO: Remove from `core-js@4` since it's moved to entry points

    var uncurryThis$9 = functionUncurryThisClause;
    var defineBuiltIn$3 = defineBuiltIn$7;
    var regexpExec$1 = regexpExec$2;
    var fails$4 = fails$i;
    var wellKnownSymbol$5 = wellKnownSymbol$e;
    var createNonEnumerableProperty = createNonEnumerableProperty$5;

    var SPECIES = wellKnownSymbol$5('species');
    var RegExpPrototype = RegExp.prototype;

    var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
      var SYMBOL = wellKnownSymbol$5(KEY);

      var DELEGATES_TO_SYMBOL = !fails$4(function () {
        // String methods call symbol-named RegEp methods
        var O = {};
        O[SYMBOL] = function () { return 7; };
        return ''[KEY](O) != 7;
      });

      var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$4(function () {
        // Symbol-named RegExp methods call .exec
        var execCalled = false;
        var re = /a/;

        if (KEY === 'split') {
          // We can't use real regex here since it causes deoptimization
          // and serious performance degradation in V8
          // https://github.com/zloirock/core-js/issues/306
          re = {};
          // RegExp[@@split] doesn't call the regex's exec method, but first creates
          // a new one. We need to return the patched regex when creating the new one.
          re.constructor = {};
          re.constructor[SPECIES] = function () { return re; };
          re.flags = '';
          re[SYMBOL] = /./[SYMBOL];
        }

        re.exec = function () { execCalled = true; return null; };

        re[SYMBOL]('');
        return !execCalled;
      });

      if (
        !DELEGATES_TO_SYMBOL ||
        !DELEGATES_TO_EXEC ||
        FORCED
      ) {
        var uncurriedNativeRegExpMethod = uncurryThis$9(/./[SYMBOL]);
        var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
          var uncurriedNativeMethod = uncurryThis$9(nativeMethod);
          var $exec = regexp.exec;
          if ($exec === regexpExec$1 || $exec === RegExpPrototype.exec) {
            if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
              // The native String method already delegates to @@method (this
              // polyfilled function), leasing to infinite recursion.
              // We avoid it by directly calling the native @@method method.
              return { done: true, value: uncurriedNativeRegExpMethod(regexp, str, arg2) };
            }
            return { done: true, value: uncurriedNativeMethod(str, regexp, arg2) };
          }
          return { done: false };
        });

        defineBuiltIn$3(String.prototype, KEY, methods[0]);
        defineBuiltIn$3(RegExpPrototype, SYMBOL, methods[1]);
      }

      if (SHAM) createNonEnumerableProperty(RegExpPrototype[SYMBOL], 'sham', true);
    };

    var uncurryThis$8 = functionUncurryThis;
    var toIntegerOrInfinity$1 = toIntegerOrInfinity$4;
    var toString$2 = toString$4;
    var requireObjectCoercible$1 = requireObjectCoercible$4;

    var charAt$5 = uncurryThis$8(''.charAt);
    var charCodeAt$1 = uncurryThis$8(''.charCodeAt);
    var stringSlice$4 = uncurryThis$8(''.slice);

    var createMethod = function (CONVERT_TO_STRING) {
      return function ($this, pos) {
        var S = toString$2(requireObjectCoercible$1($this));
        var position = toIntegerOrInfinity$1(pos);
        var size = S.length;
        var first, second;
        if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
        first = charCodeAt$1(S, position);
        return first < 0xD800 || first > 0xDBFF || position + 1 === size
          || (second = charCodeAt$1(S, position + 1)) < 0xDC00 || second > 0xDFFF
            ? CONVERT_TO_STRING
              ? charAt$5(S, position)
              : first
            : CONVERT_TO_STRING
              ? stringSlice$4(S, position, position + 2)
              : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
      };
    };

    var stringMultibyte = {
      // `String.prototype.codePointAt` method
      // https://tc39.es/ecma262/#sec-string.prototype.codepointat
      codeAt: createMethod(false),
      // `String.prototype.at` method
      // https://github.com/mathiasbynens/String.prototype.at
      charAt: createMethod(true)
    };

    var charAt$4 = stringMultibyte.charAt;

    // `AdvanceStringIndex` abstract operation
    // https://tc39.es/ecma262/#sec-advancestringindex
    var advanceStringIndex$1 = function (S, index, unicode) {
      return index + (unicode ? charAt$4(S, index).length : 1);
    };

    var uncurryThis$7 = functionUncurryThis;
    var toObject$2 = toObject$5;

    var floor$3 = Math.floor;
    var charAt$3 = uncurryThis$7(''.charAt);
    var replace$3 = uncurryThis$7(''.replace);
    var stringSlice$3 = uncurryThis$7(''.slice);
    var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
    var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

    // `GetSubstitution` abstract operation
    // https://tc39.es/ecma262/#sec-getsubstitution
    var getSubstitution$1 = function (matched, str, position, captures, namedCaptures, replacement) {
      var tailPos = position + matched.length;
      var m = captures.length;
      var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
      if (namedCaptures !== undefined) {
        namedCaptures = toObject$2(namedCaptures);
        symbols = SUBSTITUTION_SYMBOLS;
      }
      return replace$3(replacement, symbols, function (match, ch) {
        var capture;
        switch (charAt$3(ch, 0)) {
          case '$': return '$';
          case '&': return matched;
          case '`': return stringSlice$3(str, 0, position);
          case "'": return stringSlice$3(str, tailPos);
          case '<':
            capture = namedCaptures[stringSlice$3(ch, 1, -1)];
            break;
          default: // \d\d?
            var n = +ch;
            if (n === 0) return match;
            if (n > m) {
              var f = floor$3(n / 10);
              if (f === 0) return match;
              if (f <= m) return captures[f - 1] === undefined ? charAt$3(ch, 1) : captures[f - 1] + charAt$3(ch, 1);
              return match;
            }
            capture = captures[n - 1];
        }
        return capture === undefined ? '' : capture;
      });
    };

    var call$6 = functionCall;
    var anObject$5 = anObject$c;
    var isCallable$3 = isCallable$j;
    var classof$3 = classofRaw$2;
    var regexpExec = regexpExec$2;

    var $TypeError$3 = TypeError;

    // `RegExpExec` abstract operation
    // https://tc39.es/ecma262/#sec-regexpexec
    var regexpExecAbstract = function (R, S) {
      var exec = R.exec;
      if (isCallable$3(exec)) {
        var result = call$6(exec, R, S);
        if (result !== null) anObject$5(result);
        return result;
      }
      if (classof$3(R) === 'RegExp') return call$6(regexpExec, R, S);
      throw $TypeError$3('RegExp#exec called on incompatible receiver');
    };

    var apply = functionApply;
    var call$5 = functionCall;
    var uncurryThis$6 = functionUncurryThis;
    var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
    var fails$3 = fails$i;
    var anObject$4 = anObject$c;
    var isCallable$2 = isCallable$j;
    var isNullOrUndefined$1 = isNullOrUndefined$4;
    var toIntegerOrInfinity = toIntegerOrInfinity$4;
    var toLength = toLength$2;
    var toString$1 = toString$4;
    var requireObjectCoercible = requireObjectCoercible$4;
    var advanceStringIndex = advanceStringIndex$1;
    var getMethod$2 = getMethod$4;
    var getSubstitution = getSubstitution$1;
    var regExpExec = regexpExecAbstract;
    var wellKnownSymbol$4 = wellKnownSymbol$e;

    var REPLACE = wellKnownSymbol$4('replace');
    var max$1 = Math.max;
    var min = Math.min;
    var concat$1 = uncurryThis$6([].concat);
    var push$3 = uncurryThis$6([].push);
    var stringIndexOf = uncurryThis$6(''.indexOf);
    var stringSlice$2 = uncurryThis$6(''.slice);

    var maybeToString = function (it) {
      return it === undefined ? it : String(it);
    };

    // IE <= 11 replaces $0 with the whole match, as if it was $&
    // https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
    var REPLACE_KEEPS_$0 = (function () {
      // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
      return 'a'.replace(/./, '$0') === '$0';
    })();

    // Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
    var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
      if (/./[REPLACE]) {
        return /./[REPLACE]('a', '$0') === '';
      }
      return false;
    })();

    var REPLACE_SUPPORTS_NAMED_GROUPS = !fails$3(function () {
      var re = /./;
      re.exec = function () {
        var result = [];
        result.groups = { a: '7' };
        return result;
      };
      // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive
      return ''.replace(re, '$<a>') !== '7';
    });

    // @@replace logic
    fixRegExpWellKnownSymbolLogic('replace', function (_, nativeReplace, maybeCallNative) {
      var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

      return [
        // `String.prototype.replace` method
        // https://tc39.es/ecma262/#sec-string.prototype.replace
        function replace(searchValue, replaceValue) {
          var O = requireObjectCoercible(this);
          var replacer = isNullOrUndefined$1(searchValue) ? undefined : getMethod$2(searchValue, REPLACE);
          return replacer
            ? call$5(replacer, searchValue, O, replaceValue)
            : call$5(nativeReplace, toString$1(O), searchValue, replaceValue);
        },
        // `RegExp.prototype[@@replace]` method
        // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
        function (string, replaceValue) {
          var rx = anObject$4(this);
          var S = toString$1(string);

          if (
            typeof replaceValue == 'string' &&
            stringIndexOf(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
            stringIndexOf(replaceValue, '$<') === -1
          ) {
            var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
            if (res.done) return res.value;
          }

          var functionalReplace = isCallable$2(replaceValue);
          if (!functionalReplace) replaceValue = toString$1(replaceValue);

          var global = rx.global;
          if (global) {
            var fullUnicode = rx.unicode;
            rx.lastIndex = 0;
          }
          var results = [];
          while (true) {
            var result = regExpExec(rx, S);
            if (result === null) break;

            push$3(results, result);
            if (!global) break;

            var matchStr = toString$1(result[0]);
            if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
          }

          var accumulatedResult = '';
          var nextSourcePosition = 0;
          for (var i = 0; i < results.length; i++) {
            result = results[i];

            var matched = toString$1(result[0]);
            var position = max$1(min(toIntegerOrInfinity(result.index), S.length), 0);
            var captures = [];
            // NOTE: This is equivalent to
            //   captures = result.slice(1).map(maybeToString)
            // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
            // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
            // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
            for (var j = 1; j < result.length; j++) push$3(captures, maybeToString(result[j]));
            var namedCaptures = result.groups;
            if (functionalReplace) {
              var replacerArgs = concat$1([matched], captures, position, S);
              if (namedCaptures !== undefined) push$3(replacerArgs, namedCaptures);
              var replacement = toString$1(apply(replaceValue, undefined, replacerArgs));
            } else {
              replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
            }
            if (position >= nextSourcePosition) {
              accumulatedResult += stringSlice$2(S, nextSourcePosition, position) + replacement;
              nextSourcePosition = position + matched.length;
            }
          }
          return accumulatedResult + stringSlice$2(S, nextSourcePosition);
        }
      ];
    }, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);

    /*
     *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
     *
     *  Use of this source code is governed by a BSD-style license
     *  that can be found in the LICENSE file in the root of the source
     *  tree.
     */

    let logDisabled_ = true;
    let deprecationWarnings_ = true;

    /**
     * Extract browser version out of the provided user agent string.
     *
     * @param {!string} uastring userAgent string.
     * @param {!string} expr Regular expression used as match criteria.
     * @param {!number} pos position in the version string to be returned.
     * @return {!number} browser version.
     */
    function extractVersion(uastring, expr, pos) {
      const match = uastring.match(expr);
      return match && match.length >= pos && parseInt(match[pos], 10);
    }

    // Wraps the peerconnection event eventNameToWrap in a function
    // which returns the modified event object (or false to prevent
    // the event).
    function wrapPeerConnectionEvent(window, eventNameToWrap, wrapper) {
      if (!window.RTCPeerConnection) {
        return;
      }
      const proto = window.RTCPeerConnection.prototype;
      const nativeAddEventListener = proto.addEventListener;
      proto.addEventListener = function(nativeEventName, cb) {
        if (nativeEventName !== eventNameToWrap) {
          return nativeAddEventListener.apply(this, arguments);
        }
        const wrappedCallback = (e) => {
          const modifiedEvent = wrapper(e);
          if (modifiedEvent) {
            if (cb.handleEvent) {
              cb.handleEvent(modifiedEvent);
            } else {
              cb(modifiedEvent);
            }
          }
        };
        this._eventMap = this._eventMap || {};
        if (!this._eventMap[eventNameToWrap]) {
          this._eventMap[eventNameToWrap] = new Map();
        }
        this._eventMap[eventNameToWrap].set(cb, wrappedCallback);
        return nativeAddEventListener.apply(this, [nativeEventName,
          wrappedCallback]);
      };

      const nativeRemoveEventListener = proto.removeEventListener;
      proto.removeEventListener = function(nativeEventName, cb) {
        if (nativeEventName !== eventNameToWrap || !this._eventMap
            || !this._eventMap[eventNameToWrap]) {
          return nativeRemoveEventListener.apply(this, arguments);
        }
        if (!this._eventMap[eventNameToWrap].has(cb)) {
          return nativeRemoveEventListener.apply(this, arguments);
        }
        const unwrappedCb = this._eventMap[eventNameToWrap].get(cb);
        this._eventMap[eventNameToWrap].delete(cb);
        if (this._eventMap[eventNameToWrap].size === 0) {
          delete this._eventMap[eventNameToWrap];
        }
        if (Object.keys(this._eventMap).length === 0) {
          delete this._eventMap;
        }
        return nativeRemoveEventListener.apply(this, [nativeEventName,
          unwrappedCb]);
      };

      Object.defineProperty(proto, 'on' + eventNameToWrap, {
        get() {
          return this['_on' + eventNameToWrap];
        },
        set(cb) {
          if (this['_on' + eventNameToWrap]) {
            this.removeEventListener(eventNameToWrap,
                this['_on' + eventNameToWrap]);
            delete this['_on' + eventNameToWrap];
          }
          if (cb) {
            this.addEventListener(eventNameToWrap,
                this['_on' + eventNameToWrap] = cb);
          }
        },
        enumerable: true,
        configurable: true
      });
    }

    function disableLog(bool) {
      if (typeof bool !== 'boolean') {
        return new Error('Argument type: ' + typeof bool +
            '. Please use a boolean.');
      }
      logDisabled_ = bool;
      return (bool) ? 'adapter.js logging disabled' :
          'adapter.js logging enabled';
    }

    /**
     * Disable or enable deprecation warnings
     * @param {!boolean} bool set to true to disable warnings.
     */
    function disableWarnings(bool) {
      if (typeof bool !== 'boolean') {
        return new Error('Argument type: ' + typeof bool +
            '. Please use a boolean.');
      }
      deprecationWarnings_ = !bool;
      return 'adapter.js deprecation warnings ' + (bool ? 'disabled' : 'enabled');
    }

    function log() {
      if (typeof window === 'object') {
        if (logDisabled_) {
          return;
        }
        if (typeof console !== 'undefined' && typeof console.log === 'function') {
          console.log.apply(console, arguments);
        }
      }
    }

    /**
     * Shows a deprecation warning suggesting the modern and spec-compatible API.
     */
    function deprecated(oldMethod, newMethod) {
      if (!deprecationWarnings_) {
        return;
      }
      console.warn(oldMethod + ' is deprecated, please use ' + newMethod +
          ' instead.');
    }

    /**
     * Browser detector.
     *
     * @return {object} result containing browser and version
     *     properties.
     */
    function detectBrowser(window) {
      // Returned result object.
      const result = {browser: null, version: null};

      // Fail early if it's not a browser
      if (typeof window === 'undefined' || !window.navigator) {
        result.browser = 'Not a browser.';
        return result;
      }

      const {navigator} = window;

      if (navigator.mozGetUserMedia) { // Firefox.
        result.browser = 'firefox';
        result.version = extractVersion(navigator.userAgent,
            /Firefox\/(\d+)\./, 1);
      } else if (navigator.webkitGetUserMedia ||
          (window.isSecureContext === false && window.webkitRTCPeerConnection)) {
        // Chrome, Chromium, Webview, Opera.
        // Version matches Chrome/WebRTC version.
        // Chrome 74 removed webkitGetUserMedia on http as well so we need the
        // more complicated fallback to webkitRTCPeerConnection.
        result.browser = 'chrome';
        result.version = extractVersion(navigator.userAgent,
            /Chrom(e|ium)\/(\d+)\./, 2);
      } else if (window.RTCPeerConnection &&
          navigator.userAgent.match(/AppleWebKit\/(\d+)\./)) { // Safari.
        result.browser = 'safari';
        result.version = extractVersion(navigator.userAgent,
            /AppleWebKit\/(\d+)\./, 1);
        result.supportsUnifiedPlan = window.RTCRtpTransceiver &&
            'currentDirection' in window.RTCRtpTransceiver.prototype;
      } else { // Default fallthrough: not supported.
        result.browser = 'Not a supported browser.';
        return result;
      }

      return result;
    }

    /**
     * Checks if something is an object.
     *
     * @param {*} val The something you want to check.
     * @return true if val is an object, false otherwise.
     */
    function isObject$1(val) {
      return Object.prototype.toString.call(val) === '[object Object]';
    }

    /**
     * Remove all empty objects and undefined values
     * from a nested object -- an enhanced and vanilla version
     * of Lodash's `compact`.
     */
    function compactObject(data) {
      if (!isObject$1(data)) {
        return data;
      }

      return Object.keys(data).reduce(function(accumulator, key) {
        const isObj = isObject$1(data[key]);
        const value = isObj ? compactObject(data[key]) : data[key];
        const isEmptyObject = isObj && !Object.keys(value).length;
        if (value === undefined || isEmptyObject) {
          return accumulator;
        }
        return Object.assign(accumulator, {[key]: value});
      }, {});
    }

    /* iterates the stats graph recursively. */
    function walkStats(stats, base, resultSet) {
      if (!base || resultSet.has(base.id)) {
        return;
      }
      resultSet.set(base.id, base);
      Object.keys(base).forEach(name => {
        if (name.endsWith('Id')) {
          walkStats(stats, stats.get(base[name]), resultSet);
        } else if (name.endsWith('Ids')) {
          base[name].forEach(id => {
            walkStats(stats, stats.get(id), resultSet);
          });
        }
      });
    }

    /* filter getStats for a sender/receiver track. */
    function filterStats(result, track, outbound) {
      const streamStatsType = outbound ? 'outbound-rtp' : 'inbound-rtp';
      const filteredResult = new Map();
      if (track === null) {
        return filteredResult;
      }
      const trackStats = [];
      result.forEach(value => {
        if (value.type === 'track' &&
            value.trackIdentifier === track.id) {
          trackStats.push(value);
        }
      });
      trackStats.forEach(trackStat => {
        result.forEach(stats => {
          if (stats.type === streamStatsType && stats.trackId === trackStat.id) {
            walkStats(result, stats, filteredResult);
          }
        });
      });
      return filteredResult;
    }

    /*
     *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
     *
     *  Use of this source code is governed by a BSD-style license
     *  that can be found in the LICENSE file in the root of the source
     *  tree.
     */
    const logging = log;

    function shimGetUserMedia$2(window, browserDetails) {
      const navigator = window && window.navigator;

      if (!navigator.mediaDevices) {
        return;
      }

      const constraintsToChrome_ = function(c) {
        if (typeof c !== 'object' || c.mandatory || c.optional) {
          return c;
        }
        const cc = {};
        Object.keys(c).forEach(key => {
          if (key === 'require' || key === 'advanced' || key === 'mediaSource') {
            return;
          }
          const r = (typeof c[key] === 'object') ? c[key] : {ideal: c[key]};
          if (r.exact !== undefined && typeof r.exact === 'number') {
            r.min = r.max = r.exact;
          }
          const oldname_ = function(prefix, name) {
            if (prefix) {
              return prefix + name.charAt(0).toUpperCase() + name.slice(1);
            }
            return (name === 'deviceId') ? 'sourceId' : name;
          };
          if (r.ideal !== undefined) {
            cc.optional = cc.optional || [];
            let oc = {};
            if (typeof r.ideal === 'number') {
              oc[oldname_('min', key)] = r.ideal;
              cc.optional.push(oc);
              oc = {};
              oc[oldname_('max', key)] = r.ideal;
              cc.optional.push(oc);
            } else {
              oc[oldname_('', key)] = r.ideal;
              cc.optional.push(oc);
            }
          }
          if (r.exact !== undefined && typeof r.exact !== 'number') {
            cc.mandatory = cc.mandatory || {};
            cc.mandatory[oldname_('', key)] = r.exact;
          } else {
            ['min', 'max'].forEach(mix => {
              if (r[mix] !== undefined) {
                cc.mandatory = cc.mandatory || {};
                cc.mandatory[oldname_(mix, key)] = r[mix];
              }
            });
          }
        });
        if (c.advanced) {
          cc.optional = (cc.optional || []).concat(c.advanced);
        }
        return cc;
      };

      const shimConstraints_ = function(constraints, func) {
        if (browserDetails.version >= 61) {
          return func(constraints);
        }
        constraints = JSON.parse(JSON.stringify(constraints));
        if (constraints && typeof constraints.audio === 'object') {
          const remap = function(obj, a, b) {
            if (a in obj && !(b in obj)) {
              obj[b] = obj[a];
              delete obj[a];
            }
          };
          constraints = JSON.parse(JSON.stringify(constraints));
          remap(constraints.audio, 'autoGainControl', 'googAutoGainControl');
          remap(constraints.audio, 'noiseSuppression', 'googNoiseSuppression');
          constraints.audio = constraintsToChrome_(constraints.audio);
        }
        if (constraints && typeof constraints.video === 'object') {
          // Shim facingMode for mobile & surface pro.
          let face = constraints.video.facingMode;
          face = face && ((typeof face === 'object') ? face : {ideal: face});
          const getSupportedFacingModeLies = browserDetails.version < 66;

          if ((face && (face.exact === 'user' || face.exact === 'environment' ||
                        face.ideal === 'user' || face.ideal === 'environment')) &&
              !(navigator.mediaDevices.getSupportedConstraints &&
                navigator.mediaDevices.getSupportedConstraints().facingMode &&
                !getSupportedFacingModeLies)) {
            delete constraints.video.facingMode;
            let matches;
            if (face.exact === 'environment' || face.ideal === 'environment') {
              matches = ['back', 'rear'];
            } else if (face.exact === 'user' || face.ideal === 'user') {
              matches = ['front'];
            }
            if (matches) {
              // Look for matches in label, or use last cam for back (typical).
              return navigator.mediaDevices.enumerateDevices()
              .then(devices => {
                devices = devices.filter(d => d.kind === 'videoinput');
                let dev = devices.find(d => matches.some(match =>
                  d.label.toLowerCase().includes(match)));
                if (!dev && devices.length && matches.includes('back')) {
                  dev = devices[devices.length - 1]; // more likely the back cam
                }
                if (dev) {
                  constraints.video.deviceId = face.exact ? {exact: dev.deviceId} :
                                                            {ideal: dev.deviceId};
                }
                constraints.video = constraintsToChrome_(constraints.video);
                logging('chrome: ' + JSON.stringify(constraints));
                return func(constraints);
              });
            }
          }
          constraints.video = constraintsToChrome_(constraints.video);
        }
        logging('chrome: ' + JSON.stringify(constraints));
        return func(constraints);
      };

      const shimError_ = function(e) {
        if (browserDetails.version >= 64) {
          return e;
        }
        return {
          name: {
            PermissionDeniedError: 'NotAllowedError',
            PermissionDismissedError: 'NotAllowedError',
            InvalidStateError: 'NotAllowedError',
            DevicesNotFoundError: 'NotFoundError',
            ConstraintNotSatisfiedError: 'OverconstrainedError',
            TrackStartError: 'NotReadableError',
            MediaDeviceFailedDueToShutdown: 'NotAllowedError',
            MediaDeviceKillSwitchOn: 'NotAllowedError',
            TabCaptureError: 'AbortError',
            ScreenCaptureError: 'AbortError',
            DeviceCaptureError: 'AbortError'
          }[e.name] || e.name,
          message: e.message,
          constraint: e.constraint || e.constraintName,
          toString() {
            return this.name + (this.message && ': ') + this.message;
          }
        };
      };

      const getUserMedia_ = function(constraints, onSuccess, onError) {
        shimConstraints_(constraints, c => {
          navigator.webkitGetUserMedia(c, onSuccess, e => {
            if (onError) {
              onError(shimError_(e));
            }
          });
        });
      };
      navigator.getUserMedia = getUserMedia_.bind(navigator);

      // Even though Chrome 45 has navigator.mediaDevices and a getUserMedia
      // function which returns a Promise, it does not accept spec-style
      // constraints.
      if (navigator.mediaDevices.getUserMedia) {
        const origGetUserMedia = navigator.mediaDevices.getUserMedia.
            bind(navigator.mediaDevices);
        navigator.mediaDevices.getUserMedia = function(cs) {
          return shimConstraints_(cs, c => origGetUserMedia(c).then(stream => {
            if (c.audio && !stream.getAudioTracks().length ||
                c.video && !stream.getVideoTracks().length) {
              stream.getTracks().forEach(track => {
                track.stop();
              });
              throw new DOMException('', 'NotFoundError');
            }
            return stream;
          }, e => Promise.reject(shimError_(e))));
        };
      }
    }

    /*
     *  Copyright (c) 2018 The adapter.js project authors. All Rights Reserved.
     *
     *  Use of this source code is governed by a BSD-style license
     *  that can be found in the LICENSE file in the root of the source
     *  tree.
     */
    function shimGetDisplayMedia$1(window, getSourceId) {
      if (window.navigator.mediaDevices &&
        'getDisplayMedia' in window.navigator.mediaDevices) {
        return;
      }
      if (!(window.navigator.mediaDevices)) {
        return;
      }
      // getSourceId is a function that returns a promise resolving with
      // the sourceId of the screen/window/tab to be shared.
      if (typeof getSourceId !== 'function') {
        console.error('shimGetDisplayMedia: getSourceId argument is not ' +
            'a function');
        return;
      }
      window.navigator.mediaDevices.getDisplayMedia =
        function getDisplayMedia(constraints) {
          return getSourceId(constraints)
            .then(sourceId => {
              const widthSpecified = constraints.video && constraints.video.width;
              const heightSpecified = constraints.video &&
                constraints.video.height;
              const frameRateSpecified = constraints.video &&
                constraints.video.frameRate;
              constraints.video = {
                mandatory: {
                  chromeMediaSource: 'desktop',
                  chromeMediaSourceId: sourceId,
                  maxFrameRate: frameRateSpecified || 3
                }
              };
              if (widthSpecified) {
                constraints.video.mandatory.maxWidth = widthSpecified;
              }
              if (heightSpecified) {
                constraints.video.mandatory.maxHeight = heightSpecified;
              }
              return window.navigator.mediaDevices.getUserMedia(constraints);
            });
        };
    }

    /*
     *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
     *
     *  Use of this source code is governed by a BSD-style license
     *  that can be found in the LICENSE file in the root of the source
     *  tree.
     */

    function shimMediaStream(window) {
      window.MediaStream = window.MediaStream || window.webkitMediaStream;
    }

    function shimOnTrack$1(window) {
      if (typeof window === 'object' && window.RTCPeerConnection && !('ontrack' in
          window.RTCPeerConnection.prototype)) {
        Object.defineProperty(window.RTCPeerConnection.prototype, 'ontrack', {
          get() {
            return this._ontrack;
          },
          set(f) {
            if (this._ontrack) {
              this.removeEventListener('track', this._ontrack);
            }
            this.addEventListener('track', this._ontrack = f);
          },
          enumerable: true,
          configurable: true
        });
        const origSetRemoteDescription =
            window.RTCPeerConnection.prototype.setRemoteDescription;
        window.RTCPeerConnection.prototype.setRemoteDescription =
          function setRemoteDescription() {
            if (!this._ontrackpoly) {
              this._ontrackpoly = (e) => {
                // onaddstream does not fire when a track is added to an existing
                // stream. But stream.onaddtrack is implemented so we use that.
                e.stream.addEventListener('addtrack', te => {
                  let receiver;
                  if (window.RTCPeerConnection.prototype.getReceivers) {
                    receiver = this.getReceivers()
                      .find(r => r.track && r.track.id === te.track.id);
                  } else {
                    receiver = {track: te.track};
                  }

                  const event = new Event('track');
                  event.track = te.track;
                  event.receiver = receiver;
                  event.transceiver = {receiver};
                  event.streams = [e.stream];
                  this.dispatchEvent(event);
                });
                e.stream.getTracks().forEach(track => {
                  let receiver;
                  if (window.RTCPeerConnection.prototype.getReceivers) {
                    receiver = this.getReceivers()
                      .find(r => r.track && r.track.id === track.id);
                  } else {
                    receiver = {track};
                  }
                  const event = new Event('track');
                  event.track = track;
                  event.receiver = receiver;
                  event.transceiver = {receiver};
                  event.streams = [e.stream];
                  this.dispatchEvent(event);
                });
              };
              this.addEventListener('addstream', this._ontrackpoly);
            }
            return origSetRemoteDescription.apply(this, arguments);
          };
      } else {
        // even if RTCRtpTransceiver is in window, it is only used and
        // emitted in unified-plan. Unfortunately this means we need
        // to unconditionally wrap the event.
        wrapPeerConnectionEvent(window, 'track', e => {
          if (!e.transceiver) {
            Object.defineProperty(e, 'transceiver',
              {value: {receiver: e.receiver}});
          }
          return e;
        });
      }
    }

    function shimGetSendersWithDtmf(window) {
      // Overrides addTrack/removeTrack, depends on shimAddTrackRemoveTrack.
      if (typeof window === 'object' && window.RTCPeerConnection &&
          !('getSenders' in window.RTCPeerConnection.prototype) &&
          'createDTMFSender' in window.RTCPeerConnection.prototype) {
        const shimSenderWithDtmf = function(pc, track) {
          return {
            track,
            get dtmf() {
              if (this._dtmf === undefined) {
                if (track.kind === 'audio') {
                  this._dtmf = pc.createDTMFSender(track);
                } else {
                  this._dtmf = null;
                }
              }
              return this._dtmf;
            },
            _pc: pc
          };
        };

        // augment addTrack when getSenders is not available.
        if (!window.RTCPeerConnection.prototype.getSenders) {
          window.RTCPeerConnection.prototype.getSenders = function getSenders() {
            this._senders = this._senders || [];
            return this._senders.slice(); // return a copy of the internal state.
          };
          const origAddTrack = window.RTCPeerConnection.prototype.addTrack;
          window.RTCPeerConnection.prototype.addTrack =
            function addTrack(track, stream) {
              let sender = origAddTrack.apply(this, arguments);
              if (!sender) {
                sender = shimSenderWithDtmf(this, track);
                this._senders.push(sender);
              }
              return sender;
            };

          const origRemoveTrack = window.RTCPeerConnection.prototype.removeTrack;
          window.RTCPeerConnection.prototype.removeTrack =
            function removeTrack(sender) {
              origRemoveTrack.apply(this, arguments);
              const idx = this._senders.indexOf(sender);
              if (idx !== -1) {
                this._senders.splice(idx, 1);
              }
            };
        }
        const origAddStream = window.RTCPeerConnection.prototype.addStream;
        window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
          this._senders = this._senders || [];
          origAddStream.apply(this, [stream]);
          stream.getTracks().forEach(track => {
            this._senders.push(shimSenderWithDtmf(this, track));
          });
        };

        const origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
        window.RTCPeerConnection.prototype.removeStream =
          function removeStream(stream) {
            this._senders = this._senders || [];
            origRemoveStream.apply(this, [stream]);

            stream.getTracks().forEach(track => {
              const sender = this._senders.find(s => s.track === track);
              if (sender) { // remove sender
                this._senders.splice(this._senders.indexOf(sender), 1);
              }
            });
          };
      } else if (typeof window === 'object' && window.RTCPeerConnection &&
                 'getSenders' in window.RTCPeerConnection.prototype &&
                 'createDTMFSender' in window.RTCPeerConnection.prototype &&
                 window.RTCRtpSender &&
                 !('dtmf' in window.RTCRtpSender.prototype)) {
        const origGetSenders = window.RTCPeerConnection.prototype.getSenders;
        window.RTCPeerConnection.prototype.getSenders = function getSenders() {
          const senders = origGetSenders.apply(this, []);
          senders.forEach(sender => sender._pc = this);
          return senders;
        };

        Object.defineProperty(window.RTCRtpSender.prototype, 'dtmf', {
          get() {
            if (this._dtmf === undefined) {
              if (this.track.kind === 'audio') {
                this._dtmf = this._pc.createDTMFSender(this.track);
              } else {
                this._dtmf = null;
              }
            }
            return this._dtmf;
          }
        });
      }
    }

    function shimGetStats(window) {
      if (!window.RTCPeerConnection) {
        return;
      }

      const origGetStats = window.RTCPeerConnection.prototype.getStats;
      window.RTCPeerConnection.prototype.getStats = function getStats() {
        const [selector, onSucc, onErr] = arguments;

        // If selector is a function then we are in the old style stats so just
        // pass back the original getStats format to avoid breaking old users.
        if (arguments.length > 0 && typeof selector === 'function') {
          return origGetStats.apply(this, arguments);
        }

        // When spec-style getStats is supported, return those when called with
        // either no arguments or the selector argument is null.
        if (origGetStats.length === 0 && (arguments.length === 0 ||
            typeof selector !== 'function')) {
          return origGetStats.apply(this, []);
        }

        const fixChromeStats_ = function(response) {
          const standardReport = {};
          const reports = response.result();
          reports.forEach(report => {
            const standardStats = {
              id: report.id,
              timestamp: report.timestamp,
              type: {
                localcandidate: 'local-candidate',
                remotecandidate: 'remote-candidate'
              }[report.type] || report.type
            };
            report.names().forEach(name => {
              standardStats[name] = report.stat(name);
            });
            standardReport[standardStats.id] = standardStats;
          });

          return standardReport;
        };

        // shim getStats with maplike support
        const makeMapStats = function(stats) {
          return new Map(Object.keys(stats).map(key => [key, stats[key]]));
        };

        if (arguments.length >= 2) {
          const successCallbackWrapper_ = function(response) {
            onSucc(makeMapStats(fixChromeStats_(response)));
          };

          return origGetStats.apply(this, [successCallbackWrapper_,
            selector]);
        }

        // promise-support
        return new Promise((resolve, reject) => {
          origGetStats.apply(this, [
            function(response) {
              resolve(makeMapStats(fixChromeStats_(response)));
            }, reject]);
        }).then(onSucc, onErr);
      };
    }

    function shimSenderReceiverGetStats(window) {
      if (!(typeof window === 'object' && window.RTCPeerConnection &&
          window.RTCRtpSender && window.RTCRtpReceiver)) {
        return;
      }

      // shim sender stats.
      if (!('getStats' in window.RTCRtpSender.prototype)) {
        const origGetSenders = window.RTCPeerConnection.prototype.getSenders;
        if (origGetSenders) {
          window.RTCPeerConnection.prototype.getSenders = function getSenders() {
            const senders = origGetSenders.apply(this, []);
            senders.forEach(sender => sender._pc = this);
            return senders;
          };
        }

        const origAddTrack = window.RTCPeerConnection.prototype.addTrack;
        if (origAddTrack) {
          window.RTCPeerConnection.prototype.addTrack = function addTrack() {
            const sender = origAddTrack.apply(this, arguments);
            sender._pc = this;
            return sender;
          };
        }
        window.RTCRtpSender.prototype.getStats = function getStats() {
          const sender = this;
          return this._pc.getStats().then(result =>
            /* Note: this will include stats of all senders that
             *   send a track with the same id as sender.track as
             *   it is not possible to identify the RTCRtpSender.
             */
            filterStats(result, sender.track, true));
        };
      }

      // shim receiver stats.
      if (!('getStats' in window.RTCRtpReceiver.prototype)) {
        const origGetReceivers = window.RTCPeerConnection.prototype.getReceivers;
        if (origGetReceivers) {
          window.RTCPeerConnection.prototype.getReceivers =
            function getReceivers() {
              const receivers = origGetReceivers.apply(this, []);
              receivers.forEach(receiver => receiver._pc = this);
              return receivers;
            };
        }
        wrapPeerConnectionEvent(window, 'track', e => {
          e.receiver._pc = e.srcElement;
          return e;
        });
        window.RTCRtpReceiver.prototype.getStats = function getStats() {
          const receiver = this;
          return this._pc.getStats().then(result =>
            filterStats(result, receiver.track, false));
        };
      }

      if (!('getStats' in window.RTCRtpSender.prototype &&
          'getStats' in window.RTCRtpReceiver.prototype)) {
        return;
      }

      // shim RTCPeerConnection.getStats(track).
      const origGetStats = window.RTCPeerConnection.prototype.getStats;
      window.RTCPeerConnection.prototype.getStats = function getStats() {
        if (arguments.length > 0 &&
            arguments[0] instanceof window.MediaStreamTrack) {
          const track = arguments[0];
          let sender;
          let receiver;
          let err;
          this.getSenders().forEach(s => {
            if (s.track === track) {
              if (sender) {
                err = true;
              } else {
                sender = s;
              }
            }
          });
          this.getReceivers().forEach(r => {
            if (r.track === track) {
              if (receiver) {
                err = true;
              } else {
                receiver = r;
              }
            }
            return r.track === track;
          });
          if (err || (sender && receiver)) {
            return Promise.reject(new DOMException(
              'There are more than one sender or receiver for the track.',
              'InvalidAccessError'));
          } else if (sender) {
            return sender.getStats();
          } else if (receiver) {
            return receiver.getStats();
          }
          return Promise.reject(new DOMException(
            'There is no sender or receiver for the track.',
            'InvalidAccessError'));
        }
        return origGetStats.apply(this, arguments);
      };
    }

    function shimAddTrackRemoveTrackWithNative(window) {
      // shim addTrack/removeTrack with native variants in order to make
      // the interactions with legacy getLocalStreams behave as in other browsers.
      // Keeps a mapping stream.id => [stream, rtpsenders...]
      window.RTCPeerConnection.prototype.getLocalStreams =
        function getLocalStreams() {
          this._shimmedLocalStreams = this._shimmedLocalStreams || {};
          return Object.keys(this._shimmedLocalStreams)
            .map(streamId => this._shimmedLocalStreams[streamId][0]);
        };

      const origAddTrack = window.RTCPeerConnection.prototype.addTrack;
      window.RTCPeerConnection.prototype.addTrack =
        function addTrack(track, stream) {
          if (!stream) {
            return origAddTrack.apply(this, arguments);
          }
          this._shimmedLocalStreams = this._shimmedLocalStreams || {};

          const sender = origAddTrack.apply(this, arguments);
          if (!this._shimmedLocalStreams[stream.id]) {
            this._shimmedLocalStreams[stream.id] = [stream, sender];
          } else if (this._shimmedLocalStreams[stream.id].indexOf(sender) === -1) {
            this._shimmedLocalStreams[stream.id].push(sender);
          }
          return sender;
        };

      const origAddStream = window.RTCPeerConnection.prototype.addStream;
      window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
        this._shimmedLocalStreams = this._shimmedLocalStreams || {};

        stream.getTracks().forEach(track => {
          const alreadyExists = this.getSenders().find(s => s.track === track);
          if (alreadyExists) {
            throw new DOMException('Track already exists.',
                'InvalidAccessError');
          }
        });
        const existingSenders = this.getSenders();
        origAddStream.apply(this, arguments);
        const newSenders = this.getSenders()
          .filter(newSender => existingSenders.indexOf(newSender) === -1);
        this._shimmedLocalStreams[stream.id] = [stream].concat(newSenders);
      };

      const origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
      window.RTCPeerConnection.prototype.removeStream =
        function removeStream(stream) {
          this._shimmedLocalStreams = this._shimmedLocalStreams || {};
          delete this._shimmedLocalStreams[stream.id];
          return origRemoveStream.apply(this, arguments);
        };

      const origRemoveTrack = window.RTCPeerConnection.prototype.removeTrack;
      window.RTCPeerConnection.prototype.removeTrack =
        function removeTrack(sender) {
          this._shimmedLocalStreams = this._shimmedLocalStreams || {};
          if (sender) {
            Object.keys(this._shimmedLocalStreams).forEach(streamId => {
              const idx = this._shimmedLocalStreams[streamId].indexOf(sender);
              if (idx !== -1) {
                this._shimmedLocalStreams[streamId].splice(idx, 1);
              }
              if (this._shimmedLocalStreams[streamId].length === 1) {
                delete this._shimmedLocalStreams[streamId];
              }
            });
          }
          return origRemoveTrack.apply(this, arguments);
        };
    }

    function shimAddTrackRemoveTrack(window, browserDetails) {
      if (!window.RTCPeerConnection) {
        return;
      }
      // shim addTrack and removeTrack.
      if (window.RTCPeerConnection.prototype.addTrack &&
          browserDetails.version >= 65) {
        return shimAddTrackRemoveTrackWithNative(window);
      }

      // also shim pc.getLocalStreams when addTrack is shimmed
      // to return the original streams.
      const origGetLocalStreams = window.RTCPeerConnection.prototype
          .getLocalStreams;
      window.RTCPeerConnection.prototype.getLocalStreams =
        function getLocalStreams() {
          const nativeStreams = origGetLocalStreams.apply(this);
          this._reverseStreams = this._reverseStreams || {};
          return nativeStreams.map(stream => this._reverseStreams[stream.id]);
        };

      const origAddStream = window.RTCPeerConnection.prototype.addStream;
      window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
        this._streams = this._streams || {};
        this._reverseStreams = this._reverseStreams || {};

        stream.getTracks().forEach(track => {
          const alreadyExists = this.getSenders().find(s => s.track === track);
          if (alreadyExists) {
            throw new DOMException('Track already exists.',
                'InvalidAccessError');
          }
        });
        // Add identity mapping for consistency with addTrack.
        // Unless this is being used with a stream from addTrack.
        if (!this._reverseStreams[stream.id]) {
          const newStream = new window.MediaStream(stream.getTracks());
          this._streams[stream.id] = newStream;
          this._reverseStreams[newStream.id] = stream;
          stream = newStream;
        }
        origAddStream.apply(this, [stream]);
      };

      const origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
      window.RTCPeerConnection.prototype.removeStream =
        function removeStream(stream) {
          this._streams = this._streams || {};
          this._reverseStreams = this._reverseStreams || {};

          origRemoveStream.apply(this, [(this._streams[stream.id] || stream)]);
          delete this._reverseStreams[(this._streams[stream.id] ?
              this._streams[stream.id].id : stream.id)];
          delete this._streams[stream.id];
        };

      window.RTCPeerConnection.prototype.addTrack =
        function addTrack(track, stream) {
          if (this.signalingState === 'closed') {
            throw new DOMException(
              'The RTCPeerConnection\'s signalingState is \'closed\'.',
              'InvalidStateError');
          }
          const streams = [].slice.call(arguments, 1);
          if (streams.length !== 1 ||
              !streams[0].getTracks().find(t => t === track)) {
            // this is not fully correct but all we can manage without
            // [[associated MediaStreams]] internal slot.
            throw new DOMException(
              'The adapter.js addTrack polyfill only supports a single ' +
              ' stream which is associated with the specified track.',
              'NotSupportedError');
          }

          const alreadyExists = this.getSenders().find(s => s.track === track);
          if (alreadyExists) {
            throw new DOMException('Track already exists.',
                'InvalidAccessError');
          }

          this._streams = this._streams || {};
          this._reverseStreams = this._reverseStreams || {};
          const oldStream = this._streams[stream.id];
          if (oldStream) {
            // this is using odd Chrome behaviour, use with caution:
            // https://bugs.chromium.org/p/webrtc/issues/detail?id=7815
            // Note: we rely on the high-level addTrack/dtmf shim to
            // create the sender with a dtmf sender.
            oldStream.addTrack(track);

            // Trigger ONN async.
            Promise.resolve().then(() => {
              this.dispatchEvent(new Event('negotiationneeded'));
            });
          } else {
            const newStream = new window.MediaStream([track]);
            this._streams[stream.id] = newStream;
            this._reverseStreams[newStream.id] = stream;
            this.addStream(newStream);
          }
          return this.getSenders().find(s => s.track === track);
        };

      // replace the internal stream id with the external one and
      // vice versa.
      function replaceInternalStreamId(pc, description) {
        let sdp = description.sdp;
        Object.keys(pc._reverseStreams || []).forEach(internalId => {
          const externalStream = pc._reverseStreams[internalId];
          const internalStream = pc._streams[externalStream.id];
          sdp = sdp.replace(new RegExp(internalStream.id, 'g'),
              externalStream.id);
        });
        return new RTCSessionDescription({
          type: description.type,
          sdp
        });
      }
      function replaceExternalStreamId(pc, description) {
        let sdp = description.sdp;
        Object.keys(pc._reverseStreams || []).forEach(internalId => {
          const externalStream = pc._reverseStreams[internalId];
          const internalStream = pc._streams[externalStream.id];
          sdp = sdp.replace(new RegExp(externalStream.id, 'g'),
              internalStream.id);
        });
        return new RTCSessionDescription({
          type: description.type,
          sdp
        });
      }
      ['createOffer', 'createAnswer'].forEach(function(method) {
        const nativeMethod = window.RTCPeerConnection.prototype[method];
        const methodObj = {[method]() {
          const args = arguments;
          const isLegacyCall = arguments.length &&
              typeof arguments[0] === 'function';
          if (isLegacyCall) {
            return nativeMethod.apply(this, [
              (description) => {
                const desc = replaceInternalStreamId(this, description);
                args[0].apply(null, [desc]);
              },
              (err) => {
                if (args[1]) {
                  args[1].apply(null, err);
                }
              }, arguments[2]
            ]);
          }
          return nativeMethod.apply(this, arguments)
          .then(description => replaceInternalStreamId(this, description));
        }};
        window.RTCPeerConnection.prototype[method] = methodObj[method];
      });

      const origSetLocalDescription =
          window.RTCPeerConnection.prototype.setLocalDescription;
      window.RTCPeerConnection.prototype.setLocalDescription =
        function setLocalDescription() {
          if (!arguments.length || !arguments[0].type) {
            return origSetLocalDescription.apply(this, arguments);
          }
          arguments[0] = replaceExternalStreamId(this, arguments[0]);
          return origSetLocalDescription.apply(this, arguments);
        };

      // TODO: mangle getStats: https://w3c.github.io/webrtc-stats/#dom-rtcmediastreamstats-streamidentifier

      const origLocalDescription = Object.getOwnPropertyDescriptor(
          window.RTCPeerConnection.prototype, 'localDescription');
      Object.defineProperty(window.RTCPeerConnection.prototype,
          'localDescription', {
            get() {
              const description = origLocalDescription.get.apply(this);
              if (description.type === '') {
                return description;
              }
              return replaceInternalStreamId(this, description);
            }
          });

      window.RTCPeerConnection.prototype.removeTrack =
        function removeTrack(sender) {
          if (this.signalingState === 'closed') {
            throw new DOMException(
              'The RTCPeerConnection\'s signalingState is \'closed\'.',
              'InvalidStateError');
          }
          // We can not yet check for sender instanceof RTCRtpSender
          // since we shim RTPSender. So we check if sender._pc is set.
          if (!sender._pc) {
            throw new DOMException('Argument 1 of RTCPeerConnection.removeTrack ' +
                'does not implement interface RTCRtpSender.', 'TypeError');
          }
          const isLocal = sender._pc === this;
          if (!isLocal) {
            throw new DOMException('Sender was not created by this connection.',
                'InvalidAccessError');
          }

          // Search for the native stream the senders track belongs to.
          this._streams = this._streams || {};
          let stream;
          Object.keys(this._streams).forEach(streamid => {
            const hasTrack = this._streams[streamid].getTracks()
              .find(track => sender.track === track);
            if (hasTrack) {
              stream = this._streams[streamid];
            }
          });

          if (stream) {
            if (stream.getTracks().length === 1) {
              // if this is the last track of the stream, remove the stream. This
              // takes care of any shimmed _senders.
              this.removeStream(this._reverseStreams[stream.id]);
            } else {
              // relying on the same odd chrome behaviour as above.
              stream.removeTrack(sender.track);
            }
            this.dispatchEvent(new Event('negotiationneeded'));
          }
        };
    }

    function shimPeerConnection$1(window, browserDetails) {
      if (!window.RTCPeerConnection && window.webkitRTCPeerConnection) {
        // very basic support for old versions.
        window.RTCPeerConnection = window.webkitRTCPeerConnection;
      }
      if (!window.RTCPeerConnection) {
        return;
      }

      // shim implicit creation of RTCSessionDescription/RTCIceCandidate
      if (browserDetails.version < 53) {
        ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate']
            .forEach(function(method) {
              const nativeMethod = window.RTCPeerConnection.prototype[method];
              const methodObj = {[method]() {
                arguments[0] = new ((method === 'addIceCandidate') ?
                    window.RTCIceCandidate :
                    window.RTCSessionDescription)(arguments[0]);
                return nativeMethod.apply(this, arguments);
              }};
              window.RTCPeerConnection.prototype[method] = methodObj[method];
            });
      }
    }

    // Attempt to fix ONN in plan-b mode.
    function fixNegotiationNeeded(window, browserDetails) {
      wrapPeerConnectionEvent(window, 'negotiationneeded', e => {
        const pc = e.target;
        if (browserDetails.version < 72 || (pc.getConfiguration &&
            pc.getConfiguration().sdpSemantics === 'plan-b')) {
          if (pc.signalingState !== 'stable') {
            return;
          }
        }
        return e;
      });
    }

    var chromeShim = /*#__PURE__*/Object.freeze({
        __proto__: null,
        shimMediaStream: shimMediaStream,
        shimOnTrack: shimOnTrack$1,
        shimGetSendersWithDtmf: shimGetSendersWithDtmf,
        shimGetStats: shimGetStats,
        shimSenderReceiverGetStats: shimSenderReceiverGetStats,
        shimAddTrackRemoveTrackWithNative: shimAddTrackRemoveTrackWithNative,
        shimAddTrackRemoveTrack: shimAddTrackRemoveTrack,
        shimPeerConnection: shimPeerConnection$1,
        fixNegotiationNeeded: fixNegotiationNeeded,
        shimGetUserMedia: shimGetUserMedia$2,
        shimGetDisplayMedia: shimGetDisplayMedia$1
    });

    /*
     *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
     *
     *  Use of this source code is governed by a BSD-style license
     *  that can be found in the LICENSE file in the root of the source
     *  tree.
     */

    function shimGetUserMedia$1(window, browserDetails) {
      const navigator = window && window.navigator;
      const MediaStreamTrack = window && window.MediaStreamTrack;

      navigator.getUserMedia = function(constraints, onSuccess, onError) {
        // Replace Firefox 44+'s deprecation warning with unprefixed version.
        deprecated('navigator.getUserMedia',
            'navigator.mediaDevices.getUserMedia');
        navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
      };

      if (!(browserDetails.version > 55 &&
          'autoGainControl' in navigator.mediaDevices.getSupportedConstraints())) {
        const remap = function(obj, a, b) {
          if (a in obj && !(b in obj)) {
            obj[b] = obj[a];
            delete obj[a];
          }
        };

        const nativeGetUserMedia = navigator.mediaDevices.getUserMedia.
            bind(navigator.mediaDevices);
        navigator.mediaDevices.getUserMedia = function(c) {
          if (typeof c === 'object' && typeof c.audio === 'object') {
            c = JSON.parse(JSON.stringify(c));
            remap(c.audio, 'autoGainControl', 'mozAutoGainControl');
            remap(c.audio, 'noiseSuppression', 'mozNoiseSuppression');
          }
          return nativeGetUserMedia(c);
        };

        if (MediaStreamTrack && MediaStreamTrack.prototype.getSettings) {
          const nativeGetSettings = MediaStreamTrack.prototype.getSettings;
          MediaStreamTrack.prototype.getSettings = function() {
            const obj = nativeGetSettings.apply(this, arguments);
            remap(obj, 'mozAutoGainControl', 'autoGainControl');
            remap(obj, 'mozNoiseSuppression', 'noiseSuppression');
            return obj;
          };
        }

        if (MediaStreamTrack && MediaStreamTrack.prototype.applyConstraints) {
          const nativeApplyConstraints =
            MediaStreamTrack.prototype.applyConstraints;
          MediaStreamTrack.prototype.applyConstraints = function(c) {
            if (this.kind === 'audio' && typeof c === 'object') {
              c = JSON.parse(JSON.stringify(c));
              remap(c, 'autoGainControl', 'mozAutoGainControl');
              remap(c, 'noiseSuppression', 'mozNoiseSuppression');
            }
            return nativeApplyConstraints.apply(this, [c]);
          };
        }
      }
    }

    /*
     *  Copyright (c) 2018 The adapter.js project authors. All Rights Reserved.
     *
     *  Use of this source code is governed by a BSD-style license
     *  that can be found in the LICENSE file in the root of the source
     *  tree.
     */

    function shimGetDisplayMedia(window, preferredMediaSource) {
      if (window.navigator.mediaDevices &&
        'getDisplayMedia' in window.navigator.mediaDevices) {
        return;
      }
      if (!(window.navigator.mediaDevices)) {
        return;
      }
      window.navigator.mediaDevices.getDisplayMedia =
        function getDisplayMedia(constraints) {
          if (!(constraints && constraints.video)) {
            const err = new DOMException('getDisplayMedia without video ' +
                'constraints is undefined');
            err.name = 'NotFoundError';
            // from https://heycam.github.io/webidl/#idl-DOMException-error-names
            err.code = 8;
            return Promise.reject(err);
          }
          if (constraints.video === true) {
            constraints.video = {mediaSource: preferredMediaSource};
          } else {
            constraints.video.mediaSource = preferredMediaSource;
          }
          return window.navigator.mediaDevices.getUserMedia(constraints);
        };
    }

    /*
     *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
     *
     *  Use of this source code is governed by a BSD-style license
     *  that can be found in the LICENSE file in the root of the source
     *  tree.
     */

    function shimOnTrack(window) {
      if (typeof window === 'object' && window.RTCTrackEvent &&
          ('receiver' in window.RTCTrackEvent.prototype) &&
          !('transceiver' in window.RTCTrackEvent.prototype)) {
        Object.defineProperty(window.RTCTrackEvent.prototype, 'transceiver', {
          get() {
            return {receiver: this.receiver};
          }
        });
      }
    }

    function shimPeerConnection(window, browserDetails) {
      if (typeof window !== 'object' ||
          !(window.RTCPeerConnection || window.mozRTCPeerConnection)) {
        return; // probably media.peerconnection.enabled=false in about:config
      }
      if (!window.RTCPeerConnection && window.mozRTCPeerConnection) {
        // very basic support for old versions.
        window.RTCPeerConnection = window.mozRTCPeerConnection;
      }

      if (browserDetails.version < 53) {
        // shim away need for obsolete RTCIceCandidate/RTCSessionDescription.
        ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate']
            .forEach(function(method) {
              const nativeMethod = window.RTCPeerConnection.prototype[method];
              const methodObj = {[method]() {
                arguments[0] = new ((method === 'addIceCandidate') ?
                    window.RTCIceCandidate :
                    window.RTCSessionDescription)(arguments[0]);
                return nativeMethod.apply(this, arguments);
              }};
              window.RTCPeerConnection.prototype[method] = methodObj[method];
            });
      }

      const modernStatsTypes = {
        inboundrtp: 'inbound-rtp',
        outboundrtp: 'outbound-rtp',
        candidatepair: 'candidate-pair',
        localcandidate: 'local-candidate',
        remotecandidate: 'remote-candidate'
      };

      const nativeGetStats = window.RTCPeerConnection.prototype.getStats;
      window.RTCPeerConnection.prototype.getStats = function getStats() {
        const [selector, onSucc, onErr] = arguments;
        return nativeGetStats.apply(this, [selector || null])
          .then(stats => {
            if (browserDetails.version < 53 && !onSucc) {
              // Shim only promise getStats with spec-hyphens in type names
              // Leave callback version alone; misc old uses of forEach before Map
              try {
                stats.forEach(stat => {
                  stat.type = modernStatsTypes[stat.type] || stat.type;
                });
              } catch (e) {
                if (e.name !== 'TypeError') {
                  throw e;
                }
                // Avoid TypeError: "type" is read-only, in old versions. 34-43ish
                stats.forEach((stat, i) => {
                  stats.set(i, Object.assign({}, stat, {
                    type: modernStatsTypes[stat.type] || stat.type
                  }));
                });
              }
            }
            return stats;
          })
          .then(onSucc, onErr);
      };
    }

    function shimSenderGetStats(window) {
      if (!(typeof window === 'object' && window.RTCPeerConnection &&
          window.RTCRtpSender)) {
        return;
      }
      if (window.RTCRtpSender && 'getStats' in window.RTCRtpSender.prototype) {
        return;
      }
      const origGetSenders = window.RTCPeerConnection.prototype.getSenders;
      if (origGetSenders) {
        window.RTCPeerConnection.prototype.getSenders = function getSenders() {
          const senders = origGetSenders.apply(this, []);
          senders.forEach(sender => sender._pc = this);
          return senders;
        };
      }

      const origAddTrack = window.RTCPeerConnection.prototype.addTrack;
      if (origAddTrack) {
        window.RTCPeerConnection.prototype.addTrack = function addTrack() {
          const sender = origAddTrack.apply(this, arguments);
          sender._pc = this;
          return sender;
        };
      }
      window.RTCRtpSender.prototype.getStats = function getStats() {
        return this.track ? this._pc.getStats(this.track) :
            Promise.resolve(new Map());
      };
    }

    function shimReceiverGetStats(window) {
      if (!(typeof window === 'object' && window.RTCPeerConnection &&
          window.RTCRtpSender)) {
        return;
      }
      if (window.RTCRtpSender && 'getStats' in window.RTCRtpReceiver.prototype) {
        return;
      }
      const origGetReceivers = window.RTCPeerConnection.prototype.getReceivers;
      if (origGetReceivers) {
        window.RTCPeerConnection.prototype.getReceivers = function getReceivers() {
          const receivers = origGetReceivers.apply(this, []);
          receivers.forEach(receiver => receiver._pc = this);
          return receivers;
        };
      }
      wrapPeerConnectionEvent(window, 'track', e => {
        e.receiver._pc = e.srcElement;
        return e;
      });
      window.RTCRtpReceiver.prototype.getStats = function getStats() {
        return this._pc.getStats(this.track);
      };
    }

    function shimRemoveStream(window) {
      if (!window.RTCPeerConnection ||
          'removeStream' in window.RTCPeerConnection.prototype) {
        return;
      }
      window.RTCPeerConnection.prototype.removeStream =
        function removeStream(stream) {
          deprecated('removeStream', 'removeTrack');
          this.getSenders().forEach(sender => {
            if (sender.track && stream.getTracks().includes(sender.track)) {
              this.removeTrack(sender);
            }
          });
        };
    }

    function shimRTCDataChannel(window) {
      // rename DataChannel to RTCDataChannel (native fix in FF60):
      // https://bugzilla.mozilla.org/show_bug.cgi?id=1173851
      if (window.DataChannel && !window.RTCDataChannel) {
        window.RTCDataChannel = window.DataChannel;
      }
    }

    function shimAddTransceiver(window) {
      // https://github.com/webrtcHacks/adapter/issues/998#issuecomment-516921647
      // Firefox ignores the init sendEncodings options passed to addTransceiver
      // https://bugzilla.mozilla.org/show_bug.cgi?id=1396918
      if (!(typeof window === 'object' && window.RTCPeerConnection)) {
        return;
      }
      const origAddTransceiver = window.RTCPeerConnection.prototype.addTransceiver;
      if (origAddTransceiver) {
        window.RTCPeerConnection.prototype.addTransceiver =
          function addTransceiver() {
            this.setParametersPromises = [];
            // WebIDL input coercion and validation
            let sendEncodings = arguments[1] && arguments[1].sendEncodings;
            if (sendEncodings === undefined) {
              sendEncodings = [];
            }
            sendEncodings = [...sendEncodings];
            const shouldPerformCheck = sendEncodings.length > 0;
            if (shouldPerformCheck) {
              // If sendEncodings params are provided, validate grammar
              sendEncodings.forEach((encodingParam) => {
                if ('rid' in encodingParam) {
                  const ridRegex = /^[a-z0-9]{0,16}$/i;
                  if (!ridRegex.test(encodingParam.rid)) {
                    throw new TypeError('Invalid RID value provided.');
                  }
                }
                if ('scaleResolutionDownBy' in encodingParam) {
                  if (!(parseFloat(encodingParam.scaleResolutionDownBy) >= 1.0)) {
                    throw new RangeError('scale_resolution_down_by must be >= 1.0');
                  }
                }
                if ('maxFramerate' in encodingParam) {
                  if (!(parseFloat(encodingParam.maxFramerate) >= 0)) {
                    throw new RangeError('max_framerate must be >= 0.0');
                  }
                }
              });
            }
            const transceiver = origAddTransceiver.apply(this, arguments);
            if (shouldPerformCheck) {
              // Check if the init options were applied. If not we do this in an
              // asynchronous way and save the promise reference in a global object.
              // This is an ugly hack, but at the same time is way more robust than
              // checking the sender parameters before and after the createOffer
              // Also note that after the createoffer we are not 100% sure that
              // the params were asynchronously applied so we might miss the
              // opportunity to recreate offer.
              const {sender} = transceiver;
              const params = sender.getParameters();
              if (!('encodings' in params) ||
                  // Avoid being fooled by patched getParameters() below.
                  (params.encodings.length === 1 &&
                   Object.keys(params.encodings[0]).length === 0)) {
                params.encodings = sendEncodings;
                sender.sendEncodings = sendEncodings;
                this.setParametersPromises.push(sender.setParameters(params)
                  .then(() => {
                    delete sender.sendEncodings;
                  }).catch(() => {
                    delete sender.sendEncodings;
                  })
                );
              }
            }
            return transceiver;
          };
      }
    }

    function shimGetParameters(window) {
      if (!(typeof window === 'object' && window.RTCRtpSender)) {
        return;
      }
      const origGetParameters = window.RTCRtpSender.prototype.getParameters;
      if (origGetParameters) {
        window.RTCRtpSender.prototype.getParameters =
          function getParameters() {
            const params = origGetParameters.apply(this, arguments);
            if (!('encodings' in params)) {
              params.encodings = [].concat(this.sendEncodings || [{}]);
            }
            return params;
          };
      }
    }

    function shimCreateOffer(window) {
      // https://github.com/webrtcHacks/adapter/issues/998#issuecomment-516921647
      // Firefox ignores the init sendEncodings options passed to addTransceiver
      // https://bugzilla.mozilla.org/show_bug.cgi?id=1396918
      if (!(typeof window === 'object' && window.RTCPeerConnection)) {
        return;
      }
      const origCreateOffer = window.RTCPeerConnection.prototype.createOffer;
      window.RTCPeerConnection.prototype.createOffer = function createOffer() {
        if (this.setParametersPromises && this.setParametersPromises.length) {
          return Promise.all(this.setParametersPromises)
          .then(() => {
            return origCreateOffer.apply(this, arguments);
          })
          .finally(() => {
            this.setParametersPromises = [];
          });
        }
        return origCreateOffer.apply(this, arguments);
      };
    }

    function shimCreateAnswer(window) {
      // https://github.com/webrtcHacks/adapter/issues/998#issuecomment-516921647
      // Firefox ignores the init sendEncodings options passed to addTransceiver
      // https://bugzilla.mozilla.org/show_bug.cgi?id=1396918
      if (!(typeof window === 'object' && window.RTCPeerConnection)) {
        return;
      }
      const origCreateAnswer = window.RTCPeerConnection.prototype.createAnswer;
      window.RTCPeerConnection.prototype.createAnswer = function createAnswer() {
        if (this.setParametersPromises && this.setParametersPromises.length) {
          return Promise.all(this.setParametersPromises)
          .then(() => {
            return origCreateAnswer.apply(this, arguments);
          })
          .finally(() => {
            this.setParametersPromises = [];
          });
        }
        return origCreateAnswer.apply(this, arguments);
      };
    }

    var firefoxShim = /*#__PURE__*/Object.freeze({
        __proto__: null,
        shimOnTrack: shimOnTrack,
        shimPeerConnection: shimPeerConnection,
        shimSenderGetStats: shimSenderGetStats,
        shimReceiverGetStats: shimReceiverGetStats,
        shimRemoveStream: shimRemoveStream,
        shimRTCDataChannel: shimRTCDataChannel,
        shimAddTransceiver: shimAddTransceiver,
        shimGetParameters: shimGetParameters,
        shimCreateOffer: shimCreateOffer,
        shimCreateAnswer: shimCreateAnswer,
        shimGetUserMedia: shimGetUserMedia$1,
        shimGetDisplayMedia: shimGetDisplayMedia
    });

    /*
     *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
     *
     *  Use of this source code is governed by a BSD-style license
     *  that can be found in the LICENSE file in the root of the source
     *  tree.
     */

    function shimLocalStreamsAPI(window) {
      if (typeof window !== 'object' || !window.RTCPeerConnection) {
        return;
      }
      if (!('getLocalStreams' in window.RTCPeerConnection.prototype)) {
        window.RTCPeerConnection.prototype.getLocalStreams =
          function getLocalStreams() {
            if (!this._localStreams) {
              this._localStreams = [];
            }
            return this._localStreams;
          };
      }
      if (!('addStream' in window.RTCPeerConnection.prototype)) {
        const _addTrack = window.RTCPeerConnection.prototype.addTrack;
        window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
          if (!this._localStreams) {
            this._localStreams = [];
          }
          if (!this._localStreams.includes(stream)) {
            this._localStreams.push(stream);
          }
          // Try to emulate Chrome's behaviour of adding in audio-video order.
          // Safari orders by track id.
          stream.getAudioTracks().forEach(track => _addTrack.call(this, track,
            stream));
          stream.getVideoTracks().forEach(track => _addTrack.call(this, track,
            stream));
        };

        window.RTCPeerConnection.prototype.addTrack =
          function addTrack(track, ...streams) {
            if (streams) {
              streams.forEach((stream) => {
                if (!this._localStreams) {
                  this._localStreams = [stream];
                } else if (!this._localStreams.includes(stream)) {
                  this._localStreams.push(stream);
                }
              });
            }
            return _addTrack.apply(this, arguments);
          };
      }
      if (!('removeStream' in window.RTCPeerConnection.prototype)) {
        window.RTCPeerConnection.prototype.removeStream =
          function removeStream(stream) {
            if (!this._localStreams) {
              this._localStreams = [];
            }
            const index = this._localStreams.indexOf(stream);
            if (index === -1) {
              return;
            }
            this._localStreams.splice(index, 1);
            const tracks = stream.getTracks();
            this.getSenders().forEach(sender => {
              if (tracks.includes(sender.track)) {
                this.removeTrack(sender);
              }
            });
          };
      }
    }

    function shimRemoteStreamsAPI(window) {
      if (typeof window !== 'object' || !window.RTCPeerConnection) {
        return;
      }
      if (!('getRemoteStreams' in window.RTCPeerConnection.prototype)) {
        window.RTCPeerConnection.prototype.getRemoteStreams =
          function getRemoteStreams() {
            return this._remoteStreams ? this._remoteStreams : [];
          };
      }
      if (!('onaddstream' in window.RTCPeerConnection.prototype)) {
        Object.defineProperty(window.RTCPeerConnection.prototype, 'onaddstream', {
          get() {
            return this._onaddstream;
          },
          set(f) {
            if (this._onaddstream) {
              this.removeEventListener('addstream', this._onaddstream);
              this.removeEventListener('track', this._onaddstreampoly);
            }
            this.addEventListener('addstream', this._onaddstream = f);
            this.addEventListener('track', this._onaddstreampoly = (e) => {
              e.streams.forEach(stream => {
                if (!this._remoteStreams) {
                  this._remoteStreams = [];
                }
                if (this._remoteStreams.includes(stream)) {
                  return;
                }
                this._remoteStreams.push(stream);
                const event = new Event('addstream');
                event.stream = stream;
                this.dispatchEvent(event);
              });
            });
          }
        });
        const origSetRemoteDescription =
          window.RTCPeerConnection.prototype.setRemoteDescription;
        window.RTCPeerConnection.prototype.setRemoteDescription =
          function setRemoteDescription() {
            const pc = this;
            if (!this._onaddstreampoly) {
              this.addEventListener('track', this._onaddstreampoly = function(e) {
                e.streams.forEach(stream => {
                  if (!pc._remoteStreams) {
                    pc._remoteStreams = [];
                  }
                  if (pc._remoteStreams.indexOf(stream) >= 0) {
                    return;
                  }
                  pc._remoteStreams.push(stream);
                  const event = new Event('addstream');
                  event.stream = stream;
                  pc.dispatchEvent(event);
                });
              });
            }
            return origSetRemoteDescription.apply(pc, arguments);
          };
      }
    }

    function shimCallbacksAPI(window) {
      if (typeof window !== 'object' || !window.RTCPeerConnection) {
        return;
      }
      const prototype = window.RTCPeerConnection.prototype;
      const origCreateOffer = prototype.createOffer;
      const origCreateAnswer = prototype.createAnswer;
      const setLocalDescription = prototype.setLocalDescription;
      const setRemoteDescription = prototype.setRemoteDescription;
      const addIceCandidate = prototype.addIceCandidate;

      prototype.createOffer =
        function createOffer(successCallback, failureCallback) {
          const options = (arguments.length >= 2) ? arguments[2] : arguments[0];
          const promise = origCreateOffer.apply(this, [options]);
          if (!failureCallback) {
            return promise;
          }
          promise.then(successCallback, failureCallback);
          return Promise.resolve();
        };

      prototype.createAnswer =
        function createAnswer(successCallback, failureCallback) {
          const options = (arguments.length >= 2) ? arguments[2] : arguments[0];
          const promise = origCreateAnswer.apply(this, [options]);
          if (!failureCallback) {
            return promise;
          }
          promise.then(successCallback, failureCallback);
          return Promise.resolve();
        };

      let withCallback = function(description, successCallback, failureCallback) {
        const promise = setLocalDescription.apply(this, [description]);
        if (!failureCallback) {
          return promise;
        }
        promise.then(successCallback, failureCallback);
        return Promise.resolve();
      };
      prototype.setLocalDescription = withCallback;

      withCallback = function(description, successCallback, failureCallback) {
        const promise = setRemoteDescription.apply(this, [description]);
        if (!failureCallback) {
          return promise;
        }
        promise.then(successCallback, failureCallback);
        return Promise.resolve();
      };
      prototype.setRemoteDescription = withCallback;

      withCallback = function(candidate, successCallback, failureCallback) {
        const promise = addIceCandidate.apply(this, [candidate]);
        if (!failureCallback) {
          return promise;
        }
        promise.then(successCallback, failureCallback);
        return Promise.resolve();
      };
      prototype.addIceCandidate = withCallback;
    }

    function shimGetUserMedia(window) {
      const navigator = window && window.navigator;

      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // shim not needed in Safari 12.1
        const mediaDevices = navigator.mediaDevices;
        const _getUserMedia = mediaDevices.getUserMedia.bind(mediaDevices);
        navigator.mediaDevices.getUserMedia = (constraints) => {
          return _getUserMedia(shimConstraints(constraints));
        };
      }

      if (!navigator.getUserMedia && navigator.mediaDevices &&
        navigator.mediaDevices.getUserMedia) {
        navigator.getUserMedia = function getUserMedia(constraints, cb, errcb) {
          navigator.mediaDevices.getUserMedia(constraints)
          .then(cb, errcb);
        }.bind(navigator);
      }
    }

    function shimConstraints(constraints) {
      if (constraints && constraints.video !== undefined) {
        return Object.assign({},
          constraints,
          {video: compactObject(constraints.video)}
        );
      }

      return constraints;
    }

    function shimRTCIceServerUrls(window) {
      if (!window.RTCPeerConnection) {
        return;
      }
      // migrate from non-spec RTCIceServer.url to RTCIceServer.urls
      const OrigPeerConnection = window.RTCPeerConnection;
      window.RTCPeerConnection =
        function RTCPeerConnection(pcConfig, pcConstraints) {
          if (pcConfig && pcConfig.iceServers) {
            const newIceServers = [];
            for (let i = 0; i < pcConfig.iceServers.length; i++) {
              let server = pcConfig.iceServers[i];
              if (!server.hasOwnProperty('urls') &&
                  server.hasOwnProperty('url')) {
                deprecated('RTCIceServer.url', 'RTCIceServer.urls');
                server = JSON.parse(JSON.stringify(server));
                server.urls = server.url;
                delete server.url;
                newIceServers.push(server);
              } else {
                newIceServers.push(pcConfig.iceServers[i]);
              }
            }
            pcConfig.iceServers = newIceServers;
          }
          return new OrigPeerConnection(pcConfig, pcConstraints);
        };
      window.RTCPeerConnection.prototype = OrigPeerConnection.prototype;
      // wrap static methods. Currently just generateCertificate.
      if ('generateCertificate' in OrigPeerConnection) {
        Object.defineProperty(window.RTCPeerConnection, 'generateCertificate', {
          get() {
            return OrigPeerConnection.generateCertificate;
          }
        });
      }
    }

    function shimTrackEventTransceiver(window) {
      // Add event.transceiver member over deprecated event.receiver
      if (typeof window === 'object' && window.RTCTrackEvent &&
          'receiver' in window.RTCTrackEvent.prototype &&
          !('transceiver' in window.RTCTrackEvent.prototype)) {
        Object.defineProperty(window.RTCTrackEvent.prototype, 'transceiver', {
          get() {
            return {receiver: this.receiver};
          }
        });
      }
    }

    function shimCreateOfferLegacy(window) {
      const origCreateOffer = window.RTCPeerConnection.prototype.createOffer;
      window.RTCPeerConnection.prototype.createOffer =
        function createOffer(offerOptions) {
          if (offerOptions) {
            if (typeof offerOptions.offerToReceiveAudio !== 'undefined') {
              // support bit values
              offerOptions.offerToReceiveAudio =
                !!offerOptions.offerToReceiveAudio;
            }
            const audioTransceiver = this.getTransceivers().find(transceiver =>
              transceiver.receiver.track.kind === 'audio');
            if (offerOptions.offerToReceiveAudio === false && audioTransceiver) {
              if (audioTransceiver.direction === 'sendrecv') {
                if (audioTransceiver.setDirection) {
                  audioTransceiver.setDirection('sendonly');
                } else {
                  audioTransceiver.direction = 'sendonly';
                }
              } else if (audioTransceiver.direction === 'recvonly') {
                if (audioTransceiver.setDirection) {
                  audioTransceiver.setDirection('inactive');
                } else {
                  audioTransceiver.direction = 'inactive';
                }
              }
            } else if (offerOptions.offerToReceiveAudio === true &&
                !audioTransceiver) {
              this.addTransceiver('audio', {direction: 'recvonly'});
            }

            if (typeof offerOptions.offerToReceiveVideo !== 'undefined') {
              // support bit values
              offerOptions.offerToReceiveVideo =
                !!offerOptions.offerToReceiveVideo;
            }
            const videoTransceiver = this.getTransceivers().find(transceiver =>
              transceiver.receiver.track.kind === 'video');
            if (offerOptions.offerToReceiveVideo === false && videoTransceiver) {
              if (videoTransceiver.direction === 'sendrecv') {
                if (videoTransceiver.setDirection) {
                  videoTransceiver.setDirection('sendonly');
                } else {
                  videoTransceiver.direction = 'sendonly';
                }
              } else if (videoTransceiver.direction === 'recvonly') {
                if (videoTransceiver.setDirection) {
                  videoTransceiver.setDirection('inactive');
                } else {
                  videoTransceiver.direction = 'inactive';
                }
              }
            } else if (offerOptions.offerToReceiveVideo === true &&
                !videoTransceiver) {
              this.addTransceiver('video', {direction: 'recvonly'});
            }
          }
          return origCreateOffer.apply(this, arguments);
        };
    }

    function shimAudioContext(window) {
      if (typeof window !== 'object' || window.AudioContext) {
        return;
      }
      window.AudioContext = window.webkitAudioContext;
    }

    var safariShim = /*#__PURE__*/Object.freeze({
        __proto__: null,
        shimLocalStreamsAPI: shimLocalStreamsAPI,
        shimRemoteStreamsAPI: shimRemoteStreamsAPI,
        shimCallbacksAPI: shimCallbacksAPI,
        shimGetUserMedia: shimGetUserMedia,
        shimConstraints: shimConstraints,
        shimRTCIceServerUrls: shimRTCIceServerUrls,
        shimTrackEventTransceiver: shimTrackEventTransceiver,
        shimCreateOfferLegacy: shimCreateOfferLegacy,
        shimAudioContext: shimAudioContext
    });

    var sdpExports = {};
    var sdp$1 = {
      get exports(){ return sdpExports; },
      set exports(v){ sdpExports = v; },
    };

    /* eslint-env node */

    (function (module) {

    	// SDP helpers.
    	const SDPUtils = {};

    	// Generate an alphanumeric identifier for cname or mids.
    	// TODO: use UUIDs instead? https://gist.github.com/jed/982883
    	SDPUtils.generateIdentifier = function() {
    	  return Math.random().toString(36).substr(2, 10);
    	};

    	// The RTCP CNAME used by all peerconnections from the same JS.
    	SDPUtils.localCName = SDPUtils.generateIdentifier();

    	// Splits SDP into lines, dealing with both CRLF and LF.
    	SDPUtils.splitLines = function(blob) {
    	  return blob.trim().split('\n').map(line => line.trim());
    	};
    	// Splits SDP into sessionpart and mediasections. Ensures CRLF.
    	SDPUtils.splitSections = function(blob) {
    	  const parts = blob.split('\nm=');
    	  return parts.map((part, index) => (index > 0 ?
    	    'm=' + part : part).trim() + '\r\n');
    	};

    	// Returns the session description.
    	SDPUtils.getDescription = function(blob) {
    	  const sections = SDPUtils.splitSections(blob);
    	  return sections && sections[0];
    	};

    	// Returns the individual media sections.
    	SDPUtils.getMediaSections = function(blob) {
    	  const sections = SDPUtils.splitSections(blob);
    	  sections.shift();
    	  return sections;
    	};

    	// Returns lines that start with a certain prefix.
    	SDPUtils.matchPrefix = function(blob, prefix) {
    	  return SDPUtils.splitLines(blob).filter(line => line.indexOf(prefix) === 0);
    	};

    	// Parses an ICE candidate line. Sample input:
    	// candidate:702786350 2 udp 41819902 8.8.8.8 60769 typ relay raddr 8.8.8.8
    	// rport 55996"
    	// Input can be prefixed with a=.
    	SDPUtils.parseCandidate = function(line) {
    	  let parts;
    	  // Parse both variants.
    	  if (line.indexOf('a=candidate:') === 0) {
    	    parts = line.substring(12).split(' ');
    	  } else {
    	    parts = line.substring(10).split(' ');
    	  }

    	  const candidate = {
    	    foundation: parts[0],
    	    component: {1: 'rtp', 2: 'rtcp'}[parts[1]] || parts[1],
    	    protocol: parts[2].toLowerCase(),
    	    priority: parseInt(parts[3], 10),
    	    ip: parts[4],
    	    address: parts[4], // address is an alias for ip.
    	    port: parseInt(parts[5], 10),
    	    // skip parts[6] == 'typ'
    	    type: parts[7],
    	  };

    	  for (let i = 8; i < parts.length; i += 2) {
    	    switch (parts[i]) {
    	      case 'raddr':
    	        candidate.relatedAddress = parts[i + 1];
    	        break;
    	      case 'rport':
    	        candidate.relatedPort = parseInt(parts[i + 1], 10);
    	        break;
    	      case 'tcptype':
    	        candidate.tcpType = parts[i + 1];
    	        break;
    	      case 'ufrag':
    	        candidate.ufrag = parts[i + 1]; // for backward compatibility.
    	        candidate.usernameFragment = parts[i + 1];
    	        break;
    	      default: // extension handling, in particular ufrag. Don't overwrite.
    	        if (candidate[parts[i]] === undefined) {
    	          candidate[parts[i]] = parts[i + 1];
    	        }
    	        break;
    	    }
    	  }
    	  return candidate;
    	};

    	// Translates a candidate object into SDP candidate attribute.
    	// This does not include the a= prefix!
    	SDPUtils.writeCandidate = function(candidate) {
    	  const sdp = [];
    	  sdp.push(candidate.foundation);

    	  const component = candidate.component;
    	  if (component === 'rtp') {
    	    sdp.push(1);
    	  } else if (component === 'rtcp') {
    	    sdp.push(2);
    	  } else {
    	    sdp.push(component);
    	  }
    	  sdp.push(candidate.protocol.toUpperCase());
    	  sdp.push(candidate.priority);
    	  sdp.push(candidate.address || candidate.ip);
    	  sdp.push(candidate.port);

    	  const type = candidate.type;
    	  sdp.push('typ');
    	  sdp.push(type);
    	  if (type !== 'host' && candidate.relatedAddress &&
    	      candidate.relatedPort) {
    	    sdp.push('raddr');
    	    sdp.push(candidate.relatedAddress);
    	    sdp.push('rport');
    	    sdp.push(candidate.relatedPort);
    	  }
    	  if (candidate.tcpType && candidate.protocol.toLowerCase() === 'tcp') {
    	    sdp.push('tcptype');
    	    sdp.push(candidate.tcpType);
    	  }
    	  if (candidate.usernameFragment || candidate.ufrag) {
    	    sdp.push('ufrag');
    	    sdp.push(candidate.usernameFragment || candidate.ufrag);
    	  }
    	  return 'candidate:' + sdp.join(' ');
    	};

    	// Parses an ice-options line, returns an array of option tags.
    	// Sample input:
    	// a=ice-options:foo bar
    	SDPUtils.parseIceOptions = function(line) {
    	  return line.substr(14).split(' ');
    	};

    	// Parses a rtpmap line, returns RTCRtpCoddecParameters. Sample input:
    	// a=rtpmap:111 opus/48000/2
    	SDPUtils.parseRtpMap = function(line) {
    	  let parts = line.substr(9).split(' ');
    	  const parsed = {
    	    payloadType: parseInt(parts.shift(), 10), // was: id
    	  };

    	  parts = parts[0].split('/');

    	  parsed.name = parts[0];
    	  parsed.clockRate = parseInt(parts[1], 10); // was: clockrate
    	  parsed.channels = parts.length === 3 ? parseInt(parts[2], 10) : 1;
    	  // legacy alias, got renamed back to channels in ORTC.
    	  parsed.numChannels = parsed.channels;
    	  return parsed;
    	};

    	// Generates a rtpmap line from RTCRtpCodecCapability or
    	// RTCRtpCodecParameters.
    	SDPUtils.writeRtpMap = function(codec) {
    	  let pt = codec.payloadType;
    	  if (codec.preferredPayloadType !== undefined) {
    	    pt = codec.preferredPayloadType;
    	  }
    	  const channels = codec.channels || codec.numChannels || 1;
    	  return 'a=rtpmap:' + pt + ' ' + codec.name + '/' + codec.clockRate +
    	      (channels !== 1 ? '/' + channels : '') + '\r\n';
    	};

    	// Parses a extmap line (headerextension from RFC 5285). Sample input:
    	// a=extmap:2 urn:ietf:params:rtp-hdrext:toffset
    	// a=extmap:2/sendonly urn:ietf:params:rtp-hdrext:toffset
    	SDPUtils.parseExtmap = function(line) {
    	  const parts = line.substr(9).split(' ');
    	  return {
    	    id: parseInt(parts[0], 10),
    	    direction: parts[0].indexOf('/') > 0 ? parts[0].split('/')[1] : 'sendrecv',
    	    uri: parts[1],
    	  };
    	};

    	// Generates an extmap line from RTCRtpHeaderExtensionParameters or
    	// RTCRtpHeaderExtension.
    	SDPUtils.writeExtmap = function(headerExtension) {
    	  return 'a=extmap:' + (headerExtension.id || headerExtension.preferredId) +
    	      (headerExtension.direction && headerExtension.direction !== 'sendrecv'
    	        ? '/' + headerExtension.direction
    	        : '') +
    	      ' ' + headerExtension.uri + '\r\n';
    	};

    	// Parses a fmtp line, returns dictionary. Sample input:
    	// a=fmtp:96 vbr=on;cng=on
    	// Also deals with vbr=on; cng=on
    	SDPUtils.parseFmtp = function(line) {
    	  const parsed = {};
    	  let kv;
    	  const parts = line.substr(line.indexOf(' ') + 1).split(';');
    	  for (let j = 0; j < parts.length; j++) {
    	    kv = parts[j].trim().split('=');
    	    parsed[kv[0].trim()] = kv[1];
    	  }
    	  return parsed;
    	};

    	// Generates a fmtp line from RTCRtpCodecCapability or RTCRtpCodecParameters.
    	SDPUtils.writeFmtp = function(codec) {
    	  let line = '';
    	  let pt = codec.payloadType;
    	  if (codec.preferredPayloadType !== undefined) {
    	    pt = codec.preferredPayloadType;
    	  }
    	  if (codec.parameters && Object.keys(codec.parameters).length) {
    	    const params = [];
    	    Object.keys(codec.parameters).forEach(param => {
    	      if (codec.parameters[param] !== undefined) {
    	        params.push(param + '=' + codec.parameters[param]);
    	      } else {
    	        params.push(param);
    	      }
    	    });
    	    line += 'a=fmtp:' + pt + ' ' + params.join(';') + '\r\n';
    	  }
    	  return line;
    	};

    	// Parses a rtcp-fb line, returns RTCPRtcpFeedback object. Sample input:
    	// a=rtcp-fb:98 nack rpsi
    	SDPUtils.parseRtcpFb = function(line) {
    	  const parts = line.substr(line.indexOf(' ') + 1).split(' ');
    	  return {
    	    type: parts.shift(),
    	    parameter: parts.join(' '),
    	  };
    	};

    	// Generate a=rtcp-fb lines from RTCRtpCodecCapability or RTCRtpCodecParameters.
    	SDPUtils.writeRtcpFb = function(codec) {
    	  let lines = '';
    	  let pt = codec.payloadType;
    	  if (codec.preferredPayloadType !== undefined) {
    	    pt = codec.preferredPayloadType;
    	  }
    	  if (codec.rtcpFeedback && codec.rtcpFeedback.length) {
    	    // FIXME: special handling for trr-int?
    	    codec.rtcpFeedback.forEach(fb => {
    	      lines += 'a=rtcp-fb:' + pt + ' ' + fb.type +
    	      (fb.parameter && fb.parameter.length ? ' ' + fb.parameter : '') +
    	          '\r\n';
    	    });
    	  }
    	  return lines;
    	};

    	// Parses a RFC 5576 ssrc media attribute. Sample input:
    	// a=ssrc:3735928559 cname:something
    	SDPUtils.parseSsrcMedia = function(line) {
    	  const sp = line.indexOf(' ');
    	  const parts = {
    	    ssrc: parseInt(line.substr(7, sp - 7), 10),
    	  };
    	  const colon = line.indexOf(':', sp);
    	  if (colon > -1) {
    	    parts.attribute = line.substr(sp + 1, colon - sp - 1);
    	    parts.value = line.substr(colon + 1);
    	  } else {
    	    parts.attribute = line.substr(sp + 1);
    	  }
    	  return parts;
    	};

    	// Parse a ssrc-group line (see RFC 5576). Sample input:
    	// a=ssrc-group:semantics 12 34
    	SDPUtils.parseSsrcGroup = function(line) {
    	  const parts = line.substr(13).split(' ');
    	  return {
    	    semantics: parts.shift(),
    	    ssrcs: parts.map(ssrc => parseInt(ssrc, 10)),
    	  };
    	};

    	// Extracts the MID (RFC 5888) from a media section.
    	// Returns the MID or undefined if no mid line was found.
    	SDPUtils.getMid = function(mediaSection) {
    	  const mid = SDPUtils.matchPrefix(mediaSection, 'a=mid:')[0];
    	  if (mid) {
    	    return mid.substr(6);
    	  }
    	};

    	// Parses a fingerprint line for DTLS-SRTP.
    	SDPUtils.parseFingerprint = function(line) {
    	  const parts = line.substr(14).split(' ');
    	  return {
    	    algorithm: parts[0].toLowerCase(), // algorithm is case-sensitive in Edge.
    	    value: parts[1].toUpperCase(), // the definition is upper-case in RFC 4572.
    	  };
    	};

    	// Extracts DTLS parameters from SDP media section or sessionpart.
    	// FIXME: for consistency with other functions this should only
    	//   get the fingerprint line as input. See also getIceParameters.
    	SDPUtils.getDtlsParameters = function(mediaSection, sessionpart) {
    	  const lines = SDPUtils.matchPrefix(mediaSection + sessionpart,
    	    'a=fingerprint:');
    	  // Note: a=setup line is ignored since we use the 'auto' role in Edge.
    	  return {
    	    role: 'auto',
    	    fingerprints: lines.map(SDPUtils.parseFingerprint),
    	  };
    	};

    	// Serializes DTLS parameters to SDP.
    	SDPUtils.writeDtlsParameters = function(params, setupType) {
    	  let sdp = 'a=setup:' + setupType + '\r\n';
    	  params.fingerprints.forEach(fp => {
    	    sdp += 'a=fingerprint:' + fp.algorithm + ' ' + fp.value + '\r\n';
    	  });
    	  return sdp;
    	};

    	// Parses a=crypto lines into
    	//   https://rawgit.com/aboba/edgertc/master/msortc-rs4.html#dictionary-rtcsrtpsdesparameters-members
    	SDPUtils.parseCryptoLine = function(line) {
    	  const parts = line.substr(9).split(' ');
    	  return {
    	    tag: parseInt(parts[0], 10),
    	    cryptoSuite: parts[1],
    	    keyParams: parts[2],
    	    sessionParams: parts.slice(3),
    	  };
    	};

    	SDPUtils.writeCryptoLine = function(parameters) {
    	  return 'a=crypto:' + parameters.tag + ' ' +
    	    parameters.cryptoSuite + ' ' +
    	    (typeof parameters.keyParams === 'object'
    	      ? SDPUtils.writeCryptoKeyParams(parameters.keyParams)
    	      : parameters.keyParams) +
    	    (parameters.sessionParams ? ' ' + parameters.sessionParams.join(' ') : '') +
    	    '\r\n';
    	};

    	// Parses the crypto key parameters into
    	//   https://rawgit.com/aboba/edgertc/master/msortc-rs4.html#rtcsrtpkeyparam*
    	SDPUtils.parseCryptoKeyParams = function(keyParams) {
    	  if (keyParams.indexOf('inline:') !== 0) {
    	    return null;
    	  }
    	  const parts = keyParams.substr(7).split('|');
    	  return {
    	    keyMethod: 'inline',
    	    keySalt: parts[0],
    	    lifeTime: parts[1],
    	    mkiValue: parts[2] ? parts[2].split(':')[0] : undefined,
    	    mkiLength: parts[2] ? parts[2].split(':')[1] : undefined,
    	  };
    	};

    	SDPUtils.writeCryptoKeyParams = function(keyParams) {
    	  return keyParams.keyMethod + ':'
    	    + keyParams.keySalt +
    	    (keyParams.lifeTime ? '|' + keyParams.lifeTime : '') +
    	    (keyParams.mkiValue && keyParams.mkiLength
    	      ? '|' + keyParams.mkiValue + ':' + keyParams.mkiLength
    	      : '');
    	};

    	// Extracts all SDES parameters.
    	SDPUtils.getCryptoParameters = function(mediaSection, sessionpart) {
    	  const lines = SDPUtils.matchPrefix(mediaSection + sessionpart,
    	    'a=crypto:');
    	  return lines.map(SDPUtils.parseCryptoLine);
    	};

    	// Parses ICE information from SDP media section or sessionpart.
    	// FIXME: for consistency with other functions this should only
    	//   get the ice-ufrag and ice-pwd lines as input.
    	SDPUtils.getIceParameters = function(mediaSection, sessionpart) {
    	  const ufrag = SDPUtils.matchPrefix(mediaSection + sessionpart,
    	    'a=ice-ufrag:')[0];
    	  const pwd = SDPUtils.matchPrefix(mediaSection + sessionpart,
    	    'a=ice-pwd:')[0];
    	  if (!(ufrag && pwd)) {
    	    return null;
    	  }
    	  return {
    	    usernameFragment: ufrag.substr(12),
    	    password: pwd.substr(10),
    	  };
    	};

    	// Serializes ICE parameters to SDP.
    	SDPUtils.writeIceParameters = function(params) {
    	  let sdp = 'a=ice-ufrag:' + params.usernameFragment + '\r\n' +
    	      'a=ice-pwd:' + params.password + '\r\n';
    	  if (params.iceLite) {
    	    sdp += 'a=ice-lite\r\n';
    	  }
    	  return sdp;
    	};

    	// Parses the SDP media section and returns RTCRtpParameters.
    	SDPUtils.parseRtpParameters = function(mediaSection) {
    	  const description = {
    	    codecs: [],
    	    headerExtensions: [],
    	    fecMechanisms: [],
    	    rtcp: [],
    	  };
    	  const lines = SDPUtils.splitLines(mediaSection);
    	  const mline = lines[0].split(' ');
    	  for (let i = 3; i < mline.length; i++) { // find all codecs from mline[3..]
    	    const pt = mline[i];
    	    const rtpmapline = SDPUtils.matchPrefix(
    	      mediaSection, 'a=rtpmap:' + pt + ' ')[0];
    	    if (rtpmapline) {
    	      const codec = SDPUtils.parseRtpMap(rtpmapline);
    	      const fmtps = SDPUtils.matchPrefix(
    	        mediaSection, 'a=fmtp:' + pt + ' ');
    	      // Only the first a=fmtp:<pt> is considered.
    	      codec.parameters = fmtps.length ? SDPUtils.parseFmtp(fmtps[0]) : {};
    	      codec.rtcpFeedback = SDPUtils.matchPrefix(
    	        mediaSection, 'a=rtcp-fb:' + pt + ' ')
    	        .map(SDPUtils.parseRtcpFb);
    	      description.codecs.push(codec);
    	      // parse FEC mechanisms from rtpmap lines.
    	      switch (codec.name.toUpperCase()) {
    	        case 'RED':
    	        case 'ULPFEC':
    	          description.fecMechanisms.push(codec.name.toUpperCase());
    	          break;
    	      }
    	    }
    	  }
    	  SDPUtils.matchPrefix(mediaSection, 'a=extmap:').forEach(line => {
    	    description.headerExtensions.push(SDPUtils.parseExtmap(line));
    	  });
    	  // FIXME: parse rtcp.
    	  return description;
    	};

    	// Generates parts of the SDP media section describing the capabilities /
    	// parameters.
    	SDPUtils.writeRtpDescription = function(kind, caps) {
    	  let sdp = '';

    	  // Build the mline.
    	  sdp += 'm=' + kind + ' ';
    	  sdp += caps.codecs.length > 0 ? '9' : '0'; // reject if no codecs.
    	  sdp += ' UDP/TLS/RTP/SAVPF ';
    	  sdp += caps.codecs.map(codec => {
    	    if (codec.preferredPayloadType !== undefined) {
    	      return codec.preferredPayloadType;
    	    }
    	    return codec.payloadType;
    	  }).join(' ') + '\r\n';

    	  sdp += 'c=IN IP4 0.0.0.0\r\n';
    	  sdp += 'a=rtcp:9 IN IP4 0.0.0.0\r\n';

    	  // Add a=rtpmap lines for each codec. Also fmtp and rtcp-fb.
    	  caps.codecs.forEach(codec => {
    	    sdp += SDPUtils.writeRtpMap(codec);
    	    sdp += SDPUtils.writeFmtp(codec);
    	    sdp += SDPUtils.writeRtcpFb(codec);
    	  });
    	  let maxptime = 0;
    	  caps.codecs.forEach(codec => {
    	    if (codec.maxptime > maxptime) {
    	      maxptime = codec.maxptime;
    	    }
    	  });
    	  if (maxptime > 0) {
    	    sdp += 'a=maxptime:' + maxptime + '\r\n';
    	  }

    	  if (caps.headerExtensions) {
    	    caps.headerExtensions.forEach(extension => {
    	      sdp += SDPUtils.writeExtmap(extension);
    	    });
    	  }
    	  // FIXME: write fecMechanisms.
    	  return sdp;
    	};

    	// Parses the SDP media section and returns an array of
    	// RTCRtpEncodingParameters.
    	SDPUtils.parseRtpEncodingParameters = function(mediaSection) {
    	  const encodingParameters = [];
    	  const description = SDPUtils.parseRtpParameters(mediaSection);
    	  const hasRed = description.fecMechanisms.indexOf('RED') !== -1;
    	  const hasUlpfec = description.fecMechanisms.indexOf('ULPFEC') !== -1;

    	  // filter a=ssrc:... cname:, ignore PlanB-msid
    	  const ssrcs = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:')
    	    .map(line => SDPUtils.parseSsrcMedia(line))
    	    .filter(parts => parts.attribute === 'cname');
    	  const primarySsrc = ssrcs.length > 0 && ssrcs[0].ssrc;
    	  let secondarySsrc;

    	  const flows = SDPUtils.matchPrefix(mediaSection, 'a=ssrc-group:FID')
    	    .map(line => {
    	      const parts = line.substr(17).split(' ');
    	      return parts.map(part => parseInt(part, 10));
    	    });
    	  if (flows.length > 0 && flows[0].length > 1 && flows[0][0] === primarySsrc) {
    	    secondarySsrc = flows[0][1];
    	  }

    	  description.codecs.forEach(codec => {
    	    if (codec.name.toUpperCase() === 'RTX' && codec.parameters.apt) {
    	      let encParam = {
    	        ssrc: primarySsrc,
    	        codecPayloadType: parseInt(codec.parameters.apt, 10),
    	      };
    	      if (primarySsrc && secondarySsrc) {
    	        encParam.rtx = {ssrc: secondarySsrc};
    	      }
    	      encodingParameters.push(encParam);
    	      if (hasRed) {
    	        encParam = JSON.parse(JSON.stringify(encParam));
    	        encParam.fec = {
    	          ssrc: primarySsrc,
    	          mechanism: hasUlpfec ? 'red+ulpfec' : 'red',
    	        };
    	        encodingParameters.push(encParam);
    	      }
    	    }
    	  });
    	  if (encodingParameters.length === 0 && primarySsrc) {
    	    encodingParameters.push({
    	      ssrc: primarySsrc,
    	    });
    	  }

    	  // we support both b=AS and b=TIAS but interpret AS as TIAS.
    	  let bandwidth = SDPUtils.matchPrefix(mediaSection, 'b=');
    	  if (bandwidth.length) {
    	    if (bandwidth[0].indexOf('b=TIAS:') === 0) {
    	      bandwidth = parseInt(bandwidth[0].substr(7), 10);
    	    } else if (bandwidth[0].indexOf('b=AS:') === 0) {
    	      // use formula from JSEP to convert b=AS to TIAS value.
    	      bandwidth = parseInt(bandwidth[0].substr(5), 10) * 1000 * 0.95
    	          - (50 * 40 * 8);
    	    } else {
    	      bandwidth = undefined;
    	    }
    	    encodingParameters.forEach(params => {
    	      params.maxBitrate = bandwidth;
    	    });
    	  }
    	  return encodingParameters;
    	};

    	// parses http://draft.ortc.org/#rtcrtcpparameters*
    	SDPUtils.parseRtcpParameters = function(mediaSection) {
    	  const rtcpParameters = {};

    	  // Gets the first SSRC. Note that with RTX there might be multiple
    	  // SSRCs.
    	  const remoteSsrc = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:')
    	    .map(line => SDPUtils.parseSsrcMedia(line))
    	    .filter(obj => obj.attribute === 'cname')[0];
    	  if (remoteSsrc) {
    	    rtcpParameters.cname = remoteSsrc.value;
    	    rtcpParameters.ssrc = remoteSsrc.ssrc;
    	  }

    	  // Edge uses the compound attribute instead of reducedSize
    	  // compound is !reducedSize
    	  const rsize = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-rsize');
    	  rtcpParameters.reducedSize = rsize.length > 0;
    	  rtcpParameters.compound = rsize.length === 0;

    	  // parses the rtcp-mux attrіbute.
    	  // Note that Edge does not support unmuxed RTCP.
    	  const mux = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-mux');
    	  rtcpParameters.mux = mux.length > 0;

    	  return rtcpParameters;
    	};

    	SDPUtils.writeRtcpParameters = function(rtcpParameters) {
    	  let sdp = '';
    	  if (rtcpParameters.reducedSize) {
    	    sdp += 'a=rtcp-rsize\r\n';
    	  }
    	  if (rtcpParameters.mux) {
    	    sdp += 'a=rtcp-mux\r\n';
    	  }
    	  if (rtcpParameters.ssrc !== undefined && rtcpParameters.cname) {
    	    sdp += 'a=ssrc:' + rtcpParameters.ssrc +
    	      ' cname:' + rtcpParameters.cname + '\r\n';
    	  }
    	  return sdp;
    	};


    	// parses either a=msid: or a=ssrc:... msid lines and returns
    	// the id of the MediaStream and MediaStreamTrack.
    	SDPUtils.parseMsid = function(mediaSection) {
    	  let parts;
    	  const spec = SDPUtils.matchPrefix(mediaSection, 'a=msid:');
    	  if (spec.length === 1) {
    	    parts = spec[0].substr(7).split(' ');
    	    return {stream: parts[0], track: parts[1]};
    	  }
    	  const planB = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:')
    	    .map(line => SDPUtils.parseSsrcMedia(line))
    	    .filter(msidParts => msidParts.attribute === 'msid');
    	  if (planB.length > 0) {
    	    parts = planB[0].value.split(' ');
    	    return {stream: parts[0], track: parts[1]};
    	  }
    	};

    	// SCTP
    	// parses draft-ietf-mmusic-sctp-sdp-26 first and falls back
    	// to draft-ietf-mmusic-sctp-sdp-05
    	SDPUtils.parseSctpDescription = function(mediaSection) {
    	  const mline = SDPUtils.parseMLine(mediaSection);
    	  const maxSizeLine = SDPUtils.matchPrefix(mediaSection, 'a=max-message-size:');
    	  let maxMessageSize;
    	  if (maxSizeLine.length > 0) {
    	    maxMessageSize = parseInt(maxSizeLine[0].substr(19), 10);
    	  }
    	  if (isNaN(maxMessageSize)) {
    	    maxMessageSize = 65536;
    	  }
    	  const sctpPort = SDPUtils.matchPrefix(mediaSection, 'a=sctp-port:');
    	  if (sctpPort.length > 0) {
    	    return {
    	      port: parseInt(sctpPort[0].substr(12), 10),
    	      protocol: mline.fmt,
    	      maxMessageSize,
    	    };
    	  }
    	  const sctpMapLines = SDPUtils.matchPrefix(mediaSection, 'a=sctpmap:');
    	  if (sctpMapLines.length > 0) {
    	    const parts = sctpMapLines[0]
    	      .substr(10)
    	      .split(' ');
    	    return {
    	      port: parseInt(parts[0], 10),
    	      protocol: parts[1],
    	      maxMessageSize,
    	    };
    	  }
    	};

    	// SCTP
    	// outputs the draft-ietf-mmusic-sctp-sdp-26 version that all browsers
    	// support by now receiving in this format, unless we originally parsed
    	// as the draft-ietf-mmusic-sctp-sdp-05 format (indicated by the m-line
    	// protocol of DTLS/SCTP -- without UDP/ or TCP/)
    	SDPUtils.writeSctpDescription = function(media, sctp) {
    	  let output = [];
    	  if (media.protocol !== 'DTLS/SCTP') {
    	    output = [
    	      'm=' + media.kind + ' 9 ' + media.protocol + ' ' + sctp.protocol + '\r\n',
    	      'c=IN IP4 0.0.0.0\r\n',
    	      'a=sctp-port:' + sctp.port + '\r\n',
    	    ];
    	  } else {
    	    output = [
    	      'm=' + media.kind + ' 9 ' + media.protocol + ' ' + sctp.port + '\r\n',
    	      'c=IN IP4 0.0.0.0\r\n',
    	      'a=sctpmap:' + sctp.port + ' ' + sctp.protocol + ' 65535\r\n',
    	    ];
    	  }
    	  if (sctp.maxMessageSize !== undefined) {
    	    output.push('a=max-message-size:' + sctp.maxMessageSize + '\r\n');
    	  }
    	  return output.join('');
    	};

    	// Generate a session ID for SDP.
    	// https://tools.ietf.org/html/draft-ietf-rtcweb-jsep-20#section-5.2.1
    	// recommends using a cryptographically random +ve 64-bit value
    	// but right now this should be acceptable and within the right range
    	SDPUtils.generateSessionId = function() {
    	  return Math.random().toString().substr(2, 21);
    	};

    	// Write boiler plate for start of SDP
    	// sessId argument is optional - if not supplied it will
    	// be generated randomly
    	// sessVersion is optional and defaults to 2
    	// sessUser is optional and defaults to 'thisisadapterortc'
    	SDPUtils.writeSessionBoilerplate = function(sessId, sessVer, sessUser) {
    	  let sessionId;
    	  const version = sessVer !== undefined ? sessVer : 2;
    	  if (sessId) {
    	    sessionId = sessId;
    	  } else {
    	    sessionId = SDPUtils.generateSessionId();
    	  }
    	  const user = sessUser || 'thisisadapterortc';
    	  // FIXME: sess-id should be an NTP timestamp.
    	  return 'v=0\r\n' +
    	      'o=' + user + ' ' + sessionId + ' ' + version +
    	        ' IN IP4 127.0.0.1\r\n' +
    	      's=-\r\n' +
    	      't=0 0\r\n';
    	};

    	// Gets the direction from the mediaSection or the sessionpart.
    	SDPUtils.getDirection = function(mediaSection, sessionpart) {
    	  // Look for sendrecv, sendonly, recvonly, inactive, default to sendrecv.
    	  const lines = SDPUtils.splitLines(mediaSection);
    	  for (let i = 0; i < lines.length; i++) {
    	    switch (lines[i]) {
    	      case 'a=sendrecv':
    	      case 'a=sendonly':
    	      case 'a=recvonly':
    	      case 'a=inactive':
    	        return lines[i].substr(2);
    	        // FIXME: What should happen here?
    	    }
    	  }
    	  if (sessionpart) {
    	    return SDPUtils.getDirection(sessionpart);
    	  }
    	  return 'sendrecv';
    	};

    	SDPUtils.getKind = function(mediaSection) {
    	  const lines = SDPUtils.splitLines(mediaSection);
    	  const mline = lines[0].split(' ');
    	  return mline[0].substr(2);
    	};

    	SDPUtils.isRejected = function(mediaSection) {
    	  return mediaSection.split(' ', 2)[1] === '0';
    	};

    	SDPUtils.parseMLine = function(mediaSection) {
    	  const lines = SDPUtils.splitLines(mediaSection);
    	  const parts = lines[0].substr(2).split(' ');
    	  return {
    	    kind: parts[0],
    	    port: parseInt(parts[1], 10),
    	    protocol: parts[2],
    	    fmt: parts.slice(3).join(' '),
    	  };
    	};

    	SDPUtils.parseOLine = function(mediaSection) {
    	  const line = SDPUtils.matchPrefix(mediaSection, 'o=')[0];
    	  const parts = line.substr(2).split(' ');
    	  return {
    	    username: parts[0],
    	    sessionId: parts[1],
    	    sessionVersion: parseInt(parts[2], 10),
    	    netType: parts[3],
    	    addressType: parts[4],
    	    address: parts[5],
    	  };
    	};

    	// a very naive interpretation of a valid SDP.
    	SDPUtils.isValidSDP = function(blob) {
    	  if (typeof blob !== 'string' || blob.length === 0) {
    	    return false;
    	  }
    	  const lines = SDPUtils.splitLines(blob);
    	  for (let i = 0; i < lines.length; i++) {
    	    if (lines[i].length < 2 || lines[i].charAt(1) !== '=') {
    	      return false;
    	    }
    	    // TODO: check the modifier a bit more.
    	  }
    	  return true;
    	};

    	// Expose public methods.
    	{
    	  module.exports = SDPUtils;
    	}
    } (sdp$1));

    var SDPUtils = sdpExports;

    var sdp = /*#__PURE__*/_mergeNamespaces({
        __proto__: null,
        default: SDPUtils
    }, [sdpExports]);

    /*
     *  Copyright (c) 2017 The WebRTC project authors. All Rights Reserved.
     *
     *  Use of this source code is governed by a BSD-style license
     *  that can be found in the LICENSE file in the root of the source
     *  tree.
     */

    function shimRTCIceCandidate(window) {
      // foundation is arbitrarily chosen as an indicator for full support for
      // https://w3c.github.io/webrtc-pc/#rtcicecandidate-interface
      if (!window.RTCIceCandidate || (window.RTCIceCandidate && 'foundation' in
          window.RTCIceCandidate.prototype)) {
        return;
      }

      const NativeRTCIceCandidate = window.RTCIceCandidate;
      window.RTCIceCandidate = function RTCIceCandidate(args) {
        // Remove the a= which shouldn't be part of the candidate string.
        if (typeof args === 'object' && args.candidate &&
            args.candidate.indexOf('a=') === 0) {
          args = JSON.parse(JSON.stringify(args));
          args.candidate = args.candidate.substr(2);
        }

        if (args.candidate && args.candidate.length) {
          // Augment the native candidate with the parsed fields.
          const nativeCandidate = new NativeRTCIceCandidate(args);
          const parsedCandidate = SDPUtils.parseCandidate(args.candidate);
          const augmentedCandidate = Object.assign(nativeCandidate,
              parsedCandidate);

          // Add a serializer that does not serialize the extra attributes.
          augmentedCandidate.toJSON = function toJSON() {
            return {
              candidate: augmentedCandidate.candidate,
              sdpMid: augmentedCandidate.sdpMid,
              sdpMLineIndex: augmentedCandidate.sdpMLineIndex,
              usernameFragment: augmentedCandidate.usernameFragment,
            };
          };
          return augmentedCandidate;
        }
        return new NativeRTCIceCandidate(args);
      };
      window.RTCIceCandidate.prototype = NativeRTCIceCandidate.prototype;

      // Hook up the augmented candidate in onicecandidate and
      // addEventListener('icecandidate', ...)
      wrapPeerConnectionEvent(window, 'icecandidate', e => {
        if (e.candidate) {
          Object.defineProperty(e, 'candidate', {
            value: new window.RTCIceCandidate(e.candidate),
            writable: 'false'
          });
        }
        return e;
      });
    }

    function shimRTCIceCandidateRelayProtocol(window) {
      if (!window.RTCIceCandidate || (window.RTCIceCandidate && 'relayProtocol' in
          window.RTCIceCandidate.prototype)) {
        return;
      }

      // Hook up the augmented candidate in onicecandidate and
      // addEventListener('icecandidate', ...)
      wrapPeerConnectionEvent(window, 'icecandidate', e => {
        if (e.candidate) {
          const parsedCandidate = SDPUtils.parseCandidate(e.candidate.candidate);
          if (parsedCandidate.type === 'relay') {
            // This is a libwebrtc-specific mapping of local type preference
            // to relayProtocol.
            e.candidate.relayProtocol = {
              0: 'tls',
              1: 'tcp',
              2: 'udp',
            }[parsedCandidate.priority >> 24];
          }
        }
        return e;
      });
    }

    function shimMaxMessageSize(window, browserDetails) {
      if (!window.RTCPeerConnection) {
        return;
      }

      if (!('sctp' in window.RTCPeerConnection.prototype)) {
        Object.defineProperty(window.RTCPeerConnection.prototype, 'sctp', {
          get() {
            return typeof this._sctp === 'undefined' ? null : this._sctp;
          }
        });
      }

      const sctpInDescription = function(description) {
        if (!description || !description.sdp) {
          return false;
        }
        const sections = SDPUtils.splitSections(description.sdp);
        sections.shift();
        return sections.some(mediaSection => {
          const mLine = SDPUtils.parseMLine(mediaSection);
          return mLine && mLine.kind === 'application'
              && mLine.protocol.indexOf('SCTP') !== -1;
        });
      };

      const getRemoteFirefoxVersion = function(description) {
        // TODO: Is there a better solution for detecting Firefox?
        const match = description.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);
        if (match === null || match.length < 2) {
          return -1;
        }
        const version = parseInt(match[1], 10);
        // Test for NaN (yes, this is ugly)
        return version !== version ? -1 : version;
      };

      const getCanSendMaxMessageSize = function(remoteIsFirefox) {
        // Every implementation we know can send at least 64 KiB.
        // Note: Although Chrome is technically able to send up to 256 KiB, the
        //       data does not reach the other peer reliably.
        //       See: https://bugs.chromium.org/p/webrtc/issues/detail?id=8419
        let canSendMaxMessageSize = 65536;
        if (browserDetails.browser === 'firefox') {
          if (browserDetails.version < 57) {
            if (remoteIsFirefox === -1) {
              // FF < 57 will send in 16 KiB chunks using the deprecated PPID
              // fragmentation.
              canSendMaxMessageSize = 16384;
            } else {
              // However, other FF (and RAWRTC) can reassemble PPID-fragmented
              // messages. Thus, supporting ~2 GiB when sending.
              canSendMaxMessageSize = 2147483637;
            }
          } else if (browserDetails.version < 60) {
            // Currently, all FF >= 57 will reset the remote maximum message size
            // to the default value when a data channel is created at a later
            // stage. :(
            // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1426831
            canSendMaxMessageSize =
              browserDetails.version === 57 ? 65535 : 65536;
          } else {
            // FF >= 60 supports sending ~2 GiB
            canSendMaxMessageSize = 2147483637;
          }
        }
        return canSendMaxMessageSize;
      };

      const getMaxMessageSize = function(description, remoteIsFirefox) {
        // Note: 65536 bytes is the default value from the SDP spec. Also,
        //       every implementation we know supports receiving 65536 bytes.
        let maxMessageSize = 65536;

        // FF 57 has a slightly incorrect default remote max message size, so
        // we need to adjust it here to avoid a failure when sending.
        // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1425697
        if (browserDetails.browser === 'firefox'
             && browserDetails.version === 57) {
          maxMessageSize = 65535;
        }

        const match = SDPUtils.matchPrefix(description.sdp,
          'a=max-message-size:');
        if (match.length > 0) {
          maxMessageSize = parseInt(match[0].substr(19), 10);
        } else if (browserDetails.browser === 'firefox' &&
                    remoteIsFirefox !== -1) {
          // If the maximum message size is not present in the remote SDP and
          // both local and remote are Firefox, the remote peer can receive
          // ~2 GiB.
          maxMessageSize = 2147483637;
        }
        return maxMessageSize;
      };

      const origSetRemoteDescription =
          window.RTCPeerConnection.prototype.setRemoteDescription;
      window.RTCPeerConnection.prototype.setRemoteDescription =
        function setRemoteDescription() {
          this._sctp = null;
          // Chrome decided to not expose .sctp in plan-b mode.
          // As usual, adapter.js has to do an 'ugly worakaround'
          // to cover up the mess.
          if (browserDetails.browser === 'chrome' && browserDetails.version >= 76) {
            const {sdpSemantics} = this.getConfiguration();
            if (sdpSemantics === 'plan-b') {
              Object.defineProperty(this, 'sctp', {
                get() {
                  return typeof this._sctp === 'undefined' ? null : this._sctp;
                },
                enumerable: true,
                configurable: true,
              });
            }
          }

          if (sctpInDescription(arguments[0])) {
            // Check if the remote is FF.
            const isFirefox = getRemoteFirefoxVersion(arguments[0]);

            // Get the maximum message size the local peer is capable of sending
            const canSendMMS = getCanSendMaxMessageSize(isFirefox);

            // Get the maximum message size of the remote peer.
            const remoteMMS = getMaxMessageSize(arguments[0], isFirefox);

            // Determine final maximum message size
            let maxMessageSize;
            if (canSendMMS === 0 && remoteMMS === 0) {
              maxMessageSize = Number.POSITIVE_INFINITY;
            } else if (canSendMMS === 0 || remoteMMS === 0) {
              maxMessageSize = Math.max(canSendMMS, remoteMMS);
            } else {
              maxMessageSize = Math.min(canSendMMS, remoteMMS);
            }

            // Create a dummy RTCSctpTransport object and the 'maxMessageSize'
            // attribute.
            const sctp = {};
            Object.defineProperty(sctp, 'maxMessageSize', {
              get() {
                return maxMessageSize;
              }
            });
            this._sctp = sctp;
          }

          return origSetRemoteDescription.apply(this, arguments);
        };
    }

    function shimSendThrowTypeError(window) {
      if (!(window.RTCPeerConnection &&
          'createDataChannel' in window.RTCPeerConnection.prototype)) {
        return;
      }

      // Note: Although Firefox >= 57 has a native implementation, the maximum
      //       message size can be reset for all data channels at a later stage.
      //       See: https://bugzilla.mozilla.org/show_bug.cgi?id=1426831

      function wrapDcSend(dc, pc) {
        const origDataChannelSend = dc.send;
        dc.send = function send() {
          const data = arguments[0];
          const length = data.length || data.size || data.byteLength;
          if (dc.readyState === 'open' &&
              pc.sctp && length > pc.sctp.maxMessageSize) {
            throw new TypeError('Message too large (can send a maximum of ' +
              pc.sctp.maxMessageSize + ' bytes)');
          }
          return origDataChannelSend.apply(dc, arguments);
        };
      }
      const origCreateDataChannel =
        window.RTCPeerConnection.prototype.createDataChannel;
      window.RTCPeerConnection.prototype.createDataChannel =
        function createDataChannel() {
          const dataChannel = origCreateDataChannel.apply(this, arguments);
          wrapDcSend(dataChannel, this);
          return dataChannel;
        };
      wrapPeerConnectionEvent(window, 'datachannel', e => {
        wrapDcSend(e.channel, e.target);
        return e;
      });
    }


    /* shims RTCConnectionState by pretending it is the same as iceConnectionState.
     * See https://bugs.chromium.org/p/webrtc/issues/detail?id=6145#c12
     * for why this is a valid hack in Chrome. In Firefox it is slightly incorrect
     * since DTLS failures would be hidden. See
     * https://bugzilla.mozilla.org/show_bug.cgi?id=1265827
     * for the Firefox tracking bug.
     */
    function shimConnectionState(window) {
      if (!window.RTCPeerConnection ||
          'connectionState' in window.RTCPeerConnection.prototype) {
        return;
      }
      const proto = window.RTCPeerConnection.prototype;
      Object.defineProperty(proto, 'connectionState', {
        get() {
          return {
            completed: 'connected',
            checking: 'connecting'
          }[this.iceConnectionState] || this.iceConnectionState;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(proto, 'onconnectionstatechange', {
        get() {
          return this._onconnectionstatechange || null;
        },
        set(cb) {
          if (this._onconnectionstatechange) {
            this.removeEventListener('connectionstatechange',
                this._onconnectionstatechange);
            delete this._onconnectionstatechange;
          }
          if (cb) {
            this.addEventListener('connectionstatechange',
                this._onconnectionstatechange = cb);
          }
        },
        enumerable: true,
        configurable: true
      });

      ['setLocalDescription', 'setRemoteDescription'].forEach((method) => {
        const origMethod = proto[method];
        proto[method] = function() {
          if (!this._connectionstatechangepoly) {
            this._connectionstatechangepoly = e => {
              const pc = e.target;
              if (pc._lastConnectionState !== pc.connectionState) {
                pc._lastConnectionState = pc.connectionState;
                const newEvent = new Event('connectionstatechange', e);
                pc.dispatchEvent(newEvent);
              }
              return e;
            };
            this.addEventListener('iceconnectionstatechange',
              this._connectionstatechangepoly);
          }
          return origMethod.apply(this, arguments);
        };
      });
    }

    function removeExtmapAllowMixed(window, browserDetails) {
      /* remove a=extmap-allow-mixed for webrtc.org < M71 */
      if (!window.RTCPeerConnection) {
        return;
      }
      if (browserDetails.browser === 'chrome' && browserDetails.version >= 71) {
        return;
      }
      if (browserDetails.browser === 'safari' && browserDetails.version >= 605) {
        return;
      }
      const nativeSRD = window.RTCPeerConnection.prototype.setRemoteDescription;
      window.RTCPeerConnection.prototype.setRemoteDescription =
      function setRemoteDescription(desc) {
        if (desc && desc.sdp && desc.sdp.indexOf('\na=extmap-allow-mixed') !== -1) {
          const sdp = desc.sdp.split('\n').filter((line) => {
            return line.trim() !== 'a=extmap-allow-mixed';
          }).join('\n');
          // Safari enforces read-only-ness of RTCSessionDescription fields.
          if (window.RTCSessionDescription &&
              desc instanceof window.RTCSessionDescription) {
            arguments[0] = new window.RTCSessionDescription({
              type: desc.type,
              sdp,
            });
          } else {
            desc.sdp = sdp;
          }
        }
        return nativeSRD.apply(this, arguments);
      };
    }

    function shimAddIceCandidateNullOrEmpty(window, browserDetails) {
      // Support for addIceCandidate(null or undefined)
      // as well as addIceCandidate({candidate: "", ...})
      // https://bugs.chromium.org/p/chromium/issues/detail?id=978582
      // Note: must be called before other polyfills which change the signature.
      if (!(window.RTCPeerConnection && window.RTCPeerConnection.prototype)) {
        return;
      }
      const nativeAddIceCandidate =
          window.RTCPeerConnection.prototype.addIceCandidate;
      if (!nativeAddIceCandidate || nativeAddIceCandidate.length === 0) {
        return;
      }
      window.RTCPeerConnection.prototype.addIceCandidate =
        function addIceCandidate() {
          if (!arguments[0]) {
            if (arguments[1]) {
              arguments[1].apply(null);
            }
            return Promise.resolve();
          }
          // Firefox 68+ emits and processes {candidate: "", ...}, ignore
          // in older versions.
          // Native support for ignoring exists for Chrome M77+.
          // Safari ignores as well, exact version unknown but works in the same
          // version that also ignores addIceCandidate(null).
          if (((browserDetails.browser === 'chrome' && browserDetails.version < 78)
               || (browserDetails.browser === 'firefox'
                   && browserDetails.version < 68)
               || (browserDetails.browser === 'safari'))
              && arguments[0] && arguments[0].candidate === '') {
            return Promise.resolve();
          }
          return nativeAddIceCandidate.apply(this, arguments);
        };
    }

    // Note: Make sure to call this ahead of APIs that modify
    // setLocalDescription.length
    function shimParameterlessSetLocalDescription(window, browserDetails) {
      if (!(window.RTCPeerConnection && window.RTCPeerConnection.prototype)) {
        return;
      }
      const nativeSetLocalDescription =
          window.RTCPeerConnection.prototype.setLocalDescription;
      if (!nativeSetLocalDescription || nativeSetLocalDescription.length === 0) {
        return;
      }
      window.RTCPeerConnection.prototype.setLocalDescription =
        function setLocalDescription() {
          let desc = arguments[0] || {};
          if (typeof desc !== 'object' || (desc.type && desc.sdp)) {
            return nativeSetLocalDescription.apply(this, arguments);
          }
          // The remaining steps should technically happen when SLD comes off the
          // RTCPeerConnection's operations chain (not ahead of going on it), but
          // this is too difficult to shim. Instead, this shim only covers the
          // common case where the operations chain is empty. This is imperfect, but
          // should cover many cases. Rationale: Even if we can't reduce the glare
          // window to zero on imperfect implementations, there's value in tapping
          // into the perfect negotiation pattern that several browsers support.
          desc = {type: desc.type, sdp: desc.sdp};
          if (!desc.type) {
            switch (this.signalingState) {
              case 'stable':
              case 'have-local-offer':
              case 'have-remote-pranswer':
                desc.type = 'offer';
                break;
              default:
                desc.type = 'answer';
                break;
            }
          }
          if (desc.sdp || (desc.type !== 'offer' && desc.type !== 'answer')) {
            return nativeSetLocalDescription.apply(this, [desc]);
          }
          const func = desc.type === 'offer' ? this.createOffer : this.createAnswer;
          return func.apply(this)
            .then(d => nativeSetLocalDescription.apply(this, [d]));
        };
    }

    var commonShim = /*#__PURE__*/Object.freeze({
        __proto__: null,
        shimRTCIceCandidate: shimRTCIceCandidate,
        shimRTCIceCandidateRelayProtocol: shimRTCIceCandidateRelayProtocol,
        shimMaxMessageSize: shimMaxMessageSize,
        shimSendThrowTypeError: shimSendThrowTypeError,
        shimConnectionState: shimConnectionState,
        removeExtmapAllowMixed: removeExtmapAllowMixed,
        shimAddIceCandidateNullOrEmpty: shimAddIceCandidateNullOrEmpty,
        shimParameterlessSetLocalDescription: shimParameterlessSetLocalDescription
    });

    /*
     *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
     *
     *  Use of this source code is governed by a BSD-style license
     *  that can be found in the LICENSE file in the root of the source
     *  tree.
     */

    // Shimming starts here.
    function adapterFactory({window} = {}, options = {
      shimChrome: true,
      shimFirefox: true,
      shimSafari: true,
    }) {
      // Utils.
      const logging = log;
      const browserDetails = detectBrowser(window);

      const adapter = {
        browserDetails,
        commonShim,
        extractVersion: extractVersion,
        disableLog: disableLog,
        disableWarnings: disableWarnings,
        // Expose sdp as a convenience. For production apps include directly.
        sdp,
      };

      // Shim browser if found.
      switch (browserDetails.browser) {
        case 'chrome':
          if (!chromeShim || !shimPeerConnection$1 ||
              !options.shimChrome) {
            logging('Chrome shim is not included in this adapter release.');
            return adapter;
          }
          if (browserDetails.version === null) {
            logging('Chrome shim can not determine version, not shimming.');
            return adapter;
          }
          logging('adapter.js shimming chrome.');
          // Export to the adapter global object visible in the browser.
          adapter.browserShim = chromeShim;

          // Must be called before shimPeerConnection.
          shimAddIceCandidateNullOrEmpty(window, browserDetails);
          shimParameterlessSetLocalDescription(window);

          shimGetUserMedia$2(window, browserDetails);
          shimMediaStream(window);
          shimPeerConnection$1(window, browserDetails);
          shimOnTrack$1(window);
          shimAddTrackRemoveTrack(window, browserDetails);
          shimGetSendersWithDtmf(window);
          shimGetStats(window);
          shimSenderReceiverGetStats(window);
          fixNegotiationNeeded(window, browserDetails);

          shimRTCIceCandidate(window);
          shimRTCIceCandidateRelayProtocol(window);
          shimConnectionState(window);
          shimMaxMessageSize(window, browserDetails);
          shimSendThrowTypeError(window);
          removeExtmapAllowMixed(window, browserDetails);
          break;
        case 'firefox':
          if (!firefoxShim || !shimPeerConnection ||
              !options.shimFirefox) {
            logging('Firefox shim is not included in this adapter release.');
            return adapter;
          }
          logging('adapter.js shimming firefox.');
          // Export to the adapter global object visible in the browser.
          adapter.browserShim = firefoxShim;

          // Must be called before shimPeerConnection.
          shimAddIceCandidateNullOrEmpty(window, browserDetails);
          shimParameterlessSetLocalDescription(window);

          shimGetUserMedia$1(window, browserDetails);
          shimPeerConnection(window, browserDetails);
          shimOnTrack(window);
          shimRemoveStream(window);
          shimSenderGetStats(window);
          shimReceiverGetStats(window);
          shimRTCDataChannel(window);
          shimAddTransceiver(window);
          shimGetParameters(window);
          shimCreateOffer(window);
          shimCreateAnswer(window);

          shimRTCIceCandidate(window);
          shimConnectionState(window);
          shimMaxMessageSize(window, browserDetails);
          shimSendThrowTypeError(window);
          break;
        case 'safari':
          if (!safariShim || !options.shimSafari) {
            logging('Safari shim is not included in this adapter release.');
            return adapter;
          }
          logging('adapter.js shimming safari.');
          // Export to the adapter global object visible in the browser.
          adapter.browserShim = safariShim;

          // Must be called before shimCallbackAPI.
          shimAddIceCandidateNullOrEmpty(window, browserDetails);
          shimParameterlessSetLocalDescription(window);

          shimRTCIceServerUrls(window);
          shimCreateOfferLegacy(window);
          shimCallbacksAPI(window);
          shimLocalStreamsAPI(window);
          shimRemoteStreamsAPI(window);
          shimTrackEventTransceiver(window);
          shimGetUserMedia(window);
          shimAudioContext(window);

          shimRTCIceCandidate(window);
          shimRTCIceCandidateRelayProtocol(window);
          shimMaxMessageSize(window, browserDetails);
          shimSendThrowTypeError(window);
          removeExtmapAllowMixed(window, browserDetails);
          break;
        default:
          logging('Unsupported browser!');
          break;
      }

      return adapter;
    }

    /*
     *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
     *
     *  Use of this source code is governed by a BSD-style license
     *  that can be found in the LICENSE file in the root of the source
     *  tree.
     */

    const adapter$1 =
      adapterFactory({window: typeof window === 'undefined' ? undefined : window});

    var charAt$2 = stringMultibyte.charAt;
    var toString = toString$4;
    var InternalStateModule$2 = internalState;
    var defineIterator = iteratorDefine;
    var createIterResultObject = createIterResultObject$2;

    var STRING_ITERATOR = 'String Iterator';
    var setInternalState$2 = InternalStateModule$2.set;
    var getInternalState = InternalStateModule$2.getterFor(STRING_ITERATOR);

    // `String.prototype[@@iterator]` method
    // https://tc39.es/ecma262/#sec-string.prototype-@@iterator
    defineIterator(String, 'String', function (iterated) {
      setInternalState$2(this, {
        type: STRING_ITERATOR,
        string: toString(iterated),
        index: 0
      });
    // `%StringIteratorPrototype%.next` method
    // https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
    }, function next() {
      var state = getInternalState(this);
      var string = state.string;
      var index = state.index;
      var point;
      if (index >= string.length) return createIterResultObject(undefined, true);
      point = charAt$2(string, index);
      state.index += point.length;
      return createIterResultObject(point, false);
    });

    var fails$2 = fails$i;
    var wellKnownSymbol$3 = wellKnownSymbol$e;
    var IS_PURE = isPure;

    var ITERATOR$3 = wellKnownSymbol$3('iterator');

    var urlConstructorDetection = !fails$2(function () {
      // eslint-disable-next-line unicorn/relative-url-style -- required for testing
      var url = new URL('b?a=1&b=2&c=3', 'http://a');
      var searchParams = url.searchParams;
      var result = '';
      url.pathname = 'c%20d';
      searchParams.forEach(function (value, key) {
        searchParams['delete']('b');
        result += key + value;
      });
      return (IS_PURE && !url.toJSON)
        || !searchParams.sort
        || url.href !== 'http://a/c%20d?a=1&c=3'
        || searchParams.get('c') !== '3'
        || String(new URLSearchParams('?a=1')) !== 'a=1'
        || !searchParams[ITERATOR$3]
        // throws in Edge
        || new URL('https://a@b').username !== 'a'
        || new URLSearchParams(new URLSearchParams('a=b')).get('a') !== 'b'
        // not punycoded in Edge
        || new URL('http://тест').host !== 'xn--e1aybc'
        // not escaped in Chrome 62-
        || new URL('http://a#б').hash !== '#%D0%B1'
        // fails in Chrome 66-
        || result !== 'a1c3'
        // throws in Safari
        || new URL('http://x', undefined).host !== 'x';
    });

    var uncurryThis$5 = functionUncurryThisClause;
    var aCallable$1 = aCallable$3;
    var NATIVE_BIND = functionBindNative;

    var bind$3 = uncurryThis$5(uncurryThis$5.bind);

    // optional / simple context binding
    var functionBindContext = function (fn, that) {
      aCallable$1(fn);
      return that === undefined ? fn : NATIVE_BIND ? bind$3(fn, that) : function (/* ...args */) {
        return fn.apply(that, arguments);
      };
    };

    var makeBuiltIn = makeBuiltInExports;
    var defineProperty$1 = objectDefineProperty;

    var defineBuiltInAccessor$1 = function (target, name, descriptor) {
      if (descriptor.get) makeBuiltIn(descriptor.get, name, { getter: true });
      if (descriptor.set) makeBuiltIn(descriptor.set, name, { setter: true });
      return defineProperty$1.f(target, name, descriptor);
    };

    var isPrototypeOf = objectIsPrototypeOf;

    var $TypeError$2 = TypeError;

    var anInstance$2 = function (it, Prototype) {
      if (isPrototypeOf(Prototype, it)) return it;
      throw $TypeError$2('Incorrect invocation');
    };

    var DESCRIPTORS$2 = descriptors;
    var uncurryThis$4 = functionUncurryThis;
    var call$4 = functionCall;
    var fails$1 = fails$i;
    var objectKeys = objectKeys$2;
    var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
    var propertyIsEnumerableModule = objectPropertyIsEnumerable;
    var toObject$1 = toObject$5;
    var IndexedObject = indexedObject;

    // eslint-disable-next-line es/no-object-assign -- safe
    var $assign = Object.assign;
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    var defineProperty = Object.defineProperty;
    var concat = uncurryThis$4([].concat);

    // `Object.assign` method
    // https://tc39.es/ecma262/#sec-object.assign
    var objectAssign = !$assign || fails$1(function () {
      // should have correct order of operations (Edge bug)
      if (DESCRIPTORS$2 && $assign({ b: 1 }, $assign(defineProperty({}, 'a', {
        enumerable: true,
        get: function () {
          defineProperty(this, 'b', {
            value: 3,
            enumerable: false
          });
        }
      }), { b: 2 })).b !== 1) return true;
      // should work with symbols and should have deterministic property order (V8 bug)
      var A = {};
      var B = {};
      // eslint-disable-next-line es/no-symbol -- safe
      var symbol = Symbol();
      var alphabet = 'abcdefghijklmnopqrst';
      A[symbol] = 7;
      alphabet.split('').forEach(function (chr) { B[chr] = chr; });
      return $assign({}, A)[symbol] != 7 || objectKeys($assign({}, B)).join('') != alphabet;
    }) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
      var T = toObject$1(target);
      var argumentsLength = arguments.length;
      var index = 1;
      var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
      var propertyIsEnumerable = propertyIsEnumerableModule.f;
      while (argumentsLength > index) {
        var S = IndexedObject(arguments[index++]);
        var keys = getOwnPropertySymbols ? concat(objectKeys(S), getOwnPropertySymbols(S)) : objectKeys(S);
        var length = keys.length;
        var j = 0;
        var key;
        while (length > j) {
          key = keys[j++];
          if (!DESCRIPTORS$2 || call$4(propertyIsEnumerable, S, key)) T[key] = S[key];
        }
      } return T;
    } : $assign;

    var call$3 = functionCall;
    var anObject$3 = anObject$c;
    var getMethod$1 = getMethod$4;

    var iteratorClose$1 = function (iterator, kind, value) {
      var innerResult, innerError;
      anObject$3(iterator);
      try {
        innerResult = getMethod$1(iterator, 'return');
        if (!innerResult) {
          if (kind === 'throw') throw value;
          return value;
        }
        innerResult = call$3(innerResult, iterator);
      } catch (error) {
        innerError = true;
        innerResult = error;
      }
      if (kind === 'throw') throw value;
      if (innerError) throw innerResult;
      anObject$3(innerResult);
      return value;
    };

    var anObject$2 = anObject$c;
    var iteratorClose = iteratorClose$1;

    // call something on iterator step with safe closing on error
    var callWithSafeIterationClosing$1 = function (iterator, fn, value, ENTRIES) {
      try {
        return ENTRIES ? fn(anObject$2(value)[0], value[1]) : fn(value);
      } catch (error) {
        iteratorClose(iterator, 'throw', error);
      }
    };

    var wellKnownSymbol$2 = wellKnownSymbol$e;
    var Iterators$1 = iterators;

    var ITERATOR$2 = wellKnownSymbol$2('iterator');
    var ArrayPrototype = Array.prototype;

    // check on default Array iterator
    var isArrayIteratorMethod$1 = function (it) {
      return it !== undefined && (Iterators$1.Array === it || ArrayPrototype[ITERATOR$2] === it);
    };

    var uncurryThis$3 = functionUncurryThis;
    var fails = fails$i;
    var isCallable$1 = isCallable$j;
    var classof$2 = classof$5;
    var getBuiltIn = getBuiltIn$5;
    var inspectSource = inspectSource$2;

    var noop = function () { /* empty */ };
    var empty = [];
    var construct = getBuiltIn('Reflect', 'construct');
    var constructorRegExp = /^\s*(?:class|function)\b/;
    var exec$2 = uncurryThis$3(constructorRegExp.exec);
    var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

    var isConstructorModern = function isConstructor(argument) {
      if (!isCallable$1(argument)) return false;
      try {
        construct(noop, empty, argument);
        return true;
      } catch (error) {
        return false;
      }
    };

    var isConstructorLegacy = function isConstructor(argument) {
      if (!isCallable$1(argument)) return false;
      switch (classof$2(argument)) {
        case 'AsyncFunction':
        case 'GeneratorFunction':
        case 'AsyncGeneratorFunction': return false;
      }
      try {
        // we can't check .prototype since constructors produced by .bind haven't it
        // `Function#toString` throws on some built-it function in some legacy engines
        // (for example, `DOMQuad` and similar in FF41-)
        return INCORRECT_TO_STRING || !!exec$2(constructorRegExp, inspectSource(argument));
      } catch (error) {
        return true;
      }
    };

    isConstructorLegacy.sham = true;

    // `IsConstructor` abstract operation
    // https://tc39.es/ecma262/#sec-isconstructor
    var isConstructor$1 = !construct || fails(function () {
      var called;
      return isConstructorModern(isConstructorModern.call)
        || !isConstructorModern(Object)
        || !isConstructorModern(function () { called = true; })
        || called;
    }) ? isConstructorLegacy : isConstructorModern;

    var toPropertyKey = toPropertyKey$3;
    var definePropertyModule = objectDefineProperty;
    var createPropertyDescriptor$1 = createPropertyDescriptor$5;

    var createProperty$2 = function (object, key, value) {
      var propertyKey = toPropertyKey(key);
      if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor$1(0, value));
      else object[propertyKey] = value;
    };

    var classof$1 = classof$5;
    var getMethod = getMethod$4;
    var isNullOrUndefined = isNullOrUndefined$4;
    var Iterators = iterators;
    var wellKnownSymbol$1 = wellKnownSymbol$e;

    var ITERATOR$1 = wellKnownSymbol$1('iterator');

    var getIteratorMethod$3 = function (it) {
      if (!isNullOrUndefined(it)) return getMethod(it, ITERATOR$1)
        || getMethod(it, '@@iterator')
        || Iterators[classof$1(it)];
    };

    var call$2 = functionCall;
    var aCallable = aCallable$3;
    var anObject$1 = anObject$c;
    var tryToString = tryToString$2;
    var getIteratorMethod$2 = getIteratorMethod$3;

    var $TypeError$1 = TypeError;

    var getIterator$2 = function (argument, usingIterator) {
      var iteratorMethod = arguments.length < 2 ? getIteratorMethod$2(argument) : usingIterator;
      if (aCallable(iteratorMethod)) return anObject$1(call$2(iteratorMethod, argument));
      throw $TypeError$1(tryToString(argument) + ' is not iterable');
    };

    var bind$2 = functionBindContext;
    var call$1 = functionCall;
    var toObject = toObject$5;
    var callWithSafeIterationClosing = callWithSafeIterationClosing$1;
    var isArrayIteratorMethod = isArrayIteratorMethod$1;
    var isConstructor = isConstructor$1;
    var lengthOfArrayLike$1 = lengthOfArrayLike$3;
    var createProperty$1 = createProperty$2;
    var getIterator$1 = getIterator$2;
    var getIteratorMethod$1 = getIteratorMethod$3;

    var $Array$1 = Array;

    // `Array.from` method implementation
    // https://tc39.es/ecma262/#sec-array.from
    var arrayFrom$1 = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
      var O = toObject(arrayLike);
      var IS_CONSTRUCTOR = isConstructor(this);
      var argumentsLength = arguments.length;
      var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
      var mapping = mapfn !== undefined;
      if (mapping) mapfn = bind$2(mapfn, argumentsLength > 2 ? arguments[2] : undefined);
      var iteratorMethod = getIteratorMethod$1(O);
      var index = 0;
      var length, result, step, iterator, next, value;
      // if the target is not iterable or it's an array with the default iterator - use a simple case
      if (iteratorMethod && !(this === $Array$1 && isArrayIteratorMethod(iteratorMethod))) {
        iterator = getIterator$1(O, iteratorMethod);
        next = iterator.next;
        result = IS_CONSTRUCTOR ? new this() : [];
        for (;!(step = call$1(next, iterator)).done; index++) {
          value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
          createProperty$1(result, index, value);
        }
      } else {
        length = lengthOfArrayLike$1(O);
        result = IS_CONSTRUCTOR ? new this(length) : $Array$1(length);
        for (;length > index; index++) {
          value = mapping ? mapfn(O[index], index) : O[index];
          createProperty$1(result, index, value);
        }
      }
      result.length = index;
      return result;
    };

    var toAbsoluteIndex = toAbsoluteIndex$2;
    var lengthOfArrayLike = lengthOfArrayLike$3;
    var createProperty = createProperty$2;

    var $Array = Array;
    var max = Math.max;

    var arraySliceSimple = function (O, start, end) {
      var length = lengthOfArrayLike(O);
      var k = toAbsoluteIndex(start, length);
      var fin = toAbsoluteIndex(end === undefined ? length : end, length);
      var result = $Array(max(fin - k, 0));
      for (var n = 0; k < fin; k++, n++) createProperty(result, n, O[k]);
      result.length = n;
      return result;
    };

    // based on https://github.com/bestiejs/punycode.js/blob/master/punycode.js
    var uncurryThis$2 = functionUncurryThis;

    var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1
    var base = 36;
    var tMin = 1;
    var tMax = 26;
    var skew = 38;
    var damp = 700;
    var initialBias = 72;
    var initialN = 128; // 0x80
    var delimiter = '-'; // '\x2D'
    var regexNonASCII = /[^\0-\u007E]/; // non-ASCII chars
    var regexSeparators = /[.\u3002\uFF0E\uFF61]/g; // RFC 3490 separators
    var OVERFLOW_ERROR = 'Overflow: input needs wider integers to process';
    var baseMinusTMin = base - tMin;

    var $RangeError = RangeError;
    var exec$1 = uncurryThis$2(regexSeparators.exec);
    var floor$2 = Math.floor;
    var fromCharCode = String.fromCharCode;
    var charCodeAt = uncurryThis$2(''.charCodeAt);
    var join$2 = uncurryThis$2([].join);
    var push$2 = uncurryThis$2([].push);
    var replace$2 = uncurryThis$2(''.replace);
    var split$2 = uncurryThis$2(''.split);
    var toLowerCase$1 = uncurryThis$2(''.toLowerCase);

    /**
     * Creates an array containing the numeric code points of each Unicode
     * character in the string. While JavaScript uses UCS-2 internally,
     * this function will convert a pair of surrogate halves (each of which
     * UCS-2 exposes as separate characters) into a single code point,
     * matching UTF-16.
     */
    var ucs2decode = function (string) {
      var output = [];
      var counter = 0;
      var length = string.length;
      while (counter < length) {
        var value = charCodeAt(string, counter++);
        if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
          // It's a high surrogate, and there is a next character.
          var extra = charCodeAt(string, counter++);
          if ((extra & 0xFC00) == 0xDC00) { // Low surrogate.
            push$2(output, ((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
          } else {
            // It's an unmatched surrogate; only append this code unit, in case the
            // next code unit is the high surrogate of a surrogate pair.
            push$2(output, value);
            counter--;
          }
        } else {
          push$2(output, value);
        }
      }
      return output;
    };

    /**
     * Converts a digit/integer into a basic code point.
     */
    var digitToBasic = function (digit) {
      //  0..25 map to ASCII a..z or A..Z
      // 26..35 map to ASCII 0..9
      return digit + 22 + 75 * (digit < 26);
    };

    /**
     * Bias adaptation function as per section 3.4 of RFC 3492.
     * https://tools.ietf.org/html/rfc3492#section-3.4
     */
    var adapt = function (delta, numPoints, firstTime) {
      var k = 0;
      delta = firstTime ? floor$2(delta / damp) : delta >> 1;
      delta += floor$2(delta / numPoints);
      while (delta > baseMinusTMin * tMax >> 1) {
        delta = floor$2(delta / baseMinusTMin);
        k += base;
      }
      return floor$2(k + (baseMinusTMin + 1) * delta / (delta + skew));
    };

    /**
     * Converts a string of Unicode symbols (e.g. a domain name label) to a
     * Punycode string of ASCII-only symbols.
     */
    var encode = function (input) {
      var output = [];

      // Convert the input in UCS-2 to an array of Unicode code points.
      input = ucs2decode(input);

      // Cache the length.
      var inputLength = input.length;

      // Initialize the state.
      var n = initialN;
      var delta = 0;
      var bias = initialBias;
      var i, currentValue;

      // Handle the basic code points.
      for (i = 0; i < input.length; i++) {
        currentValue = input[i];
        if (currentValue < 0x80) {
          push$2(output, fromCharCode(currentValue));
        }
      }

      var basicLength = output.length; // number of basic code points.
      var handledCPCount = basicLength; // number of code points that have been handled;

      // Finish the basic string with a delimiter unless it's empty.
      if (basicLength) {
        push$2(output, delimiter);
      }

      // Main encoding loop:
      while (handledCPCount < inputLength) {
        // All non-basic code points < n have been handled already. Find the next larger one:
        var m = maxInt;
        for (i = 0; i < input.length; i++) {
          currentValue = input[i];
          if (currentValue >= n && currentValue < m) {
            m = currentValue;
          }
        }

        // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>, but guard against overflow.
        var handledCPCountPlusOne = handledCPCount + 1;
        if (m - n > floor$2((maxInt - delta) / handledCPCountPlusOne)) {
          throw $RangeError(OVERFLOW_ERROR);
        }

        delta += (m - n) * handledCPCountPlusOne;
        n = m;

        for (i = 0; i < input.length; i++) {
          currentValue = input[i];
          if (currentValue < n && ++delta > maxInt) {
            throw $RangeError(OVERFLOW_ERROR);
          }
          if (currentValue == n) {
            // Represent delta as a generalized variable-length integer.
            var q = delta;
            var k = base;
            while (true) {
              var t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
              if (q < t) break;
              var qMinusT = q - t;
              var baseMinusT = base - t;
              push$2(output, fromCharCode(digitToBasic(t + qMinusT % baseMinusT)));
              q = floor$2(qMinusT / baseMinusT);
              k += base;
            }

            push$2(output, fromCharCode(digitToBasic(q)));
            bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
            delta = 0;
            handledCPCount++;
          }
        }

        delta++;
        n++;
      }
      return join$2(output, '');
    };

    var stringPunycodeToAscii = function (input) {
      var encoded = [];
      var labels = split$2(replace$2(toLowerCase$1(input), regexSeparators, '\u002E'), '.');
      var i, label;
      for (i = 0; i < labels.length; i++) {
        label = labels[i];
        push$2(encoded, exec$1(regexNonASCII, label) ? 'xn--' + encode(label) : label);
      }
      return join$2(encoded, '.');
    };

    var $TypeError = TypeError;

    var validateArgumentsLength$2 = function (passed, required) {
      if (passed < required) throw $TypeError('Not enough arguments');
      return passed;
    };

    var defineBuiltIn$2 = defineBuiltIn$7;

    var defineBuiltIns$1 = function (target, src, options) {
      for (var key in src) defineBuiltIn$2(target, key, src[key], options);
      return target;
    };

    var arraySlice$1 = arraySliceSimple;

    var floor$1 = Math.floor;

    var mergeSort = function (array, comparefn) {
      var length = array.length;
      var middle = floor$1(length / 2);
      return length < 8 ? insertionSort(array, comparefn) : merge(
        array,
        mergeSort(arraySlice$1(array, 0, middle), comparefn),
        mergeSort(arraySlice$1(array, middle), comparefn),
        comparefn
      );
    };

    var insertionSort = function (array, comparefn) {
      var length = array.length;
      var i = 1;
      var element, j;

      while (i < length) {
        j = i;
        element = array[i];
        while (j && comparefn(array[j - 1], element) > 0) {
          array[j] = array[--j];
        }
        if (j !== i++) array[j] = element;
      } return array;
    };

    var merge = function (array, left, right, comparefn) {
      var llength = left.length;
      var rlength = right.length;
      var lindex = 0;
      var rindex = 0;

      while (lindex < llength || rindex < rlength) {
        array[lindex + rindex] = (lindex < llength && rindex < rlength)
          ? comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++]
          : lindex < llength ? left[lindex++] : right[rindex++];
      } return array;
    };

    var arraySort$1 = mergeSort;

    // TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`

    var $$1 = _export;
    var global$2 = global$g;
    var call = functionCall;
    var uncurryThis$1 = functionUncurryThis;
    var DESCRIPTORS$1 = descriptors;
    var USE_NATIVE_URL$1 = urlConstructorDetection;
    var defineBuiltIn$1 = defineBuiltIn$7;
    var defineBuiltIns = defineBuiltIns$1;
    var setToStringTag$1 = setToStringTag$4;
    var createIteratorConstructor = iteratorCreateConstructor;
    var InternalStateModule$1 = internalState;
    var anInstance$1 = anInstance$2;
    var isCallable = isCallable$j;
    var hasOwn$1 = hasOwnProperty_1;
    var bind$1 = functionBindContext;
    var classof = classof$5;
    var anObject = anObject$c;
    var isObject = isObject$8;
    var $toString$1 = toString$4;
    var create = objectCreate;
    var createPropertyDescriptor = createPropertyDescriptor$5;
    var getIterator = getIterator$2;
    var getIteratorMethod = getIteratorMethod$3;
    var validateArgumentsLength$1 = validateArgumentsLength$2;
    var wellKnownSymbol = wellKnownSymbol$e;
    var arraySort = arraySort$1;

    var ITERATOR = wellKnownSymbol('iterator');
    var URL_SEARCH_PARAMS = 'URLSearchParams';
    var URL_SEARCH_PARAMS_ITERATOR = URL_SEARCH_PARAMS + 'Iterator';
    var setInternalState$1 = InternalStateModule$1.set;
    var getInternalParamsState = InternalStateModule$1.getterFor(URL_SEARCH_PARAMS);
    var getInternalIteratorState = InternalStateModule$1.getterFor(URL_SEARCH_PARAMS_ITERATOR);
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

    // Avoid NodeJS experimental warning
    var safeGetBuiltIn = function (name) {
      if (!DESCRIPTORS$1) return global$2[name];
      var descriptor = getOwnPropertyDescriptor(global$2, name);
      return descriptor && descriptor.value;
    };

    var nativeFetch = safeGetBuiltIn('fetch');
    var NativeRequest = safeGetBuiltIn('Request');
    var Headers = safeGetBuiltIn('Headers');
    var RequestPrototype = NativeRequest && NativeRequest.prototype;
    var HeadersPrototype = Headers && Headers.prototype;
    var RegExp$1 = global$2.RegExp;
    var TypeError$2 = global$2.TypeError;
    var decodeURIComponent = global$2.decodeURIComponent;
    var encodeURIComponent$1 = global$2.encodeURIComponent;
    var charAt$1 = uncurryThis$1(''.charAt);
    var join$1 = uncurryThis$1([].join);
    var push$1 = uncurryThis$1([].push);
    var replace$1 = uncurryThis$1(''.replace);
    var shift$1 = uncurryThis$1([].shift);
    var splice = uncurryThis$1([].splice);
    var split$1 = uncurryThis$1(''.split);
    var stringSlice$1 = uncurryThis$1(''.slice);

    var plus = /\+/g;
    var sequences = Array(4);

    var percentSequence = function (bytes) {
      return sequences[bytes - 1] || (sequences[bytes - 1] = RegExp$1('((?:%[\\da-f]{2}){' + bytes + '})', 'gi'));
    };

    var percentDecode = function (sequence) {
      try {
        return decodeURIComponent(sequence);
      } catch (error) {
        return sequence;
      }
    };

    var deserialize = function (it) {
      var result = replace$1(it, plus, ' ');
      var bytes = 4;
      try {
        return decodeURIComponent(result);
      } catch (error) {
        while (bytes) {
          result = replace$1(result, percentSequence(bytes--), percentDecode);
        }
        return result;
      }
    };

    var find = /[!'()~]|%20/g;

    var replacements = {
      '!': '%21',
      "'": '%27',
      '(': '%28',
      ')': '%29',
      '~': '%7E',
      '%20': '+'
    };

    var replacer = function (match) {
      return replacements[match];
    };

    var serialize = function (it) {
      return replace$1(encodeURIComponent$1(it), find, replacer);
    };

    var URLSearchParamsIterator = createIteratorConstructor(function Iterator(params, kind) {
      setInternalState$1(this, {
        type: URL_SEARCH_PARAMS_ITERATOR,
        iterator: getIterator(getInternalParamsState(params).entries),
        kind: kind
      });
    }, 'Iterator', function next() {
      var state = getInternalIteratorState(this);
      var kind = state.kind;
      var step = state.iterator.next();
      var entry = step.value;
      if (!step.done) {
        step.value = kind === 'keys' ? entry.key : kind === 'values' ? entry.value : [entry.key, entry.value];
      } return step;
    }, true);

    var URLSearchParamsState = function (init) {
      this.entries = [];
      this.url = null;

      if (init !== undefined) {
        if (isObject(init)) this.parseObject(init);
        else this.parseQuery(typeof init == 'string' ? charAt$1(init, 0) === '?' ? stringSlice$1(init, 1) : init : $toString$1(init));
      }
    };

    URLSearchParamsState.prototype = {
      type: URL_SEARCH_PARAMS,
      bindURL: function (url) {
        this.url = url;
        this.update();
      },
      parseObject: function (object) {
        var iteratorMethod = getIteratorMethod(object);
        var iterator, next, step, entryIterator, entryNext, first, second;

        if (iteratorMethod) {
          iterator = getIterator(object, iteratorMethod);
          next = iterator.next;
          while (!(step = call(next, iterator)).done) {
            entryIterator = getIterator(anObject(step.value));
            entryNext = entryIterator.next;
            if (
              (first = call(entryNext, entryIterator)).done ||
              (second = call(entryNext, entryIterator)).done ||
              !call(entryNext, entryIterator).done
            ) throw TypeError$2('Expected sequence with length 2');
            push$1(this.entries, { key: $toString$1(first.value), value: $toString$1(second.value) });
          }
        } else for (var key in object) if (hasOwn$1(object, key)) {
          push$1(this.entries, { key: key, value: $toString$1(object[key]) });
        }
      },
      parseQuery: function (query) {
        if (query) {
          var attributes = split$1(query, '&');
          var index = 0;
          var attribute, entry;
          while (index < attributes.length) {
            attribute = attributes[index++];
            if (attribute.length) {
              entry = split$1(attribute, '=');
              push$1(this.entries, {
                key: deserialize(shift$1(entry)),
                value: deserialize(join$1(entry, '='))
              });
            }
          }
        }
      },
      serialize: function () {
        var entries = this.entries;
        var result = [];
        var index = 0;
        var entry;
        while (index < entries.length) {
          entry = entries[index++];
          push$1(result, serialize(entry.key) + '=' + serialize(entry.value));
        } return join$1(result, '&');
      },
      update: function () {
        this.entries.length = 0;
        this.parseQuery(this.url.query);
      },
      updateURL: function () {
        if (this.url) this.url.update();
      }
    };

    // `URLSearchParams` constructor
    // https://url.spec.whatwg.org/#interface-urlsearchparams
    var URLSearchParamsConstructor = function URLSearchParams(/* init */) {
      anInstance$1(this, URLSearchParamsPrototype);
      var init = arguments.length > 0 ? arguments[0] : undefined;
      setInternalState$1(this, new URLSearchParamsState(init));
    };

    var URLSearchParamsPrototype = URLSearchParamsConstructor.prototype;

    defineBuiltIns(URLSearchParamsPrototype, {
      // `URLSearchParams.prototype.append` method
      // https://url.spec.whatwg.org/#dom-urlsearchparams-append
      append: function append(name, value) {
        validateArgumentsLength$1(arguments.length, 2);
        var state = getInternalParamsState(this);
        push$1(state.entries, { key: $toString$1(name), value: $toString$1(value) });
        state.updateURL();
      },
      // `URLSearchParams.prototype.delete` method
      // https://url.spec.whatwg.org/#dom-urlsearchparams-delete
      'delete': function (name) {
        validateArgumentsLength$1(arguments.length, 1);
        var state = getInternalParamsState(this);
        var entries = state.entries;
        var key = $toString$1(name);
        var index = 0;
        while (index < entries.length) {
          if (entries[index].key === key) splice(entries, index, 1);
          else index++;
        }
        state.updateURL();
      },
      // `URLSearchParams.prototype.get` method
      // https://url.spec.whatwg.org/#dom-urlsearchparams-get
      get: function get(name) {
        validateArgumentsLength$1(arguments.length, 1);
        var entries = getInternalParamsState(this).entries;
        var key = $toString$1(name);
        var index = 0;
        for (; index < entries.length; index++) {
          if (entries[index].key === key) return entries[index].value;
        }
        return null;
      },
      // `URLSearchParams.prototype.getAll` method
      // https://url.spec.whatwg.org/#dom-urlsearchparams-getall
      getAll: function getAll(name) {
        validateArgumentsLength$1(arguments.length, 1);
        var entries = getInternalParamsState(this).entries;
        var key = $toString$1(name);
        var result = [];
        var index = 0;
        for (; index < entries.length; index++) {
          if (entries[index].key === key) push$1(result, entries[index].value);
        }
        return result;
      },
      // `URLSearchParams.prototype.has` method
      // https://url.spec.whatwg.org/#dom-urlsearchparams-has
      has: function has(name) {
        validateArgumentsLength$1(arguments.length, 1);
        var entries = getInternalParamsState(this).entries;
        var key = $toString$1(name);
        var index = 0;
        while (index < entries.length) {
          if (entries[index++].key === key) return true;
        }
        return false;
      },
      // `URLSearchParams.prototype.set` method
      // https://url.spec.whatwg.org/#dom-urlsearchparams-set
      set: function set(name, value) {
        validateArgumentsLength$1(arguments.length, 1);
        var state = getInternalParamsState(this);
        var entries = state.entries;
        var found = false;
        var key = $toString$1(name);
        var val = $toString$1(value);
        var index = 0;
        var entry;
        for (; index < entries.length; index++) {
          entry = entries[index];
          if (entry.key === key) {
            if (found) splice(entries, index--, 1);
            else {
              found = true;
              entry.value = val;
            }
          }
        }
        if (!found) push$1(entries, { key: key, value: val });
        state.updateURL();
      },
      // `URLSearchParams.prototype.sort` method
      // https://url.spec.whatwg.org/#dom-urlsearchparams-sort
      sort: function sort() {
        var state = getInternalParamsState(this);
        arraySort(state.entries, function (a, b) {
          return a.key > b.key ? 1 : -1;
        });
        state.updateURL();
      },
      // `URLSearchParams.prototype.forEach` method
      forEach: function forEach(callback /* , thisArg */) {
        var entries = getInternalParamsState(this).entries;
        var boundFunction = bind$1(callback, arguments.length > 1 ? arguments[1] : undefined);
        var index = 0;
        var entry;
        while (index < entries.length) {
          entry = entries[index++];
          boundFunction(entry.value, entry.key, this);
        }
      },
      // `URLSearchParams.prototype.keys` method
      keys: function keys() {
        return new URLSearchParamsIterator(this, 'keys');
      },
      // `URLSearchParams.prototype.values` method
      values: function values() {
        return new URLSearchParamsIterator(this, 'values');
      },
      // `URLSearchParams.prototype.entries` method
      entries: function entries() {
        return new URLSearchParamsIterator(this, 'entries');
      }
    }, { enumerable: true });

    // `URLSearchParams.prototype[@@iterator]` method
    defineBuiltIn$1(URLSearchParamsPrototype, ITERATOR, URLSearchParamsPrototype.entries, { name: 'entries' });

    // `URLSearchParams.prototype.toString` method
    // https://url.spec.whatwg.org/#urlsearchparams-stringification-behavior
    defineBuiltIn$1(URLSearchParamsPrototype, 'toString', function toString() {
      return getInternalParamsState(this).serialize();
    }, { enumerable: true });

    setToStringTag$1(URLSearchParamsConstructor, URL_SEARCH_PARAMS);

    $$1({ global: true, constructor: true, forced: !USE_NATIVE_URL$1 }, {
      URLSearchParams: URLSearchParamsConstructor
    });

    // Wrap `fetch` and `Request` for correct work with polyfilled `URLSearchParams`
    if (!USE_NATIVE_URL$1 && isCallable(Headers)) {
      var headersHas = uncurryThis$1(HeadersPrototype.has);
      var headersSet = uncurryThis$1(HeadersPrototype.set);

      var wrapRequestOptions = function (init) {
        if (isObject(init)) {
          var body = init.body;
          var headers;
          if (classof(body) === URL_SEARCH_PARAMS) {
            headers = init.headers ? new Headers(init.headers) : new Headers();
            if (!headersHas(headers, 'content-type')) {
              headersSet(headers, 'content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
            }
            return create(init, {
              body: createPropertyDescriptor(0, $toString$1(body)),
              headers: createPropertyDescriptor(0, headers)
            });
          }
        } return init;
      };

      if (isCallable(nativeFetch)) {
        $$1({ global: true, enumerable: true, dontCallGetSet: true, forced: true }, {
          fetch: function fetch(input /* , init */) {
            return nativeFetch(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
          }
        });
      }

      if (isCallable(NativeRequest)) {
        var RequestConstructor = function Request(input /* , init */) {
          anInstance$1(this, RequestPrototype);
          return new NativeRequest(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
        };

        RequestPrototype.constructor = RequestConstructor;
        RequestConstructor.prototype = RequestPrototype;

        $$1({ global: true, constructor: true, dontCallGetSet: true, forced: true }, {
          Request: RequestConstructor
        });
      }
    }

    var web_urlSearchParams_constructor = {
      URLSearchParams: URLSearchParamsConstructor,
      getState: getInternalParamsState
    };

    // TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`

    var $ = _export;
    var DESCRIPTORS = descriptors;
    var USE_NATIVE_URL = urlConstructorDetection;
    var global$1 = global$g;
    var bind = functionBindContext;
    var uncurryThis = functionUncurryThis;
    var defineBuiltIn = defineBuiltIn$7;
    var defineBuiltInAccessor = defineBuiltInAccessor$1;
    var anInstance = anInstance$2;
    var hasOwn = hasOwnProperty_1;
    var assign = objectAssign;
    var arrayFrom = arrayFrom$1;
    var arraySlice = arraySliceSimple;
    var codeAt = stringMultibyte.codeAt;
    var toASCII = stringPunycodeToAscii;
    var $toString = toString$4;
    var setToStringTag = setToStringTag$4;
    var validateArgumentsLength = validateArgumentsLength$2;
    var URLSearchParamsModule = web_urlSearchParams_constructor;
    var InternalStateModule = internalState;

    var setInternalState = InternalStateModule.set;
    var getInternalURLState = InternalStateModule.getterFor('URL');
    var URLSearchParams$1 = URLSearchParamsModule.URLSearchParams;
    var getInternalSearchParamsState = URLSearchParamsModule.getState;

    var NativeURL = global$1.URL;
    var TypeError$1 = global$1.TypeError;
    var parseInt$1 = global$1.parseInt;
    var floor = Math.floor;
    var pow = Math.pow;
    var charAt = uncurryThis(''.charAt);
    var exec = uncurryThis(/./.exec);
    var join = uncurryThis([].join);
    var numberToString = uncurryThis(1.0.toString);
    var pop = uncurryThis([].pop);
    var push = uncurryThis([].push);
    var replace = uncurryThis(''.replace);
    var shift = uncurryThis([].shift);
    var split = uncurryThis(''.split);
    var stringSlice = uncurryThis(''.slice);
    var toLowerCase = uncurryThis(''.toLowerCase);
    var unshift = uncurryThis([].unshift);

    var INVALID_AUTHORITY = 'Invalid authority';
    var INVALID_SCHEME = 'Invalid scheme';
    var INVALID_HOST = 'Invalid host';
    var INVALID_PORT = 'Invalid port';

    var ALPHA = /[a-z]/i;
    // eslint-disable-next-line regexp/no-obscure-range -- safe
    var ALPHANUMERIC = /[\d+-.a-z]/i;
    var DIGIT = /\d/;
    var HEX_START = /^0x/i;
    var OCT = /^[0-7]+$/;
    var DEC = /^\d+$/;
    var HEX = /^[\da-f]+$/i;
    /* eslint-disable regexp/no-control-character -- safe */
    var FORBIDDEN_HOST_CODE_POINT = /[\0\t\n\r #%/:<>?@[\\\]^|]/;
    var FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT = /[\0\t\n\r #/:<>?@[\\\]^|]/;
    var LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE = /^[\u0000-\u0020]+|[\u0000-\u0020]+$/g;
    var TAB_AND_NEW_LINE = /[\t\n\r]/g;
    /* eslint-enable regexp/no-control-character -- safe */
    var EOF;

    // https://url.spec.whatwg.org/#ipv4-number-parser
    var parseIPv4 = function (input) {
      var parts = split(input, '.');
      var partsLength, numbers, index, part, radix, number, ipv4;
      if (parts.length && parts[parts.length - 1] == '') {
        parts.length--;
      }
      partsLength = parts.length;
      if (partsLength > 4) return input;
      numbers = [];
      for (index = 0; index < partsLength; index++) {
        part = parts[index];
        if (part == '') return input;
        radix = 10;
        if (part.length > 1 && charAt(part, 0) == '0') {
          radix = exec(HEX_START, part) ? 16 : 8;
          part = stringSlice(part, radix == 8 ? 1 : 2);
        }
        if (part === '') {
          number = 0;
        } else {
          if (!exec(radix == 10 ? DEC : radix == 8 ? OCT : HEX, part)) return input;
          number = parseInt$1(part, radix);
        }
        push(numbers, number);
      }
      for (index = 0; index < partsLength; index++) {
        number = numbers[index];
        if (index == partsLength - 1) {
          if (number >= pow(256, 5 - partsLength)) return null;
        } else if (number > 255) return null;
      }
      ipv4 = pop(numbers);
      for (index = 0; index < numbers.length; index++) {
        ipv4 += numbers[index] * pow(256, 3 - index);
      }
      return ipv4;
    };

    // https://url.spec.whatwg.org/#concept-ipv6-parser
    // eslint-disable-next-line max-statements -- TODO
    var parseIPv6 = function (input) {
      var address = [0, 0, 0, 0, 0, 0, 0, 0];
      var pieceIndex = 0;
      var compress = null;
      var pointer = 0;
      var value, length, numbersSeen, ipv4Piece, number, swaps, swap;

      var chr = function () {
        return charAt(input, pointer);
      };

      if (chr() == ':') {
        if (charAt(input, 1) != ':') return;
        pointer += 2;
        pieceIndex++;
        compress = pieceIndex;
      }
      while (chr()) {
        if (pieceIndex == 8) return;
        if (chr() == ':') {
          if (compress !== null) return;
          pointer++;
          pieceIndex++;
          compress = pieceIndex;
          continue;
        }
        value = length = 0;
        while (length < 4 && exec(HEX, chr())) {
          value = value * 16 + parseInt$1(chr(), 16);
          pointer++;
          length++;
        }
        if (chr() == '.') {
          if (length == 0) return;
          pointer -= length;
          if (pieceIndex > 6) return;
          numbersSeen = 0;
          while (chr()) {
            ipv4Piece = null;
            if (numbersSeen > 0) {
              if (chr() == '.' && numbersSeen < 4) pointer++;
              else return;
            }
            if (!exec(DIGIT, chr())) return;
            while (exec(DIGIT, chr())) {
              number = parseInt$1(chr(), 10);
              if (ipv4Piece === null) ipv4Piece = number;
              else if (ipv4Piece == 0) return;
              else ipv4Piece = ipv4Piece * 10 + number;
              if (ipv4Piece > 255) return;
              pointer++;
            }
            address[pieceIndex] = address[pieceIndex] * 256 + ipv4Piece;
            numbersSeen++;
            if (numbersSeen == 2 || numbersSeen == 4) pieceIndex++;
          }
          if (numbersSeen != 4) return;
          break;
        } else if (chr() == ':') {
          pointer++;
          if (!chr()) return;
        } else if (chr()) return;
        address[pieceIndex++] = value;
      }
      if (compress !== null) {
        swaps = pieceIndex - compress;
        pieceIndex = 7;
        while (pieceIndex != 0 && swaps > 0) {
          swap = address[pieceIndex];
          address[pieceIndex--] = address[compress + swaps - 1];
          address[compress + --swaps] = swap;
        }
      } else if (pieceIndex != 8) return;
      return address;
    };

    var findLongestZeroSequence = function (ipv6) {
      var maxIndex = null;
      var maxLength = 1;
      var currStart = null;
      var currLength = 0;
      var index = 0;
      for (; index < 8; index++) {
        if (ipv6[index] !== 0) {
          if (currLength > maxLength) {
            maxIndex = currStart;
            maxLength = currLength;
          }
          currStart = null;
          currLength = 0;
        } else {
          if (currStart === null) currStart = index;
          ++currLength;
        }
      }
      if (currLength > maxLength) {
        maxIndex = currStart;
        maxLength = currLength;
      }
      return maxIndex;
    };

    // https://url.spec.whatwg.org/#host-serializing
    var serializeHost = function (host) {
      var result, index, compress, ignore0;
      // ipv4
      if (typeof host == 'number') {
        result = [];
        for (index = 0; index < 4; index++) {
          unshift(result, host % 256);
          host = floor(host / 256);
        } return join(result, '.');
      // ipv6
      } else if (typeof host == 'object') {
        result = '';
        compress = findLongestZeroSequence(host);
        for (index = 0; index < 8; index++) {
          if (ignore0 && host[index] === 0) continue;
          if (ignore0) ignore0 = false;
          if (compress === index) {
            result += index ? ':' : '::';
            ignore0 = true;
          } else {
            result += numberToString(host[index], 16);
            if (index < 7) result += ':';
          }
        }
        return '[' + result + ']';
      } return host;
    };

    var C0ControlPercentEncodeSet = {};
    var fragmentPercentEncodeSet = assign({}, C0ControlPercentEncodeSet, {
      ' ': 1, '"': 1, '<': 1, '>': 1, '`': 1
    });
    var pathPercentEncodeSet = assign({}, fragmentPercentEncodeSet, {
      '#': 1, '?': 1, '{': 1, '}': 1
    });
    var userinfoPercentEncodeSet = assign({}, pathPercentEncodeSet, {
      '/': 1, ':': 1, ';': 1, '=': 1, '@': 1, '[': 1, '\\': 1, ']': 1, '^': 1, '|': 1
    });

    var percentEncode = function (chr, set) {
      var code = codeAt(chr, 0);
      return code > 0x20 && code < 0x7F && !hasOwn(set, chr) ? chr : encodeURIComponent(chr);
    };

    // https://url.spec.whatwg.org/#special-scheme
    var specialSchemes = {
      ftp: 21,
      file: null,
      http: 80,
      https: 443,
      ws: 80,
      wss: 443
    };

    // https://url.spec.whatwg.org/#windows-drive-letter
    var isWindowsDriveLetter = function (string, normalized) {
      var second;
      return string.length == 2 && exec(ALPHA, charAt(string, 0))
        && ((second = charAt(string, 1)) == ':' || (!normalized && second == '|'));
    };

    // https://url.spec.whatwg.org/#start-with-a-windows-drive-letter
    var startsWithWindowsDriveLetter = function (string) {
      var third;
      return string.length > 1 && isWindowsDriveLetter(stringSlice(string, 0, 2)) && (
        string.length == 2 ||
        ((third = charAt(string, 2)) === '/' || third === '\\' || third === '?' || third === '#')
      );
    };

    // https://url.spec.whatwg.org/#single-dot-path-segment
    var isSingleDot = function (segment) {
      return segment === '.' || toLowerCase(segment) === '%2e';
    };

    // https://url.spec.whatwg.org/#double-dot-path-segment
    var isDoubleDot = function (segment) {
      segment = toLowerCase(segment);
      return segment === '..' || segment === '%2e.' || segment === '.%2e' || segment === '%2e%2e';
    };

    // States:
    var SCHEME_START = {};
    var SCHEME = {};
    var NO_SCHEME = {};
    var SPECIAL_RELATIVE_OR_AUTHORITY = {};
    var PATH_OR_AUTHORITY = {};
    var RELATIVE = {};
    var RELATIVE_SLASH = {};
    var SPECIAL_AUTHORITY_SLASHES = {};
    var SPECIAL_AUTHORITY_IGNORE_SLASHES = {};
    var AUTHORITY = {};
    var HOST = {};
    var HOSTNAME = {};
    var PORT = {};
    var FILE = {};
    var FILE_SLASH = {};
    var FILE_HOST = {};
    var PATH_START = {};
    var PATH = {};
    var CANNOT_BE_A_BASE_URL_PATH = {};
    var QUERY = {};
    var FRAGMENT = {};

    var URLState = function (url, isBase, base) {
      var urlString = $toString(url);
      var baseState, failure, searchParams;
      if (isBase) {
        failure = this.parse(urlString);
        if (failure) throw TypeError$1(failure);
        this.searchParams = null;
      } else {
        if (base !== undefined) baseState = new URLState(base, true);
        failure = this.parse(urlString, null, baseState);
        if (failure) throw TypeError$1(failure);
        searchParams = getInternalSearchParamsState(new URLSearchParams$1());
        searchParams.bindURL(this);
        this.searchParams = searchParams;
      }
    };

    URLState.prototype = {
      type: 'URL',
      // https://url.spec.whatwg.org/#url-parsing
      // eslint-disable-next-line max-statements -- TODO
      parse: function (input, stateOverride, base) {
        var url = this;
        var state = stateOverride || SCHEME_START;
        var pointer = 0;
        var buffer = '';
        var seenAt = false;
        var seenBracket = false;
        var seenPasswordToken = false;
        var codePoints, chr, bufferCodePoints, failure;

        input = $toString(input);

        if (!stateOverride) {
          url.scheme = '';
          url.username = '';
          url.password = '';
          url.host = null;
          url.port = null;
          url.path = [];
          url.query = null;
          url.fragment = null;
          url.cannotBeABaseURL = false;
          input = replace(input, LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE, '');
        }

        input = replace(input, TAB_AND_NEW_LINE, '');

        codePoints = arrayFrom(input);

        while (pointer <= codePoints.length) {
          chr = codePoints[pointer];
          switch (state) {
            case SCHEME_START:
              if (chr && exec(ALPHA, chr)) {
                buffer += toLowerCase(chr);
                state = SCHEME;
              } else if (!stateOverride) {
                state = NO_SCHEME;
                continue;
              } else return INVALID_SCHEME;
              break;

            case SCHEME:
              if (chr && (exec(ALPHANUMERIC, chr) || chr == '+' || chr == '-' || chr == '.')) {
                buffer += toLowerCase(chr);
              } else if (chr == ':') {
                if (stateOverride && (
                  (url.isSpecial() != hasOwn(specialSchemes, buffer)) ||
                  (buffer == 'file' && (url.includesCredentials() || url.port !== null)) ||
                  (url.scheme == 'file' && !url.host)
                )) return;
                url.scheme = buffer;
                if (stateOverride) {
                  if (url.isSpecial() && specialSchemes[url.scheme] == url.port) url.port = null;
                  return;
                }
                buffer = '';
                if (url.scheme == 'file') {
                  state = FILE;
                } else if (url.isSpecial() && base && base.scheme == url.scheme) {
                  state = SPECIAL_RELATIVE_OR_AUTHORITY;
                } else if (url.isSpecial()) {
                  state = SPECIAL_AUTHORITY_SLASHES;
                } else if (codePoints[pointer + 1] == '/') {
                  state = PATH_OR_AUTHORITY;
                  pointer++;
                } else {
                  url.cannotBeABaseURL = true;
                  push(url.path, '');
                  state = CANNOT_BE_A_BASE_URL_PATH;
                }
              } else if (!stateOverride) {
                buffer = '';
                state = NO_SCHEME;
                pointer = 0;
                continue;
              } else return INVALID_SCHEME;
              break;

            case NO_SCHEME:
              if (!base || (base.cannotBeABaseURL && chr != '#')) return INVALID_SCHEME;
              if (base.cannotBeABaseURL && chr == '#') {
                url.scheme = base.scheme;
                url.path = arraySlice(base.path);
                url.query = base.query;
                url.fragment = '';
                url.cannotBeABaseURL = true;
                state = FRAGMENT;
                break;
              }
              state = base.scheme == 'file' ? FILE : RELATIVE;
              continue;

            case SPECIAL_RELATIVE_OR_AUTHORITY:
              if (chr == '/' && codePoints[pointer + 1] == '/') {
                state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
                pointer++;
              } else {
                state = RELATIVE;
                continue;
              } break;

            case PATH_OR_AUTHORITY:
              if (chr == '/') {
                state = AUTHORITY;
                break;
              } else {
                state = PATH;
                continue;
              }

            case RELATIVE:
              url.scheme = base.scheme;
              if (chr == EOF) {
                url.username = base.username;
                url.password = base.password;
                url.host = base.host;
                url.port = base.port;
                url.path = arraySlice(base.path);
                url.query = base.query;
              } else if (chr == '/' || (chr == '\\' && url.isSpecial())) {
                state = RELATIVE_SLASH;
              } else if (chr == '?') {
                url.username = base.username;
                url.password = base.password;
                url.host = base.host;
                url.port = base.port;
                url.path = arraySlice(base.path);
                url.query = '';
                state = QUERY;
              } else if (chr == '#') {
                url.username = base.username;
                url.password = base.password;
                url.host = base.host;
                url.port = base.port;
                url.path = arraySlice(base.path);
                url.query = base.query;
                url.fragment = '';
                state = FRAGMENT;
              } else {
                url.username = base.username;
                url.password = base.password;
                url.host = base.host;
                url.port = base.port;
                url.path = arraySlice(base.path);
                url.path.length--;
                state = PATH;
                continue;
              } break;

            case RELATIVE_SLASH:
              if (url.isSpecial() && (chr == '/' || chr == '\\')) {
                state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
              } else if (chr == '/') {
                state = AUTHORITY;
              } else {
                url.username = base.username;
                url.password = base.password;
                url.host = base.host;
                url.port = base.port;
                state = PATH;
                continue;
              } break;

            case SPECIAL_AUTHORITY_SLASHES:
              state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
              if (chr != '/' || charAt(buffer, pointer + 1) != '/') continue;
              pointer++;
              break;

            case SPECIAL_AUTHORITY_IGNORE_SLASHES:
              if (chr != '/' && chr != '\\') {
                state = AUTHORITY;
                continue;
              } break;

            case AUTHORITY:
              if (chr == '@') {
                if (seenAt) buffer = '%40' + buffer;
                seenAt = true;
                bufferCodePoints = arrayFrom(buffer);
                for (var i = 0; i < bufferCodePoints.length; i++) {
                  var codePoint = bufferCodePoints[i];
                  if (codePoint == ':' && !seenPasswordToken) {
                    seenPasswordToken = true;
                    continue;
                  }
                  var encodedCodePoints = percentEncode(codePoint, userinfoPercentEncodeSet);
                  if (seenPasswordToken) url.password += encodedCodePoints;
                  else url.username += encodedCodePoints;
                }
                buffer = '';
              } else if (
                chr == EOF || chr == '/' || chr == '?' || chr == '#' ||
                (chr == '\\' && url.isSpecial())
              ) {
                if (seenAt && buffer == '') return INVALID_AUTHORITY;
                pointer -= arrayFrom(buffer).length + 1;
                buffer = '';
                state = HOST;
              } else buffer += chr;
              break;

            case HOST:
            case HOSTNAME:
              if (stateOverride && url.scheme == 'file') {
                state = FILE_HOST;
                continue;
              } else if (chr == ':' && !seenBracket) {
                if (buffer == '') return INVALID_HOST;
                failure = url.parseHost(buffer);
                if (failure) return failure;
                buffer = '';
                state = PORT;
                if (stateOverride == HOSTNAME) return;
              } else if (
                chr == EOF || chr == '/' || chr == '?' || chr == '#' ||
                (chr == '\\' && url.isSpecial())
              ) {
                if (url.isSpecial() && buffer == '') return INVALID_HOST;
                if (stateOverride && buffer == '' && (url.includesCredentials() || url.port !== null)) return;
                failure = url.parseHost(buffer);
                if (failure) return failure;
                buffer = '';
                state = PATH_START;
                if (stateOverride) return;
                continue;
              } else {
                if (chr == '[') seenBracket = true;
                else if (chr == ']') seenBracket = false;
                buffer += chr;
              } break;

            case PORT:
              if (exec(DIGIT, chr)) {
                buffer += chr;
              } else if (
                chr == EOF || chr == '/' || chr == '?' || chr == '#' ||
                (chr == '\\' && url.isSpecial()) ||
                stateOverride
              ) {
                if (buffer != '') {
                  var port = parseInt$1(buffer, 10);
                  if (port > 0xFFFF) return INVALID_PORT;
                  url.port = (url.isSpecial() && port === specialSchemes[url.scheme]) ? null : port;
                  buffer = '';
                }
                if (stateOverride) return;
                state = PATH_START;
                continue;
              } else return INVALID_PORT;
              break;

            case FILE:
              url.scheme = 'file';
              if (chr == '/' || chr == '\\') state = FILE_SLASH;
              else if (base && base.scheme == 'file') {
                if (chr == EOF) {
                  url.host = base.host;
                  url.path = arraySlice(base.path);
                  url.query = base.query;
                } else if (chr == '?') {
                  url.host = base.host;
                  url.path = arraySlice(base.path);
                  url.query = '';
                  state = QUERY;
                } else if (chr == '#') {
                  url.host = base.host;
                  url.path = arraySlice(base.path);
                  url.query = base.query;
                  url.fragment = '';
                  state = FRAGMENT;
                } else {
                  if (!startsWithWindowsDriveLetter(join(arraySlice(codePoints, pointer), ''))) {
                    url.host = base.host;
                    url.path = arraySlice(base.path);
                    url.shortenPath();
                  }
                  state = PATH;
                  continue;
                }
              } else {
                state = PATH;
                continue;
              } break;

            case FILE_SLASH:
              if (chr == '/' || chr == '\\') {
                state = FILE_HOST;
                break;
              }
              if (base && base.scheme == 'file' && !startsWithWindowsDriveLetter(join(arraySlice(codePoints, pointer), ''))) {
                if (isWindowsDriveLetter(base.path[0], true)) push(url.path, base.path[0]);
                else url.host = base.host;
              }
              state = PATH;
              continue;

            case FILE_HOST:
              if (chr == EOF || chr == '/' || chr == '\\' || chr == '?' || chr == '#') {
                if (!stateOverride && isWindowsDriveLetter(buffer)) {
                  state = PATH;
                } else if (buffer == '') {
                  url.host = '';
                  if (stateOverride) return;
                  state = PATH_START;
                } else {
                  failure = url.parseHost(buffer);
                  if (failure) return failure;
                  if (url.host == 'localhost') url.host = '';
                  if (stateOverride) return;
                  buffer = '';
                  state = PATH_START;
                } continue;
              } else buffer += chr;
              break;

            case PATH_START:
              if (url.isSpecial()) {
                state = PATH;
                if (chr != '/' && chr != '\\') continue;
              } else if (!stateOverride && chr == '?') {
                url.query = '';
                state = QUERY;
              } else if (!stateOverride && chr == '#') {
                url.fragment = '';
                state = FRAGMENT;
              } else if (chr != EOF) {
                state = PATH;
                if (chr != '/') continue;
              } break;

            case PATH:
              if (
                chr == EOF || chr == '/' ||
                (chr == '\\' && url.isSpecial()) ||
                (!stateOverride && (chr == '?' || chr == '#'))
              ) {
                if (isDoubleDot(buffer)) {
                  url.shortenPath();
                  if (chr != '/' && !(chr == '\\' && url.isSpecial())) {
                    push(url.path, '');
                  }
                } else if (isSingleDot(buffer)) {
                  if (chr != '/' && !(chr == '\\' && url.isSpecial())) {
                    push(url.path, '');
                  }
                } else {
                  if (url.scheme == 'file' && !url.path.length && isWindowsDriveLetter(buffer)) {
                    if (url.host) url.host = '';
                    buffer = charAt(buffer, 0) + ':'; // normalize windows drive letter
                  }
                  push(url.path, buffer);
                }
                buffer = '';
                if (url.scheme == 'file' && (chr == EOF || chr == '?' || chr == '#')) {
                  while (url.path.length > 1 && url.path[0] === '') {
                    shift(url.path);
                  }
                }
                if (chr == '?') {
                  url.query = '';
                  state = QUERY;
                } else if (chr == '#') {
                  url.fragment = '';
                  state = FRAGMENT;
                }
              } else {
                buffer += percentEncode(chr, pathPercentEncodeSet);
              } break;

            case CANNOT_BE_A_BASE_URL_PATH:
              if (chr == '?') {
                url.query = '';
                state = QUERY;
              } else if (chr == '#') {
                url.fragment = '';
                state = FRAGMENT;
              } else if (chr != EOF) {
                url.path[0] += percentEncode(chr, C0ControlPercentEncodeSet);
              } break;

            case QUERY:
              if (!stateOverride && chr == '#') {
                url.fragment = '';
                state = FRAGMENT;
              } else if (chr != EOF) {
                if (chr == "'" && url.isSpecial()) url.query += '%27';
                else if (chr == '#') url.query += '%23';
                else url.query += percentEncode(chr, C0ControlPercentEncodeSet);
              } break;

            case FRAGMENT:
              if (chr != EOF) url.fragment += percentEncode(chr, fragmentPercentEncodeSet);
              break;
          }

          pointer++;
        }
      },
      // https://url.spec.whatwg.org/#host-parsing
      parseHost: function (input) {
        var result, codePoints, index;
        if (charAt(input, 0) == '[') {
          if (charAt(input, input.length - 1) != ']') return INVALID_HOST;
          result = parseIPv6(stringSlice(input, 1, -1));
          if (!result) return INVALID_HOST;
          this.host = result;
        // opaque host
        } else if (!this.isSpecial()) {
          if (exec(FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT, input)) return INVALID_HOST;
          result = '';
          codePoints = arrayFrom(input);
          for (index = 0; index < codePoints.length; index++) {
            result += percentEncode(codePoints[index], C0ControlPercentEncodeSet);
          }
          this.host = result;
        } else {
          input = toASCII(input);
          if (exec(FORBIDDEN_HOST_CODE_POINT, input)) return INVALID_HOST;
          result = parseIPv4(input);
          if (result === null) return INVALID_HOST;
          this.host = result;
        }
      },
      // https://url.spec.whatwg.org/#cannot-have-a-username-password-port
      cannotHaveUsernamePasswordPort: function () {
        return !this.host || this.cannotBeABaseURL || this.scheme == 'file';
      },
      // https://url.spec.whatwg.org/#include-credentials
      includesCredentials: function () {
        return this.username != '' || this.password != '';
      },
      // https://url.spec.whatwg.org/#is-special
      isSpecial: function () {
        return hasOwn(specialSchemes, this.scheme);
      },
      // https://url.spec.whatwg.org/#shorten-a-urls-path
      shortenPath: function () {
        var path = this.path;
        var pathSize = path.length;
        if (pathSize && (this.scheme != 'file' || pathSize != 1 || !isWindowsDriveLetter(path[0], true))) {
          path.length--;
        }
      },
      // https://url.spec.whatwg.org/#concept-url-serializer
      serialize: function () {
        var url = this;
        var scheme = url.scheme;
        var username = url.username;
        var password = url.password;
        var host = url.host;
        var port = url.port;
        var path = url.path;
        var query = url.query;
        var fragment = url.fragment;
        var output = scheme + ':';
        if (host !== null) {
          output += '//';
          if (url.includesCredentials()) {
            output += username + (password ? ':' + password : '') + '@';
          }
          output += serializeHost(host);
          if (port !== null) output += ':' + port;
        } else if (scheme == 'file') output += '//';
        output += url.cannotBeABaseURL ? path[0] : path.length ? '/' + join(path, '/') : '';
        if (query !== null) output += '?' + query;
        if (fragment !== null) output += '#' + fragment;
        return output;
      },
      // https://url.spec.whatwg.org/#dom-url-href
      setHref: function (href) {
        var failure = this.parse(href);
        if (failure) throw TypeError$1(failure);
        this.searchParams.update();
      },
      // https://url.spec.whatwg.org/#dom-url-origin
      getOrigin: function () {
        var scheme = this.scheme;
        var port = this.port;
        if (scheme == 'blob') try {
          return new URLConstructor(scheme.path[0]).origin;
        } catch (error) {
          return 'null';
        }
        if (scheme == 'file' || !this.isSpecial()) return 'null';
        return scheme + '://' + serializeHost(this.host) + (port !== null ? ':' + port : '');
      },
      // https://url.spec.whatwg.org/#dom-url-protocol
      getProtocol: function () {
        return this.scheme + ':';
      },
      setProtocol: function (protocol) {
        this.parse($toString(protocol) + ':', SCHEME_START);
      },
      // https://url.spec.whatwg.org/#dom-url-username
      getUsername: function () {
        return this.username;
      },
      setUsername: function (username) {
        var codePoints = arrayFrom($toString(username));
        if (this.cannotHaveUsernamePasswordPort()) return;
        this.username = '';
        for (var i = 0; i < codePoints.length; i++) {
          this.username += percentEncode(codePoints[i], userinfoPercentEncodeSet);
        }
      },
      // https://url.spec.whatwg.org/#dom-url-password
      getPassword: function () {
        return this.password;
      },
      setPassword: function (password) {
        var codePoints = arrayFrom($toString(password));
        if (this.cannotHaveUsernamePasswordPort()) return;
        this.password = '';
        for (var i = 0; i < codePoints.length; i++) {
          this.password += percentEncode(codePoints[i], userinfoPercentEncodeSet);
        }
      },
      // https://url.spec.whatwg.org/#dom-url-host
      getHost: function () {
        var host = this.host;
        var port = this.port;
        return host === null ? ''
          : port === null ? serializeHost(host)
          : serializeHost(host) + ':' + port;
      },
      setHost: function (host) {
        if (this.cannotBeABaseURL) return;
        this.parse(host, HOST);
      },
      // https://url.spec.whatwg.org/#dom-url-hostname
      getHostname: function () {
        var host = this.host;
        return host === null ? '' : serializeHost(host);
      },
      setHostname: function (hostname) {
        if (this.cannotBeABaseURL) return;
        this.parse(hostname, HOSTNAME);
      },
      // https://url.spec.whatwg.org/#dom-url-port
      getPort: function () {
        var port = this.port;
        return port === null ? '' : $toString(port);
      },
      setPort: function (port) {
        if (this.cannotHaveUsernamePasswordPort()) return;
        port = $toString(port);
        if (port == '') this.port = null;
        else this.parse(port, PORT);
      },
      // https://url.spec.whatwg.org/#dom-url-pathname
      getPathname: function () {
        var path = this.path;
        return this.cannotBeABaseURL ? path[0] : path.length ? '/' + join(path, '/') : '';
      },
      setPathname: function (pathname) {
        if (this.cannotBeABaseURL) return;
        this.path = [];
        this.parse(pathname, PATH_START);
      },
      // https://url.spec.whatwg.org/#dom-url-search
      getSearch: function () {
        var query = this.query;
        return query ? '?' + query : '';
      },
      setSearch: function (search) {
        search = $toString(search);
        if (search == '') {
          this.query = null;
        } else {
          if ('?' == charAt(search, 0)) search = stringSlice(search, 1);
          this.query = '';
          this.parse(search, QUERY);
        }
        this.searchParams.update();
      },
      // https://url.spec.whatwg.org/#dom-url-searchparams
      getSearchParams: function () {
        return this.searchParams.facade;
      },
      // https://url.spec.whatwg.org/#dom-url-hash
      getHash: function () {
        var fragment = this.fragment;
        return fragment ? '#' + fragment : '';
      },
      setHash: function (hash) {
        hash = $toString(hash);
        if (hash == '') {
          this.fragment = null;
          return;
        }
        if ('#' == charAt(hash, 0)) hash = stringSlice(hash, 1);
        this.fragment = '';
        this.parse(hash, FRAGMENT);
      },
      update: function () {
        this.query = this.searchParams.serialize() || null;
      }
    };

    // `URL` constructor
    // https://url.spec.whatwg.org/#url-class
    var URLConstructor = function URL(url /* , base */) {
      var that = anInstance(this, URLPrototype);
      var base = validateArgumentsLength(arguments.length, 1) > 1 ? arguments[1] : undefined;
      var state = setInternalState(that, new URLState(url, false, base));
      if (!DESCRIPTORS) {
        that.href = state.serialize();
        that.origin = state.getOrigin();
        that.protocol = state.getProtocol();
        that.username = state.getUsername();
        that.password = state.getPassword();
        that.host = state.getHost();
        that.hostname = state.getHostname();
        that.port = state.getPort();
        that.pathname = state.getPathname();
        that.search = state.getSearch();
        that.searchParams = state.getSearchParams();
        that.hash = state.getHash();
      }
    };

    var URLPrototype = URLConstructor.prototype;

    var accessorDescriptor = function (getter, setter) {
      return {
        get: function () {
          return getInternalURLState(this)[getter]();
        },
        set: setter && function (value) {
          return getInternalURLState(this)[setter](value);
        },
        configurable: true,
        enumerable: true
      };
    };

    if (DESCRIPTORS) {
      // `URL.prototype.href` accessors pair
      // https://url.spec.whatwg.org/#dom-url-href
      defineBuiltInAccessor(URLPrototype, 'href', accessorDescriptor('serialize', 'setHref'));
      // `URL.prototype.origin` getter
      // https://url.spec.whatwg.org/#dom-url-origin
      defineBuiltInAccessor(URLPrototype, 'origin', accessorDescriptor('getOrigin'));
      // `URL.prototype.protocol` accessors pair
      // https://url.spec.whatwg.org/#dom-url-protocol
      defineBuiltInAccessor(URLPrototype, 'protocol', accessorDescriptor('getProtocol', 'setProtocol'));
      // `URL.prototype.username` accessors pair
      // https://url.spec.whatwg.org/#dom-url-username
      defineBuiltInAccessor(URLPrototype, 'username', accessorDescriptor('getUsername', 'setUsername'));
      // `URL.prototype.password` accessors pair
      // https://url.spec.whatwg.org/#dom-url-password
      defineBuiltInAccessor(URLPrototype, 'password', accessorDescriptor('getPassword', 'setPassword'));
      // `URL.prototype.host` accessors pair
      // https://url.spec.whatwg.org/#dom-url-host
      defineBuiltInAccessor(URLPrototype, 'host', accessorDescriptor('getHost', 'setHost'));
      // `URL.prototype.hostname` accessors pair
      // https://url.spec.whatwg.org/#dom-url-hostname
      defineBuiltInAccessor(URLPrototype, 'hostname', accessorDescriptor('getHostname', 'setHostname'));
      // `URL.prototype.port` accessors pair
      // https://url.spec.whatwg.org/#dom-url-port
      defineBuiltInAccessor(URLPrototype, 'port', accessorDescriptor('getPort', 'setPort'));
      // `URL.prototype.pathname` accessors pair
      // https://url.spec.whatwg.org/#dom-url-pathname
      defineBuiltInAccessor(URLPrototype, 'pathname', accessorDescriptor('getPathname', 'setPathname'));
      // `URL.prototype.search` accessors pair
      // https://url.spec.whatwg.org/#dom-url-search
      defineBuiltInAccessor(URLPrototype, 'search', accessorDescriptor('getSearch', 'setSearch'));
      // `URL.prototype.searchParams` getter
      // https://url.spec.whatwg.org/#dom-url-searchparams
      defineBuiltInAccessor(URLPrototype, 'searchParams', accessorDescriptor('getSearchParams'));
      // `URL.prototype.hash` accessors pair
      // https://url.spec.whatwg.org/#dom-url-hash
      defineBuiltInAccessor(URLPrototype, 'hash', accessorDescriptor('getHash', 'setHash'));
    }

    // `URL.prototype.toJSON` method
    // https://url.spec.whatwg.org/#dom-url-tojson
    defineBuiltIn(URLPrototype, 'toJSON', function toJSON() {
      return getInternalURLState(this).serialize();
    }, { enumerable: true });

    // `URL.prototype.toString` method
    // https://url.spec.whatwg.org/#URL-stringification-behavior
    defineBuiltIn(URLPrototype, 'toString', function toString() {
      return getInternalURLState(this).serialize();
    }, { enumerable: true });

    if (NativeURL) {
      var nativeCreateObjectURL = NativeURL.createObjectURL;
      var nativeRevokeObjectURL = NativeURL.revokeObjectURL;
      // `URL.createObjectURL` method
      // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
      if (nativeCreateObjectURL) defineBuiltIn(URLConstructor, 'createObjectURL', bind(nativeCreateObjectURL, NativeURL));
      // `URL.revokeObjectURL` method
      // https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL
      if (nativeRevokeObjectURL) defineBuiltIn(URLConstructor, 'revokeObjectURL', bind(nativeRevokeObjectURL, NativeURL));
    }

    setToStringTag(URLConstructor, 'URL');

    $({ global: true, constructor: true, forced: !USE_NATIVE_URL, sham: !DESCRIPTORS }, {
      URL: URLConstructor
    });

    navigator.userAgent.indexOf('DingTalk') > 0;

    // List of sessions
    Janus.sessions = {};
    Janus.isExtensionEnabled = function () {
      if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
        // No need for the extension, getDisplayMedia is supported
        return true;
      }
      if (window.navigator.userAgent.match('Chrome')) {
        var chromever = parseInt(window.navigator.userAgent.match(/Chrome\/(.*) /)[1], 10);
        var maxver = 33;
        if (window.navigator.userAgent.match('Linux')) maxver = 35; // "known" crash in chrome 34 and 35 on linux
        if (chromever >= 26 && chromever <= maxver) {
          // Older versions of Chrome don't support this extension-based approach, so lie
          return true;
        }
        return Janus.extension.isInstalled();
      } else {
        // Firefox and others, no need for the extension (but this doesn't mean it will work)
        return true;
      }
    };
    var defaultExtension = {
      // Screensharing Chrome Extension ID
      extensionId: 'hapfgfdkleiggjjpfpenajgdnfckjpaj',
      isInstalled: function () {
        return document.querySelector('#janus-extension-installed') !== null;
      },
      getScreen: function (callback) {
        var pending = window.setTimeout(function () {
          var error = new Error('NavigatorUserMediaError');
          error.name = 'The required Chrome extension is not installed: click <a href="#">here</a> to install it. (NOTE: this will need you to refresh the page)';
          return callback(error);
        }, 1000);
        this.cache[pending] = callback;
        window.postMessage({
          type: 'janusGetScreen',
          id: pending
        }, '*');
      },
      init: function () {
        var cache = {};
        this.cache = cache;
        // Wait for events from the Chrome Extension
        window.addEventListener('message', function (event) {
          if (event.origin != window.location.origin) return;
          if (event.data.type == 'janusGotScreen' && cache[event.data.id]) {
            var callback = cache[event.data.id];
            delete cache[event.data.id];
            if (event.data.sourceId === '') {
              // user canceled
              var error = new Error('NavigatorUserMediaError');
              error.name = 'You cancelled the request for permission, giving up...';
              callback(error);
            } else {
              callback(null, event.data.sourceId);
            }
          } else if (event.data.type == 'janusGetScreenPending') {
            console.log('clearing ', event.data.id);
            window.clearTimeout(event.data.id);
          }
        });
      }
    };
    Janus.useDefaultDependencies = function (deps) {
      var f = deps && deps.fetch || fetch;
      var p = deps && deps.Promise || Promise;
      var socketCls = deps && deps.WebSocket || WebSocket;
      return {
        newWebSocket: function (server, proto) {
          return new socketCls(server, proto);
        },
        extension: deps && deps.extension || defaultExtension,
        isArray: function (arr) {
          return Array.isArray(arr);
        },
        webRTCAdapter: deps && deps.adapter || adapter,
        httpAPICall: function (url, options) {
          var fetchOptions = {
            method: options.verb,
            headers: {
              'Accept': 'application/json, text/plain, */*'
            },
            cache: 'no-cache'
          };
          if (options.verb === "POST") {
            fetchOptions.headers['Content-Type'] = 'application/json';
          }
          if (typeof options.withCredentials !== 'undefined') {
            fetchOptions.credentials = options.withCredentials === true ? 'include' : options.withCredentials ? options.withCredentials : 'omit';
          }
          if (options.body) {
            fetchOptions.body = JSON.stringify(options.body);
          }
          var fetching = f(url, fetchOptions).catch(function (error) {
            return p.reject({
              message: 'Probably a network error, is the server down?',
              error: error
            });
          });

          /*
           * fetch() does not natively support timeouts.
           * Work around this by starting a timeout manually, and racing it agains the fetch() to see which thing resolves first.
           */

          if (options.timeout) {
            var timeout = new p(function (resolve, reject) {
              var timerId = setTimeout(function () {
                clearTimeout(timerId);
                return reject({
                  message: 'Request timed out',
                  timeout: options.timeout
                });
              }, options.timeout);
            });
            fetching = p.race([fetching, timeout]);
          }
          fetching.then(function (response) {
            if (response.ok) {
              if (typeof options.success === typeof Janus.noop) {
                return response.json().then(function (parsed) {
                  try {
                    options.success(parsed);
                  } catch (error) {
                    Janus.error('Unhandled httpAPICall success callback error', error);
                  }
                }, function (error) {
                  return p.reject({
                    message: 'Failed to parse response body',
                    error: error,
                    response: response
                  });
                });
              }
            } else {
              return p.reject({
                message: 'API call failed',
                response: response
              });
            }
          }).catch(function (error) {
            if (typeof options.error === typeof Janus.noop) {
              options.error(error.message || '<< internal error >>', error);
            }
          });
          return fetching;
        }
      };
    };
    Janus.useOldDependencies = function (deps) {
      var jq = deps && deps.jQuery || jQuery;
      var socketCls = deps && deps.WebSocket || WebSocket;
      return {
        newWebSocket: function (server, proto) {
          return new socketCls(server, proto);
        },
        isArray: function (arr) {
          return jq.isArray(arr);
        },
        extension: deps && deps.extension || defaultExtension,
        webRTCAdapter: deps && deps.adapter || adapter,
        httpAPICall: function (url, options) {
          var payload = typeof options.body !== 'undefined' ? {
            contentType: 'application/json',
            data: JSON.stringify(options.body)
          } : {};
          var credentials = typeof options.withCredentials !== 'undefined' ? {
            xhrFields: {
              withCredentials: options.withCredentials
            }
          } : {};
          return jq.ajax(jq.extend(payload, credentials, {
            url: url,
            type: options.verb,
            cache: false,
            dataType: 'json',
            async: options.async,
            timeout: options.timeout,
            success: function (result) {
              if (typeof options.success === typeof Janus.noop) {
                options.success(result);
              }
            },
            error: function (xhr, status, err) {
              if (typeof options.error === typeof Janus.noop) {
                options.error(status, err);
              }
            }
          }));
        }
      };
    };
    Janus.noop = function () {};
    Janus.dataChanDefaultLabel = "JanusDataChannel";

    // Note: in the future we may want to change this, e.g., as was
    // attempted in https://github.com/meetecho/janus-gateway/issues/1670
    Janus.endOfCandidates = null;

    // Stop all tracks from a given stream
    Janus.stopAllTracks = function (stream) {
      try {
        // Try a MediaStreamTrack.stop() for each track
        var tracks = stream.getTracks();
        for (var mst of tracks) {
          Janus.log(mst);
          if (mst && mst.dontStop !== true) {
            mst.stop();
          }
        }
      } catch (e) {
        // Do nothing if this fails
      }
    };

    // Initialization
    Janus.init = function (options) {
      options = options || {};
      options.callback = typeof options.callback == "function" ? options.callback : Janus.noop;
      if (Janus.initDone) {
        // Already initialized
        options.callback();
      } else {
        if (typeof console.log == "undefined") {
          console.log = function () {};
        }
        // Console logging (all debugging disabled by default)
        Janus.trace = Janus.noop;
        Janus.debug = Janus.noop;
        Janus.vdebug = Janus.noop;
        Janus.log = Janus.noop;
        Janus.warn = Janus.noop;
        Janus.error = Janus.noop;
        if (options.debug === true || options.debug === "all") {
          // Enable all debugging levels
          Janus.trace = console.trace.bind(console);
          Janus.debug = console.debug.bind(console);
          Janus.vdebug = console.debug.bind(console);
          Janus.log = console.log.bind(console);
          Janus.warn = console.warn.bind(console);
          Janus.error = console.error.bind(console);
        } else if (Array.isArray(options.debug)) {
          for (var d of options.debug) {
            switch (d) {
              case "trace":
                Janus.trace = console.trace.bind(console);
                break;
              case "debug":
                Janus.debug = console.debug.bind(console);
                break;
              case "vdebug":
                Janus.vdebug = console.debug.bind(console);
                break;
              case "log":
                Janus.log = console.log.bind(console);
                break;
              case "warn":
                Janus.warn = console.warn.bind(console);
                break;
              case "error":
                Janus.error = console.error.bind(console);
                break;
              default:
                console.error("Unknown debugging option '" + d + "' (supported: 'trace', 'debug', 'vdebug', 'log', warn', 'error')");
                break;
            }
          }
        }
        Janus.log("Initializing library");
        var usedDependencies = options.dependencies || Janus.useDefaultDependencies();
        Janus.isArray = usedDependencies.isArray;
        Janus.webRTCAdapter = usedDependencies.webRTCAdapter;
        Janus.httpAPICall = usedDependencies.httpAPICall;
        Janus.newWebSocket = usedDependencies.newWebSocket;
        Janus.extension = usedDependencies.extension;
        Janus.extension.init();

        // Helper method to enumerate devices
        Janus.listDevices = function (callback, config) {
          callback = typeof callback == "function" ? callback : Janus.noop;
          if (!config) {
            config = {
              audio: true,
              video: true
            };
          }
          if (Janus.isGetUserMediaAvailable()) {
            navigator.mediaDevices.getUserMedia(config).then(function (stream) {
              if (!navigator.mediaDevices.enumerateDevices) {
                Janus.error("not support enumerateDevices()");
                callback([]);
                return;
              }
              navigator.mediaDevices.enumerateDevices().then(function (devices) {
                Janus.debug(devices);
                callback(devices);
                // Get rid of the now useless stream
                Janus.stopAllTracks(stream);
              }).catch(function (err) {
                Janus.error(err);
                callback([]);
              });
            }).catch(function (err) {
              Janus.error(err);
              callback([]);
            });
          } else {
            Janus.warn("navigator.mediaDevices unavailable");
            callback([]);
          }
        };
        // Helper methods to attach/reattach a stream to a video element (previously part of adapter.js)
        Janus.attachMediaStream = function (element, stream) {
          try {
            element.srcObject = stream;
          } catch (e) {
            try {
              element.src = URL.createObjectURL(stream);
            } catch (e) {
              Janus.error("Error attaching stream to element", e);
            }
          }
        };
        Janus.reattachMediaStream = function (to, from) {
          try {
            to.srcObject = from.srcObject;
          } catch (e) {
            try {
              to.src = from.src;
            } catch (e) {
              Janus.error("Error reattaching stream to element", e);
            }
          }
        };
        // Detect tab close: make sure we don't loose existing onbeforeunload handlers
        // (note: for iOS we need to subscribe to a different event, 'pagehide', see
        // https://gist.github.com/thehunmonkgroup/6bee8941a49b86be31a787fe8f4b8cfe)
        var iOS = ['iPad', 'iPhone', 'iPod'].indexOf(navigator.platform) >= 0;
        var eventName = iOS ? 'pagehide' : 'beforeunload';
        var oldOBF = window["on" + eventName];
        window.addEventListener(eventName, function () {
          Janus.log("Closing window");
          for (var s in Janus.sessions) {
            if (Janus.sessions[s] && Janus.sessions[s].destroyOnUnload) {
              Janus.log("Destroying session " + s);
              Janus.sessions[s].destroy({
                unload: true,
                notifyDestroyed: false
              });
            }
          }
          if (oldOBF && typeof oldOBF == "function") {
            oldOBF();
          }
        });
        // If this is a Safari Technology Preview, check if VP8 is supported
        Janus.safariVp8 = false;
        if (Janus.webRTCAdapter.browserDetails.browser === 'safari' && Janus.webRTCAdapter.browserDetails.version >= 605) {
          // Let's see if RTCRtpSender.getCapabilities() is there
          if (RTCRtpSender && RTCRtpSender.getCapabilities && RTCRtpSender.getCapabilities("video") && RTCRtpSender.getCapabilities("video").codecs && RTCRtpSender.getCapabilities("video").codecs.length) {
            for (var codec of RTCRtpSender.getCapabilities("video").codecs) {
              if (codec && codec.mimeType && codec.mimeType.toLowerCase() === "video/vp8") {
                Janus.safariVp8 = true;
                break;
              }
            }
            if (Janus.safariVp8) {
              Janus.log("This version of Safari supports VP8");
            } else {
              Janus.warn("This version of Safari does NOT support VP8: if you're using a Technology Preview, " + "try enabling the 'WebRTC VP8 codec' setting in the 'Experimental Features' Develop menu");
            }
          } else {
            // We do it in a very ugly way, as there's no alternative...
            // We create a PeerConnection to see if VP8 is in an offer
            var testpc = new RTCPeerConnection({});
            testpc.createOffer({
              offerToReceiveVideo: true
            }).then(function (offer) {
              Janus.safariVp8 = offer.sdp.indexOf("VP8") !== -1;
              if (Janus.safariVp8) {
                Janus.log("This version of Safari supports VP8");
              } else {
                Janus.warn("This version of Safari does NOT support VP8: if you're using a Technology Preview, " + "try enabling the 'WebRTC VP8 codec' setting in the 'Experimental Features' Develop menu");
              }
              testpc.close();
              testpc = null;
            });
          }
        }
        // Check if this browser supports Unified Plan and transceivers
        // Based on https://codepen.io/anon/pen/ZqLwWV?editors=0010
        Janus.unifiedPlan = false;
        if (Janus.webRTCAdapter.browserDetails.browser === 'firefox' && Janus.webRTCAdapter.browserDetails.version >= 59) {
          // Firefox definitely does, starting from version 59
          Janus.unifiedPlan = true;
        } else if (Janus.webRTCAdapter.browserDetails.browser === 'chrome' && Janus.webRTCAdapter.browserDetails.version >= 72) {
          // Chrome does, but it's only usable from version 72 on
          Janus.unifiedPlan = true;
        } else if (!window.RTCRtpTransceiver || !('currentDirection' in RTCRtpTransceiver.prototype)) {
          // Safari supports addTransceiver() but not Unified Plan when
          // currentDirection is not defined (see codepen above).
          Janus.unifiedPlan = false;
        } else {
          // Check if addTransceiver() throws an exception
          var tempPc = new RTCPeerConnection();
          try {
            tempPc.addTransceiver('audio');
            Janus.unifiedPlan = true;
          } catch (e) {}
          tempPc.close();
        }
        Janus.initDone = true;
        options.callback();
      }
    };

    // Helper method to check whether WebRTC is supported by this browser
    Janus.isWebrtcSupported = function () {
      return !!window.RTCPeerConnection;
    };
    // Helper method to check whether devices can be accessed by this browser (e.g., not possible via plain HTTP)
    Janus.isGetUserMediaAvailable = function () {
      return navigator.mediaDevices && navigator.mediaDevices.getUserMedia;
    };

    // Helper method to create random identifiers (e.g., transaction)
    Janus.randomString = function (len) {
      var charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var randomString = '';
      for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.charAt(randomPoz);
      }
      return randomString;
    };
    function Janus(gatewayCallbacks) {
      gatewayCallbacks = gatewayCallbacks || {};
      gatewayCallbacks.success = typeof gatewayCallbacks.success == "function" ? gatewayCallbacks.success : Janus.noop;
      gatewayCallbacks.error = typeof gatewayCallbacks.error == "function" ? gatewayCallbacks.error : Janus.noop;
      gatewayCallbacks.destroyed = typeof gatewayCallbacks.destroyed == "function" ? gatewayCallbacks.destroyed : Janus.noop;
      if (!Janus.initDone) {
        gatewayCallbacks.error("Library not initialized");
        return {};
      }
      if (!Janus.isWebrtcSupported()) {
        gatewayCallbacks.error("WebRTC not supported by this browser");
        return {};
      }
      Janus.log("Library initialized: " + Janus.initDone);
      if (!gatewayCallbacks.server) {
        gatewayCallbacks.error("Invalid server url");
        return {};
      }
      var websockets = false;
      var ws = null;
      var wsHandlers = {};
      var wsKeepaliveTimeoutId = null;
      var servers = null;
      var serversIndex = 0;
      var server = gatewayCallbacks.server;
      if (Janus.isArray(server)) {
        Janus.log("Multiple servers provided (" + server.length + "), will use the first that works");
        server = null;
        servers = gatewayCallbacks.server;
        Janus.debug(servers);
      } else {
        if (server.indexOf("ws") === 0) {
          websockets = true;
          Janus.log("Using WebSockets to contact Janus: " + server);
        } else {
          websockets = false;
          Janus.log("Using REST API to contact Janus: " + server);
        }
      }
      var iceServers = gatewayCallbacks.iceServers || [{
        urls: "stun:stun.l.google.com:19302"
      }];
      var iceTransportPolicy = gatewayCallbacks.iceTransportPolicy;
      var bundlePolicy = gatewayCallbacks.bundlePolicy;
      // Whether IPv6 candidates should be gathered
      var ipv6Support = gatewayCallbacks.ipv6 === true;
      // Whether we should enable the withCredentials flag for XHR requests
      var withCredentials = false;
      if (typeof gatewayCallbacks.withCredentials !== 'undefined' && gatewayCallbacks.withCredentials !== null) withCredentials = gatewayCallbacks.withCredentials === true;
      // Optional max events
      var maxev = 10;
      if (typeof gatewayCallbacks.max_poll_events !== 'undefined' && gatewayCallbacks.max_poll_events !== null) maxev = gatewayCallbacks.max_poll_events;
      if (maxev < 1) maxev = 1;
      // Token to use (only if the token based authentication mechanism is enabled)
      var token = null;
      if (typeof gatewayCallbacks.token !== 'undefined' && gatewayCallbacks.token !== null) token = gatewayCallbacks.token;
      // API secret to use (only if the shared API secret is enabled)
      var apisecret = null;
      if (typeof gatewayCallbacks.apisecret !== 'undefined' && gatewayCallbacks.apisecret !== null) apisecret = gatewayCallbacks.apisecret;
      // Whether we should destroy this session when onbeforeunload is called
      this.destroyOnUnload = true;
      if (typeof gatewayCallbacks.destroyOnUnload !== 'undefined' && gatewayCallbacks.destroyOnUnload !== null) this.destroyOnUnload = gatewayCallbacks.destroyOnUnload === true;
      // Some timeout-related values
      var keepAlivePeriod = 25000;
      if (typeof gatewayCallbacks.keepAlivePeriod !== 'undefined' && gatewayCallbacks.keepAlivePeriod !== null) keepAlivePeriod = gatewayCallbacks.keepAlivePeriod;
      if (isNaN(keepAlivePeriod)) keepAlivePeriod = 25000;
      var longPollTimeout = 60000;
      if (typeof gatewayCallbacks.longPollTimeout !== 'undefined' && gatewayCallbacks.longPollTimeout !== null) longPollTimeout = gatewayCallbacks.longPollTimeout;
      if (isNaN(longPollTimeout)) longPollTimeout = 60000;

      // overrides for default maxBitrate values for simulcasting
      function getMaxBitrates(simulcastMaxBitrates) {
        var maxBitrates = {
          high: 900000,
          medium: 300000,
          low: 100000
        };
        if (typeof simulcastMaxBitrates !== 'undefined' && simulcastMaxBitrates !== null) {
          if (simulcastMaxBitrates.high) maxBitrates.high = simulcastMaxBitrates.high;
          if (simulcastMaxBitrates.medium) maxBitrates.medium = simulcastMaxBitrates.medium;
          if (simulcastMaxBitrates.low) maxBitrates.low = simulcastMaxBitrates.low;
        }
        return maxBitrates;
      }
      var connected = false;
      var sessionId = null;
      var pluginHandles = {};
      var that = this;
      var retries = 0;
      var transactions = {};
      createSession(gatewayCallbacks);

      // Public methods
      this.getServer = function () {
        return server;
      };
      this.isConnected = function () {
        return connected;
      };
      this.reconnect = function (callbacks) {
        callbacks = callbacks || {};
        callbacks.success = typeof callbacks.success == "function" ? callbacks.success : Janus.noop;
        callbacks.error = typeof callbacks.error == "function" ? callbacks.error : Janus.noop;
        callbacks["reconnect"] = true;
        createSession(callbacks);
      };
      this.getSessionId = function () {
        return sessionId;
      };
      this.getInfo = function (callbacks) {
        getInfo(callbacks);
      };
      this.destroy = function (callbacks) {
        destroySession(callbacks);
      };
      this.attach = function (callbacks) {
        createHandle(callbacks);
      };
      function eventHandler() {
        if (sessionId == null) return;
        Janus.debug('Long poll...');
        if (!connected) {
          Janus.warn("Is the server down? (connected=false)");
          return;
        }
        var longpoll = server + "/" + sessionId + "?rid=" + new Date().getTime();
        if (maxev) longpoll = longpoll + "&maxev=" + maxev;
        if (token) longpoll = longpoll + "&token=" + encodeURIComponent(token);
        if (apisecret) longpoll = longpoll + "&apisecret=" + encodeURIComponent(apisecret);
        Janus.httpAPICall(longpoll, {
          verb: 'GET',
          withCredentials: withCredentials,
          success: handleEvent,
          timeout: longPollTimeout,
          error: function (textStatus, errorThrown) {
            Janus.error(textStatus + ":", errorThrown);
            retries++;
            if (retries > 3) {
              // Did we just lose the server? :-(
              connected = false;
              gatewayCallbacks.error("Lost connection to the server (is it down?)");
              return;
            }
            eventHandler();
          }
        });
      }

      // Private event handler: this will trigger plugin callbacks, if set
      function handleEvent(json, skipTimeout) {
        retries = 0;
        if (!websockets && typeof sessionId !== 'undefined' && sessionId !== null && skipTimeout !== true) eventHandler();
        if (!websockets && Janus.isArray(json)) {
          // We got an array: it means we passed a maxev > 1, iterate on all objects
          for (var i = 0; i < json.length; i++) {
            handleEvent(json[i], true);
          }
          return;
        }
        if (json["janus"] === "keepalive") {
          // Nothing happened
          Janus.vdebug("Got a keepalive on session " + sessionId);
          return;
        } else if (json["janus"] === "server_info") {
          // Just info on the Janus instance
          Janus.debug("Got info on the Janus instance");
          Janus.debug(json);
          const transaction = json["transaction"];
          if (transaction) {
            const reportSuccess = transactions[transaction];
            if (reportSuccess) reportSuccess(json);
            delete transactions[transaction];
          }
          return;
        } else if (json["janus"] === "ack") {
          // Just an ack, we can probably ignore
          Janus.debug("Got an ack on session " + sessionId);
          Janus.debug(json);
          const transaction = json["transaction"];
          if (transaction) {
            const reportSuccess = transactions[transaction];
            if (reportSuccess) reportSuccess(json);
            delete transactions[transaction];
          }
          return;
        } else if (json["janus"] === "success") {
          // Success!
          Janus.debug("Got a success on session " + sessionId);
          Janus.debug(json);
          const transaction = json["transaction"];
          if (transaction) {
            const reportSuccess = transactions[transaction];
            if (reportSuccess) reportSuccess(json);
            delete transactions[transaction];
          }
          return;
        } else if (json["janus"] === "trickle") {
          // We got a trickle candidate from Janus
          const sender = json["sender"];
          if (!sender) {
            Janus.warn("Missing sender...");
            return;
          }
          const pluginHandle = pluginHandles[sender];
          if (!pluginHandle) {
            Janus.debug("This handle is not attached to this session");
            return;
          }
          var candidate = json["candidate"];
          Janus.debug("Got a trickled candidate on session " + sessionId);
          Janus.debug(candidate);
          var config = pluginHandle.webrtcStuff;
          if (config.pc && config.remoteSdp) {
            // Add candidate right now
            Janus.debug("Adding remote candidate:", candidate);
            if (!candidate || candidate.completed === true) {
              // end-of-candidates
              config.pc.addIceCandidate(Janus.endOfCandidates);
            } else {
              // New candidate
              config.pc.addIceCandidate(candidate);
            }
          } else {
            // We didn't do setRemoteDescription (trickle got here before the offer?)
            Janus.debug("We didn't do setRemoteDescription (trickle got here before the offer?), caching candidate");
            if (!config.candidates) config.candidates = [];
            config.candidates.push(candidate);
            Janus.debug(config.candidates);
          }
        } else if (json["janus"] === "webrtcup") {
          // The PeerConnection with the server is up! Notify this
          Janus.debug("Got a webrtcup event on session " + sessionId);
          Janus.debug(json);
          const sender = json["sender"];
          if (!sender) {
            Janus.warn("Missing sender...");
            return;
          }
          const pluginHandle = pluginHandles[sender];
          if (!pluginHandle) {
            Janus.debug("This handle is not attached to this session");
            return;
          }
          pluginHandle.webrtcState(true);
          return;
        } else if (json["janus"] === "hangup") {
          // A plugin asked the core to hangup a PeerConnection on one of our handles
          Janus.debug("Got a hangup event on session " + sessionId);
          Janus.debug(json);
          const sender = json["sender"];
          if (!sender) {
            Janus.warn("Missing sender...");
            return;
          }
          const pluginHandle = pluginHandles[sender];
          if (!pluginHandle) {
            Janus.debug("This handle is not attached to this session");
            return;
          }
          pluginHandle.webrtcState(false, json["reason"]);
          pluginHandle.hangup();
        } else if (json["janus"] === "detached") {
          // A plugin asked the core to detach one of our handles
          Janus.debug("Got a detached event on session " + sessionId);
          Janus.debug(json);
          const sender = json["sender"];
          if (!sender) {
            Janus.warn("Missing sender...");
            return;
          }
          const pluginHandle = pluginHandles[sender];
          if (!pluginHandle) {
            // Don't warn here because destroyHandle causes this situation.
            return;
          }
          pluginHandle.ondetached();
          pluginHandle.detach();
        } else if (json["janus"] === "media") {
          // Media started/stopped flowing
          Janus.debug("Got a media event on session " + sessionId);
          Janus.debug(json);
          const sender = json["sender"];
          if (!sender) {
            Janus.warn("Missing sender...");
            return;
          }
          const pluginHandle = pluginHandles[sender];
          if (!pluginHandle) {
            Janus.debug("This handle is not attached to this session");
            return;
          }
          pluginHandle.mediaState(json["type"], json["receiving"]);
        } else if (json["janus"] === "slowlink") {
          Janus.debug("Got a slowlink event on session " + sessionId);
          Janus.debug(json);
          // Trouble uplink or downlink
          const sender = json["sender"];
          if (!sender) {
            Janus.warn("Missing sender...");
            return;
          }
          const pluginHandle = pluginHandles[sender];
          if (!pluginHandle) {
            Janus.debug("This handle is not attached to this session");
            return;
          }
          pluginHandle.slowLink(json["uplink"], json["lost"]);
        } else if (json["janus"] === "error") {
          // Oops, something wrong happened
          Janus.error("Ooops: " + json["error"].code + " " + json["error"].reason); // FIXME
          Janus.debug(json);
          var transaction = json["transaction"];
          if (transaction) {
            var reportSuccess = transactions[transaction];
            if (reportSuccess) {
              reportSuccess(json);
            }
            delete transactions[transaction];
          }
          return;
        } else if (json["janus"] === "event") {
          Janus.debug("Got a plugin event on session " + sessionId);
          Janus.debug(json);
          const sender = json["sender"];
          if (!sender) {
            Janus.warn("Missing sender...");
            return;
          }
          var plugindata = json["plugindata"];
          if (!plugindata) {
            Janus.warn("Missing plugindata...");
            return;
          }
          Janus.debug("  -- Event is coming from " + sender + " (" + plugindata["plugin"] + ")");
          var data = plugindata["data"];
          Janus.debug(data);
          const pluginHandle = pluginHandles[sender];
          if (!pluginHandle) {
            Janus.warn("This handle is not attached to this session");
            return;
          }
          var jsep = json["jsep"];
          if (jsep) {
            Janus.debug("Handling SDP as well...");
            Janus.debug(jsep);
          }
          var callback = pluginHandle.onmessage;
          if (callback) {
            Janus.debug("Notifying application...");
            // Send to callback specified when attaching plugin handle
            callback(data, jsep);
          } else {
            // Send to generic callback (?)
            Janus.debug("No provided notification callback");
          }
        } else if (json["janus"] === "timeout") {
          Janus.error("Timeout on session " + sessionId);
          Janus.debug(json);
          if (websockets) {
            ws.close(3504, "Gateway timeout");
          }
          return;
        } else {
          Janus.warn("Unknown message/event  '" + json["janus"] + "' on session " + sessionId);
          Janus.debug(json);
        }
      }

      // Private helper to send keep-alive messages on WebSockets
      function keepAlive() {
        if (!server || !websockets || !connected) return;
        wsKeepaliveTimeoutId = setTimeout(keepAlive, keepAlivePeriod);
        var request = {
          "janus": "keepalive",
          "session_id": sessionId,
          "transaction": Janus.randomString(12)
        };
        if (token) request["token"] = token;
        if (apisecret) request["apisecret"] = apisecret;
        ws.send(JSON.stringify(request));
      }

      // Private method to create a session
      function createSession(callbacks) {
        var transaction = Janus.randomString(12);
        var request = {
          "janus": "create",
          "transaction": transaction
        };
        if (callbacks["reconnect"]) {
          // We're reconnecting, claim the session
          connected = false;
          request["janus"] = "claim";
          request["session_id"] = sessionId;
          // If we were using websockets, ignore the old connection
          if (ws) {
            ws.onopen = null;
            ws.onerror = null;
            ws.onclose = null;
            if (wsKeepaliveTimeoutId) {
              clearTimeout(wsKeepaliveTimeoutId);
              wsKeepaliveTimeoutId = null;
            }
          }
        }
        if (token) request["token"] = token;
        if (apisecret) request["apisecret"] = apisecret;
        if (!server && Janus.isArray(servers)) {
          // We still need to find a working server from the list we were given
          server = servers[serversIndex];
          if (server.indexOf("ws") === 0) {
            websockets = true;
            Janus.log("Server #" + (serversIndex + 1) + ": trying WebSockets to contact Janus (" + server + ")");
          } else {
            websockets = false;
            Janus.log("Server #" + (serversIndex + 1) + ": trying REST API to contact Janus (" + server + ")");
          }
        }
        if (websockets) {
          ws = Janus.newWebSocket(server, 'janus-protocol');
          wsHandlers = {
            'error': function () {
              Janus.error("Error connecting to the Janus WebSockets server... " + server);
              if (Janus.isArray(servers) && !callbacks["reconnect"]) {
                serversIndex++;
                if (serversIndex === servers.length) {
                  // We tried all the servers the user gave us and they all failed
                  callbacks.error("Error connecting to any of the provided Janus servers: Is the server down?");
                  return;
                }
                // Let's try the next server
                server = null;
                setTimeout(function () {
                  createSession(callbacks);
                }, 200);
                return;
              }
              callbacks.error("Error connecting to the Janus WebSockets server: Is the server down?");
            },
            'open': function () {
              // We need to be notified about the success
              transactions[transaction] = function (json) {
                Janus.debug(json);
                if (json["janus"] !== "success") {
                  Janus.error("Ooops: " + json["error"].code + " " + json["error"].reason); // FIXME
                  callbacks.error(json["error"].reason);
                  return;
                }
                wsKeepaliveTimeoutId = setTimeout(keepAlive, keepAlivePeriod);
                connected = true;
                sessionId = json["session_id"] ? json["session_id"] : json.data["id"];
                if (callbacks["reconnect"]) {
                  Janus.log("Claimed session: " + sessionId);
                } else {
                  Janus.log("Created session: " + sessionId);
                }
                Janus.sessions[sessionId] = that;
                callbacks.success();
              };
              ws.send(JSON.stringify(request));
            },
            'message': function (event) {
              handleEvent(JSON.parse(event.data));
            },
            'close': function () {
              if (!server || !connected) {
                return;
              }
              connected = false;
              // FIXME What if this is called when the page is closed?
              gatewayCallbacks.error("Lost connection to the server (is it down?)");
            }
          };
          for (var eventName in wsHandlers) {
            ws.addEventListener(eventName, wsHandlers[eventName]);
          }
          return;
        }
        Janus.httpAPICall(server, {
          verb: 'POST',
          withCredentials: withCredentials,
          body: request,
          success: function (json) {
            Janus.debug(json);
            if (json["janus"] !== "success") {
              Janus.error("Ooops: " + json["error"].code + " " + json["error"].reason); // FIXME
              callbacks.error(json["error"].reason);
              return;
            }
            connected = true;
            sessionId = json["session_id"] ? json["session_id"] : json.data["id"];
            if (callbacks["reconnect"]) {
              Janus.log("Claimed session: " + sessionId);
            } else {
              Janus.log("Created session: " + sessionId);
            }
            Janus.sessions[sessionId] = that;
            eventHandler();
            callbacks.success();
          },
          error: function (textStatus, errorThrown) {
            Janus.error(textStatus + ":", errorThrown); // FIXME
            if (Janus.isArray(servers) && !callbacks["reconnect"]) {
              serversIndex++;
              if (serversIndex === servers.length) {
                // We tried all the servers the user gave us and they all failed
                callbacks.error("Error connecting to any of the provided Janus servers: Is the server down?");
                return;
              }
              // Let's try the next server
              server = null;
              setTimeout(function () {
                createSession(callbacks);
              }, 200);
              return;
            }
            if (errorThrown === "") callbacks.error(textStatus + ": Is the server down?");else if (errorThrown && errorThrown.error) callbacks.error(textStatus + ": " + errorThrown.error.message);else callbacks.error(textStatus + ": " + errorThrown);
          }
        });
      }

      // Private method to get info on the server
      function getInfo(callbacks) {
        callbacks = callbacks || {};
        // FIXME This method triggers a success even when we fail
        callbacks.success = typeof callbacks.success == "function" ? callbacks.success : Janus.noop;
        callbacks.error = typeof callbacks.error == "function" ? callbacks.error : Janus.noop;
        Janus.log("Getting info on Janus instance");
        if (!connected) {
          Janus.warn("Is the server down? (connected=false)");
          callbacks.error("Is the server down? (connected=false)");
          return;
        }
        // We just need to send an "info" request
        var transaction = Janus.randomString(12);
        var request = {
          "janus": "info",
          "transaction": transaction
        };
        if (token) request["token"] = token;
        if (apisecret) request["apisecret"] = apisecret;
        if (websockets) {
          transactions[transaction] = function (json) {
            Janus.log("Server info:");
            Janus.debug(json);
            if (json["janus"] !== "server_info") {
              Janus.error("Ooops: " + json["error"].code + " " + json["error"].reason); // FIXME
            }

            callbacks.success(json);
          };
          ws.send(JSON.stringify(request));
          return;
        }
        Janus.httpAPICall(server, {
          verb: 'POST',
          withCredentials: withCredentials,
          body: request,
          success: function (json) {
            Janus.log("Server info:");
            Janus.debug(json);
            if (json["janus"] !== "server_info") {
              Janus.error("Ooops: " + json["error"].code + " " + json["error"].reason); // FIXME
            }

            callbacks.success(json);
          },
          error: function (textStatus, errorThrown) {
            Janus.error(textStatus + ":", errorThrown); // FIXME
            if (errorThrown === "") callbacks.error(textStatus + ": Is the server down?");else callbacks.error(textStatus + ": " + errorThrown);
          }
        });
      }

      // Private method to destroy a session
      function destroySession(callbacks) {
        callbacks = callbacks || {};
        // FIXME This method triggers a success even when we fail
        callbacks.success = typeof callbacks.success == "function" ? callbacks.success : Janus.noop;
        callbacks.error = typeof callbacks.error == "function" ? callbacks.error : Janus.noop;
        var unload = callbacks.unload === true;
        var notifyDestroyed = true;
        if (typeof callbacks.notifyDestroyed !== 'undefined' && callbacks.notifyDestroyed !== null) notifyDestroyed = callbacks.notifyDestroyed === true;
        var cleanupHandles = callbacks.cleanupHandles === true;
        Janus.log("Destroying session " + sessionId + " (unload=" + unload + ")");
        if (!sessionId) {
          Janus.warn("No session to destroy");
          callbacks.success();
          if (notifyDestroyed) gatewayCallbacks.destroyed();
          return;
        }
        if (cleanupHandles) {
          for (var handleId in pluginHandles) destroyHandle(handleId, {
            noRequest: true
          });
        }
        if (!connected) {
          Janus.warn("Is the server down? (connected=false)");
          sessionId = null;
          callbacks.success();
          return;
        }
        // No need to destroy all handles first, Janus will do that itself
        var request = {
          "janus": "destroy",
          "transaction": Janus.randomString(12)
        };
        if (token) request["token"] = token;
        if (apisecret) request["apisecret"] = apisecret;
        if (unload) {
          // We're unloading the page: use sendBeacon for HTTP instead,
          // or just close the WebSocket connection if we're using that
          if (websockets) {
            ws.onclose = null;
            ws.close();
            ws = null;
          } else {
            navigator.sendBeacon(server + "/" + sessionId, JSON.stringify(request));
          }
          Janus.log("Destroyed session:");
          sessionId = null;
          connected = false;
          callbacks.success();
          if (notifyDestroyed) gatewayCallbacks.destroyed();
          return;
        }
        if (websockets) {
          request["session_id"] = sessionId;
          var unbindWebSocket = function () {
            for (var eventName in wsHandlers) {
              ws.removeEventListener(eventName, wsHandlers[eventName]);
            }
            ws.removeEventListener('message', onUnbindMessage);
            ws.removeEventListener('error', onUnbindError);
            if (wsKeepaliveTimeoutId) {
              clearTimeout(wsKeepaliveTimeoutId);
            }
            ws.close();
          };
          var onUnbindMessage = function (event) {
            var data = JSON.parse(event.data);
            if (data.session_id == request.session_id && data.transaction == request.transaction) {
              unbindWebSocket();
              callbacks.success();
              if (notifyDestroyed) gatewayCallbacks.destroyed();
            }
          };
          var onUnbindError = function () {
            unbindWebSocket();
            callbacks.error("Failed to destroy the server: Is the server down?");
            if (notifyDestroyed) gatewayCallbacks.destroyed();
          };
          ws.addEventListener('message', onUnbindMessage);
          ws.addEventListener('error', onUnbindError);
          if (ws.readyState === 1) {
            ws.send(JSON.stringify(request));
          } else {
            onUnbindError();
          }
          return;
        }
        Janus.httpAPICall(server + "/" + sessionId, {
          verb: 'POST',
          withCredentials: withCredentials,
          body: request,
          success: function (json) {
            Janus.log("Destroyed session:");
            Janus.debug(json);
            sessionId = null;
            connected = false;
            if (json["janus"] !== "success") {
              Janus.error("Ooops: " + json["error"].code + " " + json["error"].reason); // FIXME
            }

            callbacks.success();
            if (notifyDestroyed) gatewayCallbacks.destroyed();
          },
          error: function (textStatus, errorThrown) {
            Janus.error(textStatus + ":", errorThrown); // FIXME
            // Reset everything anyway
            sessionId = null;
            connected = false;
            callbacks.success();
            if (notifyDestroyed) gatewayCallbacks.destroyed();
          }
        });
      }

      // Private method to create a plugin handle
      function createHandle(callbacks) {
        callbacks = callbacks || {};
        callbacks.success = typeof callbacks.success == "function" ? callbacks.success : Janus.noop;
        callbacks.error = typeof callbacks.error == "function" ? callbacks.error : Janus.noop;
        callbacks.dataChannelOptions = callbacks.dataChannelOptions || {
          ordered: true
        };
        callbacks.consentDialog = typeof callbacks.consentDialog == "function" ? callbacks.consentDialog : Janus.noop;
        callbacks.iceState = typeof callbacks.iceState == "function" ? callbacks.iceState : Janus.noop;
        callbacks.mediaState = typeof callbacks.mediaState == "function" ? callbacks.mediaState : Janus.noop;
        callbacks.webrtcState = typeof callbacks.webrtcState == "function" ? callbacks.webrtcState : Janus.noop;
        callbacks.slowLink = typeof callbacks.slowLink == "function" ? callbacks.slowLink : Janus.noop;
        callbacks.onmessage = typeof callbacks.onmessage == "function" ? callbacks.onmessage : Janus.noop;
        callbacks.onlocalstream = typeof callbacks.onlocalstream == "function" ? callbacks.onlocalstream : Janus.noop;
        callbacks.onremotestream = typeof callbacks.onremotestream == "function" ? callbacks.onremotestream : Janus.noop;
        callbacks.ondata = typeof callbacks.ondata == "function" ? callbacks.ondata : Janus.noop;
        callbacks.ondataopen = typeof callbacks.ondataopen == "function" ? callbacks.ondataopen : Janus.noop;
        callbacks.oncleanup = typeof callbacks.oncleanup == "function" ? callbacks.oncleanup : Janus.noop;
        callbacks.ondetached = typeof callbacks.ondetached == "function" ? callbacks.ondetached : Janus.noop;
        if (!connected) {
          Janus.warn("Is the server down? (connected=false)");
          callbacks.error("Is the server down? (connected=false)");
          return;
        }
        var plugin = callbacks.plugin;
        if (!plugin) {
          Janus.error("Invalid plugin");
          callbacks.error("Invalid plugin");
          return;
        }
        var opaqueId = callbacks.opaqueId;
        var loopIndex = callbacks.loopIndex;
        var handleToken = callbacks.token ? callbacks.token : token;
        var transaction = Janus.randomString(12);
        var request = {
          "janus": "attach",
          "plugin": plugin,
          "opaque_id": opaqueId,
          "loop_index": loopIndex,
          "transaction": transaction
        };
        if (handleToken) request["token"] = handleToken;
        if (apisecret) request["apisecret"] = apisecret;
        if (websockets) {
          transactions[transaction] = function (json) {
            Janus.debug(json);
            if (json["janus"] !== "success") {
              Janus.error("Ooops: " + json["error"].code + " " + json["error"].reason); // FIXME
              callbacks.error("Ooops: " + json["error"].code + " " + json["error"].reason);
              return;
            }
            var handleId = json.data["id"];
            Janus.log("Created handle: " + handleId);
            var pluginHandle = {
              session: that,
              plugin: plugin,
              id: handleId,
              token: handleToken,
              detached: false,
              webrtcStuff: {
                started: false,
                myStream: null,
                streamExternal: false,
                remoteStream: null,
                mySdp: null,
                mediaConstraints: null,
                pc: null,
                dataChannelOptions: callbacks.dataChannelOptions,
                dataChannel: {},
                dtmfSender: null,
                trickle: true,
                iceDone: false,
                volume: {
                  value: null,
                  timer: null
                },
                bitrate: {
                  value: null,
                  bsnow: null,
                  bsbefore: null,
                  tsnow: null,
                  tsbefore: null,
                  timer: null
                }
              },
              getId: function () {
                return handleId;
              },
              getPlugin: function () {
                return plugin;
              },
              getVolume: function () {
                return getVolume(handleId, true);
              },
              getRemoteVolume: function () {
                return getVolume(handleId, true);
              },
              getLocalVolume: function () {
                return getVolume(handleId, false);
              },
              isAudioMuted: function () {
                return isMuted(handleId, false);
              },
              muteAudio: function () {
                return mute(handleId, false, true);
              },
              unmuteAudio: function () {
                return mute(handleId, false, false);
              },
              isVideoMuted: function () {
                return isMuted(handleId, true);
              },
              muteVideo: function () {
                return mute(handleId, true, true);
              },
              unmuteVideo: function () {
                return mute(handleId, true, false);
              },
              getBitrate: function () {
                return getBitrate(handleId);
              },
              send: function (callbacks) {
                sendMessage(handleId, callbacks);
              },
              data: function (callbacks) {
                sendData(handleId, callbacks);
              },
              dtmf: function (callbacks) {
                sendDtmf(handleId, callbacks);
              },
              consentDialog: callbacks.consentDialog,
              iceState: callbacks.iceState,
              mediaState: callbacks.mediaState,
              webrtcState: callbacks.webrtcState,
              slowLink: callbacks.slowLink,
              onmessage: callbacks.onmessage,
              createOffer: function (callbacks) {
                prepareWebrtc(handleId, true, callbacks);
              },
              createAnswer: function (callbacks) {
                prepareWebrtc(handleId, false, callbacks);
              },
              handleRemoteJsep: function (callbacks) {
                prepareWebrtcPeer(handleId, callbacks);
              },
              onlocalstream: callbacks.onlocalstream,
              onremotestream: callbacks.onremotestream,
              ondata: callbacks.ondata,
              ondataopen: callbacks.ondataopen,
              oncleanup: callbacks.oncleanup,
              ondetached: callbacks.ondetached,
              hangup: function (sendRequest) {
                cleanupWebrtc(handleId, sendRequest === true);
              },
              detach: function (callbacks) {
                destroyHandle(handleId, callbacks);
              }
            };
            pluginHandles[handleId] = pluginHandle;
            callbacks.success(pluginHandle);
          };
          request["session_id"] = sessionId;
          ws.send(JSON.stringify(request));
          return;
        }
        Janus.httpAPICall(server + "/" + sessionId, {
          verb: 'POST',
          withCredentials: withCredentials,
          body: request,
          success: function (json) {
            Janus.debug(json);
            if (json["janus"] !== "success") {
              Janus.error("Ooops: " + json["error"].code + " " + json["error"].reason); // FIXME
              callbacks.error("Ooops: " + json["error"].code + " " + json["error"].reason);
              return;
            }
            var handleId = json.data["id"];
            Janus.log("Created handle: " + handleId);
            var pluginHandle = {
              session: that,
              plugin: plugin,
              id: handleId,
              token: handleToken,
              detached: false,
              webrtcStuff: {
                started: false,
                myStream: null,
                streamExternal: false,
                remoteStream: null,
                mySdp: null,
                mediaConstraints: null,
                pc: null,
                dataChannelOptions: callbacks.dataChannelOptions,
                dataChannel: {},
                dtmfSender: null,
                trickle: true,
                iceDone: false,
                volume: {
                  value: null,
                  timer: null
                },
                bitrate: {
                  value: null,
                  bsnow: null,
                  bsbefore: null,
                  tsnow: null,
                  tsbefore: null,
                  timer: null
                }
              },
              getId: function () {
                return handleId;
              },
              getPlugin: function () {
                return plugin;
              },
              getVolume: function () {
                return getVolume(handleId, true);
              },
              getRemoteVolume: function () {
                return getVolume(handleId, true);
              },
              getLocalVolume: function () {
                return getVolume(handleId, false);
              },
              isAudioMuted: function () {
                return isMuted(handleId, false);
              },
              muteAudio: function () {
                return mute(handleId, false, true);
              },
              unmuteAudio: function () {
                return mute(handleId, false, false);
              },
              isVideoMuted: function () {
                return isMuted(handleId, true);
              },
              muteVideo: function () {
                return mute(handleId, true, true);
              },
              unmuteVideo: function () {
                return mute(handleId, true, false);
              },
              getBitrate: function () {
                return getBitrate(handleId);
              },
              send: function (callbacks) {
                sendMessage(handleId, callbacks);
              },
              data: function (callbacks) {
                sendData(handleId, callbacks);
              },
              dtmf: function (callbacks) {
                sendDtmf(handleId, callbacks);
              },
              consentDialog: callbacks.consentDialog,
              iceState: callbacks.iceState,
              mediaState: callbacks.mediaState,
              webrtcState: callbacks.webrtcState,
              slowLink: callbacks.slowLink,
              onmessage: callbacks.onmessage,
              createOffer: function (callbacks) {
                prepareWebrtc(handleId, true, callbacks);
              },
              createAnswer: function (callbacks) {
                prepareWebrtc(handleId, false, callbacks);
              },
              handleRemoteJsep: function (callbacks) {
                prepareWebrtcPeer(handleId, callbacks);
              },
              onlocalstream: callbacks.onlocalstream,
              onremotestream: callbacks.onremotestream,
              ondata: callbacks.ondata,
              ondataopen: callbacks.ondataopen,
              oncleanup: callbacks.oncleanup,
              ondetached: callbacks.ondetached,
              hangup: function (sendRequest) {
                cleanupWebrtc(handleId, sendRequest === true);
              },
              detach: function (callbacks) {
                destroyHandle(handleId, callbacks);
              }
            };
            pluginHandles[handleId] = pluginHandle;
            callbacks.success(pluginHandle);
          },
          error: function (textStatus, errorThrown) {
            Janus.error(textStatus + ":", errorThrown); // FIXME
            if (errorThrown === "") callbacks.error(textStatus + ": Is the server down?");else callbacks.error(textStatus + ": " + errorThrown);
          }
        });
      }

      // Private method to send a message
      function sendMessage(handleId, callbacks) {
        callbacks = callbacks || {};
        callbacks.success = typeof callbacks.success == "function" ? callbacks.success : Janus.noop;
        callbacks.error = typeof callbacks.error == "function" ? callbacks.error : Janus.noop;
        if (!connected) {
          Janus.warn("Is the server down? (connected=false)");
          callbacks.error("Is the server down? (connected=false)");
          return;
        }
        var pluginHandle = pluginHandles[handleId];
        if (!pluginHandle || !pluginHandle.webrtcStuff) {
          Janus.warn("Invalid handle");
          callbacks.error("Invalid handle");
          return;
        }
        var message = callbacks.message;
        var jsep = callbacks.jsep;
        var transaction = Janus.randomString(12);
        var request = {
          "janus": "message",
          "body": message,
          "transaction": transaction
        };
        if (pluginHandle.token) request["token"] = pluginHandle.token;
        if (apisecret) request["apisecret"] = apisecret;
        if (jsep) {
          request.jsep = {
            type: jsep.type,
            sdp: jsep.sdp
          };
          if (jsep.e2ee) request.jsep.e2ee = true;
          if (jsep.rid_order === "hml" || jsep.rid_order === "lmh") request.jsep.rid_order = jsep.rid_order;
          if (jsep.force_relay) request.jsep.force_relay = true;
        }
        Janus.debug("Sending message to plugin (handle=" + handleId + "):");
        Janus.debug(request);
        if (websockets) {
          request["session_id"] = sessionId;
          request["handle_id"] = handleId;
          transactions[transaction] = function (json) {
            Janus.debug("Message sent!");
            Janus.debug(json);
            if (json["janus"] === "success") {
              // We got a success, must have been a synchronous transaction
              var plugindata = json["plugindata"];
              if (!plugindata) {
                Janus.warn("Request succeeded, but missing plugindata...");
                callbacks.success();
                return;
              }
              Janus.log("Synchronous transaction successful (" + plugindata["plugin"] + ")");
              var data = plugindata["data"];
              Janus.debug(data);
              callbacks.success(data);
              return;
            } else if (json["janus"] !== "ack") {
              // Not a success and not an ack, must be an error
              if (json["error"]) {
                Janus.error("Ooops: " + json["error"].code + " " + json["error"].reason); // FIXME
                callbacks.error(json["error"].code + " " + json["error"].reason);
              } else {
                Janus.error("Unknown error"); // FIXME
                callbacks.error("Unknown error");
              }
              return;
            }
            // If we got here, the plugin decided to handle the request asynchronously
            callbacks.success();
          };
          ws.send(JSON.stringify(request));
          return;
        }
        Janus.httpAPICall(server + "/" + sessionId + "/" + handleId, {
          verb: 'POST',
          withCredentials: withCredentials,
          body: request,
          success: function (json) {
            Janus.debug("Message sent!");
            Janus.debug(json);
            if (json["janus"] === "success") {
              // We got a success, must have been a synchronous transaction
              var plugindata = json["plugindata"];
              if (!plugindata) {
                Janus.warn("Request succeeded, but missing plugindata...");
                callbacks.success();
                return;
              }
              Janus.log("Synchronous transaction successful (" + plugindata["plugin"] + ")");
              var data = plugindata["data"];
              Janus.debug(data);
              callbacks.success(data);
              return;
            } else if (json["janus"] !== "ack") {
              // Not a success and not an ack, must be an error
              if (json["error"]) {
                Janus.error("Ooops: " + json["error"].code + " " + json["error"].reason); // FIXME
                callbacks.error(json["error"].code + " " + json["error"].reason);
              } else {
                Janus.error("Unknown error"); // FIXME
                callbacks.error("Unknown error");
              }
              return;
            }
            // If we got here, the plugin decided to handle the request asynchronously
            callbacks.success();
          },
          error: function (textStatus, errorThrown) {
            Janus.error(textStatus + ":", errorThrown); // FIXME
            callbacks.error(textStatus + ": " + errorThrown);
          }
        });
      }

      // Private method to send a trickle candidate
      function sendTrickleCandidate(handleId, candidate) {
        if (!connected) {
          Janus.warn("Is the server down? (connected=false)");
          return;
        }
        var pluginHandle = pluginHandles[handleId];
        if (!pluginHandle || !pluginHandle.webrtcStuff) {
          Janus.warn("Invalid handle");
          return;
        }
        var request = {
          "janus": "trickle",
          "candidate": candidate,
          "transaction": Janus.randomString(12)
        };
        if (pluginHandle.token) request["token"] = pluginHandle.token;
        if (apisecret) request["apisecret"] = apisecret;
        Janus.vdebug("Sending trickle candidate (handle=" + handleId + "):");
        Janus.vdebug(request);
        if (websockets) {
          request["session_id"] = sessionId;
          request["handle_id"] = handleId;
          ws.send(JSON.stringify(request));
          return;
        }
        Janus.httpAPICall(server + "/" + sessionId + "/" + handleId, {
          verb: 'POST',
          withCredentials: withCredentials,
          body: request,
          success: function (json) {
            Janus.vdebug("Candidate sent!");
            Janus.vdebug(json);
            if (json["janus"] !== "ack") {
              Janus.error("Ooops: " + json["error"].code + " " + json["error"].reason); // FIXME
              return;
            }
          },
          error: function (textStatus, errorThrown) {
            Janus.error(textStatus + ":", errorThrown); // FIXME
          }
        });
      }

      // Private method to create a data channel
      function createDataChannel(handleId, dclabel, dcprotocol, incoming, pendingData) {
        var pluginHandle = pluginHandles[handleId];
        if (!pluginHandle || !pluginHandle.webrtcStuff) {
          Janus.warn("Invalid handle");
          return;
        }
        var config = pluginHandle.webrtcStuff;
        if (!config.pc) {
          Janus.warn("Invalid PeerConnection");
          return;
        }
        var onDataChannelMessage = function (event) {
          Janus.log('Received message on data channel:', event);
          var label = event.target.label;
          pluginHandle.ondata(event.data, label);
        };
        var onDataChannelStateChange = function (event) {
          Janus.log('Received state change on data channel:', event);
          var label = event.target.label;
          var protocol = event.target.protocol;
          var dcState = config.dataChannel[label] ? config.dataChannel[label].readyState : "null";
          Janus.log('State change on <' + label + '> data channel: ' + dcState);
          if (dcState === 'open') {
            // Any pending messages to send?
            if (config.dataChannel[label].pending && config.dataChannel[label].pending.length > 0) {
              Janus.log("Sending pending messages on <" + label + ">:", config.dataChannel[label].pending.length);
              for (var data of config.dataChannel[label].pending) {
                Janus.log("Sending data on data channel <" + label + ">");
                Janus.debug(data);
                config.dataChannel[label].send(data);
              }
              config.dataChannel[label].pending = [];
            }
            // Notify the open data channel
            pluginHandle.ondataopen(label, protocol);
          }
        };
        var onDataChannelError = function (error) {
          Janus.error('Got error on data channel:', error);
          // TODO
        };

        if (!incoming) {
          // FIXME Add options (ordered, maxRetransmits, etc.)
          var dcoptions = config.dataChannelOptions;
          if (dcprotocol) dcoptions.protocol = dcprotocol;
          config.dataChannel[dclabel] = config.pc.createDataChannel(dclabel, dcoptions);
        } else {
          // The channel was created by Janus
          config.dataChannel[dclabel] = incoming;
        }
        config.dataChannel[dclabel].onmessage = onDataChannelMessage;
        config.dataChannel[dclabel].onopen = onDataChannelStateChange;
        config.dataChannel[dclabel].onclose = onDataChannelStateChange;
        config.dataChannel[dclabel].onerror = onDataChannelError;
        config.dataChannel[dclabel].pending = [];
        if (pendingData) config.dataChannel[dclabel].pending.push(pendingData);
      }

      // Private method to send a data channel message
      function sendData(handleId, callbacks) {
        callbacks = callbacks || {};
        callbacks.success = typeof callbacks.success == "function" ? callbacks.success : Janus.noop;
        callbacks.error = typeof callbacks.error == "function" ? callbacks.error : Janus.noop;
        var pluginHandle = pluginHandles[handleId];
        if (!pluginHandle || !pluginHandle.webrtcStuff) {
          Janus.warn("Invalid handle");
          callbacks.error("Invalid handle");
          return;
        }
        var config = pluginHandle.webrtcStuff;
        var data = callbacks.text || callbacks.data;
        if (!data) {
          Janus.warn("Invalid data");
          callbacks.error("Invalid data");
          return;
        }
        var label = callbacks.label ? callbacks.label : Janus.dataChanDefaultLabel;
        if (!config.dataChannel[label]) {
          // Create new data channel and wait for it to open
          createDataChannel(handleId, label, callbacks.protocol, false, data, callbacks.protocol);
          callbacks.success();
          return;
        }
        if (config.dataChannel[label].readyState !== "open") {
          config.dataChannel[label].pending.push(data);
          callbacks.success();
          return;
        }
        Janus.log("Sending data on data channel <" + label + ">");
        Janus.debug(data);
        config.dataChannel[label].send(data);
        callbacks.success();
      }

      // Private method to send a DTMF tone
      function sendDtmf(handleId, callbacks) {
        callbacks = callbacks || {};
        callbacks.success = typeof callbacks.success == "function" ? callbacks.success : Janus.noop;
        callbacks.error = typeof callbacks.error == "function" ? callbacks.error : Janus.noop;
        var pluginHandle = pluginHandles[handleId];
        if (!pluginHandle || !pluginHandle.webrtcStuff) {
          Janus.warn("Invalid handle");
          callbacks.error("Invalid handle");
          return;
        }
        var config = pluginHandle.webrtcStuff;
        if (!config.dtmfSender) {
          // Create the DTMF sender the proper way, if possible
          if (config.pc) {
            var senders = config.pc.getSenders();
            var audioSender = senders.find(function (sender) {
              return sender.track && sender.track.kind === 'audio';
            });
            if (!audioSender) {
              Janus.warn("Invalid DTMF configuration (no audio track)");
              callbacks.error("Invalid DTMF configuration (no audio track)");
              return;
            }
            config.dtmfSender = audioSender.dtmf;
            if (config.dtmfSender) {
              Janus.log("Created DTMF Sender");
              config.dtmfSender.ontonechange = function (tone) {
                Janus.debug("Sent DTMF tone: " + tone.tone);
              };
            }
          }
          if (!config.dtmfSender) {
            Janus.warn("Invalid DTMF configuration");
            callbacks.error("Invalid DTMF configuration");
            return;
          }
        }
        var dtmf = callbacks.dtmf;
        if (!dtmf) {
          Janus.warn("Invalid DTMF parameters");
          callbacks.error("Invalid DTMF parameters");
          return;
        }
        var tones = dtmf.tones;
        if (!tones) {
          Janus.warn("Invalid DTMF string");
          callbacks.error("Invalid DTMF string");
          return;
        }
        var duration = typeof dtmf.duration === 'number' ? dtmf.duration : 500; // We choose 500ms as the default duration for a tone
        var gap = typeof dtmf.gap === 'number' ? dtmf.gap : 50; // We choose 50ms as the default gap between tones
        Janus.debug("Sending DTMF string " + tones + " (duration " + duration + "ms, gap " + gap + "ms)");
        config.dtmfSender.insertDTMF(tones, duration, gap);
        callbacks.success();
      }

      // Private method to destroy a plugin handle
      function destroyHandle(handleId, callbacks) {
        callbacks = callbacks || {};
        callbacks.success = typeof callbacks.success == "function" ? callbacks.success : Janus.noop;
        callbacks.error = typeof callbacks.error == "function" ? callbacks.error : Janus.noop;
        var noRequest = callbacks.noRequest === true;
        Janus.log("Destroying handle " + handleId + " (only-locally=" + noRequest + ")");
        cleanupWebrtc(handleId);
        var pluginHandle = pluginHandles[handleId];
        if (!pluginHandle || pluginHandle.detached) {
          // Plugin was already detached by Janus, calling detach again will return a handle not found error, so just exit here
          delete pluginHandles[handleId];
          callbacks.success();
          return;
        }
        pluginHandle.detached = true;
        if (noRequest) {
          // We're only removing the handle locally
          delete pluginHandles[handleId];
          callbacks.success();
          return;
        }
        if (!connected) {
          Janus.warn("Is the server down? (connected=false)");
          callbacks.error("Is the server down? (connected=false)");
          return;
        }
        var request = {
          "janus": "detach",
          "transaction": Janus.randomString(12)
        };
        if (pluginHandle.token) request["token"] = pluginHandle.token;
        if (apisecret) request["apisecret"] = apisecret;
        if (websockets) {
          request["session_id"] = sessionId;
          request["handle_id"] = handleId;
          ws.send(JSON.stringify(request));
          delete pluginHandles[handleId];
          callbacks.success();
          return;
        }
        Janus.httpAPICall(server + "/" + sessionId + "/" + handleId, {
          verb: 'POST',
          withCredentials: withCredentials,
          body: request,
          success: function (json) {
            Janus.log("Destroyed handle:");
            Janus.debug(json);
            if (json["janus"] !== "success") {
              Janus.error("Ooops: " + json["error"].code + " " + json["error"].reason); // FIXME
            }

            delete pluginHandles[handleId];
            callbacks.success();
          },
          error: function (textStatus, errorThrown) {
            Janus.error(textStatus + ":", errorThrown); // FIXME
            // We cleanup anyway
            delete pluginHandles[handleId];
            callbacks.success();
          }
        });
      }

      // WebRTC stuff
      function streamsDone(handleId, jsep, media, callbacks, stream) {
        var pluginHandle = pluginHandles[handleId];
        if (!pluginHandle || !pluginHandle.webrtcStuff) {
          Janus.warn("Invalid handle");
          // Close all tracks if the given stream has been created internally
          if (!callbacks.stream) {
            Janus.stopAllTracks(stream);
          }
          callbacks.error("Invalid handle");
          return;
        }
        var config = pluginHandle.webrtcStuff;
        Janus.debug("streamsDone:", stream);
        if (stream) {
          Janus.debug("  -- Audio tracks:", stream.getAudioTracks());
          Janus.debug("  -- Video tracks:", stream.getVideoTracks());
        }
        // We're now capturing the new stream: check if we're updating or if it's a new thing
        var addTracks = false;
        if (!config.myStream || !media.update || config.streamExternal && !media.replaceAudio && !media.replaceVideo) {
          config.myStream = stream;
          addTracks = true;
        } else {
          // We only need to update the existing stream
          if ((!media.update && isAudioSendEnabled(media) || media.update && (media.addAudio || media.replaceAudio)) && stream.getAudioTracks() && stream.getAudioTracks().length) {
            config.myStream.addTrack(stream.getAudioTracks()[0]);
            if (Janus.unifiedPlan) {
              // Use Transceivers
              Janus.log((media.replaceAudio ? "Replacing" : "Adding") + " audio track:", stream.getAudioTracks()[0]);
              var audioTransceiver = null;
              const transceivers = config.pc.getTransceivers();
              if (transceivers && transceivers.length > 0) {
                for (const t of transceivers) {
                  if (t.sender && t.sender.track && t.sender.track.kind === "audio" || t.receiver && t.receiver.track && t.receiver.track.kind === "audio") {
                    audioTransceiver = t;
                    break;
                  }
                }
              }
              if (audioTransceiver && audioTransceiver.sender) {
                audioTransceiver.sender.replaceTrack(stream.getAudioTracks()[0]);
              } else {
                config.pc.addTrack(stream.getAudioTracks()[0], stream);
              }
            } else {
              Janus.log((media.replaceAudio ? "Replacing" : "Adding") + " audio track:", stream.getAudioTracks()[0]);
              config.pc.addTrack(stream.getAudioTracks()[0], stream);
            }
          }
          if ((!media.update && isVideoSendEnabled(media) || media.update && (media.addVideo || media.replaceVideo)) && stream.getVideoTracks() && stream.getVideoTracks().length) {
            config.myStream.addTrack(stream.getVideoTracks()[0]);
            if (Janus.unifiedPlan) {
              // Use Transceivers
              Janus.log((media.replaceVideo ? "Replacing" : "Adding") + " video track:", stream.getVideoTracks()[0]);
              var videoTransceiver = null;
              const transceivers = config.pc.getTransceivers();
              if (transceivers && transceivers.length > 0) {
                for (const t of transceivers) {
                  if (t.sender && t.sender.track && t.sender.track.kind === "video" || t.receiver && t.receiver.track && t.receiver.track.kind === "video") {
                    videoTransceiver = t;
                    break;
                  }
                }
              }
              if (videoTransceiver && videoTransceiver.sender) {
                videoTransceiver.sender.replaceTrack(stream.getVideoTracks()[0]);
              } else {
                config.pc.addTrack(stream.getVideoTracks()[0], stream);
              }
            } else {
              Janus.log((media.replaceVideo ? "Replacing" : "Adding") + " video track:", stream.getVideoTracks()[0]);
              config.pc.addTrack(stream.getVideoTracks()[0], stream);
            }
          }
        }
        // If we still need to create a PeerConnection, let's do that
        if (!config.pc) {
          var pc_config = {
            "iceServers": iceServers,
            "iceTransportPolicy": iceTransportPolicy,
            "bundlePolicy": bundlePolicy
          };
          if (Janus.webRTCAdapter.browserDetails.browser === "chrome") {
            // For Chrome versions before 72, we force a plan-b semantic, and unified-plan otherwise
            pc_config["sdpSemantics"] = Janus.webRTCAdapter.browserDetails.version < 72 ? "plan-b" : "unified-plan";
          }
          var pc_constraints = {
            "optional": [{
              "DtlsSrtpKeyAgreement": true
            }]
          };
          if (ipv6Support) {
            pc_constraints.optional.push({
              "googIPv6": true
            });
          }
          // Any custom constraint to add?
          if (callbacks.rtcConstraints && typeof callbacks.rtcConstraints === 'object') {
            Janus.debug("Adding custom PeerConnection constraints:", callbacks.rtcConstraints);
            for (var i in callbacks.rtcConstraints) {
              pc_constraints.optional.push(callbacks.rtcConstraints[i]);
            }
          }
          if (Janus.webRTCAdapter.browserDetails.browser === "edge") {
            // This is Edge, enable BUNDLE explicitly
            pc_config.bundlePolicy = "max-bundle";
          }
          // Check if a sender or receiver transform has been provided
          if (RTCRtpSender && (RTCRtpSender.prototype.createEncodedStreams || RTCRtpSender.prototype.createEncodedAudioStreams && RTCRtpSender.prototype.createEncodedVideoStreams) && (callbacks.senderTransforms || callbacks.receiverTransforms)) {
            config.senderTransforms = callbacks.senderTransforms;
            config.receiverTransforms = callbacks.receiverTransforms;
            pc_config["forceEncodedAudioInsertableStreams"] = true;
            pc_config["forceEncodedVideoInsertableStreams"] = true;
            pc_config["encodedInsertableStreams"] = true;
          }
          Janus.log("Creating PeerConnection");
          Janus.debug(pc_constraints);
          config.pc = new RTCPeerConnection(pc_config, pc_constraints);
          Janus.debug(config.pc);
          if (config.pc.getStats) {
            // FIXME
            config.volume = {};
            config.bitrate.value = "0 kbits/sec";
          }
          Janus.log("Preparing local SDP and gathering candidates (trickle=" + config.trickle + ")");
          config.pc.oniceconnectionstatechange = function () {
            if (config.pc) pluginHandle.iceState(config.pc.iceConnectionState);
          };
          config.pc.onicecandidate = function (event) {
            if (!event.candidate || Janus.webRTCAdapter.browserDetails.browser === 'edge' && event.candidate.candidate.indexOf('endOfCandidates') > 0) {
              Janus.log("End of candidates.");
              config.iceDone = true;
              if (config.trickle === true) {
                // Notify end of candidates
                sendTrickleCandidate(handleId, {
                  "completed": true
                });
              } else {
                // No trickle, time to send the complete SDP (including all candidates)
                sendSDP(handleId, callbacks);
              }
            } else {
              // JSON.stringify doesn't work on some WebRTC objects anymore
              // See https://code.google.com/p/chromium/issues/detail?id=467366

              // 将candidate中的非IPv4的地址替换为 127.0.0.1（？？？什么用途？）
              var candiStr = event.candidate.candidate;
              if (!ipv6Support) {
                var arr1 = candiStr.split(" ");
                //判断是否是IPV4
                var exp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
                var flag = arr1[4].match(exp);
                if (!flag || flag == "") {
                  arr1[4] = '127.0.0.1';
                }
                candiStr = arr1.join(' ');
              }
              var candidate = {
                "candidate": candiStr,
                "sdpMid": event.candidate.sdpMid,
                "sdpMLineIndex": event.candidate.sdpMLineIndex
              };
              if (config.trickle === true) {
                // Send candidate
                sendTrickleCandidate(handleId, candidate);
              }
            }
          };
          config.pc.ontrack = function (event) {
            Janus.log("Handling Remote Track");
            Janus.debug(event);
            if (!event.streams) return;
            config.remoteStream = event.streams[0];
            try {
              pluginHandle.onremotestream(config.remoteStream);
            } catch (e) {
              Janus.error(e);
            }
            if (event.track.onended) return;
            if (config.receiverTransforms) {
              var receiverStreams = null;
              if (RTCRtpSender.prototype.createEncodedStreams) {
                receiverStreams = event.receiver.createEncodedStreams();
              } else if (RTCRtpSender.prototype.createAudioEncodedStreams || RTCRtpSender.prototype.createEncodedVideoStreams) {
                if (event.track.kind === "audio" && config.receiverTransforms["audio"]) {
                  receiverStreams = event.receiver.createEncodedAudioStreams();
                } else if (event.track.kind === "video" && config.receiverTransforms["video"]) {
                  receiverStreams = event.receiver.createEncodedVideoStreams();
                }
              }
              if (receiverStreams) {
                console.log(receiverStreams);
                if (receiverStreams.readableStream && receiverStreams.writableStream) {
                  receiverStreams.readableStream.pipeThrough(config.receiverTransforms[event.track.kind]).pipeTo(receiverStreams.writableStream);
                } else if (receiverStreams.readable && receiverStreams.writable) {
                  receiverStreams.readable.pipeThrough(config.receiverTransforms[event.track.kind]).pipeTo(receiverStreams.writable);
                }
              }
            }
            var trackMutedTimeoutId = null;
            Janus.log("Adding onended callback to track:", event.track);
            event.track.onended = function (ev) {
              Janus.log("Remote track removed:", ev);
              if (config.remoteStream) {
                clearTimeout(trackMutedTimeoutId);
                config.remoteStream.removeTrack(ev.target);
                try {
                  pluginHandle.onremotestream(config.remoteStream);
                } catch (e) {
                  Janus.error(e);
                }
              }
            };
            event.track.onmute = function (ev) {
              Janus.log("Remote track muted:", ev);
              if (config.remoteStream && trackMutedTimeoutId == null) {
                trackMutedTimeoutId = setTimeout(function () {
                  Janus.log("Removing remote track");
                  if (config.remoteStream) {
                    config.remoteStream.removeTrack(ev.target);
                    try {
                      pluginHandle.onremotestream(config.remoteStream);
                    } catch (e) {
                      Janus.error(e);
                    }
                  }
                  trackMutedTimeoutId = null;
                  // Chrome seems to raise mute events only at multiples of 834ms;
                  // we set the timeout to three times this value (rounded to 840ms)
                }, 3 * 840);
              }
            };
            event.track.onunmute = function (ev) {
              Janus.log("Remote track flowing again:", ev);
              if (trackMutedTimeoutId != null) {
                clearTimeout(trackMutedTimeoutId);
                trackMutedTimeoutId = null;
              } else {
                try {
                  config.remoteStream.addTrack(ev.target);
                  pluginHandle.onremotestream(config.remoteStream);
                } catch (e) {
                  Janus.error(e);
                }
              }
            };
          };
        }
        if (addTracks && stream) {
          Janus.log('Adding local stream');
          var simulcast2 = callbacks.simulcast2 === true;
          stream.getTracks().forEach(function (track) {
            Janus.log('Adding local track:', track);
            var sender = null;
            if (!simulcast2 || track.kind === 'audio') {
              sender = config.pc.addTrack(track, stream);
            } else {
              Janus.log('Enabling rid-based simulcasting:', track);
              var maxBitrates = getMaxBitrates(callbacks.simulcastMaxBitrates);
              var tr = config.pc.addTransceiver(track, {
                direction: "sendrecv",
                streams: [stream],
                sendEncodings: callbacks.sendEncodings || [{
                  rid: "h",
                  active: true,
                  maxBitrate: maxBitrates.high
                }, {
                  rid: "m",
                  active: true,
                  maxBitrate: maxBitrates.medium,
                  scaleResolutionDownBy: 2
                }, {
                  rid: "l",
                  active: true,
                  maxBitrate: maxBitrates.low,
                  scaleResolutionDownBy: 4
                }]
              });
              if (tr) sender = tr.sender;
            }
            // Check if insertable streams are involved
            if (sender && config.senderTransforms) {
              var senderStreams = null;
              if (RTCRtpSender.prototype.createEncodedStreams) {
                senderStreams = sender.createEncodedStreams();
              } else if (RTCRtpSender.prototype.createAudioEncodedStreams || RTCRtpSender.prototype.createEncodedVideoStreams) {
                if (sender.track.kind === "audio" && config.senderTransforms["audio"]) {
                  senderStreams = sender.createEncodedAudioStreams();
                } else if (sender.track.kind === "video" && config.senderTransforms["video"]) {
                  senderStreams = sender.createEncodedVideoStreams();
                }
              }
              if (senderStreams) {
                console.log(senderStreams);
                if (senderStreams.readableStream && senderStreams.writableStream) {
                  senderStreams.readableStream.pipeThrough(config.senderTransforms[sender.track.kind]).pipeTo(senderStreams.writableStream);
                } else if (senderStreams.readable && senderStreams.writable) {
                  senderStreams.readable.pipeThrough(config.senderTransforms[sender.track.kind]).pipeTo(senderStreams.writable);
                }
              }
            }
          });
        }
        // Any data channel to create?
        if (isDataEnabled(media) && !config.dataChannel[Janus.dataChanDefaultLabel]) {
          Janus.log("Creating default data channel");
          createDataChannel(handleId, Janus.dataChanDefaultLabel, null, false);
          config.pc.ondatachannel = function (event) {
            Janus.log("Data channel created by Janus:", event);
            createDataChannel(handleId, event.channel.label, event.channel.protocol, event.channel);
          };
        }
        // If there's a new local stream, let's notify the application
        if (config.myStream) {
          try {
            pluginHandle.onlocalstream(config.myStream);
          } catch (e) {
            Janus.error(e);
          }
        }
        // Create offer/answer now
        if (!jsep) {
          createOffer(handleId, media, callbacks);
        } else {
          config.pc.setRemoteDescription(jsep).then(function () {
            Janus.log("Remote description accepted!");
            config.remoteSdp = jsep.sdp;
            // Any trickle candidate we cached?
            if (config.candidates && config.candidates.length > 0) {
              for (var i = 0; i < config.candidates.length; i++) {
                var candidate = config.candidates[i];
                Janus.debug("Adding remote candidate:", candidate);
                if (!candidate || candidate.completed === true) {
                  // end-of-candidates
                  config.pc.addIceCandidate(Janus.endOfCandidates);
                } else {
                  // New candidate
                  config.pc.addIceCandidate(candidate);
                }
              }
              config.candidates = [];
            }
            // Create the answer now
            createAnswer(handleId, media, callbacks);
          }, callbacks.error);
        }
      }
      function prepareWebrtc(handleId, offer, callbacks) {
        callbacks = callbacks || {};
        callbacks.success = typeof callbacks.success == "function" ? callbacks.success : Janus.noop;
        callbacks.error = typeof callbacks.error == "function" ? callbacks.error : webrtcError;
        var jsep = callbacks.jsep;
        if (offer && jsep) {
          Janus.error("Provided a JSEP to a createOffer");
          callbacks.error("Provided a JSEP to a createOffer");
          return;
        } else if (!offer && (!jsep || !jsep.type || !jsep.sdp)) {
          Janus.error("A valid JSEP is required for createAnswer");
          callbacks.error("A valid JSEP is required for createAnswer");
          return;
        }
        /* Check that callbacks.media is a (not null) Object */
        callbacks.media = typeof callbacks.media === 'object' && callbacks.media ? callbacks.media : {
          audio: true,
          video: true
        };
        var media = callbacks.media;
        var pluginHandle = pluginHandles[handleId];
        if (!pluginHandle || !pluginHandle.webrtcStuff) {
          Janus.warn("Invalid handle");
          callbacks.error("Invalid handle");
          return;
        }
        var config = pluginHandle.webrtcStuff;
        config.trickle = isTrickleEnabled(callbacks.trickle);
        // Are we updating a session?
        if (!config.pc) {
          // Nope, new PeerConnection
          media.update = false;
          media.keepAudio = false;
          media.keepVideo = false;
        } else {
          Janus.log("Updating existing media session");
          media.update = true;
          // Check if there's anything to add/remove/replace, or if we
          // can go directly to preparing the new SDP offer or answer
          if (callbacks.stream) {
            // External stream: is this the same as the one we were using before?
            if (callbacks.stream !== config.myStream) {
              Janus.log("Renegotiation involves a new external stream");
            }
          } else {
            // Check if there are changes on audio
            if (media.addAudio) {
              media.keepAudio = false;
              media.replaceAudio = false;
              media.removeAudio = false;
              media.audioSend = true;
              if (config.myStream && config.myStream.getAudioTracks() && config.myStream.getAudioTracks().length) {
                Janus.error("Can't add audio stream, there already is one");
                callbacks.error("Can't add audio stream, there already is one");
                return;
              }
            } else if (media.removeAudio) {
              media.keepAudio = false;
              media.replaceAudio = false;
              media.addAudio = false;
              media.audioSend = false;
            } else if (media.replaceAudio) {
              media.keepAudio = false;
              media.addAudio = false;
              media.removeAudio = false;
              media.audioSend = true;
            }
            if (!config.myStream) {
              // No media stream: if we were asked to replace, it's actually an "add"
              if (media.replaceAudio) {
                media.keepAudio = false;
                media.replaceAudio = false;
                media.addAudio = true;
                media.audioSend = true;
              }
              if (isAudioSendEnabled(media)) {
                media.keepAudio = false;
                media.addAudio = true;
              }
            } else {
              if (!config.myStream.getAudioTracks() || config.myStream.getAudioTracks().length === 0) {
                // No audio track: if we were asked to replace, it's actually an "add"
                if (media.replaceAudio) {
                  media.keepAudio = false;
                  media.replaceAudio = false;
                  media.addAudio = true;
                  media.audioSend = true;
                }
                if (isAudioSendEnabled(media)) {
                  media.keepAudio = false;
                  media.addAudio = true;
                }
              } else {
                // We have an audio track: should we keep it as it is?
                if (isAudioSendEnabled(media) && !media.removeAudio && !media.replaceAudio) {
                  media.keepAudio = true;
                }
              }
            }
            // Check if there are changes on video
            if (media.addVideo) {
              media.keepVideo = false;
              media.replaceVideo = false;
              media.removeVideo = false;
              media.videoSend = true;
              if (config.myStream && config.myStream.getVideoTracks() && config.myStream.getVideoTracks().length) {
                Janus.error("Can't add video stream, there already is one");
                callbacks.error("Can't add video stream, there already is one");
                return;
              }
            } else if (media.removeVideo) {
              media.keepVideo = false;
              media.replaceVideo = false;
              media.addVideo = false;
              media.videoSend = false;
            } else if (media.replaceVideo) {
              media.keepVideo = false;
              media.addVideo = false;
              media.removeVideo = false;
              media.videoSend = true;
            }
            if (!config.myStream) {
              // No media stream: if we were asked to replace, it's actually an "add"
              if (media.replaceVideo) {
                media.keepVideo = false;
                media.replaceVideo = false;
                media.addVideo = true;
                media.videoSend = true;
              }
              if (isVideoSendEnabled(media)) {
                media.keepVideo = false;
                media.addVideo = true;
              }
            } else {
              if (!config.myStream.getVideoTracks() || config.myStream.getVideoTracks().length === 0) {
                // No video track: if we were asked to replace, it's actually an "add"
                if (media.replaceVideo) {
                  media.keepVideo = false;
                  media.replaceVideo = false;
                  media.addVideo = true;
                  media.videoSend = true;
                }
                if (isVideoSendEnabled(media)) {
                  media.keepVideo = false;
                  media.addVideo = true;
                }
              } else {
                // We have a video track: should we keep it as it is?
                if (isVideoSendEnabled(media) && !media.removeVideo && !media.replaceVideo) {
                  media.keepVideo = true;
                }
              }
            }
            // Data channels can only be added
            if (media.addData) {
              media.data = true;
            }
          }
          // If we're updating and keeping all tracks, let's skip the getUserMedia part
          if (isAudioSendEnabled(media) && media.keepAudio && isVideoSendEnabled(media) && media.keepVideo) {
            pluginHandle.consentDialog(false);
            streamsDone(handleId, jsep, media, callbacks, config.myStream);
            return;
          }
        }
        // If we're updating, check if we need to remove/replace one of the tracks
        if (media.update && (!config.streamExternal || config.streamExternal && (media.replaceAudio || media.replaceVideo))) {
          if (media.removeAudio || media.replaceAudio) {
            if (config.myStream && config.myStream.getAudioTracks() && config.myStream.getAudioTracks().length) {
              var at = config.myStream.getAudioTracks()[0];
              Janus.log("Removing audio track:", at);
              config.myStream.removeTrack(at);
              try {
                at.stop();
              } catch (e) {}
            }
            if (config.pc.getSenders() && config.pc.getSenders().length) {
              var ra = true;
              if (media.replaceAudio && Janus.unifiedPlan) {
                // We can use replaceTrack
                ra = false;
              }
              if (ra) {
                for (var asnd of config.pc.getSenders()) {
                  if (asnd && asnd.track && asnd.track.kind === "audio") {
                    Janus.log("Removing audio sender:", asnd);
                    config.pc.removeTrack(asnd);
                  }
                }
              }
            }
          }
          if (media.removeVideo || media.replaceVideo) {
            if (config.myStream && config.myStream.getVideoTracks() && config.myStream.getVideoTracks().length) {
              var vt = config.myStream.getVideoTracks()[0];
              Janus.log("Removing video track:", vt);
              config.myStream.removeTrack(vt);
              try {
                vt.stop();
              } catch (e) {}
            }
            if (config.pc.getSenders() && config.pc.getSenders().length) {
              var rv = true;
              if (media.replaceVideo && Janus.unifiedPlan) {
                // We can use replaceTrack
                rv = false;
              }
              if (rv) {
                for (var vsnd of config.pc.getSenders()) {
                  if (vsnd && vsnd.track && vsnd.track.kind === "video") {
                    Janus.log("Removing video sender:", vsnd);
                    config.pc.removeTrack(vsnd);
                  }
                }
              }
            }
          }
        }
        // Was a MediaStream object passed, or do we need to take care of that?
        if (callbacks.stream) {
          var stream = callbacks.stream;
          Janus.log("MediaStream provided by the application");
          Janus.debug(stream);
          // If this is an update, let's check if we need to release the previous stream
          if (media.update && config.myStream && config.myStream !== callbacks.stream && !config.streamExternal && !media.replaceAudio && !media.replaceVideo) {
            // We're replacing a stream we captured ourselves with an external one
            Janus.stopAllTracks(config.myStream);
            config.myStream = null;
          }
          // Skip the getUserMedia part
          config.streamExternal = true;
          pluginHandle.consentDialog(false);
          streamsDone(handleId, jsep, media, callbacks, stream);
          return;
        }
        if (isAudioSendEnabled(media) || isVideoSendEnabled(media)) {
          if (!Janus.isGetUserMediaAvailable()) {
            callbacks.error("getUserMedia not available");
            return;
          }
          var constraints = {
            mandatory: {},
            optional: []
          };
          pluginHandle.consentDialog(true);
          var audioSupport = isAudioSendEnabled(media);
          if (audioSupport && media && typeof media.audio === 'object') audioSupport = media.audio;
          var videoSupport = isVideoSendEnabled(media);
          if (videoSupport && media) {
            var simulcast = callbacks.simulcast === true;
            var simulcast2 = callbacks.simulcast2 === true;
            if ((simulcast || simulcast2) && !jsep && !media.video) media.video = "hires";
            if (media.video && media.video != 'screen' && media.video != 'window') {
              if (typeof media.video === 'object') {
                videoSupport = media.video;
              } else {
                var width = 0;
                var height = 0;
                if (media.video === 'lowres') {
                  // Small resolution, 4:3
                  height = 240;
                  width = 320;
                } else if (media.video === 'lowres-16:9') {
                  // Small resolution, 16:9
                  height = 180;
                  width = 320;
                } else if (media.video === 'hires' || media.video === 'hires-16:9' || media.video === 'hdres') {
                  // High(HD) resolution is only 16:9
                  height = 720;
                  width = 1280;
                } else if (media.video === 'fhdres') {
                  // Full HD resolution is only 16:9
                  height = 1080;
                  width = 1920;
                } else if (media.video === '4kres') {
                  // 4K resolution is only 16:9
                  height = 2160;
                  width = 3840;
                } else if (media.video === 'stdres') {
                  // Normal resolution, 4:3
                  height = 480;
                  width = 640;
                } else if (media.video === 'stdres-16:9') {
                  // Normal resolution, 16:9
                  height = 360;
                  width = 640;
                } else {
                  Janus.log("Default video setting is stdres 4:3");
                  height = 480;
                  width = 640;
                }
                Janus.log("Adding media constraint:", media.video);
                videoSupport = {
                  'height': {
                    'ideal': height
                  },
                  'width': {
                    'ideal': width
                  }
                };
                Janus.log("Adding video constraint:", videoSupport);
              }
            } else if (media.video === 'screen' || media.video === 'window') {
              if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
                // The new experimental getDisplayMedia API is available, let's use that
                // https://groups.google.com/forum/#!topic/discuss-webrtc/Uf0SrR4uxzk
                // https://webrtchacks.com/chrome-screensharing-getdisplaymedia/
                constraints.video = {};
                if (media.screenshareFrameRate) {
                  constraints.video.frameRate = media.screenshareFrameRate;
                }
                if (media.screenshareHeight) {
                  constraints.video.height = media.screenshareHeight;
                }
                if (media.screenshareWidth) {
                  constraints.video.width = media.screenshareWidth;
                }
                constraints.audio = media.captureDesktopAudio;
                navigator.mediaDevices.getDisplayMedia(constraints).then(function (stream) {
                  pluginHandle.consentDialog(false);
                  if (isAudioSendEnabled(media) && !media.keepAudio) {
                    navigator.mediaDevices.getUserMedia({
                      audio: true,
                      video: false
                    }).then(function (audioStream) {
                      stream.addTrack(audioStream.getAudioTracks()[0]);
                      streamsDone(handleId, jsep, media, callbacks, stream);
                    });
                  } else {
                    streamsDone(handleId, jsep, media, callbacks, stream);
                  }
                }, function (error) {
                  pluginHandle.consentDialog(false);
                  callbacks.error(error);
                });
                return;
              }
              // We're going to try and use the extension for Chrome 34+, the old approach
              // for older versions of Chrome, or the experimental support in Firefox 33+
              const callbackUserMedia = function (error, stream) {
                pluginHandle.consentDialog(false);
                if (error) {
                  callbacks.error(error);
                } else {
                  streamsDone(handleId, jsep, media, callbacks, stream);
                }
              };
              const getScreenMedia = function (constraints, gsmCallback, useAudio) {
                Janus.log("Adding media constraint (screen capture)");
                Janus.debug(constraints);
                navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
                  if (useAudio) {
                    navigator.mediaDevices.getUserMedia({
                      audio: true,
                      video: false
                    }).then(function (audioStream) {
                      stream.addTrack(audioStream.getAudioTracks()[0]);
                      gsmCallback(null, stream);
                    });
                  } else {
                    gsmCallback(null, stream);
                  }
                }).catch(function (error) {
                  pluginHandle.consentDialog(false);
                  gsmCallback(error);
                });
              };
              if (Janus.webRTCAdapter.browserDetails.browser === 'chrome') {
                var chromever = Janus.webRTCAdapter.browserDetails.version;
                var maxver = 33;
                if (window.navigator.userAgent.match('Linux')) maxver = 35; // "known" crash in chrome 34 and 35 on linux
                if (chromever >= 26 && chromever <= maxver) {
                  // Chrome 26->33 requires some awkward chrome://flags manipulation
                  constraints = {
                    video: {
                      mandatory: {
                        googLeakyBucket: true,
                        maxWidth: window.screen.width,
                        maxHeight: window.screen.height,
                        minFrameRate: media.screenshareFrameRate,
                        maxFrameRate: media.screenshareFrameRate,
                        chromeMediaSource: 'screen'
                      }
                    },
                    audio: isAudioSendEnabled(media) && !media.keepAudio
                  };
                  getScreenMedia(constraints, callbackUserMedia);
                } else {
                  // Chrome 34+ requires an extension
                  Janus.extension.getScreen(function (error, sourceId) {
                    if (error) {
                      pluginHandle.consentDialog(false);
                      return callbacks.error(error);
                    }
                    constraints = {
                      audio: false,
                      video: {
                        mandatory: {
                          chromeMediaSource: 'desktop',
                          maxWidth: window.screen.width,
                          maxHeight: window.screen.height,
                          minFrameRate: media.screenshareFrameRate,
                          maxFrameRate: media.screenshareFrameRate
                        },
                        optional: [{
                          googLeakyBucket: true
                        }, {
                          googTemporalLayeredScreencast: true
                        }]
                      }
                    };
                    constraints.video.mandatory.chromeMediaSourceId = sourceId;
                    getScreenMedia(constraints, callbackUserMedia, isAudioSendEnabled(media) && !media.keepAudio);
                  });
                }
              } else if (Janus.webRTCAdapter.browserDetails.browser === 'firefox') {
                if (Janus.webRTCAdapter.browserDetails.version >= 33) {
                  // Firefox 33+ has experimental support for screen sharing
                  constraints = {
                    video: {
                      mozMediaSource: media.video,
                      mediaSource: media.video
                    },
                    audio: isAudioSendEnabled(media) && !media.keepAudio
                  };
                  getScreenMedia(constraints, function (err, stream) {
                    callbackUserMedia(err, stream);
                    // Workaround for https://bugzilla.mozilla.org/show_bug.cgi?id=1045810
                    if (!err) {
                      var lastTime = stream.currentTime;
                      var polly = window.setInterval(function () {
                        if (!stream) window.clearInterval(polly);
                        if (stream.currentTime == lastTime) {
                          window.clearInterval(polly);
                          if (stream.onended) {
                            stream.onended();
                          }
                        }
                        lastTime = stream.currentTime;
                      }, 500);
                    }
                  });
                } else {
                  var error = new Error('NavigatorUserMediaError');
                  error.name = 'Your version of Firefox does not support screen sharing, please install Firefox 33 (or more recent versions)';
                  pluginHandle.consentDialog(false);
                  callbacks.error(error);
                  return;
                }
              }
              return;
            }
          }
          // If we got here, we're not screensharing
          if (!media || media.video !== 'screen') {
            // Check whether all media sources are actually available or not
            navigator.mediaDevices.enumerateDevices().then(function (devices) {
              var audioExist = devices.some(function (device) {
                  return device.kind === 'audioinput';
                }),
                videoExist = isScreenSendEnabled(media) || devices.some(function (device) {
                  return device.kind === 'videoinput';
                });

              // Check whether a missing device is really a problem
              var audioSend = isAudioSendEnabled(media);
              var videoSend = isVideoSendEnabled(media);
              var needAudioDevice = isAudioSendRequired(media);
              var needVideoDevice = isVideoSendRequired(media);
              if (audioSend || videoSend || needAudioDevice || needVideoDevice) {
                // We need to send either audio or video
                var haveAudioDevice = audioSend ? audioExist : false;
                var haveVideoDevice = videoSend ? videoExist : false;
                if (!haveAudioDevice && !haveVideoDevice) {
                  // FIXME Should we really give up, or just assume recvonly for both?
                  pluginHandle.consentDialog(false);
                  callbacks.error('No capture device found'); // TODO 钉钉 音频接听 会在这里终止
                  return false;
                } else if (!haveAudioDevice && needAudioDevice) {
                  pluginHandle.consentDialog(false);
                  callbacks.error('Audio capture is required, but no capture device found');
                  return false;
                } else if (!haveVideoDevice && needVideoDevice) {
                  pluginHandle.consentDialog(false);
                  callbacks.error('Video capture is required, but no capture device found');
                  return false;
                }
              }
              var gumConstraints = {
                audio: audioExist && !media.keepAudio ? audioSupport : false,
                video: videoExist && !media.keepVideo ? videoSupport : false
              };
              Janus.debug("getUserMedia constraints", gumConstraints);
              if (!gumConstraints.audio && !gumConstraints.video) {
                pluginHandle.consentDialog(false);
                streamsDone(handleId, jsep, media, callbacks, stream);
              } else {
                console.log("gumConstraints", gumConstraints); //
                navigator.mediaDevices.getUserMedia(gumConstraints).then(function (stream) {
                  pluginHandle.consentDialog(false);
                  streamsDone(handleId, jsep, media, callbacks, stream);
                }).catch(function (error) {
                  // TODO 在 钉钉开发版 中会触发这里 {code: 0, name: 'NotReadableError', message: 'Could not start audio source'}
                  console.error("getUserMedia() fail.", error);
                  pluginHandle.consentDialog(false);
                  callbacks.error({
                    code: error.code,
                    name: error.name,
                    message: error.message
                  });
                });
              }
            }).catch(function (error) {
              console.error("enumerateDevices() fail.", error);
              pluginHandle.consentDialog(false);
              callbacks.error(error);
            });
          }
        } else {
          // No need to do a getUserMedia, create offer/answer right away
          streamsDone(handleId, jsep, media, callbacks);
        }
      }
      function prepareWebrtcPeer(handleId, callbacks) {
        callbacks = callbacks || {};
        callbacks.success = typeof callbacks.success == "function" ? callbacks.success : Janus.noop;
        callbacks.error = typeof callbacks.error == "function" ? callbacks.error : webrtcError;
        callbacks.customizeSdp = typeof callbacks.customizeSdp == "function" ? callbacks.customizeSdp : Janus.noop;
        var jsep = callbacks.jsep;
        var pluginHandle = pluginHandles[handleId];
        if (!pluginHandle || !pluginHandle.webrtcStuff) {
          Janus.warn("Invalid handle");
          callbacks.error("Invalid handle");
          return;
        }
        var config = pluginHandle.webrtcStuff;
        if (jsep) {
          if (!config.pc) {
            Janus.warn("Wait, no PeerConnection?? if this is an answer, use createAnswer and not handleRemoteJsep");
            callbacks.error("No PeerConnection: if this is an answer, use createAnswer and not handleRemoteJsep");
            return;
          }
          callbacks.customizeSdp(jsep);
          config.pc.setRemoteDescription(jsep).then(function () {
            Janus.log("Remote description accepted!");
            config.remoteSdp = jsep.sdp;
            // Any trickle candidate we cached?
            if (config.candidates && config.candidates.length > 0) {
              for (var i = 0; i < config.candidates.length; i++) {
                var candidate = config.candidates[i];
                Janus.debug("Adding remote candidate:", candidate);
                if (!candidate || candidate.completed === true) {
                  // end-of-candidates
                  config.pc.addIceCandidate(Janus.endOfCandidates);
                } else {
                  // New candidate
                  config.pc.addIceCandidate(candidate);
                }
              }
              config.candidates = [];
            }
            // Done
            callbacks.success();
          }, callbacks.error);
        } else {
          callbacks.error("Invalid JSEP");
        }
      }
      function createOffer(handleId, media, callbacks) {
        callbacks = callbacks || {};
        callbacks.success = typeof callbacks.success == "function" ? callbacks.success : Janus.noop;
        callbacks.error = typeof callbacks.error == "function" ? callbacks.error : Janus.noop;
        callbacks.customizeSdp = typeof callbacks.customizeSdp == "function" ? callbacks.customizeSdp : Janus.noop;
        var pluginHandle = pluginHandles[handleId];
        if (!pluginHandle || !pluginHandle.webrtcStuff) {
          Janus.warn("Invalid handle");
          callbacks.error("Invalid handle");
          return;
        }
        var config = pluginHandle.webrtcStuff;
        var simulcast = callbacks.simulcast === true;
        if (!simulcast) {
          Janus.log("Creating offer (iceDone=" + config.iceDone + ")");
        } else {
          Janus.log("Creating offer (iceDone=" + config.iceDone + ", simulcast=" + simulcast + ")");
        }
        // https://code.google.com/p/webrtc/issues/detail?id=3508
        var mediaConstraints = {};
        if (Janus.unifiedPlan) {
          // We can use Transceivers
          var audioTransceiver = null,
            videoTransceiver = null;
          var transceivers = config.pc.getTransceivers();
          if (transceivers && transceivers.length > 0) {
            for (var t of transceivers) {
              if (t.sender && t.sender.track && t.sender.track.kind === "audio" || t.receiver && t.receiver.track && t.receiver.track.kind === "audio") {
                if (!audioTransceiver) {
                  audioTransceiver = t;
                }
                continue;
              }
              if (t.sender && t.sender.track && t.sender.track.kind === "video" || t.receiver && t.receiver.track && t.receiver.track.kind === "video") {
                if (!videoTransceiver) {
                  videoTransceiver = t;
                }
                continue;
              }
            }
          }
          // Handle audio (and related changes, if any)
          var audioSend = isAudioSendEnabled(media);
          var audioRecv = isAudioRecvEnabled(media);
          if (!audioSend && !audioRecv) {
            // Audio disabled: have we removed it?
            if (media.removeAudio && audioTransceiver) {
              if (audioTransceiver.setDirection) {
                audioTransceiver.setDirection("inactive");
              } else {
                audioTransceiver.direction = "inactive";
              }
              Janus.log("Setting audio transceiver to inactive:", audioTransceiver);
            }
          } else {
            // Take care of audio m-line
            if (audioSend && audioRecv) {
              if (audioTransceiver) {
                if (audioTransceiver.setDirection) {
                  audioTransceiver.setDirection("sendrecv");
                } else {
                  audioTransceiver.direction = "sendrecv";
                }
                Janus.log("Setting audio transceiver to sendrecv:", audioTransceiver);
              }
            } else if (audioSend && !audioRecv) {
              if (audioTransceiver) {
                if (audioTransceiver.setDirection) {
                  audioTransceiver.setDirection("sendonly");
                } else {
                  audioTransceiver.direction = "sendonly";
                }
                Janus.log("Setting audio transceiver to sendonly:", audioTransceiver);
              }
            } else if (!audioSend && audioRecv) {
              if (audioTransceiver) {
                if (audioTransceiver.setDirection) {
                  audioTransceiver.setDirection("recvonly");
                } else {
                  audioTransceiver.direction = "recvonly";
                }
                Janus.log("Setting audio transceiver to recvonly:", audioTransceiver);
              } else {
                // In theory, this is the only case where we might not have a transceiver yet
                audioTransceiver = config.pc.addTransceiver("audio", {
                  direction: "recvonly"
                });
                Janus.log("Adding recvonly audio transceiver:", audioTransceiver);
              }
            }
          }
          // Handle video (and related changes, if any)
          var videoSend = isVideoSendEnabled(media);
          var videoRecv = isVideoRecvEnabled(media);
          if (!videoSend && !videoRecv) {
            // Video disabled: have we removed it?
            if (media.removeVideo && videoTransceiver) {
              if (videoTransceiver.setDirection) {
                videoTransceiver.setDirection("inactive");
              } else {
                videoTransceiver.direction = "inactive";
              }
              Janus.log("Setting video transceiver to inactive:", videoTransceiver);
            }
          } else {
            // Take care of video m-line
            if (videoSend && videoRecv) {
              if (videoTransceiver) {
                if (videoTransceiver.setDirection) {
                  videoTransceiver.setDirection("sendrecv");
                } else {
                  videoTransceiver.direction = "sendrecv";
                }
                Janus.log("Setting video transceiver to sendrecv:", videoTransceiver);
              }
            } else if (videoSend && !videoRecv) {
              if (videoTransceiver) {
                if (videoTransceiver.setDirection) {
                  videoTransceiver.setDirection("sendonly");
                } else {
                  videoTransceiver.direction = "sendonly";
                }
                Janus.log("Setting video transceiver to sendonly:", videoTransceiver);
              }
            } else if (!videoSend && videoRecv) {
              if (videoTransceiver) {
                if (videoTransceiver.setDirection) {
                  videoTransceiver.setDirection("recvonly");
                } else {
                  videoTransceiver.direction = "recvonly";
                }
                Janus.log("Setting video transceiver to recvonly:", videoTransceiver);
              } else {
                // In theory, this is the only case where we might not have a transceiver yet
                videoTransceiver = config.pc.addTransceiver("video", {
                  direction: "recvonly"
                });
                Janus.log("Adding recvonly video transceiver:", videoTransceiver);
              }
            }
          }
          // 给 SDP 信息中增加 video 参数
          mediaConstraints["offerToReceiveVideo"] = isVideoRecvEnabled(media);
        } else {
          mediaConstraints["offerToReceiveAudio"] = isAudioRecvEnabled(media);
          mediaConstraints["offerToReceiveVideo"] = isVideoRecvEnabled(media);
        }
        var iceRestart = callbacks.iceRestart === true;
        if (iceRestart) {
          mediaConstraints["iceRestart"] = true;
        }
        Janus.debug(mediaConstraints);
        // Check if this is Firefox and we've been asked to do simulcasting
        var sendVideo = isVideoSendEnabled(media);
        if (sendVideo && simulcast && Janus.webRTCAdapter.browserDetails.browser === "firefox") {
          // FIXME Based on https://gist.github.com/voluntas/088bc3cc62094730647b
          Janus.log("Enabling Simulcasting for Firefox (RID)");
          var sender = config.pc.getSenders().find(function (s) {
            return s.track && s.track.kind === "video";
          });
          if (sender) {
            var parameters = sender.getParameters();
            if (!parameters) {
              parameters = {};
            }
            var maxBitrates = getMaxBitrates(callbacks.simulcastMaxBitrates);
            parameters.encodings = callbacks.sendEncodings || [{
              rid: "h",
              active: true,
              maxBitrate: maxBitrates.high
            }, {
              rid: "m",
              active: true,
              maxBitrate: maxBitrates.medium,
              scaleResolutionDownBy: 2
            }, {
              rid: "l",
              active: true,
              maxBitrate: maxBitrates.low,
              scaleResolutionDownBy: 4
            }];
            sender.setParameters(parameters);
          }
        }
        config.pc.createOffer(mediaConstraints).then(function (offer) {
          Janus.debug(offer);
          // JSON.stringify doesn't work on some WebRTC objects anymore
          // See https://code.google.com/p/chromium/issues/detail?id=467366
          var jsep = {
            "type": offer.type,
            "sdp": offer.sdp
          };
          callbacks.customizeSdp(jsep);
          offer.sdp = jsep.sdp;
          Janus.log("Setting local description");
          if (sendVideo && simulcast) {
            // This SDP munging only works with Chrome (Safari STP may support it too)
            if (Janus.webRTCAdapter.browserDetails.browser === "chrome" || Janus.webRTCAdapter.browserDetails.browser === "safari") {
              Janus.log("Enabling Simulcasting for Chrome (SDP munging)");
              offer.sdp = mungeSdpForSimulcasting(offer.sdp);
            } else if (Janus.webRTCAdapter.browserDetails.browser !== "firefox") {
              Janus.warn("simulcast=true, but this is not Chrome nor Firefox, ignoring");
            }
          }
          config.mySdp = {
            type: "offer",
            sdp: offer.sdp
          };
          config.pc.setLocalDescription(offer).catch(callbacks.error);
          config.mediaConstraints = mediaConstraints;
          if (!config.iceDone && !config.trickle) {
            // Don't do anything until we have all candidates
            Janus.log("Waiting for all candidates...");
            return;
          }
          // If transforms are present, notify Janus that the media is end-to-end encrypted
          if (config.senderTransforms || config.receiverTransforms) {
            offer["e2ee"] = true;
          }
          callbacks.success(offer);
        }, callbacks.error);
      }
      function createAnswer(handleId, media, callbacks) {
        callbacks = callbacks || {};
        callbacks.success = typeof callbacks.success == "function" ? callbacks.success : Janus.noop;
        callbacks.error = typeof callbacks.error == "function" ? callbacks.error : Janus.noop;
        callbacks.customizeSdp = typeof callbacks.customizeSdp == "function" ? callbacks.customizeSdp : Janus.noop;
        var pluginHandle = pluginHandles[handleId];
        if (!pluginHandle || !pluginHandle.webrtcStuff) {
          Janus.warn("Invalid handle");
          callbacks.error("Invalid handle");
          return;
        }
        var config = pluginHandle.webrtcStuff;
        var simulcast = callbacks.simulcast === true;
        if (!simulcast) {
          Janus.log("Creating answer (iceDone=" + config.iceDone + ")");
        } else {
          Janus.log("Creating answer (iceDone=" + config.iceDone + ", simulcast=" + simulcast + ")");
        }
        var mediaConstraints = null;
        if (Janus.unifiedPlan) {
          // We can use Transceivers
          mediaConstraints = {};
          var audioTransceiver = null,
            videoTransceiver = null;
          var transceivers = config.pc.getTransceivers();
          if (transceivers && transceivers.length > 0) {
            for (var t of transceivers) {
              if (t.sender && t.sender.track && t.sender.track.kind === "audio" || t.receiver && t.receiver.track && t.receiver.track.kind === "audio") {
                if (!audioTransceiver) audioTransceiver = t;
                continue;
              }
              if (t.sender && t.sender.track && t.sender.track.kind === "video" || t.receiver && t.receiver.track && t.receiver.track.kind === "video") {
                if (!videoTransceiver) videoTransceiver = t;
                continue;
              }
            }
          }
          // Handle audio (and related changes, if any)
          var audioSend = isAudioSendEnabled(media);
          var audioRecv = isAudioRecvEnabled(media);
          if (!audioSend && !audioRecv) {
            // Audio disabled: have we removed it?
            if (media.removeAudio && audioTransceiver) {
              try {
                if (audioTransceiver.setDirection) {
                  audioTransceiver.setDirection("inactive");
                } else {
                  audioTransceiver.direction = "inactive";
                }
                Janus.log("Setting audio transceiver to inactive:", audioTransceiver);
              } catch (e) {
                Janus.error(e);
              }
            }
          } else {
            // Take care of audio m-line
            if (audioSend && audioRecv) {
              if (audioTransceiver) {
                try {
                  if (audioTransceiver.setDirection) {
                    audioTransceiver.setDirection("sendrecv");
                  } else {
                    audioTransceiver.direction = "sendrecv";
                  }
                  Janus.log("Setting audio transceiver to sendrecv:", audioTransceiver);
                } catch (e) {
                  Janus.error(e);
                }
              }
            } else if (audioSend && !audioRecv) {
              try {
                if (audioTransceiver) {
                  if (audioTransceiver.setDirection) {
                    audioTransceiver.setDirection("sendonly");
                  } else {
                    audioTransceiver.direction = "sendonly";
                  }
                  Janus.log("Setting audio transceiver to sendonly:", audioTransceiver);
                }
              } catch (e) {
                Janus.error(e);
              }
            } else if (!audioSend && audioRecv) {
              if (audioTransceiver) {
                try {
                  if (audioTransceiver.setDirection) {
                    audioTransceiver.setDirection("recvonly");
                  } else {
                    audioTransceiver.direction = "recvonly";
                  }
                  Janus.log("Setting audio transceiver to recvonly:", audioTransceiver);
                } catch (e) {
                  Janus.error(e);
                }
              } else {
                // In theory, this is the only case where we might not have a transceiver yet
                audioTransceiver = config.pc.addTransceiver("audio", {
                  direction: "recvonly"
                });
                Janus.log("Adding recvonly audio transceiver:", audioTransceiver);
              }
            }
          }
          // Handle video (and related changes, if any)
          var videoSend = isVideoSendEnabled(media);
          var videoRecv = isVideoRecvEnabled(media);
          if (!videoSend && !videoRecv) {
            // Video disabled: have we removed it?
            if (media.removeVideo && videoTransceiver) {
              try {
                if (videoTransceiver.setDirection) {
                  videoTransceiver.setDirection("inactive");
                } else {
                  videoTransceiver.direction = "inactive";
                }
                Janus.log("Setting video transceiver to inactive:", videoTransceiver);
              } catch (e) {
                Janus.error(e);
              }
            }
          } else {
            // Take care of video m-line
            if (videoSend && videoRecv) {
              if (videoTransceiver) {
                try {
                  if (videoTransceiver.setDirection) {
                    videoTransceiver.setDirection("sendrecv");
                  } else {
                    videoTransceiver.direction = "sendrecv";
                  }
                  Janus.log("Setting video transceiver to sendrecv:", videoTransceiver);
                } catch (e) {
                  Janus.error(e);
                }
              }
            } else if (videoSend && !videoRecv) {
              if (videoTransceiver) {
                try {
                  if (videoTransceiver.setDirection) {
                    videoTransceiver.setDirection("sendonly");
                  } else {
                    videoTransceiver.direction = "sendonly";
                  }
                  Janus.log("Setting video transceiver to sendonly:", videoTransceiver);
                } catch (e) {
                  Janus.error(e);
                }
              }
            } else if (!videoSend && videoRecv) {
              if (videoTransceiver) {
                try {
                  if (videoTransceiver.setDirection) {
                    videoTransceiver.setDirection("recvonly");
                  } else {
                    videoTransceiver.direction = "recvonly";
                  }
                  Janus.log("Setting video transceiver to recvonly:", videoTransceiver);
                } catch (e) {
                  Janus.error(e);
                }
              } else {
                // In theory, this is the only case where we might not have a transceiver yet
                videoTransceiver = config.pc.addTransceiver("video", {
                  direction: "recvonly"
                });
                Janus.log("Adding recvonly video transceiver:", videoTransceiver);
              }
            }
          }
        } else {
          if (Janus.webRTCAdapter.browserDetails.browser === "firefox" || Janus.webRTCAdapter.browserDetails.browser === "edge") {
            mediaConstraints = {
              offerToReceiveAudio: isAudioRecvEnabled(media),
              offerToReceiveVideo: isVideoRecvEnabled(media)
            };
          } else {
            mediaConstraints = {
              mandatory: {
                OfferToReceiveAudio: isAudioRecvEnabled(media),
                OfferToReceiveVideo: isVideoRecvEnabled(media)
              }
            };
          }
        }
        Janus.debug(mediaConstraints);
        // Check if this is Firefox and we've been asked to do simulcasting
        var sendVideo = isVideoSendEnabled(media);
        if (sendVideo && simulcast && Janus.webRTCAdapter.browserDetails.browser === "firefox") {
          // FIXME Based on https://gist.github.com/voluntas/088bc3cc62094730647b
          Janus.log("Enabling Simulcasting for Firefox (RID)");
          var sender = config.pc.getSenders()[1];
          Janus.log(sender);
          var parameters = sender.getParameters();
          Janus.log(parameters);
          var maxBitrates = getMaxBitrates(callbacks.simulcastMaxBitrates);
          sender.setParameters({
            encodings: callbacks.sendEncodings || [{
              rid: "h",
              active: true,
              maxBitrate: maxBitrates.high
            }, {
              rid: "m",
              active: true,
              maxBitrate: maxBitrates.medium,
              scaleResolutionDownBy: 2
            }, {
              rid: "l",
              active: true,
              maxBitrate: maxBitrates.low,
              scaleResolutionDownBy: 4
            }]
          });
        }
        config.pc.createAnswer(mediaConstraints).then(function (answer) {
          Janus.debug(answer);
          // JSON.stringify doesn't work on some WebRTC objects anymore
          // See https://code.google.com/p/chromium/issues/detail?id=467366
          var jsep = {
            "type": answer.type,
            "sdp": answer.sdp
          };
          callbacks.customizeSdp(jsep);
          answer.sdp = jsep.sdp;
          Janus.log("Setting local description");
          if (sendVideo && simulcast) {
            // This SDP munging only works with Chrome
            if (Janus.webRTCAdapter.browserDetails.browser === "chrome") {
              // FIXME Apparently trying to simulcast when answering breaks video in Chrome...
              //~ Janus.log("Enabling Simulcasting for Chrome (SDP munging)");
              //~ answer.sdp = mungeSdpForSimulcasting(answer.sdp);
              Janus.warn("simulcast=true, but this is an answer, and video breaks in Chrome if we enable it");
            } else if (Janus.webRTCAdapter.browserDetails.browser !== "firefox") {
              Janus.warn("simulcast=true, but this is not Chrome nor Firefox, ignoring");
            }
          }
          config.mySdp = {
            type: "answer",
            sdp: answer.sdp
          };
          config.pc.setLocalDescription(answer).catch(callbacks.error);
          config.mediaConstraints = mediaConstraints;
          if (!config.iceDone && !config.trickle) {
            // Don't do anything until we have all candidates
            Janus.log("Waiting for all candidates...");
            return;
          }
          // If transforms are present, notify Janus that the media is end-to-end encrypted
          if (config.senderTransforms || config.receiverTransforms) {
            answer["e2ee"] = true;
          }
          callbacks.success(answer);
        }, callbacks.error);
      }
      function sendSDP(handleId, callbacks) {
        callbacks = callbacks || {};
        callbacks.success = typeof callbacks.success == "function" ? callbacks.success : Janus.noop;
        callbacks.error = typeof callbacks.error == "function" ? callbacks.error : Janus.noop;
        var pluginHandle = pluginHandles[handleId];
        if (!pluginHandle || !pluginHandle.webrtcStuff) {
          Janus.warn("Invalid handle, not sending anything");
          return;
        }
        var config = pluginHandle.webrtcStuff;
        Janus.log("Sending offer/answer SDP...");
        if (!config.mySdp) {
          Janus.warn("Local SDP instance is invalid, not sending anything...");
          return;
        }
        config.mySdp = {
          "type": config.pc.localDescription.type,
          "sdp": config.pc.localDescription.sdp
        };
        if (config.trickle === false) config.mySdp["trickle"] = false;
        Janus.debug(callbacks);
        config.sdpSent = true;
        callbacks.success(config.mySdp);
      }
      function getVolume(handleId, remote) {
        var pluginHandle = pluginHandles[handleId];
        if (!pluginHandle || !pluginHandle.webrtcStuff) {
          Janus.warn("Invalid handle");
          return 0;
        }
        var stream = remote ? "remote" : "local";
        var config = pluginHandle.webrtcStuff;
        if (!config.volume[stream]) config.volume[stream] = {
          value: 0
        };
        // Start getting the volume, if audioLevel in getStats is supported (apparently
        // they're only available in Chrome/Safari right now: https://webrtc-stats.callstats.io/)
        if (config.pc.getStats && (Janus.webRTCAdapter.browserDetails.browser === "chrome" || Janus.webRTCAdapter.browserDetails.browser === "safari")) {
          if (remote && !config.remoteStream) {
            Janus.warn("Remote stream unavailable");
            return 0;
          } else if (!remote && !config.myStream) {
            Janus.warn("Local stream unavailable");
            return 0;
          }
          if (!config.volume[stream].timer) {
            Janus.log("Starting " + stream + " volume monitor");
            config.volume[stream].timer = setInterval(function () {
              config.pc.getStats().then(function (stats) {
                stats.forEach(function (res) {
                  if (!res || res.kind !== "audio") return;
                  if (remote && !res.remoteSource || !remote && res.type !== "media-source") return;
                  config.volume[stream].value = res.audioLevel ? res.audioLevel : 0;
                });
              });
            }, 200);
            return 0; // We don't have a volume to return yet
          }

          return config.volume[stream].value;
        } else {
          // audioInputLevel and audioOutputLevel seem only available in Chrome? audioLevel
          // seems to be available on Chrome and Firefox, but they don't seem to work
          Janus.warn("Getting the " + stream + " volume unsupported by browser");
          return 0;
        }
      }
      function isMuted(handleId, video) {
        var pluginHandle = pluginHandles[handleId];
        if (!pluginHandle || !pluginHandle.webrtcStuff) {
          Janus.warn("Invalid handle");
          return true;
        }
        var config = pluginHandle.webrtcStuff;
        if (!config.pc) {
          Janus.warn("Invalid PeerConnection");
          return true;
        }
        if (!config.myStream) {
          Janus.warn("Invalid local MediaStream");
          return true;
        }
        if (video) {
          // Check video track
          if (!config.myStream.getVideoTracks() || config.myStream.getVideoTracks().length === 0) {
            Janus.warn("No video track");
            return true;
          }
          return !config.myStream.getVideoTracks()[0].enabled;
        } else {
          // Check audio track
          if (!config.myStream.getAudioTracks() || config.myStream.getAudioTracks().length === 0) {
            Janus.warn("No audio track");
            return true;
          }
          return !config.myStream.getAudioTracks()[0].enabled;
        }
      }
      function mute(handleId, video, mute) {
        var pluginHandle = pluginHandles[handleId];
        if (!pluginHandle || !pluginHandle.webrtcStuff) {
          Janus.warn("Invalid handle");
          return false;
        }
        var config = pluginHandle.webrtcStuff;
        if (!config.pc) {
          Janus.warn("Invalid PeerConnection");
          return false;
        }
        if (!config.myStream) {
          Janus.warn("Invalid local MediaStream");
          return false;
        }
        if (video) {
          // Mute/unmute video track
          if (!config.myStream.getVideoTracks() || config.myStream.getVideoTracks().length === 0) {
            Janus.warn("No video track");
            return false;
          }
          config.myStream.getVideoTracks()[0].enabled = !mute;
          return true;
        } else {
          // Mute/unmute audio track
          if (!config.myStream.getAudioTracks() || config.myStream.getAudioTracks().length === 0) {
            Janus.warn("No audio track");
            return false;
          }
          config.myStream.getAudioTracks()[0].enabled = !mute;
          return true;
        }
      }
      function getBitrate(handleId) {
        var pluginHandle = pluginHandles[handleId];
        if (!pluginHandle || !pluginHandle.webrtcStuff) {
          Janus.warn("Invalid handle");
          return "Invalid handle";
        }
        var config = pluginHandle.webrtcStuff;
        if (!config.pc) return "Invalid PeerConnection";
        // Start getting the bitrate, if getStats is supported
        if (config.pc.getStats) {
          if (!config.bitrate.timer) {
            Janus.log("Starting bitrate timer (via getStats)");
            config.bitrate.timer = setInterval(function () {
              config.pc.getStats().then(function (stats) {
                stats.forEach(function (res) {
                  if (!res) return;
                  var inStats = false;
                  // Check if these are statistics on incoming media
                  if ((res.mediaType === "video" || res.id.toLowerCase().indexOf("video") > -1) && res.type === "inbound-rtp" && res.id.indexOf("rtcp") < 0) {
                    // New stats
                    inStats = true;
                  } else if (res.type == 'ssrc' && res.bytesReceived && (res.googCodecName === "VP8" || res.googCodecName === "")) {
                    // Older Chromer versions
                    inStats = true;
                  }
                  // Parse stats now
                  if (inStats) {
                    config.bitrate.bsnow = res.bytesReceived;
                    config.bitrate.tsnow = res.timestamp;
                    if (config.bitrate.bsbefore === null || config.bitrate.tsbefore === null) {
                      // Skip this round
                      config.bitrate.bsbefore = config.bitrate.bsnow;
                      config.bitrate.tsbefore = config.bitrate.tsnow;
                    } else {
                      // Calculate bitrate
                      var timePassed = config.bitrate.tsnow - config.bitrate.tsbefore;
                      if (Janus.webRTCAdapter.browserDetails.browser === "safari") timePassed = timePassed / 1000; // Apparently the timestamp is in microseconds, in Safari
                      var bitRate = Math.round((config.bitrate.bsnow - config.bitrate.bsbefore) * 8 / timePassed);
                      if (Janus.webRTCAdapter.browserDetails.browser === "safari") bitRate = parseInt(bitRate / 1000);
                      config.bitrate.value = bitRate + ' kbits/sec';
                      //~ Janus.log("Estimated bitrate is " + config.bitrate.value);
                      config.bitrate.bsbefore = config.bitrate.bsnow;
                      config.bitrate.tsbefore = config.bitrate.tsnow;
                    }
                  }
                });
              });
            }, 1000);
            return "0 kbits/sec"; // We don't have a bitrate value yet
          }

          return config.bitrate.value;
        } else {
          Janus.warn("Getting the video bitrate unsupported by browser");
          return "Feature unsupported by browser";
        }
      }
      function webrtcError(error) {
        Janus.error("WebRTC error:", error);
      }
      function cleanupWebrtc(handleId, hangupRequest) {
        Janus.log("Cleaning WebRTC stuff");
        var pluginHandle = pluginHandles[handleId];
        if (!pluginHandle) {
          // Nothing to clean
          return;
        }
        var config = pluginHandle.webrtcStuff;
        if (config) {
          if (hangupRequest === true) {
            // Send a hangup request (we don't really care about the response)
            var request = {
              "janus": "hangup",
              "transaction": Janus.randomString(12)
            };
            if (pluginHandle.token) request["token"] = pluginHandle.token;
            if (apisecret) request["apisecret"] = apisecret;
            Janus.debug("Sending hangup request (handle=" + handleId + "):");
            Janus.debug(request);
            if (websockets) {
              request["session_id"] = sessionId;
              request["handle_id"] = handleId;
              ws.send(JSON.stringify(request));
            } else {
              Janus.httpAPICall(server + "/" + sessionId + "/" + handleId, {
                verb: 'POST',
                withCredentials: withCredentials,
                body: request
              });
            }
          }
          // Cleanup stack
          config.remoteStream = null;
          if (config.volume) {
            if (config.volume["local"] && config.volume["local"].timer) clearInterval(config.volume["local"].timer);
            if (config.volume["remote"] && config.volume["remote"].timer) clearInterval(config.volume["remote"].timer);
          }
          config.volume = {};
          if (config.bitrate.timer) clearInterval(config.bitrate.timer);
          config.bitrate.timer = null;
          config.bitrate.bsnow = null;
          config.bitrate.bsbefore = null;
          config.bitrate.tsnow = null;
          config.bitrate.tsbefore = null;
          config.bitrate.value = null;
          if (!config.streamExternal && config.myStream) {
            Janus.log("Stopping local stream tracks");
            Janus.stopAllTracks(config.myStream);
          }
          config.streamExternal = false;
          config.myStream = null;
          // Close PeerConnection
          try {
            config.pc.close();
          } catch (e) {
            // Do nothing
          }
          config.pc = null;
          config.candidates = null;
          config.mySdp = null;
          config.remoteSdp = null;
          config.iceDone = false;
          config.dataChannel = {};
          config.dtmfSender = null;
          config.senderTransforms = null;
          config.receiverTransforms = null;
        }
        pluginHandle.oncleanup();
      }

      // Helper method to munge an SDP to enable simulcasting (Chrome only)
      function mungeSdpForSimulcasting(sdp) {
        // Let's munge the SDP to add the attributes for enabling simulcasting
        // (based on https://gist.github.com/ggarber/a19b4c33510028b9c657)
        var lines = sdp.split("\r\n");
        var video = false;
        var ssrc = [-1],
          ssrc_fid = [-1];
        var cname = null,
          msid = null,
          mslabel = null,
          label = null;
        var insertAt = -1;
        for (let i = 0; i < lines.length; i++) {
          const mline = lines[i].match(/m=(\w+) */);
          if (mline) {
            const medium = mline[1];
            if (medium === "video") {
              // New video m-line: make sure it's the first one
              if (ssrc[0] < 0) {
                video = true;
              } else {
                // We're done, let's add the new attributes here
                insertAt = i;
                break;
              }
            } else {
              // New non-video m-line: do we have what we were looking for?
              if (ssrc[0] > -1) {
                // We're done, let's add the new attributes here
                insertAt = i;
                break;
              }
            }
            continue;
          }
          if (!video) continue;
          var sim = lines[i].match(/a=ssrc-group:SIM (\d+) (\d+) (\d+)/);
          if (sim) {
            Janus.warn("The SDP already contains a SIM attribute, munging will be skipped");
            return sdp;
          }
          var fid = lines[i].match(/a=ssrc-group:FID (\d+) (\d+)/);
          if (fid) {
            ssrc[0] = fid[1];
            ssrc_fid[0] = fid[2];
            lines.splice(i, 1);
            i--;
            continue;
          }
          if (ssrc[0]) {
            var match = lines[i].match('a=ssrc:' + ssrc[0] + ' cname:(.+)');
            if (match) {
              cname = match[1];
            }
            match = lines[i].match('a=ssrc:' + ssrc[0] + ' msid:(.+)');
            if (match) {
              msid = match[1];
            }
            match = lines[i].match('a=ssrc:' + ssrc[0] + ' mslabel:(.+)');
            if (match) {
              mslabel = match[1];
            }
            match = lines[i].match('a=ssrc:' + ssrc[0] + ' label:(.+)');
            if (match) {
              label = match[1];
            }
            if (lines[i].indexOf('a=ssrc:' + ssrc_fid[0]) === 0) {
              lines.splice(i, 1);
              i--;
              continue;
            }
            if (lines[i].indexOf('a=ssrc:' + ssrc[0]) === 0) {
              lines.splice(i, 1);
              i--;
              continue;
            }
          }
          if (lines[i].length == 0) {
            lines.splice(i, 1);
            i--;
            continue;
          }
        }
        if (ssrc[0] < 0) {
          // Couldn't find a FID attribute, let's just take the first video SSRC we find
          insertAt = -1;
          video = false;
          for (let i = 0; i < lines.length; i++) {
            const mline = lines[i].match(/m=(\w+) */);
            if (mline) {
              const medium = mline[1];
              if (medium === "video") {
                // New video m-line: make sure it's the first one
                if (ssrc[0] < 0) {
                  video = true;
                } else {
                  // We're done, let's add the new attributes here
                  insertAt = i;
                  break;
                }
              } else {
                // New non-video m-line: do we have what we were looking for?
                if (ssrc[0] > -1) {
                  // We're done, let's add the new attributes here
                  insertAt = i;
                  break;
                }
              }
              continue;
            }
            if (!video) continue;
            if (ssrc[0] < 0) {
              var value = lines[i].match(/a=ssrc:(\d+)/);
              if (value) {
                ssrc[0] = value[1];
                lines.splice(i, 1);
                i--;
                continue;
              }
            } else {
              let match = lines[i].match('a=ssrc:' + ssrc[0] + ' cname:(.+)');
              if (match) {
                cname = match[1];
              }
              match = lines[i].match('a=ssrc:' + ssrc[0] + ' msid:(.+)');
              if (match) {
                msid = match[1];
              }
              match = lines[i].match('a=ssrc:' + ssrc[0] + ' mslabel:(.+)');
              if (match) {
                mslabel = match[1];
              }
              match = lines[i].match('a=ssrc:' + ssrc[0] + ' label:(.+)');
              if (match) {
                label = match[1];
              }
              if (lines[i].indexOf('a=ssrc:' + ssrc_fid[0]) === 0) {
                lines.splice(i, 1);
                i--;
                continue;
              }
              if (lines[i].indexOf('a=ssrc:' + ssrc[0]) === 0) {
                lines.splice(i, 1);
                i--;
                continue;
              }
            }
            if (lines[i].length === 0) {
              lines.splice(i, 1);
              i--;
              continue;
            }
          }
        }
        if (ssrc[0] < 0) {
          // Still nothing, let's just return the SDP we were asked to munge
          Janus.warn("Couldn't find the video SSRC, simulcasting NOT enabled");
          return sdp;
        }
        if (insertAt < 0) {
          // Append at the end
          insertAt = lines.length;
        }
        // Generate a couple of SSRCs (for retransmissions too)
        // Note: should we check if there are conflicts, here?
        ssrc[1] = Math.floor(Math.random() * 0xFFFFFFFF);
        ssrc[2] = Math.floor(Math.random() * 0xFFFFFFFF);
        ssrc_fid[1] = Math.floor(Math.random() * 0xFFFFFFFF);
        ssrc_fid[2] = Math.floor(Math.random() * 0xFFFFFFFF);
        // Add attributes to the SDP
        for (var i = 0; i < ssrc.length; i++) {
          if (cname) {
            lines.splice(insertAt, 0, 'a=ssrc:' + ssrc[i] + ' cname:' + cname);
            insertAt++;
          }
          if (msid) {
            lines.splice(insertAt, 0, 'a=ssrc:' + ssrc[i] + ' msid:' + msid);
            insertAt++;
          }
          if (mslabel) {
            lines.splice(insertAt, 0, 'a=ssrc:' + ssrc[i] + ' mslabel:' + mslabel);
            insertAt++;
          }
          if (label) {
            lines.splice(insertAt, 0, 'a=ssrc:' + ssrc[i] + ' label:' + label);
            insertAt++;
          }
          // Add the same info for the retransmission SSRC
          if (cname) {
            lines.splice(insertAt, 0, 'a=ssrc:' + ssrc_fid[i] + ' cname:' + cname);
            insertAt++;
          }
          if (msid) {
            lines.splice(insertAt, 0, 'a=ssrc:' + ssrc_fid[i] + ' msid:' + msid);
            insertAt++;
          }
          if (mslabel) {
            lines.splice(insertAt, 0, 'a=ssrc:' + ssrc_fid[i] + ' mslabel:' + mslabel);
            insertAt++;
          }
          if (label) {
            lines.splice(insertAt, 0, 'a=ssrc:' + ssrc_fid[i] + ' label:' + label);
            insertAt++;
          }
        }
        lines.splice(insertAt, 0, 'a=ssrc-group:FID ' + ssrc[2] + ' ' + ssrc_fid[2]);
        lines.splice(insertAt, 0, 'a=ssrc-group:FID ' + ssrc[1] + ' ' + ssrc_fid[1]);
        lines.splice(insertAt, 0, 'a=ssrc-group:FID ' + ssrc[0] + ' ' + ssrc_fid[0]);
        lines.splice(insertAt, 0, 'a=ssrc-group:SIM ' + ssrc[0] + ' ' + ssrc[1] + ' ' + ssrc[2]);
        sdp = lines.join("\r\n");
        if (!sdp.endsWith("\r\n")) sdp += "\r\n";
        return sdp;
      }

      // Helper methods to parse a media object
      function isAudioSendEnabled(media) {
        Janus.debug("isAudioSendEnabled:", media);
        if (!media) return true; // Default
        if (media.audio === false) return false; // Generic audio has precedence
        if (media.audioSend === undefined || media.audioSend === null) return true; // Default
        return media.audioSend === true;
      }
      function isAudioSendRequired(media) {
        Janus.debug("isAudioSendRequired:", media);
        if (!media) return false; // Default
        if (media.audio === false || media.audioSend === false) return false; // If we're not asking to capture audio, it's not required
        if (media.failIfNoAudio === undefined || media.failIfNoAudio === null) return false; // Default
        return media.failIfNoAudio === true;
      }
      function isAudioRecvEnabled(media) {
        Janus.debug("isAudioRecvEnabled:", media);
        if (!media) return true; // Default
        if (media.audio === false) return false; // Generic audio has precedence
        if (media.audioRecv === undefined || media.audioRecv === null) return true; // Default
        return media.audioRecv === true;
      }
      function isVideoSendEnabled(media) {
        Janus.debug("isVideoSendEnabled:", media);
        if (!media) return true; // Default
        if (media.video === false) return false; // Generic video has precedence
        if (media.videoSend === undefined || media.videoSend === null) return true; // Default
        return media.videoSend === true;
      }
      function isVideoSendRequired(media) {
        Janus.debug("isVideoSendRequired:", media);
        if (!media) return false; // Default
        if (media.video === false || media.videoSend === false) return false; // If we're not asking to capture video, it's not required
        if (media.failIfNoVideo === undefined || media.failIfNoVideo === null) return false; // Default
        return media.failIfNoVideo === true;
      }
      function isVideoRecvEnabled(media) {
        Janus.debug("isVideoRecvEnabled:", media);
        if (!media) return true; // Default
        if (media.video === false) return false; // Generic video has precedence
        if (media.videoRecv === undefined || media.videoRecv === null) return true; // Default
        return media.videoRecv === true;
      }
      function isScreenSendEnabled(media) {
        Janus.debug("isScreenSendEnabled:", media);
        if (!media) return false;
        if (typeof media.video !== 'object' || typeof media.video.mandatory !== 'object') return false;
        var constraints = media.video.mandatory;
        if (constraints.chromeMediaSource) return constraints.chromeMediaSource === 'desktop' || constraints.chromeMediaSource === 'screen';else if (constraints.mozMediaSource) return constraints.mozMediaSource === 'window' || constraints.mozMediaSource === 'screen';else if (constraints.mediaSource) return constraints.mediaSource === 'window' || constraints.mediaSource === 'screen';
        return false;
      }
      function isDataEnabled(media) {
        Janus.debug("isDataEnabled:", media);
        if (Janus.webRTCAdapter.browserDetails.browser === "edge") {
          Janus.warn("Edge doesn't support data channels yet");
          return false;
        }
        if (media === undefined || media === null) return false; // Default
        return media.data === true;
      }
      function isTrickleEnabled(trickle) {
        Janus.debug("isTrickleEnabled:", trickle);
        return trickle === false ? false : true;
      }
    }

    /**
     * 判断当前页面是否是https
     */
    function isHttps() {
      return location.protocol === "https:";
    }

    /**
     * 公共方法
     * 是否有声卡设备
     * 异步方法  结果保存在window.hasAudioInputDevices中 true or false
     */
    function checkMediaDevices() {
      let w = window;
      if (w.checkAudioDevicesStatus != undefined && w.hasAudioInputDevices != undefined) {
        //已检测
        return;
      }
      //参数初始化，防止为空报错
      w.checkAudioDevicesStatus = false;
      w.hasAudioInputDevices = false;
      if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        console.error("Not support enumerateDevices(), plase use https to access.");
        return;
      }
      var startTime = new Date().getTime();
      // 列出相机和麦克风.
      navigator.mediaDevices.enumerateDevices().then(function (devices) {
        devices.forEach(function (device) {
          if (device.kind == "audioinput") {
            //判断到1个就返回true
            w.hasAudioInputDevices = true;
          }
        });
        w.checkAudioDevicesStatus = true;
        console.log("检查音频输入设备总计耗时: " + (new Date().getTime() - startTime) + "ms");
      }).catch(function (err) {
        console.error(err.name + ": " + err.message);
      });
    }

    /**
     * 拼接SIP地址
     * @param user 用户名
     * @param server 服务器地址
     * @param port 服务器端口
     * @returns SIP地址
     */
    function makeSipUri(user, server, port) {
      server = server || "127.0.0.1";
      port = port || 5060;
      return "sip:".concat(user, "@").concat(server, ":").concat(port);
    }

    /**
     * 根据简单配置项填充完整配置项
     * @param media 通话媒体流配置
     */
    function fillMediaConfig(media) {
      if (media.audio !== undefined) {
        media.audioSend = media.audioRecv = media.audio;
      }
      if (media.video !== undefined) {
        media.videoSend = media.videoRecv = media.video;
      }
      return media;
    }

    /**
     * 列出设备列表
     */
    async function listDevices() {
      if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        throw new Error("Not support enumerateDevices(), plase use https to access.");
      }
      let devices = await navigator.mediaDevices.enumerateDevices();
      console.log('listDevices enumerateDevices find : ', devices === null || devices === void 0 ? void 0 : devices.length);
      if (devices.length > 0 && devices[0].deviceId) {
        return devices;
      }
      // 无法正常获取设备列表，需先申请设备权限
      try {
        // 先尝试申请音频和视频设备
        await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true
        });
      } catch (err) {
        // 如果没有视频设备则再尝试仅申请音频设备
        try {
          await navigator.mediaDevices.getUserMedia({
            audio: true
          });
        } catch (err) {
          return devices;
        }
      }
      return navigator.mediaDevices.enumerateDevices();
    }

    /** 事件处理函数 */

    /**
     * 事件派发器
     */
    class EventDispatcher {
      constructor() {
        _defineProperty(this, "_listeners", {});
      }
      /**
       * 添加事件
       * @param type 
       * @param handler 
       * @param key 
       * @returns 
       */
      addListener(type, handler, key) {
        if (typeof handler != 'function') {
          return;
        }
        let t = this._listeners;
        let id;
        if (typeof key == "string" && key) {
          if (/[^\w\-]/.test(key)) {
            throw "nonstandard key:" + key;
          } else {
            handler.hashCode = key;
            id = key;
          }
        }
        type.indexOf("on") != 0 && (type = "on" + type);
        typeof t[type] != "object" && (t[type] = {});
        id = id || guid();
        handler.hashCode = id;
        t[type][id] = handler;
      }

      /**
       * 删除事件
       */
      removeListener(type, handler) {
        type.indexOf("on") != 0 && (type = "on" + type);
        let t = this._listeners;
        if (!t[type]) {
          return;
        }
        if (handler) {
          let key;
          if (typeof handler == 'function') {
            key = handler.hashCode;
          }
          if (typeof key != "string") {
            return;
          }
          t[type][key] && delete t[type][key];
        } else {
          t[type] = {};
        }
      }

      /**
       * 派发事件
       */
      dispatch(e, options) {
        if (typeof e == 'string') {
          e = new EventObject(e);
        }
        options = options || {};
        for (let i in options) {
          e[i] = options[i];
        }
        let t = this._listeners,
          p = e.type;
        e.target || (e.target = this);
        e.currentTarget = this;
        p.indexOf("on") != 0 && (p = "on" + p);
        // typeof this[p] == 'function' && this[p].apply(this, arguments);
        if (typeof t[p] == "object") {
          for (let i in t[p]) {
            t[p][i].call(this, e);
          }
        }
        return e.returnValue;
      }

      /**
       * 清空事件
       */
      dispose() {
        this._listeners = {};
      }
    }

    /**
     * 为事件生成唯一标识字符串
     */
    const guid = function () {
      let id = 1;
      return function () {
        return 'SCSH_ID_' + (++id).toString();
      };
    }();

    /**
     * 事件对象包装类，通过事件type，加载必要的属性
     */
    class EventObject {
      constructor(type) {
        let target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        this.type = type;
        this.target = target;
        _defineProperty(this, "returnValue", true);
        _defineProperty(this, "currentTarget", void 0);
      }
    }

    /**
     * 处理Janus派发出的消息
     */
    class MsgProcess {
      // 消息处理函数

      constructor(handler) {
        this.handler = handler;
        _defineProperty(this, "msgActions", {});
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
      onMessage(msg, jsep) {
        console.log(msg, jsep);
        jsep && console.log("remote sdp = ", jsep.sdp);
        //先关闭振铃音
        // MSG_CALLBACK.ringFile(false);

        let msgErrCode = msg.error_code;
        if (msgErrCode) {
          let errorMsg = CONST_CODE.SHANDLE_FAILED_CODE[msgErrCode] || '错误码：' + msgErrCode;
          console.error("错误码：" + msgErrCode + "," + errorMsg);
          this.handler.listener.dispatch(exports.SoftHandlerEvent.ERROR, {
            code: msgErrCode,
            message: errorMsg
          });
          return false;
        }
        let result = msg.result;
        if (!result) return;
        let resultErrCode = result.code;
        if (resultErrCode && 200 != resultErrCode) {
          let errorMsg = CONST_CODE.SHANDLE_FAILED_CODE[resultErrCode] || '错误码：' + resultErrCode;
          console.error("错误码：" + resultErrCode + "," + errorMsg);
          this.handler.listener.dispatch(exports.SoftHandlerEvent.ERROR, {
            code: resultErrCode,
            message: errorMsg
          });
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
      incomingcall(message, jsep) {
        // MSG_CALLBACK.ringFile(true, _self._opts.configs.ringFile);
        // 正在通话状态则忽略
        if (this.handler.calling) {
          return;
        }
        //
        this.handler.remoteJsep = jsep;
        this.handler.calling = true;
        var callId = message.call_id;
        var result = message.result;
        let type = result === null || result === void 0 ? void 0 : result.type;
        let telNumber = result === null || result === void 0 ? void 0 : result.username;
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
          videoEnable = (result === null || result === void 0 ? void 0 : result.video) && videoEnable == "true";
          this.handler.listener.dispatch(exports.SoftHandlerEvent.IN_CALL_ANSWER, {
            callId: callId,
            telNumber: telNumber,
            displayName: result === null || result === void 0 ? void 0 : result.displayname,
            video: videoEnable,
            audio: result === null || result === void 0 ? void 0 : result.audio
          });
        } else {
          var param = {
            callId: callId,
            telNumber: telNumber,
            displayName: result === null || result === void 0 ? void 0 : result.displayname,
            video: result === null || result === void 0 ? void 0 : result.video,
            audio: result === null || result === void 0 ? void 0 : result.audio,
            notifyType: type
          };
          this.handler.listener.dispatch(exports.SoftHandlerEvent.IN_CALL, param);
        }
        console.log("振铃通知， telNumber = " + telNumber + (type === "self_call_handle" ? ", 自动应答" : ""));
      }

      /**
       * 对端振铃通知
       */
      ringing(message) {
        // MSG_CALLBACK.ringFile(true, _self._opts.configs.ringFile);
        var callId = message.call_id;
        this.handler.listener.dispatch(exports.SoftHandlerEvent.RINGING, {
          callId: callId
        });
        console.log("振铃通知， callId = " + callId);
      }

      /**
       * 对端应答通知
       */
      accepted(message, jsep) {
        // 收到对端应答通知时，设置对端JSEP（否则无法建立媒体通道）
        this.handler.handleRemoteJsep({
          jsep: jsep
        });
        //
        var callId = message.call_id;
        var result = message.result;
        var telNumber = result === null || result === void 0 ? void 0 : result.username;
        this.handler.callId = callId;
        this.handler.listener.dispatch(exports.SoftHandlerEvent.ACCEPTED, {
          callId: callId,
          telNumber: telNumber
        });
        console.log("应答通知， callId = " + callId + ", telNumber" + telNumber);
      }

      /**
       * 对端挂断通知
       */
      hangup(message) {
        // 如果还未建立通话，则清除掉正在进行的呼叫
        this.handler.asyncOps.opRejected("call");
        this.handler.asyncOps.opRejected("new_call");
        //
        this.handler.calling = false;
        var callId = message.call_id;
        var result = message.result;
        this.handler.callId = null;
        this.handler.listener.dispatch(exports.SoftHandlerEvent.HANGUP, {
          callId: callId,
          code: result === null || result === void 0 ? void 0 : result.code,
          reason: result === null || result === void 0 ? void 0 : result.reason
        });
        console.log("挂断通知， callId = " + callId);
        //
        this.handler.clearCurrentCall();
      }

      /**
       * 本机主动挂断结果
       * 服务器收到挂断后确认该操作
       */
      hangupResult(message) {
        this.handler.asyncOps.opResovled("hangup");
        // 如果还未建立通话，则清除掉正在进行的呼叫
        this.handler.asyncOps.opRejected("call");
        this.handler.asyncOps.opRejected("new_call");
        //
        this.handler.calling = false;
        var callId = message.call_id;
        var result = message.result;
        this.handler.callId = null;
        this.handler.listener.dispatch(exports.SoftHandlerEvent.HANGUP_RESULT, {
          callId: callId,
          code: result === null || result === void 0 ? void 0 : result.code,
          reason: result === null || result === void 0 ? void 0 : result.reason
        });
        console.log("软手柄挂断通知， callId = " + callId);
        //
        this.handler.clearCurrentCall();
      }

      /**
       * 软手柄注册结果
       * @param type 成功：succ  失败： fail
       */
      registerResult(message, type) {
        var result = message.result;
        if (type == 'succ') {
          this.handler.asyncOps.opResovled("register");
          var telNumber = result === null || result === void 0 ? void 0 : result.username;
          this.handler.username = telNumber;
          this.handler.listener.dispatch(exports.SoftHandlerEvent.REG_RESULT, {
            event: "succ",
            telNumber: telNumber
          });
          console.log("注册成功通知");
        } else {
          this.handler.asyncOps.opRejected("register");
          this.handler.username = null;
          this.handler.listener.dispatch(exports.SoftHandlerEvent.REG_RESULT, {
            event: "fail",
            code: result === null || result === void 0 ? void 0 : result.code,
            reason: result === null || result === void 0 ? void 0 : result.reason
          });
          console.log("注册失败通知");
        }
      }

      /**
       * 软手柄注销结果
       */
      unregisterResult(message) {
        this.handler.asyncOps.opResovled("unregister");
        //
        var result = message.result;
        var event = result === null || result === void 0 ? void 0 : result.event;
        var telNumber = result === null || result === void 0 ? void 0 : result.username;
        this.handler.username = null;
        this.handler.listener.dispatch(exports.SoftHandlerEvent.UNREG_RESULT, {
          event: event,
          telNumber: telNumber
        });
        console.log("注销结果通知");
      }

      /**
       * 软手柄呼叫操作结果
       */
      callingResult(message) {
        var callId = message.call_id;
        this.handler.listener.dispatch(exports.SoftHandlerEvent.CALL_RESULT, {
          callId: callId
        });
      }

      /**
       * 软手柄应答操作结果（通话建立）
       * 对端应答（对应 call、new_call 的返回）
       * 本机应答（对应 accept）
       */
      answerResult(message) {
        this.handler.asyncOps.opResovled("call");
        this.handler.asyncOps.opResovled("new_call");
        this.handler.asyncOps.opResovled("accept");
        //
        var callId = message.call_id;
        this.handler.callId = callId;
        this.handler.listener.dispatch(exports.SoftHandlerEvent.ANSWER_RESULT, {
          callId: callId
        });
      }

      /**
       * 返呼确认（服务端收到“返呼”后返回 SDP）
       */
      newAccepted(message, jsep) {
        // 收到对端应答通知时，设置对端JSEP（否则无法建立媒体通道）
        this.handler.handleRemoteJsep({
          jsep: jsep
        });
        //
        this.handler.newAccepted(jsep);
        // message: { call_id: '', result: { event: 'new_accepted', username: '' } }
        var callId = message.call_id;
        var result = message.result;
        var telNumber = result === null || result === void 0 ? void 0 : result.username;
        this.handler.callId = callId;
        this.handler.listener.dispatch(exports.SoftHandlerEvent.ACCEPTED, {
          callId: callId,
          telNumber: telNumber
        });
        console.log("返呼通知 - 对端应答，callId = " + callId + ", telNumber = " + telNumber);
      }

      /**
       * 更新媒体流
       */
      updating(message, jsep) {
        let callId = message.call_id;
        this.handler.callId = callId;
        console.log("更新媒体，callId = " + callId);
        //
        this.handler.asyncOps.opResovled("update");
      }
    }

    // 异步操作回调

    /**
     * 异步操作管理类
     */
    class AsyncOps {
      constructor() {
        _defineProperty(this, "ops", {});
        _defineProperty(this, "timeout", 10000);
      }
      /** 当前是否正在进行异步处理过程中 */
      get operationing() {
        for (let _ in this.ops) {
          return true;
        }
        return false;
      }

      /**
       * 构造一个异步操作 promise 对象
       * @param op 异步操作名称
       */
      makeOpPromise(op) {
        let cbs = this.ops[op];
        if (cbs) {
          throw new Error("有任务正在运行，请勿重复执行");
        }
        cbs = {};
        this.ops[op] = cbs;
        return new Promise((resolve, reject) => {
          cbs.resolve = resolve;
          cbs.reject = reject;
        });
      }

      /**
       * 当前异步操作已完成
       */
      opResovled(op) {
        let cbs = this.ops[op];
        if (!cbs) {
          return;
        }
        try {
          if (cbs.resolve) {
            cbs.resolve();
          }
        } catch (err) {
          console.error(err);
        }
        delete this.ops[op];
      }

      /**
       * 当前异步操作出现异常
       */
      opRejected(op, reason) {
        let cbs = this.ops[op];
        if (!cbs) {
          return;
        }
        try {
          if (cbs.reject) {
            cbs.reject(reason);
          }
        } catch (err) {
          console.error(err);
        }
        delete this.ops[op];
      }
    }

    /**
     * 基于 janus 实现的软手柄
     */
    var _janus = /*#__PURE__*/new WeakMap();
    var _sipcall = /*#__PURE__*/new WeakMap();
    var _msgProcess = /*#__PURE__*/new WeakMap();
    var _initJanus = /*#__PURE__*/new WeakSet();
    var _initHandler = /*#__PURE__*/new WeakSet();
    class JanusHandler {
      // janus 对象

      // sip 插件操作句柄

      // 注册账号标识

      // 正在进行通话的 call_id

      // 当前是否正在通话过程中
      get talking() {
        return !!this.callId;
      }

      // 当前通话的对端号码

      constructor( /** 初始化参数 */
      opts) {
        var _this$opts$configs$re, _this$opts$configs$lo;
        this.opts = opts;
        _classPrivateMethodInitSpec(this, _initHandler);
        _classPrivateMethodInitSpec(this, _initJanus);
        _classPrivateFieldInitSpec(this, _janus, {
          writable: true,
          value: null
        });
        _classPrivateFieldInitSpec(this, _sipcall, {
          writable: true,
          value: void 0
        });
        _defineProperty(this, "username", void 0);
        _defineProperty(this, "callId", void 0);
        _defineProperty(this, "remoteSipUri", void 0);
        _defineProperty(this, "currentMedia", void 0);
        _defineProperty(this, "deviceConfig", void 0);
        _defineProperty(this, "stream", null);
        _defineProperty(this, "audioElm", void 0);
        _defineProperty(this, "videoElm", void 0);
        _defineProperty(this, "videoLocalElm", void 0);
        _defineProperty(this, "remoteJsep", void 0);
        _defineProperty(this, "backMedia", void 0);
        _defineProperty(this, "calling", false);
        _defineProperty(this, "listener", new EventDispatcher());
        _classPrivateFieldInitSpec(this, _msgProcess, {
          writable: true,
          value: new MsgProcess(this)
        });
        _defineProperty(this, "asyncOps", new AsyncOps());
        // 创建音频元素用于播放通话音频
        this.audioElm = document.createElement("audio");
        this.audioElm.autoplay = true;
        this.audioElm.controls = true;
        this.audioElm.style.display = "none";
        document.body.appendChild(this.audioElm);
        // 创建视频元素用于播放对方视频
        this.videoElm = document.createElement("video");
        this.videoElm.autoplay = true;
        this.videoElm.setAttribute("playsinline", "");
        this.videoElm.setAttribute('webkit-playsinline', "");
        this.videoElm.setAttribute('x5-video-player-type', 'h5-page');
        this.videoElm.controls = false;
        // this.videoElm.style.display = 'none';
        (_this$opts$configs$re = this.opts.configs.remoteVideo) === null || _this$opts$configs$re === void 0 ? void 0 : _this$opts$configs$re.appendChild(this.videoElm);
        // 创建视频元素用于播放本地视频
        this.videoLocalElm = document.createElement("video");
        this.videoLocalElm.autoplay = true;
        this.videoElm.setAttribute("playsinline", "");
        this.videoElm.setAttribute('webkit-playsinline', "");
        this.videoElm.setAttribute('x5-video-player-type', 'h5-page');
        this.videoLocalElm.controls = false;
        this.videoLocalElm.muted = true; // 避免声音回环
        // this.videoLocalElm.style.display = 'none';
        (_this$opts$configs$lo = this.opts.configs.localVideo) === null || _this$opts$configs$lo === void 0 ? void 0 : _this$opts$configs$lo.appendChild(this.videoLocalElm);
      }

      /**
       * 初始化
       */
      async initialize() {
        await _classPrivateMethodGet(this, _initJanus, _initJanus2).call(this);
        await _classPrivateMethodGet(this, _initHandler, _initHandler2).call(this);
      }

      /** 初始化并创建 janus 操作对象 */

      /** 填充对端 JSEP 信息 */
      handleRemoteJsep(params) {
        var _classPrivateFieldGet2;
        (_classPrivateFieldGet2 = _classPrivateFieldGet(this, _sipcall)) === null || _classPrivateFieldGet2 === void 0 ? void 0 : _classPrivateFieldGet2.handleRemoteJsep(params);
      }

      /**
       * 销毁：Janus销毁、资源释放
       */
      destroy() {
        let self = this;
        return new Promise(resolve => {
          var _classPrivateFieldGet3;
          // 删除创建出的元素
          if (self.audioElm) {
            self.audioElm.srcObject = null;
            document.body.removeChild(self.audioElm);
            delete self.audioElm;
          }
          if (self.videoElm) {
            var _self$opts$configs$re;
            self.videoElm.srcObject = null;
            (_self$opts$configs$re = self.opts.configs.remoteVideo) === null || _self$opts$configs$re === void 0 ? void 0 : _self$opts$configs$re.removeChild(self.videoElm);
            delete self.videoElm;
          }
          if (self.videoLocalElm) {
            var _self$opts$configs$lo;
            self.videoLocalElm.srcObject = null;
            (_self$opts$configs$lo = self.opts.configs.localVideo) === null || _self$opts$configs$lo === void 0 ? void 0 : _self$opts$configs$lo.removeChild(self.videoLocalElm);
            delete self.videoLocalElm;
          }
          // 销毁 janus 对象
          (_classPrivateFieldGet3 = _classPrivateFieldGet(this, _janus)) === null || _classPrivateFieldGet3 === void 0 ? void 0 : _classPrivateFieldGet3.destroy({
            success: () => {
              _classPrivateFieldSet(self, _janus, null);
              resolve();
              self.listener.dispose();
            },
            // asyncRequest: true,
            notifyDestroyed: true
          });
        });
      }

      // 异步方式发送插件消息
      send(msg) {
        return new Promise((resolve, reject) => {
          if (!_classPrivateFieldGet(this, _sipcall)) {
            reject(new Error("not initialized for sip-server."));
            return;
          }
          _classPrivateFieldGet(this, _sipcall).send(Object.assign(msg, {
            success: resolve,
            error: reject
          }));
        });
      }

      /**
       * 注册软手柄
       * @param username 注册号码
       * @param displayName 显示名称
       */
      async register(username, displayName) {
        var _this$opts$registerIn, _this$opts$registerIn2;
        let sipUri = makeSipUri(username, (_this$opts$registerIn = this.opts.registerInfo) === null || _this$opts$registerIn === void 0 ? void 0 : _this$opts$registerIn.sipServerIp, (_this$opts$registerIn2 = this.opts.registerInfo) === null || _this$opts$registerIn2 === void 0 ? void 0 : _this$opts$registerIn2.sipServerPort);
        displayName = displayName || username;
        //
        let opPromise = this.asyncOps.makeOpPromise("register");
        //
        let body = {
          request: "register",
          proxy: sipUri,
          display_name: displayName,
          username: username
        };
        try {
          await this.send({
            message: body
          });
          console.log("软手柄注册, sipUri = " + sipUri + ", 显示名称 = " + displayName + ", 注册号码 = " + username);
          //
          return opPromise;
        } catch (err) {
          this.asyncOps.opRejected("register", err);
        }
      }

      /**
       * 注销软手柄
       */
      async unregister() {
        //
        let opPromise = this.asyncOps.makeOpPromise("unregister");
        //
        let body = {
          request: "unregister"
        };
        try {
          await this.send({
            message: body
          });
          console.log("软手柄注销, 注册号码 = " + this.username);
          //
          return opPromise;
        } catch (err) {
          this.asyncOps.opRejected("unregister", err);
        }
      }

      /**
       * 发起呼叫
       * @param sipUri SIP地址
       * @param media 媒体选项
       */
      call(sipUri, media) {
        var _media2, _media3, _classPrivateFieldGet4;
        let opPromise = this.asyncOps.makeOpPromise("call");
        //
        media = media || {};
        fillMediaConfig(media);
        let _media = Object.assign(Object.assign({}, DEF_MEDIA_OPTS), media);
        console.log(_media);
        let isVideoCall = ((_media2 = media) === null || _media2 === void 0 ? void 0 : _media2.video) || ((_media3 = media) === null || _media3 === void 0 ? void 0 : _media3.videoSend);
        console.log("createOffer", _media, this.deviceConfig);
        // return new Promise<void>((resolve, reject) => {
        (_classPrivateFieldGet4 = _classPrivateFieldGet(this, _sipcall)) === null || _classPrivateFieldGet4 === void 0 ? void 0 : _classPrivateFieldGet4.createOffer({
          media: makeMediaData(_media, this.deviceConfig),
          success: async jsep => {
            let body = {
              request: "call",
              uri: sipUri,
              video: isVideoCall ? "1" : "0"
            };
            try {
              await this.send({
                message: body,
                jsep: jsep
              });
              console.log("软手柄呼叫，sipUri = " + sipUri, jsep);
              console.log("local sdp = ", jsep.sdp);
              this.remoteSipUri = sipUri;
              // 记录当前通话所使用的媒体参数
              this.currentMedia = Object.assign({}, media);
              // resolve();
            } catch (error) {
              // reject(error);
              this.asyncOps.opRejected("call", error);
            }
          },
          error: error => {
            console.error(error);
            console.error(fmtError(error));
            // reject(error);
            this.asyncOps.opRejected("call", error);
          }
        });
        // });
        return opPromise;
      }

      /**
       * 以返呼方式发起呼叫
       * （移动端网页上发起呼叫无法正常通话，但接听可正常通话。故，将呼叫操作转换为接听形式）
       * 
       * @param sipUri SIP地址
       * @param media 媒体选项
       */
      async newcall(sipUri, media) {
        //
        let opPromise = this.asyncOps.makeOpPromise("new_call");
        //
        this.backMedia = media;
        let isVideoCall = (media === null || media === void 0 ? void 0 : media.video) || (media === null || media === void 0 ? void 0 : media.videoSend);
        let body = {
          request: "new_call",
          uri: sipUri,
          video: isVideoCall ? "1" : "0"
        };
        try {
          await this.send({
            message: body
          });
          console.log("软手柄返呼，sipUri = " + sipUri);
          this.remoteSipUri = sipUri;
          // 记录当前通话所使用的媒体参数
          this.currentMedia = Object.assign({}, media);
          //
          return opPromise;
        } catch (err) {
          this.asyncOps.opRejected("new_call", err);
        }
      }

      /**
       * 返呼确认
       */
      newAccepted(remoteJsep) {
        var _classPrivateFieldGet5;
        let media = this.backMedia || {};
        fillMediaConfig(media);
        let _media = Object.assign(Object.assign({}, DEF_MEDIA_OPTS), media);
        if (remoteJsep) {
          // 移动端需替换成该值
          // remoteJsep.sdp = remoteJsep.sdp.replace(/profile-level-id=(\w+);/, "profile-level-id=42e01f;")
          remoteJsep.sdp = remoteJsep.sdp.replace(/profile-level-id=(\w+);/, "profile-level-id=42e00d;");
        }
        console.log("createAnswer", _media, this.deviceConfig);
        (_classPrivateFieldGet5 = _classPrivateFieldGet(this, _sipcall)) === null || _classPrivateFieldGet5 === void 0 ? void 0 : _classPrivateFieldGet5.createAnswer({
          jsep: remoteJsep,
          media: makeMediaData(_media, this.deviceConfig),
          success: jsep => {
            var _classPrivateFieldGet6;
            let body = {
              request: "new_accept"
            };
            (_classPrivateFieldGet6 = _classPrivateFieldGet(this, _sipcall)) === null || _classPrivateFieldGet6 === void 0 ? void 0 : _classPrivateFieldGet6.send({
              message: body,
              jsep: jsep
            });
            console.log("返呼确认，local sdp = ", jsep.sdp);
          },
          error: error => {
            console.error(error);
            console.error(fmtError(error));
          }
        });
      }

      /**
       * 应答呼入
       * @param media 媒体选项
       */
      answer(media) {
        var _classPrivateFieldGet7;
        //
        let opPromise = this.asyncOps.makeOpPromise("accept");
        //
        //console.log(this.callId, this.calling)
        // 检查是否有呼入信息
        if (!this.remoteJsep) {
          throw new Error("not found call-info, nothing to answer");
        }
        //
        media = media || {};
        fillMediaConfig(media);
        let _media = Object.assign(Object.assign({}, DEF_MEDIA_OPTS), media);
        let remoteJsep = this.remoteJsep;
        this.remoteJsep = undefined;
        if (remoteJsep) {
          // TODO : 移动端需替换成该值
          // 将视频流中下面这一行 profile-level-id 的值替换成 "42e01f"，移动端浏览器才能正常处理
          // a=fmtp:106 profile-level-id=640028;max-mbps=1048576;max-fs=8160;max-fps=3000;
          // remoteJsep.sdp = remoteJsep.sdp.replace("428028", "42e01f");
          // remoteJsep.sdp = remoteJsep.sdp.replace("640028", "42e01f");
          // remoteJsep.sdp = remoteJsep.sdp.replace(/profile-level-id=(\w+);/, "profile-level-id=42e01f;")
          remoteJsep.sdp = remoteJsep.sdp.replace(/profile-level-id=(\w+);/, "profile-level-id=42e01f;");
        }
        console.log("createAnswer", _media, this.deviceConfig);
        // return new Promise<void>((resolve, reject) => {
        (_classPrivateFieldGet7 = _classPrivateFieldGet(this, _sipcall)) === null || _classPrivateFieldGet7 === void 0 ? void 0 : _classPrivateFieldGet7.createAnswer({
          jsep: remoteJsep,
          media: makeMediaData(_media, this.deviceConfig),
          success: async jsep => {
            let body = {
              request: "accept"
            };
            try {
              await this.send({
                message: body,
                jsep: jsep
              });
              console.log("软手柄应答");
              console.log("local sdp = ", jsep.sdp);
              // 记录当前通话所使用的媒体参数
              this.currentMedia = Object.assign({}, media);
              // resolve();
            } catch (error) {
              // reject(error);
              this.asyncOps.opRejected("accept", error);
            }
          },
          error: error => {
            console.error(error);
            console.error(fmtError(error));
            // reject(error);
            this.asyncOps.opRejected("accept", error);
          }
        });
        // });
        return opPromise;
      }

      /**
       * 在通话过程中更新媒体流
       */
      updateMediaStream() {
        var _classPrivateFieldGet8;
        if (!this.talking) {
          throw new Error("当前不在通话中");
        }
        // 生成“完成”promise对象，以便在服务端返回后再触发当前操作的完成
        let opPromise = this.asyncOps.makeOpPromise("update");
        // 获取当前通话所使用的媒体参数
        let _media = Object.assign({}, this.currentMedia);
        //
        console.log("createOffer", _media, this.deviceConfig);
        (_classPrivateFieldGet8 = _classPrivateFieldGet(this, _sipcall)) === null || _classPrivateFieldGet8 === void 0 ? void 0 : _classPrivateFieldGet8.createOffer({
          media: makeMediaData(_media, this.deviceConfig, true),
          success: async jsep => {
            let body = {
              request: "update"
            };
            try {
              await this.send({
                message: body,
                jsep: jsep
              });
              console.log("更新媒体流，sipUri = " + this.remoteSipUri, jsep);
              console.log("local sdp = ", jsep.sdp);
              // resolve();
            } catch (error) {
              // reject(error);
              this.asyncOps.opRejected("update", error);
            }
          },
          error: error => {
            console.error(error);
            console.error(fmtError(error));
            // reject(error);
            this.asyncOps.opRejected("update", error);
          }
        });
        // });
        // 返回预先生成的promise对象，在切换完成后再触发本操作的“完成”
        return opPromise;
      }

      /**
       * 是否启用本地摄像头，true - 启用摄像头，false - 禁用摄像头（不向对方发送图像）
       */
      enableCamera(enabled) {
        // 如果在通话中，先判断是否是视频通话（只有视频通话才能切换摄像头的开关）
        if (this.talking && !isVideoCall(this.currentMedia)) {
          throw new Error("当前不是视频通话");
        }
        // 如果在通话建立前，则仅更新配置项中的值
        if (!this.deviceConfig) {
          this.deviceConfig = {
            enableCamera: enabled
          };
        } else {
          this.deviceConfig.enableCamera = enabled;
        }
        // 如果在通话中，则通过切换本地媒体流中的视频流是否启用的方式
        if (this.talking && this.stream) {
          let videoTracks = this.stream.getVideoTracks();
          if (videoTracks.length > 0) {
            videoTracks[0].enabled = enabled;
            console.log("enableCamera", enabled, videoTracks[0]);
          }
        }
      }

      /**
       * 软手柄挂起/取消挂起
       */
      hold(holdType) {
        var _classPrivateFieldGet9;
        let body = {
          request: holdType
        };
        (_classPrivateFieldGet9 = _classPrivateFieldGet(this, _sipcall)) === null || _classPrivateFieldGet9 === void 0 ? void 0 : _classPrivateFieldGet9.send({
          message: body
        });
        console.log("软手柄" + (holdType == 'hold' ? "挂起" : "取消挂起"));
      }

      /**
       * 软手柄挂断
       */
      async hangup() {
        //
        let opPromise = this.asyncOps.makeOpPromise("hangup");
        //
        let body = {
          request: "hangup"
        };
        try {
          await this.send({
            message: body
          });
          console.log("软手柄挂断");
          //
          return opPromise;
        } catch (err) {
          this.asyncOps.opRejected("hangup", err);
        }
      }

      // 清除当前通话缓存信息
      clearCurrentCall() {
        this.remoteJsep = null;
        this.remoteSipUri = null;
        this.currentMedia = null;
      }

      /**
       * 设置放置视频元素的容器元素
       */
      setVideoContainer(opts) {
        if (!opts) {
          throw new Error("opts can not be null");
        }
        // 如果设置了新容器，则将视频元素添加到新容器中；否则，从旧容器中移除视频元素
        if (opts.remoteVideo) {
          this.videoElm && opts.remoteVideo.appendChild(this.videoElm);
        } else {
          var _this$opts$configs$re2;
          this.videoElm && ((_this$opts$configs$re2 = this.opts.configs.remoteVideo) === null || _this$opts$configs$re2 === void 0 ? void 0 : _this$opts$configs$re2.removeChild(this.videoElm));
        }
        this.opts.configs.remoteVideo = opts.remoteVideo;
        //
        if (opts.localVideo) {
          this.videoLocalElm && opts.localVideo.appendChild(this.videoLocalElm);
        } else {
          var _this$opts$configs$lo2;
          this.videoLocalElm && ((_this$opts$configs$lo2 = this.opts.configs.localVideo) === null || _this$opts$configs$lo2 === void 0 ? void 0 : _this$opts$configs$lo2.removeChild(this.videoLocalElm));
        }
        this.opts.configs.localVideo = opts.localVideo;
      }

      /**
       * 列出设备列表
       */
      listDevices() {
        return new Promise(resolve => {
          Janus.listDevices(devices => resolve(devices));
        });
      }
      setDevice(deviceConfig) {
        this.deviceConfig = deviceConfig;
      }

      /**
       * 将播放设备设置为静音
       * @param mute 是否静音
       */
      setAudioOutputMuted(mute) {
        if (this.audioElm) {
          this.audioElm.muted = mute;
        }
        if (this.videoElm) {
          this.videoElm.muted = mute;
        }
      }

      /**
       * 当前播放设备是否静音
       */
      isAudioOutputMuted() {
        var _this$audioElm, _this$videoElm;
        return !!((_this$audioElm = this.audioElm) !== null && _this$audioElm !== void 0 && _this$audioElm.muted && (_this$videoElm = this.videoElm) !== null && _this$videoElm !== void 0 && _this$videoElm.muted);
      }

      /**
       * 将麦克风设备设置为静音或取消静音
       */
      setAudioInputMuted(mute) {
        var _this$stream;
        (_this$stream = this.stream) === null || _this$stream === void 0 ? void 0 : _this$stream.getAudioTracks().forEach(track => track.enabled = !mute);
      }

      /**
       * 当前麦克风设备是否静音
       */
      isAudioInputMuted() {
        return !!(this.stream && this.stream.getAudioTracks().every(track => !track.enabled));
      }
    }

    /**
     * 提取错误对象中的信息
     */
    function _initJanus2() {
      return new Promise((resolve, reject) => {
        var _this$opts;
        // 初始化 janus 环境
        Janus.init({
          debug: ((_this$opts = this.opts) === null || _this$opts === void 0 ? void 0 : _this$opts.configs.debugJanus) || false,
          dependencies: Janus.useDefaultDependencies({
            adapter: adapter$1
          }),
          callback: () => {
            if (!Janus.isWebrtcSupported()) {
              reject(new Error("不支持 WebRTC"));
              return;
            }
            // janus 服务地址
            let janusUrl = this.opts.configs.janusUrl;
            // 创建 janus 操作对象
            _classPrivateFieldSet(this, _janus, new Janus({
              server: isHttps() ? janusUrl.replace('ws:', 'wss:') : janusUrl,
              success: () => {
                console.log("Janus服务连接成功！");
                resolve();
              },
              error: error => {
                console.error("Janus服务连接失败或中断！", error);
                reject(new Error("Janus服务连接失败或中断！"));
              },
              destroyed: () => {
                console.log("Janus服务连接销毁！");
              }
            }));
            //
            console.log("Janus 初始化成功");
          }
        });
      });
    }
    function _initHandler2() {
      return new Promise((resolve, reject) => {
        var _classPrivateFieldGet10;
        let self = this;
        //
        (_classPrivateFieldGet10 = _classPrivateFieldGet(this, _janus)) === null || _classPrivateFieldGet10 === void 0 ? void 0 : _classPrivateFieldGet10.attach({
          plugin: "janus.plugin.sipserver",
          opaqueId: "sip-" + Janus.randomString(12),
          success: function (pluginHandle) {
            console.log("Janus插件初始化成功");
            _classPrivateFieldSet(self, _sipcall, pluginHandle);
            resolve();
            // 开启自动注册，则发起注册，并派发自动注册消息
            if (self.opts.configs.autoRegister) {
              var _self$opts$registerIn;
              self.register(((_self$opts$registerIn = self.opts.registerInfo) === null || _self$opts$registerIn === void 0 ? void 0 : _self$opts$registerIn.username) || '');
              self.listener.dispatch(exports.SoftHandlerEvent.AUTO_REG, {});
            }
            // pluginCallbacks.succCallback && pluginCallbacks.succCallback();
          },

          error: function (error) {
            console.error("Janus\u63D2\u4EF6\u521D\u59CB\u5316\u5931\u8D25\uFF1A".concat(error));
            reject(typeof error === "string" ? new Error(error) : error);
            // pluginCallbacks.errorCallback && pluginCallbacks.errorCallback(error);
          },

          consentDialog: function (on) {
            console.log("Consent dialog should be " + (on ? "on" : "off") + " now");
          },
          // ICE(交互式网络连接) 连接状态变化，来自 RTCPeerConnection
          iceState: function (state) {
            console.log("ICE state changed to " + state);
          },
          // 来自信令
          mediaState: function (medium, on) {
            console.log("Janus " + (on ? "started" : "stopped") + " receiving our " + medium);
          },
          // 来自信令
          webrtcState: function (on, reason) {
            console.log("Janus says our WebRTC PeerConnection is " + (on ? "up" : "down") + " now: " + reason);
          },
          onmessage: (msg, jsep) => _classPrivateFieldGet(self, _msgProcess).onMessage(msg, jsep),
          // 处理远端媒体流，来自 RTCPeerConnection.ontrack
          onremotestream: function (stream) {
            console.log('on remote stream', stream);
            console.log(stream.getTracks());
            // 获取并启用音频流
            let audioTracks = stream.getAudioTracks();
            if (audioTracks.length > 0) {
              audioTracks[0].enabled = true;
              console.log("remote audio tracks:", audioTracks);
            }
            // 获取视频流
            let videoTracks = stream.getVideoTracks();
            // 绑定视频流、音频流到视频元素
            if (self.videoElm) {
              if (self.videoElm.srcObject) {
                self.videoElm.srcObject = null;
              }
              if (videoTracks.length > 0) {
                videoTracks[0].enabled = true;
                console.log("remote video tracks:", videoTracks);
                //
                Janus.attachMediaStream(self.videoElm, stream);
                console.log("bind remote video");
              }
            }
            // 在无视频时，才绑定音频流到音频元素
            if (self.audioElm && videoTracks.length < 1) {
              if (self.audioElm.srcObject) {
                self.audioElm.srcObject = null;
              }
              Janus.attachMediaStream(self.audioElm, stream);
              console.log("bind remote audio");
            }
          },
          // 处理本地媒体流，来自查找到的本地媒体设备
          onlocalstream: function (stream) {
            console.log('on local stream', stream);
            console.log(stream.getTracks());
            self.stream = stream;
            let audioTracks = stream.getAudioTracks();
            if (audioTracks.length > 0) {
              audioTracks[0].enabled = true;
            }
            if (self.videoLocalElm) {
              let videoTracks = stream.getVideoTracks();
              if (videoTracks.length > 0) {
                var _self$deviceConfig;
                videoTracks[0].enabled = isEnabled((_self$deviceConfig = self.deviceConfig) === null || _self$deviceConfig === void 0 ? void 0 : _self$deviceConfig.enableCamera, true);
                Janus.attachMediaStream(self.videoLocalElm, stream);
                console.log("bind local video");
              }
            }
          },
          //清理
          oncleanup: function () {
            console.log('oncleanup');
            self.stream = null;
            if (self.audioElm) {
              self.audioElm.srcObject = null;
            }
            if (self.videoElm) {
              self.videoElm.srcObject = null;
            }
            if (self.videoLocalElm) {
              self.videoLocalElm.srcObject = null;
            }
          }
        });
      });
    }
    function fmtError(err) {
      if (err instanceof Error) {
        return err.message;
      } else if (err.message) {
        return err.message;
      } else if (typeof err == 'string') {
        return err;
      }
      return JSON.stringify(err);
    }

    /**
     * 构造最终调用 janus 时传递的媒体参数
     */
    function makeMediaData(media, device, replace) {
      let deviceData = {};
      if (device) {
        // 在移动端音频输出设备的切换与音频输入设备切换同步
        if (device.audioDeviceId) {
          if (replace) {
            media.replaceAudio = true;
          }
          deviceData.audio = {
            deviceId: {
              exact: device.audioDeviceId
            }
          };
        }
        // 在电脑端通过设置设备ID来切换摄像头
        if (device.videoDeviceId) {
          if (replace) {
            media.replaceVideo = true;
          }
          deviceData.video = {
            deviceId: {
              exact: device.videoDeviceId
            }
          };
        }
        // 使用前置或后置摄像头
        if (typeof device.frontCamera != 'undefined') {
          if (replace) {
            media.replaceVideo = true;
          }
          // 在移动端，通过设置 facingMode 来切换摄像头；其它端，通过设置 deviceId 来切换摄像头。
          deviceData.video = {
            facingMode: device.frontCamera ? "user" : "environment"
          };
        }
      }
      return Object.assign(media, deviceData);
    }

    /**
     * 根据记录的媒体参数判断当前通话是否是视频通话
     */
    function isVideoCall(media) {
      return !!media && !!(media !== null && media !== void 0 && media.video || media !== null && media !== void 0 && media.videoRecv || media !== null && media !== void 0 && media.videoSend);
    }

    /**
     * 判断某个值是否启用
     */
    function isEnabled(value, defValue) {
      if (typeof value == "undefined") {
        return defValue;
      }
      return value;
    }

    // 所有的音频输入设备
    let voiceDevices;
    // 所有的视频输入设备
    let videoDevices;
    function prepareDevices() {
      if (typeof voiceDevices != "undefined") {
        return Promise.resolve();
      }
      // 遍历设备，统计各类设备数量
      return listDevices().then(devices => {
        voiceDevices = [];
        videoDevices = [];
        devices.forEach(d => {
          if (d.kind == "audioinput") {
            voiceDevices.push(d);
          } else if (d.kind == "videoinput") {
            videoDevices.push(d);
          }
        });
        console.log("a, v: ", voiceDevices.length, videoDevices.length);
      }).catch(err => {
        console.error(err.name + ": " + err.message);
      });
    }

    /**
     * 设备控制管理
     */
    var _handle = /*#__PURE__*/new WeakMap();
    var _curVoiceIdx = /*#__PURE__*/new WeakMap();
    class DeviceControlImpl {
      // 听筒的设备索引

      // 外放的设备索引

      constructor(handle) {
        _classPrivateFieldInitSpec(this, _handle, {
          writable: true,
          value: void 0
        });
        _classPrivateFieldInitSpec(this, _curVoiceIdx, {
          writable: true,
          value: 0
        });
        _defineProperty(this, "voiceHeadphoneIndex", 1);
        _defineProperty(this, "voiceSpeakerIndex", 2);
        _classPrivateFieldSet(this, _handle, handle);
        // 扫描当前可用的设备
        prepareDevices().then(() => {
          // 根据音频输入设备的数量设置外放形式的默认索引号（猜测）
          if (voiceDevices.length < 2) {
            this.voiceHeadphoneIndex = -1;
            this.voiceSpeakerIndex = -1;
          } else if (voiceDevices.length < 3) {
            this.voiceHeadphoneIndex = 0;
            this.voiceSpeakerIndex = 1;
          } else {
            this.voiceHeadphoneIndex = 1;
            this.voiceSpeakerIndex = 2;
          }
          // 默认使用前置摄像头
          if (this.hasMultiVideoDevice) {
            this.updateFrontCamera(true);
          }
        });
      }
      get hasMultiVoiceDevice() {
        var _voiceDevices;
        return ((_voiceDevices = voiceDevices) === null || _voiceDevices === void 0 ? void 0 : _voiceDevices.length) > 1;
      }
      get hasMultiVideoDevice() {
        var _videoDevices;
        return ((_videoDevices = videoDevices) === null || _videoDevices === void 0 ? void 0 : _videoDevices.length) > 1;
      }
      get currentVoiceIndex() {
        return _classPrivateFieldGet(this, _curVoiceIdx);
      }
      get currentVoiceDevId() {
        if (_classPrivateFieldGet(this, _curVoiceIdx) < 0 || _classPrivateFieldGet(this, _curVoiceIdx) >= voiceDevices.length) {
          return "";
        }
        let dev = voiceDevices[_classPrivateFieldGet(this, _curVoiceIdx)];
        return dev.deviceId;
      }
      get currentFrontCamera() {
        var _classPrivateFieldGet2;
        return !!((_classPrivateFieldGet2 = _classPrivateFieldGet(this, _handle).deviceConfig) !== null && _classPrivateFieldGet2 !== void 0 && _classPrivateFieldGet2.frontCamera);
      }
      async toggleVoiceDevice() {
        if (!this.hasMultiVoiceDevice) {
          throw new Error("未找到多个麦克风无法进行切换");
        }
        if (this.voiceHeadphoneIndex < 0 || this.voiceHeadphoneIndex >= voiceDevices.length || isNaN(this.voiceHeadphoneIndex)) {
          throw new Error("错误的 voiceHeadphoneIndex");
        }
        if (this.voiceSpeakerIndex < 0 || this.voiceSpeakerIndex >= voiceDevices.length || isNaN(this.voiceSpeakerIndex)) {
          throw new Error("错误的 voiceSpeakerIndex");
        }
        // 在外放和听筒之间切换
        if (_classPrivateFieldGet(this, _curVoiceIdx) != this.voiceSpeakerIndex) {
          _classPrivateFieldSet(this, _curVoiceIdx, this.voiceSpeakerIndex);
        } else {
          _classPrivateFieldSet(this, _curVoiceIdx, this.voiceHeadphoneIndex);
        }
        // 音频设备信息
        let dev = voiceDevices[_classPrivateFieldGet(this, _curVoiceIdx)];
        // 更新设备配置值
        if (!_classPrivateFieldGet(this, _handle).deviceConfig) {
          _classPrivateFieldGet(this, _handle).deviceConfig = {
            audioDeviceId: dev.deviceId
          };
        } else {
          _classPrivateFieldGet(this, _handle).deviceConfig.audioDeviceId = dev.deviceId;
        }
        // 需要重新创建媒体流
        if (_classPrivateFieldGet(this, _handle).talking) {
          await _classPrivateFieldGet(this, _handle).updateMediaStream();
        }
        return [_classPrivateFieldGet(this, _curVoiceIdx), dev.deviceId, dev.label];
      }
      async updateVoiceSpeaker(value) {
        if (!this.hasMultiVoiceDevice) {
          throw new Error("未找到多个音频设备无法进行切换");
        }
        if (this.voiceHeadphoneIndex < 0 || this.voiceHeadphoneIndex >= voiceDevices.length || isNaN(this.voiceHeadphoneIndex)) {
          throw new Error("错误的 voiceHeadphoneIndex");
        }
        if (this.voiceSpeakerIndex < 0 || this.voiceSpeakerIndex >= voiceDevices.length || isNaN(this.voiceSpeakerIndex)) {
          throw new Error("错误的 voiceSpeakerIndex");
        }
        // 在外放和听筒之间切换
        if (value) {
          _classPrivateFieldSet(this, _curVoiceIdx, this.voiceSpeakerIndex);
        } else {
          _classPrivateFieldSet(this, _curVoiceIdx, this.voiceHeadphoneIndex);
        }
        // 音频设备信息
        let dev = voiceDevices[_classPrivateFieldGet(this, _curVoiceIdx)];
        // 更新设备配置值
        if (!_classPrivateFieldGet(this, _handle).deviceConfig) {
          _classPrivateFieldGet(this, _handle).deviceConfig = {
            audioDeviceId: dev.deviceId
          };
        } else {
          _classPrivateFieldGet(this, _handle).deviceConfig.audioDeviceId = dev.deviceId;
        }
        console.log("updateVoiceSpeaker:", _classPrivateFieldGet(this, _handle).deviceConfig);
        // 如果在通话过程中，需要重新创建媒体流
        if (_classPrivateFieldGet(this, _handle).talking) {
          await _classPrivateFieldGet(this, _handle).updateMediaStream();
        }
      }
      async updateFrontCamera(value) {
        if (!this.hasMultiVideoDevice) {
          throw new Error("未找到多个摄像头无法进行切换");
        }
        // 先设置配置值
        if (!_classPrivateFieldGet(this, _handle).deviceConfig) {
          _classPrivateFieldGet(this, _handle).deviceConfig = {
            frontCamera: value
          };
        } else {
          _classPrivateFieldGet(this, _handle).deviceConfig.frontCamera = value;
        }
        console.log("updateFrontCamera:", _classPrivateFieldGet(this, _handle).deviceConfig);
        // 如果在通话过程中，需要重新创建媒体流
        if (_classPrivateFieldGet(this, _handle).talking) {
          await _classPrivateFieldGet(this, _handle).updateMediaStream();
        }
      }
      async enableCamera(value) {
        _classPrivateFieldGet(this, _handle).enableCamera(value);
      }
    }

    // 当前js库版本号
    const VERSION = "1.2.20";

    /**
     * 基于WebRTC的软手柄操作对象
     */
    var _opts = /*#__PURE__*/new WeakMap();
    var _handler = /*#__PURE__*/new WeakMap();
    var _deviceControl = /*#__PURE__*/new WeakMap();
    class WebRtcSoftHandler {
      /** 当前js库版本号 */
      get version() {
        return VERSION;
      }
      get registed() {
        var _classPrivateFieldGet2;
        return !!((_classPrivateFieldGet2 = _classPrivateFieldGet(this, _handler)) !== null && _classPrivateFieldGet2 !== void 0 && _classPrivateFieldGet2.username);
      }
      get username() {
        return _classPrivateFieldGet(this, _handler).username;
      }
      get talking() {
        return _classPrivateFieldGet(this, _handler).talking;
      }
      get callId() {
        return _classPrivateFieldGet(this, _handler).callId;
      }
      constructor(opts) {
        _classPrivateFieldInitSpec(this, _opts, {
          writable: true,
          value: void 0
        });
        _classPrivateFieldInitSpec(this, _handler, {
          writable: true,
          value: void 0
        });
        _classPrivateFieldInitSpec(this, _deviceControl, {
          writable: true,
          value: void 0
        });
        if (!opts) {
          throw new Error("WebRtcSoftHandler 的参数 opts 不能为空");
        }
        _classPrivateFieldSet(this, _opts, Object.assign(Object.assign({}, DEF_INIT_OPTS), opts));
        checkMediaDevices();
        _classPrivateFieldSet(this, _handler, new JanusHandler(_classPrivateFieldGet(this, _opts)));
        _classPrivateFieldSet(this, _deviceControl, new DeviceControlImpl(_classPrivateFieldGet(this, _handler)));
      }
      initialize() {
        return _classPrivateFieldGet(this, _handler).initialize();
      }
      register(opts) {
        if (typeof opts === "string") {
          opts = {
            username: opts
          };
        }
        return _classPrivateFieldGet(this, _handler).register(opts.username, opts.displayName);
      }
      unregister() {
        return _classPrivateFieldGet(this, _handler).unregister();
      }
      destroy() {
        return _classPrivateFieldGet(this, _handler).destroy();
      }
      call(called, media) {
        var _classPrivateFieldGet3, _classPrivateFieldGet4;
        let sipUri = makeSipUri(called, (_classPrivateFieldGet3 = _classPrivateFieldGet(this, _opts).registerInfo) === null || _classPrivateFieldGet3 === void 0 ? void 0 : _classPrivateFieldGet3.sipServerIp, (_classPrivateFieldGet4 = _classPrivateFieldGet(this, _opts).registerInfo) === null || _classPrivateFieldGet4 === void 0 ? void 0 : _classPrivateFieldGet4.sipServerPort);
        return _classPrivateFieldGet(this, _handler).call(sipUri, media);
      }
      newcall(called, media) {
        var _classPrivateFieldGet5, _classPrivateFieldGet6;
        let sipUri = makeSipUri(called, (_classPrivateFieldGet5 = _classPrivateFieldGet(this, _opts).registerInfo) === null || _classPrivateFieldGet5 === void 0 ? void 0 : _classPrivateFieldGet5.sipServerIp, (_classPrivateFieldGet6 = _classPrivateFieldGet(this, _opts).registerInfo) === null || _classPrivateFieldGet6 === void 0 ? void 0 : _classPrivateFieldGet6.sipServerPort);
        return _classPrivateFieldGet(this, _handler).newcall(sipUri, media);
      }
      answer(media) {
        return _classPrivateFieldGet(this, _handler).answer(media);
      }
      hangup() {
        return _classPrivateFieldGet(this, _handler).hangup();
      }
      on(event, callback, key) {
        _classPrivateFieldGet(this, _handler).listener.addListener(event, callback, key);
      }
      off(event, callback) {
        _classPrivateFieldGet(this, _handler).listener.removeListener(event, callback);
      }
      setVideoContainer(opts) {
        _classPrivateFieldGet(this, _handler).setVideoContainer(opts);
      }
      listDevices() {
        return _classPrivateFieldGet(this, _handler).listDevices();
      }
      setDevice(deviceConfig) {
        console.warn("此接口已过时，请使用 softHandler.deviceControl.xxx 进行设备控制");
        _classPrivateFieldGet(this, _handler).setDevice(deviceConfig);
      }
      get audioOutputMuted() {
        return _classPrivateFieldGet(this, _handler).isAudioOutputMuted();
      }
      set audioOutputMuted(value) {
        _classPrivateFieldGet(this, _handler).setAudioOutputMuted(value);
      }
      get audioInputMuted() {
        return _classPrivateFieldGet(this, _handler).isAudioInputMuted();
      }
      set audioInputMuted(value) {
        _classPrivateFieldGet(this, _handler).setAudioInputMuted(value);
      }
      get deviceControl() {
        return _classPrivateFieldGet(this, _deviceControl);
      }
    }

    /**
     * 创建一个新的软手柄操作对象
     * @param opts 初始化参数
     * @returns 软手柄操作对象
     */
    async function createSoftHandler(opts) {
      let handler = new WebRtcSoftHandler(opts);
      await handler.initialize();
      return handler;
    }

    /**
     * 返回当前机器的音视频设备列表
     * @returns 找到的设备列表
     * @throws 当不支持设备相关API时，或者调用失败时
     */
    async function listMediaDevices() {
      return listDevices();
    }

    exports.createSoftHandler = createSoftHandler;
    exports.listMediaDevices = listMediaDevices;

}));
//# sourceMappingURL=index.umd.js.map
