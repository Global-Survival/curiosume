

var myNicEditor = null;
var defaultTheme = 'default-black';
var minFrameLength = 8;
var pageurl = 'http://cortexit.org';

var fontSize = 60;
var text;
var nodes = [];
var currentNode;
var speechEnabled = false;
var prevID = null;
var nextID = null;

var widgets = { };
    
    
function enableVozmeSpeech(line) {
    speechEnabled = true;

    var speech = document.getElementById("_Speech");
    speech.style.display = 'inline';
    var speechLine = line.replace("&nbsp;", " ").replace(/<\/?[a-z][a-z0-9]*[^<>]*>/ig, "");

    //SEE: http://www.vikitech.com/980/top-10-web-based-services-for-text-to-speech-conversion

    var speechLineEncoded = escape(speechLine);
    //var speechURL = 'http://translate.google.com/translate_tts?q=' + speechLineEncoded;
        
    var speechURL = 'http://vozme.com/text2voice.php?bookmarklet=1&gn=fm&interface=full&default_language=en&text=' + speechLineEncoded;
        
    $('#_Speech').fadeIn('slow');

    speech.innerHTML = '<iframe src="' + speechURL + '" width="350px" height="120px"></iframe>';
}
    
function disableVozmeSpeech() {
    speechEnabled = false;
    var speech = document.getElementById("_Speech");
    $('#_Speech').fadeOut('slow', function() {
        speech.innerHTML = '';            
    });
}

function toggleVozmeSpeech() {
    if (speechEnabled == true) {
        disableVozmeSpeech();
    }
    else {
        enableVozmeSpeech($('#_Content').text());
    }
}
    
function speakSpeech(f) {
    var content = $('#_Content').text();        
    if (content.length > 1024) {
        alert('Content too big, this may overload the client speech engine.  Try reducing this node into smaller nodes and speaking them in sequence.');
        return;
    }
    $.getScript("/speak/speakClient.js", function(data, textStatus, jqxhr) {            
        speak.play(content, {
            amplitude: 100, 
            wordgap: 5, 
            pitch: 25, 
            speed: 200
        }, f );
    });
}

var stopAutospeech = false;
function startSpeakAutoSpeech() {
    stopAutospeech = false;
    $('#speaker_icon').attr('src', '/icons/sound_playing.png');
        
    if (nextID!=null)
        speakSpeech( function() {
            if (!stopAutospeech) goNext( function() {
                if (!stopAutospeech) startSpeakAutoSpeech();
            });
        } );
    else
        speakSpeech( function() {
            stopSpeakAutoSpeech();
        } );
}
function stopSpeakAutoSpeech() {
    stopAutospeech = true;
    $('#speaker_icon').attr('src', '/icons/simplistica/sound.png');
    $('#audio').html('');
}
    
function goNextExplicit() {
    stopSpeakAutoSpeech();
    goNext();
}
function goPreviousExplicit() {
    stopSpeakAutoSpeech();
    goPrevious();
}

function renderMainContent(node) {
    var content, title;

    if (node != null) {
        content = node.content
        if (content == null)
            content = '';
        if (node.title == null)
            title = '';
        else if (node.title == '')
            title = '';
        else
            title = '<strong>' + node.title + '</strong><br/>';
    }
    else {
        title = '';
        content = "";
    }
        
    var line = title + content;
    return line;
}
function renderNeighborhood(node) {
    var line = '<table id="neighborTable"><tr>';
    if (node.ins.length > 0) {
        line = line + '<td width="30%" style="vertical-align:top">';
        for (var ii in node.ins) {
            var xi = node.ins[ii];
            var id = xi.id;
            var name = xi.name;
                
            if (name == null) name = xi.preview;
            if (name == null) name = xi.id;

            var relationship = '';
            if (xi.via!=null) {
                relationship = xi.via.name;
            }
            var r = '<p class="neighborhooditem neighbor_summary_in"><a href="/node/' + id +'">' + name + '</a> -> ' + relationship + '</p>';
            line = line + r;
        }
        line = line + '</td>';
    }

    var numProperties = 0;
    for (var id in node.prop) {
        if (id == 'content') continue;
        if (id == 'name') continue;
        if (id == 'id') continue;
        numProperties++;
    }
        
    if (numProperties > 0) {
        line = line + '<td width="30%" style="vertical-align:top">';
        for (var id in node.prop) {   
            if (id == 'content') continue;
            if (id == 'name') continue;
            if (id == 'id') continue;
                
            var value = node.prop[id];
            var r = '<p class="neighborhooditem neighbor_summary_prop"><a href="/property/' + id +'">' + id + '</a>: ' + value + '</p>';
            line = line + r;
        }
        line = line + '</td>';
    }
    if (node.outs.length > 0) {
        line = line + '<td width="30%" style="vertical-align:top">';
        for (var ii in node.outs) {
            var xi = node.outs[ii];
            var id = xi.id;
            var name = xi.name;
                
            if (name == null) name = xi.preview;
            if (name == null) name = xi.id;
                
            var relationship = '';
            if (xi.via!=null) {
                relationship = xi.via.name;
            }
            var r = '<p class="neighborhooditem neighbor_summary_out">' + relationship + ' -> <a href="/node/' + id +'">' + name + '</a></p>';
            line = line + r;
        }
        line = line + '</td>';
    }
    line = line + '</tr></table>';
    return line;
        
}
    
