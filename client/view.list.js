function getRelevant(sort, scope, semantic, s, o, maxItems) { 
    
    var now = Date.now();
    var location = s.myself().geolocation;
    
    var relevance = { };
    var focus = s.focus();
    
    for (var k in s.get('attention')) {
        
        var x = s.getObject(k);
        
        if (x.replyTo)
            continue;
        
        //scope prefilter
        if (scope == 'Mine') {
            if (x.author != s.id())
                continue;
        }
        else if (scope == 'Others') {
            if (x.author == s.id())
                continue;                            
        }
        
        //sort
        var r = 1.0;                        
        if (sort == 'Recent') {
            if (!x.when)
                continue;
            var ageSeconds = Math.abs(now - x.when) / 1000.0;
            //r = Math.exp(-ageSeconds/10000.0);
            r = 1.0 / (1.0 + ageSeconds / 60.0);
        }
        else if (sort == 'Near') {
            
            if (!location) {
                continue;
            }
            if (!x.geolocation) {
                continue;
            }
            
            var distance = geoDist(location, x.geolocation); //kilometers
            //r = Math.exp(-distance/10000.0);
            r = 1.0 / (1.0 + distance);
        }
        else if (sort == 'Spacetime') {
            if ((!location) || (!x.geolocation) || (!x.when)) {
                continue;
            }   
            var timeDistance = Math.abs(now - x.when) / 1000.0; //seconds
            var spaceDistance = geoDist(location, x.geolocation) * 1000.0; //meters
            //r = Math.exp(-(timeDistance + spaceDistance)/10000.0);            
            r = 1.0 / (1.0 + ((timeDistance/60.0) + spaceDistance));
        }
        
        if (semantic == 'Relevant') { 
            if (focus) {
                var m = getTagMatch(s.focus(), x);
                r *= m;
            }
            else
                r = 0;
        }
        
        if (r > 0) {                                    
            relevance[k] = r;
        }
    }
    
    var relevant = _.keys(relevance);
    relevant.sort(function(a, b) {
	    return relevance[b] - relevance[a];
	});
    
    if (relevant.length > maxItems) {
        o.prepend('<span>Too many: 1..' + maxItems + ' of ' + relevant.length + '</span>');
    }
    else {
        
    }
    return [ _.first(relevant, maxItems), relevance ];
}

function renderItems(s, o, v, maxItems, perItems) {
    var sort = s.get('list-sort') || 'Recent';
    var scope = s.get('list-scope') || 'Public';
    var semantic = s.get('list-semantic') || 'Any';
    
    var rr = getRelevant(sort, scope, semantic, s, o, maxItems);
    var relevant = rr[0];
    var relevance = rr[1];

    var xxrr = [];
    for (var x = 0; x < relevant.length; x++) {
        var xx = s.get('attention')[relevant[x]];                        
        var rr =  relevance[relevant[x]];
        xxrr.push([xx,rr]);
    }
    perItems(s, v, xxrr);
    
    var semanticFilter = $('<select><option>Any</option><option>Relevant</option></select>');
    semanticFilter.change(function() {
    	var v = $(this).val();
        s.set('list-semantic', v);
		updateView();
	});    
    semanticFilter.val(semantic);
	o.append(semanticFilter);
    
    var sortSelect = $('<select><option>Recent</option><option>Near</option><option>Spacetime</option></select>'); //<option>By Author</option>
	sortSelect.change(function() {
		var v = $(this).val();
        s.set('list-sort', v);
		updateView();
	});
    sortSelect.val(sort);
	o.append(sortSelect);
	
    /*
	var proxFilter = $('<select><option>Anywhere</option><option>Near 1km</option><option>Near 5km</option></select>');
	proxFilter.change(function() {
		requestUserSupport('Proximity Filter');
	});
	o.append(proxFilter);

	var timeFilter = $('<select><option>Anytime</option><option>Recent 1m</option><option>Recent 5m</option><option>Recent 30m</option><option>Recent 1h</option><option>Recent 24h</option></select>');
	timeFilter.change(function() {
		requestUserSupport('Time Filter');
	});
	o.append(timeFilter);
	*/
    
	var authorFilter = $('<select><option>Public</option><option>Mine</option><option>Others</option></select>');
	authorFilter.change(function() {
    	var v = $(this).val();
        s.set('list-scope', v);
		updateView();
	});
    authorFilter.val(scope);
	o.append(authorFilter);
    

}

function renderList(s, o, v) {
    renderItems(s, o, v, 75, function(s, v, xxrr) {
        for (var i = 0; i < xxrr.length; i++) {
            var x = xxrr[i][0];
            var r = xxrr[i][1];
            v.append(newObjectView(s, x, function() { }, r, 1 ));
        }
    });
    
    $('body').timeago('refresh');
}