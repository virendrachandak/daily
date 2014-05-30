void
function (winElement, docElement) {
    var objectName = winElement.alogObjectName || "alog";
    var alog = winElement[objectName] = winElement[objectName] || function () {
        winElement[objectName].l = winElement[objectName].l || +new Date;
        (winElement[objectName].q = winElement[objectName].q || []).push(arguments)
    };

    function setCookie(name, value, max_age) {
        max_age = max_age || 10;
        var exp = new Date();
        exp.setTime(new Date().getTime() + max_age * 1000);
        docElement.cookie = name + "=" + escape(value) + ";path=/;expires=" + exp.toGMTString()
    }

    function getCookie(name) {
        var arr = docElement.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        if (arr != null) {
            return unescape(arr[2])
        }
        return null
    }

    function foreach(obj, iterator, context) {
        if (obj.length === +obj.length) {
            for (var i = 0, l = obj.length; i < l; i++) {
                if (iterator.call(context, i, obj[i], obj) === false) {
                    return
                }
            }
        } else {
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (iterator.call(context, key, obj[key], obj) === false) {
                        return
                    }
                }
            }
        }
    }
    var trackerName = "speed";
    alog("define", trackerName, function () {
        var timestamp = alog.timestamp;
        var tracker = alog.tracker(trackerName);
        var send = tracker.get("send");
        var _has_send = false;
        tracker.set("protocolParameter", {
            fsItems: null,
            options: null,
            send: null,
            t: null,
            platform: null
        });
        tracker.on("send", function (data) {
            for (var p in data) {
                data[p] == 0 ? data[p] = "0" : "";
                if (/^(c_.*|ht|drt|lt|fs|wt|wtt)$/.test(p)) {
                    if (data[p]) {
                        data[p] = Math.abs(timestamp(data[p]))
                    }
                }
            }
        });
        var options = tracker.get("options");
        var data = {
            product_id: options.product_id || "0",
            page_id: options.random <= options.sample ? options.page_id : "0"
        };
        (function () {
            function _uaMatch(ua) {
                var rchrome = /(chrome)\/(\d+\.\d)/,
                    rsafari = /(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/,
                    ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/,
                    rmsie = /(msie) ([\w.]+)/,
                    rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/,
                    ua = ua.toLowerCase(),
                    b = {};
                var match = rchrome.exec(ua) || ropera.exec(ua) || rmsie.exec(ua) || ua.indexOf("compatible") < 0 && rmozilla.exec(ua) || [];
                if (rsafari.test(ua) && !/chrome/.test(ua)) {
                    match[1] = "safari";
                    match[2] = RegExp["$1"] || RegExp["$2"]
                }
                return {
                    browser: match[1] || "unknown",
                    version: match[2] || "0"
                }
            }

            function _browser() {
                var b = _uaMatch(navigator.userAgent);
                var browser = b.browser;
                if (browser == "msie") {
                    if (document.documentMode) {
                        var vers = b.version.substring(0, 1);
                        if (window.performance) {
                            browser += "9.0";
                            data.ebrowser = vers + "9" + document.documentMode
                        } else {
                            browser += "8.0";
                            data.ebrowser = vers + "8" + document.documentMode
                        }
                    } else {
                        browser += b.version
                    }
                }
                var map = {
                    "msie6.0": 16,
                    "msie7.0": 17,
                    "msie8.0": 18,
                    "msie9.0": 19,
                    chrome: 20,
                    mozilla: 30,
                    safari: 40,
                    opera: 50
                };
                data.browser = map[browser] || 0
            }
            _browser()
        })();
        var fsItems = tracker.get("fsItems");
        var sh = docElement.documentElement.clientHeight;
        var fs = tracker.get("fs");
        for (var i = 0; fsItems && i < fsItems.length; i++) {
            var item = fsItems[i],
                img = item.img,
                time = item.time,
                top = img.offsetTop || 0;
            if (top > 0 && top < sh) {
                fs = time > fs ? time : fs
            }
        }
        tracker.set("fs", fs);
        var jt = getCookie("PMS_JT");
        if (jt) {
            setCookie("PMS_JT", "", -1);
            try {
                jt = eval(jt)
            } catch (ex) {
                jt = {}
            }
            if (!jt.r || docElement.referrer.replace(/#.*/, "") == jt.r) {
                if (timestamp(jt.s) < -100) {
                    tracker.set("wt", jt.s)
                }
            }
        }
        var fetch_timing = {
            dns: 0,
            ct: 0,
            st: 0,
            tt: 0
        };
        if (winElement.performance && performance.timing) {
            var timing = performance.timing;
            var start = timing.domainLookupStart;
            fetch_timing.dns = timing.domainLookupEnd;
            fetch_timing.ct = timing.connectEnd;
            fetch_timing.st = timing.responseStart;
            fetch_timing.tt = timing.responseEnd;
            fetch_timing.dct = timing.domComplete;
            fetch_timing.olt = timing.loadEventEnd;
            foreach(fetch_timing, function (key, value) {
                fetch_timing[key] = Math.max(value - start, 0)
            });
            if (timestamp(start) < 0) {
                data.wtt = start
            }
        }
        foreach(fetch_timing, function (key, value) {
            data[key] = value
        });
        var screen = winElement.screen;
        if (screen) {
            data._screen = screen.width + "*" + screen.height + "|" + screen.availWidth + "*" + screen.availHeight
        }
        data.mnt = (navigator.connection || navigator.mozConnection || navigator.webkitConnection || {
            type: "0"
        }).type;
        if (winElement.JSON && winElement.localStorage && localStorage.getItem("PMS_FT")) {
            var fisMark = JSON.parse(localStorage.getItem("PMS_FT"));
            var timings = [];
            foreach(fisMark, function (source, obj) {
                var timing = [];
                foreach(obj, function (key, value) {
                    timing.push('"' + key + '":' + value)
                }, this);
                timings.push('"' + source + '":{' + timing.join(",") + "}")
            }, this);
            data.fis_timing = "{" + timings.join(",") + "}";
            localStorage.removeItem("PMS_FT")
        }
        tracker.create({
            postUrl: options.log_path || "http://static.tieba.baidu.com/tb/pms/img/st.gif"
        });
        if (send && !_has_send) {
            _has_send = true;
            tracker.send("timing", data)
        }
        return tracker
    })
}(window, document);
