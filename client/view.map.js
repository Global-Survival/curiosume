function getProxyURL(u) {
    return '/http/' + encodeURIComponent(u);
}

function getKMLLayer(kmlurl) {
    //use an layer cache with explicit expiration,
    //so that when this function gets here again, it doesn't need to re-fetch unless its past the explicit expiration
    if (!window.kmlLayer) window.kmlLayer = { };
    
    var kml = window.kmlLayer[kmlurl];
    if (!kml) {
        kml =new OpenLayers.Protocol.HTTP({
            url: getProxyURL(kmlurl),
            format: new OpenLayers.Format.KML({
                extractStyles: true,
                extractAttributes: true
            })            
        });
        
        window.kmlLayer[kmlurl] = kml;
    }
    
    return new OpenLayers.Layer.Vector("KML", {
        strategies: [new OpenLayers.Strategy.Fixed()],
        protocol: kml
    });
}

function renderMap(s, o, v) {
    var e = uuid();
    $('<div style="width: 100%; height: 100%"/>').attr('id', e).appendTo(v);
    
    
    /*{
        var menu = $('<div></div>');
        menu.css('position', 'absolute');
        menu.css('right', '1em');
        menu.css('top', '1em');
        
        menu.append('<button>prev</button>');
        menu.append('<button>next</button>');
        menu.append('<button>NOW</button>');
        o.append(menu);
    }*/
    
    var target = e;
    var location = s.myself().geolocation;
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

    
    function saveBounds() {
        s.set('mapExtent', m.getExtent());
    }
    
    m.events.register("moveend", m, function() {
        //save updated bounds to self
        saveBounds();
    });
    m.events.register("zoomend", m, function() {
        //save updated bounds to self
        saveBounds();
    });
    
    var exm = s.get('mapExtent');
    if (exm)
        m.zoomToExtent(exm, true);
    else {
        var hh = project(new OpenLayers.LonLat(location[1], location[0]));    
        center(hh);        
    }
    
    m.targetLocation = m.getCenter();

    var select = new OpenLayers.Control.SelectFeature([vector], {
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
            //strokeColor: '#fff',
            fillOpacity: opacity,
            //strokeOpacity: opacity,
            strokeWidth: 0
            //view-source:http://openlayers.org/dev/examples/vector-features-with-text.html

        });
        targetLocation.uri = uri;
        m.vector.addFeatures([targetLocation]);

        //m.zoomToExtent(m.vector.getDataExtent());
        
        if (iconURL) {
            var iw = 35;
            var ih = 35;
            var iop = 0.95;
            var size = new OpenLayers.Size(iw,ih);
            var offset = new OpenLayers.Pixel(-iw/2.0,-ih/2.0);
            var icon = new OpenLayers.Icon(iconURL,size,offset);
            icon.setOpacity(iop);
            markers.addMarker(new OpenLayers.Marker(p,icon));
        }
        
        return targetLocation;
        
    }

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

    function addKMLLayer(url) {
        var kml = getKMLLayer(url);
        m.addLayer(kml);        
        var nl = select.layers;
        nl.push(kml);
        select.setLayer(nl);        
        
        kml.events.on({
            featureselected: function(event) {
                var feature = event.feature;
                var area = feature.geometry.getArea();
                var id = feature.attributes.key;                
                
                newPopupObjectView({
                    uri: uuid(),
                    name: feature.attributes.name,
                    text: feature.attributes.description
                });
              //feature.geometry.getBounds().getCenterLonLat(),
              //'<div class="markerContent">'+feature.attributes.description+'</div>',
            }
        });
        
    }
    
    var now = Date.now();
    
    function renderMapFeature(x, r) {
        var k = x.id;
        
        if (objHasTag(x, 'web.KML')) {
            addKMLLayer(x.kmlURL);
            return;    
        }
        
        var s = objSpacePoint(x);
        if (s) {
            var fill = '#888';
            var op = 0.5;
            var rad = 50;
            var iconURL = undefined;
            
            var ww = x.modifiedAt || x.createdAt || null;
            if (ww) {
                op = 0.25 + 0.5 * Math.exp( -((now - ww) / 1000.0 / 48.0 / 60.0 / 60.0) );
            }

            iconURL = getTagIcon(x);
            
            if (objHasTag(x, 'environment.EarthQuake')) {
                fill = '#b33';
                var mag = objFirstValue(x,'eqMagnitude',1);
                rad = 100000 + (mag - 5.0)*700000;
                
                op *= 0.5;
            }
            else if (objHasTag(x, 'NuclearFacility')) {
                rad = 7000;
                op = 0.3;
                fill = '#ff0';
            }
            else if (objHasTag(x, 'Human')) {
                rad = 200;
                op = 0.25;
            }
            else if (objHasTag(x, 'Message')) {
                fill = '#55f';
                rad = 50;
            }
            createMarker(k, s.lat, s.lon, rad, op, fill, iconURL);
        }        
    }
    
    
    renderItems(s, o, v, 500, function(s, v, xxrr) {
        for (var i = 0; i < xxrr.length; i++) {
            var x = xxrr[i][0];
            var r = xxrr[i][1];
            renderMapFeature(x, r);
        }
    });

    
}
