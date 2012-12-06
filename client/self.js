var attention = { };

var interestStrength = { };

var interestHistory;
var maxInterestHistory = 8;

var interests = []; //current set of interests
var sensorClient = { };

var sensorsInitted = false;
var connected = false;

var defaultInitialInterest = 0.25;

function loadInterests() {
    interestStrength = Self.get('interests');
    if (interestStrength == null) {
        interestStrength = { };    
    }
    
    interestHistory = Self.get('interestHistory');
    if (interestHistory == null) {
    	interestHistory = { };
    }

    for (var k in interestStrength) {
        var s = getInterestItem(k);
        var v = interestStrength[k];

        if (v > 0) {
            addInterest(k, true, false);
            setInterest(k, v, true, false);
        }
    }

    updateSelf();

}

function loadSelf() {
    var n = Self.get("name");
    if (n == undefined) {
        n = 'Anonymous';
        Self.set("name", n);
    }
    $('#selfName').val(Self.get('name'));

	var emailHash = Self.get('emailHash');
	if (emailHash) {
		$('#selfEmail').attr('placeholder', 'already hashed');
	}
	
    attention = Self.get("attention");
    if (attention == null)
    	attention = { };
    	
    types = Self.get("types");
    if (types == null)
    	types = { };
    	
    	
    //add self to clients
    var s = {
    	uuid: Self.get('clientID'), 
    	name: n,
    	emailHash: emailHash
    };
    setClient(s.uuid, s);
}

function saveInterests() {
    var si = { };
    for (var k in interestStrength) {
        var v = interestStrength[k];
        if (v > 0) {
            si[k] = v;
        }
    }
    Self.set('interests', si);
    Self.set('interestHistory', interestHistory);
}

function saveSelf() {
    var n = $('#selfName').val();
    if (n)
	    if (n.length > 0)
	    	Self.set("name", n);
    
    var email = $('#selfEmail').val();
    if (email)
	    if (email.length > 0)    
	    	Self.set('emailHash', MD5(email) );
    
    Self.set("attention", attention);
    Self.set('types', types);

    updateStatus();
    
}

var nearestFactor, soonFactor;




function getSelfSnapshot() {
    return {
        name: Self.get('name'),        
        emailHash: Self.get('emailHash'),
        geolocation: Self.get('geolocation'),
        interests: Self.get('interests')
    };
}

function connectSelf() {
    socket.emit('connectSelf', Self.get('clientID'));
}
function updateSelf() {
	var getInstances = false;
	
    if (!connected) {
        connectSelf();
        connected = true;
        getInstances = true;        
    }
    
    var ss = getSelfSnapshot();
    
    interestHistory[Date.now()] = ss;
    
    timeArrayLimitSize(interestHistory, maxInterestHistory);
    
    socket.emit('updateSelf', ss, getInstances);
    
	updateDataView();
}

function timeArrayRemoveOldest(i) {
	var count = 0;
	var min = -1;
	for (var t in i) {
		var it = parseInt(t);
		if ((min == -1) || (it < min)) min = it;
		count++;
	}
	if (count > 0)
		delete i[min + ''];
	return count-1;
}

function timeArrayLimitSize(i, maxSize) {
	var l = Object.keys(i).length;
	if (l >= maxSize) {
		var count;
		do {
			count = timeArrayRemoveOldest(i);
		} while (count >= maxSize);
	}
}


function encodeInterestForElement(x) {
	//var y = x.replace(/\./g,"_").replace(/ /g,"_").replace(/\[/g,"_").replace(/\]/g,"_").replace(/\//g,"_");
	//return y;
	return encodeURIComponent(x).replace(/%/g,"_").replace(/\./g,"_");
}

function getInterestItem(sensor) { 
		return $('#Interest-' + encodeInterestForElement(interestElements[sensor] || uuid())); 
	}
function getInterestControls(sensor) { 
		return $('#InterestControl-' + encodeInterestForElement(interestElements[sensor] || uuid())); 
	}

