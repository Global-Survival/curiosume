var heatMapDetailLevel = 4;

function getHeatmapColor(lat, lon) {

    var d = geoDist( [lat, lon], [0,0])/1000.0;
    var r = 1.0 / ( 1.0 + d);
    var g = 0;
    var b = 0;

    r = Math.floor(r*256.0);
    g = Math.floor(g*256.0);

    return [ r, g, b ];
}

/*
function drawHeatmap(divisions) {
    if (heatmapOpacity == 0)
        return;

    var map = document.getElementById("map");

    var mapHeat = document.getElementById("mapHeat");
    var w = theMap.size.w;
    var h = theMap.size.h;

    var ctx = mapHeat.getContext("2d");
    ctx.clearRect(0, 0, w, h);

    var extent = theMap.getExtent().transform(toProjection, fromProjection);
    var ul = new OpenLayers.LonLat(extent.left, extent.top);
    var br = new OpenLayers.LonLat(extent.right, extent.bottom);

    var bw = Math.abs(br['lon'] - ul['lon'])/divisions;
    var bh = Math.abs(ul['lat'] - br['lat'])/divisions;

    var pw = Math.ceil(w / divisions);
    var ph = Math.ceil(h / divisions);

    var py = ul['lat'], px;
    for (var y = 0; y < divisions; y++) {
        px = ul['lon'];
        for (var x = 0; x < divisions; x++) {

            var pl = new OpenLayers.LonLat(px, py);
            var c = getHeatmapColor(py, px); //(py + bh/2.0, px + bw/2.0);

            var pp = theMap.getViewPortPxFromLonLat( pl.transform( fromProjection, toProjection) );

            ctx.fillStyle="rgba(" + c[0] + ", " + c[1] + ", " + c[2] + ", 1.0)";
            ctx.fillRect(pp['x'],pp['y'],pw,ph);
            px += bw;
        }
        py -= bh;
    }
}
*/

function updateHeatmap() {
    //drawHeatmap(heatMapDetailLevel);                
}
