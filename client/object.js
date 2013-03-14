
//t is either a tag ID, or an object with zero or more tags
function getTagIcon(t) {
    
    if (t.id) {
        //try all the tags, return the first
        if (t.value) {
            for (var x = 0; x < t.value.length; x++) {
                var r = getTagIcon(t.value[x].id);
                if (r)
                    return r;
            }
        }
        return null;
    }
    else {
        return ti[t];
    }
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
    d.append(renderObjectSummary(window.self, x, null, 1.0, 4));
    $('body').append(d);
    d.dialog();
}


function getAvatar(s) {
    var emailHash = objFirstValue(s, 'email', 'unknown@unknown.com');
    emailHash = MD5(emailHash);
	return $("<img>").attr("src","http://www.gravatar.com/avatar/" + emailHash + "&s=200");
}

function newTagButton(t) {
    var ti = getTagIcon(t.uri);
    var i = '';
    if (ti!=null)
        i = '<img src="' + ti + '"/>';

    var b = $('<a href="/property/' + t.id + '">' + (i) + t.name + '</a>');
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


function renderObject(x, editable, whenSaved, onAdd, onRemove) {
    var d = $('<div/>');
    
    if (editable) {
        var nameInput = $('<input/>').attr('type', 'text').attr('x-webkit-speech', 'x-webkit-speech').addClass('nameInput');
        nameInput.val(objName(x));
        d.append(nameInput);
        
        whenSaved.push(function(y) {
           objName(y, nameInput.val());
        });
    }
    else {
        d.append('<h1>' + objName(x) + '</h1>');
    }
    d.append($('<span>' + x.id + '</span>').addClass('idLabel'));

    if (editable) {
        d.append('<div id="MatchedTypes"/>');
    }

    if (x.value) {
        for (var i = 0; i < x.value.length; i++) {
            var t = x.value[i];
            var tt = renderTagSection(x, i, t, editable, whenSaved, onAdd, onRemove);
            d.append(tt); 
        }
    }
    return d;                
}


function renderTagSection(x, index, t, editable, whenSaved, onAdd, onRemove) {
    var tag = t.id;
    var strength = t.strength;
    
    var d = $('<div/>').addClass('tagSection');
    
    var tagLabel = $('<div>' + tag + '</div>').addClass('tagLabel');                
    d.append(tagLabel);

    if (!strength) strength = 1.0;
        
    if (editable) {
        var tagButtons = $('<div/>').addClass('tagButton');
        if (strength > 0.25) {
            var weakenButton = $('<a href="#">-</a>');
            tagButtons.append(weakenButton);
        }
        if (strength < 1.0) {
            var strengthButton = $('<a href="#">+</a>');
            tagButtons.append(strengthButton);
        }
        var removeButton = $('<a href="#">X</a>');
        removeButton.click(function() {
           if (confirm("Remove " + tag + "?"))
                onRemove(index);
        });
        tagButtons.append(removeButton);
        d.append(tagButtons);
    }
    
    
    //-----------------
    d.append('<br/>');
    
    var type;
    if (isPrimitive(tag)) {
        tagLabel.hide();    
        type = tag;
    }
    else if (window.self.properties()[tag]!=undefined) {
        var prop = window.self.properties()[tag];
        type = prop.type;
        tagLabel.html( prop.name );
    }
    
    
    
    if (type == 'textarea') {        
        
        if (editable) {
            var dd = $('<textarea/>').addClass('tagDescription');
            if (t.value)
                dd.val(t.value);
            d.append(dd);
            
            whenSaved.push(function(y) {
               objAddValue(y, tag, dd.val());
            });
        }
        else {
            var dd = $('<div/>');
            if (t.value)
                dd.html(t.value);
            d.append(dd);
        }
    }
    else if (type == 'cortexit') {
        //...
    }
    else if ((type == 'text') || (type == 'url') || (type=='integer') || (type=='real')) {
        
        if (editable) {
            var dd = $('<input type="text"/>').addClass('tagDescription');
            if (t.value)
                dd.val(t.value);
            d.append(dd);
            
            whenSaved.push(function(y) {
                if ((type == 'text') || (type=='url'))
                    objAddValue(y, tag, dd.val());
                else if (type == 'real')
                    objAddValue(y, tag, parseFloat(dd.val()));
                else if (type == 'integer')
                    objAddValue(y, tag, parseInt(dd.val()));
            });

        }
        else {
            var dd = $('<div/>');
            if (t.value)
                dd.html(t.value);
            d.append(dd);
        }
        
    }
    else if (type == 'boolean') {
		var t = $('<input type="checkbox">');
		
        var value = t.value;
		if (!value)
			value = true;
		
		t.attr('checked', value ? 'on' : undefined);
		d.append(t);
		/*x.data('value', function(target) {
			return t.attr('checked') == 'checked' ? true : false;
		});*/
	}    
    else if (type == 'spacepoint') {
        var ee = $('<div/>');
        
        var dd = $('<div/>');
        var de = uuid();
        dd.attr('id', de);
        dd = dd.addClass('focusMap');

        ee.append(dd);
        
        if (editable) {
            var lr = $('<input type="text" placeholder="Where" />');                    
            lr.css('width', 'auto');
            ee.append(lr);
            
            var cr = $('<select/>');
            cr.css('width', 'auto');
            cr.append('<option value="earth" selected>Earth</option>');
            cr.append('<option value="moon">Moon</option>');
            cr.append('<option value="mars">Mars</option>');
            cr.append('<option value="venus">Venus</option>');
            cr.change(function() {
                alert('Currently only Earth is supported.');
                cr.val('earth');
            });
            ee.append(cr);
            
            var ar = $('<input type="text" placeholder="Altitude" />');
            ar.css('width', '15%');
            ee.append(ar);
            
            whenSaved.push(function(y) {
               objAddValue(y, tag, '');
            });

        }
        
        d.append(ee);
        
        
        later(function() {
            var lat = t.value.lat || 0;
            var lon = t.value.lon || 0;
            var m = initLocationChooserMap(de, [lat,lon]);
            
        });
    }
    else if (type == 'timepoint') {
        if (editable) {
            var lr = $('<input type="text" placeholder="Time" />');
            lr.val(new Date(t.at));
            d.append(lr);
            var lb = $('<button style="margin-top: -0.5em"><i class="icon-calendar"/></button>');
            
            d.append(lb);
        }
        else {
            d.append(new Date(t.at));
        }                    
    }
    else if (type == 'timerange') {
        if (editable) {
            var lr = $('<input type="text" placeholder="Time Start" />');
            lr.val(new Date(t.startsAt));
            d.append('Start: ');
            d.append(lr);
            d.append('<br/>');
            var ls = $('<input type="text" placeholder="Time End" />');
            ls.val(new Date(t.endsAt));
            d.append('Stop: ');
            d.append(ls);
        }
        else {
            d.append(new Date(t.startsAt) + ' ' + new Date(t.endsAt));
        }
        
    }
    else if (type == 'fileattachment') {
        d.append(
        '<div id="FocusUploadSection">' +
            '<form id="FocusUploadForm" action="/upload" method="post" enctype="multipart/form-data">' +
                '<p>File: <input type="file" name="uploadfile" /> </p>' +
                '<p><input type="submit" value="Upload" /></p>' +
            '</form>' +
            '<div class="FocusUploadProgress">' +
                '<div class="FocusUploadBar"></div>' +
                '<div class="FocusUploadPercent">0%</div>' +
            '</div>' +
            '<div id="FocusUploadStatus"></div>' +
        '</div>');                    
        
        if (editable) {
            whenSaved.push(function(y) {
               objAddValue(y, tag, '');
            });            
        }
    }
    else if (type == 'EmotionSelect') {
        var es = $('<img style="width: 100%" src="http://upload.wikimedia.org/wikipedia/commons/c/ce/Plutchik-wheel.svg"/>');
        es.click(function() {
           alert('Emotion select not functional yet.');
        });
        d.append(es);
    }
    else if (type == 'HumanBodySelect') {
        var es = $('<img style="width: 100%" src="http://upload.wikimedia.org/wikipedia/commons/6/68/Human_body_features.png"/>');
        es.click(function() {
           alert('Human body part select not functional yet.');
        });
        d.append(es);
    }
    else if (tag) {        
        var TAG = window.self.tags()[tag];
        if (!TAG) {
            d.append('Unknown tag: ' + tag);            
        }
        else {
            var ti = getTagIcon(tag);
            if (window.self.tags()[tag]!=undefined) {
                tagLabel.html( TAG.name );        
            }
            if (ti) {
                tagLabel.prepend('<img src="' + ti + '"/>');
            }
            if (editable) {
                whenSaved.push(function(y) {
                   objAddTag(y, tag);
                });
                /*var pb = $('<button>...</button>');
                tagLabel.append(pb);*/
                
                function getTagProperties(t) {
                    var TT = window.self.tags()[t];
                    if (!TT) return [];
                    if (!TT.properties) return [];
                    return TT.properties;
                }
                
                var pd = $('<ul/>');
                var pp = getTagProperties(tag);
                for (var i = 0; i < pp.length; i++) {
                    (function() {
                        var ppv = pp[i];
                        var PP = window.self.getProperty(ppv);
                        var appv = $('<a href="#" title="' + PP.type +'">' + PP.name + '</a>');
                        var defaultValue = '';
                        appv.click(function() {
                            onAdd(ppv, defaultValue);
                        });
                        pd.append('+');
                        pd.append(appv);
                        pd.append('&nbsp;');
                    })();
                }
                
                d.append(pd);
            }
    
            /*
            if (t.value) {
                for (var v = 0; v < t.value.length; v++) {
                    var vv = t.value[v];
                    var pv = window.self.getProperty(vv.id);
                    //var pe = newPropertyEdit(vv, pv);
                    var pe = renderTagSection(t, v, vv, editable);
                    //this.propertyEdits.push(pe);
                    d.append(pe);
                }
            }*/
        }
    }
    
    return d;
}

function newPropertyView(self, vv) {
    var p = self.getProperty(vv.id);
    if (!p)
        return ('<li>' + vv.id + ': ' + vv.value + '</li>');
        
    if (p.type == 'object') {
        var o = self.object(vv.value) || { name: 'Unknown object: ' + vv.value };
        
        return ('<li>' + vv.id + ': <a href="#">' + o.name + '</a></li>');
    }
    else {
        return ('<li>' + vv.id + ': ' + vv.value + '</li>');    
    }
}

//DEPRECATED
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
    else if (type == 'real') {
    	if (!value) value = '';

        //http://stackoverflow.com/questions/8808590/html5-number-input-type-that-takes-only-integers
		var t = $('<input type="text" value="' + value + '">');    
		x.append(t);		
		x.data('value', function(target) {
			return parseFloat(t.val());
		});        
    }
    else if (type == 'integer') {
        if (!value) value = '';

		////http://stackoverflow.com/questions/8808590/html5-number-input-type-that-takes-only-integers
        var t = $('<input type="number" value="' + value + '">');    
		x.append(t);		
		x.data('value', function(target) {
			return parseInt(t.val());
		});                
    }
    else if (type == 'object') {
        var tt = $('<span></span>');
        var t = $('<input></input>');
        
        
        //TODO set initial value
        
        //http://jqueryui.com/autocomplete/#default
        //http://jqueryui.com/autocomplete/#categories
        var data = [ ];
        for (var k in window.self.objects()) {
            var v = window.self.object(k);
            if (value == k) {
                t.val(v.name);
                t.result = value;
            }

            data.push({
               value: k,
               label: v.name
            });
        }
        t.autocomplete({
            source: data,
            select: function( event, ui ) {
                t.result = ui.item.value;
                t.val(ui.item.label);
                /*
                $( "#project" ).val( ui.item.label );
                $( "#project-id" ).val( ui.item.value );
                $( "#project-description" ).html( ui.item.desc );
                $( "#project-icon" ).attr( "src", "images/" + ui.item.icon );
                */
         
                return false;
            }
        });
        
        //TODO handle specific tag restriction
        /*window.self.objectsWithTag(t) {
            
        }*/
        
        var mb = $('<button title="Find Object">...</button>');
        mb.click(function() {
           //TODO popup object browser 
        });
        
        tt.append(t);
        tt.append(mb);
        
        x.append(tt);
        
        x.data('value', function(target) {
           return t.result; //uri 
        });
    }
	else /*if (type == 'text')*/ {
		if (!value) value = '';

		var t = $('<input type="text" value="' + value + '">');    
		x.append(t);		
		x.data('value', function(target) {
			return t.val();			
		});
	}/*
    else {
        console.log('unknown property type: ' + type);
    }*/
	
    x.append(removeButton);
	
	return x;
}



