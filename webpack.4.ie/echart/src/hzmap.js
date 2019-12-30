 $(function() {
     $('.declaration-company .company-data-num').animateNumber({ number: 4544 });
     paintMap1();
     var value = (Math.random() * 20).toFixed(0) - 0;
     var value2 = parseInt(value / 2);
     var value3 = parseInt(value / 3)
     paintChart(value, value2, value3);
     new Countdown(5, document.querySelector('.card-item-01'), document.querySelector('#count-template'));
 });
 var xqdata = "120.702021,30.265072;120.683906,30.243654;120.679184,30.23907;120.676334,30.23747;120.668305,30.232711;120.654746,30.22509;120.654575,30.225038;120.654386,30.225085;120.643799,30.238656;120.637314,30.242115;120.633662,30.243136;120.631004,30.243198;120.629189,30.243028;120.626449,30.242859;120.615556,30.242218;120.6084,30.241776;120.600471,30.241179;120.590007,30.24034;120.581203,30.239559;120.576372,30.239152;120.566917,30.268907;120.566506,30.269338;120.565584,30.269374;120.561822,30.265199;120.561314,30.265045;120.560209,30.265507;120.556415,30.268546;120.555202,30.269024;120.554078,30.269;120.552966,30.268565;120.551291,30.266849;120.550121,30.267001;120.54224,30.269756;120.541249,30.269439;120.539628,30.267264;120.538329,30.267164;120.527999,30.268279;120.522468,30.248398;120.52163,30.245868;120.52057,30.245141;120.519392,30.245;120.517532,30.245031;120.498129,30.249466;120.497913,30.249561;120.497821,30.249641;120.498331,30.251673;120.498525,30.252882;120.498969,30.254449;120.499616,30.256794;120.49982,30.257541;120.499734,30.257595;120.499634,30.257636;120.497115,30.258038;120.490967,30.259058;120.490148,30.259209;120.489896,30.259212;120.48954,30.259197;120.489416,30.259192;120.487698,30.259031;120.487611,30.25916;120.487567,30.259546;120.487497,30.265122;120.487286,30.265734;120.487009,30.265973;120.486732,30.266026;120.486208,30.266025;120.481345,30.262887;120.479493,30.262261;120.478537,30.262066;120.47792,30.262007;120.466195,30.263453;120.466172,30.263506;120.466157,30.263558;120.466188,30.26473;120.466185,30.265803;120.466187,30.267963;120.466165,30.268788;120.466143,30.269847;120.46601,30.27063;120.46586,30.271222;120.46577,30.271984;120.465576,30.273378;120.465302,30.275046;120.464981,30.277166;120.464668,30.277478;120.464254,30.277617;120.46364,30.277605;120.453404,30.27835;120.451505,30.27911;120.451016,30.279579;120.45062,30.280103;120.392122,30.263621;120.375351,30.256801;120.368173,30.255333;120.353033,30.257879;120.351441,30.25892;120.34389,30.269325;120.340103,30.272548;120.330604,30.280679;120.32938,30.281613;120.328462,30.282127;120.319104,30.352901;120.325325,30.353271;120.326774,30.356779;120.328531,30.358766;120.33169,30.359465;120.33207,30.362369;120.334824,30.360232;120.339336,30.363109;120.340951,30.365808;120.344751,30.367713;120.348907,30.368617;120.350403,30.371754;120.355366,30.373207;120.358002,30.373275;120.367145,30.375864;120.369899,30.377125;120.376382,30.37859;120.379351,30.38007;120.388874,30.381686;120.397043,30.383673;120.399987,30.383933;120.400819,30.372823;120.398681,30.370768;120.387805,30.369768;120.381607,30.360232;120.379897,30.356724;120.382367,30.355806;120.377997,30.344899;120.394977,30.331167;120.404523,30.323121;120.418487,30.330056;120.423901,30.341692;120.433495,30.36141;120.438434,30.372672;120.443279,30.376905;120.450213,30.380043;120.460235,30.382686;120.476169,30.385467;120.498753,30.389029;120.505569,30.389302;120.567882,30.387878;120.589183,30.388522;120.619556,30.389001;120.6339,30.389453;120.642734,30.388577;120.659001,30.38559;120.684221,30.380125;120.69353,30.377823;120.698184,30.375029;120.702482,30.369425;120.703884,30.365849;120.704548,30.34446;120.704145,30.330796;120.705047,30.315596;120.706045,30.309454;120.710842,30.297527;120.714024,30.293345;120.719462,30.288437;120.702021,30.265072;120.702021,30.265072;";

 // var xqdata = "120.301274,30.294918;120.302748,30.311063;120.302506,30.312128;120.301533,30.315216;120.301416,30.321947;120.301298,30.322211;120.30054,30.323366;120.300519,30.323446;120.300467,30.323832;120.300205,30.32494;120.300192,30.32523;120.300181,30.326222;120.30007,30.327749;120.299945,30.329593;120.299968,30.33085;120.300144,30.331907;120.300465,30.3332;120.301027,30.334777;120.301597,30.336686;120.301885,30.337647;120.302284,30.339083;120.303069,30.341077;120.303825,30.34289;120.304445,30.3445;120.305128,30.34613;120.305927,30.347478;120.30669,30.348385;120.309218,30.351694;120.309499,30.352281;120.309633,30.353666;120.309916,30.354439;120.310256,30.354627;120.316326,30.357061;120.316727,30.357172;120.317095,30.357043;120.317511,30.356546;120.317595,30.35654;120.317726,30.356542;120.319477,30.35723;120.322042,30.357987;120.32419,30.358442;120.324901,30.358578;120.326622,30.358669;120.329326,30.358787;120.329865,30.358884;120.330541,30.359044;120.331062,30.359074;120.331668,30.359109;120.331891,30.35914;120.332029,30.359172;120.332303,30.359358;120.332566,30.359616;120.332675,30.359851;120.332841,30.360358;120.33319,30.36086;120.333469,30.361366;120.333501,30.361532;120.333447,30.362529;120.333472,30.362916;120.333535,30.363143;120.333803,30.363591;120.334391,30.364216;120.340047,30.369312;120.340602,30.369723;120.340972,30.369837;120.341647,30.369904;120.341985,30.369911;120.344396,30.368456;120.344831,30.36829;120.345045,30.368294;120.350313,30.372314;120.351761,30.372736;120.353207,30.372944;120.354164,30.373357;120.355029,30.373873;120.358472,30.377665;120.359062,30.378282;120.359525,30.3785;120.360357,30.378507;120.364735,30.378533;120.366896,30.378858;120.375752,30.381789;120.396297,30.387558;120.405688,30.389788;120.406061,30.389783;120.406429,30.389405;120.407619,30.379608;120.407613,30.378863;120.407455,30.378438;120.407205,30.378043;120.406831,30.377702;120.405309,30.377325;120.404565,30.377255;120.40314,30.377224;120.400317,30.376977;120.397395,30.375828;120.395683,30.374952;120.394633,30.373465;120.386303,30.350612;120.3863,30.350292;120.386453,30.349812;120.386853,30.349459;120.387539,30.348844;120.387878,30.348746;120.388281,30.348713;120.390206,30.349136;120.390686,30.349102;120.391088,30.348975;120.393501,30.346987;120.393684,30.346677;120.393713,30.346411;120.393541,30.346201;120.391692,30.345499;120.391598,30.345315;120.391582,30.345182;120.391719,30.344833;120.395311,30.34178;120.417811,30.323119;120.419043,30.322368;120.419538,30.322312;120.420656,30.323371;120.429586,30.340461;120.44841,30.379647;120.449898,30.381645;120.451194,30.38263;120.453168,30.383789;120.464589,30.388309;120.489683,30.393305;120.503982,30.394795;120.525183,30.39478;120.586892,30.394534;120.608077,30.394751;120.659748,30.394238;120.665735,30.393589;120.668754,30.392905;120.670415,30.392222;120.673976,30.390279;120.67667,30.387806;120.68172,30.379571;120.70156,30.334396;120.706505,30.323769;120.726056,30.289749;120.7263,30.289111;120.702021,30.265072;120.683906,30.243654;120.679184,30.23907;120.676334,30.23747;120.668305,30.232711;120.654746,30.22509;120.654575,30.225038;120.654386,30.225085;120.643799,30.238656;120.637314,30.242115;120.633662,30.243136;120.631004,30.243198;120.629189,30.243028;120.626449,30.242859;120.615556,30.242218;120.6084,30.241776;120.600471,30.241179;120.590007,30.24034;120.581203,30.239559;120.576372,30.239152;120.566917,30.268907;120.566506,30.269338;120.565584,30.269374;120.561822,30.265199;120.561314,30.265045;120.560209,30.265507;120.556415,30.268546;120.555202,30.269024;120.554078,30.269;120.552966,30.268565;120.551291,30.266849;120.550121,30.267001;120.54224,30.269756;120.541249,30.269439;120.539628,30.267264;120.538329,30.267164;120.527999,30.268279;120.522468,30.248398;120.52163,30.245868;120.52057,30.245141;120.519392,30.245;120.517532,30.245031;120.498129,30.249466;120.497913,30.249561;120.497821,30.249641;120.498331,30.251673;120.498525,30.252882;120.498969,30.254449;120.499616,30.256794;120.49982,30.257541;120.499734,30.257595;120.499634,30.257636;120.497115,30.258038;120.490967,30.259058;120.490148,30.259209;120.489896,30.259212;120.48954,30.259197;120.489416,30.259192;120.487698,30.259031;120.487611,30.25916;120.487567,30.259546;120.487497,30.265122;120.487286,30.265734;120.487009,30.265973;120.486732,30.266026;120.486208,30.266025;120.481345,30.262887;120.479493,30.262261;120.478537,30.262066;120.47792,30.262007;120.466195,30.263453;120.466172,30.263506;120.466157,30.263558;120.466188,30.26473;120.466185,30.265803;120.466187,30.267963;120.466165,30.268788;120.466143,30.269847;120.46601,30.27063;120.46586,30.271222;120.46577,30.271984;120.465576,30.273378;120.465302,30.275046;120.464981,30.277166;120.464668,30.277478;120.464254,30.277617;120.46364,30.277605;120.453404,30.27835;120.451505,30.27911;120.451016,30.279579;120.45062,30.280103;120.446323,30.297368;120.446018,30.297735;120.445772,30.29773;120.43446,30.287618;120.433348,30.286969;120.421006,30.286617;120.41977,30.286623;120.412179,30.289715;120.411374,30.289831;120.410567,30.289574;120.392122,30.263621;120.375351,30.256801;120.368173,30.255333;120.353033,30.257879;120.351441,30.25892;120.34389,30.269325;120.340103,30.272548;120.330604,30.280679;120.32938,30.281613;120.328462,30.282127;120.318642,30.284891;120.301554,30.294323;120.301274,30.294918;";

 function paintMap1() {
     var mapChart = echarts.init($('#mapDemo1')[0]);
     //每个区的连线
     var json = {
         data: [{
             "areaName": "上城区",
             "lineS": [120.173827, 30.227042],
             "lineM": [120.546984, 29.854627],
             "lineE": [120.646994, 29.854627]
         }, {
             "areaName": "下城区",
             "lineS": [120.180247, 30.303869],
             "lineM": [118.817194, 30.28162],
             "lineE": [118.717194, 30.28162],
             "position": "left"
         }, {
             "areaName": "江干区",
             "lineS": [120.297161, 30.306303],
             "lineM": [120.619894, 30.206303],
             "lineE": [120.719894, 30.206303]
         }, {
             "areaName": "拱墅区",
             "lineS": [120.152305, 30.339033],
             "lineM": [119.117194, 30.38162],
             "lineE": [119.017194, 30.38262],
             "position": "left"
         }, {
             "areaName": "西湖区",
             "lineS": [120.084168, 30.200025],
             "lineM": [118.417194, 29.761545],
             "lineE": [118.317194, 29.761545],
             "position": "left"
         }, {
             "areaName": "滨江区",
             "lineS": [120.184345, 30.180288],
             "lineM": [120.346984, 29.654627],
             "lineE": [120.446994, 29.654627]
         }, {
             "areaName": "萧山区",
             "lineS": [120.289971, 30.167329],
             "lineM": [120.546984, 30.054627],
             "lineE": [120.646994, 30.054627]
         }, {
             "areaName": "余杭区",
             "lineS": [119.991671, 30.38163],
             "lineM": [119.217194, 30.48162],
             "lineE": [119.117194, 30.48162],
             "position": "left"
         }, {
             "areaName": "富阳区",
             "lineS": [119.840113, 29.99525],
             "lineM": [120.046984, 29.554627],
             "lineE": [120.146994, 29.554627]
         }, {
             "areaName": "桐庐县",
             "lineS": [119.553321, 29.831694],
             "lineM": [119.817194, 29.391545],
             "lineE": [119.917194, 29.393525]
         }, {
             "areaName": "淳安县",
             "lineS": [118.889105, 29.608729],
             "lineM": [118.317194, 29.361545],
             "lineE": [118.217194, 29.361545],
             "position": "left"
         }, {
             "areaName": "建德市",
             "lineS": [119.371663, 29.481795],
             "lineM": [119.571663, 29.281795],
             "lineE": [119.6471663, 29.281795]
         }, {
             "areaName": "临安区",
             "lineS": [119.344309, 30.201545],
             "lineM": [118.517194, 29.961545],
             "lineE": [118.417194, 29.961545],
             "position": "left"
         }, {
             "areaName": "钱塘新区",
             "value": 94,
             "lineS": [120.489971, 30.306303],
             "lineM": [120.646984, 30.334627],
             "lineE": [120.746994, 30.334627]
         }],
     };
     var data = json.data;

     //每个区的选中颜色
     var reginSpecial = [{
         name: "富阳区",
         selected: true, // selected:true 默认选中
         itemStyle: { //地图区域的多边形图形样式
             emphasis: {
                 areaColor: '#0336e0', //设置为空字符串可使颜色不变
                 label: {
                     show: true
                 }
             }
         },
     }, {
         name: "余杭区",
         selected: true, // selected:true 默认选中
         itemStyle: { //地图区域的多边形图形样式
             emphasis: {
                 areaColor: '#2757f8', //设置为空字符串可使颜色不变
                 label: {
                     show: true
                 }
             }
         },
     }];
     var series = [];
     var mapConfig = {
         zoom: 1.05,
         itemStyle: {
             areaColor: "#22b1c3", //地图区域颜色
             borderColor: '#FFFFFF', //图形的描边颜色
             borderWidth: 1, //描边线宽。为 0 时无描边
             borderType: 'solid', //描边线宽。为 0 时无描边
             opacity: 0.6,
             shadowColor: "#074f77",
         }

     }
     series.push({
         type: 'map',
         map: 'hzjson',
         aspectScale: 0.68, //长宽比
         roam: false, //允许缩放和平移
         //初始化时的地图位置，可通过改变地图中心视角的经纬度来实现地图的平移
         // center: [119.476145, 29.899331],
         zoom: mapConfig.zoom, //地图缩放多少倍
         geoIndex: 0,
         // selectedMode: true, //点击区域，会处于选中状态，多选
         label: { //设置地图区域名的文本样式，例如地名的字体大小等
             normal: {
                 // show: true, //显示地区的文本名称,默认是不显示的，默认状态是hoverORclick才显示
                 fontSize: 12,
                 fontFamily: '微软雅黑',
                 fontWeight: 'bolder',
                 position: 'center',
                 color: '#FFFFFF',
             }
         },
         itemStyle: { //地图区域的多边形图形样式
             normal: {
                 areaColor: mapConfig.itemStyle.areaColor, //地图区域颜色
                 borderColor: mapConfig.itemStyle.borderColor, //图形的描边颜色
                 borderWidth: mapConfig.itemStyle.borderWidth, //描边线宽。为 0 时无描边
                 borderType: mapConfig.itemStyle.borderType,
                 opacity: mapConfig.itemStyle.opacity
             }
         },
         data: [],
         silent: true,
         markPoint: {
             symbol: 'circle',
             symbolSize: 10,
             silent: false,
             label: { //标注的文本
                 normal: {
                     show: true, //即是否显示标注的名称（data:name）
                     formatter: '{b}', //模板变量有 {a}、{b}、{c}，分别表示系列名，数据名，数据值。
                     // formatter: '{b}:{c}' //模板变量有 {a}、{b}、{c}，分别表示系列名，数据名，数据值。
                     backgroundColor: 'transparent',
                     fontSize: 12,
                     fontWeight: 'normal',
                     padding: [5, 10, 5, 10],
                     color: "transparent",
                     borderRadius: 5,
                 }
             },
             itemStyle: { //标注的样式。
                 normal: {
                     color: '#FFFFFF'
                 }
             },
             data: convertPointData(data),
         },

     });
     series.push({
         name: '',
         type: 'lines',
         zlevel: 2,
         symbol: 'none',
         silent: true, //不响应鼠标点击或事件
         effect: {
             show: false //关闭特效
         },
         tooltip: {
             show: false
         },
         polyline: true, //支持多点连线
         lineStyle: {
             normal: {
                 color: 'orange',
                 width: 1.5,
                 opacity: 0.9,
                 curveness: 0
             }
         },
         data: convertLineData(data)
     });

     series.push({
         name: '',
         type: 'scatter',
         coordinateSystem: 'geo',
         zlevel: 2,
         hoverAnimation: false, //hover时不高亮点
         cursor: 'default', //鼠标设置为箭头
         itemStyle: {
             normal: {
                 color: 'orange'
             }
         },
         tooltip: {
             show: false
         },
         label: {
             normal: {
                 show: true,
                 position: 'right',
                 backgroundColor: "transparent",
                 "formatter": function(e) {
                     return " {b|" + e.value[2] + "}{c|亿元,}{d|" + e.data.ratio + "}{c|%}\n{a|第" +
                         e.data.index + "名：" + e.name + "}"
                 },
                 "rich": {
                     "a": {
                         "fontSize": 12,
                         "fontWeight": "bold",
                         "color": "#FFFFFF",
                         "lineHeight": 20
                     },
                     "b": {
                         "fontSize": 18,
                         "fontFamily": "Microsoft YaHei",
                         "fontWeight": "bold",
                         "color": "#3196FA"
                     },
                     "c": {
                         "fontSize": 14,
                         "fontFamily": "Microsoft YaHei",
                         "color": "#3196FA"
                     },
                     "d": {
                         "fontSize": 14,
                         "fontFamily": "Microsoft YaHei",
                         "fontWeight": "bold",
                         "color": "#3196FA"
                     }
                 }
             }
         },
         data: convertValData(data)
     });
     var option = {
         selectedMode: 'single',
         backgroundColor: 'transparent', //画布背景颜色
         geo: {
             map: "hzjson",
             center: [119.476145, 29.899331],
             zoom: mapConfig.zoom,
             roam: false,
             label: { //设置地图区域名的文本样式，例如地名的字体大小等
                 normal: {
                     color: '#FFFFFF',
                 }
             },
             itemStyle: {
                 normal: {
                     areaColor: mapConfig.itemStyle.areaColor, //地图区域颜色
                     borderColor: mapConfig.itemStyle.borderColor, //图形的描边颜色
                     borderWidth: mapConfig.itemStyle.borderWidth, //描边线宽。为 0 时无描边
                     borderType: mapConfig.itemStyle.borderType,
                     opacity: mapConfig.itemStyle.opacity,
                     shadowColor: mapConfig.itemStyle.shadowColor,
                     shadowOffsetX: 0,
                     shadowOffsetY: 0
                 },
                 emphasis: {
                     label: {
                         show: false
                     }
                 }
             },
             regions: reginSpecial
         },
         series: series
     }

     $.get(' ../static/map/hz.json', function(hzJson) {
         echarts.registerMap('hzjson', hzJson);
         mapChart.setOption(option);

         mapChart.on('mouseover', { seriesIndex: 0, name: "建德市" }, function(params) {
             debugger
             console.log(params);
         });
         //  mapChart.on('mapselectchanged', function(param) {
         //      debugger
         //      alert(param.batch[0].name);
         //  });
         //  mapChart.on('geoselected', function(param) {
         //      debugger
         //      alert(param.batch[0].name);
         //  });
     });
 }
 var convertLineData = function(data) {
     var res = [];
     for (var i = 0; i < data.length; i++) {
         var dataItem = data[i];
         var coordS = dataItem.lineS; //线起点
         var coordM = dataItem.lineM; //线中间点
         var coordE = dataItem.lineE; //线尾点
         if (coordS && coordM && coordE) {
             res.push({
                 coords: [coordS, coordM, coordE]
             });
         }
     }
     var baseData = xqdata.split(";");
     var coords = [];
     for (let i = 0; i < baseData.length; i = i + 2) {
         let itemdata = baseData[i].split(',');
         let coordsitem = [];
         coordsitem.push(parseFloat(itemdata[0]));
         coordsitem.push(parseFloat(itemdata[1]));
         coords.push(coordsitem);
     }

     res.push({
         coords: coords
     });

     return res;
 };

 var convertValData = function(data) {
     var res = [];
     for (var i = 0; i < data.length; i++) {
         var dataItem = data[i];
         if (dataItem.lineE) {
             dataItem.value = 22.6;
             res.push({
                 index: i + 1,
                 name: dataItem.areaName,
                 ratio: 1,
                 value: dataItem.lineE.concat(dataItem.value),
                 label: {
                     position: dataItem.position ? dataItem.position : 'right'
                 }

             });
         }

     }
     return res;
 };
 var convertPointData = function(data) {

     var res = [];
     for (var i = 0; i < data.length; i++) {
         var dataItem = data[i];
         res.push({
             name: dataItem.areaName,
             value: dataItem.value,
             coord: dataItem.lineS,
             label: {}
         });
     }
     return res;
 };



 function paintChart(value, value2, value3) {
     var percent = value / 20;
     var percent2 = value2 / 20;
     option = {
         tooltip: {
             show: false,
         },
         toolbox: {
             show: false,
         },
         grid: {
             top: 0,
         },
         series: [{
             name: '业务指标',
             type: 'gauge',
             radius: '100%',
             center: ['20%', '70%'], // 默认全局居中
             startAngle: 180,
             endAngle: 0,
             temStyle: {
                 color: 'red'
             },
             detail: { formatter: '{value}%', fontSize: 12 },
             min: 0,
             max: 20,
             splitNumber: 2,
             axisLine: {
                 lineStyle: {
                     color: [
                         [percent, 'red'],
                         [1, 'rgba(255,255,255,0.1)']
                     ],
                     width: 10,
                     shadowColor: 'rgba(0, 0, 0, 0.5)',
                     shadowBlur: 10
                 }
             },
             axisTick: {
                 show: false,

             },
             splitLine: {
                 show: false,
             },
             axisLabel: { color: "#FFFFFF", distance: -10, fontSize: 12 },
             pointer: {
                 width: 4,
                 length: "75%"
             },
             data: [{ value: 50, name: '' }]
         }, {
             name: '业务55指标',
             type: 'gauge',
             radius: '100%',
             center: ['50%', '70%'], // 默认全局居中
             startAngle: 180,
             endAngle: 0,
             temStyle: {
                 color: 'red'
             },
             detail: { formatter: '{value}%', fontSize: 12 },
             min: 0,
             max: 20,
             splitNumber: 2,
             axisLine: {
                 lineStyle: {
                     color: [
                         [percent2, 'yellow'],
                         [1, 'rgba(255,255,255,0.1)']
                     ],
                     width: 10
                 }
             },
             axisTick: {
                 show: false,
             },
             splitLine: {
                 show: false,
             },
             axisLabel: { color: "#FFFFFF", distance: -10, fontSize: 12 },
             pointer: {
                 width: 4,
                 length: "75%"
             },
             data: [{ value: 50, name: '' }]
         }, {
             name: '业务56指标',
             type: 'gauge',
             radius: '100%',
             center: ['80%', '70%'], // 默认全局居中
             startAngle: 180,
             endAngle: 0,
             temStyle: {
                 color: 'red'
             },
             detail: { formatter: '{value}%', fontSize: 12, lineHeight: 20 },
             min: 0,
             max: 20,
             splitNumber: 2,
             axisLine: {
                 lineStyle: {
                     color: [
                         [percent2, 'green'],
                         [1, 'rgba(255,255,255,0.1)']
                     ],
                     width: 10
                 }
             },
             axisTick: {
                 show: false,
             },
             splitLine: {
                 show: false,
             },
             axisLabel: { color: "#FFFFFF", distance: -10, fontSize: 12 },
             pointer: {
                 width: 4,
                 length: "75%"
             },
             data: [{ value: 50, name: '' }]
         }]
     };

     // setInterval(function () {},2000);
     var myChart = echarts.init($('#chartDemo')[0]);
     option.series[0].data[0].value = value;
     option.series[1].data[0].value = value2;
     option.series[2].data[0].value = value3;
     myChart.setOption(option, true);

 }

 /**计数器 */
 Countdown = function() {
     _(this).bindAll('update', 'executeAnimation', 'finishAnimation');
     this.setVars.apply(this, arguments);
     this.update();
 };
 Countdown.prototype = {
     duration: 600,
     setVars: function(time, el, template) {
         this.max = time;
         this.time = time;
         this.el = el;
         this.template = _(template.innerHTML).template();
         this.delta = -1;
     },
     update: function() {
         this.checkTime();
         this.setSizes();
         this.setupAnimation();
         _(this.executeAnimation).delay(20);
         _(this.finishAnimation).delay(this.duration * 0.9);
         if (this.time < this.max) {
             _(this.update).delay(this.duration);
         } else {

         }

     },
     checkTime: function() {
         // if (this.time != this.max) {}
         this.time += this.delta;
         if (this.time === 0) {
             this.delta = 1;
         }

         if (this.time === this.max) {
             this.delta = -1;
         }

         this.delta === 1 ? this.toggleDirection('up', 'down') : this.toggleDirection('down', 'up');
         this.nextTime = this.time + this.delta;


     },
     toggleDirection: function(add, remove) {
         this.el.classList.add(add);
         this.el.classList.remove(remove);
     },
     setSizes: function() {
         this.currentSize = this.getSize(this.time);
         this.nextSize = this.getSize(this.nextTime);
     },
     getSize: function(time) {
         return time > 9 ? 'small' : '';
     },
     setupAnimation: function() {
         this.el.innerHTML = this.template(this);
         this.el.classList.remove('changed');
     },
     executeAnimation: function() {
         this.el.classList.add('changing');
     },
     finishAnimation: function() {
         this.el.classList.add('changed');
         this.el.classList.remove('changing');
     }
 };