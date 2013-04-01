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
            
            netention.addTags([{
                uri: 'web', name: 'Web'            
            }]);
            
            netention.addTags([
                {
                    uri: 'RSSFeed', name: 'RSS Feed', 
                    properties: {
                        'url': { name: 'URL', type: 'text' /* url */, min: 1, default: 'http://' },
                        'urlFetchPeriod': { name: 'Fetch Period (seconds)', type: 'text' /* number */, default: "3600", min: 1, max: 1 },
                        'addArticleTag': { name: 'Add Tag to Articles', type: 'text' },
                        'lastRSSUpdate': { name: 'Last RSS Update',  type: 'timepoint' }
                    }
                },
                {
                    uri: 'RSSItem', name: 'RSS Item',
                    properties: {
                        'rssItemURL': { name: 'RSS Item URL', type: 'url' }
                    }
                }
            ], [ 'web' ]);
            
            
            this.netention = netention;
            this.feeds = { };
            var that = this;
            
            this.updateUnthrottled = function(f) {
                
                that.feeds = { };                
                
                that.netention.getObjectsByTag('RSSFeed', function(x) {
                    that.feeds[x.id] = x;
                    
                    if (f)
                        f();
                });                    
                
            };            
            this.update = _.throttle(this.updateUnthrottled, 5000 /* Increase longer */);
            
            this.update();
            
            var ux = function() {
                
                that.update(function() {
                    
                    for (var k in that.feeds) {
                        var f = that.feeds[k];
                        
                        
                        if (!f)
                            continue; //???
                            
                        var needsFetch = false;
                                            
                        if (!util.objFirstValue(f, 'lastRSSUpdate')) {
                            needsFetch = true;
                        }
                        else {
                            var age = (Date.now() - util.objFirstValue(f, 'lastRSSUpdate'))/1000.0;
                            
                            var fp = util.objFirstValue(f, 'urlFetchPeriod');
                            fp = Math.max(fp, minUrlFetchPeriod);
                            
                            if (fp < age) {
                                needsFetch = true;
                            }                        
                            else {
                                //console.log(fp - age, 'seconds to go');
                            }
                        }
                        
                        if (needsFetch) {
                        
                            var furi = util.objValues(f, 'url');
                            
                            if (furi) {
                                for (var ff = 0; ff < furi.length; ff++) {
                                    RSSFeed(furi[ff], function(a) {            
                                        //TODO add extra tags from 'f'
                                        
                                        netention.pub(a);
                                        return a;
                                    });
                                }
                            }
                            else {
                                //set error message as f property
                            }
                            
                            util.objSetFirstValue(f, 'lastRSSUpdate', Date.now());                        
                            netention.pub(f);
                        }
                    }
                    
                });
                
            };
            
            this.loop = setInterval(ux, 15000);
            ux();
        },
                
        notice: function(x) {
            if (util.objHasTag(x, 'web.RSSFeed')) {
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
		
        var w;
        if (a['date'])
            w = new Date(a['date']).getTime();
        else
            w = Date.now();
            
        var x = util.objNew( util.MD5(a['guid']), a['title'] );
        x.createdAt = w;
        
        util.objAddDescription(x, a['description']);        
        
		if (a['georss:point']) {
            util.objAddGeoLocation(x, a['georss:point'][0], a['georss:point'][1] );
		}
		if (a['geo:lat']) {
            util.objAddGeoLocation(x, parseFloat(a['geo:lat']['#']), parseFloat(a['geo:long']['#']) );
		}
        util.objAddTag(x, 'RSSItem');
        util.objAddValue(x, 'rssItemURL', a['link']);
		perArticle(x, a);
		
	}	

    try {
    	feedparser.parseUrl(url).on('article', onArticle);
    }
    catch (e) {
        console.error(e);
    }
	
}

exports.RSSFeed = RSSFeed;