function showNode(f) {
        
    disableVozmeSpeech();

    if (f > -1) {
        currentNode = nodes[f];       
        nodeID = currentNode._id;
        
        var content = document.getElementById("_Content");
        content.innerHTML = renderMainContent(currentNode);

    }
    else {
        currentNode = null;
    }
    
    
    setEditable(isEditable());
    


    if (currentNode!=null) {
        for (var ii in currentNode) {
            if (ii == 'next') {
                nextID = currentNode.next;
            }
            else if (ii == 'previous') {
                prevID = currentNode.previous;
            }
        }
            
        if (widgets['Neighborhood']) { 
            $("#Neighborhood").html( renderNeighborhood(currentNode) );
            highlightButton('NeighborhoodButton', true);
            $("#Neighborhood").show();
        }
        else {
            highlightButton('NeighborhoodButton', false);
            $("#Neighborhood").hide();
        }
            
            
        var prev = document.getElementById("_Prev");
        if (f == 0) {
            prev.innerHTML = '&nbsp;';
        }
        else {
            prev.innerHTML = '<a href="javascript:goPreviousExplicit()"><img src="/icons/left.png" height="32px" width="32px"/></a>';
        }

        var next = document.getElementById("_Next");
        if (f == nodes.length-1) {
            next.innerHTML = '&nbsp;';
        }
        else {
            next.innerHTML = '<a href="javascript:goNextExplicit()"><img src="/icons/right.png" height="32px" width="32px"/></a>';
        }

        //            prevID = nextID = null;
        //
        //            for (var ii in currentNode.ins) {
        //                var xi = currentNode.ins[ii];
        //                var id = xi.id;
        //                var relationship = '';
        //                if (xi.via!=null) {
        //                    relationship = xi.via.name;
        //                }
        //                if (relationship == 'next')
        //                    prevID = id;
        //            }
        //            for (var ii in currentNode.outs) {
        //                var xi = currentNode.outs[ii];
        //                var id = xi.id;
        //                var relationship = '';
        //                if (xi.via!=null) {
        //                    relationship = xi.via.name;
        //                }
        //                if (relationship == 'next')
        //                    nextID = id;
        //            }

        var status = document.getElementById("Status");
        if ((prevID!=null) || (nextID!=null))
            status.innerHTML = ((prevID!=null) ? "<--" : "") + " | " + ((nextID!=null) ? "-->" : "");
        else
            status.innerHTML = '';
    }

        
    updateFonts();
        
    $("#_Content").css({
        opacity: 1.0
    });

}

function goPrevious() {

    //TODO update through AJAX to avoid reloading entire page
    if (prevID!=null)
        setNode(prevID, null);

}
    
function goNext() {
    goNext(null);
}

function goNext(f) {
        
    //TODO update through AJAX to avoid reloading entire page
    if (nextID!=null)
        setNode(nextID, f);
    else
        stopAutospeech();
}
    

function highlightButton(i, highlighted) {
    var x = $('#' + i);
    if (highlighted)
        x.addClass('MenuButtonHighlighted');
    else
        x.removeClass('MenuButtonHighlighted');
}

function updateFont(c) {
    if (c == null)
        return;
        
    c.style.fontSize = fontSize + "px"; 
    var e = c.getElementsByTagName("a");
    for (var i = 0; i < e.length; i++) {
        e[i].style.fontSize = c.style.fontSize;
    }        
        
}
    