function renderObjectSummary(self, x, onRemoved, r, depthRemaining) {

    if (!x) {
        return $('<div>Object missing</div>');
    }
    
    var mini = (depthRemaining == 0);
    
	var fs = (1.0 + r/2.0)*100.0 + '%';
	
	var d = $('<div class="objectView" style="font-size:' + fs + '">');
	var xn = x.name;
	var authorID = x.author;
	
	if (!isSelfObject(x.id)) { //exclude Self- objects
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
        var r = self.getReplies(x.id);        
        if (r.length > 0) {
            replies.show();
            //TODO sort the replies by age, oldest first
            for (var i = 0; i < r.length; i++) {
                var p = r[i];
                replies.append(renderObjectSummary(self, self.getObject(p), null, r*0.618, depthRemaining-1));
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
                        id: uuid(), 
                        value: [],
                        replyTo: [ x.id ],
                        createdAt: Date.now()
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
            var oid = x.id;
            Backbone.history.navigate('/object/' + oid + '/focus', {trigger: true});
    	});
    }
    
	var deleteButton = $('<button title="Delete"><i class="icon-remove"></i></button>');
	deleteButton.click(function() {
        if (!x.author) {
            //don't confirm delete if no author is specified
            self.deleteObject(x);
        }
        else {
    		if (confirm('Permanently delete? ' + x.id)) {
    			self.deleteObject(x);			
    		}
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
           newPopupObjectView(x.id); 
        });
        var haxn = $('<h1>');
        haxn.append(axn);
		d.append(haxn);
	}
	
    var mdline = $('<div></div>');
    mdline.addClass('MetadataLine');

    var ot = objTags(x);
    
    for (var i = 0; i < ot.length; i++) {
        var t = ot[i];   
        if (self.isProperty(t))
            continue;
            
        var tt = self.getTag(t);
        if (tt) {
            mdline.append(newTagButton(tt));
        }
        else {
            mdline.append('<a href="#">' + t + '</a>');
        }
        mdline.append('&nbsp;');
    }        
    
	var spacepoint = objSpacePoint(x);        
	if (spacepoint) {
        var lat = _n(spacepoint.lat);
        var lon = _n(spacepoint.lon);
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
    
    var ww = x.modifiedAt || x.createdAt || null;null
    if (ww) {
        var tt = $('<time class="timeago"/>');
        function ISODateString(d){
            function pad(n){return n<10 ? '0'+n : n}
            return d.getUTCFullYear()+'-'
              + pad(d.getUTCMonth()+1)+'-'
              + pad(d.getUTCDate())+'T'
              + pad(d.getUTCHours())+':'
              + pad(d.getUTCMinutes())+':'
              + pad(d.getUTCSeconds())+'Z'}
        
        tt.attr('datetime', ISODateString(new Date(ww)));
        
        mdline.append(tt);
    }
    
    d.append(mdline);
    
	//d.append('<h3>Relevance:' + parseInt(r*100.0)   + '%</h3>');
	
    var desc = objDescription(x);
    if (desc) {
		d.append('<p>' + desc + '</p>');		
	}
	
    if (x.value) {
		var ud = $('<ul>');
		d.append(ud);
		for (var vi = 0; vi < x.value.length; vi++) {
			var vv = x.value[vi];
            if (self.isProperty(vv.id))
                ud.append(newPropertyView(self, vv));
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

