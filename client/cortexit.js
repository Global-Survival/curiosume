function cortexitSetFrame(e, n) {
    //console.dir(e[0].id);
    //console.dir(e + ' p');
	var p = $('#' + e[0].id + ' p')[n];
	$('#' + e[0].id + ' .cortexitContent').html(p.innerHTML);
	
	//TODO store current frame in element data
	
}

function updateFont(c, deltaFontSize) {
	var minFontSize = 6;
	
    if (c == null)
        return;
    
    var oldSize = c.style.fontSize;
    //assumes that fontSize is already specified
    if (oldSize == undefined) {
    	oldSize = '12px';
    }
    oldSize = oldSize.substring(0, oldSize.length-2);
    oldSize = parseFloat(oldSize);
    var fontSize = parseFloat(oldSize) + deltaFontSize;
    if (fontSize < minFontSize) fontSize = minFontSize;
    
    c.style.fontSize = fontSize + "px"; 
    
    //TODO iterate and apply to child elements
    
//    var e = c.getElementsByTagName("a");
//    for (var i = 0; i < e.length; i++) {
//        e[i].style.fontSize = c.style.fontSize;
//    }        
        
}

function cortexit(elementID) {
	var defaultFontSize = 16;
	var fontSizeDelta = 4;
	
	var e = $('#' + elementID);
	e.addClass('cortexitWrap');
	
	var internalP = $('#' + elementID + ' p');
	internalP.addClass('pHidden');
	
	var content = $('<div class="cortexitContent" style="font-size: ' + defaultFontSize + 'px"></div>');
	content.appendTo(e);
	
	var m = $('<div class="cortexitMenu"></div>');
	
	var fontSizer = $('<span class="fontSizer">v^</span>');
	fontSizer.bind('mousewheel DOMMouseScroll', function(e, delta) {
		delta = delta || event.detail || event.wheelDelta;
		if (delta < 0)
			updateFont(content[0], -fontSizeDelta);
		else if (delta > 0)
			updateFont(content[0], fontSizeDelta);			
	});
	
	fontSizer.appendTo(m);
	
	$('<span class="prevFrame">&lt;-</span>').appendTo(m);
	$('<span class="cortexitMenuButton">*/*</span>').appendTo(m);
	$('<span class="prevFrame">-&gt;</span>').appendTo(m);
	
	m.appendTo(e);
	
	e.each(function () {
	    var s = $(this);
	    cortexitSetFrame(s, 0);
	});
}

