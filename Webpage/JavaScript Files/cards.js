// This file contains all the information dealing with all cards for all territories

var EASY_CARDS = [12];
var MEDIUM_CARDS = [21];
var HARD_CARDS = [42];
var KHORVAIRE_CARDS = [16];
var USA_CARDS = [48];
var EASTEROS_CARDS = [66];

// function to create a card
function Card(id, map, region, stars, filepath) {
  this.id = id;
  this.map = map;
  this.region = region;
  this.stars = stars;
  this.filepath = filepath;
}

function initializeDeck(deck) {
  deck = createDeck(deck);
  deck = shuffleDeck(deck);
  return deck;
}

// create EASTEROS map cards:
EASTEROS_CARDS[0] = new Card("Ashford", "Easteros", "TheReach", 2, "images/Cards/Easteros/Ashford.png");
EASTEROS_CARDS[1] = new Card("BearIsland", "Easteros", "TheNorth", 1, "images/Cards/Easteros/BearIsland.png");
EASTEROS_CARDS[2] = new Card("Blackhaven", "Easteros", "TheReach", 1, "images/Cards/Easteros/Blackhaven.png");
EASTEROS_CARDS[3] = new Card("BrightwaterKeep", "Easteros", "TheReach", 1, "images/Cards/Easteros/BrightwaterKeep.png");
EASTEROS_CARDS[4] = new Card("CapeKraken", "Easteros", "TheNorth", 1, "images/Cards/Easteros/CapeKraken.png");
EASTEROS_CARDS[5] = new Card("CapeWrath", "Easteros", "Stormlands", 1, "images/Cards/Easteros/CapeWrath.png");
EASTEROS_CARDS[6] = new Card("CasterlyRock", "Easteros", "Westerlands", 2, "images/Cards/Easteros/CasterlyRock.png");
EASTEROS_CARDS[7] = new Card("Cornfield", "Easteros", "Westerlands", 1, "images/Cards/Easteros/Cornfield.png");
EASTEROS_CARDS[8] = new Card("CrackclawPoint", "Easteros", "Crownlands", 1, "images/Cards/Easteros/CrackclawPoint.png");
EASTEROS_CARDS[9] = new Card("Dragonstone", "Easteros", "Crownlands", 1, "images/Cards/Easteros/Dragonstone.png");
EASTEROS_CARDS[10] = new Card("Duskendale", "Easteros", "Crownlands", 1, "images/Cards/Easteros/Duskendale.png");
EASTEROS_CARDS[11] = new Card("GoldenGrove", "Easteros", "TheReach", 1, "images/Cards/Easteros/GoldenGrove.png");
EASTEROS_CARDS[12] = new Card("GoldenTooth", "Easteros", "Westerlands", 1, "images/Cards/Easteros/GoldenTooth.png");
EASTEROS_CARDS[13] = new Card("GrassyVale", "Easteros", "TheReach", 1, "images/Cards/Easteros/GrassyVale.png");
EASTEROS_CARDS[14] = new Card("Gulltown", "Easteros", "TheVale", 1, "images/Cards/Easteros/Gulltown.png");
EASTEROS_CARDS[15] = new Card("Harrenhall", "Easteros", "Riverlands", 2, "images/Cards/Easteros/Harrenhall.png");
EASTEROS_CARDS[16] = new Card("HaystackHall", "Easteros", "Stormlands", 1, "images/Cards/Easteros/HaystackHall.png");
EASTEROS_CARDS[17] = new Card("Highgarden", "Easteros", "TheReach", 2, "images/Cards/Easteros/Highgarden.png");
EASTEROS_CARDS[18] = new Card("IronIslands", "Easteros", "IronIslands", 2, "images/Cards/Easteros/IronIslands.png");
EASTEROS_CARDS[19] = new Card("KingsLanding", "Easteros", "Crownlands", 2, "images/Cards/Easteros/KingsLanding.png");
EASTEROS_CARDS[20] = new Card("Kingswood", "Easteros", "Crownlands", 2, "images/Cards/Easteros/Kingswood.png");
EASTEROS_CARDS[21] = new Card("Lannisport", "Easteros", "Westerlands", 1, "images/Cards/Easteros/Lannisport.png");
EASTEROS_CARDS[22] = new Card("LonelyHills", "Easteros", "TheNorth", 1, "images/Cards/Easteros/LonelyHills.png");
EASTEROS_CARDS[23] = new Card("LongLake", "Easteros", "LongLake", 2, "images/Cards/Easteros/LongLake.png");
EASTEROS_CARDS[24] = new Card("OldOak", "Easteros", "TheReach", 2, "images/Cards/Easteros/OldOak.png");
EASTEROS_CARDS[25] = new Card("Oldtown", "Easteros", "TheReach", 1, "images/Cards/Easteros/Oldtown.png");
EASTEROS_CARDS[26] = new Card("PrincesPass", "Easteros", "Borne", 2, "images/Cards/Easteros/PrincesPass.png");
EASTEROS_CARDS[27] = new Card("Riverrun", "Easteros", "Riverlands", 2, "images/Cards/Easteros/Riverrun.png");
EASTEROS_CARDS[28] = new Card("Saltpans", "Easteros", "TheVale", 1, "images/Cards/Easteros/Saltpans.png");
EASTEROS_CARDS[29] = new Card("SaltShore", "Easteros", "Dorne", 1, "images/Cards/Easteros/SaltShore.png");
EASTEROS_CARDS[30] = new Card("Sandstone", "Easteros", "Dorne", 1, "images/Cards/Easteros/Sandstone.png");
EASTEROS_CARDS[31] = new Card("SeaDragonPoint", "Easteros", "TheNorth", 1, "images/Cards/Easteros/SeaDragonPoint.png");
EASTEROS_CARDS[32] = new Card("SharpPoint", "Easteros", "Crownlands", 1, "images/Cards/Easteros/SharpPoint.png");
EASTEROS_CARDS[33] = new Card("SilverHill", "Easteros", "TheReach", 2, "images/Cards/Easteros/SilverHill.png");
EASTEROS_CARDS[34] = new Card("Skagos", "Easteros", "TheNorth", 1, "images/Cards/Easteros/Skagos.png");
EASTEROS_CARDS[35] = new Card("Skyreach", "Easteros", "Dorne", 1, "images/Cards/Easteros/Skyreach.png");
EASTEROS_CARDS[36] = new Card("Starfall", "Easteros", "Dorne", 1, "images/Cards/Easteros/Starfall.png");
EASTEROS_CARDS[37] = new Card("StoneySept", "Easteros", "Westerlands", 2, "images/Cards/Easteros/StoneySept.png");
EASTEROS_CARDS[38] = new Card("StoneyShore", "Easteros", "TheNorth", 1, "images/Cards/Easteros/StoneyShore.png");
EASTEROS_CARDS[39] = new Card("StormsEnd", "Easteros", "Stormlands", 2, "images/Cards/Easteros/StormsEnd.png");
EASTEROS_CARDS[40] = new Card("Summerhall", "Easteros", "Stormlands", 2, "images/Cards/Easteros/Summerhall.png");
EASTEROS_CARDS[41] = new Card("Sunspear", "Easteros", "Dorne", 2, "images/Cards/Easteros/Sunspear.png");
EASTEROS_CARDS[42] = new Card("Tarth", "Easteros", "Stormlands", 1, "images/Cards/Easteros/Tarth.png");
EASTEROS_CARDS[43] = new Card("TheArbor", "Easteros", "Dorne", 1, "images/Cards/Easteros/TheArbor.png");
EASTEROS_CARDS[44] = new Card("TheBarrowlands", "Easteros", "TheNorth", 1, "images/Cards/Easteros/TheBarrowlands.png");
EASTEROS_CARDS[45] = new Card("TheBoneway", "Easteros", "Dorne", 2, "images/Cards/Easteros/TheBoneway.png");
EASTEROS_CARDS[46] = new Card("TheCrag", "Easteros", "Riverlands", 1, "images/Cards/Easteros/TheCrag.png");
EASTEROS_CARDS[47] = new Card("TheEyrie", "Easteros", "TheVale", 2, "images/Cards/Easteros/TheEyrie.png");
EASTEROS_CARDS[48] = new Card("TheFingers", "Easteros", "TheVale", 2, "images/Cards/Easteros/TheFingers.png");
EASTEROS_CARDS[49] = new Card("TheGift", "Easteros", "TheNorth", 2, "images/Cards/Easteros/TheGift.png");
EASTEROS_CARDS[50] = new Card("TheGreyCliffs", "Easteros", "TheNorth", 1, "images/Cards/Easteros/TheGreyCliffs.png");
EASTEROS_CARDS[51] = new Card("TheMountainsOfTheMoon", "Easteros", "TheVale", 1, "images/Cards/Easteros/TheMountainsOfTheMoon.png");
EASTEROS_CARDS[52] = new Card("TheNeck", "Easteros", "TheNorth", 2, "images/Cards/Easteros/TheNeck.png");
EASTEROS_CARDS[53] = new Card("TheRills", "Easteros", "TheNorth", 1, "images/Cards/Easteros/TheRills.png");
EASTEROS_CARDS[54] = new Card("TheTrident", "Easteros", "Riverlands", 1, "images/Cards/Easteros/TheTrident.png");
EASTEROS_CARDS[55] = new Card("TheTwins", "Easteros", "Riverlands", 1, "images/Cards/Easteros/TheTwins.png");
EASTEROS_CARDS[56] = new Card("TheWolfswood", "Easteros", "TheNorth", 2, "images/Cards/Easteros/TheWolfswood.png");
EASTEROS_CARDS[57] = new Card("ThreeTowers", "Easteros", "Dorne", 2, "images/Cards/Easteros/ThreeTowers.png");
EASTEROS_CARDS[58] = new Card("TorrhensSquare", "Easteros", "TheNorth", 2, "images/Cards/Easteros/TorrhensSquare.png");
EASTEROS_CARDS[59] = new Card("Tumbleton", "Easteros", "Stormlands", 1, "images/Cards/Easteros/Tumbleton.png");
EASTEROS_CARDS[60] = new Card("Uplands", "Easteros", "Dorne", 1, "images/Cards/Easteros/Uplands.png");
EASTEROS_CARDS[61] = new Card("WestVale", "Easteros", "TheVale", 1, "images/Cards/Easteros/WestVale.png");
EASTEROS_CARDS[62] = new Card("WhiteHarbor", "Easteros", "TheNorth", 2, "images/Cards/Easteros/WhiteHarbor.png");
EASTEROS_CARDS[63] = new Card("WidowsWatch", "Easteros", "TheNorth", 1, "images/Cards/Easteros/WidowsWatch.png");
EASTEROS_CARDS[64] = new Card("Winterfell", "Easteros", "TheNorth", 2, "images/Cards/Easteros/Winterfell.png");
EASTEROS_CARDS[65] = new Card("Yronwood", "Easteros", "Dorne", 2, "images/Cards/Easteros/Yronwood.png");



