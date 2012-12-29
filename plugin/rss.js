//https://github.com/danmactough/node-feedparser
var feedparser = require('feedparser');

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

