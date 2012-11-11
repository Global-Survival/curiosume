//load CSV exported from Mindmodel
//5 cols: source type, source name, statement, target type, target name

var csv = require('ya-csv');
var sensor = require('./sensor.js');

var MMCSV = function(path) {
	var s = sensor.Sensor('MMSCV_' + path, function() {

		var reader = csv.createCsvFileReader(path, {
		    'separator': ',',
		    'quote': '"',
		    'escape': '"',       
		    'comment': '',
		});

		reader.addListener('data', function(data) {
			function spaceToUnderscore(x) {
				return x.replace(/ /g, '_');
			}
			data[0] = spaceToUnderscore(data[0]);
			data[1] = spaceToUnderscore(data[1]);
			data[2] = spaceToUnderscore(data[2]);
			data[3] = spaceToUnderscore(data[3]);
			data[4] = spaceToUnderscore(data[4]);

			var srcID = data[0] + '.' + data[1];
			var targetID = data[3] + '.' + data[4];

			var o = {
				id: srcID,
				type: data[0],
				statement: [
					[ data[2], targetID ]
				]
			};
	
			s.out.push(o);
		});

	}, function() { 	});

	return s;
}

exports.MMCSV = MMCSV;
