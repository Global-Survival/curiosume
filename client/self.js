function loadInterests() {
    sensorImportance = Self.get('interests');

    for (var k in sensorImportance) {
        var s = getSensorItem(k);
        var v = sensorImportance[k];

        if (s.children().length > 0) {

            if (v > 0) {
                s.children()[0].checked = true; //TODO move this into setInterest to occur when 'force=true'
                setInterest(k, v, true, false);
            }
            else {
                s.children()[0].checked = false; //TODO move this into setInterest to occur when 'force=true'
                setInterest(k, 0, true, false);
            }
        }
    }

    update();


}

function loadSelf() {
    var n = Self.get("name");
    if (n == undefined) {
        n = 'Anonymous';
        Self.set("name", n);
    }

    now.name = n;

    $('#selfName').val( n );
}

function saveInterests() {
    if (sensorsInitted) {
        var si = { };
        for (var k in sensorImportance) {
            var v = sensorImportance[k];
            if (v > 0) {
                si[k] = v;
            }
        }
        Self.set('interests', si);
    }
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