var irc = require('irc');
var _= require('underscore');

exports.plugin = {
        name: 'IRC',    
		description: 'Awareness of IRC Channels',
		options: { },
        version: '1.0',
        author: 'http://netention.org',
        
	start: function(netention) {
		var client = new irc.Client('irc.freenode.net', 'undefined_', {
    			channels: ['#CHANNEL'],
		});
     	},

        notice: function(x) {
            if (!x.tag)
                return;
            /*if (_.contains(x.tag, 'irc.Channel')) {
                this.update();
            }*/
        },

	stop: function(netention) { 
	}

};
