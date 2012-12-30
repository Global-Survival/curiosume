var feedparser = require('feedparser');     //https://github.com/danmactough/node-feedparser
var _ = require('underscore');
var util = require('../client/util.js');

var minUrlFetchPeriod = 60*10;

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
            
            
            this.netention = netention;
            this.feeds = { };
            var that = this;
            
            this.updateUnthrottled = function() {
                
                that.feeds = { };                
                
                this.netention.getObjectsByType('web.RSSFeed', function(objs) {
                    for (var i = 0; i < objs.length; i++) {
                        var x = objs[i];
                        that.feeds[x.uri] = x;
                    }
                });                    
                
            };            
            this.update = _.throttle(this.updateUnthrottled, 1000 /* Increase longer */);
            
            this.update();
            
            this.loop = setInterval(function() {
                for (var k in that.feeds) {
                    var f = that.feeds[k];
                    
                    if (!f)
                        continue; //???
                        
                    var needsFetch = false;
                                        
                    if (!util.getProperty(f, 'lastUpdate')) {
                        needsFetch = true;
                    }
                    else {
                        var age = (Date.now() - util.getProperty(f, 'lastUpdate'))/1000.0;
                        
                        var fp = util.getProperty(f, 'urlFetchPeriod');
                        fp = Math.max(fp, minUrlFetchPeriod);
                        
                        if (fp < age) {
                            needsFetch = true;
                        }                        
                        else {
                            //console.log(fp - age, 'seconds to go');
                        }
                    }
                    
                    if (needsFetch) {
                    
                        var furi = util.getProperty(f, 'url');
                        
                        if (furi) {
                            RSSFeed(furi, function(a) {            
                                netention.pub(a);
                                return a;
                	        });
                        }
                        else {
                            //set error message as f property
                        }
                        
                        util.setTheProperty(f, 'lastUpdate', Date.now());                        
                        netention.pub(f);
                    }
                }
            }, 5000);
        },
                
        notice: function(x) {
            if (!x.type)
                return;
            if (_.contains(x.type, 'web.RSSFeed')) {
                this.update();
            }
        },
        
		stop: function(netention) {
            if (this.loop) {
                clearInterval(this.loop);
                this.loop = null;
            }
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
			type: [ "Message" ],
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

