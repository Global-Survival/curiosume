/* a way of specifying human needs.  every item related to a human need directly or indirectly.
   the essential top-level interface to the 'global survival system' */
var NeedsFocus = {
    
    start: function(self, target) {
        var nf = $('#NeedsFocus');
        nf.show();
        
        nf.html('');


        var t = { };
        
        
        nf.append('<h3>Shelter</h3>');
        nf.append(newTagSliders(
            self,
            [ 'Bridge', 'Homeless Shelter',  'Hotel', 'Camping', 'CouchSurf', 'Hostel', 'Apartment', 'RealEstate', 'Occupy' ]
        , t, setFocusWithTagSliderResult));
        
        nf.append('<h3>Food</h3>');
        nf.append(newTagSliders(
            self,
            [ 'GroceryStore', 'EdibleVegetation',  'PublicKitchen', 'CommunityGarden' ]
        , t, setFocusWithTagSliderResult));
        
        
        nf.append('<h3>Supplies and Tools</h3>');
        nf.append('<h3>Health</h3>');
        nf.append('<h3>Weather and Climate</h3>');
        nf.append(newTagSliders(
            self,
            [ 'Earthquake', 'Fire',  'Hurricane', 'Flood' ]
        , t, setFocusWithTagSliderResult));
        
        nf.append('<h3>Pollution</h3>');
        nf.append(newTagSliders(
            self,
            [ 'NuclearPlant', 'Superfund' ]
        , t, setFocusWithTagSliderResult));
                    

        nf.append('<h3>Society & Community</h3>');
        nf.append('<h3>Transportation</h3>');
        nf.append('<h3>Communication</h3>');
        nf.append('<h3>Money</h3>');
        nf.append('<h3>Entertainment</h3>');
        nf.append('<h3>Law and Freedom</h3>');

        nf.show();    
    
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
        
                        
    },
    
    set: function(x) {
        
        
    },
    
    stop: function(target) {
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

