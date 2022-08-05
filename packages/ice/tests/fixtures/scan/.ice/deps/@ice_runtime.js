var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/.pnpm/history@5.3.0/node_modules/history/umd/history.production.min.js
var require_history_production_min = __commonJS({
  "node_modules/.pnpm/history@5.3.0/node_modules/history/umd/history.production.min.js"(exports, module2) {
    !function(t, n) {
      typeof exports == "object" && typeof module2 != "undefined" ? n(exports) : typeof define == "function" && define.amd ? define(["exports"], n) : n((t = typeof globalThis != "undefined" ? globalThis : t || self).HistoryLibrary = {});
    }(exports, function(t) {
      "use strict";
      function n() {
        return (n = Object.assign || function(t2) {
          for (var n2 = 1; n2 < arguments.length; n2++) {
            var e2 = arguments[n2];
            for (var r2 in e2)
              Object.prototype.hasOwnProperty.call(e2, r2) && (t2[r2] = e2[r2]);
          }
          return t2;
        }).apply(this, arguments);
      }
      var e;
      t.Action = void 0, (e = t.Action || (t.Action = {})).Pop = "POP", e.Push = "PUSH", e.Replace = "REPLACE";
      var r = "beforeunload", o = "popstate";
      function a(t2, n2, e2) {
        return Math.min(Math.max(t2, n2), e2);
      }
      function i(t2) {
        t2.preventDefault(), t2.returnValue = "";
      }
      function c() {
        var t2 = [];
        return { get length() {
          return t2.length;
        }, push: function(n2) {
          return t2.push(n2), function() {
            t2 = t2.filter(function(t3) {
              return t3 !== n2;
            });
          };
        }, call: function(n2) {
          t2.forEach(function(t3) {
            return t3 && t3(n2);
          });
        } };
      }
      function u() {
        return Math.random().toString(36).substr(2, 8);
      }
      function l(t2) {
        var n2 = t2.pathname, e2 = n2 === void 0 ? "/" : n2, r2 = t2.search, o2 = r2 === void 0 ? "" : r2, a2 = t2.hash, i2 = a2 === void 0 ? "" : a2;
        return o2 && o2 !== "?" && (e2 += o2.charAt(0) === "?" ? o2 : "?" + o2), i2 && i2 !== "#" && (e2 += i2.charAt(0) === "#" ? i2 : "#" + i2), e2;
      }
      function f(t2) {
        var n2 = {};
        if (t2) {
          var e2 = t2.indexOf("#");
          e2 >= 0 && (n2.hash = t2.substr(e2), t2 = t2.substr(0, e2));
          var r2 = t2.indexOf("?");
          r2 >= 0 && (n2.search = t2.substr(r2), t2 = t2.substr(0, r2)), t2 && (n2.pathname = t2);
        }
        return n2;
      }
      t.createBrowserHistory = function(e2) {
        e2 === void 0 && (e2 = {});
        var a2 = e2.window, s = a2 === void 0 ? document.defaultView : a2, h = s.history;
        function p() {
          var t2 = s.location, n2 = t2.pathname, e3 = t2.search, r2 = t2.hash, o2 = h.state || {};
          return [o2.idx, { pathname: n2, search: e3, hash: r2, state: o2.usr || null, key: o2.key || "default" }];
        }
        var v = null;
        s.addEventListener(o, function() {
          if (v)
            A.call(v), v = null;
          else {
            var n2 = t.Action.Pop, e3 = p(), r2 = e3[0], o2 = e3[1];
            if (A.length) {
              if (r2 != null) {
                var a3 = y - r2;
                a3 && (v = { action: n2, location: o2, retry: function() {
                  H(-1 * a3);
                } }, H(a3));
              }
            } else
              E(n2);
          }
        });
        var d = t.Action.Pop, g = p(), y = g[0], m = g[1], b = c(), A = c();
        function P(t2) {
          return typeof t2 == "string" ? t2 : l(t2);
        }
        function k(t2, e3) {
          return e3 === void 0 && (e3 = null), n({ pathname: m.pathname, hash: "", search: "" }, typeof t2 == "string" ? f(t2) : t2, { state: e3, key: u() });
        }
        function x(t2, n2) {
          return [{ usr: t2.state, key: t2.key, idx: n2 }, P(t2)];
        }
        function w(t2, n2, e3) {
          return !A.length || (A.call({ action: t2, location: n2, retry: e3 }), false);
        }
        function E(t2) {
          d = t2;
          var n2 = p();
          y = n2[0], m = n2[1], b.call({ action: d, location: m });
        }
        function H(t2) {
          h.go(t2);
        }
        return y == null && (y = 0, h.replaceState(n({}, h.state, { idx: y }), "")), { get action() {
          return d;
        }, get location() {
          return m;
        }, createHref: P, push: function n2(e3, r2) {
          var o2 = t.Action.Push, a3 = k(e3, r2);
          if (w(o2, a3, function() {
            n2(e3, r2);
          })) {
            var i2 = x(a3, y + 1), c2 = i2[0], u2 = i2[1];
            try {
              h.pushState(c2, "", u2);
            } catch (t2) {
              s.location.assign(u2);
            }
            E(o2);
          }
        }, replace: function n2(e3, r2) {
          var o2 = t.Action.Replace, a3 = k(e3, r2);
          if (w(o2, a3, function() {
            n2(e3, r2);
          })) {
            var i2 = x(a3, y), c2 = i2[0], u2 = i2[1];
            h.replaceState(c2, "", u2), E(o2);
          }
        }, go: H, back: function() {
          H(-1);
        }, forward: function() {
          H(1);
        }, listen: function(t2) {
          return b.push(t2);
        }, block: function(t2) {
          var n2 = A.push(t2);
          return A.length === 1 && s.addEventListener(r, i), function() {
            n2(), A.length || s.removeEventListener(r, i);
          };
        } };
      }, t.createHashHistory = function(e2) {
        e2 === void 0 && (e2 = {});
        var a2 = e2.window, s = a2 === void 0 ? document.defaultView : a2, h = s.history;
        function p() {
          var t2 = f(s.location.hash.substr(1)), n2 = t2.pathname, e3 = n2 === void 0 ? "/" : n2, r2 = t2.search, o2 = r2 === void 0 ? "" : r2, a3 = t2.hash, i2 = a3 === void 0 ? "" : a3, c2 = h.state || {};
          return [c2.idx, { pathname: e3, search: o2, hash: i2, state: c2.usr || null, key: c2.key || "default" }];
        }
        var v = null;
        function d() {
          if (v)
            P.call(v), v = null;
          else {
            var n2 = t.Action.Pop, e3 = p(), r2 = e3[0], o2 = e3[1];
            if (P.length) {
              if (r2 != null) {
                var a3 = m - r2;
                a3 && (v = { action: n2, location: o2, retry: function() {
                  L(-1 * a3);
                } }, L(a3));
              }
            } else
              H(n2);
          }
        }
        s.addEventListener(o, d), s.addEventListener("hashchange", function() {
          l(p()[1]) !== l(b) && d();
        });
        var g = t.Action.Pop, y = p(), m = y[0], b = y[1], A = c(), P = c();
        function k(t2) {
          return function() {
            var t3 = document.querySelector("base"), n2 = "";
            if (t3 && t3.getAttribute("href")) {
              var e3 = s.location.href, r2 = e3.indexOf("#");
              n2 = r2 === -1 ? e3 : e3.slice(0, r2);
            }
            return n2;
          }() + "#" + (typeof t2 == "string" ? t2 : l(t2));
        }
        function x(t2, e3) {
          return e3 === void 0 && (e3 = null), n({ pathname: b.pathname, hash: "", search: "" }, typeof t2 == "string" ? f(t2) : t2, { state: e3, key: u() });
        }
        function w(t2, n2) {
          return [{ usr: t2.state, key: t2.key, idx: n2 }, k(t2)];
        }
        function E(t2, n2, e3) {
          return !P.length || (P.call({ action: t2, location: n2, retry: e3 }), false);
        }
        function H(t2) {
          g = t2;
          var n2 = p();
          m = n2[0], b = n2[1], A.call({ action: g, location: b });
        }
        function L(t2) {
          h.go(t2);
        }
        return m == null && (m = 0, h.replaceState(n({}, h.state, { idx: m }), "")), { get action() {
          return g;
        }, get location() {
          return b;
        }, createHref: k, push: function n2(e3, r2) {
          var o2 = t.Action.Push, a3 = x(e3, r2);
          if (E(o2, a3, function() {
            n2(e3, r2);
          })) {
            var i2 = w(a3, m + 1), c2 = i2[0], u2 = i2[1];
            try {
              h.pushState(c2, "", u2);
            } catch (t2) {
              s.location.assign(u2);
            }
            H(o2);
          }
        }, replace: function n2(e3, r2) {
          var o2 = t.Action.Replace, a3 = x(e3, r2);
          if (E(o2, a3, function() {
            n2(e3, r2);
          })) {
            var i2 = w(a3, m), c2 = i2[0], u2 = i2[1];
            h.replaceState(c2, "", u2), H(o2);
          }
        }, go: L, back: function() {
          L(-1);
        }, forward: function() {
          L(1);
        }, listen: function(t2) {
          return A.push(t2);
        }, block: function(t2) {
          var n2 = P.push(t2);
          return P.length === 1 && s.addEventListener(r, i), function() {
            n2(), P.length || s.removeEventListener(r, i);
          };
        } };
      }, t.createMemoryHistory = function(e2) {
        e2 === void 0 && (e2 = {});
        var r2 = e2, o2 = r2.initialEntries, i2 = o2 === void 0 ? ["/"] : o2, s = r2.initialIndex, h = i2.map(function(t2) {
          return n({ pathname: "/", search: "", hash: "", state: null, key: u() }, typeof t2 == "string" ? f(t2) : t2);
        }), p = a(s == null ? h.length - 1 : s, 0, h.length - 1), v = t.Action.Pop, d = h[p], g = c(), y = c();
        function m(t2, e3) {
          return e3 === void 0 && (e3 = null), n({ pathname: d.pathname, search: "", hash: "" }, typeof t2 == "string" ? f(t2) : t2, { state: e3, key: u() });
        }
        function b(t2, n2, e3) {
          return !y.length || (y.call({ action: t2, location: n2, retry: e3 }), false);
        }
        function A(t2, n2) {
          v = t2, d = n2, g.call({ action: v, location: d });
        }
        function P(n2) {
          var e3 = a(p + n2, 0, h.length - 1), r3 = t.Action.Pop, o3 = h[e3];
          b(r3, o3, function() {
            P(n2);
          }) && (p = e3, A(r3, o3));
        }
        return { get index() {
          return p;
        }, get action() {
          return v;
        }, get location() {
          return d;
        }, createHref: function(t2) {
          return typeof t2 == "string" ? t2 : l(t2);
        }, push: function n2(e3, r3) {
          var o3 = t.Action.Push, a2 = m(e3, r3);
          b(o3, a2, function() {
            n2(e3, r3);
          }) && (p += 1, h.splice(p, h.length, a2), A(o3, a2));
        }, replace: function n2(e3, r3) {
          var o3 = t.Action.Replace, a2 = m(e3, r3);
          b(o3, a2, function() {
            n2(e3, r3);
          }) && (h[p] = a2, A(o3, a2));
        }, go: P, back: function() {
          P(-1);
        }, forward: function() {
          P(1);
        }, listen: function(t2) {
          return g.push(t2);
        }, block: function(t2) {
          return y.push(t2);
        } };
      }, t.createPath = l, t.parsePath = f, Object.defineProperty(t, "__esModule", { value: true });
    });
  }
});