function setInterest(sensorID, newImportance, force, updateAll) {
    //console.log('sensor: ' + sensor + ' importance=' + newImportance);
    var oldImportance = interestStrength[sensorID];
    if (force!=true) {
        if (oldImportance == newImportance)
            return;
    }

    var sensor = getInterestItem(sensorID);
    sensor.removeClass('interestItem25');
    sensor.removeClass('interestItem50');
    sensor.removeClass('interestItem75');
    sensor.removeClass('interestItem100');

    var controls = getInterestControls(sensorID);
    
    
    var ch = $('<span class="ImportanceButtons"/>');

    function addButton(label, value) {
        var b = $('<button>').html(label);
        b.mouseup(function(event) {
        	setInterest( sensorID, value, false, true)
        	event.stopImmediatePropagation();            	
        });
        
        if (value!=0)
        	b.addClass('interestItem'+parseInt(value*100.0));
        ch.append(b);        	
    }
    addButton('&nbsp;&nbsp;', 1.0);
    addButton('&nbsp;&nbsp;', 0.75);        
    addButton('&nbsp;&nbsp;', 0.50);
    addButton('&nbsp;&nbsp;', 0.25);
    addButton('x', 0);
    
    if (sensorClient[sensorID]!=undefined) {
        if (sensorClient[sensorID].getControlHTML!=undefined) {
            ch.append( sensorClient[sensorID].getControlHTML() );
        }
    }

    controls.show();
    controls.html(ch);
    

    if (newImportance == 0) {
        if (confirm('Remove ' + sensorID + ' ?')) {
            removeInterest(sensorID);
        }
        else {
            setInterest(sensorID, oldImportance, true, false);
        }
    }
    else {
    	
        if (newImportance <= 0.25) {
            sensor.addClass('interestItem25');
        }
        else if (newImportance <= 0.50) {
            sensor.addClass('interestItem50');                    
        }
        else if (newImportance <= 0.75) {
            sensor.addClass('interestItem75');                    
        }
        else {
            sensor.addClass('interestItem100');                    
        }
		
        interestStrength[sensorID] = newImportance;
    }

    if (updateAll==true) {
        saveInterests();
        updateSelf();
    }
}

function newInterest(i) {
    return i;
}



var urlInterests = {};
var nextURLInterest = 0;
var interestElements = {};
//var selectedInterests = [];

function updateSelfUI() {
	$('#CurrentInterests').html('');
	
	if (focusedObject) {
		interests = focusedObject.type;
		interestStrength = { };
	}
	
	for (var l = 0; l < interests.length; l++) {		
		var ni = interests[l];
		
		var i = ni;
		if (ni.id)
			i = ni.id;
			
		if (focusedObject)
			if (focusedObject.typeStrength)
				interestStrength[i] = focusedObject.typeStrength[l]; 
		
	    var eid = i;
	    if (!types[i]) {
	    	console.log('Unknown type: ' + i);
	    	continue;
	    }
	    var ename = types[i].name;
	    
	    //use a sequential element ID instead of putting the URL in the element (which may contain invalid characters for jQuery selectors)
	    if (i.indexOf('http://')==0) {
	    	eid = 'URL'+nextURLInterest;
	    	nextURLInterest++;
	    }
	      
	    interestElements[i] = eid;
	      
	    eid = encodeInterestForElement(eid);
	    
		var ss = $('<div id="Interest-' + eid + '" class="InterestItem"></div>');
	    $('#CurrentInterests').append(ss);
	    
	    
	    /*ss.click(function() {
		    
	    	var s = ss.data('selected');
	    	s = !s;
	    	ss.data('selected', s);
	    	
	    	if (s) {
	    		ss.addClass('interestSelected');
	    		selectedInterests.push(i);
	    	}
	    	else {
	    		ss.removeClass('interestSelected');
	    		selectedInterests.splice(selectedInterests.indexOf(i),1);
	    	}
	    	
	    		
	    });*/


		var ic = $('<span id="InterestControl-' + eid + '"></span>');
    	var ice = '#InterestControl-' + eid;
	    ss.append(ic);
	    ss.append(ename);

			    
	    (function() {
		    ss.hover(function(){ $(this).children().first().fadeIn(200);}, function() { $(this).children().first().fadeOut(500);});	    
	    })();
	    ic.fadeOut(1000);
	    
	    ss.append($('<br>'));
	    
	    var pArea = $('<div class="PropertyArea"/>');

		if (types[i]!=undefined) {
			if (types[i].properties!=undefined)     {
				var pbuttons = $('<div class="TypePropertyButtons"/>');    	
		    	
		    	for (var pi in types[i].properties) {
		    		
		    		pp = types[i].properties[pi];
		    		b = $('<button title="'+ pi + '">' + pp.name + '</button>');
		    		pbuttons.append(b);
		    		
		    		(function() {
			    		var k = pArea;
			    		f = function() {
			    			var pid = $(this).attr('title');
			    			k.append(newPropertyEdit(i, pid));
			    		};
		    		})();
		    		
		    		b.click(f);
		    	}
		    	
		    	ss.append(pbuttons);
		   }
	    }

	    ss.append(pArea);
	    
	    //annotate the interest with extra controls and menus
	    if (i.indexOf('http://')==0) {
	    	var readButton = $('<button>Read</button>');
	    	readButton.click(function() {
	    		showCortexit(i);
	    	});
	    	ss.append(readButton);    
	    }
	    
	    //force redraw controls
	    setInterest(i, interestStrength[i], true, false);
	}    
	
}

