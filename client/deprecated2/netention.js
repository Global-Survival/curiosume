var nextCategoryID = 0, nextNewsID = 0, nextControlID = 0;



var socket;
            
//var etherpadBaseURL = 'http://localhost:9001';
var Self;


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



function loadScripts(f) {
	//https://github.com/rgrove/lazyload/
	$.getScript('/lib/lazyload.js', function() {
		
		var scripts = [ "/socket.io/socket.io.js", 
//		                'http://maps.google.com/maps?file=api&amp;v=2&amp;key=ABQIAAAAjpkAC9ePGem0lIq5XcMiuhR_wWLPFku8Ix9i2SXYRVK3e45q1BQUd_beF8dtzKET_EteAjPdGDwqpQ',
		                "http://www.openlayers.org/api/OpenLayers.js",
		                "http://code.jquery.com/ui/jquery-ui-git.js",
		                "/lib/jquery-tmpl/jquery.tmpl.js",
		                "/lib/jstorage/jstorage.js",
		                "/lib/jQuery-URL-Parser/purl.js",
//		                "http://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min.js",
		                "/lib/superfish/js/hoverIntent.js",
		                "/lib/superfish/js/superfish.js",
		                "/lib/superfish/js/supersubs.js",
		                "/util.js",
		                "/self.js",
		                "/object.js",
		                "/team.js",
		                "/sensor.js",
		                "/time.js",
		                "/map.js",
		                "/map.heatmap.js",
		                "/environment.js",
		                "/cortexit.js"	                
		                ];
		
		LazyLoad.js(scripts, f);
	});
	
	loadCSS('http://code.jquery.com/ui/1.8.23/themes/base/jquery-ui.css');
    loadCSS('http://static.jquery.com/ui/css/demo-docs-theme/ui.theme.css');

	loadCSS('http://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min.css');
	
	loadCSS('/lib/superfish/css/superfish.css');
	/*loadCSS('/lib/superfish/css/superfish-navbar.css');
	loadCSS('/lib/superfish/css/superfish-vertical.css');*/
	
	loadCSS('/gss.css');
	loadCSS('/gss.fixed.css');
	loadCSS('/team.css');
	loadCSS('/environment.css');
	loadCSS('/cortexit.css');
	loadCSS('/object.css');
}



function initNetention(f) {
		
	console.log('Loading scripts...');
	
	loadScripts(function(data, textStatus) {
		
		console.log('Scripts loaded');
		
		socket = io.connect('/');
		Self = $.jStorage;
		 
	    
        loadSelf();
	     
	    socket.on('setClientID', function (cid, key) {
	         setSelfID(cid);
	         Self.set('auth', key);
	    });
	    
	    socket.on('reconnect', function () {
	         connectSelf();
	    });
		socket.on('notice', function(m) {
			notice(m);	
		});
		socket.on('addTypes', function(at) {
			addTypes(at);
		});

        initTeam();
        
        socket.emit('subscribe', 'general.User', true);
        
		addMenu(function() {

    	    if (f)
    	    	f();
    	    
			
		});
	    
		
	});
	
}

function addTypes(at) {
	for (var k in at) {
		addType(at[k]);
	}
	saveSelf();
	updateTypes();
}

function getObjects(query, onObject, onFinished) {
	socket.emit('getObjects', query, function(objs) {
		for (k in objs) {
			var x = objs[k];
			notice(x);
			if (onObject!=null)
				onObject(x);
		}
		onFinished();
	});
}

function notice(x) {
	if (!Array.isArray(x)) {
		notice([x]);
	}

	function n(y) {
		if (!y)
			return;
		
		if (y.type) {
			y.type = getTypeArray(y.type);
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
	
	updateDataView();
}

function subscribe(channel, f) {
	socket.emit('subscribe', channel);
	socket.on('receive-'+ channel, f);	
}
function unsubscribe(channel) {
	socket.emit('unsubscribe', channel);
	//socket.off ??
}
function pub(message) {
    socket.emit('pub', message);
}
function getClientInterests(f) {
	socket.emit('getClientInterests', f);
}

function isAuthorized() {
	if (Self.get('auth')) {
		if (Self.get('auth').length > 0) {
			return true;
		}
	}	
	return false;
}

/*
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