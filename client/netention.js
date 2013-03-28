//Measurement types:
//<select class="ucw_selector" id="ucw_cs"><option value="Temperature">Temperature</option><option value="Length">Length</option><option value="Mass">Mass</option><option value="Speed">Speed</option><option value="Volume">Volume</option><option value="Area">Area</option><option value="Fuel consumption">Fuel consumption</option><option value="Time">Time</option><option value="Digital Storage">Digital Storage</option></select>


function loadCSS(url, med) {
    $(document.head).append(
        $("<link/>")
        .attr({
          rel:  "stylesheet",
          type: "text/css",
          href: url,
    	  media: (med !== undefined)? med : ""
        })
    );                
}

function loadJS(url) {
    $(document.head).append(
        $("<script/>")
        .attr({
          type: "text/javascript",
          src: url
        })
    );                
}

function later(f) {
    setTimeout(f, 0);
}


function loadScripts(f) {
    loadCSS('http://code.jquery.com/ui/1.8.23/themes/base/jquery-ui.css');
    loadCSS('http://static.jquery.com/ui/css/demo-docs-theme/ui.theme.css');

	//loadCSS('http://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min.css');
	    
	loadCSS('http://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/2.2.2/css/bootstrap.min.css');    
            
    loadCSS('/lib/pnotify/jquery.pnotify.default.css');
    
    //loadCSS('/lib/wysihtml5/bootstrap-wysihtml5.css');
    
    loadCSS('/lib/dynatree/skin/ui.dynatree.css');

    loadCSS('/map.css');
    loadCSS('/object.css');
    
    loadCSS('/index.css', 'only screen and (min-device-width: 641px)');
 
    //https://github.com/rgrove/lazyload/
	$.getScript('/lib/lazyload.js', function() {
		
	var scripts = [     "/socket.io/socket.io.js", 
//		                'http://maps.google.com/maps?file=api&amp;v=2&amp;key=ABQIAAAAjpkAC9ePGem0lIq5XcMiuhR_wWLPFku8Ix9i2SXYRVK3e45q1BQUd_beF8dtzKET_EteAjPdGDwqpQ',
		                
                        "http://openlayers.org/dev/OpenLayers.js",
                        
                        //NEEDED FOR CHRONOZOOM:
		                "http://code.jquery.com/ui/jquery-ui-git.js",
                        
		                "/lib/jQuery-URL-Parser/purl.js",
                        'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min.js',
                        'http://cdnjs.cloudflare.com/ajax/libs/underscore.string/2.3.0/underscore.string.min.js',
                        
                        "http://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/2.3.1/js/bootstrap.min.js",
                        'http://cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.10/backbone-min.js',

                        '/lib/pnotify/jquery.pnotify.min.js',
                        
                        //"http://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min.js",

		                "/util.js", "/map.js", "/object.js", '/icons.js', '/ontosearch.js', '/example_object.js',
                        
                        //"/lib/wysihtml5/wysihtml5-0.4.0pre.min.js",

                        //"/lib/wysihtml5/bootstrap-wysihtml5.js",
                        
                        '/lib/timeago/timeago.js',
                        '/lib/jquery-form/jquery.form.js',
                        
                        "/lib/dynatree/jquery.dynatree.min.js",

                        '/view.map.js',
                        //'/view.map.cesium.js',
                        
                        '/view.grid.js',
                        '/view.list.js',
                        '/view.trends.js',
                        '/view.slides.js',
                        '/view.graph.js',
                        
		                ];
		
		LazyLoad.js(scripts, f);
	});

    
 
}

var stack_bottomleft = {"dir1": "right", "dir2": "up", "push": "top"};


var Self;