function updateFonts() {
    updateFont( document.getElementById("_Content") );
    //updateFont( document.getElementById("mainContent") );       
    updateFont( document.getElementById("_GoInput") );  //TODO this is a hack, use JQuery selector for all input-box classes. see go.html
}

function fontLarger() {
    fontSize+=5;
        
    updateFonts();
}

function fontSmaller() {
    fontSize-=5;
    if (fontSize < 1) fontSize = 1;

    updateFonts();
}

function _n(content) {
    //nodes.push(content);
    nodes = [ content ];
}

function onFrameSpin(e) {
    var nDelta = 0;
    if (!e) { // For IE, access the global (window) event object
        e = window.event;
    }
    // cross-bowser handling of eventdata to boil-down delta (+1 or -1)
    if ( e.wheelDelta ) { // IE and Opera
        nDelta= e.wheelDelta;
        if ( window.opera ) {  // Opera has the values reversed
            nDelta= -nDelta;
        }
    }
    else if (e.detail) { // Mozilla FireFox
        nDelta= -e.detail;
    }

    if (nDelta < 0) {
        //HandleMouseSpin( 1, e.clientX, e.clientY );
        goPreviousExplicit();
    }
    if (nDelta > 0) {
        //HandleMouseSpin( -1, e.clientX, e.clientY );
        goNextExplicit();
    }

    if ( e.preventDefault ) {  // Mozilla FireFox
        e.preventDefault();
    }
    e.returnValue = false;  // cancel default action
}
    

//TODO find a way to combine with previous function
function onFontSpin(e) {
    var nDelta = 0;
    if (!e) { // For IE, access the global (window) event object
        e = window.event;
    }
    // cross-bowser handling of eventdata to boil-down delta (+1 or -1)
    if ( e.wheelDelta ) { // IE and Opera
        nDelta= e.wheelDelta;
        if ( window.opera ) {  // Opera has the values reversed
            nDelta= -nDelta;
        }
    }
    else if (e.detail) { // Mozilla FireFox
        nDelta= -e.detail;
    }
    if (nDelta > 0) {
        //HandleMouseSpin( 1, e.clientX, e.clientY );
        fontLarger();
    }
    if (nDelta < 0) {
        //HandleMouseSpin( -1, e.clientX, e.clientY );
        fontSmaller();
    }
    if ( e.preventDefault ) {  // Mozilla FireFox
        e.preventDefault();
    }
    e.returnValue = false;  // cancel default action
}

function setup() {
        
        
}

function enlargeImage(element, imagesrc) {
    element.innerHTML = '<img src=\"' + imagesrc + '\"/>';
}
    

function graphIt() {
    newWindowIFrame('Neighborhood Graph', '/graph/' + currentNode['id']);
}
    
function imageIt() {
    //TODO filter 'q' for useless prepositions like 'the', 'and', etc
    var selection = selectedText;
    if (selection == '') {
        alert('Select some text with which to find images.');
        return;
    }

    //images.search.yahoo.com/search/images?p=test

    var iurl = 'http://images.search.yahoo.com/search/images?p=' + escape(selection);
        
    newWindowIFrame('Image results for: ' + selection, iurl);
        
}

var eid = 0;
function newWindow(theTitle, x) {
    var newID = ("Window" + eid);
    eid++;        
    $('#Window').append( "<div id='" + newID + "'>" + x + "</div>" );

    var w = $("body").find('#' + newID);
        
    //        $('#' + newID).dialog({title: theTitle, width: '60%', height: 450} );
    //        $('#' + newID).fadeIn();
    var d = w.dialog({
        title: theTitle, 
        width: '60%', 
        height: 450
    } );
    w.fadeIn();
    return d;
}
    
function newWindowGet(theTitle, url) {
    $.get(url, { }, function(d) {
        newWindow(theTitle, d); 
    });
}
    
function newWindowIFrame(theTitle, url) {
    newWindow(theTitle, '<iframe src=\"' + url + '\" width="98%" height="98%" style="padding: 0.25em"></iframe>');
}
    

function setTheme(theme) {       
    currentTheme = theme;

    var c = document.getElementById("themeCSS");
    if (c!=null) {
        c.href = '/themes/' + theme + '.css';
        localStorage['theme'] = theme;
    }
}
    

