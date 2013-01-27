/* a way of specifying human needs.  every item related to a human need directly or indirectly.
   the essential top-level interface to the 'global survival system' */

//http://p2pfoundation.net/NORA_Commons_Resource_Model
//    @ "was last modified on 19 January 2013, at 04:45."

var NeedsFocus = {
    
    start: function(self, target) {
        var nf = $('#NeedsFocus');
        nf.show();
        
        nf.html('');

        var t = { };
        
        /*
        Needs
        
        All Living Organisms These are needs that we must take care to meet not only for humans, but also for animals and plants (i.e., to make sure that animals and plants have the habitats they need where there is clean air and water, where food sources are there, and from which they can reach other habitats if needed, as in seasonal migrations).
            Clean AIR to breathe
            Clean WATER to drink, for cleanliness, for cooking and as habitat
            Sufficient and nutritious FOOD, appropriate to one’s cultural preferences and taste
            Being at HOME in the place where one lives
            MOBILITY to reach the places one needs to go, with appropriate modes of transportation
        
        Humans These are either strictly human needs, or needs that we share with animals and plants but that are typically provided for if their needs for habitat are satisfied.
            SECURITY from bodily, emotional, and mental harm; this includes security when one cannot take
        
        Care of oneself (e.g., in infancy and childhood, in old age, or due to illness or disability)
            CLOTHING appropriate to one’s cultural and individual preferences, and the climate
            SHELTER/HOUSING appropriate to one’s cultural and individual preferences, and the climate
            Physical and mental HEALTH, and access to appropriate care in the case of illness or disability
            Supportive RELATIONSHIPS with other people, relationships that empower, that contribute to a
        
        gain in personal energy rather than an energy drain
            Access to EDUCATION appropriate to one’s aspirations and life goals
            A MEANINGFUL LIVELIHOOD that allows one to meet one’s other needs
            Participation in collective economic and political DECISION-MAKING
            Having enough time to RELAX,
            to THINK, 
            to IMAGINE, 
            to ENJOY life,
            to PLAY, 
            to BE ALONE
            SPIRITUAL connection with one’s deeper self and with a transcendent unity
            
            A freely chosen life direction
        */
        
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
        nf.append(newTagSliders(
            self,
            [ '3DPrinter', 'SCENAR' ]
        , t, setFocusWithTagSliderResult));
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
        /*
        Amartya Sen's “The Five Freedoms”:
            (1) political freedoms,
            (2) economic facilities,
            (3) social opportunities,
            (4) transparency guarantees
            (5) protective security */

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

