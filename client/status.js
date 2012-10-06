var statusInitted = false;

function updateStatus() {
    var s = $('#statusHeader');

    if (!statusInitted) {
        var h = '';
        h = h + '<div id="statusHeaderLeft">'
            h = h + '<h1>' + Self.name + '</h1>';

            h = h + '<a href="javascript:setLocation()">Geolocation</a>: ' + (Self.geolocation == undefined ? 'Unknown' : Self.geolocation) + '</h1>';

        h = h + '</div>';

        h = h + '<div id="statusHeaderRight">'
            h = h + '<div id="statusMap"></div>'
            
        h = h + '</div>';    
        h = h + '<div style="clear: both"></div>'


        h = h + '<ul id="statusSensors">';
        h = h + '</ul>';
        
        statusInitted = true;
        
        s.html(h);

        initMiniMap('statusMap');
        
    }
    
    var ss = $('#statusSensors');

    ss.html('');
    
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
               
               ss.append('<li>' + x + '</li>');
               sensorsListed++;
           }
       } 
    }
    if (sensorsListed == 0) {
        ss.append('<div class="inlineAlert">No sensors are activated.  You can also select a preset to activate a set of related sensors.</div>');
    }
    
}
