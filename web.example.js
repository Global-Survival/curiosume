/*
 * Netention Web Server Example
 * 
 * Edit this to configure and customize your servers. 
 */
var web = require('./server/web.js');

web.start('siteurl' /* include :port if necessary */, 
		
		/* port */ 8080, 
		
		databaseURL /* ex: 'localhost/test' */,
		
		function() {	
			//after ready, call this
		}
);
