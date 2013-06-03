function renderGrid(s, o, v) {
    //var vv = newDiv();
    //v.append(vv);
    
    renderItems(s, o, v, 75, function(s, v, xxrr) {
        var elements = [];
        for (var i = 0; i < xxrr.length; i++) {
            var x = xxrr[i][0];
            var r = xxrr[i][1];
            var o = renderObjectSummary(x, function() {
            }, r, 1);
            o.addClass('objectGridItem');
            elements.push(o);
        }
        v.append(elements);
    });

    //http://masonry.desandro.com/docs/intro.html
    /*$(function() {
        vv.imagesLoaded(function(){
            vv.masonry({
                // options
                itemSelector: '.objectView',
                columnWidth: 350
            });//.masonry('reload');
        });
    });*/

    $('body').timeago('refresh');
}