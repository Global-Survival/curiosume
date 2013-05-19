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
    'ExpertTeacher': '#FF3B2E',
    'Can': 'fuchsia',
    'Need': 'blue'
};
    
function newTagBrowser(s) {
    var b = $('<div/>');
    
    var searchInput = $('<input placeholder="Search Wikipedia"/>');
    var searchInputButton = $('<button>&gt;&gt;&gt;</button>');
    searchInputButton.click(function() {
       gotoTag(searchInput.val(), true); 
    });
    b.append(searchInput);
    b.append(searchInputButton);
    
    var br = $('<div/>');
    br.addClass('WikiBrowser');
    
    
    var currentTag = 'Learning';
    
    function gotoTag(t,search) {        
        br.html('Loading...');
        currentTag = t;
        
        if (t == null) {
            $.get('/skill-home.html', function(d) {
               br.html('');
               br.append(d); 
s
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
               
               br.find('#top').remove();
               br.find('#siteSub').remove();
               br.find('#contentSub').remove();
               br.find('#jump-to-nav').remove();
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
               });
            });
            
            //..
        }
    }
    gotoTag(currentTag);
        
    b.append(br);
    
    {
        var tagBar = $('<div/>');

        //http://jqueryui.com/button/#checkbox
        var skillSet = $('<div/>');
        var canNeedSet = $('<div/>');
        
        function tbutton( tag, target) {
            var b = $('<input/>');
            var cid = 'skill_' + tag;
            b.attr('id', cid);
            b.attr('type', 'checkbox');            
            b.html(tag);
            b.click(function(event) {
                var t = event.target;
                if (t.checked) {
                    target.children('input').each(function() {
                       var x = $(this);
                       if (x.attr('id')!=t.id) {
                           x.attr('checked', false);
                       }
                    });
                    target.buttonset('refresh');
                }
            });
            target.append(b);
            
            var l = $('<label for="' + cid + '">' + tag + '</label>');
            l.attr('style','color:' + tagColorPresets[tag]);
            target.append(l);
            return b;
        }
        
        
        {
            tbutton('BeginnerStudent', skillSet);
            tbutton('IntermediateStudent', skillSet);
            tbutton('CollaboratingStudent', skillSet);
            tbutton('CollaboratingTeacher', skillSet);
            tbutton('IntermediateTeacher', skillSet);
            tbutton('ExpertTeacher', skillSet);
        }
        tagBar.append(skillSet);
        skillSet.buttonset();
        
        tagBar.append('<br/>');
        
        {
            tbutton('Can', canNeedSet);
            tbutton('Need', canNeedSet);            
        }
        tagBar.append(canNeedSet);                
        canNeedSet.buttonset();        
        
        tagBar.append('<br/>');
        
        var saveButton = $('<button>Save</button>');
        saveButton.addClass('WikiTagSave');
        saveButton.click(function() {
            if (currentTag==null) {
                alert('Choose a wikitag.');                
                return;                
            }

            var selTags = [];
            
            console.dir(tagBar.find('div input'));
            tagBar.find('div input').each(function() {
               var x = $(this);
               var c = x[0].checked;
               if (c) {
                   var i = x.attr('id').substring(/*skill_*/6);
                   selTags.push(i);
               }
            });
            if (selTags.length > 0) {
                var id = s.id() + '-' + currentTag;
                var o = objNew(id, currentTag);
                o.author = s.id();
                objAddTag(o, currentTag);
            
                for (var i = 0; i < selTags.length; i++) {
                    objAddTag(o, selTags[i]);
                }
                
                s.notice(o);
                s.pub(o);                            
            }
            else {
                alert('Choose 1 or more tags to combine with the wikitag.');
            }
        });
        b.append(saveButton);
        
        b.prepend(tagBar);
    }
    
    return b;    
}

function newSelfTagList(s, user, c) {
    
    var b = $('<div/>');
    var person = s.getSelf(s.id());
    var name = person.name;
    
    var tags = s.getIncidentTags(s.id(), _.keys(tagColorPresets));            
    
    var ownButton, addButton;
    var svbp = $('<div/>').attr('class', 'SelfViewButtonPanel');

    svbp.append(ownButton = $('<button>' + name + '</button>'));    
    
    svbp.append(addButton = $('<button class="SelfAddTagButton">+</button>'));
    ownButton.click(function() {
        c.html(newSelfSummary(s, user));
    });
    addButton.click(function() {
        c.html(newTagBrowser(s));        
    });
    
    b.append(svbp);

    function newTagWidget(x, i) {
        var name
        var o = s.getObject(i);
        if (o) {
            var tags = objTags(o);
            var otherTags = _.without(tags, x);  
            var b = $('<div>' +  + '</div>');
            var a = $('<a href="#">' + otherTags[0] + '</a>');
            a.click(function() {
                newPopupObjectView(i);
            });
            a.appendTo(b);
        }
        return b;        
    }
    
    function addTagSection(x) {
        if (!x) return;
        
        var cl = tags[x];
        
        var color = tagColorPresets[x] || 'gray';
        
        b.append('<div><h4><span style="padding-right: 0.2em; background-color: ' + color + '">&nbsp;&nbsp;</span>&nbsp;' + x + '</h4></div>');
        
        for (var i = 0; i < cl.length; i++) {
            b.append(newTagWidget(x, cl[i]));
        }
        
        b.append('<br/>');
    }
    var k = _.keys(tags);
    var pinnedSections = ['ExpertTeacher', 'IntermediateTeacher', 'CollaboratingTeacher', 'CollaboratingStudent', 'IntermediateStudent', 'BeginnerStudent' ];
    for (var i = 0; i < pinnedSections.length; i++) {
        var p = pinnedSections[i];
        if (_.contains(k, p)) {
            addTagSection(p);
            k = _.without(k, p);
        }        
    }
    
    
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
    
    var nameInput = $('<input type="text" placeholder="Name"/>');
    nameInput.val(s.myself().name);
    np.append(nameInput);
    np.append('<br/>');
    var emailInput = $('<input type="text" placeholder="E-Mail"/>');
    emailInput.val(s.myself().email);
    np.append(emailInput);
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
       var m = s.myself();
       m.name = nameInput.val();
       m.email = emailInput.val();
       s.pub(s.myself());
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

    /*c.append('<div id="KnowledgeCodeLabel">Knowedge Code:</div>');
    var p = $('<pre>');
    p.html(JSON.stringify(tags));
    c.append(p);*/
                

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

