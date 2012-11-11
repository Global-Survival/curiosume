/*
Sensor plugin
*/
var util = require('../client/util.js');

var Sensor = function(id, onStart, onStop) {
	var that = {
	    
	    id: function() { "" },
	    
	    //list of named variables, their types, initial values, and limits, to generate UI controls for adjusting those variables
	    options: function() { },
	    
	    //SERVER to refresh the data in this cache, should be called at least once at the beginning
	    refresh: function(onFinished, onError) { },    
	    
	    onStart: onStart,
	    onStop: onStop
		    
	};
	return that;
};

var PeriodicSensor = function(id, periodMS, run) {
	var that = Sensor(id, function() {
		console.log('Sensor ' + id + ' starting');
		that.proc = util.RecurringProcess(periodMS, run);
		that.proc.start();
	}, function() {
		if (that.proc) {
			console.log('Sensor ' + id + ' stopping');
			that.proc.stop();
			that.proc = null;
		}
	});
	return that;
};

var defaultBuffer;
function setDefaultBuffer(b) {
	defaultBuffer = b;
}

var sensors = [];
function addSensor(s, buffer) {
	sensors.push(s);
	
	if (!buffer)
		buffer = defaultBuffer;
	
	s.out = buffer;
	s.onStart();
}

exports.sensors = sensors;
exports.Sensor = Sensor;
exports.PeriodicSensor = PeriodicSensor;
exports.addSensor = addSensor;
exports.setDefaultBuffer = setDefaultBuffer;
