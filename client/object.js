
//t is either a tag ID, or an object with zero or more tags
function getTagIcon(t) {
    
    if (t.id) {
        //try all the tags, return the first
        if (t.value) {
            for (var x = 0; x < t.value.length; x++) {
                if (isPrimitive(t.value[x].id))
                    continue;
                var r = getTagIcon(t.value[x].id);
                if (r)
                    return r;
            }
        }
        return null;
    }
    else {
        return defaultIcons[t];
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

/**
 *  focus - a function that returns the current focus
 *  commitFocus - a function that takes as parameter the next focus to save
 */
function renderObject(x, editable, focus, commitFocus) {
    var d = $('<div/>');
    
    var whenSaved = [];
            
    function getEditedFocus() {
        var f = focus();
        var x = objNew( f.id );
        x.createdAt = f.createdAt;
        x.author = f.author;
        for (var i = 0; i < whenSaved.length; i++) {
            var w = whenSaved[i];
            w(x);
        }
        return x;
    }
    
    var onAdd = function(tag, value) {
        commitFocus( objAddValue(getEditedFocus(), tag, value));
    };
    var onRemove = function(i) {                    
        commitFocus( objRemoveValue( getEditedFocus(), i) );
    };
    var onStrengthChange = function(i, newStrength) {
        var e = getEditedFocus();
        e.value[i].strength = newStrength;
        commitFocus(e);
    };
    var onOrderChange = function(fromIndex, toIndex) {
        var e = getEditedFocus();
        //http://stackoverflow.com/questions/5306680/move-an-array-element-from-one-array-position-to-another
        e.value.splice(toIndex, 0, e.value.splice(fromIndex, 1)[0]);
        commitFocus(e);
    };
    
    var nameInput = null;
    if (editable) {
        nameInput = $('<input/>').attr('type', 'text').attr('x-webkit-speech', 'x-webkit-speech').addClass('nameInput');
        nameInput.val(objName(x));
        d.append(nameInput);
        
        whenSaved.push(function(y) {
           objName(y, nameInput.val());
        });
    }
    else {
        d.append('<h1>' + objName(x) + '</h1>');
    }
    //d.append($('<span>' + x.id + '</span>').addClass('idLabel'));


    if (x.value) {
        for (var i = 0; i < x.value.length; i++) {
            var t = x.value[i];
            var tt = renderTagSection(x, i, t, editable, whenSaved, onAdd, onRemove, onStrengthChange, onOrderChange);
            d.append(tt); 
        }
    }
    
    var ts = $('<ul/>');
    
    d.append( ts.addClass('tagSuggestions') );
    
    var ontoSearcher;

    var lastValue = null;
    function search() {   
        if (!ts.is(':visible')) {
            clearInterval(ontoSearcher);
            return;
        }
        
        //skip suggestions when editing a Tag
        if (objHasTag(getEditedFocus(), 'Tag')) {
            ts.html('');    
        }
        else {
            var v = nameInput.val();
            if (lastValue!=v) {
                updateTagSuggestions(v, ts, onAdd, getEditedFocus);
            }
            lastValue = v;
        }
        
    }
    
    if (editable)
        ontoSearcher = setInterval(search, 500);
    
    d.getEditedFocus = getEditedFocus;
    
    return d;                
}

function applyTagStrengthClass(e, s) {
    if (s <= 0.25)       e.addClass('tag25');
    else if (s <= 0.50)  e.addClass('tag50');
    else if (s <= 0.75)  e.addClass('tag75');
    else                 e.addClass('tag100');    
}


function renderTagSection(x, index, t, editable, whenSaved, onAdd, onRemove, onStrengthChange, onOrderChange) {
    var tag = t.id;
    var strength = t.strength;
    
    var d = $('<div/>').addClass('tagSection');
    
    if (!strength) strength = 1.0;
    
    var tagLabel = $('<div>' + tag + '</div>').addClass('tagLabel');
    
    applyTagStrengthClass(d, strength);
    
    d.append(tagLabel);

        
    if (editable) {
        var tagButtons = $('<div/>').addClass('tagButtons');
        
        if (index > 0) {
            var upButton = $('<a href="#">^</a>');
            upButton.addClass('tagButton');
            upButton.click(function() {
                onOrderChange(index, index-1);            
            });
            tagButtons.append(upButton);
        }
        
        if (strength > 0.25) {
            var weakenButton = $('<a href="#">-</a>');
            weakenButton.addClass('tagButton');
            weakenButton.click(function() {
                onStrengthChange(index, strength - 0.25);            
            });
            tagButtons.append(weakenButton);
        }
        if (strength < 1.0) {
            var strengthButton = $('<a href="#">+</a>');
            strengthButton.addClass('tagButton');
            strengthButton.click(function() {
                onStrengthChange(index, strength + 0.25);
            });
            tagButtons.append(strengthButton);
        }
        
        var removeButton = $('<a href="#">X</a>');
        removeButton.addClass('tagButton');
        removeButton.click(function() {
           if (confirm("Remove " + tag + "?"))
                onRemove(index);
        });
        tagButtons.append(removeButton);
        d.append(tagButtons);
    
        //d.hover(function(){ tagButtons.fadeIn(200);}, function() { tagButtons.fadeOut(200);});
        //d.hover(function(){ tagButtons.show();}, function() { tagButtons.hide();});                
        //tagButtons.hide();
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
               objAddValue(y, tag, dd.val(), strength);
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
                    objAddValue(y, tag, dd.val(), strength);
                else if (type == 'real') {
                    var ddv = parseFloat(dd.val());
                    if (isNaN(ddv)) ddv = dd.val();    //store as string                 
                    objAddValue(y, tag, ddv, strength);
                }
                else if (type == 'integer') {
                    var ddv = parseInt(dd.val());
                    if (isNaN(ddv)) ddv = dd.val();     //store as string
                    objAddValue(y, tag, ddv, strength);
                }
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
        
        if (editable) {
            whenSaved.push(function(y) {
                objAddValue(y, tag, t.attr('checked') == 'checked' ? true : false, strength);
            });
        }
        else {
            t.attr("disabled", "disabled");
        }
	}    
    else if (type == 'spacepoint') {
        var ee = $('<div/>');
        
        var dd = $('<div/>');
        var de = uuid();
        dd.attr('id', de);
        dd = dd.addClass('focusMap');

        ee.append(dd);
        
        var m;
        
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
                var l = m.location();
                objAddValue(y, tag, {
                   lat: l.lat,
                   lon: l.lon,
                   zoom: m.zoom,
                   planet: 'Earth'
                }, strength);
            });

        }
        
        d.append(ee);
        
        
        later(function() {
            var lat = t.value.lat || 0;
            var lon = t.value.lon || 0;
            var zoom = t.value.zoom;
            m = initLocationChooserMap(de, [lat,lon], zoom);
            
        });
    }
    else if (type == 'timepoint') {
        if (editable) {
            var lr = $('<input type="text" placeholder="Time" />');
            lr.val(new Date(t.at));
            d.append(lr);
            var lb = $('<button style="margin-top: -0.5em"><i class="icon-calendar"/></button>');            
            d.append(lb);
	    //TODO add 'Now' button
            
            //TODO add save function
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
	    //TODO add 'Now' button
            d.append('<br/>');
            var ls = $('<input type="text" placeholder="Time End" />');
            ls.val(new Date(t.endsAt));
            d.append('Stop: ');
            d.append(ls);
	    //TODO add 'Now' button
            
            //TODO add save function
        }
        else {
            d.append(new Date(t.startsAt) + ' ' + new Date(t.endsAt));
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
    else if (type == 'object') {
        if (editable) {
            var tt = $('<span></span>');
            var ts = $('<input></input>');
            
            var value = t.value;
            
            //http://jqueryui.com/autocomplete/#default
            //http://jqueryui.com/autocomplete/#categories
            var data = [ ];
            for (var k in window.self.objects()) {
                var v = window.self.object(k);
                if (value == k) {
                    ts.val(v.name);
                    ts.result = value;
                }
    
                data.push({
                   value: k,
                   label: v.name
                });
            }
            ts.autocomplete({
                source: data,
                select: function( event, ui ) {
                    ts.result = ui.item.value;
                    ts.val(ui.item.label);
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
            
            tt.append(ts);
            tt.append(mb);
            
            d.append(tt);
            
            whenSaved.push(function(y) {
               objAddValue(y, tag, ts.result || '', strength);
            });            
        }
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
                   objAddTag(y, tag, strength);
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
                //pd.addClass('tagSuggestions');
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
        
        return ('<li>' + p.name + ': <a href="javascript:newPopupObjectView(\'' + vv.value + '\')">' + o.name + '</a></li>');
    }
    else if (p.type == 'url') {
        var u = vv.value;
        return ('<li>' + p.name + ': <a target="_blank" href="' + u + '">' + u + '</a></li>');        
    }
    else {
        var v = $('<li>' + p.name + ': ' + vv.value + '</li>');
        
        //Property Actions
        //TODO make this more abstract and extendable by plugins
        
        if ((vv.id == 'walletBTC') || (vv.id == 'walletPayPal') || (vv.id == 'walletRipple')) {
            var payButton = $('<button>Pay</button>');
            payButton.click(function() {
               alert('Payments not implemented yet.');
            });

            var vu = $('<ul/>');
            vu.append(payButton);            
            v.append(vu);

        }
        
        
        return v;
    }
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
	    //d.hover(function(){ hb.fadeIn(200);}, function() { hb.fadeOut(200);});
        d.hover(function(){ hb.show();}, function() { hb.hide();});        
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
    var ots = objTagStrength(x, false);
    
    for (var i = 0; i < ot.length; i++) {
        var t = ot[i];   
        if (self.isProperty(t))
            continue;
            
        var tt = self.getTag(t);
        if (tt) {
            var ttt = newTagButton(tt);
            applyTagStrengthClass(ttt, ots[t]);
            mdline.append(ttt);
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

function updateTypeTree(a, onSelectionChange) {
    var self = window.self;
    
    a.html('');    
    var dt = $('<div></div>');
    dt.addClass('TagTree');
    
    var tree = $('<ul></ul>').css('display','none');
    var stc = self.getTagCount();
                    
    function subtree(root, i) {
        var name = i.name;// + ' (' + i.uri + ')';
        var xi = i.uri;
        var label = name;
        if (stc[xi])
            if (stc[xi] > 0)
                label += ' (' + _n(stc[xi]) + ')';
                
        var n = $('<li id="' + xi + '">' + label + '</li>');
        
        root.append(n);
        
        var children = self.subtags(i.uri);
        
        if (children.length > 0) {
            n.addClass('folder');
            var nu = $('<ul></ul>');            
            n.append(nu);
            _.each(children, function(c) {
                subtree(nu, self.tag(c));
            });                            
        }
    }
    
    var roots = self.tagRoots();
    _.each(roots, function(t) {
       subtree(tree, self.tag(t));
    });
    
                   
    tree.appendTo(dt);
    dt.appendTo(a);
    
    

    /*
    //update display of type counts and other type metadata
    function updateTypeCounts() {
        for (var t in stc) {
            $('a:contains("' + t + '")').append(' '+ stc[t]);
        }    
    }
    */
    
    //http://wwwendt.de/tech/dynatree/doc/dynatree-doc.html
    dt.dynatree({
        checkbox: true,
        selectMode: 2, // 1:single, 2:multi, 3:multi-hier
        debugLevel: 0,
        onActivate: function(node) {
            //alert("You activated " + node);
        },
        onSelect: function(flag, node) {
            /*if( ! flag )
                alert("You deselected node with title " + node.data.title);*/
            var selectedNodes = node.tree.getSelectedNodes();
            var selectedKeys = $.map(selectedNodes, function(node){
                return node.data.key;
            });
                        
            if (onSelectionChange)
                onSelectionChange(selectedKeys);            
            
            dt.currentSelection = selectedKeys;
        }
        /*
        onRender: function(dtnode, nodeSpan)
        onExpand : function() {
            updateTypeCounts();  
        }*/
    });
    
    return dt;
    
}
