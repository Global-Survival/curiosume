//interfaces to ClimateViewer.com datasets
//  http://climateviewer.com/mobile/js/cv3d-lite-9001.js

exports.plugin = {
        name: 'Climate',    
		description: 'Climate and environment datasets provided by http://ClimateViewer.com',
		options: { },
        version: '1.0',
        author: 'http://ClimateViewer.com',
        
		start: function(netention) { 
            
            netention.addTags([
                {
                    uri: 'web.KML', name: 'KML Layer', properties: {
                        'kmlDisplay': { name: 'Display', type: 'boolean' },
                        'kmlURL': { name: 'URL', type: 'text', default: 'http://' }                        
                    }
                },
                
                //Climate Tags
                { uri: 'climate.Precipitation', name: 'Precipitation' },
                { uri: 'climate.Seismic', name: 'Seismicity' }, //earthquakes, etc.
                ///...
            ]);

            //Specific KML layers, with appropriate tags (see above)
            //  TODO add tags to classify each layer
            var a = {
                
                "Area0": 
                	{"url": "http://climateviewer.com/download/files/WXMOD-CV3D.kmz?9001",
            		"name": "Weather Modification | Geoengineering"},
            	"Area1": 
            		{"url": "http://climateviewer.com/download/files/Nuclear-Power-CV3D.kmz?9001",
            		"name": "Nuclear Power Plants"},
            	"Area2": 
            		{"url": "http://climateviewer.com/download/files/Nuclear-Warheads-Waste-CV3D.kmz?9001",
            		"name": "Nuclear Waste/Warheads"},
            	"Area3": 
            		{"url": "http://climateviewer.com/download/files/Nuclear-Test-Explosions-CV3D.kmz?9001",
            		"name": "Nuclear Test Explosions"},
            	"Area4": 
            		{"url": "http://climateviewer.com/download/files/DHS-Fusion-Centers-CV3D.kmz?9001",
            		"name": "DHS Fusion Centers"},
            	"Area5": 
            		{"url": "http://climateviewer.com/download/files/Drones-in-the-USA-SkyNET-by-CV3D.kmz?9001",
            		"name": "Drones in the USA"},
            	"Area6": 
            		{"url": "http://climateviewer.com/download/files/echelon-CV3D.kmz?9001",
            		"name": "ECHELON | AUSCANNZUKUS | FIVE EYES"},
            	"Area7": 
            		{"url": "http://climateviewer.com/download/files/HAARP-CV3D.kmz?9001",
            		"name": "HAARP | HF Active Auroral Research Program"},
            	"Area8": 
            		{"url": "http://climateviewer.com/download/files/HAARP-locations-worldwide-CV3D.kmz?9001",
            		"name": "Upper Atmospheric Radar | Ionospheric Heaters"},
            	"Area9": 
            		{"url": "http://climateviewer.com/download/files/Low-Frequency-Transmitters-CV3D.kmz?9001",
            		"name": "Low Frequency Transmitters"},
            	"Area10": 
            		{"url": "http://climateviewer.com/download/files/North-American-Doppler-Radar-CV3D.kmz?9001",
            		"name": "North American Doppler Radars"},
            	"Area 11": 
            		{"url": "http://climateviewer.com/download/files/Observatories-Arrays-CV3D.kmz?9001",
            		"name": "Observatories, Telescopes, Satellite Comms"},
            	"Area 12": 
            		{"url": "http://climateviewer.com/download/files/afscn-CV3D.kmz?9001",
            		"name": "USAF Satellite Control Network"},
            	"Area 13": 
            		{"url": "http://climateviewer.com/download/files/missile-defense-CV3D.kmz?9001",
            		"name": "Star Wars: Missile Defense Radars (SDI)"},
            	"Area 14": 
            		{"url": "http://climateviewer.com/download/files/directed-energy-CV3D.kmz?9001",
            		"name": "Directed Energy"},
            	"Area 15": 
            		{"url": "http://climateviewer.com/download/files/ilrs-lidar-CV3D.kmz?9001",
            		"name": "International Laser Ranging Service | LIDAR"},
            	"Area 16": 
            		{"url": "http://climateviewer.com/download/files/The-X-Files-CV3D.kmz?9001",
            		"name": "The X Files"},
            	"Area 17": 
            		{"url": "http://climateviewer.com/download/files/vlba-CV3D.kmz?9001",
            		"name": "The Very Long Baseline Array | VLBA"},
            	"Area 18": 
            		{"url": "http://climateviewer.com/download/files/lofar-CV3D.kmz?9001",
            		"name": "The Low Frequency Array | LOFAR"},
            	"Area 19": 
            		{"url": "http://climateviewer.com/download/files/evla-CV3D.kmz",
            		"name": "The Expanded Very Large Array | EVLA"},
            	"Area 20": 
            		{"url": "http://climateviewer.com/download/files/gmrt-CV3D.kmz?9001",
            		"name": "The Giant Metrewave Radio Telescope | GMRT"},
            	"Area26": 
            		{"url": "http://climateviewer.com/download/files/ESRL-Inventory-CV3D.kmz?9001",
            		"name": "NOAA ESRL Instruments"},
            	"Area27": 
            		{"url": "http://climateviewer.com/download/files/UHF-Doppler-Radars-CV3D.kmz?9001",
            		"name": "Wind Profiler Radars"},
            	"Area28": 
            		{"url": "http://climateviewer.com/download/files/BSRN-CV3D.kmz?9001",
            		"name": "Baseline Surface Radiation Network (BSRN)"},
                "Moar00": 
            		{"url": "http://climateviewer.com/download/files/Bayou-Corne-Louisanna-Sinkhole-CVmini.kmz?9001",
            		"name": "Bayou Corne, Louisiana Sinkhole"},
            	"Moar01": 
            		{"url": "http://climateviewer.com/download/files/fukushima/Fukushima-Daiichi-Meltdown.kmz?9001",
            		"name": "Fukushima Daiichi Nuclear Plant"},
            	"Moar02": 
            		{"url": "http://climateviewer.com/download/files/fukushima/Fukushima-Cesium-CVmini.kmz?9001",
            		"name": "Fukushima Cesium-137 Seawater Impact Map"},
            	"Moar03": 
            		{"url": "http://climateviewer.com/download/files/fukushima/Fukushima-Tsunami-CVmini.kmz?9001",
            		"name": "Fukushima Tsunami Debris Tracker"},
            	"USSRnuke": 
            		{"url": "http://climateviewer.com/download/files/Russian-Nuclear-Graveyard-CV3D.kmz?9001",
            		"name": "Russian Nuclear Graveyard"},
            	"Spillz": 
            		{"url": "http://earth.tryse.net/Oil_Spill.kmz?9001",
            		"name": "Black Tides â€“ the worst oil spills in history"},
            	"Coal01": 
            		{"url": "http://switchboard.nrdc.org/blogs/rperks/media/Coal_Ash_in_Ponds.kmz?9001",
            		"name": "Coal Ash Ponds"},
            	"Moar04": 
            		{"url": "http://mw2.google.com/mw-ocean/ocean/kml/dead/en/1/root.kmz?9001",
            		"name": "Nutrient Pollution in Coastal Waters"},
                "sat1": 
            		{"url": "http://ge.ssec.wisc.edu/modis/modis-google-earth/terra_latest.kml?9001",
            		"name": "WISC MODIS Visible"},
            	"sat2": 
            		{"url": "http://climateviewer.com/download/files/CombinedGlobalWaterVapor.kmz?9001",
            		"name": "Combined Global Water Vapor color"},
            	"sat3": 
            		{"url": "http://climateviewer.com/download/files/CombinedGlobalWaterVaporIR.kmz?9001",
            		"name": "Combined Global Water Vapor infrared"},
            	"sat4": 
            		{"url": "http://climateviewer.com/download/files/MIDUS-GOES-CONUS-CV3D.kmz?9001",
            		"name": "MIDUS GOES CONUS"}
            };
		},
            

		stop: function(netention) { 		}
};
