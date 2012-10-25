var sensorImportance = { };
var interests = []; //current set of interests
var sensorClient = { };
var sensorsInitted = false;
var connected = false;

var defaultInitialInterest = 25;

function loadInterests() {
    sensorImportance = Self.get('interests');
    if (sensorImportance == null) {
        sensorImportance = { };    
    }

    for (var k in sensorImportance) {
        var s = getInterestItem(k);
        var v = sensorImportance[k];


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

    $('#selfName').val( n );
}

function saveInterests() {
    var si = { };
    for (var k in sensorImportance) {
        var v = sensorImportance[k];
        if (v > 0) {
            si[k] = v;
        }
    }
    Self.set('interests', si);
}

function saveSelf() {
    var n = $('#selfName').val();
    Self.set("name", n);

    updateStatus();
}


function updateSelfUI() {
    var h = '';
    h = h + '<h1>' + Self.get('name') + '</h1>';

    h = h + '<a href="javascript:setLocation()">Geolocation</a>: ' + (Self.get('geolocation') == undefined ? 'Unknown' : Self.get('geolocation')) + '</h1>';
    
    //...
}

function getSelfSnapshot() {
    return {
        name: Self.get('name'),
        geolocation: Self.get('geolocation'),
        interests: Self.get('interests')
    };
}

function connectSelf() {
    socket.emit('connectSelf', Self.get('clientID'));
}
function updateSelf() {
    if (!connected) {
        connectSelf();
        connected = true;
    }
    socket.emit('updateSelf', getSelfSnapshot());
}

function getInterestItem(sensor) { return $('#Interest-' + sensor); }
function getInterestControls(sensor) { return $('#InterestControl-' + sensor); }

function setInterest(sensorID, newImportance, force, updateAll) {
    //console.log('sensor: ' + sensor + ' importance=' + newImportance);
    var oldImportance = sensorImportance[sensorID];
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
    
    //if (oldImportance == 0) {
        var ch = '<input title="Importance" type="range" value="' + newImportance + 
            '" min="0" max="100" step="25" alt="Importance" onChange="setInterest(\'' + sensorID + '\', this.value, false, true);" />';
        if (sensorClient[sensorID]!=undefined) {
            if (sensorClient[sensorID].getControlHTML!=undefined) {
                ch = ch + sensorClient[sensorID].getControlHTML();
            }
        }

        controls.show();
        controls.html(ch);
    //}

    if (newImportance == 0) {
        if (confirm('Remove ' + sensorID + ' ?')) {
            removeInterest(sensorID);
        }
        else {
            setInterest(sensorID, oldImportance, true, false);
        }
    }
    else {
        if (newImportance <= 25) {
            sensor.addClass('interestItem25');
        }
        else if (newImportance <= 50) {
            sensor.addClass('interestItem50');                    
        }
        else if (newImportance <= 75) {
            sensor.addClass('interestItem75');                    
        }
        else /*if (newImportance <= 100)*/ {
            sensor.addClass('interestItem100');                    
        }

        sensorImportance[sensorID] = newImportance;
    }

    if (updateAll==true) {
        saveInterests();
        updateSelf();
    }
}

function newInterest(i) {
    return {
        id: i,
        name: i
    };
}

function addInterest(i, force, update) {

    if (force!=true)
        if (sensorImportance[i]!=undefined) //prevent adding duplicate
            return;

    var ni = newInterest(i);
    interests.push(ni);

    $('#CurrentInterests').append(templatize("#interestTemplate", ni));


    var types = getProperties(i);
    if (types.length > 0) {
        
        var tm = '<ul class="sf-menu"><li><a href="#">[+]</a><ul>';
        for (var j = 0; j < types.length; j++) {
            tm += '<li><a href="#">' + types[j] + '</a></li>';
        }
        tm += '</ul></li></ul>';
        
        var r = $(tm);
        r.prependTo('#Interest-' + i);
        r.superfish();
        //$('#Interest-' + i + ' ul').superfish();
        //$('#Interest-' + i).append(tm);
        
    }
   


    if (update == undefined)
        update = true;
    
    setInterest(i, defaultInitialInterest, true, update);

}

function removeInterest(i) {
    getInterestItem(i).fadeOut();
    delete sensorImportance[i];
}

function initSelfUI() {
    applyTemplate("#presetTemplate", [

        //{ name: "1st World Civilization", desc: "The amenities and benefits of the world's most advanced societies." },                            
        { name: "Camping", desc: "Camping in nature, away from civilization." },                            
        //{ name: "3rd World Civilization", desc: "Developing regions must be ready to adapt to environmental problems." },                     
        { name: "Food", desc: "Edible and drinkable substances" },
        { name: "Disaster", desc: "When evacuation becomes a priority, avoid disaster with a set of minimal but critical concerns." },                            
        { name: "Wellness", desc: "Healthcare, hospital, pharmacies, etc..." }
    ], "#presetsSurvive" );    

    applyTemplate("#presetTemplate", [

        { name: "Fun", desc: "Entertainment and enjoyment" },           
        { name: "Explore", desc: "Discover something new" },           
        { name: "Adventure", desc: "Adventure, quest, or surprising opportunity" },
        { name: "Learn", desc: "Educational resources" },
        { name: "Relax", desc: "Chill out, do nothing, sleep" }
    ], "#presetsGrow" );

    applyTemplate("#presetTemplate", [

        { name: "Labor", desc: "Work and jobs that pay" },           
        { name: "Volunteer", desc: "Opportunities to contribute" },           
        { name: "Rescue", desc: "Help, liberate, or assist those in need or distress" },
        { name: "Meet", desc: "Meet new people" }

    ], "#presetsShare" );


    $('#EditMenu').append('<li><a href="#">Thing</a>' + loadTypeMenu(null, getSchemaRoots()) + '</li>');
    $('#EditMenu').superfish(); 

}
