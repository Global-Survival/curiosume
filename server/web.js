var memory = require('./memory.js');
var util = require('../client/util.js');
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
var mongo = require("mongojs");
var request = require('request');


exports.start = function(host, port, database, init) {

	console.log('Starting');
    
	var Server = { 
		name: 'Netention',
		description: 'http://netention.org',
		
		memoryUpdatePeriodMS: 5000,
        plugins: { },
        permissions: { },
	};

	Server.host = host;
	Server.port = port;
	Server.database = database;	


    var plugins = { };
    
	var that = { };
	
	var tags =  { };
    var properties = { };

	var attention = memory.Attention(0.95);
		
	var logMemory = util.createRingBuffer(256); 
	Server.interestTime = { };	//accumualted time per interest, indexed by tag URI
	Server.clientState = { };	//current state of all clients, indexed by their clientID DEPRECATED
	
	var file = new(nodestatic.Server)('./client');
	
	var databaseUrl = Server.database || process.env['MongoURL']; //"mydb"; // "username:password@example.com/mydb"
	var collections = [ "obj" ];
	
    function plugin(netention, v) {
        var p = require('../plugin/' + v).plugin;
        v = v.split('.js')[0];
        v = v.split('/netention')[0];
        if (p) {
    		if (p.name) {
                
                var enabled = false;
    
                plugins[v] = p;
                if (!Server.plugins[v]) {
                    Server.plugins[v] = {
                        valid: true,
                        enabled: false
                    };
                }
                
                Server.plugins[v].name = p.name;
                Server.plugins[v].description = p.description;
                
                //TODO add required plugins parameter to add others besides 'general'
                if ((Server.plugins[v].enabled) || (v == 'general')) {
                    p.start(netention);                
                    enabled = true;
                }
                
                if (enabled) {
            	    nlog('Started plugin: ' + p.name);                    
                }
                else {
        		    nlog('Loaded inactive plugin: ' + p.name);
                }
                
    			return;
    		}
    	}
        Server.plugins[v] = { };
        Server.plugins[v].name = v;
        Server.plugins[v].valid = false;
        
        
    	//TODO remove unused Server.plugins entries
    	
    	console.log('Loaded invalid plugin: ' + v);
    }
	 
	function loadState(f) {
		var db = mongo.connect(databaseUrl, collections);
		
		db.obj.find({ tag: { $in: [ 'ServerState' ] } }).limit(1).sort({when:-1}, function(err, objs) {
    		  db.close();

              if( err || !objs) nlog("No state found");
			  else objs.forEach( function(x) {
				  var now = Date.now();
				  nlog('Resuming from ' + (now - x.when)/1000.0 + ' seconds downtime');
				  Server.interestTime = x.interestTime;
				  Server.clientState = x.clientState;
                  
                  if (x.plugins) {
                      for (var pl in x.plugins) {
                          if (!Server.plugins[pl])
                            Server.plugins[pl] = { };
                          if (x.plugins[pl].enabled)
                            Server.plugins[pl].enabled = x.plugins[pl].enabled;    
                      }                  
                  }
                  
				  /* logMemory = util.createRingBuffer(256);
				  logMemory.buffer = x.logMemoryBuffer;
				  logMemory.pointer = x.logMemoryPointer;*/
				  
				  //nlog("State loaded");
				  //nlog(Server);
				  
			  } );
              
              if (f) 
                f();
                
		});
		
	
	}
	
	function deleteObject(objectID, whenFinished) {
		attention.remove(objectID);
		
		
		//TODO move to 'removed' db collection
		
		var db = mongo.connect(databaseUrl, collections);
		db.obj.remove({ uri: objectID }, function(err, docs) {
			db.close();
            if (err) {
                nlog('deleteObject: ' + err);
                if (whenFinished)
                    whenFinished(err);    
            }
            else {
            	nlog('deleted ' + objectID);
                if (whenFinished)
			        whenFinished();
            }
		});    
	}
    that.deleteObject = deleteObject;
			
	function notice(o, whenFinished) {
		if (!o.uri)
			return;
		
		if (o._id)
			delete o._id;
				
		attention.notice(o, 0.1);
		
		var db = mongo.connect(databaseUrl, collections);
		db.obj.update({ uri: o.uri }, o, {upsert: true}, function(err) {
			if (err) {
				nlog('notice: ' + err);
			}
			
			db.close();		
            
            if (whenFinished)
                whenFinished();
		});
	
	}
    that.notice = notice;
    
    
    function addProperties(ap) {
        for (var i = 0; i < ap.length; i++) {
    		properties[ap[i].uri] = ap[i];
    	}        
        
        //TODO broadcast change in properties?
    }
    that.addProperties = addProperties;
    
    function addTags(at, defaultTag) {
        for (var i = 0; i < at.length; i++) {
            if (defaultTag)
                at[i].tag = defaultTag;
                
    		tags[at[i].uri] = at[i];
    	}        
        
        //TODO broadcast change in tags?
    }
    that.addTags = addTags;
	
	function getObjectSnapshot(uri, whenFinished) {
		if (tags[uri]!=undefined) {
            //it's a tag
			whenFinished(tags[uri]);
		}
		else {
			var db = mongo.connect(databaseUrl, collections);
			db.obj.find({ 'uri': uri }, function(err, docs) {
    			db.close();
				if (err) {
                    nlog('getObjectSnapshot: ' + err);
					whenFinished(err);
				}
				else {
					whenFinished(docs);
				}
			});		
		}		
		
	}
	
	function getObjectsByTag(t, withObjects) {
		var db = mongo.connect(databaseUrl, collections);
		db.obj.find({ tag: { $in: [ t ] } }, function(err, docs) {
	
			db.close();
			
			if (!err) {						
				withObjects(docs);
			}		
            else {
                nlog('getObjectsByTag: ' + err);
            }
		});
		
	}
    that.getObjectsByTag = getObjectsByTag;
	
	function getTagCounts(whenFinished) {
		//this can probably be optimized very much
		
		var db = mongo.connect(databaseUrl, collections);
		db.obj.find(function(err, docs) {
			if (err) {
				nlog('getTagCounts: ' + err);
			}
			db.close();
			
			var totals = { };
			for (var k in docs) {
				var d = docs[k];
				if (d.tag) {					
					for (var i = 0; i < d.tag.length; i++) {
						var dtype = d.tag[i];
						if (totals[dtype])
							totals[dtype][0]++;
						else
							totals[dtype] = [ 1, 0];
						//totals[dtype][1] = attention.totals[dtype] || 0;
						totals[dtype][1] = Server.interestTime[dtype] || 0;
					}
				}
				
				if (d.uri) {
					var a = attention.values[d.uri];
					
					if (a) {
						totals[d.uri] = [ 0, a ];
						if (d.name)
							totals[d.uri].push(d.name);
					}
				}
				
			}
			
			whenFinished(totals);
		});
	}
	
	function saveState(onSaved, onError) {
		var t = Date.now()
		
		/*
		logMemoryBuffer = logMemory.buffer;
		logMemoryPointer = logMemory.pointer;*/
		
		delete Server._id;
		Server.tag = [ 'ServerState' ];
		Server.when = t;            
	

		var db = mongo.connect(databaseUrl, collections);
		
		db.obj.save(Server, function(err, saved) {
    		  db.close();
			  
			  if( err || !saved ) {
    		      if (onError) {        	           
    		        nlog('saveState: ' + err);
				    onError(err);
    		      }
			  }
			  else {
    		    if (onSaved)   			  
				  onSaved();
			  }
			  
		});
		
	}
	
	loadState(function() {
        loadPlugins();   
	});
	
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
			p = JSON.stringify(x,null,4);
		res.end( p );
	}
	
	http.globalAgent.maxSockets = 256;
	
	var httpServer = http.createServer(express);
	
	httpServer.listen(Server.port);
	
	nlog('Web server on port ' + Server.port);
	
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
	  passport.authenticate('openid', { successRedirect: '/#/',
	                                    failureRedirect: '/login.html' }));
	
	
	express.get('/auth/google', passport.authenticate('google'));
	express.get('/auth/google/return', 
	  passport.authenticate('google', { successRedirect: '/#/',
	                                    failureRedirect: '/login.html' }));
	// -------------------------------------------------------------- PASSPORT 
	
	
    express.all('*', function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    });
	express.use("/", expressm.static('./client'));
    
    express.post('/upload', function(req, res) {
        //TODO validate permission to upload
        
        /*console.log(JSON.stringify(req.files));
        console.log(req.files.uploadfile);
        console.log(req.files.uploadfile.name);*/

        var temp_path = req.files.uploadfile.path;
        var save_path = './upload/' + req.files.uploadfile.name + '_' + util.uuid();

        fs.rename(temp_path, save_path, function(error) {
            if (error) throw error;

            fs.unlink(temp_path, function() {
                if (error) throw error;
                //res.send("File uploaded to: <a href='" + save_path + "'>here</a>.");
                res.send(save_path);
            });

        });
    });
    
    express.get('/#', function(req,res) {
       res.sendfile('./client/index.html');
    });
    express.get('/http/:url', function (req, res) {
        if (Server.permissions['authenticate_to_proxy_http']!=false) {
        	if (!isAuthenticated(req.session)) {
	    		res.send('Authentication required');
	    	}
        }
        
    	var uri = decodeURIComponent(req.params.url);
        request(uri, function (error, response, body) {
            res.setHeader('Content-type', 'text/plain');
            if (!error)  {
                res.send(response.body);
            }
            else {
                res.send(error);
            }
        });    
    });
    
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
		getTagCounts(function(x) {
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
	
		if (message.tag) {
			
            if (socket)
			    nlog(socket.clientID + ' broadcast: ' + JSON.stringify(message, null, 4));
			
			var targets = { };
			
			for (var t = 0; t < message.tag.length; t++) {
				var chan = message.tag[t];
				
				var cc = io.sockets.clients(chan);
				for (var cck in cc) {
					var i = cc[cck].id;
                    if (socket)
    					if (i!=socket.id)
	    					targets[i] = '';
				}						
			}
			
			for (var t in targets) {
				io.sockets.socket(t).emit('notice', message);
			}
			
		}
        
        io.sockets.in('*').emit('notice', message);
        
        for (var p in plugins) {
            var pp = plugins[p];
            if (Server.plugins[p].enabled) {
                if (pp.notice) {
                    pp.notice(message);
                }
            }
        }
	}
    that.broadcast = broadcast;
    
	function pub(message) {
        broadcast(null, message);   
	}
    that.pub = pub;
    
	function isAuthenticated(session) {
	   if (session)
			if (session.passport)
				if (session.passport.user) {
					return true;
				}
	   	return false;
		
	} 
	
	sessionSockets.on('connection', function (err, socket, session) {
	//io.sockets.on('connection', function(socket) {
		
		//https://github.com/LearnBoost/socket.io/wiki/Rooms
		socket.on('subscribe', function(channel, sendAll) { 
			sub(socket, channel, sendAll); 
		});
		socket.on('unsubscribe', function(channel) { 
			unsub(socket, channel); 
		});
		
	
	    socket.on('pub', function(message) {
			broadcast(socket, message);
	    });
	    
        socket.on('getPlugins', function(f) {
            f(Server.plugins);
        });
        
        socket.on('setPlugin', function(pid, enabled, callback) {
            if (Server.permissions['authenticate_to_configure_plugins']!=false) {
                if (!isAuthenticated(session)) {
    	    		callback('Unable to configure plugins (not logged in)');
    	    		return;
    	    	}                
            }
            
            var pm = plugins[pid];
            if (pm) {
                if (!(Server.plugins[pid].valid == false)) {
                    var currentState = Server.plugins[pid].enabled;
                    if (currentState!=enabled) {
                        if (enabled) {
                            Server.plugins[pid].enabled = true;
                            pm.start(that);
                            nlog('Plugin ' +  pid + ' enabled');
                        }
                        else {
                            Server.plugins[pid].enabled = false;    
                            pm.stop(that);
                            nlog('Plugin ' +  pid + ' disabled');
                        }
                        saveState(function() {
                            //nlog('saved state');                            
                        }, function(err) {
                            nlog('error saving state on plugin activation');
                            nlog(err);
                        });
                        callback();
                        return;
                    }
                }
            }
            callback('Unable to set activity of plugin ' + pid + ' to ' + enabled);
            
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
	       
		   //share server information
	       socket.emit('setServer', Server.name, Server.description);
	       
	       //share tags
	       socket.emit('addTags', tags, properties);
	    });
	    
	    socket.on('updateSelf', function(s, getObjects) {
	        socket.get('clientID', function (err, c) {        	
	            if (c == null) {
	                socket.emit('reconnect');
	            }
	            else {
	            	socket.clientID = c;
	
					notice(s);
					
	                //broadcast client's self
	                socket.broadcast.emit('notice', s);
	                
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
	    
	    socket.on('delete', function(objectID, whenFinished) {
            if (Server.permissions['authenticate_to_delete_objects']!=false) {
    	    	if (!isAuthenticated(session)) {
    	    		whenFinished('Unable to delete (not logged in)');
    	    		return;
    	    	}
            }
	    		
	    	if (!util.isSelfObject(objectID))
	    		deleteObject(objectID, whenFinished);
            else {
                whenFinished('Unable to delete user profile');
            }
	    });
	    
	});
	
	
	
	function updateInterestTime() {
		//reprocess all clientState's to current time
		for (c in Server.clientState) {
			var cl = Server.clientState[c];
			updateInterests(c, cl);		
		}
	}
	
	function sub(socket, channel, sendExisting) {
		//nlog(socket.clientID + ' subscribed ' + channel );
		socket.join(channel);
		
		if (sendExisting) {
			getObjectsByTag(channel, function(objects) {
				socket.emit('notice', objects);		
			});		
		}
	}
	function unsub(socket, channel) {
		nlog(socket.clientID + ' unsubscribed ' + channel );
		socket.leave(channel);	
	}
	
	function interestAdded(socket, interest) {
		sub(socket, interest, true);	
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
	process.on('uncaughtException', function(err) {
        console.error(err.stack);
    });
	
	
	
	setInterval(attention.update, Server.memoryUpdatePeriodMS);
	
	nlog('Ready');
	
    function loadPlugins() {
    	fs.readdirSync("./plugin").forEach(function(file) {
    		if (file.indexOf('.js')==-1) {//avoid directories
    			file = file + '/netention.js';
    		}
    			
    		plugin(that, file);
    	});
    }
	
    that.permissions = Server.permissions;
    
    init(that);
	
	return that;
		
};

