function updateTypeTree(a, onSelectionChange) {
    var self = window.self;
    
    a.html('');    
    var dt = $('<div></div>');
    dt.addClass('TagTree');
    
    var tree = $('<ul></ul>').css('display','none');
    var stc = self.getTagCount();
                    
    function subtree(root, i) {
        var name = i.name;// + ' (' + i.uri + ')';
        var xi = i.uri;
        var label = name;
        if (stc[xi])
            if (stc[xi] > 0)
                label += ' (' + stc[xi] + ')';
                
        var n = $('<li id="' + xi + '">' + label + '</li>');
        
        root.append(n);
        
        var children = self.subtags(i.uri);
        
        if (children.length > 0) {
            n.addClass('folder');
            var nu = $('<ul></ul>');            
            n.append(nu);
            _.each(children, function(c) {
                subtree(nu, self.tag(c));
            });                            
        }
    }
    
    var roots = self.tagRoots();
    _.each(roots, function(t) {
       subtree(tree, self.tag(t));
    });
    
                   
    tree.appendTo(dt);
    dt.appendTo(a);
    
    

    /*
    //update display of type counts and other type metadata
    function updateTypeCounts() {
        for (var t in stc) {
            $('a:contains("' + t + '")').append(' '+ stc[t]);
        }    
    }
    */
    
    //http://wwwendt.de/tech/dynatree/doc/dynatree-doc.html
    dt.dynatree({
        checkbox: true,
        selectMode: 2, // 1:single, 2:multi, 3:multi-hier
        onActivate: function(node) {
            //alert("You activated " + node);
        },
        onSelect: function(flag, node) {
            /*if( ! flag )
                alert("You deselected node with title " + node.data.title);*/
            var selectedNodes = node.tree.getSelectedNodes();
            var selectedKeys = $.map(selectedNodes, function(node){
                return node.data.key;
            });
                        
            if (onSelectionChange)
                onSelectionChange(selectedKeys);            
            
            dt.currentSelection = selectedKeys;
        }
        /*
        onRender: function(dtnode, nodeSpan)
        onExpand : function() {
            updateTypeCounts();  
        }*/
    });
    
    return dt;
    
}

var TagFocus = {
    
    start: function(self, target) {
        var tf = $('#TagFocus');
        tf.show();    
        tf.html('');
        
        var d = $('<div></div>');
        tf.append(d);
        
        var c = $('<button><i class="icon-ok"></i></button>');
        c.attr('title', 'New object from selected tags');
        
        tf.append(c);
                
        var t = self.getTagCount();
        var tt;
        
        var s = function(selectedKeys) {
            function getTagViewFocus(t) {
                var s = [];
                for (var k = 0; k< t.length; k++)
                    s.push(1.0);
                
                var f = self.focus();
                f.tag = t;
                f.tagStrength = s;
                
                return f;
            }
            
            commitFocus(getTagViewFocus(selectedKeys));
        }

        self.on('change:tags', function() {
           tt = updateTypeTree(d, s); 
        });
        tt = updateTypeTree(d, s);
        
        c.click(function() {
            if (tt.currentSelection) {
                var ts = tt.currentSelection;
                Backbone.history.navigate('/new/with/tags/' + ts, {trigger: true});
            }
            else {
                //notify that there's none selected?
            }
        });

    },
    
    stop: function(target) {
        $('#TagFocus').hide();
    },
        
    set: function(x) {
            
    },
    
    clear: function() {
    
    },
    
    get : function() {
        return { };        
    }
    
};