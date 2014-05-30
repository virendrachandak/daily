var Hunter = Hunter || {};
Hunter.ratio = {
    "5648": 0.2
};
var ALog = ALog || {};
void
function (N) {
    var q = Math,
        c = window,
        C = document,
        L = parseInt;
    var E = /msie \d+/i.test(navigator.userAgent),
        K, g = "alog-",
        z = g + "alias",
        F = g + "action",
        m = g + "group",
        a = g + "param",
        M = g + "extra",
        e = g + "text";
    var x = {},
        v = {
            count: 0,
            items: []
        },
        b = [],
        J = {},
        p = N.configs || {},
        G, r = (+new Date).toString(36) + (q.random().toFixed(8).substr(2)).toString(36);
    N.errors = v;
    N.configs = p;
    N.times = x;
    N.sid = r;

    function l(S) {
        x[S] = +new Date
    }
    N.mark = l;

    function s() {
        if (K) {
            return
        }
        K = {};
        "AdivBliCaDulEdlFddGspanHtableIbodyJtrKsectionLtdMolNpOarticlePdtQformRimgSh3TinputUasideViWbXthYemZfont".replace(/([A-Z])([a-z]+)/g, function (U, S, T) {
            K[K[S] = T] = S
        })
    }

    function y(V, U, W, T) {
        if (!V || V.nodeType != 1) {
            return ""
        }
        var S = (/^[^u]/.test(typeof V.getAttribute) && V.getAttribute(U)) || "";
        if ("#" == S) {
            S = "[id]"
        } else {
            if ("." == S) {
                S = "[class]"
            }
        }
        S.replace(/\[([\w-_]+)\]/, function (Y, X) {
            S = V.getAttribute(X)
        });
        T && (T.target = V);
        return S || (W && y(V.parentNode, U, 1, T)) || ""
    }

    function n(V, S, Y) {
        Y && s();
        S = S || C.body;
        if (!V || V == S || /^body$/i.test(V.tagName)) {
            return ""
        }
        if (V.nodeType != 1 || /html/i.test(V.tagName)) {
            return V.tagName || ""
        }
        var U = y(V, z),
            X = 1,
            W = V.previousSibling,
            T = V.nodeName.toLowerCase();
        while (W) {
            X += W.nodeName == V.nodeName;
            W = W.previousSibling
        }
        U = (Y && K[T] || T) + (X < 2 ? "" : X) + (U && "(" + U + ")");
        return V.parentNode == S ? U : n(V.parentNode, S, Y) + (/^[A-Z]/.test(U) ? "" : "-") + U
    }

    function I(T, S) {
        return n(T, S, 1)
    }
    N.getXPath = I;

    function A(T, S) {
        return y(T, F, true, S)
    }
    N.getAction = A;

    function o(S) {
        return y(S, m, true)
    }
    N.getGroup = o;

    function Q(S) {
        return y(S, M, true)
    }
    N.getExtra = Q;

    function h(S) {
        return y(S, a)
    }
    N.getParam = h;

    function d(S) {
        return y(S, e)
    }
    N.getText = d;

    function P(U, W) {
        if (!U || !W) {
            return
        }
        u("report", W);
        var X = new Image(1, 1),
            S = [],
            T = "img_" + (+new Date);
        for (var V in W) {
            if (W[V]) {
                S.push(V + "=" + encodeURIComponent(W[V]))
            }
        }
        N[T] = X;
        X.onload = X.onerror = function () {
            N[T] = X = X.onload = X.onerror = null;
            delete N[T]
        };
        X.src = U + "?" + S.join("&")
    }
    N.report = P;

    function u(T, W) {
        var V = J[T],
            S = 0;
        if (!V) {
            return
        }
        var U = V.length;
        while (U--) {
            if (V[U](W, T)) {
                S++
            }
        }
        return S
    }
    N.fire = u;

    function B(V, T, W, S) {
        if (!V) {
            return
        }
        try {
            S && S.push([V, T, W]);
            if (V == N) {
                J[T] = J[T] || [];
                J[T].unshift(W);
                return
            }
            if (V.addEventListener) {
                V.addEventListener(T, W, false)
            } else {
                if (V.attachEvent) {
                    V.attachEvent("on" + T, W)
                }
            }
        } catch (U) {}
    }
    N.on = B;

    function D(V, S, Y) {
        if (!V) {
            return
        }
        try {
            if (V instanceof Array) {
                for (var X; X = V.pop();) {
                    D.apply(this, X)
                }
                return
            }
            if (V == N) {
                var W = J[S];
                if (!W) {
                    return
                }
                var U = W.length;
                while (U--) {
                    if (W[U] === Y) {
                        W.splice(U, 1)
                    }
                }
                return
            }
            if (V.removeEventListener) {
                V.removeEventListener(S, Y, false)
            } else {
                V.detachEvent && V.detachEvent("on" + S, Y)
            }
        } catch (T) {}
    }
    N.un = D;

    function k(S) {
        s();
        return S.replace(/\(([^)]+)\)/g, "").replace(/[A-Z]/g, function (T) {
            return "-" + K[T]
        }).replace(/^-/, "")
    }
    N.epath = k;

    function H(S, T) {
        if (!T) {
            return p[S]
        }
        p[S] = p[S] || [];
        if (T instanceof Array) {
            p = p[S].concat(T)
        } else {
            p[S].push(T)
        }
    }
    N.config = H;

    function i(T, W) {
        var V = T.getBoundingClientRect(),
            S = O(T);

        function U(Y, X) {
            return String(+q.min(q.max(Y / X, 0), 1).toFixed(X < 36 ? 1 : (X < 351 ? 2 : 3))).replace(/^0\./g, ".")
        }
        return [U(W[0] - V.left, S[0]), U(W[1] - V.top, S[1])]
    }
    N.ep = i;

    function O(S) {
        var T = S.getBoundingClientRect();
        return [L(T.right - T.left), L(T.bottom - T.top)]
    }

    function t() {
        var T = O(C.documentElement),
            S = O(C.body);
        return [q.max(T[0], S[0], c.innerWidth || 0, C.documentElement.scrollWidth || 0), q.max(T[1], S[1], c.innerHeight || 0, C.documentElement.scrollHeight || 0)]
    }
    N.ps = t;

    function f() {
        return [q.max(C.documentElement.scrollLeft || 0, C.body.scrollLeft || 0, (C.defaultView && C.defaultView.pageXOffset) || 0), q.max(C.documentElement.scrollTop || 0, C.body.scrollTop || 0, (C.defaultView && C.defaultView.pageYOffset) || 0), c.innerWidth || C.documentElement.clientWidth || C.body.clientWidth || 0, c.innerHeight || C.documentElement.clientHeight || C.body.clientHeight || 0]
    }
    N.vr = f;

    function R(T, S) {
        switch (T) {
        case "group":
            m = S;
            break;
        case "alias":
            z = S;
            break;
        case "action":
            F = S;
            break;
        case "param":
            a = S;
            break;
        case "extra":
            M = S;
            break
        }
    }
    N.an = R;

    function j() {
        if (G) {
            return
        }
        G = true;
        l("ult");
        if (u("unload")) {
            isSleep = new Date;
            while (new Date - isSleep < 100) {}
        }
    }
    B(c, "beforeunload", j);
    B(c, "unload", j);

    function w(U, T, S) {
        v.count++;
        if (v.items.length <= 9) {
            v.items.push([U, T, S, +new Date])
        }
        u("error", v)
    }
    N.error = w;
    B(c, "error", w)
}(ALog);
var Monkey = Monkey || {};
void
function (F) {
    var d = window,
        z = document;
    var J, n, I = "monkey",
        b = [
            ["mousedown", "d"],
            ["focusout", "o"],
            ["blur", "o", d],
            ["focusin", "i"],
            ["focus", "i", d],
            ["scroll", "s", d],
            ["resize", "e", d]
        ],
        o, g, p, c = [],
        e, G, i, f, x, j, h, m, v, E, y, k = {},
        A = {},
        a = d.ALog,
        C;

    function H(O) {
        if (!O) {
            return
        }
        var M, N = {
            ts: L().toString(36)
        };
        for (M in k) {
            N[M] = k[M]
        }
        for (M in O) {
            N[M] = O[M]
        }
        r("report", N);
        a.report(J.postUrl, N)
    }

    function D(N, O) {
        if (!N) {
            return
        }
        var M = {
            cmd: "action",
            ac: N,
            param: O
        };
        r("action", M);
        H(M)
    }
    F.push = D;

    function t(M, N) {
        M && (k[M] = N)
    }
    F.set = t;

    function w(N, O, M) {
        a.on(a, I + "." + N, O, M)
    }
    F.on = w;

    function L() {
        return new Date - g
    }

    function K(M) {
        while (M) {
            if (/^(a|button)$/i.test(M.tagName)) {
                return M
            }
            M = M.parentNode
        }
    }

    function l() {
        switch (n.refer) {
        case 1:
        case true:
            return z.referrer;
        case 2:
            var M = z.referrer;
            if (!M) {
                return
            }
            var N = "";
            M.replace(/(^\w+:\/\/)?([^\/]+)/, function (P, O) {
                N = O
            });
            if (z.location.host == N) {
                return z.referrer
            }
            return N
        }
    }

    function B(O, ab, Z) {
        var ad = ab.target || ab.srcElement;
        switch (O) {
        case "d":
            if (!ad) {
                return
            }
            G++;
            var M = {},
                Q = K(ad),
                V = a.getAction(ad, M),
                Y = "",
                T = a.getText(ad);
            if (Q) {
                if (/^a$/i.test(Q.tagName)) {
                    if (n.click) {
                        Y = Q.getAttribute("href", 2);
                        if (/^(javascript|#)/i.test(Y)) {
                            Y = ""
                        }
                    }
                    i++
                } else {
                    f++
                } if (n.click) {
                    T = T || a.getText(Q) || Q.title || Q.innerHTML.replace(/<[^>]*>|\s/g, "")
                }
            } else {
                if (/input/i.test(ad.tagName) && /button|radio|checkbox|submit/i.test(ad.type)) {
                    Q = ad;
                    f++;
                    T = T || ad.value
                }
            } if (/img/i.test(ad.tagName)) {
                j++;
                T = T || ad.alt || ad.title || ad.src
            }
            if ((!Q && !V) || !n.click) {
                break
            }
            if (n.onlylink && /input|button/i.test(ad.tagName)) {
                break
            }
            x++;
            var U = Z ? Z.path + "/" + C(ad, Z.doc) : C(ad),
                R = a.getGroup(ad),
                N = a.getExtra(ad),
                P = a.getParam(M.target),
                X = a.ep(ad, [ab.clientX, ab.clientY]),
                ae = ad.ownerDocument,
                S = ae.body,
                aa = [0, 0];
            if (ab.pageX || ab.pageY) {
                aa = [ab.pageX, ab.pageY]
            } else {
                if (ab.clientX || ab.clientY) {
                    aa = [ab.clientX + (ae && ae.scrollLeft || S && S.scrollLeft || 0) - (ae && ae.clientLeft || S && S.clientLeft || 0), ab.clientY + (ae && ae.scrollTop || S && S.scrollTop || 0) - (ae && ae.clientTop || S && S.clientTop || 0)]
                }
            }
            var ac = {
                xp: U,
                g: R,
                gx: N,
                ac: V,
                ep: X,
                ci: x,
                pp: aa,
                ps: a.ps(),
                param: P,
                u: String(Y || "none").substr(0, 200),
                txt: String(T || "none").substr(0, 30)
            };
            if (n.vr) {
                ac.vr = a.vr()
            }
            r("click", ac);
            H(ac);
            break;
        case "o":
            m = L();
            v = 1;
            break;
        case "i":
            E += L() - m;
            m = L();
            v = 0;
            break;
        case "s":
        case "e":
            var W = a.vr();
            y = Math.max(W[1] + W[3], y);
            break
        }
    }

    function s(N) {
        if (!window.ALog || g || d.frameElement || !document.body.getBoundingClientRect) {
            return
        }
        a = ALog;
        N = N || [];
        if (!(N instanceof Array)) {
            N = [N]
        }
        var O, P, M, Q = [].concat(N);
        while (J = Q.pop()) {
            if (J.page = J.page || J.getPage()) {
                break
            }
        }
        if (!J) {
            return
        }
        if (J.page instanceof Array) {
            J.mid = J.mid || J.page[1];
            J.page = J.page[0]
        }
        n = J.reports;
        a.on(a, "unload", q, c);
        a.on(a, "error", u, c);
        C = a.getXPath;
        G = i = f = x = j = m = v = E = 0;
        g = (a.times && a.times.ht) || new Date;
        p = a.sid || (+g).toString(36) + (+Math.random().toFixed(8).substr(2)).toString(36);
        e = "_e_" + p;
        k = {
            pid: J.pid || 241,
            sid: p,
            hid: J.hid,
            mid: J.mid,
            page: J.page,
            ver: 5,
            p: J.product,
            px: d.screen.width + "*" + d.screen.height,
            ref: l()
        };
        for (O in J) {
            if (/^on(\w+)$/.test(O)) {
                w(O.substr(2), J[O], c)
            }
        }
        r("start", F);
        m = L();
        M = a.vr();
        y = M[1] + M[3];
        n.pv && H({
            cmd: "open"
        });
        for (O = 0; P = b[O++];) {
            a.on(P[2] || z, P[0], (function (R) {
                return function (S) {
                    if (!g) {
                        return
                    }
                    B(R, S)
                }
            })(P[1]), c);
            if (!n.staytime) {
                break
            }
        }
    }
    F.start = s;

    function q() {
        if (!g) {
            return
        }
        r("close", F);
        if (v) {
            E += L() - m
        }
        if (n.staytime) {
            var M = {
                cmd: "close",
                tc: G,
                lc: i,
                bc: f,
                pc: j,
                pd: y,
                ft: (L() - E).toString(36),
                ec: h
            };
            H(M)
        }
        g = 0;
        a.un(c);
        return n.staytime
    }
    F.stop = q;

    function r(N, M) {
        a.fire(I + "." + N, M)
    }

    function u(N) {
        h = N.count;
        if (n.error) {
            n.error = 0;
            var M = N.items[0];
            if (M) {
                H({
                    cmd: "error",
                    et: (M[3] - g).toString(36),
                    url: M[1],
                    msg: M[0],
                    line: M[2]
                })
            }
        }
    }
    if (a) {
        if (a.configs && a.configs[I]) {
            s(a.configs[I])
        }
    }
}(Monkey);
void
function () {
    var a = document,
        e = window;
    var d = ["page"];
    for (var c = 0; c < d.length; c++) {
        var b = a.getElementById(d[c]);
        if (b && b.setAttribute) {
            b.setAttribute("alog-alias", d[c])
        }
    }

    function f() {
        if (!(isNaN(screen.logicalXDPI) || isNaN(screen.systemXDPI))) {
            return (screen.deviceXDPI / screen.logicalXDPI).toFixed(2)
        }
        if (a.body && a.body.style.webkitTextSizeAdjust != null) {
            if ("ontouchstart" in e) {
                var h;
                if (Math.abs(e.orientation) == 90) {
                    h = screen.height
                } else {
                    h = screen.width
                }
                return (h / e.innerWidth).toFixed(2)
            } else {
                var g = a.createElement("div"),
                    l = a.createElement("div"),
                    j = function (n, m) {
                        n.setAttribute("style", m.replace(/;/g, " !important;"))
                    };
                j(g, "width:0;height:0;overflow:hidden;visibility:hidden;position:absolute;");
                l.innerHTML = "1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>0";
                j(l, "font:100px/1em sans-serif;-webkit-text-size-adjust:none;height:auto;width:1em;padding:0;overflow:visible;");
                g.appendChild(l);
                a.body.appendChild(g);
                var k = 1000 / l.clientHeight;
                a.body.removeChild(g);
                return k.toFixed(2)
            }
        }
        if (-1 != navigator.appVersion.indexOf("MSIE 7.")) {
            var i = a.body.getBoundingClientRect();
            var k = (i.right - i.left) / a.body.offsetWidth;
            return k.toFixed(2)
        }
    }
    Monkey.start([{
        ondata: function (g) {
            g.zoom = f()
        },
        getPage: function () {
            var h = a.location;
            if (h.hostname == "lvyou.baidu.com") {
                var g;
                String(h.href).replace(/[^?#]\/scene\/view\/(\w+)(?:.*\bmodule=(\w+))?/i, function (j, k, i) {
                    g = "sv-" + k + (i ? "-" + i : "")
                });
                g || String(h.href).replace(/[^?#]\/scene\/photo\/list\/(\w+)/i, function (i, j) {
                    g = "sv-" + j + "-pl"
                });
                g || String(h.href).replace(/[^?#]\/scene\/allview\/(\w+)(?:\?allview_type=(\d+))?/i, function (i, k, j) {
                    g = "sv-" + k + "-allview" + (j || "")
                });
                return g
            }
        },
        postUrl: "http://nsclick.baidu.com/u.gif",
        product: 308,
        hid: 2945,
        reports: {
            click: 1,
            pv: 1,
            staytime: 1
        }
    }, {
        ondata: function (g) {
            g.zoom = f()
        },
        getPage: function () {
            var h = a.location;
            if (h.hostname == "lvyou.baidu.com") {
                var g;
                if (h.pathname == "/pictravel/create") {
                    g = "lvyou-pt-create"
                } else {
                    if (h.pathname == "/pictravel") {
                        g = "lvyou-pt-index"
                    }
                }
                g || String(h.href).replace(/[^?#]\/pictravel\/photo\/view\/(\w+)/i, function (i, j) {
                    g = "lvyou-pt-photo-view"
                });
                g || String(h.href).replace(/[^?#]\/pictravel\/upload\/(\w+)/i, function (i, j) {
                    g = "lvyou-pt-upload"
                });
                g || String(h.href).replace(/[^?#]\/pictravel\/edit\/(\w+)/i, function (i, j) {
                    g = "lvyou-pt-edit"
                });
                g || String(h.href).replace(/[^?#]\/pictravel\/(\w+)\?publish=1/i, function (i, j) {
                    g = "lvyou-pt-publish"
                });
                g || String(h.href).replace(/[^?#]\/pictravel\/(\w+)/i, function (i, j) {
                    g = "lvyou-pt"
                });
                return g
            }
        },
        postUrl: "http://nsclick.baidu.com/u.gif",
        product: 308,
        hid: 5598,
        reports: {
            pv: 1,
            staytime: 1
        }
    }])
}();
