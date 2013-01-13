var EmotionFocus = {
    
    start: function(self, target) {
        $('#EmotionFocus').html('');
        $('#EmotionFocus').append('<img src="http://upload.wikimedia.org/wikipedia/commons/c/ce/Plutchik-wheel.svg"/>');
        
        function newTagSliders(tags, result, onChanged) {
            
            var x = $('<div></div>');
            for (var k = 0; k < tags.length; k++) {
                (function() {
                    var t = tags[k];
                    var tt = self.getTag(t);
                    var st = $('<div></div>');
                    st.slider({ 
                        min: 0, max: 1.0, step: 0.25, value: 0,
                        slide: function (event, ui) {
                            var v = ui.value;
                            if (v == 0)
                                delete result[t];
                            else
                                result[t] = v;
                            
                            onChanged(result);
                        }
                    });
                    x.append('<b>' + tt.name + '</b>');
                    x.append('<br/>');
                    x.append(st);
                })();
            }    
            return x;
        }
        
        var t = { };
        $('#EmotionFocus').append(newTagSliders( 
            [ 'emotion.happy', 'emotion.sad', 'emotion.trusting', 'emotion.anticipating', 
            'emotion.surprised', 'emotion.afraid', 'emotion.angry', 'emotion.disgusted' ]
        , t, function(result) {
            
            var f = {
                uri: uuid(),
                tag: [ ],
                tagStrength: [ ]
            };
            
            for (var rt in result) {
                var kt = result[rt];
                f.tag.push(rt);
                f.tagStrength.push(kt);
            }
            
            self.set('focus', f);
        }));
        
        $('#EmotionFocus').show();    
    },
    
    stop: function(target) {
        $('#EmotionFocus').hide();
    },
        
    set: function(x) {
            
    },
    
    clear: function() {
    
    },
    
    get : function() {
        return { };        
    }
    
};