/*
function createDeck(deck) {
  var i;
  var suits = ["c", "h", "s", "d"];

  for(i = 0; i < 52; i++) {
    deck[i] = new Card((i+1), (i%13)+1, suits[i%4]);
  }

  return deck;
}
*/

function shuffleDeck(deck) {
  var shuffledDeck = [];
  var n = deck.length;
  var i;

  while(n) {
    i = Math.floor(Math.random() * n--);
    shuffledDeck.push(deck.splice(i, 1)[0]);
  }

  return shuffledDeck;
}


var i; // counter variable


// card constructor
var card = {
	
	id: "id",
	name: "card",
	region: "region",
	stars: 1,
	filepath: "filepath"
	
};

// card names for Easy map (12 Territories):
var EASY_CARD_NAMES = [
	
	"Australia", "EasternEurope", "Lower SouthAmerica", "NorthAsia",
	"NorthwestAfrica", "SoutheastAfrica", "SoutheastAsia", "SouthwestAsia",
	"UpperNorthAmerica", "UpperSouthAmerica", "WesternEurope"
	
];

// card names for Medium map (21 Territories):
var MEDIUM_CARD_NAMES = [
	
	"Alaska", "Argentina", "AustralianIslands", "AustralianMainland",
	"Brazil", "Canada", "Central America", "China", "EasternEurope",
	"GreatBritain", "Greenland", "Iceland", "India", "Japan", "Madagascar",
	"MiddleEast", "Northwest Africa", "Russia", "SoutheastAfrica",
	"UnitedStates", "WesternEurope"
	
];

