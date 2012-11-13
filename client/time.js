function yearsAgoUnixTime(now, then) {
	return (1.0 * (now - then)) / (1000.0 * 365.0 * 24.0 * 60.0 * 60.0);
}

							
function graphEnformableTimelineCZ(data, maxEvents, root) {
	var l = [];
	
	var minTime, maxTime;
	var ll = data.events.length;
	if (ll > maxEvents)
		ll = maxEvents;
	
	for (i = 0; i < ll; i++) {
		var e = data.events[i];
		
		function p(u) {
			if ((i == 0) || (unixtime < minTime))
				minTime = unixtime;
			if ((i == 0) || (unixtime > maxTime))
				maxTime = unixtime;					
			
		}
		
		var unixtime = Date.parse(e.start);
		p(unixtime);
		e.startUnix = unixtime;
		
		if (e.end) {
			var endunixtime = Date.parse(e.end);
			p(endunixtime);
			e.endUnix = endunixtime;
		}
		
	}
	
	
	var earliest, latest;

	var height = 0.001;
	var now = Date.now();
	
	for (i = 0; i < ll; i++) {
		
		function node(e, tt) {

			var t = 5 * ((tt - minTime) / (maxTime - minTime) - 0.5);

			var maxLength = 32;
			
			if (e.title.length > maxLength)
				e.title = e.title.substring(0, maxLength);
			
			e.age = yearsAgoUnixTime(now, tt);
			
			if ((earliest > e.age) || (i == 0)) earliest = e.age;
			if ((latest < e.age) || (i == 0)) latest = e.age;

			var x = {
				id: i +'' + e.start,
				label: e.title,
				type:1, 
				fixedX:t,
				age: e.age
			};
			
			l.push(x);
			
			return x;
		}

		var e = data.events[i];
		
		var a = node(e, e.startUnix);
		var age = a.age;
		
		var width;
		if (e.endUnix) {
			var b = node(e, e.endUnix);
			b['outs'] = [ {id : a.id, weight : 15}  ];
			width = Math.abs(b.age - a.age);
		}
		else {
			width = 0.05/365.0;			
		}
						
		var y = -1.7 + Math.random() * 0.02 - height;
		var x = -age;
		
		var layer = "layerContents";
		var ri = 'rec' + i;
		
		var text = e.title;
		
		addRectangle(root, layer, ri, x, y, width, height, { strokeStyle: 'white', lineWidth: 2, fillStyle: 'rgba(140,140,140,0.5)' });
		addText(root, layer, ri + '.text', x, y, y, height/4.0, text, { fillStyle:'white', fontName: 'Arial' }, width);
		
	}

	var maxHeight = 0.25/365.0;
	
	var limits = [ earliest, latest, maxHeight ];	
    
    return limits;
	
}

function graphEnformableTimeline(data, maxEvents) {
	var l = [];
	
	var minTime, maxTime;
	var ll = data.events.length;
	if (ll > maxEvents)
		ll = maxEvents;
	
	for (i = 0; i < ll; i++) {
		var e = data.events[i];
		
		function p(u) {
			if ((i == 0) || (unixtime < minTime))
				minTime = unixtime;
			if ((i == 0) || (unixtime > maxTime))
				maxTime = unixtime;					
			
		}
		
		var unixtime = Date.parse(e.start);
		p(unixtime);
		e.startUnix = unixtime;
		
		if (e.end) {
			var endunixtime = Date.parse(e.end);
			p(endunixtime);
			e.endUnix = endunixtime;
		}
		
	}
	
	
	
	for (i = 0; i < ll; i++) {
		
		function node(e, tt) {

			var t = 5 * ((tt - minTime) / (maxTime - minTime) - 0.5);

			var maxLength = 32;
			
			if (e.title.length > maxLength)
				e.title = e.title.substring(0, maxLength);
			
			var x = {
				id: i +'' + e.start,
				label: e.title,
				type:1, 
				fixedX:t
			};
			
			l.push(x);
			
			return x;
		}

		var e = data.events[i];
		
		var a = node(e, e.startUnix);
		
		if (e.endUnix) {
			var b = node(e, e.endUnix);
			b['outs'] = [ {id : a.id, weight : 15}  ]; 
		}
		
	}
	
	graphNGEN(l);
	
}


function graphEnformableTimelineURL(url, maxEvents) {	
	$.getJSON(url, function(data) {
		graphEnformableTimeline(data, maxEvents);
	});	
}
function graphEnformableTimelineURLCZ(url, maxEvents, root) {	
	$.getJSON(url, function(data) {
		graphEnformableTimelineCZ(data, maxEvents, root);
	});	
}
