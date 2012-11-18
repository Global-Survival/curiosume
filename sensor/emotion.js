var sensor = require('./sensor.js');

var emotionTypes = [
	{ uri: 'emotion.happy', name: 'Happy' },
	{ uri: 'emotion.afraid', name: 'Afraid'},
	{ uri: 'emotion.sad', name: 'Sad'},
	{ uri: 'emotion.angry', name: 'Angry'},
	{ uri: 'emotion.disgusted', name: 'Disgusted'},
	{ uri: 'emotion.trusting', name:'Trusting'},
	{ uri: 'emotion.anticipating', name: 'Anticipating'},
	{ uri: 'emotion.surprised', name:'Surprised'} 
];

sensor.addTypes(emotionTypes);