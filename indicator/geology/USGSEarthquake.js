/*
http://earthquake.usgs.gov/earthquakes/catalogs/eqs7day-M2.5.txt
  CSV format
(other feeds are available from USGS)
*/
var csv = require('../../csv.js');
var now = require('now');

var id = 'USGSEarthquake';

exports.i = {
    
    //parent "folder" in the taxonomy, separated by slashes, like "Society/Crime"
    id: function() { id },
    
    //list of named variables, their types, initial values, and limits, to generate UI controls for adjusting those variables
    options: function() { },
    
    //SERVER to refresh the data in this cache, should be called at least once at the beginning
    load: function(everyone, onFinished, onError) { 
        var quakes = [];
        csv.parseCsvUrl('http://earthquake.usgs.gov/earthquakes/catalogs/eqs7day-M2.5.txt', function(x) {
           quakes.push(x);
        }, function() {
            if (everyone!=undefined) {
                everyone.now.USGSEarthquake = {
                    earthquakes: quakes
                };
            }
            onFinished(quakes);
        });
    }
};

//USGSEarthquake.refresh(undefined, function(x) { console.log(x); }, function() { });