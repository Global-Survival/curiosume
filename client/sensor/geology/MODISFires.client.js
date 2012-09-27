//http://earthdata.nasa.gov/data/nrt-data/firms/active-fire-data

setSensorClient('MODISFires', { 

    load: function() { },
    
    //CLIENT called when de-activated, in case there is opportunity to free memory using JS "delete" operator
    unload: function() { },
    
    /*CLIENT adjust result vector for the conditions calculated at a certain geopoint according to hueristics defined by option variables
    result vector includes any markers or labels to be drawn on the map*/
    updateLocal: function(geopoint, result) { },
    
    //called when this sensor has > 0 importance    
    updateGlobal: function(result) { 
        
        if (this.kml!=undefined) {
            this.kml.setOpacity(this.getOpacity());            
            addMapLayer(this.kml);
            return;
        }
        
        var kml = new OpenLayers.Layer.Vector("KML", {
            strategies: [new OpenLayers.Strategy.Fixed()],
            protocol: new OpenLayers.Protocol.HTTP({
                //url: "http://dev.geog.umd.edu/alerts/download.php?file=kml_global_modis-hotspots.kml",
                url: "/sensor/geology/MODISFires.USA24h.kml",
                format: new OpenLayers.Format.KML({
                    extractStyles: true, 
                    extractAttributes: true,
                    maxDepth: 2
                })
            })
        });
        kml.setOpacity(this.getOpacity());        
        
        this.kml = kml;
        addMapLayer(kml);        
            
    },
    
    getControlHTML : function() {
        return '';
    },
    
    getOpacity : function() {
        var i = parseFloat(sensorImportance['MODISFires']);
        if (i <= 25) {
            return 0.3;
        }
        else if ( i <= 50) {
            return 0.5;
        }
        else if ( i <= 75) {
            return 0.7;
        }
        else /*if (i == 100)*/ {
            return 0.9;
        }
    }
    
});

