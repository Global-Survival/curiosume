var clients = { };

function sendMessage(x) {
    if (x === undefined) {
        x = $("#MessageInput").val();
        $("#MessageInput").val('');
        
    }
    
    x = "<b>" + Self.get("name") + "</b>: " + x;
    
    socket.emit('distribute', x);
    addMessage(x);
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
	
    var d = $('<div class="teamMessage" style="display: none">' + h + '</div>');
    
    
    tc.append(d);
    
    d.fadeIn();
    
    
    var objDiv = document.getElementById("teamContent");
    if (objDiv!=null)
	    if (objDiv.scrollHeight!=undefined)
	    	objDiv.scrollTop = objDiv.scrollHeight;
    
}

function receiveMessage(m) {
    addMessage(m);
}

function setClient(cid, s) {
    clients[cid] = s;
    
    var ds = cid + '-summary';
    var r = $('#' + ds);

    if (r.length == 0) {
        r = $('<div id="' + ds + '" class="RosterSummary"></div>');
        r.appendTo('#teamRoster');
    }
    
    var x = '<a href="javascript:showClient(\'' + cid + '\');">' + s.name + '</a>' ;
    
    x += '<div id="' + ds + 'Full" class="RosterFull">' + s.geolocation + '<br/>';
    for (var i in s.interests) {
        x += i + ':' + s.interests[i] + '<br/>';
    }
    x += '</div>';
    
    r.html(x);
    
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
		sendMessage('(offline)');
	};
	
	sendMessage('(online)');
	
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

	var mi = $('<input type="text" id="MessageInput"/>')
    mi.keyup(function(event) {
          if (event.keyCode==13) {
        	  sendMessage();
          }
    });
	mi.appendTo(c);
	
	

	c.append('<div id="teamContent"/>');
	c.append('<div id="teamRoster"/>');
	
	$('#' + e).html(c);
	
 
	
}
