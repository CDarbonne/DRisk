(function() {
    var d;
    window.AmCharts ? d = window.AmCharts : (d = {}, window.AmCharts = d, d.themes = {}, d.maps = {}, d.inheriting = {}, d.charts = [], d.onReadyArray = [], d.useUTC=!1, d.updateRate = 60, d.uid = 0, d.lang = {}, d.translations = {}, d.mapTranslations = {}, d.windows = {}, d.initHandlers = []);
    d.Class = function(a) {
        var b = function() {
            arguments[0] !== d.inheriting && (this.events = {}, this.construct.apply(this, arguments))
        };
        a.inherits ? (b.prototype = new a.inherits(d.inheriting), b.base = a.inherits.prototype, delete a.inherits) : (b.prototype.createEvents =
        function() {
            for (var a = 0; a < arguments.length; a++)
                this.events[arguments[a]] = []
        }, b.prototype.listenTo = function(a, b, c) {
            this.removeListener(a, b, c);
            a.events[b].push({
                handler: c,
                scope: this
            })
        }, b.prototype.addListener = function(a, b, c) {
            this.removeListener(this, a, b);
            a && this.events[a] && this.events[a].push({
                handler: b,
                scope: c
            })
        }, b.prototype.removeListener = function(a, b, c) {
            if (a && a.events && (a = a.events[b]))
                for (b = a.length - 1; 0 <= b; b--)
                    a[b].handler === c && a.splice(b, 1)
        }, b.prototype.fire = function(a) {
            for (var b = this.events[a.type],
            c = 0; c < b.length; c++) {
                var d = b[c];
                d.handler.call(d.scope, a)
            }
        });
        for (var c in a)
            b.prototype[c] = a[c];
        return b
    };
    d.addChart = function(a) {
        window.requestAnimationFrame ? d.animationRequested || (d.animationRequested=!0, window.requestAnimationFrame(d.update)) : d.updateInt || (d.updateInt = setInterval(function() {
            d.update()
        }, Math.round(1E3 / d.updateRate)));
        d.charts.push(a)
    };
    d.removeChart = function(a) {
        for (var b = d.charts, c = b.length - 1; 0 <= c; c--)
            b[c] == a && b.splice(c, 1);
        0 === b.length && d.updateInt && (clearInterval(d.updateInt), d.updateInt =
        NaN)
    };
    d.isModern=!0;
    d.getIEVersion = function() {
        var a = 0, b, c;
        "Microsoft Internet Explorer" == navigator.appName && (b = navigator.userAgent, c = /MSIE ([0-9]{1,}[.0-9]{0,})/, null !== c.exec(b) && (a = parseFloat(RegExp.$1)));
        return a
    };
    d.applyLang = function(a, b) {
        var c = d.translations;
        b.dayNames = d.extend({}, d.dayNames);
        b.shortDayNames = d.extend({}, d.shortDayNames);
        b.monthNames = d.extend({}, d.monthNames);
        b.shortMonthNames = d.extend({}, d.shortMonthNames);
        b.amString = "am";
        b.pmString = "pm";
        c && (c = c[a]) && (d.lang = c, c.monthNames &&
        (b.dayNames = d.extend({}, c.dayNames), b.shortDayNames = d.extend({}, c.shortDayNames), b.monthNames = d.extend({}, c.monthNames), b.shortMonthNames = d.extend({}, c.shortMonthNames)), c.am && (b.amString = c.am), c.pm && (b.pmString = c.pm))
    };
    d.IEversion = d.getIEVersion();
    9 > d.IEversion && 0 < d.IEversion && (d.isModern=!1, d.isIE=!0);
    d.dx = 0;
    d.dy = 0;
    if (document.addEventListener || window.opera)
        d.isNN=!0, d.isIE=!1, d.dx = .5, d.dy = .5;
    document.attachEvent && (d.isNN=!1, d.isIE=!0, d.isModern || (d.dx = 0, d.dy = 0));
    window.chrome && (d.chrome=!0);
    d.handleMouseUp =
    function(a) {
        for (var b = d.charts, c = 0; c < b.length; c++) {
            var e = b[c];
            e && e.handleReleaseOutside && e.handleReleaseOutside(a)
        }
    };
    d.handleMouseMove = function(a) {
        for (var b = d.charts, c = 0; c < b.length; c++) {
            var e = b[c];
            e && e.handleMouseMove && e.handleMouseMove(a)
        }
    };
    d.handleWheel = function(a) {
        for (var b = d.charts, c = 0; c < b.length; c++) {
            var e = b[c];
            if (e && e.mouseIsOver) {
                e.mouseWheelScrollEnabled || e.mouseWheelZoomEnabled ? e.handleWheel && e.handleWheel(a) : a.stopPropagation && a.stopPropagation();
                break
            }
        }
    };
    d.resetMouseOver = function() {
        for (var a =
        d.charts, b = 0; b < a.length; b++) {
            var c = a[b];
            c && (c.mouseIsOver=!1)
        }
    };
    d.ready = function(a) {
        d.onReadyArray.push(a)
    };
    d.handleLoad = function() {
        d.isReady=!0;
        for (var a = d.onReadyArray, b = 0; b < a.length; b++) {
            var c = a[b];
            isNaN(d.processDelay) ? c() : setTimeout(c, d.processDelay * b)
        }
    };
    d.addInitHandler = function(a, b) {
        d.initHandlers.push({
            method: a,
            types: b
        })
    };
    d.callInitHandler = function(a) {
        var b = d.initHandlers;
        if (d.initHandlers)
            for (var c = 0; c < b.length; c++) {
                var e = b[c];
                e.types ? d.isInArray(e.types, a.type) && e.method(a) : e.method(a)
            }
    };
    d.getUniqueId = function() {
        d.uid++;
        return "AmChartsEl-" + d.uid
    };
    d.isNN && (document.addEventListener("mousemove", d.handleMouseMove), document.addEventListener("mouseup", d.handleMouseUp, !0), window.addEventListener("load", d.handleLoad, !0), window.addEventListener("DOMMouseScroll", d.handleWheel, !0), document.addEventListener("mousewheel", d.handleWheel, !0));
    d.isIE && (document.attachEvent("onmousemove", d.handleMouseMove), document.attachEvent("onmouseup", d.handleMouseUp), window.attachEvent("onload", d.handleLoad),
    document.attachEvent("onmousewheel", d.handleWheel));
    d.clear = function() {
        var a = d.charts;
        if (a)
            for (var b = a.length - 1; 0 <= b; b--)
                a[b].clear();
        d.updateInt && clearInterval(d.updateInt);
        d.charts = [];
        d.isNN && (document.removeEventListener("mousemove", d.handleMouseMove, !0), document.removeEventListener("mouseup", d.handleMouseUp, !0), window.removeEventListener("load", d.handleLoad, !0), window.removeEventListener("DOMMouseScroll", d.handleWheel, !0), document.removeEventListener("mousewheel", d.handleWheel, !0));
        d.isIE && (document.detachEvent("onmousemove",
        d.handleMouseMove), document.detachEvent("onmouseup", d.handleMouseUp), window.detachEvent("onload", d.handleLoad))
    };
    d.makeChart = function(a, b, c) {
        var e = b.type, g = b.theme;
        d.isString(g) && (g = d.themes[g], b.theme = g);
        var f;
        switch (e) {
        case "serial":
            f = new d.AmSerialChart(g);
            break;
        case "xy":
            f = new d.AmXYChart(g);
            break;
        case "pie":
            f = new d.AmPieChart(g);
            break;
        case "radar":
            f = new d.AmRadarChart(g);
            break;
        case "gauge":
            f = new d.AmAngularGauge(g);
            break;
        case "funnel":
            f = new d.AmFunnelChart(g);
            break;
        case "map":
            f = new d.AmMap(g);
            break;
        case "stock":
            f = new d.AmStockChart(g);
            break;
        case "gantt":
            f = new d.AmGanttChart(g)
        }
        d.extend(f, b);
        d.isReady ? isNaN(c) ? f.write(a) : setTimeout(function() {
            d.realWrite(f, a)
        }, c) : d.ready(function() {
            isNaN(c) ? f.write(a) : setTimeout(function() {
                d.realWrite(f, a)
            }, c)
        });
        return f
    };
    d.realWrite = function(a, b) {
        a.write(b)
    };
    d.updateCount = 0;
    d.validateAt = Math.round(d.updateRate / 10);
    d.update = function() {
        var a = d.charts;
        d.updateCount++;
        var b=!1;
        d.updateCount == d.validateAt && (b=!0, d.updateCount = 0);
        if (a)
            for (var c = a.length - 1; 0 <=
            c; c--)
                a[c].update && a[c].update(), b && (a[c].autoResize ? a[c].validateSize && a[c].validateSize() : a[c].premeasure && a[c].premeasure());
        window.requestAnimationFrame && window.requestAnimationFrame(d.update)
    };
    d.bezierX = 3;
    d.bezierY = 6;
    "complete" == document.readyState && d.handleLoad()
})();
(function() {
    var d = window.AmCharts;
    d.toBoolean = function(a, b) {
        if (void 0 === a)
            return b;
        switch (String(a).toLowerCase()) {
        case "true":
        case "yes":
        case "1":
            return !0;
        case "false":
        case "no":
        case "0":
        case null:
            return !1;
        default:
            return !!a
        }
    };
    d.removeFromArray = function(a, b) {
        var c;
        if (void 0 !== b && void 0 !== a)
            for (c = a.length - 1; 0 <= c; c--)
                a[c] == b && a.splice(c, 1)
    };
    d.getPath = function() {
        var a = document.getElementsByTagName("script");
        if (a)
            for (var b = 0; b < a.length; b++) {
                var c = a[b].src;
                if ( - 1 !== c.search(/\/(amcharts|ammap)\.js/))
                    return c.replace(/\/(amcharts|ammap)\.js.*/,
                    "/")
            }
    };
    d.normalizeUrl = function(a) {
        return "" !== a&&-1 === a.search(/\/$/) ? a + "/" : a
    };
    d.isAbsolute = function(a) {
        return 0 === a.search(/^http[s]?:|^\//)
    };
    d.isInArray = function(a, b) {
        for (var c = 0; c < a.length; c++)
            if (a[c] == b)
                return !0;
        return !1
    };
    d.getDecimals = function(a) {
        var b = 0;
        isNaN(a) || (a = String(a), - 1 != a.indexOf("e-") ? b = Number(a.split("-")[1]) : - 1 != a.indexOf(".") && (b = a.split(".")[1].length));
        return b
    };
    d.wordwrap = function(a, b, c, e) {
        var g, f, h, k;
        a += "";
        if (1 > b)
            return a;
        g =- 1;
        for (a = (k = a.split(/\r\n|\n|\r/)).length; ++g < a; k[g] +=
        h) {
            h = k[g];
            for (k[g] = ""; h.length > b; k[g] += d.trim(h.slice(0, f)
                ) + ((h = h.slice(f)).length ? c : ""))f = 2 == e || (f = h.slice(0, b + 1).match(/\S*(\s)?$/))[1] ? b : f.input.length - f[0].length || 1 == e && b || f.input.length + (f = h.slice(b).match(/^\S*/))[0].length;
            h = d.trim(h)
        }
        return k.join(c)
    };
    d.trim = function(a) {
        return a.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
    };
    d.wrappedText = function(a, b, c, e, g, f, h, k) {
        var l = d.text(a, b, c, e, g, f, h);
        if (l) {
            var m = l.getBBox();
            if (m.width > k) {
                var n = "\n";
                d.isModern || (n = "<br>");
                k = Math.floor(k / (m.width /
                b.length));
                2 < k && (k -= 2);
                b = d.wordwrap(b, k, n, !0);
                l.remove();
                l = d.text(a, b, c, e, g, f, h)
            }
        }
        return l
    };
    d.getStyle = function(a, b) {
        var c = "";
        if (document.defaultView && document.defaultView.getComputedStyle)
            try {
                c = document.defaultView.getComputedStyle(a, "").getPropertyValue(b)
        } catch (e) {} else 
            a.currentStyle && (b = b.replace(/\-(\w)/g, function(a, b) {
                return b.toUpperCase()
            }), c = a.currentStyle[b]);
        return c
    };
    d.removePx = function(a) {
        if (void 0 !== a)
            return Number(a.substring(0, a.length - 2))
    };
    d.getURL = function(a, b) {
        if (a)
            if ("_self" !=
            b && b)
                if ("_top" == b && window.top)
                    window.top.location.href = a;
                else if ("_parent" == b && window.parent)
                    window.parent.location.href = a;
                else if ("_blank" == b)
                    window.open(a);
                else {
                    var c = document.getElementsByName(b)[0];
                    c ? c.src = a : (c = d.windows[b]) ? c.opener&&!c.opener.closed ? c.location.href = a : d.windows[b] = window.open(a) : d.windows[b] = window.open(a)
                } else 
                    window.location.href = a
    };
    d.ifArray = function(a) {
        return a && "object" == typeof a && 0 < a.length?!0 : !1
    };
    d.callMethod = function(a, b) {
        var c;
        for (c = 0; c < b.length; c++) {
            var e = b[c];
            if (e) {
                if (e[a])
                    e[a]();
                var d = e.length;
                if (0 < d) {
                    var f;
                    for (f = 0; f < d; f++) {
                        var h = e[f];
                        if (h && h[a])
                            h[a]()
                        }
                }
            }
        }
    };
    d.toNumber = function(a) {
        return "number" == typeof a ? a : Number(String(a).replace(/[^0-9\-.]+/g, ""))
    };
    d.toColor = function(a) {
        if ("" !== a && void 0 !== a)
            if ( - 1 != a.indexOf(",")) {
                a = a.split(",");
                var b;
                for (b = 0; b < a.length; b++) {
                    var c = a[b].substring(a[b].length - 6, a[b].length);
                    a[b] = "#" + c
                }
            } else 
                a = a.substring(a.length - 6, a.length), a = "#" + a;
        return a
    };
    d.toCoordinate = function(a, b, c) {
        var e;
        void 0 !== a && (a = String(a), c && c < b && (b = c), e = Number(a), - 1 != a.indexOf("!") &&
        (e = b - Number(a.substr(1))), - 1 != a.indexOf("%") && (e = b * Number(a.substr(0, a.length - 1)) / 100));
        return e
    };
    d.fitToBounds = function(a, b, c) {
        a < b && (a = b);
        a > c && (a = c);
        return a
    };
    d.isDefined = function(a) {
        return void 0 === a?!1 : !0
    };
    d.stripNumbers = function(a) {
        return a.replace(/[0-9]+/g, "")
    };
    d.roundTo = function(a, b) {
        if (0 > b)
            return a;
        var c = Math.pow(10, b);
        return Math.round(a * c) / c
    };
    d.toFixed = function(a, b) {
        var c = String(Math.round(a * Math.pow(10, b)));
        if (0 < b) {
            var e = c.length;
            if (e < b) {
                var d;
                for (d = 0; d < b - e; d++)
                    c = "0" + c
            }
            e = c.substring(0,
            c.length - b);
            "" === e && (e = 0);
            return e + "." + c.substring(c.length - b, c.length)
        }
        return String(c)
    };
    d.formatDuration = function(a, b, c, e, g, f) {
        var h = d.intervals, k = f.decimalSeparator;
        if (a >= h[b].contains) {
            var l = a - Math.floor(a / h[b].contains) * h[b].contains;
            "ss" == b ? (l = d.formatNumber(l, f), 1 == l.split(k)[0].length && (l = "0" + l)) : l = d.roundTo(l, f.precision);
            ("mm" == b || "hh" == b) && 10 > l && (l = "0" + l);
            c = l + "" + e[b] + "" + c;
            a = Math.floor(a / h[b].contains);
            b = h[b].nextInterval;
            return d.formatDuration(a, b, c, e, g, f)
        }
        "ss" == b && (a = d.formatNumber(a,
        f), 1 == a.split(k)[0].length && (a = "0" + a));
        ("mm" == b || "hh" == b) && 10 > a && (a = "0" + a);
        c = a + "" + e[b] + "" + c;
        if (h[g].count > h[b].count)
            for (a = h[b].count; a < h[g].count; a++)
                b = h[b].nextInterval, "ss" == b || "mm" == b || "hh" == b ? c = "00" + e[b] + "" + c : "DD" == b && (c = "0" + e[b] + "" + c);
        ":" == c.charAt(c.length - 1) && (c = c.substring(0, c.length - 1));
        return c
    };
    d.formatNumber = function(a, b, c, e, g) {
        a = d.roundTo(a, b.precision);
        isNaN(c) && (c = b.precision);
        var f = b.decimalSeparator;
        b = b.thousandsSeparator;
        var h;
        h = 0 > a ? "-" : "";
        a = Math.abs(a);
        var k = String(a), l=!1;
        - 1 !=
        k.indexOf("e") && (l=!0);
        0 <= c&&!l && (k = d.toFixed(a, c));
        var m = "";
        if (l)
            m = k;
        else {
            var k = k.split("."), l = String(k[0]), n;
            for (n = l.length; 0 <= n; n -= 3)
                m = n != l.length ? 0 !== n ? l.substring(n - 3, n) + b + m : l.substring(n - 3, n) + m : l.substring(n - 3, n);
            void 0 !== k[1] && (m = m + f + k[1]);
            void 0 !== c && 0 < c && "0" != m && (m = d.addZeroes(m, f, c))
        }
        m = h + m;
        "" === h&&!0 === e && 0 !== a && (m = "+" + m);
        !0 === g && (m += "%");
        return m
    };
    d.addZeroes = function(a, b, c) {
        a = a.split(b);
        void 0 === a[1] && 0 < c && (a[1] = "0");
        return a[1].length < c ? (a[1] += "0", d.addZeroes(a[0] + b + a[1], b, c)) : void 0 !==
        a[1] ? a[0] + b + a[1] : a[0]
    };
    d.scientificToNormal = function(a) {
        var b;
        a = String(a).split("e");
        var c;
        if ("-" == a[1].substr(0, 1)) {
            b = "0.";
            for (c = 0; c < Math.abs(Number(a[1])) - 1; c++)
                b += "0";
            b += a[0].split(".").join("")
        } else {
            var e = 0;
            b = a[0].split(".");
            b[1] && (e = b[1].length);
            b = a[0].split(".").join("");
            for (c = 0; c < Math.abs(Number(a[1])) - e; c++)
                b += "0"
        }
        return b
    };
    d.toScientific = function(a, b) {
        if (0 === a)
            return "0";
        var c = Math.floor(Math.log(Math.abs(a)) * Math.LOG10E), e = String(e).split(".").join(b);
        return String(e) + "e" + c
    };
    d.randomColor =
    function() {
        return "#" + ("00000" + (16777216 * Math.random()<<0).toString(16)).substr( - 6)
    };
    d.hitTest = function(a, b, c) {
        var e=!1, g = a.x, f = a.x + a.width, h = a.y, k = a.y + a.height, l = d.isInRectangle;
        e || (e = l(g, h, b));
        e || (e = l(g, k, b));
        e || (e = l(f, h, b));
        e || (e = l(f, k, b));
        e ||!0 === c || (e = d.hitTest(b, a, !0));
        return e
    };
    d.isInRectangle = function(a, b, c) {
        return a >= c.x - 5 && a <= c.x + c.width + 5 && b >= c.y - 5 && b <= c.y + c.height + 5?!0 : !1
    };
    d.isPercents = function(a) {
        if ( - 1 != String(a).indexOf("%"))
            return !0
    };
    d.formatValue = function(a, b, c, e, g, f, h, k) {
        if (b) {
            void 0 ===
            g && (g = "");
            var l;
            for (l = 0; l < c.length; l++) {
                var m = c[l], n = b[m];
                void 0 !== n && (n = f ? d.addPrefix(n, k, h, e) : d.formatNumber(n, e), a = a.replace(new RegExp("\\[\\[" + g + "" + m + "\\]\\]", "g"), n))
            }
        }
        return a
    };
    d.formatDataContextValue = function(a, b) {
        if (a) {
            var c = a.match(/\[\[.*?\]\]/g), e;
            for (e = 0; e < c.length; e++) {
                var d = c[e], d = d.substr(2, d.length - 4);
                void 0 !== b[d] && (a = a.replace(new RegExp("\\[\\[" + d + "\\]\\]", "g"), b[d]))
            }
        }
        return a
    };
    d.massReplace = function(a, b) {
        for (var c in b)
            if (b.hasOwnProperty(c)) {
                var e = b[c];
                void 0 === e && (e = "");
                a =
                a.replace(c, e)
            }
        return a
    };
    d.cleanFromEmpty = function(a) {
        return a.replace(/\[\[[^\]]*\]\]/g, "")
    };
    d.addPrefix = function(a, b, c, e, g) {
        var f = d.formatNumber(a, e), h = "", k, l, m;
        if (0 === a)
            return "0";
        0 > a && (h = "-");
        a = Math.abs(a);
        if (1 < a)
            for (k = b.length - 1; - 1 < k; k--) {
                if (a >= b[k].number && (l = a / b[k].number, m = Number(e.precision), 1 > m && (m = 1), c = d.roundTo(l, m), m = d.formatNumber(c, {
                    precision: - 1,
                    decimalSeparator: e.decimalSeparator,
                    thousandsSeparator: e.thousandsSeparator
                }), !g || l == c)) {
                    f = h + "" + m + "" + b[k].prefix;
                    break
                }
            } else 
                for (k = 0; k < c.length; k++)
                    if (a <=
                    c[k].number) {
                        l = a / c[k].number;
                        m = Math.abs(Math.floor(Math.log(l) * Math.LOG10E));
                        l = d.roundTo(l, m);
                        f = h + "" + l + "" + c[k].prefix;
                        break
                    }
        return f
    };
    d.remove = function(a) {
        a && a.remove()
    };
    d.getEffect = function(a) {
        ">" == a && (a = "easeOutSine");
        "<" == a && (a = "easeInSine");
        "elastic" == a && (a = "easeOutElastic");
        return a
    };
    d.getObjById = function(a, b) {
        var c, e;
        for (e = 0; e < a.length; e++) {
            var d = a[e];
            if (d.id == b) {
                c = d;
                break
            }
        }
        return c
    };
    d.applyTheme = function(a, b, c) {
        b || (b = d.theme);
        b && b[c] && d.extend(a, b[c])
    };
    d.isString = function(a) {
        return "string" ==
        typeof a?!0 : !1
    };
    d.extend = function(a, b, c) {
        var e;
        a || (a = {});
        for (e in b)
            c ? a.hasOwnProperty(e) || (a[e] = b[e]) : a[e] = b[e];
        return a
    };
    d.copyProperties = function(a, b) {
        for (var c in a)
            a.hasOwnProperty(c) && "events" != c && void 0 !== a[c] && "function" != typeof a[c] && "cname" != c && (b[c] = a[c])
    };
    d.processObject = function(a, b, c, e) {
        if (!1 === a instanceof b && (a = e ? d.extend(new b(c), a) : d.extend(a, new b(c), !0), a.listeners))
            for (var g in a.listeners)
                b = a.listeners[g], a.addListener(b.event, b.method);
        return a
    };
    d.fixNewLines = function(a) {
        var b =
        RegExp("\\n", "g");
        a && (a = a.replace(b, "<br />"));
        return a
    };
    d.fixBrakes = function(a) {
        if (d.isModern) {
            var b = RegExp("<br>", "g");
            a && (a = a.replace(b, "\n"))
        } else 
            a = d.fixNewLines(a);
        return a
    };
    d.deleteObject = function(a, b) {
        if (a) {
            if (void 0 === b || null === b)
                b = 20;
            if (0 !== b)
                if ("[object Array]" === Object.prototype.toString.call(a))
                    for (var c = 0; c < a.length; c++)
                        d.deleteObject(a[c], b - 1), a[c] = null;
                else if (a&&!a.tagName)
                    try {
                        for (c in a)
                            a[c] && ("object" == typeof a[c] && d.deleteObject(a[c], b - 1), "function" != typeof a[c] && (a[c] = null))
            } catch (e) {}
        }
    };
    d.bounce = function(a, b, c, e, d) {
        return (b/=d) < 1 / 2.75 ? 7.5625 * e * b * b + c : b < 2 / 2.75 ? e * (7.5625 * (b -= 1.5 / 2.75) * b + .75) + c : b < 2.5 / 2.75 ? e * (7.5625 * (b -= 2.25 / 2.75) * b + .9375) + c : e * (7.5625 * (b -= 2.625 / 2.75) * b + .984375) + c
    };
    d.easeInOutQuad = function(a, b, c, e, d) {
        b/=d / 2;
        if (1 > b)
            return e / 2 * b * b + c;
        b--;
        return - e / 2 * (b * (b - 2) - 1) + c
    };
    d.easeInSine = function(a, b, c, e, d) {
        return - e * Math.cos(b / d * (Math.PI / 2)) + e + c
    };
    d.easeOutSine = function(a, b, c, e, d) {
        return e * Math.sin(b / d * (Math.PI / 2)) + c
    };
    d.easeOutElastic = function(a, b, c, e, d) {
        a = 1.70158;
        var f = 0, h = e;
        if (0 ===
        b)
            return c;
        if (1 == (b/=d))
            return c + e;
        f || (f = .3 * d);
        h < Math.abs(e) ? (h = e, a = f / 4) : a = f / (2 * Math.PI) * Math.asin(e / h);
        return h * Math.pow(2, - 10 * b) * Math.sin(2 * (b * d - a) * Math.PI / f) + e + c
    };
    d.fixStepE = function(a) {
        a = a.toExponential(0).split("e");
        var b = Number(a[1]);
        9 == Number(a[0]) && b++;
        return d.generateNumber(1, b)
    };
    d.generateNumber = function(a, b) {
        var c = "", e;
        e = 0 > b ? Math.abs(b) - 1 : Math.abs(b);
        var d;
        for (d = 0; d < e; d++)
            c += "0";
        return 0 > b ? Number("0." + c + String(a)) : Number(String(a) + c)
    };
    d.setCN = function(a, b, c, e) {
        if (a.addClassNames && b && (b =
        b.node) && c) {
            var d = b.getAttribute("class");
            a = a.classNamePrefix + "-";
            e && (a = "");
            d ? b.setAttribute("class", d + " " + a + c) : b.setAttribute("class", a + c)
        }
    };
    d.parseDefs = function(a, b) {
        for (var c in a) {
            var e = typeof a[c];
            if (0 < a[c].length && "object" == e)
                for (var g = 0; g < a[c].length; g++)
                    e = document.createElementNS(d.SVG_NS, c), b.appendChild(e), d.parseDefs(a[c][g], e);
            else 
                "object" == e ? (e = document.createElementNS(d.SVG_NS, c), b.appendChild(e), d.parseDefs(a[c], e)) : b.setAttribute(c, a[c])
        }
    }
})();
(function() {
    var d = window.AmCharts;
    d.AmDraw = d.Class({
        construct: function(a, b, c, e) {
            d.SVG_NS = "http://www.w3.org/2000/svg";
            d.SVG_XLINK = "http://www.w3.org/1999/xlink";
            d.hasSVG=!!document.createElementNS&&!!document.createElementNS(d.SVG_NS, "svg").createSVGRect;
            1 > b && (b = 10);
            1 > c && (c = 10);
            this.div = a;
            this.width = b;
            this.height = c;
            this.rBin = document.createElement("div");
            d.hasSVG ? (d.SVG=!0, b = this.createSvgElement("svg"), a.appendChild(b), this.container = b, this.addDefs(e), this.R = new d.SVGRenderer(this)) : d.isIE && d.VMLRenderer &&
            (d.VML=!0, d.vmlStyleSheet || (document.namespaces.add("amvml", "urn:schemas-microsoft-com:vml"), 31 > document.styleSheets.length ? (b = document.createStyleSheet(), b.addRule(".amvml", "behavior:url(#default#VML); display:inline-block; antialias:true"), d.vmlStyleSheet = b) : document.styleSheets[0].addRule(".amvml", "behavior:url(#default#VML); display:inline-block; antialias:true")), this.container = a, this.R = new d.VMLRenderer(this, e), this.R.disableSelection(a))
        },
        createSvgElement: function(a) {
            return document.createElementNS(d.SVG_NS,
            a)
        },
        circle: function(a, b, c, e) {
            var g = new d.AmDObject("circle", this);
            g.attr({
                r: c,
                cx: a,
                cy: b
            });
            this.addToContainer(g.node, e);
            return g
        },
        ellipse: function(a, b, c, e, g) {
            var f = new d.AmDObject("ellipse", this);
            f.attr({
                rx: c,
                ry: e,
                cx: a,
                cy: b
            });
            this.addToContainer(f.node, g);
            return f
        },
        setSize: function(a, b) {
            0 < a && 0 < b && (this.container.style.width = a + "px", this.container.style.height = b + "px")
        },
        rect: function(a, b, c, e, g, f, h) {
            var k = new d.AmDObject("rect", this);
            d.VML && (g = Math.round(100 * g / Math.min(c, e)), c += 2 * f, e += 2 * f, k.bw = f, k.node.style.marginLeft =
            - f, k.node.style.marginTop =- f);
            1 > c && (c = 1);
            1 > e && (e = 1);
            k.attr({
                x: a,
                y: b,
                width: c,
                height: e,
                rx: g,
                ry: g,
                "stroke-width": f
            });
            this.addToContainer(k.node, h);
            return k
        },
        image: function(a, b, c, e, g, f) {
            var h = new d.AmDObject("image", this);
            h.attr({
                x: b,
                y: c,
                width: e,
                height: g
            });
            this.R.path(h, a);
            this.addToContainer(h.node, f);
            return h
        },
        addToContainer: function(a, b) {
            b || (b = this.container);
            b.appendChild(a)
        },
        text: function(a, b, c) {
            return this.R.text(a, b, c)
        },
        path: function(a, b, c, e) {
            var g = new d.AmDObject("path", this);
            e || (e = "100,100");
            g.attr({
                cs: e
            });
            c ? g.attr({
                dd: a
            }) : g.attr({
                d: a
            });
            this.addToContainer(g.node, b);
            return g
        },
        set: function(a) {
            return this.R.set(a)
        },
        remove: function(a) {
            if (a) {
                var b = this.rBin;
                b.appendChild(a);
                b.innerHTML = ""
            }
        },
        renderFix: function() {
            var a = this.container, b = a.style;
            b.top = "0px";
            b.left = "0px";
            try {
                var c = a.getBoundingClientRect(), e = c.left - Math.round(c.left), d = c.top - Math.round(c.top);
                e && (b.left = e + "px");
                d && (b.top = d + "px")
            } catch (f) {}
        },
        update: function() {
            this.R.update()
        },
        addDefs: function(a) {
            if (d.hasSVG) {
                var b = this.createSvgElement("desc"),
                c = this.container;
                c.setAttribute("version", "1.1");
                c.style.position = "absolute";
                this.setSize(this.width, this.height);
                d.rtl && (c.setAttribute("direction", "rtl"), c.style.left = "auto", c.style.right = "0px");
                a && (a.addCodeCredits && b.appendChild(document.createTextNode("JavaScript chart by amCharts " + a.version)), c.appendChild(b), a.defs && (b = this.createSvgElement("defs"), c.appendChild(b), d.parseDefs(a.defs, b), this.defs = b))
            }
        }
    })
})();
(function() {
    var d = window.AmCharts;
    d.AmDObject = d.Class({
        construct: function(a, b) {
            this.D = b;
            this.R = b.R;
            this.node = this.R.create(this, a);
            this.y = this.x = 0;
            this.scale = 1
        },
        attr: function(a) {
            this.R.attr(this, a);
            return this
        },
        getAttr: function(a) {
            return this.node.getAttribute(a)
        },
        setAttr: function(a, b) {
            this.R.setAttr(this, a, b);
            return this
        },
        clipRect: function(a, b, c, e) {
            this.R.clipRect(this, a, b, c, e)
        },
        translate: function(a, b, c, e) {
            e || (a = Math.round(a), b = Math.round(b));
            this.R.move(this, a, b, c);
            this.x = a;
            this.y = b;
            this.scale =
            c;
            this.angle && this.rotate(this.angle)
        },
        rotate: function(a, b) {
            this.R.rotate(this, a, b);
            this.angle = a
        },
        animate: function(a, b, c) {
            for (var e in a)
                if (a.hasOwnProperty(e)) {
                    var g = e, f = a[e];
                    c = d.getEffect(c);
                    this.R.animate(this, g, f, b, c)
                }
        },
        push: function(a) {
            if (a) {
                var b = this.node;
                b.appendChild(a.node);
                var c = a.clipPath;
                c && b.appendChild(c);
                (a = a.grad) && b.appendChild(a)
            }
        },
        text: function(a) {
            this.R.setText(this, a)
        },
        remove: function() {
            this.stop();
            this.R.remove(this)
        },
        clear: function() {
            var a = this.node;
            if (a.hasChildNodes())
                for (; 1 <=
                a.childNodes.length;)
                    a.removeChild(a.firstChild)
        },
        hide: function() {
            this.setAttr("visibility", "hidden")
        },
        show: function() {
            this.setAttr("visibility", "visible")
        },
        getBBox: function() {
            return this.R.getBBox(this)
        },
        toFront: function() {
            var a = this.node;
            if (a) {
                this.prevNextNode = a.nextSibling;
                var b = a.parentNode;
                b && b.appendChild(a)
            }
        },
        toPrevious: function() {
            var a = this.node;
            a && this.prevNextNode && (a = a.parentNode) && a.insertBefore(this.prevNextNode, null)
        },
        toBack: function() {
            var a = this.node;
            if (a) {
                this.prevNextNode = a.nextSibling;
                var b = a.parentNode;
                if (b) {
                    var c = b.firstChild;
                    c && b.insertBefore(a, c)
                }
            }
        },
        mouseover: function(a) {
            this.R.addListener(this, "mouseover", a);
            return this
        },
        mouseout: function(a) {
            this.R.addListener(this, "mouseout", a);
            return this
        },
        click: function(a) {
            this.R.addListener(this, "click", a);
            return this
        },
        dblclick: function(a) {
            this.R.addListener(this, "dblclick", a);
            return this
        },
        mousedown: function(a) {
            this.R.addListener(this, "mousedown", a);
            return this
        },
        mouseup: function(a) {
            this.R.addListener(this, "mouseup", a);
            return this
        },
        touchmove: function(a) {
            this.R.addListener(this,
            "touchmove", a);
            return this
        },
        touchstart: function(a) {
            this.R.addListener(this, "touchstart", a);
            return this
        },
        touchend: function(a) {
            this.R.addListener(this, "touchend", a);
            return this
        },
        contextmenu: function(a) {
            this.node.addEventListener ? this.node.addEventListener("contextmenu", a, !0) : this.R.addListener(this, "contextmenu", a);
            return this
        },
        stop: function() {
            d.removeFromArray(this.R.animations, this.an_translate);
            d.removeFromArray(this.R.animations, this.an_y);
            d.removeFromArray(this.R.animations, this.an_x)
        },
        length: function() {
            return this.node.childNodes.length
        },
        gradient: function(a, b, c) {
            this.R.gradient(this, a, b, c)
        },
        pattern: function(a, b, c) {
            a && this.R.pattern(this, a, b, c)
        }
    })
})();
(function() {
    var d = window.AmCharts;
    d.SVGRenderer = d.Class({
        construct: function(a) {
            this.D = a;
            this.animations = []
        },
        create: function(a, b) {
            return document.createElementNS(d.SVG_NS, b)
        },
        attr: function(a, b) {
            for (var c in b)
                b.hasOwnProperty(c) && this.setAttr(a, c, b[c])
        },
        setAttr: function(a, b, c) {
            void 0 !== c && a.node.setAttribute(b, c)
        },
        animate: function(a, b, c, e, g) {
            a.animationFinished=!1;
            var f = a.node;
            a["an_" + b] && d.removeFromArray(this.animations, a["an_" + b]);
            "translate" == b ? (f = (f = f.getAttribute("transform")) ? String(f).substring(10,
            f.length - 1) : "0,0", f = f.split(", ").join(" "), f = f.split(" ").join(","), 0 === f && (f = "0,0")) : f = Number(f.getAttribute(b));
            c = {
                obj: a,
                frame: 0,
                attribute: b,
                from: f,
                to: c,
                time: e,
                effect: g
            };
            this.animations.push(c);
            a["an_" + b] = c
        },
        update: function() {
            var a, b = this.animations;
            for (a = b.length - 1; 0 <= a; a--) {
                var c = b[a], e = c.time * d.updateRate, g = c.frame + 1, f = c.obj, h = c.attribute, k, l, m;
                g <= e ? (c.frame++, "translate" == h ? (k = c.from.split(","), h = Number(k[0]), k = Number(k[1]), isNaN(k) && (k = 0), l = c.to.split(","), m = Number(l[0]), l = Number(l[1]), m =
                0 === m - h ? m : Math.round(d[c.effect](0, g, h, m - h, e)), c = 0 === l - k ? l : Math.round(d[c.effect](0, g, k, l - k, e)), h = "transform", c = "translate(" + m + "," + c + ")") : (l = Number(c.from), k = Number(c.to), m = k - l, c = d[c.effect](0, g, l, m, e), isNaN(c) && (c = k), 0 === m && this.animations.splice(a, 1)), this.setAttr(f, h, c)) : ("translate" == h ? (l = c.to.split(","), m = Number(l[0]), l = Number(l[1]), f.translate(m, l)) : (k = Number(c.to), this.setAttr(f, h, k)), f.animationFinished=!0, this.animations.splice(a, 1))
            }
        },
        getBBox: function(a) {
            if (a = a.node)
                try {
                    return a.getBBox()
            } catch (b) {}
            return {
                width: 0,
                height: 0,
                x: 0,
                y: 0
            }
        },
        path: function(a, b) {
            a.node.setAttributeNS(d.SVG_XLINK, "xlink:href", b)
        },
        clipRect: function(a, b, c, e, g) {
            var f = a.node, h = a.clipPath;
            h && this.D.remove(h);
            var k = f.parentNode;
            k && (f = document.createElementNS(d.SVG_NS, "clipPath"), h = d.getUniqueId(), f.setAttribute("id", h), this.D.rect(b, c, e, g, 0, 0, f), k.appendChild(f), b = "#", d.baseHref&&!d.isIE && (b = this.removeTarget(window.location.href) + b), this.setAttr(a, "clip-path", "url(" + b + h + ")"), this.clipPathC++, a.clipPath = f)
        },
        text: function(a, b, c) {
            var e = new d.AmDObject("text",
            this.D);
            a = String(a).split("\n");
            var g = d.removePx(b["font-size"]), f;
            for (f = 0; f < a.length; f++) {
                var h = this.create(null, "tspan");
                h.appendChild(document.createTextNode(a[f]));
                h.setAttribute("y", (g + 2) * f + Math.round(g / 2));
                h.setAttribute("x", 0);
                e.node.appendChild(h)
            }
            e.node.setAttribute("y", Math.round(g / 2));
            this.attr(e, b);
            this.D.addToContainer(e.node, c);
            return e
        },
        setText: function(a, b) {
            var c = a.node;
            c && (c.removeChild(c.firstChild), c.appendChild(document.createTextNode(b)))
        },
        move: function(a, b, c, e) {
            isNaN(b) && (b =
            0);
            isNaN(c) && (c = 0);
            b = "translate(" + b + "," + c + ")";
            e && (b = b + " scale(" + e + ")");
            this.setAttr(a, "transform", b)
        },
        rotate: function(a, b) {
            var c = a.node.getAttribute("transform"), e = "rotate(" + b + ")";
            c && (e = c + " " + e);
            this.setAttr(a, "transform", e)
        },
        set: function(a) {
            var b = new d.AmDObject("g", this.D);
            this.D.container.appendChild(b.node);
            if (a) {
                var c;
                for (c = 0; c < a.length; c++)
                    b.push(a[c])
            }
            return b
        },
        addListener: function(a, b, c) {
            a.node["on" + b] = c
        },
        gradient: function(a, b, c, e) {
            var g = a.node, f = a.grad;
            f && this.D.remove(f);
            b = document.createElementNS(d.SVG_NS,
            b);
            f = d.getUniqueId();
            b.setAttribute("id", f);
            if (!isNaN(e)) {
                var h = 0, k = 0, l = 0, m = 0;
                90 == e ? l = 100 : 270 == e ? m = 100 : 180 == e ? h = 100 : 0 === e && (k = 100);
                b.setAttribute("x1", h + "%");
                b.setAttribute("x2", k + "%");
                b.setAttribute("y1", l + "%");
                b.setAttribute("y2", m + "%")
            }
            for (e = 0; e < c.length; e++)
                h = document.createElementNS(d.SVG_NS, "stop"), k = 100 * e / (c.length - 1), 0 === e && (k = 0), h.setAttribute("offset", k + "%"), h.setAttribute("stop-color", c[e]), b.appendChild(h);
            g.parentNode.appendChild(b);
            c = "#";
            d.baseHref&&!d.isIE && (c = this.removeTarget(window.location.href) +
            c);
            g.setAttribute("fill", "url(" + c + f + ")");
            a.grad = b
        },
        removeTarget: function(a) {
            return a.split("#")[0]
        },
        pattern: function(a, b, c, e) {
            var g = a.node;
            isNaN(c) && (c = 1);
            var f = a.patternNode;
            f && this.D.remove(f);
            var f = document.createElementNS(d.SVG_NS, "pattern"), h = d.getUniqueId(), k = b;
            b.url && (k = b.url);
            d.isAbsolute(k)||-1 != k.indexOf("data:image") || (k = e + k);
            e = Number(b.width);
            isNaN(e) && (e = 4);
            var l = Number(b.height);
            isNaN(l) && (l = 4);
            e/=c;
            l/=c;
            c = b.x;
            isNaN(c) && (c = 0);
            var m =- Math.random() * Number(b.randomX);
            isNaN(m) || (c = m);
            m =
            b.y;
            isNaN(m) && (m = 0);
            var n =- Math.random() * Number(b.randomY);
            isNaN(n) || (m = n);
            f.setAttribute("id", h);
            f.setAttribute("width", e);
            f.setAttribute("height", l);
            f.setAttribute("patternUnits", "userSpaceOnUse");
            f.setAttribute("xlink:href", k);
            b.color && (n = document.createElementNS(d.SVG_NS, "rect"), n.setAttributeNS(null, "height", e), n.setAttributeNS(null, "width", l), n.setAttributeNS(null, "fill", b.color), f.appendChild(n));
            this.D.image(k, 0, 0, e, l, f).translate(c, m);
            k = "#";
            d.baseHref&&!d.isIE && (k = this.removeTarget(window.location.href) +
            k);
            g.setAttribute("fill", "url(" + k + h + ")");
            a.patternNode = f;
            g.parentNode.appendChild(f)
        },
        remove: function(a) {
            a.clipPath && this.D.remove(a.clipPath);
            a.grad && this.D.remove(a.grad);
            a.patternNode && this.D.remove(a.patternNode);
            this.D.remove(a.node)
        }
    })
})();
(function() {
    var d = window.AmCharts;
    d.AmChart = d.Class({
        construct: function(a) {
            this.svgIcons = this.tapToActivate=!0;
            this.theme = a;
            this.classNamePrefix = "amcharts";
            this.addClassNames=!1;
            this.version = "3.19.6";
            d.addChart(this);
            this.createEvents("buildStarted", "dataUpdated", "init", "rendered", "drawn", "failed", "resized", "animationFinished");
            this.height = this.width = "100%";
            this.dataChanged=!0;
            this.chartCreated=!1;
            this.previousWidth = this.previousHeight = 0;
            this.backgroundColor = "#FFFFFF";
            this.borderAlpha = this.backgroundAlpha =
            0;
            this.color = this.borderColor = "#000000";
            this.fontFamily = "Verdana";
            this.fontSize = 11;
            this.usePrefixes=!1;
            this.autoResize=!0;
            this.autoDisplay=!1;
            this.addCodeCredits=!0;
            this.touchStartTime = this.touchClickDuration = 0;
            this.precision =- 1;
            this.percentPrecision = 2;
            this.decimalSeparator = ".";
            this.thousandsSeparator = ",";
            this.labels = [];
            this.allLabels = [];
            this.titles = [];
            this.marginRight = this.marginLeft = this.autoMarginOffset = 0;
            this.timeOuts = [];
            this.creditsPosition = "top-left";
            var b = document.createElement("div"), c = b.style;
            c.overflow = "hidden";
            c.position = "relative";
            c.textAlign = "left";
            this.chartDiv = b;
            b = document.createElement("div");
            c = b.style;
            c.overflow = "hidden";
            c.position = "relative";
            c.textAlign = "left";
            this.legendDiv = b;
            this.titleHeight = 0;
            this.hideBalloonTime = 150;
            this.handDrawScatter = 2;
            this.handDrawThickness = 1;
            this.prefixesOfBigNumbers = [{
                number: 1E3,
                prefix: "k"
            }, {
                number: 1E6,
                prefix: "M"
            }, {
                number: 1E9,
                prefix: "G"
            }, {
                number: 1E12,
                prefix: "T"
            }, {
                number: 1E15,
                prefix: "P"
            }, {
                number: 1E18,
                prefix: "E"
            }, {
                number: 1E21,
                prefix: "Z"
            }, {
                number: 1E24,
                prefix: "Y"
            }
            ];
            this.prefixesOfSmallNumbers = [{
                number: 1E-24,
                prefix: "y"
            }, {
                number: 1E-21,
                prefix: "z"
            }, {
                number: 1E-18,
                prefix: "a"
            }, {
                number: 1E-15,
                prefix: "f"
            }, {
                number: 1E-12,
                prefix: "p"
            }, {
                number: 1E-9,
                prefix: "n"
            }, {
                number: 1E-6,
                prefix: "\u03bc"
            }, {
                number: .001,
                prefix: "m"
            }
            ];
            this.panEventsEnabled=!0;
            this.product = "amcharts";
            this.animations = [];
            this.balloon = new d.AmBalloon(this.theme);
            this.balloon.chart = this;
            this.processTimeout = 0;
            this.processCount = 1E3;
            this.animatable = [];
            d.applyTheme(this, a, "AmChart")
        },
        drawChart: function() {
            0 <
            this.realWidth && 0 < this.realHeight && (this.drawBackground(), this.redrawLabels(), this.drawTitles(), this.brr(), this.renderFix(), this.chartDiv && (this.boundingRect = this.chartDiv.getBoundingClientRect()))
        },
        drawBackground: function() {
            d.remove(this.background);
            var a = this.container, b = this.backgroundColor, c = this.backgroundAlpha, e = this.set;
            d.isModern || 0 !== c || (c = .001);
            var g = this.updateWidth();
            this.realWidth = g;
            var f = this.updateHeight();
            this.realHeight = f;
            b = d.polygon(a, [0, g - 1, g - 1, 0], [0, 0, f - 1, f - 1], b, c, 1, this.borderColor,
            this.borderAlpha);
            d.setCN(this, b, "bg");
            this.background = b;
            e.push(b);
            if (b = this.backgroundImage)
                a = a.image(b, 0, 0, g, f), d.setCN(this, b, "bg-image"), this.bgImg = a, e.push(a)
        },
        drawTitles: function(a) {
            var b = this.titles;
            this.titleHeight = 0;
            if (d.ifArray(b)) {
                var c = 20, e;
                for (e = 0; e < b.length; e++) {
                    var g = b[e], g = d.processObject(g, d.Title, this.theme);
                    if (!1 !== g.enabled) {
                        var f = g.color;
                        void 0 === f && (f = this.color);
                        var h = g.size;
                        isNaN(h) && (h = this.fontSize + 2);
                        isNaN(g.alpha);
                        var k = this.marginLeft, l=!0;
                        void 0 !== g.bold && (l = g.bold);
                        f = d.wrappedText(this.container, g.text, f, this.fontFamily, h, "middle", l, this.realWidth - 35);
                        f.translate(k + (this.realWidth - this.marginRight - k) / 2, c);
                        f.node.style.pointerEvents = "none";
                        g.sprite = f;
                        d.setCN(this, f, "title");
                        g.id && d.setCN(this, f, "title-" + g.id);
                        f.attr({
                            opacity: g.alpha
                        });
                        c += f.getBBox().height + 5;
                        a ? f.remove() : this.freeLabelsSet.push(f)
                    }
                }
                this.titleHeight = c - 10
            }
        },
        write: function(a) {
            var b = this;
            if (b.listeners)
                for (var c = 0; c < b.listeners.length; c++) {
                    var e = b.listeners[c];
                    b.addListener(e.event, e.method)
                }
            b.fire({
                type: "buildStarted",
                chart: b
            });
            b.afterWriteTO && clearTimeout(b.afterWriteTO);
            0 < b.processTimeout ? b.afterWriteTO = setTimeout(function() {
                b.afterWrite.call(b, a)
            }, b.processTimeout) : b.afterWrite(a)
        },
        afterWrite: function(a) {
            if (a = "object" != typeof a ? document.getElementById(a) : a) {
                for (; a.firstChild;)
                    a.removeChild(a.firstChild);
                this.div = a;
                a.style.overflow = "hidden";
                a.style.textAlign = "left";
                var b = this.chartDiv, c = this.legendDiv, e = this.legend, g = c.style, f = b.style;
                this.measure();
                this.previousHeight = this.divRealHeight;
                this.previousWidth = this.divRealWidth;
                var h, k = document.createElement("div");
                h = k.style;
                h.position = "relative";
                this.containerDiv = k;
                k.className = this.classNamePrefix + "-main-div";
                b.className = this.classNamePrefix + "-chart-div";
                a.appendChild(k);
                var l = this.exportConfig;
                l && d.AmExport&&!this.AmExport && (this.AmExport = new d.AmExport(this, l));
                this.amExport && d.AmExport && (this.AmExport = d.extend(this.amExport, new d.AmExport(this), !0));
                this.AmExport && this.AmExport.init && this.AmExport.init();
                if (e) {
                    e = this.addLegend(e, e.divId);
                    if (e.enabled)
                        switch (g.left = null,
                        g.top = null, g.right = null, f.left = null, f.right = null, f.top = null, g.position = "relative", f.position = "relative", e.position) {
                        case "bottom":
                            k.appendChild(b);
                            k.appendChild(c);
                            break;
                        case "top":
                            k.appendChild(c);
                            k.appendChild(b);
                            break;
                        case "absolute":
                            h.width = a.style.width;
                            h.height = a.style.height;
                            g.position = "absolute";
                            f.position = "absolute";
                            void 0 !== e.left && (g.left = e.left + "px");
                            void 0 !== e.right && (g.right = e.right + "px");
                            void 0 !== e.top && (g.top = e.top + "px");
                            void 0 !== e.bottom && (g.bottom = e.bottom + "px");
                            e.marginLeft = 0;
                            e.marginRight =
                            0;
                            k.appendChild(b);
                            k.appendChild(c);
                            break;
                        case "right":
                            h.width = a.style.width;
                            h.height = a.style.height;
                            g.position = "relative";
                            f.position = "absolute";
                            k.appendChild(b);
                            k.appendChild(c);
                            break;
                        case "left":
                            h.width = a.style.width;
                            h.height = a.style.height;
                            g.position = "absolute";
                            f.position = "relative";
                            k.appendChild(b);
                            k.appendChild(c);
                            break;
                        case "outside":
                            k.appendChild(b)
                        } else 
                            k.appendChild(b);
                    this.prevLegendPosition = e.position
                } else 
                    k.appendChild(b);
                this.listenersAdded || (this.addListeners(), this.listenersAdded=!0);
                this.initChart()
            }
        },
        createLabelsSet: function() {
            d.remove(this.labelsSet);
            this.labelsSet = this.container.set();
            this.freeLabelsSet.push(this.labelsSet)
        },
        initChart: function() {
            this.balloon = d.processObject(this.balloon, d.AmBalloon, this.theme);
            window.AmCharts_path && (this.path = window.AmCharts_path);
            void 0 === this.path && (this.path = d.getPath());
            void 0 === this.path && (this.path = "amcharts/");
            this.path = d.normalizeUrl(this.path);
            void 0 === this.pathToImages && (this.pathToImages = this.path + "images/");
            this.initHC || (d.callInitHandler(this),
            this.initHC=!0);
            d.applyLang(this.language, this);
            var a = this.numberFormatter;
            a && (isNaN(a.precision) || (this.precision = a.precision), void 0 !== a.thousandsSeparator && (this.thousandsSeparator = a.thousandsSeparator), void 0 !== a.decimalSeparator && (this.decimalSeparator = a.decimalSeparator));
            (a = this.percentFormatter)&&!isNaN(a.precision) && (this.percentPrecision = a.precision);
            this.nf = {
                precision: this.precision,
                thousandsSeparator: this.thousandsSeparator,
                decimalSeparator: this.decimalSeparator
            };
            this.pf = {
                precision: this.percentPrecision,
                thousandsSeparator: this.thousandsSeparator,
                decimalSeparator: this.decimalSeparator
            };
            this.destroy();
            (a = this.container) ? (a.container.innerHTML = "", a.width = this.realWidth, a.height = this.realHeight, a.addDefs(this), this.chartDiv.appendChild(a.container)) : a = new d.AmDraw(this.chartDiv, this.realWidth, this.realHeight, this);
            this.container = a;
            this.extension = ".png";
            this.svgIcons && d.SVG && (this.extension = ".svg");
            this.checkDisplay();
            a.chart = this;
            d.VML || d.SVG ? (a.handDrawn = this.handDrawn, a.handDrawScatter = this.handDrawScatter,
            a.handDrawThickness = this.handDrawThickness, d.remove(this.set), this.set = a.set(), d.remove(this.gridSet), this.gridSet = a.set(), d.remove(this.cursorLineSet), this.cursorLineSet = a.set(), d.remove(this.graphsBehindSet), this.graphsBehindSet = a.set(), d.remove(this.bulletBehindSet), this.bulletBehindSet = a.set(), d.remove(this.columnSet), this.columnSet = a.set(), d.remove(this.graphsSet), this.graphsSet = a.set(), d.remove(this.trendLinesSet), this.trendLinesSet = a.set(), d.remove(this.axesSet), this.axesSet = a.set(), d.remove(this.cursorSet),
            this.cursorSet = a.set(), d.remove(this.scrollbarsSet), this.scrollbarsSet = a.set(), d.remove(this.bulletSet), this.bulletSet = a.set(), d.remove(this.freeLabelsSet), this.freeLabelsSet = a.set(), d.remove(this.axesLabelsSet), this.axesLabelsSet = a.set(), d.remove(this.balloonsSet), this.balloonsSet = a.set(), d.remove(this.plotBalloonsSet), this.plotBalloonsSet = a.set(), d.remove(this.zoomButtonSet), this.zoomButtonSet = a.set(), d.remove(this.zbSet), this.zbSet = null, d.remove(this.linkSet), this.linkSet = a.set()) : this.fire({
                type: "failed",
                chart: this
            })
        },
        premeasure: function() {
            var a = this.div;
            if (a) {
                try {
                    this.boundingRect = this.chartDiv.getBoundingClientRect()
                } catch (e) {}
                var b = a.offsetWidth, c = a.offsetHeight;
                a.clientHeight && (b = a.clientWidth, c = a.clientHeight);
                if (b != this.mw || c != this.mh)
                    this.mw = b, this.mh = c, this.measure()
            }
        },
        measure: function() {
            var a = this.div;
            if (a) {
                var b = this.chartDiv, c = a.offsetWidth, e = a.offsetHeight, g = this.container;
                a.clientHeight && (c = a.clientWidth, e = a.clientHeight);
                var f = d.removePx(d.getStyle(a, "padding-left")), h = d.removePx(d.getStyle(a,
                "padding-right")), k = d.removePx(d.getStyle(a, "padding-top")), l = d.removePx(d.getStyle(a, "padding-bottom"));
                isNaN(f) || (c -= f);
                isNaN(h) || (c -= h);
                isNaN(k) || (e -= k);
                isNaN(l) || (e -= l);
                f = a.style;
                a = f.width;
                f = f.height;
                - 1 != a.indexOf("px") && (c = d.removePx(a));
                - 1 != f.indexOf("px") && (e = d.removePx(f));
                e = Math.round(e);
                c = Math.round(c);
                a = Math.round(d.toCoordinate(this.width, c));
                f = Math.round(d.toCoordinate(this.height, e));
                (c != this.previousWidth || e != this.previousHeight) && 0 < a && 0 < f && (b.style.width = a + "px", b.style.height = f + "px",
                b.style.padding = 0, g && g.setSize(a, f), this.balloon = d.processObject(this.balloon, d.AmBalloon, this.theme));
                this.balloon.setBounds && this.balloon.setBounds(2, 2, a - 2, f);
                this.balloon.chart = this;
                this.realWidth = a;
                this.realHeight = f;
                this.divRealWidth = c;
                this.divRealHeight = e
            }
        },
        checkDisplay: function() {
            if (this.autoDisplay && this.container) {
                var a = d.rect(this.container, 10, 10), b = a.getBBox();
                0 === b.width && 0 === b.height && (this.divRealHeight = this.divRealWidth = this.realHeight = this.realWidth = 0, this.previousWidth = this.previousHeight =
                NaN);
                a.remove()
            }
        },
        destroy: function() {
            this.chartDiv.innerHTML = "";
            this.clearTimeOuts();
            this.legend && this.legend.destroy()
        },
        clearTimeOuts: function() {
            var a = this.timeOuts;
            if (a) {
                var b;
                for (b = 0; b < a.length; b++)
                    clearTimeout(a[b])
            }
            this.timeOuts = []
        },
        clear: function(a) {
            d.callMethod("clear", [this.chartScrollbar, this.scrollbarV, this.scrollbarH, this.chartCursor]);
            this.chartCursor = this.scrollbarH = this.scrollbarV = this.chartScrollbar = null;
            this.clearTimeOuts();
            this.container && (this.container.remove(this.chartDiv), this.container.remove(this.legendDiv));
            a || d.removeChart(this);
            if (a = this.div)
                for (; a.firstChild;)
                    a.removeChild(a.firstChild);
            this.legend && this.legend.destroy()
        },
        setMouseCursor: function(a) {
            "auto" == a && d.isNN && (a = "default");
            this.chartDiv.style.cursor = a;
            this.legendDiv.style.cursor = a
        },
        redrawLabels: function() {
            this.labels = [];
            var a = this.allLabels;
            this.createLabelsSet();
            var b;
            for (b = 0; b < a.length; b++)
                this.drawLabel(a[b])
        },
        drawLabel: function(a) {
            var b = this;
            if (b.container&&!1 !== a.enabled) {
                a = d.processObject(a, d.Label, b.theme);
                var c = a.y, e = a.text, g = a.align,
                f = a.size, h = a.color, k = a.rotation, l = a.alpha, m = a.bold, n = d.toCoordinate(a.x, b.realWidth), c = d.toCoordinate(c, b.realHeight);
                n || (n = 0);
                c || (c = 0);
                void 0 === h && (h = b.color);
                isNaN(f) && (f = b.fontSize);
                g || (g = "start");
                "left" == g && (g = "start");
                "right" == g && (g = "end");
                "center" == g && (g = "middle", k ? c = b.realHeight - c + c / 2 : n = b.realWidth / 2 - n);
                void 0 === l && (l = 1);
                void 0 === k && (k = 0);
                c += f / 2;
                e = d.text(b.container, e, h, b.fontFamily, f, g, m, l);
                e.translate(n, c);
                d.setCN(b, e, "label");
                a.id && d.setCN(b, e, "label-" + a.id);
                0 !== k && e.rotate(k);
                a.url ? (e.setAttr("cursor",
                "pointer"), e.click(function() {
                    d.getURL(a.url, b.urlTarget)
                })) : e.node.style.pointerEvents = "none";
                b.labelsSet.push(e);
                b.labels.push(e)
            }
        },
        addLabel: function(a, b, c, e, d, f, h, k, l, m) {
            a = {
                x: a,
                y: b,
                text: c,
                align: e,
                size: d,
                color: f,
                alpha: k,
                rotation: h,
                bold: l,
                url: m,
                enabled: !0
            };
            this.container && this.drawLabel(a);
            this.allLabels.push(a)
        },
        clearLabels: function() {
            var a = this.labels, b;
            for (b = a.length - 1; 0 <= b; b--)
                a[b].remove();
            this.labels = [];
            this.allLabels = []
        },
        updateHeight: function() {
            var a = this.divRealHeight, b = this.legend;
            if (b) {
                var c =
                this.legendDiv.offsetHeight, b = b.position;
                if ("top" == b || "bottom" == b) {
                    a -= c;
                    if (0 > a || isNaN(a))
                        a = 0;
                    this.chartDiv.style.height = a + "px"
                }
            }
            return a
        },
        updateWidth: function() {
            var a = this.divRealWidth, b = this.divRealHeight, c = this.legend;
            if (c) {
                var e = this.legendDiv, d = e.offsetWidth;
                isNaN(c.width) || (d = c.width);
                c.ieW && (d = c.ieW);
                var f = e.offsetHeight, e = e.style, h = this.chartDiv.style, c = c.position;
                if ("right" == c || "left" == c) {
                    a -= d;
                    if (0 > a || isNaN(a))
                        a = 0;
                    h.width = a + "px";
                    this.balloon.setBounds(2, 2, a - 2, this.realHeight);
                    "left" == c ? (h.left =
                    d + "px", e.left = "0px") : (h.left = "0px", e.left = a + "px");
                    b > f && (e.top = (b - f) / 2 + "px")
                }
            }
            return a
        },
        getTitleHeight: function() {
            this.drawTitles(!0);
            return this.titleHeight
        },
        addTitle: function(a, b, c, e, d) {
            isNaN(b) && (b = this.fontSize + 2);
            a = {
                text: a,
                size: b,
                color: c,
                alpha: e,
                bold: d,
                enabled: !0
            };
            this.titles.push(a);
            return a
        },
        handleWheel: function(a) {
            var b = 0;
            a || (a = window.event);
            a.wheelDelta ? b = a.wheelDelta / 120 : a.detail && (b =- a.detail / 3);
            b && this.handleWheelReal(b, a.shiftKey);
            a.preventDefault && a.preventDefault()
        },
        handleWheelReal: function() {},
        handleDocTouchStart: function() {
            this.hideBalloonReal();
            this.handleMouseMove();
            this.tmx = this.mouseX;
            this.tmy = this.mouseY;
            this.touchStartTime = (new Date).getTime()
        },
        handleDocTouchEnd: function() {
            - .5 < this.tmx && this.tmx < this.divRealWidth + 1 && 0 < this.tmy && this.tmy < this.divRealHeight ? (this.handleMouseMove(), 4 > Math.abs(this.mouseX - this.tmx) && 4 > Math.abs(this.mouseY - this.tmy) ? (this.tapped=!0, this.panRequired && this.panEventsEnabled && this.chartDiv && (this.chartDiv.style.msTouchAction = "none", this.chartDiv.style.touchAction =
            "none")) : this.mouseIsOver || this.resetTouchStyle()) : (this.tapped=!1, this.resetTouchStyle())
        },
        resetTouchStyle: function() {
            this.panEventsEnabled && this.chartDiv && (this.chartDiv.style.msTouchAction = "auto", this.chartDiv.style.touchAction = "auto")
        },
        checkTouchDuration: function() {
            if ((new Date).getTime() - this.touchStartTime > this.touchClickDuration)
                return !0
        },
        checkTouchMoved: function() {
            if (4 < Math.abs(this.mouseX - this.tmx) || 4 < Math.abs(this.mouseY - this.tmy))
                return !0
        },
        addListeners: function() {
            var a = this, b = a.chartDiv;
            document.addEventListener ? ("ontouchstart"in document.documentElement && (b.addEventListener("touchstart", function(b) {
                a.handleTouchStart.call(a, b)
            }, !0), b.addEventListener("touchmove", function(b) {
                a.handleMouseMove.call(a, b)
            }, !0), b.addEventListener("touchend", function(b) {
                a.handleTouchEnd.call(a, b)
            }, !0), document.addEventListener("touchstart", function(b) {
                a.handleDocTouchStart.call(a, b)
            }), document.addEventListener("touchend", function(b) {
                a.handleDocTouchEnd.call(a, b)
            })), b.addEventListener("mousedown", function(b) {
                a.mouseIsOver =
                !0;
                a.handleMouseMove.call(a, b);
                a.handleMouseDown.call(a, b);
                a.handleDocTouchStart.call(a, b)
            }, !0), b.addEventListener("mouseover", function(b) {
                a.handleMouseOver.call(a, b)
            }, !0), b.addEventListener("mouseout", function(b) {
                a.handleMouseOut.call(a, b)
            }, !0), b.addEventListener("mouseup", function(b) {
                a.handleDocTouchEnd.call(a, b)
            }, !0)) : (b.attachEvent("onmousedown", function(b) {
                a.handleMouseDown.call(a, b)
            }), b.attachEvent("onmouseover", function(b) {
                a.handleMouseOver.call(a, b)
            }), b.attachEvent("onmouseout", function(b) {
                a.handleMouseOut.call(a,
                b)
            }))
        },
        dispDUpd: function() {
            this.skipEvents || (this.dispatchDataUpdated && (this.dispatchDataUpdated=!1, this.fire({
                type: "dataUpdated",
                chart: this
            })), this.chartCreated || (this.chartCreated=!0, this.fire({
                type: "init",
                chart: this
            })), this.chartRendered || (this.fire({
                type: "rendered",
                chart: this
            }), this.chartRendered=!0), this.fire({
                type: "drawn",
                chart: this
            }));
            this.skipEvents=!1
        },
        validateSize: function() {
            var a = this;
            a.premeasure();
            a.checkDisplay();
            if (a.divRealWidth != a.previousWidth || a.divRealHeight != a.previousHeight) {
                var b =
                a.legend;
                if (0 < a.realWidth && 0 < a.realHeight) {
                    a.sizeChanged=!0;
                    if (b) {
                        a.legendInitTO && clearTimeout(a.legendInitTO);
                        var c = setTimeout(function() {
                            b.invalidateSize()
                        }, 10);
                        a.timeOuts.push(c);
                        a.legendInitTO = c
                    }
                    a.marginsUpdated=!1;
                    clearTimeout(a.initTO);
                    c = setTimeout(function() {
                        a.initChart()
                    }, 10);
                    a.timeOuts.push(c);
                    a.initTO = c
                }
                a.renderFix();
                b && b.renderFix && b.renderFix();
                clearTimeout(a.resizedTO);
                a.resizedTO = setTimeout(function() {
                    a.fire({
                        type: "resized",
                        chart: a
                    })
                }, 10);
                a.previousHeight = a.divRealHeight;
                a.previousWidth =
                a.divRealWidth
            }
        },
        invalidateSize: function() {
            this.previousHeight = this.previousWidth = NaN;
            this.invalidateSizeReal()
        },
        invalidateSizeReal: function() {
            var a = this;
            a.marginsUpdated=!1;
            clearTimeout(a.validateTO);
            var b = setTimeout(function() {
                a.validateSize()
            }, 5);
            a.timeOuts.push(b);
            a.validateTO = b
        },
        validateData: function(a) {
            this.chartCreated && (this.dataChanged=!0, this.marginsUpdated=!1, this.initChart(a))
        },
        validateNow: function(a, b) {
            this.initTO && clearTimeout(this.initTO);
            a && (this.dataChanged=!0, this.marginsUpdated =
            !1);
            this.skipEvents = b;
            this.chartRendered=!1;
            var c = this.legend;
            c && c.position != this.prevLegendPosition && (this.previousWidth = this.mw = 0, c.invalidateSize && (c.invalidateSize(), this.validateSize()));
            this.write(this.div)
        },
        showItem: function(a) {
            a.hidden=!1;
            this.initChart()
        },
        hideItem: function(a) {
            a.hidden=!0;
            this.initChart()
        },
        hideBalloon: function() {
            var a = this;
            clearTimeout(a.hoverInt);
            clearTimeout(a.balloonTO);
            a.hoverInt = setTimeout(function() {
                a.hideBalloonReal.call(a)
            }, a.hideBalloonTime)
        },
        cleanChart: function() {},
        hideBalloonReal: function() {
            var a = this.balloon;
            a && a.hide && a.hide()
        },
        showBalloon: function(a, b, c, e, d) {
            var f = this;
            clearTimeout(f.balloonTO);
            clearTimeout(f.hoverInt);
            f.balloonTO = setTimeout(function() {
                f.showBalloonReal.call(f, a, b, c, e, d)
            }, 1)
        },
        showBalloonReal: function(a, b, c, e, d) {
            this.handleMouseMove();
            var f = this.balloon;
            f.enabled && (f.followCursor(!1), f.changeColor(b), !c || f.fixedPosition ? (f.setPosition(e, d), isNaN(e) || isNaN(d) ? f.followCursor(!0) : f.followCursor(!1)) : f.followCursor(!0), a && f.showBalloon(a))
        },
        handleMouseOver: function() {
            this.outTO && clearTimeout(this.outTO);
            d.resetMouseOver();
            this.mouseIsOver=!0
        },
        handleMouseOut: function() {
            var a = this;
            d.resetMouseOver();
            a.outTO && clearTimeout(a.outTO);
            a.outTO = setTimeout(function() {
                a.handleMouseOutReal()
            }, 10)
        },
        handleMouseOutReal: function() {
            this.mouseIsOver=!1
        },
        handleMouseMove: function(a) {
            a || (a = window.event);
            this.mouse2Y = this.mouse2X = NaN;
            var b, c, e, d;
            if (a) {
                if (a.touches) {
                    var f = a.touches.item(1);
                    f && this.panEventsEnabled && this.boundingRect && (e = f.clientX - this.boundingRect.left,
                    d = f.clientY - this.boundingRect.top);
                    a = a.touches.item(0);
                    if (!a)
                        return 
                } else 
                    this.wasTouched=!1;
                this.boundingRect && a.clientX && (b = a.clientX - this.boundingRect.left, c = a.clientY - this.boundingRect.top);
                isNaN(e) ? this.mouseX = b : (this.mouseX = Math.min(b, e), this.mouse2X = Math.max(b, e));
                isNaN(d) ? this.mouseY = c : (this.mouseY = Math.min(c, d), this.mouse2Y = Math.max(c, d))
            }
        },
        handleTouchStart: function(a) {
            this.hideBalloonReal();
            a && (a.touches && this.tapToActivate&&!this.tapped ||!this.panRequired) || (this.handleMouseMove(a), this.handleMouseDown(a))
        },
        handleTouchEnd: function(a) {
            this.wasTouched=!0;
            this.handleMouseMove(a);
            d.resetMouseOver();
            this.handleReleaseOutside(a)
        },
        handleReleaseOutside: function() {
            this.handleDocTouchEnd.call(this)
        },
        handleMouseDown: function(a) {
            d.resetMouseOver();
            this.mouseIsOver=!0;
            a && a.preventDefault && (this.panEventsEnabled ? a.preventDefault() : a.touches || a.preventDefault())
        },
        addLegend: function(a, b) {
            a = d.processObject(a, d.AmLegend, this.theme);
            a.divId = b;
            a.ieW = 0;
            var c;
            c = "object" != typeof b && b ? document.getElementById(b) : b;
            this.legend =
            a;
            a.chart = this;
            c ? (a.div = c, a.position = "outside", a.autoMargins=!1) : a.div = this.legendDiv;
            return a
        },
        removeLegend: function() {
            this.legend = void 0;
            this.previousWidth = 0;
            this.legendDiv.innerHTML = ""
        },
        handleResize: function() {
            (d.isPercents(this.width) || d.isPercents(this.height)) && this.invalidateSizeReal();
            this.renderFix()
        },
        renderFix: function() {
            if (!d.VML) {
                var a = this.container;
                a && a.renderFix()
            }
        },
        getSVG: function() {
            if (d.hasSVG)
                return this.container
        },
        animate: function(a, b, c, e, g, f, h) {
            a["an_" + b] && d.removeFromArray(this.animations,
            a["an_" + b]);
            c = {
                obj: a,
                frame: 0,
                attribute: b,
                from: c,
                to: e,
                time: g,
                effect: f,
                suffix: h
            };
            a["an_" + b] = c;
            this.animations.push(c);
            return c
        },
        setLegendData: function(a) {
            var b = this.legend;
            b && b.setData(a)
        },
        stopAnim: function(a) {
            d.removeFromArray(this.animations, a)
        },
        updateAnimations: function() {
            var a;
            this.container && this.container.update();
            if (this.animations)
                for (a = this.animations.length - 1; 0 <= a; a--) {
                    var b = this.animations[a], c = d.updateRate * b.time, e = b.frame + 1, g = b.obj, f = b.attribute;
                    if (e <= c) {
                        b.frame++;
                        var h = Number(b.from),
                        k = Number(b.to) - h, c = d[b.effect](0, e, h, k, c);
                        0 === k ? (this.animations.splice(a, 1), g.node.style[f] = Number(b.to) + b.suffix) : g.node.style[f] = c + b.suffix
                    } else 
                        g.node.style[f] = Number(b.to) + b.suffix, g.animationFinished=!0, this.animations.splice(a, 1)
                }
        },
        update: function() {
            this.updateAnimations();
            var a = this.animatable;
            if (0 < a.length) {
                for (var b=!0, c = a.length - 1; 0 <= c; c--) {
                    var e = a[c];
                    e && (e.animationFinished ? a.splice(c, 1) : b=!1)
                }
                b && (this.fire({
                    type: "animationFinished",
                    chart: this
                }), this.animatable = [])
            }
        },
        inIframe: function() {
            try {
                return window.self !==
                window.top
            } catch (a) {
                return !0
            }
        },
        brr: function() {
            if (!this.hideCredits) {
                var a = "amcharts.com", b = window.location.hostname.split("."), c;
                2 <= b.length && (c = b[b.length - 2] + "." + b[b.length - 1]);
                this.amLink && (b = this.amLink.parentNode) && b.removeChild(this.amLink);
                b = this.creditsPosition;
                if (c != a ||!0 === this.inIframe()) {
                    var a = "http://www." + a, e = c = 0, d = this.realWidth, f = this.realHeight, h = this.type;
                    if ("serial" == h || "xy" == h || "gantt" == h)
                        c = this.marginLeftReal, e = this.marginTopReal, d = c + this.plotAreaWidth, f = e + this.plotAreaHeight;
                    var h = a + "/javascript-charts/", k = "JavaScript charts", l = "JS chart by amCharts";
                    "ammap" == this.product && (h = a + "/javascript-maps/", k = "Interactive JavaScript maps", l = "JS map by amCharts");
                    a = document.createElement("a");
                    l = document.createTextNode(l);
                    a.setAttribute("href", h);
                    a.setAttribute("title", k);
                    this.urlTarget && a.setAttribute("target", this.urlTarget);
                    a.appendChild(l);
                    this.chartDiv.appendChild(a);
                    this.amLink = a;
                    h = a.style;
                    h.position = "absolute";
                    h.textDecoration = "none";
                    h.color = this.color;
                    h.fontFamily = this.fontFamily;
                    h.fontSize = "11px";
                    h.opacity = .7;
                    h.display = "block";
                    var k = a.offsetWidth, a = a.offsetHeight, l = 5 + c, m = e + 5;
                    "bottom-left" == b && (l = 5 + c, m = f - a - 3);
                    "bottom-right" == b && (l = d - k - 5, m = f - a - 3);
                    "top-right" == b && (l = d - k - 5, m = e + 5);
                    h.left = l + "px";
                    h.top = m + "px"
                }
            }
        }
    });
    d.Slice = d.Class({
        construct: function() {}
    });
    d.SerialDataItem = d.Class({
        construct: function() {}
    });
    d.GraphDataItem = d.Class({
        construct: function() {}
    });
    d.Guide = d.Class({
        construct: function(a) {
            this.cname = "Guide";
            d.applyTheme(this, a, this.cname)
        }
    });
    d.Title = d.Class({
        construct: function(a) {
            this.cname =
            "Title";
            d.applyTheme(this, a, this.cname)
        }
    });
    d.Label = d.Class({
        construct: function(a) {
            this.cname = "Label";
            d.applyTheme(this, a, this.cname)
        }
    })
})();
(function() {
    var d = window.AmCharts;
    d.AmBalloon = d.Class({
        construct: function(a) {
            this.cname = "AmBalloon";
            this.enabled=!0;
            this.fillColor = "#FFFFFF";
            this.fillAlpha = .8;
            this.borderThickness = 2;
            this.borderColor = "#FFFFFF";
            this.borderAlpha = 1;
            this.cornerRadius = 0;
            this.maxWidth = 220;
            this.horizontalPadding = 8;
            this.verticalPadding = 4;
            this.pointerWidth = 6;
            this.pointerOrientation = "V";
            this.color = "#000000";
            this.adjustBorderColor=!0;
            this.show = this.follow = this.showBullet=!1;
            this.bulletSize = 3;
            this.shadowAlpha = .4;
            this.shadowColor =
            "#000000";
            this.fadeOutDuration = this.animationDuration = .3;
            this.fixedPosition=!0;
            this.offsetY = 6;
            this.offsetX = 1;
            this.textAlign = "center";
            this.disableMouseEvents=!0;
            this.deltaSignX = this.deltaSignY = 1;
            d.isModern || (this.offsetY*=1.5);
            this.sdy = this.sdx = 0;
            d.applyTheme(this, a, this.cname)
        },
        draw: function() {
            var a = this.pointToX, b = this.pointToY;
            d.isModern || (this.drop=!1);
            var c = this.chart;
            d.VML && (this.fadeOutDuration = 0);
            this.xAnim && c.stopAnim(this.xAnim);
            this.yAnim && c.stopAnim(this.yAnim);
            this.sdy = this.sdx = 0;
            if (!isNaN(a)) {
                var e =
                this.follow, g = c.container, f = this.set;
                d.remove(f);
                this.removeDiv();
                f = g.set();
                f.node.style.pointerEvents = "none";
                this.set = f;
                this.mainSet ? (this.mainSet.push(this.set), this.sdx = this.mainSet.x, this.sdy = this.mainSet.y) : c.balloonsSet.push(f);
                if (this.show) {
                    var h = this.l, k = this.t, l = this.r, m = this.b, n = this.balloonColor, q = this.fillColor, t = this.borderColor, r = q;
                    void 0 != n && (this.adjustBorderColor ? r = t = n : q = n);
                    var p = this.horizontalPadding, u = this.verticalPadding, A = this.pointerWidth, x = this.pointerOrientation, z = this.cornerRadius,
                    v = c.fontFamily, B = this.fontSize;
                    void 0 == B && (B = c.fontSize);
                    var n = document.createElement("div"), C = c.classNamePrefix;
                    n.className = C + "-balloon-div";
                    this.className && (n.className = n.className + " " + C + "-balloon-div-" + this.className);
                    C = n.style;
                    this.disableMouseEvents && (C.pointerEvents = "none");
                    C.position = "absolute";
                    var w = this.minWidth, y = "";
                    isNaN(w) || (y = "min-width:" + (w - 2 * p) + "px; ");
                    n.innerHTML = '<div style="text-align:' + this.textAlign + "; " + y + "max-width:" + this.maxWidth + "px; font-size:" + B + "px; color:" + this.color + "; font-family:" +
                    v + '">' + this.text + "</div>";
                    c.chartDiv.appendChild(n);
                    this.textDiv = n;
                    var F = n.offsetWidth, E = n.offsetHeight;
                    n.clientHeight && (F = n.clientWidth, E = n.clientHeight);
                    v = E + 2 * u;
                    y = F + 2 * p;
                    !isNaN(w) && y < w && (y = w);
                    window.opera && (v += 2);
                    var H=!1, B = this.offsetY;
                    c.handDrawn && (B += c.handDrawScatter + 2);
                    "H" != x ? (w = a - y / 2, b < k + v + 10 && "down" != x ? (H=!0, e && (b += B), B = b + A, this.deltaSignY =- 1) : (e && (b -= B), B = b - v - A, this.deltaSignY = 1)) : (2 * A > v && (A = v / 2), B = b - v / 2, a < h + (l - h) / 2 ? (w = a + A, this.deltaSignX =- 1) : (w = a - y - A, this.deltaSignX = 1));
                    B + v >= m && (B = m - v);
                    B < k && (B = k);
                    w < h && (w = h);
                    w + y > l && (w = l - y);
                    var k = B + u, m = w + p, G = this.shadowAlpha, D = this.shadowColor, p = this.borderThickness, K = this.bulletSize, J, u = this.fillAlpha, L = this.borderAlpha;
                    this.showBullet && (J = d.circle(g, K, r, u), f.push(J));
                    this.drop ? (h = y / 1.6, l = 0, "V" == x && (x = "down"), "H" == x && (x = "left"), "down" == x && (w = a + 1, B = b - h - h / 3), "up" == x && (l = 180, w = a + 1, B = b + h + h / 3), "left" == x && (l = 270, w = a + h + h / 3 + 2, B = b), "right" == x && (l = 90, w = a - h - h / 3 + 2, B = b), k = B - E / 2 + 1, m = w - F / 2 - 1, q = d.drop(g, h, l, q, u, p, t, L)) : 0 < z || 0 === A ? (0 < G && (a = d.rect(g, y, v, q, 0, p + 1, D,
                    G, z), d.isModern ? a.translate(1, 1) : a.translate(4, 4), f.push(a)), q = d.rect(g, y, v, q, u, p, t, L, z)) : (r = [], z = [], "H" != x ? (h = a - w, h > y - A && (h = y - A), h < A && (h = A), r = [0, h - A, a - w, h + A, y, y, 0, 0], z = H ? [0, 0, b - B, 0, 0, v, v, 0] : [v, v, b - B, v, v, 0, 0, v]) : (x = b - B, x > v - A && (x = v - A), x < A && (x = A), z = [0, x - A, b - B, x + A, v, v, 0, 0], r = a < h + (l - h) / 2 ? [0, 0, w < a ? 0: a - w, 0, 0, y, y, 0] : [y, y, w + y > a ? y: a - w, y, y, 0, 0, y]), 0 < G && (a = d.polygon(g, r, z, q, 0, p, D, G), a.translate(1, 1), f.push(a)), q = d.polygon(g, r, z, q, u, p, t, L));
                    this.bg = q;
                    f.push(q);
                    q.toFront();
                    d.setCN(c, q, "balloon-bg");
                    this.className &&
                    d.setCN(c, q, "balloon-bg-" + this.className);
                    g = 1 * this.deltaSignX;
                    m += this.sdx;
                    k += this.sdy;
                    C.left = m + "px";
                    C.top = k + "px";
                    f.translate(w - g, B, 1, !0);
                    q = q.getBBox();
                    this.bottom = B + v + 1;
                    this.yPos = q.y + B;
                    J && J.translate(this.pointToX - w + g, b - B);
                    b = this.animationDuration;
                    0 < this.animationDuration&&!e&&!isNaN(this.prevX) && (f.translate(this.prevX, this.prevY, NaN, !0), f.animate({
                        translate: w - g + "," + B
                    }, b, "easeOutSine"), n && (C.left = this.prevTX + "px", C.top = this.prevTY + "px", this.xAnim = c.animate({
                        node: n
                    }, "left", this.prevTX, m, b, "easeOutSine",
                    "px"), this.yAnim = c.animate({
                        node: n
                    }, "top", this.prevTY, k, b, "easeOutSine", "px")));
                    this.prevX = w - g;
                    this.prevY = B;
                    this.prevTX = m;
                    this.prevTY = k
                }
            }
        },
        fixPrevious: function() {
            this.rPrevX = this.prevX;
            this.rPrevY = this.prevY;
            this.rPrevTX = this.prevTX;
            this.rPrevTY = this.prevTY
        },
        restorePrevious: function() {
            this.prevX = this.rPrevX;
            this.prevY = this.rPrevY;
            this.prevTX = this.rPrevTX;
            this.prevTY = this.rPrevTY
        },
        followMouse: function() {
            if (this.follow && this.show) {
                var a = this.chart.mouseX - this.offsetX * this.deltaSignX - this.sdx, b = this.chart.mouseY -
                this.sdy;
                this.pointToX = a;
                this.pointToY = b;
                if (a != this.previousX || b != this.previousY)
                    if (this.previousX = a, this.previousY = b, 0 === this.cornerRadius)
                        this.draw();
                    else {
                        var c = this.set;
                        if (c) {
                            var e = c.getBBox(), a = a - e.width / 2, d = b - e.height - 10;
                            a < this.l && (a = this.l);
                            a > this.r - e.width && (a = this.r - e.width);
                            d < this.t && (d = b + 10);
                            c.translate(a, d);
                            b = this.textDiv.style;
                            b.left = a + this.horizontalPadding + "px";
                            b.top = d + this.verticalPadding + "px"
                        }
                    }
            }
        },
        changeColor: function(a) {
            this.balloonColor = a
        },
        setBounds: function(a, b, c, e) {
            this.l = a;
            this.t =
            b;
            this.r = c;
            this.b = e;
            this.destroyTO && clearTimeout(this.destroyTO)
        },
        showBalloon: function(a) {
            if (this.text != a || this.positionChanged)
                this.text = a, this.isHiding=!1, this.show=!0, this.destroyTO && clearTimeout(this.destroyTO), a = this.chart, this.fadeAnim1 && a.stopAnim(this.fadeAnim1), this.fadeAnim2 && a.stopAnim(this.fadeAnim2), this.draw(), this.positionChanged=!1
        },
        hide: function(a) {
            var b = this;
            b.text = void 0;
            isNaN(a) && (a = b.fadeOutDuration);
            var c = b.chart;
            if (0 < a&&!b.isHiding) {
                b.isHiding=!0;
                b.destroyTO && clearTimeout(b.destroyTO);
                b.destroyTO = setTimeout(function() {
                    b.destroy.call(b)
                }, 1E3 * a);
                b.follow=!1;
                b.show=!1;
                var e = b.set;
                e && (e.setAttr("opacity", b.fillAlpha), b.fadeAnim1 = e.animate({
                    opacity: 0
                }, a, "easeInSine"));
                b.textDiv && (b.fadeAnim2 = c.animate({
                    node: b.textDiv
                }, "opacity", 1, 0, a, "easeInSine", ""))
            } else 
                b.show=!1, b.follow=!1, b.destroy()
        },
        setPosition: function(a, b) {
            if (a != this.pointToX || b != this.pointToY)
                this.previousX = this.pointToX, this.previousY = this.pointToY, this.pointToX = a, this.pointToY = b, this.positionChanged=!0
        },
        followCursor: function(a) {
            var b =
            this;
            b.follow = a;
            clearInterval(b.interval);
            var c = b.chart.mouseX - b.sdx, e = b.chart.mouseY - b.sdy;
            !isNaN(c) && a && (b.pointToX = c - b.offsetX * b.deltaSignX, b.pointToY = e, b.followMouse(), b.interval = setInterval(function() {
                b.followMouse.call(b)
            }, 40))
        },
        removeDiv: function() {
            if (this.textDiv) {
                var a = this.textDiv.parentNode;
                a && a.removeChild(this.textDiv)
            }
        },
        destroy: function() {
            clearInterval(this.interval);
            d.remove(this.set);
            this.removeDiv();
            this.set = null
        }
    })
})();
(function() {
    var d = window.AmCharts;
    d.circle = function(a, b, c, e, g, f, h, k, l) {
        0 >= b && (b = .001);
        if (void 0 == g || 0 === g)
            g = .01;
        void 0 === f && (f = "#000000");
        void 0 === h && (h = 0);
        e = {
            fill: c,
            stroke: f,
            "fill-opacity": e,
            "stroke-width": g,
            "stroke-opacity": h
        };
        a = isNaN(l) ? a.circle(0, 0, b).attr(e) : a.ellipse(0, 0, b, l).attr(e);
        k && a.gradient("radialGradient", [c, d.adjustLuminosity(c, - .6)]);
        return a
    };
    d.text = function(a, b, c, e, g, f, h, k) {
        f || (f = "middle");
        "right" == f && (f = "end");
        "left" == f && (f = "start");
        isNaN(k) && (k = 1);
        void 0 !== b && (b = String(b), d.isIE &&
        !d.isModern && (b = b.replace("&amp;", "&"), b = b.replace("&", "&amp;")));
        c = {
            fill: c,
            "font-family": e,
            "font-size": g + "px",
            opacity: k
        };
        !0 === h && (c["font-weight"] = "bold");
        c["text-anchor"] = f;
        return a.text(b, c)
    };
    d.polygon = function(a, b, c, e, g, f, h, k, l, m, n) {
        isNaN(f) && (f = .01);
        isNaN(k) && (k = g);
        var q = e, t=!1;
        "object" == typeof q && 1 < q.length && (t=!0, q = q[0]);
        void 0 === h && (h = q);
        g = {
            fill: q,
            stroke: h,
            "fill-opacity": g,
            "stroke-width": f,
            "stroke-opacity": k
        };
        void 0 !== n && 0 < n && (g["stroke-dasharray"] = n);
        n = d.dx;
        f = d.dy;
        a.handDrawn && (c = d.makeHD(b,
        c, a.handDrawScatter), b = c[0], c = c[1]);
        h = Math.round;
        m && (b[r] = d.roundTo(b[r], 5), c[r] = d.roundTo(c[r], 5), h = Number);
        k = "M" + (h(b[0]) + n) + "," + (h(c[0]) + f);
        for (var r = 1; r < b.length; r++)
            m && (b[r] = d.roundTo(b[r], 5), c[r] = d.roundTo(c[r], 5)), k += " L" + (h(b[r]) + n) + "," + (h(c[r]) + f);
        a = a.path(k + " Z").attr(g);
        t && a.gradient("linearGradient", e, l);
        return a
    };
    d.rect = function(a, b, c, e, g, f, h, k, l, m, n) {
        if (isNaN(b) || isNaN(c))
            return a.set();
        isNaN(f) && (f = 0);
        void 0 === l && (l = 0);
        void 0 === m && (m = 270);
        isNaN(g) && (g = 0);
        var q = e, t=!1;
        "object" == typeof q &&
        (q = q[0], t=!0);
        void 0 === h && (h = q);
        void 0 === k && (k = g);
        b = Math.round(b);
        c = Math.round(c);
        var r = 0, p = 0;
        0 > b && (b = Math.abs(b), r =- b);
        0 > c && (c = Math.abs(c), p =- c);
        r += d.dx;
        p += d.dy;
        g = {
            fill: q,
            stroke: h,
            "fill-opacity": g,
            "stroke-opacity": k
        };
        void 0 !== n && 0 < n && (g["stroke-dasharray"] = n);
        a = a.rect(r, p, b, c, l, f).attr(g);
        t && a.gradient("linearGradient", e, m);
        return a
    };
    d.bullet = function(a, b, c, e, g, f, h, k, l, m, n, q, t) {
        var r;
        "circle" == b && (b = "round");
        switch (b) {
        case "round":
            r = d.circle(a, c / 2, e, g, f, h, k);
            break;
        case "square":
            r = d.polygon(a, [ - c /
            2, c / 2, c / 2, - c / 2], [c / 2, c / 2, - c / 2, - c / 2], e, g, f, h, k, m - 180, void 0, t);
            break;
        case "rectangle":
            r = d.polygon(a, [ - c, c, c, - c], [c / 2, c / 2, - c / 2, - c / 2], e, g, f, h, k, m - 180, void 0, t);
            break;
        case "diamond":
            r = d.polygon(a, [ - c / 2, 0, c / 2, 0], [0, - c / 2, 0, c / 2], e, g, f, h, k);
            break;
        case "triangleUp":
            r = d.triangle(a, c, 0, e, g, f, h, k);
            break;
        case "triangleDown":
            r = d.triangle(a, c, 180, e, g, f, h, k);
            break;
        case "triangleLeft":
            r = d.triangle(a, c, 270, e, g, f, h, k);
            break;
        case "triangleRight":
            r = d.triangle(a, c, 90, e, g, f, h, k);
            break;
        case "bubble":
            r = d.circle(a, c / 2, e, g,
            f, h, k, !0);
            break;
        case "line":
            r = d.line(a, [ - c / 2, c / 2], [0, 0], e, g, f, h, k);
            break;
        case "yError":
            r = a.set();
            r.push(d.line(a, [0, 0], [ - c / 2, c / 2], e, g, f));
            r.push(d.line(a, [ - l, l], [ - c / 2, - c / 2], e, g, f));
            r.push(d.line(a, [ - l, l], [c / 2, c / 2], e, g, f));
            break;
        case "xError":
            r = a.set(), r.push(d.line(a, [ - c / 2, c / 2], [0, 0], e, g, f)), r.push(d.line(a, [ - c / 2, - c / 2], [ - l, l], e, g, f)), r.push(d.line(a, [c / 2, c / 2], [ - l, l], e, g, f))
        }
        r && r.pattern(n, NaN, q);
        return r
    };
    d.triangle = function(a, b, c, e, d, f, h, k) {
        if (void 0 === f || 0 === f)
            f = 1;
        void 0 === h && (h = "#000");
        void 0 ===
        k && (k = 0);
        e = {
            fill: e,
            stroke: h,
            "fill-opacity": d,
            "stroke-width": f,
            "stroke-opacity": k
        };
        b/=2;
        var l;
        0 === c && (l = " M" +- b + "," + b + " L0," +- b + " L" + b + "," + b + " Z");
        180 == c && (l = " M" +- b + "," +- b + " L0," + b + " L" + b + "," +- b + " Z");
        90 == c && (l = " M" +- b + "," +- b + " L" + b + ",0 L" +- b + "," + b + " Z");
        270 == c && (l = " M" +- b + ",0 L" + b + "," + b + " L" + b + "," +- b + " Z");
        return a.path(l).attr(e)
    };
    d.line = function(a, b, c, e, g, f, h, k, l, m, n) {
        if (a.handDrawn&&!n)
            return d.handDrawnLine(a, b, c, e, g, f, h, k, l, m, n);
        f = {
            fill: "none",
            "stroke-width": f
        };
        void 0 !== h && 0 < h && (f["stroke-dasharray"] =
        h);
        isNaN(g) || (f["stroke-opacity"] = g);
        e && (f.stroke = e);
        e = Math.round;
        m && (e = Number, b[0] = d.roundTo(b[0], 5), c[0] = d.roundTo(c[0], 5));
        m = d.dx;
        g = d.dy;
        h = "M" + (e(b[0]) + m) + "," + (e(c[0]) + g);
        for (k = 1; k < b.length; k++)
            b[k] = d.roundTo(b[k], 5), c[k] = d.roundTo(c[k], 5), h += " L" + (e(b[k]) + m) + "," + (e(c[k]) + g);
        if (d.VML)
            return a.path(h, void 0, !0).attr(f);
        l && (h += " M0,0 L0,0");
        return a.path(h).attr(f)
    };
    d.makeHD = function(a, b, c) {
        for (var e = [], d = [], f = 1; f < a.length; f++)
            for (var h = Number(a[f - 1]), k = Number(b[f - 1]), l = Number(a[f]), m = Number(b[f]),
            n = Math.round(Math.sqrt(Math.pow(l - h, 2) + Math.pow(m - k, 2)) / 50) + 1, l = (l - h) / n, m = (m - k) / n, q = 0; q <= n; q++) {
                var t = k + q * m + Math.random() * c;
                e.push(h + q * l + Math.random() * c);
                d.push(t)
            }
        return [e, d]
    };
    d.handDrawnLine = function(a, b, c, e, g, f, h, k, l, m) {
        var n, q = a.set();
        for (n = 1; n < b.length; n++)
            for (var t = [b[n - 1], b[n]], r = [c[n - 1], c[n]], r = d.makeHD(t, r, a.handDrawScatter), t = r[0], r = r[1], p = 1; p < t.length; p++)
                q.push(d.line(a, [t[p - 1], t[p]], [r[p - 1], r[p]], e, g, f + Math.random() * a.handDrawThickness - a.handDrawThickness / 2, h, k, l, m, !0));
        return q
    };
    d.doNothing =
    function(a) {
        return a
    };
    d.drop = function(a, b, c, e, d, f, h, k) {
        var l = 1 / 180 * Math.PI, m = c - 20, n = Math.sin(m * l) * b, q = Math.cos(m * l) * b, t = Math.sin((m + 40) * l) * b, r = Math.cos((m + 40) * l) * b, p = .8 * b, u =- b / 3, A = b / 3;
        0 === c && (u =- u, A = 0);
        180 == c && (A = 0);
        90 == c && (u = 0);
        270 == c && (u = 0, A =- A);
        c = {
            fill: e,
            stroke: h,
            "stroke-width": f,
            "stroke-opacity": k,
            "fill-opacity": d
        };
        b = "M" + n + "," + q + " A" + b + "," + b + ",0,1,1," + t + "," + r + (" A" + p + "," + p + ",0,0,0," + (Math.sin((m + 20) * l) * b + A) + "," + (Math.cos((m + 20) * l) * b + u));
        b += " A" + p + "," + p + ",0,0,0," + n + "," + q;
        return a.path(b, void 0,
        void 0, "1000,1000").attr(c)
    };
    d.wedge = function(a, b, c, e, g, f, h, k, l, m, n, q, t, r) {
        var p = Math.round;
        f = p(f);
        h = p(h);
        k = p(k);
        var u = p(h / f * k), A = d.VML, x = 359.5 + f / 100;
        359.94 < x && (x = 359.94);
        g >= x && (g = x);
        var z = 1 / 180 * Math.PI, x = b + Math.sin(e * z) * k, v = c - Math.cos(e * z) * u, B = b + Math.sin(e * z) * f, C = c - Math.cos(e * z) * h, w = b + Math.sin((e + g) * z) * f, y = c - Math.cos((e + g) * z) * h, F = b + Math.sin((e + g) * z) * k, z = c - Math.cos((e + g) * z) * u, E = {
            fill: d.adjustLuminosity(m.fill, - .2),
            "stroke-opacity": 0,
            "fill-opacity": m["fill-opacity"]
        }, H = 0;
        180 < Math.abs(g) && (H = 1);
        e = a.set();
        var G;
        A && (x = p(10 * x), B = p(10 * B), w = p(10 * w), F = p(10 * F), v = p(10 * v), C = p(10 * C), y = p(10 * y), z = p(10 * z), b = p(10 * b), l = p(10 * l), c = p(10 * c), f*=10, h*=10, k*=10, u*=10, 1 > Math.abs(g) && 1 >= Math.abs(w - B) && 1 >= Math.abs(y - C) && (G=!0));
        g = "";
        var D;
        q && (E["fill-opacity"] = 0, E["stroke-opacity"] = m["stroke-opacity"] / 2, E.stroke = m.stroke);
        if (0 < l) {
            D = " M" + x + "," + (v + l) + " L" + B + "," + (C + l);
            A ? (G || (D += " A" + (b - f) + "," + (l + c - h) + "," + (b + f) + "," + (l + c + h) + "," + B + "," + (C + l) + "," + w + "," + (y + l)), D += " L" + F + "," + (z + l), 0 < k && (G || (D += " B" + (b - k) + "," + (l + c - u) + "," + (b + k) + "," +
            (l + c + u) + "," + F + "," + (l + z) + "," + x + "," + (l + v)))) : (D += " A" + f + "," + h + ",0," + H + ",1," + w + "," + (y + l) + " L" + F + "," + (z + l), 0 < k && (D += " A" + k + "," + u + ",0," + H + ",0," + x + "," + (v + l)));
            D += " Z";
            var K = l;
            A && (K/=10);
            for (var J = 0; J < K; J += 10) {
                var L = a.path(D, void 0, void 0, "1000,1000").attr(E);
                e.push(L);
                L.translate(0, - J)
            }
            D = a.path(" M" + x + "," + v + " L" + x + "," + (v + l) + " L" + B + "," + (C + l) + " L" + B + "," + C + " L" + x + "," + v + " Z", void 0, void 0, "1000,1000").attr(E);
            l = a.path(" M" + w + "," + y + " L" + w + "," + (y + l) + " L" + F + "," + (z + l) + " L" + F + "," + z + " L" + w + "," + y + " Z", void 0, void 0,
            "1000,1000").attr(E);
            e.push(D);
            e.push(l)
        }
        A ? (G || (g = " A" + p(b - f) + "," + p(c - h) + "," + p(b + f) + "," + p(c + h) + "," + p(B) + "," + p(C) + "," + p(w) + "," + p(y)), h = " M" + p(x) + "," + p(v) + " L" + p(B) + "," + p(C) + g + " L" + p(F) + "," + p(z)) : h = " M" + x + "," + v + " L" + B + "," + C + (" A" + f + "," + h + ",0," + H + ",1," + w + "," + y) + " L" + F + "," + z;
        0 < k && (A ? G || (h += " B" + (b - k) + "," + (c - u) + "," + (b + k) + "," + (c + u) + "," + F + "," + z + "," + x + "," + v) : h += " A" + k + "," + u + ",0," + H + ",0," + x + "," + v);
        a.handDrawn && (k = d.line(a, [x, B], [v, C], m.stroke, m.thickness * Math.random() * a.handDrawThickness, m["stroke-opacity"]),
        e.push(k));
        a = a.path(h + " Z", void 0, void 0, "1000,1000").attr(m);
        if (n) {
            k = [];
            for (u = 0; u < n.length; u++)
                k.push(d.adjustLuminosity(m.fill, n[u]));
            "radial" != r || d.isModern || (k = []);
            0 < k.length && a.gradient(r + "Gradient", k)
        }
        d.isModern && "radial" == r && a.grad && (a.grad.setAttribute("gradientUnits", "userSpaceOnUse"), a.grad.setAttribute("r", f), a.grad.setAttribute("cx", b), a.grad.setAttribute("cy", c));
        a.pattern(q, NaN, t);
        e.wedge = a;
        e.push(a);
        return e
    };
    d.rgb2hex = function(a) {
        return (a = a.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i)) &&
        4 === a.length ? "#" + ("0" + parseInt(a[1], 10).toString(16)).slice( - 2) + ("0" + parseInt(a[2], 10).toString(16)).slice( - 2) + ("0" + parseInt(a[3], 10).toString(16)).slice( - 2) : ""
    };
    d.adjustLuminosity = function(a, b) {
        a&&-1 != a.indexOf("rgb") && (a = d.rgb2hex(a));
        a = String(a).replace(/[^0-9a-f]/gi, "");
        6 > a.length && (a = String(a[0]) + String(a[0]) + String(a[1]) + String(a[1]) + String(a[2]) + String(a[2]));
        b = b || 0;
        var c = "#", e, g;
        for (g = 0; 3 > g; g++)
            e = parseInt(a.substr(2 * g, 2), 16), e = Math.round(Math.min(Math.max(0, e + e * b), 255)).toString(16), c += ("00" +
            e).substr(e.length);
        return c
    }
})();
(function() {
    var d = window.AmCharts;
    d.AmLegend = d.Class({
        construct: function(a) {
            this.enabled=!0;
            this.cname = "AmLegend";
            this.createEvents("rollOverMarker", "rollOverItem", "rollOutMarker", "rollOutItem", "showItem", "hideItem", "clickMarker", "rollOverItem", "rollOutItem", "clickLabel");
            this.position = "bottom";
            this.borderColor = this.color = "#000000";
            this.borderAlpha = 0;
            this.markerLabelGap = 5;
            this.verticalGap = 10;
            this.align = "left";
            this.horizontalGap = 0;
            this.spacing = 10;
            this.markerDisabledColor = "#AAB3B3";
            this.markerType =
            "square";
            this.markerSize = 16;
            this.markerBorderThickness = this.markerBorderAlpha = 1;
            this.marginBottom = this.marginTop = 0;
            this.marginLeft = this.marginRight = 20;
            this.autoMargins=!0;
            this.valueWidth = 50;
            this.switchable=!0;
            this.switchType = "x";
            this.switchColor = "#FFFFFF";
            this.rollOverColor = "#CC0000";
            this.reversedOrder=!1;
            this.labelText = "[[title]]";
            this.valueText = "[[value]]";
            this.useMarkerColorForLabels=!1;
            this.rollOverGraphAlpha = 1;
            this.textClickEnabled=!1;
            this.equalWidths=!0;
            this.backgroundColor = "#FFFFFF";
            this.backgroundAlpha =
            0;
            this.useGraphSettings=!1;
            this.showEntries=!0;
            d.applyTheme(this, a, this.cname)
        },
        setData: function(a) {
            this.legendData = a;
            this.invalidateSize()
        },
        invalidateSize: function() {
            this.destroy();
            this.entries = [];
            this.valueLabels = [];
            var a = this.legendData;
            this.enabled && (d.ifArray(a) || d.ifArray(this.data)) && this.drawLegend()
        },
        drawLegend: function() {
            var a = this.chart, b = this.position, c = this.width, e = a.divRealWidth, g = a.divRealHeight, f = this.div, h = this.legendData;
            this.data && (h = this.data);
            isNaN(this.fontSize) && (this.fontSize =
            a.fontSize);
            this.maxColumnsReal = this.maxColumns;
            if ("right" == b || "left" == b)
                this.maxColumnsReal = 1, this.autoMargins && (this.marginLeft = this.marginRight = 10);
            else if (this.autoMargins) {
                this.marginRight = a.marginRight;
                this.marginLeft = a.marginLeft;
                var k = a.autoMarginOffset;
                "bottom" == b ? (this.marginBottom = k, this.marginTop = 0) : (this.marginTop = k, this.marginBottom = 0)
            }
            c = void 0 !== c ? d.toCoordinate(c, e) : "right" != b && "left" != b ? a.realWidth : 0 < this.ieW ? this.ieW : a.realWidth;
            "outside" == b ? (c = f.offsetWidth, g = f.offsetHeight, f.clientHeight &&
            (c = f.clientWidth, g = f.clientHeight)) : (isNaN(c) || (f.style.width = c + "px"), f.className = "amChartsLegend " + a.classNamePrefix + "-legend-div");
            this.divWidth = c;
            (b = this.container) ? (b.container.innerHTML = "", f.appendChild(b.container), b.width = c, b.height = g, b.setSize(c, g), b.addDefs(a)) : b = new d.AmDraw(f, c, g, a);
            this.container = b;
            this.lx = 0;
            this.ly = 8;
            g = this.markerSize;
            g > this.fontSize && (this.ly = g / 2 - 1);
            0 < g && (this.lx += g + this.markerLabelGap);
            this.titleWidth = 0;
            if (g = this.title)
                g = d.text(this.container, g, this.color, a.fontFamily,
                this.fontSize, "start", !0), d.setCN(a, g, "legend-title"), g.translate(this.marginLeft, this.marginTop + this.verticalGap + this.ly + 1), a = g.getBBox(), this.titleWidth = a.width + 15, this.titleHeight = a.height + 6;
            this.index = this.maxLabelWidth = 0;
            if (this.showEntries) {
                for (a = 0; a < h.length; a++)
                    this.createEntry(h[a]);
                for (a = this.index = 0; a < h.length; a++)
                    this.createValue(h[a])
            }
            this.arrangeEntries();
            this.updateValues()
        },
        arrangeEntries: function() {
            var a = this.position, b = this.marginLeft + this.titleWidth, c = this.marginRight, e = this.marginTop,
            g = this.marginBottom, f = this.horizontalGap, h = this.div, k = this.divWidth, l = this.maxColumnsReal, m = this.verticalGap, n = this.spacing, q = k - c - b, t = 0, r = 0, p = this.container;
            this.set && this.set.remove();
            var u = p.set();
            this.set = u;
            var A = p.set();
            u.push(A);
            var x = this.entries, z, v;
            for (v = 0; v < x.length; v++) {
                z = x[v].getBBox();
                var B = z.width;
                B > t && (t = B);
                z = z.height;
                z > r && (r = z)
            }
            var B = r = 0, C = f, w = 0, y = 0;
            for (v = 0; v < x.length; v++) {
                var F = x[v];
                this.reversedOrder && (F = x[x.length - v - 1]);
                z = F.getBBox();
                var E;
                this.equalWidths ? E = B * (t + n + this.markerLabelGap) :
                (E = C, C = C + z.width + f + n);
                z.height > y && (y = z.height);
                E + z.width > q && 0 < v && 0 !== B && (r++, E = B = 0, C = E + z.width + f + n, w = w + y + m, y = 0);
                F.translate(E, w);
                B++;
                !isNaN(l) && B >= l && (B = 0, r++, w = w + y + m, C = f, y = 0);
                A.push(F)
            }
            z = A.getBBox();
            l = z.height + 2 * m - 1;
            "left" == a || "right" == a ? (n = z.width + 2 * f, k = n + b + c, h.style.width = k + "px", this.ieW = k) : n = k - b - c - 1;
            c = d.polygon(this.container, [0, n, n, 0], [0, 0, l, l], this.backgroundColor, this.backgroundAlpha, 1, this.borderColor, this.borderAlpha);
            d.setCN(this.chart, c, "legend-bg");
            u.push(c);
            u.translate(b, e);
            c.toBack();
            b = f;
            if ("top" == a || "bottom" == a || "absolute" == a || "outside" == a)
                "center" == this.align ? b = f + (n - z.width) / 2 : "right" == this.align && (b = f + n - z.width);
            A.translate(b, m + 1);
            this.titleHeight > l && (l = this.titleHeight);
            a = l + e + g + 1;
            0 > a && (a = 0);
            a > this.chart.divRealHeight && (h.style.top = "0px");
            h.style.height = Math.round(a) + "px";
            p.setSize(this.divWidth, a)
        },
        createEntry: function(a) {
            if (!1 !== a.visibleInLegend&&!a.hideFromLegend) {
                var b = this.chart, c = a.markerType;
                a.legendEntryWidth = this.markerSize;
                c || (c = this.markerType);
                var e = a.color, g =
                a.alpha;
                a.legendKeyColor && (e = a.legendKeyColor());
                a.legendKeyAlpha && (g = a.legendKeyAlpha());
                var f;
                !0 === a.hidden && (f = e = this.markerDisabledColor);
                var h = a.pattern, k = a.customMarker;
                k || (k = this.customMarker);
                var l = this.container, m = this.markerSize, n = 0, q = 0, t = m / 2;
                if (this.useGraphSettings) {
                    c = a.type;
                    this.switchType = void 0;
                    if ("line" == c || "step" == c || "smoothedLine" == c || "ohlc" == c)
                        h = l.set(), a.hidden || (e = a.lineColorR, f = a.bulletBorderColorR), n = d.line(l, [0, 2 * m], [m / 2, m / 2], e, a.lineAlpha, a.lineThickness, a.dashLength), d.setCN(b,
                        n, "graph-stroke"), h.push(n), a.bullet && (a.hidden || (e = a.bulletColorR), n = d.bullet(l, a.bullet, a.bulletSize, e, a.bulletAlpha, a.bulletBorderThickness, f, a.bulletBorderAlpha)) && (d.setCN(b, n, "graph-bullet"), n.translate(m + 1, m / 2), h.push(n)), t = 0, n = m, q = m / 3;
                    else {
                        var r;
                        a.getGradRotation && (r = a.getGradRotation(), 0 === r && (r = 180));
                        n = a.fillColorsR;
                        !0 === a.hidden && (n = e);
                        if (h = this.createMarker("rectangle", n, a.fillAlphas, a.lineThickness, e, a.lineAlpha, r, h, a.dashLength))
                            t = m, h.translate(t, m / 2);
                        n = m
                    }
                    d.setCN(b, h, "graph-" + c);
                    d.setCN(b,
                    h, "graph-" + a.id)
                } else if (k)
                    h = l.image(k, 0, 0, m, m);
                else {
                    var p;
                    isNaN(this.gradientRotation) || (p = 180 + this.gradientRotation);
                    (h = this.createMarker(c, e, g, void 0, void 0, void 0, p, h)) && h.translate(m / 2, m / 2)
                }
                d.setCN(b, h, "legend-marker");
                this.addListeners(h, a);
                l = l.set([h]);
                this.switchable && a.switchable && l.setAttr("cursor", "pointer");
                void 0 !== a.id && d.setCN(b, l, "legend-item-" + a.id);
                d.setCN(b, l, a.className, !0);
                f = this.switchType;
                var u;
                f && "none" != f && 0 < m && ("x" == f ? (u = this.createX(), u.translate(m / 2, m / 2)) : u = this.createV(),
                u.dItem = a, !0 !== a.hidden ? "x" == f ? u.hide() : u.show() : "x" != f && u.hide(), this.switchable || u.hide(), this.addListeners(u, a), a.legendSwitch = u, l.push(u), d.setCN(b, u, "legend-switch"));
                f = this.color;
                a.showBalloon && this.textClickEnabled && void 0 !== this.selectedColor && (f = this.selectedColor);
                this.useMarkerColorForLabels && (f = e);
                !0 === a.hidden && (f = this.markerDisabledColor);
                e = d.massReplace(this.labelText, {
                    "[[title]]": a.title
                });
                r = this.fontSize;
                h && (m <= r && (m = m / 2 + this.ly - r / 2 + (r + 2 - m) / 2 - q, h.translate(t, m), u && u.translate(u.x,
                m)), a.legendEntryWidth = h.getBBox().width);
                var A;
                e && (e = d.fixBrakes(e), a.legendTextReal = e, A = this.labelWidth, A = isNaN(A) ? d.text(this.container, e, f, b.fontFamily, r, "start") : d.wrappedText(this.container, e, f, b.fontFamily, r, "start", !1, A, 0), d.setCN(b, A, "legend-label"), A.translate(this.lx + n, this.ly), l.push(A), b = A.getBBox().width, this.maxLabelWidth < b && (this.maxLabelWidth = b));
                this.entries[this.index] = l;
                a.legendEntry = this.entries[this.index];
                a.legendLabel = A;
                this.index++
            }
        },
        addListeners: function(a, b) {
            var c = this;
            a && a.mouseover(function(a) {
                c.rollOverMarker(b, a)
            }).mouseout(function(a) {
                c.rollOutMarker(b, a)
            }).click(function(a) {
                c.clickMarker(b, a)
            })
        },
        rollOverMarker: function(a, b) {
            this.switchable && this.dispatch("rollOverMarker", a, b);
            this.dispatch("rollOverItem", a, b)
        },
        rollOutMarker: function(a, b) {
            this.switchable && this.dispatch("rollOutMarker", a, b);
            this.dispatch("rollOutItem", a, b)
        },
        clickMarker: function(a, b) {
            this.switchable && (!0 === a.hidden ? this.dispatch("showItem", a, b) : this.dispatch("hideItem", a, b));
            this.dispatch("clickMarker",
            a, b)
        },
        rollOverLabel: function(a, b) {
            a.hidden || (this.textClickEnabled && a.legendLabel && a.legendLabel.attr({
                fill: this.rollOverColor
            }), this.dispatch("rollOverItem", a, b))
        },
        rollOutLabel: function(a, b) {
            if (!a.hidden) {
                if (this.textClickEnabled && a.legendLabel) {
                    var c = this.color;
                    void 0 !== this.selectedColor && a.showBalloon && (c = this.selectedColor);
                    this.useMarkerColorForLabels && (c = a.lineColor, void 0 === c && (c = a.color));
                    a.legendLabel.attr({
                        fill: c
                    })
                }
                this.dispatch("rollOutItem", a, b)
            }
        },
        clickLabel: function(a, b) {
            this.textClickEnabled ?
            a.hidden || this.dispatch("clickLabel", a, b) : this.switchable && (!0 === a.hidden ? this.dispatch("showItem", a, b) : this.dispatch("hideItem", a, b))
        },
        dispatch: function(a, b, c) {
            a = {
                type: a,
                dataItem: b,
                target: this,
                event: c,
                chart: this.chart
            };
            this.chart && this.chart.handleLegendEvent(a);
            this.fire(a)
        },
        createValue: function(a) {
            var b = this, c = b.fontSize, e = b.chart;
            if (!1 !== a.visibleInLegend&&!a.hideFromLegend) {
                var g = b.maxLabelWidth;
                b.forceWidth && (g = b.labelWidth);
                b.equalWidths || (b.valueAlign = "left");
                "left" == b.valueAlign && (g = a.legendEntry.getBBox().width);
                var f = g;
                if (b.valueText && 0 < b.valueWidth) {
                    var h = b.color;
                    b.useMarkerColorForValues && (h = a.color, a.legendKeyColor && (h = a.legendKeyColor()));
                    !0 === a.hidden && (h = b.markerDisabledColor);
                    var k = b.valueText, g = g + b.lx + b.markerLabelGap + b.valueWidth, l = "end";
                    "left" == b.valueAlign && (g -= b.valueWidth, l = "start");
                    h = d.text(b.container, k, h, b.chart.fontFamily, c, l);
                    d.setCN(e, h, "legend-value");
                    h.translate(g, b.ly);
                    b.entries[b.index].push(h);
                    f += b.valueWidth + 2 * b.markerLabelGap;
                    h.dItem = a;
                    b.valueLabels.push(h)
                }
                b.index++;
                e = b.markerSize;
                e < c + 7 && (e = c + 7, d.VML && (e += 3));
                c = b.container.rect(a.legendEntryWidth, 0, f, e, 0, 0).attr({
                    stroke: "none",
                    fill: "#fff",
                    "fill-opacity": .005
                });
                c.dItem = a;
                b.entries[b.index - 1].push(c);
                c.mouseover(function(c) {
                    b.rollOverLabel(a, c)
                }).mouseout(function(c) {
                    b.rollOutLabel(a, c)
                }).click(function(c) {
                    b.clickLabel(a, c)
                })
            }
        },
        createV: function() {
            var a = this.markerSize;
            return d.polygon(this.container, [a / 5, a / 2, a - a / 5, a / 2], [a / 3, a - a / 5, a / 5, a / 1.7], this.switchColor)
        },
        createX: function() {
            var a = (this.markerSize - 4) / 2, b = {
                stroke: this.switchColor,
                "stroke-width": 3
            }, c = this.container, e = d.line(c, [ - a, a], [ - a, a]).attr(b), a = d.line(c, [ - a, a], [a, - a]).attr(b);
            return this.container.set([e, a])
        },
        createMarker: function(a, b, c, e, g, f, h, k, l) {
            var m = this.markerSize, n = this.container;
            g || (g = this.markerBorderColor);
            g || (g = b);
            isNaN(e) && (e = this.markerBorderThickness);
            isNaN(f) && (f = this.markerBorderAlpha);
            return d.bullet(n, a, m, b, c, e, g, f, m, h, k, this.chart.path, l)
        },
        validateNow: function() {
            this.invalidateSize()
        },
        updateValues: function() {
            var a = this.valueLabels, b = this.chart, c, e =
            this.data;
            if (a)
                for (c = 0; c < a.length; c++) {
                    var g = a[c], f = g.dItem, h = " ";
                    if (e)
                        f.value ? g.text(f.value) : g.text("");
                    else {
                        var k;
                        if (void 0 !== f.type) {
                            k = f.currentDataItem;
                            var l = this.periodValueText;
                            f.legendPeriodValueText && (l = f.legendPeriodValueText);
                            k ? (h = this.valueText, f.legendValueText && (h = f.legendValueText), h = b.formatString(h, k)) : l && b.formatPeriodString && (l = d.massReplace(l, {
                                "[[title]]": f.title
                            }), h = b.formatPeriodString(l, f))
                        } else 
                            h = b.formatString(this.valueText, f);
                            if (l = this.valueFunction)
                                k && (f = k), h = l(f, h);
                                g.text(h)
                            }
                }
            },
        renderFix: function() {
            if (!d.VML && this.enabled) {
                var a = this.container;
                a && a.renderFix()
            }
        },
        destroy: function() {
            this.div.innerHTML = "";
            d.remove(this.set)
        }
    })
})();
(function() {
    var d = window.AmCharts;
    d.AmMap = d.Class({
        inherits: d.AmChart,
        construct: function(a) {
            this.cname = "AmMap";
            this.type = "map";
            this.theme = a;
            this.svgNotSupported = "This browser doesn't support SVG. Use Chrome, Firefox, Internet Explorer 9 or later.";
            this.createEvents("rollOverMapObject", "rollOutMapObject", "clickMapObject", "mouseDownMapObject", "selectedObjectChanged", "homeButtonClicked", "zoomCompleted", "dragCompleted", "positionChanged", "writeDevInfo", "click");
            this.zoomDuration = .6;
            this.zoomControl = new d.ZoomControl(a);
            this.fitMapToContainer=!0;
            this.mouseWheelZoomEnabled = this.backgroundZoomsToTop=!1;
            this.allowClickOnSelectedObject = this.useHandCursorOnClickableOjects = this.showBalloonOnSelectedObject=!0;
            this.showObjectsAfterZoom = this.wheelBusy=!1;
            this.zoomOnDoubleClick = this.useObjectColorForBalloon=!0;
            this.allowMultipleDescriptionWindows=!1;
            this.dragMap = this.centerMap = this.linesAboveImages=!0;
            this.colorSteps = 5;
            this.forceNormalize=!1;
            this.showAreasInList=!0;
            this.showLinesInList = this.showImagesInList=!1;
            this.areasProcessor =
            new d.AreasProcessor(this);
            this.areasSettings = new d.AreasSettings(a);
            this.imagesProcessor = new d.ImagesProcessor(this);
            this.imagesSettings = new d.ImagesSettings(a);
            this.linesProcessor = new d.LinesProcessor(this);
            this.linesSettings = new d.LinesSettings(a);
            this.initialTouchZoom = 1;
            this.showDescriptionOnHover=!1;
            d.AmMap.base.construct.call(this, a);
            this.creditsPosition = "bottom-left";
            this.product = "ammap";
            this.areasClasses = {};
            d.applyTheme(this, a, this.cname)
        },
        initChart: function() {
            this.zoomInstantly=!0;
            var a =
            this.container;
            this.panRequired=!0;
            if (this.sizeChanged && d.hasSVG && this.chartCreated) {
                this.freeLabelsSet && this.freeLabelsSet.remove();
                this.freeLabelsSet = a.set();
                this.container.setSize(this.realWidth, this.realHeight);
                this.resizeMap();
                this.drawBackground();
                this.redrawLabels();
                this.drawTitles();
                this.processObjects();
                this.rescaleObjects();
                this.zoomControl.init(this, a);
                this.drawBg();
                var b = this.smallMap;
                b && b.init(this, a);
                (b = this.valueLegend) && b.init(this, a);
                this.sizeChanged=!1;
                this.zoomToLongLat(this.zLevelTemp,
                this.zLongTemp, this.zLatTemp, !0);
                this.previousWidth = this.realWidth;
                this.previousHeight = this.realHeight;
                this.updateSmallMap();
                this.linkSet.toFront();
                this.zoomControl.update && this.zoomControl.update()
            } else (d.AmMap.base.initChart.call(this), d.hasSVG) 
                ? (this.dataChanged && (this.parseData(), this.dispatchDataUpdated=!0, this.dataChanged=!1, a = this.legend) && (a.position = "absolute", a.invalidateSize()), this.createDescriptionsDiv(), this.svgAreas = [], this.svgAreasById = {}, this.drawChart()) : (this.chartDiv.style.textAlign =
                "", this.chartDiv.setAttribute("class", "ammapAlert"), this.chartDiv.innerHTML = this.svgNotSupported, this.fire({
                    type: "failed",
                    chart: this
                }))
        },
        storeTemp: function() {
            if (d.hasSVG && 0 < this.realWidth && 0 < this.realHeight) {
                var a = this.mapContainer.getBBox();
                0 < a.width && 0 < a.height && (a = this.zoomLongitude(), isNaN(a) || (this.zLongTemp = a), a = this.zoomLatitude(), isNaN(a) || (this.zLatTemp = a), a = this.zoomLevel(), isNaN(a) || (this.zLevelTemp = a))
            }
        },
        invalidateSize: function() {
            this.storeTemp();
            d.AmMap.base.invalidateSize.call(this)
        },
        validateSize: function() {
            this.storeTemp();
            d.AmMap.base.validateSize.call(this)
        },
        handleWheelReal: function(a) {
            if (!this.wheelBusy) {
                this.stopAnimation();
                var b = this.zoomLevel(), c = this.zoomControl, e = c.zoomFactor;
                this.wheelBusy=!0;
                a = d.fitToBounds(0 < a ? b * e : b / e, c.minZoomLevel, c.maxZoomLevel);
                e = this.mouseX / this.mapWidth;
                c = this.mouseY / this.mapHeight;
                e = (this.zoomX() - e) * (a / b) + e;
                b = (this.zoomY() - c) * (a / b) + c;
                this.zoomTo(a, e, b)
            }
        },
        addLegend: function(a, b) {
            a.position = "absolute";
            a.autoMargins=!1;
            a.valueWidth = 0;
            a.switchable =
            !1;
            d.AmMap.base.addLegend.call(this, a, b);
            void 0 === a.enabled && (a.enabled=!0);
            return a
        },
        handleLegendEvent: function() {},
        createDescriptionsDiv: function() {
            if (!this.descriptionsDiv) {
                var a = document.createElement("div"), b = a.style;
                b.position = "absolute";
                b.left = "0px";
                b.top = "0px";
                this.descriptionsDiv = a
            }
            this.containerDiv.appendChild(this.descriptionsDiv)
        },
        drawChart: function() {
            d.AmMap.base.drawChart.call(this);
            var a = this.dataProvider;
            this.dataProvider = a = d.extend(a, new d.MapData, !0);
            this.areasSettings = d.processObject(this.areasSettings,
            d.AreasSettings, this.theme);
            this.imagesSettings = d.processObject(this.imagesSettings, d.ImagesSettings, this.theme);
            this.linesSettings = d.processObject(this.linesSettings, d.LinesSettings, this.theme);
            var b = this.container;
            this.mapContainer && this.mapContainer.remove();
            this.mapContainer = b.set();
            this.graphsSet.push(this.mapContainer);
            var c;
            a.map && (c = d.maps[a.map]);
            a.mapVar && (c = a.mapVar);
            c ? (this.svgData = c.svg, this.getBounds(), this.buildEverything()) : (a = a.mapURL) && this.loadXml(a);
            this.balloonsSet.toFront()
        },
        drawBg: function() {
            var a = this;
            a.background.click(function() {
                a.handleBackgroundClick()
            });
            a.background.mouseover(function() {
                a.rollOutMapObject(a.previouslyHovered)
            })
        },
        buildEverything: function() {
            if (0 < this.realWidth && 0 < this.realHeight) {
                var a = this.container, b = this.dataProvider;
                this.projection || (this.projection = b.projection, this.projection || (this.projection = "equirectangular"));
                var c = this.projection;
                c && (this.projectionFunction = d[c]);
                this.projectionFunction || (this.projectionFunction = d.equirectangular);
                this.dpProjectionFunction =
                d[b.projection];
                this.dpProjectionFunction || (this.dpProjectionFunction = d.equirectangular);
                this.zoomControl = d.processObject(this.zoomControl, d.ZoomControl, this.theme);
                this.zoomControl.init(this, a);
                this.drawBg();
                this.buildSVGMap();
                this.projectionFunction && c != b.projection || this.forceNormalize ? (this.normalizeMap(), this.changeProjection()) : this.fixMapPosition();
                if (c = this.smallMap)
                    c = d.processObject(c, d.SmallMap, this.theme), c.init(this, a), this.smallMap = c;
                isNaN(b.zoomX) && isNaN(b.zoomY) && isNaN(b.zoomLatitude) &&
                isNaN(b.zoomLongitude) && (this.centerMap ? (c = this.xyToCoordinates(this.mapWidth / 2, this.mapHeight / 2), b.zoomLongitudeC = c.longitude, b.zoomLatitudeC = c.latitude) : (b.zoomX = 0, b.zoomY = 0), this.zoomInstantly=!0);
                this.selectObject(this.dataProvider);
                this.processAreas();
                if (b = this.valueLegend)
                    this.valueLegend = b = d.processObject(b, d.ValueLegend, this.theme), b.init(this, a);
                this.objectList && (a = this.objectList = d.processObject(this.objectList, d.ObjectList)) && (this.clearObjectList(), a.init(this));
                this.dispDUpd();
                this.updateSmallMap();
                this.linkSet.toFront()
            } else 
                this.cleanChart()
        },
        hideGroup: function(a) {
            this.showHideGroup(a, !1)
        },
        showGroup: function(a) {
            this.showHideGroup(a, !0)
        },
        showHideGroup: function(a, b) {
            this.showHideReal(this.imagesProcessor.allObjects, a, b);
            this.showHideReal(this.areasProcessor.allObjects, a, b);
            this.showHideReal(this.linesProcessor.allObjects, a, b)
        },
        showHideReal: function(a, b, c) {
            var e;
            for (e = 0; e < a.length; e++) {
                var d = a[e];
                if (d.groupId == b) {
                    var f = d.displayObject;
                    f && (c ? (d.hidden=!1, f.show()) : (d.hidden=!0, f.hide()))
                }
            }
        },
        update: function() {
            d.hasSVG &&
            (d.AmMap.base.update.call(this), this.zoomControl && this.zoomControl.update && this.zoomControl.update())
        },
        animateMap: function() {
            var a = this;
            a.totalFrames = a.zoomDuration * d.updateRate;
            a.totalFrames += 1;
            a.frame = 0;
            a.tweenPercent = 0;
            a.balloon.hide(0);
            setTimeout(function() {
                a.updateSize.call(a)
            }, 1E3 / d.updateRate)
        },
        updateSize: function() {
            var a = this, b = a.totalFrames;
            a.preventHover=!0;
            a.frame <= b ? (a.frame++, b = d.easeOutSine(0, a.frame, 0, 1, b), 1 <= b ? (b = 1, a.preventHover=!1, a.wheelBusy=!1) : window.requestAnimationFrame ? window.requestAnimationFrame(function() {
                a.updateSize.call(a)
            }) :
            setTimeout(function() {
                a.updateSize.call(a)
            }, 1E3 / d.updateRate), .8 < b && (a.preventHover=!1)) : (b = 1, a.preventHover=!1, a.wheelBusy=!1);
            a.tweenPercent = b;
            a.rescaleMapAndObjects()
        },
        rescaleMapAndObjects: function() {
            var a = this.initialScale, b = this.initialX, c = this.initialY, e = this.tweenPercent, a = a + (this.finalScale - a) * e;
            this.mapContainer.translate(b + (this.finalX - b) * e, c + (this.finalY - c) * e, a, !0);
            if (this.areasSettings.adjustOutlineThickness) {
                for (var b = this.svgAreas, d = 0; d < b.length; d++)(c = b[d]) 
                    && c.setAttr("stroke-width",
                    this.areasSettings.outlineThickness / a / this.mapScale);
                if (b = this.dataProvider.areas)
                    for (d = 0; d < b.length; d++) {
                        var c = b[d], f = c.displayObject;
                        f && f.setAttr("stroke-width", c.outlineThicknessReal / a / this.mapScale)
                    }
                }
            this.rescaleObjects();
            this.positionChanged();
            this.updateSmallMap();
            1 == e && this.fire({
                type: "zoomCompleted",
                chart: this
            })
        },
        updateSmallMap: function() {
            this.smallMap && this.smallMap.update()
        },
        rescaleObjects: function() {
            var a = this.mapContainer.scale, b = this.imagesProcessor.objectsToResize, c;
            for (c = 0; c < b.length; c++) {
                var e =
                b[c].image;
                e.translate(e.x, e.y, b[c].scale / a, !0)
            }
            b = this.imagesProcessor.labelsToReposition;
            for (c = 0; c < b.length; c++)
                e = b[c], e.imageLabel && this.imagesProcessor.positionLabel(e.imageLabel, e, e.labelPositionReal);
            b = this.linesProcessor;
            if (e = b.linesToResize)
                for (c = 0; c < e.length; c++) {
                    var d = e[c];
                    d.line.setAttr("stroke-width", d.thickness / a)
                }
            b = b.objectsToResize;
            for (c = 0; c < b.length; c++)
                e = b[c], e.translate(e.x, e.y, 1 / a, !0)
        },
        handleTouchEnd: function(a) {
            this.initialDistance = NaN;
            this.mouseIsDown = this.isDragging=!1;
            d.AmMap.base.handleTouchEnd.call(this,
            a)
        },
        handleMouseDown: function(a) {
            d.resetMouseOver();
            this.mouseIsDown = this.mouseIsOver=!0;
            this.balloon.hide(0);
            a && this.mouseIsOver && a.preventDefault && this.panEventsEnabled && a.preventDefault();
            if (this.chartCreated&&!this.preventHover && (this.initialTouchZoom = this.zoomLevel(), this.dragMap && (this.stopAnimation(), this.mapContainerClickX = this.mapContainer.x, this.mapContainerClickY = this.mapContainer.y), a || (a = window.event), a.shiftKey&&!0 === this.developerMode && this.getDevInfo(), a && a.touches)) {
                var b = this.mouseX,
                c = this.mouseY, e = a.touches.item(1);
                e && this.panEventsEnabled && this.boundingRect && (a = e.clientX - this.boundingRect.left, e = e.clientY - this.boundingRect.top, this.middleXP = (b + (a - b) / 2) / this.realWidth, this.middleYP = (c + (e - c) / 2) / this.realHeight, this.initialDistance = Math.sqrt(Math.pow(a - b, 2) + Math.pow(e - c, 2)))
            }
        },
        stopDrag: function() {
            this.isDragging=!1
        },
        handleReleaseOutside: function() {
            if (d.isModern) {
                var a = this;
                d.AmMap.base.handleReleaseOutside.call(a);
                a.mouseIsDown=!1;
                setTimeout(function() {
                    a.resetPinch.call(a)
                }, 100);
                if (!a.preventHover) {
                    a.stopDrag();
                    var b = a.zoomControl;
                    b && b.draggerUp && b.draggerUp();
                    a.mapWasDragged=!1;
                    var b = a.mapContainer, c = a.mapContainerClickX, e = a.mapContainerClickY;
                    isNaN(c) || isNaN(e) ||!(2 < Math.abs(b.x - c) || Math.abs(b.y - e)) || (a.mapWasDragged=!0, b = {
                        type: "dragCompleted",
                        zoomX: a.zoomX(),
                        zoomY: a.zoomY(),
                        zoomLevel: a.zoomLevel(),
                        chart: a
                    }, a.fire(b));
                    (a.mouseIsOver&&!a.mapWasDragged&&!a.skipClick || a.wasTouched && 4 > Math.abs(a.mouseX - a.tmx) && 4 > Math.abs(a.mouseY - a.tmy)) && a.fire({
                        type: "click",
                        x: a.mouseX,
                        y: a.mouseY,
                        chart: a
                    });
                    a.mapContainerClickX = NaN;
                    a.mapContainerClickY = NaN;
                    a.objectWasClicked=!1;
                    a.zoomOnDoubleClick && a.mouseIsOver && (b = (new Date).getTime(), 200 > b - a.previousClickTime && 40 < b - a.previousClickTime && a.doDoubleClickZoom(), a.previousClickTime = b)
                }
                a.wasTouched=!1
            }
        },
        resetPinch: function() {
            this.mapWasPinched=!1
        },
        handleMouseMove: function(a) {
            var b = this;
            d.AmMap.base.handleMouseMove.call(b, a);
            if (!a ||!a.touches ||!b.tapToActivate || b.tapped) {
                b.panEventsEnabled && b.mouseIsOver && a && a.preventDefault && a.preventDefault();
                var c = b.previuosMouseX, e = b.previuosMouseY, g = b.mouseX, f = b.mouseY, h = b.zoomControl;
                isNaN(c) && (c = g);
                isNaN(e) && (e = f);
                b.mouse2X = NaN;
                b.mouse2Y = NaN;
                a && a.touches && (a = a.touches.item(1)) && b.panEventsEnabled && b.boundingRect && (b.mouse2X = a.clientX - b.boundingRect.left, b.mouse2Y = a.clientY - b.boundingRect.top);
                if (a = b.mapContainer) {
                    var k = b.mouse2X, l = b.mouse2Y;
                    b.pinchTO && clearTimeout(b.pinchTO);
                    b.pinchTO = setTimeout(function() {
                        b.resetPinch.call(b)
                    }, 1E3);
                    var m = b.realHeight, n = b.realWidth, q = b.mapWidth, t = b.mapHeight;
                    b.mouseIsDown &&
                    b.dragMap && (5 < Math.abs(b.previuosMouseX - b.mouseX) || 5 < Math.abs(b.previuosMouseY - b.mouseY)) && (b.isDragging=!0);
                    if (!isNaN(k)) {
                        b.stopDrag();
                        var r = Math.sqrt(Math.pow(k - g, 2) + Math.pow(l - f, 2)), p = b.initialDistance;
                        isNaN(p) && (p = Math.sqrt(Math.pow(k - g, 2) + Math.pow(l - f, 2)));
                        if (!isNaN(p)) {
                            var k = b.initialTouchZoom * r / p, k = d.fitToBounds(k, h.minZoomLevel, h.maxZoomLevel), h = b.zoomLevel(), p = b.middleXP, l = b.middleYP, r = m / t, u = n / q, p = (b.zoomX() - p * u) * (k / h) + p * u, l = (b.zoomY() - l * r) * (k / h) + l * r;
                            .1 < Math.abs(k - h) && (b.zoomTo(k, p, l, !0),
                            b.mapWasPinched=!0, clearTimeout(b.pinchTO))
                        }
                    }
                    k = a.scale;
                    b.isDragging && (b.balloon.hide(0), b.positionChanged(), c = a.x + (g - c), e = a.y + (f - e), b.preventDragOut && (t =- t * k + m / 2, m/=2, c = d.fitToBounds(c, - q * k + n / 2, n / 2), e = d.fitToBounds(e, t, m)), isNaN(c) || isNaN(e) || (a.translate(c, e, k, !0), b.updateSmallMap()));
                    b.previuosMouseX = g;
                    b.previuosMouseY = f
                }
            }
        },
        //Selected object functions
        selectObject: function(a, b) {
            var c = this;
            a || (a = c.dataProvider);
            a.isOver=!1;
            var e = a.linkToObject;
            d.isString(e) && (e = c.getObjectById(e));
            a.useTargetsZoomValues && e && (a.zoomX = e.zoomX,
            a.zoomY = e.zoomY, a.zoomLatitude = e.zoomLatitude, a.zoomLongitude = e.zoomLongitude, a.zoomLevel = e.zoomLevel);
            var g = c.selectedObject;
            g && c.returnInitialColor(g);
            c.selectedObject = a;
            var f=!1, h, k;
            "MapArea" == a.objectType && (a.autoZoomReal && (f=!0), h = c.areasSettings.selectedOutlineColor, k = c.areasSettings.selectedOutlineThickness);
            if (e&&!f && (d.isString(e) && (e = c.getObjectById(e)), isNaN(a.zoomLevel) && isNaN(a.zoomX) && isNaN(a.zoomY))) {
                if (c.extendMapData(e))
                    return;
                c.selectObject(e);
                return 
            }
            c.allowMultipleDescriptionWindows ||
            c.closeAllDescriptions();
            clearTimeout(c.selectedObjectTimeOut);
            clearTimeout(c.processObjectsTimeOut);
            e = c.zoomDuration;
            !f && isNaN(a.zoomLevel) && isNaN(a.zoomX) && isNaN(a.zoomY) ? (c.showDescriptionAndGetUrl(), b || c.processObjects()) : (c.selectedObjectTimeOut = setTimeout(function() {
                c.showDescriptionAndGetUrl.call(c)
            }, 1E3 * e + 200), c.showObjectsAfterZoom) ? b || (c.processObjectsTimeOut = setTimeout(function() {
                c.processObjects.call(c)
            }, 1E3 * e + 200)) : b || c.processObjects();
            e = a.displayObject;
            f = a.selectedColorReal;
            "MapImage" ==
            a.objectType && (h = c.imagesSettings.selectedOutlineColor, k = c.imagesSettings.selectedOutlineThickness, e = a.image);
            if (e) {
                if (d.setCN(c, e, "selected-object"), a.bringForwardOnHover && e.toFront(), !a.preserveOriginalAttributes) {
                    e.setAttr("stroke", a.outlineColorReal);
                    void 0 !== f && e.setAttr("fill", f);
                    void 0 !== h && e.setAttr("stroke", h);
                    void 0 !== k && e.setAttr("stroke-width", k);
                    if ("MapLine" == a.objectType) {
                        var l = a.lineSvg;
                        l && l.setAttr("stroke", f);
                        if (l = a.arrowSvg)
                            l.setAttr("fill", f), l.setAttr("stroke", f)
                        }
                    if (l = a.imageLabel) {
                        var m =
                        a.selectedLabelColorReal;
                        void 0 !== m && l.setAttr("fill", m)
                    }
                    a.selectable || (e.setAttr("cursor", "default"), l && l.setAttr("cursor", "default"))
                }
            } else 
                c.returnInitialColorReal(a);
            if (e = a.groupId)
                for (l = a.groupArray, l || (l = c.getGroupById(e), a.groupArray = l), m = 0; m < l.length; m++) {
                    var n = l[m];
                    n.isOver=!1;
                    e = n.displayObject;
                    "MapImage" == n.objectType && (e = n.image);
                    if (e) {
                        var q = n.selectedColorReal;
                        void 0 !== q && e.setAttr("fill", q);
                        void 0 !== h && e.setAttr("stroke", h);
                        void 0 !== k && e.setAttr("stroke-width", k);
                        "MapLine" == n.objectType &&
                        ((e = n.lineSvg) && e.setAttr("stroke", f), e = n.arrowSvg) && (e.setAttr("fill", f), e.setAttr("stroke", f))
                    }
                }
            c.zoomToSelectedObject();
            g != a && c.fire({
                type: "selectedObjectChanged",
                chart: c
            })
        },

        //color functions
        returnInitialColor: function(a, b) {
            this.returnInitialColorReal(a);
            b && (a.isFirst=!1);
            if (this.selectedObject.bringForwardOnHover) {
                var c = this.selectedObject.displayObject;
                c && c.toFront()
            }
            if (c = a.groupId) {
                var c = this.getGroupById(c), e;
                for (e = 0; e < c.length; e++)
                    this.returnInitialColorReal(c[e]), b && (c[e].isFirst=!1)
            }
        },
        closeAllDescriptions: function() {
            this.descriptionsDiv.innerHTML =
            ""
        },
        returnInitialColorReal: function(a) {
            a.isOver=!1;
            var b = a.displayObject;
            if (b) {
                b.toPrevious();
                if ("MapImage" == a.objectType) {
                    var c = a.tempScale;
                    isNaN(c) || b.translate(b.x, b.y, c, !0);
                    a.tempScale = NaN;
                    b = a.image
                }
                c = a.colorReal;
                if ("MapLine" == a.objectType) {
                    var e = a.lineSvg;
                    e && e.setAttr("stroke", c);
                    if (e = a.arrowSvg)
                        e.setAttr("fill", c), e.setAttr("stroke", c)
                    }
                var e = a.alphaReal, d = a.outlineAlphaReal, f = a.outlineThicknessReal, h = a.outlineColorReal;
                if (a.showAsSelected) {
                    var c = a.selectedColorReal, k, l;
                    "MapImage" == a.objectType &&
                    (k = this.imagesSettings.selectedOutlineColor, l = this.imagesSettings.selectedOutlineThickness);
                    "MapArea" == a.objectType && (k = this.areasSettings.selectedOutlineColor, l = this.areasSettings.selectedOutlineThickness);
                    void 0 !== k && (h = k);
                    void 0 !== l && (f = l)
                }
                "bubble" == a.type && (c = void 0);
                void 0 !== c && b.setAttr("fill", c);
                if (k = a.image)
                    k.setAttr("fill", c), k.setAttr("stroke", h), k.setAttr("stroke-width", f), k.setAttr("fill-opacity", e), k.setAttr("stroke-opacity", d);
                "MapArea" == a.objectType && (c = 1, this.areasSettings.adjustOutlineThickness &&
                (c = this.zoomLevel() * this.mapScale), b.setAttr("stroke", h), b.setAttr("stroke-width", f / c), b.setAttr("fill-opacity", e), b.setAttr("stroke-opacity", d));
                (c = a.pattern) && b.pattern(c, this.mapScale, this.path);
                (b = a.imageLabel)&&!a.labelInactive && (a.showAsSelected && void 0 !== a.selectedLabelColor ? b.setAttr("fill", a.selectedLabelColor) : b.setAttr("fill", a.labelColorReal))
            }
        },
        zoomToRectangle: function(a, b, c, e) {
            var g = this.realWidth, f = this.realHeight, h = this.mapSet.scale, k = this.zoomControl, g = d.fitToBounds(c / g > e / f ? .8 * g /
            (c * h) : .8 * f / (e * h), k.minZoomLevel, k.maxZoomLevel);
            this.zoomToMapXY(g, (a + c / 2) * h, (b + e / 2) * h)
        },
        zoomToLatLongRectangle: function(a, b, c, e) {
            var g = this.dataProvider, f = this.zoomControl, h = Math.abs(c - a), k = Math.abs(b - e), l = Math.abs(g.rightLongitude - g.leftLongitude), g = Math.abs(g.topLatitude - g.bottomLatitude), f = d.fitToBounds(h / l > k / g ? .8 * l / h : .8 * g / k, f.minZoomLevel, f.maxZoomLevel);
            this.zoomToLongLat(f, a + (c - a) / 2, e + (b - e) / 2)
        },
        getGroupById: function(a) {
            var b = [];
            this.getGroup(this.imagesProcessor.allObjects, a, b);
            this.getGroup(this.linesProcessor.allObjects,
            a, b);
            this.getGroup(this.areasProcessor.allObjects, a, b);
            return b
        },
        zoomToGroup: function(a) {
            a = "object" == typeof a ? a : this.getGroupById(a);
            var b, c, e, d, f;
            for (f = 0; f < a.length; f++) {
                var h = a[f].displayObject;
                if (h) {
                    var k = h.getBBox(), h = k.y, l = k.y + k.height, m = k.x, k = k.x + k.width;
                    if (h < b || isNaN(b))
                        b = h;
                    if (l > d || isNaN(d))
                        d = l;
                    if (m < c || isNaN(c))
                        c = m;
                    if (k > e || isNaN(e))
                        e = k
                }
            }
            c += this.diffX;
            e += this.diffX;
            d += this.diffY;
            b += this.diffY;
            this.zoomToRectangle(c, b, e - c, d - b)
        },
        getGroup: function(a, b, c) {
            if (a) {
                var e;
                for (e = 0; e < a.length; e++) {
                    var d =
                    a[e];
                    d.groupId == b && c.push(d)
                }
            }
        },
        zoomToStageXY: function(a, b, c, e) {
            if (!this.objectWasClicked) {
                var g = this.zoomControl;
                a = d.fitToBounds(a, g.minZoomLevel, g.maxZoomLevel);
                var g = this.zoomLevel(), f = this.mapSet.getBBox();
                b = this.xyToCoordinates((b - this.mapContainer.x) / g - f.x * this.mapScale, (c - this.mapContainer.y) / g - f.y * this.mapScale);
                this.zoomToLongLat(a, b.longitude, b.latitude, e)
            }
        },
        zoomToLongLat: function(a, b, c, d) {
            b = this.coordinatesToXY(b, c);
            this.zoomToMapXY(a, b.x, b.y, d)
        },
        zoomToMapXY: function(a, b, c, d) {
            var g = this.mapWidth,
            f = this.mapHeight;
            this.zoomTo(a, - (b / g) * a + this.realWidth / g / 2, - (c / f) * a + this.realHeight / f / 2, d)
        },
        zoomToObject: function(a) {
            if (a) {
                var b = a.zoomLatitude, c = a.zoomLongitude;
                isNaN(a.zoomLatitudeC) || (b = a.zoomLatitudeC);
                isNaN(a.zoomLongitudeC) || (c = a.zoomLongitudeC);
                var e = a.zoomLevel, g = this.zoomInstantly, f = a.zoomX, h = a.zoomY, k = this.realWidth, l = this.realHeight;
                isNaN(e) || (isNaN(b) || isNaN(c) ? this.zoomTo(e, f, h, g) : this.zoomToLongLat(e, c, b, g));
                this.zoomInstantly=!1;
                "MapImage" == a.objectType && isNaN(a.zoomX) && isNaN(a.zoomY) &&
                isNaN(a.zoomLatitude) && isNaN(a.zoomLongitude)&&!isNaN(a.latitude)&&!isNaN(a.longitude) && this.zoomToLongLat(a.zoomLevel, a.longitude, a.latitude);
                "MapArea" == a.objectType && (g = a.displayObject.getBBox(), f = this.mapScale, b = (g.x + this.diffX) * f, c = (g.y + this.diffY) * f, e = g.width * f, g = g.height * f, k = a.autoZoomReal && isNaN(a.zoomLevel) ? e / k > g / l ? .8 * k / e : .8 * l / g : a.zoomLevel, l = this.zoomControl, k = d.fitToBounds(k, l.minZoomLevel, l.maxZoomLevel), isNaN(a.zoomX) && isNaN(a.zoomY) && isNaN(a.zoomLatitude) && isNaN(a.zoomLongitude) && this.zoomToMapXY(k,
                b + e / 2, c + g / 2));
                this.zoomControl.update()
            }
        },
        zoomToSelectedObject: function() {
            this.zoomToObject(this.selectedObject)
        },
        zoomTo: function(a, b, c, e) {
            var g = this.zoomControl;
            a = d.fitToBounds(a, g.minZoomLevel, g.maxZoomLevel);
            g = this.zoomLevel();
            isNaN(b) && (b = this.realWidth / this.mapWidth, b = (this.zoomX() - .5 * b) * (a / g) + .5 * b);
            isNaN(c) && (c = this.realHeight / this.mapHeight, c = (this.zoomY() - .5 * c) * (a / g) + .5 * c);
            this.stopAnimation();
            isNaN(a) || (g = this.mapContainer, this.initialX = g.x, this.initialY = g.y, this.initialScale = g.scale, this.finalX =
            this.mapWidth * b, this.finalY = this.mapHeight * c, this.finalScale = a, this.finalX != this.initialX || this.finalY != this.initialY || this.finalScale != this.initialScale ? e ? (this.tweenPercent = 1, this.rescaleMapAndObjects(), this.wheelBusy=!1) : this.animateMap() : this.wheelBusy=!1)
        },
        loadXml: function(a) {
            var b;
            window.XMLHttpRequest && (b = new XMLHttpRequest);
            b.overrideMimeType && b.overrideMimeType("text/xml");
            b.open("GET", a, !1);
            b.send();
            this.parseXMLObject(b.responseXML);
            this.svgData && this.buildEverything()
        },
        stopAnimation: function() {
            this.frame =
            this.totalFrames
        },
        processObjects: function() {
            var a = this.selectedObject;
            if (0 < a.images.length || 0 < a.areas.length || 0 < a.lines.length || a == this.dataProvider) {
                var b = this.container, c = this.stageImagesContainer;
                c && c.remove();
                this.stageImagesContainer = c = b.set();
                this.trendLinesSet.push(c);
                var d = this.stageLinesContainer;
                d && d.remove();
                this.stageLinesContainer = d = b.set();
                this.trendLinesSet.push(d);
                var g = this.mapImagesContainer;
                g && g.remove();
                this.mapImagesContainer = g = b.set();
                this.mapContainer.push(g);
                var f = this.mapLinesContainer;
                f && f.remove();
                this.mapLinesContainer = f = b.set();
                this.mapContainer.push(f);
                this.linesAboveImages ? (g.toFront(), c.toFront(), f.toFront(), d.toFront()) : (f.toFront(), d.toFront(), g.toFront(), c.toFront());
                a && (this.imagesProcessor.reset(), this.linesProcessor.reset(), this.linesAboveImages ? (this.imagesProcessor.process(a), this.linesProcessor.process(a)) : (this.linesProcessor.process(a), this.imagesProcessor.process(a)));
                this.rescaleObjects()
            }
        },
        processAreas: function() {
            this.areasProcessor.process(this.dataProvider)
        },
        buildSVGMap: function() {
            d.remove(this.mapSet);
            var a = this.svgData.g.path, b = this.container, c = b.set();
            this.svgAreas = [];
            this.svgAreasById = {};
            void 0 === a.length && (a = [a]);
            var e;
            for (e = 0; e < a.length; e++) {
                var g = a[e], f = g.d, h = g.title;
                g.titleTr && (h = g.titleTr);
                var k = b.path(f);
                k.id = g.id;
                if (this.areasSettings.preserveOriginalAttributes) {
                    k.customAttr = {};
                    for (var l in g)
                        "d" != l && "id" != l && "title" != l && (k.customAttr[l] = g[l])
                    }
                k.path = f;
                this.svgAreasById[g.id] = {
                    area: k,
                    title: h,
                    className: g["class"]
                };
                this.svgAreas.push(k);
                c.push(k)
            }
            this.mapSet =
            c;
            this.mapContainer.push(c);
            this.resizeMap()
        },
        centerAlign: function() {},
        setProjection: function(a) {
            this.projection = a;
            this.chartCreated=!1;
            this.buildEverything()
        },
        addObjectEventListeners: function(a, b) {
            var c = this;
            a.mousedown(function(a) {
                c.mouseDownMapObject(b, a)
            }).mouseup(function(a) {
                c.clickMapObject(b, a)
            }).mouseover(function(a) {
                c.balloonX = NaN;
                c.rollOverMapObject(b, !0, a)
            }).mouseout(function(a) {
                c.balloonX = NaN;
                c.rollOutMapObject(b, a)
            }).touchend(function(a) {
                4 > Math.abs(c.mouseX - c.tmx) && 4 > Math.abs(c.mouseY -
                c.tmy) && (c.tapped=!0);
                c.tapToActivate&&!c.tapped || c.mapWasDragged || c.mapWasPinched || (c.balloonX = NaN, c.rollOverMapObject(b, !0, a), c.clickMapObject(b, a))
            }).touchstart(function(a) {
                c.tmx = c.mouseX;
                c.tmy = c.mouseY;
                c.mouseDownMapObject(b, a)
            })
        },
        checkIfSelected: function(a) {
            var b = this.selectedObject;
            if (b == a)
                return !0;
            if (b = b.groupId) {
                var b = this.getGroupById(b), c;
                for (c = 0; c < b.length; c++)
                    if (b[c] == a)
                        return !0
            }
            return !1
        },
        clearMap: function() {
            this.chartDiv.innerHTML = "";
            this.clearObjectList()
        },
        clearObjectList: function() {
            var a =
            this.objectList;
            a && a.div && (a.div.innerHTML = "")
        },
        checkIfLast: function(a) {
            if (a) {
                var b = a.parentNode;
                if (b && b.lastChild == a)
                    return !0
            }
            return !1
        },
        showAsRolledOver: function(a) {
            var b = a.displayObject;
            if (!a.showAsSelected && b&&!a.isOver) {
                b.node.onmouseout = function() {};
                b.node.onmouseover = function() {};
                b.node.onclick = function() {};
                !a.isFirst && a.bringForwardOnHover && (b.toFront(), a.isFirst=!0);
                var c = a.rollOverColorReal, e;
                a.preserveOriginalAttributes && (c = void 0);
                void 0 == c && (isNaN(a.rollOverBrightnessReal) || (c = d.adjustLuminosity(a.colorReal,
                a.rollOverBrightnessReal / 100)));
                if (void 0 != c)
                    if ("MapImage" == a.objectType)(e = a.image) && e.setAttr("fill", c);
                else if ("MapLine" == a.objectType) {
                    if ((e = a.lineSvg) && e.setAttr("stroke", c), e = a.arrowSvg)
                        e.setAttr("fill", c), e.setAttr("stroke", c)
                } else 
                    b.setAttr("fill", c);
                (c = a.imageLabel)&&!a.labelInactive && (e = a.labelRollOverColorReal, void 0 != e && c.setAttr("fill", e));
                c = a.rollOverOutlineColorReal;
                void 0 != c && ("MapImage" == a.objectType ? (e = a.image) && e.setAttr("stroke", c) : b.setAttr("stroke", c));
                "MapImage" == a.objectType ?
                (c = this.imagesSettings.rollOverOutlineThickness, (e = a.image) && (isNaN(c) || e.setAttr("stroke-width", c))) : (c = this.areasSettings.rollOverOutlineThickness, isNaN(c) || b.setAttr("stroke-width", c));
                if ("MapArea" == a.objectType) {
                    c = this.areasSettings;
                    e = a.rollOverAlphaReal;
                    isNaN(e) || b.setAttr("fill-opacity", e);
                    e = c.rollOverOutlineAlpha;
                    isNaN(e) || b.setAttr("stroke-opacity", e);
                    e = 1;
                    this.areasSettings.adjustOutlineThickness && (e = this.zoomLevel() * this.mapScale);
                    var g = c.rollOverOutlineThickness;
                    isNaN(g) || b.setAttr("stroke-width",
                    g / e);
                    (c = c.rollOverPattern) && b.pattern(c, this.mapScale, this.path)
                }
                "MapImage" == a.objectType && (c = a.rollOverScaleReal, isNaN(c) || 1 == c || (e = b.scale, isNaN(e) && (e = 1), a.tempScale = e, b.translate(b.x, b.y, e * c, !0)));
                this.useHandCursorOnClickableOjects && this.checkIfClickable(a) && b.setAttr("cursor", "pointer");
                a.mouseEnabled && this.addObjectEventListeners(b, a);
                a.isOver=!0
            }
        },
        rollOverMapObject: function(a, b, c) {
            if (this.chartCreated) {
                this.handleMouseMove();
                var d = this.previouslyHovered;
                d && d != a ? (!1 === this.checkIfSelected(d) &&
                (this.returnInitialColor(d, !0), this.previouslyHovered = null), this.balloon.hide(0)) : clearTimeout(this.hoverInt);
                if (!this.preventHover) {
                    if (!1 === this.checkIfSelected(a)) {
                        if (d = a.groupId) {
                            var d = this.getGroupById(d), g;
                            for (g = 0; g < d.length; g++)
                                d[g] != a && this.showAsRolledOver(d[g])
                            }
                        this.showAsRolledOver(a)
                    } else (d = a.displayObject) 
                        && (this.allowClickOnSelectedObject ? d.setAttr("cursor", "pointer") : d.setAttr("cursor", "default"));
                    this.showDescriptionOnHover ? this.showDescription(a) : !this.showBalloonOnSelectedObject &&
                    this.checkIfSelected(a) ||!1 === b || (g = this.balloon, this.balloon.fixedPosition=!1, b = a.colorReal, d = "", void 0 !== b && this.useObjectColorForBalloon || (b = g.fillColor), (g = a.balloonTextReal) && (d = this.formatString(g, a)), this.balloonLabelFunction && (d = this.balloonLabelFunction(a, this)), "MapArea" != a.objectType && (this.balloonX = NaN), d && "" !== d && this.showBalloon(d, b, !1, this.balloonX, this.balloonY));
                    this.fire({
                        type: "rollOverMapObject",
                        mapObject: a,
                        chart: this,
                        event: c
                    });
                    this.previouslyHovered = a
                }
            }
        },
        longitudeToX: function(a) {
            return (this.longitudeToCoordinate(a) +
            this.diffX * this.mapScale) * this.zoomLevel() + this.mapContainer.x
        },
        latitudeToY: function(a) {
            return (this.latitudeToCoordinate(a) + this.diffY * this.mapScale) * this.zoomLevel() + this.mapContainer.y
        },
        latitudeToStageY: function(a) {
            return this.latitudeToCoordinate(a) * this.zoomLevel() + this.mapContainer.y + this.diffY * this.mapScale
        },
        longitudeToStageX: function(a) {
            return this.longitudeToCoordinate(a) * this.zoomLevel() + this.mapContainer.x + this.diffX * this.mapScale
        },
        stageXToLongitude: function(a) {
            a = (a - this.mapContainer.x) /
            this.zoomLevel();
            return this.coordinateToLongitude(a)
        },
        stageYToLatitude: function(a) {
            a = (a - this.mapContainer.y) / this.zoomLevel();
            return this.coordinateToLatitude(a)
        },
        rollOutMapObject: function(a, b) {
            this.hideBalloon();
            a && this.chartCreated && a.isOver && (this.checkIfSelected(a) || this.returnInitialColor(a), this.fire({
                type: "rollOutMapObject",
                mapObject: a,
                chart: this,
                event: b
            }))
        },
        formatString: function(a, b) {
            var c = this.nf, e = this.pf, g = b.title;
            b.titleTr && (g = b.titleTr);
            void 0 == g && (g = "");
            var f = b.value, f = isNaN(f) ? "":
            d.formatNumber(f, c), c = b.percents, c = isNaN(c) ? "": d.formatNumber(c, e), e = b.description;
            void 0 == e && (e = "");
            var h = b.customData;
            void 0 == h && (h = "");
            return a = d.massReplace(a, {
                "[[title]]": g,
                "[[value]]": f,
                "[[percent]]": c,
                "[[description]]": e,
                "[[customData]]": h
            })
        },
        //MOUSEDOWN FUNCTIONS YASSS
        mouseDownMapObject: function(a, b) {
            console.log(a.id); //a.id is the name of the territory
            this.fire({
                type: "mouseDownMapObject",
                mapObject: a,
                chart: this,
                event: b
            })
        },
        clickMapObject: function(a, b) {
            var c = this;
            b && (b.touches || c.hideBalloon());
            if (c.chartCreated&&!c.preventHover && c.checkTouchDuration()&&!c.mapWasDragged &&
            c.checkIfClickable(a)&&!c.mapWasPinched) {
                c.selectObject(a);
                var d = c.zoomLevel(), g = c.mapSet.getBBox(), d = c.xyToCoordinates((c.mouseX - c.mapContainer.x) / d - g.x * c.mapScale, (c.mouseY - c.mapContainer.y) / d - g.y * c.mapScale);
                c.clickLatitude = d.latitude;
                c.clickLongitude = d.longitude;
                b && b.touches && setTimeout(function() {
                    c.showBalloonAfterZoom.call(c)
                }, 1E3 * c.zoomDuration);
                c.fire({
                    type: "clickMapObject",
                    mapObject: a,
                    chart: c,
                    event: b
                });
                c.objectWasClicked=!0
            }
        },
        showBalloonAfterZoom: function() {
            this.balloonX = this.longitudeToX(this.clickLongitude);
            this.balloonY = this.latitudeToY(this.clickLatitude);
            this.rollOverMapObject(this.selectedObject, !0)
        },
        checkIfClickable: function(a) {
            var b = this.allowClickOnSelectedObject;
            return this.selectedObject == a && b?!0 : this.selectedObject != a || b?!0 === a.selectable || "MapArea" == a.objectType && a.autoZoomReal || a.url || a.linkToObject || 0 < a.images.length || 0 < a.lines.length ||!isNaN(a.zoomLevel) ||!isNaN(a.zoomX) ||!isNaN(a.zoomY) || a.description?!0 : !1 : !1
        },
        resizeMap: function() {
            var a = this.mapSet;
            if (a) {
                var b = 1, c = a.getBBox(), d = this.realWidth,
                g = this.realHeight, f = c.width, c = c.height;
                this.fitMapToContainer && (b = f / d > c / g ? d / f : g / c);
                a.translate(0, 0, b, !0);
                this.mapScale = b;
                this.mapHeight = c * b;
                this.mapWidth = f * b
            }
        },
        zoomIn: function() {
            var a = this.zoomLevel() * this.zoomControl.zoomFactor;
            this.zoomTo(a)
        },
        zoomOut: function() {
            var a = this.zoomLevel() / this.zoomControl.zoomFactor;
            this.zoomTo(a)
        },
        moveLeft: function() {
            var a = this.zoomX() + this.zoomControl.panStepSize;
            this.zoomTo(this.zoomLevel(), a, this.zoomY())
        },
        moveRight: function() {
            var a = this.zoomX() - this.zoomControl.panStepSize;
            this.zoomTo(this.zoomLevel(), a, this.zoomY())
        },
        moveUp: function() {
            var a = this.zoomY() + this.zoomControl.panStepSize;
            this.zoomTo(this.zoomLevel(), this.zoomX(), a)
        },
        moveDown: function() {
            var a = this.zoomY() - this.zoomControl.panStepSize;
            this.zoomTo(this.zoomLevel(), this.zoomX(), a)
        },
        zoomX: function() {
            return this.mapSet ? Math.round(1E4 * this.mapContainer.x / this.mapWidth) / 1E4 : NaN
        },
        zoomY: function() {
            return this.mapSet ? Math.round(1E4 * this.mapContainer.y / this.mapHeight) / 1E4 : NaN
        },
        //THIS CONTROLS HOME BUTTON FUNCTIONALITY
        goHome: function() {
            this.selectObject(this.dataProvider);
            this.fire({
                type: "homeButtonClicked",
                chart: this
            })
        },
        zoomLevel: function() {
            return Math.round(1E5 * this.mapContainer.scale) / 1E5
        },
        showDescriptionAndGetUrl: function() {
            var a = this.selectedObject;
            if (a) {
                this.showDescription();
                var b = a.url;
                if (b)
                    d.getURL(b, a.urlTarget);
                else if (b = a.linkToObject) {
                    if (d.isString(b)) {
                        var c = this.getObjectById(b);
                        if (c) {
                            this.selectObject(c);
                            return 
                        }
                    }
                    b && a.passZoomValuesToTarget && (b.zoomLatitude = this.zoomLatitude(), b.zoomLongitude = this.zoomLongitude(), b.zoomLevel = this.zoomLevel());
                    this.extendMapData(b) ||
                    this.selectObject(b)
                }
            }
        },
        extendMapData: function(a) {
            var b = a.objectType;
            if ("MapImage" != b && "MapArea" != b && "MapLine" != b)
                return d.extend(a, new d.MapData, !0), this.dataProvider = a, this.zoomInstantly=!0, this.validateData(), !0
        },
        showDescription: function(a) {
            a || (a = this.selectedObject);
            this.allowMultipleDescriptionWindows || this.closeAllDescriptions();
            if (a.description) {
                var b = a.descriptionWindow;
                b && b.close();
                b = new d.DescriptionWindow;
                a.descriptionWindow = b;
                var c = a.descriptionWindowWidth, e = a.descriptionWindowHeight,
                g = a.descriptionWindowLeft, f = a.descriptionWindowTop, h = a.descriptionWindowRight, k = a.descriptionWindowBottom;
                isNaN(h) || (g = this.realWidth - h);
                isNaN(k) || (f = this.realHeight - k);
                var l = a.descriptionWindowX;
                isNaN(l) || (g = l);
                l = a.descriptionWindowY;
                isNaN(l) || (f = l);
                isNaN(g) && (g = this.mouseX, g = g > this.realWidth / 2 ? g - c - 20 : g + 20);
                isNaN(f) && (f = this.mouseY);
                b.maxHeight = e;
                l = a.title;
                a.titleTr && (l = a.titleTr);
                b.show(this, this.descriptionsDiv, a.description, l);
                a = b.div.style;
                a.position = "absolute";
                a.width = c + "px";
                a.maxHeight = e + "px";
                isNaN(k) || (f -= b.div.offsetHeight);
                isNaN(h) || (g -= b.div.offsetWidth);
                a.left = g + "px";
                a.top = f + "px"
            }
        },
        parseXMLObject: function(a) {
            var b = {
                root: {}
            };
            this.parseXMLNode(b, "root", a);
            this.svgData = b.root.svg;
            this.getBounds()
        },
        getBounds: function() {
            var a = this.dataProvider;
            try {
                var b = this.svgData.defs["amcharts:ammap"];
                a.leftLongitude = Number(b.leftLongitude);
                a.rightLongitude = Number(b.rightLongitude);
                a.topLatitude = Number(b.topLatitude);
                a.bottomLatitude = Number(b.bottomLatitude);
                a.projection = b.projection;
                var c = b.wrappedLongitudes;
                c && (a.rightLongitude += 360);
                a.wrappedLongitudes = c
            } catch (d) {}
        },
        recalcLongitude: function(a) {
            var b = this.dataProvider.leftLongitude, c = this.dataProvider.wrappedLongitudes;
            return isNaN(a) && c ? a < b ? Number(a) + 360 : a : a
        },
        latitudeToCoordinate: function(a) {
            var b, c = this.dataProvider;
            if (this.mapSet) {
                b = c.topLatitude;
                var d = c.bottomLatitude;
                "mercator" == c.projection && (a = this.mercatorLatitudeToCoordinate(a), b = this.mercatorLatitudeToCoordinate(b), d = this.mercatorLatitudeToCoordinate(d));
                b = (a - b) / (d - b) * this.mapHeight
            }
            return b
        },
        longitudeToCoordinate: function(a) {
            a = this.recalcLongitude(a);
            var b, c = this.dataProvider;
            this.mapSet && (b = c.leftLongitude, b = (a - b) / (c.rightLongitude - b) * this.mapWidth);
            return b
        },
        mercatorLatitudeToCoordinate: function(a) {
            89.5 < a && (a = 89.5);
            - 89.5 > a && (a =- 89.5);
            a = d.degreesToRadians(a);
            return d.radiansToDegrees(.5 * Math.log((1 + Math.sin(a)) / (1 - Math.sin(a))) / 2)
        },
        zoomLatitude: function() {
            if (this.mapContainer) {
                var a = this.mapSet.getBBox(), b = ( - this.mapContainer.x + this.previousWidth / 2) / this.zoomLevel() - a.x * this.mapScale,
                a = ( - this.mapContainer.y + this.previousHeight / 2) / this.zoomLevel() - a.y * this.mapScale;
                return this.xyToCoordinates(b, a).latitude
            }
        },
        zoomLongitude: function() {
            if (this.mapContainer) {
                var a = this.mapSet.getBBox(), b = ( - this.mapContainer.x + this.previousWidth / 2) / this.zoomLevel() - a.x * this.mapScale, a = ( - this.mapContainer.y + this.previousHeight / 2) / this.zoomLevel() - a.y * this.mapScale;
                return this.xyToCoordinates(b, a).longitude
            }
        },
        getAreaCenterLatitude: function(a) {
            a = a.displayObject.getBBox();
            var b = this.mapScale, c = this.mapSet.getBBox();
            return this.xyToCoordinates((a.x + a.width / 2 + this.diffX) * b - c.x * b, (a.y + a.height / 2 + this.diffY) * b - c.y * b).latitude
        },
        getAreaCenterLongitude: function(a) {
            a = a.displayObject.getBBox();
            var b = this.mapScale, c = this.mapSet.getBBox();
            return this.xyToCoordinates((a.x + a.width / 2 + this.diffX) * b - c.x * b, (a.y + a.height / 2 + this.diffY) * b - c.y * b).longitude
        },
        milesToPixels: function(a) {
            var b = this.dataProvider;
            return this.mapWidth / (b.rightLongitude - b.leftLongitude) * a / 69.172
        },
        kilometersToPixels: function(a) {
            var b = this.dataProvider;
            return this.mapWidth /
            (b.rightLongitude - b.leftLongitude) * a / 111.325
        },
        handleBackgroundClick: function() {
            if (this.backgroundZoomsToTop&&!this.mapWasDragged) {
                var a = this.dataProvider;
                if (this.checkIfClickable(a))
                    this.clickMapObject(a);
                else {
                    var b = a.zoomX, c = a.zoomY, d = a.zoomLongitude, g = a.zoomLatitude, a = a.zoomLevel;
                    isNaN(b) || isNaN(c) || this.zoomTo(a, b, c);
                    isNaN(d) || isNaN(g) || this.zoomToLongLat(a, d, g, !0)
                }
            }
        },
        parseXMLNode: function(a, b, c, d) {
            void 0 === d && (d = "");
            var g, f, h;
            if (c) {
                var k = c.childNodes.length;
                for (g = 0; g < k; g++) {
                    f = c.childNodes[g];
                    var l = f.nodeName, m = f.nodeValue ? this.trim(f.nodeValue): "", n=!1;
                    f.attributes && 0 < f.attributes.length && (n=!0);
                    if (0 !== f.childNodes.length || "" !== m ||!1 !== n)
                        if (3 == f.nodeType || 4 == f.nodeType) {
                            if ("" !== m) {
                                f = 0;
                                for (h in a[b])
                                    a[b].hasOwnProperty(h) && f++;
                                    f ? a[b]["#text"] = m : a[b] = m
                            }
                        } else if (1 == f.nodeType) {
                            var q;
                            void 0 !== a[b][l] ? void 0 === a[b][l].length ? (q = a[b][l], a[b][l] = [], a[b][l].push(q), a[b][l].push({}), q = a[b][l][1]) : "object" == typeof a[b][l] && (a[b][l].push({}), q = a[b][l][a[b][l].length - 1]) : (a[b][l] = {}, q = a[b][l]);
                            if (f.attributes &&
                            f.attributes.length)
                                for (m = 0; m < f.attributes.length; m++)
                                    q[f.attributes[m].name] = f.attributes[m].value;
                                    void 0 !== a[b][l].length ? this.parseXMLNode(a[b][l], a[b][l].length - 1, f, d + "  ") : this.parseXMLNode(a[b], l, f, d + "  ")
                        }
                }
                f = 0;
                c = "";
                for (h in a[b])
                    "#text" == h ? c = a[b][h] : f++;
                0 === f && void 0 === a[b].length && (a[b] = c)
            }
        },
        //THIS DOES THE DOUBLE CLICK FUNCTION
        doDoubleClickZoom: function() {
            if (!this.mapWasDragged) {
                var a = this.zoomLevel() * this.zoomControl.zoomFactor;
                this.zoomToStageXY(a, this.mouseX, this.mouseY)
            }
        },
        getDevInfo: function() {
            var a = this.zoomLevel(), b = this.mapSet.getBBox(),
            b = this.xyToCoordinates((this.mouseX - this.mapContainer.x) / a - b.x * this.mapScale, (this.mouseY - this.mapContainer.y) / a - b.y * this.mapScale), a = {
                chart: this,
                type: "writeDevInfo",
                zoomLevel: a,
                zoomX: this.zoomX(),
                zoomY: this.zoomY(),
                zoomLatitude: this.zoomLatitude(),
                zoomLongitude: this.zoomLongitude(),
                latitude: b.latitude,
                longitude: b.longitude,
                left: this.mouseX,
                top: this.mouseY,
                right: this.realWidth - this.mouseX,
                bottom: this.realHeight - this.mouseY,
                percentLeft: Math.round(this.mouseX / this.realWidth * 100) + "%",
                percentTop: Math.round(this.mouseY /
                this.realHeight * 100) + "%",
                percentRight: Math.round((this.realWidth - this.mouseX) / this.realWidth * 100) + "%",
                percentBottom: Math.round((this.realHeight - this.mouseY) / this.realHeight * 100) + "%"
            }, b = "zoomLevel:" + a.zoomLevel + ", zoomLongitude:" + a.zoomLongitude + ", zoomLatitude:" + a.zoomLatitude + "\n", b = b + ("zoomX:" + a.zoomX + ", zoomY:" + a.zoomY + "\n"), b = b + ("latitude:" + a.latitude + ", longitude:" + a.longitude + "\n"), b = b + ("left:" + a.left + ", top:" + a.top + "\n"), b = b + ("right:" + a.right + ", bottom:" + a.bottom + "\n"), b = b + ("left:" + a.percentLeft +
            ", top:" + a.percentTop + "\n"), b = b + ("right:" + a.percentRight + ", bottom:" + a.percentBottom + "\n");
            a.str = b;
            this.fire(a);
            return a
        },
        getXY: function(a, b, c) {
            void 0 !== a && ( - 1 != String(a).indexOf("%") ? (a = Number(a.split("%").join("")), c && (a = 100 - a), a = Number(a) * b / 100) : c && (a = b - a));
            return a
        },
        getObjectById: function(a) {
            var b = this.dataProvider;
            if (b.areas) {
                var c = this.getObject(a, b.areas);
                if (c)
                    return c
            }
            if (c = this.getObject(a, b.images))
                return c;
            if (a = this.getObject(a, b.lines))
                return a
        },
        getObject: function(a, b) {
            if (b) {
                var c;
                for (c =
                0; c < b.length; c++) {
                    var d = b[c];
                    if (d.id == a)
                        return d;
                    if (d.areas) {
                        var g = this.getObject(a, d.areas);
                        if (g)
                            return g
                    }
                    if (g = this.getObject(a, d.images))
                        return g;
                    if (d = this.getObject(a, d.lines))
                        return d
                }
            }
        },
        parseData: function() {
            var a = this.dataProvider;
            this.processObject(a.areas, a, "area");
            this.processObject(a.images, a, "image");
            this.processObject(a.lines, a, "line")
        },
        processObject: function(a, b, c) {
            if (a) {
                var e;
                for (e = 0; e < a.length; e++) {
                    var g = a[e];
                    g.parentObject = b;
                    "area" == c && d.extend(g, new d.MapArea(this.theme), !0);
                    "image" ==
                    c && (g = d.extend(g, new d.MapImage(this.theme), !0));
                    "line" == c && (g = d.extend(g, new d.MapLine(this.theme), !0));
                    a[e] = g;
                    g.areas && this.processObject(g.areas, g, "area");
                    g.images && this.processObject(g.images, g, "image");
                    g.lines && this.processObject(g.lines, g, "line")
                }
            }
        },
        positionChanged: function() {
            var a = {
                type: "positionChanged",
                zoomX: this.zoomX(),
                zoomY: this.zoomY(),
                zoomLevel: this.zoomLevel(),
                chart: this
            };
            this.fire(a)
        },
        getX: function(a, b) {
            return this.getXY(a, this.realWidth, b)
        },
        getY: function(a, b) {
            return this.getXY(a,
            this.realHeight, b)
        },
        trim: function(a) {
            if (a) {
                var b;
                for (b = 0; b < a.length; b++)
                    if ( - 1 === " \n\r\t\f\x0B\u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000".indexOf(a.charAt(b))) {
                        a = a.substring(b);
                        break
                    }
                for (b = a.length - 1; 0 <= b; b--)
                    if ( - 1 === " \n\r\t\f\x0B\u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000".indexOf(a.charAt(b))) {
                        a = a.substring(0, b + 1);
                        break
                    }
                return - 1 === " \n\r\t\f\x0B\u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000".indexOf(a.charAt(0)) ?
                a : ""
            }
        },
        destroy: function() {
            d.AmMap.base.destroy.call(this)
        },
        x2c: function(a) {
            var b = this.dataProvider.leftLongitude;
            return Math.round(this.unscaledMapWidth * (a - b) / (this.dataProvider.rightLongitude - b) * 100) / 100
        },
        y2c: function(a) {
            var b = this.dataProvider.topLatitude;
            return Math.round(this.unscaledMapHeight * (a - b) / (this.dataProvider.bottomLatitude - b) * 100) / 100
        },
        normalize: function(a) {
            if (!a.pathsArray) {
                var b;
                if (a.normalized)
                    b = a.normalized;
                else {
                    var c = d.normalizePath(a.node);
                    b = a.node.getAttribute("d");
                    a.normalized =
                    b;
                    c.maxX > this.maxMapX && (this.maxMapX = c.maxX);
                    c.minX < this.minMapX && (this.minMapX = c.minX);
                    c.maxY > this.maxMapY && (this.maxMapY = c.maxY);
                    c.minY < this.minMapY && (this.minMapY = c.minY)
                }
                a.node.setAttribute("d", b)
            }
        },
        redraw: function(a) {
            var b = a.normalized, b = b.split(" Z").join(""), b = b.split("M");
            a.pathsArray = [];
            for (var c = 0; c < b.length; c++) {
                var d = b[c];
                if (d) {
                    for (var d = d.split("L"), g = [], f = 0; f < d.length; f++)
                        if (d[f]) {
                            var h = d[f].split(" "), h = this.xyToCoordinates(Number(h[1]), Number(h[2]), this.dpProjectionFunction, this.sourceMapWidth,
                            this.sourceMapHeight);
                            g.push([h.longitude, h.latitude])
                        }
                    a.pathsArray.push(g)
                }
            }
            b = "";
            for (c = 0; c < a.pathsArray.length; c++)
                b += this.redrawArea(a.pathsArray[c]);
            a.node.setAttribute("d", b);
            a.path = b
        },
        redrawArea: function(a) {
            for (var b=!1, c = "", e = 0; e < a.length; e++) {
                var g = a[e][0], f = a[e][1], h = d.degreesToRadians(a[e][0]), k = d.degreesToRadians(a[e][1]), k = this.projectionFunction(h, k), h = d.roundTo(this.x2c(d.radiansToDegrees(k[0])), 3), k = d.roundTo(this.y2c(d.radiansToDegrees(k[1])), 3);
                h < this.minMapXX && (this.minMapXX = h, this.leftLongLat =
                {
                    longitude: g,
                    latitude: f
                });
                h > this.maxMapXX && (this.maxMapXX = h, this.rightLongLat = {
                    longitude: g,
                    latitude: f
                });
                k < this.minMapYY && (this.minMapYY = k, this.topLongLat = {
                    longitude: g,
                    latitude: f
                });
                k > this.maxMapYY && (this.maxMapYY = k, this.bottomLongLat = {
                    longitude: g,
                    latitude: f
                });
                b ? c += " L " : (c += " M ", b=!0);
                c += h + " " + k
            }
            return c + " Z "
        },
        normalizeMap: function() {
            var a = d.degreesToRadians(this.dataProvider.leftLongitude), b = d.degreesToRadians(this.dataProvider.rightLongitude), c = d.degreesToRadians(this.dataProvider.topLatitude),
            e = d.degreesToRadians(this.dataProvider.bottomLatitude), g = a + (b - a) / 2, f = c + (e - c) / 2, h = this.dpProjectionFunction(g, c)[1], k = this.dpProjectionFunction(g, e)[1], l = this.dpProjectionFunction(a, f)[0], m = this.dpProjectionFunction(b, f)[0], c = d.equirectangular(g, c), e = d.equirectangular(g, e), h = (c[1] - e[1]) / (h - k), a = d.equirectangular(a, f), b = d.equirectangular(b, f), l = (a[0] - b[0]) / (l - m);
            this.minMapX = Infinity;
            this.maxMapX =- Infinity;
            this.minMapY = Infinity;
            this.maxMapY =- Infinity;
            for (m = 0; m < this.svgAreas.length; m++)
                this.normalize(this.svgAreas[m]);
            this.sourceMapHeight = Math.abs(this.maxMapY - this.minMapY);
            this.sourceMapWidth = Math.abs(this.maxMapX - this.minMapX);
            this.unscaledMapWidth = this.sourceMapWidth * l;
            this.unscaledMapHeight = this.sourceMapHeight * h;
            this.diffY = this.diffX = 0
        },
        fixMapPosition: function() {
            var a = d.degreesToRadians(this.dataProvider.leftLongitude), b = d.degreesToRadians(this.dataProvider.rightLongitude), c = d.degreesToRadians(this.dataProvider.topLatitude), e = d.degreesToRadians(this.dataProvider.bottomLatitude), g = a + (b - a) / 2, f = c + (e - c) / 2, h = this.dpProjectionFunction(g,
            c)[1], k = this.dpProjectionFunction(g, e)[1], l = this.dpProjectionFunction(a, f)[0], m = this.dpProjectionFunction(b, f)[0];
            this.sourceMapHeight = this.mapHeight / this.mapScale;
            this.sourceMapWidth = this.mapWidth / this.mapScale;
            this.unscaledMapWidth = (a - b) / (l - m) * this.sourceMapWidth;
            this.unscaledMapHeight = (c - e) / (h - k) * this.sourceMapHeight;
            b = this.coordinatesToXY(d.radiansToDegrees(g), d.radiansToDegrees(c));
            a = this.coordinatesToXY(d.radiansToDegrees(a), d.radiansToDegrees(f));
            c = f = Infinity;
            for (e = 0; e < this.svgAreas.length; e++)
                g =
                this.svgAreas[e].getBBox(), g.y < f && (f = g.y), g.x < c && (c = g.x);
            this.diffY = b.y / this.mapScale - f;
            this.diffX = a.x / this.mapScale - c;
            for (e = 0; e < this.svgAreas.length; e++)
                this.svgAreas[e].translate(this.diffX, this.diffY)
        },
        changeProjection: function() {
            this.minMapXX = Infinity;
            this.maxMapXX =- Infinity;
            this.minMapYY = Infinity;
            this.maxMapYY =- Infinity;
            this.projectionChanged=!1;
            for (var a = 0; a < this.svgAreas.length; a++)
                this.redraw(this.svgAreas[a]);
            this.projectionChanged=!0;
            this.resizeMap()
        },
        coordinatesToXY: function(a, b) {
            var c,
            e;
            this.projectionFunction ? (e = this.projectionFunction(d.degreesToRadians(a), d.degreesToRadians(b)), c = this.mapScale * d.roundTo(this.x2c(d.radiansToDegrees(e[0])), 3), e = this.mapScale * d.roundTo(this.y2c(d.radiansToDegrees(e[1])), 3)) : (c = this.longitudeToCoordinate(a), e = this.latitudeToCoordinate(b));
            return {
                x: c,
                y: e
            }
        },
        coordinatesToStageXY: function(a, b) {
            var c = this.coordinatesToXY(a, b), d = c.x * this.zoomLevel() + this.mapContainer.x, c = c.y * this.zoomLevel() + this.mapContainer.y;
            return {
                x: d,
                y: c
            }
        },
        stageXYToCoordinates: function(a,
        b) {
            var c = this.mapSet.getBBox(), d = (a - this.mapContainer.x) / this.zoomLevel() - c.x * this.mapScale, c = (b - this.mapContainer.y) / this.zoomLevel() - c.y * this.mapScale;
            return this.xyToCoordinates(d, c)
        },
        xyToCoordinates: function(a, b, c, e, g) {
            var f;
            isNaN(e) && (e = this.mapWidth);
            isNaN(g) && (g = this.mapHeight);
            c || (c = this.projectionFunction);
            if (f = c.invert) {
                var h = this.dataProvider.leftLongitude, k = this.dataProvider.rightLongitude, l = this.dataProvider.topLatitude, m = this.dataProvider.bottomLatitude, n = h + (k - h) / 2, q = l + (m - l) / 2, l = d.radiansToDegrees(c(d.degreesToRadians(n),
                d.degreesToRadians(l))[1]), m = d.radiansToDegrees(c(d.degreesToRadians(n), d.degreesToRadians(m))[1]), h = d.radiansToDegrees(c(d.degreesToRadians(h), d.degreesToRadians(q))[0]), k = d.radiansToDegrees(c(d.degreesToRadians(k), d.degreesToRadians(q))[0]);
                this.projectionChanged && (l = d.radiansToDegrees(c(d.degreesToRadians(this.topLongLat.longitude), d.degreesToRadians(this.topLongLat.latitude))[1]), m = d.radiansToDegrees(c(d.degreesToRadians(this.bottomLongLat.longitude), d.degreesToRadians(this.bottomLongLat.latitude))[1]),
                h = d.radiansToDegrees(c(d.degreesToRadians(this.leftLongLat.longitude), d.degreesToRadians(this.leftLongLat.latitude))[0]), k = d.radiansToDegrees(c(d.degreesToRadians(this.rightLongLat.longitude), d.degreesToRadians(this.rightLongLat.latitude))[0]));
                a = d.degreesToRadians(a / e * (k - h) + h);
                b = d.degreesToRadians(b / g * (m - l) + l);
                b = f(a, b);
                f = d.radiansToDegrees(b[0]);
                b = d.radiansToDegrees(b[1])
            } else 
                f = this.coordinateToLongitude(a), b = this.coordinateToLatitude(b);
            return {
                longitude: d.roundTo(f, 4),
                latitude: d.roundTo(b, 4)
            }
        },
        coordinateToLatitude: function(a, b) {
            var c;
            void 0 === b && (b = this.mapHeight);
            if (this.mapSet) {
                var e = this.dataProvider, g = e.bottomLatitude;
                c = e.topLatitude;
                "mercator" == e.projection ? (e = this.mercatorLatitudeToCoordinate(g), c = this.mercatorLatitudeToCoordinate(c), c = 2 * d.degreesToRadians(a * (e - c) / b + c), c = d.radiansToDegrees(2 * Math.atan(Math.exp(c)) - .5 * Math.PI)) : c = a / b * (g - c) + c
            }
            return Math.round(1E6 * c) / 1E6
        },
        coordinateToLongitude: function(a, b) {
            var c, d = this.dataProvider;
            void 0 === b && (b = this.mapWidth);
            this.mapSet && (c = a / b *
            (d.rightLongitude - d.leftLongitude) + d.leftLongitude);
            return Math.round(1E6 * c) / 1E6
        }
    })
})();

