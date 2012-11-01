function cortexitSetFrame(e, n) {
    //console.dir(e[0].id);
    //console.dir(e + ' p');
	var p = $('#' + e[0].id + ' p')[n];
	$('#' + e[0].id + ' .cortexitContent').html(p.innerHTML);
	
}

function cortexit(es) {
	var e = $(es);
	e.addClass('cortexitWrap');
	
	var internalP = $(es + ' p');
	internalP.addClass('pHidden');
	
	$('<div class="cortexitContent"></div>').appendTo(e);
	$('<div class="cortexitMenu"><span class="fontSizer">v^</span><span class="prevFrame">&lt;-</span><span class="cortexitMenuButton">*/*</span><span class="prevFrame">-&gt;</span></div>').appendTo(e);

	e.each(function () {
	    var s = $(this);
	    cortexitSetFrame(s, 0);
	});
}

