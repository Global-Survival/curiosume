var feedparser = require('feedparser');     //https://github.com/danmactough/node-feedparser

exports.plugin = {
        name: 'RSS Feeds (Really Simple Syndication)',	
		description: 'Periodically monitors RSS Feeds for new content',
		options: { },
        version: '1.0',
        author: 'http://netention.org',
        
		start: function(netention) { 
            
            //TODO add type
            netention.addTypes([
                {
                    uri: 'web.RSSFeed', name: 'RSS Feed', properties: {
                        'url': { name: 'URL', type: 'text' /* url */ },
                        'urlFetchPeriod': { name: 'Fetch Period (seconds)', type: 'text' /* number */, defaultValue: "3600" }
                        //'urlLastFetchedAt': { name: 'Last Fetched (timestamp)', type: 'text' /* number */ }
                    }
                }
            ]);
            
            /*
            rss.RSSFeed('http://earthquake.usgs.gov/earthquakes/catalogs/eqs7day-M5.xml', function(eq) {

                eq.eqMagnitude = parseFloat( eq.name.substring(1, eq.name.indexOf(',')));
		        eq.type = [ 'geo.EarthQuake' ];
                
                netention.notice(eq);


                return eq;
	        });
            */
            
        },
        
        notice: function(x) {
            if (_.contains(x.type, 'web.RSSFeed')) {
                console.log('rss noticed: ' + x.uri);
                
            }
        },
        
		stop: function(netention) {
		}
};

var RSSFeed = function(url, perArticle) {
	if (!process)
		process = function(x) { return x; };
	

	function onArticle(a) {
		//console.dir(a);
		
		var maxlen = a['title'].length;
		if (a['description']!=undefined)
			maxlen = Math.max(maxlen, a['description'].length);
		
		var x = {
			uri: a['guid'],
			link: a['link'],
			when: new Date(a['date']).getTime(),
			name: a['title'],
			type: "Message",
			length: maxlen
		};
		if (a['georss:point']) {
			x.geolocation = a['georss:point'];
		}
		if (a['geo:lat']) {
			x.geolocation = [ parseFloat(a['geo:lat']['#']), parseFloat(a['geo:long']['#']) ];
		}

		perArticle(x);
		
	}	

	feedparser.parseUrl(url)
  		.on('article', onArticle);
	
}

exports.RSSFeed = RSSFeed;

