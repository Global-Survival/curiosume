# 

[Uncategorized][0]

[Documentation][1]

[Server][2]

[100% Open-Source Architecture][3]

[Real-time Secure, Private, and Anonymous Access][4]

[Object Data and Metadata][5]

[Ontology][6]

[Inter-Server Communication][7]

[Remote URL Cache][8]

[HTML5/Javascript Client][9]

[Desktop and Mobile Browser Compatibility][10]

[Client Memory][11]

[ObjectView][12]

[Focus][13]

[Memory Focus][14]

[Semantic Focus][15]

[Tag Focus][16]

[Team Focus][17]

[Where Focus][18]

[When Focus][19]

[Environment Focus][20]

[Search Focus][21]

[Human Body Focus][22]

[Needs Focus][23]

[Tag Focus][24]

[Favorite Focus][25]

[Emotion Focus][26]

[Other Focuses][27]

[View][28]

[Home View][29]

[Cortexit View][30]

[Table View][31]

[List View][32]

[Grid View][33]

[Graph View][34]

[Map View][35]

[Timeline View][36]

[Analytics View][37]

[Server Plugins][38]

[Facetime Plugin][39]

[Jam Plugin][40]

[Emotion Detector Plugin][41]

[Craigslist Plugin][42]

[Other Plugins][43]

[ClimateViewer][44]

[GeoSemantic Chat][45]

[Android App][46]

[Notes][47]

[Github Development Flow][48]

[Blank][49]

# 

# Uncategorized
    
1.  send essential objects on connect:

1.  user's own objects "mine"
1.  tags
1.  most recent

1.  getGeolocation

1.  consider both primitive spacepoint property and first property with it

1.  fix relevant not updating when /tag/ accessed
1.  add primitive tag
1.  add color primitive data type
1.  add tag property, with type select (requires new meta-primitive)
1.  db stores involved tags as cache for fast index queries; removes the cache property from retrieved DB object
1.  CompleteObject loaded from menu/url
1.  complete object manipulation unit tests
1.  fix the matching plugins, for basic object matching

1.  human age match
1.  musical instrument match

1.  obey min/max property arity, affects tag display and property adding behavior
1.  on startup, download all of a user's objects first, then get other objects according to interests and recency. 

1.  interest modes:

1.  geolocation
1.  tag vector
1.  

1.  add a restartEvery parameter to plugins to have them stopped and restarted at periodic intervals
1.  tag recommendations:

1.  stemming on english words

