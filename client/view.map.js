function renderMap(s, o, v) {
    var e = uuid();
    $('<div style="width: 100%; height: 100%"/>').attr('id', e).appendTo(v);
    
    var target = e;
    var location = self.myself().geolocation;
    if (!location)
        location = [0,0];
    
    var defaultZoomLevel = 9;
    var fromProjection = new OpenLayers.Projection("EPSG:4326"); // Transform from WGS 1984
    var toProjection = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection


    var m = new OpenLayers.Map({
        div: target,
        projection: fromProjection,
        displayProjection: toProjection,
        numZoomLevels: 12
    });
    var mapnik = new OpenLayers.Layer.OSM();
    var vector = new OpenLayers.Layer.Vector("Editable Vectors", {});
    var markers =  new OpenLayers.Layer.Markers( "Markers" );
    
    m.vector = vector;
    m.addLayers([
        mapnik, vector, markers //, gphy, gmap, gsat, ghyb, /*veroad, veaer, vehyb,*/ 
    ]);
    
    m.events.register("moveend", m, function() {
        //save updated bounds to self
    });
    m.events.register("zoomend", m, function() {
        //save updated bounds to self
    });
    
    var hh = project(new OpenLayers.LonLat(location[1], location[0]));    
    center(hh);        
        
    m.targetLocation = m.getCenter();

    var select = new OpenLayers.Control.SelectFeature(vector, {
        toggle: true,
        clickout: true
    });
    m.addControl(select);
    select.activate();
    vector.events.on({
        featureselected: function(event) {
            var feature = event.feature;
            var area = feature.geometry.getArea();
            var id = feature.attributes.key;
            //var output = "Item: " + id;// + " Area: " + area.toFixed(2);
            //console.log(feature, area, id, output);
            newPopupObjectView(feature.uri);
            //document.getElementById("output-id").innerHTML = output;
        }
    });
    
/*
    var df = new OpenLayers.Control.DragFeature(vector);
    m.addControl(df);
    df.activate();*/

    function center(oll) {
        m.setCenter(oll);        
    }

    
    function unproject(x) {
        x.transform(toProjection, fromProjection);
        return x;
    }
    function project(x) {
        x.transform(fromProjection, toProjection);
        return x;
    }

    function createMarker(uri, lat, lon, rad, opacity, fill, iconURL) {
        var p = project(new OpenLayers.LonLat(lon, lat));
        var t = new OpenLayers.Geometry.Point(p.lon, p.lat /*location[1],location[0]*/);
        
        var targetLocation = new OpenLayers.Feature.Vector(
        OpenLayers.Geometry.Polygon.createRegularPolygon(
        t,
        rad,
        6,
        0), {}, {
            fillColor: fill,
            strokeColor: '#f00',
            fillOpacity: opacity,
            strokeOpacity: opacity,
            strokeWidth: 1
            //view-source:http://openlayers.org/dev/examples/vector-features-with-text.html

        });
        targetLocation.uri = uri;
        m.vector.addFeatures([targetLocation]);

        //m.zoomToExtent(m.vector.getDataExtent());
        
        if (iconURL) {
            var iw = 25;
            var ih = 25;
            var iop = 0.5;
            var size = new OpenLayers.Size(iw,ih);
            //var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
            var offset = new OpenLayers.Pixel(-iw/2.0,-ih/2.0);
            var icon = new OpenLayers.Icon(iconURL,size,offset);
            icon.setOpacity(iop);
            markers.addMarker(new OpenLayers.Marker(p,icon));
        }
        
        return targetLocation;
        
    }

    //var tg = createMarker(0,0, 10);

    m.location = function() {
        return unproject(m.getCenter());  
    };
    
    // Register the function for the animatio
    /*var interval = window.setInterval(function(){
        animate(tg);
    },150);*/
    
    var isVisible = function() {
        return $('#' + e).is(':visible');
    };
    
    var animate = function(feature) {
        feature.data.size += 1;
    
        var x = feature.data.size;
        
        /*feature.style = {
            pointRadius: Math.random()*10.0, //feature.data.size,  // I will change only the size of the feature
            fillColor: "#ffcc66",
            fillOpacity: Math.sin(x/10.0),
            strokeColor: "#ff9933",
            strokeWidth: Math.random()*10.0,
            graphicZIndex: 1
        };*/
        
        feature.style.strokeWidth = Math.random()*10.0; 
        
    
       feature.layer.redraw();
    
        if (!isVisible()) {
            window.clearInterval(interval);
        }
    };
    
    for (var k in s.objects()) {
        var x = s.getObject(k);
        if (x.geolocation) {
            var fill = '#888';
            var op = 0.75;
            var rad = 50000;
            var iconURL = undefined;
            
            if (x.when) {
            	var now = Date.now();
            	op = Math.exp( -((now - x.when) / 1000.0 / 48.0 / 60.0 / 60.0) );
            }

            
            if (hasTag(x, 'climate.EarthQuake')) {
                fill = '#b33';
                rad = 100000 + (x.eqMagnitude - 5.0)*700000;
                console.log(x, rad);
                iconURL = '/icon/quake.png';
            }
            else if (hasTag(x, 'NuclearFacility')) {
                iconURL = '/icon/nuclear.png';
            }
            createMarker(k, x.geolocation[0], x.geolocation[1], rad, op, fill, iconURL);
        }
    }
}
