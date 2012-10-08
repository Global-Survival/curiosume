setSensorClient('USGSEarthquake', { 

    load: function() { 
        //console.dir(now.getSensor('USGSEarthquake'));
        
        //alert(now.USGSEarthquake['earthquakes'].length);
    },
    
    //CLIENT called when de-activated, in case there is opportunity to free memory using JS "delete" operator
    unload: function() { },
    
    /*CLIENT adjust result vector for the conditions calculated at a certain geopoint according to hueristics defined by option variables
    result vector includes any markers or labels to be drawn on the map*/
    updateLocal: function(geopoint, result) { 
        
       var a = analyzePointEvents(this.quakes, function(q) { return q.magnitude; }, geopoint);
       
       result.minDistanceToQuake= {
            label: 'Nearest Earthquake',
            value: a.nearestDist,
            unit: 'km'
       };
       result.relativeThreat = {
            label: 'Relative Threat',
            value: a.sumInvSquareDistTimesMagnitude,
            desc: 'sum(inverse square distance * EQ magnitude)'
       };
    },
    
    //called when this sensor has > 0 importance    
    updateGlobal: function(onFinished) { 
        
        if (this.markers!=undefined) {
            addMapLayer(this.markers);
            onFinished();
            return;
        }
        
        var markers = new OpenLayers.Layer.Markers( "USGS Earthquakes" );
        this.markers = markers;
        addMapLayer(markers);
        
        var qq = this;
        
        now.getSensor('USGSEarthquake', function(s) { 
            
            var quakes = s.earthquakes;
            
            qq.quakes = quakes;
            
            var dateNow = Date.now();
            var iconScale = 8.0;
                        
            for (var i = 0; i < quakes.length; i++) {
                var quake = quakes[i];
                
                var lon = parseFloat(quake.lon);
                var lat = parseFloat(quake.lat);
                var magnitude = parseFloat(quake.magnitude);
                var when = quake.when;
                var ageDays = (dateNow - when) / (1000 /*ms*/ * 60 * 60 * 24);                                
                                
                var opacity = Math.exp(-ageDays) * 0.5 + 0.5;
                
                var ss = magnitude * iconScale;
                var size = new OpenLayers.Size(ss,ss);
                
                var offset = new OpenLayers.Pixel(-(size.w/2), -(size.h/2));
                var icon = new OpenLayers.Icon('/icon/quake.png',size,offset);
                
                var ll = lonlat(lon, lat);
                
                markers.addMarker(new OpenLayers.Marker(ll,icon));
                markers.setOpacity(opacity);
                //marker.events.register('mousedown', marker, function(evt) { alert(this.icon.url); OpenLayers.Event.stop(evt); });                
            }
            
            onFinished();            
            
        });

    },
    
    getControlHTML : function() {
        return 'controls';
    }
    
});

