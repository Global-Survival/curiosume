/*
Client-side "Indicator Plugin"
*/

var Indicator = {
    
    id: function() { "" },
    
    //parent "folder" in the taxonomy, separated by slashes, like "Society/Crime"
    path: function() { "" },
    
    //called when this plugin is activated, to load and parse any necessary remote data (from web server)
    load: function() { },

    //called when de-activated, in case there is opportunity to free memory using JS "delete" operator
    unload: function() { },
    
    //an array describing variables, their initial values, and limits, to generate UI controls for adjusting those variables
    options: function() { },
    
    /*adjust result vector for the conditions calculated at a certain geopoint according to hueristics defined by option variables
    result vector includes any markers or labels to be drawn on the map*/
    update: function(geopoint, result) { }
    
};