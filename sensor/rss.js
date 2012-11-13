//https://github.com/danmactough/node-feedparser

var feedparser = require('feedparser');
var sensor = require('./sensor.js');

var RSSFeed = function(channel, url) {
	var s = sensor.Sensor('RSS_' + url, function() {

		function onArticle(a) {
			//console.dir(a);
			
			var x = {
				uuid: a['guid'],
				link: a['link'],
				when: new Date(a['date']).getTime(),
				name: a['title'],
			};
			if (a['georss:point']) {
				x.geolocation = a['georss:point'];
			}

			//console.dir(x);
			s.out.push([channel, x]);
		}

		feedparser.parseUrl(url)
  			.on('article', onArticle);

	}, function() { 	});

	return s;
}

exports.RSSFeed = RSSFeed;

