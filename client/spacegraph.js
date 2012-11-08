function initSpacegraph(f) {
	//https://github.com/rgrove/lazyload/

	$.getScript('/lib/lazyload.js', function() {
		
		var scripts = [ 
		               	"http://code.jquery.com/ui/1.8.23/jquery-ui.min.js",
		                "/zui/app.base.js", 
		                "/zui/app.math.js", 
		                "/zui/app.hid.js", 
		                "/zui/app.renderer.js", 
		                "/zui/app.entities.js", 
		                "/zui/app.scheduler.js", 
		                "/zui/app.world.js", 
		                "/zui/app.springlayout.js", 
		                "/zui/app.details.js", 
		                "/zui/app.search.js", 
		                "/zui/app.filter.js", 
		                "/zui/app.runtime.js"	                
		                ];
		
		LazyLoad.js(scripts, f);
	});

}


function graph2d(g) {
	//if (runningGraph!=null)
		//app.runtime.stop();
		
	runningGraph = app.runtime.start(g);
	
    window.addEventListener('mousewheel', function(event) {
   	 	var delta = 0;
        if (!event) /* For IE. */
                event = window.event;
        if (event.wheelDelta) { /* IE/Opera. */
                delta = event.wheelDelta/120;
        } else if (event.detail) { /** Mozilla case. */
                /** In Mozilla, sign of delta is different than in IE.
                 * Also, delta is multiple of 3.
                 */
                delta = -event.detail/3;
        }
        console.log('mousewheel', delta);
   }, false);
	

}

var runningGraph = null;


function graphEnformableTimeline(url, maxEvents) {
	
	$.getJSON(url, function(data) {
		var l = [];
		
		var minTime, maxTime;
		var ll = data.events.length;
		if (ll > maxEvents)
			ll = maxEvents;
		
		for (i = 0; i < ll; i++) {
			var e = data.events[i];
			var unixtime = Date.parse(e.start);
			e.startUnix = unixtime;
			
			if ((i == 0) || (unixtime < minTime))
				minTime = unixtime;
			if ((i == 0) || (unixtime > maxTime))
				maxTime = unixtime;					
		}
		
		
		
		for (i = 0; i < ll; i++) {
			var e = data.events[i];

			var t = 5 * ((e.startUnix - minTime) / (maxTime - minTime) - 0.5);
			
			var maxLength = 32;
			if (e.title.length > maxLength)
				e.title = e.title.substring(0, maxLength);
			
			var x = {
				id: e.start,
				label: e.title,
				type:1, 
				fixedX:t
			};
			
			l.push(x);
		}
		
		graph2d(l);
	});
	
}