// node_modules/.pnpm/history@5.3.0/node_modules/history/umd/history.development.js
var require_history_development = __commonJS({
  "node_modules/.pnpm/history@5.3.0/node_modules/history/umd/history.development.js"(exports, module2) {
    (function(global, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.HistoryLibrary = {}));
    })(exports, function(exports2) {
      "use strict";
      function _extends() {
        _extends = Object.assign || function(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }
          return target;
        };
        return _extends.apply(this, arguments);
      }
      exports2.Action = void 0;
      (function(Action) {
        Action["Pop"] = "POP";
        Action["Push"] = "PUSH";
        Action["Replace"] = "REPLACE";
      })(exports2.Action || (exports2.Action = {}));
      var readOnly = function(obj) {
        return Object.freeze(obj);
      };
      function warning(cond, message) {
        if (!cond) {
          if (typeof console !== "undefined")
            console.warn(message);
          try {
            throw new Error(message);
          } catch (e) {
          }
        }
      }
      var BeforeUnloadEventType = "beforeunload";
      var HashChangeEventType = "hashchange";
      var PopStateEventType = "popstate";
      function createBrowserHistory2(options) {
        if (options === void 0) {
          options = {};
        }
        var _options = options, _options$window = _options.window, window2 = _options$window === void 0 ? document.defaultView : _options$window;
        var globalHistory = window2.history;
        function getIndexAndLocation() {
          var _window$location = window2.location, pathname = _window$location.pathname, search = _window$location.search, hash = _window$location.hash;
          var state = globalHistory.state || {};
          return [state.idx, readOnly({
            pathname,
            search,
            hash,
            state: state.usr || null,
            key: state.key || "default"
          })];
        }
        var blockedPopTx = null;
        function handlePop() {
          if (blockedPopTx) {
            blockers.call(blockedPopTx);
            blockedPopTx = null;
          } else {
            var nextAction = exports2.Action.Pop;
            var _getIndexAndLocation = getIndexAndLocation(), nextIndex = _getIndexAndLocation[0], nextLocation = _getIndexAndLocation[1];
            if (blockers.length) {
              if (nextIndex != null) {
                var delta = index - nextIndex;
                if (delta) {
                  blockedPopTx = {
                    action: nextAction,
                    location: nextLocation,
                    retry: function retry() {
                      go(delta * -1);
                    }
                  };
                  go(delta);
                }
              } else {
                warning(false, "You are trying to block a POP navigation to a location that was not created by the history library. The block will fail silently in production, but in general you should do all navigation with the history library (instead of using window.history.pushState directly) to avoid this situation.");
              }
            } else {
              applyTx(nextAction);
            }
          }
        }
        window2.addEventListener(PopStateEventType, handlePop);
        var action = exports2.Action.Pop;
        var _getIndexAndLocation2 = getIndexAndLocation(), index = _getIndexAndLocation2[0], location = _getIndexAndLocation2[1];
        var listeners = createEvents();
        var blockers = createEvents();
        if (index == null) {
          index = 0;
          globalHistory.replaceState(_extends({}, globalHistory.state, {
            idx: index
          }), "");
        }
        function createHref(to) {
          return typeof to === "string" ? to : createPath(to);
        }
        function getNextLocation(to, state) {
          if (state === void 0) {
            state = null;
          }
          return readOnly(_extends({
            pathname: location.pathname,
            hash: "",
            search: ""
          }, typeof to === "string" ? parsePath(to) : to, {
            state,
            key: createKey()
          }));
        }
        function getHistoryStateAndUrl(nextLocation, index2) {
          return [{
            usr: nextLocation.state,
            key: nextLocation.key,
            idx: index2
          }, createHref(nextLocation)];
        }
        function allowTx(action2, location2, retry) {
          return !blockers.length || (blockers.call({
            action: action2,
            location: location2,
            retry
          }), false);
        }
        function applyTx(nextAction) {
          action = nextAction;
          var _getIndexAndLocation3 = getIndexAndLocation();
          index = _getIndexAndLocation3[0];
          location = _getIndexAndLocation3[1];
          listeners.call({
            action,
            location
          });
        }
        function push(to, state) {
          var nextAction = exports2.Action.Push;
          var nextLocation = getNextLocation(to, state);
          function retry() {
            push(to, state);
          }
          if (allowTx(nextAction, nextLocation, retry)) {
            var _getHistoryStateAndUr = getHistoryStateAndUrl(nextLocation, index + 1), historyState = _getHistoryStateAndUr[0], url = _getHistoryStateAndUr[1];
            try {
              globalHistory.pushState(historyState, "", url);
            } catch (error) {
              window2.location.assign(url);
            }
            applyTx(nextAction);
          }
        }
        function replace(to, state) {
          var nextAction = exports2.Action.Replace;
          var nextLocation = getNextLocation(to, state);
          function retry() {
            replace(to, state);
          }
          if (allowTx(nextAction, nextLocation, retry)) {
            var _getHistoryStateAndUr2 = getHistoryStateAndUrl(nextLocation, index), historyState = _getHistoryStateAndUr2[0], url = _getHistoryStateAndUr2[1];
            globalHistory.replaceState(historyState, "", url);
            applyTx(nextAction);
          }
        }
        function go(delta) {
          globalHistory.go(delta);
        }
        var history = {
          get action() {
            return action;
          },
          get location() {
            return location;
          },
          createHref,
          push,
          replace,
          go,
          back: function back() {
            go(-1);
          },
          forward: function forward() {
            go(1);
          },
          listen: function listen(listener) {
            return listeners.push(listener);
          },
          block: function block(blocker) {
            var unblock = blockers.push(blocker);
            if (blockers.length === 1) {
              window2.addEventListener(BeforeUnloadEventType, promptBeforeUnload);
            }
            return function() {
              unblock();
              if (!blockers.length) {
                window2.removeEventListener(BeforeUnloadEventType, promptBeforeUnload);
              }
            };
          }
        };
        return history;
      }
      function createHashHistory2(options) {
        if (options === void 0) {
          options = {};
        }
        var _options2 = options, _options2$window = _options2.window, window2 = _options2$window === void 0 ? document.defaultView : _options2$window;
        var globalHistory = window2.history;
        function getIndexAndLocation() {
          var _parsePath = parsePath(window2.location.hash.substr(1)), _parsePath$pathname = _parsePath.pathname, pathname = _parsePath$pathname === void 0 ? "/" : _parsePath$pathname, _parsePath$search = _parsePath.search, search = _parsePath$search === void 0 ? "" : _parsePath$search, _parsePath$hash = _parsePath.hash, hash = _parsePath$hash === void 0 ? "" : _parsePath$hash;
          var state = globalHistory.state || {};
          return [state.idx, readOnly({
            pathname,
            search,
            hash,
            state: state.usr || null,
            key: state.key || "default"
          })];
        }
        var blockedPopTx = null;
        function handlePop() {
          if (blockedPopTx) {
            blockers.call(blockedPopTx);
            blockedPopTx = null;
          } else {
            var nextAction = exports2.Action.Pop;
            var _getIndexAndLocation4 = getIndexAndLocation(), nextIndex = _getIndexAndLocation4[0], nextLocation = _getIndexAndLocation4[1];
            if (blockers.length) {
              if (nextIndex != null) {
                var delta = index - nextIndex;
                if (delta) {
                  blockedPopTx = {
                    action: nextAction,
                    location: nextLocation,
                    retry: function retry() {
                      go(delta * -1);
                    }
                  };
                  go(delta);
                }
              } else {
                warning(false, "You are trying to block a POP navigation to a location that was not created by the history library. The block will fail silently in production, but in general you should do all navigation with the history library (instead of using window.history.pushState directly) to avoid this situation.");
              }
            } else {
              applyTx(nextAction);
            }
          }
        }
        window2.addEventListener(PopStateEventType, handlePop);
        window2.addEventListener(HashChangeEventType, function() {
          var _getIndexAndLocation5 = getIndexAndLocation(), nextLocation = _getIndexAndLocation5[1];
          if (createPath(nextLocation) !== createPath(location)) {
            handlePop();
          }
        });
        var action = exports2.Action.Pop;
        var _getIndexAndLocation6 = getIndexAndLocation(), index = _getIndexAndLocation6[0], location = _getIndexAndLocation6[1];
        var listeners = createEvents();
        var blockers = createEvents();
        if (index == null) {
          index = 0;
          globalHistory.replaceState(_extends({}, globalHistory.state, {
            idx: index
          }), "");
        }
        function getBaseHref() {
          var base = document.querySelector("base");
          var href = "";
          if (base && base.getAttribute("href")) {
            var url = window2.location.href;
            var hashIndex = url.indexOf("#");
            href = hashIndex === -1 ? url : url.slice(0, hashIndex);
          }
          return href;
        }
        function createHref(to) {
          return getBaseHref() + "#" + (typeof to === "string" ? to : createPath(to));
        }
        function getNextLocation(to, state) {
          if (state === void 0) {
            state = null;
          }
          return readOnly(_extends({
            pathname: location.pathname,
            hash: "",
            search: ""
          }, typeof to === "string" ? parsePath(to) : to, {
            state,
            key: createKey()
          }));
        }
        function getHistoryStateAndUrl(nextLocation, index2) {
          return [{
            usr: nextLocation.state,
            key: nextLocation.key,
            idx: index2
          }, createHref(nextLocation)];
        }
        function allowTx(action2, location2, retry) {
          return !blockers.length || (blockers.call({
            action: action2,
            location: location2,
            retry
          }), false);
        }
        function applyTx(nextAction) {
          action = nextAction;
          var _getIndexAndLocation7 = getIndexAndLocation();
          index = _getIndexAndLocation7[0];
          location = _getIndexAndLocation7[1];
          listeners.call({
            action,
            location
          });
        }
        function push(to, state) {
          var nextAction = exports2.Action.Push;
          var nextLocation = getNextLocation(to, state);
          function retry() {
            push(to, state);
          }
          warning(nextLocation.pathname.charAt(0) === "/", "Relative pathnames are not supported in hash history.push(" + JSON.stringify(to) + ")");
          if (allowTx(nextAction, nextLocation, retry)) {
            var _getHistoryStateAndUr3 = getHistoryStateAndUrl(nextLocation, index + 1), historyState = _getHistoryStateAndUr3[0], url = _getHistoryStateAndUr3[1];
            try {
              globalHistory.pushState(historyState, "", url);
            } catch (error) {
              window2.location.assign(url);
            }
            applyTx(nextAction);
          }
        }
        function replace(to, state) {
          var nextAction = exports2.Action.Replace;
          var nextLocation = getNextLocation(to, state);
          function retry() {
            replace(to, state);
          }
          warning(nextLocation.pathname.charAt(0) === "/", "Relative pathnames are not supported in hash history.replace(" + JSON.stringify(to) + ")");
          if (allowTx(nextAction, nextLocation, retry)) {
            var _getHistoryStateAndUr4 = getHistoryStateAndUrl(nextLocation, index), historyState = _getHistoryStateAndUr4[0], url = _getHistoryStateAndUr4[1];
            globalHistory.replaceState(historyState, "", url);
            applyTx(nextAction);
          }
        }
        function go(delta) {
          globalHistory.go(delta);
        }
        var history = {
          get action() {
            return action;
          },
          get location() {
            return location;
          },
          createHref,
          push,
          replace,
          go,
          back: function back() {
            go(-1);
          },
          forward: function forward() {
            go(1);
          },
          listen: function listen(listener) {
            return listeners.push(listener);
          },
          block: function block(blocker) {
            var unblock = blockers.push(blocker);
            if (blockers.length === 1) {
              window2.addEventListener(BeforeUnloadEventType, promptBeforeUnload);
            }
            return function() {
              unblock();
              if (!blockers.length) {
                window2.removeEventListener(BeforeUnloadEventType, promptBeforeUnload);
              }
            };
          }
        };
        return history;
      }
      function createMemoryHistory2(options) {
        if (options === void 0) {
          options = {};
        }
        var _options3 = options, _options3$initialEntr = _options3.initialEntries, initialEntries = _options3$initialEntr === void 0 ? ["/"] : _options3$initialEntr, initialIndex = _options3.initialIndex;
        var entries = initialEntries.map(function(entry) {
          var location2 = readOnly(_extends({
            pathname: "/",
            search: "",
            hash: "",
            state: null,
            key: createKey()
          }, typeof entry === "string" ? parsePath(entry) : entry));
          warning(location2.pathname.charAt(0) === "/", "Relative pathnames are not supported in createMemoryHistory({ initialEntries }) (invalid entry: " + JSON.stringify(entry) + ")");
          return location2;
        });
        var index = clamp(initialIndex == null ? entries.length - 1 : initialIndex, 0, entries.length - 1);
        var action = exports2.Action.Pop;
        var location = entries[index];
        var listeners = createEvents();
        var blockers = createEvents();
        function createHref(to) {
          return typeof to === "string" ? to : createPath(to);
        }
        function getNextLocation(to, state) {
          if (state === void 0) {
            state = null;
          }
          return readOnly(_extends({
            pathname: location.pathname,
            search: "",
            hash: ""
          }, typeof to === "string" ? parsePath(to) : to, {
            state,
            key: createKey()
          }));
        }
        function allowTx(action2, location2, retry) {
          return !blockers.length || (blockers.call({
            action: action2,
            location: location2,
            retry
          }), false);
        }
        function applyTx(nextAction, nextLocation) {
          action = nextAction;
          location = nextLocation;
          listeners.call({
            action,
            location
          });
        }
        function push(to, state) {
          var nextAction = exports2.Action.Push;
          var nextLocation = getNextLocation(to, state);
          function retry() {
            push(to, state);
          }
          warning(location.pathname.charAt(0) === "/", "Relative pathnames are not supported in memory history.push(" + JSON.stringify(to) + ")");
          if (allowTx(nextAction, nextLocation, retry)) {
            index += 1;
            entries.splice(index, entries.length, nextLocation);
            applyTx(nextAction, nextLocation);
          }
        }
        function replace(to, state) {
          var nextAction = exports2.Action.Replace;
          var nextLocation = getNextLocation(to, state);
          function retry() {
            replace(to, state);
          }
          warning(location.pathname.charAt(0) === "/", "Relative pathnames are not supported in memory history.replace(" + JSON.stringify(to) + ")");
          if (allowTx(nextAction, nextLocation, retry)) {
            entries[index] = nextLocation;
            applyTx(nextAction, nextLocation);
          }
        }
        function go(delta) {
          var nextIndex = clamp(index + delta, 0, entries.length - 1);
          var nextAction = exports2.Action.Pop;
          var nextLocation = entries[nextIndex];
          function retry() {
            go(delta);
          }
          if (allowTx(nextAction, nextLocation, retry)) {
            index = nextIndex;
            applyTx(nextAction, nextLocation);
          }
        }
        var history = {
          get index() {
            return index;
          },
          get action() {
            return action;
          },
          get location() {
            return location;
          },
          createHref,
          push,
          replace,
          go,
          back: function back() {
            go(-1);
          },
          forward: function forward() {
            go(1);
          },
          listen: function listen(listener) {
            return listeners.push(listener);
          },
          block: function block(blocker) {
            return blockers.push(blocker);
          }
        };
        return history;
      }
      function clamp(n, lowerBound, upperBound) {
        return Math.min(Math.max(n, lowerBound), upperBound);
      }
      function promptBeforeUnload(event) {
        event.preventDefault();
        event.returnValue = "";
      }
      function createEvents() {
        var handlers = [];
        return {
          get length() {
            return handlers.length;
          },
          push: function push(fn) {
            handlers.push(fn);
            return function() {
              handlers = handlers.filter(function(handler) {
                return handler !== fn;
              });
            };
          },
          call: function call(arg) {
            handlers.forEach(function(fn) {
              return fn && fn(arg);
            });
          }
        };
      }
      function createKey() {
        return Math.random().toString(36).substr(2, 8);
      }
      function createPath(_ref) {
        var _ref$pathname = _ref.pathname, pathname = _ref$pathname === void 0 ? "/" : _ref$pathname, _ref$search = _ref.search, search = _ref$search === void 0 ? "" : _ref$search, _ref$hash = _ref.hash, hash = _ref$hash === void 0 ? "" : _ref$hash;
        if (search && search !== "?")
          pathname += search.charAt(0) === "?" ? search : "?" + search;
        if (hash && hash !== "#")
          pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
        return pathname;
      }
      function parsePath(path) {
        var parsedPath = {};
        if (path) {
          var hashIndex = path.indexOf("#");
          if (hashIndex >= 0) {
            parsedPath.hash = path.substr(hashIndex);
            path = path.substr(0, hashIndex);
          }
          var searchIndex = path.indexOf("?");
          if (searchIndex >= 0) {
            parsedPath.search = path.substr(searchIndex);
            path = path.substr(0, searchIndex);
          }
          if (path) {
            parsedPath.pathname = path;
          }
        }
        return parsedPath;
      }
      exports2.createBrowserHistory = createBrowserHistory2;
      exports2.createHashHistory = createHashHistory2;
      exports2.createMemoryHistory = createMemoryHistory2;
      exports2.createPath = createPath;
      exports2.parsePath = parsePath;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/.pnpm/history@5.3.0/node_modules/history/main.js
var require_main = __commonJS({
  "node_modules/.pnpm/history@5.3.0/node_modules/history/main.js"(exports, module2) {
    "use strict";
    if (process.env.NODE_ENV === "production") {
      module2.exports = require_history_production_min();
    } else {
      module2.exports = require_history_development();
    }
  }
});

// node_modules/.pnpm/react-router@6.3.0_react@18.0.0/node_modules/react-router/umd/react-router.production.min.js
var require_react_router_production_min = __commonJS({
  "node_modules/.pnpm/react-router@6.3.0_react@18.0.0/node_modules/react-router/umd/react-router.production.min.js"(exports, module2) {
    !function(e, t) {
      typeof exports == "object" && typeof module2 != "undefined" ? t(exports, require_main(), require("react")) : typeof define == "function" && define.amd ? define(["exports", "history", "react"], t) : t((e = e || self).ReactRouter = {}, e.HistoryLibrary, e.React);
    }(exports, function(e, t, n) {
      "use strict";
      const a = n.createContext(null), r = n.createContext(null), i = n.createContext({ outlet: null, matches: [] });
      function l(e2, t2) {
        if (!e2)
          throw new Error(t2);
      }
      function o(e2, n2, a2) {
        a2 === void 0 && (a2 = "/");
        let r2 = g((typeof n2 == "string" ? t.parsePath(n2) : n2).pathname || "/", a2);
        if (r2 == null)
          return null;
        let i2 = s(e2);
        !function(e3) {
          e3.sort((e4, t2) => e4.score !== t2.score ? t2.score - e4.score : function(e5, t3) {
            return e5.length === t3.length && e5.slice(0, -1).every((e6, n3) => e6 === t3[n3]) ? e5[e5.length - 1] - t3[t3.length - 1] : 0;
          }(e4.routesMeta.map((e5) => e5.childrenIndex), t2.routesMeta.map((e5) => e5.childrenIndex)));
        }(i2);
        let l2 = null;
        for (let e3 = 0; l2 == null && e3 < i2.length; ++e3)
          l2 = p(i2[e3], r2);
        return l2;
      }
      function s(e2, t2, n2, a2) {
        return t2 === void 0 && (t2 = []), n2 === void 0 && (n2 = []), a2 === void 0 && (a2 = ""), e2.forEach((e3, r2) => {
          let i2 = { relativePath: e3.path || "", caseSensitive: e3.caseSensitive === true, childrenIndex: r2, route: e3 };
          i2.relativePath.startsWith("/") && (i2.relativePath.startsWith(a2) || l(false), i2.relativePath = i2.relativePath.slice(a2.length));
          let o2 = v([a2, i2.relativePath]), u2 = n2.concat(i2);
          e3.children && e3.children.length > 0 && (e3.index === true && l(false), s(e3.children, t2, u2, o2)), (e3.path != null || e3.index) && t2.push({ path: o2, score: h(o2, e3.index), routesMeta: u2 });
        }), t2;
      }
      const u = /^:\w+$/, c = (e2) => e2 === "*";
      function h(e2, t2) {
        let n2 = e2.split("/"), a2 = n2.length;
        return n2.some(c) && (a2 += -2), t2 && (a2 += 2), n2.filter((e3) => !c(e3)).reduce((e3, t3) => e3 + (u.test(t3) ? 3 : t3 === "" ? 1 : 10), a2);
      }
      function p(e2, t2) {
        let { routesMeta: n2 } = e2, a2 = {}, r2 = "/", i2 = [];
        for (let e3 = 0; e3 < n2.length; ++e3) {
          let l2 = n2[e3], o2 = e3 === n2.length - 1, s2 = r2 === "/" ? t2 : t2.slice(r2.length) || "/", u2 = f({ path: l2.relativePath, caseSensitive: l2.caseSensitive, end: o2 }, s2);
          if (!u2)
            return null;
          Object.assign(a2, u2.params);
          let c2 = l2.route;
          i2.push({ params: a2, pathname: v([r2, u2.pathname]), pathnameBase: y(v([r2, u2.pathnameBase])), route: c2 }), u2.pathnameBase !== "/" && (r2 = v([r2, u2.pathnameBase]));
        }
        return i2;
      }
      function f(e2, t2) {
        typeof e2 == "string" && (e2 = { path: e2, caseSensitive: false, end: true });
        let [n2, a2] = function(e3, t3, n3) {
          t3 === void 0 && (t3 = false);
          n3 === void 0 && (n3 = true);
          let a3 = [], r3 = "^" + e3.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^$?{}|()[\]]/g, "\\$&").replace(/:(\w+)/g, (e4, t4) => (a3.push(t4), "([^\\/]+)"));
          e3.endsWith("*") ? (a3.push("*"), r3 += e3 === "*" || e3 === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : r3 += n3 ? "\\/*$" : "(?:(?=[.~-]|%[0-9A-F]{2})|\\b|\\/|$)";
          return [new RegExp(r3, t3 ? void 0 : "i"), a3];
        }(e2.path, e2.caseSensitive, e2.end), r2 = t2.match(n2);
        if (!r2)
          return null;
        let i2 = r2[0], l2 = i2.replace(/(.)\/+$/, "$1"), o2 = r2.slice(1);
        return { params: a2.reduce((e3, t3, n3) => {
          if (t3 === "*") {
            let e4 = o2[n3] || "";
            l2 = i2.slice(0, i2.length - e4.length).replace(/(.)\/+$/, "$1");
          }
          return e3[t3] = function(e4, t4) {
            try {
              return decodeURIComponent(e4);
            } catch (t5) {
              return e4;
            }
          }(o2[n3] || ""), e3;
        }, {}), pathname: i2, pathnameBase: l2, pattern: e2 };
      }
      function m(e2, n2) {
        n2 === void 0 && (n2 = "/");
        let { pathname: a2, search: r2 = "", hash: i2 = "" } = typeof e2 == "string" ? t.parsePath(e2) : e2, l2 = a2 ? a2.startsWith("/") ? a2 : function(e3, t2) {
          let n3 = t2.replace(/\/+$/, "").split("/");
          return e3.split("/").forEach((e4) => {
            e4 === ".." ? n3.length > 1 && n3.pop() : e4 !== "." && n3.push(e4);
          }), n3.length > 1 ? n3.join("/") : "/";
        }(a2, n2) : n2;
        return { pathname: l2, search: x(r2), hash: P(i2) };
      }
      function d(e2, n2, a2) {
        let r2, i2 = typeof e2 == "string" ? t.parsePath(e2) : e2, l2 = e2 === "" || i2.pathname === "" ? "/" : i2.pathname;
        if (l2 == null)
          r2 = a2;
        else {
          let e3 = n2.length - 1;
          if (l2.startsWith("..")) {
            let t2 = l2.split("/");
            for (; t2[0] === ".."; )
              t2.shift(), e3 -= 1;
            i2.pathname = t2.join("/");
          }
          r2 = e3 >= 0 ? n2[e3] : "/";
        }
        let o2 = m(i2, r2);
        return l2 && l2 !== "/" && l2.endsWith("/") && !o2.pathname.endsWith("/") && (o2.pathname += "/"), o2;
      }
      function g(e2, t2) {
        if (t2 === "/")
          return e2;
        if (!e2.toLowerCase().startsWith(t2.toLowerCase()))
          return null;
        let n2 = e2.charAt(t2.length);
        return n2 && n2 !== "/" ? null : e2.slice(t2.length) || "/";
      }
      const v = (e2) => e2.join("/").replace(/\/\/+/g, "/"), y = (e2) => e2.replace(/\/+$/, "").replace(/^\/*/, "/"), x = (e2) => e2 && e2 !== "?" ? e2.startsWith("?") ? e2 : "?" + e2 : "", P = (e2) => e2 && e2 !== "#" ? e2.startsWith("#") ? e2 : "#" + e2 : "";
      function C() {
        return n.useContext(r) != null;
      }
      function b() {
        return C() || l(false), n.useContext(r).location;
      }
      function E() {
        C() || l(false);
        let { basename: e2, navigator: t2 } = n.useContext(a), { matches: r2 } = n.useContext(i), { pathname: o2 } = b(), s2 = JSON.stringify(r2.map((e3) => e3.pathnameBase)), u2 = n.useRef(false);
        return n.useEffect(() => {
          u2.current = true;
        }), n.useCallback(function(n2, a2) {
          if (a2 === void 0 && (a2 = {}), !u2.current)
            return;
          if (typeof n2 == "number")
            return void t2.go(n2);
          let r3 = d(n2, JSON.parse(s2), o2);
          e2 !== "/" && (r3.pathname = v([e2, r3.pathname])), (a2.replace ? t2.replace : t2.push)(r3, a2.state);
        }, [e2, t2, s2, o2]);
      }
      const R = n.createContext(null);
      function S(e2) {
        let t2 = n.useContext(i).outlet;
        return t2 ? n.createElement(R.Provider, { value: e2 }, t2) : t2;
      }
      function $(e2) {
        let { matches: t2 } = n.useContext(i), { pathname: a2 } = b(), r2 = JSON.stringify(t2.map((e3) => e3.pathnameBase));
        return n.useMemo(() => d(e2, JSON.parse(r2), a2), [e2, r2, a2]);
      }
      function O(e2, a2) {
        C() || l(false);
        let r2, { matches: s2 } = n.useContext(i), u2 = s2[s2.length - 1], c2 = u2 ? u2.params : {}, h2 = (u2 && u2.pathname, u2 ? u2.pathnameBase : "/"), p2 = (u2 && u2.route, b());
        if (a2) {
          var f2;
          let e3 = typeof a2 == "string" ? t.parsePath(a2) : a2;
          h2 === "/" || ((f2 = e3.pathname) == null ? void 0 : f2.startsWith(h2)) || l(false), r2 = e3;
        } else
          r2 = p2;
        let m2 = r2.pathname || "/", d2 = o(e2, { pathname: h2 === "/" ? m2 : m2.slice(h2.length) || "/" });
        return M(d2 && d2.map((e3) => Object.assign({}, e3, { params: Object.assign({}, c2, e3.params), pathname: v([h2, e3.pathname]), pathnameBase: e3.pathnameBase === "/" ? h2 : v([h2, e3.pathnameBase]) })), s2);
      }
      function M(e2, t2) {
        return t2 === void 0 && (t2 = []), e2 == null ? null : e2.reduceRight((a2, r2, l2) => n.createElement(i.Provider, { children: r2.route.element !== void 0 ? r2.route.element : a2, value: { outlet: a2, matches: t2.concat(e2.slice(0, l2 + 1)) } }), null);
      }
      function N(e2) {
        l(false);
      }
      function W(e2) {
        let { basename: i2 = "/", children: o2 = null, location: s2, navigationType: u2 = t.Action.Pop, navigator: c2, static: h2 = false } = e2;
        C() && l(false);
        let p2 = y(i2), f2 = n.useMemo(() => ({ basename: p2, navigator: c2, static: h2 }), [p2, c2, h2]);
        typeof s2 == "string" && (s2 = t.parsePath(s2));
        let { pathname: m2 = "/", search: d2 = "", hash: v2 = "", state: x2 = null, key: P2 = "default" } = s2, b2 = n.useMemo(() => {
          let e3 = g(m2, p2);
          return e3 == null ? null : { pathname: e3, search: d2, hash: v2, state: x2, key: P2 };
        }, [p2, m2, d2, v2, x2, P2]);
        return b2 == null ? null : n.createElement(a.Provider, { value: f2 }, n.createElement(r.Provider, { children: o2, value: { location: b2, navigationType: u2 } }));
      }
      function j(e2) {
        let t2 = [];
        return n.Children.forEach(e2, (e3) => {
          if (!n.isValidElement(e3))
            return;
          if (e3.type === n.Fragment)
            return void t2.push.apply(t2, j(e3.props.children));
          e3.type !== N && l(false);
          let a2 = { caseSensitive: e3.props.caseSensitive, element: e3.props.element, index: e3.props.index, path: e3.props.path };
          e3.props.children && (a2.children = j(e3.props.children)), t2.push(a2);
        }), t2;
      }
      Object.defineProperty(e, "NavigationType", { enumerable: true, get: function() {
        return t.Action;
      } }), Object.defineProperty(e, "createPath", { enumerable: true, get: function() {
        return t.createPath;
      } }), Object.defineProperty(e, "parsePath", { enumerable: true, get: function() {
        return t.parsePath;
      } }), e.MemoryRouter = function(e2) {
        let { basename: a2, children: r2, initialEntries: i2, initialIndex: l2 } = e2, o2 = n.useRef();
        o2.current == null && (o2.current = t.createMemoryHistory({ initialEntries: i2, initialIndex: l2 }));
        let s2 = o2.current, [u2, c2] = n.useState({ action: s2.action, location: s2.location });
        return n.useLayoutEffect(() => s2.listen(c2), [s2]), n.createElement(W, { basename: a2, children: r2, location: u2.location, navigationType: u2.action, navigator: s2 });
      }, e.Navigate = function(e2) {
        let { to: t2, replace: a2, state: r2 } = e2;
        C() || l(false);
        let i2 = E();
        return n.useEffect(() => {
          i2(t2, { replace: a2, state: r2 });
        }), null;
      }, e.Outlet = function(e2) {
        return S(e2.context);
      }, e.Route = N, e.Router = W, e.Routes = function(e2) {
        let { children: t2, location: n2 } = e2;
        return O(j(t2), n2);
      }, e.UNSAFE_LocationContext = r, e.UNSAFE_NavigationContext = a, e.UNSAFE_RouteContext = i, e.createRoutesFromChildren = j, e.generatePath = function(e2, t2) {
        return t2 === void 0 && (t2 = {}), e2.replace(/:(\w+)/g, (e3, n2) => (t2[n2] == null && l(false), t2[n2])).replace(/\/*\*$/, (e3) => t2["*"] == null ? "" : t2["*"].replace(/^\/*/, "/"));
      }, e.matchPath = f, e.matchRoutes = o, e.renderMatches = function(e2) {
        return M(e2);
      }, e.resolvePath = m, e.useHref = function(e2) {
        C() || l(false);
        let { basename: r2, navigator: i2 } = n.useContext(a), { hash: o2, pathname: s2, search: u2 } = $(e2), c2 = s2;
        if (r2 !== "/") {
          let n2 = function(e3) {
            return e3 === "" || e3.pathname === "" ? "/" : typeof e3 == "string" ? t.parsePath(e3).pathname : e3.pathname;
          }(e2), a2 = n2 != null && n2.endsWith("/");
          c2 = s2 === "/" ? r2 + (a2 ? "/" : "") : v([r2, s2]);
        }
        return i2.createHref({ pathname: c2, search: u2, hash: o2 });
      }, e.useInRouterContext = C, e.useLocation = b, e.useMatch = function(e2) {
        C() || l(false);
        let { pathname: t2 } = b();
        return n.useMemo(() => f(e2, t2), [t2, e2]);
      }, e.useNavigate = E, e.useNavigationType = function() {
        return n.useContext(r).navigationType;
      }, e.useOutlet = S, e.useOutletContext = function() {
        return n.useContext(R);
      }, e.useParams = function() {
        let { matches: e2 } = n.useContext(i), t2 = e2[e2.length - 1];
        return t2 ? t2.params : {};
      }, e.useResolvedPath = $, e.useRoutes = O, Object.defineProperty(e, "__esModule", { value: true });
    });
  }
});

