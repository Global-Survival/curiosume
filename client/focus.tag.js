var TagFocus = {
    
    start: function(self, target) {
        var tf = $('#TagFocus');
        tf.show();    
        tf.html('');
                
        var t = self.getTagCount();
        for (var k in t) {
           var v = t[k];
           var tt = self.getTag(k);
           
           if (!tt)
                continue;
                
           var name = tt.name;
           
           var ttf = $('<div></div>');
           var percent = 100.0 * (1.0 + Math.log(v) * 0.05);
           ttf.css('font-size', percent + '%');
           
           var ak = $('<a href="/#/tag/' + k + '">' + name + '</a>');
           
           ttf.append(ak);
           ttf.append('(' + v + ')');
           
           tf.append(ttf);
           
           
        }
    },
    
    stop: function(target) {
        $('#TagFocus').hide();
    },
        
    set: function(x) {
            
    },
    
    clear: function() {
    
    },
    
    get : function() {
        return { };        
    }
    
};