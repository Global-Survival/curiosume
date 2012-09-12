/*
http://earthquake.usgs.gov/earthquakes/catalogs/eqs7day-M2.5.txt
  CSV format
(other feeds are available from USGS)
*/
var csv = require('../../csv.js');
var now = require('now');

var USGSEarthquake = {
    
    //parent "folder" in the taxonomy, separated by slashes, like "Society/Crime"
    id: function() { 'indicator/geology/USGSEarthquake' },
    
    //list of named variables, their types, initial values, and limits, to generate UI controls for adjusting those variables
    options: function() { },
    
    //SERVER to refresh the data in this cache, should be called at least once at the beginning
    refresh: function(everyone, onFinished, onError) { 
        var quakes = [];
        csv.parseCsvUrl('http://earthquake.usgs.gov/earthquakes/catalogs/eqs7day-M2.5.txt', function(x) {
           quakes.push(x);
        }, function() {
            if (everyone!=undefined)
                everyone.now[this.id()].quakes = quakes;
            onFinished(quakes);
        });
    },
    
    //CLIENT called when this plugin is activated, to load and parse any necessary remote data (from web server)
    load: function() { 
        alert(everone.now[this.id()].quakes.length);
    },

    //CLIENT called when de-activated, in case there is opportunity to free memory using JS "delete" operator
    unload: function() { },
    
    /*CLIENT adjust result vector for the conditions calculated at a certain geopoint according to hueristics defined by option variables
    result vector includes any markers or labels to be drawn on the map*/
    update: function(geopoint, result) { }
    
};

USGSEarthquake.refresh(undefined, function(x) { console.log(x); }, function() { });