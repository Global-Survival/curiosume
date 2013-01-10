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
    
    var tagCount = { };
    
    for (var ai in aa) {
        var t = aa[ai].tag;
        if (!t)                 continue;
        if (!Array.isArray(t))  continue;
        
        for (var i = 0; i < t.length; i++) {
            var tt = t[i];
            if (!tagCount[tt])
                tagCount[tt] = 0;
            tagCount[tt] = tagCount[tt] + 1.0; //TODO add the normalized tag strength
        }
    }
    
    var labels = [];
	var values = [];
	for (k in tagCount) {
		labels.push(k + '(' + tagCount[k] + ')');
		values.push(Math.log(tagCount[k]));
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
