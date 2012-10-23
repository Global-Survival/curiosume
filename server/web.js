var sensor = { };

var config = require('../config.js');

var http = require('http')
  , url = require('url')
  , fs = require('fs')
  , sys = require('util')
  , socketio= require('socket.io')
  , nodestatic = require('node-static')
  , server;
  

var file = new(nodestatic.Server)('./client');




var httpServer = http.createServer(function(req, res){
  
  req.addListener('end', function () {
    file.serve(req, res);
  });
});

httpServer.listen(config.port);

console.log('Web server on port ' + config.port);

var io = socketio.listen(httpServer);

io.enable('browser client minification');  // send minified client
io.enable('browser client etag');          // apply etag caching logic based on version number
io.enable('browser client gzip');          // gzip the file
io.set('log level', 1);                    // reduce logging
io.set('transports', [                     // enable all transports (optional if you want flashsocket)
    'websocket'
//  , 'flashsocket'
  , 'htmlfile'
  , 'xhr-polling'
  , 'jsonp-polling'
]);

io.sockets.on('connection', function(socket) {
  
    socket.on('distribute', function(message) {
        socket.broadcast.emit('receiveMessage', message);
    });
    
    socket.on('getSensors', function(withSensors) {
        withSensors(sensor);
    });
    
    socket.on('getSensor', function(id, withSensor) {
        if (sensor[id]!=undefined) {
            withSensor(sensor[id]);
        }
        else {
            console.error('Unknown sensor: ' + id);
        }
    });
    
});


function addSensor(path) {
    var s = require('./../client/sensor/' + path + '.js');
    var se = s.sensor;
    
    if ((s === undefined) || (se === undefined)) {
        console.error('Sensor: ' + path + ' not found');
        return;
    }
    
    se.clientJS = '/sensor/' + path + '.client.js';
    
    sensor[se.id()] = se;

    se.refresh(sensor, function() { 
        console.log('Added sensor: ' + se.id());
    }, function() { 
        console.error('Error adding sensor: ' + se.id());
    });

    
};

addSensor('geology/USGSEarthquake');
addSensor('pollution/IAEANuclear');
addSensor('geology/MODISFires');

