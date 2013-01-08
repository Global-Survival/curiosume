function renderTrends(s, o, v) {
    var aa = s.get('attention');
                    
    //total objects
    v.append('Known objects: ' + _.size(aa));
    
    v.append('<br/><br/>');
    
    //tag distribution (bar chart)
    v.append('Tag Distribution: log(tag count)<br/>');
    
    var xu = uuid();
    var xx = $('<div></div>').attr('id', xu);
    v.append(xx);
    
    var typeCount = { };
    
    for (var ai in aa) {
        var t = aa[ai].type;
        if (!t)                 continue;
        if (!Array.isArray(t))  continue;
        
        for (var i = 0; i < t.length; i++) {
            var tt = t[i];
            if (!typeCount[tt])
                typeCount[tt] = 0;
            typeCount[tt] = typeCount[tt] + 1.0; //TODO add the normalized type strength
        }
    }
    
    var labels = [];
	var values = [];
	for (k in typeCount) {
		labels.push(k + '(' + typeCount[k] + ')');
		values.push(Math.log(typeCount[k]));
	}
	
	var plot2 = $.jqplot(xu, 						
       [values], {
       seriesDefaults: {renderer: $.jqplot.BarRenderer},
       series:[
        {pointLabels:{
           show: true,
           labels:labels
         }}],
       axes: {
         xaxis:{renderer:$.jqplot.CategoryAxisRenderer},
         yaxis:{padMax:1.3}}
    });                    
}