//Button attributes
(function() {
    var d = window.AmCharts;
    d.ZoomControl = d.Class({
        construct: function(a) {
            this.cname = "ZoomControl";
            this.panStepSize = .1;
            this.zoomFactor = 2;
            this.maxZoomLevel = 64;
            this.minZoomLevel = 1;
            this.panControlEnabled=!1;
            this.zoomControlEnabled=!0;
            this.buttonRollOverColor = "#DADADA";
            this.buttonFillColor = "#FFFFFF";
            this.buttonFillAlpha = 1;
            this.buttonBorderColor = "#000000";
            this.buttonBorderAlpha = .1;
            this.buttonIconAlpha = this.buttonBorderThickness = 1;
            this.gridColor = this.buttonIconColor = "#000000";
            this.homeIconFile = "homeIcon.gif";
            this.gridBackgroundColor = "#000000";
            this.draggerAlpha = this.gridAlpha = this.gridBackgroundAlpha = 0;
            this.draggerSize = this.buttonSize = 31;
            this.iconSize = 11;
            this.homeButtonEnabled=!0;
            this.buttonCornerRadius = 2;
            this.gridHeight = 5;
            this.roundButtons=!0;
            this.top = this.left = 10;
            d.applyTheme(this, a, this.cname)
        },
        init: function(a, b) {
            var c = this;
            c.chart = a;
            d.remove(c.set);
            var e = b.set();
            d.setCN(a, e, "zoom-control");
            var g = c.buttonSize, f = c.zoomControlEnabled, h = c.panControlEnabled, k = c.buttonFillColor, l = c.buttonFillAlpha, m = c.buttonBorderThickness,
            n = c.buttonBorderColor, q = c.buttonBorderAlpha, t = c.buttonCornerRadius, r = c.buttonRollOverColor, p = c.gridHeight, u = c.zoomFactor, A = c.minZoomLevel, x = c.maxZoomLevel, z = c.buttonIconAlpha, v = c.buttonIconColor, B = c.roundButtons, C = a.svgIcons, w = a.getX(c.left), y = a.getY(c.top);
            isNaN(c.right) || (w = a.getX(c.right, !0), w = h ? w - 3 * g : w - g);
            isNaN(c.bottom) || (y = a.getY(c.bottom, !0), f && (y -= p + 3 * g), y = h ? y - 3 * g : c.homeButtonEnabled ? y - .5 * g : y + g);
            e.translate(w, y);
            c.previousDY = NaN;
            var F, w = g / 4 - 1;
            if (f) {
                F = b.set();
                d.setCN(a, F, "zoom-control-zoom");
                e.push(F);
                c.set = e;
                c.zoomSet = F;
                5 < p && (f = d.rect(b, g + 6, p + 2 * g + 6, c.gridBackgroundColor, c.gridBackgroundAlpha, 0, 0, 0, 4), d.setCN(a, f, "zoom-bg"), f.translate( - 3, - 3), f.mouseup(function() {
                    c.handleBgUp()
                }).touchend(function() {
                    c.handleBgUp()
                }), F.push(f));
                var E = g;
                B && (E = g / 1.5);
                c.draggerSize = E;
                var H = Math.log(x / A) / Math.log(u) + 1;
                1E3 < H && (H = 1E3);
                var f = p / H, G, D = b.set();
                D.translate((g - E) / 2 + 1, 1, NaN, !0);
                F.push(D);
                for (G = 1; G < H; G++)
                    y = g + G * f, y = d.line(b, [1, E - 2], [y, y], c.gridColor, c.gridAlpha, 1), d.setCN(a, y, "zoom-grid"), D.push(y);
                y = new d.SimpleButton;
                y.setDownHandler(c.draggerDown, c);
                y.setClickHandler(c.draggerUp, c);
                y.init(b, E, f, k, l, m, n, q, t, r);
                d.setCN(a, y.set, "zoom-dragger");
                F.push(y.set);
                y.set.setAttr("opacity", c.draggerAlpha);
                c.dragger = y.set;
                c.previousY = NaN;
                y = new d.SimpleButton;
                C ? (E = b.set(), H = d.line(b, [ - w, w], [0, 0], v, z, 1), G = d.line(b, [0, 0], [ - w, w], v, z, 1), E.push(H), E.push(G), y.svgIcon = E) : y.setIcon(a.pathToImages + "plus.gif", c.iconSize);
                y.setClickHandler(a.zoomIn, a);
                y.init(b, g, g, k, l, m, n, q, t, r, z, v, B);
                d.setCN(a, y.set, "zoom-in");
                F.push(y.set);
                y = new d.SimpleButton;
                C ? y.svgIcon = d.line(b, [ - w, w], [0, 0], v, z, 1) : y.setIcon(a.pathToImages + "minus.gif", c.iconSize);
                y.setClickHandler(a.zoomOut, a);
                y.init(b, g, g, k, l, m, n, q, t, r, z, v, B);
                y.set.translate(0, p + g);
                d.setCN(a, y.set, "zoom-out");
                F.push(y.set);
                p -= f;
                x = Math.log(x / 100) / Math.log(u);
                c.realStepSize = p / (x - Math.log(A / 100) / Math.log(u));
                c.realGridHeight = p;
                c.stepMax = x
            }
            h && (h = b.set(), d.setCN(a, h, "zoom-control-pan"), e.push(h), F && F.translate(g, 4 * g), u = new d.SimpleButton, C ? u.svgIcon = d.line(b, [w / 5, - w + w / 5,
            w / 5], [ - w, 0, w], v, z, 1) : u.setIcon(a.pathToImages + "panLeft.gif", c.iconSize), u.setClickHandler(a.moveLeft, a), u.init(b, g, g, k, l, m, n, q, t, r, z, v, B), u.set.translate(0, g), d.setCN(a, u.set, "pan-left"), h.push(u.set), u = new d.SimpleButton, C ? u.svgIcon = d.line(b, [ - w / 5, w - w / 5, - w / 5], [ - w, 0, w], v, z, 1) : u.setIcon(a.pathToImages + "panRight.gif", c.iconSize), u.setClickHandler(a.moveRight, a), u.init(b, g, g, k, l, m, n, q, t, r, z, v, B), u.set.translate(2 * g, g), d.setCN(a, u.set, "pan-right"), h.push(u.set), u = new d.SimpleButton, C ? u.svgIcon = d.line(b,
            [ - w, 0, w], [w / 5, - w + w / 5, w / 5], v, z, 1) : u.setIcon(a.pathToImages + "panUp.gif", c.iconSize), u.setClickHandler(a.moveUp, a), u.init(b, g, g, k, l, m, n, q, t, r, z, v, B), u.set.translate(g, 0), d.setCN(a, u.set, "pan-up"), h.push(u.set), u = new d.SimpleButton, C ? u.svgIcon = d.line(b, [ - w, 0, w], [ - w / 5, w - w / 5, - w / 5], v, z, 1) : u.setIcon(a.pathToImages + "panDown.gif", c.iconSize), u.setClickHandler(a.moveDown, a), u.init(b, g, g, k, l, m, n, q, t, r, z, v, B), u.set.translate(g, 2 * g), d.setCN(a, u.set, "pan-down"), h.push(u.set), e.push(h));
            c.homeButtonEnabled && (h = new d.SimpleButton,
            C ? h.svgIcon = d.polygon(b, [ - w, 0, w, w - 1, w - 1, 2, 2, - 2, - 2, - w + 1, - w + 1], [0, - w, 0, 0, w - 1, w - 1, 2, 2, w - 1, w - 1, 0], v, z, 1, v, z) : h.setIcon(a.pathToImages + c.homeIconFile, c.iconSize), h.setClickHandler(a.goHome, a), c.panControlEnabled && (q = l = 0), h.init(b, g, g, k, l, m, n, q, t, r, z, v, B), c.panControlEnabled ? h.set.translate(g, g) : F && F.translate(0, 1.5 * g), d.setCN(a, h.set, "pan-home"), e.push(h.set));
            c.update()
        },
        draggerDown: function() {
            this.chart.stopDrag();
            this.isDragging=!0
        },
        draggerUp: function() {
            this.isDragging=!1
        },
        handleBgUp: function() {
            var a =
            this.chart;
            a.zoomTo(100 * Math.pow(this.zoomFactor, this.stepMax - (a.mouseY - this.zoomSet.y - this.set.y - this.buttonSize - this.realStepSize / 2) / this.realStepSize))
        },
        update: function() {
            var a;
            a = this.zoomFactor;
            var b = this.realStepSize, c = this.stepMax, e = this.dragger, g = this.buttonSize, f, h = this.chart;
            h && (this.isDragging ? (h.stopDrag(), f = e.y + (h.mouseY - this.previousY), f = d.fitToBounds(f, g, this.realGridHeight + g), h.zoomTo(100 * Math.pow(a, c - (f - g) / b), NaN, NaN, !0)) : (a = Math.log(h.zoomLevel() / 100) / Math.log(a), f = (c - a) * b + g), this.previousY =
            h.mouseY, this.previousDY != f && e && (e.translate((this.buttonSize - this.draggerSize) / 2, f), this.previousDY = f))
        }
    })
})();
(function() {
    var d = window.AmCharts;
    d.SimpleButton = d.Class({
        construct: function() {},
        init: function(a, b, c, e, g, f, h, k, l, m, n, q, t) {
            var r = this;
            r.rollOverColor = m;
            r.color = e;
            r.container = a;
            m = a.set();
            r.set = m;
            t ? (b/=2, e = d.circle(a, b, e, g, f, h, k), e.translate(b, b)) : e = d.rect(a, b, c, e, g, f, h, k, l);
            m.push(e);
            g = r.iconPath;
            var p;
            g && (p = r.iconSize, f = (b - p) / 2, t && (f = (2 * b - p) / 2), p = a.image(g, f, (c - p) / 2, p, p));
            r.svgIcon && (p = r.svgIcon, t ? p.translate(b, b) : p.translate(b / 2, b / 2));
            m.setAttr("cursor", "pointer");
            p && (m.push(p), p.setAttr("opacity",
            n), p.node.style.pointerEvents = "none");
            e.mousedown(function() {
                r.handleDown()
            }).touchstart(function() {
                r.handleDown()
            }).mouseup(function() {
                r.handleUp()
            }).touchend(function() {
                r.handleUp()
            }).mouseover(function() {
                r.handleOver()
            }).mouseout(function() {
                r.handleOut()
            });
            r.bg = e
        },
        setIcon: function(a, b) {
            this.iconPath = a;
            this.iconSize = b
        },
        setClickHandler: function(a, b) {
            this.clickHandler = a;
            this.scope = b
        },
        setDownHandler: function(a, b) {
            this.downHandler = a;
            this.scope = b
        },
        handleUp: function() {
            var a = this.clickHandler;
            a && a.call(this.scope)
        },
        handleDown: function() {
            var a = this.downHandler;
            a && a.call(this.scope)
        },
        handleOver: function() {
            this.container.chart.skipClick=!0;
            this.bg.setAttr("fill", this.rollOverColor)
        },
        handleOut: function() {
            this.container.chart.skipClick=!1;
            this.bg.setAttr("fill", this.color)
        }
    })
})();
(function() {
    var d = window.AmCharts;
    d.SmallMap = d.Class({
        construct: function(a) {
            this.cname = "SmallMap";
            this.mapColor = "#e6e6e6";
            this.rectangleColor = "#FFFFFF";
            this.top = this.right = 10;
            this.minimizeButtonWidth = 23;
            this.backgroundColor = "#9A9A9A";
            this.backgroundAlpha = 1;
            this.borderColor = "#FFFFFF";
            this.iconColor = "#000000";
            this.borderThickness = 3;
            this.borderAlpha = 1;
            this.size = .2;
            this.enabled=!0;
            d.applyTheme(this, a, this.cname)
        },
        init: function(a, b) {
            var c = this;
            if (c.enabled) {
                c.chart = a;
                c.container = b;
                c.width = a.realWidth *
                c.size;
                c.height = a.realHeight * c.size;
                d.remove(c.mapSet);
                d.remove(c.allSet);
                d.remove(c.set);
                var e = b.set();
                c.set = e;
                d.setCN(a, e, "small-map");
                var g = b.set();
                c.allSet = g;
                e.push(g);
                c.buildSVGMap();
                var f = c.borderThickness, h = c.borderColor, k = d.rect(b, c.width + f, c.height + f, c.backgroundColor, c.backgroundAlpha, f, h, c.borderAlpha);
                d.setCN(a, k, "small-map-bg");
                k.translate( - f / 2, - f / 2);
                g.push(k);
                k.toBack();
                var l, m, k = c.minimizeButtonWidth, n = new d.SimpleButton, q = k / 2;
                a.svgIcons ? n.svgIcon = d.line(b, [ - q / 2, 0, q / 2], [ - q / 4, q / 4, - q /
                4], c.iconColor, 1, 1) : n.setIcon(a.pathToImages + "arrowDown.gif", k);
                n.setClickHandler(c.minimize, c);
                n.init(b, k, k, h, 1, 1, h, 1);
                d.setCN(a, n.set, "small-map-down");
                n = n.set;
                c.downButtonSet = n;
                e.push(n);
                var t = new d.SimpleButton;
                a.svgIcons ? t.svgIcon = d.line(b, [ - q / 2, 0, q / 2], [q / 4, - q / 4, q / 4], c.iconColor, 1, 1) : t.setIcon(a.pathToImages + "arrowUp.gif", k);
                t.setClickHandler(c.maximize, c);
                t.init(b, k, k, h, 1, 1, h, 1);
                d.setCN(a, t.set, "small-map-up");
                h = t.set;
                c.upButtonSet = h;
                h.hide();
                e.push(h);
                var r, p;
                isNaN(c.top) || (l = a.getY(c.top) +
                f, p = 0);
                isNaN(c.bottom) || (l = a.getY(c.bottom, !0) - c.height - f, p = c.height - k + f / 2);
                isNaN(c.left) || (m = a.getX(c.left) + f, r =- f / 2);
                isNaN(c.right) || (m = a.getX(c.right, !0) - c.width - f, r = c.width - k + f / 2);
                f = b.set();
                f.clipRect(1, 1, c.width, c.height);
                g.push(f);
                c.rectangleC = f;
                e.translate(m, l);
                n.translate(r, p);
                h.translate(r, p);
                g.mouseup(function() {
                    c.handleMouseUp()
                });
                c.drawRectangle()
            } else 
                d.remove(c.allSet), d.remove(c.downButtonSet), d.remove(c.upButtonSet)
        },
        minimize: function() {
            this.downButtonSet.hide();
            this.upButtonSet.show();
            this.allSet.hide()
        },
        maximize: function() {
            this.downButtonSet.show();
            this.upButtonSet.hide();
            this.allSet.show()
        },
        buildSVGMap: function() {
            var a = this.chart, b = {
                fill: this.mapColor,
                stroke: this.mapColor,
                "stroke-opacity": 1
            }, c = this.container, e = c.set();
            d.setCN(a, e, "small-map-image");
            var g;
            for (g = 0; g < a.svgAreas.length; g++) {
                var f = c.path(a.svgAreas[g].path).attr(b);
                e.push(f)
            }
            this.allSet.push(e);
            b = e.getBBox();
            c = this.size * a.mapScale;
            g =- b.x * c;
            var f =- b.y * c, h = 0, k = 0;
            a.centerMap && (h = (this.width - b.width * c) / 2, k = (this.height -
            b.height * c) / 2);
            this.mapWidth = b.width * c;
            this.mapHeight = b.height * c;
            this.dx = h;
            this.dy = k;
            e.translate(g + h, f + k, c);
            this.mapSet = e
        },
        update: function() {
            var a = this.chart;
            if (a) {
                var b = a.zoomLevel(), c = this.width, d = this.height, g = c / (a.realWidth * b), f = a.mapContainer.getBBox(), c = c / b, d = d / b, h = this.rectangle;
                h.translate( - (a.mapContainer.x + f.x * b) * g + this.dx, - (a.mapContainer.y + f.y * b) * g + this.dy);
                0 < c && 0 < d && (h.setAttr("width", Math.ceil(c + 1)), h.setAttr("height", Math.ceil(d + 1)));
                this.rWidth = c;
                this.rHeight = d
            }
        },
        drawRectangle: function() {
            var a =
            this.rectangle;
            d.remove(a);
            a = d.rect(this.container, 10, 10, "#000", 0, 1, this.rectangleColor, 1);
            d.setCN(this.chart, a, "small-map-rectangle");
            this.rectangleC.push(a);
            this.rectangle = a
        },
        handleMouseUp: function() {
            var a = this.chart, b = a.zoomLevel();
            a.zoomTo(b, - ((a.mouseX - this.set.x - this.dx - this.rWidth / 2) / this.mapWidth) * b, - ((a.mouseY - this.set.y - this.dy - this.rHeight / 2) / this.mapHeight) * b)
        }
    })
})();
(function() {
    var d = window.AmCharts;
    d.AreasProcessor = d.Class({
        construct: function(a) {
            this.chart = a
        },
        process: function(a) {
            this.updateAllAreas();
            this.allObjects = [];
            a = a.areas;
            var b = this.chart, c = a.length, d, g, f = 0, h=!1, k=!1, l = 0;
            for (d = 0; d < c; d++)
                if (g = a[d], g = g.value, !isNaN(g)) {
                    if (!1 === h || h < g)
                        h = g;
                        if (!1 === k || k > g)
                            k = g;
                            f += Math.abs(g);
                            l++
                }
            this.minValue = k;
            this.maxValue = h;
            isNaN(b.minValue) || (this.minValue = b.minValue);
            isNaN(b.maxValue) || (this.maxValue = b.maxValue);
            b.maxValueReal = h;
            b.minValueReal = k;
            for (d = 0; d < c; d++)
                g = a[d],
                isNaN(g.value) ? g.percents = void 0 : (g.percents = (g.value - k) / f * 100, k == h && (g.percents = 100));
            for (d = 0; d < c; d++)
                g = a[d], this.createArea(g)
        },
        updateAllAreas: function() {
            var a = this.chart, b = a.areasSettings, c = b.unlistedAreasColor, e = b.unlistedAreasAlpha, g = b.unlistedAreasOutlineColor, f = b.unlistedAreasOutlineAlpha, h = a.svgAreas, k = a.dataProvider, l = k.areas, m = {}, n;
            for (n = 0; n < l.length; n++)
                m[l[n].id] = l[n];
            for (n = 0; n < h.length; n++) {
                l = h[n];
                if (b.preserveOriginalAttributes) {
                    if (l.customAttr)
                        for (var q in l.customAttr)
                            l.setAttr(q,
                            l.customAttr[q])
                        } else {
                    void 0 != c && l.setAttr("fill", c);
                    isNaN(e) || l.setAttr("fill-opacity", e);
                    void 0 != g && l.setAttr("stroke", g);
                    isNaN(f) || l.setAttr("stroke-opacity", f);
                    var t = b.outlineThickness;
                    b.adjustOutlineThickness && (t = t / a.zoomLevel() / a.mapScale);
                    l.setAttr("stroke-width", t)
                }
                d.setCN(a, l, "map-area-unlisted");
                k.getAreasFromMap&&!m[l.id] && (t = new d.MapArea(a.theme), t.parentObject = k, t.id = l.id, k.areas.push(t))
            }
        },
        createArea: function(a) {
            var b = this.chart, c = b.svgAreasById[a.id], e = b.areasSettings;
            if (c && c.className) {
                var g =
                b.areasClasses[c.className];
                g && (e = d.processObject(g, d.AreasSettings, b.theme))
            }
            var f = e.color, h = e.alpha, k = e.outlineThickness, l = e.rollOverColor, m = e.selectedColor, n = e.rollOverAlpha, q = e.rollOverBrightness, t = e.outlineColor, r = e.outlineAlpha, p = e.balloonText, u = e.selectable, A = e.pattern, x = e.rollOverOutlineColor, z = e.bringForwardOnHover, v = e.preserveOriginalAttributes;
            this.allObjects.push(a);
            a.chart = b;
            a.baseSettings = e;
            a.autoZoomReal = void 0 == a.autoZoom ? e.autoZoom : a.autoZoom;
            g = a.color;
            void 0 == g && (g = f);
            var B = a.alpha;
            isNaN(B) && (B = h);
            h = a.rollOverAlpha;
            isNaN(h) && (h = n);
            isNaN(h) && (h = B);
            n = a.rollOverColor;
            void 0 == n && (n = l);
            l = a.pattern;
            void 0 == l && (l = A);
            A = a.selectedColor;
            void 0 == A && (A = m);
            m = a.balloonText;
            void 0 === m && (m = p);
            void 0 == e.colorSolid || isNaN(a.value) || (p = Math.floor((a.value - this.minValue) / ((this.maxValue - this.minValue) / b.colorSteps)), p == b.colorSteps && p--, p*=1 / (b.colorSteps - 1), this.maxValue == this.minValue && (p = 1), a.colorReal = d.getColorFade(g, e.colorSolid, p));
            void 0 != a.color && (a.colorReal = a.color);
            void 0 == a.selectable &&
            (a.selectable = u);
            void 0 == a.colorReal && (a.colorReal = f);
            f = a.outlineColor;
            void 0 == f && (f = t);
            t = a.outlineAlpha;
            isNaN(t) && (t = r);
            r = a.outlineThickness;
            isNaN(r) && (r = k);
            k = a.rollOverOutlineColor;
            void 0 == k && (k = x);
            x = a.rollOverBrightness;
            void 0 == x && (x = q);
            void 0 == a.bringForwardOnHover && (a.bringForwardOnHover = z);
            void 0 == a.preserveOriginalAttributes && (a.preserveOriginalAttributes = v);
            isNaN(e.selectedBrightness) || (A = d.adjustLuminosity(a.colorReal, e.selectedBrightness / 100));
            a.alphaReal = B;
            a.rollOverColorReal = n;
            a.rollOverAlphaReal =
            h;
            a.balloonTextReal = m;
            a.selectedColorReal = A;
            a.outlineColorReal = f;
            a.outlineAlphaReal = t;
            a.rollOverOutlineColorReal = k;
            a.outlineThicknessReal = r;
            a.patternReal = l;
            a.rollOverBrightnessReal = x;
            d.processDescriptionWindow(e, a);
            if (c && (q = c.area, z = c.title, a.enTitle = c.title, z&&!a.title && (a.title = z), (c = b.language) ? (z = d.mapTranslations) && (c = z[c]) && c[a.enTitle] && (a.titleTr = c[a.enTitle]) : a.titleTr = void 0, q)) {
                a.displayObject = q;
                a.mouseEnabled && b.addObjectEventListeners(q, a);
                var C;
                void 0 != g && (C = g);
                void 0 != a.colorReal &&
                (C = a.showAsSelected || b.selectedObject == a ? a.selectedColorReal : a.colorReal);
                q.node.setAttribute("class", "");
                d.setCN(b, q, "map-area");
                d.setCN(b, q, "map-area-" + q.id);
                e.adjustOutlineThickness && (r = r / b.zoomLevel() / b.mapScale);
                a.preserveOriginalAttributes || (q.setAttr("fill", C), q.setAttr("stroke", f), q.setAttr("stroke-opacity", t), q.setAttr("stroke-width", r), q.setAttr("fill-opacity", B));
                l && q.pattern(l, b.mapScale, b.path);
                a.hidden && q.hide()
            }
        }
    })
})();

