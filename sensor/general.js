var sensor = require('./sensor.js');

var generalTypes = [
	{ uri: 'general.Human', name: 'Human',
		properties: [
		             { uri: 'currentRole', name: 'Current Role', type: 'text' },
		             { uri: 'biography', name: 'Biography', type: 'textarea' },
		             //{ uri: 'birthdate', name: 'Birthdate', type: 'date' },
		             { uri: 'age', name: 'Age', type: 'real' },
		             { uri: 'male', name: 'Male', type: 'boolean' },
		             { uri: 'female', name: 'Female', type: 'boolean' }		             
		] },
	{ uri: 'general.Event', name: 'Event'},
	{ uri: 'general.Geometry', name: 'Geometry',
		properties: [
		             { uri: 'length', name: 'Length (m)', type: 'real' },		            
		             { uri: 'width', name: 'Width (m)', type: 'real' },		            
		             { uri: 'height', name: 'Height (m)', type: 'real' },		            
		             { uri: 'mass', name: 'Mass (kg)', type: 'real' }		            
		]}
];

sensor.addTypes(generalTypes);