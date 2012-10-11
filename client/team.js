function say(x) {
    if (x === undefined)
      now.distribute($("#text-input").val());
    else
      now.distribute(x);
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
    
    var d = $('<div class="teamMessage" style="display: none">' + h + '</div>');
    
    $('#teamContent').append(d);
    
    d.fadeIn();
    
}