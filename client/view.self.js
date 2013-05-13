/* http://www.perbang.dk/rgbgradient/
    6 steps between: AFE500 and FF3B2E
        AFE500 E9EA08 EFBB11 F48E1A F96324 FF3B2E
*/

var tagColorPresets = {
    'BeginnerStudent': '#AFE500',
    'IntermediateStudent': '#E9EA08',
    'CollaboratingStudent': '#EFBB11',
    'CollaboratingTeacher': '#F48E1A',
    'IntermediateTeacher': '#F96324',
    'ExpertTeacher': '#FF3B2E'                
};
    
function newTagBrowser(s) {
    var b = $('<div/>');
    
    var searchInput = $('<input placeholder="search"/>');
    var searchInputButton = $('<button>..</button>');
    searchInputButton.click(function() {
       gotoTag(searchInput.val(), true); 
    });
    b.append(searchInput);
    b.append(searchInputButton);
    
    var br = $('<div/>');
    br.addClass('WikiBrowser');
    
    
    var currentTag = 'Learning';
    
    function gotoTag(t,search) {        
        br.html('');
        currentTag = t;
        
        if (t == null) {
            $.get('/skill-home.html', function(d) {
               br.html('');
               br.append(d); 

            });
            
        }
        else {
            var url = search ? '/wiki/search/' + t : '/wiki/' + t + '/html';
            
            
            $.get(url, function(d) {
               br.html('');
               br.append(d); 
               
               if (search) {
                    currentTag = $('.WIKIPAGEREDIRECTOR').html();
               }
               
               br.find('a').each(function(){
                   var t = $(this);
                   var h = t.attr('href');
                   t.attr('href', '#');
                   if (h) {
                    if (h.indexOf('/wiki') == 0) {
                         t.click(function() {

                             gotoTag(h.substring(6)); 
                         });
                    }
                   }
                   /*if (h) {
                       if (h.indexOf('/wiki/')==0) {
                           var tt = h.substring(5);
                           t.click(function() {
                                alert(h);
                                gotoTag(tt);
                           });
                       }
                   }*/
               });
            });
            
            //..
        }
    }
    gotoTag(currentTag);
        
    b.append(br);
    
    {
        var tagBar = $('<div/>');
        
        function tbutton( tag) {
            var b = $('<button/>');
            b.attr('style','background-color:' + tagColorPresets[tag]);
            b.html(tag);
            b.click(function() {
                if (currentTag==null) return;
                
                var o = objNew();
                o.author = s.id();
                objAddTag(o, currentTag);
                objAddTag(o, tag);
                
                s.notice(o);
            });
            return b;            
        }
        
        tagBar.append(tbutton('BeginnerStudent'));
        tagBar.append(tbutton('IntermediateStudent'));
        tagBar.append(tbutton('CollaboratingStudent'));        
        tagBar.append(tbutton('CollaboratingTeacher'));
        tagBar.append(tbutton('IntermediateTeacher'));
        tagBar.append(tbutton('ExpertTeacher'));
        
        b.append(tagBar);
    }
    
    return b;    
}

function newSelfTagList(s, user, c) {
    
    var b = $('<div/>');
    var person = s.getSelf(s.id());
    var name = person.name;
    
    var tags = s.getIncidentTags(s.id(), _.keys(tagColorPresets));            
    
    var ownButton, addButton;
    b.append(ownButton = $('<button>' + name + '</button>'));    
    
    b.append(addButton = $('<button class="SelfAddTagButton">+</button>'));
    ownButton.click(function() {
        c.html(newSelfSummary(s, user));
    });
    addButton.click(function() {
        c.html(newTagBrowser(s));        
    });
    
    
    function addTagSection(x) {
        if (!x) return;
        
        var cl = tags[x];
        
        var color = tagColorPresets[x] || 'gray';
        
        b.append('<div><h4><span style="padding-right: 0.2em; background-color: ' + color + '">&nbsp;&nbsp;</span>&nbsp;' + x + '</h4></div>');
        
        for (var i = 0; i < cl.length; i++) {
            b.append('<div>' + cl[i] + '</div>');
        }
        
        b.append('<br/>');
    }
    var k = _.keys(tags);
    var pinnedSections = ['ExpertTeacher', 'IntermediateTeacher', 'CollaboratingTeacher', 'IntermediateStudent' ];
    for (var i = 0; i < pinnedSections.length; i++) {
        var p = pinnedSections[i];
        if (_.contains(k, p)) {
            addTagSection(p);
            k = _.without(k, p);
        }        
    }
    
    b.append('<hr/>');
    
    //ADD buttons for each tag
    for (var i = 0; i < k.length; i++) {
        addTagSection(k[i]);
    }
    
    return b;
}

