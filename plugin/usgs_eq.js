//http://earthquake.usgs.gov/earthquakes/catalogs/

//Past 7 Days - M 5+ earthquakes 
//http://earthquake.usgs.gov/earthquakes/catalogs/eqs7day-M5.xml
var rss = require('./rss.js');

exports.plugin = {
    	name: 'USGS Earthquakes',	
		description: '',
		options: { },
		start: function(netention) { 
            
            //TODO add type
            
            rss.RSSFeed('http://earthquake.usgs.gov/earthquakes/catalogs/eqs7day-M5.xml', function(eq) {

                eq.eqMagnitude = parseFloat( eq.name.substring(1, eq.name.indexOf(',')));
		        eq.type = [ 'geo.EarthQuake' ];
                
                netention.notice(eq);


                return eq;
	        });
            
        },
		stop: function(netention) {
		}
};