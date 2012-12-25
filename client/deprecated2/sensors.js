function setSensorClientKML(id, kmlPath) {
    
    setSensorClient(id, {
        
        load: function() { },

        //CLIENT called when de-activated, in case there is opportunity to free memory using JS "delete" operator
        unload: function() { },

        /*CLIENT adjust result vector for the conditions calculated at a certain geopoint according to hueristics defined by option variables
        result vector includes any markers or labels to be drawn on the map*/
        updateLocal: function(geopoint, result) { },

        //called when this sensor has > 0 importance    
        updateGlobal: function(onFinished) { 

            if (this.kml!=undefined) {
                this.kml.setOpacity(this.getOpacity());            
                addMapLayer(this.kml);
                onFinished();
                return;
            }

            var kml = new OpenLayers.Layer.Vector("KML", {
                strategies: [new OpenLayers.Strategy.Fixed()],
                protocol: new OpenLayers.Protocol.HTTP({
                    url: kmlPath,
                    format: new OpenLayers.Format.KML({
                        extractStyles: true, 
                        extractAttributes: true,
                        maxDepth: 2
                    })
                })
            });
            kml.setOpacity(this.getOpacity());        

            this.kml = kml;
            addMapLayer(kml);        
            
            onFinished();

        },

        getControlHTML : function() {
            return '';
        },

        getOpacity : function() {
            var i = parseFloat(sensorImportance[id]);
            if (i <= 25) {
                return 0.3;
            }
            else if ( i <= 50) {
                return 0.5;
            }
            else if ( i <= 75) {
                return 0.7;
            }
            else /*if (i == 100)*/ {
                return 0.9;
            }
        }
        
    });
    
}


var shelter = addSensorCategory('Shelter');
{
    addSensor(shelter, 'Bridges');
    addSensor(shelter, 'Homeless Shelters');
    addSensor(shelter, 'Hotels');
    addSensor(shelter, 'Campgrounds');
    addSensor(shelter, 'Couch Surfing'); //couchsurfing.org & bewelcome.org
    addSensor(shelter, 'Hostels');
    addSensor(shelter, 'Apartments and Sublets');
    addSensor(shelter, 'Real Estate');
    addSensor(shelter, 'Occupy');
}

var food = addSensorCategory('Food');
{
    addSensor(food, 'Grocery Stores');
    addSensor(food, 'Edible Vegetation');
    addSensor(food, 'Public Kitchens and Potlucks');
    addSensor(food, 'Community Gardens');
    addSensor(food, 'Soup Kitchen');
}

addSensorCategory('Supplies and Tools');

addSensorCategory('Healthcare');

var climate = addSensorCategory('Weather, Climate, & Geology');
{
    addSensor(climate, { 
        id: 'USGSEarthquake',
        name: 'USGS Earthquakes'
    });
    addSensor(climate, { 
        id: 'MODISFires',
        name: 'MODIS Fires'
    });
}

var pollution = addSensorCategory('Pollution');
{
    addSensor(pollution, {
        id: 'IAEANuclear',
        name: 'Nuclear Facilities'
    });
    addSensor(pollution, 'Superfund Sites');
}

addSensorCategory('Society & Community');
addSensorCategory('Transportation');
addSensorCategory('Communication');
addSensorCategory('Money');
addSensorCategory('Entertainment');
addSensorCategory('Freedom');
