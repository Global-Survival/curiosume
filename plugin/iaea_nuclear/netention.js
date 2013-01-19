var csv = require('ya-csv');

exports.plugin = {
        name: 'Nuclear Facilities',    
		description: 'Earth nuclear facilities (from IAEA)',
		options: { },
        version: '1.0',
        author: 'http://enformable.com',
        
		start: function(netention) { 
            
            netention.addTags([ {
                uri: 'NuclearFacility', name: 'Nuclear Facility',
                tag: [ 'climate' /* 'Pollution' */ ]
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
    
                var y = {
                    'uri': 'NuclearFacility_' + name.replace(/\s+/g, '_'),
                     tag: ['NuclearFacility'],
                     tagStrength: [1],
                    'name': name + ' Nuclear Facility',                    
                    'geolocation': [lat, lon],
                    when: Date.now(),
                    'reactors': reactors        //TODO as property
                };
                
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