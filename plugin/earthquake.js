//http://earthquake.usgs.gov/earthquakes/catalogs/

//Past 7 Days - M 5+ earthquakes 
//http://earthquake.usgs.gov/earthquakes/catalogs/eqs7day-M5.xml

//http://www.emsc-csem.org/#2
//http://quakes.globalincidentmap.com/

var rss = require('./rss.js');

exports.plugin = {
    	name: 'USGS Earthquakes',	
		description: 'United States Geographical Survey Earthquakes Data (> Magnitude 5, last 7 days)',
		options: { },
        version: '1.0',
        author: 'http://netention.org',
        //depends on: 'climate'
        
		start: function(netention, util) { 
            
            netention.addTags([
                {
                    uri: 'environment.EarthQuake', name: 'Earthquake',                     
                    properties: {       
        				 'eqMagnitude': { name: 'Magnitude', type: 'real' },		            
    					 'eqDepth': { name: 'Depth (m)', type: 'real' }
                    }
                }
            ], ['environment']);
            
            rss.RSSFeed('http://earthquake.usgs.gov/earthquakes/catalogs/eqs7day-M5.xml', function(eq, a) {

                eq.name = eq.name + ' Earthquake';
                
                util.objAddTag(eq, 'environment.EarthQuake');
                util.objAddValue(eq, 'eqMagnitude', parseFloat( eq.name.substring(1, eq.name.indexOf(','))) );
                
                var depth = a['dc:subject'][2]['#'];
                depth = parseFloat(depth.substring(0, depth.indexOf(' ')).trim())*1000.0;
                util.objAddValue(eq, 'eqDepth', depth );
                
                
                
                netention.notice(eq);

                return eq;
	        });
            
        },
        
		stop: function(netention) {
		}
};
