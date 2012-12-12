var sensor = require('./sensor.js');

var emotionTypes = [
	{ uri: 'emotion.happy', name: 'Happy' },
	{ uri: 'emotion.trusting', name:'Trusting'},
	{ uri: 'emotion.anticipating', name: 'Anticipating'},
	{ uri: 'emotion.surprised', name:'Surprised'}, 
	
    //[abstract NEGATIVE supertype]
	/*
	"NEGATIVE EVENT" CBT Questions that Can Be Stored as Properties
	 
	Help decide whether the meanings you give to a negative event cause disturbance by answering:

		Is the meaning I’m assigning to this event unduly extreme? 
		Am I exaggerating a simple event to derive harsh conclusions from it?
		Am I drawing global conclusions from this isolated event? 
		Am I deciding that this 1 event totally defines me? 
		Am I deciding that this specific situation affects my future?
		
		Does this meaning lead me to feel better or worse about myself? 
		Is it encouraging further goal-directed action or discouraging me to give up?

	If answers to these questions are largely ‘yes’, 
	then you probably are disturbing yourself unnecessarily about a negative event. 

	The situation may in fact be negative – but your thinking may be worsening it.
	*/	
	{ uri: 'emotion.afraid', name: 'Afraid'},
	{ uri: 'emotion.sad', name: 'Sad'},
	{ uri: 'emotion.angry', name: 'Angry'},
	{ uri: 'emotion.disgusted', name: 'Disgusted'}
	
];


sensor.addTypes(emotionTypes);