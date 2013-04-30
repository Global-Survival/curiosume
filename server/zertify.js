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
web.get('/myself', function(req, res){
    sendZertify(res, 'myself();');
});

web.get('/wiki/:tag', function(req, res) {
    var t = req.params.tag;
    sendZertify(res, 'go("' + t + '");');
});

function returnPage(url, rres, redirector) {
    http.get(url, function(res) {
        if (res.statusCode > 300 && res.statusCode < 400 && res.headers.location) {
            // The location for some (most) redirects will only contain the path,  not the hostname;
            // detect this and add the host to the path.
            var u = res.headers.location;
            var pu = u.indexOf('/wiki/');
            if (pu!=-1) {
                redirector = u.substring(pu + 6);
                returnPage(u, rres, redirector);
                return;
            }
        }
        rres.writeHead(200, {'Content-Type': 'text/html' })

        var page = '';
        res.on("data", function(chunk) {
            page = page + chunk;
        });
        res.on('end', function() {
            var $ = cheerio.load(page);
            
            if (redirector)
                $('#content').append('<div style="display:none" class="WIKIPAGEREDIRECTOR">' + redirector + '</div>');
            
            rres.write($('#content').html() || $.html());
            rres.end();
        });
    })
    /*.on('error', function(e) {
        rres.send("Got error: " + e.message);
    })*/;    
}

web.get('/zertify/search/:query', function(req, rres) {
   var q = req.params.query;
   returnPage('http://en.wikipedia.org/w/index.php?search=' + q, rres);
});



web.get('/zertify/wiki/:tag', function(req, rres) {
    var t = req.params.tag;
    returnPage("http://en.wikipedia.org/wiki/" + t, rres);
});


web.use("/", express.static('./client', { maxAge: oneYear }));

web.listen(8081);