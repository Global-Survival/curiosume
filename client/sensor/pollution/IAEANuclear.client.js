setSensorClient('IAEANuclear', { 

    load: function() { 
    },
    
    //CLIENT called when de-activated, in case there is opportunity to free memory using JS "delete" operator
    unload: function() { },
    
    /*CLIENT adjust result vector for the conditions calculated at a certain geopoint according to hueristics defined by option variables
    result vector includes any markers or labels to be drawn on the map*/
    updateLocal: function(geopoint, result) { },
    
    //called when this sensor has > 0 importance    
    updateGlobal: function(result) { 
        
        if (this.markers!=undefined) {
            addMapLayer(this.markers);
            return;
        }
        
        var markers = new OpenLayers.Layer.Markers( "Nuclear Facilities" );
        this.markers = markers;
        addMapLayer(markers);
        
        now.getSensor('IAEANuclear', function(s) { 
            
            var nuclear = s.nuclear;
            
            var iconScale = 8.0;            
            
            for (var i = 0; i < nuclear.length; i++) {
                var nuke = nuclear[i];
                
                var lon = nuke.lon;
                var lat = nuke.lat;
                var magnitude = nuke.reactors[0] + nuke.reactors[1] + nuke.reactors[2] + nuke.reactors[3];
                                                
                var ss = Math.log(1+magnitude) * iconScale;
                var size = new OpenLayers.Size(ss,ss);
                
                var offset = new OpenLayers.Pixel(-(size.w/2), -(size.h/2));
                var icon = new OpenLayers.Icon('/icon/nuclear.png',size,offset);
                
                var ll = lonlat(lon, lat);
                
                markers.addMarker(new OpenLayers.Marker(ll,icon));
                //markers.setOpacity(opacity);
                //marker.events.register('mousedown', marker, function(evt) { alert(this.icon.url); OpenLayers.Event.stop(evt); });                
            }
            
        });

    },
    
    getControlHTML : function() {
        return '';
    }
    
});

