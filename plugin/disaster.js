/* 

http://www.inciweb.org/feeds/rss/incidents/
    <georss:point>35.951666666667 -111.96527777778</georss:point>
    <geo:lat>35.951666666667</geo:lat>
    <geo:long>-111.96527777778</geo:long>

http://cc.rsoe.hu/rss/rss.php

    <georss:where>
    <gml:Point>
    <gml:pos>-24.846565 134.648438</gml:pos>
    </gml:Point>
    </georss:where>

hisz.rsoe.hu/alertmap

	<link rel="alternate" type="application/rss+xml" title="RSOE EDIS - Realtime Disaster and Emergency Information in the World" href="http://feeds.feedburner.com/RsoeEdis-EmergencyAndDisasterInformation"/>
	<link rel="alternate" type="application/rss+xml" title="RSOE EDIS - Airplane Accident and Incident Monitor (USA/FAA)" href="http://feeds.feedburner.com/rsoeEdis-FaaAirplaneAccidentAndIncidentInformation"/>
	<link rel="alternate" type="application/rss+xml" title="RSOE EDIS - Epidemic and Biology Hazard Warning Message" href="http://feeds.feedburner.com/RsoeEdis-Ebhwm"/>
	<link rel="alternate" type="application/rss+xml" title="RSOE EDIS - Global Tropical Storm Monitoring" href="http://feeds.feedburner.com/RsoeEdis-TropicalStormInformations"/>
	<link rel="alternate" type="application/rss+xml" title="RSOE EDIS - UV Index in the USA" href="http://feeds.feedburner.com/RsoeEdis-UvIndexInTheUsa"/>
	<link rel="alternate" type="application/rss+xml" title="RSOE EDIS - Global Volcano Status" href="http://feeds.feedburner.com/RsoeEdis-VolcanoMonitoring"/>
	<link rel="alternate" type="application/rss+xml" title="RSOE EDIS - Preliminary Earthquake Report" href="http://feeds2.feedburner.com/RsoeEdis-EarthquakeReportM25"/>
	<link rel="alternate" type="application/rss+xml" title="RSOE EDIS - Tsunami Information" href="http://feeds2.feedburner.com/RsoeEdis-TsunamiInformation"/>

www.globalincidentmap.com
    markers.push({'latitude':33.511100,'longitude':36.306400,'eventtype':'General Terrorism News','country':'Syria','city':'Damascus','imagefilepath':'mapicons/general.gif'});


 */
var http = require('http');
var _ = require('underscore');


exports.plugin = {
        name: 'Disasters',	
		description: '',
		options: { },
        version: '1.0',
        author: 'http://netention.org',
        
		start: function(netention, util) { 
            http.get("http://www.globalincidentmap.com", function(res) {
                var pageData = "";
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                  pageData += chunk;
                });
            
                res.on('end', function(){
                  var linePrefix = "markers.push(";
                  var lines = _.filter( pageData.split("\n"), function(l) { return l.trim().indexOf(linePrefix) == 0; } );      
                  
                  var xx = [];
                  
                  for (var i = 0; i < lines.length; i++) {          
                      var l = lines[i].trim().substring(linePrefix.length);
                      l = l.substring(0, l.length-2);
                      l = l.replace(/\'/g, "\"");
                      l = JSON.parse(l);

                      var name = l.eventtype + ' ' + l.city + ', ' + l.country;
                      
                      var x = util.objNew(util.MD5(name + l.latitude + l.longitude), name);
                      util.objAddTag(x, 'Report');
                      util.objAddGeoLocation(x, l.latitude, l.longitude);
                      
                      xx.push(x);

                  }
                  netention.noticeAll(xx);
                  
                });  
              
            }).on('error', function(e) {
              console.log("Disaster loading Error: " + e.message);
            });
            
        },
        
		stop: function(netention) {
		}
};