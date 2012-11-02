var sensor = { };
var clients = { };


var config = require('../config.js');
var cortexit = require('./cortexit.js');

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

function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

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
    
    socket.on('connectSelf', function(cid) {
       if (cid == null) {
           cid = uuid();
           socket.emit('setClientID', cid);
       } 
       console.log('connect: ' + cid);
       socket.set('clientID', cid);

       for (c in clients) {
           if (c == cid) continue;
           var s = clients[c];           
           socket.emit('setClient', c, s);
       }
    });
    
    socket.on('updateSelf', function(s) {
        socket.get('clientID', function (err, c) {
            if (c == null) {
                socket.emit('reconnect');
            }
            else {
                console.log('update: ' + c + ': ' + s.name + ' , ' + s.geolocation);
                clients[c] = s;
                socket.broadcast.emit('setClient', c, s);
            }
        });
    });
    
    socket.on('getSentencized', function(urlOrText, withResult) {
    	cortexit.getSentencized(urlOrText, withResult);
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

// process.on('uncaughtException', function (err) {
   // console.error('An uncaught error occurred!');
   // console.error(err.stack);
// });

addSensor('geology/USGSEarthquake');
addSensor('pollution/IAEANuclear');
addSensor('geology/MODISFires');

