var apricot = require('apricot').Apricot;
var request = require('request');

var defaultTimeOutMS = 10000;

function getSentencized(urlOrText, f) {
   
   var rootNode;
   
   var p = function(err, doc) {
       if (err==null) {
           doc.find("script").remove();
           doc.find("style").remove();
           doc.find("head").remove();
           
           var str = doc.toHTML;
           str=str.replace(/\n/g, " ");
           //str=str.replace(/\r/g, " ");
           //str=str.replace(/\t/g, " ");
           str=str.replace(/&nbsp;/gi, " ");
           str=str.replace(/\. /gi, ".\n");
           str=str.replace(/\? /gi, "?\n");
           str=str.replace(/\! /gi, "!\n");
           str=str.replace(/<br.*>/gi, "\n");
           str=str.replace(/<p.*>/gi, "\n");
           str=str.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 [$1] ");
           str=str.replace(/<(.*?)>/g, "");

           var linesPreFilter = str.split("\n");
           var slines = [];
           var i;
           for (i = 0; i < linesPreFilter.length; i++) {
               var t = linesPreFilter[i].trim();               
               if (t.length > 0) {
                   slines.push(t);
               }                  
           }    
           
           var lines = [];
           for (i = 0; i < slines.length; i++) {
                lines.push(slines[i]);               
           }
           
           f(lines);
       }
       else {
           console.log('getSentencized ERROR');
           console.log('ERROR: ' + err);
           f(err);
       }
   }
   
   if (urlOrText.indexOf('http://')==0) {
        rootNode = urlOrText;
        rootNode = rootNode.replace(/http:\/\//g, "");
        rootNode = rootNode.replace(/\//g, "_");

        request({
            url: urlOrText,
            followAllRedirects: true
            //timeout: defaultTimeOutMS
          }, 
          function (error, response, body) {
            if (!error && response.statusCode == 200) {
          		apricot.parse(body, p, false);            	
            }
            else {
                console.log('getSentencized ERROR');
                console.log(urlOrText + ': '  + error);
            }
        });        
   }
   else {
       var summaryLength = 16;
       if (urlOrText.length < summaryLength)
           summaryLenth = urlOrText.length;
       rootNode = urlOrText.substring(0, summaryLength);
       rootNode = encodeURIComponent(rootNode);
       apricot.parse(urlOrText, p, false);       
   }
}
/*process.on('uncaughtException', function (err) {
	//This traps a nasty bug when 'apricot' is used: 
	//	uncaughtException: TypeError: Property '_onTimeout' of object #<Object> is not a function
	console.log('uncaughtException: ' + err);
});*/

exports.getSentencized = getSentencized;
