function renderTrends(s, o, v) {
    var aa = s.get('attention');
                    
    //total objects
    v.append('Known objects: ' + _.size(aa));
    
    v.append('<br/><br/>');
    
    var xu = uuid();
    var xx = $('<div></div>').attr('id', xu);
    v.append(xx);
        
    var tagCount = s.getTagCount();
    
    var labels = [];
	var values = [];
    var table = [ ['Tag', 'log(Count)'] ];
    
	for (var k in tagCount) {
		//labels.push(k + '(' + tagCount[k] + ')');
		//values.push(Math.log(tagCount[k]));
        var t = s.tag(k);
        var name = k;
        if (t) 
            name = t.name;
            
        name = name + ' ' + tagCount[k];
            
        var url = '#/tag/' + k;
        
        var fs = 3.0 + Math.log(1+tagCount[k])*0.2;
        
        var ab = $('<a href="' + url + '" style="font-size:' + (100.0 * fs) +'%">' + name + '</a>');
        ab.click(function() {
            s.set('currentView', 'list');
            Backbone.history.navigate(url, true);  
        });
        v.append(ab);
        v.append('<br/>');
        
	}
       
}
