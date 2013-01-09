function renderMap(s, o, v) {
    var e = uuid();
    $('<div style="width: 100%; height: 100%"/>').attr('id', e).appendTo(v);
    
    var target = e;
    var location = self.myself().geolocation;
    
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
    m.vector = vector;

    m.addLayers([
        mapnik, vector //, gphy, gmap, gsat, ghyb, /*veroad, veaer, vehyb,*/ 
    ]);
    
    var hh = project(new OpenLayers.LonLat(location[1], location[0]));
    center(hh);        
        
    m.targetLocation = m.getCenter();

    var df = new OpenLayers.Control.DragFeature(vector);
    m.addControl(df);
    df.activate();

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

    function createMarker() {
        var t = new OpenLayers.Geometry.Point(hh.lon, hh.lat /*location[1],location[0]*/);
        var rad = 10;
        var opacity = 0.5;

        var targetLocation = new OpenLayers.Feature.Vector(
        OpenLayers.Geometry.Polygon.createRegularPolygon(
        t,
        rad,
        6,
        0), {}, {
            fillColor: '#000',
            strokeColor: '#f00',
            fillOpacity: opacity,
            strokeOpacity: opacity,
            strokeWidth: 1
            //view-source:http://openlayers.org/dev/examples/vector-features-with-text.html

        });
        m.vector.addFeatures([targetLocation]);

        m.zoomToExtent(m.vector.getDataExtent());
        
        return targetLocation;
        
    }

    var tg = createMarker();

    m.location = function() {
        return unproject(m.getCenter());  
    };
    
    // Register the function for the animatio
    var interval = window.setInterval(function(){
        animate(tg);
    },150);
    
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
    
}
