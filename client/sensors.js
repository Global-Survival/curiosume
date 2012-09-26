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
}

var pollution = addSensorCategory('Pollution');
{
    addSensor(pollution, 'Nuclear Facilities');
    addSensor(pollution, 'Superfund Sites');
}

addSensorCategory('Society & Community');
addSensorCategory('Transportation');
addSensorCategory('Communication');
addSensorCategory('Money');
addSensorCategory('Entertainment');
addSensorCategory('Freedom');
