/*!
 * index.js v1.31 - 5-26-2013
 */

"use strict";

var MAX_INITIAL_OBJECTS = 1024;

function clearFocus() {
    later(function() {
        var u = uuid();
        Backbone.history.navigate('/object/' + u);
        self.set('list-semantic', 'Any');
        commitFocus(objNew(u));
    });
}

function focus() {
    return window.self.focus();
}

var renderedFocus;
function updateFocus() {

    var ff = focus();
    if (ff) {
        renderedFocus = renderObject(focus(), true, focus, commitFocus);
        $('#Focus').html(renderedFocus);
    }    
}

function updateLayers() {
        
    var l = self.layer();
    if (!l.include) 
        l.include = { };
    if (!l.exclude)
        l.exclude = { };
    if (!l.kml)
        l.kml = [ ];

    var p = {
        target: $('#Layer'),
        addToTree: function(T) {
            function kmlsubtree(root) {
                var kmlFolder = {
                    label: 'Map Layer',
                    children: []
                };      

                function addKML(label, url) {
                    kmlFolder.children.push({
                        label: ('<span url="' + url + '" class="KMLLayer">' + label + '</span>'),
                    });
                }
                addKML('HAARP', '/kml/haarp.kml');
                addKML('HPM', '/kml/hpm-radars.kml');
                addKML('NUKE', '/kml/nuke-explosions.kml');

                root.push(kmlFolder);
            }
            function externalsubtree(root) {
                var extFolder = {
                    label: 'External Link',
                    children: []
                }; 
                var t = [
                    {
                        label: 'Global Alerts',
                        children: [
                            {
                                label: 'ClimateViewer 3D',
                                url: 'http://climateviewer.com/3D/'
                            },
                            {
                                label: 'RSOE EDIS',
                                url: 'http://hisz.rsoe.hu/alertmap/index2.php'
                            }
                        ]
                    }
                ];
                root.push(extFolder);        
            }

            kmlsubtree(T);
            externalsubtree(T);        
    
        },
        newTagDiv: function(id, content) {
            var ti = getTagIcon(id);
            if (ti)
                content = '<img style="height: 1em" src="' + ti + '"/>' + content;
            return {
                label: ('<span id="' + id + '" class="TagLayer">' + content + '</span>')
            };
        }        
    };
    updateTypeTree(p);
    
    function commitLayer() {
        self.set('layer', l);
        self.trigger('change:layer');
        updateLayers();
    }
    
    if (_.size(l.include) > 0) {
        $('.TagLayer').addClass('TagLayerFaded');
    }
    
    $('.TagLayer').each(function(x) {
        var t = $(this);
        var id = t.attr('id');
        var included = l.include[id]; 
        var excluded = l.exclude[id];
        
        if (included) {
            t.addClass('TagLayerInclude');
        }
        else if (excluded) {
            t.addClass('TagLayerExclude');
        }
        
        t.click(function() {
            if ((!included) && (!excluded)) {
                //make included
                l.include[id] = true;
                delete l.exclude[id];
                commitLayer();
            }
            else if (included) {
                //make excluded
                delete l.include[id];
                l.exclude[id] = true;
                commitLayer();
            }
            else {
                //make neither
                delete l.include[id];
                delete l.exclude[id];
                commitLayer();
            }
        });
    });
    $('.KMLLayer').each(function(x) {
        var t = $(this);        
        var url = t.attr('url');
        
        var included = _.contains(l.kml, url);
        if (included) {
            t.addClass('TagLayerInclude');
        }
        t.click(function() {
            if (included) {
                //uninclude
                l.kml = _.without(l.kml, url);
                commitLayer();
            }
            else {
                //include
                l.kml.push(url);
                commitLayer();
            }
        });
    });
    
//    a.delegate("a", "click", function(e) {
//        /*if ($(e.currentTarget).blur().attr('href').match('^#$')) {
//            $("#layer-tree").jstree("open_node", this);
//            return false;
//        } else {
//            var embedLocation = (this).href;
//            $('#View').html('');
//            $('#View').html('<iframe src="' + embedLocation + '" frameBorder="0" id="embed-frame"></iframe>');
//            $("#View").removeClass("ui-widget-content");
//            var vm = $('#ViewMenu');
//            var shown = vm.is(':visible');
//            showAvatarMenu(!shown);
//            e.preventDefault();
//            return false;
//        }*/
//    });
                   
    
    /*
    //update display of type counts and other type metadata
    function updateTypeCounts() {
        for (var t in stc) {
            $('a:contains("' + t + '")').append(' '+ stc[t]);
        }    
    }
    */

}

