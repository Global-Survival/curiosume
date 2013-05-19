/*
 * Netention Web Server Example
 * 
 * Edit this to configure and customize your servers. 
 */
var web = require('./server/web.js');

web.start('siteurl' /* include :port if necessary */, 
		
    8080, /* port */ 

    'databaseURL', /* ex: 'localhost/test' */

    /* after initialized, calls this: */
    function(server) {	
        //CONFIGURATION OPTIONS        
        /*
        server.permissions['authenticate_to_configure_plugins'] = false;
        server.permissions['authenticate_to_create_objects'] = false;
        server.permissions['authenticate_to_delete_objects'] = false;
        server.permissions['authenticate_to_proxy_http'] = false;
        
        server.permissions['twitter_key'] = 'CONSUMER_KEY:CONSUMER_SECRET';
        */
    }
);
