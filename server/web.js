var config = require('../config.js');

var http = require('http')
  , url = require('url')
  , fs = require('fs')
  , sys = require('sys')
  , nodestatic = require('node-static')
  , server;
  
var etherpadAPI = require('etherpad-lite-client');

var file = new(nodestatic.Server)('./client');

var httpServer = http.createServer(function(req, res){
  // all static files are served with node-static
  req.addListener('end', function () {
    file.serve(req, res);
  });
});

httpServer.listen(config.port);

var etherpad = etherpadAPI.connect({
  apikey: 'hhl3riEgv5hvOB4p0rbhivEP96mp3e6e', //see APIKEY.txt in etherpad folder
  host: 'localhost',
  port: 9001
});

console.log('Web server on port ' + config.port);

var nowjs = require("now");
var everyone = nowjs.initialize(httpServer);

everyone.now.distribute = function(message){  
  everyone.now.receive(this.now.name, message); // this.now exposes caller's scope
};

function ep(author, f) {
    
    etherpad.createAuthorIfNotExistsFor( { name: author, authorMapper: 7 }, function(error,data) {
        //console.log('created author for ' + author);
        //console.dir(status);
        //console.dir(data);
        if (error!=null) {
             console.log('createAuthorIfNotExistsFor: ' + error.message);
        }
        else {
            var aid = data.authorID;

            //Request: http://pad.domain/api/1/createGroupIfNotExistsFor?apikey=secret&groupMapper=7
            etherpad.createGroupIfNotExistsFor( { groupMapper: 7 }, function(error, data) {
                if (error === null) {

                    var gid = data.groupID;

                    f(aid, gid);
                }
                else {
                    console.log('createGroupIfNotExistsFor: ' + error.message);
                }
            });
        }
    });
}
everyone.now.getPads = function(padsAre) {
    ep(this.now.name, function(aid, gid) {
        etherpad.listPads( { groupID: gid }, function(error, data) {
           if (error===null) {
               padsAre(data.padIDs);
           }
           else {
               console.log('listPads: ' + error.message);           
           }
        });
    });
};

everyone.now.newPad = function(title, text, newPadIs) {
    
    ep(this.now.name, function(aid, gid) {
        //Request: http://pad.domain/api/1/createGroupPad?apikey=secret&groupID=g.s8oes9dhwrvt0zif&padName=samplePad&text=This is the first sentence in the pad
        etherpad.createGroupPad( { 'groupID': gid, 'padName': title, 'text': text }, function(error, data) {
            if (error === null) {
                newPadIs(data.padID, null);
            }
            else {
                console.log('createGroupPad: ' + error.message);
                newPadIs(null, error);
            }
        });
        
    });
    
};

//var earthquake = require('../sensor/geology/USGSEarthquake.js');
//earthquake.i.load(everyone, function() { console.log('USGSEarthquake ok')}, function() { });
