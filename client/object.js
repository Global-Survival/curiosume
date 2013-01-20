function hasTag(o, t) {    
	if (!o.tag)
		return false;
        
	var ot = o.tag;

    //TODO use an underscore function instead of this loop
	for (var i = 0; i < ot.length; i++) {
		if (ot[i] == t)
			return true;
	}
	return false;
}

function getTagMatch(x,y) {
    var xt = x.tag;
    var yt = y.tag;

    if ((!xt) || (!yt))
		return 0;

    var match = 0;
    for (var i = 0; i < xt.length; i++) {
        if (_.indexOf(yt, xt[i])!=-1) {
            match++;
        }
    }
    return match;
    
}

function getProperties(t) {
    //TODO add 'extends' supertag inheritance
    if (t.properties)
        return t.properties;
    return [];
}

function newPopupObjectView(_x) {
    var x;
    if (typeof(_x) == "string") 
        x = window.self.getObject(_x);
    else
        x = _x;    
    
    if (!x) {
        console.log('Unknown object: ' + _x);
        return;
    }
    var d = $('<div></div>');
    d.attr('title', x.name);
    d.append(newObjectView(window.self, x, null, 1.0, 4));
    $('body').append(d);
    d.dialog();
}


function getAvatar(s) {
    var emailHash = getProperty(s, 'email', 'unknown@unknown.com');
    emailHash = MD5(emailHash);
	return $("<img>").attr("src","http://www.gravatar.com/avatar/" + emailHash + "&s=200");
}

function newTagButton(t) {
    var b = $('<a href="#">' + t.name + '</a>');
    return b;
}

function newReplyWidget(onReply, onCancel) {
    var w = $('<div></div>');
    w.addClass('ReplyWidget');
    
    var ta = $('<textarea/>');
    w.append(ta);
    
    var bw = $('<div style="text-align: right"></div>');
    w.append(bw);
    
    var c = $('<button>Cancel</button>');
    c.click(function() {
        var ok;
        if (ta.val() != "") {
            ok = confirm('Cancel this reply?');
        }
        else {
            ok = true;
        }
        
        if (ok)            
            onCancel();
    });
    bw.append(c);
    
    var b = $('<button>Reply</button>');
    b.click(function() {
        if (ta.val() != "") {
            onReply(ta.val());
        }
    });
    bw.append(b);
    
    return w;
}

