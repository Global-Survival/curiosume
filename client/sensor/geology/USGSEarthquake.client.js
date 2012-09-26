setSensorClient('USGSEarthquake', { 

    load: function() { 
        //console.dir(now.getSensor('USGSEarthquake'));
        
        //alert(now.USGSEarthquake['earthquakes'].length);
    },
    
    //CLIENT called when de-activated, in case there is opportunity to free memory using JS "delete" operator
    unload: function() { },
    
    /*CLIENT adjust result vector for the conditions calculated at a certain geopoint according to hueristics defined by option variables
    result vector includes any markers or labels to be drawn on the map*/
    update: function(geopoint, result) { }
    
});