//Map color changing functions
(function areaColor() {
    var d = window.AmCharts;
    d.AreasSettings = d.Class({
        construct: function(a) {
            this.cname = "AreasSettings";
            this.selectable = true;
            this.alpha = 1;
            this.autoZoom=!1;
            this.balloonText = "[[title]]";
            this.color = "#DADADA";
            this.colorSolid = "#990000";
            this.unlistedAreasAlpha = 1;
            this.unlistedAreasColor = "#DDDDDD";
            this.outlineColor = "#FFFFFF";
            this.outlineThickness = this.outlineAlpha = 1;
            this.rollOverOutlineColor = "#CC0000";
            this.unlistedAreasOutlineColor = "#FFFFFF";
            this.unlistedAreasOutlineAlpha = 1;
            this.descriptionWindowWidth =
            250;
            this.bringForwardOnHover = this.adjustOutlineThickness=!0;
            d.applyTheme(this, a, this.cname)
        }
    })
})();

(function() {
    var d = window.AmCharts;
    d.ImagesProcessor = d.Class({
        construct: function(a) {
            this.chart = a;
            this.reset()
        },
        process: function(a) {
            var b = a.images, c;
            for (c = 0; c < b.length; c++) {
                var d = b[c];
                this.createImage(d, c);
                d.parentArray = b
            }
            this.counter = c;
            a.parentObject && a.remainVisible && this.process(a.parentObject)
        },
        createImage: function(a, b) {
            a = d.processObject(a, d.MapImage);
            isNaN(b) && (this.counter++, b = this.counter);
            var c = this.chart, e = c.container, g = c.mapImagesContainer, f = c.stageImagesContainer, h = c.imagesSettings;
            a.remove &&
            a.remove();
            var k = h.color, l = h.alpha, m = h.rollOverColor, n = h.rollOverOutlineColor, q = h.selectedColor, t = h.balloonText, r = h.outlineColor, p = h.outlineAlpha, u = h.outlineThickness, A = h.selectedScale, x = h.rollOverScale, z = h.selectable, v = h.labelPosition, B = h.labelColor, C = h.labelFontSize, w = h.bringForwardOnHover, y = h.labelRollOverColor, F = h.rollOverBrightness, E = h.selectedLabelColor;
            a.index = b;
            a.chart = c;
            a.baseSettings = c.imagesSettings;
            var H = e.set();
            a.displayObject = H;
            var G = a.color;
            void 0 == G && (G = k);
            k = a.alpha;
            isNaN(k) && (k = l);
            void 0 == a.bringForwardOnHover && (a.bringForwardOnHover = w);
            l = a.outlineAlpha;
            isNaN(l) && (l = p);
            p = a.rollOverColor;
            void 0 == p && (p = m);
            m = a.selectedColor;
            void 0 == m && (m = q);
            q = a.balloonText;
            void 0 === q && (q = t);
            t = a.outlineColor;
            void 0 == t && (t = r);
            a.outlineColorReal = t;
            r = a.outlineThickness;
            isNaN(r) && (r = u);
            (u = a.labelPosition) || (u = v);
            v = a.labelColor;
            void 0 == v && (v = B);
            B = a.labelRollOverColor;
            void 0 == B && (B = y);
            y = a.selectedLabelColor;
            void 0 == y && (y = E);
            E = a.labelFontSize;
            isNaN(E) && (E = C);
            C = a.selectedScale;
            isNaN(C) && (C = A);
            A = a.rollOverScale;
            isNaN(A) && (A = x);
            x = a.rollOverBrightness;
            void 0 == x && (x = F);
            void 0 == a.selectable && (a.selectable = z);
            a.colorReal = G;
            isNaN(h.selectedBrightness) || (m = d.adjustLuminosity(a.colorReal, h.selectedBrightness / 100));
            a.alphaReal = k;
            a.rollOverColorReal = p;
            a.balloonTextReal = q;
            a.selectedColorReal = m;
            a.labelColorReal = v;
            a.labelRollOverColorReal = B;
            a.selectedLabelColorReal = y;
            a.labelFontSizeReal = E;
            a.labelPositionReal = u;
            a.selectedScaleReal = C;
            a.rollOverScaleReal = A;
            a.rollOverOutlineColorReal = n;
            a.rollOverBrightnessReal = x;
            d.processDescriptionWindow(h,
            a);
            a.centeredReal = void 0 == a.centered ? h.centered : a.centered;
            F = a.type;
            x = a.imageURL;
            A = a.svgPath;
            C = a.width;
            E = a.height;
            n = a.scale;
            isNaN(a.percentWidth) || (C = a.percentWidth / 100 * c.realWidth);
            isNaN(a.percentHeight) || (E = a.percentHeight / 100 * c.realHeight);
            var D;
            x || F || A || (F = "circle", C = 1, l = k = 0);
            p = z = 0;
            h = a.selectedColorReal;
            if (F) {
                isNaN(C) && (C = 10);
                isNaN(E) && (E = 10);
                "kilometers" == a.widthAndHeightUnits && (C = c.kilometersToPixels(a.width), E = c.kilometersToPixels(a.height));
                "miles" == a.widthAndHeightUnits && (C = c.milesToPixels(a.width),
                E = c.milesToPixels(a.height));
                if ("circle" == F || "bubble" == F)
                    E = C;
                D = this.createPredefinedImage(G, t, r, F, C, E);
                p = z = 0;
                a.centeredReal ? (isNaN(a.right) || (z = C * n), isNaN(a.bottom) || (p = E * n)) : (z = C * n / 2, p = E * n / 2);
                D.translate(z, p, n, !0)
            } else 
                x ? (isNaN(C) && (C = 10), isNaN(E) && (E = 10), D = e.image(x, 0, 0, C, E), D.node.setAttribute("preserveAspectRatio", "none"), D.setAttr("opacity", k), a.centeredReal && (z = isNaN(a.right)?-C / 2 : C / 2, p = isNaN(a.bottom)?-E / 2 : E / 2, D.translate(z, p, NaN, !0))) : A && (D = e.path(A), F = D.getBBox(), a.centeredReal ? (z =- F.x * n -
                F.width * n / 2, isNaN(a.right) || (z =- z), p =- F.y * n - F.height * n / 2, isNaN(a.bottom) || (p =- p)) : z = p = 0, D.translate(z, p, n, !0), D.x = z, D.y = p);
            D && (H.push(D), a.image = D, D.setAttr("stroke-opacity", l), D.setAttr("stroke-width", r), D.setAttr("stroke", t), D.setAttr("fill-opacity", k), D.setAttr("fill", G), d.setCN(c, D, "map-image"), void 0 != a.id && d.setCN(c, D, "map-image-" + a.id));
            G = a.labelColorReal;
            !a.showAsSelected && c.selectedObject != a || void 0 == h || (D.setAttr("fill", h), G = a.selectedLabelColorReal);
            D = null;
            void 0 !== a.label && (D = d.text(e,
            a.label, G, c.fontFamily, a.labelFontSizeReal, a.labelAlign), d.setCN(c, D, "map-image-label"), void 0 !== a.id && d.setCN(c, D, "map-image-label-" + a.id), G = a.labelBackgroundAlpha, (k = a.labelBackgroundColor) && 0 < G && (l = D.getBBox(), e = d.rect(e, l.width + 16, l.height + 10, k, G), d.setCN(c, e, "map-image-label-background"), void 0 != a.id && d.setCN(c, e, "map-image-label-background-" + a.id), H.push(e), a.labelBG = e), a.imageLabel = D, H.push(D), d.setCN(c, H, "map-image-container"), void 0 != a.id && d.setCN(c, H, "map-image-container-" + a.id));
            e = isNaN(a.latitude) ||
            isNaN(a.longitude)?!0 : !1;
            a.lineId && (D = this.chart.getObjectById(a.lineId)) && 0 < D.longitudes.length && (e=!1);
            e ? f.push(H) : g.push(H);
            H && (H.rotation = a.rotation, isNaN(a.rotation) || H.rotate(a.rotation));
            this.updateSizeAndPosition(a);
            a.mouseEnabled && c.addObjectEventListeners(H, a);
            a.hidden && H.hide();
            a.animateAlongLine && setTimeout(function() {
                a.animateAlong.call(a)
            }, 100);
            return a
        },
        updateSizeAndPosition: function(a) {
            var b = this.chart, c = a.displayObject, e = b.getX(a.left), g = b.getY(a.top), f, h = a.image.getBBox();
            isNaN(a.right) ||
            (e = b.getX(a.right, !0) - h.width * a.scale);
            isNaN(a.bottom) || (g = b.getY(a.bottom, !0) - h.height * a.scale);
            var k = a.longitude, l = a.latitude, m = a.positionOnLine, h = this.objectsToResize;
            this.allSvgObjects.push(c);
            this.allObjects.push(a);
            a.arrays.push({
                arr: this.allSvgObjects,
                el: c
            });
            a.arrays.push({
                arr: this.allObjects,
                el: a
            });
            var n = a.imageLabel, q = this.chart.zoomLevel(), t, r;
            a.lineId && (a.line = this.chart.getObjectById(a.lineId));
            if (a.line && a.line.getCoordinates) {
                a.line.chart = b;
                var p = a.line.getCoordinates(m, a.lineSegment);
                p && (k = b.coordinateToLongitude(p.x), l = b.coordinateToLatitude(p.y), t = p.x, r = p.y, a.animateAngle && (f = d.radiansToDegrees(p.angle)))
            }
            isNaN(f) || c.rotate(f + a.extraAngle);
            if (!isNaN(e)&&!isNaN(g))
                c.translate(e, g, NaN, !0);
            else if (!isNaN(l)&&!isNaN(k))
                if (g = b.coordinatesToXY(k, l), e = g.x, g = g.y, isNaN(t) || (e = t), isNaN(r) || (g = r), a.fixedSize) {
                    t = 1;
                    if (a.showAsSelected || b.selectedObject == a)
                        t = a.selectedScaleReal;
                        b = a.positionScale;
                        isNaN(b) ? b = 0 : (--b, b*=1 - 2 * Math.abs(m - .5));
                        m = {
                            image: c,
                            scale: t + b
                        };
                        h.push(m);
                        a.arrays.push({
                            arr: h,
                            el: m
                        });
                        c.translate(e, g, t / q + b, !0)
                } else 
                    c.translate(e, g, NaN, !0), n && (this.labelsToReposition.push(a), a.arrays.push({
                        arr: this.labelsToReposition,
                        el: a
                    }));
            this.positionLabel(n, a, a.labelPositionReal)
        },
        positionLabel: function(a, b, c) {
            if (a) {
                var d = b.image, g = 0, f = 0, h = 0, k = 0;
                d && (k = d.getBBox(), f = d.y, g = d.x, h = k.width, k = k.height, b.svgPath && (h*=b.scale, k*=b.scale));
                var d = a.getBBox(), l = d.width, m = d.height;
                "right" == c && (g += h + l / 2 + 5, f += k / 2 - 2);
                "left" == c && (g +=- l / 2 - 5, f += k / 2 - 2);
                "top" == c && (f -= m / 2 + 3, g += h / 2);
                "bottom" == c && (f += k + m /
                2, g += h / 2);
                "middle" == c && (g += h / 2, f += k / 2);
                a.translate(g + b.labelShiftX, f + b.labelShiftY, NaN, !0);
                b.labelBG && b.labelBG.translate(g - d.width / 2 + b.labelShiftX - 9, f + b.labelShiftY - d.height / 2 - 3, NaN, !0)
            }
        },
        createPredefinedImage: function(a, b, c, e, g, f) {
            var h = this.chart.container, k;
            switch (e) {
            case "circle":
                k = d.circle(h, g / 2, a, 1, c, b, 1);
                break;
            case "rectangle":
                k = d.polygon(h, [ - g / 2, g / 2, g / 2, - g / 2], [f / 2, f / 2, - f / 2, - f / 2], a, 1, c, b, 1, 0, !0);
                break;
            case "bubble":
                k = d.circle(h, g / 2, a, 1, c, b, 1, !0);
                break;
            case "hexagon":
                g/=Math.sqrt(3), k = d.polygon(h,
                [.866 * g, 0 * g, - .866 * g, - .866 * g, 0 * g, .866 * g], [.5 * g, 1 * g, .5 * g, - .5 * g, - 1 * g, - .5 * g], a, 1, c, b, 1)
            }
            return k
        },
        reset: function() {
            this.objectsToResize = [];
            this.allSvgObjects = [];
            this.allObjects = [];
            this.allLabels = [];
            this.labelsToReposition = []
        }
    })
})();
(function() {
    var d = window.AmCharts;
    d.ImagesSettings = d.Class({
        construct: function(a) {
            this.cname = "ImagesSettings";
            this.balloonText = "[[title]]";
            this.alpha = 1;
            this.borderAlpha = 0;
            this.borderThickness = 1;
            this.labelPosition = "right";
            this.labelColor = "#000000";
            this.labelFontSize = 11;
            this.color = "#000000";
            this.labelRollOverColor = "#00CC00";
            this.centered=!0;
            this.rollOverScale = this.selectedScale = 1;
            this.descriptionWindowWidth = 250;
            this.bringForwardOnHover=!0;
            this.outlineColor = "transparent";
            this.adjustAnimationSpeed=!1;
            this.baseAnimationDistance = 500;
            this.pauseDuration = 0;
            this.easingFunction = d.easeInOutQuad;
            this.animationDuration = 3;
            this.positionScale = 1;
            d.applyTheme(this, a, this.cname)
        }
    })
})();
(function() {
    var d = window.AmCharts;
    d.LinesProcessor = d.Class({
        construct: function(a) {
            this.chart = a;
            this.reset()
        },
        process: function(a) {
            var b = a.lines, c;
            for (c = 0; c < b.length; c++) {
                var d = b[c];
                this.createLine(d, c);
                d.parentArray = b
            }
            this.counter = c;
            a.parentObject && a.remainVisible && this.process(a.parentObject)
        },
        createLine: function(a, b) {
            a = d.processObject(a, d.MapLine);
            isNaN(b) && (this.counter++, b = this.counter);
            a.index = b;
            a.remove && a.remove();
            var c = this.chart, e = c.linesSettings, g = this.objectsToResize, f = c.mapLinesContainer,
            h = c.stageLinesContainer, k = e.thickness, l = e.dashLength, m = e.arrow, n = e.arrowSize, q = e.arrowColor, t = e.arrowAlpha, r = e.color, p = e.alpha, u = e.rollOverColor, A = e.selectedColor, x = e.rollOverAlpha, z = e.balloonText, v = e.bringForwardOnHover, B = e.arc, C = e.rollOverBrightness, w = c.container;
            a.chart = c;
            a.baseSettings = e;
            var y = w.set();
            a.displayObject = y;
            this.allSvgObjects.push(y);
            a.arrays.push({
                arr: this.allSvgObjects,
                el: y
            });
            this.allObjects.push(a);
            a.arrays.push({
                arr: this.allObjects,
                el: a
            });
            a.mouseEnabled && c.addObjectEventListeners(y,
            a);
            if (a.remainVisible || c.selectedObject == a.parentObject) {
                var F = a.thickness;
                isNaN(F) && (F = k);
                k = a.dashLength;
                isNaN(k) && (k = l);
                l = a.color;
                void 0 == l && (l = r);
                r = a.alpha;
                isNaN(r) && (r = p);
                p = a.rollOverAlpha;
                isNaN(p) && (p = x);
                isNaN(p) && (p = r);
                x = a.rollOverColor;
                void 0 == x && (x = u);
                u = a.selectedColor;
                void 0 == u && (u = A);
                A = a.balloonText;
                void 0 === A && (A = z);
                z = a.arc;
                isNaN(z) && (z = B);
                B = a.arrow;
                if (!B || "none" == B && "none" != m)
                    B = m;
                m = a.arrowColor;
                void 0 == m && (m = q);
                void 0 == m && (m = l);
                q = a.arrowAlpha;
                isNaN(q) && (q = t);
                isNaN(q) && (q = r);
                t = a.arrowSize;
                isNaN(t) && (t = n);
                n = a.rollOverBrightness;
                void 0 == n && (n = C);
                a.colorReal = l;
                isNaN(e.selectedBrightness) || (u = d.adjustLuminosity(a.colorReal, e.selectedBrightness / 100));
                a.alphaReal = r;
                a.rollOverColorReal = x;
                a.rollOverAlphaReal = p;
                a.balloonTextReal = A;
                a.selectedColorReal = u;
                a.thicknessReal = F;
                a.rollOverBrightnessReal = n;
                void 0 === a.shiftArrow && (a.shiftArrow = e.shiftArrow);
                void 0 == a.bringForwardOnHover && (a.bringForwardOnHover = v);
                d.processDescriptionWindow(e, a);
                v = this.processCoordinates(a.x, c.realWidth);
                C = this.processCoordinates(a.y,
                c.realHeight);
                n = a.longitudes;
                e = a.latitudes;
                p = n.length;
                if (0 < p)
                    for (v = [], C = [], x = 0; x < p; x++)
                        A = c.coordinatesToXY(n[x], e[x]), v.push(A.x), C.push(A.y);
                if (0 < v.length) {
                    a.segments = v.length;
                    d.dx = 0;
                    d.dy = 0;
                    var E, H, G, p = 10 * (1 - Math.abs(z));
                    10 <= p && (p = NaN);
                    1 > p && (p = 1);
                    a.arcRadius = [];
                    a.distances = [];
                    n = c.mapContainer.scale;
                    if (isNaN(p)) {
                        for (p = 0; p < v.length - 1; p++)
                            H = Math.sqrt(Math.pow(v[p + 1] - v[p], 2) + Math.pow(C[p + 1] - C[p], 2)), a.distances[p] = H;
                        p = d.line(w, v, C, l, 1, F / n, k, !1, !1, !0);
                        l = d.line(w, v, C, l, .001, 5 / n, k, !1, !1, !0);
                        p.setAttr("stroke-linecap",
                        "round")
                    } else {
                        x = 1;
                        0 > z && (x = 0);
                        A = {
                            fill: "none",
                            stroke: l,
                            "stroke-opacity": 1,
                            "stroke-width": F / n,
                            "fill-opacity": 0,
                            "stroke-linecap": "round"
                        };
                        void 0 !== k && 0 < k && (A["stroke-dasharray"] = k);
                        for (var k = "", D = 0; D < v.length - 1; D++) {
                            var K = v[D], J = v[D + 1], L = C[D], O = C[D + 1];
                            H = Math.sqrt(Math.pow(J - K, 2) + Math.pow(O - L, 2));
                            G = H / 2 * p;
                            E = 270 + 180 * Math.acos(H / 2 / G) / Math.PI;
                            isNaN(E) && (E = 270);
                            if (K < J) {
                                var P = K, K = J, J = P, P = L, L = O, O = P;
                                E =- E
                            }
                            0 < z && (E =- E);
                            k += "M" + K + "," + L + "A" + G + "," + G + ",0,0," + x + "," + J + "," + O;
                            a.arcRadius[D] = G;
                            a.distances[D] = H
                        }
                        p = w.path(k).attr(A);
                        l = w.path(k).attr({
                            "fill-opacity": 0,
                            stroke: l,
                            "stroke-width": 5 / n,
                            "stroke-opacity": .001,
                            fill: "none"
                        })
                    }
                    d.setCN(c, p, "map-line");
                    void 0 != a.id && d.setCN(c, p, "map-line-" + a.id);
                    d.dx = .5;
                    d.dy = .5;
                    y.push(p);
                    y.push(l);
                    p.setAttr("opacity", r);
                    if ("none" != B) {
                        var I, M, N;
                        if ("end" == B || "both" == B)
                            x = v[v.length - 1], D = C[C.length - 1], 1 < v.length ? (A = v[v.length - 2], I = C[C.length - 2]) : (A = x, I = D), I = 180 * Math.atan((D - I) / (x - A)) / Math.PI, isNaN(E) || (I += E), M = x, N = D, I = 0 > x - A ? I - 90 : I + 90;
                        r = [ - t / 2 - .5, - .5, t / 2 - .5];
                        k = [t, - .5, t];
                        a.shiftArrow && "middle" != B &&
                        (k = [0, 1.2*-t, 0]);
                        "both" == B && (t = d.polygon(w, r, k, m, q, 1, m, q, void 0, !0), y.push(t), t.translate(M, N, 1 / n, !0), isNaN(I) || t.rotate(I), d.setCN(c, p, "map-line-arrow"), void 0 != a.id && d.setCN(c, p, "map-line-arrow-" + a.id), a.fixedSize && g.push(t));
                        if ("start" == B || "both" == B)
                            t = v[0], N = C[0], 1 < v.length ? (x = v[1], M = C[1]) : (x = t, M = N), I = 180 * Math.atan((N - M) / (t - x)) / Math.PI, isNaN(E) || (I -= E), M = t, I = 0 > t - x ? I - 90 : I + 90;
                        "middle" == B && (x = v[v.length - 1], D = C[C.length - 1], 1 < v.length ? (A = v[v.length - 2], I = C[C.length - 2]) : (A = x, I = D), M = A + (x - A) / 2, N = I + (D - I) /
                        2, I = 180 * Math.atan((D - I) / (x - A)) / Math.PI, isNaN(E) || (E = H / 2, G -= Math.sqrt(G * G - E * E), 0 > z && (G =- G), E = Math.sin(I / 180 * Math.PI), - 1 == E && (E = 1), M -= E * G, N += Math.cos(I / 180 * Math.PI) * G), I = 0 > x - A ? I - 90 : I + 90);
                        t = d.polygon(w, r, k, m, q, 1, m, q, void 0, !0);
                        d.setCN(c, p, "map-line-arrow");
                        void 0 != a.id && d.setCN(c, p, "map-line-arrow-" + a.id);
                        y.push(t);
                        t.translate(M, N, 1 / n, !0);
                        isNaN(I) || t.rotate(I);
                        a.fixedSize && (g.push(t), a.arrays.push({
                            arr: g,
                            el: t
                        }));
                        a.arrowSvg = t
                    }
                    a.fixedSize && p && (c = {
                        line: p,
                        thickness: F
                    }, this.linesToResize.push(c), a.arrays.push({
                        arr: this.linesToResize,
                        el: c
                    }), c = {
                        line: l,
                        thickness: 5
                    }, this.linesToResize.push(c), a.arrays.push({
                        arr: this.linesToResize,
                        el: c
                    }));
                    a.lineSvg = p;
                    a.showAsSelected&&!isNaN(u) && p.setAttr("stroke", u);
                    0 < e.length ? f.push(y) : h.push(y);
                    a.hidden && y.hide()
                }
            }
        },
        processCoordinates: function(a, b) {
            var c = [], d;
            for (d = 0; d < a.length; d++) {
                var g = a[d], f = Number(g);
                isNaN(f) && (f = Number(g.replace("%", "")) * b / 100);
                isNaN(f) || c.push(f)
            }
            return c
        },
        reset: function() {
            this.objectsToResize = [];
            this.allSvgObjects = [];
            this.allObjects = [];
            this.linesToResize = []
        }
    })
})();
(function() {
    var d = window.AmCharts;
    d.LinesSettings = d.Class({
        construct: function(a) {
            this.cname = "LinesSettings";
            this.balloonText = "[[title]]";
            this.thickness = 1;
            this.dashLength = 0;
            this.arrowSize = 10;
            this.arrowAlpha = 1;
            this.arrow = "none";
            this.color = "#990000";
            this.descriptionWindowWidth = 250;
            this.bringForwardOnHover=!0;
            d.applyTheme(this, a, this.cname)
        }
    })
})();
(function() {
    var d = window.AmCharts;
    d.MapObject = d.Class({
        construct: function(a) {
            this.fixedSize = this.mouseEnabled=!0;
            this.images = [];
            this.lines = [];
            this.areas = [];
            this.remainVisible=!0;
            this.passZoomValuesToTarget=!1;
            this.objectType = this.cname;
            d.applyTheme(this, a, "MapObject");
            this.arrays = []
        },
        deleteObject: function() {
            this.remove();
            this.parentArray && d.removeFromArray(this.parentArray, this);
            if (this.arrays)
                for (var a = 0; a < this.arrays.length; a++)
                    d.removeFromArray(this.arrays[a].arr, this.arrays[a].el);
            this.arrays =
            []
        }
    })
})();
(function() {
    var d = window.AmCharts;
    d.MapArea = d.Class({
        inherits: d.MapObject,
        construct: function(a) {
            this.cname = "MapArea";
            d.MapArea.base.construct.call(this, a);
            d.applyTheme(this, a, this.cname)
        },
        validate: function() {
            this.chart.areasProcessor.createArea(this)
        }
    })
})();
(function() {
    var d = window.AmCharts;
    d.MapLine = d.Class({
        inherits: d.MapObject,
        construct: function(a) {
            this.cname = "MapLine";
            this.longitudes = [];
            this.latitudes = [];
            this.x = [];
            this.y = [];
            this.segments = 0;
            this.arrow = "none";
            d.MapLine.base.construct.call(this, a);
            d.applyTheme(this, a, this.cname)
        },
        validate: function() {
            this.chart.linesProcessor.createLine(this)
        },
        remove: function() {
            var a = this.displayObject;
            a && a.remove()
        },
        getCoordinates: function(a, b) {
            isNaN(b) && (b = 0);
            if (!isNaN(a)) {
                var c, e, g, f, h, k;
                if (1 < this.longitudes.length) {
                    e =
                    this.chart.coordinatesToXY(this.longitudes[b], this.latitudes[b]);
                    var l = this.chart.coordinatesToXY(this.longitudes[b + 1], this.latitudes[b + 1]);
                    c = e.x;
                    g = l.x;
                    e = e.y;
                    f = l.y
                } else 
                    1 < this.x.length && (c = this.x[b], g = this.x[b + 1], e = this.y[b], f = this.y[b + 1]);
                l = Math.sqrt(Math.pow(g - c, 2) + Math.pow(f - e, 2));
                c < g&&!isNaN(this.arc) && 0 !== this.arc && (a = 1 - a);
                h = c + (g - c) * a;
                k = e + (f - e) * a;
                var m = Math.atan2(f - e, g - c);
                if (!isNaN(this.arc) && 0 !== this.arc && this.arcRadius) {
                    var n = 0;
                    c < g && (n = c, c = g, g = n, n = e, e = f, f = n, n = Math.PI);
                    k = this.arcRadius[b];
                    0 >
                    this.arc && (l =- l);
                    h = c + (g - c) / 2 + Math.sqrt(k * k - l / 2 * (l / 2)) * (e - f) / l;
                    var q = e + (f - e) / 2 + Math.sqrt(k * k - l / 2 * (l / 2)) * (g - c) / l;
                    c = 180 * Math.atan2(e - q, c - h) / Math.PI;
                    g = 180 * Math.atan2(f - q, g - h) / Math.PI;
                    180 < g - c && (g -= 360);
                    m = d.degreesToRadians(c + (g - c) * a);
                    h += k * Math.cos(m);
                    k = q + k * Math.sin(m);
                    m = 0 < this.arc ? m + Math.PI / 2 : m - Math.PI / 2;
                    m += n
                }
                this.distance = l;
                return {
                    x: h,
                    y: k,
                    angle: m
                }
            }
        },
        fixToStage: function() {
            if (0 < this.latitudes.length) {
                this.y = [];
                for (var a = 0; a < this.latitudes.length; a++) {
                    var b = this.chart.coordinatesToStageXY(this.longitudes[a],
                    this.latitudes[a]);
                    this.y.push(b.y);
                    this.x.push(b.x)
                }
                this.latitudes = [];
                this.longitudes = []
            }
            this.validate()
        },
        fixToMap: function() {
            if (0 < this.y.length) {
                this.latitudes = [];
                for (var a = 0; a < this.y.length; a++) {
                    var b = this.chart.stageXYToCoordinates(this.x[a], this.y[a]);
                    this.latitudes.push(b.latitude);
                    this.longitudes.push(b.longitude)
                }
                this.y = [];
                this.x = []
            }
            this.validate()
        }
    })
})();
(function() {
    var d = window.AmCharts;
    d.MapImage = d.Class({
        inherits: d.MapObject,
        construct: function(a) {
            this.cname = "MapImage";
            this.scale = 1;
            this.widthAndHeightUnits = "pixels";
            this.labelShiftY = this.labelShiftX = 0;
            this.positionOnLine = .5;
            this.direction = 1;
            this.lineSegment = this.extraAngle = 0;
            this.animateAngle=!0;
            this.createEvents("animationStart", "animationEnd");
            d.MapImage.base.construct.call(this, a);
            d.applyTheme(this, a, this.cname)
        },
        validate: function() {
            this.chart.imagesProcessor.createImage(this)
        },
        updatePosition: function() {
            this.chart.imagesProcessor.updateSizeAndPosition(this)
        },
        remove: function() {
            var a = this.displayObject;
            a && a.remove();
            (a = this.imageLabel) && a.remove()
        },
        animateTo: function(a, b, c, d) {
            isNaN(c) || (this.animationDuration = c);
            d && (this.easingFunction = d);
            this.finalX = a;
            this.finalY = b;
            isNaN(this.longitude) || (this.initialX = this.longitude);
            isNaN(this.left) || (this.initialX = this.left);
            isNaN(this.right) || (this.initialX = this.right);
            isNaN(this.latitude) || (this.initialY = this.latitude);
            isNaN(this.top) || (this.initialY = this.top);
            isNaN(this.bottom) || (this.initialY = this.bottom);
            this.animatingAlong =
            !1;
            this.animate()
        },
        animateAlong: function(a, b, c) {
            1 == this.positionOnLine && this.flipDirection && (this.direction =- 1, this.extraAngle = 180);
            isNaN(b) || (this.animationDuration = b);
            c && (this.easingFunction = c);
            a && (this.line = this.chart.getObjectById(a));
            this.animateAlongLine = this.line;
            this.animatingAlong=!0;
            this.animate()
        },
        animate: function() {
            var a = this, b = a.chart.imagesSettings, c = a.animationDuration;
            isNaN(c) && (c = b.animationDuration);
            a.totalFrames = c * d.updateRate;
            c = 1;
            a.line && b.adjustAnimationSpeed && (a.line.distances &&
            (c = a.line.distances[a.lineSegment] * a.chart.zoomLevel(), c = Math.abs(c / b.baseAnimationDistance)), a.totalFrames = Math.round(c * a.totalFrames));
            a.frame = 0;
            a.clearTO();
            a.timeOut = setTimeout(function() {
                a.update.call(a)
            }, 1E3 / d.updateRate);
            a.fire({
                type: "animationStart",
                chart: a.chart,
                image: this,
                lineSegment: a.lineSegment,
                direction: a.direction
            })
        },
        clearTO: function() {
            this.timeOut && clearTimeout(this.timeOut)
        },
        update: function() {
            var a = this;
            a.updatePosition();
            var b = Math.round(1E3 / d.updateRate), c = a.chart.imagesSettings,
            e = a.easingFunction;
            e || (e = c.easingFunction);
            a.frame++;
            c = a.totalFrames;
            a.frame <= c ? (e = e(0, a.frame, 0, 1, c), - 1 == a.direction && (e = 1 - e), a.animatingAlong ? a.positionOnLine = e : (c = a.initialX + (a.finalX - a.initialX) * e, isNaN(a.longitude) || (a.longitude = c), isNaN(a.left) || (a.left = c), isNaN(a.right) || (a.right = c), e = a.initialY + (a.finalY - a.initialY) * e, isNaN(a.latitude) || (a.latitude = e), isNaN(a.top) || (a.top = e), isNaN(a.bottom) || (a.bottom = e)), a.clearTO(), window.requestAnimationFrame ? window.requestAnimationFrame(function() {
                a.update.call(a)
            }) :
            a.timeOut = setTimeout(function() {
                a.update.call(a)
            }, b)) : (a.fire({
                type: "animationEnd",
                chart: a.chart,
                image: this,
                lineSegment: a.lineSegment,
                direction: a.direction
            }), a.animatingAlong && (1 == a.direction ? a.lineSegment < a.line.segments - 2 ? (a.lineSegment++, a.delayAnimateAlong(), a.positionOnLine = 0) : a.flipDirection ? (a.direction =- 1, a.extraAngle = 180, a.delayAnimateAlong()) : a.loop && (a.delayAnimateAlong(), a.lineSegment = 0) : 0 < a.lineSegment ? (a.lineSegment--, a.delayAnimateAlong(), a.positionOnLine = 0) : a.loop && a.flipDirection ?
            (a.direction = 1, a.extraAngle = 0, a.delayAnimateAlong()) : a.loop && a.delayAnimateAlong()))
        },
        delayAnimateAlong: function() {
            var a = this;
            a.clearTO();
            a.animateAlongLine && (a.timeOut = setTimeout(function() {
                a.animateAlong.call(a)
            }, 1E3 * a.chart.imagesSettings.pauseDuration))
        },
        fixToStage: function() {
            if (!isNaN(this.longitude)) {
                var a = this.chart.coordinatesToStageXY(this.longitude, this.latitude);
                this.left = a.x;
                this.top = a.y;
                this.latitude = this.longitude = void 0
            }
            this.validate()
        },
        fixToMap: function() {
            if (!isNaN(this.left)) {
                var a =
                this.chart.stageXYToCoordinates(this.left, this.top);
                this.longitude = a.longitude;
                this.latitude = a.latitude;
                this.top = this.left = void 0
            }
            this.validate()
        }
    })
})();
(function() {
    var d = window.AmCharts;
    d.degreesToRadians = function(a) {
        return a / 180 * Math.PI
    };
    d.radiansToDegrees = function(a) {
        return a / Math.PI * 180
    };
    d.getColorFade = function(a, b, c) {
        var e = d.hex2RGB(b);
        b = e[0];
        var g = e[1], e = e[2], f = d.hex2RGB(a);
        a = f[0];
        var h = f[1], f = f[2];
        a += Math.round((b - a) * c);
        h += Math.round((g - h) * c);
        f += Math.round((e - f) * c);
        return "rgb(" + a + "," + h + "," + f + ")"
    };
    d.hex2RGB = function(a) {
        return [parseInt(a.substring(1, 3), 16), parseInt(a.substring(3, 5), 16), parseInt(a.substring(5, 7), 16)]
    };
    d.processDescriptionWindow =
    function(a, b) {
        isNaN(b.descriptionWindowX) && (b.descriptionWindowX = a.descriptionWindowX);
        isNaN(b.descriptionWindowY) && (b.descriptionWindowY = a.descriptionWindowY);
        isNaN(b.descriptionWindowLeft) && (b.descriptionWindowLeft = a.descriptionWindowLeft);
        isNaN(b.descriptionWindowRight) && (b.descriptionWindowRight = a.descriptionWindowRight);
        isNaN(b.descriptionWindowTop) && (b.descriptionWindowTop = a.descriptionWindowTop);
        isNaN(b.descriptionWindowBottom) && (b.descriptionWindowBottom = a.descriptionWindowBottom);
        isNaN(b.descriptionWindowWidth) &&
        (b.descriptionWindowWidth = a.descriptionWindowWidth);
        isNaN(b.descriptionWindowHeight) && (b.descriptionWindowHeight = a.descriptionWindowHeight)
    };
    d.normalizePath = function(a) {
        for (var b = "", c = d.parsePath(a.getAttribute("d")), e, g, f = Infinity, h =- Infinity, k = Infinity, l =- Infinity, m = 0; m < c.length; m++) {
            var n = c[m], q = n.letter, t = n.x, n = n.y;
            "h" == q && (q = "L", t += e, n = g);
            "H" == q && (q = "L", n = g);
            "v" == q && (q = "L", t = e, n += g);
            "V" == q && (q = "L", t = e);
            if ("m" === q || "l" === q)
                q = q.toUpperCase(), t += e, n += g;
            t = d.roundTo(t, 3);
            n = d.roundTo(n, 3);
            e = t;
            g = n;
            t > h && (h = t);
            t < f && (f = t);
            n > l && (l = n);
            n < k && (k = n);
            b = "z" == q.toLowerCase() ? b + "Z " : b + (q + " " + t + " " + n + " ")
        }
        a.setAttribute("d", b);
        return {
            minX: f,
            maxX: h,
            minY: k,
            maxY: l
        }
    };
    d.mercatorLatitudeToRadians = function(a) {
        return Math.log(Math.tan(Math.PI / 4 + d.degreesToRadians(a) / 2))
    };
    d.parsePath = function(a) {
        a = a.match(/([MmLlHhVvZz]{1}[0-9.,\-\s]*)/g);
        for (var b = [], c = 0; c < a.length; c++) {
            var d = a[c].match(/([MmLlHhVvZz]{1})|([0-9.\-]+)/g), g = {
                letter: d[0]
            };
            switch (d[0]) {
            case "Z":
            case "Z":
            case "z":
                break;
            case "V":
            case "v":
                g.y = Number(d[1]);
                break;
            case "H":
            case "h":
                g.x = Number(d[1]);
                break;
            default:
                g.x = Number(d[1]), g.y = Number(d[2])
            }
            b.push(g)
        }
        return b
    };
    d.acos = function(a) {
        return 1 < a ? 0 : - 1 > a ? Math.PI : Math.acos(a)
    };
    d.asin = function(a) {
        return 1 < a ? Math.PI / 2 : - 1 > a?-Math.PI / 2 : Math.asin(a)
    };
    d.sinci = function(a) {
        return a ? a / Math.sin(a) : 1
    };
    d.asqrt = function(a) {
        return 0 < a ? Math.sqrt(a) : 0
    };
    d.winkel3 = function(a, b) {
        var c = d.aitoff(a, b);
        return [(c[0] + a / Math.PI * 2) / 2, (c[1] + b) / 2]
    };
    d.winkel3.invert = function(a, b) {
        var c = a, e = b, g = 25, f = Math.PI / 2;
        do 
            var h = Math.cos(e), k = Math.sin(e),
            l = Math.sin(2 * e), m = k * k, n = h * h, q = Math.sin(c), t = Math.cos(c / 2), r = Math.sin(c / 2), p = r * r, u = 1 - n * t * t, A = u ? d.acos(h * t) * Math.sqrt(x = 1 / u): x = 0, x, u = .5 * (2 * A * h * r + c / f) - a, z = .5 * (A * k + e) - b, v = .5 * x * (n * p + A * h * t * m) + .5 / f, B = x * (q * l / 4 - A * k * r), k = .125 * x * (l * r - A * k * n * q), m = .5 * x * (m * t + A * p * h) + .5, h = B * k - m * v, B = (z * B - u * m) / h, u = (u * k - z * v) / h, c = c - B, e = e - u;
        while ((1E-6 < Math.abs(B) || 1E-6 < Math.abs(u)) && 0<--g);
        return [c, e]
    };
    d.aitoff = function(a, b) {
        var c = Math.cos(b), e = d.sinci(d.acos(c * Math.cos(a/=2)));
        return [2 * c * Math.sin(a) * e, Math.sin(b) * e]
    };
    d.orthographic =
    function(a, b) {
        return [Math.cos(b) * Math.sin(a), Math.sin(b)]
    };
    d.equirectangular = function(a, b) {
        return [a, b]
    };
    d.equirectangular.invert = function(a, b) {
        return [a, b]
    };
    d.eckert5 = function(a, b) {
        var c = Math.PI;
        return [a * (1 + Math.cos(b)) / Math.sqrt(2 + c), 2 * b / Math.sqrt(2 + c)]
    };
    d.eckert5.invert = function(a, b) {
        var c = Math.sqrt(2 + Math.PI), d = b * c / 2;
        return [c * a / (1 + Math.cos(d)), d]
    };
    d.eckert6 = function(a, b) {
        for (var c = Math.PI, d = (1 + c / 2) * Math.sin(b), g = 0, f = Infinity; 10 > g && 1E-5 < Math.abs(f); g++)
            b -= f = (b + Math.sin(b) - d) / (1 + Math.cos(b));
        d = Math.sqrt(2 +
        c);
        return [a * (1 + Math.cos(b)) / d, 2 * b / d]
    };
    d.eckert6.invert = function(a, b) {
        var c = 1 + Math.PI / 2, e = Math.sqrt(c / 2);
        return [2 * a * e / (1 + Math.cos(b*=e)), d.asin((b + Math.sin(b)) / c)]
    };
    d.mercator = function(a, b) {
        b >= Math.PI / 2 - .02 && (b = Math.PI / 2 - .02);
        b<=-Math.PI / 2 + .02 && (b =- Math.PI / 2 + .02);
        return [a, Math.log(Math.tan(Math.PI / 4 + b / 2))]
    };
    d.mercator.invert = function(a, b) {
        return [a, 2 * Math.atan(Math.exp(b)) - Math.PI / 2]
    };
    d.miller = function(a, b) {
        return [a, 1.25 * Math.log(Math.tan(Math.PI / 4 + .4 * b))]
    };
    d.miller.invert = function(a, b) {
        return [a, 2.5 *
        Math.atan(Math.exp(.8 * b)) - .625 * Math.PI]
    };
    d.eckert3 = function(a, b) {
        var c = Math.PI, d = Math.sqrt(c * (4 + c));
        return [2 / d * a * (1 + Math.sqrt(1 - 4 * b * b / (c * c))), 4 / d * b]
    };
    d.eckert3.invert = function(a, b) {
        var c = Math.PI, e = Math.sqrt(c * (4 + c)) / 2;
        return [a * e / (1 + d.asqrt(1 - b * b * (4 + c) / (4 * c))), b * e / 2]
    }
})();
(function() {
    var d = window.AmCharts;
    d.MapData = d.Class({
        inherits: d.MapObject,
        construct: function() {
            this.cname = "MapData";
            d.MapData.base.construct.call(this);
            this.projection = "mercator";
            this.topLatitude = 90;
            this.bottomLatitude =- 90;
            this.leftLongitude =- 180;
            this.rightLongitude = 180;
            this.zoomLevel = 1;
            this.getAreasFromMap=!1
        }
    })
})();
(function() {
    var d = window.AmCharts;
    d.DescriptionWindow = d.Class({
        construct: function() {},
        show: function(a, b, c, d) {
            var g = this, f = document.createElement("div");
            f.style.position = "absolute";
            var h = a.classNamePrefix + "-description-";
            f.className = "ammapDescriptionWindow " + h + "div";
            g.div = f;
            b.appendChild(f);
            var k = ".gif";
            a.svgIcons && (k = ".svg");
            var l = document.createElement("img");
            l.className = "ammapDescriptionWindowCloseButton " + h + "close-img";
            l.src = a.pathToImages + "xIcon" + k;
            l.style.cssFloat = "right";
            l.style.cursor = "pointer";
            l.onclick = function() {
                g.close()
            };
            l.onmouseover = function() {
                l.src = a.pathToImages + "xIconH" + k
            };
            l.onmouseout = function() {
                l.src = a.pathToImages + "xIcon" + k
            };
            f.appendChild(l);
            b = document.createElement("div");
            b.className = "ammapDescriptionTitle " + h + "title-div";
            b.onmousedown = function() {
                g.div.style.zIndex = 1E3
            };
            f.appendChild(b);
            d = document.createTextNode(d);
            b.appendChild(d);
            d = b.offsetHeight;
            b = document.createElement("div");
            b.className = "ammapDescriptionText " + h + "text-div";
            b.style.maxHeight = g.maxHeight - d - 20 + "px";
            f.appendChild(b);
            b.innerHTML = c
        },
        close: function() {
            try {
                this.div.parentNode.removeChild(this.div)
            } catch (a) {}
        }
    })
})();
(function() {
    var d = window.AmCharts;
    d.ValueLegend = d.Class({
        construct: function(a) {
            this.cname = "ValueLegend";
            this.enabled=!0;
            this.showAsGradient=!1;
            this.minValue = 0;
            this.height = 12;
            this.width = 200;
            this.bottom = this.left = 10;
            this.borderColor = "#FFFFFF";
            this.borderAlpha = this.borderThickness = 1;
            this.color = "#000000";
            this.fontSize = 11;
            d.applyTheme(this, a, this.cname)
        },
        init: function(a, b) {
            if (this.enabled) {
                var c = a.areasSettings.color, e = a.areasSettings.colorSolid, g = a.colorSteps;
                d.remove(this.set);
                var f = b.set();
                this.set =
                f;
                d.setCN(a, f, "value-legend");
                var h = 0, k = this.minValue, l = this.fontSize, m = a.fontFamily, n = this.color;
                void 0 == k && (k = a.minValueReal);
                void 0 !== k && (h = d.text(b, k, n, m, l, "left"), h.translate(0, l / 2 - 1), d.setCN(a, h, "value-legend-min-label"), f.push(h), h = h.getBBox().height);
                k = this.maxValue;
                void 0 === k && (k = a.maxValueReal);
                void 0 !== k && (h = d.text(b, k, n, m, l, "right"), h.translate(this.width, l / 2 - 1), d.setCN(a, h, "value-legend-max-label"), f.push(h), h = h.getBBox().height);
                if (this.showAsGradient)
                    c = d.rect(b, this.width, this.height,
                    [c, e], 1, this.borderThickness, this.borderColor, 1, 0, 0), d.setCN(a, c, "value-legend-gradient"), c.translate(0, h), f.push(c);
                else 
                    for (l = this.width / g, m = 0; m < g; m++)
                        n = d.getColorFade(c, e, 1 * m / (g - 1)), n = d.rect(b, l, this.height, n, 1, this.borderThickness, this.borderColor, 1), d.setCN(a, n, "value-legend-color"), d.setCN(a, n, "value-legend-color-" + m), n.translate(l * m, h), f.push(n);
                e = c = 0;
                g = f.getBBox();
                h = a.getY(this.bottom, !0);
                l = a.getY(this.top);
                m = a.getX(this.right, !0);
                n = a.getX(this.left);
                isNaN(l) || (c = l);
                isNaN(h) || (c = h - g.height);
                isNaN(n) || (e = n);
                isNaN(m) || (e = m - g.width);
                f.translate(e, c)
            } else 
                d.remove(this.set)
        }
    })
})();
(function() {
    var d = window.AmCharts;
    d.ObjectList = d.Class({
        construct: function(a) {
            this.divId = a
        },
        init: function(a) {
            this.chart = a;
            var b = this.divId;
            this.container && (b = this.container);
            this.div = "object" != typeof b ? document.getElementById(b) : b;
            b = document.createElement("div");
            b.className = "ammapObjectList " + a.classNamePrefix + "-object-list-div";
            this.div.appendChild(b);
            this.addObjects(a.dataProvider, b)
        },
        addObjects: function(a, b) {
            var c = this.chart, d = document.createElement("ul");
            d.className = c.classNamePrefix + "-object-list-ul";
            var g;
            if (a.areas)
                for (g = 0; g < a.areas.length; g++) {
                    var f = a.areas[g];
                    void 0 === f.showInList && (f.showInList = c.showAreasInList);
                    this.addObject(f, d)
                }
            if (a.images)
                for (g = 0; g < a.images.length; g++)
                    f = a.images[g], void 0 === f.showInList && (f.showInList = c.showImagesInList), this.addObject(f, d);
            if (a.lines)
                for (g = 0; g < a.lines.length; g++)
                    f = a.lines[g], void 0 === f.showInList && (f.showInList = c.showLinesInList), this.addObject(f, d);
            0 < d.childNodes.length && b.appendChild(d)
        },
        addObject: function(a, b) {
            var c = this;
            if (a.showInList && void 0 !==
            a.title) {
                var d = c.chart, g = document.createElement("li");
                g.className = d.classNamePrefix + "-object-list-li";
                var f = a.titleTr;
                f || (f = a.title);
                var f = document.createTextNode(f), h = document.createElement("a");
                h.className = d.classNamePrefix + "-object-list-a";
                h.appendChild(f);
                g.appendChild(h);
                b.appendChild(g);
                this.addObjects(a, g);
                h.onmouseover = function() {
                    c.chart.rollOverMapObject(a, !1)
                };
                h.onmouseout = function() {
                    c.chart.rollOutMapObject(a)
                };
                h.onclick = function() {
                    c.chart.clickMapObject(a)
                }
            }
        }
    })
})();


