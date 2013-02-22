//http://earthquake.usgs.gov/earthquakes/catalogs/

//Past 7 Days - M 5+ earthquakes 
//http://earthquake.usgs.gov/earthquakes/catalogs/eqs7day-M5.xml

//http://www.emsc-csem.org/#2

var rss = require('./rss.js');

exports.plugin = {
    	name: 'USGS Earthquakes',	
		description: 'United States Geographical Survey Earthquakes Data (> Magnitude 5, last 7 days)',
		options: { },
        version: '1.0',
        author: 'http://netention.org',
        //depends on: 'climate'
        
		start: function(netention) { 
            
            netention.addTags([
                {
                    uri: 'environment.EarthQuake', name: 'Earthquake',                     
                    properties: {       }
                }
            ], ['environment']);
            
            rss.RSSFeed('http://earthquake.usgs.gov/earthquakes/catalogs/eqs7day-M5.xml', function(eq) {

                eq.name = eq.name + ' Earthquake';
                eq.eqMagnitude = parseFloat( eq.name.substring(1, eq.name.indexOf(',')));
		        eq.tag = [ 'environment.EarthQuake' ];
                
                netention.notice(eq);


                return eq;
	        });
            
        },
        
		stop: function(netention) {
		}
};
