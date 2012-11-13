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

function notice(o) {
	if (!o.uuid)
		return;
		
	var db = mongo.connect(databaseUrl, collections);
	db.obj.update({ uuid: o.uuid }, o, {upsert: true}, function(err) {
		if (err) {
			nlog(err);
		}
		
		db.close();		
	});

}

function getTypeCounts(whenFinished) {
	//this can probably be optimized very much
	
	var db = mongo.connect(databaseUrl, collections);
	db.obj.find(function(err, docs) {
		var totals = { };
		for (var k in docs) {
			var d = docs[k];
			if (d.type) {
				/*if (d.type[0]) {
					// is array
				}
				else {*/
					if (totals[d.type])
						totals[d.type]++;
					else
						totals[d.type] = 1;
				//}
			}
		}
		//console.log(totals);
		whenFinished(totals);
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

function broadcast(socket, message) {
	nlog(socket.clientID + ' broadcast: ' + JSON.stringify(message, null, 4));
	socket.broadcast.emit('receive', message);	
}

function pub(channel, message) {
	nlog(channel + ":" + JSON.stringify(message, null, 4));
	io.sockets.in(channel).emit('receive', message);
}

io.sockets.on('connection', function(socket) {
	
	//https://github.com/LearnBoost/socket.io/wiki/Rooms
	socket.on('subscribe', function(channel) { 
		sub(socket, channel); 
	});
	socket.on('unsubscribe', function(channel) { 
		unsub(socket, channel); 
	});
	

    socket.on('pub', function(channel, message) {
    	if (channel == '')
       		broadcast(socket, message);
       	else
			pub(channel, message);
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
            	socket.clientID = c;
                //nlog('update: ' + c + ': ' + s.name + ' , ' + s.geolocation);
                clients[c] = s;
                socket.broadcast.emit('setClient', c, s);
                
                s.created = Date.now();
                updateInterests(c, s, socket);
            }
        });
    });
    
    socket.on('getSentencized', function(urlOrText, withResult) {
    	cortexit.getSentencized(urlOrText, withResult);
    });
    
});


/*
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
*/

function updateInterestTime() {
	//reprocess all clientState's to current time
	for (c in Server.clientState) {
		var cl = Server.clientState[c];
		updateInterests(c, cl);		
	}
}

function sub(socket, channel) {
	nlog(socket.clientID + ' subscribed ' + channel );
	socket.join(channel);
}
function unsub(socket, channel) {
	nlog(socket.clientID + ' unsubscribed ' + channel );
	socket.leave(channel);	
}

function interestAdded(socket, interest) {
	sub(socket, interest);	
}
function interestRemoved(socket, interest) {
	unsub(socket, interest);
}

function updateInterests(clientID, state, socket) {	
	var prevState = Server.clientState[clientID];
	var now = Date.now();
	
	Server.clientState[clientID] = state;
	var addends = { };
		
	if (prevState!=undefined) {

		for (k in state.interests) {
			var v = state.interests[k];
			var pv = prevState.interests[k];
			if (pv==undefined) {
				pv = 0;
				if (socket)
					interestAdded(socket, k);
			}
			else {
				var averageInterest = (v + pv)/2.0;
				if (Server.interestTime[k] == undefined)
					Server.interestTime[k] = 0;
				 addends[k] = ( (now - prevState.when)/1000.0 * averageInterest );
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
				addends[k] = ( Server.interestTime[k] += (now - prevState.when)/1000.0 * averageInterest );
				
				if (socket)
					interestRemoved(socket, k);
			}
			
		}
		var addendSum = 0;
		for (k in addends) {
			addendSum += addends[k];
		}
		for (k in addends) {
			var a = addends[k];
			if (Server.interestTime[k] == undefined)
				Server.interestTime[k] = 0;
			Server.interestTime[k] += a / addendSum;			
		}
	}
	
	state.when = now;
	
}

// process.on('uncaughtException', function (err) {
   // console.error('An uncaught error occurred!');
   // console.error(err.stack);
// });

//addSensor('geology/USGSEarthquake');
//addSensor('pollution/IAEANuclear');
//addSensor('geology/MODISFires');

var sensor = require('../sensor/sensor.js');
var b = util.OutputBuffer(500, function(o) {
	
	var channel = 'chat';
	var message = o;
	if (o[0]) {
		channel = o[0];
		message = o[1];
	} 
	notice(message);
	pub(channel, message);
});
b.start();

sensor.setDefaultBuffer(b); 
//sensor.addSensor(require('../sensor/googlefinance.js').GoogleFinanceSymbols(['aapl','msft','ibm','goog']));
//sensor.addSensor(require('../sensor/rss.js').RSSFeed('x', 'http://blog.automenta.com/feeds/posts/default?alt=rss'));
//sensor.addSensor(require('../sensor/mindmodel.js').MMCSV('emotion-happy','./schema/enformable_atomic_history.statements.tsv'));
//sensor.addSensor(require('../sensor/echo.js').Echo('emotion-happy', 'happiness'));
//sensor.addSensor(require('../sensor/echo.js').Echo('emotion-surprised', 'surprise!'));
