function initNGEN(f) {
	//https://github.com/rgrove/lazyload/

	$.getScript('/lib/lazyload.js', function() {
		
		var scripts = [ 
		               	"http://code.jquery.com/ui/1.8.23/jquery-ui.min.js",
		                "/ngen/app.base.js", 
		                "/ngen/app.math.js", 
		                "/ngen/app.hid.js", 
		                "/ngen/app.renderer.js", 
		                "/ngen/app.entities.js", 
		                "/ngen/app.scheduler.js", 
		                "/ngen/app.world.js", 
		                "/ngen/app.springlayout.js", 
		                "/ngen/app.details.js", 
		                "/ngen/app.search.js", 
		                "/ngen/app.filter.js", 
		                "/ngen/app.runtime.js"	                
		                ];
		
		LazyLoad.js(scripts, f);
	});

}

var NGENrunningGraph = null;

function graphNGEN(g) {
	//if (runningGraph!=null)
		//app.runtime.stop();
		
	NGENrunningGraph = app.runtime.start(g);
	
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