function commitFocus(f) {
    window.self.set('focus', f);
    window.self.trigger('change:focus');
    updateFocus();
}

/*function initFocus() {
    var tt = $('#TypeSelectModalTree');

    updateTypeTree(tt, function(s) {

        var e = renderedFocus.getEditedFocus();
        for (var i = 0; i < s.length; i++) {
            var m = s[i];
            if (!objHasTag(e, m))
                e = objAddTag(e, m);
        }
        commitFocus(e);

    });
}*/

function saveObject(p) {
    p.author = self.id();
    objTouch(p);
    self.pub(p, function(err) {
        $.pnotify({
            title: 'Unable to save.',
            text: p.name,
            type: 'Error'            
        });                
    }, function() {
        $.pnotify({
            title: 'Saved (' + p.id.substring(0,6) + ')' ,
            text: p.name
        });        
        self.notice(p);
    });
}

function initDescriptionRichText() {
    $('#FocusDescriptionSection').html('<textarea id="FocusDescription"></textarea>');
    $('#FocusDescription').wysihtml5();
}

var updateView;


function initUI(self) {

    $('body').timeago();
    updateView = _.throttle(_updateView, 650);

    self.on('change:attention', function() {
        later(function() {
            updateView();
        });
    });
    self.on('change:layer', function() {
        later(function() {
            updateView();
        });
    });

    self.on('change:currentView', function() {
        later(function() {
            updateView();
        });
    });

    self.on('change:tags', function() {
        later(function() {
            updateFocus();
            updateLayers();
        });
    });


    $('#ViewMenu input').click(function(x) {
        var b = $(this);
        var v = b.attr('id');
        if ((b.attr('type')==='text') || (b.attr('type')==='checkbox'))
            return;
        $('#ViewControls').buttonset('refresh');
        self.set('currentView', v);
        showAvatarMenu(false);
    });
    
    $('#GeographicToggle').change(function(e) {
        var isGeographic = $('#GeographicToggle').is(':checked');
        updateLayers();
    });


    //TODO move this to focus.semantic.js when dynamically generating the focus UI
    $('#SaveButton').click(function() {
        var p = renderedFocus.getEditedFocus();
        later(function() {
            saveObject(p);
        });
    });
    $('#ClearButton').click(function() {
        clearFocus();
    });

    $('#AddDescriptionButton').click(function() {
        commitFocus(objAddValue(renderedFocus.getEditedFocus(), 'textarea', ''));
    });
    $('#AddLocationButton').click(function() {
        commitFocus(objAddValue(renderedFocus.getEditedFocus(), 'spacepoint', ''));
    });

    $("#AddWhatButton").click(function() {
       alert('Tag selection widget not available yet.'); 
    });
    $("#AddWhenButton").click(function() {
       alert('Timepoint selection widget not available yet.'); 
    });
    $("#AddWhoButton").click(function() {
       alert('Agent selection widget not available yet.'); 
    });

    {

        var bar = $('.FocusUploadBar');
        var percent = $('.FocusUploadPercent');
        var status = $('#FocusUploadStatus');

        $('#FocusUploadForm').ajaxForm({
            beforeSend: function() {
                status.empty();
                var percentVal = '0%';
                bar.width(percentVal)
                percent.html(percentVal);
            },
            uploadProgress: function(event, position, total, percentComplete) {
                var percentVal = percentComplete + '%';
                bar.width(percentVal)
                percent.html(percentVal);
            },
            complete: function(xhr) {
                var url = xhr.responseText;
                status.html($('<a>File uploaded</a>').attr('href', url));
                var ab = $('<button>Add Image To Description</button>');
                var absURL = url.substring(1);
                ab.click(function() {
                    var f = renderedFocus.getEditedFocus();
                    objAddDescription(f, '<a href="' + absURL + '"><img src="' + absURL + '"></img></a>');
                    commitFocus(f);
                });
                status.append('<br/>');
                status.append(ab);
            }
        });
    }


    var msgs = ['I think', 'I feel', 'I wonder', 'I know', 'I want'];
    //var msgs = ['Revolutionary', 'Extraordinary', 'Bodacious', 'Scrumptious', 'Delicious'];
    function updatePrompt() {
        var l = msgs[parseInt(Math.random() * msgs.length)];
        $('.nameInput').attr('placeholder', l + '...');
    }

    {
        setInterval(updatePrompt, 7000);
        updatePrompt();
    }

    updateFocus(); //DEPR?
    
    updateLayers();
    
    later(function() {
        updateView();
    });
}