1.  [https://github.com/kristopolous/Porter-Stemmer][50]

1.  variable score result 0..1.0, indicated with sort order and font size
1.  display in bottom section below all tags
1.  mouseover indicates reason for selection (can be just "matched keyword" but grow to cover future inference abilities)

1.  find relevant (geographically near) objects when only a spacepoint is in (edited) focus
1.  indicate when the DB isnt running
1.  merge properties from duplicate tags on ontology loads
1.  outer space aware

1.  time delta + space distance direction altitude
1.  example: 1 day ago | 3.2 km NW up 16.1m

1.  user IP -\> becomes a known IP object that can become geo-IP resolved as a "location of interest" to ponder inference results
1.  mousewheel on applied Tag to adjust strength; adjusts font-size of displayed applied tag
1.  loaded and unloaded plugins reified as objects themselves
1.  "Forecast" tag modeled after Foresight Engine

1.  [http://foresight.breakthroughstocures.org/about][51]
1.  Then they play cards: Twitter-length forecasts (140 characters or less) that represent their best thinking. They can start a chain of cards or they can build on cards that others play. 
1.  A card is an idea about the future. Your first card is either "positive imagination" --- something good that we could do in the future scenario --- or "dark imagination" --- a challenge or obstacle that might stand in our way. If you're optimistic, play a positive imagination card. If you're pessimistic, play a dark imagination card. And if you can picture both positive and dark outcomes, then play one of each!
1.  Check out [the ideas created by other players!][52] Look for cards that really catch your eye --- and then take them one step further, in one of four possible directions.

1.  No way!" If you disagree, play an antagonism card.
1.  "Yes! And..." If you agree, play a momentum card.
1.  "Yes! But..." If you agree, but if you can imagine the idea playing out differently in your field or part of the world, play an adaptation card.
1.  "Hmmm..." If you have a follow-up question, play an investigation card.

1.  make cortexit.js optional using try/catch on module require
1.  completely modularize the focus and view system, to include a 'canView(x)' function to determine whether view is applicable to focused object, whether it is a single object or a collection (array)
1.  object properties

1.  shown in graph view as edges

1.  remove text display of name in message, just add 'title=' to displayed avatar icon
1.  add '(Me)' to a displayed Self object that matches clientID
1.  team focus w/ filter for individual authors

1.  private message
1.  private video conference
1.  "pay..."
1.  trust: unknown
1.  last activity: unknown

1.  cloning adds 'clonedFrom:' field
1.  "Understand" focus - natural language input w/ iterative disambiguation per sentence
1.  initMiniMap() - should use self's geolocation as default starting position
1.  [http://www.appelsiini.net/projects/jeditable][53] in-place editing
1.  proxy file request caching to avoid refetching on repeated or same requests from multiple people
1.  use default view on startup, don't leave blank
1.  "see relevant" item in focus save menu (underneath 'export') -\> set list semantics to relevance, etc.. update view
1.  "team" main menu link = relevant to "user" = /tag/general.User
1.  tag cloud in report with links to /tag/\*
1.  layouts:

1.  hide / minimize / maximize (like blogger) focus section

1.  themes

1.  styling of tag buttons both in focus editor and in object view to resemble each other
1.  ...automatically download and install css/bootstrap themes?
1.  sounds?

1.  ontology search: include matches for tags and properties, their names and descriptions
1.  "traveling mode" and advanced location settings, including basic location selector modal dialog
1.  \_.extend() objects with utility methods
1.  focus/popup a specific object, fullscreen
1.  {Live update | Pagination} modes
1.  Relevance highlights tag button widgets (which are used in both focus editor and object viewer)
1.  fontsize adjust slider(s)
1.  [https://github.com/jquery/globalize][54]
1.  text-to-speech
1.  plugin dependencies
1.  mobile site (extensive use of modal dialogs and sliding/toggling modes)
1.  node-inspector for debugging and profiling of node.js server [https://github.com/dannycoates/node-inspector][55]
1.  popup/tooltip wikipedia mobile view for annotated terms. ex: "Food" -\> en.wikipedia.org/wiki/Food
1.  modify timeago plugin to display "1.3 days ago" (extra decimal place for increased accuracy) instead of just "1 day ago" and similarly for other larger-than-insignificant measurements
1.  favorites: keeps attention "pinned" for certain objects at varying levels; ensures they wont be forgotten
1.  [https://github.com/niftylettuce/express-cdn\#how][56] CDN 

## 

# Documentation[][57][][57]

What it Does

What it Doesn't (yet)

Installation Instructions
    
1.  Linux

Installation Videos

Installation Instructions
    
1.  Windows
1.  Android
1.  OSX
1.  AppFog
1.  Heroku

Documentation available from within Netention as statically provided objects

## 

# Server

Web server providing authenticated & anonymous access via HTTP/HTTPS (AJAJ, REST) and WebSockets.  Serves static content (HTML, JS, CSS, images, etc...) for client applications, and also stores & provides uploaded content.

## 100% Open-Source Architecture[][57][][57]

What it Does

What it Doesn't (yet)

1.  Components

1.  Node.JS

1.  \[npm's\]

1.  MongoDB

1.  License: GPL

1.  Complete installation instructions for all platforms

## Real-time Secure, Private, and Anonymous Access[][57][][57]

What it Does

What it Doesn't (yet)

1.  HTTP REST + Websockets

1.  Authenticated Login

1.  OpenID
1.  Google Accounts

1.  Logout
1.  Publish objects (new and edits to existing)
1.  Delete objects

1.  require authentication to prevent a non-authenticated user from editing an authenticated user's objects
1.  authentication instructions, more intuitive, hide either the login or logout menu item at a time.  no separate login/logout page, just use items in main menu 
1.  display status of connection and current action with visible icon/label.  visible on application initializing also to show the current startup stage
1.  prevent spoofing of clientID by adding 'requiresAuthentication' to a User upon first authentication. this will cause the server to disregard access to that User URI while unauthenticated.  they will only be able to authenticate when the MD5(authenticationKey) = that self
1.  client-side crypto
1.  public key crypto for private message
1.  HTTPS Setup Instructions
1.  FB, Twitter Authentication
1.  Documented Web API for 3rd party tools & apps
1.  private messages

1.  notifications of replies to own objects, or another reply to an object one has replied to

## Object Data and Metadata

The most common serialization for Netention objects is JSON.

1.  name
1.  description
1.  geolocation
1.  tags, tagStrength
1.  creation date
1.  author
1.  replyTo
1.  deleted?

TODO
    
1.  unify tag & tagStrength: " \[ \[ "tag1", 0.9 \], \["tag2",-0.3\] ... \]"
1.  revision history
1.  modification date (separate from creation date)
1.  hidden?
1.  favoriteOf

## Ontology

Collection of tags and properties providing a common semantic vocabulary for describing reality and imagination.  Each tag consists of a set of properties with type:
    
1.  Real (number)
1.  Text
1.  BigText
1.  Object
1.  ...

TODO
    
1.  Extra Data types

1.  \[see Semantic view\]
1.  [http://developers.facebook.com/docs/technical-guides/opengraph/simple-object-types/][58]
1.  Measurement units: [http://developers.facebook.com/docs/technical-guides/opengraph/complex-object-types/\#quantity][59]

1.  alert messages for when tags are added, ex. rss instructions
1.  object values

1.  [http://ivaynberg.github.com/select2][60]

1.  tag and property creation and editing
1.  property inheritance
1.  max property arity (default=unlimited & not required)
1.  subtag matches in relevancy heuristic
1.  icons for tags and properties

1.  in tag menus
1.  default icon?
1.  icon grow on hover?

1.  tag actions (ex: popup notice)
1.  hidden tags and properties (ex: for system use, not humans)
1.  [https://npmjs.org/package/nools][61]

## Inter-Server Communication[][57][][57]

What it Does

What it Doesn't (yet)

1.  Import and Export JSON dump
1.  Telehash
1.  XMPP

## 

## Remote URL Cache

TODO
    
1.  stores files
1.  unzips .zip, .kmz (and adjusts <link\> url's), etc..
1.  hosts on webserver as static content
1.  .gitignore'd

# 

# HTML5/Javascript Client
    
1.  Themes

1.  Bright

1.  \[Bright derivatives\]

1.  Dark

1.  \[Dark derivatives\]

TODO
    
1.  Location detection, tracking, and manual repositioning (even without Map view)
1.  Send changes in "interests" to server for analytics
1.  Accessibility

1.  Blind
1.  Deaf
1.  Pre-Symbolic / Non-Verbal / Gestural (Children, Paralyzed, Animals)
1.  Translations

1.  Spanish
1.  ...

## Desktop and Mobile Browser Compatibility[][57][][57]

What it Does

What it Doesn't (yet)

1.  Chrome
1.  Firefox

1.  Android
1.  Internet Explorer

# 

## Client Memory
    
1.  Stores objects as indexed keys.

1.  Limited to localStorage quota which is quite small

TODO
    
1.  indexedDB support - enables larger client-side datastore

1.  with WARNING when quota may be near exceeded

1.  attention vector : map<object,interest\>
1.  forgetting: keeps total \# of objects in server and client within range (ex: < 10k) based on attention
1.  spreading
1.  importance classifier: classifies incoming objects according to its features to predict the user's interest in it (0..1.0)

1.  author, age, etc..
1.  use an encog component to automatically learn user's classification parameters
1.  this is analogous to google's important inbox feature

## ObjectView

An ObjectView is a widget that displays essential information about an object.

1.  Name
1.  Tags
1.  Description
1.  Geolocation
1.  Age
1.  ...

It also includes actions which may be displayed as buttons, or in a pulldown menu:
    
1.  Reply
1.  Delete
1.  ..

TODO
    
1.  inline editing of properties by clicking on them when one has edit permission, clicked label -\> text input -\> label

1.  Parameters to customize rendering
1.  Add favorite ('star' button) aka Bookmark
1.  "User" Action Buttons

1.  Text Chat (button)
1.  Video Chat (button)
1.  Pay (button)

1.  Bitcoin
1.  Paypal

1.  Optimize rendering with templates

# Focus

Each focus is a method of describing what one is thinking about.  It functions as a semantic analog-to-digital converter for expressing one's mental state in a machine-readable data structure.  What one enters into a focus may be used to:
    
1.  compare relevancy with known data objects, or
1.  to create a new data object which may be stored for future use and/or shared with others.

## Memory Focus

TODO
    
1.  represents the memory w/ relative attention as a selectable list
1.  type whitelist/blacklist filter (at top, as a popup)
1.  allow mouse drag to select included objects, which updates a "includeURI" predicate in the focus object used by view filters

## Semantic Focus
    
1.  Creates new or edits existing object
1.  Name field

1.  with voice input (on Chrome browsers)

1.  Optional Description field
1.  Optional Geolocation field (clickable map)
1.  Optional File Upload widget
1.  Add tags from dialog popup
1.  Add auto-suggested tags from enterd text in Name field
1.  Add properties from Tag pulldown menus
1.  Edit properties
1.  Export to JSON
1.  proportional tagging (ex: 75% A, 50% B, 25% C)
1.  ...

TODO
    
1.  display marker on clicked map location
1.  "interview" mode for answering required fields as they become necessary. activated by a flashing button?
1.  ctrl-enter to send/create
1.  property widgets for types:

1.  timepoint (1 calendar with time input)
1.  timesegment (2 calendars with time input)
1.  real:unit

1.  seconds
1.  meters
1.  kilograms
1.  celsius
1.  joules, watts
1.  \[all SI units\]
1.  ...

1.  texthash
1.  object:tag with dynamic combobox selector of all tags, by package or hierarchy
1.  object:\[tag\] with dynamic combobox selector of all instances of a specific tag
1.  livetext (a realtime collaborative text editor via ShareJS)
1.  \[other datatypes...\]

## Deprecated Focuses

## Tag Focus [][57][][57]

What it Does

What it Doesn't (yet)

Dynamically filter by tags (checkboxes)
    
1.  highlight currently selected tag(s)
1.  allow multiple tag selection
1.  allow strength-based tag selection
1.  order by most tags
1.  show other information about each tag, live update where necessary
1.  alternate ["tree" ][62]views:

1.  [http://mbostock.github.com/d3/talk/20111018/tree.html][62]
1.  [http://mbostock.github.com/d3/talk/20111116/pack-hierarchy.html][63]

## Team Focus

TODO
    
1.  Filter by 'User' type (not Human)
1.  Summarize activity stats (ex: \# messages / second @ 5m, 1hr, ... intervals

1.  Sort by distance | last activity

## Where Focus

## When Focus

## Environment Focus

## Search Focus

Filtering by keyword.

## Human Body Focus

## Needs Focus

## Tag Focus

TODO
    
1.  Tag Cloud Mode
1.  

## Favorite Focus

TODO
    
1.  Show added favorites

## Emotion Focus

Displays emotion chart and allows creation of an emotion state vector.

TODO
    
1.  publish current emotion (button)

## Other Focuses

TODO
    
1.  [http://mousesearch3d.com/][64]
1.  ivan's circle menu
1.  metamaps spinning carousel menu
1.  Dashboard/Home screen

1.  

# View

Each view is a different method of depicting a set of objects.

## Home View

TODO
    
1.  includes map, recent items, and stats
1.  requests fullsize

## Cortexit View

"Disperse large paragraphs of text, where words seem to blend together, into easily digestible chunks.  
\* In large fonts, filling the screen  
\* Fluid navigation  
\* Read at your own pace  
\* Focus on one sentence or word at a time.  
\* Helps those with ADD, Dyslexia, and Vision problems  
  
Now you can adjust, and maybe improve the rate and quality of how you absorb information.  
  
You are no longer at the mercy of web designers and authors that insist on writing impenetrably dense paragraphs in small fonts."

TODO
    
1.  jQuery plugin, with demonstrated multi-instantiability on single document OK
1.  Sentencizing OK
1.  Text-to-speech
1.  Preserve links and images in frames
1.  Image Search
1.  Add current sentence to attention set (as \# anchor to the base page URL)
1.  jQuery Mobile Dragging for next/prev and font-size

1.  Rapid presentation mode: "Neuro Download"

## Table View

TODO
    
1.  ex: jquery-table

## List View

TODO
    
1.  pin pinned objects to the top
1.  exclude / include by tag
1.  replies, threaded replies
1.  clone it or save as a self-contained report object which can be shared
1.  correct pagination

## Grid View

TODO
    
1.  Use http://masonry.desandro.com/

## Graph View

TODO
    
1.  create new object properties between visible items

1.  drag and draw a line
1.  select them in sequence (1st and 2nd)

1.  handle graph streaming
1.  save and restore current graph view

## Map View

Displays all objects containing geographic metadata.
    
1.  OpenLayers with OpenStreetMaps layers
1.  Bitmap icon (visible from any scale) + Vector polygon (scales, and clickable)
1.  Remembers center position & zoom
1.  Displays icon for 1st tag of geolocated object

TODO
    
1.  Extra OpenLayers layers: Google, Bing, etc..
1.  Self Marker

1.  Draggable (sets Self geolocation)
1.  with Avatar Icon

1.  animated map markers to indicate indefinite sphere of influence (min/max radii)

1.  You change the geometry of a feature and then you have to redraw the feature  
    feature.geometry.rotate(angle, origin); feature.layer.drawFeature(feature);

1.  clustering: 

1.  [http://openlayers.org/dev/examples/strategy-cluster.html][65]
1.  [http://openlayers.org/dev/examples/strategy-cluster-threshold.html][66]
1.  [http://stackoverflow.com/questions/6641919/openlayers-nice-marker-clustering][67]
1.  [http://acuriousanimal.com/code/animatedCluster/][68]

1.  Scan

1.  get local results from server

1.  set current location
1.  optimized distance nearness function that can return false early in the computation (ex: already too far if dx \> maxDist^2)
1.  create new object at location
1.  create new object of specific radius
1.  create new object of specific polygon
1.  calculate routes for map line
1.  cesium map [http://cesium.agi.com][69] as alternate to openlayers 2 (openlayers 3 will integrate them!)
1.  timeslider to adjust current time to compare 'recent' to
1.  Animation

1.  Cyclical Zoom-in / Zoom-out

1.  Display all tag icons for a given object

1.  periodically changing to next one

1.  semantic heatmap

1.  calculate semantic relevancy (Ex: by keyword, tags, etc...) for each geo-pixel on a map to arbitrary resolution.  each tag is its own heatmap of intensity.. hotspots (local maxima or minima) in the map of each tag can be identified and plotted too

1.  geolocate: find location by name

1.  [http://wiki.openstreetmap.org/wiki/Nominatim][70]

1.  [Cesium][69] as alternative to OpenLayers

## Timeline View

TODO
    
1.  event labels, icons, colors
1.  category filters
1.  input: focus history
1.  demo: stock data
1.  demo: fukushima timeplot data

## Analytics View

TODO
    
1.  avg \# of properties per object
1.  avg \# of tags per object
1.  avg \# of supertags & subtags
1.  \# of instances of each property
1.  \# of instances of each tag
1.  Download as JSON
1.  Relationships between combinations of Interests
1.  Focus History

1.  discrete totals (ex: each 1s, 5s) , computed locally & on server

1.  Time-sampled Individual History (client-collected)
1.  Time-sampled Team History (server-collected)

1.  Interest Timeline, Line Chart
1.  FB-style Timeline
1.  Cortexitized Narrative
1.  Load, Save, Share
1.  Import

1.  Facebook likes, G+ "+1"'s, ...

# Server Plugins

Server plugins can be enabled by administrators to expand the server's functionality.

TODO
    
1.  Server plugins provide Focus modes to client

## Facetime Plugin

TODO
    
1.  identify people in close proximity that you can explore "face time" with (sent as private messages)

## Jam Plugin

TODO
    
1.  identify people with musical instruments in close proximity that can form bands

## Emotion Detector Plugin

TODO
    
1.  clarify emotional context of previously authored objects using one or more sentiment analysis algorithms

## Craigslist Plugin

TODO
    
1.  get craigslist items from appropriate RSS feed, and apply relevant tags
1.  craigslist enhancements

## Other Plugins

TODO
    
1.  "happy <-\> sad" / "rich <-\> poor" @afxdeadcode bot functionality
1.  rational product sales bot: explains all ads with reasons inferred about you and your environment, ex: raining -\> buy umbrella, why? because precipitation \> 80% for the next 8 hours") not just on presence of phenomena but also the lack of it, for ex: buy first aid kit because you are 230km away from the nearest hospital or pharmacy".  this can be hooked into amazon affiliate marketing to allow anyone to instantly generate money. in-person delivery can be added to local customers as a value-added bonus

1.  Environment-dependent (relevance predicate)
1.  Chat Bots
1.  Administrator "add new product" pages, with environment simulation
1.  Implemented as Support for an Intention

1.  demographics reports: produce data reports of analyzed trends, sentiments, etc.. useful for selling to marketing business.
1.  product wars: incite fights between consumers of competing products
1.  twitter local tweets:

1.  eliminate searches that are too close. if 2 users are too close their searches might be redundant.  this is a simple threshold optimization

1.  twitter output : transmits objects that have 'SendToTwitter' tag (replaces with SentToTwitter, or replaces with "TooLargeForTwitter" if too large).  

1.  SendToTwitter(username=...) if multiple bots are registered on the server
1.  attempt to send pending replies to messages previously received from twitter

1.  OSM: interest ("curiosity") in amenities for a given location is noticed by the plugin to yield the OSM amenity data
1.  RSS: created post objects inherit all other tags of the (creating) feed
1.  "perfect match" : attempt to match any objects of similar types that have predicate-matched (ex: 3 bike gears ~~ less than 5 bike gears) properties and provide a summary to each object as a reply.  serves as an innocent introduction to more powerful matching algorithms that can be added later.  should prioritize "best" matches first and avoid commenting on poor matches (most \# of properties matched, most "special" properties (inversely proportional to known usage popularity of that property's) )

# ClimateViewer

Facebook meets 3D map, toggle overlays from individuals, networks and services

[][57][][57]

What it Does

What it Doesn't (yet)

1.  Create groups, have global/group/local chat rooms, ability to friend/subscribe to users.
1.  Post photo/video/audio clips to map markers with time stamps, and the ability to view the content in a popup balloon or rss feed.
1.  Share your map marker data using url's and social sharing ([http://server.com/dome.php?1239382902][71] = your post)
1.  Subscribe to text/sms/email updates for events you predefine (environmental pollution, 50 mile radius from my home, email me or tsunami alert/earthquake/tornado)
1.  Zoom in/out on timeline at bottom of screen which will toggle display of visible icons (which were defined in the sidebar) Example: earthquakes checked, zoom in/out to increase/decrease number of quakes on map.
1.  Post polygon data with html content similar to [wikimapia.org][72].
1.  Post anonymous content, which is private and encrypted (long term goal)
1.  Use all features above on mobile devices in 2D, and 3D on PC, Mac, and Linux.

# GeoSemantic Chat

TODO
    
1.  geographic nearness and interest matching heuristic
1.  roster: show team (members of semantic space)
1.  incoming message stream, see: wireclub.com
1.  page-close behavior (log-out from chat)

# Android App

TODO
    
1.  Wraps client functionality as an Android app enabling higher-frequency interaction and direct access to mobile device features such as Camera, GPS, Bluetooth, etc..
1.  A first version may simply consist of a WebView component linking to a remote web server's page.  Possibly with list of known servers to choose from on startup

# Notes  

backbone

[http://backbonejs.org/\#introduction][73]

[https://github.com/bevry/query-engine][74]

[https://github.com/davidgtonge/backbone\_query][75]

  
  
[http://twitter.github.com/bootstrap][76]

[https://github.com/epeli/underscore.string\#readme][77]

rte: [http://jhollingworth.github.com/bootstrap-wysihtml5/][78]

[http://bootboxjs.com/][79]

https://github.com/po wmedia/backbone-forms

[https://github.com/bevry/query-engine][74]

[http://bruth.github.com/synapse/docs/][80]

[http://wiki.iks-project.eu/index.php/VIE][81]

[https://github.com/kendagriff/backbone.analytics][82]

[https://github.com/mlanza/thingy-client][83]

[http://treeline.bellz.org/download.html][84]

https://github.com/bry4n/backbone-shortcuts

[http://mousesearch3d.com/][64]

[http://semantic-mediawiki.org/wiki/Semantic\_MediaWiki\_Plus][85]

Combobox

[http://ivaynberg.github.com/select2/][60] multi-value select boxes -\> pills

Keyboard shortcuts

[http://craig.is/killing/mice][86]

  
# Github Development Flow

[http://scottchacon.com/2011/08/31/github-flow.html][87]

[][87]

From the post:

\* Anything in the master branch is deployable

\* To work on something new, create a descriptively named branch off of master (ie: new-oauth2-scopes)

\* Commit to that branch locally and regularly push your work to the same named branch on the server

\* When you need feedback or help, or you think the branch is ready for merging, open a pull request

\* After someone else has reviewed and signed off on the feature, you can merge it into master

\* Once it is merged and pushed to 'master', you can and should deploy immediately

# Blank[][57][][57]

What it Does

What it Doesn't (yet)



[0]: #h.bggjjh92getq
[1]: #h.koqjkwwd79kw
[2]: #h.m354s1yfxc7h
[3]: #h.9ckh54nxrva3
[4]: #h.ez4cl1dejtpj
[5]: #h.wdisfsvmkj7
[6]: #h.ixs6rv5euu64
[7]: #h.j7im06bt87g
[8]: #h.acm67hexqo1v
[9]: #h.6k4c8f25pdrn
[10]: #h.epeu0wbpzdl3
[11]: #h.71jphpsicv4u
[12]: #h.gtbxmgm10vr4
[13]: #h.62ysruk9plet
[14]: #h.g4z3dt1dcfro
[15]: #h.io61jshh13ud
[16]: #h.sgigfjqer9kx
[17]: #h.7s2e5hmj9z
[18]: #h.mf33992ydzvd
[19]: #h.z4uy0s7lhkyg
[20]: #h.rg20x6n03uq5
[21]: #h.nnrr92orz2n8
[22]: #h.xxez2fc5ikxn
[23]: #h.ceiqwe6snmrd
[24]: #h.nqc5svp01ib2
[25]: #h.rcf7uxonxw9g
[26]: #h.2pdm0wcuo4a2
[27]: #h.amykebv3qph2
[28]: #h.llcovc97lhwp
[29]: #h.ly1taj9ms9j2
[30]: #h.alicss4mxjnn
[31]: #h.kx9jl2ozp5en
[32]: #h.4dhllvw0xtko
[33]: #h.69fsnafazrv7
[34]: #h.xxx0t25gy31i
[35]: #h.sgduhq46b4wb
[36]: #h.fxx2epye2igz
[37]: #h.a29xye1pkzwk
[38]: #h.7x7x2o6lhotb
[39]: #h.sluvipli6v5q
[40]: #h.normqaweovxl
[41]: #h.ut5oul5ze08w
[42]: #h.9zfnabqb4yf5
[43]: #h.549nhwcbra60
[44]: #h.9daridstim51
[45]: #h.b9e7du3qbsae
[46]: #h.2jwhi7jmn84t
[47]: #h.ofhrwq7rq2t5
[48]: #h.ayrt18kl2rsa
[49]: #h.mp3m83ristpl
[50]: https://github.com/kristopolous/Porter-Stemmer
[51]: http://foresight.breakthroughstocures.org/about
[52]: http://foresight.breakthroughstocures.org/dashboard
[53]: http://www.appelsiini.net/projects/jeditable
[54]: https://github.com/jquery/globalize
[55]: https://github.com/dannycoates/node-inspector
[56]: https://github.com/niftylettuce/express-cdn#how
[57]: #
[58]: http://developers.facebook.com/docs/technical-guides/opengraph/simple-object-types/
[59]: http://developers.facebook.com/docs/technical-guides/opengraph/complex-object-types/#quantity
[60]: http://ivaynberg.github.com/select2/
[61]: https://npmjs.org/package/nools
[62]: http://mbostock.github.com/d3/talk/20111018/tree.html
[63]: http://mbostock.github.com/d3/talk/20111116/pack-hierarchy.html
[64]: http://mousesearch3d.com/
[65]: http://openlayers.org/dev/examples/strategy-cluster.html
[66]: http://openlayers.org/dev/examples/strategy-cluster-threshold.html
[67]: http://stackoverflow.com/questions/6641919/openlayers-nice-marker-clustering
[68]: http://acuriousanimal.com/code/animatedCluster/
[69]: http://cesium.agi.com
[70]: http://wiki.openstreetmap.org/wiki/Nominatim
[71]: http://server.com/dome.php?1239382902
[72]: http://wikimapia.org
[73]: http://backbonejs.org/#introduction
[74]: https://github.com/bevry/query-engine
[75]: https://github.com/davidgtonge/backbone_query
[76]: http://twitter.github.com/bootstrap/
[77]: https://github.com/epeli/underscore.string#readme
[78]: http://jhollingworth.github.com/bootstrap-wysihtml5/
[79]: http://bootboxjs.com/
[80]: http://bruth.github.com/synapse/docs/
[81]: http://wiki.iks-project.eu/index.php/VIE
[82]: https://github.com/kendagriff/backbone.analytics
[83]: https://github.com/mlanza/thingy-client
[84]: http://treeline.bellz.org/download.html
[85]: http://semantic-mediawiki.org/wiki/Semantic_MediaWiki_Plus
[86]: http://craig.is/killing/mice
[87]: http://scottchacon.com/2011/08/31/github-flow.html