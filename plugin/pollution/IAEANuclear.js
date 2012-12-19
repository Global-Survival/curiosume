var csv = require('../csv.js');


exports.sensor = {
    
    //parent "folder" in the taxonomy, separated by slashes, like "Society/Crime"
    id: function() { return 'IAEANuclear'; },
    
    //list of named variables, their types, initial values, and limits, to generate UI controls for adjusting those variables
    options: function() { 
        return { };
    },
    
    //SERVER to refresh the data in this cache, should be called at least once at the beginning
    refresh: function(sensor, onFinished, onError) { 
        var r = [];
        var i = this.id();
        
        //TODO use relative URL or open from file
        csv.parseCsvUrl('http://localhost:8080/sensor/pollution/IAEANuclear.csv', function(x) {
           
           var name = x['name'];
           var location = x['location'];
           
           var lat = parseFloat(location.split(',')[0]);
           var lon = parseFloat(location.split(',')[1]);
           
           var reactors = [ parseFloat(x['total number of reactors']), 
                            parseFloat(x['active reactors']), 
                            parseFloat(x['reactors under construction']),
                            parseFloat(x['shut down reactors']) ];

           var y = {
                'name': name,
                'lat': lat,
                'lon': lon,
                'reactors': reactors                
           };
           
           r.push( y );
           
           
        }, function() {
            sensor[i].nuclear = r;
            
            if (onFinished!=undefined)
                onFinished();
        });
    }
};
