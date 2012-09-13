var config = require('./config.js');

var http = require('http')
  , url = require('url')
  , fs = require('fs')
  , sys = require('sys')
  , nodestatic = require('node-static')
  , server;
  
var file = new(nodestatic.Server)('./');
var httpServer = http.createServer(function(req, res){
  // all static files are served with node-static
  req.addListener('end', function () {
    file.serve(req, res);
  });
});
httpServer.listen(config.port);

var nowjs = require("now");
var everyone = nowjs.initialize(httpServer);
      
everyone.now.distribute = function(message){
  // this.now exposes caller's scope
  everyone.now.receive(this.now.name, message);
};


var earthquake = require('./indicator/geology/USGSEarthquake.js');
earthquake.i.load(everyone, function() { console.log('USGSEarthquake ok')}, function() { });
