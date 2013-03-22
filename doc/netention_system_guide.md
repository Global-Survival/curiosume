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

[Sensors][7]

[Mapping][8]

[Quality of Life][9]

[Geological][10]

[SEIS][11]

[Incidents][12]

[Water and food][13]

[Shelter][14]

[Hotels][15]

[Safety][16]

[Crime][17]

[UFO Reports][18]

[Fire Protection][19]

[Freedom and Human Rights][20]

[Environment & Pollution][21]

[Radiation and Nuclear Threats][22]

[MEXT][23]

[Pachube][24]

[FLEXPART Atmospheric Simulation][25]

[Chemtrails][26]

[US Cell Towers][27]

[Water Quality][28]

[Hydrofracking][29]

[Energy][30]

[Communication (Mail, Phone, Internet)][31]

[Healthcare][32]

[Life Expectancy][33]

[Addiction Mitigation][34]

[Pharmacies][35]

[Hospitals][36]

[Doctors][37]

[Epidemiology][38]

[Childcare][39]

[Employment][40]

[Education][41]

[Transportation][42]

[Sex][43]

[Population size and demographics, ex: of members of specific gender per age][44]

[Waste Disposal][45]

[Economic, Financial, and Corporate][46]

[Banks, ATM's, Credit Unions][47]

[TheyRule.net Data Sources][48]

[Exploring Enron][49]

[Board to Death][50]

[Gapminder][51]

[Agriculture][52]

[Natural Disasters][53]

[Extreme Temperatures][54]

[Earthquakes][55]

[Volcanoes][56]

[Fires][56]

[Floods][56]

[Tsunamis][56]

[Storms, Tornadoes, and Hurricanes][56]

[Travel][56]

[Wildlife][57]

[Urban Smart / Sensor Grids][58]

[Psychological & Demographics][59]

[Hardware and AI Classification / Feature Detection][60]

[Resources][61]

[List of Thinking Subjects][62]

[Plutchik's Primary Emotions][63]

[Patrick Anderson's Word List][64]

[Story Elements][65]

[Psychogenic Human Needs][66]

[Abraham Maslow's Hierarchy][67]

[Erich Fromm][68]

[According to Fromm, basic needs include the need for relatedness, transcendence, rootedness, identity and a frame of orientation.][69]

[Murray Biological and Psychogenic Needs & Thematic Appreciation Test (TAT)][70]

[Murrays Psychogenic Needs][71]

[1\. Ambition Needs][72]

[2\. Materialistic Needs][73]

[3\. Power Needs][74]

[4\. Affection Needs][75]

[5\. Information Needs][76]

[Maslow's Hierarchy of Needs][77]

[Five Levels of the Hierarchy of Needs][78]

[Characteristics of Self-Actualized People][79]

## Web: [http://netention.org][80]

## Source code: [https://github.com/automenta/netentionjs2][81]

# 

# Installation

## 

## Ubuntu 12.10

sudo apt-get install git npm mongodb g++ libxml2-dev make  

//install nodejs

wget[][82][http://nodejs.org/dist/v0.8.14/node-v0.8.14.tar.gz][82]

tar xvzf node-v0.8.14.tar.gz

cd node-v0.8.14

./configure

make -j2

sudo make install

cd ..

git clone[][83][https://github.com/automenta/netentionjs2.git][83] netention  
cd netention

npm install

sudo npm install always -g

npm install --force htmlparser jsdom apricot

sudo ln -s /usr/bin/nodejs /usr/bin/node

Basically it needs node.js, the latest version, and then certain libraries installed via 'npm' the node package manager (i'll list them in the instructions).  then run web.sh (which uses the very helpful '[always][84]' package) and visit on port 8080 (specified in config.js).

the client/ folder is served publicly by the webserver as static files.  this includes client-side html and javascript.

client/sensor contains the sensor hierarchy.  some of the files (without .client.js) may be used by the server.  this just keeps them in one place, organized by sensor category.

server/ contains server-side specific code.

## Windows 7

1\. Setting up the environment

-Install node.js

[http://nodejs.org/download/][85]

[][85]

-Download and install mongodb

[http://www.mongodb.org/downloads][86]

[http://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/][87]

[][87]

2\. Get the code

-install github for windows :[][88][http://windows.github.com/][88]

[][88]

-Go to :[][81][https://github.com/automenta/netentionjs2][81]

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

you can then visit[][89][http://localhost:8080][89] in your browser

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

# Sensors

## Mapping

[http://en.wikipedia.org/wiki/Public\_Participation\_GIS][90]

[http://en.wikipedia.org/wiki/Collaborative\_mapping][91]

[http://en.wikipedia.org/wiki/Participatory\_GIS][92]

[http://en.wikipedia.org/wiki/Neighborhood\_planning][93]

[http://en.wikipedia.org/wiki/Volunteered\_Geographic\_Information][94]

[http://en.wikipedia.org/wiki/Web\_mapping][95]

[http://en.wikipedia.org/wiki/Neogeography][96]

[][96]

[][96]

## Quality of Life

[http://en.wikipedia.org/wiki/Quality\_of\_life][97]

http://en.wikipedia.org/wiki/Gross\_National\_Happiness

[http://en.wikipedia.org/wiki/Physical\_Quality\_of\_Life\_Index][98]

[http://en.wikipedia.org/wiki/Quality-of-life\_index][99]

[http://en.wikipedia.org/wiki/Quality\_of\_life\_%28healthcare%29][100]

http://en.wikipedia.org/wiki/Satisfaction\_with\_Life\_Index

http://en.wikipedia.org/wiki/Happiness\_economics

[http://en.wikipedia.org/wiki/Legatum\_Prosperity\_Index][101]

http://en.wikipedia.org/wiki/Global\_Peace\_Index

[http://en.wikipedia.org/wiki/UN\_Human\_Development\_Index][102]

[http://en.wikipedia.org/wiki/Human\_Poverty\_Index][103]

[http://en.wikipedia.org/wiki/Human\_Development\_Index][104]

http://en.wikipedia.org/wiki/Happy\_Planet\_Index

[http://en.wikipedia.org/wiki/Standard\_of\_living][105]

http://en.wikipedia.org/wiki/Happiness

http://en.wikipedia.org/wiki/Human\_rights

[http://en.wikipedia.org/wiki/Emotional\_well-being][106]

http://en.wikipedia.org/wiki/World%27s\_most\_livable\_cities

# 

MQTT

[http://mqtt.org/][107]

[][107]

EEML

[http://www.eeml.org/][108]

[][108]

OpenStreetMap Potential Datasources (BIG)

[http://wiki.openstreetmap.org/wiki/Potential\_Datasources][109]

[][109]

COSM / PACHUBE:[][110][http://pachube.com][110]

Semantic Community

[http://semanticommunity.info/][111]

[][110]

GeoNetwork

[http://geonetwork-opensource.org/gallery/gallery.html][112]

[  
][112]GeoNetwork nodes  
  
FAO GeoNetwork - http://www.fao.org/geonetwork  
Food and Agriculture Organization of the United Nations GeoNetwork  
  
WFP VAM-SIE Headquarters - http://vam.wfp.org/geonetwork  
United Nations World Food Programme GeoNetwork  
  
UNEP Headquarters - http://www.ecomundus.net  
ecoMundus - Network for Environmental Information and Data  
  
WHO Headquarters - http://www.who.int/geonetwork  
World Health Organization GIS Resources  
  
CGIAR-CSI Main GeoNetwork Node - http://geonetwork.csi.cgiar.org  
CGIAR-CSI - Consortium for Spatial Information - Main node  
  
GEOSS GEOportal - http://www.geoportal.org  
The GEOportal provides an entry point to access Earth Observation information and services. Developed by ESA and FAO. GEOportal uses GeoNetwork for the catalog. InterMap is used as map viewer.  
  
New Zealand's Geodata.govt.nz - http://www.geodata.govt.nz  
New Zealand's catalogue of publicly-funded geospatial data  
  
Napier City Council GeoNetwork - http://www.gis.napier.govt.nz/geonetwork  
Napier City Council - New Zealand  
  
Dutch National Geo Registry - http://www.nationaalgeoregister.nl  
Nationaal Geo Register - The Netherlands  
  
Impetus GeoNetwork - http://geonetwork.impetus.uni-koeln.de  
An interdisciplinary research project from Germany (University of Cologne and Bonn  
  
IVS FEB RAS GeoNetwork - http://geoportal.kscnet.ru/geonetwork/  
Institute of Volcanology and Seismology of FEB RAS, Russia  
  
Brasil IBGE GeoNetwork - http://www.metadados.geo.ibge.gov.br/  
IBGE - Instituto Brasileiro de Geografia e Estatstica (Brazilian Institute of Geography and Statistics)  
  
Brasil INDE - http://www.metadados.inde.gov.br/  
Metadata catalog of INDE (National Infrastructure of Spatial Data)  
  
MMA - http://mapas.mma.gov.br/geonetwork/  
Ministerio do Meio Ambiente, Brasil Geo processamento  
  
SADC - http://www.sadc.int/geonetwork  
Southern African Development Community  
  
SANDRE - http://sandre.eaufrance.fr/geonetwork  
Le Service d'Administration Nationale des Données et Référentiels sur l'Eau  
  
SOPAC - Pacific Islands Applied Geoscience Commision - http://geonetwork.sopac.org  
SOPAC Geonetwork for Oceanographic data and information  
  
UNSDI-NCO - http://www.geonetwork.nl/  
GeoNetwork portal of the Netherlands Coordination Office of UNSDI  
  
PBL - Netherlands Environmental Assessment Agency - http://geoservice.pbl.nl/geonetwork/srv/en/main.home  
Geo-products of the Netherlands Environmental Assessment Agency  
  
UNGIWG - SALB - http://salbgeonetwork.grid.unep.ch/geonetwork/srv/en/main.home  
Second Administrative Level Boundaries  
  
AfroMaison - http://afromaison.grid.unep.ch:8080/geonetwork/  
UNEP-GRID's EU Framework Programme AfroMaison portal  
  
geoNorge - http://www.geonorge.no/geonetwork/srv/en/main.home  
Norge digitalt  
  
WODGIK - Katowice - http://www.wodgik.katowice.pl:8080/geonetwork/srv/en/main.home  
Portal Katalogowy  
  
FEB RAS - http://geoportal.kscnet.ru/geonetwork/srv/en/main.home  
Institute of Volcanology and Seismology  
  
IDE - http://138.100.63.169:8082/geonetwork/srv/es/main.home  
Comunidades Rurales del Milenio Universidad Politecnica de Madrid  
  
AIMS - http://data.aims.gov.au/geonetwork/srv/en/main.home  
Australian Institute of Marine Science  
  
AODN - http://waodn.ivec.org/geonetwork/srv/en/main.home  
Australian Ocean Data Network  
  
CSIRO - http://mdu-data.arrc.csiro.au/geonetwork/srv/en/main.home  
Minerals Down Under  
Integrated Marine Observing System - http://imosmest.aodn.org.au/geonetwork/srv/en/main.home  
  
NIWA, the National Institute of Water and Atmospheric Research - http://dc.niwa.co.nz/  
NIWA's in-house dataset catalogue  
  
NZ Ocean Survey data - http://www.os2020.org.nz/data-and-reports/ and http://dc.niwa.co.nz/boi\_dc/  
Bay of Islands Ocean Survey 2020 - Metadata catalog  
  
Census of Antarctic Marine Life - http://dc.niwa.co.nz/nz-ipy-caml  
The International Polar Year/CAML Antarctic research programme with a survey in the Ross Sea  
  
New Zealand Department of Conservation - https://dc.niwa.co.nz/docthreats\_dc  
Resources to help identify & respond to potential impacts on the NZ marine environment  
WAGCOE - https://wagcoe.ivec.org/geonetwork/srv/en/main.home  
PACIVUR - http://www.pacivur-geocatalogo.ird.fr/geonetwork/srv/en/main.home  
  
INDE - http://www.metadados.inde.gov.br/geonetwork/srv/en/main.home  
Infraestrutura Nacional de Dados Espaciais  
IGM Geoportal - http://www.geoportaligm.gob.ec/geonetwork/srv/en/main.home  
SMIT - CENAPRED - http://smit.cenapred.gob.mx:8080/geonetwork/srv/en/main.home  
GEO/IDEP - http://www.geoportaligm.gob.ec/geonetwork/srv/en/main.home  
  
CARPE - http://congo.iluci.org:8080/geonetwork/srv/en/main.home  
Central Africa Regional Program for the Environment  
  
NCCH - http://www.saeonocean.co.za/geonetwork/srv/en/main.home  
South Africa portal  
South African Environmental Observation Network - http://www.saeonocean.co.za/geonetwork/srv/en/main.home  
Volta Basin Authority - http://131.220.109.2/geonetwork/srv/en/main.home  
Pusat linkungan geologi - http://122.200.145.136/geonetwork/srv/en/main.home  
  
TABI - http://www.tabi.la/geonetwork/srv/en/main.home  
The Agrobiodiversity Initiative  
  
ISRIC - http://85.214.194.220/geonetwork/srv/en/main.home  
World Soil Information  
North Pacific Marine Science Organization - http://67.212.128.197/geonetwork/srv/en/main.home  
One Geology - http://onegeology-catalog.brgm.fr/geonetwork/srv/en/main.home  
  
CIAT GeoNetwork Node - http://gisweb.ciat.cgiar.org:8080/geonetwork/srv/en/main.home  
CGIAR-CSI - Consortium for Spatial Information Centro CIAT - Internacional de Agricultura Tropical  
IWMI GeoNetwork Node - http://geonetwork.iwmi.org  
ICRISAT GeoNetwork Node - http://geonetwork.icrisat.org  
ICARDA GeoNetwork Node - http://geonet.icarda.cgiar.org/geonetwork  
CPWP Project Geonetwork Node - http://geonetwork.waterandfood.org/

AGI / Cesium Datasets

http://www.agi.com/resources/downloads/data/

Environmental Protection Agency

[http://www.epa.gov/regulations/][113]

[][113]

United Nations

[http://data.un.org/][114]

[][114]

CIA World Factbook

[https://www.cia.gov/library/publications/the-world-factbook/][115]

[http://www.kmlfactbook.org/\#&db=wri&table=3\_812&col=2000&][116]
    
1.  Climate and Atmosphere  
    Forests, Grasslands and Drylands  
    Population, Health and Human Well-being  
    Energy and Resources  
    Economics, Business, and the Environment  
    Agriculture and Food  
    Biodiversity and Protected Areas  
    Water Resources and Freshwater Ecosystems  
    Coastal and Marine Ecosystems  
    Environmental Governance and Institutions

[][117]

NASA Worldwind: many demo applications with data

[http://goworldwind.org/demos/][118]

[][118]

GraDS Geological Servers

[http://www.iges.org/grads/gds/][119]

[][119]

Media Watch on Climate Change

http://www.ecoresearch.net/climate/

HomeFacts.com

Population: 311,640

DEMOGRAPHICS

Cost Of Living Index: 91.93

Crime Index: 201.23

CRIME DATA

416 Offenders

OFFENDERS

Unemployment: 7.8%

UNEMPLOYMENT

166 Schools

SCHOOLS

Household Median Income $37,461

Air Pollution Index: 

AIR QUALITY

Max July Temp: 84.5°F Min Jan Temp: 19.8°F

162 days with sunshine

Tornado Risk

TORNADO RISK

Earthquake Risk

EARTHQUAKE RISK

Governor

POLITICS

23 Polluters

POLLUTERS

Area Average Property Tax: 1.99%

2 Former Drug Labs

DRUG LABS

UV Index Grade

UV INDEX

46 Police Stations

POLICE STATIONS

73 Fire Stations

FIRE STATIONS

11 Hospital

HOSPITALS

3 Airports

AIRPORTS

33 Nursing Homes

NURSING HOMES

Bachelor's Degree or Higher: 32.59%

38 Colleges Universities

COLLEGES

51 FCC Towers

FCC TOWERS

39 Libraries

LIBRARIES

35 Cemeteries

CEMETERIES

431 Grocery Stores 

23 Brownfields

BROWNFIELDS

Radon Level: High

RADON

Air Quality

Weather

UV Index

Drug Labs

FCC Towers

Police Stations

Fire Stations

Hospitals

Nursing Homes

Colleges

Airports

Libraries

Cemeteries

Real Estate

Religions

Superfund

UST/LUST

Brownfields

Radon

Unemployment

[http://sedac.ciesin.org/data.html][120]

lots of datasets

[http://data.un.org/][114]

international

[http://geodata.grid.unep.ch/][121]

more UN environmental data

[http://en.wikipedia.org/wiki/Crime\_mapping][122]

[http://www.crimereports.com/][123]

[http://www.crimemapping.com/][124]

[][124]

[][124]

[http://www.google.com/publicdata/overview?ds=d5bncppjof8f9\_][125]

[http://data.worldbank.org/][126]

[http://data.worldbank.org/indicator][127] (420 indicators)

NASA \#OpenData: What Will YOU Create?:[][128][http://www.rhok.org/node/2608][128]

[][128]

[][128]

[https://www.opensource.gov/][129]

The Open Source Center (OSC) is the US Government's premier provider of foreign open source intelligence

[http://www.bbc.co.uk/news/technology-14841018][130]

[][130]

## Geological

### SEIS

"The Shared Environmental Information System (SEIS) is a collaborative initiative of the European Commission and the European Environment Agency (EEA). Its objective is to establish together with the Member States an integrated and shared EU-wide information system to simplify monitoring and reporting of environmental data and information."

[http://ec.europa.eu/environment/seis/newsletter/issue\_003.html][131]

[][131]

This 'system of systems' will proactively link together existing and planned observing systems around the world and support the development of new systems where gaps currently exist. It will promote common technical standards so that data from the thousands of different instruments can be combined into coherent data sets. The 'GEOPortal' offers a single Internet access point for users seeking data, imagery and analytical software packages relevant to all parts of the globe. It connects users to existing data bases and portals and provides reliable, up-to-date and user friendly information -- vital for the work of decision makers, planners and emergency managers. For users with limited or no access to the Internet, similar information is available via the 'GEONETCast' network of telecommunication satellites.

[http://www.earthobservations.org/geoss.shtml][132]

[][132]

Funding :[][133][http://ec.europa.eu/environment/seis/funding.htm][133]

[][133]

Ocean Buoys and Tsunamis

[http://www.ndbc.noaa.gov/obs.shtml][134]

[][134]

Thematic Realtime Environmental Distributed Data Services: THREDDS

[http://www.unidata.ucar.edu/projects/THREDDS/][135]

[][135]

NOAA Space Weather Alerts

[http://www.swpc.noaa.gov/alerts/archive/current\_month.html][136]

[][136]

NOAA Space Weather Data

http://www.swpc.noaa.gov/ftpmenu/lists.html

### Incidents

[http://www.globalincidentmap.com/][137]

[][137][GlobalIncidentMap.com][137] [][138][Amber-Alert Map][138] [][139][HAZMAT Situations Map][139] [][140][Forest Fires Map][140] [][141][Disease Outbreaks Map][141] 

[][142][Gang Activity Map][142] [][143][Border Security Issues][143] [][144][Presidential Threat Map][144] [][145][Terrorism Event Predictions][145] [][146][New - Quakes Map][146] 

[][147][Drug Interdictions Map][147] [][148][Non-Terror Aviation Incidents][148] [][149][NEW - Food/Medicine Incidents][149] [][150][NEW - Human Trafficking][150] 

Crisis Mappers

http://crisismappers.net

## Water and food

(availability of water, nutrients, and herbs)

[http://en.wikipedia.org/wiki/Foodshed][151]

[][151]

Foodshed Mapping

http://www.cals.cornell.edu/cals/css/extension/foodshed-mapping.cfm

## Shelter

Availability of room to live and sleep

Porches, Bridges & Overpasses (provide temporary shelter from precipitation)

## Hotels

Humanitarian & International Relief Organizations

[http://en.wikipedia.org/wiki/Category:Humanitarian\_aid\_organizations][152]

http://www.exploringabroad.com/humanitarian-org.htm

## Safety

Crime and Violence

### Crime

http://en.wikipedia.org/wiki/Crime\_mapping

https://www.crimereports.com/

[http://en.wikipedia.org/wiki/CompStat][153]

[][153]

### UFO Reports

[http://www.mufon.com/mufonreports.html][154]

[http://www.ufostalker.com/?mufon=true][155]

### Fire Protection

### Freedom and Human Rights

## Environment & Pollution

### Radiation and Nuclear Threats

[http://en.wikipedia.org/wiki/Nuclear\_decommissioning][156]

http://www.google.com/fusiontables/DataSource?dsrcid=579216&search=nuclear&cd=2
    
1.  [http://www.google.com/fusiontables/DataSource?dsrcid=579353&search=nuclear&cd=5][157]
1.  [http://www.google.com/fusiontables/DataSource?dsrcid=578937&search=nuclear&cd=12][158]

[][158]

[][158]

IAEA Nuclear Facilities

[http://www.google.com/fusiontables/DataSource?dsrcid=579353&search=nuclear&cd=5][157]

[][157]

Europe Radiaton Network

http://eurdep.jrc.ec.europa.eu/Basic/Pages/Public/Home/Default.aspx

#### MEXT

http://orm.dip.jp/data/

US Nuclear Regulatory Commision Event Reports

http://www.nrc.gov/reading-rm/doc-collections/event-status/event/

Toxic Release Inventory

[http://www.epa.gov/tri/][159]

[][159]

US Superfund Sites (Hazardous and Toxic Sites Needing to be Cleaned Up)

[http://en.wikipedia.org/wiki/Superfund\#Accessing\_Superfund\_data][160]

[][160]

WiFi Electrosmog

[http://www.acousticecology.org/srwifi.html][161]

meaningful application of googles horsepower on googles retracted wifi triangulation data

EPA Datasets

[http://www.epa.gov/enviro/facts/ef\_restful.html][162]

### Pachube

http://api.pachube.com/v2/feeds.xml?units=%C2%B5Sv/h&per\_page=2000&order=created\_at&key=YOURKEYGOESHERE

http://api.pachube.com/v2/feeds.xml?units=nGy/h&per\_page=2000&order=created\_at&key=YOURKEYGOESHERE

EPA Air Quality Reports

[http://AirNow.gov][163]

"NETA" Network?

### FLEXPART Atmospheric Simulation

[http://transport.nilu.no/flexpart][164]

[][164]

### Chemtrails

[http://chemtrailsmap.com/][165]

[][165]

### US Cell Towers

[http://www.cellreception.com/towers/][166]

[][166]

### Water Quality

[http://waterdata.usgs.gov/nwis/qw][167]

### 

### Hydrofracking

http://www.hydraulicfracturingdisclosure.org/fracfocusfind/

## Energy

Gas and Electricity

[http://nuclear.carboncapturereport.org/cgi-bin/topic][168]

Power Plants, Fuels & Resources, Transmission, Consumers (cross-ref w/ Pollution)

[http://globalenergyobservatory.org/select.php?tgl=Kml][169]

[][169]

Realtime Power Outage Map (US)

[http://outagecentral.com/][170]

## Communication (Mail, Phone, Internet)

Internet Traffic Report

http://www.internettrafficreport.com

## Healthcare

### Life Expectancy

### Addiction Mitigation

(Substance Abuse, etc...)

### Pharmacies

### Hospitals

### Doctors

### Epidemiology

[http://en.wikipedia.org/wiki/Cancer\_cluster][171]

[http://en.wikipedia.org/wiki/Biostatistics][172]

[http://en.wikipedia.org/wiki/Cancer\_epidemiology][173]

[][173]

[][173]

## Childcare

## Employment

[http://www.helpx.net][174]

[][174]

## Education

## Transportation

## Sex

## Population size and demographics, ex: of members of specific gender per age

## Waste Disposal

Sewage, garbage collection

## Economic, Financial, and Corporate

## Banks, ATM's, Credit Unions

[http://www.neural-forecasting.com/neural\_forecasting\_data.htm][175]

Micro- and Macroeconomic Data

Three websites guide practitioners, researchers, and students to data. The data can be used for econometric methods or analogous situations, or to adjust data such as to account for inflation or population.
    
1.  [EconData.Net][176] provides access to regional, state, and local economic data. It is a comprehensive first stop for searching public and private data sources on the Web.
1.  [Statistical Resources on the Web][177] (University of Michigan) has a detailed A-Z index and provides thousands of links to sites in business, economics, transportation, weather, and 18 other areas.
1.  [Social Science Data on the Net][178] (University of California, San Diego) allows you to search the following sites. Much of the data can be downloaded.

[][0][][0]

1.  Census Bureau
1.  Data FERRET (Current Population Survey and related sources)
1.  FedStats (Statistics from 70 U.S. Federal Agencies)

1.  ICPSR (Inter-University Consortium for Political and Social Research)
1.  Stat-USA (Current and historical financial and economic data

1.  The[][179][Survey of Professional Forecasters][179] is a quarterly survey of macroeconomic forecasts.
1.  The[][180][Conference Board][180] provides economic and business cycle indicators.
1.  US Macroeconomic data can be purchased from[][181][USInfostore.com][181].
1.  Financial Data:        stock indices & individual stocks[][182][http://finance.yahoo.com/][182] --\> historical prices by symbol
1.  currencies:[][183][http://fx.sauder.ubc.ca/][183] ---\> database retrieval
1.  [http://www.oanda.com/][184] --\> FXHistory

### TheyRule.net Data Sources

[Transnationale.org][185]

Sunday, March 7, 2010 - 09:43

If you want to find out what company owns a brand -[][186][transnationale.org][186] is a prime place to check. It is an extensive database that not only tracks the brand ownership of multinationals but also connects them to environmental and labor violations.

[Full post][185]

[][185]

[Interactive political map of the West Bank][187]

Tuesday, September 16, 2008 - 23:00

This[][188][Guardian interactive map of the occupation of the West Bank][188] is a beautiful exposition of the extent of the occupation. It leads the viewer through a series of clicks which turn on map elements revealing the dominance of the Israeli occupation one aspect at a time.

[Full post][187]

[][187]

[A number that won't get any smaller][189]

Wednesday, October 3, 2007 - 23:00

[Full post][189]

[][189]

[Corporate Collective Consciousness][190]

Monday, August 13, 2007 - 23:00

Isn't it lovely that corpoations, basically people like the rest of us, can edit wikipedia. Use[][191][Wiki Scanner][191] to see what your least favorite Fortune 500 company has been using their free speech for.

[Full post][190]

[][190]

[wheresgeorge.com - money and epidemics][192]

Tuesday, January 31, 2006 - 00:00

So it turns out money is like a disease!

"Using a[][193][popular internet game][193] that traces the travels of dollar bills, scientists have unveiled statistical laws of human travel in the United States, and developed a mathematical description that can be used to model the spread of infectious disease in this country. This model is considered a breakthrough in the field."[][194][Read the full article here.][194] From[][195][SOCNET][195].

[Full post][192]

[][192]

[Cryptome][196]

Monday, January 2, 2006 - 00:00

Boing Boing had a[][197][link][197] to Cryptome[][198][Cryptome][198] this morning. According to[][199][Wikipedia][199] Cryptome is: "a controversial website, hosted in the United States by its owner John Young, that functions as a repository for information that is prohibited or suppressed by various governments."

[Full post][196]

[][196]

[Disappeared in America][200]

Wednesday, December 7, 2005 - 00:00

From Site:

[Full post][200]

## [Exploring Enron][201]

Monday, November 21, 2005 - 00:00

From the site: :Using the Enron e-mail archive as a motivating dataset, we are attempting the marriage of visual and algorithmic analyses of e-mail archives within an exploratory data analysis environment. The intent is to leverage the characteristic strengths of both man\[sic\] and machine for unearthing insight. Below are a few sketches from a preliminary exploration into the design space of such tools." Site by Jeffrey Heer - thanks to Michael Dale for sending me the link.

[Full post][201]

## [Board to Death][202]

Saturday, September 3, 2005 - 23:00

Adbusters[][203][reviews][203] California's Sonoma State University examination of the resumes of the 118 people who sit on the boards of directors of America's ten largest media organizations.

[Full post][202]

## [Gapminder][204]

Saturday, August 20, 2005 - 23:00

"CHALLENGE: Let's make data on world development understandable, enjoyable and free!"

[Gapminder.org][205]

[Full post][204]

[][204]

[][204]

## Agriculture

Wild-growing Food (ex: Mulberries)

IC.org (Intentional Communities)

[http://directory.ic.org/maps/default.xml][206] is ic.org's XML file used in their map, containing ~2300 datapoints which seems to be only a fraction of IC.org directory. scraping their directory is a next step to get all the contact information and details about each community

## Natural Disasters

Earthquakes, Volcanoes, Fires, etc..

[http://www.globaldatavault.com/natural-disaster-threat-maps.htm][207]

[http://hisz.rsoe.hu/alertmap/][208]

[][208]

## Extreme Temperatures

Heating and Cooling Centers

[http://en.wikipedia.org/wiki/Cooling\_center][209]

[http://en.wikipedia.org/wiki/Warming\_center][210]

[][210]

## Earthquakes

http://www.usgs.gov/

http://earthquake.usgs.gov/earthquakes/catalogs/index.php

## Volcanoes

## Fires

## Floods

## Tsunamis

## Storms, Tornadoes, and Hurricanes

## 

## Travel

Airports, Train Stations, Bus Stops, ...

## Wildlife

Animal homes/nests/...

Animal shelters

Animal migration routes

## Urban Smart / Sensor Grids

[http://www.scientificamerican.com/article.cfm?id=ratti-smartest-cities-use-people-as-sensors][211]

[][211]

## Psychological & Demographics

ex: tell me about parties in each city around the world or what type of music is loved by any given population

# Hardware and AI Classification / Feature Detection

[http://thenewamerican.com/tech/item/13613-darpa-sponsors-surveillance-technology-to-predict-future-behavior][212]

[http://www.darpa.mil/NewsEvents/Releases/2011/09/28.aspx][213]

# Resources

AI and Simulation-Based Techniques for the Assessment of Supply Chain Logistic Performance

[http://portal.acm.org/citation.cfm?id=786227][214]

The effectiveness of logistic network design andmanagement for complex and geographically distributedproduction systems can be measured in terms of directlogistic costs and in terms of supply chain productionperformance. The management of transportation logistics,for instance, involves difficult trade-offs among capacityutilization, transportation costs, and productionvariability often leading to the identification of multiplelogistic solutions. This paper defines and compares threedifferent modeling approaches to systematically assesseach identified logistic alternative in terms of actualtransportation costs and expected production losses. Thefirst modeling approach examined in the paper is amathematical model which provides the statistical basisfor estimating costs and risks of production losses insimple application cases. The second model is astochastic,discrete event simulation model of bulkmaritime transportation specifically designed to capturethe dynamic interactions between the logistic network andthe production facilities. The third one is an AI-basedmodel implemented as a modular architecture of ArtificialNeural Networks (ANNs). In such an architecture eachnetwork establishes a correlation between the logisticvariables relevant to a specific sub-problem and thecorresponding supply chain costs. Preliminary testing ofthe three models shows the relative effectiveness andflexibility of the ANN-based model; it also shows thatgood approximation levels may be attained when eitherthe mathematical model or the simulation model are usedto generate accurate ANN training data sets for eachtransportation/production sub-problem.

[http://at-scm.com/index.php/2006/12/04/supply-chain-management/artificial-intelligence-in-supply-chains/][215]

[http://at-scm.com/index.php/2006/11/13/supply-chain-management/rea-a-semantic-model-for-internet-supply-chain-collaboration/][216]

REA:[][217][http://jeffsutherland.org/oopsla2000/mccarthy/mccarthy.htm][217]

Remember the ERP information flow?

PO-\>EDI-\>CO-\>MPS-\>MRP-\>CRP-\>WO-\>PO-\>EDI-\>CO etc.

The REA information flow is much simpler:

Process-\>Stock Flow-\>Exchange-\>Stock Flow-\>Process etc. across multiple companies.

[http://en.wikipedia.org/wiki/Basic\_human\_needs][218]

[http://en.wikipedia.org/wiki/Maslow%27s\_hierarchy\_of\_needs][219]

[http://en.wikipedia.org/wiki/Murray's\_psychogenic\_needs][220]

[http://en.wikipedia.org/wiki/Environmental\_law][221]

[http://en.wikipedia.org/wiki/Standard\_of\_living][105]

[http://en.wikipedia.org/wiki/Planetary\_habitability][222]

[http://en.wikipedia.org/wiki/Survival\_skills][223]

[http://en.wikipedia.org/wiki/Metamotivation][224]

[][224]

[http://earthengine.googlelabs.com][225]

[][225]

[http://www.futurict.ethz.ch/FuturIcT][226]

[][226]

[http://code.google.com/apis/maps/][227]

[http://tables.googlelabs.com/Home][228]

[http://googlegeodevelopers.blogspot.com/2010/11/five-great-fusion-tables-maps-examples.html][229]

[][229]

[http://multiverseaccordingtoben.blogspot.com/2010/12/will-decreasing-scarcity-allow-us-to.html][230]

[][230]

[http://www.roboearth.org][231]

[][231]

[http://www.appropedia.org/Hexayurt\_mass\_evacuation][232]

[][232]

[http://en.wikipedia.org/wiki/ISO\_6709][233] (latitude, longitude, altitude)

http://www.poodwaddle.com/clocks/worldclock

http://www.poodwaddle.com/clocks/worldclock/sources

[http://www.stratfor.com/][234]

[http://www.mi2g.com/][235]

# List of Thinking Subjects

(from: http://en.wikipedia.org/wiki/Nootropics)

[Abstract thinking][236]

[Attention][237]

[Attitude][238]

[Brainstorming][239]

[Cognition][240]

[Cognitive science][241]

[Creative thinking][242]

[Critical thinking][243]

[Curiosity][244]

[Decision][245]

[Decision making][246]

[Eidetic memory][247]

[Emotions][248] and [feelings][249]

[Emotional intelligence][250]

[Goals and goal setting][251]

[Idea][252]

[Imagination][253]

[Intelligence][254]

[Introspection][255]

[Lateral thinking][256]

[Learning][257]

[Memory][258]

[Memory-prediction framework][259]

[Mental calculation][260]

[Mind's eye][261]

[Mindset][262]

[Mood][263]

[Motivation][264]

[Perception][265]

[Personality][266]

[Picture thinking][267]

[Problem shaping][268]

[Problem solving][269]

[Reason][270]

[Recollection (recall)][271]

[Self-reflection][272]

[Thought][273]

[Visual thinking][274]

List of Health Subjects

(from [http://en.wikipedia.org/wiki/Nootropics][275])

[Anxiety][276]

[Cognitive psychology][277]

[Clinical depression][278]

[Confusion][279]

[Cosmetic pharmacology][280]

[Drug][281]

[Parasympathomimetics][282]

[Prescription drug][283]

[Prohibition (drugs)][284]

[Psychoactive drug][285] (aka psychotropic drug)

[Psychedelic drug][286]

[Human enhancement][287]

[Ergogenic aid][288]

[Life extension][289]

[Neurodegenerative disease][290]

[Alzheimer's disease][291]

[Parkinson's disease][292]

[Nutrition][293]

[Sleep disorders][294]

[Stress][295]

[Stress management][296] 

Optimal Thinking Questions

http://www.stevepavlina.com/blog/2004/10/optimal-thinking/
    
1.  What's the best use of my time right now?
1.  What's the best way for me to exercise regularly (when, what, how)?
1.  What's the best way to get myself out of debt?
1.  What's the best way for me to make an extra $10,000 as quickly as possible?
1.  What's the best school for my child to attend?
1.  What's the best place for me to live?
1.  What's the best way to reply to this email? (use this one repeatedly to purge that clogged inbox)
1.  What's the best way for me to improve my social life?
1.  What's the best book I should read next?

What's the [best new blog][297] I should be reading regularly and tell everyone I know about? 

A Better Life

http://www.stevepavlina.com/blog/2007/08/a-better-life/
    
1.  Your financial abundance is increasing.
1.  People are being nicer to you.
1.  You're providing more value to others.
1.  You're feeling more energetic, alert, and happy.
1.  You're enjoying your life more.
1.  You're thinking more positively.
1.  You're feeling more relaxed.
1.  You're getting stronger.
1.  The universe is conspiring to bring you more of what you want.

# Plutchik's Primary Emotions

Sadness

Disgust

Anger

Anticipation

Joy

Acceptance

Fear

Surprise 

# Patrick Anderson's Word List

agnucius@gmail.com

Free, Freedom, Libre, Liberty

Commons, Collective, Cooperate

Social, Trust, Organize, Group

Fund, Invest, Capital, Finance, Loan, Debt, Bank, Money, DeathGrip (MortGage)

Means, Source, Input

Product, Object, Output

Service, Network, Transport

Tax, Cost, Price

Revenue, Dividends, Earnings, Profit

Scarcity, Abundance

Material, Immaterial

Copyright, Patents, Copyleft

Copy, Duplicate, Instantiate

Royalty, Propriety, Proprietary

Ownership, Property, Private, Public, Personal

Money, Currency, Cache, Bank, Store, Credit, Debt

Govern, Manage, Admin, root

Land, Capital, Labor

Rent, Profit, Wage

"Life Management" References

[http://www.stevepavlina.com/forums/personal-effectiveness/956-life-management-software.html][298]
    
1.  http://gtdportal.pbwiki.com/

[http://www.mylifeorganized.net/][299]

[http://sciral.com/products/index.html][300]

[http://iscrybe.com/main/index.php][301]

[http://www.trgtd.com.au/][302]
    
1.  http://en.wikipedia.org/wiki/Getting\_Things\_Done

[http://en.wikipedia.org/wiki/Life\_hack][303]
    
1.  http://lifehacker.com/
1.  http://www.lifehack.org/
1.  http://www.lifehackingmovie.com/

See:

[http://www.filemaker.com/products/bento/ipad.html][304]

http://www.filemaker.com/solutions

[http://solutions.filemaker.com/database-templates/index.jsp][305]

[http://www.looptmix.com/][306]

[http://www.loopt.com/][307]

## 

TradeVibes.  (2007-2008). Ben Goertzel. In: TradeVides.com Retrieved Dec 2008 from [http://www.tradevibes.com/person/profile/ben-goertzel\_1][308]

Convergence 2008\. (2008). Convergence 08: Speakers : Goertzel. In convergence08.org Retrieved Dec 2008 from [http://www.convergence08.org/speakers/goertzel/][309]

Ritter, S. (2007). Cognitive Tutor: Applied research in mathematics education. Psychonomic Bulletin & Review, 14 (2), 249-255 

http://espace.library.uq.edu.au/view/UQ:57497

[http://en.wikipedia.org/wiki/Learning\_object][310]

[Intelligent tutoring system - Wikipedia, the free encyclopedia][311]

[Cognitive tutor - Wikipedia, the free encyclopedia][312]

[http://en.wikipedia.org/wiki/Theory\_of\_Constraints][313]

[http://en.wikipedia.org/wiki/Role-playing][314]

[][314]

Beating the Blues (NICE)
    
1.  http://www.beatingtheblues.co.uk/connect/

[http://www.ultrasis.com/products/product.jsp?product\_id=1][315] 

[http://moodgym.anu.edu.au/welcome/faq][316]

[http://ecouch.anu.edu.au/welcome][317] 

## Story Elements

http://tvtropes.org/

## Psychogenic Human Needs

[http://www.ehow.com/info\_8299766\_motives-pyschology.html][318]

[][318]
    
1.  ## Abraham Maslow's Hierarchy
1.  ## Erich Fromm

1.  ## According to Fromm, basic needs include the need for relatedness, transcendence, rootedness, identity and a frame of orientation.

1.  ## Murray Biological and Psychogenic Needs & Thematic Appreciation Test (TAT)

1.  [http://en.wikipedia.org/wiki/Thematic\_Apperception\_Test][319]
1.  [http://en.wikipedia.org/wiki/Murray's\_psychogenic\_needs][320]

1.  Ishizuka's Spheres

1.  Examining only psychological needs and motives, Ishizuka divided human motives into three spheres: the search for self, the need for intimacy and the quest for achievement. Recurring themes of the need for interaction, self-understanding and meaningful work underlie the work of psychologists in understanding what truly motivates humans.

1.  Neurotics Needs

1.  [http://psychology.about.com/od/theoriesofpersonality/a/neuroticneeds.htm][321]

[][321]

[][321]

### Murrays Psychogenic Needs

This is the list of needs identified in Explorations in Personality, edited by[][322][Henry A. Murray][322] in 1938\.

[http://en.wikipedia.org/wiki/Murray's\_psychogenic\_needs][320][][0][][0]

Need

Definition

Abasement

To surrender and submit to others, accept blame and punishment. To enjoy pain and misfortune.

Achievement

To accomplish difficult tasks, overcoming obstacles and becoming expert.

Affiliation

To be close and loyal to another person, pleasing them and winning their friendship and attention.

Aggression

To forcefully overcome an opponent, controlling, taking revenge or punishing them.

Autonomy

To break free from constraints, resisting coercion and dominating authority. To be irresponsible and independent.

Counteraction

To make up for failure by trying again, seeking pridefully to overcome obstacles.

Defendance

To defend oneself against attack or blame, hiding any failure of the self.

Deference

To admire a superior person, praising them and yielding to them and following their rules.

Dominance

To control one's environment, controlling other people through command or subtle persuasion.

Exhibition

To impress others through one's actions and words, even if these are shocking.

Harm avoidance

To escape or avoid pain, injury and death.

Infavoidance

To avoid being humiliated or embarrassed.

Nurturance

To help the helpless, feeding them and keeping them from danger.

Order

To make things clean, neat and tidy.

Play

To have fun, laugh and relax, enjoying oneself.

Rejection

To separate oneself from a negatively viewed object or person, excluding or abandoning it.

Sentience

To seek out and enjoy sensual experiences.

Sex

To form relationships that lead to sexual intercourse.

Succourance

To have one's needs satisfied by someone or something. Includes being loved, nursed, helped, forgiven and consoled.

Understanding

To be curious, ask questions and find answers.

### 1\. Ambition Needs

1.  Achievement: Success, accomplishment, and overcoming obstacles.
1.  Exhibition: Shocking or thrilling other people.
1.  Recognition: Displaying achievements and gaining social status.

### 2\. Materialistic Needs

1.  Acquisition: Obtaining things.
1.  Construction: Creating things.
1.  Order: Making things neat and organized.
1.  Retention: Keeping things.

### 3\. Power Needs

1.  Abasement: Confessing and apologizing.
1.  Autonomy: Independence and resistance.
1.  Aggression: Attacking or ridiculing others.
1.  Blame Avoidance: Following the rules and avoiding blame.
1.  Deference: Obeying and cooperating with others.
1.  Dominance: Controlling others.

### 4\. Affection Needs

1.  Affiliation: Spending time with other people.
1.  Nurturance: Taking care of another person.
1.  Play: Having fun with others.
1.  Rejection: Rejecting other people.
1.  Succorance: Being helped or protected by others.

### 5\. Information Needs

1.  Cognizance: Seeking knowledge and asking questions.
1.  Exposition: Education others.

### Maslow's Hierarchy of Needs

[http://psychology.about.com/od/theoriesofpersonality/a/hierarchyneeds\_2.htm][323]

[][323]

Maslow believed that these needs are similar to instincts and play a major role in motivating behavior. Physiological, security, social, and esteem needs are deficiency needs (also known as D-needs), meaning that these needs arise due to deprivation. Satisfying these lower-level needs is important in order to avoid unpleasant feelings or consequences.

Maslow termed the highest-level of the pyramid as growth needs (also known as being needs or B-needs). Growth needs do not stem from a lack of something, but rather from a desire to grow as a person.

### Five Levels of the Hierarchy of Needs

There are five different levels in Maslow's hierarchy of needs:

1.  [Physiological Needs][324]

1.  These include the most basic needs that are vital to survival, such as the need for water, air, food and sleep. Maslow believed that these needs are the most basic and instinctive needs in the hierarchy because all needs become secondary until these physiological needs are met.
1.  Some examples of the physiological needs include:

1.  Food
1.  Water
1.  Breathing
1.  Homeostatis
1.  In addition to the basic requirements of nutrition, air and temperature regulation, the physiological needs also include such things as shelter and clothing. Sexual reproduction is also included in this level of the hierarchy of needs since it is essential to the survival and propagation of the species.

1.  [Security Needs][325]

1.  These include needs for safety and security. Security needs are important for survival, but they are not as demanding as the physiological needs. Examples of security needs include a desire for steady employment, health insurance, safe neighborhoods and shelter from the environment.

1.  As we move up to the second level of Maslow's hierarchy of needs, the requirements start to become a bit more complex. In this level, the needs for security and safety become primary. People want to control and order in their lives, so this need for safety and security contributes largely to behaviors.

1.  Some of the basic security and safety needs include:

1.  Financial security
1.  Heath and wellness
1.  Safety against accidents and injury
1.  Finding a steady job, obtaining health insurance, contributing money to a savings account and moving into a safer neighborhood are all examples of actions motivated by the security and safety needs.

Together, the safety and psychological levels of the hierarchy make up what is often referred to as the basic needs.

1.  [Social Needs][326]

1.  These include needs for belonging, love and affection. Maslow considered these needs to be less basic than physiological and security needs. Relationships such as friendships, romantic attachments and families help fulfill this need for companionship and acceptance, as does involvement in social, community or religious groups.

1.  Some of the things that satisfy this need include:

1.  Friendships
1.  Romantic attachments
1.  Family
1.  Social groups
1.  Community groups
1.  Churches and religious organizations

1.  [Esteem Needs][327]

1.  After the first three needs have been satisfied, esteem needs becomes increasingly important. These include the need for things that reflect on self-esteem, personal worth, social recognition and accomplishment.

In addition to the need for feelings of accomplishment and prestige, the esteem needs include such things as[][328][self-esteem][328] and personal worth. People need to feel valued and by others as well as having a sense of making a contribution to the world. Participation in professional activities, academic accomplishments, athletic or team participation and personal hobbies can all play a role in fulfilling the esteem needs.

1.  [Self-actualizing Needs][329]

1.  This is the highest level of Maslow's hierarchy of needs.[][330][Self-actualizing][330] people are self-aware, concerned with personal growth, less concerned with the opinions of others and interested fulfilling their potential.

### Characteristics of Self-Actualized People

In addition to describing what is meant by self-actualization in his theory, Maslow also identified some of the key characteristics of self-actualized people:

1.  Acceptance and Realism: Self-actualized people have realistic perceptions of themselves, others and the world around them.
1.  Problem-centering: Self-actualized individuals are concerned with solving problems outside of themselves, including helping others and finding solutions to problems in the external world. These people are often motivated by a sense of personal responsibility and ethics.
1.  Spontaneity: Self-actualized people are spontaneous in their internal thoughts and outward behavior. While they can conform to rules and social expectations, they also tend to be open and unconventional.
1.  Autonomy and Solitude: Another characteristics of self-actualized people is the need for independence and privacy. While they enjoy the company of others, these individuals need time to focus on developing their own individual potential.
1.  Continued Freshness of Appreciation: Self-actualized people tend to view the world with a continual sense of appreciation, wonder and awe. Even simple experiences continue to be a source of inspiration and pleasure.
1.  Peak Experiences: Individuals who are self-actualized often have what Maslow termedpeak experiences, or moments of intense joy, wonder, awe and ecstasy. After these experiences, people feel inspired, strengthened, renewed or transformed.3
1.  

http://apiwiki.twitter.com/Annotations-Overview        http://www.socialtimes.com/2010/04/10-possible-uses-of-twitters-new-annotations/                                                                                                                                                

http://r.github.com/annotationsformatter/        

http://www.mmmeeja.com/blog/semantic-web/twitter-annotations-rdf.html                                                                        

http://wiki.github.com/joshsh/twitlogic/semantic-twannotations                                                                                

http://activitystrea.ms/spec/1.0/atom-activity-01.html        

http://wiki.activitystrea.ms/        

http://wiki.activitystrea.ms/browse/\#view=ViewFolder&param=Verbs                                                                                                                                                                                                                

http://opengraphprotocol.org/                                                                                                                                                                                                                                                                

http://abmeta.org/\#spec                                                                                                                                                                                                                                                

http://www.ebusiness-unibw.org/wiki/Main\_Page        http://www.ebusiness-unibw.org/wiki/GoodRelations\#CookBook:\_GoodRelations\_Recipes\_and\_Examples        http://www.heppnetz.de/projects/goodrelations/                                                                                                                                                                                                                                

http://www.hr-xml.org/                                                                                                                                                                                                                                                                

http://en.wikipedia.org/wiki/Learning\_object                                                                                                                                                        



[0]: #
[1]: #h.9xd49glivnvh
[2]: #h.tobpod5z1bm3
[3]: #h.yygt0bohc6ev
[4]: #h.38gev7mibbro
[5]: #h.cv1m3fgb7lli
[6]: #h.h8epjbg8ofb3
[7]: #h.k1zy52hqzb53
[8]: #h.t8720cwdywtf
[9]: #h.leny8gf4jy0l
[10]: #h.bicg8ro9gnso
[11]: #h.x4z8ohgx8bgy
[12]: #h.wi9l8jzcw7we
[13]: #h.j97j64vlzh6f
[14]: #h.apb5svj4bga
[15]: #h.98oru4vl4tkc
[16]: #h.ka1guvj1vqtb
[17]: #h.4k2fslxskwlm
[18]: #h.ubvjqexzf53u
[19]: #h.jmkrkle8z05y
[20]: #h.rk5csd8eerdr
[21]: #h.wsyfvwk0hqxr
[22]: #h.74jbbsvljjzc
[23]: #h.6j3f855mw2zv
[24]: #h.dv0dfcfrjp7r
[25]: #h.pyqq8fdhspes
[26]: #h.lo0smp201ztw
[27]: #h.q1sahrstbzvm
[28]: #h.najl0xvzutg9
[29]: #h.k6et9icvuoad
[30]: #h.xzxvcjwzugug
[31]: #h.kwnrhqgmjmvb
[32]: #h.ghwpm6v2m8jn
[33]: #h.gekmur5hzehu
[34]: #h.1gwl45kj7wxv
[35]: #h.5n2fiq2p1h8o
[36]: #h.38ipvfm48fdi
[37]: #h.qc7iosd5p5al
[38]: #h.2xnul6duk3ev
[39]: #h.imhgfxsveusx
[40]: #h.htflyo99v1hm
[41]: #h.68izulcvyg12
[42]: #h.momkxncru9t
[43]: #h.jbbnl52zeh2w
[44]: #h.eft53tmlp3fd
[45]: #h.psr0mggsbmx4
[46]: #h.ee9t33uh56gb
[47]: #h.tvxyw0wap63q
[48]: #h.1sv3jdahou8y
[49]: #h.9gjwor5za36c
[50]: #h.pu1eydm9reug
[51]: #h.dlfc3fawgou4
[52]: #h.gu9ljha084kr
[53]: #h.ct5x1mf6yue6
[54]: #h.scq5s15hewy5
[55]: #h.7gw7ig7l55tl
[56]: #h.tqbdgkwvfaka
[57]: #h.jyvnh0ngfk2h
[58]: #h.e07jmolg4axa
[59]: #h.lguvso46v9ng
[60]: #h.h3v46z6h2dd9
[61]: #h.kec0i7dj5578
[62]: #h.h1074xklqkb1
[63]: #h.26l2palb9iwy
[64]: #h.4i7ivrcb6pzn
[65]: #h.sk9n0pgr6xh6
[66]: #h.k03hd6bessx5
[67]: #h.9bm7zzifhnjr
[68]: #h.ja35o6g0vnnl
[69]: #h.v4v7pnuxa36i
[70]: #h.7eaclf9th59g
[71]: #h.7f5cegkitir
[72]: #h.n2i0ck8v441d
[73]: #h.cac35f6asblx
[74]: #h.p75jqo3ikhih
[75]: #h.54di3dz5m62k
[76]: #h.d1h1w9v0eyz1
[77]: #h.dwrh4j2sol2q
[78]: #h.e3x8vam5spmw
[79]: #h.j6x35sk3sj0
[80]: http://netention.org
[81]: https://github.com/automenta/netentionjs2
[82]: http://nodejs.org/dist/v0.8.14/node-v0.8.14.tar.gz
[83]: https://github.com/automenta/netentionjs2.git
[84]: https://github.com/edwardhotchkiss/always
[85]: http://nodejs.org/download/
[86]: http://www.mongodb.org/downloads
[87]: http://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/
[88]: http://windows.github.com/
[89]: http://localhost:8080/
[90]: http://en.wikipedia.org/wiki/Public_Participation_GIS
[91]: http://en.wikipedia.org/wiki/Collaborative_mapping
[92]: http://en.wikipedia.org/wiki/Participatory_GIS
[93]: http://en.wikipedia.org/wiki/Neighborhood_planning
[94]: http://en.wikipedia.org/wiki/Volunteered_Geographic_Information
[95]: http://en.wikipedia.org/wiki/Web_mapping
[96]: http://en.wikipedia.org/wiki/Neogeography
[97]: http://en.wikipedia.org/wiki/Quality_of_life
[98]: http://en.wikipedia.org/wiki/Physical_Quality_of_Life_Index
[99]: http://en.wikipedia.org/wiki/Quality-of-life_index
[100]: http://en.wikipedia.org/wiki/Quality_of_life_%28healthcare%29
[101]: http://en.wikipedia.org/wiki/Legatum_Prosperity_Index
[102]: http://en.wikipedia.org/wiki/UN_Human_Development_Index
[103]: http://en.wikipedia.org/wiki/Human_Poverty_Index
[104]: http://en.wikipedia.org/wiki/Human_Development_Index
[105]: http://en.wikipedia.org/wiki/Standard_of_living
[106]: http://en.wikipedia.org/wiki/Emotional_well-being
[107]: http://mqtt.org/
[108]: http://www.eeml.org/
[109]: http://wiki.openstreetmap.org/wiki/Potential_Datasources
[110]: http://pachube.com/
[111]: http://semanticommunity.info/
[112]: http://geonetwork-opensource.org/gallery/gallery.html
[113]: http://www.epa.gov/regulations/
[114]: http://data.un.org/
[115]: http://www.google.com/url?q=https%3A%2F%2Fwww.cia.gov%2Flibrary%2Fpublications%2Fthe-world-factbook%2F&sa=D&sntz=1&usg=AFQjCNG1XTLvu6i3MVyJdY7PlGGBBr6Wpw
[116]: http://www.kmlfactbook.org/#&db=wri&table=3_812&col=2000&
[117]: https://www.cia.gov/library/publications/the-world-factbook/
[118]: http://goworldwind.org/demos/
[119]: http://www.iges.org/grads/gds/
[120]: http://sedac.ciesin.org/data.html
[121]: http://geodata.grid.unep.ch/
[122]: http://en.wikipedia.org/wiki/Crime_mapping
[123]: http://www.crimereports.com/
[124]: http://www.crimemapping.com/
[125]: http://www.google.com/publicdata/overview?ds=d5bncppjof8f9_
[126]: http://data.worldbank.org/
[127]: http://data.worldbank.org/indicator
[128]: http://www.rhok.org/node/2608
[129]: https://www.opensource.gov/
[130]: http://www.bbc.co.uk/news/technology-14841018
[131]: http://ec.europa.eu/environment/seis/newsletter/issue_003.html
[132]: http://www.earthobservations.org/geoss.shtml
[133]: http://ec.europa.eu/environment/seis/funding.htm
[134]: http://www.ndbc.noaa.gov/obs.shtml
[135]: http://www.unidata.ucar.edu/projects/THREDDS/
[136]: http://www.swpc.noaa.gov/alerts/archive/current_month.html
[137]: http://www.globalincidentmap.com/
[138]: http://amberalerts.globalincidentmap.com/
[139]: http://hazmat.globalincidentmap.com/
[140]: http://fires.globalincidentmap.com/
[141]: http://outbreaks.globalincidentmap.com/
[142]: http://gangs.globalincidentmap.com/
[143]: http://border.globalincidentmap.com/
[144]: http://president.globalincidentmap.com/
[145]: http://www.globalincidentmap.com/predictions.php
[146]: http://quakes.globalincidentmap.com/
[147]: http://drugs.globalincidentmap.com/
[148]: http://aviation.globalincidentmap.com/
[149]: http://food.globalincidentmap.com/
[150]: http://human.globalincidentmap.com/
[151]: http://en.wikipedia.org/wiki/Foodshed
[152]: http://en.wikipedia.org/wiki/Category:Humanitarian_aid_organizations
[153]: http://en.wikipedia.org/wiki/CompStat
[154]: http://www.mufon.com/mufonreports.html
[155]: http://www.ufostalker.com/?mufon=true
[156]: http://en.wikipedia.org/wiki/Nuclear_decommissioning
[157]: http://www.google.com/fusiontables/DataSource?dsrcid=579353&search=nuclear&cd=5
[158]: http://www.google.com/fusiontables/DataSource?dsrcid=578937&search=nuclear&cd=12
[159]: http://www.epa.gov/tri/
[160]: http://en.wikipedia.org/wiki/Superfund#Accessing_Superfund_data
[161]: http://www.acousticecology.org/srwifi.html
[162]: http://www.epa.gov/enviro/facts/ef_restful.html
[163]: http://airnow.gov/
[164]: http://transport.nilu.no/flexpart
[165]: http://chemtrailsmap.com/
[166]: http://www.cellreception.com/towers/
[167]: http://waterdata.usgs.gov/nwis/qw
[168]: http://nuclear.carboncapturereport.org/cgi-bin/topic
[169]: http://globalenergyobservatory.org/select.php?tgl=Kml
[170]: http://outagecentral.com/
[171]: http://en.wikipedia.org/wiki/Cancer_cluster
[172]: http://en.wikipedia.org/wiki/Biostatistics
[173]: http://en.wikipedia.org/wiki/Cancer_epidemiology
[174]: http://www.helpx.net/
[175]: http://www.neural-forecasting.com/neural_forecasting_data.htm
[176]: http://econdata.net/
[177]: http://www.lib.umich.edu/govdocs/stats.html
[178]: http://odwin.ucsd.edu/idata/
[179]: http://www.phil.frb.org/econ/spf/spfpage.html
[180]: http://www.tcb-indicators.org/
[181]: http://www.usinfostore.com/
[182]: http://finance.yahoo.com/
[183]: http://fx.sauder.ubc.ca/
[184]: http://www.oanda.com/
[185]: http://theyrule.net/drupal/content/transnationaleorg-0
[186]: http://www.transnationale.org/
[187]: http://theyrule.net/drupal/content/interactive-political-map-west-bank
[188]: http://www.guardian.co.uk/world/interactive/2008/sep/11/israelandthepalestinians
[189]: http://theyrule.net/drupal/content/number-wont-get-any-smaller
[190]: http://theyrule.net/drupal/content/corporate-collective-consciousness
[191]: http://wikiscanner.virgil.gr/
[192]: http://theyrule.net/drupal/content/wheresgeorgecom-money-and-epidemics
[193]: http://www.wheresgeorge.com/
[194]: http://www.eurekalert.org/pub_releases/2006-01/uoc--igp012406.php
[195]: http://www.insna.org/
[196]: http://theyrule.net/drupal/content/cryptome
[197]: http://cryptome.org/mil-dead-iqw.htm
[198]: http://cryptome.org/
[199]: http://en.wikipedia.org/wiki/Cryptome
[200]: http://theyrule.net/drupal/content/disappeared-america
[201]: http://theyrule.net/drupal/content/exploring-enron
[202]: http://theyrule.net/drupal/content/board-death
[203]: http://adbusters.org/blogs/Board_to_Death.html
[204]: http://theyrule.net/drupal/content/gapminder
[205]: http://www.gapminder.org/
[206]: http://directory.ic.org/maps/default.xml
[207]: http://www.globaldatavault.com/natural-disaster-threat-maps.htm
[208]: http://hisz.rsoe.hu/alertmap/
[209]: http://en.wikipedia.org/wiki/Cooling_center
[210]: http://en.wikipedia.org/wiki/Warming_center
[211]: http://www.scientificamerican.com/article.cfm?id=ratti-smartest-cities-use-people-as-sensors
[212]: http://thenewamerican.com/tech/item/13613-darpa-sponsors-surveillance-technology-to-predict-future-behavior
[213]: http://www.darpa.mil/NewsEvents/Releases/2011/09/28.aspx
[214]: http://portal.acm.org/citation.cfm?id=786227
[215]: http://at-scm.com/index.php/2006/12/04/supply-chain-management/artificial-intelligence-in-supply-chains/
[216]: http://at-scm.com/index.php/2006/11/13/supply-chain-management/rea-a-semantic-model-for-internet-supply-chain-collaboration/
[217]: http://jeffsutherland.org/oopsla2000/mccarthy/mccarthy.htm
[218]: http://en.wikipedia.org/wiki/Basic_human_needs
[219]: http://en.wikipedia.org/wiki/Maslow%27s_hierarchy_of_needs
[220]: http://en.wikipedia.org/wiki/Murray%27s_psychogenic_needs
[221]: http://en.wikipedia.org/wiki/Environmental_law
[222]: http://en.wikipedia.org/wiki/Planetary_habitability
[223]: http://en.wikipedia.org/wiki/Survival_skills
[224]: http://en.wikipedia.org/wiki/Metamotivation
[225]: http://earthengine.googlelabs.com/
[226]: http://www.futurict.ethz.ch/FuturIcT
[227]: http://code.google.com/apis/maps/
[228]: http://tables.googlelabs.com/Home
[229]: http://googlegeodevelopers.blogspot.com/2010/11/five-great-fusion-tables-maps-examples.html?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed:+GoogleGeoDevelopersBlog+%28Google+Geo+Developers+Blog%29
[230]: http://multiverseaccordingtoben.blogspot.com/2010/12/will-decreasing-scarcity-allow-us-to.html
[231]: http://www.roboearth.org/
[232]: http://www.appropedia.org/Hexayurt_mass_evacuation
[233]: http://en.wikipedia.org/wiki/ISO_6709
[234]: http://www.stratfor.com/
[235]: http://www.mi2g.com/
[236]: http://en.wikipedia.org/wiki/Abstraction
[237]: http://en.wikipedia.org/wiki/Attention
[238]: http://en.wikipedia.org/wiki/Attitude_%28psychology%29
[239]: http://en.wikipedia.org/wiki/Brainstorming
[240]: http://en.wikipedia.org/wiki/Cognition
[241]: http://en.wikipedia.org/wiki/Cognitive_science
[242]: http://en.wikipedia.org/wiki/Creativity
[243]: http://en.wikipedia.org/wiki/Critical_thinking
[244]: http://en.wikipedia.org/wiki/Curiosity
[245]: http://en.wikipedia.org/wiki/Decision
[246]: http://en.wikipedia.org/wiki/Decision_making
[247]: http://en.wikipedia.org/wiki/Eidetic_memory
[248]: http://en.wikipedia.org/wiki/Emotion
[249]: http://en.wikipedia.org/wiki/Feeling
[250]: http://en.wikipedia.org/wiki/Emotional_intelligence
[251]: http://en.wikipedia.org/wiki/Objective_%28goal%29
[252]: http://en.wikipedia.org/wiki/Idea
[253]: http://en.wikipedia.org/wiki/Imagination
[254]: http://en.wikipedia.org/wiki/Intelligence_%28trait%29
[255]: http://en.wikipedia.org/wiki/Introspection
[256]: http://en.wikipedia.org/wiki/Lateral_thinking
[257]: http://en.wikipedia.org/wiki/Learning
[258]: http://en.wikipedia.org/wiki/Memory
[259]: http://en.wikipedia.org/wiki/Memory-prediction_framework
[260]: http://en.wikipedia.org/wiki/Mental_calculation
[261]: http://en.wikipedia.org/wiki/Mind%27s_eye
[262]: http://en.wikipedia.org/wiki/Mindset
[263]: http://en.wikipedia.org/wiki/Mood_%28psychology%29
[264]: http://en.wikipedia.org/wiki/Motivation
[265]: http://en.wikipedia.org/wiki/Perception
[266]: http://en.wikipedia.org/wiki/Personality_psychology
[267]: http://en.wikipedia.org/wiki/Picture_thinking
[268]: http://en.wikipedia.org/wiki/Problem_shaping
[269]: http://en.wikipedia.org/wiki/Problem_solving
[270]: http://en.wikipedia.org/wiki/Reason
[271]: http://en.wikipedia.org/wiki/Recollection
[272]: http://en.wikipedia.org/wiki/Human_self-reflection
[273]: http://en.wikipedia.org/wiki/Thought
[274]: http://en.wikipedia.org/wiki/Visual_thinking
[275]: http://en.wikipedia.org/wiki/Nootropics
[276]: http://en.wikipedia.org/wiki/Anxiety
[277]: http://en.wikipedia.org/wiki/Cognitive_psychology
[278]: http://en.wikipedia.org/wiki/Clinical_depression
[279]: http://en.wikipedia.org/wiki/Mental_confusion
[280]: http://en.wikipedia.org/wiki/Cosmetic_pharmacology
[281]: http://en.wikipedia.org/wiki/Drug
[282]: http://en.wikipedia.org/wiki/Parasympathomimetics
[283]: http://en.wikipedia.org/wiki/Prescription_drug
[284]: http://en.wikipedia.org/wiki/Prohibition_%28drugs%29
[285]: http://en.wikipedia.org/wiki/Psychoactive_drug
[286]: http://en.wikipedia.org/wiki/Psychedelic_drug
[287]: http://en.wikipedia.org/wiki/Human_enhancement
[288]: http://en.wikipedia.org/wiki/Ergogenic_aid
[289]: http://en.wikipedia.org/wiki/Life_extension
[290]: http://en.wikipedia.org/wiki/Neurodegenerative_disease
[291]: http://en.wikipedia.org/wiki/Alzheimer%27s_disease
[292]: http://en.wikipedia.org/wiki/Parkinson%27s_disease
[293]: http://en.wikipedia.org/wiki/Nutrition
[294]: http://en.wikipedia.org/wiki/Sleep_disorder
[295]: http://en.wikipedia.org/wiki/Stress_%28medicine%29
[296]: http://en.wikipedia.org/wiki/Stress_management
[297]: http://www.stevepavlina.com/blog
[298]: http://www.stevepavlina.com/forums/personal-effectiveness/956-life-management-software.html
[299]: http://www.mylifeorganized.net/
[300]: http://sciral.com/products/index.html
[301]: http://iscrybe.com/main/index.php
[302]: http://www.trgtd.com.au/
[303]: http://en.wikipedia.org/wiki/Life_hack
[304]: http://www.filemaker.com/products/bento/ipad.html
[305]: http://solutions.filemaker.com/database-templates/index.jsp
[306]: http://www.looptmix.com/
[307]: http://www.loopt.com/
[308]: http://www.tradevibes.com/person/profile/ben-goertzel_1
[309]: http://www.convergence08.org/speakers/goertzel/
[310]: http://en.wikipedia.org/wiki/Learning_object
[311]: http://en.wikipedia.org/wiki/Intelligent_tutoring_system
[312]: http://en.wikipedia.org/wiki/Cognitive_Tutor
[313]: http://en.wikipedia.org/wiki/Theory_of_Constraints
[314]: http://en.wikipedia.org/wiki/Role-playing
[315]: http://www.ultrasis.com/products/product.jsp?product_id=1
[316]: http://moodgym.anu.edu.au/welcome/faq
[317]: http://ecouch.anu.edu.au/welcome
[318]: http://www.ehow.com/info_8299766_motives-pyschology.html
[319]: http://en.wikipedia.org/wiki/Thematic_Apperception_Test
[320]: http://en.wikipedia.org/wiki/Murray's_psychogenic_needs
[321]: http://psychology.about.com/od/theoriesofpersonality/a/neuroticneeds.htm
[322]: http://en.wikipedia.org/wiki/Henry_A._Murray
[323]: http://psychology.about.com/od/theoriesofpersonality/a/hierarchyneeds_2.htm
[324]: http://psychology.about.com/od/theoriesofpersonality/ss/maslows-needs-hierarchy_2.htm
[325]: http://psychology.about.com/od/theoriesofpersonality/ss/maslows-needs-hierarchy_3.htm
[326]: http://psychology.about.com/od/theoriesofpersonality/ss/maslows-needs-hierarchy_4.htm
[327]: http://psychology.about.com/od/theoriesofpersonality/ss/maslows-needs-hierarchy_5.htm
[328]: http://psychology.about.com/od/sindex/f/what-is-self-esteem.htm
[329]: http://psychology.about.com/od/theoriesofpersonality/ss/maslows-needs-hierarchy_6.htm
[330]: http://psychology.about.com/od/theoriesofpersonality/tp/self-actualized-characteristic.htm