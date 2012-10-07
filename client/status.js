function formatSensorValue(v) {
  var f = v - Math.floor(v);
  if (f == 0) {
      return v;
  }
  else {
      return v.toFixed(3);
  }
  
}
function updateStatus() {
    var s = $('#statusHeader');

    var h = '';
    h = h + '<h1>' + Self.name + '</h1>';

    h = h + '<a href="javascript:setLocation()">Geolocation</a>: ' + (Self.geolocation == undefined ? 'Unknown' : Self.geolocation) + '</h1>';


    h = h + '<div style="clear: both"></div>'

    s.html(h);
    
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
               
               var x = '<div class="sensorTitle">' + k + '</div>';
               
               for (var kr in r) {
                   var kv = r[kr];
                   var rx;
                   
                   rx = '<div class="sensorLabel">' + kv.label;
                   if (kv.desc!=undefined) {
                       rx = rx + '<br/><span class="sensorDesc">' + kv.desc + '</span>';
                   }
                   rx = rx + '</div><div class="sensorValue">';
                   
                   
                   if (kv.value!=undefined) {
                       
                       rx = rx + formatSensorValue( kv.value );
                       
                       if (kv.unit!=undefined) {
                           rx = rx + ' ' + kv.unit;
                       }
                   }
                   
                   rx = rx + '</div>';
                   
                   x = x + rx;
               }
               
               ss.append(x);
               sensorsListed++;
           }
       } 
    }
    if (sensorsListed == 0) {
        ss.append('<div class="inlineAlert">No sensors are activated.  You can also select a preset to activate a set of related sensors.</div>');
    }
    
}