//Setup escape-key events
document.onkeydown = function(e){
    var keycode;
    if (e == null) { // ie
        keycode = event.keyCode;
    } else { // mozilla
        keycode = e.which;
    }
        
    if (!widgets['Edit']) {
            
        if (keycode == 37) {
            //left
            goPreviousExplicit();
        }
        else if (keycode == 38) {
            //up
            fontLarger();
        }
        else if (keycode == 39) {
            //right
            goNextExplicit();
        }
        else if (keycode == 40) {
            //down
            fontSmaller();
        }
    }
};

function onContentMouseOver(e) {
}
function onContentMouseOut(e) {
    e.className='';
}
    
//    function setOriginal(o) {
//        pageurl = o;
//    }
    
        
//    function showHelp() {
//        $( "#dialog-message" ).dialog({
//                width: '75%',
//                modal: true,
//                buttons: {
//                        Ok: function() {
//                                $( this ).dialog( "close" );
//                        }
//                }
//        });        
//    }


function saveContent() {
    if (currentNode == null)
        currentNode = { }
        
    currentNode.content = $('#_Content').html();
        
//    var g = $.gritter.add({
//        title: 'Saving New Node',
//        text: 'Standby...'
//    });

    now.ready(function(){
        now.updateNode(nodeID, commitNode(), function(nid) {
            //$.gritter.remove(g);
            $.gritter.add({
                title: 'Saved',
                text: 'Result: ' + nid
            });
            
            nodeID = nid;
            node._id = nodeID;
            //loadNodes();
                
            setNode(nid);
               
            updateLinks();
        }); 
    });

}
    
function ensureContentSaved(bypassConfirmation) {
    if (wasEdited) {
        if (bypassConfirmation == true) {
            saveContent();
        }
        else {
            if (confirm("Save edits?")) { 
                saveContent();
            }                
        }
    }
    else {
        updateLinks();            
    }            
 
}


function getContent() { return $('#_Content').html(); }
function getContentText() { return $('#_Content').text(); }

function append(h) {
    $('#_Content').append(h);
}
function appendMeta(h) {
    $('#_ContentMeta').append(h);
}
function clearMeta() {
    $('#_ContentMeta').html('');
}


function updateLinks() {
    if (currentNode==null) return;
    
    clearMeta();
    now.ready(function(){
        now.forEachLink(nodeID, function(node, reasons) {
            addLink(node, reasons);            
        }, function() {
        });
    });
}
    
var contentBeforeEdit = null, wasEdited = false;
    
function setEditable(e) {
    widgets['Edit'] = e;
        
    if (!e) {
        if (wasEdited)
            if (contentBeforeEdit != $('#_Content').html())
                ensureContentSaved();
            
        $('#_Content').attr('contentEditable', false);
        $('#_Content').attr('designMode', '');
           
        highlightButton('EditButton', false);

        $("#_ContentBar,#EditBottom,#EditMenuBar").hide();
        wasEdited = false;
    }
    else {
        wasEdited = true;
        contentBeforeEdit = $('#_Content').html();
        
        $('#EditMenu').html('<li>Type' + loadTypeMenu(null, getSchemaRoots()) + '</li>');

        $('ul.sf-menu').superfish( {
            delay:       100,                            // one second delay on mouseout 
            animation:   {
                opacity:'show',
                height:'show'
            },  // fade-in and slide-down animation 
            speed:       'fast'                          // faster animation speed                     
        });


        if (myNicEditor == null) {
            myNicEditor = new nicEditor({
                fullPanel : true
            });
            myNicEditor.setPanel('_ContentBar');
            myNicEditor.addInstance('_Content');
        }

        $('#_Content').attr('contentEditable', true);
            
            
        highlightButton('EditButton', true);

        $("#_ContentBar,#EditBottom,#EditMenuBar").show();
    }
        
}
function toggleEdit() {
    setEditable(!isEditable());                
}
    
function isEditable() {
    return widgets['Edit'];
}
    
function toggleNeighborhood() {
    widgets['Neighborhood'] = !widgets['Neighborhood'];
    showNode(-1);
}
function showMetadata() {
    var x = '';
    for(var key in currentNode) {
        x += key + ': ' + currentNode[key] + '<br/>';
    }
    newWindow('Metadata', x);        
}


