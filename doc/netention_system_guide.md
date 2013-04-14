[][0][][0]

network

intention | attention

global safety system

global self sufficiency

global support system

global satisfaction system

global surveillance system

global survival system

# Netention

SYSTEM GUIDE

[Netention][1]

[Web: http://netention.org][2]

[Source code: https://github.com/automenta/netentionjs2][3]

[Installation][4]

[Ubuntu 12.10][5]

[Windows 7][6]

## Web: [http://netention.org][7]

## Source code: [https://github.com/automenta/netentionjs2][8]

# 

# Installation

## 

## Ubuntu 12.10

sudo apt-get install git npm mongodb g++ libxml2-dev make  

//install nodejs

wget[][9][http://nodejs.org/dist/v0.8.14/node-v0.8.14.tar.gz][9]

tar xvzf node-v0.8.14.tar.gz

cd node-v0.8.14

./configure

make -j2

sudo make install

cd ..

git clone[][10][https://github.com/automenta/netentionjs2.git][10] netention  
cd netention

npm install

sudo npm install always -g

npm install --force htmlparser jsdom apricot

sudo ln -s /usr/bin/nodejs /usr/bin/node

Basically it needs node.js, the latest version, and then certain libraries installed via 'npm' the node package manager (i'll list them in the instructions).  then run web.sh (which uses the very helpful '[always][11]' package) and visit on port 8080 (specified in config.js).

the client/ folder is served publicly by the webserver as static files.  this includes client-side html and javascript.

client/sensor contains the sensor hierarchy.  some of the files (without .client.js) may be used by the server.  this just keeps them in one place, organized by sensor category.

server/ contains server-side specific code.

## Windows 7

1\. Setting up the environment

-Install node.js

[http://nodejs.org/download/][12]

[][12]

-Download and install mongodb

[http://www.mongodb.org/downloads][13]

[http://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/][14]

[][14]

2\. Get the code

-install github for windows :[][15][http://windows.github.com/][15]

[][15]

-Go to :[][8][https://github.com/automenta/netentionjs2][8]

click on "clone in windows"

3\. Install npm

-open windows command shell

-Go to the repository directory and run npm install :

type three commands : (in this case the directory is F:\\rep\\netentionjs2)

f:

cd \\rep\\netentionjs2

npm install

4\. Create your custom webserver configuration

-create a file "localnetention.js" in the netentionjs2 root directory with this code :

var web = require('./server/web.js');

web.start('localhost:8080', 8080, 'localhost/o1', function(server) {

server.permissions\['authenticate\_to\_configure\_plugins'\] = false;

server.permissions\['authenticate\_to\_delete\_objects'\] = false;

server.permissions\['authenticate\_to\_proxy\_http'\] = false;

});

the first parameter is the url it will run at, the second is the database url

5\. edit web/server.js

Remove line 3 : var cortexit = require('./cortexit.js');

6\. Launch the netention server

go to the command line and run:

node localnetention.js

you can then visit[][16][http://localhost:8080][16] in your browser

go to the menu, 'Plugins', and enable some

Allow others access to your server

if it's not firewalled by your router

give them your IP and tell them port 8080

if your database gets full or something

you can create a new database by changing localhost/o1 in localnetention.js

to locahost/o2

and so on

just point it to a new url and you get a new database

the old one remains but it wont be accessed

you will have to re-enable plugins at that point too

because the list of enabled plugins is set in the db

it also allows you to switch between different db's

![](https://lh5.googleusercontent.com/t6v26JkIG0ITRVkKRSRVVkL0WgGlZMH0YlB36u99PAsCEw03ql7K7QKFHGYvR-WxfY6ca0sFvSOeCSRkEugvr2kp7t_Yoo8yKrBn3lUQVfAiww)



[0]: #
[1]: #h.9xd49glivnvh
[2]: #h.tobpod5z1bm3
[3]: #h.yygt0bohc6ev
[4]: #h.38gev7mibbro
[5]: #h.cv1m3fgb7lli
[6]: #h.h8epjbg8ofb3
[7]: http://netention.org
[8]: https://github.com/automenta/netentionjs2
[9]: http://nodejs.org/dist/v0.8.14/node-v0.8.14.tar.gz
[10]: https://github.com/automenta/netentionjs2.git
[11]: https://github.com/edwardhotchkiss/always
[12]: http://nodejs.org/download/
[13]: http://www.mongodb.org/downloads
[14]: http://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/
[15]: http://windows.github.com/
[16]: http://localhost:8080/