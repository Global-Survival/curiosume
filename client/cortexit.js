function cortexitSetFrame(ee, n) {
    //console.dir(e[0].id);
    //console.dir(e + ' p');
	var e = ee[0];
	var pp = $('#' + e.id + ' p');
	var num = pp.length;
	var p = pp[n];
	$('#' + e.id + ' .cortexitContent').html(p.innerHTML);
	
	ee.data('frame', n);
	ee.data('numFrames', num);
}

function cortexitSetNextFrame(e, deltaFrames) {
	var currentFrame = e.data('frame');
	var numFrames = e.data('numFrames');
	
	var nextFrame = currentFrame + deltaFrames;
	if (nextFrame < 0) nextFrame = 0;
	if (nextFrame > numFrames-1) nextFrame = numFrames-1;
	
	if (currentFrame!=nextFrame) {
		cortexitSetFrame(e, nextFrame);
	}
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

function onScroll(element, s) {
	element.bind('mousewheel DOMMouseScroll', function(e, delta) {
		delta = delta || event.detail || event.wheelDelta;
		s(delta);		
	});
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
	onScroll(fontSizer, function(delta) {
		if (delta < 0)
			updateFont(content[0], -fontSizeDelta);
		else if (delta > 0)
			updateFont(content[0], +fontSizeDelta);					
	});	
	fontSizer.appendTo(m);
	
	$('<span class="prevFrame">&lt;-</span>').appendTo(m);	
	var button = $('<span class="cortexitMenuButton">*/*</span>');
	onScroll(button, function(delta) {
		if (delta < 0)
			cortexitSetNextFrame(e, -1);
		else if (delta > 0)
			cortexitSetNextFrame(e, +1);							
	});
	button.appendTo(m);
	
	$('<span class="prevFrame">-&gt;</span>').appendTo(m);
	
	m.appendTo(e);
	
	/*
	e.each(function () {
	    var s = $(this);
	    cortexitSetFrame(s, 0);
	});*/
	cortexitSetFrame(e, 0);
}

