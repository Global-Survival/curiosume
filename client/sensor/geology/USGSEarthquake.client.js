setSensorClient('USGSEarthquake', { 

    load: function() { 
        //console.dir(now.getSensor('USGSEarthquake'));
        
        //alert(now.USGSEarthquake['earthquakes'].length);
    },
    
    //CLIENT called when de-activated, in case there is opportunity to free memory using JS "delete" operator
    unload: function() { },
    
    /*CLIENT adjust result vector for the conditions calculated at a certain geopoint according to hueristics defined by option variables
    result vector includes any markers or labels to be drawn on the map*/
    updateLocal: function(geopoint, result) { },
    
    //called when this sensor has > 0 importance    
    updateGlobal: function(result) { 
        
        now.getSensor('USGSEarthquake', function(s) { 
            var markers = new OpenLayers.Layer.Markers( "USGS Earthquakes" );
            addMapLayer(markers);
            
            var quakes = s.earthquakes;
            var x = 0;
            $.each(quakes, function(k, quake) {
                var lon = parseFloat(quake.lon);
                var lat = parseFloat(quake.lat);
                                
                var size = new OpenLayers.Size(35,35);
                var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
                var icon = new OpenLayers.Icon('/icon/quake.png',size,offset);
                
                var ll = new OpenLayers.LonLat(lon, lat);
                console.dir(ll);
                ll.transform(fromProjection, toProjection /*theMap.getProjectionObject()*/);
                console.dir(ll);
                
                markers.addMarker(new OpenLayers.Marker(ll,icon));
                //marker.setOpacity(0.2);
                //marker.events.register('mousedown', marker, function(evt) { alert(this.icon.url); OpenLayers.Event.stop(evt); });                
            });
            
        });

    }
    
});

