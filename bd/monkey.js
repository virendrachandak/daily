void
function (e, t) {
    var r = "test",
        n = "tagName",
        o = "get",
        a = "referrer",
        c = "replace",
        i = "getText",
        s = "getXPath",
        u = "clientX",
        f = "clientY",
        l = "scrollLeft",
        p = "clientLeft",
        v = "scrollTop",
        g = "clientTop",
        m = "substr",
        d = "fire",
        b = "set",
        h = "toString",
        w = "d",
        k = "o",
        x = "i",
        y = "w",
        M = "s",
        T = "e",
        X = "reports",
        D = "click",
        L = "none",
        N = "event",
        P = "css",
        Y = "staytime",
        j = "close",
        q = e.alogObjectName || "alog",
        A = e[q] = e[q] || function () {
            e[q].l = e[q].l || +new Date, (e[q].q = e[q].q || []).push(arguments)
        },
        E = "monkey";
    A("define", E, ["element"], function (q) {
        function O(e) {
            for (; e;) {
                if (/^(a|button)$/i [r](e[n])) return e;
                e = e.parentNode
            }
        }

        function S() {
            switch ((U[o](X) || {}).refer) {
            case 1:
            case !0:
                return t[a];
            case 2:
                var e = t[a];
                if (!e) return;
                var r = "";
                return e[c](/(^\w+:\/\/)?([^\/]+)/, function (e, t) {
                    r = t
                }), t.location.host == r ? t[a] : r
            }
        }

        function $(e, t, a) {
            var b = t.target || t.srcElement,
                h = H() - F - J;
            switch (h > 0 && (I += h), F = H(), e) {
            case D:
            case w:
                if (!b) return;
                var y = {},
                    P = O(b),
                    Y = q.getAction(b, y),
                    j = "",
                    A = q[i](b);
                if (P ? (/^a$/i [r](P[n]) && (j = P.getAttribute("href", 2), /^(javascript|#)/i [r](j) && (j = "")), A = A || q[i](P) || P.title || P.innerHTML[c](/<[^>]*>|\s/g, "")) : /input/i [r](b[n]) && /button|radio|checkbox|submit/i [r](b.type) && (P = b, A = A || b.value), !P && !Y) break;
                if ((U[o](X) || {}).onlylink && /input|button/i [r](b[n])) break;
                Q++;
                var E = a ? a.path + "/" + q[s](b, a.doc) : q[s](b),
                    S = q.getGroup(b),
                    $ = q.getExtra(b),
                    R = q.getParam(y.target),
                    B = q.ep(b, [t[u], t[f]]),
                    V = b.ownerDocument,
                    W = V.body,
                    Z = [0, 0];
                t.pageX || t.pageY ? Z = [t.pageX, t.pageY] : (t[u] || t[f]) && (Z = [t[u] + (V && V[l] || W && W[l] || 0) - (V && V[p] || W && W[p] || 0), t[f] + (V && V[v] || W && W[v] || 0) - (V && V[g] || W && W[g] || 0)]);
                var _ = {
                    xp: E,
                    g: S,
                    gx: $,
                    ac: Y,
                    ep: B,
                    ci: Q,
                    pp: Z,
                    ps: q.ps(),
                    param: R,
                    u: ((j || L) + "")[m](0, 200),
                    txt: ((A || L) + "")[m](0, 30)
                };
                (U[o](X) || {}).visibleRange && (_.vr = q.vr()), U[d](D, _), U.send(N, _);
                break;
            case k:
                z = H(), G = 1;
                break;
            case x:
                C += H() - z, z = H(), G = 0;
                break;
            case M:
            case T:
                if (a) return;
                var et = q.vr();
                K = Math.max(et[1] + et[3], K)
            }
        }
        var z, G, H, R, B = [
                ["mousedown", w],
                ["focusout", k],
                ["blur", k, e],
                ["focusin", x],
                ["focus", x, e],
                ["mousemove", "m"],
                ["keydown", "k"],
                ["mousewheel", y],
                ["DOMMouseScroll", y, e],
                ["touchstart", "ts"],
                ["touchmove", "tm"],
                ["touchend", "te"],
                ["scroll", M, e],
                ["resize", T, e]
            ],
            C = 0,
            F = 0,
            I = 0,
            J = 2e3,
            K = 0,
            Q = 0,
            U = A.tracker(E);
        return A(E + ".on", "create", function () {
            var r = e.screen;
            r && U[b]("px", r.width + "*" + r.height), U[b]("ver", 5), U[b](a, S()), (U[o](X) || {})[P] && q.an(P, "content"), U[b]("protocolParameter", {
                reports: null
            }), H = A.timestamp, z = H(), F = H();
            var n;
            t.body && (vr = q.vr(), K = vr[1] + vr[3]);
            for (var c = 0;
                (n = B[c++]) && (A.on(n[2] || t, n[0], function (e) {
                    return function (t) {
                        $(e, t)
                    }
                }(n[1])), (U[o](X) || {})[Y]););
            U[b]("ref", S()), A(E + ".on", "unload", function () {
                if (!R && (R = !0, U[d](j), (U[o](X) || {})[Y])) {
                    G && (C += H() - z);
                    var e = H() - F - J;
                    e > 0 && (I += e);
                    var t = {
                        cmd: j,
                        tc: Q,
                        pd: K,
                        ft: (H() - C)[h](36),
                        at: (H() - I)[h](36)
                    };
                    return U[d](j, t), U.send(N, t), !0
                }
            }), A(E + ".on", "send", function (e) {
                "pageview" == e.t && (e.cmd = "open", e.t = ""), e.t == N && (e.t = ""), e.now && (e.ts = H(e.now)[h](36), e.now = "")
            }), A(E + ".on", "record", function (e) {
                $(e.type, e)
            })
        }), U
    })
}(window, document);
