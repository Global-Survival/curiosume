function hasType(o, t) {    
	if (!o.type)
		return false;
        
	var ot = o.type;

    //TODO use an underscore function instead of this loop
	for (var i = 0; i < ot.length; i++) {
		if (ot[i] == t)
			return true;
	}
	return false;
}

function getProperties(t) {
    //TODO add 'extends' supertype inheritance
    if (t.properties)
        return t.properties;
    return [];
}

function addProperty(x, p) {
    x.values.push( { uri: p, val: p } );
    return x;
}


function acceptsAnotherProperty(x, p) {
    //TODO determine this by Property arity constraints
    return true;
}

function addType(x, t) {
    x.type.push(t);
    x.typeStrength.push(t);
    return x;
}
function removeType(x, index) {
    x.type.splice(index, 1);    
    x.typeStrength.splice(index, 1);    
    return x;
}

function newObjectView(self, x, onRemoved, r) {
	
	var fs = (1.0 + r/2.0)*100.0 + '%';
	
	var d = $('<div class="objectView" style="font-size:' + fs + '">');
	var xn = x.name;
	var authorID = x.author;
	
	/*if (!isSelfObject(x.uri))*/ { //exclude Self- objects
		if (x.author) {
			var a = x.author;
			var as = /*getSelf*/(x.author);
			//if (as)
			//	a = as.name;
			xn = a + ': ' + xn;
		}
	}

	var hb = $('<div>').addClass('ObjectViewHideButton');
	var focusButton = $('<button title="Focus">^</button>');
	focusButton.click(function() {
		//setFocus(x);
        var oid = x.uri;
        Backbone.history.navigate('/object/' + oid, {trigger: true});
	});
	var deleteButton = $('<button title="Delete">X</button>');
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

    /*
	var authorClient = getSelf(authorID);
	if (authorClient) {
		if (authorID) {
			var av = getAvatar(authorID).attr('align', 'left');
			
			d.append(av);
			av.wrap('<div class="AvatarIcon"/>');
		}
	}
    */

	if (x.name) {
		d.append('<h1>' + xn + '</h1>');
	}
	
	if (x.type) {
		if (x.type.length) {
			d.append('<h3>' + JSON.stringify(x.type, null, 2) + '</h3>');
		}
		else
			d.append('<h3>' + x.type + '</h3>');
	}
	
	if (x.values) {
		var ud = $('<ul>');
		d.append(ud);
		for (var vi = 0; vi < x.values.length; vi++) {
			var vv = x.values[vi];
			ud.append('<li>' + vv.uri + ': ' + vv.value + '</li>');
		}
	}
	
	
	
	if (x.geolocation) {
		var dist = '?';
		if (self.myself().geolocation)
			dist = geoDist(x.geolocation, self.myself().geolocation);
		
		d.append('<h3>' + JSON.stringify(x.geolocation) + ' ' + dist + ' km away</h3>');
	}
    
	//d.append('<h3>Relevance:' + parseInt(r*100.0)   + '%</h3>');
	
	if (x.text) {
		d.append('<p>' + x.text + '</p>');
		
		if (hasType(x, 'general.Media')) {
			var imgURL = x.text;
			if (imgURL.indexOf('http://')==0)
				d.append('<img src="'+imgURL+'"/>');
			//TODO handle videos, etc
		}
	}
	
	
	
	return d;
}

function newPropertyEdit(p, v) {
    var propertyID = p.uri;
    
    var value = p.value;
    
	var type = v.type;
		
	if (!p) {
		return $('<div>Unknown property: ' + propertyID + '</div>');
	}
		
	var x = $('<div>').addClass('FocusSection');
	x.append(propertyID + ':');
	
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

function getAvatar(authorID) {
    var emailHash = getProperty(getSelf(authorID), 'email', 'unknown@unknown.com');
	emailHash = MD5(emailHash);
	return $("<img>").attr("src","http://www.gravatar.com/avatar/" + emailHash + "&s=200");
}

