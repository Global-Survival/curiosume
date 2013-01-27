function newPropertyView(self, vv) {
    var p = self.getProperty(vv.uri);
    if (p.type == 'object') {
        var o = self.object(vv.value) || { name: 'Unknown object: ' + vv.value };
        
        return ('<li>' + vv.uri + ': <a href="#">' + o.name + '</a></li>');
    }
    else {
    	return ('<li>' + vv.uri + ': ' + vv.value + '</li>');    
    }
}

function newPropertyEdit(p, v) {
    var propertyID = p.uri;
    
    var name = p.uri;
    if (v)
        name = v.name;
        
    var value = p.value;
    	
	if (!p || !v) {
		return $('<div>Unknown property: ' + propertyID + '</div>');
	}
    
    var type = v.type;
		
	var x = $('<div>').addClass('FocusSection');
	x.append(name + ':&nbsp;');
	
	var removeButton = $('<button class="PropertyRemoveButton"><i class="icon-remove"></i></button>');
	removeButton.click(function() {
		x.remove();
	});
	(function() {
        x.hover(function(){ removeButton.fadeIn(200);}, function() { removeButton.fadeOut(200);});	    
    })();
    removeButton.hide();
    
	x.data('property', propertyID);
	
	if (type == 'textarea') {
		if (!value)
			value = '';
		
		x.append('<br/>');
		var t = $('<textarea rows="3">' + value + '</textarea>');
		x.append(t);
		x.data('value', function(target) {
			return t.val();			
		});
	}
	else if (type == 'boolean') {
		var t = $('<input type="checkbox">');
		
		if (!value)
			value = true;
		
		t.attr('checked', value ? 'on' : undefined);
		x.append(t);
		x.data('value', function(target) {
			return t.attr('checked') == 'checked' ? true : false;
		});
	}    
    else if (type == 'real') {
    	if (!value) value = '';

        //http://stackoverflow.com/questions/8808590/html5-number-input-type-that-takes-only-integers
		var t = $('<input type="text" value="' + value + '">');    
		x.append(t);		
		x.data('value', function(target) {
			return parseFloat(t.val());
		});        
    }
    else if (type == 'integer') {
        if (!value) value = '';

		////http://stackoverflow.com/questions/8808590/html5-number-input-type-that-takes-only-integers
        var t = $('<input type="number" value="' + value + '">');    
		x.append(t);		
		x.data('value', function(target) {
			return parseInt(t.val());
		});                
    }
    else if (type == 'object') {
        var tt = $('<span></span>');
        var t = $('<input></input>');
        
        
        //TODO set initial value
        
        //http://jqueryui.com/autocomplete/#default
        //http://jqueryui.com/autocomplete/#categories
        var data = [ ];
        for (var k in window.self.objects()) {
            var v = window.self.object(k);
            if (value == k) {
                t.val(v.name);
                t.result = value;
            }

            data.push({
               value: k,
               label: v.name
            });
        }
        t.autocomplete({
            source: data,
            select: function( event, ui ) {
                t.result = ui.item.value;
                t.val(ui.item.label);
                /*
                $( "#project" ).val( ui.item.label );
                $( "#project-id" ).val( ui.item.value );
                $( "#project-description" ).html( ui.item.desc );
                $( "#project-icon" ).attr( "src", "images/" + ui.item.icon );
                */
         
                return false;
            }
        });
        
        //TODO handle specific tag restriction
        /*window.self.objectsWithTag(t) {
            
        }*/
        
        var mb = $('<button title="Find Object">...</button>');
        mb.click(function() {
           //TODO popup object browser 
        });
        
        tt.append(t);
        tt.append(mb);
        
        x.append(tt);
        
        x.data('value', function(target) {
           return t.result; //uri 
        });
    }
	else /*if (type == 'text')*/ {
		if (!value) value = '';

		var t = $('<input type="text" value="' + value + '">');    
		x.append(t);		
		x.data('value', function(target) {
			return t.val();			
		});
	}/*
    else {
        console.log('unknown property type: ' + type);
    }*/
	
    x.append(removeButton);
	
	return x;
}

