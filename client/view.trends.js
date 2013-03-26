function renderTrends(s, o, v) {
    var aa = s.get('attention');
                    
    //total objects
    v.append('Known objects: ' + _.size(aa));
    
    v.append('<br/><br/>');
    
    var xu = uuid();
    var xx = $('<div></div>').attr('id', xu);
    v.append(xx);
        
    var serverTagCount = { };
    var localTagCount = s.getTagCount();
    var selfTagCount = s.getTagCount(true);
    
    var labels = [];
	var values = [];
    
    function display() {
        var tags = _.union(_.keys(serverTagCount), _.keys(localTagCount), _.keys(selfTagCount));
        
        for (var k = 0; k < tags.length; k++) {
            var ti = tags[k];
            
            var name = ti;
            var t = s.tag(ti);
            
            if (t!=undefined)
                name = t.name;
            else
                name = ti;                
            
            var d = $('<div/>');
            var url = '#/tag/' + ti;            
            //var fs = 3.0 + Math.log(1+tagCount[k])*0.2;            
            //var ab = $('<a href="' + url + '" style="font-size:' + (100.0 * fs) +'%">' + name + '</a>');
            
            var ab;
            
            if (t!=undefined)
                ab = newTagButton(t);
            else
                ab = $('<a href="' + url + '">' + name + '</a>');
                
            ab.click(function() {
                s.set('currentView', 'list');
                Backbone.history.navigate(url, true);  
            });
            
            d.append(ab);
            d.addClass('trendTagLabel');
            v.append(d);
            
            var f = $('<div>' + _n(selfTagCount[ti]) + '</div>' );
            f.addClass('trendTagCount');
            v.append(f);

            var e = $('<div>' + _n(localTagCount[ti]) + '</div>' );
            e.addClass('trendTagCount');
            v.append(e);            
            
            var g = $('<div>' + _n(serverTagCount[ti]) + '</div>' );
            g.addClass('trendTagCount');
            v.append(g);
            
            v.append('<br/>');
            
    	}
        
    }
    
    s.getServerAttention(function(r) {
        serverTagCount = r;
        display();
    });
       
}
