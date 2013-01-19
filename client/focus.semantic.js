var SemanticFocus = {
    
    start: function(self, target) {
        this.self = self;
        
        $('#SemanticFocus').show();
        
        $('#ToggleDescriptionButton').click(function() {
            $('#FocusDescriptionSection').toggle();
            if ($('#FocusDescriptionSection').is(':visible')) {
                $('#FocusDescription').val(' '); //initialize as non-empty
    
                //reset rich text editor
                initDescriptionRichText();
            }
        });
        $('#ToggleLocationButton').click(function() {
            var x = self.focus();
            if (x.geolocation) {
                if (confirm('Remove geolocation?')) {
                    var f = getEditedFocus();
                    delete f.geolocation;
                    commitFocus(f);
                }
            }  
            else {
                var f = getEditedFocus();
                f.geolocation = [];
                commitFocus(f);
            }
        });
        
        $('#ToggleUploadButton').click(function() {
            $('#FocusUploadSection').toggle();
        });
        
        //file uploads
        {
            $('#FocusUploadSection').hide();
            
            var bar = $('.FocusUploadBar');
            var percent = $('.FocusUploadPercent');
            var status = $('#FocusUploadStatus');

            $('#FocusUploadForm').ajaxForm({
                beforeSend: function() {
                    status.empty();
                    var percentVal = '0%';
                    bar.width(percentVal)
                    percent.html(percentVal);
                },
                uploadProgress: function(event, position, total, percentComplete) {
                    var percentVal = percentComplete + '%';
                    bar.width(percentVal)
                    percent.html(percentVal);
                    //console.log(percentVal, position, total);
                },
                complete: function(xhr) {
                    var url = xhr.responseText;
                    status.html($('<a>File uploaded</a>').attr('href', url));
                }
            });
        }
        
        {
    		var msgs = [ 'I think', 'I feel', 'I wonder', 'I know', 'I want' ];
			            
			function updatePrompt() {
				var l = msgs[parseInt(Math.random() * msgs.length)];
				$('#FocusName').attr('placeholder', l + '...');					
			} 
            				
			setInterval(updatePrompt, 7000);
			updatePrompt();
        }

        function isValidKeyword(x) {
            if (x.length < 2) return false;
            if (x == 'and') return false;
            if (x == 'or') return false;
            return true;
        }
        
        function getKeywords(s) {
            return s.toLowerCase().replace(',',' ').replace('\.',' ').
                    replace('\/',' ').split(' ');
        }
        
        function updateTagSuggestions(t) {
            t = getKeywords(t);
            
            var keywords = _.filter(t, isValidKeyword);
            
            var mt = $('#MatchedTypes');
            mt.html('');
            
            var matched = { };
            _.each(keywords, function(keyword) {
                var types = window.self.tags();
                
                function keywordMatchesTag(k, t) {
                    var name = types[t].name;
                    var desc = types[t].description;
                    if (desc) {
                        name = name + ' ' + desc;
                    }
                    var kk = getKeywords(name);
                    
                    return _.contains(kk, k);                            
                }
                
                for (var t in types) {
                    if (keywordMatchesTag(keyword, t)) {
                        matched[t] = true;
                    }
                }
                
            });
            
            for (var m in matched) {
                (function() {
                    var e = getEditedFocus();
                    if (hasTag(e, m))
                        return;
                        
                    var mx = window.self.getTag(m);
                    var mn = mx.name;
                    
                    var bb = $('<button>' + mn + '?</button>');
                    bb.click(function() {
                        commitFocus(addTag(e, mx.uri, 1.0));
                    });
                    mt.append(bb);                        
                })();
            }
        }
        
        var throttledUTS = _.throttle(updateTagSuggestions, 700);
        
        $('#FocusName').keyup(function() {
            var t = $('#FocusName').val();
            throttledUTS(t);
        });
        
        
        {
            var tt = $('#TypeSelectModalTree');
            updateTypeTree(tt, function(s) {
                
                var e = getEditedFocus();
                for (var i = 0; i < s.length; i++) {
                    var m = s[i];
                    if (!hasTag(e, m))
                        e = addTag(e, m, 1.0);
                }
                commitFocus(e);

            });
        }

    },
    
    set: function(x) {
        
        if (!x) {
            x = { };
        }
        
        if (!x.uri)
            x.uri = uuid();
        
        if (!x.values)
            x.values  = [];
        
        if (!x.tag) {
            x.tag = [];
            x.tagStrength = [];
        }
                        
                        
        $('#FocusTypes').html('');
        $('#FocusName').val(x.name);
        $('#MatchedTypes').html('');

        
        if (x.text) {
            $('#FocusDescriptionSection').show();
            
            initDescriptionRichText();
            $('#FocusDescription').val(x.text);
        }
        else {
            $('#FocusDescriptionSection').hide();
        }
        
        
        if (x.geolocation) {
            $('#FocusMapSection').show();                    
            $('#focusMap').html('');
            this.focusMap = initLocationChooserMap('focusMap', x.geolocation);
        }
        else {
            $('#FocusMapSection').hide();
            $('#focusMap').html('');
            this.focusMap = null;
        }
        
        $('#FocusUploadSection').hide();
        
        if (x.tag.length == 0) {
            $('#FocusTypes').hide();
        }
        else {
            $('#FocusTypes').show();
            for (var k = 0; k < x.tag.length; k++) {
                var t = x.tag[k];
                var typeWidget = $('<span class="dropdown">');
                                
                var b = $('<a class="btn dropdown-toggle" data-toggle="dropdown" href="#">' + t + '</a>');
                typeWidget.append(b);
                
                var u = $('<ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">');
                typeWidget.append(u);


                var that = this;
                var tv = this.self.tags()[t];
                if (!tv)
                    tv = { };
                
                var pr = getProperties(tv); 
                var propertiesAdded = 0;
                for (var p=0; p < pr.length; p++) {
                    (function() {
                        var i = pr[p];
                        var pri = that.self.getProperty(i);
                        var name = i;
                        if (pri)
                            name = pri.name;
                        var a = $('<a href="#">' + name + '</a>');
                        a.click(function() { 
                            var f = getEditedFocus();
                            if (acceptsAnotherProperty(f, i)) {
                                commitFocus(addProperty(f, i));
                            }
                            
                        });
                        var l = $('<li/>'); l.append(a);
                        u.append(l);                        
                    })();
                    propertiesAdded++;   
                }
                
                if (propertiesAdded)
                    u.append('<br/>');
                    
                {
                    var si = $('<ul></ul>');
                    si.append('<button title="25%" style="background-color: rgba(100, 100, 100, 0.5)">&nbsp;</button>');
                    si.append('<button title="50%"style="background-color: rgba(150, 150, 150, 0.5)">&nbsp;</button>');
                    si.append('<button title="75%"style="background-color: rgba(200, 200, 200, 0.5)">&nbsp;</button>');
                    si.append('<button title="100%"style="background-color: rgba(250, 250, 250, 0.5)">&nbsp;</button>');
                    u.append(si);
                }
                
                (function() {
                    var kk = k;
                    var rb = $('<a href="#">Remove</a>');
                    rb.click(function() {
                        var f = that.self.focus();
                        commitFocus(removeTag(f, kk));
                    });
                    var rbi = $('<li/>'); rbi.append(rb);
                    u.append(rbi);
                }());
                (function() {
                    var kk = k;
                    var rb = $('<a href="/#/tag/' + k + '">Edit Tag</a>');
                    var rbi = $('<li/>'); rbi.append(rb);
                    u.append(rbi);
                }());
                
                
                $('#FocusTypes').append(typeWidget);
            }
            
        }
        
        $('#FocusProperties').html('');
        
        this.propertyEdits = [];
        if (x.values) {
            for (var k = 0; k < x.values.length; k++) {
                var pr = x.values[k];
                var pv = window.self.get('properties')[pr.uri];
                var pe = newPropertyEdit(pr, pv);
                this.propertyEdits.push(pe);
                $('#FocusProperties').append(pe);
            }
        }
        
    },
    
    stop: function(target) {
        $('#SemanticFocus').hide();
        
    },
    
    clear: function() {
    
    },
    
    get : function() {
        var x = { };
        var f = this.self.focus();
        
    
        x.uri = f.uri;
        x.tag = f.tag;
        x.tagStrength = f.tagStrength;
                        
        if (!x.author)
            x.author = this.self.get('clientID');
        x.when = Date.now();
        
        x.name = $('#FocusName').val();
        
        var fdv = $('#FocusDescription').val();
        if (fdv.length > 0)
            x.text = fdv;
        
        x.values = [];
        
        var pe = this.propertyEdits;
        for (var p = 0; p < pe.length; p++) {
            var px = pe[p];
            x.values.push( { uri: px.data('property'), value: px.data('value')() } );
        }
        
        if (this.focusMap) {
            var r = this.focusMap.location();    
            x.geolocation = [ r.lat, r.lon ];
        }
        
        return x;
        
    }
};

