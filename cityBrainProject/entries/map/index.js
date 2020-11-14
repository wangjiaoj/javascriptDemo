var map = new BMap.Map("map_container");
var cityName = '浙江省';
map.centerAndZoom(cityName, 8); // 初始化地图,设置中心点坐标和地图级别。    
map.addControl(new BMap.ScaleControl()); // 添加比例尺控件
map.addControl(new BMap.OverviewMapControl()); //添加缩略地图控件
map.enableScrollWheelZoom();
map.addControl(new BMap.NavigationControl({
    type: BMAP_NAVIGATION_CONTROL_LARGE,
    anchor: BMAP_ANCHOR_TOP_LEFT,
    offset: new BMap.Size(40, 250)
}));
var bdary = new BMap.Boundary();
bdary.get(cityName, function(rs) { //获取行政区域       
    map.clearOverlays(); //清除地图覆盖物  

    var boundaries = rs.boundaries[0];
    var boundariesArray = rs.boundaries[0].split(';')
    var startPonit = boundariesArray[0];
    //地区坐标点围绕一圈，取出起点，连成封闭区域
    //new BMap.Polygon(rs.boundaries[0] + ';' + startPonit + ';' + SE_JW + WS_JW + NW_JW + EN_JW + SE_JW);
    // 内圈是rs.boundaries[0] + ';' + startPonit + ';'闭合
    // 外圈是SE_JW + WS_JW + NW_JW + EN_JW + SE_JW闭合

    //网上查了下，东西经南北纬的范围
    var EN_JW = "180, 90;"; //东北角
    var NW_JW = "-180,  90;"; //西北角
    var WS_JW = "-180, -90;"; //西南角
    var SE_JW = "180, -90;"; //东南角
    //4.添加环形遮罩层
    //new BMap.Polygon(rs.boundaries[0] + ';' + startPonit + ';' + SE_JW + WS_JW + NW_JW + EN_JW + SE_JW);
    // var ply1 = new BMap.Polygon(rs.boundaries[0] + ';' + startPonit + ';' + SE_JW + WS_JW + NW_JW + EN_JW + SE_JW, {
    //     strokeColor: "none",
    //     fillColor: "rgb(246,246,246)",
    //     fillOpacity: 1,
    //     strokeOpacity: 0.5
    // });
    //建立多边形覆盖物

    // map.addOverlay(ply1);
    //5. 给目标行政区划添加边框，其实就是给目标行政区划添加一个没有填充物的遮罩层
    var ply = new BMap.Polygon(rs.boundaries[0], {
        strokeWeight: 2,
        strokeColor: "#ddd",
        fillColor: "blue"
    });
    map.addOverlay(ply);
    //map.setViewport(ply.getPath());    //调整视野
});