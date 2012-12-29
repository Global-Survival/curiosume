var ASTRONOMICAL_DISTANCE = 99999999.0; //in km

function setGeolocatedLocation(map, onUpdated) {
    var geolocate = new OpenLayers.Control.Geolocate({
        bind: false,
        geolocationOptions: {
            enableHighAccuracy: false,
            maximumAge: 0,
            timeout: 7000
        }
    });

    geolocate.events.register("locationupdated", geolocate, onUpdated);

    geolocate.events.register("locationfailed", this, function() {
        OpenLayers.Console.log('Location detection failed');
    });

    map.addControl(geolocate);

    geolocate.activate();

}


function initLocationChooserMap(target) {
    var defaultZoomLevel = 9;
    var fromProjection = new OpenLayers.Projection("EPSG:4326"); // Transform from WGS 1984
    var toProjection = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection


    var m = new OpenLayers.Map({
        div: target,
        projection: fromProjection,
        displayProjection: toProjection,
        numZoomLevels: 9
    });
    var mapnik = new OpenLayers.Layer.OSM();
    var vector = new OpenLayers.Layer.Vector("Editable Vectors", {});
    m.vector = vector;

    m.addLayers([
    mapnik, vector //, gphy, gmap, gsat, ghyb, /*veroad, veaer, vehyb,*/ 
    ]);
    m.setCenter(new OpenLayers.LonLat(0, 0), defaultZoomLevel);
    m.targetLocation = m.getCenter();

    var df = new OpenLayers.Control.DragFeature(vector);
    m.addControl(df);
    df.activate();

    m.events.register("click", m, function(e) {
        //var opx = m.getLayerPxFromViewPortPx(e.xy) ;
        var oll = m.getLonLatFromViewPortPx(e.xy);
        m.targetLocation.move(oll);
        m.setCenter(oll);
    });


    setGeolocatedLocation(m, function(e) {

        var t = e.point;
        var rad = 10;
        var opacity = 0.5;

        var targetLocation = new OpenLayers.Feature.Vector(
        OpenLayers.Geometry.Polygon.createRegularPolygon(
        t,
        rad,
        6,
        0), {}, {
            fillColor: '#f00',
            strokeColor: '#f00',
            fillOpacity: opacity,
            strokeOpacity: opacity,
            strokeWidth: 1
            //view-source:http://openlayers.org/dev/examples/vector-features-with-text.html

        });
        m.vector.addFeatures([targetLocation]);

        m.zoomToExtent(vector.getDataExtent());
        m.targetLocation = targetLocation;

    });

    return m;
}
