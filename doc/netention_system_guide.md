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

[Sensors][5]

[Mapping][6]

[Quality of Life][7]

[Geological][8]

[SEIS][9]

[Incidents][10]

[Water and food][11]

[Shelter][12]

[Hotels][13]

[Safety][14]

[Crime][15]

[UFO Reports][16]

[Fire Protection][17]

[Freedom and Human Rights][18]

[Environment & Pollution][19]

[Radiation and Nuclear Threats][20]

[MEXT][21]

[Pachube][22]

[FLEXPART Atmospheric Simulation][23]

[Chemtrails][24]

[US Cell Towers][25]

[Water Quality][26]

[Hydrofracking][27]

[Energy][28]

[Communication (Mail, Phone, Internet)][29]

[Healthcare][30]

[Life Expectancy][31]

[Addiction Mitigation][32]

[Pharmacies][33]

[Hospitals][34]

[Doctors][35]

[Epidemiology][36]

[Childcare][37]

[Employment][38]

[Education][39]

[Transportation][40]

[Sex][41]

[Population size and demographics, ex: of members of specific gender per age][42]

[Waste Disposal][43]

[Economic, Financial, and Corporate][44]

[Banks, ATM's, Credit Unions][45]

[TheyRule.net Data Sources][46]

[Exploring Enron][47]

[Board to Death][48]

[Gapminder][49]

[Agriculture][50]

[Natural Disasters][51]

[Extreme Temperatures][52]

[Earthquakes][53]

[Volcanoes][54]

[Fires][54]

[Floods][54]

[Tsunamis][54]

[Storms, Tornadoes, and Hurricanes][54]

[Travel][54]

[Wildlife][55]

[Urban Smart / Sensor Grids][56]

[Psychological & Demographics][57]

[Hardware and AI Classification / Feature Detection][58]

[Resources][59]

[List of Thinking Subjects][60]

[Plutchik's Primary Emotions][61]

[Patrick Anderson's Word List][62]

[Story Elements][63]

[Psychogenic Human Needs][64]

[Abraham Maslow's Hierarchy][65]

[Erich Fromm][66]

[According to Fromm, basic needs include the need for relatedness, transcendence, rootedness, identity and a frame of orientation.][67]

[Murray Biological and Psychogenic Needs & Thematic Appreciation Test (TAT)][68]

[Murrays Psychogenic Needs][69]

[1\. Ambition Needs][70]

[2\. Materialistic Needs][71]

[3\. Power Needs][72]

[4\. Affection Needs][73]

[5\. Information Needs][74]

[Maslow's Hierarchy of Needs][75]

[Five Levels of the Hierarchy of Needs][76]

[Characteristics of Self-Actualized People][77]

## Web: [http://netention.org][78]

## Source code: [https://github.com/automenta/netentionjs2][79]

# 

# Installation

## 

Ubuntu 12.10

sudo apt-get install git npm mongodb g++ libxml2-dev make  

//install nodejs

wget[][80][http://nodejs.org/dist/v0.8.14/node-v0.8.14.tar.gz][80]

tar xvzf node-v0.8.14.tar.gz

cd node-v0.8.14

./configure

make -j2

sudo make install

cd ..

git clone[][81][https://github.com/automenta/netentionjs2.git][81] netention  
cd netention

npm install

sudo npm install always -g

npm install --force htmlparser jsdom apricot

sudo ln -s /usr/bin/nodejs /usr/bin/node

Basically it needs node.js, the latest version, and then certain libraries installed via 'npm' the node package manager (i'll list them in the instructions).  then run web.sh (which uses the very helpful '[always][82]' package) and visit on port 8080 (specified in config.js).

the client/ folder is served publicly by the webserver as static files.  this includes client-side html and javascript.

client/sensor contains the sensor hierarchy.  some of the files (without .client.js) may be used by the server.  this just keeps them in one place, organized by sensor category.

server/ contains server-side specific code.

in the meantime, if you're able to make some progress and need some help, feel free to reach me by email or instant message.  :)  if you'd like i will help you set up the environment via screenshare and we can write the instructions at the same time, perhaps recording it too.

![](https://lh5.googleusercontent.com/t6v26JkIG0ITRVkKRSRVVkL0WgGlZMH0YlB36u99PAsCEw03ql7K7QKFHGYvR-WxfY6ca0sFvSOeCSRkEugvr2kp7t_Yoo8yKrBn3lUQVfAiww)

# Sensors

## Mapping

[http://en.wikipedia.org/wiki/Public\_Participation\_GIS][83]

[http://en.wikipedia.org/wiki/Collaborative\_mapping][84]

[http://en.wikipedia.org/wiki/Participatory\_GIS][85]

[http://en.wikipedia.org/wiki/Neighborhood\_planning][86]

[http://en.wikipedia.org/wiki/Volunteered\_Geographic\_Information][87]

[http://en.wikipedia.org/wiki/Web\_mapping][88]

[http://en.wikipedia.org/wiki/Neogeography][89]

[][89]

[][89]

## Quality of Life

[http://en.wikipedia.org/wiki/Quality\_of\_life][90]

http://en.wikipedia.org/wiki/Gross\_National\_Happiness

[http://en.wikipedia.org/wiki/Physical\_Quality\_of\_Life\_Index][91]

[http://en.wikipedia.org/wiki/Quality-of-life\_index][92]

[http://en.wikipedia.org/wiki/Quality\_of\_life\_%28healthcare%29][93]

http://en.wikipedia.org/wiki/Satisfaction\_with\_Life\_Index

http://en.wikipedia.org/wiki/Happiness\_economics

[http://en.wikipedia.org/wiki/Legatum\_Prosperity\_Index][94]

http://en.wikipedia.org/wiki/Global\_Peace\_Index

[http://en.wikipedia.org/wiki/UN\_Human\_Development\_Index][95]

[http://en.wikipedia.org/wiki/Human\_Poverty\_Index][96]

[http://en.wikipedia.org/wiki/Human\_Development\_Index][97]

http://en.wikipedia.org/wiki/Happy\_Planet\_Index

[http://en.wikipedia.org/wiki/Standard\_of\_living][98]

http://en.wikipedia.org/wiki/Happiness

http://en.wikipedia.org/wiki/Human\_rights

[http://en.wikipedia.org/wiki/Emotional\_well-being][99]

http://en.wikipedia.org/wiki/World%27s\_most\_livable\_cities

# 

MQTT

[http://mqtt.org/][100]

[][100]

EEML

[http://www.eeml.org/][101]

[][101]

OpenStreetMap Potential Datasources (BIG)

[http://wiki.openstreetmap.org/wiki/Potential\_Datasources][102]

[][102]

COSM / PACHUBE:[][103][http://pachube.com][103]

Semantic Community

[http://semanticommunity.info/][104]

[][103]

GeoNetwork

[http://geonetwork-opensource.org/gallery/gallery.html][105]

[  
][105]GeoNetwork nodes  
  
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

[http://www.epa.gov/regulations/][106]

[][106]

United Nations

[http://data.un.org/][107]

[][107]

CIA World Factbook

[https://www.cia.gov/library/publications/the-world-factbook/][108]

[http://www.kmlfactbook.org/\#&db=wri&table=3\_812&col=2000&][109]
    
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

[][110]

NASA Worldwind: many demo applications with data

[http://goworldwind.org/demos/][111]

[][111]

GraDS Geological Servers

[http://www.iges.org/grads/gds/][112]

[][112]

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

[http://sedac.ciesin.org/data.html][113]

lots of datasets

[http://data.un.org/][107]

international

[http://geodata.grid.unep.ch/][114]

more UN environmental data

[http://en.wikipedia.org/wiki/Crime\_mapping][115]

[http://www.crimereports.com/][116]

[http://www.crimemapping.com/][117]

[][117]

[][117]

[http://www.google.com/publicdata/overview?ds=d5bncppjof8f9\_][118]

[http://data.worldbank.org/][119]

[http://data.worldbank.org/indicator][120] (420 indicators)

NASA \#OpenData: What Will YOU Create?:[][121][http://www.rhok.org/node/2608][121]

[][121]

[][121]

[https://www.opensource.gov/][122]

The Open Source Center (OSC) is the US Government's premier provider of foreign open source intelligence

[http://www.bbc.co.uk/news/technology-14841018][123]

[][123]

## Geological

### SEIS

"The Shared Environmental Information System (SEIS) is a collaborative initiative of the European Commission and the European Environment Agency (EEA). Its objective is to establish together with the Member States an integrated and shared EU-wide information system to simplify monitoring and reporting of environmental data and information."

[http://ec.europa.eu/environment/seis/newsletter/issue\_003.html][124]

[][124]

This 'system of systems' will proactively link together existing and planned observing systems around the world and support the development of new systems where gaps currently exist. It will promote common technical standards so that data from the thousands of different instruments can be combined into coherent data sets. The 'GEOPortal' offers a single Internet access point for users seeking data, imagery and analytical software packages relevant to all parts of the globe. It connects users to existing data bases and portals and provides reliable, up-to-date and user friendly information -- vital for the work of decision makers, planners and emergency managers. For users with limited or no access to the Internet, similar information is available via the 'GEONETCast' network of telecommunication satellites.

[http://www.earthobservations.org/geoss.shtml][125]

[][125]

Funding :[][126][http://ec.europa.eu/environment/seis/funding.htm][126]

[][126]

Ocean Buoys and Tsunamis

[http://www.ndbc.noaa.gov/obs.shtml][127]

[][127]

Thematic Realtime Environmental Distributed Data Services: THREDDS

[http://www.unidata.ucar.edu/projects/THREDDS/][128]

[][128]

NOAA Space Weather Alerts

[http://www.swpc.noaa.gov/alerts/archive/current\_month.html][129]

[][129]

NOAA Space Weather Data

http://www.swpc.noaa.gov/ftpmenu/lists.html

### Incidents

[http://www.globalincidentmap.com/][130]

[][130][GlobalIncidentMap.com][130] [][131][Amber-Alert Map][131] [][132][HAZMAT Situations Map][132] [][133][Forest Fires Map][133] [][134][Disease Outbreaks Map][134] 

[][135][Gang Activity Map][135] [][136][Border Security Issues][136] [][137][Presidential Threat Map][137] [][138][Terrorism Event Predictions][138] [][139][New - Quakes Map][139] 

[][140][Drug Interdictions Map][140] [][141][Non-Terror Aviation Incidents][141] [][142][NEW - Food/Medicine Incidents][142] [][143][NEW - Human Trafficking][143] 

Crisis Mappers

http://crisismappers.net

## Water and food

(availability of water, nutrients, and herbs)

[http://en.wikipedia.org/wiki/Foodshed][144]

[][144]

Foodshed Mapping

http://www.cals.cornell.edu/cals/css/extension/foodshed-mapping.cfm

## Shelter

Availability of room to live and sleep

Porches, Bridges & Overpasses (provide temporary shelter from precipitation)

## Hotels

Humanitarian & International Relief Organizations

[http://en.wikipedia.org/wiki/Category:Humanitarian\_aid\_organizations][145]

http://www.exploringabroad.com/humanitarian-org.htm

## Safety

Crime and Violence

### Crime

http://en.wikipedia.org/wiki/Crime\_mapping

https://www.crimereports.com/

[http://en.wikipedia.org/wiki/CompStat][146]

[][146]

### UFO Reports

[http://www.mufon.com/mufonreports.html][147]

[http://www.ufostalker.com/?mufon=true][148]

### Fire Protection

### Freedom and Human Rights

## Environment & Pollution

### Radiation and Nuclear Threats

[http://en.wikipedia.org/wiki/Nuclear\_decommissioning][149]

http://www.google.com/fusiontables/DataSource?dsrcid=579216&search=nuclear&cd=2
    
1.  [http://www.google.com/fusiontables/DataSource?dsrcid=579353&search=nuclear&cd=5][150]
1.  [http://www.google.com/fusiontables/DataSource?dsrcid=578937&search=nuclear&cd=12][151]

[][151]

[][151]

IAEA Nuclear Facilities

[http://www.google.com/fusiontables/DataSource?dsrcid=579353&search=nuclear&cd=5][150]

[][150]

Europe Radiaton Network

http://eurdep.jrc.ec.europa.eu/Basic/Pages/Public/Home/Default.aspx

#### MEXT

http://orm.dip.jp/data/

US Nuclear Regulatory Commision Event Reports

http://www.nrc.gov/reading-rm/doc-collections/event-status/event/

Toxic Release Inventory

[http://www.epa.gov/tri/][152]

[][152]

US Superfund Sites (Hazardous and Toxic Sites Needing to be Cleaned Up)

[http://en.wikipedia.org/wiki/Superfund\#Accessing\_Superfund\_data][153]

[][153]

WiFi Electrosmog

[http://www.acousticecology.org/srwifi.html][154]

meaningful application of googles horsepower on googles retracted wifi triangulation data

EPA Datasets

[http://www.epa.gov/enviro/facts/ef\_restful.html][155]

### Pachube

http://api.pachube.com/v2/feeds.xml?units=%C2%B5Sv/h&per\_page=2000&order=created\_at&key=YOURKEYGOESHERE

http://api.pachube.com/v2/feeds.xml?units=nGy/h&per\_page=2000&order=created\_at&key=YOURKEYGOESHERE

EPA Air Quality Reports

[http://AirNow.gov][156]

"NETA" Network?

### FLEXPART Atmospheric Simulation

[http://transport.nilu.no/flexpart][157]

[][157]

### Chemtrails

[http://chemtrailsmap.com/][158]

[][158]

### US Cell Towers

[http://www.cellreception.com/towers/][159]

[][159]

### Water Quality

[http://waterdata.usgs.gov/nwis/qw][160]

### 

### Hydrofracking

http://www.hydraulicfracturingdisclosure.org/fracfocusfind/

## Energy

Gas and Electricity

[http://nuclear.carboncapturereport.org/cgi-bin/topic][161]

Power Plants, Fuels & Resources, Transmission, Consumers (cross-ref w/ Pollution)

[http://globalenergyobservatory.org/select.php?tgl=Kml][162]

[][162]

Realtime Power Outage Map (US)

[http://outagecentral.com/][163]

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

[http://en.wikipedia.org/wiki/Cancer\_cluster][164]

[http://en.wikipedia.org/wiki/Biostatistics][165]

[http://en.wikipedia.org/wiki/Cancer\_epidemiology][166]

[][166]

[][166]

## Childcare

## Employment

[http://www.helpx.net][167]

[][167]

## Education

## Transportation

## Sex

## Population size and demographics, ex: of members of specific gender per age

## Waste Disposal

Sewage, garbage collection

## Economic, Financial, and Corporate

## Banks, ATM's, Credit Unions

[http://www.neural-forecasting.com/neural\_forecasting\_data.htm][168]

Micro- and Macroeconomic Data

Three websites guide practitioners, researchers, and students to data. The data can be used for econometric methods or analogous situations, or to adjust data such as to account for inflation or population.
    
1.  [EconData.Net][169] provides access to regional, state, and local economic data. It is a comprehensive first stop for searching public and private data sources on the Web.
1.  [Statistical Resources on the Web][170] (University of Michigan) has a detailed A-Z index and provides thousands of links to sites in business, economics, transportation, weather, and 18 other areas.
1.  [Social Science Data on the Net][171] (University of California, San Diego) allows you to search the following sites. Much of the data can be downloaded.

[][0][][0]

1.  Census Bureau
1.  Data FERRET (Current Population Survey and related sources)
1.  FedStats (Statistics from 70 U.S. Federal Agencies)

1.  ICPSR (Inter-University Consortium for Political and Social Research)
1.  Stat-USA (Current and historical financial and economic data

1.  The[][172][Survey of Professional Forecasters][172] is a quarterly survey of macroeconomic forecasts.
1.  The[][173][Conference Board][173] provides economic and business cycle indicators.
1.  US Macroeconomic data can be purchased from[][174][USInfostore.com][174].
1.  Financial Data:        stock indices & individual stocks[][175][http://finance.yahoo.com/][175] --\> historical prices by symbol
1.  currencies:[][176][http://fx.sauder.ubc.ca/][176] ---\> database retrieval
1.  [http://www.oanda.com/][177] --\> FXHistory

### TheyRule.net Data Sources

[Transnationale.org][178]

Sunday, March 7, 2010 - 09:43

If you want to find out what company owns a brand -[][179][transnationale.org][179] is a prime place to check. It is an extensive database that not only tracks the brand ownership of multinationals but also connects them to environmental and labor violations.

[Full post][178]

[][178]

[Interactive political map of the West Bank][180]

Tuesday, September 16, 2008 - 23:00

This[][181][Guardian interactive map of the occupation of the West Bank][181] is a beautiful exposition of the extent of the occupation. It leads the viewer through a series of clicks which turn on map elements revealing the dominance of the Israeli occupation one aspect at a time.

[Full post][180]

[][180]

[A number that won't get any smaller][182]

Wednesday, October 3, 2007 - 23:00

[Full post][182]

[][182]

[Corporate Collective Consciousness][183]

Monday, August 13, 2007 - 23:00

Isn't it lovely that corpoations, basically people like the rest of us, can edit wikipedia. Use[][184][Wiki Scanner][184] to see what your least favorite Fortune 500 company has been using their free speech for.

[Full post][183]

[][183]

[wheresgeorge.com - money and epidemics][185]

Tuesday, January 31, 2006 - 00:00

So it turns out money is like a disease!

"Using a[][186][popular internet game][186] that traces the travels of dollar bills, scientists have unveiled statistical laws of human travel in the United States, and developed a mathematical description that can be used to model the spread of infectious disease in this country. This model is considered a breakthrough in the field."[][187][Read the full article here.][187] From[][188][SOCNET][188].

[Full post][185]

[][185]

[Cryptome][189]

Monday, January 2, 2006 - 00:00

Boing Boing had a[][190][link][190] to Cryptome[][191][Cryptome][191] this morning. According to[][192][Wikipedia][192] Cryptome is: "a controversial website, hosted in the United States by its owner John Young, that functions as a repository for information that is prohibited or suppressed by various governments."

[Full post][189]

[][189]

[Disappeared in America][193]

Wednesday, December 7, 2005 - 00:00

From Site:

[Full post][193]

## [Exploring Enron][194]

Monday, November 21, 2005 - 00:00

From the site: :Using the Enron e-mail archive as a motivating dataset, we are attempting the marriage of visual and algorithmic analyses of e-mail archives within an exploratory data analysis environment. The intent is to leverage the characteristic strengths of both man\[sic\] and machine for unearthing insight. Below are a few sketches from a preliminary exploration into the design space of such tools." Site by Jeffrey Heer - thanks to Michael Dale for sending me the link.

[Full post][194]

## [Board to Death][195]

Saturday, September 3, 2005 - 23:00

Adbusters[][196][reviews][196] California's Sonoma State University examination of the resumes of the 118 people who sit on the boards of directors of America's ten largest media organizations.

[Full post][195]

## [Gapminder][197]

Saturday, August 20, 2005 - 23:00

"CHALLENGE: Let's make data on world development understandable, enjoyable and free!"

[Gapminder.org][198]

[Full post][197]

[][197]

[][197]

## Agriculture

Wild-growing Food (ex: Mulberries)

IC.org (Intentional Communities)

[http://directory.ic.org/maps/default.xml][199] is ic.org's XML file used in their map, containing ~2300 datapoints which seems to be only a fraction of IC.org directory. scraping their directory is a next step to get all the contact information and details about each community

## Natural Disasters

Earthquakes, Volcanoes, Fires, etc..

[http://www.globaldatavault.com/natural-disaster-threat-maps.htm][200]

[http://hisz.rsoe.hu/alertmap/][201]

[][201]

## Extreme Temperatures

Heating and Cooling Centers

[http://en.wikipedia.org/wiki/Cooling\_center][202]

[http://en.wikipedia.org/wiki/Warming\_center][203]

[][203]

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

[http://www.scientificamerican.com/article.cfm?id=ratti-smartest-cities-use-people-as-sensors][204]

[][204]

## Psychological & Demographics

ex: tell me about parties in each city around the world or what type of music is loved by any given population

# Hardware and AI Classification / Feature Detection

[http://thenewamerican.com/tech/item/13613-darpa-sponsors-surveillance-technology-to-predict-future-behavior][205]

[http://www.darpa.mil/NewsEvents/Releases/2011/09/28.aspx][206]

# Resources

AI and Simulation-Based Techniques for the Assessment of Supply Chain Logistic Performance

[http://portal.acm.org/citation.cfm?id=786227][207]

The effectiveness of logistic network design andmanagement for complex and geographically distributedproduction systems can be measured in terms of directlogistic costs and in terms of supply chain productionperformance. The management of transportation logistics,for instance, involves difficult trade-offs among capacityutilization, transportation costs, and productionvariability often leading to the identification of multiplelogistic solutions. This paper defines and compares threedifferent modeling approaches to systematically assesseach identified logistic alternative in terms of actualtransportation costs and expected production losses. Thefirst modeling approach examined in the paper is amathematical model which provides the statistical basisfor estimating costs and risks of production losses insimple application cases. The second model is astochastic,discrete event simulation model of bulkmaritime transportation specifically designed to capturethe dynamic interactions between the logistic network andthe production facilities. The third one is an AI-basedmodel implemented as a modular architecture of ArtificialNeural Networks (ANNs). In such an architecture eachnetwork establishes a correlation between the logisticvariables relevant to a specific sub-problem and thecorresponding supply chain costs. Preliminary testing ofthe three models shows the relative effectiveness andflexibility of the ANN-based model; it also shows thatgood approximation levels may be attained when eitherthe mathematical model or the simulation model are usedto generate accurate ANN training data sets for eachtransportation/production sub-problem.

[http://at-scm.com/index.php/2006/12/04/supply-chain-management/artificial-intelligence-in-supply-chains/][208]

[http://at-scm.com/index.php/2006/11/13/supply-chain-management/rea-a-semantic-model-for-internet-supply-chain-collaboration/][209]

REA:[][210][http://jeffsutherland.org/oopsla2000/mccarthy/mccarthy.htm][210]

Remember the ERP information flow?

PO-\>EDI-\>CO-\>MPS-\>MRP-\>CRP-\>WO-\>PO-\>EDI-\>CO etc.

The REA information flow is much simpler:

Process-\>Stock Flow-\>Exchange-\>Stock Flow-\>Process etc. across multiple companies.

[http://en.wikipedia.org/wiki/Basic\_human\_needs][211]

[http://en.wikipedia.org/wiki/Maslow%27s\_hierarchy\_of\_needs][212]

[http://en.wikipedia.org/wiki/Murray's\_psychogenic\_needs][213]

[http://en.wikipedia.org/wiki/Environmental\_law][214]

[http://en.wikipedia.org/wiki/Standard\_of\_living][98]

[http://en.wikipedia.org/wiki/Planetary\_habitability][215]

[http://en.wikipedia.org/wiki/Survival\_skills][216]

[http://en.wikipedia.org/wiki/Metamotivation][217]

[][217]

[http://earthengine.googlelabs.com][218]

[][218]

[http://www.futurict.ethz.ch/FuturIcT][219]

[][219]

[http://code.google.com/apis/maps/][220]

[http://tables.googlelabs.com/Home][221]

[http://googlegeodevelopers.blogspot.com/2010/11/five-great-fusion-tables-maps-examples.html][222]

[][222]

[http://multiverseaccordingtoben.blogspot.com/2010/12/will-decreasing-scarcity-allow-us-to.html][223]

[][223]

[http://www.roboearth.org][224]

[][224]

[http://www.appropedia.org/Hexayurt\_mass\_evacuation][225]

[][225]

[http://en.wikipedia.org/wiki/ISO\_6709][226] (latitude, longitude, altitude)

http://www.poodwaddle.com/clocks/worldclock

http://www.poodwaddle.com/clocks/worldclock/sources

[http://www.stratfor.com/][227]

[http://www.mi2g.com/][228]

# List of Thinking Subjects

(from: http://en.wikipedia.org/wiki/Nootropics)

[Abstract thinking][229]

[Attention][230]

[Attitude][231]

[Brainstorming][232]

[Cognition][233]

[Cognitive science][234]

[Creative thinking][235]

[Critical thinking][236]

[Curiosity][237]

[Decision][238]

[Decision making][239]

[Eidetic memory][240]

[Emotions][241] and [feelings][242]

[Emotional intelligence][243]

[Goals and goal setting][244]

[Idea][245]

[Imagination][246]

[Intelligence][247]

[Introspection][248]

[Lateral thinking][249]

[Learning][250]

[Memory][251]

[Memory-prediction framework][252]

[Mental calculation][253]

[Mind's eye][254]

[Mindset][255]

[Mood][256]

[Motivation][257]

[Perception][258]

[Personality][259]

[Picture thinking][260]

[Problem shaping][261]

[Problem solving][262]

[Reason][263]

[Recollection (recall)][264]

[Self-reflection][265]

[Thought][266]

[Visual thinking][267]

List of Health Subjects

(from [http://en.wikipedia.org/wiki/Nootropics][268])

[Anxiety][269]

[Cognitive psychology][270]

[Clinical depression][271]

[Confusion][272]

[Cosmetic pharmacology][273]

[Drug][274]

[Parasympathomimetics][275]

[Prescription drug][276]

[Prohibition (drugs)][277]

[Psychoactive drug][278] (aka psychotropic drug)

[Psychedelic drug][279]

[Human enhancement][280]

[Ergogenic aid][281]

[Life extension][282]

[Neurodegenerative disease][283]

[Alzheimer's disease][284]

[Parkinson's disease][285]

[Nutrition][286]

[Sleep disorders][287]

[Stress][288]

[Stress management][289] 

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

What's the [best new blog][290] I should be reading regularly and tell everyone I know about? 

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

[http://www.stevepavlina.com/forums/personal-effectiveness/956-life-management-software.html][291]
    
1.  http://gtdportal.pbwiki.com/

[http://www.mylifeorganized.net/][292]

[http://sciral.com/products/index.html][293]

[http://iscrybe.com/main/index.php][294]

[http://www.trgtd.com.au/][295]
    
1.  http://en.wikipedia.org/wiki/Getting\_Things\_Done

[http://en.wikipedia.org/wiki/Life\_hack][296]
    
1.  http://lifehacker.com/
1.  http://www.lifehack.org/
1.  http://www.lifehackingmovie.com/

See:

[http://www.filemaker.com/products/bento/ipad.html][297]

http://www.filemaker.com/solutions

[http://solutions.filemaker.com/database-templates/index.jsp][298]

[http://www.looptmix.com/][299]

[http://www.loopt.com/][300]

## 

TradeVibes.  (2007-2008). Ben Goertzel. In: TradeVides.com Retrieved Dec 2008 from [http://www.tradevibes.com/person/profile/ben-goertzel\_1][301]

Convergence 2008\. (2008). Convergence 08: Speakers : Goertzel. In convergence08.org Retrieved Dec 2008 from [http://www.convergence08.org/speakers/goertzel/][302]

Ritter, S. (2007). Cognitive Tutor: Applied research in mathematics education. Psychonomic Bulletin & Review, 14 (2), 249-255 

http://espace.library.uq.edu.au/view/UQ:57497

[http://en.wikipedia.org/wiki/Learning\_object][303]

[Intelligent tutoring system - Wikipedia, the free encyclopedia][304]

[Cognitive tutor - Wikipedia, the free encyclopedia][305]

[http://en.wikipedia.org/wiki/Theory\_of\_Constraints][306]

[http://en.wikipedia.org/wiki/Role-playing][307]

[][307]

Beating the Blues (NICE)
    
1.  http://www.beatingtheblues.co.uk/connect/

[http://www.ultrasis.com/products/product.jsp?product\_id=1][308] 

[http://moodgym.anu.edu.au/welcome/faq][309]

[http://ecouch.anu.edu.au/welcome][310] 

## Story Elements

http://tvtropes.org/

## Psychogenic Human Needs

[http://www.ehow.com/info\_8299766\_motives-pyschology.html][311]

[][311]
    
1.  ## Abraham Maslow's Hierarchy
1.  ## Erich Fromm

1.  ## According to Fromm, basic needs include the need for relatedness, transcendence, rootedness, identity and a frame of orientation.

1.  ## Murray Biological and Psychogenic Needs & Thematic Appreciation Test (TAT)

1.  [http://en.wikipedia.org/wiki/Thematic\_Apperception\_Test][312]
1.  [http://en.wikipedia.org/wiki/Murray's\_psychogenic\_needs][313]

1.  Ishizuka's Spheres

1.  Examining only psychological needs and motives, Ishizuka divided human motives into three spheres: the search for self, the need for intimacy and the quest for achievement. Recurring themes of the need for interaction, self-understanding and meaningful work underlie the work of psychologists in understanding what truly motivates humans.

1.  Neurotics Needs

1.  [http://psychology.about.com/od/theoriesofpersonality/a/neuroticneeds.htm][314]

[][314]

[][314]

### Murrays Psychogenic Needs

This is the list of needs identified in Explorations in Personality, edited by[][315][Henry A. Murray][315] in 1938\.

[http://en.wikipedia.org/wiki/Murray's\_psychogenic\_needs][313][][0][][0]

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

[http://psychology.about.com/od/theoriesofpersonality/a/hierarchyneeds\_2.htm][316]

[][316]

Maslow believed that these needs are similar to instincts and play a major role in motivating behavior. Physiological, security, social, and esteem needs are deficiency needs (also known as D-needs), meaning that these needs arise due to deprivation. Satisfying these lower-level needs is important in order to avoid unpleasant feelings or consequences.

Maslow termed the highest-level of the pyramid as growth needs (also known as being needs or B-needs). Growth needs do not stem from a lack of something, but rather from a desire to grow as a person.

### Five Levels of the Hierarchy of Needs

There are five different levels in Maslow's hierarchy of needs:

1.  [Physiological Needs][317]

1.  These include the most basic needs that are vital to survival, such as the need for water, air, food and sleep. Maslow believed that these needs are the most basic and instinctive needs in the hierarchy because all needs become secondary until these physiological needs are met.
1.  Some examples of the physiological needs include:

1.  Food
1.  Water
1.  Breathing
1.  Homeostatis
1.  In addition to the basic requirements of nutrition, air and temperature regulation, the physiological needs also include such things as shelter and clothing. Sexual reproduction is also included in this level of the hierarchy of needs since it is essential to the survival and propagation of the species.

1.  [Security Needs][318]

1.  These include needs for safety and security. Security needs are important for survival, but they are not as demanding as the physiological needs. Examples of security needs include a desire for steady employment, health insurance, safe neighborhoods and shelter from the environment.

1.  As we move up to the second level of Maslow's hierarchy of needs, the requirements start to become a bit more complex. In this level, the needs for security and safety become primary. People want to control and order in their lives, so this need for safety and security contributes largely to behaviors.

1.  Some of the basic security and safety needs include:

1.  Financial security
1.  Heath and wellness
1.  Safety against accidents and injury
1.  Finding a steady job, obtaining health insurance, contributing money to a savings account and moving into a safer neighborhood are all examples of actions motivated by the security and safety needs.

Together, the safety and psychological levels of the hierarchy make up what is often referred to as the basic needs.

1.  [Social Needs][319]

1.  These include needs for belonging, love and affection. Maslow considered these needs to be less basic than physiological and security needs. Relationships such as friendships, romantic attachments and families help fulfill this need for companionship and acceptance, as does involvement in social, community or religious groups.

1.  Some of the things that satisfy this need include:

1.  Friendships
1.  Romantic attachments
1.  Family
1.  Social groups
1.  Community groups
1.  Churches and religious organizations

1.  [Esteem Needs][320]

1.  After the first three needs have been satisfied, esteem needs becomes increasingly important. These include the need for things that reflect on self-esteem, personal worth, social recognition and accomplishment.

In addition to the need for feelings of accomplishment and prestige, the esteem needs include such things as[][321][self-esteem][321] and personal worth. People need to feel valued and by others as well as having a sense of making a contribution to the world. Participation in professional activities, academic accomplishments, athletic or team participation and personal hobbies can all play a role in fulfilling the esteem needs.

1.  [Self-actualizing Needs][322]

1.  This is the highest level of Maslow's hierarchy of needs.[][323][Self-actualizing][323] people are self-aware, concerned with personal growth, less concerned with the opinions of others and interested fulfilling their potential.

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
[5]: #h.k1zy52hqzb53
[6]: #h.t8720cwdywtf
[7]: #h.leny8gf4jy0l
[8]: #h.bicg8ro9gnso
[9]: #h.x4z8ohgx8bgy
[10]: #h.wi9l8jzcw7we
[11]: #h.j97j64vlzh6f
[12]: #h.apb5svj4bga
[13]: #h.98oru4vl4tkc
[14]: #h.ka1guvj1vqtb
[15]: #h.4k2fslxskwlm
[16]: #h.ubvjqexzf53u
[17]: #h.jmkrkle8z05y
[18]: #h.rk5csd8eerdr
[19]: #h.wsyfvwk0hqxr
[20]: #h.74jbbsvljjzc
[21]: #h.6j3f855mw2zv
[22]: #h.dv0dfcfrjp7r
[23]: #h.pyqq8fdhspes
[24]: #h.lo0smp201ztw
[25]: #h.q1sahrstbzvm
[26]: #h.najl0xvzutg9
[27]: #h.k6et9icvuoad
[28]: #h.xzxvcjwzugug
[29]: #h.kwnrhqgmjmvb
[30]: #h.ghwpm6v2m8jn
[31]: #h.gekmur5hzehu
[32]: #h.1gwl45kj7wxv
[33]: #h.5n2fiq2p1h8o
[34]: #h.38ipvfm48fdi
[35]: #h.qc7iosd5p5al
[36]: #h.2xnul6duk3ev
[37]: #h.imhgfxsveusx
[38]: #h.htflyo99v1hm
[39]: #h.68izulcvyg12
[40]: #h.momkxncru9t
[41]: #h.jbbnl52zeh2w
[42]: #h.eft53tmlp3fd
[43]: #h.psr0mggsbmx4
[44]: #h.ee9t33uh56gb
[45]: #h.tvxyw0wap63q
[46]: #h.1sv3jdahou8y
[47]: #h.9gjwor5za36c
[48]: #h.pu1eydm9reug
[49]: #h.dlfc3fawgou4
[50]: #h.gu9ljha084kr
[51]: #h.ct5x1mf6yue6
[52]: #h.scq5s15hewy5
[53]: #h.7gw7ig7l55tl
[54]: #h.tqbdgkwvfaka
[55]: #h.jyvnh0ngfk2h
[56]: #h.e07jmolg4axa
[57]: #h.lguvso46v9ng
[58]: #h.h3v46z6h2dd9
[59]: #h.kec0i7dj5578
[60]: #h.h1074xklqkb1
[61]: #h.26l2palb9iwy
[62]: #h.4i7ivrcb6pzn
[63]: #h.sk9n0pgr6xh6
[64]: #h.k03hd6bessx5
[65]: #h.9bm7zzifhnjr
[66]: #h.ja35o6g0vnnl
[67]: #h.v4v7pnuxa36i
[68]: #h.7eaclf9th59g
[69]: #h.7f5cegkitir
[70]: #h.n2i0ck8v441d
[71]: #h.cac35f6asblx
[72]: #h.p75jqo3ikhih
[73]: #h.54di3dz5m62k
[74]: #h.d1h1w9v0eyz1
[75]: #h.dwrh4j2sol2q
[76]: #h.e3x8vam5spmw
[77]: #h.j6x35sk3sj0
[78]: http://netention.org
[79]: https://github.com/automenta/netentionjs2
[80]: http://nodejs.org/dist/v0.8.14/node-v0.8.14.tar.gz
[81]: https://github.com/automenta/netentionjs2.git
[82]: https://github.com/edwardhotchkiss/always
[83]: http://en.wikipedia.org/wiki/Public_Participation_GIS
[84]: http://en.wikipedia.org/wiki/Collaborative_mapping
[85]: http://en.wikipedia.org/wiki/Participatory_GIS
[86]: http://en.wikipedia.org/wiki/Neighborhood_planning
[87]: http://en.wikipedia.org/wiki/Volunteered_Geographic_Information
[88]: http://en.wikipedia.org/wiki/Web_mapping
[89]: http://en.wikipedia.org/wiki/Neogeography
[90]: http://en.wikipedia.org/wiki/Quality_of_life
[91]: http://en.wikipedia.org/wiki/Physical_Quality_of_Life_Index
[92]: http://en.wikipedia.org/wiki/Quality-of-life_index
[93]: http://en.wikipedia.org/wiki/Quality_of_life_%28healthcare%29
[94]: http://en.wikipedia.org/wiki/Legatum_Prosperity_Index
[95]: http://en.wikipedia.org/wiki/UN_Human_Development_Index
[96]: http://en.wikipedia.org/wiki/Human_Poverty_Index
[97]: http://en.wikipedia.org/wiki/Human_Development_Index
[98]: http://en.wikipedia.org/wiki/Standard_of_living
[99]: http://en.wikipedia.org/wiki/Emotional_well-being
[100]: http://mqtt.org/
[101]: http://www.eeml.org/
[102]: http://wiki.openstreetmap.org/wiki/Potential_Datasources
[103]: http://pachube.com/
[104]: http://semanticommunity.info/
[105]: http://geonetwork-opensource.org/gallery/gallery.html
[106]: http://www.epa.gov/regulations/
[107]: http://data.un.org/
[108]: http://www.google.com/url?q=https%3A%2F%2Fwww.cia.gov%2Flibrary%2Fpublications%2Fthe-world-factbook%2F&sa=D&sntz=1&usg=AFQjCNG1XTLvu6i3MVyJdY7PlGGBBr6Wpw
[109]: http://www.kmlfactbook.org/#&db=wri&table=3_812&col=2000&
[110]: https://www.cia.gov/library/publications/the-world-factbook/
[111]: http://goworldwind.org/demos/
[112]: http://www.iges.org/grads/gds/
[113]: http://sedac.ciesin.org/data.html
[114]: http://geodata.grid.unep.ch/
[115]: http://en.wikipedia.org/wiki/Crime_mapping
[116]: http://www.crimereports.com/
[117]: http://www.crimemapping.com/
[118]: http://www.google.com/publicdata/overview?ds=d5bncppjof8f9_
[119]: http://data.worldbank.org/
[120]: http://data.worldbank.org/indicator
[121]: http://www.rhok.org/node/2608
[122]: https://www.opensource.gov/
[123]: http://www.bbc.co.uk/news/technology-14841018
[124]: http://ec.europa.eu/environment/seis/newsletter/issue_003.html
[125]: http://www.earthobservations.org/geoss.shtml
[126]: http://ec.europa.eu/environment/seis/funding.htm
[127]: http://www.ndbc.noaa.gov/obs.shtml
[128]: http://www.unidata.ucar.edu/projects/THREDDS/
[129]: http://www.swpc.noaa.gov/alerts/archive/current_month.html
[130]: http://www.globalincidentmap.com/
[131]: http://amberalerts.globalincidentmap.com/
[132]: http://hazmat.globalincidentmap.com/
[133]: http://fires.globalincidentmap.com/
[134]: http://outbreaks.globalincidentmap.com/
[135]: http://gangs.globalincidentmap.com/
[136]: http://border.globalincidentmap.com/
[137]: http://president.globalincidentmap.com/
[138]: http://www.globalincidentmap.com/predictions.php
[139]: http://quakes.globalincidentmap.com/
[140]: http://drugs.globalincidentmap.com/
[141]: http://aviation.globalincidentmap.com/
[142]: http://food.globalincidentmap.com/
[143]: http://human.globalincidentmap.com/
[144]: http://en.wikipedia.org/wiki/Foodshed
[145]: http://en.wikipedia.org/wiki/Category:Humanitarian_aid_organizations
[146]: http://en.wikipedia.org/wiki/CompStat
[147]: http://www.mufon.com/mufonreports.html
[148]: http://www.ufostalker.com/?mufon=true
[149]: http://en.wikipedia.org/wiki/Nuclear_decommissioning
[150]: http://www.google.com/fusiontables/DataSource?dsrcid=579353&search=nuclear&cd=5
[151]: http://www.google.com/fusiontables/DataSource?dsrcid=578937&search=nuclear&cd=12
[152]: http://www.epa.gov/tri/
[153]: http://en.wikipedia.org/wiki/Superfund#Accessing_Superfund_data
[154]: http://www.acousticecology.org/srwifi.html
[155]: http://www.epa.gov/enviro/facts/ef_restful.html
[156]: http://airnow.gov/
[157]: http://transport.nilu.no/flexpart
[158]: http://chemtrailsmap.com/
[159]: http://www.cellreception.com/towers/
[160]: http://waterdata.usgs.gov/nwis/qw
[161]: http://nuclear.carboncapturereport.org/cgi-bin/topic
[162]: http://globalenergyobservatory.org/select.php?tgl=Kml
[163]: http://outagecentral.com/
[164]: http://en.wikipedia.org/wiki/Cancer_cluster
[165]: http://en.wikipedia.org/wiki/Biostatistics
[166]: http://en.wikipedia.org/wiki/Cancer_epidemiology
[167]: http://www.helpx.net/
[168]: http://www.neural-forecasting.com/neural_forecasting_data.htm
[169]: http://econdata.net/
[170]: http://www.lib.umich.edu/govdocs/stats.html
[171]: http://odwin.ucsd.edu/idata/
[172]: http://www.phil.frb.org/econ/spf/spfpage.html
[173]: http://www.tcb-indicators.org/
[174]: http://www.usinfostore.com/
[175]: http://finance.yahoo.com/
[176]: http://fx.sauder.ubc.ca/
[177]: http://www.oanda.com/
[178]: http://theyrule.net/drupal/content/transnationaleorg-0
[179]: http://www.transnationale.org/
[180]: http://theyrule.net/drupal/content/interactive-political-map-west-bank
[181]: http://www.guardian.co.uk/world/interactive/2008/sep/11/israelandthepalestinians
[182]: http://theyrule.net/drupal/content/number-wont-get-any-smaller
[183]: http://theyrule.net/drupal/content/corporate-collective-consciousness
[184]: http://wikiscanner.virgil.gr/
[185]: http://theyrule.net/drupal/content/wheresgeorgecom-money-and-epidemics
[186]: http://www.wheresgeorge.com/
[187]: http://www.eurekalert.org/pub_releases/2006-01/uoc--igp012406.php
[188]: http://www.insna.org/
[189]: http://theyrule.net/drupal/content/cryptome
[190]: http://cryptome.org/mil-dead-iqw.htm
[191]: http://cryptome.org/
[192]: http://en.wikipedia.org/wiki/Cryptome
[193]: http://theyrule.net/drupal/content/disappeared-america
[194]: http://theyrule.net/drupal/content/exploring-enron
[195]: http://theyrule.net/drupal/content/board-death
[196]: http://adbusters.org/blogs/Board_to_Death.html
[197]: http://theyrule.net/drupal/content/gapminder
[198]: http://www.gapminder.org/
[199]: http://directory.ic.org/maps/default.xml
[200]: http://www.globaldatavault.com/natural-disaster-threat-maps.htm
[201]: http://hisz.rsoe.hu/alertmap/
[202]: http://en.wikipedia.org/wiki/Cooling_center
[203]: http://en.wikipedia.org/wiki/Warming_center
[204]: http://www.scientificamerican.com/article.cfm?id=ratti-smartest-cities-use-people-as-sensors
[205]: http://thenewamerican.com/tech/item/13613-darpa-sponsors-surveillance-technology-to-predict-future-behavior
[206]: http://www.darpa.mil/NewsEvents/Releases/2011/09/28.aspx
[207]: http://portal.acm.org/citation.cfm?id=786227
[208]: http://at-scm.com/index.php/2006/12/04/supply-chain-management/artificial-intelligence-in-supply-chains/
[209]: http://at-scm.com/index.php/2006/11/13/supply-chain-management/rea-a-semantic-model-for-internet-supply-chain-collaboration/
[210]: http://jeffsutherland.org/oopsla2000/mccarthy/mccarthy.htm
[211]: http://en.wikipedia.org/wiki/Basic_human_needs
[212]: http://en.wikipedia.org/wiki/Maslow%27s_hierarchy_of_needs
[213]: http://en.wikipedia.org/wiki/Murray%27s_psychogenic_needs
[214]: http://en.wikipedia.org/wiki/Environmental_law
[215]: http://en.wikipedia.org/wiki/Planetary_habitability
[216]: http://en.wikipedia.org/wiki/Survival_skills
[217]: http://en.wikipedia.org/wiki/Metamotivation
[218]: http://earthengine.googlelabs.com/
[219]: http://www.futurict.ethz.ch/FuturIcT
[220]: http://code.google.com/apis/maps/
[221]: http://tables.googlelabs.com/Home
[222]: http://googlegeodevelopers.blogspot.com/2010/11/five-great-fusion-tables-maps-examples.html?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed:+GoogleGeoDevelopersBlog+%28Google+Geo+Developers+Blog%29
[223]: http://multiverseaccordingtoben.blogspot.com/2010/12/will-decreasing-scarcity-allow-us-to.html
[224]: http://www.roboearth.org/
[225]: http://www.appropedia.org/Hexayurt_mass_evacuation
[226]: http://en.wikipedia.org/wiki/ISO_6709
[227]: http://www.stratfor.com/
[228]: http://www.mi2g.com/
[229]: http://en.wikipedia.org/wiki/Abstraction
[230]: http://en.wikipedia.org/wiki/Attention
[231]: http://en.wikipedia.org/wiki/Attitude_%28psychology%29
[232]: http://en.wikipedia.org/wiki/Brainstorming
[233]: http://en.wikipedia.org/wiki/Cognition
[234]: http://en.wikipedia.org/wiki/Cognitive_science
[235]: http://en.wikipedia.org/wiki/Creativity
[236]: http://en.wikipedia.org/wiki/Critical_thinking
[237]: http://en.wikipedia.org/wiki/Curiosity
[238]: http://en.wikipedia.org/wiki/Decision
[239]: http://en.wikipedia.org/wiki/Decision_making
[240]: http://en.wikipedia.org/wiki/Eidetic_memory
[241]: http://en.wikipedia.org/wiki/Emotion
[242]: http://en.wikipedia.org/wiki/Feeling
[243]: http://en.wikipedia.org/wiki/Emotional_intelligence
[244]: http://en.wikipedia.org/wiki/Objective_%28goal%29
[245]: http://en.wikipedia.org/wiki/Idea
[246]: http://en.wikipedia.org/wiki/Imagination
[247]: http://en.wikipedia.org/wiki/Intelligence_%28trait%29
[248]: http://en.wikipedia.org/wiki/Introspection
[249]: http://en.wikipedia.org/wiki/Lateral_thinking
[250]: http://en.wikipedia.org/wiki/Learning
[251]: http://en.wikipedia.org/wiki/Memory
[252]: http://en.wikipedia.org/wiki/Memory-prediction_framework
[253]: http://en.wikipedia.org/wiki/Mental_calculation
[254]: http://en.wikipedia.org/wiki/Mind%27s_eye
[255]: http://en.wikipedia.org/wiki/Mindset
[256]: http://en.wikipedia.org/wiki/Mood_%28psychology%29
[257]: http://en.wikipedia.org/wiki/Motivation
[258]: http://en.wikipedia.org/wiki/Perception
[259]: http://en.wikipedia.org/wiki/Personality_psychology
[260]: http://en.wikipedia.org/wiki/Picture_thinking
[261]: http://en.wikipedia.org/wiki/Problem_shaping
[262]: http://en.wikipedia.org/wiki/Problem_solving
[263]: http://en.wikipedia.org/wiki/Reason
[264]: http://en.wikipedia.org/wiki/Recollection
[265]: http://en.wikipedia.org/wiki/Human_self-reflection
[266]: http://en.wikipedia.org/wiki/Thought
[267]: http://en.wikipedia.org/wiki/Visual_thinking
[268]: http://en.wikipedia.org/wiki/Nootropics
[269]: http://en.wikipedia.org/wiki/Anxiety
[270]: http://en.wikipedia.org/wiki/Cognitive_psychology
[271]: http://en.wikipedia.org/wiki/Clinical_depression
[272]: http://en.wikipedia.org/wiki/Mental_confusion
[273]: http://en.wikipedia.org/wiki/Cosmetic_pharmacology
[274]: http://en.wikipedia.org/wiki/Drug
[275]: http://en.wikipedia.org/wiki/Parasympathomimetics
[276]: http://en.wikipedia.org/wiki/Prescription_drug
[277]: http://en.wikipedia.org/wiki/Prohibition_%28drugs%29
[278]: http://en.wikipedia.org/wiki/Psychoactive_drug
[279]: http://en.wikipedia.org/wiki/Psychedelic_drug
[280]: http://en.wikipedia.org/wiki/Human_enhancement
[281]: http://en.wikipedia.org/wiki/Ergogenic_aid
[282]: http://en.wikipedia.org/wiki/Life_extension
[283]: http://en.wikipedia.org/wiki/Neurodegenerative_disease
[284]: http://en.wikipedia.org/wiki/Alzheimer%27s_disease
[285]: http://en.wikipedia.org/wiki/Parkinson%27s_disease
[286]: http://en.wikipedia.org/wiki/Nutrition
[287]: http://en.wikipedia.org/wiki/Sleep_disorder
[288]: http://en.wikipedia.org/wiki/Stress_%28medicine%29
[289]: http://en.wikipedia.org/wiki/Stress_management
[290]: http://www.stevepavlina.com/blog
[291]: http://www.stevepavlina.com/forums/personal-effectiveness/956-life-management-software.html
[292]: http://www.mylifeorganized.net/
[293]: http://sciral.com/products/index.html
[294]: http://iscrybe.com/main/index.php
[295]: http://www.trgtd.com.au/
[296]: http://en.wikipedia.org/wiki/Life_hack
[297]: http://www.filemaker.com/products/bento/ipad.html
[298]: http://solutions.filemaker.com/database-templates/index.jsp
[299]: http://www.looptmix.com/
[300]: http://www.loopt.com/
[301]: http://www.tradevibes.com/person/profile/ben-goertzel_1
[302]: http://www.convergence08.org/speakers/goertzel/
[303]: http://en.wikipedia.org/wiki/Learning_object
[304]: http://en.wikipedia.org/wiki/Intelligent_tutoring_system
[305]: http://en.wikipedia.org/wiki/Cognitive_Tutor
[306]: http://en.wikipedia.org/wiki/Theory_of_Constraints
[307]: http://en.wikipedia.org/wiki/Role-playing
[308]: http://www.ultrasis.com/products/product.jsp?product_id=1
[309]: http://moodgym.anu.edu.au/welcome/faq
[310]: http://ecouch.anu.edu.au/welcome
[311]: http://www.ehow.com/info_8299766_motives-pyschology.html
[312]: http://en.wikipedia.org/wiki/Thematic_Apperception_Test
[313]: http://en.wikipedia.org/wiki/Murray's_psychogenic_needs
[314]: http://psychology.about.com/od/theoriesofpersonality/a/neuroticneeds.htm
[315]: http://en.wikipedia.org/wiki/Henry_A._Murray
[316]: http://psychology.about.com/od/theoriesofpersonality/a/hierarchyneeds_2.htm
[317]: http://psychology.about.com/od/theoriesofpersonality/ss/maslows-needs-hierarchy_2.htm
[318]: http://psychology.about.com/od/theoriesofpersonality/ss/maslows-needs-hierarchy_3.htm
[319]: http://psychology.about.com/od/theoriesofpersonality/ss/maslows-needs-hierarchy_4.htm
[320]: http://psychology.about.com/od/theoriesofpersonality/ss/maslows-needs-hierarchy_5.htm
[321]: http://psychology.about.com/od/sindex/f/what-is-self-esteem.htm
[322]: http://psychology.about.com/od/theoriesofpersonality/ss/maslows-needs-hierarchy_6.htm
[323]: http://psychology.about.com/od/theoriesofpersonality/tp/self-actualized-characteristic.htm