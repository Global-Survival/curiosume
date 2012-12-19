var sensor = require('./sensor.js');

var generalTypes = [
	{ uri: 'general.Human', name: 'Human',		
		extends: [ 'general.Being' ],
		properties: {
		             'currentRole': { name: 'Current Role', type: 'text' },
		             'biography': { name: 'Biography', type: 'textarea' },            //{ uri: 'birthdate', name: 'Birthdate', type: 'date' },
		             'age': { name: 'Age', type: 'real' },
		             'male': { name: 'Male', type: 'boolean' },
		             'female': { name: 'Female', type: 'boolean' },
		             'email': { name: 'E-Mail', type: 'text' }
		},
	},
	{ uri: 'general.Event', name: 'Event'}, //params: start, end, due by, rsvp by 
	{ uri: 'general.Geometry', name: 'Geometry',
		properties: {
		             'length': { name: 'Length (m)', type: 'real' },		            
		             'width': { name: 'Width (m)', type: 'real' },		            
		             'height': { name: 'Height (m)', type: 'real' },		            
		             'mass': { name: 'Mass (kg)', type: 'real' }		            
		}
	},
	{ uri: 'general.Money', name: 'Money',
		properties: {
					 //http://www.therichest.org/business/most-traded-currencies/
					 'moneyBTC': { name: 'Bitcoin (BTC)', type: 'real' },		            
		             'moneyUSD': { name: 'USD ($)', type: 'real' },		            
		             'moneyEUR': { name: 'EUR (€)', type: 'real' },		            
		             'moneyGold': { name: 'Gold (g)', type: 'real' },		            
		             'moneySilver': { name: 'Silver (g)', type: 'real' }	            
		}
	},
	{ uri: 'general.Transaction', name: 'Transaction',
		properties: {
					 //http://www.therichest.org/business/most-traded-currencies/
					 'transactionPaid': { name: 'Paid', type: 'boolean' },		            
					 'transactionDue': { name: 'Due', type: 'boolean' },		            
					 'transactionGratis': { name: 'Gratis', type: 'boolean' }		            
		}
	},
	{ uri: 'general.Action', name: 'Action',
		properties: {
            'active': { name: 'Active', type: 'boolean' },		            
		}
	},
	{ uri: 'general.Media', name: 'Media'}, //params: contentType
	{ uri: 'general.Goal', name: 'Goal'}, //=Project=Program=Action
	{ uri: 'general.User', name: 'User'}, 
	{ uri: 'general.Netention', name: 'Netention'} //Netention itself, meta 
];

sensor.addTypes(generalTypes);