function shareIt() {
    $('#atbutton').css('display', 'inline');
    //var c = cframes[currentFrame];
    var c = $('#_Content').text();
        
        
    var tbx = document.getElementById("attb");
    var svcs = {
        facebook: 'Facebook', 
        twitter: 'Twitter', 
        blogger: 'Blogger', 
        reddit: 'Reddit', 
        email: 'Email', 
        print: 'Print', 
        googletranslate: 'Translate', 
        expanded: 'More'
    };

    tbx.innerHTML = '';
    for (var s in svcs) {
        tbx.innerHTML += '<a class="addthis_button_'+s+' addthis_32x32_style">'+svcs[s]+'</a>';
    }
        
    var addthis_share = 
    { 
        templates: {
            twitter: '{{title}} {{url}}'
        }
    };
                
    addthis.toolbox("#attb", addthis_share , {
        url: pageurl, 
        title: c, 
        description: c
    });
    addthis.button("#atlink", addthis_share , {
        url: pageurl, 
        title: c, 
        description: c
    });
        
    $('#attbtext').html( '<b>"' + c + '"</b><br/>' + pageurl + '<hr/>' );
        
    $( "#share-modal" ).dialog({
        width: screen.width * 0.75,
        height: screen.height * 0.75,
        modal: true
    });
        
}

//setup theme
var currentTheme = localStorage['theme'];
if (currentTheme == null) {
    currentTheme = 'default-black';
}

$(document).ready(function(){
    $('#_Speech').fadeToggle();    

    //    jQuery('#_Top ul.sf-menu').superfish( {
    //        delay:       100,                            // one second delay on mouseout 
    //        animation:   {opacity:'show',height:'show'},  // fade-in and slide-down animation 
    //        speed:       'fast'                          // faster animation speed                     
    //    });
    
    var panel = document.getElementById("_Panel");
    var control = document.getElementById("_Control");
    var content = document.getElementById("_Content");
    var frameSpin = document.getElementById("Status");
    var font = document.getElementById("_Font");

    if (frameSpin!=null) {
        if (frameSpin.addEventListener) {
            frameSpin.addEventListener('DOMMouseScroll', onFrameSpin, false);
            frameSpin.addEventListener('mousewheel', onFrameSpin, false); // Chrome
        }
        else {
            frameSpin.onmousewheel = onFrameSpin;
        }
    }
    if (font!=null) {
        if (font.addEventListener) {
            font.addEventListener('DOMMouseScroll', onFontSpin, false);
            font.addEventListener('mousewheel', onFontSpin, false); // Chrome
        }
        else {
            font.onmousewheel= onFontSpin;
        }
    }

    $('#_Content').keyup(function(event) {        
       if (event.keyCode == 13) {
           //enter
           if (event.ctrlKey) {
               //control-enter
               ensureContentSaved(true);
           }
       }
    });

    
    setTheme(currentTheme);

});



function sideBarSelectAll() {
    $('[id^=sbcheckbox]').each(function(){
        this.checked = !this.checked;
    });
}
function applyBulkOperations() {
    var op = $('#bulkOperation').val();
    
    var nodes = [];
    $('[id^=sbcheckbox]').each(function(){
        if (this.checked) {
            var n = this.id.substring(this.id.indexOf('.')+1);
            nodes.push(n);
        }
    });

if (op == 'Synthesize') {
        
}
else if (op == 'Delete') {
    var r=confirm("Delete these " + nodes.length + " nodes?");
    if (r) {
        now.ready(function(){
            now.deleteNodes(nodes, function(err) {
                if (err == null) {
                    var g = $.gritter.add({
                        title: 'Deleted Nodes',
                        text: nodes.length + ' removed.'
                    });
                       
                    listAllNodes();
                }
                else {
                    console.log(err);
                }
            });
        });
            
    }
}
}

<!-- Original:  Ronnie T. Moore Web Site:  The JavaScript Source -->
<!-- This script and many more are available free online at The JavaScript Source!! http://javascript.internet.com -->

var selectedText = "";
function getActiveText(e) { 
    // Sets text MSIE or Netscape active text based on browser, puts text in form
    selectedText = (document.all) ? document.selection.createRange().text : document.getSelection();
    return true;
}

document.onmouseup = getActiveText;
if (!document.all) document.captureEvents(Event.MOUSEUP);


var schema, code;
var types = {};
var nodeID, node = { };

