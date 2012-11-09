//functions used by both client and server


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
	}
	that.stop = function() {
		clearInterval(that.interval);
	}
	return that;
}
exports.RecurringProcess = RecurringProcess;

function OutputBuffer(interval, write) {
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
	}

	return that;
}
exports.OutputBuffer = OutputBuffer;
