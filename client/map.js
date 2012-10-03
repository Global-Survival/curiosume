
var theMap, vector, fromProjection, toProjection, position, zoom, vector, firstGeolocation, geolocate;


function initMap(onMoveEnd) {
    firstGeolocation = true;
    fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
    toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection

    zoom           = 9; 
    position = new OpenLayers.LonLat(0,0);
    
    theMap = new OpenLayers.Map({
        div: "map",
        //projection: "EPSG:3857",
        projection: fromProjection,
        displayProjection: toProjection,
        numZoomLevels: 18,
        eventListeners: {
            "moveend": onMoveEnd,
            "zoomend": onMoveEnd
        }
    });

    //Geolocation Example: http://openlayers.org/dev/examples/geolocation.js

    var mapnik = new OpenLayers.Layer.OSM();

    // create Google Mercator layers
    var gphy = new OpenLayers.Layer.Google(
        "Google Physical",
        {type: google.maps.MapTypeId.TERRAIN}
    );
    var gmap = new OpenLayers.Layer.Google(
        "Google Streets", // the default
        {numZoomLevels: 20}
    );
    var ghyb = new OpenLayers.Layer.Google(
        "Google Hybrid",
        {type: google.maps.MapTypeId.HYBRID, numZoomLevels: 20}
    );
    var gsat = new OpenLayers.Layer.Google(
        "Google Satellite",
        {type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 22}
    );


            
    // create a vector layer for drawing
    vector = new OpenLayers.Layer.Vector("Editable Vectors");

    theMap.addLayers([
        mapnik, gphy, gmap, gsat, ghyb, /*veroad, veaer, vehyb,*/ vector
    ]);
    theMap.addControl(new OpenLayers.Control.LayerSwitcher());
    theMap.addControl(new OpenLayers.Control.EditingToolbar(vector));

    geolocate = new OpenLayers.Control.Geolocate({
        bind: false,
        geolocationOptions: {
            enableHighAccuracy: false,
            maximumAge: 0,
            timeout: 7000
        }
    });

    theMap.addControl(geolocate);

    geolocate.events.register("locationupdated",geolocate,function(e) {
        vector.removeAllFeatures();
        var circle = new OpenLayers.Feature.Vector(
            OpenLayers.Geometry.Polygon.createRegularPolygon(
                new OpenLayers.Geometry.Point(e.point.x, e.point.y),
                e.position.coords.accuracy/2,
                40,
                0
            ),
            {},
            {
                fillColor: '#000',
                fillOpacity: 0.1,
                strokeWidth: 0
            }
        );
        vector.addFeatures([
            new OpenLayers.Feature.Vector(
                e.point,
                {},
                {
                    graphicName: 'cross',
                    strokeColor: '#f00',
                    strokeWidth: 2,
                    fillOpacity: 0,
                    pointRadius: 10
                }
            ),
            circle
        ]);
        if (firstGeolocation) {
            theMap.zoomToExtent(vector.getDataExtent());
            theMap.zoomTo(12);

            //pulsate(circle);
            firstGeolocation = false;
            this.bind = true;
        }
    });

    geolocate.events.register("locationfailed",this,function() {
        OpenLayers.Console.log('Location detection failed');
    });

    theMap.setCenter(position, zoom );

    return theMap;
}

function updateLocation() {
    vector.removeAllFeatures();
    geolocate.deactivate();
    geolocate.watch = false;
    firstGeolocation = true;
    geolocate.activate();
}

function geoDist(p1, p2) {
    return OpenLayers.Util.distVincenty( {lat:p1[0], lon:p1[1]}, {lat:p2[0], lon:p2[1]} );
}

function lonlat(lon, lat) {
    var ll = new OpenLayers.LonLat(lon, lat);
    ll.transform(fromProjection, toProjection);    
    return ll;
}
