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
                     /*
                     <select name="ext_sel[]" id="ext_sel2">  <option value="" selected="selected">select 3rd filter...</option>  <option value="languages">Spoken languages</option>  <option value="body">Body type</option>  <option value="height">Height</option>  <option value="weight">Weight</option>  <option value="hair">Hair color</option>  <option value="eyes">Eye color</option>  <option value="sexuality">Sexuality</option>  <option value="relationship">Status</option>  <option value="children">Children</option>  <option value="education">Education</option>  <option value="star_sign">Star sign</option>  <option value="drinking">Drinking</option>  <option value="smoking">Smoking</option>  </select>
                     */
		},
	},
	{ uri: 'general.Event', name: 'Event', properties: {
    	             'startsAt': { name: 'Starts At', type: 'text' /*datetime*/ },
                     'stopsAt': { name: 'Stops At', type: 'text' /*datetime*/ }
        
	}}, //params: start, end, due by, rsvp by 
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
    { uri: 'general.Message', name: 'Message'} //Netention itself, meta 
];

exports.plugin = {
    	name: 'General',	
		description: 'Generally helpful types',
		options: { },
        version: '1.0',
        author: 'http://netention.org',
		start: function(netention) { 
            netention.addTypes(generalTypes);    
        },
		stop: function(netention) { }
};
