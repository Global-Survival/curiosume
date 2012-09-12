/*
Indicator Plugin

contains code applicable to both client and server, though each
won't access the wrong code inadvertently as they are in separate
methods.
*/

var Indicator = {
    
    id: function() { "" },
    
    //list of named variables, their types, initial values, and limits, to generate UI controls for adjusting those variables
    options: function() { },
    
    //SERVER to refresh the data in this cache, should be called at least once at the beginning
    refresh: function(onFinished, onError) { },
    
    //CLIENT called when this plugin is activated, to load and parse any necessary remote data (from web server)
    load: function() { },

    //CLIENT called when de-activated, in case there is opportunity to free memory using JS "delete" operator
    unload: function() { },
    
    /*CLIENT adjust result vector for the conditions calculated at a certain geopoint according to hueristics defined by option variables
    result vector includes any markers or labels to be drawn on the map*/
    update: function(geopoint, result) { }
    
};