function netention(f) {
		
	console.log('Loading scripts...');
	
	loadScripts(function(data, textStatus) {
        		
        Self = Backbone.Model.extend({
            
            defaults: {
                tags: { },
                properties: { },
                attention: { },
                deleted: { },
                replies: { }, //reply index
                focus: null
            },
            
            clear : function() {
                this.set('tags', { });
                this.set('properties', { });    
                this.set('attention', { });    
                this.set('deleted', { });    
                this.set('replies', { });
                this.set('focus', null);    
                this.socket.emit('connectSelf', this.get('clientID'));
            },
            
            id : function() { return this.get('clientID'); },

            tag : function(t) { return this.tags()[t]; },            
            tags : function() { return this.get('tags'); },
            
            tagRoots: function() {
                var that = this;
                //this might be suboptimal
                return _.select( _.keys(this.tags()), function(tt) {
                    var t = that.tag(tt);
                    if (!t.tag)
                        return true;
                    else return (t.tag.length == 0);                    
                });
            },
            
            subtags : function(s) {
                //this might be suboptimal, use an index
                var that = this;
                return _.select( _.keys(this.tags()), function(tt) {
                    var t = that.tags()[tt];
                    if (!t.tag)
                        return false;
                    else { 
                        return (_.contains(t.tag, s));
                    }
                });                
            },
            
            isProperty : function(p) { return this.properties()[p]!=undefined; },
            
            properties : function() { return this.get('properties'); },
            //property(p)
            
            objects : function() { return this.get('attention'); },
            
            objectURIsWithTag : function(t) {
                //TODO support subtags
                var r = [];
                for (var k in this.objects()) {
                    var v = this.objects()[k];
                    if (objHasTag(v, t))
                        r.push(k);
                }
                return r;
            },
            
            getObject : function(id) { return this.objects()[id]; }, //deprecated
            object : function(id) { return this.objects()[id]; }, 
            
            
            //self
            getSelf : function(clientID) { return this.objects()['Self-' + clientID]; }, 
            
            //->tag
            getTag : function(t) { return this.tags()[t]; },
            getProperty : function(p) { return this.properties()[p]; },
            
            setObject : function(o) {
                var i = o.uri;
                this.objects()[i] = o;
                return o;  
            },
            
            focus : function() { 
                return this.get('focus');
            },            
            
            myself: function() { 
                var o = this.getSelf(this.id()); 
                var dl = [0.0];
                if (!o) {
                    o = objNew('Self-' + this.id(), 'Anonymous');
                    objAddTag(o, 'Human');
                    objAddTag(o, 'User');
                    
                    this.setObject(o);
                }
                return o;
            },
            
            connect: function() {
                var socket = io.connect('/', {
                    transports: [ 'websocket', 'htmlfile', 'xhr-multipart', 'xhr-polling', 'jsonp-polling' ],
                    reconnect: true,
                    'try multiple transports': true                    
                });
                    
                var that = this;

                function init() {
                    socket.emit('connectSelf', that.get('clientID'));
                    socket.emit('subscribe', 'User', true);                    
                }
                
                socket.on('reconnect', function() {
                     /*$.pnotify({
                        title: 'Reconnected'
                     }); */
                     init();
                });                
                
                socket.on('setClientID', function (cid, key) {
                     that.set('clientID', cid);
                     that.set('authorized', key);
                     that.saveLocal();
                     $.pnotify({
                        title: 'Connected',
                        text: cid + '@' + (key ? key : '?') + ', ' + that.myself().name
                     });
                });
                
                /*socket.on('reconnect', function () {
                     //that.connectSelf();
                });*/
                
                socket.on('notice', function(n) {
                    that.notice(n);   
                });
            	socket.on('addTags', function(t, p) {
                    that.addProperties(p);
                    that.addTags(t);                                  
            	});
                
                
                init();
                
                this.socket = socket;
                
                return socket;    
            },
            
            loadLocal: function() {
                if (localStorage.self) {
                    this.set(JSON.parse(localStorage.self));                            
            	    console.log('Self loaded');
                    /*$.pnotify({
                        title: 'Loaded.',
                        text: JSON.stringify(this.myself(), null, 4)
                    });*/
                }
            },
            
            saveLocal: function() {
                localStorage.self = JSON.stringify(this.attributes);
            },

            addProperty : function(p) {
                this.properties()[p.uri] = p;
            },
            
            addTag: function(t) {
                var ty = this.tags();
                var p = this.properties();
                
                var tt = t;
                var xx = t.properties;
                /*if (ty[t.uri]!=undefined) {
                    tt = _.extend(ty[t.uri], t);
                }*/
                ty[t.uri] = tt;
	
	            if (xx) {
                    var propertyIDs = xx;
                    if (!_.isArray(xx)) {
                        //hash-array mode
                        propertyIDs = [];
                        for (var tp in xx) {
                            var c = ty[t.uri].properties[tp];
    			            p[tp] = c;
                            propertyIDs.push(tp);
    		            }
                    }
                    
                    t.properties = propertyIDs;
	            }
            },
            
            geolocate : function(ex) {
                this.myself().geolocation = ex;
                $.pnotify({
                    title: 'Geolocated.',
                    text: this.myself().geolocation
                });              
                
                this.saveLocal();
                this.pub(this.myself());
    
            },
            
            addProperties : function(ap) {
                for (var k in ap) {
                	this.addProperty(ap[k]);
            	}                
            },
            
            addTags: function(at) {

                for (var k in at) {
            		this.addTag(at[k]);
            	}
                this.trigger('change:tags');
                
            },
            
            deleteObject: function(x, localOnly) {
                
                var id = x.id;
            	
                /*
            	if (isSelfObject(id)) {
            		alert('Can not delete user profiles');
            		return;
            	}
                */
            	
                this.get('deleted')[id] = Date.now();
            	delete (this.objects())[id];	
            	
                //remove from replies
                for (var k in this.get('replies')) {
                    this.get('replies')[k] = _.without(this.get('replies')[k], id);
                }
                //remove its replies
                var replies = this.get('replies')[id];
                if (replies)
                    for (var k = 0; k < replies.length; k++)
                        this.deleteObject(k, true);
                
                if (!localOnly) {
                    var that = this;
                	this.socket.emit('delete', id, function(err) {
                        if (!err) {
                    		that.saveLocal();
                    		
                            that.trigger('change:deleted');
                            that.trigger('change:attention');
                            
                            $.pnotify({
                                title: 'Deleted',
                                text: id,                        
                                addclass: "stack-bottomleft",
                                stack: stack_bottomleft
                            });   
                        }
                        else {
                            $.pnotify({
                                title: 'Unable to delete: ' + err,
                                text: id                        
                            });                           
                        }
                	});
                }
            	
            },
            
            getPlugins: function() {
                var that = this;
                this.socket.emit('getPlugins', function(p) {
                    that.unset('plugins');
                    that.set('plugins', p);
            	});            
            },
            
            setPlugin: function(pid, enabled, callback) {
                this.socket.emit('setPlugin', pid, enabled, callback);                    
            },
            
            getLatestObjects : function(num, onFinished) {
                var that = this;
                $.getJSON('/object/latest/' + num + '/json', function(objs) {
                	for (var k = 0; k < objs.length; k++) {
            			var x = objs[k];
            			that.notice(x);
            		}
            		onFinished();                    
                });  
            },
            
            getObjects: function(query, onObject, onFinished) {
                var that = this;
            	this.socket.emit('getObjects', query, function(objs) {
            		for (var k in objs) {
            			var x = objs[k];
            			that.notice(x);
            			if (onObject!=null)
            				onObject(x);
            		}
            		onFinished();
            	});
            },
            
            getReplies : function (uri) {
                return  this.get('replies')[uri] || [];
            },
            
            listenAll : function(b) {
                if (b) {
                    this.subscribe('*', function(f) {
                        this.notice(f);
                    });
                }
                else {
                    this.unsubscribe('*');
                }    
            },
            
            notice: function(x) {
                
            	if (!Array.isArray(x)) {
            		this.notice([x]);
            	}
                
                var attention = this.objects();
                var replies = this.get('replies');
                
                var that = this;
                
            	function n(y) {
            		if (!y)
            			return;
            		
                    if (y.removed) {
                        that.deleteObject(y, true);
                        return;
                    }
            		
                    if (y.replyTo) {
                        var p = replies[y.replyTo];
                        if (p) {
                            if (!_.contains(p, y.id))
                                p.push(y.id);
                        }
                        else {
                            replies[y.replyTo] = [ y.id ];
                        }
                    }
                    
            		if (y.id) {
            			attention[y.id] = y;
            		}
            		
                    function objTagObjectToTag(x) {
                        var p = { };
                        _.each( objValues(x, 'tagValueType'), function(v) {
                            var vv = v.split(':');
                            p[vv[0]] = { name: vv[0], type: vv[1] };
                        });
                        
                        return {
                            uri: x.name,
                            name: x.name,
                            description: objDescription(x),
                            properties: p
                        };
                    }
                    
                    if (objHasTag(y, 'Tag')) {
                        that.addTags( [ objTagObjectToTag(y) ] );
                    }
            	}
            	
                
            	for (var i = 0; i < x.length; i++)
            		n(x[i]);
                    
                this.set('attention', attention);
            	this.trigger('change:attention');
            },
            
            subscribe: function(channel, f) {
            	this.socket.emit('subscribe', channel);
            	this.socket.on('receive-'+ channel, f);	
            },
            
            unsubscribe: function(channel) {
            	this.socket.emit('unsubscribe', channel);
            	//socket.off ??
            },
            
            pub: function(message) {
                this.socket.emit('pub', message);
            },
            
            //THIS NEEDS UPDATED
            getClientInterests: function(f) {
            	this.socket.emit('getClientInterests', f);
            },
            
            isAuthorized: function() {
            	if (this.get('authorized')) {
            		if (this.get('authorized').length > 0) {
            			return true;
            		}
            	}	
            	return false;
            },
            
            getTagCount : function(onlySelf) {
                                
                var tagCount = { };
                var aa = this.get('attention');                
                var myID = this.id();
                
                for (var ai in aa) {
                    var oi = aa[ai];
                    
                    if (onlySelf)
                        if (oi.author!=myID)
                            continue;
                    
                    //var t = objTags(oi);
                    var ts = objTagStrength(oi);
                    for (var i in ts) {
                        if (!tagCount[i])
                            tagCount[i] = 0;
                        tagCount[i] = tagCount[i] + ts[i]; //TODO add the normalized tag strength
                    }
                }
                return tagCount;
            },
            
            getServerAttention : function(withResults) {
                $.getJSON('/attention', function(attention) {
                    withResults(attention);
                }); 
            }

            
        });
        

		console.log('Scripts loaded');
		
        var s = new Self();
        s.loadLocal();
        s.connect();
                        
        f(s);	    
		
	});
	
}


/*

function showHelp() {
    $('#help').html('<center>Loading...</center>');
    $("#help").dialog({
    		height: 650,
            width: '90%',
            zIndex: 5000,
            title: 'Help',
			modal: true
	});
    $('#help').load('help.html');
}
    
   

function removeMapLayers() {
    for (i = 0; i < layers.length; i++) {
        theMap.removeLayer(layers[i]);
    }
    layers = [];
}            

function addMapLayer(l) {
    layers.push(l);
    theMap.addLayer(l);
}

var heatmapOpacity = 0;
function updateHeatmapOpacity(o) { 
    heatmapOpacity = o;
    if (o == 0) {
        $('#mapHeat').hide();
}
else {
    $('#mapHeat').show();                    
}
$('#mapHeat').css('opacity', o/100.0); 
}

function updateHeatmapDetail(d) {
heatMapDetailLevel = d;
update();
}
var layers = [];

*/

/*
function applyTemplate(template, params, target) {
    $( template ).tmpl( params).appendTo( target );                          
}

function templatize(template, params) {
    return $( template ).tmpl( params);
}

function addMenu(afterLoaded) {                
    var hw = $('<div/>');
	hw.load('/menu.html', afterLoaded);
	$('body').prepend(hw);            	
}
*/
