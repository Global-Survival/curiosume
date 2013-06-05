/* Netention Client Configuration */

var configuration = {
    initialView: 'self',
    initialDisplayAvatarMenu: false,
    enableAnonymous: true,
    defaultAvatarIcon: '/icon/netention-160.jpg',
    includeCanNeedNot: true,
    wikiStartPage: 'Portal:Contents',
    showPlanOnSelfPage: false
};


/* http://www.perbang.dk/rgbgradient/ 6 steps between: AFE500 and FF3B2E:   AFE500 E9EA08 EFBB11 F48E1A F96324 FF3B2E */
var tagColorPresets = {
    'BeginnerStudent': '#AFE500',
    'IntermediateStudent': '#E9EA08',
    'CollaboratingStudent': '#EFBB11',
    'CollaboratingTeacher': '#F48E1A',
    'IntermediateTeacher': '#F96324',
    'ExpertTeacher': '#FF3B2E',
    'Can': 'fuchsia',
    'Need': '#bbf',
    'Not': 'gray'
};

var tagAlias = {
    'BeginnerStudent': '-3σ',
    'IntermediateStudent': '-2σ',
    'CollaboratingStudent': '-1σ',
    'CollaboratingTeacher': '+1σ',
    'IntermediateTeacher': '+2σ',
    'ExpertTeacher': '+3σ'
};

//var tagAlias = {
//    'BeginnerStudent': 'α',
//    'IntermediateStudent': 'β',
//    'CollaboratingStudent': 'γ',
//    'CollaboratingTeacher': 'δ',
//    'IntermediateTeacher': 'ε',
//    'ExpertTeacher': 'ζ'
//};