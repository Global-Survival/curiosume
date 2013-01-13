/* a way of specifying human needs.  every item related to a human need directly or indirectly.
   the essential top-level interface to the 'global survival system' */
var NeedsFocus = {
    
    init: function(self, target) {
        $('#NeedsFocus').show();
        
        /*
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
        */
        
        /*
                  <ul class="mktree" id="tree1">
                            <li>Shelter
                                <ul>
                                    <li>Bridges</li>
                                    <li>Homeless Shelters</li>
                                    <li>Hotels</li>
                                    <li>Campgrounds</li>
                                    <li>CouchSurfing</li>
                                    <li>Hostels</li>
                                    <li>Apartments and Sublets</li>
                                    <li>Real Estate</li>
                                    <li>Occupy</li>
                                </ul>
                            </li>
                            <li>Food
                                <ul>
                                    <li>Groceries<br/>
                                        <input type="range"  min="0" max="100" />
                                    </li>
                                    <li>Edible Vegetation</li>
                                    <li>Public Kitchens and Potlucks</li>
                                    <li>Community Gardens</li>
                                </ul>
                            </li>
                            <li>Supplies and Tools</li>
                            <li>Healthcare</li>
                            <li>Weather, Climate, & Geology</li>
                            <li>Pollution
                                <ul>
                                    <li>Nuclear Facilities<br/>
                                        <input type="range"  min="0" max="100" />
                                    </li>
                                    <li>Superfund Sites</li>
                                </ul>
                            </li>
                            <li>Society & Community</li>
                            <li>Transportation</li>
                            <li>Communication</li>
                            <li>Money</li>
                            <li>Entertainment</li>
                            <li>Freedom</li>
                        </ul>*/
                        
                        /*
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
                        */
    },
    
    set: function(x) {
        
        
    },
    
    destroy: function(target) {
        $('#NeedsFocus').hide();
    },
    
    clear: function() {
    
    },
    
    get : function() {
//        var x = { };
//        var f = this.self.focus();
//        
//    
//        x.uri = f.uri;
//        x.tag = f.tag;
//        x.tagStrength = f.tagStrength;
//                        
//        if (!x.author)
//            x.author = this.self.get('clientID');
//        x.when = Date.now();
//        
//        x.name = $('#FocusName').val();
//        
//        var fdv = $('#FocusDescription').val();
//        if (fdv.length > 0)
//            x.text = fdv;
//        
//        x.values = [];
//        
//        var pe = this.propertyEdits;
//        for (var p = 0; p < pe.length; p++) {
//            var px = pe[p];
//            x.values.push( { uri: px.data('property'), value: px.data('value')() } );
//        }
//        
//        if (this.focusMap) {
//            var r = this.focusMap.location();    
//            x.geolocation = [ r.lat, r.lon ];
//        }
//        
//        return x;

        return { };
        
    }
};