function newSelfSummary(s, user) {
    var c = $('<div/>');        
    c.html('');                

    var tags = { };

    var np = $('<div/>');
    np.addClass('NameHeader');
    np.append('<input type="text" placeholder="Name"/>');
    c.append(np);



    var bio = $('<div id="Bio"/>');

    //http://en.wikipedia.org/wiki/HResume

    var objarea = $('<textarea id="BioText"></textarea>');
    objarea.html('objective / summary / contact method / experience / achievements / eduction / skills / qualifications / affiliations / publications ');
    bio.append(objarea);
    c.append(bio);

    var saveButton = $('<button>Save</button>');
    bio.append(saveButton);
    saveButton.click(function() {
       alert('Feature not available yet'); 
    });

    var cm = $('<div id="SelfMap"/>');
    c.append(cm);

    var location = tags['@'];
    if (location) {
        //HACK swap lat/lon
        var m = location[0];
        location[0] = location[1];
        location[1] = m;                    
    }

    later(function() {
        
        var lmap = initLocationChooserMap('SelfMap', location);
        cm.append('<br/>');
        var locAnon = $('<select><option>Exact Location</option><option>Anonymize 1km</option><option>Anonymize 5km</option><option>No Location</option></select>');
        locAnon.change(function() {
           alert('Feature not available yet'); 
        });

        cm.append(locAnon);

        lmap.onClicked = function(l) {
            tags['@'] = [ l.lon, l.lat ];
            saveTags();
            myself();
        };
    });

    c.append('<div style="clear: both"/>');
    c.append('<br/>');
    c.append('<br/>');

    var kc = $('<div id="KnowledgeChart"/>');

    var st = _.groupBy(_.without(_.keys(tags), '@'), function(t) { return tags[t]; });                

    function displayKnowledgeSection(n, t) {
        kc.append('<span class="KnowledgeSectionLabel" style="background-color: ' + levelColor[n] + '">&nbsp;&nbsp;</span>&nbsp;');
        kc.append('<span class="KnowledgeSectionLabel">' + levelLabel[n] + '</span>');
        for (var x=0; x < t.length; x++) {
            var i = t[x];
            var l = $('<p/>');
            var ki = $('<a href="/wiki/' + i + '">' + i + '</a>');
            l.append(ki);
            kc.append(l);                    
        }
        kc.append('<br/>');
    }

    if (st[3]) displayKnowledgeSection(3, st[3]);
    if (st[2]) displayKnowledgeSection(2, st[2]);
    if (st[1]) displayKnowledgeSection(1, st[1]);
    if (st[-1]) displayKnowledgeSection(-1, st[-1]);
    if (st[-2]) displayKnowledgeSection(-2, st[-2]);
    if (st[-3]) displayKnowledgeSection(-3, st[-3]);

    c.append(kc);

    c.append('<br/>');

    c.append('<div id="KnowledgeCodeLabel">Knowedge Code:</div>');
    var p = $('<pre>');
    p.html(JSON.stringify(tags));
    c.append(p);
                

    return c;
}

function renderSelf(s, o, v) {
       
    var frame = $('<div/>').attr('class','SelfView');
    
    
    var sidebar = $('<div/>').attr('class', 'SelfViewSide');
    var content = $('<div/>').attr('class', 'SelfViewContent');
    
    frame.append(sidebar);
    frame.append(content);
    
    sidebar.append(newSelfTagList(s, s.myself(), content));
    content.append(newSelfSummary(s, s.myself()));
    
    v.append(frame);
    
}

