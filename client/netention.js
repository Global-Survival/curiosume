var nextCategoryID = 0, nextNewsID = 0, nextControlID = 0;


var layers = [];

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


var createRingBuffer = function(length){

  var pointer = 0, buffer = []; 

  return {
    get  : function(key){return buffer[key];},
    push : function(item){
      buffer[pointer] = item;
      pointer = (length + pointer +1) % length;
    }
  };
  
};
	

function addMenu(afterLoaded) {                
	var hw = $('<div/>');
	hw.load('menu.html', afterLoaded);
	$('body').prepend(hw);            	
}



function loadScripts(f) {
	//https://github.com/rgrove/lazyload/
	$.getScript('/lib/lazyload.js', function() {
		
		var scripts = [ "/socket.io/socket.io.js", 
		                'http://maps.google.com/maps/api/js?v=3&sensor=false',
		                "http://www.openlayers.org/api/OpenLayers.js",
		                "http://code.jquery.com/ui/1.8.23/jquery-ui.min.js",
		                "/lib/jquery-tmpl/jquery.tmpl.js",
		                "/lib/jstorage/jstorage.js",
		                "/lib/jQuery-URL-Parser/purl.js",
		                "http://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min.js",
		                "/lib/superfish/js/superfish.js",
		                "/self.js",
		                "/team.js",
		                "/sensor.js",
		                "/map.js",
		                "/map.heatmap.js",
		                "/environment.js",
		                "/schema/emotion.js",
		                "/schema/action.js",
		                "/schema/schema.org.js",
		                "/cortexit.js"	                
		                ];
		
		LazyLoad.js(scripts, f);
	});
	
	loadCSS('http://code.jquery.com/ui/1.8.23/themes/base/jquery-ui.css');
    loadCSS('http://static.jquery.com/ui/css/demo-docs-theme/ui.theme.css');

	loadCSS('http://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min.css');
	
	loadCSS('/lib/superfish/css/superfish.css');
	loadCSS('/lib/superfish/css/superfish-navbar.css');
	loadCSS('/lib/superfish/css/superfish-vertical.css');
	
	loadCSS('self.css');
	loadCSS('gss.css');
	loadCSS('gss.fixed.css');
	loadCSS('team.css');
	loadCSS('environment.css');
	loadCSS('cortexit.css');
}



function initNetention(f) {
		
	console.log('loading scripts...');
	
	loadScripts(function(data, textStatus) {
		
		console.log('scripts loaded');
		
		socket = io.connect('/');
		Self = $.jStorage;
		 
	    
        loadSelf();
	     
	    socket.on('setClientID', function (cid) {
	         Self.set('clientID', cid);
	    });
	    socket.on('setClient', function (cid,s) {
	         setClient(cid, s);
	    });
	    socket.on('reconnect', function () {
	         connectSelf();
	    });
	    
        initTeam();
        
		addMenu(function() {
	        loadSchema('/schema/schema.org.json', function() {

	    	    if (f)
	    	    	f();
	    	    
	        });
			
		});
	    
		
	});
	
}

function subscribe(channel, f) {
	socket.emit('subscribe', channel);
	socket.on('receive-'+ channel, f);	
}
function unsubscribe(channel) {
	socket.emit('unsubscribe', channel);
	//socket.off ??
}
function pub(channel, message) {
    socket.emit('pub', channel, message);
}
function getClientInterests(f) {
	socket.emit('getClientInterests', f);
}