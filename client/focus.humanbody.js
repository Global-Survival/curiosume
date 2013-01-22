var HumanbodyFocus = {
    
    start: function(self, target) {
        $('#HumanbodyFocus').show();    
        $('#HumanbodyFocus').append('<img style="width: 100%" src="http://upload.wikimedia.org/wikipedia/commons/6/68/Human_body_features.png"/>');

    },
    
    stop: function(target) {
        $('#HumanbodyFocus').hide();
    },
        
    set: function(x) {
            
    },
    
    clear: function() {
    
    },
    
    get : function() {
        return { };        
    }
    
};