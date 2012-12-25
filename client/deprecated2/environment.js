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
               
               c.updateLocal(Self.get("geolocation"), r);
               
               var x = '<div class="sensorReport"><div class="sensorTitle">' + k + '</div>';
               
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
               x = x + '</div>';
               
               ss.append(x);
               sensorsListed++;
           }
       } 
    }
    if (sensorsListed == 0) {
        ss.append('<div class="inlineAlert">No sensors are activated.  You can also select a preset to activate a set of related sensors.</div>');
    }
    
}
