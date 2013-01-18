function updateTypeTree(a) {
    var self = window.self;
    
    a.html('');    
    var dt = $('<div></div>');
    var tree = $('<ul></ul>').css('display','none');
                    
    function subtree(root, i) {
        var name = i.name;// + ' (' + i.uri + ')';
        var xi = i.uri;
        var n = $('<li id="' + xi + '"><!--<input type="checkbox"/>-->' + name + '</li>');
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
    
    function getTagViewFocus(t) {
        var s = [];
        for (var k = 0; k< t.length; k++)
            s.push(1.0);
        
        return {
            uri: uuid(),            
            tag: t,
            tagStrength: s
        };
    }
    
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
            self.set('focus', getTagViewFocus(selectedKeys));
            //alert("Selected keys: " + selectedKeys.join(", "));
            
            dt.currentSelection = selectedKeys;
        }
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
        
        self.on('change:tags', function() {
           tt = updateTypeTree(d); 
        });
        tt = updateTypeTree(d);
        
        c.click(function() {
            if (tt.currentSelection) {
                var ts = tt.currentSelection;
                Backbone.history.navigate('/new/with/tags/' + ts, {trigger: true});
            }
            else {
                //notify that there's none selected?
            }
        });

        /*
        for (var k in t) {
           var v = t[k];
           var tt = self.getTag(k);
           
           if (!tt)
                continue;
                
           var name = tt.name;
           
           var ttf = $('<div></div>');
           var percent = 100.0 * (1.0 + Math.log(v) * 0.05);
           ttf.css('font-size', percent + '%');
           
           var ak = $('<a href="/#/tag/' + k + '">' + name + '</a>');
           
           ttf.append(ak);
           ttf.append('(' + v + ')');
           
           tf.append(ttf);
           
           
        }
        */
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