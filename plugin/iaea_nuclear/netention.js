var csv = require('ya-csv');
var util = require('../../client/util.js');


exports.plugin = {
        name: 'Nuclear Facilities',    
		description: 'Earth nuclear facilities (from IAEA)',
		options: { },
        version: '1.0',
        author: 'http://enformable.com',
        
		start: function(netention) { 
            
            netention.addTags([ {
                uri: 'NuclearFacility', name: 'Nuclear Facility',
                tag: [ 'environment' /* 'Pollution' */ ],
                properties: {
            			 'numReactors': { name: '# Reactors', type: 'integer' },		            
                }
            } ]);
            
            
            var reader = csv.createCsvFileReader('./plugin/iaea_nuclear/IAEANuclear.csv', {
                'separator': ',',
                'quote': '"',
                'escape': '"',       
                'comment': '',
            });

            var f = [];
            reader.addListener('data', function(data) {
                var x = data;
                
                var name = x[1];
                var location = x[2];
                
                if (!location)
                    return;
               
                var lat = parseFloat(location.split(',')[0]);
                var lon = parseFloat(location.split(',')[1]);
               
                var reactors = [ parseFloat(x[3]), 
                                parseFloat(x[4]), 
                                parseFloat(x[5]),
                                parseFloat(x[6]) ];
    
                var y = util.objNew(
                    'NuclearFacility_' + name.replace(/\s+/g, '_'), 
                    name + ' Nuclear Facility'
                );
                y.createdAt = 1316995200;
                util.objAddTag(y, 'NuclearFacility');
                util.objAddGeoLocation(y, lat, lon);
                util.objAddValue(y, 'numReactors', reactors);
                
                
                f.push(y);
                
            });
            reader.addListener('end', function() {
                function existMore() {
                    if (f.length > 0)
                        netention.notice(f.pop(), existMore);
                }
                existMore();
            });

            
        },
		stop: function(netention) { }
};