function newObjectView(self, x, onRemoved, r, depthRemaining) {

    var mini = (depthRemaining == 0);
    
	var fs = (1.0 + r/2.0)*100.0 + '%';
	
	var d = $('<div class="objectView" style="font-size:' + fs + '">');
	var xn = x.name;
	var authorID = x.author;
	
	if (!isSelfObject(x.uri)) { //exclude Self- objects
		if (x.author) {
			var a = x.author;
			var as = self.getSelf(x.author);
			if (as)
				a = as.name;
			xn = a + ': ' + xn;
		}
	}

    var replies = $('<div></div>');    
    
    function refreshReplies() {
        var r = self.getReplies(x.uri);        
        if (r.length > 0) {
            replies.show();
            //TODO sort the replies by age, oldest first
            for (var i = 0; i < r.length; i++) {
                var p = r[i];
                replies.append(newObjectView(self, self.getObject(p), null, r*0.618, depthRemaining-1));
            }
        }
        else {
            replies.hide();
        }
    }

	var hb = $('<div>').addClass('ObjectViewHideButton');
    
    var favoriteButton = $('<button title="Favorite"><i class="icon-star"></i></button>');
    hb.append(favoriteButton);
    
    if (!mini) {
        var replyButton = $('<button title="Reply"><i class="icon-share"></i></button>');
        replyButton.click(function() {
            
            newReply.show();
            newReply.html('');
            newReply.append(newReplyWidget( 
                //on reply
                function(text) {
                    
                    newReply.hide();
                    
                    var rr = {
                        name: text,
                        uri: uuid(), 
                        tag: [ 'Message' ],
                        tagStrength: [1],
                        values: [],
                        replyTo: [ x.uri ],
                        when: Date.now()
                    };
                    
                    self.notice(rr);
                    
                    self.pub(rr);
                    
                    refreshReplies();
                },
                
                //on cancel
                function() {                
                    newReply.hide();
                }
            ));
            replyButton.enabled = false;
        });
        hb.append(replyButton);
        
        var focusButton = $('<button title="Focus"><i class="icon-zoom-in"></i></button>');
    	focusButton.click(function() {
            var oid = x.uri;
            Backbone.history.navigate('/object/' + oid + '/focus', {trigger: true});
    	});
    }
    
	var deleteButton = $('<button title="Delete"><i class="icon-remove"></i></button>');
	deleteButton.click(function() {
		if (confirm('Permanently delete? ' + x.uri)) {
			self.deleteObject(x);			
		}
	});
	hb.append(focusButton);
	hb.append(deleteButton);
	d.append(hb);
	
    (function() {
	    d.hover(function(){ hb.fadeIn(200);}, function() { hb.fadeOut(200);});	    
    })();
    hb.hide();

    
	var authorClient = self.getSelf(authorID);
	if (authorClient) {
		if (authorID) {
			var av = getAvatar(authorClient).attr('align', 'left');
			
			d.append(av);
			av.wrap('<div class="AvatarIcon"/>');
		}
	}
    

	if (x.name) {
        var axn = $('<a href="#">' + xn + '</a>');
        axn.click(function() {
           newPopupObjectView(x.uri); 
        });
        var haxn = $('<h1>');
        haxn.append(axn);
		d.append(haxn);
	}
	
    var mdline = $('<span></span>');
    mdline.addClass('MetadataLine');
    
	if (x.tag) {
        for (var i = 0; i < x.tag.length; i++) {
            var t = x.tag[i];            
            var tt = self.getTag(t);
            if (tt) {
                mdline.append(newTagButton(tt));
            }
            else {
                mdline.append('<a href="#">' + t + '</a>');
            }
            mdline.append('&nbsp;');
        }        
	}
    
	
        	
	if (x.geolocation) {
        var lat = _n(x.geolocation[0]);
        var lon = _n(x.geolocation[1]);
        if (self.myself().geolocation) {
    		var dist = '?';
    		if (self.myself().geolocation)
    			dist = geoDist(x.geolocation, self.myself().geolocation);
    		
    		mdline.append('&nbsp;<span>[' + lat + ',' + lon + '] ' + _n(dist) + ' km away</span>');
        }
        else {
        	mdline.append('&nbsp;<span>[' + lat + ',' + lon + ']</span>');        
        }
	}
    if (x.when) {
        var tt = $('<time class="timeago"/>');
        function ISODateString(d){
            function pad(n){return n<10 ? '0'+n : n}
            return d.getUTCFullYear()+'-'
              + pad(d.getUTCMonth()+1)+'-'
              + pad(d.getUTCDate())+'T'
              + pad(d.getUTCHours())+':'
              + pad(d.getUTCMinutes())+':'
              + pad(d.getUTCSeconds())+'Z'}
        
        tt.attr('datetime', ISODateString(new Date(x.when)));
        
        mdline.append(tt);
    }
    
    d.append(mdline);
    
	//d.append('<h3>Relevance:' + parseInt(r*100.0)   + '%</h3>');
	
	if (x.text) {
		d.append('<p>' + x.text + '</p>');
		
		if (hasTag(x, 'Media')) {
			var imgURL = x.text;
			if (imgURL.indexOf('http://')==0)
				d.append('<img src="'+imgURL+'"/>');
			//TODO handle videos, etc
		}
	}
	
    if (x.values) {
		var ud = $('<ul>');
		d.append(ud);
		for (var vi = 0; vi < x.values.length; vi++) {
			var vv = x.values[vi];
			ud.append('<li>' + vv.uri + ': ' + vv.value + '</li>');
		}
	}
    
    if (!mini) {

        replies.addClass('ObjectReply');
        replies.hide();
        d.append(replies);
    	
        var newReply = $('<div></div>');    
        newReply.addClass('ObjectReply objectView');
        newReply.hide();
        d.append(newReply);
    	
        refreshReplies();
    }
    
	return d;
}

function newPropertyEdit(p, v) {
    var propertyID = p.uri;
    
    var name = p.uri;
    if (v)
        name = v.name;
        
    var value = p.value;
		
	if (!p || !v) {
		return $('<div>Unknown property: ' + propertyID + '</div>');
	}
    
    var type = v.type;
		
	var x = $('<div>').addClass('FocusSection');
	x.append(name + ':&nbsp;');
	
	var removeButton = $('<button class="PropertyRemoveButton"><i class="icon-remove"></i></button>');
	removeButton.click(function() {
		x.remove();
	});
	(function() {
        x.hover(function(){ removeButton.fadeIn(200);}, function() { removeButton.fadeOut(200);});	    
    })();
    removeButton.hide();
    
	x.data('property', propertyID);
	
	if (type == 'textarea') {
		if (!value)
			value = '';
		
		x.append('<br/>');
		var t = $('<textarea rows="3">' + value + '</textarea>');
		x.append(t);
		x.data('value', function(target) {
			return t.val();			
		});
	}
	else if (type == 'boolean') {
		var t = $('<input type="checkbox">');
		
		if (!value)
			value = true;
		
		t.attr('checked', value ? 'on' : undefined);
		x.append(t);
		x.data('value', function(target) {
			return t.attr('checked') == 'checked' ? true : false;
		});
	}
	else /* if (type == 'text') */ {
		if (!value)
			value = '';

		var t = $('<input type="text" value="' + value + '">');
		x.append(t);		
		x.data('value', function(target) {
			return t.val();			
		});
	}
	
    x.append(removeButton);
	
	return x;
}

function withObject(uri, success, failure) {
	$.getJSON('/object/' + uri + '/json', function(s) {
		
		if (s.length == 0) {
			if (failure)
				failure();
		}
		else {
			if (success) {				
				success(s);
			}
		}
	});
}

