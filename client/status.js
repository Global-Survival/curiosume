function updateStatus() {
    var s = $('#statusHeader');

    var h = '';
    h = h + '<h1>' + Self.name + '</h1>';

    h = h + '<a href="javascript:setLocation()">Geolocation</a>: ' + (Self.geolocation == undefined ? 'Unknown' : Self.geolocation) + '</h1>';

    h = h + '<h2>Sensors</h2><ul>';

    var sensorsListed = 0;

    for (var k in sensorImportance) {
       var v = sensorImportance[k];

       if (v > 0) {
           var c = sensorClient[k];
           if (c != undefined) {
               var r = { };
               //c.updateGlobal(r);
               c.updateLocal(Self.geolocation, r);
               
               var x = k + '<ul>';
               
               for (var kr in r) {
                   var kv = r[kr];
                   var rx;
                   rx = kv.label;
                   if (kv.value!=undefined) {
                       rx = rx + ': ' + kv.value;
                       if (kv.unit!=undefined) {
                           rx = rx + ' ' + kv.unit;
                       }
                   }
                   x = x + '<li>' + rx + '</li>';
               }
               x = x + '</ul>';
               
               h += '<li>' + x + '</li>';
               sensorsListed++;
           }
       } 
    }
    h = h + '</ul>';
    if (sensorsListed == 0) {
        h = h + '<div class="inlineAlert">No sensors are activated.  Activate some sensors in the Goals menu.  You can also select a preset to activate a set of related sensors.</div>';
    }

    s.html(h);
}
