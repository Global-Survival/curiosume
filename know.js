var web = require('./server/web.js');

web.start('curiosume.com' /* include :port if necessary */, 
		
		/* port */ 8081, 
		
		'localhost/zertify2' /* ex: 'localhost/test' */,
		
		function(server) {	
			//after ready, call this
		        server.permissions['twitter_key'] = 'O49dUbRnWsMap2Nq9D1Ulw:tLZ6fySfw8GI7M9Kf3CScXilXBz3IwTeMy2G4dFPE24';

		}
);
