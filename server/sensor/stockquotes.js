var http = require('http');

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

//TODO implement request-per-second parameter, bunch as many symbols together as possible per request
function GoogleStockBot(symbols, outputbuffer) {
	var that = RecurringProcess(5.0 * 60 * 1000, function() {
		get_quote(symbols, function(next) {
			outputbuffer.push(next);
		});
	});

	return that;
}
exports.GoogleStockBot = GoogleStockBot;

function get_quote(tickers, output) {
	var p_ticker = "";
	for (i = 0; i < tickers.length; i++) {
		p_ticker = p_ticker + tickers[i] + ',';
	}
	p_ticker = p_ticker.substring(0, p_ticker.length-1);
	
	http.get({
		host: 'www.google.com',
		port: 80,
		path: '/finance/info?client=ig&q=' + p_ticker
	}, function(response) {
		response.setEncoding('utf8');
		var data = "";

		response.on('data', function(chunk) {
			data += chunk;
		});

		response.on('end', function() {
			if(data.length > 0) {
				try {
					var data_object = JSON.parse(data.substring(3));
				} catch(e) {
					return;
				}

				for (var i = 0; i < data_object.length; i++) {
					var quote = {};
					quote.ticker = data_object[i].t;
					quote.exchange = data_object[i].e;
					quote.price = data_object[i].l_cur;
					quote.change = data_object[i].c;
					quote.change_percent = data_object[i].cp;
					quote.last_trade_time = data_object[i].lt;
					quote.dividend = data_object[i].div;
					quote.yield = data_object[i].yld;
					output(quote);
				}


				/*p_socket.emit('quote', PRETTY_PRINT_JSON ? JSON.stringify(quote, true, '\t') : JSON.stringify(quote));*/
			}
		});
	});
}

