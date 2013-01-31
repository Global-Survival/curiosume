var TeamFocus = {
    
    start: function(self, target) {
        var t = $('#TeamFocus');
        
        t.html('');
        
        var humans = self.objectURIsWithTag('Human');
        _.each(humans, function(x) {
            var y = self.object(x);
            if (y)
                newObjectView(self, y, null, 0, 0).appendTo(t); 
        });
        
        t.show();    

    },
    
    stop: function(target) {
        $('#TeamFocus').hide();
    },
        
    set: function(x) {
    
    },
    
    clear: function() {
    
    },
    
    get : function() {
        return { };        
    }
    
};