// card names for Hard map (42 Territories):
var HARD_CARD_NAMES = [

	"Afghanistan", "Alaska", "Alberta", "Argentina", "Brazil", "CentralAmerica",
	"China", "Congo", "EastAfrica", "EasternUnitedStates", "Egypt",
	"Great Britian", "Greenland", "Iceland", "India", "Indonesia", "Irkutsk",
	"Japan", "Kamchatka", "Madagascar", "MiddleEast", "Mongolia", "NewGuinea",
	"North Africa", "NorthernEurope", "NorthwestTerritory", "Ontario", "Peru",
	"Quebec", "Scandinavia", "Siam", "Siberia", "SouthAfrica", "SouthernEurope",
	"Ukraine", "Ural", "Venezuela", "WesternAustralia", "WesternEurope",
	"WesternUnitedStates", "Yakutsk"

];

// card names for Khorvaire map (16 Territories):
var KHORVAIRE_CARD_NAMES = [

	"Aundair", "Breland", "Darguun", "DemonWastes", "Drooam", "EldeenReaches",
	"Karnath", "LhazaarPrincipalities", "Mournland", "MrorHolds", "OBarra",
	"ShadowMarches", "Talenta Plains", "Thrane", "Valenar", "Zilargo"

];

// card names for USA map (48 Territories):
var USA_CARD_NAMES = [

	"Alabama", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
	"Delaware", "Florida", "Georgia", "Idaho", "Illinois", "Indiana", "Iowa",
	"Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts",
	"Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", 
	"Nevada", "NewHampshire", "NewJersey", "NewMexico", "NewYork",
	"NorthCarolina", "NorthDakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
	"RhodeIsland", "SouthCarolina", "SouthDakota", "Tennessee", "Texas", "Utah",
	"Vermont", "Virginia", "Washington", "WestVirginia", "Wisconsin", "Wyoming"

];

