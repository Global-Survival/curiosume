exports.plugin = {
        name: '4Chan Categories',	
		description: 'Various categories from 4Chan',
		options: { },
        version: '1.0',
        author: 'http://netention.org',
		start: function(netention) { 
            function add4ChanTopics(t) {
                var lt = [];
            	for (var i = 0; i < t.length; i++) {
            		var n = t[i];
            		var tx = t[i].replace(/ /g, "_");
            		lt.push({
            			uri: '4chan.' + tx,
            			name: n
            		});
            	}
            	netention.addTags(lt);
            }
            
            add4ChanTopics([ 'Video Games',
                             'Video Game Generals',
                            'Comics and Cartoons',
                            'Technology',
                            'Television and Film',
                            'Weapons',
                            'Auto',
                            'Animals and Nature',
                            'Traditional Games',
                            'Sports',
                            'Science and Math',
                            'International',
                            'Computers',
             ]);            
        },
		stop: function(netention) { }
};