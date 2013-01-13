//http://www.rivescript.com/interpreters#js
//https://github.com/kirsle/rivescript-js

/* 
AIML -> RiveScript
http://www.rivescript.com/yabb2/YaBB.pl?num=1248975743

Automatically Generating Rivescript from Natural Language
http://www.rivescript.com/yabb2/YaBB.pl?num=1227013586
*/
var util = require('../../client/util.js');
var RiveScript = require("./rivescript/bin/RiveScript.js");
var _ = require('underscore');

exports.plugin = {
        name: 'RiveScript Chatbot',    
		description: 'Replies to comments and responds to private chat',
		options: { },
        version: '1.0',
        author: 'http://rivescript.com',
        
		start: function(netention) { 
            
            this.netention = netention;
            
            // Create the bot.
            var bot;
            
            this.bot = bot = new RiveScript({ debug: false });
            this.bot.loadDirectory("./plugin/rivescript/rivescript/eg/brain", function() { 
                
                bot.sortReplies();
                bot.ready = true;
                console.log(bot.reply('random', 'hi how are you?'));
                
            }, error_handler);
            
        },
                
        notice: function(x) {
            //TODO instead of faling here, just queue up requests
            if (!this.bot.ready)
                return;
                
            if (x.tag)
                if (_.contains(x.tag, 'general.Message')) {
                    if (!x.replyTo) {
                        var response = this.bot.reply(x.author, x.name);
                        this.netention.pub({
                           replyTo: x.uri,
                           uri: util.uuid(),
                           name: response,
                           tag: [ 'general.Message' ],
                           tagStrength: [ 1.0 ]                   
                        });
                    }
                }
        },
        
		stop: function(netention) {
		}
};


function error_handler (loadcount, err) {
	console.log("Error loading batch #" + loadcount + ": " + err + "\n");
}
