
//http://blog.semmy.me/post/17390049513/streaming-twitter-with-ntwitter-and-node-js

//http://search.twitter.com/search.json?geocode=37.781157,-122.398720,1mi
//  http://search.twitter.com/search.rss?q=%3Fgeocode%3A53.344104%252C-6.2674937%252C25km
//http://search.twitter.com/search.rss?q=awesome

var request = require('request');
var _= require('underscore');

exports.plugin = {
        name: 'Twitter Interface',    
    	description: 'Twitter inputs',
		options: { },
        version: '1.0',
        author: 'http://netention.org',
        
		start: function(netention) { 
            
      
            netention.addTags(
                [
                    { uri: 'InterestInTwitterUser', name: 'Interest in Twitter User',
                        description: "Interest in Twitter user tweets, friends, and other activity",
                        properties: {
                					 'twitterID': { name: 'Twitter ID', type: 'text', min: 1 }
                    	}
                    },
                    { uri: 'InterestInTwitterHashtag', name: 'Interest in Twitter Hashtag',
                        description: "Interest in tweets containing a specific Hashtags",
                        properties: {
                    				 'twitterHashtag': { name: 'Twitter Hashtag', type: 'text', min: 1 }
                    	}
                    },
                    { uri: 'InterestInTwitterLocation', name: 'Interest in Twitter Location',
                        description: "Interest in a tweets near a twitter location",
                        properties: {
                    				 'twitterLocation': { name: 'Twitter Location', type: 'spacepoint', min: 1, max: 1 },
                        			 'twitterLocationRadius': { name: 'Twitter Location Radius (km)', type: 'real', min: 1, max: 1 }
                    	}
                    }
                
                ]
            );

            function update() {
                
                netention.getObjectsByTag('InterestInTwitterUser', function(tu) {
                    //console.log('Interest in Twitter user: ' + tu);
                });
                netention.getObjectsByTag('InterestInTwitterLocation', function(tl) {
                    //console.log('Interest in Twitter Location: ' + tl);
                });
                
                /*
                var users = netention.getObjectsByTag('User', function(users) {
                    
                    _.each(users, function(u) {
                        var g = u.geolocation;
                        if (!g)
                            return;
                            
                        var lat = g[0];
                        var lon = g[1];
                        var url = 'http://search.twitter.com/search.json?geocode=' + lat + ',' + lon + ',2mi';
                        
                        //TODO update to the new netention data format
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
                                            tag: [ 'Message', 'twitter.Tweet' ],
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
                    
                });*/
                
            }
            
            setInterval(update, 1000 * 60 * 5 /* minutes  */);
            update();
        },
		stop: function(netention) { }
};
