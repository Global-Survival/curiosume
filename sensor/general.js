var sensor = require('./sensor.js');

var generalTypes = [
	{ uri: 'general.Human', name: 'Human',		
		extends: [ 'general.Being' ],
		properties: {
		             'currentRole': { name: 'Current Role', type: 'text' },
		             'biography': { name: 'Biography', type: 'textarea' },            //{ uri: 'birthdate', name: 'Birthdate', type: 'date' },
		             'age': { name: 'Age', type: 'real' },
		             'male': { name: 'Male', type: 'boolean' },
		             'female': { name: 'Female', type: 'boolean' }		             
		},
	},
	{ uri: 'general.Event', name: 'Event'},
	{ uri: 'general.Geometry', name: 'Geometry',
		properties: {
		             'length': { name: 'Length (m)', type: 'real' },		            
		             'width': { name: 'Width (m)', type: 'real' },		            
		             'height': { name: 'Height (m)', type: 'real' },		            
		             'mass': { name: 'Mass (kg)', type: 'real' }		            
		}
	},
	{ uri: 'general.Action', name: 'Action',
		properties: {
            'active': { name: 'Active', type: 'boolean' },		            
		}
	},
	{ uri: 'general.Media', name: 'Media'}
];

sensor.addTypes(generalTypes);