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

    renderedFocus = renderObject(focus(), true, focus, commitFocus);
    $('#Focus').html(renderedFocus);

}

function commitFocus(f) {
    window.self.set('focus', f);
    window.self.trigger('change:focus');
    updateFocus();
}

function updateTagTree() {
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
}

function saveObject(p) {
    p.author = self.id();
    objTouch(p);
    self.notice(p);
    self.pub(p);
    $.pnotify({
        title: 'Saved',
        text: p.uri
    });
}

function initDescriptionRichText() {
    $('#FocusDescriptionSection').html('<textarea id="FocusDescription"></textarea>');
    $('#FocusDescription').wysihtml5();
}

var updateView;

function expandEditor(b) {
    if (!b) {
        //hide it
        $('#FocusEdit').hide();
        $('#FocusMainMenu').hide();
    }
    else {
        //show it
        $('#FocusEdit').show();
        $('#FocusMainMenu').show();
    }
}
;

function setMainMenuVisible(b) {
    if (!b) {
        //hide it
        $('#MainMenuDrop').hide();
    }
    else {
        //show it
        $('#MainMenuDrop').show();
    }
}
;

function initUI(self) {

    $('body').timeago();
    expandEditor(false);
    updateView = _.throttle(_updateView, 150);

    self.on('change:attention', function() {
        later(function() {
            updateView();
        });
    });

    $('#ToggleMainMenuDrop').click(function() {
        var mainMenuVisible = $('#MainMenuDrop').is(':visible');
        setMainMenuVisible(!mainMenuVisible);
    });
    setMainMenuVisible(false);

    self.on('change:currentView', function() {
        later(function() {
            updateView();
        });
    });

    self.on('change:tags', function() {

        later(function() {
            updateTagTree();
        });
    });

    $('#FocusToggleButton').click(function() {
        var focusShown = $('#FocusEdit').is(':visible');
        expandEditor(!focusShown);
        updateView();
    });

    $('.viz a').click(function(x) {
        var b = $(this);
        var v = b.attr('id');
        self.set('currentView', v);
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


    var msgs = ['Revolutionary', 'Extraordinary', 'Bodacious', 'Scrumptious', 'Delicious'];
    function updatePrompt() {
        var l = msgs[parseInt(Math.random() * msgs.length)];
        $('.nameInput').attr('placeholder', l + '...');
    }

    {
        setInterval(updatePrompt, 7000);
        updatePrompt();
    }

    updateTagTree();
}

var lastView = null;

function _updateView() {
    var s = window.self;

    $('.brand').html(s.myself().name);

    s.saveLocal();

    var view = s.get('currentView');
    /*if (lastView==view)
     return;*/

    lastView = view;


    var o = $('#ViewOptions');
    var v = $('#View');

    v.html('');
    o.html('');

    if (view === 'list') {
        renderList(s, o, v);
    }
    else if (view === 'map') {
        renderMap(s, o, v);
    }
    else if (view === 'trends') {
        renderTrends(s, o, v);
    }
    else if (view == 'graph') {
        renderGraphFocus(s, o, v);
    }
    else if (view == 'slides') {
        renderSlides(s, o, v);
    }
    else if (view == 'grid') {
        renderGrid(s, o, v);
    }
    else if (view == 'self') {
        renderSelf(s, o, v);
    }
    else {
        v.html('Unknown view: ' + view);
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
        t = 'bright';

    var oldTheme = window.self.get('theme');
    if (oldTheme !== t) {
        window.self.set('theme', t);
        window.self.saveLocal();
    }

    $('#themecss').remove();
    $('head').append('<link id="themecss" href="lib/jquery-ui/1.10.3/themes/' + t + '/jquery-ui.min.css" type="text/css" rel="stylesheet"/>');
}

function confirmClear() {
    if (confirm('Clear local memory?'))
        window.self.clear();
}


$(document).ready(function() {

    netention(function(self) {

        window.self = self;

        self.clear();
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
                        $.pnotify({
                            title: 'Unknown object',
                            text: id
                        });
                    }
                },
                focus: function(id) {
                    self.set('list-semantic', 'Relevant');
                    commitFocus(self.getObject(id));
                    updateView();

                }

            });


            setTheme(self.get('theme'));


            initUI(self);

            var w = new Workspace();
            Backbone.history.start();


            $('#LoadingSplash').fadeOut();
            $('#ContentArea').fadeIn();

            if (!self.get('currentView'))
                self.set('currentView', 'grid');
            else {
                updateView();
            }


            //updateFocus();
            if (!self.focus())
                clearFocus();
            else
                updateFocus();
        });


    });

});


$(document).ready(function() {
    
    $('ul#display-menu li a').hover(
            function() {
                $(this).addClass('ui-state-hover');
            },
            function() {
                $(this).removeClass('ui-state-hover');
            }
    );
    $('#ToggleMainMenuDrop').hover(
            function() {
                $(this).addClass('ui-state-hover');
            },
            function() {
                $(this).removeClass('ui-state-hover');
            }
    );
    $('#FocusToggleButton').hover(
            function() {
                $(this).addClass('ui-state-hover');
            },
            function() {
                $(this).removeClass('ui-state-hover');
            }
    );

});

