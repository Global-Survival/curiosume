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
    refresh: function(onFinished, onError) { }    
    
};