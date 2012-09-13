var USGSEarthquakeClient = {
    
    //parent "folder" in the taxonomy, separated by slashes, like "Society/Crime"
    id: function() { 'USGSEarthquake' },

    //CLIENT called when this plugin is activated, to load and parse any necessary remote data (from web server)
    load: function() { 
        alert(now.USGSEarthquake['earthquakes'].length);
    },

    //CLIENT called when de-activated, in case there is opportunity to free memory using JS "delete" operator
    unload: function() { },
    
    /*CLIENT adjust result vector for the conditions calculated at a certain geopoint according to hueristics defined by option variables
    result vector includes any markers or labels to be drawn on the map*/
    update: function(geopoint, result) { }
        
};