function addInterest(i, force, update) {
    if (force!=true)
        if (interestStrength[i]!=undefined) //prevent adding duplicate
            return;

    var ni = newInterest(i);
    interests.push(ni);

    if (update == undefined)
        update = true;
        
    if (update)
    	updateSelfUI();

    setInterest(i, defaultInitialInterest, true, update);

    
}

function addURL() {
	var url = window.prompt("Webpage URL","http://");
	addInterest(url, true, true);
}

function removeInterest(i) {
	/*if (selectedInterests.indexOf(i)!=-1)
		selectedInterests.splice(selectedInterests.indexOf(i), 1);*/
	
    getInterestItem(i).fadeOut();
    delete interestStrength[i];
    
    
    for (var x = 0; x < interests.length; x++) {
    	if (interests[x] == i) {
    		interests.splice(x, 1);
    		break;
    	}
    }
    if (focusedObject)
    	focusedObject.type = interests;
    
    updateSelf();
    updateSelfUI();
}



function toggleProfile() {
    $('#Profile').toggle(500);
}

var cortexitID = 0;
function showCortexit(url) {
    socket.emit('getSentencized', url, function(s) {
    	var cid = 'cortexit-' + cortexitID;
    	var d = $('<div id="' + cid + '" style="position:fixed; height:90%; top: 3%; width: 90%; left: 5%;"></div>');
    	for (var i = 0; i < s.length; i++) {
    		d.append($('<p>' + s[i] + '</p>'));
    	}
    	$('body').append(d);
    	cortexit(cid, {
    		onClose: function() {
    			d.hide();
    		}
    	});
    	cortexitID++;
    });	
}

function getTypeLabel(t) {
	return t;
}

function getTypeProperties(t) {
	return [
		{ name: 'Property A' },
		{ name: 'Property B' }
	        ];
}

function initObjectEditor(ele, object) {
	var e = $('#' + ele);

	var name = object.name;
	
	$('<input class="nameInput" type="text" autofocus="true" placeholder="Title" value="' + name + '"></input>').appendTo(e);
	
	var typeMenu = $('<div data-role="navbar" class="typeMenu"></div>');
	
	var addTypeButton = $('<div data-role="collapsible" data-collapsed="true"><h3>+</h3></div>');
	addTypeButton.collapsible();
	addTypeButton.appendTo(typeMenu);
	
	{
		for (i = 0; i < object.types.length; i++) {
			var t = object.types[i];
			var m = $('<div data-role="collapsible" data-collapsed="true" class="typeCollapsible"></div>');
			$('<h3>' + getTypeLabel(t) + '</h3>').appendTo(m);
			
			var props = getTypeProperties(t);
			for (p = 0; p < props.length; p++) {						
				$('<p/>').html( $('<a/>').attr('href', '#').html(props[p].name)).appendTo(m);						
			}
			
			m.collapsible();
								
			m.appendTo(typeMenu);
			
		}
	}
	typeMenu.appendTo(e);
	
	var valueArea = $('<div class="valueArea"></div>');
	for (var j = 0; j < object.values.length; j++) {
		var v = object.values[j];
		var vs = JSON.stringify(v);
		var ivs = $('<input class="valueInput" type="text"/>');
		ivs.attr('value', vs);
		ivs.appendTo(valueArea);
	}
	valueArea.appendTo(e);
	
	var eBottom = $('<div class="eBottom"></div>');
	{
		var deleteButton = $('<a href="#" data-role="button" data-icon="delete" data-inline="true">Delete</a>');
		deleteButton.button();
		deleteButton.appendTo(eBottom);

		var updateButton = $('<a href="#" data-role="button" data-icon="check" data-theme="b" data-inline="true" class="updateButton">Update</a>');
		updateButton.button();
		updateButton.appendTo(eBottom);
	}			
	eBottom.appendTo(e);
	
	$.mobile.changePage();
}

/*
function newObjectFromInterests() {
	$('#SelfContent').html('');
	
	initObjectEditor('SelfContent', {
		id: '[uuidhere]',
		types: selectedInterests,
		name: 'Untitled',
		values: []
	});
	
}*/