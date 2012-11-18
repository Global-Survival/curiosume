/**
 * @author seh
 */
var types = { };

function addType(t) {
	types[t.uri] = t;
}

function updateTypes() {
	//console.log('updating types');
}

function newObjectEdit(x) {
	var d = $('<div>');
	
	var expandedDesc = false;
	var expandedMap = false;
	
	var mi = $('<input type="text" class="MessageSubject"/>')
    mi.keyup(function(event) {
    	if (!expandedDesc) {
            if (event.keyCode==13) {
          	  sendMessage();
            }
      	}
    });

	var ed = $('<div>');
	var emid = uuid();
	var em = $('<div id="' + emid + '" style="width: 100%; height: 200px">');
	
	var ex = $('<div>');
	
	var b = $('<button>+ Description</buton>');
	b.click(function() {
		expandedDesc = true;
		ex.show();
		ed.show();
		b.hide();
	});
	var c = $('<button>+ Map</buton>');
	c.click(function() {
		expandedMap = true;
		
		ex.show();
		em.show();
		c.hide();
		initMiniMap(emid);
	});
	
	
	function saveForm() {
		//TODO save form to 'x'
	}
	
	var md = $('<textarea class="MessageDescription" rows="5" /><br/>');
	md.appendTo(ed);
	$('<button>Attach</button>').appendTo(ex);
	$('<button>+</button>').appendTo(ex);
	var sendButton = $('<button><b>Save</b></button>');
	sendButton.click(function() {
		saveForm();
		sendMessage(x);
	});
	sendButton.appendTo(ex);
	sendButton.wrap('<div style="float:right">');
	
	
	ed.hide();
	em.hide();
	ex.hide();
	
	mi.appendTo(d);
	$('<br/>').appendTo(d);

	b.appendTo(d);
	c.appendTo(d);
	
	ed.appendTo(d);
	em.appendTo(d);
	ex.appendTo(d);
	
	if (x) {
		if (x.name)
			mi.val(x.name);
		
		var desc = '';
		
		if (x.text) {
			desc = desc + x.text + "\n\n";
		}
		
		
		if (x.values) {
			for (p in x.values) {
				var pr = x.values[p];
				for (v in pr) {
					var t = v + ': ' + pr[v]; 
					desc = desc + t + "\n";
				}
			}
		}
		
		if (d.length > 0) {
			md.val(desc);
			b.click();			
		}
			
	}
	
	return d;
}
