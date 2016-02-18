//risk.js 

var Risk = {

    /**
     * Settings Object, holding application wide settings
     */
    Settings :{
        globalScale: 1,
        colors: {yellow: '#ff0', green: '#0f0', blue: '#00f', red: '#f00', purple: '#f0f', cyan: '#00ffe4'},
    },

    /**
     * Our main Territories object
     * It looks like:
     * Territories: {
     *     Alaska: {path: Kinetic.Path Object, color: String, name: 'Alaska', ...},
     *     ... 
     *  }
     */
    Territories: {},

    /**
     * Some other variables
     */
    stage: null,
    mapLayer: null,
    topLayer: null,
    backgroundLayer: null,

    /**
     * Functions that we will use
     */
    init: function() { },

    setUpTerritoriesObj: function() { },

    drawBackgroundImg: function() { },

    drawTerritories: function() { },

    divideTerritories: function() { }
}