function getSchemaRoots() {
    var roots = { };
    $.each(schema.types, function(k, v) {
        if (v.ancestors.length == 1) {
            if (v.ancestors[0] == 'Thing')
                roots[k] = v;
        }
    });
    return roots;            
}
function getSchemaChildren(parent) {
    var roots = { };
    var count = 0;
    var maxItems = 500;
    $.each(schema.types, function(k, v) {
        for (var i = 0; i < v.ancestors.length; i++) {
            if (v.ancestors[i] == parent) {                        
                roots[k] = v;
                count++;
            }
            if (count > maxItems)
                return roots;
        }
    });
    return roots;                        
}

function loadTypeMenu(parent, children) {
    if (parent!=null)
        if (children.length == 0)
            if (schema.types[parent].properties.length < 1)
                return '';

    var s = '';
        $.each(children, function(k, v) {
            var sc = getSchemaChildren(k);
            var scLen = Object.keys(sc).length;
            //s+= '<li><a href="#">' + k + ' ' + scLen + '</a></li>';

            var tt = '';
            if (scLen > 0) {               
                tt = loadTypeMenu(k, sc);
            }
            s+= '<li><a href="javascript:addType(\'' + k + '\', null, null)">' + v.label + '</a>' + tt + '</li>';
        });

        return '<ul>' + s + '</ul>';

}

function getProperties(type) {
    return schema.types[type].properties;
}

function isCommonProperty(v) {
    return (v == 'url') || (v == 'description') || (v == 'name') || (v == 'image');
}
function isDataPropertyType(v) {
    return (v == 'Integer') || (v == 'URL') || (v=='Text') || (v=='Boolean') || (v=='Geo') || (v=='Float') || (v=='Date') || (v=='DataType') || (v=='Number') || (v=='Thing');
}
function isSupertype(parent, child) {
    if (isDataPropertyType(child)) {
        return false;
    }
    var parents = schema.types[child];
    if (parents==undefined)
        return false;

    parents = parents.supertypes;
    $.each(parents, function(t) {
        if (t == parent)
            return true;
        if (isSupertype(parent, t))
            return true;               
    });
    return false;
}

function loadPropertiesMenu(type, history) {
    var MAXDEPTH = 3;

    if (history == undefined) history = [ type ];
    var level = history.length - 1;
    if (level >= MAXDEPTH) return '';

    var t = '';
    var props = getProperties(type);

    $.each(props, function(k, v) {
        if (isCommonProperty(v)) {
            //do not add
        }
        else if (schema.properties[v].comment.indexOf('legacy spelling')!=-1) {

        }
        else {
            var label = schema.properties[v].label;
            var range = schema.properties[v].ranges[0];

            if (isDataPropertyType(range))  {
                t += '<li><a href="javascript:addProperty(\'' + v + '\', \'' + history + '\')">' + label + '</a></li>';                        
            }
            else if (level < MAXDEPTH-1) {
                if (!isSupertype(type, range)) {
                    if (schema.types[range].properties.length > 0) {
                        history.push(v);
                        t += '<li><a href="#">' + label + '</a>' + loadPropertiesMenu(range, history) + "</li>";
                        history.pop();
                    }
                }
            }
        }
    });
    if (level == 0)
        t += '<li><a href="javascript:removeType(\'' + type + '\')"><i>Remove</i></a></li>';
    return '<ul> ' + t + '</ul>';
}

function isDataType(t) {
    return (t == 'Text') || (t == 'Boolean') || (t == 'URL') || (t == 'Integer') || (t == 'Float') || (t == 'Number') || (t == 'Date') || (t=='Thing');
}

function addProperty(tt) {
    var t = '', s = tt;
    if (tt.indexOf('/')!=-1) {
        t = tt.substring(0, tt.indexOf('/'));
        s = tt.substring(tt.indexOf('/')+1, tt.length);
    }
    var prop = schema.properties[s];

    //TODO handle multiple range types
    var range = prop.ranges[0];

    if (isDataType(range)) {
        var source = $('#NodeSource');

        var newLine = s + ': ';

//        var line = code.getLine(code.lineCount()-1);
//        var prefix;
//        if (line.length > 0)
//            prefix = '\n';
//        else
//            prefix = '';
//
//        var tl = code.lineCount()-1;
//
//        code.setLine(tl, code.getLine(tl) + prefix + newLine);
//        code.refresh();
//        code.focus();

//        source.focus();       
          append('<br/>\n' + newLine);
    }
    else {
        console.log('can not add property: ' + tt);
    }
}

