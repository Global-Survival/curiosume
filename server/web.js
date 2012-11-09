var sensor = { };
var clients = { };
var objects = { };
var objectInterest = { };


var util = require('../client/util.js');
var config = require('../config.js');
var cortexit = require('./cortexit.js');

var http = require('http')
  , url = require('url')
  , fs = require('fs')
  , sys = require('util')
  , socketio= require('socket.io')
  , nodestatic = require('node-static')
  , server;
  

var Server = { 
		
		
};
var logMemory = util.createRingBuffer(256); 
Server.interestTime = { };	//accumualted time per interest, indexed by tag URI
Server.clientState = { };	//current state of all clients, indexed by their clientID

var file = new(nodestatic.Server)('./client');

var mongo = require("mongojs");
var databaseUrl = process.env['MongoURL']; //"mydb"; // "username:password@example.com/mydb"
var collections = [ "obj" ];


function loadState() {
	var db = mongo.connect(databaseUrl, collections);
	
	db.obj.find({ type: 'ServerState' }).limit(1).sort({time:-1}, function(err, objs) {
		  if( err || !objs) console.log("No object found");
		  else objs.forEach( function(x) {
			  var now = Date.now();
			  nlog('Resuming from ' + (now - x.time)/1000.0 + ' seconds downtime');
			  Server.interestTime = x.interestTime;
			  Server.clientState = x.clientState;
			  /* logMemory = util.createRingBuffer(256);
			  logMemory.buffer = x.logMemoryBuffer;
			  logMemory.pointer = x.logMemoryPointer;*/
			  
			  nlog("State loaded");
			  nlog(Server);
			  
		  } );
		  db.close();
	});
	

}



function saveState(onSaved, onError) {
	var t = Date.now()
	console.log(Server);
	
	/*
	logMemoryBuffer = logMemory.buffer;
	logMemoryPointer = logMemory.pointer;*/
	
	delete Server._id;
	Server.type = 'ServerState';
	Server.time = t;

	var db = mongo.connect(databaseUrl, collections);
	
	db.obj.save(Server, function(err, saved) {
		  
		  if( err || !saved ) 
			  onError(err);
		  else
			  onSaved();
		  
		  db.close();
	});
	
}

loadState();

//process.stdin.on('keypress', function(char, key) {
//	  if (key && key.ctrl && key.name == 'c') {
//   	    nlog('State saved');
//		saveState();
//	    process.exit();
//	  }
//});

function finish() {
	 saveState(
		function() { nlog("State saved");} , 
	 	function(err) { nlog("State not save " + err); }
	 );
	 process.exit();
	 console.log('FINISHED');
}

process.on('SIGINT', finish);
process.on('SIGTERM', finish);

//http://howtonode.org/node-js-and-mongodb-getting-started-with-mongojs
/*db.obj.save({ id: 'AnonymousAgentExample',  type: [ 'agent'], email: "anonymous@server.com", name: 'Anonymous'}, function(err, saved) {
	  if( err || !saved ) console.log("User not saved: " + err);
	  else console.log("User saved");
});*/
/*db.obj.find({ }, function(err, objs) {
	  if( err || !objs) console.log("No object found");
	  else objs.forEach( function(x) {
	    console.log(x);
	  } );
});*/


function nlog(x) {
	
	var xs = x;
	if (typeof(x)!="string")
		xs = JSON.stringify(x,null,4);
	
	var msg = new Date() + ': ' + xs;
	
	console.log(x);
	logMemory.push(msg);
}

http.globalAgent.maxSockets = 256;

function sendJSON(res, x) {
	res.writeHead(200, {'content-type': 'text/json' });
	res.end( JSON.stringify(x,null,4) );
}

var httpServer = http.createServer(function(req, res){
	var path = url.parse(req.url).pathname.substring(1);
	var pp = path.split('/');
	if (pp.length > 0) {
		var p1 = pp[0];
		if (p1 == 'log') {
			sendJSON(res, logMemory.buffer);		
		}
		else if (p1 == 'object') {
			var oid = pp[1];
			sendJSON(res, oid);			
		}
		else if (p1 == 'state') {
			sendJSON(res, Server);
		}		
		else if (p1 == 'save') {
			sendJSON(res, 'Saving');
			saveState(
				function() { nlog('State Saved'); } , 
			 	function(err) { nlog('State Save unccessful: ' + err) }
			);
		}		
		else if (p1 == 'team') {
			var p2 = pp[1];
			if (p2 == 'interestTime') {
				updateInterestTime();
				sendJSON(res, Server.interestTime);
			}
		}		
	}
	req.addListener('end', function () {
	   file.serve(req, res);
	});
});



httpServer.listen(config.port);

nlog('Web server on port ' + config.port);

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
io.set("polling duration", 10); 

function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

var channelListeners = {};

function pub(channel, message) {
	nlog(channel + ":" + JSON.stringify(message));
	io.sockets.in(channel).emit('receive-' + channel, message);
}

io.sockets.on('connection', function(socket) {
	
	//https://github.com/LearnBoost/socket.io/wiki/Rooms
	socket.on('subscribe', function(channel) { 
		nlog('subscribed: ' + channel);
		socket.join(channel); 
	});
	socket.on('unsubscribe', function(channel) { 
		nlog('unsubscribed: ' + channel);
		socket.leave(channel); 
	});
	

    socket.on('pub', function(channel, message) {
	pub(channel, message);
        //socket.broadcast.emit('receiveMessage', message);
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
       nlog('connect: ' + cid);
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
                nlog('update: ' + c + ': ' + s.name + ' , ' + s.geolocation);
                clients[c] = s;
                socket.broadcast.emit('setClient', c, s);
                
                updateInterests(c, s);
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


function updateInterestTime() {
	//TODO reprocess all clientState's to current time
}

function updateInterests(clientID, state) {
	state.when = Date.now();
	
	var prevState = Server.clientState[clientID];
	Server.clientState[clientID] = state;
	
	
	if (prevState!=undefined) {
		for (k in state.interests) {
			var v = state.interests[k];
			var pv = prevState.interests[k];
			if (pv==undefined) {
				pv = 0;
			}
			else {
				var averageInterest = (v + pv)/2.0;
				if (Server.interestTime[k] == undefined)
					Server.interestTime[k] = 0;
				Server.interestTime[k] += (state.when - prevState.when)/1000.0 * averageInterest;
			}
		}
		for (k in prevState.interests) {
			var v = state.interests[k];
			var pv = prevState.interests[k];
			if (v==undefined) {
				v = 0;				
				var averageInterest = (v + pv)/2.0;				
				if (Server.interestTime[k] == undefined)
					Server.interestTime[k] = 0;
				Server.interestTime[k] += (state.when - prevState.when)/1000.0 * averageInterest;
			}
			
		}
	} 
	
}

// process.on('uncaughtException', function (err) {
   // console.error('An uncaught error occurred!');
   // console.error(err.stack);
// });

addSensor('geology/USGSEarthquake');
addSensor('pollution/IAEANuclear');
addSensor('geology/MODISFires');

var stockquotes = require('./sensor/stockquotes.js');

var b = util.OutputBuffer(2500, function(o) { 
	pub('chat', o);	
});
b.start();

/*
var g = stockquotes.GoogleStockBot(['aapl','msft','ibm', 'goog'], b);
g.start();*/