var lastView = null;
var currentView = null;

function _updateView(force) {
    var s = window.self;

    $('.brand').html(s.myself().name);

    var avatarURL = getAvatarURL(s.myself().email);
    $('#avatar-img').attr('src', avatarURL);
    $('#toggle-img').attr('src', avatarURL);

    s.saveLocal();

    var view = s.get('currentView');
    /*if (lastView==view)
     return;*/

    var o = $('#ViewOptions');
    var v = $('#View');
    if (v.is(':visible')) {    }
    else
        return;

    if (!force) {
        if ((currentView) && (view === lastView)) {
            if (currentView.onChange) {
                currentView.onChange();
                return;
            }
        }
    }

    v.html('');
    o.html('');

    lastView = view;

    v.removeClass('ui-widget-content');
    v.removeClass('view-indented');
    v.removeClass('overthrow');
    v.removeClass('overflow-hidden');
    v.removeClass('nobg');
    
    if (view === 'list') {
        v.addClass('overthrow ui-widget-content view-indented');
        currentView = renderList(s, o, v);
    }
    else if (view === 'map') {
        v.addClass('overflow-hidden');
        v.addClass('nobg');
        currentView = renderMap(s, o, v);
    }
    else if (view === 'trends') {
        v.addClass('overthrow ui-widget-content view-indented');
        currentView = renderTrends(s, o, v);
    }
    else if (view == 'graph') {
        v.addClass('overflow-hidden');
        currentView = renderGraphFocus(s, o, v);
    }
/*    else if (view == 'slides') {
        currentView = renderSlides(s, o, v);
    }*/
    else if (view == 'grid') {
        v.addClass('overthrow ui-widget-content view-indented');
        currentView = renderGrid(s, o, v);
    }
    else if (view == 'self') {
        v.addClass('overthrow ui-widget-content view-indented');
        currentView = renderSelf(s, o, v);
    }
    else if (view == 'options') {
        v.addClass('overthrow ui-widget-content view-indented');
        currentView = renderOptions(s, o, v);
    }
    else {
        v.html('Unknown view: ' + view);
        currentView = null;
    }

}

function showEditedFocus() {
    $.pnotify({
        title: 'Current Focus (JSON)',
        text: (JSON.stringify(renderedFocus.getEditedFocus(), null, 4))
    });
}

function cloneFocus() {
    var y = getEditedFocus();
    var oldURI = y.id;
    y.id = uuid();
    y.author = window.self.id();
    commitFocus(y);
    saveObject(y);

    $.pnotify({
        title: 'Cloning...',
        text: oldURI + ' -> ' + y.id
    });
    return y;
}

function deleteFocus() {
    var f = window.self.focus();

    $.pnotify({
        title: 'Delete coming soon',
        text: f.uri
    });

}

