//functions used by both client and server
if (typeof window != 'undefined')
	exports = { };

var createRingBuffer = function(length){

  var pointer = 0, buffer = [];
  
  var that = {
    get  : function(key){return buffer[key];},
    push : function(item){
      buffer[pointer] = item;
      pointer = (length + pointer +1) % length;
    }
  };
  
  that.pointer = pointer;
  that.buffer = buffer;
  
  return that;
  
};

exports.createRingBuffer = createRingBuffer;

function RecurringProcess(interval, runnable) {
	var that = {	};
	that.start = function() {
		that.interval = setInterval(function() {
			runnable();
		}, interval);
		runnable(); //run first
	};
	that.stop = function() {
		clearInterval(that.interval);
	};
	return that;
}
exports.RecurringProcess = RecurringProcess;

function OutputBuffer(interval, write /* limit */) {
	var that = RecurringProcess(interval, function() {
		var o = that.buffer.pop();
		if (o) {
			write(o);
		}	
	});
	that.buffer = [];
	that.write = write;
	that.push = function(o) {
		that.buffer.push(o);
	};
	/*that.pushAll = function(a) {
		for (i = 0; i < a.length; i++)
			push(a[i]);
	};*/
	
	return that;
}
exports.OutputBuffer = OutputBuffer;

function uuid() {
    return 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}
exports.uuid = uuid;

function getTypeArray(t) {
	if (typeof(t) == "array")
		return t;
	if (typeof(t) == "string")
		return [ t ];
	return [];
}
exports.getTypeArray = getTypeArray;