function addType(t, forClass, forProp) {
    if (types[t] == undefined) {
        var v = schema.types[t];
        var p = '';
        if (forProp!=null) {
            p = forProp + '/';
        }
        $('#EditMenu').append('<li>' + p + v.label + '' + loadPropertiesMenu(t) + '</li>');
        $('ul.sf-menu').superfish();
    }
    types[t] = true;
}

//deprected
function updateCode(from, to, text, next) {
    var currentLine = code.getCursor().line;     
    var line = code.getLine(currentLine);
    var status = $('#EditStatus');
    if (currentLine == 0) {
        status.html("Enter a name for this object on the first line.");                
    }
    else if (line.indexOf(':')!=-1) {
        var p = line.substring(0, line.indexOf(':'));
        var prop = schema.properties[p];
        if (prop == undefined) {
            status.html('Property "' + p + '" not defined.  Did you mean...');
        }
        else {
            var name = prop.label;
            var comment = prop.comment;
            var type = prop.ranges[0];
            status.html('<b>' + name + '(' + p + ': ' + type + ')</b><br/>' + comment + '<br>Suggested Values: [not implemented yet]' );
        }
    }
    else {
        status.html('');
    }
    //TODO colorize lines
}


//deprecated
function editNode(id) {            
    nodeID = id;


    if (nodeID!=null) {
        $.getJSON('/node/' + nodeID + '/json', function(data) {
            node = data;
            console.log(node);
            code.setValue( node.content );

            for (var i = 0; i < node.types.length; i++) {
                var t = node.types[i];
                addType(t);
            }
        });
        $.gritter.add({
                title: 'Editing Node: ' + nodeID,
                text: 'Ready.'
        });
    }
    else {
        code.setValue('Name\n');
        $.gritter.add({
                title: 'Editing a New Node',
                text: 'Ready.'
        });
    }

    code.setLineClass(0, 'firstLine', '');
    code.refresh();
    code.focus();

    //$('#NodeSource').html('Name\n');

//            var a = $('#AddTypeMenuItem');
//            $.each(getSchemaRoots(), function(k, v) {
//               a.append('<li>' + k + ':' + schema.types[k] + '<ul>' + loadMenu(k) + '</ul></li>');
//            });
    //$('#AddTypeMenuItem').append(loadMenu(null));

    $('#EditMenu').html('<li><a href="#">[+]</a>' + loadTypeMenu(null, getSchemaRoots()) + '</li>');

    $('ul.sf-menu').superfish( {
            delay:       500,                            // one second delay on mouseout 
            animation:   {opacity:'show',height:'show'},  // fade-in and slide-down animation 
            speed:       'fast'                          // faster animation speed                     
    });

   $('#editArea').show();

}

function setNodeTo(x) {
    window.history.pushState(x._id, '', '/node/' + x._id);
    _n(x);
    showNode(0);
    updateLinks();
}

function setNode(id, f) {
    $.getJSON('/node/' + id + '/json', function(data) {
        setNodeTo(data);
            
        if (f!=null)
            f();
    });        
}


function setNodeById(n) {
    $.getJSON('/node/' + n + '/json', function(data) {
        setNodeTo(data);
    });
        
}

function loadSchema(whenSchemaLoaded) {
    $.getJSON('/schema/schema.org.json', function(data) {
       schema = data; 
       whenSchemaLoaded();
    });            
}

function commitNode() {
    if (nodeID!=undefined)
        node._id = nodeID;
    node.content = getContent();

    var typesList = [];
    $.each(types, function(k, v) {
        typesList.push(k);
    });
    node.types = typesList;

    return node;
}

function deleteNode() {
    var r=confirm("Delete this node?");
    if (r) {
        $.getJSON('/node/' + nodeID + '/remove', function(data) {
            editNode(null);
            loadNodes();
        });
    }
}


//deprecated
function loadNodes(a) {
    var nid = newWindow(a + ' Nodes', '');

    $.getJSON('/agent/' + a + '/nodes', function(data) {
        
        for (var i = 0; i < data.length; i++) {
            var nodeID = data[i];
            $.getJSON('/node/' + nodeID + '/json', function(data) {
                var title = data.content;
                if (title == undefined) title = 'Untitled';
                if (title.indexOf('\n')!=-1)
                    title = title.split('\n')[0];
                $('#' + nid).append('<li><a href="/agent/' + agentID + '/' + data._id + '">' + title + "</a></i>");
            });
        }
    });
}

