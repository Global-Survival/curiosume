var theMap, fromProjection, toProjection, position, zoom, vector, geolocate;

fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection

var ASTRONOMICAL_DISTANCE = 99999999.0; //in km


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

function initLocationChooserMap(target) {
		var defaultZoomLevel = 9;
		
	    var m = new OpenLayers.Map({
	        div: target,
	        projection: fromProjection,
	        displayProjection: toProjection,
	        numZoomLevels: 9
	    });
	    var mapnik = new OpenLayers.Layer.OSM();
	    var vector = new OpenLayers.Layer.Vector("Editable Vectors", {
	    });
	    m.vector = vector;

	    m.addLayers([
	        mapnik, vector //, gphy, gmap, gsat, ghyb, /*veroad, veaer, vehyb,*/ 
	    ]);
	    m.setCenter(new OpenLayers.LonLat(0,0), defaultZoomLevel);
	    m.targetLocation = m.getCenter();
	    
	    var df = new OpenLayers.Control.DragFeature(vector);	    
        m.addControl(df);
        df.activate();
        
        m.events.register("click", m, function(e){
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
                	0
            	),
            	{ },
            	{
                	fillColor: '#f00',
                	strokeColor: '#f00',
                	fillOpacity: opacity,
                	strokeOpacity: opacity,
                	strokeWidth: 1
                	//view-source:http://openlayers.org/dev/examples/vector-features-with-text.html
                	
            	}
            	);
        	m.vector.addFeatures([ targetLocation ]);

        	m.zoomToExtent(vector.getDataExtent());
        	m.targetLocation = targetLocation;
        	
	    });
        
	    return m;
}

function setGeolocatedLocation(map, onUpdated) {
    geolocate = new OpenLayers.Control.Geolocate({
        bind: false,
        geolocationOptions: {
            enableHighAccuracy: false,
            maximumAge: 0,
            timeout: 7000
        }
    });

    geolocate.events.register("locationupdated",geolocate,onUpdated);

    geolocate.events.register("locationfailed",this,function() {
        OpenLayers.Console.log('Location detection failed');
    });
    
    map.addControl(geolocate);
    
    geolocate.activate();
	
}