// node_modules/.pnpm/react-router@6.3.0_react@18.0.0/node_modules/react-router/umd/react-router.development.js
var require_react_router_development = __commonJS({
  "node_modules/.pnpm/react-router@6.3.0_react@18.0.0/node_modules/react-router/umd/react-router.development.js"(exports, module2) {
    (function(global, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports, require_main(), require("react")) : typeof define === "function" && define.amd ? define(["exports", "history", "react"], factory) : (global = global || self, factory(global.ReactRouter = {}, global.HistoryLibrary, global.React));
    })(exports, function(exports2, history, React13) {
      "use strict";
      const NavigationContext = React13.createContext(null);
      {
        NavigationContext.displayName = "Navigation";
      }
      const LocationContext = React13.createContext(null);
      {
        LocationContext.displayName = "Location";
      }
      const RouteContext = React13.createContext({
        outlet: null,
        matches: []
      });
      {
        RouteContext.displayName = "Route";
      }
      function invariant(cond, message) {
        if (!cond)
          throw new Error(message);
      }
      function warning(cond, message) {
        if (!cond) {
          if (typeof console !== "undefined")
            console.warn(message);
          try {
            throw new Error(message);
          } catch (e) {
          }
        }
      }
      const alreadyWarned = {};
      function warningOnce(key, cond, message) {
        if (!cond && !alreadyWarned[key]) {
          alreadyWarned[key] = true;
          warning(false, message);
        }
      }
      function generatePath(path, params) {
        if (params === void 0) {
          params = {};
        }
        return path.replace(/:(\w+)/g, (_, key) => {
          !(params[key] != null) ? invariant(false, 'Missing ":' + key + '" param') : void 0;
          return params[key];
        }).replace(/\/*\*$/, (_) => params["*"] == null ? "" : params["*"].replace(/^\/*/, "/"));
      }
      function matchRoutes2(routes, locationArg, basename) {
        if (basename === void 0) {
          basename = "/";
        }
        let location = typeof locationArg === "string" ? history.parsePath(locationArg) : locationArg;
        let pathname = stripBasename(location.pathname || "/", basename);
        if (pathname == null) {
          return null;
        }
        let branches = flattenRoutes(routes);
        rankRouteBranches(branches);
        let matches = null;
        for (let i = 0; matches == null && i < branches.length; ++i) {
          matches = matchRouteBranch(branches[i], pathname);
        }
        return matches;
      }
      function flattenRoutes(routes, branches, parentsMeta, parentPath) {
        if (branches === void 0) {
          branches = [];
        }
        if (parentsMeta === void 0) {
          parentsMeta = [];
        }
        if (parentPath === void 0) {
          parentPath = "";
        }
        routes.forEach((route, index) => {
          let meta = {
            relativePath: route.path || "",
            caseSensitive: route.caseSensitive === true,
            childrenIndex: index,
            route
          };
          if (meta.relativePath.startsWith("/")) {
            !meta.relativePath.startsWith(parentPath) ? invariant(false, 'Absolute route path "' + meta.relativePath + '" nested under path ' + ('"' + parentPath + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes.") : void 0;
            meta.relativePath = meta.relativePath.slice(parentPath.length);
          }
          let path = joinPaths([parentPath, meta.relativePath]);
          let routesMeta = parentsMeta.concat(meta);
          if (route.children && route.children.length > 0) {
            !(route.index !== true) ? invariant(false, "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + path + '".')) : void 0;
            flattenRoutes(route.children, branches, routesMeta, path);
          }
          if (route.path == null && !route.index) {
            return;
          }
          branches.push({
            path,
            score: computeScore(path, route.index),
            routesMeta
          });
        });
        return branches;
      }
      function rankRouteBranches(branches) {
        branches.sort((a, b) => a.score !== b.score ? b.score - a.score : compareIndexes(a.routesMeta.map((meta) => meta.childrenIndex), b.routesMeta.map((meta) => meta.childrenIndex)));
      }
      const paramRe = /^:\w+$/;
      const dynamicSegmentValue = 3;
      const indexRouteValue = 2;
      const emptySegmentValue = 1;
      const staticSegmentValue = 10;
      const splatPenalty = -2;
      const isSplat = (s) => s === "*";
      function computeScore(path, index) {
        let segments = path.split("/");
        let initialScore = segments.length;
        if (segments.some(isSplat)) {
          initialScore += splatPenalty;
        }
        if (index) {
          initialScore += indexRouteValue;
        }
        return segments.filter((s) => !isSplat(s)).reduce((score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue), initialScore);
      }
      function compareIndexes(a, b) {
        let siblings = a.length === b.length && a.slice(0, -1).every((n, i) => n === b[i]);
        return siblings ? a[a.length - 1] - b[b.length - 1] : 0;
      }
      function matchRouteBranch(branch, pathname) {
        let {
          routesMeta
        } = branch;
        let matchedParams = {};
        let matchedPathname = "/";
        let matches = [];
        for (let i = 0; i < routesMeta.length; ++i) {
          let meta = routesMeta[i];
          let end = i === routesMeta.length - 1;
          let remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
          let match = matchPath({
            path: meta.relativePath,
            caseSensitive: meta.caseSensitive,
            end
          }, remainingPathname);
          if (!match)
            return null;
          Object.assign(matchedParams, match.params);
          let route = meta.route;
          matches.push({
            params: matchedParams,
            pathname: joinPaths([matchedPathname, match.pathname]),
            pathnameBase: normalizePathname(joinPaths([matchedPathname, match.pathnameBase])),
            route
          });
          if (match.pathnameBase !== "/") {
            matchedPathname = joinPaths([matchedPathname, match.pathnameBase]);
          }
        }
        return matches;
      }
      function matchPath(pattern, pathname) {
        if (typeof pattern === "string") {
          pattern = {
            path: pattern,
            caseSensitive: false,
            end: true
          };
        }
        let [matcher, paramNames] = compilePath(pattern.path, pattern.caseSensitive, pattern.end);
        let match = pathname.match(matcher);
        if (!match)
          return null;
        let matchedPathname = match[0];
        let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
        let captureGroups = match.slice(1);
        let params = paramNames.reduce((memo, paramName, index) => {
          if (paramName === "*") {
            let splatValue = captureGroups[index] || "";
            pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
          }
          memo[paramName] = safelyDecodeURIComponent(captureGroups[index] || "", paramName);
          return memo;
        }, {});
        return {
          params,
          pathname: matchedPathname,
          pathnameBase,
          pattern
        };
      }
      function compilePath(path, caseSensitive, end) {
        if (caseSensitive === void 0) {
          caseSensitive = false;
        }
        if (end === void 0) {
          end = true;
        }
        warning(path === "*" || !path.endsWith("*") || path.endsWith("/*"), 'Route path "' + path + '" will be treated as if it were ' + ('"' + path.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + path.replace(/\*$/, "/*") + '".'));
        let paramNames = [];
        let regexpSource = "^" + path.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^$?{}|()[\]]/g, "\\$&").replace(/:(\w+)/g, (_, paramName) => {
          paramNames.push(paramName);
          return "([^\\/]+)";
        });
        if (path.endsWith("*")) {
          paramNames.push("*");
          regexpSource += path === "*" || path === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$";
        } else {
          regexpSource += end ? "\\/*$" : "(?:(?=[.~-]|%[0-9A-F]{2})|\\b|\\/|$)";
        }
        let matcher = new RegExp(regexpSource, caseSensitive ? void 0 : "i");
        return [matcher, paramNames];
      }
      function safelyDecodeURIComponent(value, paramName) {
        try {
          return decodeURIComponent(value);
        } catch (error) {
          warning(false, 'The value for the URL param "' + paramName + '" will not be decoded because' + (' the string "' + value + '" is a malformed URL segment. This is probably') + (" due to a bad percent encoding (" + error + ")."));
          return value;
        }
      }
      function resolvePath(to, fromPathname) {
        if (fromPathname === void 0) {
          fromPathname = "/";
        }
        let {
          pathname: toPathname,
          search = "",
          hash = ""
        } = typeof to === "string" ? history.parsePath(to) : to;
        let pathname = toPathname ? toPathname.startsWith("/") ? toPathname : resolvePathname(toPathname, fromPathname) : fromPathname;
        return {
          pathname,
          search: normalizeSearch(search),
          hash: normalizeHash(hash)
        };
      }
      function resolvePathname(relativePath, fromPathname) {
        let segments = fromPathname.replace(/\/+$/, "").split("/");
        let relativeSegments = relativePath.split("/");
        relativeSegments.forEach((segment) => {
          if (segment === "..") {
            if (segments.length > 1)
              segments.pop();
          } else if (segment !== ".") {
            segments.push(segment);
          }
        });
        return segments.length > 1 ? segments.join("/") : "/";
      }
      function resolveTo(toArg, routePathnames, locationPathname) {
        let to = typeof toArg === "string" ? history.parsePath(toArg) : toArg;
        let toPathname = toArg === "" || to.pathname === "" ? "/" : to.pathname;
        let from;
        if (toPathname == null) {
          from = locationPathname;
        } else {
          let routePathnameIndex = routePathnames.length - 1;
          if (toPathname.startsWith("..")) {
            let toSegments = toPathname.split("/");
            while (toSegments[0] === "..") {
              toSegments.shift();
              routePathnameIndex -= 1;
            }
            to.pathname = toSegments.join("/");
          }
          from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
        }
        let path = resolvePath(to, from);
        if (toPathname && toPathname !== "/" && toPathname.endsWith("/") && !path.pathname.endsWith("/")) {
          path.pathname += "/";
        }
        return path;
      }
      function getToPathname(to) {
        return to === "" || to.pathname === "" ? "/" : typeof to === "string" ? history.parsePath(to).pathname : to.pathname;
      }
      function stripBasename(pathname, basename) {
        if (basename === "/")
          return pathname;
        if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
          return null;
        }
        let nextChar = pathname.charAt(basename.length);
        if (nextChar && nextChar !== "/") {
          return null;
        }
        return pathname.slice(basename.length) || "/";
      }
      const joinPaths = (paths) => paths.join("/").replace(/\/\/+/g, "/");
      const normalizePathname = (pathname) => pathname.replace(/\/+$/, "").replace(/^\/*/, "/");
      const normalizeSearch = (search) => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search;
      const normalizeHash = (hash) => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash;
      function useHref(to) {
        !useInRouterContext() ? invariant(false, "useHref() may be used only in the context of a <Router> component.") : void 0;
        let {
          basename,
          navigator
        } = React13.useContext(NavigationContext);
        let {
          hash,
          pathname,
          search
        } = useResolvedPath(to);
        let joinedPathname = pathname;
        if (basename !== "/") {
          let toPathname = getToPathname(to);
          let endsWithSlash = toPathname != null && toPathname.endsWith("/");
          joinedPathname = pathname === "/" ? basename + (endsWithSlash ? "/" : "") : joinPaths([basename, pathname]);
        }
        return navigator.createHref({
          pathname: joinedPathname,
          search,
          hash
        });
      }
      function useInRouterContext() {
        return React13.useContext(LocationContext) != null;
      }
      function useLocation2() {
        !useInRouterContext() ? invariant(false, "useLocation() may be used only in the context of a <Router> component.") : void 0;
        return React13.useContext(LocationContext).location;
      }
      function useNavigationType() {
        return React13.useContext(LocationContext).navigationType;
      }
      function useMatch(pattern) {
        !useInRouterContext() ? invariant(false, "useMatch() may be used only in the context of a <Router> component.") : void 0;
        let {
          pathname
        } = useLocation2();
        return React13.useMemo(() => matchPath(pattern, pathname), [pathname, pattern]);
      }
      function useNavigate() {
        !useInRouterContext() ? invariant(false, "useNavigate() may be used only in the context of a <Router> component.") : void 0;
        let {
          basename,
          navigator
        } = React13.useContext(NavigationContext);
        let {
          matches
        } = React13.useContext(RouteContext);
        let {
          pathname: locationPathname
        } = useLocation2();
        let routePathnamesJson = JSON.stringify(matches.map((match) => match.pathnameBase));
        let activeRef = React13.useRef(false);
        React13.useEffect(() => {
          activeRef.current = true;
        });
        let navigate = React13.useCallback(function(to, options) {
          if (options === void 0) {
            options = {};
          }
          warning(activeRef.current, "You should call navigate() in a React.useEffect(), not when your component is first rendered.");
          if (!activeRef.current)
            return;
          if (typeof to === "number") {
            navigator.go(to);
            return;
          }
          let path = resolveTo(to, JSON.parse(routePathnamesJson), locationPathname);
          if (basename !== "/") {
            path.pathname = joinPaths([basename, path.pathname]);
          }
          (!!options.replace ? navigator.replace : navigator.push)(path, options.state);
        }, [basename, navigator, routePathnamesJson, locationPathname]);
        return navigate;
      }
      const OutletContext = React13.createContext(null);
      function useOutletContext() {
        return React13.useContext(OutletContext);
      }
      function useOutlet(context) {
        let outlet = React13.useContext(RouteContext).outlet;
        if (outlet) {
          return React13.createElement(OutletContext.Provider, {
            value: context
          }, outlet);
        }
        return outlet;
      }
      function useParams2() {
        let {
          matches
        } = React13.useContext(RouteContext);
        let routeMatch = matches[matches.length - 1];
        return routeMatch ? routeMatch.params : {};
      }
      function useResolvedPath(to) {
        let {
          matches
        } = React13.useContext(RouteContext);
        let {
          pathname: locationPathname
        } = useLocation2();
        let routePathnamesJson = JSON.stringify(matches.map((match) => match.pathnameBase));
        return React13.useMemo(() => resolveTo(to, JSON.parse(routePathnamesJson), locationPathname), [to, routePathnamesJson, locationPathname]);
      }
      function useRoutes2(routes, locationArg) {
        !useInRouterContext() ? invariant(false, "useRoutes() may be used only in the context of a <Router> component.") : void 0;
        let {
          matches: parentMatches
        } = React13.useContext(RouteContext);
        let routeMatch = parentMatches[parentMatches.length - 1];
        let parentParams = routeMatch ? routeMatch.params : {};
        let parentPathname = routeMatch ? routeMatch.pathname : "/";
        let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
        let parentRoute = routeMatch && routeMatch.route;
        {
          let parentPath = parentRoute && parentRoute.path || "";
          warningOnce(parentPathname, !parentRoute || parentPath.endsWith("*"), "You rendered descendant <Routes> (or called `useRoutes()`) at " + ('"' + parentPathname + '" (under <Route path="' + parentPath + '">) but the ') + `parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

` + ('Please change the parent <Route path="' + parentPath + '"> to <Route ') + ('path="' + (parentPath === "/" ? "*" : parentPath + "/*") + '">.'));
        }
        let locationFromContext = useLocation2();
        let location;
        if (locationArg) {
          var _parsedLocationArg$pa;
          let parsedLocationArg = typeof locationArg === "string" ? history.parsePath(locationArg) : locationArg;
          !(parentPathnameBase === "/" || ((_parsedLocationArg$pa = parsedLocationArg.pathname) == null ? void 0 : _parsedLocationArg$pa.startsWith(parentPathnameBase))) ? invariant(false, "When overriding the location using `<Routes location>` or `useRoutes(routes, location)`, the location pathname must begin with the portion of the URL pathname that was " + ('matched by all parent routes. The current pathname base is "' + parentPathnameBase + '" ') + ('but pathname "' + parsedLocationArg.pathname + '" was given in the `location` prop.')) : void 0;
          location = parsedLocationArg;
        } else {
          location = locationFromContext;
        }
        let pathname = location.pathname || "/";
        let remainingPathname = parentPathnameBase === "/" ? pathname : pathname.slice(parentPathnameBase.length) || "/";
        let matches = matchRoutes2(routes, {
          pathname: remainingPathname
        });
        {
          warning(parentRoute || matches != null, 'No routes matched location "' + location.pathname + location.search + location.hash + '" ');
          warning(matches == null || matches[matches.length - 1].route.element !== void 0, 'Matched leaf route at location "' + location.pathname + location.search + location.hash + '" does not have an element. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.');
        }
        return _renderMatches(matches && matches.map((match) => Object.assign({}, match, {
          params: Object.assign({}, parentParams, match.params),
          pathname: joinPaths([parentPathnameBase, match.pathname]),
          pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : joinPaths([parentPathnameBase, match.pathnameBase])
        })), parentMatches);
      }
      function _renderMatches(matches, parentMatches) {
        if (parentMatches === void 0) {
          parentMatches = [];
        }
        if (matches == null)
          return null;
        return matches.reduceRight((outlet, match, index) => {
          return React13.createElement(RouteContext.Provider, {
            children: match.route.element !== void 0 ? match.route.element : outlet,
            value: {
              outlet,
              matches: parentMatches.concat(matches.slice(0, index + 1))
            }
          });
        }, null);
      }
      function MemoryRouter(_ref) {
        let {
          basename,
          children,
          initialEntries,
          initialIndex
        } = _ref;
        let historyRef = React13.useRef();
        if (historyRef.current == null) {
          historyRef.current = history.createMemoryHistory({
            initialEntries,
            initialIndex
          });
        }
        let history$1 = historyRef.current;
        let [state, setState] = React13.useState({
          action: history$1.action,
          location: history$1.location
        });
        React13.useLayoutEffect(() => history$1.listen(setState), [history$1]);
        return React13.createElement(Router2, {
          basename,
          children,
          location: state.location,
          navigationType: state.action,
          navigator: history$1
        });
      }
      function Navigate(_ref2) {
        let {
          to,
          replace,
          state
        } = _ref2;
        !useInRouterContext() ? invariant(false, "<Navigate> may be used only in the context of a <Router> component.") : void 0;
        warning(!React13.useContext(NavigationContext).static, "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");
        let navigate = useNavigate();
        React13.useEffect(() => {
          navigate(to, {
            replace,
            state
          });
        });
        return null;
      }
      function Outlet2(props) {
        return useOutlet(props.context);
      }
      function Route(_props) {
        invariant(false, "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.");
      }
      function Router2(_ref3) {
        let {
          basename: basenameProp = "/",
          children = null,
          location: locationProp,
          navigationType = history.Action.Pop,
          navigator,
          static: staticProp = false
        } = _ref3;
        !!useInRouterContext() ? invariant(false, "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.") : void 0;
        let basename = normalizePathname(basenameProp);
        let navigationContext = React13.useMemo(() => ({
          basename,
          navigator,
          static: staticProp
        }), [basename, navigator, staticProp]);
        if (typeof locationProp === "string") {
          locationProp = history.parsePath(locationProp);
        }
        let {
          pathname = "/",
          search = "",
          hash = "",
          state = null,
          key = "default"
        } = locationProp;
        let location = React13.useMemo(() => {
          let trailingPathname = stripBasename(pathname, basename);
          if (trailingPathname == null) {
            return null;
          }
          return {
            pathname: trailingPathname,
            search,
            hash,
            state,
            key
          };
        }, [basename, pathname, search, hash, state, key]);
        warning(location != null, '<Router basename="' + basename + '"> is not able to match the URL ' + ('"' + pathname + search + hash + '" because it does not start with the ') + "basename, so the <Router> won't render anything.");
        if (location == null) {
          return null;
        }
        return React13.createElement(NavigationContext.Provider, {
          value: navigationContext
        }, React13.createElement(LocationContext.Provider, {
          children,
          value: {
            location,
            navigationType
          }
        }));
      }
      function Routes2(_ref4) {
        let {
          children,
          location
        } = _ref4;
        return useRoutes2(createRoutesFromChildren(children), location);
      }
      function createRoutesFromChildren(children) {
        let routes = [];
        React13.Children.forEach(children, (element) => {
          if (!React13.isValidElement(element)) {
            return;
          }
          if (element.type === React13.Fragment) {
            routes.push.apply(routes, createRoutesFromChildren(element.props.children));
            return;
          }
          !(element.type === Route) ? invariant(false, "[" + (typeof element.type === "string" ? element.type : element.type.name) + "] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>") : void 0;
          let route = {
            caseSensitive: element.props.caseSensitive,
            element: element.props.element,
            index: element.props.index,
            path: element.props.path
          };
          if (element.props.children) {
            route.children = createRoutesFromChildren(element.props.children);
          }
          routes.push(route);
        });
        return routes;
      }
      function renderMatches(matches) {
        return _renderMatches(matches);
      }
      Object.defineProperty(exports2, "NavigationType", {
        enumerable: true,
        get: function() {
          return history.Action;
        }
      });
      Object.defineProperty(exports2, "createPath", {
        enumerable: true,
        get: function() {
          return history.createPath;
        }
      });
      Object.defineProperty(exports2, "parsePath", {
        enumerable: true,
        get: function() {
          return history.parsePath;
        }
      });
      exports2.MemoryRouter = MemoryRouter;
      exports2.Navigate = Navigate;
      exports2.Outlet = Outlet2;
      exports2.Route = Route;
      exports2.Router = Router2;
      exports2.Routes = Routes2;
      exports2.UNSAFE_LocationContext = LocationContext;
      exports2.UNSAFE_NavigationContext = NavigationContext;
      exports2.UNSAFE_RouteContext = RouteContext;
      exports2.createRoutesFromChildren = createRoutesFromChildren;
      exports2.generatePath = generatePath;
      exports2.matchPath = matchPath;
      exports2.matchRoutes = matchRoutes2;
      exports2.renderMatches = renderMatches;
      exports2.resolvePath = resolvePath;
      exports2.useHref = useHref;
      exports2.useInRouterContext = useInRouterContext;
      exports2.useLocation = useLocation2;
      exports2.useMatch = useMatch;
      exports2.useNavigate = useNavigate;
      exports2.useNavigationType = useNavigationType;
      exports2.useOutlet = useOutlet;
      exports2.useOutletContext = useOutletContext;
      exports2.useParams = useParams2;
      exports2.useResolvedPath = useResolvedPath;
      exports2.useRoutes = useRoutes2;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/.pnpm/react-router@6.3.0_react@18.0.0/node_modules/react-router/main.js
var require_main2 = __commonJS({
  "node_modules/.pnpm/react-router@6.3.0_react@18.0.0/node_modules/react-router/main.js"(exports, module2) {
    "use strict";
    if (process.env.NODE_ENV === "production") {
      module2.exports = require_react_router_production_min();
    } else {
      module2.exports = require_react_router_development();
    }
  }
});

// node_modules/.pnpm/react-router-dom@6.3.0_zpnidt7m3osuk7shl3s4oenomq/node_modules/react-router-dom/umd/react-router-dom.production.min.js
var require_react_router_dom_production_min = __commonJS({
  "node_modules/.pnpm/react-router-dom@6.3.0_zpnidt7m3osuk7shl3s4oenomq/node_modules/react-router-dom/umd/react-router-dom.production.min.js"(exports, module2) {
    !function(e, t) {
      typeof exports == "object" && typeof module2 != "undefined" ? t(exports, require("react"), require_main(), require_main2()) : typeof define == "function" && define.amd ? define(["exports", "react", "history", "react-router"], t) : t((e = e || self).ReactRouterDOM = {}, e.React, e.HistoryLibrary, e.ReactRouter);
    }(exports, function(e, t, r, n) {
      "use strict";
      function a() {
        return a = Object.assign || function(e2) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var r2 = arguments[t2];
            for (var n2 in r2)
              Object.prototype.hasOwnProperty.call(r2, n2) && (e2[n2] = r2[n2]);
          }
          return e2;
        }, a.apply(this, arguments);
      }
      function o(e2, t2) {
        if (e2 == null)
          return {};
        var r2, n2, a2 = {}, o2 = Object.keys(e2);
        for (n2 = 0; n2 < o2.length; n2++)
          r2 = o2[n2], t2.indexOf(r2) >= 0 || (a2[r2] = e2[r2]);
        return a2;
      }
      const u = ["onClick", "reloadDocument", "replace", "state", "target", "to"], i = ["aria-current", "caseSensitive", "className", "end", "style", "to", "children"];
      const c = t.forwardRef(function(e2, r2) {
        let { onClick: i2, reloadDocument: c2, replace: s2 = false, state: f2, target: b, to: y } = e2, d = o(e2, u), m = n.useHref(y), p = l(y, { replace: s2, state: f2, target: b });
        return t.createElement("a", a({}, d, { href: m, onClick: function(e3) {
          i2 && i2(e3), e3.defaultPrevented || c2 || p(e3);
        }, ref: r2, target: b }));
      }), s = t.forwardRef(function(e2, r2) {
        let { "aria-current": u2 = "page", caseSensitive: s2 = false, className: l2 = "", end: f2 = false, style: b, to: y, children: d } = e2, m = o(e2, i), p = n.useLocation(), g = n.useResolvedPath(y), h = p.pathname, P = g.pathname;
        s2 || (h = h.toLowerCase(), P = P.toLowerCase());
        let O, v = h === P || !f2 && h.startsWith(P) && h.charAt(P.length) === "/", R = v ? u2 : void 0;
        O = typeof l2 == "function" ? l2({ isActive: v }) : [l2, v ? "active" : null].filter(Boolean).join(" ");
        let j = typeof b == "function" ? b({ isActive: v }) : b;
        return t.createElement(c, a({}, m, { "aria-current": R, className: O, ref: r2, style: j, to: y }), typeof d == "function" ? d({ isActive: v }) : d);
      });
      function l(e2, r2) {
        let { target: a2, replace: o2, state: u2 } = r2 === void 0 ? {} : r2, i2 = n.useNavigate(), c2 = n.useLocation(), s2 = n.useResolvedPath(e2);
        return t.useCallback((t2) => {
          if (!(t2.button !== 0 || a2 && a2 !== "_self" || function(e3) {
            return !!(e3.metaKey || e3.altKey || e3.ctrlKey || e3.shiftKey);
          }(t2))) {
            t2.preventDefault();
            let r3 = !!o2 || n.createPath(c2) === n.createPath(s2);
            i2(e2, { replace: r3, state: u2 });
          }
        }, [c2, i2, s2, o2, u2, a2, e2]);
      }
      function f(e2) {
        return e2 === void 0 && (e2 = ""), new URLSearchParams(typeof e2 == "string" || Array.isArray(e2) || e2 instanceof URLSearchParams ? e2 : Object.keys(e2).reduce((t2, r2) => {
          let n2 = e2[r2];
          return t2.concat(Array.isArray(n2) ? n2.map((e3) => [r2, e3]) : [[r2, n2]]);
        }, []));
      }
      Object.defineProperty(e, "MemoryRouter", { enumerable: true, get: function() {
        return n.MemoryRouter;
      } }), Object.defineProperty(e, "Navigate", { enumerable: true, get: function() {
        return n.Navigate;
      } }), Object.defineProperty(e, "NavigationType", { enumerable: true, get: function() {
        return n.NavigationType;
      } }), Object.defineProperty(e, "Outlet", { enumerable: true, get: function() {
        return n.Outlet;
      } }), Object.defineProperty(e, "Route", { enumerable: true, get: function() {
        return n.Route;
      } }), Object.defineProperty(e, "Router", { enumerable: true, get: function() {
        return n.Router;
      } }), Object.defineProperty(e, "Routes", { enumerable: true, get: function() {
        return n.Routes;
      } }), Object.defineProperty(e, "UNSAFE_LocationContext", { enumerable: true, get: function() {
        return n.UNSAFE_LocationContext;
      } }), Object.defineProperty(e, "UNSAFE_NavigationContext", { enumerable: true, get: function() {
        return n.UNSAFE_NavigationContext;
      } }), Object.defineProperty(e, "UNSAFE_RouteContext", { enumerable: true, get: function() {
        return n.UNSAFE_RouteContext;
      } }), Object.defineProperty(e, "createPath", { enumerable: true, get: function() {
        return n.createPath;
      } }), Object.defineProperty(e, "createRoutesFromChildren", { enumerable: true, get: function() {
        return n.createRoutesFromChildren;
      } }), Object.defineProperty(e, "generatePath", { enumerable: true, get: function() {
        return n.generatePath;
      } }), Object.defineProperty(e, "matchPath", { enumerable: true, get: function() {
        return n.matchPath;
      } }), Object.defineProperty(e, "matchRoutes", { enumerable: true, get: function() {
        return n.matchRoutes;
      } }), Object.defineProperty(e, "parsePath", { enumerable: true, get: function() {
        return n.parsePath;
      } }), Object.defineProperty(e, "renderMatches", { enumerable: true, get: function() {
        return n.renderMatches;
      } }), Object.defineProperty(e, "resolvePath", { enumerable: true, get: function() {
        return n.resolvePath;
      } }), Object.defineProperty(e, "useHref", { enumerable: true, get: function() {
        return n.useHref;
      } }), Object.defineProperty(e, "useInRouterContext", { enumerable: true, get: function() {
        return n.useInRouterContext;
      } }), Object.defineProperty(e, "useLocation", { enumerable: true, get: function() {
        return n.useLocation;
      } }), Object.defineProperty(e, "useMatch", { enumerable: true, get: function() {
        return n.useMatch;
      } }), Object.defineProperty(e, "useNavigate", { enumerable: true, get: function() {
        return n.useNavigate;
      } }), Object.defineProperty(e, "useNavigationType", { enumerable: true, get: function() {
        return n.useNavigationType;
      } }), Object.defineProperty(e, "useOutlet", { enumerable: true, get: function() {
        return n.useOutlet;
      } }), Object.defineProperty(e, "useOutletContext", { enumerable: true, get: function() {
        return n.useOutletContext;
      } }), Object.defineProperty(e, "useParams", { enumerable: true, get: function() {
        return n.useParams;
      } }), Object.defineProperty(e, "useResolvedPath", { enumerable: true, get: function() {
        return n.useResolvedPath;
      } }), Object.defineProperty(e, "useRoutes", { enumerable: true, get: function() {
        return n.useRoutes;
      } }), e.BrowserRouter = function(e2) {
        let { basename: a2, children: o2, window: u2 } = e2, i2 = t.useRef();
        i2.current == null && (i2.current = r.createBrowserHistory({ window: u2 }));
        let c2 = i2.current, [s2, l2] = t.useState({ action: c2.action, location: c2.location });
        return t.useLayoutEffect(() => c2.listen(l2), [c2]), t.createElement(n.Router, { basename: a2, children: o2, location: s2.location, navigationType: s2.action, navigator: c2 });
      }, e.HashRouter = function(e2) {
        let { basename: a2, children: o2, window: u2 } = e2, i2 = t.useRef();
        i2.current == null && (i2.current = r.createHashHistory({ window: u2 }));
        let c2 = i2.current, [s2, l2] = t.useState({ action: c2.action, location: c2.location });
        return t.useLayoutEffect(() => c2.listen(l2), [c2]), t.createElement(n.Router, { basename: a2, children: o2, location: s2.location, navigationType: s2.action, navigator: c2 });
      }, e.Link = c, e.NavLink = s, e.createSearchParams = f, e.unstable_HistoryRouter = function(e2) {
        let { basename: r2, children: a2, history: o2 } = e2;
        const [u2, i2] = t.useState({ action: o2.action, location: o2.location });
        return t.useLayoutEffect(() => o2.listen(i2), [o2]), t.createElement(n.Router, { basename: r2, children: a2, location: u2.location, navigationType: u2.action, navigator: o2 });
      }, e.useLinkClickHandler = l, e.useSearchParams = function(e2) {
        let r2 = t.useRef(f(e2)), a2 = n.useLocation(), o2 = t.useMemo(() => {
          let e3 = f(a2.search);
          for (let t2 of r2.current.keys())
            e3.has(t2) || r2.current.getAll(t2).forEach((r3) => {
              e3.append(t2, r3);
            });
          return e3;
        }, [a2.search]), u2 = n.useNavigate();
        return [o2, t.useCallback((e3, t2) => {
          u2("?" + f(e3), t2);
        }, [u2])];
      }, Object.defineProperty(e, "__esModule", { value: true });
    });
  }
});

// node_modules/.pnpm/react-router-dom@6.3.0_zpnidt7m3osuk7shl3s4oenomq/node_modules/react-router-dom/umd/react-router-dom.development.js
var require_react_router_dom_development = __commonJS({
  "node_modules/.pnpm/react-router-dom@6.3.0_zpnidt7m3osuk7shl3s4oenomq/node_modules/react-router-dom/umd/react-router-dom.development.js"(exports, module2) {
    (function(global, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports, require("react"), require_main(), require_main2()) : typeof define === "function" && define.amd ? define(["exports", "react", "history", "react-router"], factory) : (global = global || self, factory(global.ReactRouterDOM = {}, global.React, global.HistoryLibrary, global.ReactRouter));
    })(exports, function(exports2, React13, history, reactRouter) {
      "use strict";
      function _extends() {
        _extends = Object.assign || function(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }
          return target;
        };
        return _extends.apply(this, arguments);
      }
      function _objectWithoutPropertiesLoose(source, excluded) {
        if (source == null)
          return {};
        var target = {};
        var sourceKeys = Object.keys(source);
        var key, i;
        for (i = 0; i < sourceKeys.length; i++) {
          key = sourceKeys[i];
          if (excluded.indexOf(key) >= 0)
            continue;
          target[key] = source[key];
        }
        return target;
      }
      const _excluded = ["onClick", "reloadDocument", "replace", "state", "target", "to"], _excluded2 = ["aria-current", "caseSensitive", "className", "end", "style", "to", "children"];
      function warning(cond, message) {
        if (!cond) {
          if (typeof console !== "undefined")
            console.warn(message);
          try {
            throw new Error(message);
          } catch (e) {
          }
        }
      }
      function BrowserRouter(_ref) {
        let {
          basename,
          children,
          window: window2
        } = _ref;
        let historyRef = React13.useRef();
        if (historyRef.current == null) {
          historyRef.current = history.createBrowserHistory({
            window: window2
          });
        }
        let history$1 = historyRef.current;
        let [state, setState] = React13.useState({
          action: history$1.action,
          location: history$1.location
        });
        React13.useLayoutEffect(() => history$1.listen(setState), [history$1]);
        return React13.createElement(reactRouter.Router, {
          basename,
          children,
          location: state.location,
          navigationType: state.action,
          navigator: history$1
        });
      }
      function HashRouter(_ref2) {
        let {
          basename,
          children,
          window: window2
        } = _ref2;
        let historyRef = React13.useRef();
        if (historyRef.current == null) {
          historyRef.current = history.createHashHistory({
            window: window2
          });
        }
        let history$1 = historyRef.current;
        let [state, setState] = React13.useState({
          action: history$1.action,
          location: history$1.location
        });
        React13.useLayoutEffect(() => history$1.listen(setState), [history$1]);
        return React13.createElement(reactRouter.Router, {
          basename,
          children,
          location: state.location,
          navigationType: state.action,
          navigator: history$1
        });
      }
      function HistoryRouter(_ref3) {
        let {
          basename,
          children,
          history: history2
        } = _ref3;
        const [state, setState] = React13.useState({
          action: history2.action,
          location: history2.location
        });
        React13.useLayoutEffect(() => history2.listen(setState), [history2]);
        return React13.createElement(reactRouter.Router, {
          basename,
          children,
          location: state.location,
          navigationType: state.action,
          navigator: history2
        });
      }
      {
        HistoryRouter.displayName = "unstable_HistoryRouter";
      }
      function isModifiedEvent(event) {
        return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
      }
      const Link2 = React13.forwardRef(function LinkWithRef(_ref4, ref) {
        let {
          onClick,
          reloadDocument,
          replace = false,
          state,
          target,
          to
        } = _ref4, rest = _objectWithoutPropertiesLoose(_ref4, _excluded);
        let href = reactRouter.useHref(to);
        let internalOnClick = useLinkClickHandler(to, {
          replace,
          state,
          target
        });
        function handleClick(event) {
          if (onClick)
            onClick(event);
          if (!event.defaultPrevented && !reloadDocument) {
            internalOnClick(event);
          }
        }
        return React13.createElement("a", _extends({}, rest, {
          href,
          onClick: handleClick,
          ref,
          target
        }));
      });
      {
        Link2.displayName = "Link";
      }
      const NavLink = React13.forwardRef(function NavLinkWithRef(_ref5, ref) {
        let {
          "aria-current": ariaCurrentProp = "page",
          caseSensitive = false,
          className: classNameProp = "",
          end = false,
          style: styleProp,
          to,
          children
        } = _ref5, rest = _objectWithoutPropertiesLoose(_ref5, _excluded2);
        let location = reactRouter.useLocation();
        let path = reactRouter.useResolvedPath(to);
        let locationPathname = location.pathname;
        let toPathname = path.pathname;
        if (!caseSensitive) {
          locationPathname = locationPathname.toLowerCase();
          toPathname = toPathname.toLowerCase();
        }
        let isActive = locationPathname === toPathname || !end && locationPathname.startsWith(toPathname) && locationPathname.charAt(toPathname.length) === "/";
        let ariaCurrent = isActive ? ariaCurrentProp : void 0;
        let className;
        if (typeof classNameProp === "function") {
          className = classNameProp({
            isActive
          });
        } else {
          className = [classNameProp, isActive ? "active" : null].filter(Boolean).join(" ");
        }
        let style = typeof styleProp === "function" ? styleProp({
          isActive
        }) : styleProp;
        return React13.createElement(Link2, _extends({}, rest, {
          "aria-current": ariaCurrent,
          className,
          ref,
          style,
          to
        }), typeof children === "function" ? children({
          isActive
        }) : children);
      });
      {
        NavLink.displayName = "NavLink";
      }
      function useLinkClickHandler(to, _temp) {
        let {
          target,
          replace: replaceProp,
          state
        } = _temp === void 0 ? {} : _temp;
        let navigate = reactRouter.useNavigate();
        let location = reactRouter.useLocation();
        let path = reactRouter.useResolvedPath(to);
        return React13.useCallback((event) => {
          if (event.button === 0 && (!target || target === "_self") && !isModifiedEvent(event)) {
            event.preventDefault();
            let replace = !!replaceProp || reactRouter.createPath(location) === reactRouter.createPath(path);
            navigate(to, {
              replace,
              state
            });
          }
        }, [location, navigate, path, replaceProp, state, target, to]);
      }
      function useSearchParams2(defaultInit) {
        warning(typeof URLSearchParams !== "undefined", "You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params\n\nIf you're unsure how to load polyfills, we recommend you check out https://polyfill.io/v3/ which provides some recommendations about how to load polyfills only for users that need them, instead of for every user.");
        let defaultSearchParamsRef = React13.useRef(createSearchParams(defaultInit));
        let location = reactRouter.useLocation();
        let searchParams = React13.useMemo(() => {
          let searchParams2 = createSearchParams(location.search);
          for (let key of defaultSearchParamsRef.current.keys()) {
            if (!searchParams2.has(key)) {
              defaultSearchParamsRef.current.getAll(key).forEach((value) => {
                searchParams2.append(key, value);
              });
            }
          }
          return searchParams2;
        }, [location.search]);
        let navigate = reactRouter.useNavigate();
        let setSearchParams = React13.useCallback((nextInit, navigateOptions) => {
          navigate("?" + createSearchParams(nextInit), navigateOptions);
        }, [navigate]);
        return [searchParams, setSearchParams];
      }
      function createSearchParams(init2) {
        if (init2 === void 0) {
          init2 = "";
        }
        return new URLSearchParams(typeof init2 === "string" || Array.isArray(init2) || init2 instanceof URLSearchParams ? init2 : Object.keys(init2).reduce((memo, key) => {
          let value = init2[key];
          return memo.concat(Array.isArray(value) ? value.map((v) => [key, v]) : [[key, value]]);
        }, []));
      }
      Object.defineProperty(exports2, "MemoryRouter", {
        enumerable: true,
        get: function() {
          return reactRouter.MemoryRouter;
        }
      });
      Object.defineProperty(exports2, "Navigate", {
        enumerable: true,
        get: function() {
          return reactRouter.Navigate;
        }
      });
      Object.defineProperty(exports2, "NavigationType", {
        enumerable: true,
        get: function() {
          return reactRouter.NavigationType;
        }
      });
      Object.defineProperty(exports2, "Outlet", {
        enumerable: true,
        get: function() {
          return reactRouter.Outlet;
        }
      });
      Object.defineProperty(exports2, "Route", {
        enumerable: true,
        get: function() {
          return reactRouter.Route;
        }
      });
      Object.defineProperty(exports2, "Router", {
        enumerable: true,
        get: function() {
          return reactRouter.Router;
        }
      });
      Object.defineProperty(exports2, "Routes", {
        enumerable: true,
        get: function() {
          return reactRouter.Routes;
        }
      });
      Object.defineProperty(exports2, "UNSAFE_LocationContext", {
        enumerable: true,
        get: function() {
          return reactRouter.UNSAFE_LocationContext;
        }
      });
      Object.defineProperty(exports2, "UNSAFE_NavigationContext", {
        enumerable: true,
        get: function() {
          return reactRouter.UNSAFE_NavigationContext;
        }
      });
      Object.defineProperty(exports2, "UNSAFE_RouteContext", {
        enumerable: true,
        get: function() {
          return reactRouter.UNSAFE_RouteContext;
        }
      });
      Object.defineProperty(exports2, "createPath", {
        enumerable: true,
        get: function() {
          return reactRouter.createPath;
        }
      });
      Object.defineProperty(exports2, "createRoutesFromChildren", {
        enumerable: true,
        get: function() {
          return reactRouter.createRoutesFromChildren;
        }
      });
      Object.defineProperty(exports2, "generatePath", {
        enumerable: true,
        get: function() {
          return reactRouter.generatePath;
        }
      });
      Object.defineProperty(exports2, "matchPath", {
        enumerable: true,
        get: function() {
          return reactRouter.matchPath;
        }
      });
      Object.defineProperty(exports2, "matchRoutes", {
        enumerable: true,
        get: function() {
          return reactRouter.matchRoutes;
        }
      });
      Object.defineProperty(exports2, "parsePath", {
        enumerable: true,
        get: function() {
          return reactRouter.parsePath;
        }
      });
      Object.defineProperty(exports2, "renderMatches", {
        enumerable: true,
        get: function() {
          return reactRouter.renderMatches;
        }
      });
      Object.defineProperty(exports2, "resolvePath", {
        enumerable: true,
        get: function() {
          return reactRouter.resolvePath;
        }
      });
      Object.defineProperty(exports2, "useHref", {
        enumerable: true,
        get: function() {
          return reactRouter.useHref;
        }
      });
      Object.defineProperty(exports2, "useInRouterContext", {
        enumerable: true,
        get: function() {
          return reactRouter.useInRouterContext;
        }
      });
      Object.defineProperty(exports2, "useLocation", {
        enumerable: true,
        get: function() {
          return reactRouter.useLocation;
        }
      });
      Object.defineProperty(exports2, "useMatch", {
        enumerable: true,
        get: function() {
          return reactRouter.useMatch;
        }
      });
      Object.defineProperty(exports2, "useNavigate", {
        enumerable: true,
        get: function() {
          return reactRouter.useNavigate;
        }
      });
      Object.defineProperty(exports2, "useNavigationType", {
        enumerable: true,
        get: function() {
          return reactRouter.useNavigationType;
        }
      });
      Object.defineProperty(exports2, "useOutlet", {
        enumerable: true,
        get: function() {
          return reactRouter.useOutlet;
        }
      });
      Object.defineProperty(exports2, "useOutletContext", {
        enumerable: true,
        get: function() {
          return reactRouter.useOutletContext;
        }
      });
      Object.defineProperty(exports2, "useParams", {
        enumerable: true,
        get: function() {
          return reactRouter.useParams;
        }
      });
      Object.defineProperty(exports2, "useResolvedPath", {
        enumerable: true,
        get: function() {
          return reactRouter.useResolvedPath;
        }
      });
      Object.defineProperty(exports2, "useRoutes", {
        enumerable: true,
        get: function() {
          return reactRouter.useRoutes;
        }
      });
      exports2.BrowserRouter = BrowserRouter;
      exports2.HashRouter = HashRouter;
      exports2.Link = Link2;
      exports2.NavLink = NavLink;
      exports2.createSearchParams = createSearchParams;
      exports2.unstable_HistoryRouter = HistoryRouter;
      exports2.useLinkClickHandler = useLinkClickHandler;
      exports2.useSearchParams = useSearchParams2;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/.pnpm/react-router-dom@6.3.0_zpnidt7m3osuk7shl3s4oenomq/node_modules/react-router-dom/main.js
var require_main3 = __commonJS({
  "node_modules/.pnpm/react-router-dom@6.3.0_zpnidt7m3osuk7shl3s4oenomq/node_modules/react-router-dom/main.js"(exports, module2) {
    "use strict";
    if (process.env.NODE_ENV === "production") {
      module2.exports = require_react_router_dom_production_min();
    } else {
      module2.exports = require_react_router_dom_development();
    }
  }
});

// packages/runtime/esm/index.js
var esm_exports = {};
__export(esm_exports, {
  App: () => App,
  Link: () => import_react_router_dom3.Link,
  LinkSingle: () => LinkSingle,
  Links: () => Links,
  Main: () => Main,
  Meta: () => Meta,
  Outlet: () => import_react_router_dom3.Outlet,
  OutletSingle: () => OutletSingle,
  Runtime: () => runtime_default,
  Scripts: () => Scripts,
  Title: () => Title,
  dataLoader: () => dataLoader_default,
  defineAppConfig: () => defineAppConfig,
  getAppConfig: () => getAppConfig,
  runClientApp: () => runClientApp,
  useAppContext: () => useAppContext,
  useAppData: () => useAppData,
  useConfig: () => useConfig,
  useData: () => useData,
  useLocation: () => import_react_router_dom3.useLocation,
  useLocationSingle: () => useLocationSingle,
  useParams: () => import_react_router_dom3.useParams,
  useParamsSingle: () => useParamsSingle,
  useSearchParams: () => import_react_router_dom3.useSearchParams,
  useSearchParamsSingle: () => useSearchParamsSingle
});
module.exports = __toCommonJS(esm_exports);
var import_react_router_dom3 = __toESM(require_main3(), 1);

// packages/runtime/esm/utils/history-single.js
var React = __toESM(require("react"), 1);
var useRoutesSingle = (routes) => {
  return React.createElement(React.Fragment, null, routes[0].element);
};
var RouterSingle = (props) => {
  return React.createElement(React.Fragment, null, props.children);
};
var createHistorySingle = () => {
  return {
    listen: () => {
    },
    action: "POP",
    location: ""
  };
};
var matchRoutesSingle = (routes) => {
  return routes.map((item) => {
    return {
      params: {},
      pathname: "",
      pathnameBase: "",
      route: item
    };
  });
};
var LinkSingle = () => null;
var OutletSingle = () => {
  return React.createElement(React.Fragment, null);
};
var useParamsSingle = () => {
  return {};
};
var useSearchParamsSingle = () => {
  return [{}, () => {
  }];
};
var useLocationSingle = () => {
  return {};
};

// packages/runtime/esm/runtime.js
var React4 = __toESM(require("react"), 1);
var ReactDOM = __toESM(require("react-dom/client"), 1);

// packages/runtime/esm/AppRouter.js
var React2 = __toESM(require("react"), 1);
var import_react_router_dom = __toESM(require_main3(), 1);
var AppRouter = (props) => {
  const { action, location, navigator, static: staticProps, routes, basename } = props;
  const IceRouter = process.env.ICE_CORE_ROUTER === "true" ? import_react_router_dom.Router : RouterSingle;
  return React2.createElement(IceRouter, { basename, navigationType: action, location, navigator, static: staticProps }, React2.createElement(Routes, { routes }));
};
function Routes({ routes }) {
  const useIceRoutes = process.env.ICE_CORE_ROUTER === "true" ? import_react_router_dom.useRoutes : useRoutesSingle;
  const element = useIceRoutes(routes);
  return element;
}
var AppRouter_default = AppRouter;

// packages/runtime/esm/RouteContext.js
var React3 = __toESM(require("react"), 1);
var DataContext = React3.createContext(void 0);
DataContext.displayName = "Data";
function useData() {
  const value = React3.useContext(DataContext);
  return value;
}
var DataProvider = DataContext.Provider;
var ConfigContext = React3.createContext(void 0);
ConfigContext.displayName = "Config";
function useConfig() {
  const value = React3.useContext(ConfigContext);
  return value;
}
var ConfigProvider = ConfigContext.Provider;

// packages/runtime/esm/runtime.js
var Runtime = class {
  constructor(appContext) {
    this.getAppContext = () => this.appContext;
    this.getRender = () => {
      return this.render;
    };
    this.getAppRouter = () => this.AppRouter;
    this.getWrappers = () => this.RouteWrappers;
    this.addProvider = (Provider) => {
      this.AppProvider.unshift(Provider);
    };
    this.setRender = (render2) => {
      this.render = render2;
    };
    this.addWrapper = (Wrapper, forLayout) => {
      this.RouteWrappers.push({
        Wrapper,
        layout: forLayout
      });
    };
    this.setAppRouter = (AppRouter2) => {
      this.AppRouter = AppRouter2;
    };
    this.AppProvider = [];
    this.appContext = appContext;
    this.render = (container, element) => {
      const root = ReactDOM.createRoot(container);
      root.render(element);
    };
    this.AppRouter = AppRouter_default;
    this.RouteWrappers = [];
  }
  async loadModule(module2) {
    let runtimeAPI = {
      addProvider: this.addProvider,
      setRender: this.setRender,
      addWrapper: this.addWrapper,
      appContext: this.appContext,
      setAppRouter: this.setAppRouter,
      useData,
      useConfig
    };
    const runtimeModule = module2.default || module2;
    if (module2) {
      return await runtimeModule(runtimeAPI);
    }
  }
  composeAppProvider() {
    if (!this.AppProvider.length)
      return null;
    return this.AppProvider.reduce((ProviderComponent, CurrentProvider) => {
      return ({ children, ...rest }) => {
        const element = CurrentProvider ? React4.createElement(CurrentProvider, { ...rest }, children) : children;
        return React4.createElement(ProviderComponent, { ...rest }, element);
      };
    });
  }
};
var runtime_default = Runtime;

// packages/runtime/esm/App.js
var import_react2 = __toESM(require("react"), 1);

// packages/runtime/esm/AppErrorBoundary.js
var React5 = __toESM(require("react"), 1);
var AppErrorBoundary = class extends React5.Component {
  constructor() {
    super(...arguments);
    this.state = {
      error: null
    };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("AppErrorBoundary", error, errorInfo);
  }
  render() {
    if (this.state.error) {
      return React5.createElement("h1", null, "Something went wrong.");
    }
    return this.props.children;
  }
};

// packages/runtime/esm/AppContext.js
var React6 = __toESM(require("react"), 1);
var Context = React6.createContext(void 0);
Context.displayName = "AppContext";
function useAppContext() {
  const value = React6.useContext(Context);
  return value;
}
var AppContextProvider = Context.Provider;

// packages/runtime/esm/routes.js
var import_react = __toESM(require("react"), 1);

// packages/runtime/esm/RouteWrapper.js
var React7 = __toESM(require("react"), 1);
function RouteWrapper(props) {
  const { wrappers = [], id, isLayout } = props;
  const { routesData, routesConfig } = useAppContext();
  const filtered = isLayout ? wrappers.filter((wrapper) => wrapper.layout === true) : wrappers;
  const RouteWrappers = filtered.map((item) => item.Wrapper);
  let element;
  if (RouteWrappers.length) {
    element = RouteWrappers.reduce((preElement, CurrentWrapper) => React7.createElement(CurrentWrapper, null, preElement), props.children);
  } else {
    element = props.children;
  }
  return React7.createElement(DataProvider, { value: routesData[id] }, React7.createElement(ConfigProvider, { value: routesConfig[id] }, element));
}

// packages/runtime/esm/routes.js
async function loadRouteModule(route, routeModulesCache) {
  const { id, load: load2 } = route;
  if (typeof window !== "undefined" && id in routeModulesCache) {
    return routeModulesCache[id];
  }
  try {
    const routeModule = await load2();
    routeModulesCache[id] = routeModule;
    return routeModule;
  } catch (error) {
    console.error("loadRouteModule", error);
  }
}
async function loadRouteModules(routes, originRouteModules = {}) {
  const routeModules = { ...originRouteModules };
  for (const route of routes) {
    const routeModule = await loadRouteModule(route, routeModules);
    routeModules[route.id] = routeModule;
  }
  return routeModules;
}
async function loadRoutesData(matches, requestContext, routeModules, renderMode) {
  const routesData = {};
  const hasGlobalLoader = typeof window !== "undefined" && window.__ICE_DATA_LOADER__;
  if (hasGlobalLoader) {
    const load2 = window.__ICE_DATA_LOADER__;
    await Promise.all(matches.map(async (match) => {
      const { id } = match.route;
      routesData[id] = await load2(id);
    }));
    return routesData;
  }
  await Promise.all(matches.map(async (match) => {
    const { id } = match.route;
    const routeModule = routeModules[id];
    const { getData, getServerData, getStaticData } = routeModule !== null && routeModule !== void 0 ? routeModule : {};
    let dataLoader;
    if (renderMode === "SSG") {
      dataLoader = getStaticData;
    } else if (renderMode === "SSR") {
      dataLoader = getServerData || getData;
    } else {
      dataLoader = getData;
    }
    if (dataLoader) {
      routesData[id] = await dataLoader(requestContext);
    }
  }));
  return routesData;
}
function getRoutesConfig(matches, routesData, routeModules) {
  const routesConfig = {};
  matches.forEach(async (match) => {
    const { id } = match.route;
    const routeModule = routeModules[id];
    if (typeof routeModule === "object") {
      const { getConfig } = routeModule;
      const data = routesData[id];
      if (getConfig) {
        const value = getConfig({ data });
        routesConfig[id] = value;
      }
    } else {
      routesConfig[id] = {};
    }
  });
  return routesConfig;
}
function createRouteElements(routes, RouteWrappers) {
  return routes.map((routeItem) => {
    let { path, children, index, id, layout, element, ...rest } = routeItem;
    element = import_react.default.createElement(RouteWrapper, { id, isLayout: layout, wrappers: RouteWrappers }, import_react.default.createElement(RouteComponent, { id }));
    const route = {
      path,
      element,
      index,
      id,
      ...rest
    };
    if (children) {
      route.children = createRouteElements(children, RouteWrappers);
    }
    return route;
  });
}
function RouteComponent({ id }) {
  const { routeModules } = useAppContext();
  const { default: Component2 } = routeModules[id] || {};
  if (process.env.NODE_ENV === "development") {
    if (!Component2) {
      throw new Error(`Route "${id}" has no component! Please go add a \`default\` export in the route module file.
If you were trying to navigate or submit to a resource route, use \`<a>\` instead of \`<Link>\` or \`<Form reloadDocument>\`.`);
    }
  }
  return import_react.default.createElement(Component2, null);
}
function filterMatchesToLoad(prevMatches, currentMatches) {
  let isNew = (match, index) => {
    if (!prevMatches[index])
      return true;
    return match.route.id !== prevMatches[index].route.id;
  };
  let matchPathChanged = (match, index) => {
    var _a;
    return prevMatches[index].pathname !== match.pathname || ((_a = prevMatches[index].route.path) === null || _a === void 0 ? void 0 : _a.endsWith("*")) && prevMatches[index].params["*"] !== match.params["*"];
  };
  return currentMatches.filter((match, index) => {
    return isNew(match, index) || matchPathChanged(match, index);
  });
}

// packages/runtime/esm/App.js
function App(props) {
  const { location, action, navigator, static: staticProp = false, AppProvider, AppRouter: AppRouter2, RouteWrappers } = props;
  const { appConfig, routes: originRoutes, basename } = useAppContext();
  const { strict, errorBoundary } = appConfig.app;
  const StrictMode = strict ? import_react2.default.StrictMode : import_react2.default.Fragment;
  if (!originRoutes || originRoutes.length === 0) {
    throw new Error("Please add routes(like pages/index.tsx) to your app.");
  }
  const routes = (0, import_react2.useMemo)(() => createRouteElements(originRoutes, RouteWrappers), []);
  const ErrorBoundary = errorBoundary ? AppErrorBoundary : import_react2.default.Fragment;
  let element = import_react2.default.createElement(AppRouter2, { action, location, navigator, static: staticProp, routes, basename });
  return import_react2.default.createElement(StrictMode, null, import_react2.default.createElement(ErrorBoundary, null, import_react2.default.createElement(AppProvider, null, element)));
}

// packages/runtime/esm/runClientApp.js
var import_react3 = __toESM(require("react"), 1);
var ReactDOM2 = __toESM(require("react-dom/client"), 1);
var import_history = __toESM(require_main(), 1);

// packages/runtime/esm/AppData.js
var React10 = __toESM(require("react"), 1);
var Context2 = React10.createContext(void 0);
Context2.displayName = "AppDataContext";
function useAppData() {
  const value = React10.useContext(Context2);
  return value;
}
var AppDataProvider = Context2.Provider;
async function getAppData(appExport, requestContext) {
  const hasGlobalLoader = typeof window !== "undefined" && window.__ICE_DATA_LOADER__;
  if (hasGlobalLoader) {
    const load2 = window.__ICE_DATA_LOADER__;
    return await load2("__app");
  }
  if (appExport === null || appExport === void 0 ? void 0 : appExport.getAppData) {
    return await appExport.getAppData(requestContext);
  }
}

// packages/runtime/esm/routesConfig.js
function getMeta(matches, routesConfig) {
  return getMergedValue("meta", matches, routesConfig) || [];
}
function getLinks(matches, routesConfig) {
  return getMergedValue("links", matches, routesConfig) || [];
}
function getScripts(matches, routesConfig) {
  return getMergedValue("scripts", matches, routesConfig) || [];
}
function getTitle(matches, routesConfig) {
  return getMergedValue("title", matches, routesConfig);
}
function getMergedValue(key, matches, routesConfig) {
  let result;
  for (let match of matches) {
    const routeId = match.route.id;
    const data = routesConfig[routeId];
    const value = data === null || data === void 0 ? void 0 : data[key];
    if (Array.isArray(value)) {
      result = result ? result.concat(value) : value;
    } else if (value) {
      result = value;
    }
  }
  return result;
}
async function updateRoutesConfig(matches, routesConfig) {
  const title = getTitle(matches, routesConfig);
  if (title) {
    document.title = title;
  }
  const meta = getMeta(matches, routesConfig) || [];
  const links = getLinks(matches, routesConfig) || [];
  const scripts = getScripts(matches, routesConfig) || [];
  await Promise.all([
    updateMeta(meta),
    updateAssets("link", links),
    updateAssets("script", scripts)
  ]);
}
function updateMeta(meta) {
  var _a;
  const headEl = document.head;
  const metaCountEl = headEl.querySelector("meta[name=ice-meta-count]");
  const headCount = Number(metaCountEl.content);
  const oldTags = [];
  for (let i = 0, j = metaCountEl.previousElementSibling; i < headCount; i++, j = j === null || j === void 0 ? void 0 : j.previousElementSibling) {
    if (((_a = j === null || j === void 0 ? void 0 : j.tagName) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === "meta") {
      oldTags.push(j);
    }
  }
  const newTags = meta.map((item) => {
    return reactElementToDOM("meta", item);
  });
  oldTags.forEach((t) => t.parentNode.removeChild(t));
  newTags.forEach((t) => headEl.insertBefore(t, metaCountEl));
  metaCountEl.content = newTags.length.toString();
}
var DOMAttributeNames = {
  acceptCharset: "accept-charset",
  className: "class",
  htmlFor: "for",
  httpEquiv: "http-equiv",
  noModule: "noModule"
};
function reactElementToDOM(type, props) {
  const el = document.createElement(type);
  for (const p in props) {
    if (props[p] === void 0)
      continue;
    const attr = DOMAttributeNames[p] || p.toLowerCase();
    if (type === "script" && (attr === "async" || attr === "defer" || attr === "noModule")) {
      el[attr] = !!props[p];
    } else {
      el.setAttribute(attr, props[p]);
    }
  }
  return el;
}
var looseToArray = (input) => [].slice.call(input);
async function updateAssets(type, assets) {
  const oldTags = looseToArray(document.querySelectorAll(`${type}[data-route-${type}]`));
  await Promise.all(assets.map((asset) => {
    return appendTags(type, asset);
  }));
  oldTags.forEach((tag) => {
    tag.parentNode.removeChild(tag);
  });
}
async function appendTags(type, props) {
  return new Promise((resolve, reject) => {
    const tag = reactElementToDOM(type, props);
    tag.setAttribute(`data-route-${type}`, "true");
    tag.onload = () => {
      resolve(null);
    };
    tag.onerror = () => {
      reject();
    };
    document.head.appendChild(tag);
  });
}

// packages/runtime/esm/requestContext.js
function getRequestContext(location, serverContext = {}) {
  const { pathname, search } = location;
  const query = parseSearch(search);
  const requestContext = {
    ...serverContext,
    pathname,
    query
  };
  return requestContext;
}
function parseSearch(search) {
  if (search.indexOf("?") === 0) {
    search = search.slice(1);
  }
  const result = {};
  let pairs = search.split("&");
  for (let j = 0; j < pairs.length; j++) {
    const value = pairs[j];
    const index = value.indexOf("=");
    if (index > -1) {
      const k = value.slice(0, index);
      const v = value.slice(index + 1);
      result[k] = v;
    } else if (value) {
      result[value] = "";
    }
  }
  return result;
}

// packages/runtime/esm/appConfig.js
var defaultAppConfig = {
  app: {
    strict: false,
    rootId: "ice-container"
  },
  router: {
    type: "browser"
  }
};
function getAppConfig(appExport) {
  const appConfig = (appExport === null || appExport === void 0 ? void 0 : appExport.default) || {};
  const { app, router, ...others } = appConfig;
  return {
    app: {
      ...defaultAppConfig.app,
      ...appConfig.app || {}
    },
    router: {
      ...defaultAppConfig.router,
      ...appConfig.router || {}
    },
    ...others
  };
}
function defineAppConfig(appConfig) {
  return appConfig;
}

// packages/runtime/esm/matchRoutes.js
var import_react_router_dom2 = __toESM(require_main3(), 1);
function matchRoutes(routes, location, basename) {
  const matchRoutesFn = process.env.ICE_CORE_ROUTER === "true" ? import_react_router_dom2.matchRoutes : matchRoutesSingle;
  let matches = matchRoutesFn(routes, location, basename);
  if (!matches)
    return [];
  return matches.map(({ params, pathname, pathnameBase, route }) => ({
    params,
    pathname,
    route,
    pathnameBase
  }));
}

// packages/runtime/esm/runClientApp.js
async function runClientApp(options) {
  const { app, routes, runtimeModules, Document, basename: defaultBasename, hydrate, memoryRouter } = options;
  const appContextFromServer = window.__ICE_APP_CONTEXT__ || {};
  let { appData, routesData, routesConfig, assetsManifest, basename: basenameFromServer, routePath } = appContextFromServer;
  const requestContext = getRequestContext(window.location);
  if (!appData) {
    appData = await getAppData(app, requestContext);
  }
  const appConfig = getAppConfig(app);
  const basename = basenameFromServer || defaultBasename;
  const matches = matchRoutes(routes, memoryRouter ? routePath : window.location, basename);
  const routeModules = await loadRouteModules(matches.map(({ route: { id, load: load2 } }) => ({ id, load: load2 })));
  if (!routesData) {
    routesData = await loadRoutesData(matches, requestContext, routeModules);
  }
  if (!routesConfig) {
    routesConfig = getRoutesConfig(matches, routesConfig, routeModules);
  }
  const appContext = {
    appExport: app,
    routes,
    appConfig,
    appData,
    routesData,
    routesConfig,
    assetsManifest,
    matches,
    routeModules,
    basename,
    routePath
  };
  const runtime = new runtime_default(appContext);
  if (hydrate) {
    runtime.setRender((container, element) => {
      ReactDOM2.hydrateRoot(container, element);
    });
  }
  await Promise.all(runtimeModules.map((m) => runtime.loadModule(m)).filter(Boolean));
  render(runtime, Document, { memoryRouter, routePath });
}
async function render(runtime, Document, options) {
  var _a, _b, _c, _d;
  const { routePath, memoryRouter } = options;
  const appContext = runtime.getAppContext();
  const { appConfig } = appContext;
  const render2 = runtime.getRender();
  const AppProvider = runtime.composeAppProvider() || import_react3.default.Fragment;
  const RouteWrappers = runtime.getWrappers();
  const AppRouter2 = runtime.getAppRouter();
  const createHistory = process.env.ICE_CORE_ROUTER === "true" ? createRouterHistory((_a = appConfig === null || appConfig === void 0 ? void 0 : appConfig.router) === null || _a === void 0 ? void 0 : _a.type, memoryRouter) : createHistorySingle;
  const createHistoryOptions = {
    window
  };
  if (memoryRouter || ((_b = appConfig === null || appConfig === void 0 ? void 0 : appConfig.router) === null || _b === void 0 ? void 0 : _b.type) === "memory") {
    let initialEntries = [];
    if (memoryRouter) {
      initialEntries = [routePath];
    } else if (((_c = appConfig === null || appConfig === void 0 ? void 0 : appConfig.router) === null || _c === void 0 ? void 0 : _c.type) === "memory") {
      initialEntries = ((_d = appConfig === null || appConfig === void 0 ? void 0 : appConfig.router) === null || _d === void 0 ? void 0 : _d.initialEntries) || [window.location.pathname];
    }
    createHistoryOptions.initialEntries = initialEntries;
  }
  const history = createHistory(createHistoryOptions);
  render2(document.getElementById(appConfig.app.rootId), import_react3.default.createElement(BrowserEntry, { history, appContext, AppProvider, RouteWrappers, AppRouter: AppRouter2, Document }));
}
function BrowserEntry({ history, appContext, Document, ...rest }) {
  const { routes, matches: originMatches, routesData: initialRoutesData, routesConfig: initialRoutesConfig, routeModules: initialRouteModules, basename, appData } = appContext;
  const [historyState, setHistoryState] = (0, import_react3.useState)({
    action: history.action,
    location: history.location
  });
  const [routeState, setRouteState] = (0, import_react3.useState)({
    routesData: initialRoutesData,
    routesConfig: initialRoutesConfig,
    matches: originMatches,
    routeModules: initialRouteModules
  });
  const { action, location } = historyState;
  const { routesData, routesConfig, matches, routeModules } = routeState;
  (0, import_react3.useLayoutEffect)(() => {
    if (history) {
      history.listen(({ action: action2, location: location2 }) => {
        const currentMatches = matchRoutes(routes, location2, basename);
        if (!currentMatches.length) {
          throw new Error(`Routes not found in location ${location2.pathname}.`);
        }
        loadNextPage(currentMatches, routeState).then(({ routesData: routesData2, routesConfig: routesConfig2, routeModules: routeModules2 }) => {
          setHistoryState({
            action: action2,
            location: location2
          });
          setRouteState({
            routesData: routesData2,
            routesConfig: routesConfig2,
            matches: currentMatches,
            routeModules: routeModules2
          });
        });
      });
    }
  }, []);
  Object.assign(appContext, {
    matches,
    routesData,
    routesConfig,
    routeModules
  });
  return import_react3.default.createElement(AppContextProvider, { value: appContext }, import_react3.default.createElement(AppDataProvider, { value: appData }, import_react3.default.createElement(App, { action, location, navigator: history, ...rest })));
}
async function loadNextPage(currentMatches, preRouteState) {
  const { matches: preMatches, routesData: preRoutesData, routeModules: preRouteModules } = preRouteState;
  const routeModules = await loadRouteModules(currentMatches.map(({ route: { id, load: load2 } }) => ({ id, load: load2 })), preRouteModules);
  const initialContext = getRequestContext(window.location);
  const matchesToLoad = filterMatchesToLoad(preMatches, currentMatches);
  const data = await loadRoutesData(matchesToLoad, initialContext, routeModules);
  const routesData = {};
  currentMatches.forEach(({ route }) => {
    const { id } = route;
    routesData[id] = data[id] || preRoutesData[id];
  });
  const routesConfig = getRoutesConfig(currentMatches, routesData, routeModules);
  await updateRoutesConfig(currentMatches, routesConfig);
  return {
    routesData,
    routesConfig,
    routeModules
  };
}
function createRouterHistory(type, memoryRouter) {
  if (memoryRouter || type === "memory") {
    return import_history.createMemoryHistory;
  }
  if (type === "browser") {
    return import_history.createBrowserHistory;
  }
  if (type === "hash") {
    return import_history.createHashHistory;
  }
}

// packages/runtime/esm/Document.js
var React12 = __toESM(require("react"), 1);

// packages/runtime/esm/utils/getCurrentRoutePath.js
function getCurrentRoutePath(matches) {
  return matches.length && matches[matches.length - 1].pathname;
}

// packages/runtime/esm/Document.js
var Context3 = React12.createContext(void 0);
Context3.displayName = "DocumentContext";
function useDocumentContext() {
  const value = React12.useContext(Context3);
  return value;
}
var DocumentContextProvider = Context3.Provider;
function Meta() {
  const { matches, routesConfig } = useAppContext();
  const meta = getMeta(matches, routesConfig);
  return React12.createElement(React12.Fragment, null, meta.map((item) => React12.createElement("meta", { key: item.name, ...item })), React12.createElement("meta", { name: "ice-meta-count", content: meta.length.toString() }));
}
function Title() {
  const { matches, routesConfig } = useAppContext();
  const title = getTitle(matches, routesConfig);
  return React12.createElement("title", null, title);
}
function Links() {
  const { routesConfig, matches, assetsManifest } = useAppContext();
  const routeLinks = getLinks(matches, routesConfig);
  const pageAssets = getPageAssets(matches, assetsManifest);
  const entryAssets = getEntryAssets(assetsManifest);
  const styles = entryAssets.concat(pageAssets).filter((path) => path.indexOf(".css") > -1);
  return React12.createElement(React12.Fragment, null, routeLinks.map((link) => {
    const { block, ...props } = link;
    return React12.createElement("link", { key: link.href, ...props, "data-route-link": true });
  }), styles.map((style) => React12.createElement("link", { key: style, rel: "stylesheet", type: "text/css", href: style })));
}
function Scripts() {
  const { routesData, routesConfig, matches, assetsManifest, documentOnly, routeModules, basename } = useAppContext();
  const appData = useAppData();
  const routeScripts = getScripts(matches, routesConfig);
  const pageAssets = getPageAssets(matches, assetsManifest);
  const entryAssets = getEntryAssets(assetsManifest);
  const scripts = entryAssets.concat(pageAssets).filter((path) => path.indexOf(".js") > -1);
  const matchedIds = matches.map((match) => match.route.id);
  const routePath = getCurrentRoutePath(matches);
  const appContext = {
    appData,
    routesData,
    routesConfig,
    assetsManifest,
    appConfig: {},
    matchedIds,
    routeModules,
    routePath,
    basename
  };
  return React12.createElement(React12.Fragment, null, React12.createElement("script", { suppressHydrationWarning: documentOnly, dangerouslySetInnerHTML: { __html: `window.__ICE_APP_CONTEXT__=${JSON.stringify(appContext)}` } }), routeScripts.map((script) => {
    const { block, ...props } = script;
    return React12.createElement("script", { key: script.src, ...props, "data-route-script": true });
  }), scripts.map((script) => {
    return React12.createElement("script", { key: script, src: script });
  }));
}
function Main() {
  const { main } = useDocumentContext();
  const { appConfig } = useAppContext();
  return React12.createElement("div", { id: appConfig.app.rootId }, main);
}
function getPageAssets(matches, assetsManifest) {
  const { pages, publicPath } = assetsManifest;
  let result = [];
  matches.forEach((match) => {
    const { componentName } = match.route;
    const assets = pages[componentName];
    assets && assets.forEach((filePath) => {
      result.push(`${publicPath}${filePath}`);
    });
  });
  return result;
}
function getEntryAssets(assetsManifest) {
  const { entries, publicPath } = assetsManifest;
  let result = [];
  Object.values(entries).forEach((assets) => {
    result = result.concat(assets);
  });
  return result.map((filePath) => `${publicPath}${filePath}`);
}

// packages/runtime/esm/dataLoader.js
var cache = /* @__PURE__ */ new Map();
function loadInitialData(loaders) {
  const context = window.__ICE_APP_CONTEXT__ || {};
  const matchedIds = context.matchedIds || [];
  const routesData = context.routesData || {};
  matchedIds.forEach((id) => {
    const dataFromSSR = routesData[id];
    if (dataFromSSR) {
      cache.set(id, {
        value: dataFromSSR,
        status: "RESOLVED"
      });
      return dataFromSSR;
    }
    const getData = loaders[id];
    if (getData) {
      const requestContext = getRequestContext(window.location);
      const loader = getData(requestContext).then((data) => {
        cache.set(id, {
          value: data,
          status: "RESOLVED"
        });
        return data;
      }).catch((err) => {
        cache.set(id, {
          value: err,
          status: "REJECTED"
        });
      });
      cache.set(id, {
        value: loader,
        status: "PENDING"
      });
    }
  });
}
async function load(id, loader) {
  if (!loader) {
    return null;
  }
  const result = cache.get(id);
  if (result) {
    const { value, status } = result;
    if (status === "RESOLVED") {
      return value;
    }
    if (status === "REJECTED") {
      throw value;
    }
    return await value;
  } else {
    const requestContext = getRequestContext(window.location);
    return await loader(requestContext);
  }
}
function init(loaders) {
  try {
    loadInitialData(loaders);
  } catch (e) {
    console.error(e);
  }
  window.__ICE_DATA_LOADER__ = async (id) => {
    const loader = loaders[id];
    return await load(id, loader);
  };
}
var dataLoader_default = {
  init
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  App,
  Link,
  LinkSingle,
  Links,
  Main,
  Meta,
  Outlet,
  OutletSingle,
  Runtime,
  Scripts,
  Title,
  dataLoader,
  defineAppConfig,
  getAppConfig,
  runClientApp,
  useAppContext,
  useAppData,
  useConfig,
  useData,
  useLocation,
  useLocationSingle,
  useParams,
  useParamsSingle,
  useSearchParams,
  useSearchParamsSingle
});
/**
 * React Router DOM v6.3.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
/**
 * React Router v6.3.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
