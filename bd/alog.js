void
function (e, t) {
    function n(e) {
        var n = ut.get("alias") || {},
            r = n[e] || e + ".js";
        if (!it[r]) {
            it[r] = !0;
            var i = "script",
                a = t.createElement(i),
                o = t.getElementsByTagName(i)[0];
            a.async = !0, a.src = r, o.parentNode.insertBefore(a, o)
        }
    }

    function r(e) {
        if (!e[g]) {
            for (var t = !0, r = [], a = e[D], o = 0; a && a[y] > o; o++) {
                var f = a[o],
                    s = st[f] = st[f] || {};
                s[g] || s == e ? r[L](s[P]) : (t = !1, s[E] || n(f), s[N] = s[N] || {}, s[N][e[b]] = e)
            }
            t && (e[g] = !0, e[k] && (e[P] = e[k][j](e, r)), i(e))
        }
    }

    function i(e) {
        for (var t in e[N]) r(e[N][t])
    }

    function a(e) {
        return (e || new Date) - tt
    }

    function o(e, t, n) {
        if (e) {
            typeof e == S && (n = t, t = e, e = at);
            try {
                if (e == at) return ot[t] = ot[t] || [], ot[t].unshift(n), void 0;
                e[U] ? e[U](t, n, !1) : e[m] && e[m](J + t, n)
            } catch (r) {}
        }
    }

    function f(e, t, n) {
        if (e) {
            typeof e == S && (n = t, t = e, e = at);
            try {
                if (e == at) {
                    var r = ot[t];
                    if (!r) return;
                    for (var i = r[y]; i--;) r[i] === n && r.splice(i, 1);
                    return
                }
                e[x] ? e[x](t, n, !1) : e[C] && e[C](J + t, n)
            } catch (a) {}
        }
    }

    function s(e) {
        var t = ot[e],
            n = 0;
        if (t) {
            for (var r = [], i = arguments, a = 1; i[y] > a; a++) r[L](i[a]);
            for (var a = t[y]; a--;) t[a][j](this, r) && n++;
            return n
        }
    }

    function u(e, t) {
        if (e && t) {
            var n = new Image(1, 1),
                r = [],
                i = "img_" + +new Date;
            for (var a in t) t[a] && r[L](a + "=" + encodeURIComponent(t[a]));
            at[i] = n, n[I] = n[V] = function () {
                at[i] = n = n[I] = n[V] = null, delete at[i]
            }, n.src = e + "?" + r.join("&")
        }
    }

    function c(e, t) {
        if (!e) return t;
        var n = {};
        for (var r in t) null !== e[r] && (n[e[r] || r] = t[r]);
        return n
    }

    function l() {
        var e = arguments,
            t = e[0];
        if (this[$] || /^(on|un|set|get|create)$/.test(t)) {
            for (var n = p[B][t], r = [], i = 1, a = e[y]; a > i; i++) r[L](e[i]);
            typeof n == G && n[j](this, r)
        } else this[O][L](e)
    }

    function v(e, t) {
        var n = {};
        for (var r in e) e[T](r) && (n[r] = e[r]);
        for (var r in t) t[T](r) && (n[r] = t[r]);
        return n
    }

    function p(e) {
        this[b] = e, this[_] = {
            protocolParameter: {
                postUrl: null,
                protocolParameter: null
            }
        }, this[O] = [], this[F] = at
    }

    function h(e) {
        var t;
        if (e = e || "default", "*" == e) {
            t = [];
            for (var n in ft) t[L](ft[n]);
            return t
        }
        var r = ft[e];
        return r || (r = ft[e] = new p(e)), r
    }

    function d() {
        if (!(et && 50 > new Date - Y || Z)) {
            Z = !0;
            var e = 0;
            for (var t in ft) {
                var n = ft[t];
                n[$] && (e += n[A](Q))
            }
            if (e)
                for (var r = new Date; 100 > new Date - r;);
        }
    }
    var g = "defined",
        m = "attachEvent",
        w = "toString",
        y = "length",
        b = "name",
        D = "requires",
        k = "creator",
        E = "defining",
        j = "apply",
        q = "tracker",
        L = "push",
        P = "instance",
        N = "waiting",
        U = "addEventListener",
        x = "removeEventListener",
        C = "detachEvent",
        I = "onload",
        V = "onerror",
        $ = "created",
        B = "prototype",
        O = "argsList",
        T = "hasOwnProperty",
        _ = "fields",
        A = "fire",
        F = "alog",
        M = "define",
        R = "require",
        S = "string",
        z = "object",
        G = "function",
        H = "send",
        J = "on",
        K = "protocolParameter",
        Q = "unload",
        W = e.alogObjectName || F,
        X = e[W];
    if (!X || !X[g]) {
        var Y, Z, et = t.all && e[m],
            tt = X && X.l || +new Date,
            nt = e.logId || (+new Date)[w](36) + Math.random()[w](36).substr(2, 3),
            rt = 0,
            it = {},
            at = function (e) {
                var t, n, i, a, o = arguments;
                if (e == M || e == R) {
                    for (var f = 1; o[y] > f; f++) switch (typeof o[f]) {
                    case S:
                        t = o[f];
                        break;
                    case z:
                        i = o[f];
                        break;
                    case G:
                        a = o[f]
                    }
                    return e == R && (t && !i && (i = [t]), t = null), t = t ? t : "#" + rt++, n = st[t] = st[t] || {}, n[g] || (n[b] = t, n[D] = i, n[k] = a, e == M && (n[E] = !0), r(n)), void 0
                }
                return typeof e == G ? (e(at), void 0) : ((e + "").replace(/^(?:([\w$_]+)\.)?(\w+)$/, function (e, t, n) {
                    o[0] = n, l[j](at[q](t), o)
                }), void 0)
            },
            ot = {},
            ft = {},
            st = {
                alog: {
                    name: F,
                    defined: !0,
                    instance: at
                }
            };
        p[B].create = function (e) {
            if (!this[$]) {
                typeof e == z && this.set(e), this[$] = new Date, this[A]("create", this);
                for (var t; t = this[O].shift();) l[j](this, t)
            }
        }, p[B][H] = function (e, t) {
            var n = v({
                ts: a()[w](36),
                t: e,
                sid: nt
            }, this[_]);
            if (typeof t == z) n = v(n, t);
            else {
                var r = arguments;
                switch (e) {
                case "pageview":
                    r[1] && (n.page = r[1]), r[2] && (n.title = r[2]);
                    break;
                case "event":
                    r[1] && (n.eventCategory = r[1]), r[2] && (n.eventAction = r[2]), r[3] && (n.eventLabel = r[3]), r[4] && (n.eventValue = r[4]);
                    break;
                case "timing":
                    r[1] && (n.timingCategory = r[1]), r[2] && (n.timingVar = r[2]), r[3] && (n.timingValue = r[3]), r[4] && (n.timingLabel = r[4]);
                    break;
                case "exception":
                    r[1] && (n.exDescription = r[1]), r[2] && (n.exFatal = r[2]);
                    break;
                default:
                    return
                }
            }
            this[A](H, n), u(this[_].postUrl, c(this[_][K], n))
        }, p[B].set = function (e, t) {
            if (typeof e == S) e == K && (t = v({
                postUrl: null,
                protocolParameter: null
            }, t)), this[_][e] = t;
            else if (typeof e == z)
                for (var n in e) this.set(n, e[n])
        }, p[B].get = function (e, t) {
            var n = this[_][e];
            return typeof t == G && t(n), n
        }, p[B][A] = function (e, t) {
            return at[A](this[b] + "." + e, t)
        }, p[B][J] = function (e, t) {
            at[J](this[b] + "." + e, t)
        }, p[B].un = function (e, t) {
            at.un(this[b] + "." + e, t)
        }, at[b] = F, at.sid = nt, at[g] = !0, at.timestamp = a, at.un = f, at[J] = o, at[A] = s, at[q] = h, at("init");
        var ut = h();
        if (ut.set(K, {
            alias: null
        }), X) {
            var ct = [].concat(X.p || [], X.q || []);
            X.p = X.q = null;
            for (var lt in at) at[T](lt) && (X[lt] = at[lt]);
            at.p = at.q = {
                push: function (e) {
                    at[j](at, e)
                }
            };
            for (var vt = 0; ct[y] > vt; vt++) at[j](at, ct[vt])
        }
        e[W] = at, et && o(t, "mouseup", function (e) {
            var t = e.target || e.srcElement;
            1 == t.nodeType && /^ajavascript:/i.test(t.tagName + t.href) && (Y = new Date)
        }), o(e, "beforeunload", d), o(e, Q, d)
    }
}(window, document);