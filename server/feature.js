var util = require('../client/util.js');

function objAnalysis(x) {
    var t = util.objName(x) + '\n' + util.objDescription(x);
    var a = { };
    if (t.indexOf(':)')!=-1) {
        a['happy'] = 1.0;
    }
    if (t.indexOf(':(')!=-1) {
        a['sad'] = 1.0;
    }
    if (t!='') {
        a['written'] = 1.0;
    }
    if ((t.indexOf('fuck')!=-1) || (t.indexOf('shit')!=-1)) {
        a['cursing'] = 1.0;
    }
    
        /*            
            'Writing': [ 0, 0.25, 0.5, 0.5, 0.75, 1.0 ],
            'Happy': [  0, 0.25, 0, 0, 0  ],
            'Sad': [  0, 0, 0, 0, 0, 1  ],
            'Buying': [ 0, 0, 0.25, 0.25, 0 ],
            'Questioning': [0,0,0,0,0],
            'Cursing': [0,0,0,0,0],
            'Linking': [0,0,0,0,0],
            'Retweeting': [0,0,0,0,0],
            'Mentioning': [0,0,0,0,0],
            'Moving': [0,0,0,0,0], //geolocation changes
            'Laughing': [ 1.0, 0, 0, 0, 0.25 ]                    
        },*/
    
    return a;
}
exports.objAnalysis = objAnalysis;