function setTheme(t) {
    if (!t)
        t = '_cybernetic';

    var oldTheme = window.self.get('theme');
    if (oldTheme !== t) {
        window.self.set('theme', t);
        window.self.saveLocal();
    }

    $('.themecss').remove();

    var themeURL;
    var inverse = false;
    if (t[0] == '_') {
        t = t.substring(1);
        themeURL = 'theme/' + t + '.css';
        if (t === 'Dark') inverse = true;
    }
    else {
        themeURL = 'lib/jquery-ui/1.10.3/themes/' + t + '/jquery-ui.min.css';
        if (t === 'ui-darkness') inverse = true;
    }
    
    $('head').append('<link class="themecss" href="' + themeURL + '" type="text/css" rel="stylesheet"/>');
    if (inverse) {
        $('head').append('<link class="themecss" href="/theme/black-background.css" type="text/css" rel="stylesheet"/>');
    }
    
}

function confirmClear() {
    if (confirm('Clear local memory?'))
        window.self.clear();
}

function showAvatarMenu(b) {
    var vm = $('#ViewMenu');
    if (!b) {
        $('#close-menu').hide();
        $('#AvatarButton').hide();
        vm.fadeOut();
        $('#toggle-menu').show();
    }
    else {
        $('#toggle-menu').hide();
        vm.fadeIn();
        $('#close-menu').show();
        $('#AvatarButton').show();
        vm.show();        
    }
}

function popupAboutDialog() {
    $.get('/about.html', function(d) {
        var p = newPopup('About'); 
        p.html(d);
    });
}

