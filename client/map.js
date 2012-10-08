var theMap, vector, fromProjection, toProjection, position, zoom, vector, firstGeolocation, geolocate;

var ASTRONOMICAL_DISTANCE = 99999999.0; //in km

fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection

function initMiniMap(target) {
    var m = new OpenLayers.Map({
        div: target,
        projection: fromProjection,
        displayProjection: toProjection,
        numZoomLevels: 9
    });
    var mapnik = new OpenLayers.Layer.OSM();
    m.addLayers([
        mapnik //, gphy, gmap, gsat, ghyb, /*veroad, veaer, vehyb,*/ vector
    ]);
    m.setCenter(new OpenLayers.LonLat(0,0), 9);
    
    return m;
}

function initMap(onMoveEnd) {
    firstGeolocation = true;

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
            
            unproject(e.point);
            setGeolocation( [ e.point.y, e.point.x ] );
        }
        
    });

    geolocate.events.register("locationfailed",this,function() {
        OpenLayers.Console.log('Location detection failed');
    });

    theMap.setCenter(position, zoom );

    return theMap;
}

function setGeolocation(p) {
    Self.geolocation = p;
    update();
}

function updateLocation() {
    if (theMap==undefined)
        return;
    
    if (vector!=undefined)
        vector.removeAllFeatures();
    
    geolocate.deactivate();
    geolocate.watch = false;
    firstGeolocation = true;
    geolocate.activate();
}

//variable cache, avoids having to recreate a new associative array for each geodistance
var gp1 = { lat:0, lon:0 };
var gp2 = { lat:0, lon:0 };

function geoDist(p1, p2) {
    gp1.lat = p1[0];
    gp1.lon = p1[1];
    gp2.lat = p2[0];
    gp2.lon = p2[1];
    
    //http://dev.openlayers.org/docs/files/OpenLayers/Util-js.html#Util.distVincenty
    return OpenLayers.Util.distVincenty( gp1, gp2 );
}

function lonlat(lon, lat) {
    var ll = new OpenLayers.LonLat(lon, lat);
    ll.transform(fromProjection, toProjection);    
    return ll;
}
function unproject(x) {
    x.transform(toProjection, fromProjection);
    return x;
}

//opens a modal dialog box to choose current location on a small map widget
function setLocation() {

}

function requestUserSupport(message) {
    $('#userSupportMessage').html(message);
    $("#userSupport").dialog({
            height: 450,
            width: '70%',
            zIndex: 5000,
            title: 'requestUserSupport()',
            modal: true
    });    
}

function enablePreset(p) {
    requestUserSupport('"' + p + '" preset');
    
}

var updating=false;

var needsUpdated = false;
var updateCycleMS = 400;
var lastUpdated = -1;
var goingToUpdate = false;

function update() {
    var now = Date.now();
    
    if (updating) {
        //console.log('already updating, but will repeat it');
        needsUpdated = true;
        return;
    }
    else if ((lastUpdated!=-1) && ((now - lastUpdated) < (updateCycleMS)) && (!goingToUpdate)) {
        //console.log('too soon: ' + (now - lastUpdated) );
        setTimeout(update, updateCycleMS);
        goingToUpdate = true;
        return;        
    }

    lastUpdated = Date.now();
    
    updating = true;
    
    updateHeatmap();

    removeMapLayers();

    var callbacksExpected = 0, callbacksReceived = 0;
    for (var k in sensorImportance) {
       if (sensorImportance[k] > 0)
           callbacksExpected++;
    }

    var f = function(result) {
        callbacksReceived++;
        
        if (result!=undefined) {        }
        
        if (callbacksReceived == callbacksExpected) {
            updateStatus();       
        }
    };
    
    if (callbacksExpected == 0) {    
        callbacksExpected = 1;
        f();
    }
    else {
    
        for (var k in sensorImportance) {
           var v = sensorImportance[k];

           if (v > 0) {
               var c = sensorClient[k];
               if (c != undefined) {
                   c.updateGlobal(f);
               }
           } 
        }
    }
    
    if (needsUpdated) {
        setTimeout(update, updateCycleMS);
    }

    goingToUpdate = false;
    needsUpdated = false;
    updating = false;

}
