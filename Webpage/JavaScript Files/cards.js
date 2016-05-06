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

// create EASY map cards:
EASY_CARDS[0] = new Card("Australia", "Easy", "Australia", 1, "images/Cards/Easy/Australia.png");
EASY_CARDS[1] = new Card("EasternEurope", "Easy", "Europe", 1, "images/Cards/Easy/EasternEurope.png");
EASY_CARDS[2] = new Card("LowerNorthAmerica", "Easy", "NorthAmerica", 1, "images/Cards/Easy/LowerNorthAmerica.png");



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
