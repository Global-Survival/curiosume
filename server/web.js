var clients = { };
var objects = { };
var types =  { };
var objectInterest = { };

var memory = require('./memory.js');
var util = require('../client/util.js');
var config = require('../config.js');
var cortexit = require('./cortexit.js');
var expressm = require('express');
var express = expressm();
var connect = require('connect');

var http = require('http')
  , url = require('url')
  , fs = require('fs')
  , sys = require('util')
  , socketio= require('socket.io')
  , nodestatic = require('node-static')
  , server;
  
var attention = memory.Attention(0.95);

var Server = { 
	name: 'Netention',
	description: 'http://netention.org',
	
	memoryUpdatePeriodMS: 5000	
};
exports.Server = Server;

var sensor = require('../sensor/sensor.js');
sensor.setDefaults(b, types);
require('../init.js').init();


var logMemory = util.createRingBuffer(256); 
Server.interestTime = { };	//accumualted time per interest, indexed by tag URI
Server.clientState = { };	//current state of all clients, indexed by their clientID

var file = new(nodestatic.Server)('./client');

var mongo = require("mongojs");
var databaseUrl = process.env['MongoURL'] || Server.database; //"mydb"; // "username:password@example.com/mydb"
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
		
	attention.notice(o, 0.1);
	
	var db = mongo.connect(databaseUrl, collections);
	db.obj.update({ uuid: o.uuid }, o, {upsert: true}, function(err) {
		if (err) {
			nlog(err);
		}
		
		db.close();		
	});

}
function getObjectSnapshot(uri, whenFinished) {
	if (types[uri]!=undefined) {
		whenFinished(types[uri]);
	}
	else {
		var db = mongo.connect(databaseUrl, collections);
		db.obj.find({ uuid: uri }, function(err, docs) {
			if (err) {
				whenFinished(err);
			}
			else {
				whenFinished(docs);
			}
			db.close();
		});		
	}		
	
}

function getObjectsByType(t, withObjects) {
	var db = mongo.connect(databaseUrl, collections);
	db.obj.find({ type: { $in: [ t ] } }, function(err, docs) {

		db.close();
		
		if (!err) {		
			
			withObjects(docs);
		}		
	});
	
}

