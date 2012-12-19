function yearsAgoUnixTime(now, then) {
	return (1.0 * (now - then)) / (1000.0 * 365.0 * 24.0 * 60.0 * 60.0);
}

							
function graphEnformableTimelineCZ(data, maxEvents, root) {
	var l = [];
	
	var minTime, maxTime;
	var ll = data.length;
	if (ll > maxEvents)
		ll = maxEvents;
	
	for (i = 0; i < ll; i++) {
		var e = data[i];
		
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
	
	

	var height;
	var now = Date.now();
	var earliest=now, latest=now;
	
	var boxes = [];
	
	for (i = 0; i < ll; i++) {
		
		function node(e, tt) {

			var t = 5 * ((tt - minTime) / (maxTime - minTime) - 0.5);

			//var maxLength = 32;
			
			//if (e.name.length > maxLength)
				//e.name= e.name.substring(0, maxLength);
			
			e.age = yearsAgoUnixTime(now, tt);
			
			if ((earliest > e.age) || (i == 0)) earliest = e.age;
			if ((latest < e.age) || (i == 0)) latest = e.age;

			var x = {
				id: i +'' + e.start,
				label: e.name,
				type:1, 
				fixedX:t,
				age: e.age
			};
			
			l.push(x);
			
			return x;
		}

		var e = data[i];
		
		var es = e.startUnix;
		if (!es) {
			es = e.when;
		}
		
		var a = node(e, es);
		var age = a.age;
		
		var width;
		var height = 0.001;
		var bg = 'rgba(128,128,128,0.5)';
		if (e.endUnix) {
			var b = node(e, e.endUnix);
			b['outs'] = [ {id : a.id, weight : 15}  ];
			width = Math.abs(b.age - a.age);
		}
		else {
			width = 0.1/365.0;	
			
			if (e.type == 'FinanceQuote') {
				width = 0.1/ 365.0;
				height = 0.0005;
				bg = 'orange';
			}
			else if (e.type == 'Message') {
				if (e.length!=undefined)
					width = 0.1 * Math.log(e.length) / 365.0;
				console.log(width);
				height = width;
				bg = 'purple';
			}
		}
						
		var y = -1.8-0.1+Math.random()*0.001; // + Math.random() * 0.02 - height;
		var x = -age;
		
		var ri = 'rec' + i;
		
		console.dir(e);
		
		var text = e.name || e.uri || e.title;
		
						
		boxes.push( {
			id: ri,
			x: x,
			y: y,
			width: width,
			height: height,
			text: text,
			bgcolor: bg
		});
		
	}

	var layer = "layerContents";
	function plot(id,x,y,width,height,text,bgcolor) {			
		addRectangle(root, layer, id, x, y, width, height, { strokeStyle: 'white', lineWidth: 1, fillStyle: bgcolor });
		addText(root, layer, id, x, y, y+height, height*0.25, text, { fillStyle:'white', fontName: 'Arial' } /*, width*/);		
	}

	var iterations = 150;
	var speed = 0.02;
	
	for (var i = 0; i < iterations; i++) {
		for (var b = 0; b < boxes.length; b++) {
			for (var c = 0; c < boxes.length; c++) {
				if (c==b) continue;

				//repulse
				var dx = boxes[b].x - boxes[c].x;
				var dy = boxes[b].y - boxes[c].y;
				var n = Math.sqrt((dx*dx)+(dy*dy));
				
				//TODO replace with algorithm: http://www.tinrocket.com/?p=616
				var maxDist = Math.max(boxes[b].width, boxes[b].height, boxes[c].width, boxes[c].height )/2.0;
				
				if (n>0) {
					if (n < maxDist) {
						dx *= speed/n; dy *= speed/n;
						
						//boxes[b].x += dx;
						//boxes[c].x -= dx;
						boxes[b].y += dy;
						boxes[c].y -= dy;
						
					}
				}
			}			
		}
	}
	
	for (var i = 0; i < boxes.length; i++)
		plot(boxes[i].id, boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height, boxes[i].text, boxes[i].bgcolor);

	console.dir(boxes);
	
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
		var e = data[i];
		
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

		var e = data[i];
		
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
