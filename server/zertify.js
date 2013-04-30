/*
http://www.mediawiki.org/wiki/Manual:Parameters_to_index.php
	http://en.wikipedia.org/wiki/Learning?printable=yes
http://en.wikipedia.org/wiki/Special:Search?search=sdfsf&go=Go&printable=yes

URLs:
main page
wikipage
search
tag(url, value)

https://github.com/MatthewMueller/cheerio
remove scripts, head, html for clean embedding
rewrite <a> links
popup tagger without having to visit linked page
absolutize all relative img and media resource links
attach menus
*/

var express = require('express');
var web = express();
var _ = require('underscore');
var fs = require('fs');
var http = require('http');
var cheerio = require('cheerio');

var oneYear = 31557600000;


function sendZertify(res, initialjs) {
   res.send( _.template(fs.readFileSync('./client/zertify.html', 'utf8'), { initjs: initialjs } ) );    
}

web.get('/', function(req, res){
    sendZertify(res, 'home();');
});

web.get('/zertify/:tag', function(req, res) {
    var t = req.params.tag;
    sendZertify(res, 'go("' + t + '");');
});


web.get('/zertify/wiki/:tag', function(req, rres) {
    var t = req.params.tag;
    rres.writeHead(200, {'Content-Type': 'text/html' })
    http.get("http://en.wikipedia.org/wiki/" + t, function(res) {
        var page = '';
        res.on("data", function(chunk) {
            //rres.send("Got response: " + res.statusCode);
            //rres.send(chunk);
            //rres.write(chunk);
            page = page + chunk;
        });
        res.on('end', function() {
            var $ = cheerio.load(page);
            rres.write($('#content').html());
            rres.end();
        });
    }).on('error', function(e) {
        rres.send("Got error: " + e.message);
    });
});


web.use("/", express.static('./client', { maxAge: oneYear }));

web.listen(8081);