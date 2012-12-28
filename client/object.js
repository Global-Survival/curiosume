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
		focusObject(x);
	});
	var deleteButton = $('<button title="Delete">X</button>');
	deleteButton.click(function() {
		if (confirm('Permanently delete? ' + x.uri)) {
			deleteObject(x);			
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
		if (self.get('geolocation'))
			dist = geoDist(x.geolocation, Self.get('geolocation'));
		
		d.append('<h3>' + JSON.stringify(x.geolocation) + ' ' + dist + ' km away</h3>');
	}
	d.append('<h3>Relevance:' + parseInt(r*100.0)   + '%</h3>');
	
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

function getAvatar(authorID) {
    var emailHash = getProperty(getSelf(authorID), 'email', 'unknown@unknown.com');
	emailHash = MD5(emailHash);
	return $("<img>").attr("src","http://www.gravatar.com/avatar/" + emailHash + "&s=200");
}

function hasType(o, t) {    
	if (!o.type)
		return false;
	var ot = o.type;
	
	for (var i = 0; i < ot.length; i++) {
		if (ot[i] == t)
			return true;
	}
	return false;
}