$(document).ready(function() {
	
    if (!isAuthenticated()) {        
        return;
    }
    
    $('#LoadingSplash').hide();
    //$('#LoadingSplash2').show();
    
    
    netention(function(self) {

        window.self = self;
        
        setTheme(self.get('theme'));

        self.clear();

        $.getJSON('/schema/json', function(schema) {
            self.addProperties(schema['properties']);
            self.addTags(schema['tags']);


            self.getLatestObjects(MAX_INITIAL_OBJECTS, function() {

                self.listenAll(true);

                //SETUP ROUTER
                var Workspace = Backbone.Router.extend({
                    routes: {
                        "new": "new",
                        "me": "me", // #help
                        "help": "help", // #help
                        "query/:query": "query", // #search/kiwis
                        "object/:id": "object",
                        "object/:id/focus": "focus",
                        "tag/:tag": "tag",
                        //"new/with/tags/:t":     "newWithTags",
                        "example": "completeExample"
                                //"search/:query/:page":  "query"   // #search/kiwis/p7
                    },
                    'new': function() {
                        clearFocus();
                    },
                    /*
                     newWithTags : function(ts) {                              
                     //'/new/with/tags/' + ts
                     ts = ts.split(',');
                     var tss = [];
                     for (var i = 0; i < ts.length; i++)
                     tss.push(1.0);
                     
                     commitFocus({
                     id: uuid(),
                     tag: ts,
                     tagStrength: tss
                     });
                     },*/

                    me: function() {
                        commitFocus(self.myself());
                    },
                    completeExample: function() {
                        commitFocus(exampleObject);
                    },
                    /*
                     help: function() {
                     commitFocus({
                     uri: uuid(),
                     tag: [ 'help '], tagStrength: [ 1.0 ]
                     });
                     },*/

                    tag: function(tag) {
                        self.set('list-semantic', 'Relevant');
                        commitFocus(objAddTag(objNew(), tag));
                    },
                    query: function(query) {
                        commitFocus({
                            id: uuid(),
                            name: query
                        });
                    },
                    object: function(id) {
                        var x = self.getObject(id);
                        if (x) {
                            newPopupObjectView(x);
                        }
                        else {
                            /*$.pnotify({
                                title: 'Unknown object',
                                text: id.substring(0, 4) + '...'
                            });*/
                        }
                    },
                    focus: function(id) {
                        self.set('list-semantic', 'Relevant');
                        commitFocus(self.getObject(id));
                        updateView();

                    }

                });





                var w = new Workspace();
                Backbone.history.start();


                if (!self.get('currentView')) {
                    self.set('currentView', 'grid');
                }
                else {
                    //updateView();
                }

                //select the current view in the ViewControls
                $('#ViewControls #' + self.get('currentView')).attr('checked', true);
                $('#ViewControls').buttonset('refresh');


                //updateFocus();
                if (!self.focus())
                    clearFocus();
                else
                    updateFocus();
                
                initUI(self);
                
                $('#View').show();
                $('#LoadingSplash2').hide();                
                /*if (isAuthenticated()) {
                      $.pnotify({
                        title: 'Authorized',
                        text: self.myself().name
                     });
                }*/
                
            });
        });


    });


    $('#FocusTabs').tabs();
    $('#toggle-menu').click(function() {
        var vm = $('#ViewMenu');
        var shown = vm.is(':visible');
        showAvatarMenu(!shown);
    });
    $('#close-menu').click(function() {
        var vm = $('#ViewMenu');
        var shown = vm.is(':visible');
        showAvatarMenu(!shown);
    });
    $('#AvatarButton').click(function() {
        showAvatarMenu(false);
    });

    $('#logout').hover(
		function() { $(this).addClass('ui-state-hover');$(this).addClass('shadow'); },
		function() { $(this).removeClass('ui-state-hover');$(this).removeClass('shadow'); }
	);

    if (isAuthenticated()) {
        $('.logout').show();
        $('.login').hide();
    }
    else {
        $('.logout').hide();
        $('.login').show();        
    }

    $('#close-menu').button();
    $('#FocusEdit button').button();
    $("#ViewControls").buttonset();
    


    /*
     * 
     $("#expand-layer-tree").click(function() {
        $("#layer-tree").jstree("open_all");
    });

    $("#close-layer-tree").click(function() {
        $("#layer-tree").jstree("close_all");
    });
     */

    //KML
    {        
        delete self.layer().kml;
        
        $("#KMLLayers input").change(function() {
           var t = $(this);
           var url = t.attr('url');
           var checked = t.is(':checked');
           
           var l = self.layer();
           
           if (!l.kml) l.kml = [];
           
           if (checked) {
               l.kml.push(url);
               l.kml = _.unique( l.kml );
           }
           else {
               l.kml = _.without( l.kml, url);
           }                      
           
           self.set('layer', l);
           self.trigger('change:layer');
        });
    }

    /* IFRAME EMBED */

    //$("#url-tree").jstree({"plugins": ["html_data", "ui", "themeroller"]});

    /*
    $("#url-tree").delegate("a", "click", function(e) {
        if ($(e.currentTarget).blur().attr('href').match('^#$')) {
            $("#url-tree").jstree("open_node", this);
            return false;
        } else {

            var embedLocation = (this).href;
            $('#View').html('');
            $('#View').html('<iframe src="' + embedLocation + '" frameBorder="0" id="embed-frame"></iframe>');
            $("#View").removeClass("ui-widget-content");
            $('#View').addClass('view-indented');
            
            $('#close-iframe').show();
            
            var vm = $('#ViewMenu');

            var shown = vm.is(':visible');
            showAvatarMenu(!shown);
            e.preventDefault();
            return false;
        }
    });
     */

    $('#close-iframe').click(function() {
        updateView(true);
        $('#close-iframe').hide();
    });

    /*
    $("#expand-url-tree").click(function() {
        $("#url-tree").jstree("open_all");
    });

    $("#close-url-tree").click(function() {
        $("#url-tree").jstree("close_all");
    });
    */


/*
    $('.ext-link').click(function(e) {
        var linkLocation = (this).value;
        $('#View').html('');
        $('#View').html('<iframe src="' + linkLocation + '" frameBorder="0" id="embed-frame"></iframe>');
        var vm = $('#ViewMenu');
        var shown = vm.is(':visible');
        showAvatarMenu(!shown);
        
        
    });
*/

    showAvatarMenu(true);
    

});

$(document).ready(function() {
	
	$('#about-toggle').click(function() {
		$('#about-netention').fadeIn();
	});
	$('#openid-toggle').click(function() {
		$('#openid-login').fadeIn();
	});

});
