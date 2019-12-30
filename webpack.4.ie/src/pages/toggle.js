 ! function() {
     function createToggleHq(param) {
         var object = new t(param);
         return object.init(), object;
     }

     function t(e) {
         i = hxc3.hqHelper.decimalRound,
             n = hxc3.hqHelper.filterStatus,
             s = hxc3.hqHelper.numFormatter,
             a = hxc3.hqHelper.klineTypeConvertToNum,
             this.configs = $.extend({}, t.defaultConfigs, e);
     }

     function fixHeader(e, t, o, i) {
         var n = e.hxc3Data,
             s = { ab: t.ab, eq: t.eq, be: t.be };
         n.curP = "" === n.curP ? "00.00" : n.curP,
             n.wgtColor = s[n.curPStatus],
             n.wgtStopStr = n.isStop ? " 停牌" : "",
             n.arrowEnable = /^(ab|be)/.test(n.curPStatus) ? "inline" : "none",
             n.arrowDirect = /^(ab)/.test(n.curPStatus) ? "" : "transform: scale(-1); margin-top:9px;";
         var a = (o.width() - 300) / 4 > 70 ? (o.width() - 300) / 4 : 70;
         n.infoItemCss = t.infoItemCss + "width: " + a + "px;";
         var r = i;
         r = r.replace(/<%([^%>]+)?%>/g, function(e, t) { return n[t] });
         var l = o.find(".hxc3-wgt-toggle");
         l.length ? l.html("") : l = $('<div class="hxc3-wgt-toggle" style="position: absolute; top: 0;left: 0;width: 100%;font-family: DIN-Regular;"><div style="padding: 10px; overflow: hidden;"></div></div>').appendTo(o), l.html('<div style="padding: 10px; overflow: hidden;">' + r + "</div>")
     }
     isFinite(window.hxc3Widget) || (hxc3Widget = {}), hxc3Widget.createToggleHq = createToggleHq;
     var i, n, s, a;
     t.defaultConfigs = {
         elementId: "chart",
         code: "hs_300033",
         fsUpColor: "rgba(247,48,75,1)",
         fsDownColor: "rgba(48,172,99,1)",
         fsEqColor: "rgba(99,99,99,1)",
         klineUpColor: "rgba(247,48,75,1)",
         klineDownColor: "rgba(48,172,99,1)",
         klineEqColor: "rgba(99,99,99,1)",
         coverKlineOption: void 0,
         coverFsOption: void 0,
         axisPointerBackground: "#636363",
         axisPointerColor: "#fff",
         axisColor: "#BCBCBC",
         realheadHeight: 88,
         stockTabsCss: "position: absolute; right: 10px; background: #fff; top: 40px; font-size: 12px;",
         stockTabsItemCss: "display: inline-block; cursor: pointer; margin: 0px 10px; padding: 4px 0; color: #BCBCBC;",
         infoItemCss: "display: inline-block; width: 80px; line-height: 26px;",
         realheadTpl: ['<div style="position: absolute; top: 0;left: 0;width: 100%;font-family: DIN-Regular;">', '                <div style="padding: 10px;display: block; overflow: hidden;">', '                    <div style="">', '                        <div style="color: <%wgtColor%>;">', '                            <div style="line-height: 26px">', '                                <span style="font-size: 14px;"><%name%></span>', '                                <span style=""><%shortcode%></span>', "                            </div>", '                            <div style="line-height: 26px">', '                                <span style="font-size: 22px;"><%curP%></span>', "                                <span><%rate%>%    ", '                                    <span style="padding:0; display: <%arrowEnable%>;margin-left: 0px; width: 16px; height: 16px; color: #3cbc98; white-space: nowrap; text-overflow: ellipsis; line-height: 16px; margin-top: 7px; float: right;<%arrowDirect%>">', '                                        <svg viewBox="0 0 1024 1024" width="16" height="16">', '                                            <path fill="<%wgtColor%>" stroke-linecap="round" stroke-width="2" d="M288.864 636.032 511.968 405.312 735.136 636Z"></path>', "                                        </svg>", "                                    </span>", "                                </span>", "                            </div>", "                        </div>", "                    </div>", '<div style="width: 100%; height:10px;background: #f7f7f7;"></div>', "            </div>"].join(""),
         //  realheadTpl: ['<div style="position: absolute; top: 0;left: 0;width: 100%;font-family: DIN-Regular;">', '                <div style="padding: 10px;display: block; overflow: hidden;">', '                    <div style="float:left;">', '                        <div style="color: <%wgtColor%>;">', '                            <div style="line-height: 26px">', '                                <span style="font-size: 14px;"><%name%></span>', '                                <span style=""><%shortcode%></span>', "                            </div>", '                            <div style="line-height: 26px">', '                                <span style="font-size: 22px;"><%curP%></span>', "                                <span><%rate%>%    ", '                                    <span style="padding:0; display: <%arrowEnable%>;margin-left: 0px; width: 16px; height: 16px; color: #3cbc98; white-space: nowrap; text-overflow: ellipsis; line-height: 16px; margin-top: 7px; float: right;<%arrowDirect%>">', '                                        <svg viewBox="0 0 1024 1024" width="16" height="16">', '                                            <path fill="<%wgtColor%>" stroke-linecap="round" stroke-width="2" d="M288.864 636.032 511.968 405.312 735.136 636Z"></path>', "                                        </svg>", "                                    </span>", "                                </span>", "                            </div>", "                        </div>", "                    </div>", '                    <div style="float:left;margin-left: 16px; color: #636363;">', "                        <div>", '                            <div style="<%infoItemCss%>" data-hqitro="换手率"><span style="margin-right: 3px;">换手</span><span><%turnRate%>%</span></div>', '                            <div style="<%infoItemCss%>" data-hqitro="振幅"><span style="margin-right: 3px;">振幅</span><span><%zf%>%</span></div>', '                            <div style="<%infoItemCss%>" data-hqitro="成交量"><span style="margin-right: 3px;">量</span><span><%n%></span></div>', '                            <div style="<%infoItemCss%>" data-hqitro="成交额"><span style="margin-right: 3px;">额</span><span><%np%></span></div>', "                        </div>", '                        <div style="margin-top: 3px;">', '                            <div style="<%infoItemCss%>" data-hqitro="总市值"><span style="margin-right: 3px;">市值</span><span><%totalM%></span></div>', '                            <div style="<%infoItemCss%>" data-hqitro="流通市值"><span style="margin-right: 3px;">流通</span><span><%stockM%></span></div>', '                            <div style="<%infoItemCss%>" data-hqitro="市盈率"><span style="margin-right: 3px;">市盈</span><span><%staticSYL%></span></div>', '                            <div style="<%infoItemCss%>" data-hqitro="市净率"><span style="margin-right: 3px;">市净</span><span><%sjl%></span></div>', "                        </div>", "                    </div>", "                </div>", '<div style="width: 100%; height:10px;background: #f7f7f7;"></div>', "            </div>"].join("")
     };
     t.prototype.getFsOption = function() {
         var e = this.configs;
         var t = {
             data: [{
                     type: "fsTodayCommon",
                     normal: {
                         code: e.code,
                         isKeepingGet: true, //!1
                         intervalTime: 60000, // 1e4

                     }
                 },
                 {
                     type: "othersHqBase",
                     normal: { code: e.code, dType: "realhead" }
                 }
             ],
             grid: [{
                     left: 54,
                     right: 85,
                     height: "67%",
                     outline: "0,0,0,0",
                     topPlaceHolder: { show: !1 },
                     bottomPlaceHolder: { show: !0, outline: "0,0,0,0" }
                 },
                 { left: 54, right: 85, height: "33%", outline: "0,0,0,0" }
             ],
             scale: [
                 { scaleOutput: "x", scaleType: "point", gridIndex: [0, 1] },
                 { scaleOutput: "y", topSpace: 20, bottomSpace: 20, gridIndex: 0 },
                 { scaleOutput: "y", topSpace: 20, gridIndex: 1 }
             ],
             xAxis: [{
                     name: "fs x on grid0",
                     scaleIndex: 0,
                     filterType: "fsPrice",
                     position: "bottom",
                     split: "1,1",
                     splitPecent: "0,1",
                     axisLabel: { show: !0, autoIndent: !0 },
                     axisPointer: {
                         axisLabel: {
                             show: !0,
                             textStyle: { color: e.axisPointerColor, textBackgroundColor: e.axisPointerBackground, textBorderColor: e.axisPointerBackground }
                         },
                         crossLine: { show: !0 }
                     }
                 },
                 {
                     name: "fs x on grid1",
                     filterType: "fsPrice",
                     position: "bottom",
                     split: "1,1",
                     splitPecent: "0,1",
                     axisLabel: { show: !0, autoIndent: !0 },
                     axisPointer: {
                         axisLabel: {
                             show: !0,
                             textStyle: {
                                 color: "#fff",
                                 textBackgroundColor: "#555",
                                 textBorderColor: "#555"
                             }
                         },
                         crossLine: { show: !0 }
                     },
                     scaleIndex: 0,
                     gridIndex: 1
                 }
             ],
             yAxis: [{
                     name: "yprice",
                     filterType: "fsPrice",
                     split: "1,1,1,1,1",
                     position: "left",
                     axisLabel: {
                         autoIndent: !0,
                         filterColor: function(t) {
                             var o = t.preClosePrice,
                                 i = t.ticks[t.i];
                             return i > parseFloat(o) ? e.fsUpColor : i == parseFloat(o) ? e.fsEqColor : e.fsDownColor
                         },
                         textStyle: { offset: [-4, 0] }
                     },
                     axisPointer: {
                         axisLabel: {
                             show: !0,
                             filterColor: void 0,
                             filterBackgroundColor: void 0,
                             textStyle: {
                                 color: e.axisPointerColor,
                                 textBackgroundColor: e.axisPointerBackground,
                                 textBorderColor: e.axisPointerBackground
                             }
                         },
                         crossLine: { show: !0 }
                     },
                     scaleIndex: 1
                 },
                 {
                     name: "yvol",
                     filterType: "fsVol",
                     position: "left",
                     axisLabel: {
                         show: !0,
                         autoIndent: !0,
                         textStyle: { offset: [-4, 0] }
                     },
                     axisPointer: {
                         axisLabel: {
                             show: !0,
                             textStyle: { color: e.axisPointerColor, textBackgroundColor: e.axisPointerBackground, textBorderColor: e.axisPointerBackground }
                         },
                         crossLine: { show: !0 }
                     },
                     scaleIndex: 2,
                     gridIndex: 1
                 }
             ],
             tooltip: [{
                 position: function(e) { return { x: e.gridLayout.xEnd - 45, y: e.series[0].highlightPos[1] - 8 } },
                 formatter: function(e, t) {
                     var o = t.stockTypeObj,
                         a = o.keepLen,
                         r = o.needConvertoShou,
                         l = o.msg,
                         d = parseFloat(t.preClosePrice),
                         p = { t: "", preClosePrice: "", nowp: "", np: "", av: "", n: "", status: "", rate: "", ratep: "" },
                         c = e.series[0].data,
                         x = "";
                     "" != c.nowp ? (x = c.nowp, p.status = n(x, d)) : (x = "", p.status = "eq"), p.preClosePrice = d, p.nowp = i(x, a), p.av = i(c.av, a), p.avStatus = n(c.av, d), p.t = c.t, p.n = c.n, r && (p.n = c.n / 100), p.n = s(p.n, 0) || 0, p.np = s(c.np, 1) || 0;
                     var h = i(-(d - x), a),
                         f = i(h / d * 100, 2);
                     p.rate = f + "%", p.ratep = h;
                     var u;
                     return u = /^(Others_wh|Others_gzs|HS_block_hangye|HS_block_gainian|USA_index|Others_pmetal|Others_wh|Others_gzqh|Others_gqh|Others_qh|Others_zq|Others_sj|Others_ggqq)/.test(l) ? "<%t%><br/> 现价:<%nowp%><br/> 涨跌:<%ratep%><br/> 涨幅:<%rate%><br/> 量:<%n%><br/> 额:<%np%>" : "<%t%><br/> 现价:<%nowp%><br/> 均价:<%av%><br/> 涨跌:<%ratep%><br/> 涨幅:<%rate%><br/> 量:<%n%><br/> 额:<%np%>", u.replace(/<%([^%>]+)?%>/g, function(e, t) { if ("t" === t) return p[t].split(" ")[1].substr(0, 2) + ":" + p[t].split(" ")[1].substr(2, 2); if ("av" === t) { var o = p[t] > 1e5 ? parseFloat(p[t]).toFixed(1) : p[t]; return '<span class="hxc3-' + p.avStatus + '">' + o + "</span>" } var o = p[t] > 1e5 ? parseFloat(p[t]).toFixed(1) : p[t]; return '<span class="hxc3-' + p.status + '">' + o + "</span>" })
                 },
                 style: { padding: 0 },
                 alwaysShowContent: !0,
                 xAxisIndex: 0
             }],
             series: [{
                 type: "fsPrice",
                 uniqueName: "1111",
                 xAxisIndex: [0],
                 yAxisIndex: [0],
                 gridIndex: 0,
                 dataIndex: 0,
                 draw: {
                     nowp: { lineStyle: { color: e.fsEqColor } },
                     nowpLineClosed: { show: !0, lineStyle: { fill: "rgba(255,255,255,0)" } }
                 }
             }, {
                 type: "fsVol",
                 uniqueName: "222",
                 xAxisIndex: [1],
                 yAxisIndex: [1],
                 gridIndex: 1,
                 dataIndex: 0,
                 draw: {
                     vol: { color: { upColor: e.fsUpColor, downColor: e.fsDownColor, eqColor: e.fsEqColor } }
                 }
             }]
         };
         return e.coverFsOption ? $.extend({}, t, e.coverFsOption) : t
     };
     t.prototype.getKlineOption = function() {
         var e = this.configs;
         var t = {
             data: [{
                     type: "klineCommon",
                     normal: {
                         code: e.code,
                         dType: "klineQfqDay",
                         urlFormatter: function(e) {
                             var t = a(e.dType);
                             return "http://d.10jqka.com.cn/v6/line/" + e.stockCode + "/" + t + "/all.js"
                         },
                         keepGetUrlFormatter: function(e) {
                             var t = a(e.dType);
                             return "http://d.10jqka.com.cn/v6/line/" + e.stockCode + "/" + t + "/today.js"
                         },
                         isKeepingGet: !1,
                         intervalTime: 1e4
                     }
                 },
                 {
                     type: "othersHqBase",
                     normal: { code: e.code, dType: "realhead" }
                 }
             ],
             grid: [{
                     left: 54,
                     right: 85,
                     height: "67%",
                     outline: "0,0,0,0",
                     topPlaceHolder: { show: !0, height: 30, outline: "0,0,0,0" },
                     bottomPlaceHolder: { show: !0, outline: "0,0,0,0" }
                 },
                 {
                     left: 54,
                     right: 85,
                     height: "33%",
                     outline: "0,0,0,0"
                 }
             ],
             scale: [{
                     scaleOutput: "x",
                     scaleType: "band",
                     minNum: 10,
                     gridIndex: [0, 1],
                     dataZoomIndex: 0
                 },
                 {
                     scaleOutput: "y",
                     scaleIndex: 0,
                     minNum: 10,
                     topSpace: 20,
                     bottomSpace: 20,
                     gridIndex: 0
                 },
                 { scaleOutput: "y", topSpace: 20, scaleIndex: 0, minNum: 10, gridIndex: 1 }
             ],
             dataZoom: [{ enable: !0 }],
             xAxis: [{
                 name: "kline x on grid0",
                 filterType: "klinePrice",
                 position: "bottom",
                 split: "0,1,0",
                 splitPecent: "0,0.5,1",
                 axisLabel: { autoIndent: !0, maxTextWidth: 74, textStyle: { color: e.axisColor } },
                 axisPointer: { axisLabel: { show: !0, textStyle: { color: e.axisPointerColor, textBackgroundColor: e.axisPointerBackground, textBorderColor: e.axisPointerBackground } }, crossLine: { show: !0 } },
                 scaleIndex: 0,
                 gridIndex: 0
             }, {
                 name: "kline x on grid1",
                 filterType: "klinePrice",
                 position: "bottom",
                 split: "0,1,0",
                 splitPecent: "0,0.5,1",
                 axisLabel: { show: !1 },
                 axisPointer: { axisLabel: { show: !1 }, crossLine: { show: !0 } },
                 scaleIndex: 0,
                 gridIndex: 1
             }],
             yAxis: [{
                 name: "y %",
                 filterType: "klinePrice",
                 position: "left",
                 split: "1,1,1,1,1",
                 axisPointer: { axisLabel: { show: !0, textStyle: { color: e.axisPointerColor, textBackgroundColor: e.axisPointerBackground, textBorderColor: e.axisPointerBackground } }, crossLine: { show: !0 } },
                 axisLabel: { autoIndent: !0, textStyle: { offset: [-4, 0], color: e.axisColor } },
                 scaleIndex: 1
             }, {
                 name: "y vol %",
                 position: "left",
                 filterType: "klineVol",
                 axisLabel: { autoIndent: !0, textStyle: { offset: [-4, 0], color: e.axisColor } },
                 axisPointer: { axisLabel: { show: !0, textStyle: { color: e.axisPointerColor, textBackgroundColor: e.axisPointerBackground, textBorderColor: e.axisPointerBackground } }, crossLine: { show: !0 } },
                 scaleIndex: 2,
                 gridIndex: 1
             }],
             tooltip: [{
                 position: [-43, -40],
                 formatter: function(e, t) {
                     var o = t.stockTypeObj,
                         i = o.keepLen,
                         n = e.series[0].data,
                         s = "",
                         a = e.series[0].draw.maLines,
                         r = "";
                     for (var l in a) /^ma/.test(l) && n[l] && (r += '<span style="color:' + a[l].lineStyle.color + '">' + l.toUpperCase() + ": " + parseFloat(n[l]).toFixed(i) + " </span>");
                     return s += "<br/>" + r
                 },
                 alwaysShowContent: !0,
                 style: { padding: 0 },
                 xAxisIndex: 0
             }, {
                 position: function(e) {
                     return { x: e.gridLayout.xEnd - 45, y: e.series[0].highlightPos[1] - 28 }
                 },
                 formatter: function(e, t) {
                     var o = t.stockTypeObj,
                         a = o.keepLen,
                         r = o.needConvertoShou,
                         l = {},
                         d = e.series[0].data,
                         p = d.yc,
                         c = "";
                     return c = "" !== d.c ? d.c : "", l.t = d.t, l.ratep = i(c - p, a), l.maxP = i(d.a, a), l.minP = i(d.i, a), l.openP = i(d.o, a), l.closeP = i(c, a), l.n = d.n, r && (l.n = d.n / 100), l.n = s(l.n, 0) || 0, l.maxPStatus = n(d.a, p), l.minPStatus = n(d.i, p), l.openPStatus = n(d.o, p), l.rate = i((c - p) / p * 100, 2) + "%", l.status = c - p > 0 ? "ab" : c - p == 0 ? "eq" : "be", '<%t%><br/> 开：<span class="<%openPStatus%>"><%openP%></span><br/> 高：<span class="<%maxPStatus%>"><%maxP%></span><br/> 低：<span class="<%minPStatus%>"><%minP%></span><br/> 收：<span class="<%status%>"><%closeP%></span><br/> 幅：<span class="<%status%>"><%rate%></span><br/> 量：<span><%n%></span>'.replace(/<%([^%>]+)?%>/g, function(e, t) {
                         return "status" === t || "openPStatus" === t || "maxPStatus" === t || "minPStatus" === t ? "hxc3-" + l[t] : /^(openP|maxP|minP|closeP)$/.test(t) && l[t] > 1e5 ? parseFloat(l[t]).toFixed(1) : l[t]
                     });
                 },
                 alwaysShowContent: !0,
                 style: { padding: 0 },
                 xAxisIndex: 0
             }],
             series: [{
                 type: "klinePrice",
                 xAxisIndex: 0,
                 yAxisIndex: 0,
                 gridIndex: 0,
                 dataIndex: 0,
                 highlightDataY: function(e) { return e.a },
                 draw: {
                     nowp: { show: !0, upFillColor: e.klineUpColor, eqFillColor: e.klineUpColor, downFillColor: e.klineDownColor, upBorderColor: e.klineUpColor, eqBorderColor: e.klineUpColor, downBorderColor: e.klineDownColor, lineStyle: { width: 1 } }
                 },
                 markPoint: {
                     symbol: {
                         show: !0,
                         type: "html",
                         html: '<span class="symbolImg"><img src="http://u.thsi.cn/fileupload/data/Iwencai/2018/1fc00aaaec37365c0a203f73c2b7e408.png"/></span>'
                     },
                     label: { show: !1 },
                     data: []
                 }
             }, {
                 type: "klineVol",
                 xAxisIndex: 1,
                 yAxisIndex: 1,
                 gridIndex: 1,
                 dataIndex: 0,
                 draw: {
                     vol: { upFillColor: e.klineUpColor, eqFillColor: e.klineUpColor, downFillColor: e.klineDownColor, upBorderColor: e.klineUpColor, eqBorderColor: e.klineUpColor, downBorderColor: e.klineDownColor, borderWidth: 1 }
                 }
             }]
         };
         return e.coverKlineOption ? $.extend({}, t, e.coverKlineOption) : t
     };
     t.prototype.init = function() {
         function setChart(e, t) {
             e.setOption(t, { notMerge: !0, dataStore: !1 });
             e.off("global_data_update");
             e.on("global_data_update", function(t) {
                 console.log('data-update');
                 if (t[0] && t[1]) {
                     a.find(".hxc3-loading").remove();
                     var n = t[1],
                         s = t[1].hxc3Data.curPStatus,
                         r = { ab: i.klineUpColor, eq: i.klineEqColor, be: i.klineDownColor, infoItemCss: i.infoItemCss },
                         d = e.getModel("series", 0);
                     "fsPrice" === d.type && d.set({
                         draw: {
                             nowp: { lineStyle: { color: r[s] } },
                             nowpLineClosed: {
                                 lineStyle: {
                                     fill: {
                                         type: "linear",
                                         x: 0,
                                         y: 0,
                                         x2: 0,
                                         y2: 1,
                                         colorStops: [{ offset: 0, color: r[s].replace("1)", "0.2)") }, { offset: 1, color: r[s].replace("1)", "0.04)") }]
                                     }
                                 }
                             }
                         }
                     }), fixHeader(n, r, $("#" + l + " .stockInfo"), i.realheadTpl)
                 }
             });
         }
         var t, i = this.configs,
             n = i.elementId,
             s = "string" == typeof n ? document.getElementById(n) : n,
             a = $(s),
             r = n,
             l = r + "Realhead",
             d = r + "Hq";
         if (a.attr("_hxc3_id")) {
             t = hxc3.instances[a.attr("_hxc3_id")], t.resize();
         } else {
             var p = i.realheadHeight,
                 c = i.stockTabsItemCss,
                 x = i.stockTabsCss,
                 h = $("#" + r).height() - p;
             $("#" + r).html("").append('<div id="' + l + '" style="width: 100%; height: ' + p + 'px; display: block; position: relative; font-size: 12px;"> </div><div id="' + d + '" style="width: 100%; height: ' + h + 'px; display: block; position: relative;"> </div><div class="stockTabs" style="' + x + '"> </div>');

             $("#" + l).html("").append('<div class="stockInfo"> </div>');

             $("#" + r + " .stockTabs").append('<div class="stockTabsItem" data-hqtype="fs" style="' + c + ' border-bottom: 2px solid #F7304B; color: #F7304B;">分时</div> <div class="stockTabsItem" style="' + c + '" data-hqtype="klineday">日k</div> <div class="stockTabsItem" style="' + c + '" data-hqtype="klineweek">周k</div> <div class="stockTabsItem" style="' + c + '" data-hqtype="klinemonth">月k</div> ');

             t = hxc3.init(d);
             a.attr("_hxc3_id", t.id);
         }
         a.append('<div class="hxc3-loading" ><div class="hxc3-loaderbox">Loading...</div></div>');
         setChart(t, this.getFsOption());
         var f = this;
         //分时、k线图切换
         /****
          * 数据类型：

            klineQfqDay 前复权日线

            klineBfqDay 不复权日线

            klineQfqWeek 前复权周线

            klineHfqMonth 后复权月线

            即 复权类型 +ｋ线类型的各种排列组合：

            复权类型：　Qfq Bfq Hfq

            k线类型：　Day, Week, Month
          *  */
         $("#" + r).on("click", ".stockTabsItem", function(o) {
             o.preventDefault();
             var i = f.getFsOption(),
                 n = f.getKlineOption(),
                 hqType = $(this).attr("data-hqType");
             $(this).css({ "border-bottom": "2px solid #F7304B", color: "#F7304B" }).siblings().css({ border: "0 none", color: "#BCBCBC" });
             var chartOptions;
             switch (hqType) {
                 case "fs":
                     chartOptions = i;
                     break;
                 case "klineday":
                     n.data[0].normal.dType = "klineQfqDay", chartOptions = n;
                     break;
                 case "klineweek":
                     n.data[0].normal.dType = "klineQfqWeek", chartOptions = n;
                     break;
                 case "klinemonth":
                     n.data[0].normal.dType = "klineQfqMonth", chartOptions = n
             }
             setChart(t, chartOptions);
         });
         this.hxc3Chart = t;
     };
 }()