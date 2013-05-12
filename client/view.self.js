function newSelfTagList(s, user) {
    var b = $('<div/>');
    var person = self.getSelf(self.id());
    var name = person.name;
    b.append('<button>' + name + '</button>');
    
    //ADD buttons for each tag
    
    return b;
}

function newSelfSummary(s, user) {
    var c = $('<div/>');        
    c.html('');                

    var tags = { };

    var np = $('<div/>');
    np.addClass('NameHeader');
    np.append('<input type="text" placeholder="Name"/>');
    np.append("'s Knowledge");
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
    
    sidebar.append(newSelfTagList(s, s.myself()));
    content.append(newSelfSummary(s, s.myself()));
    
    v.append(frame);
    
}

