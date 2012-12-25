
function loadCSS(url) {
    $(document.head).append(
        $("<link/>")
        .attr({
          rel:  "stylesheet",
          type: "text/css",
          href: url
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




function loadScripts(f) {
	//https://github.com/rgrove/lazyload/
	$.getScript('/lib/lazyload.js', function() {
		
	var scripts = [     "/socket.io/socket.io.js", 
//		                'http://maps.google.com/maps?file=api&amp;v=2&amp;key=ABQIAAAAjpkAC9ePGem0lIq5XcMiuhR_wWLPFku8Ix9i2SXYRVK3e45q1BQUd_beF8dtzKET_EteAjPdGDwqpQ',
		                "http://www.openlayers.org/api/OpenLayers.js",
		                //"http://code.jquery.com/ui/jquery-ui-git.js",
//		                "/lib/jquery-tmpl/jquery.tmpl.js",
		                "/lib/jstorage/jstorage.js",
		                "/lib/jQuery-URL-Parser/purl.js",
                        'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.3/underscore-min.js',
                        'http://cdnjs.cloudflare.com/ajax/libs/underscore.string/2.3.0/underscore.string.min.js',
                        
                        "http://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/2.2.2/bootstrap.min.js",
                        'http://cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.2/backbone-min.js',
                        
//		                "http://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min.js",
//		                "/lib/superfish/js/hoverIntent.js"
//		                "/lib/superfish/js/superfish.js",
//		                "/lib/superfish/js/supersubs.js",
		                "/util.js"
/*		                "/self.js",
		                "/object.js",
		                "/team.js",
		                "/sensor.js",
		                "/time.js",
		                "/map.js",
		                "/map.heatmap.js",
		                "/environment.js",
		                "/cortexit.js"	                */
		                ];
		
		LazyLoad.js(scripts, f);
	});
	
	//loadCSS('http://code.jquery.com/ui/1.8.23/themes/base/jquery-ui.css');
    //loadCSS('http://static.jquery.com/ui/css/demo-docs-theme/ui.theme.css');

	//loadCSS('http://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min.css');
	
	//loadCSS('/lib/superfish/css/superfish.css');
	/*loadCSS('/lib/superfish/css/superfish-navbar.css');
	loadCSS('/lib/superfish/css/superfish-vertical.css');*/
	
    loadCSS('http://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/2.2.2/css/bootstrap.min.css');
    
    
	/*loadCSS('/gss.css');
	loadCSS('/gss.fixed.css');
	loadCSS('/team.css');
	loadCSS('/environment.css');
	loadCSS('/cortexit.css');
	loadCSS('/object.css');*/
}


var Self;

function netention(f) {
		
	console.log('Loading scripts...');
	
	loadScripts(function(data, textStatus) {
		
        Self = Backbone.Model.extend({
            defaults: {
                types: { },
                properties: { },
                attention: { },
                focus: null,
                
                //public data object
                myself: {
                    uri: 'Self-' + uuid(),
        	        name: 'Anonymous',
    		        type: [ 'general.Human', 'general.User' ],
    		        typeStrength: [ 1.0, 1.0 ]                    
                }
            },
            
            myself: function() { return this.get('myself'); },
            
            connect: function() {
                var socket = io.connect('/');
                    
                var that = this;
                
                socket.on('setClientID', function (cid, key) {
                     that.set('clientID', cid);
                     that.set('auth', key);
                });
                
                /*socket.on('reconnect', function () {
                     //that.connectSelf();
                });*/
                
                socket.on('notice', function(n) {
                    that.notice(n);   
                });
            	socket.on('addTypes', function(t) {
                    that.addTypes(t);
            	});
                
                socket.emit('connectSelf', this.get('clientID'));
                socket.emit('subscribe', 'general.User', true);    
                
                this.socket = socket;
                
                return socket;    
            },
            
            loadLocal: function() {
                this.localStore = $.jStorage;		 	
                	
                    /*
                attention = Self.get("attention");
                if (attention == null)
                	attention = { };
                	
                types = Self.get("types");
                if (types == null)
                	types = { };    	*/
            
            	console.log('Self loaded');
            },
            
            saveLocal: function() {
                this.localStore.set("self", this.attributes);
                //this.localStore.set('types', this.types);
                //this.localStore.set('self', getSelf());
            },
            
            addType: function(t) {
                var ty = this.get('types');
                var p = this.get('properties');
                
                
                ty[t.uri] = t;
	
	            if (t.properties) {
		            for (var p in ty[t.uri].properties) {
			            p[p] = ty[t.uri].properties[p];
		            }
	            }
                
                //this.set('types', t);
                //this.set('properties', p);
            },
            
            addTypes: function(at) {
                //console.log('Adding types: ', at);
                                
                for (var k in at) {
            		this.addType(at[k]);
            	}
                
                /*
            	saveSelf();
            	updateTypes();
                */
            },
            
            getObjects: function(query, onObject, onFinished) {
            	this.socket.emit('getObjects', query, function(objs) {
            		for (k in objs) {
            			var x = objs[k];
            			this.notice(x);
            			if (onObject!=null)
            				onObject(x);
            		}
            		onFinished();
            	});
            },
            
            notice: function(x) {
                /*
            	if (!Array.isArray(x)) {
            		this.notice([x]);
            	}
            
            	function n(y) {
            		if (!y)
            			return;
            		
            		if (y.type) {
            			//y.type = getTypeArray(y.type);
                        
            			for (var ti = 0; ti < y.type.length; ti++) {
            				var t = types[y.type[ti]];
            				if (!t) {
            					//add tag for type if not excists
            					
            					types[y.type] = { uri: y.type, name: y.type };
            				}
            			}
            		}   
            		
            		if (y.uri) {
            			attention[y.uri] = y;
            		}
            		
            	}
            	
            	for (var i = 0; i < x.length; i++)
            		n(x[i]);
            	*/
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
            
            getClientInterests: function(f) {
            	this.socket.emit('getClientInterests', f);
            },
            
            isAuthorized: function() {
            	if (Self.get('auth')) {
            		if (Self.get('auth').length > 0) {
            			return true;
            		}
            	}	
            	return false;
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
