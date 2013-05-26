/*!
 * netention.js v1.1
 * Attentionated by @automenta and @rezn8d
 */
//Measurement types:
//<select class="ucw_selector" id="ucw_cs"><option value="Temperature">Temperature</option><option value="Length">Length</option><option value="Mass">Mass</option><option value="Speed">Speed</option><option value="Volume">Volume</option><option value="Area">Area</option><option value="Fuel consumption">Fuel consumption</option><option value="Time">Time</option><option value="Digital Storage">Digital Storage</option></select>


window.authenticated = getCookie('authenticated') !== 'false';
function isAuthenticated() {
    return window.authenticated;
}
            


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

var stack_bottomleft = {"dir1": "right", "dir2": "up", "push": "top"};

var Self;

function netention(f) {
        		
        window.clientID = getCookie('clientID');
                
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
                //this.socket.emit('connectSelf', this.get('clientID'));
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
            
            getIncidentTags : function(userid, oneOfTags) {
                
                return objIncidentTags(this.objects(), oneOfTags, userid);
                
            },
                    
            setObject : function(o) {
                var i = o.id;
                this.objects()[i] = o;
                return o;  
            },
            
            focus : function() { 
                return this.get('focus');
            },            
            
            
            myself: function() { 
                var o = this.getSelf(this.id()); 
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
                
                if (isAuthenticated()) {
                      $.pnotify({
                        title: 'Authorized',
                        text: that.myself().name
                     });
                }
                
                socket.on('setClientID', function (cid, key) {
                     that.set('authorized', key);
                     that.saveLocal();
                     $.pnotify({
                        title: 'Connected',
                        text: that.myself().name + ' (' + that.get('clientID').substring(0,4) + ')'
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
                                console.dir(err);
                                $.pnotify({
                                    title: 'Unable to delete: ' + err,
                                    text: id                        
                                });                           
                            }
                	});
                }
            	
            },
            
            getPlugins: function(withPlugins) {
                var that = this;
                this.socket.emit('getPlugins', function(p) {
                    that.unset('plugins');
                    that.set('plugins', p);
                    if (withPlugins)
                        withPlugins(p);
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
            
            pub: function(object, onErr, onSuccess) {
                this.socket.emit('pub', object, function(err) {
                    if (onErr)
                        onErr(object);
                    $.pnotify({title: 'Error saving:', text: err, type:'error'});
                }, onSuccess);
            },
            
            //THIS NEEDS UPDATED
            getClientInterests: function(f) {
            	this.socket.emit('getClientInterests', f);
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
        
        s.set('clientID', window.clientID === '' ? uuid() : window.clientID);
        
        s.connect();
        f(s);	    
		
	
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


//apparently is faster than $('<div/>');
function newDiv() {
    return $(document.createElement('div'));
}

function newPopup(title,p) {
    var d = newDiv();
    d.attr('title', title);
    
    $('body').append(d);
    d.dialog(p);
    return d;    
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}