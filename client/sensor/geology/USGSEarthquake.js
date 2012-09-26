/*
http://earthquake.usgs.gov/earthquakes/catalogs/eqs7day-M2.5.txt
  CSV format
(other feeds are available from USGS)
*/
var csv = require('../csv.js');
var now = require('now');


exports.sensor = {
    
    //parent "folder" in the taxonomy, separated by slashes, like "Society/Crime"
    id: function() { return 'USGSEarthquake'; },
    
    //list of named variables, their types, initial values, and limits, to generate UI controls for adjusting those variables
    options: function() { 
        return {
            'showQuakes': false
        };
    },
    
    //SERVER to refresh the data in this cache, should be called at least once at the beginning
    refresh: function(sensor, onFinished, onError) { 
        var quakes = [];
        var i = this.id();
        
        csv.parseCsvUrl('http://earthquake.usgs.gov/earthquakes/catalogs/eqs7day-M2.5.txt', function(x) {
           
           delete x['nst'];
           delete x['region\r'];
           delete x['version'];
           delete x['src'];
           
           x['when'] = Date.parse(x['datetime']);
           delete x['datetime'];
           
           quakes.push(x);
           
        }, function() {
            sensor[i].earthquakes = quakes;
            
            if (onFinished!=undefined)
                onFinished(quakes);
        });
    }
};

//exports.sensor.refresh(undefined, function(x) { console.dir(x); }, function() { });