function initMap(target, onMoveEnd) {

    var firstGeolocation = true;

    zoom           = 9; 
    

    position = new OpenLayers.LonLat(-118.24,34.05).transform(fromProjection, toProjection);
    
    theMap = new OpenLayers.Map({
        div: target,
        //projection: "EPSG:3857",
        projection: fromProjection,
        displayProjection: toProjection,
        numZoomLevels: 18,
        eventListeners: {
            "moveend": onMoveEnd,
            "zoomend": onMoveEnd
        },
    	controls: [
               new OpenLayers.Control.Navigation(
                   {dragPanOptions: {enableKinetic: true}}
               )
           ]
    });
    
    var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
    renderer = (renderer) ? [renderer] : OpenLayers.Layer.Vector.prototype.renderers;
    
    
    
    //Geolocation Example: http://openlayers.org/dev/examples/geolocation.js

    var mapnik = new OpenLayers.Layer.OSM();
    //var gmap = new OpenLayers.Layer.Google("Google Streets", {visibility: false});
    // create Google Mercator layers
    
    /*var gphy = new OpenLayers.Layer.Google(
        "Google Physical",
        {type: google.maps.MapTypeId.TERRAIN}
    );*/
    /*
    var gmap = new OpenLayers.Layer.Google(
        "Google Streets", // the default
        {numZoomLevels: 20}
    );*/
    /*var ghyb = new OpenLayers.Layer.Google(
        "Google Hybrid",
        {type: google.maps.MapTypeId.HYBRID, numZoomLevels: 20}
    );*/
    /*
    var gsat = new OpenLayers.Layer.Google(
        "Google Satellite",
        {type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 22}
    );*/
    

            
    // create a vector layer for drawing
    var style = new OpenLayers.Style({
        label: "${name}",
        fontColor: "#333333",
        fontFamily: "sans-serif",
        fontWeight: "bold"
    }, {
        rules: [
            new OpenLayers.Rule({
                minScaleDenominator: 200000000,
                symbolizer: {
                    pointRadius: 7,
                    fontSize: "9px"
                }
            }),
            new OpenLayers.Rule({
                maxScaleDenominator: 200000000,
                minScaleDenominator: 100000000,
                symbolizer: {
                    pointRadius: 10,
                    fontSize: "12px"
                }
            }),
            new OpenLayers.Rule({
                maxScaleDenominator: 100000000,
                symbolizer: {
                    pointRadius: 13,
                    fontSize: "15px"
                }
            })
        ]
    });

    //http://trac.osgeo.org/openlayers/wiki/SettingZoomLevels
    
    vector = new OpenLayers.Layer.Vector("Editable Vectors", {
        renderers: renderer,
        styleMap: new OpenLayers.StyleMap(style)
    });
    theMap.vector = vector;

    theMap.addLayers([
        mapnik, /*gphy, gmap, gsat,*/ /*ghyb, veroad, veaer, vehyb,*/ vector
    ]);
    theMap.addControl(new OpenLayers.Control.LayerSwitcher());
    theMap.addControl(new OpenLayers.Control.EditingToolbar(vector));
    theMap.addControl(new OpenLayers.Control.MousePosition());
    
    //http://openlayers.org/dev/examples/drag-feature.html
    //http://openlayers.org/dev/examples/styles-context.html
    //http://openlayers.org/dev/examples/modify-feature.html
    /*controls = {
            point: new OpenLayers.Control.DrawFeature(vector,
                        OpenLayers.Handler.Point),
            line: new OpenLayers.Control.DrawFeature(vector,
                        OpenLayers.Handler.Path),
            polygon: new OpenLayers.Control.DrawFeature(vector,
                        OpenLayers.Handler.Polygon),
            drag: new OpenLayers.Control.DragFeature(vector)
        };
    for(var key in controls) {
        theMap.addControl(controls[key]);
    }*/
    setGeolocatedLocation(theMap, function(e) {
        //vector.removeAllFeatures();
        
        var circle = new OpenLayers.Feature.Vector(
            OpenLayers.Geometry.Polygon.createRegularPolygon(
                new OpenLayers.Geometry.Point(e.point.x, e.point.y),
                e.position.coords.accuracy/2,
                9,
                0
            ),
            { },
            {
                fillColor: '#000',
                strokeColor: '#f00',
                fillOpacity: 0.1,
                strokeWidth: 1
            }
        );
            
        vector.addFeatures([
//            new OpenLayers.Feature.Vector(
//                e.point,
//                {},
//                {
//                    graphicName: 'cross',
//                    strokeColor: '#f00',
//                    strokeWidth: 2,
//                    fillOpacity: 0,
//                    pointRadius: 10
//                }
//            ),
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

    theMap.setCenter(position, zoom );

    function toggleControl(element) {
        for(key in controls) {
            var control = controls[key];
            if(element.value == key && element.checked) {
                control.activate();
            } else {
                control.deactivate();
            }
        }
    }
    
    /*var point = $('<input type="checkbox">+ Point</input>');
    $('#' + target + ' #MapControls').append(point);*/
    
    
    return theMap;
}

function toggleControl(element) {
    for(key in controls) {
        var control = controls[key];
        if(element.value == key && element.checked) {
            control.activate();
        } else {
            control.deactivate();
        }
    }
}
function setGeolocation(p) {
    Self.set("geolocation", p);
    updateMap();
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
	alert('Feature coming soon: ' + message);
	/*
    $('#userSupportMessage').html(message);
    $("#userSupport").dialog({
            height: 450,
            width: '70%',
            zIndex: 5000,
            title: 'requestUserSupport()',
            modal: true
    });*/    
}

function enablePreset(p) {
    requestUserSupport('"' + p + '" preset');
    
}

var updating=false;

var needsUpdated = false;
var updateCycleMS = 400;
var lastUpdated = -1;
var goingToUpdate = false;

function updateMap() {
    var now = Date.now();
    
    if (updating) {
        //console.log('already updating, but will repeat it');
        needsUpdated = true;
        return;
    }
    else if ((lastUpdated!=-1) && ((now - lastUpdated) < (updateCycleMS)) && (!goingToUpdate)) {
        //console.log('too soon: ' + (now - lastUpdated) );
        setTimeout(updateMap, updateCycleMS);        
        goingToUpdate = true;
        return;        
    }

    lastUpdated = Date.now();
    
    updating = true;
    
    updateHeatmap();

    //removeMapLayers();

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
        setTimeout(updateMap, updateCycleMS);
    }

    goingToUpdate = false;
    needsUpdated = false;
    updating = false;

}


function addToMap(map, x) {
	var t = new OpenLayers.Geometry.Point(x.geolocation[1], x.geolocation[0]);
    t.transform(fromProjection, toProjection);
    
    var rad = 40;
    var opacity = 0.5;
    var l = x.name;
    var color = 'gray';
    
    if (x.eqMagnitude) {
    	rad = 4000;
    	rad *= x.eqMagnitude;	
    	rad *= x.eqMagnitude;
    	l = 'EQ';
    	color = 'red';
    }
    if (x.when) {
    	var now = Date.now();
    	opacity = Math.exp( -((now - x.when) / 1000.0 / 48.0 / 60.0 / 60.0) );
    }
    if (x.type == 'osm.place_of_worship') {
    	color = 'blue';
    }
    if (x.type == 'osm.school') {
    	color = 'purple';
    }
    
    //var yelp = new OpenLayers.Icon("http://www.openlayers.org/images/OpenLayers.trac.png", new OpenLayers.Size(49,44));
    //markers.addMarker(new OpenLayers.Marker(new OpenLayers.LonLat(0,0),icon));
    
	var circle = new OpenLayers.Feature.Vector(
		OpenLayers.Geometry.Polygon.createRegularPolygon(            		
    	t,
    	rad,
    	6,
    	0
	),
	{ },
	{
    	fillColor: color,
    	strokeColor: color,
    	fillOpacity: opacity,
    	strokeOpacity: opacity,
    	strokeWidth: 1,
    	//view-source:http://openlayers.org/dev/examples/vector-features-with-text.html
    	label: l
    	
	}
	);
	map.vector.addFeatures( [ circle ] );

}