function getTypeCounts(whenFinished) {
	//this can probably be optimized very much
	
	var db = mongo.connect(databaseUrl, collections);
	db.obj.find(function(err, docs) {
		if (err) {
			console.log('getTypeCounts: ' + err);
		}
		db.close();
		
		var totals = { };
		for (var k in docs) {
			var d = docs[k];
			if (d.type) {
				d.type = util.getTypeArray(d.type);
				for (var i = 0; i < d.type.length; i++) {
					var dtype = d.type[i];
					if (totals[dtype])
						totals[dtype][0]++;
					else
						totals[dtype] = [ 1, 0];
					totals[dtype][1] = attention.totals[dtype] || 0;
				}
			}
			
			if (d.uuid) {
				var a = attention.values[d.uuid];
				
				if (a) {
					totals[d.uuid] = [ 0, a ];
					if (d.name)
						totals[d.uuid].push(d.name);
				}
			}
			
		}
		
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
function sendJSON(res, x, pretty) {
	res.writeHead(200, {'content-type': 'text/json' });
	var p; 
	if (!pretty)
		p = JSON.stringify(x);
	else
		p = JSON.stringify(x,null,4)
	res.end( p );
}

http.globalAgent.maxSockets = 256;

var httpServer = http.createServer(express);

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

var cookieParser = expressm.cookieParser('netention0')
  , sessionStore = new connect.middleware.session.MemoryStore();
var SessionSockets = require('session.socket.io')
  , sessionSockets = new SessionSockets(io, sessionStore, cookieParser);

//PASSPORT -------------------------------------------------------------- 
var passport = require('passport')
  , OpenIDStrategy = require('passport-openid').Strategy
  , GoogleStrategy = require('passport-google').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

express.configure(function() {
  express.use(cookieParser);
  express.use(expressm.bodyParser());
  express.use(expressm.session({store:sessionStore}));
  express.use(passport.initialize());
  express.use(passport.session());
  express.use(express.router);
});                        


passport.use(new OpenIDStrategy({
    returnURL: 'http://' + Server.host + '/auth/openid/return',
    realm: 'http://' + Server.host + '/'
  },
  function(identifier, done) {
  	//console.log(identifier);
  	//console.log(done);
  	done(null, { id: identifier } );
    // User.findOrCreate({ openId: identifier }, function(err, user) {
      // done(err, user);
    // });
  }
));

passport.use(new GoogleStrategy({
    returnURL: 'http://' + Server.host + '/auth/google/return',
    realm: 'http://' + Server.host + '/'
  },
  function(identifier, profile, done) {
  	//console.log(identifier);
  	//console.log(done);
  	//console.log('google', profile);
  	done(null, {id: identifier, email: profile.emails[0].value } );
    // User.findOrCreate({ openId: identifier }, function(err, user) {
      // done(err, user);
    // });
  }
));

// Accept the OpenID identifier and redirect the user to their OpenID
// provider for authentication.  When complete, the provider will redirect
// the user back to the application at:
//     /auth/openid/return
express.post('/auth/openid', passport.authenticate('openid'));
// The OpenID provider has redirected the user back to the application.
// Finish the authentication process by verifying the assertion.  If valid,
// the user will be logged in.  Otherwise, authentication has failed.
express.get('/auth/openid/return', 
  passport.authenticate('openid', { successRedirect: '/',
                                    failureRedirect: '/login.html' }));


express.get('/auth/google', passport.authenticate('google'));
express.get('/auth/google/return', 
  passport.authenticate('google', { successRedirect: '/',
                                    failureRedirect: '/login.html' }));
// -------------------------------------------------------------- PASSPORT 


express.use("/", expressm.static('./client'));
express.get('/log', function (req, res) {
	sendJSON(res, logMemory.buffer);		
});
express.get('/object/:uri', function (req, res) {
	var uri = req.params.uri;
	res.redirect('/object.html?uri=' + uri);
});
express.get('/object/:uri/json', function (req, res) {
	var uri = req.params.uri;
	getObjectSnapshot(uri, function(x) {
		sendJSON(res, x);		
	});
});

express.get('/state', function (req, res) {
	sendJSON(res, Server);
});
express.get('/map/czml', function (req, res) {
	//return known map data as czml list
});
express.get('/attention', function (req, res) {
	getTypeCounts(function(x) {
		sendJSON(res, x, false);
	});			
});
express.get('/save', function (req, res) {
	sendJSON(res, 'Saving');
	saveState(
		function() { nlog('State Saved'); } , 
	 	function(err) { nlog('State Save unccessful: ' + err) }
	);
});
express.get('/team/interestTime', function (req, res) {
	updateInterestTime();
	sendJSON(res, Server.interestTime);
});
express.post('/notice', function(request, response){

    //console.log(request.body.user.name);
    //console.log(request.body.user.email);

});
express.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


var channelListeners = {};

function broadcast(socket, message) {
	notice(message);

	if (message.type) {
		
		nlog(socket.clientID + ' broadcast: ' + JSON.stringify(message, null, 4));
		
		var targets = { };
		
		for (var t = 0; t < message.type.length; t++) {
			var chan = message.type[t];
			
			var cc = io.sockets.clients(chan);
			for (var cck in cc) {
				var i = cc[cck].id;
				if (i!=socket.id)
					targets[i] = '';
			}						
		}
		
		for (var t in targets) {
			io.sockets.socket(t).emit('notice', message);
		}
		
	}
}

function pub(message) {
	notice(message);

	nlog(JSON.stringify(message, null, 4));

	if (message.type) {
		//TODO gather list of clients to avoid sending duplicate messages to some clients
		for (var t = 0; t < message.type.length; t++) {
			var chan = message.type[t];
			//console.dir(io.sockets.in(chan));
			io.sockets.in(chan).emit('notice', message);	

		}
	}
}

  
sessionSockets.on('connection', function (err, socket, session) {
//io.sockets.on('connection', function(socket) {
	
	//https://github.com/LearnBoost/socket.io/wiki/Rooms
	socket.on('subscribe', function(channel) { 
		sub(socket, channel); 
	});
	socket.on('unsubscribe', function(channel) { 
		unsub(socket, channel); 
	});
	

    socket.on('pub', function(message) {
		broadcast(socket, message);
    });
    
    socket.on('connectSelf', function(cid) {
       var key = '', email = null;
   	   if (session)
   			if (session.passport)
   				if (session.passport.user) {
   					key = session.passport.user.id;
   					email = session.passport.user.email;
   				}
   					
       if (!cid) {
       	   cid = util.uuid();
       } 
       nlog('connect: ' + cid + ', ' + key);
       socket.set('clientID', cid);
       socket.emit('setClientID', cid, key);
       
       if (email) {
       		clients[cid].emailHash = util.MD5(email);
       }

       for (c in clients) {
           if (c == cid) continue;
           var s = clients[c];           
           socket.emit('setClient', c, s);
       }
       socket.emit('setServer', Server.name, Server.description);
       socket.emit('addTypes', types);
    });
    
    socket.on('updateSelf', function(s, getObjects) {
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
                updateInterests(c, s, socket, getObjects);
            }
        });
    });
    
    socket.on('getSentencized', function(urlOrText, withResult) {
    	cortexit.getSentencized(urlOrText, withResult);
    });
    
    socket.on('getObjects', function(query, withObjects) {
		var db = mongo.connect(databaseUrl, collections);
		db.obj.find(function(err, docs) {
			withObjects(docs);					
			db.close();
		});    
    });
    
});



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
	
	getObjectsByType(interest, function(objects) {
		socket.emit('notice', objects);		
	});
}
function interestRemoved(socket, interest) {
	unsub(socket, interest);
}

function updateInterests(clientID, state, socket, resubscribe) {	
	var prevState = Server.clientState[clientID];
	var now = Date.now();
	
		
	if (!prevState) {
		prevState = { interests: { }, when: new Date().getTime() };
		
	}
	
	
	var addends = { };

	for (k in state.interests) {
		var v = state.interests[k];
		
		if (prevState.interests==undefined)
			prevState.interests = { };
			
		var pv = prevState.interests[k];
		
		if (resubscribe) {
			if (socket)
				interestAdded(socket, k);				
		}
		if (pv==undefined) {
			pv = 0;
			if (socket)
				if (!resubscribe)
					interestAdded(socket, k);
		}
		
		else {
			var averageInterest = (v + pv)/2.0;
			if (Server.interestTime[k] == undefined)
				Server.interestTime[k] = 0;
			 addends[k] = (now - prevState.when)/1000.0 * averageInterest ;
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
			addends[k] = (now - prevState.when)/1000.0 * averageInterest ;
			
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

	
	state.when = now;
	Server.clientState[clientID] = state;
	
}

// process.on('uncaughtException', function (err) {
   // console.error('An uncaught error occurred!');
   // console.error(err.stack);
// });



var b = util.OutputBuffer(300, function(message) {
	message.type = util.getTypeArray(message.type);
	pub(message);
	
});
b.start();


setInterval(attention.update, Server.memoryUpdatePeriodMS);

nlog('Ready');