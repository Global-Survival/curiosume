//GENERAL.JS is a PLUGIN WHICH IS AUTOMATICALLY LOADED BY THE WEBSERVER

var generalTags = [
        
    //Being superclass of Human..
    { uri: 'Human', name: 'Human',		
		properties: {
		             'currentRole': { name: 'Current Role', type: 'text' },
		             'biography': { name: 'Biography', type: 'textarea' },
                     
		             'birthdate': { name: 'Birthdate', type: 'timepoint' },
                     
                     //age: { name: 'Age', type: 'function', value: function(x) { return = now - getProperty(x, 'birthdate').val() ... } }
                     
		             'male': { name: 'Male', type: 'boolean' },
		             'female': { name: 'Female', type: 'boolean' },
		             'email': { name: 'E-Mail', type: 'text' },
                     
                     'friend': {name: 'Friend', type: 'object' },
                     'trusts': {name: 'Trusts', type: 'object' },
                     
                     'parent': {name: 'Parent', type: 'object', tag: ['Human'] }
                     
                     /*
                     <select name="ext_sel[]" id="ext_sel2">  <option value="" selected="selected">select 3rd filter...</option>  <option value="languages">Spoken languages</option>  <option value="body">Body type</option>  <option value="height">Height</option>  <option value="weight">Weight</option>  <option value="hair">Hair color</option>  <option value="eyes">Eye color</option>  <option value="sexuality">Sexuality</option>  <option value="relationship">Status</option>  <option value="children">Children</option>  <option value="education">Education</option>  <option value="star_sign">Star sign</option>  <option value="drinking">Drinking</option>  <option value="smoking">Smoking</option>  </select>
                     */
		},
	//TODO synthesis of CouchSurfing + BeWelcome.org user profile fields
	},    

	/*
	Adapted from: http://keimform.de/2010/commons-in-a-taxonomy-of-goods/ by Von Stefan Meretz
	Note: Renaming "Good" to "Resource"
	TODO: Add descriptions from explanations on that page

	Resource
		Origin: Natural | Produced
		Constitution: Material | Non-Material

		SocialOwnership: Commodity | Subsistence | Commons
		LegalOwnership: Private Property | Collective Property | Free Good

		Exclusivity and Rivalry?

	*/



    { uri: 'Action', name: 'Action', //combined Event into this one..
		properties: {
		    'active': { name: 'Active', type: 'boolean' },		            
		    'startsAt': { name: 'Starts At', type: 'text' /*datetime*/ },
		    'stopsAt': { name: 'Stops At', type: 'text' /*datetime*/ },
		    'maxAttendance': { name: 'Maximum Attendance', type: 'integer' /*datetime*/ }
		//Completed?
	        //RSVP by
		//Reason (why)
		//Needs Volunteers?
		}
	},
	{ uri: 'Geometry', name: 'Geometry',
		properties: {
		             'length': { name: 'Length (m)', type: 'real' },		            
		             'width': { name: 'Width (m)', type: 'real' },		            
		             'height': { name: 'Height (m)', type: 'real' },		            
		             'mass': { name: 'Mass (kg)', type: 'real' }		            
		}
	},
	{ uri: 'Value', name: 'Value',
		properties: {
					 //http://www.therichest.org/business/most-traded-currencies/
					 'moneyBTC': { name: 'Bitcoin (BTC)', type: 'real' },		            
		             'moneyUSD': { name: 'USD ($)', type: 'real' },		            
		             'moneyEUR': { name: 'EUR (€)', type: 'real' },		            
		             'moneyGold': { name: 'Gold (g)', type: 'real' },		            
		             'moneySilver': { name: 'Silver (g)', type: 'real' },
                     'walletBTC': { name: 'Bitcoin Wallet', type: 'text' },
                     'walletRipple': { name: 'Ripple Wallet', type: 'text' },
                     'walletPayPal': { name: 'PayPal Address', type: 'text' },
                     'walletRTN': { name: 'Bank Account', type: 'text' },     //http://en.wikipedia.org/wiki/Routing_transit_number
		}
	},
	{ uri: 'Contract', name: 'Contract',
		properties: {
					 //http://www.therichest.org/business/most-traded-currencies/
					 'transactionPaid': { name: 'Paid', type: 'boolean' },		            
					 'transactionDue': { name: 'Due', type: 'boolean' },		            
					 'transactionGratis': { name: 'Gratis', type: 'boolean' }		            
                     
                     //http://troco.ourproject.org/
                     //'valueGiven'
                     //'recipient'
                     //'valuePromisedReturn'
                     //'due' (date)
                     //'transactionStatus' [ ... ]
                     //public enum TrocoKey {
                     //   ISSUER, ISSUER_ID, ISSUER_BTN, ISSUER_IMG, RECPT, RECPT_ID, RECPT_BTN, RECPT_IMG, GIVE_VALUE, OTHER_VALUE, SAME_VALUE, BEFORE_DATE, SIGN_BTN, STATUS, ISSUER_SIGNED, RECPT_SIGNED, REDEEMED, REDEEM_BTN, ISSUER_GPGAUTH, RECPT_GPGAUTH, ISSUER_GPGSIGN, RECPT_GPGSIGN

		}
	},
	{ uri: 'Media', name: 'Media'}, //params: contentType

	{ uri: 'Report', name: 'Report'}, //Report=Incident
		//NewsSourceLink (url)
		//see: Ushahidi.com
    
    { uri: 'Problem', name: 'Problem'},
    { uri: 'Solution', name: 'Solution'},
    { uri: 'Cause', name: 'Cause'},
    { uri: 'Effect', name: 'Effect'},

	{ uri: 'Goal', name: 'Goal'}, //=Project=Program=Plan=Opportunity
		//state = considered|desired|active|completed

	{ uri: 'User', name: 'User'}, 
	//{ uri: 'Netention', name: 'Netention'}, //Netention itself, meta 

    { uri: 'Message', name: 'Message'}, 
        /*
        At the first gate, ask yourself, ‘Is it true?
        At the second ask, ‘Is it necessary?
        At the third gate ask ‘Is it kind?
            - Sufi saying -
        */
    
    { uri: 'Decision', name: 'Decision'}, 
        //http://en.wikipedia.org/wiki/List_of_biases_in_judgment_and_decision_making
        
        //from LOOMIO:
        { uri: 'Decision.Agree', name: 'Agree', tag: ['Decision'] ,
            description: 'You are happy with the proposal.'
        },
        { uri: 'Decision.Abstain', name: 'Abstain', tag: ['Decision'] ,
            description: 'You are unsure, or you’re happy for the group to decide without you.'
        },
        { uri: 'Decision.Disagree', name: 'Disagree', tag: ['Decision'] ,
            description: 'You think there might be a better alternative, but you’re willing to go with the group.'
        },
        { uri: 'Decision.Block', name: 'Block', tag: ['Decision'],
            description: 'You have serious objections and you’ll be extremely unhappy if this proposal goes ahead.'
        },
    
    //Pledge = Promise
    //  
    { uri: 'Promise', name: 'Promise',
            description: "I’ll do it, but only if you’ll help." //PledgeBank.com
    },
    
    { uri: 'Tag', name: 'Tag',
            description: "Indicates that an object defines a tag",
        	properties: {
    					 'tagValueType': { name: 'Value Type', type: 'text' },
        				 //'tagDomain': { name: 'Domain', type: 'text' }
        	}
                     
            
    },
    { uri: 'Imaginary', name: 'Imaginary', description: 'Something imaginary, indefinite values.' }
    
        
];

exports.plugin = {
    	name: 'General',	
		description: 'General Tags',
		options: { },
        version: '1.0',
        author: 'http://netention.org',
		start: function(netention, util) { 
            netention.addTags(generalTags );
        },
		stop: function(netention) { }
};
