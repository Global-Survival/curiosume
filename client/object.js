/**
 * @author seh
 */
var types = { };

function addType(t) {
	types[t.uri] = t;
}

function updateTypes() {
	//console.log('updating types');
}

function newObjectView(x) {
	var d = $('<div class="objectView">');
	if (x.name) {
		d.append('<h1>' + x.name + '</h1>');
	}
	if (x.type) {
		if (x.type.length) {
			d.append('<h2>' + JSON.stringify(x.type) + '</h2>');
		}
		else
			d.append('<h2>' + x.type + '</h2>');
	}
	if (x.geolocation) {
		d.append('<h3>' + JSON.stringify(x.geolocation) + '</h3>');
	}
	return d;
}

function newObjectEdit(x) {
	var d = $('<div>');
	
	var expandedDesc = false;
	var expandedMap = false;
	
	var mi = $('<input type="text" class="MessageSubject"/>')
	var md = $('<textarea class="MessageDescription" rows="5" /><br/>');
	
    mi.keyup(function(event) {
    	var authorID = ((Self.get('name') || 'Anonymous') + ' <' + Self.get('clientID') + '>');
 
    	if (!expandedDesc) {
            if (event.keyCode==13) {
          	  sendMessage({
          		  uuid: uuid(),
          		  name: mi.val(),
          		  type: 'Message',
          		  author: authorID
          	  });
            }
      	}
    });
	
	var map;

	var ed = $('<div>');
	var emid = uuid();
	var em = $('<div id="' + emid + '" style="width: 100%; height: 200px">');
	
	var ex = $('<div>');
	
	var b = $('<button>+ Description</buton>');
	b.click(function() {
		expandedDesc = true;
		ex.show();
		ed.show();
		b.hide();
	});
	var c = $('<button>+ Map</buton>');
	c.click(function() {
		expandedMap = true;
		
		ex.show();
		em.show();
		c.hide();
		map = initLocationChooserMap(emid);
	});
	
	
	function saveForm() {
		if (!x) x = { };
		
		x.name = mi.val();
		
		if (expandedDesc) {
			x.text = md.val(); 
		}
		
		if (map) {
			var b = map.targetLocation.geometry.bounds;
			//TODO make this a funciton to get the center of a bounds, or find an existing one
			var avX = (b.left + b.right)/2.0;
			var avY = (b.top + b.bottom)/2.0;
			var p = new OpenLayers.LonLat(avX,avY);
			p = p.transform(toProjection, fromProjection);
			x.geolocation = [p.lat, p.lon];
		}
	}
	
	md.appendTo(ed);
	$('<button>Attach</button>').appendTo(ex);
	$('<button>+</button>').appendTo(ex);
	var sendButton = $('<button><b>Save</b></button>');
	sendButton.click(function() {
		saveForm();
		sendMessage(x);
	});
	sendButton.appendTo(ex);
	sendButton.wrap('<div style="float:right">');
	
	
	ed.hide();
	em.hide();
	ex.hide();
	
	mi.appendTo(d);
	$('<br/>').appendTo(d);

	b.appendTo(d);
	c.appendTo(d);
	
	ed.appendTo(d);
	em.appendTo(d);
	ex.appendTo(d);
	
	if (x) {
		if (x.name)
			mi.val(x.name);
		
		var desc = '';
		
		if (x.text) {
			desc = desc + x.text + "\n\n";
		}
		
		
		if (x.values) {
			for (p in x.values) {
				var pr = x.values[p];
				for (v in pr) {
					var t = v + ': ' + pr[v]; 
					desc = desc + t + "\n";
				}
			}
		}
		
		if (d.length > 0) {
			md.val(desc);
			b.click();			
		}
			
	}
	
	return d;
}


function newTypeMenu() {
	var x = $('<ul class="sf-menu"/>');
	
	var m = { };
	for (var k in types) {
		var t = types[k];
		var path = k.split('.');
		if (path.length > 1) {
			if (!m[path[0]]) m[path[0]] = [];
			m[path[0]].push( path[1] ); 
		}
		else {
			
		}
	}
	for (var mm in m) {
		var menu = m[mm];
		var y = $('<li><a href="#">' + mm + '</a><ul/></li>');
		for (var l = 0; l < menu.length; l++) {
			//console.dir(menu[l]);
			//y.append('<li><a href="#">' + types[menu[l]].name + '</a></li>');
			
		}
		x.append(y);
	}
	
	return x.superfish();
}