// card names for Easteros map (66 Territories):
var EASTEROS_CARD_NAMES = [

	"Ashford", "BearIsland", "Blackhaven", "BrightwaterKeep", "CapeKraken",
	"CapeWrath", "CasterlyRock", "Cornfield", "CrackclawPoint", "Dragonstone",
	"Duskendale", "GoldenGrove", "GoldenTooth", "GrassyVale", "Gulltown",
	"Harrenhall", "HaystackHall", "Highgarden", "IronIslands", "KingsLanding",
	"Kingswood", "Lannisport", "LonelyHills", "LongLake", "OldOak", "Oldtown",
	"Prince's Pass", "Riverrun", "SaltShore", "Saltpans", "Sandstone",
	"SeaDragonPoint", "SharpPoint", "SilverHill", "Skagos", "Skyreach",
	"Starfall", "StoneySept", "StoneyShore", "StormsEnd", "Summerhall",
	"Sunspear", "Tarth", "TheArbor", "TheBarrowlands", "TheBoneway",
	"TheCrag", "TheEyrie", "TheFingers", "TheGift", "TheGreyCliffs",
	"TheMountainsOfTheMoon", "TheNeck", "TheRills", "TheTrident",
	"TheTwins", "TheWolfswood", "ThreeTowers", "TorrhensSquare", "Tumbleton",
	"Uplands", "WestVale", "WhiteHarbor", "WidowsWatch", "Winterfell",
	"Yronwood"

];
