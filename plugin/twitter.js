
//http://blog.semmy.me/post/17390049513/streaming-twitter-with-ntwitter-and-node-js

//http://search.twitter.com/search.json?geocode=37.781157,-122.398720,1mi
//  http://search.twitter.com/search.rss?q=%3Fgeocode%3A53.344104%252C-6.2674937%252C25km
//http://search.twitter.com/search.rss?q=awesome

var request = require('request');
var _= require('underscore');

exports.plugin = {
        name: 'Tweets Nearby',    
		description: 'Repeatdly gets geographically-tagged tweets surrounding each user',
		options: { },
        version: '1.0',
        author: 'http://twitter.com',
		start: function(netention) { 
            
            function update() {
                var users = netention.getObjectsByTag('general.User', function(users) {
                    
                    _.each(users, function(u) {
                        var g = u.geolocation;
                        if (!g)
                            return;
                            
                        var lat = g[0];
                        var lon = g[1];
                        var url = 'http://search.twitter.com/search.json?geocode=' + lat + ',' + lon + ',2mi';
                        request(url, function (error, response, body) {
                            if (!error && response.statusCode == 200) {
                                var x = JSON.parse(body);
                                var tw = x.results;
                                for (var i = 0; i < tw.length; i++) {
                                    var t = tw[i];
                                    if (t.geo) {
                                        var s = {
                                            uri: 'twitter_' + t.id,
                                            geolocation: t.geo.coordinates,
                                            name: '@' + t.from_user + ': ' + t.text,
                                            tag: [ 'general.Message', 'twitter.Tweet' ],
                                            tagStrength: [ 1.0, 1.0 ],
                                            when: Date.parse(t.created_at)
                                            
                                        };
                                        netention.notice(s);
                                    }
                                }
                            }
                            else {
                                console.log('twitter lookup: ' + error);
                            }
                        });
                        
                    });
                    
                });
                
            }
            
            setInterval(update, 1000 * 60);
            update();
        },
		stop: function(netention) { }
};
