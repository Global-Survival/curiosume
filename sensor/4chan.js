var sensor = require('./sensor.js');

function add4ChanTopics(t) {
	var lt = [];
	for (var i = 0; i < t.length; i++) {
		var n = t[i];
		var tx = t[i].replace(/ /g, "_");
		lt.push({
			uuid: '4chan.' + tx,
			name: n
		});
	}
	sensor.addTypes(lt);
}

add4ChanTopics([ 'Video Games',
                 'Video Game Generals',
                'Comics & Cartoons',
                'Technology',
                'Television & Film',
                'Weapons',
                'Auto',
                'Animals & Nature',
                'Traditional Games',
                'Sports',
                'Science & Math',
                'International',
                'Computers',
                 ]);
	
//exports.initTypes = initTypes;
