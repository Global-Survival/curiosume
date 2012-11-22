var clients = { };

function getInterestsAsTypes() {
	var p = [];
	var s = [];
	console.dir(interestStrength);
	for (var k in interests) {
		var i = interests[k];
		var strength = interestStrength[i.id]; 
		if (strength > 0) {
			p.push(i.id);
			s.push(strength);
		}
	}
	return [p, s];
}

function sendMessage(ox) {
	var x = ox;
    
    var name = Self.get("name");
    
    if (typeof(ox) == "string") {
        x = "" + name + ": " + JSON.stringify(x);
        x = {
            	uuid: 'message_' + uuid(),
            	name: x
        };    
    }
    else {
    }
    
    
    var b = getInterestsAsTypes();
	x.type = b[0];
	x.typeStrength = b[1];

	var now = new Date();
	x.when = now.getTime();
    
  	var authorID = ((Self.get('name')) + ' <' + Self.get('clientID') + '>');
	x.author = authorID;

    /*if (ox === undefined) {
	    var d = $("#MessageDescription");
	    if (d) {
	    	var v = d.val();
	    	d.val('');
	    	x.content = v;
	    }
    }*/

    notice(x);
    pub(x);
 }



function addSuggestions(x) {

    //TODO append suggestions as uniquely ID'd div's, which can then be templated

    var s = [
        { name: "Adventure Medical Kits - Ultralight & Watertight", 
          link: 'http://www.amazon.com/3M-Scotch-Strength-1-88-Inch-60-Yard',
          imageURL: "http://ecx.images-amazon.com/images/I/41dcqml1aEL._AA115_.jpg",
          reason: "Hurricane in proximity.  Prevent windows from shattering by using duct tape.",
          price: "$8.77"
        },                            
        { name: "3M Scotch Pro Strength Duct Tape, 1.88-Inch by 60-Yard, 1-Pack", 
          link: 'http://www.amazon.com/Adventure-Medical-Kits-Ultralight-Watertight/dp/B000WXX016',
          imageURL: "http://ecx.images-amazon.com/images/I/41KMGevDemL._AA115_.jpg",
          reason: "You are far from medical support.  In case of emergency, carry a first-aid kit.",
          price: "$8.99"
        }
    ];

    //addNews( templatize("#productSuggestionTemplate", s) );
    
    //setInterval(function() {
        addMessage( '<b>Sender:</b> Message ');        
    //}, 1000);
    
}

function addMessage(h) {
    
	var tc = $('#teamContent');
	if (tc == undefined) {
		//TODO queue?
		return;
		
	}
	
	//if (typeof(h)=="object")
	//	h = JSON.stringify(h, null, 4);

	var d = $('<div style="display: none"/>');
    newObjectView(h).appendTo(d);
    
    tc.append(d);
    
    d.fadeIn();
    
    
    var objDiv = document.getElementById("teamContent");
    if (objDiv!=null)
	    if (objDiv.scrollHeight!=undefined)
	    	objDiv.scrollTop = objDiv.scrollHeight;
    
}


function setClient(cid, s) {
    clients[cid] = s;
    
    /*
    var ds = cid + '-summary';
    var r = $('#' + ds);

    if (r.length == 0) {
        r = $('<div id="' + ds + '" class="RosterSummary"></div>');
        r.appendTo('#teamRoster');
    }*/
    
    /*
    var x = '<a href="javascript:showClient(\'' + cid + '\');">' + s.name + '</a>' ;
    
    x += '<div id="' + ds + 'Full" class="RosterFull">' + s.geolocation + '<br/>';
    for (var i in s.interests) {
        x += i + ':' + s.interests[i] + '<br/>';
    }
    x += '</div>';
    
    r.html(x);
    */
}

function showClient(cid) {
    var ds = cid + '-summaryFull';
    //$('#' + ds).toggle();
    
/*    $('#' + ds).dialog({
			height: 650,
                        width: '70%',
                        zIndex: 5000,
                        title: clients[cid].name,
		});    */
}

function initTeam() {
	
	window.onbeforeunload = function() {
		//sendMessage('(offline)');
	};

	//sendMessage('(online)');
	
}

function initChat(e) {
	/*
	<div id="Team" data-role="page" class="PageWrapper">
        <div id="teamInput">
            <input type='text' id="MessageInput"/>
        </div>
        <div id="teamContent">
        </div>
	    <div id="teamRoster">
	    </div>
	</div>
	*/
	var c = $('<div id="Team"></div>');

	newObjectEdit().appendTo(c);
	
    subscribe('chat', function(message) {
        notice(message);        	
    });

	c.append('<div id="teamContent"/>');
	c.append('<div id="teamRoster"/>');
	
	$('#' + e).html(c);
	
}
