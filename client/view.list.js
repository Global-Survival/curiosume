function renderList(s, o, v) {
    
    var sort = s.get('list-sort') || 'Recent';
    var scope = s.get('list-scope') || 'Public';
    var semantic = s.get('list-semantic') || 'Any';
    
    var now = Date.now();
    var location = s.myself().geolocation;
    
    var relevance = { };
    var focus = s.focus();
    
    for (var k in s.get('attention')) {
        
        var x = s.getObject(k);
        
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
            var ageSeconds = (now - x.when) / 1000.0;
            r = Math.exp(-ageSeconds/1000.0);
        }
        else if (sort == 'Near') {
            
            if (!location) {
                continue;
            }
            if (!x.geolocation) {
                continue;
            }
            
            var distance = geoDist(location, x.geolocation);
            r = Math.exp(-distance/10000.0);
        }
        
        if (semantic == 'Relevant') { 
            if (focus) {
                var m = getTypeMatch(s.focus(), x);
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
    
    var MAX_DISPLAYED_LIST_ITEMS = 75;
    if (relevant.length > MAX_DISPLAYED_LIST_ITEMS) {
        o.prepend('<span>Too many: 1..' + MAX_DISPLAYED_LIST_ITEMS + ' of ' + relevant.length + '</span>');
    }
    else {
        
    }
    relevant = _.first(relevant, MAX_DISPLAYED_LIST_ITEMS);
    
    for (var x = 0; x < relevant.length; x++) {
        var xx = s.get('attention')[relevant[x]];                        
        var rr =  relevance[relevant[x]];
        v.append(newObjectView( s, xx , function() { }, rr ));                     
    }
    
    var semanticFilter = $('<select><option>Any</option><option>Relevant</option></select>');
	semanticFilter.change(function() {
    	var v = $(this).val();
        s.set('list-semantic', v);
		updateView();
	});
    semanticFilter.val(semantic);
	o.append(semanticFilter);
    
    var sortSelect = $('<select><option>Recent</option><option>Near</option></select>'); //<option>By Author</option>
	dataViewSort = 'By Relevance';
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
    
    $('body').timeago('refresh');


}