function setList(l) {
     
    showNode(-1);
    for (var i = 0; i < l.length; i++) {
        var nodeID = l[i];
        $.getJSON('/node/' + nodeID + '/json', function(data) {
            var title = data.node.title;
            if (title == undefined) title = data._id;
            if (title.indexOf('\n')!=-1)
                title = title.split('\n')[0];
            console.log(title + ' ' + data.content);
            append('<li><a href="/agent/' + agentID + '/' + data._id + '">' + title + "</a></i>");
        });
    }
    
}


var sections = 0;
function newSection() {
    var s = $('<div id="section.' + sections + '"></div>');
    $('#sections').append(s);
    sections++;
    return s;
}

function getInputLine(instructions, defaultValue, retryCode) {
    var x = getContentText().trim();
    if (x.length == 0) {
//        var retVal = prompt("RSS Feed", "http://");
//        x = retVal;
        setNodeTo( { content: defaultValue } );
        $('#EditStatus').html( instructions + '<button onClick="' + retryCode + '">Retry</button>');
        setEditable(true);
        $('#_Content').focus();
        return null;
    }    
    return x;
}

function addRSSFeed() {
    var url = getInputLine("Enter RSS Feed URL", "http://", 'addRSSFeed()');
    
    if (url!=null) {
        ensureContentSaved();

        var x = newSection();
        x.append('Reading RSS: ' + url + '...<br/>');
        $.post('/add/rss', { 'url': url }, function(responseText) {
           for (var i = 0; i < responseText.length; i++) {
               var r = responseText[i];
               x.append('<li><a href="/node/' + r + '">' + r + "</a></i>");
           }
        });
    }
}

function addSentencized() {
    var urlOrText = getInputLine("Enter URL or text", "http://", 'addSentencized()');
    if (urlOrText!=null) {
        ensureContentSaved();
        
        var x = newSection();
        x.append('Sentencizing: ' + urlOrText + '...<br/>');
        
        now.ready(function(){
            now.addSentencized( urlOrText , function( items ) {
                for (var i = 0; i < items.length; i++) {
                    var r = items[i];
                    x.append('<li><a href="/node/' + r + '">' + r + "</a></i>");
                }                
            });
        });   
    }
    
}
            
function showNodes() {
    clearMeta();
    now.ready(function(){
       
       now.forEachNode({}, function(f) {
           addLink(f);
            
       });
    });                
}

function addLink(n, reasons) {
    var id = n._id;
    var tx = n.node.title + '';
    if (tx.length == 0)
        tx = id;
//    n.append('<a href="/node/' + node._id + '">' + node.node.title + '</a>');
//    n.append('<ul>');
//        for (var i = 0; i < reasons.length; i++)
//            n.append('<li>' + reasons[i] + '</li>');
//    n.append('</ul>');
//    n.append('<hr/>');

    var t = '<div class="nodeWideIcon"> <input id="sbcheckbox.' + id + '" value="" type="checkbox"> <a href="/node/' + id + '">' + tx + "</a></div>";
    appendMeta(t);
}

function browseWhere() {
    //now.ready(function(){
       $('#_Content').load('/browse.map.html');
       
//       now.forEachNode(function(f) {
//           var id = f._id;
//           var tx = f.node.title + '';
//           if (tx.length == 0)
//               tx = id;
//           
//           var t = '<div class="nodeWideIcon"> <input id="sbcheckbox.' + id + '" value="" type="checkbox"> <a href="javascript:setNodeById(\'' + id + '\')">' + tx + "</a></div>";
//           $('#nodelist').append(t);
//            
//       });
    //});                
}
            
            

$(document).ready(function(){
    $.extend($.gritter.options, { 
            position: 'bottom-right', // defaults to 'top-right' but can be 'bottom-left', 'bottom-right', 'top-left', 'top-right' (added in 1.7.1)
            fade_in_speed: 'medium', // how fast notifications fade in (string or int)
            fade_out_speed: 2000, // how fast the notices fade out
            time: 4000 // hang on the screen for...
    });        
    
    
    
    loadSchema(function() {
        onStart();
    });
    
});


var onStart = function() { }