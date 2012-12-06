
/*
function isInterestSelected(k) {
	return selectedInterests.indexOf(k)!=-1;
}*/

function getInterestsAsTypes(removeSelected) {
	var p = [];
	var s = [];
	for (var k = 0; k < interests.length; k++) {
		var i = interests[k];
		var strength = interestStrength[i];
		/*
		if (removeSelected)
			if (selectedInterests.length > 0) {
				if (!isInterestSelected(i.id))
					continue;
			}
		*/
		if (!strength)
			strength = 1.0;
		
		if (strength > 0) {
			p.push(i);
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
    
    
    var b = getInterestsAsTypes(true);
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
	if (x._id)
		delete x._id;

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

