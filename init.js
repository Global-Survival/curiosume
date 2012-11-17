var sensor = require('./sensor/sensor.js');
var web = require('./server/web.js');

exports.init = function() {
	
	web.Server.name = 'MyHumanity';
	web.Server.description = 'http://MyHumanity.org';
	
	//sensor.addSensor(require('./sensor/googlefinance.js').GoogleFinanceSymbols(['aapl','msft','ibm','goog']));
	//sensor.addSensor(require('../sensor/rss.js').RSSFeed('x', 'http://blog.automenta.com/feeds/posts/default?alt=rss'));

	//sensor.addSensor(require('../sensor/mindmodel.js').MMCSV('emotion-happy','./schema/enformable_atomic_history.statements.tsv'));
	//sensor.addSensor(require('../sensor/echo.js').Echo('emotion-happy', 'happiness'));
	//sensor.addSensor(require('../sensor/echo.js').Echo('emotion-surprised', 'surprise!'));

	require('./sensor/4chan.js');
	
//addSensor('geology/USGSEarthquake');
//addSensor('pollution/IAEANuclear');
//addSensor('geology/MODISFires');


}
