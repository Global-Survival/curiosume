var Ga = 1e9; // 1 Gigaannum

var pos;

var vc;
var ax;

var root;
var controller;

var interruptedIds = [];
var completedIds = [];

var isAxisFreezed = true;

var zoomHandled = false;
var panHandled = false;
var pinHandled = false;
var offset = { "xOffset": 0, "yOffset": 0 };
var scale = { "xOrigin": 0, "yOrigin": 0, "scaleFactor": 0 };
var maxPermitedVerticalRange = { top: -10 * Ga, bottom: 10 * Ga };
var maxPermitedScale = 1500000;

function initCZ(f) {
	$.getScript('/lib/lazyload.js', function() {
		
		var scripts = [ 
		               "/chronozoom/Scripts/rx.js",
		               "/chronozoom/Scripts/rx.jQuery.js",
		               
		               "/chronozoom/Scripts/axis.js",
		               "/chronozoom/Scripts/common.js",
		               "/chronozoom/Scripts/cz.settings.js",
		               "/chronozoom/Scripts/vccontent.js",
		               "/chronozoom/Scripts/viewport.js",
		               "/chronozoom/Scripts/virtualCanvas.js",
		               "/chronozoom/Scripts/mouseWheelPlugin.js",
		               "/chronozoom/Scripts/gestures.js",
		               "/chronozoom/Scripts/viewportAnimation.js",
		               "/chronozoom/Scripts/viewportController.js"
		               
		];
		
		LazyLoad.js(scripts, f);
	});
	
}


function graphCZ(axisElement, canvasElement, init) {
    /*
    pos = $("#pos");
    pos.css("position", "absolute");
    pos.css("top", (($(window).height() - pos.outerHeight()) / 2) + $(window).scrollTop() + "px");
    pos.css("left", (($(window).width() - pos.outerWidth()) / 2) + $(window).scrollLeft() + "px");
    */

	
    ax = $("#" + axisElement);
    ax.axis();

    vc = $("#" + canvasElement);
    vc.virtualCanvas();

    root = vc.virtualCanvas("getLayerContent");

    // Gesture stream for zoom by double click.
    vc.mousewheel(function (objEvent, intDelta) {
        var event = jQuery.Event("xbrowserwheel");
        event.delta = intDelta;
        event.origin = getXBrowserMouseOrigin(vc, objEvent);
        vc.trigger(event);
    });

    var mouseWheel = vc.toObservable("xbrowserwheel");

    var mouseWheels = mouseWheel.Zip(mouseWheel, function (arg) {
        return new ZoomGesture(arg.origin.x, arg.origin.y, arg.delta > 0 ? 1 / zoomLevelFactor : zoomLevelFactor);
    });

    var mousedblclick = vc.toObservable("dblclick");

    var mousedblclicks = mousedblclick.Zip(mousedblclick, function (event) {
        var origin = getXBrowserMouseOrigin(vc, event);
        return new ZoomGesture(origin.x, origin.y, 1 / zoomLevelFactor);
    });

    var panController = createPanSubject(vc);
    var pinController = createPinSubject(vc);
    var zoomController = mouseWheels.Merge(mousedblclicks);

    var newGesturesStream = pinController.Merge(panController.Merge(zoomController));

    newGesturesStream.Subscribe(function (gesture) {
        switch (gesture.Type) {
            case "Zoom":
                zoomHandled = true;
                scale.xOrigin = gesture.xOrigin;
                scale.yOrigin = gesture.yOrigin;
                scale.scaleFactor = gesture.scaleFactor;
                break;
            case "Pan":
                panHandled = true;
                offset.xOffset += gesture.xOffset;
                offset.yOffset += gesture.yOffset;
                break;
            case "Pin": pinHandled = true;
        }
    });

    controller = new ViewportController(
                        function (visible) {
                            vc.virtualCanvas("setVisible", visible, controller.activeAnimation);
                            if (isAxisFreezed) updateAxis();
                        },
                        function () {
                            return vc.virtualCanvas("getViewport");
                        },
                        newGesturesStream);

    controller.onAnimationComplete.push(
                        function (id)
                        { completedIds.push(id) }
    );

    controller.onAnimationUpdated.push(
                        function (oldId, newId) {
                            interruptedIds.push({ o: oldId, n: newId });
                        }
    );


    root.beginEdit();
    
    var limits = init(root); //new VisibleRegion2d(-7 * Ga, 0 * Ga, 0.13 * Ga / vc.get(0).clientWidth)
    
    console.dir(limits);
    
    /*if (limits[1] - limits[0] > 1.0/365.0) {
    	limits[1] = limits[0] + 1.0/365.0;
    }*/
    var yearSpan = Math.abs(limits[1]-limits[0]);
    var heightSpan = limits[2];

    
    var margin = 0.055;
	var bounds = new VisibleRegion2d(-limits[0]-margin, -limits[1], Math.max(0.5, yearSpan) / 1024.0);
    vc.virtualCanvas("setVisible", bounds);
    root.endEdit(true);

    updateLayout();
}

$(window).bind('resize', function () {
    updateLayout();
});

function updateLayout() {
	if (vc) {
	    vc.virtualCanvas("updateViewport");
	    updateAxis();
	}
}

function updateAxis() {
    ax.axis("updateWidth");
    var vp = vc.virtualCanvas("getViewport");
    var lt = vp.pointScreenToVirtual(0, 0);
    var rb = vp.pointScreenToVirtual(vp.width, vp.height);
    ax.axis("setRange", lt.x, rb.x);
}

function setZoomIn() {
    window.zoomLevelFactor = 1.4;
}

function setZoomOut() {
    window.zoomLevelFactor = 0.67;
}
