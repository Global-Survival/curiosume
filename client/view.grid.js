function renderGrid(s, o, v) {
    renderItems(s, o, v, 75, function(s, v, xxrr) {
        for (var i = 0; i < xxrr.length; i++) {
            var x = xxrr[i][0];
            var r = xxrr[i][1];
            var o = renderObjectSummary(s, x, function() { }, r, 1 );
            o.addClass('objectGridItem');
            v.append(o);
        }
    });
    
    $('body').timeago('refresh');
}