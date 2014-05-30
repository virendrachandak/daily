void
function (t, e) {
    var n = parseInt,
        r = Math,
        o = "replace",
        i = "nodeType",
        a = "test",
        u = "getAttribute",
        l = "documentElement",
        c = "getComputedStyle",
        f = "defaultView",
        s = "parentNode",
        g = "body",
        p = "tagName",
        d = "previousSibling",
        m = "nodeName",
        x = "toLowerCase",
        v = "getBoundingClientRect",
        h = "max",
        b = "innerWidth",
        w = "innerHeight",
        N = "scrollLeft",
        A = "scrollTop",
        y = "clientWidth",
        C = "clientHeight",
        E = "css",
        H = t.alogObjectName || "alog",
        O = t[H] = t[H] || function () {
            t[alogName].l = t[alogName].l || +new Date, (t[H].q = t[H].q || []).push(arguments)
        };
    O("define", "element", function () {
        function H() {
            R || (R = {}, "AdivBliCaDulEdlFddGspanHtableIbodyJtrKsectionLtdMolNpOarticlePdtQformRimgSh3TinputUasideViWbXthYemZfont" [o](/([A-Z])([a-z]+)/g, function (t, e, n) {
                R[R[e] = n] = e
            }))
        }

        function O(n, r, l, g) {
            if (!n || 1 != n[i]) return "";
            var p;
            if (/^\/.*\/$/ [a](r)) {
                var d = RegExp(r[o](/^\/|\/$/g, "")).exec(n.className);
                p = d && d[1]
            } else if (p = n[u] !== void 0 && n[u] && n[u](r) || "", "#" == p ? p = "[id]" : "." == p && (p = "[class]"), p[o](/\[([\w-_]+)\]/, function (t, e) {
                p = n[u](e)
            }), !p && X[E]) {
                var m = n.currentStyle || t[c] && e[f][c](n, null);
                ((m && m[X[E]]) + "")[o](/([\w-]+)--([\w-_#.]+)/g, function (t, e, n) {
                    e == r && (p = n)
                })
            }
            return g && (g.target = n), p || l && O(n[s], r, 1, g) || ""
        }

        function P(t, n, r) {
            if (r && H(), n = n || e[g], !t || t == n || /^body$/i [a](t[p])) return "";
            if (1 != t[i] || /^html$/i [a](t[p])) return t[p] || "";
            for (var o = O(t, X.alias), u = 1, l = t[d], c = t[m][x](); l;) u += l[m] == t[m], l = l[d];
            return o = (r && R[c] || c) + (2 > u ? "" : u) + (o && "(" + o + ")"), t[s] == n ? o : P(t[s], n, r) + (/^[A-Z]/ [a](o) ? "" : "-") + o
        }

        function S(t, e) {
            return P(t, e, 1)
        }

        function T(t) {
            var e = t[v]();
            return [n(e.right - e.left), n(e.bottom - e.top)]
        }

        function W(t, e) {
            function n(t, e) {
                return (+r.min(r[h](t / e, 0), 1).toFixed(36 > e ? 1 : 351 > e ? 2 : 3) + "")[o](/^0\./g, ".")
            }
            var i = t[v](),
                a = T(t);
            return [n(e[0] - i.left, a[0]), n(e[1] - i.top, a[1])]
        }

        function Z() {
            var n = T(e[l]),
                o = T(e[g]);
            return [r[h](n[0], o[0], t[b] || 0, e[l].scrollWidth || 0), r[h](n[1], o[1], t[w] || 0, e[l].scrollHeight || 0)]
        }

        function $() {
            return [r[h](e[l][N] || 0, e[g][N] || 0, e[f] && e[f].pageXOffset || 0), r[h](e[l][A] || 0, e[g][A] || 0, e[f] && e[f].pageYOffset || 0), t[b] || e[l][y] || e[g][y] || 0, t[w] || e[l][C] || e[g][C] || 0]
        }

        function L(t, e) {
            X[t] = e
        }
        var R, X = {};
        return exports = {}, exports.ex = O, exports.getPath = P, exports.getXPath = S, exports.ep = W, exports.ps = Z, exports.vr = $, exports.an = L, "Group1Action1Extra1AliasParamText" [o](/([A-Z][a-z]+)(1|0)?/g, function (t, e, n) {
            var r = e[x]();
            X[r] = "alog-" + r, exports["get" + e] = function (t, e) {
                return O(t, X[r], n, e)
            }
        }), X[E] = null, exports
    })
}(window, document);
