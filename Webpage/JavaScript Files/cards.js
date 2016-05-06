// This file contains all the information dealing with all cards for all territories

var i; // counter variable


// card constructor
var card = {
	
	id: "id",
	name: "card",
	region: "region",
	stars: 1,
	filepath: "filepath"
	
};

// copy card constructor to each deck
var EASY_CARDS = [12];
var MEDIUM_CARDS = [21];
var HARD_CARDS = [42];
var KHORVAIRE_CARDS = [16];
var USA_CARDS = [48];
var EASTEROS_CARDS = [66];


// card names for Easy map (12 Territories):
var EASY_CARD_NAMES = [
	
	"Australia", "Eastern Europe", "Lower South America", "North Asia",
	"Northwest Africa", "Southeast Africa", "Southeast Asia", "Southwest Asia",
	"Upper North America", "Upper South America", "Western Europe"
	
];

// card names for Medium map (21 Territories):
var MEDIUM_CARD_NAMES = [
	
	"Alaska", "Argentina", "Australian Islands", "Australian Mainland",
	"Brazil", "Canada", "Central America", "China", "Eastern Europe",
	"Great Britain", "Greenland", "Iceland", "India", "Japan", "Madagascar",
	"Middle East", "Northwest Africa", "Russia", "Southeast Africa",
	"United States", "Western Europe"
	
];

// card names for Hard map (42 Territories):
var HARD_CARD_NAMES = [

	"Afghanistan", "Alaska", "Alberta", "Argentina", "Brazil", "Central America",
	"China", "Congo", "East Africa", "Eastern United States", "Egypt",
	"Great Britian", "Greenland", "Iceland", "India", "Indonesia", "Irkutsk",
	"Japan", "Kamchatka", "Madagascar", "Middle East", "Mongolia", "New Guinea",
	"North Africa", "Northern Europe", "Northwest Territory", "Ontario", "Peru",
	"Quebec", "Scandinavia", "Siam", "Siberia", "South Africa", "Southern Europe",
	"Ukraine", "Ural", "Venezuela", "Western Australia", "Western Europe",
	"Western United States", "Yakutsk"

];

// card names for Khorvaire map (16 Territories):
var KHORVAIRE_CARD_NAMES = [

	"Aundair", "Breland", "Darguun", "Demon Wastes", "Drooam", "Eldeen Reaches",
	"Karnath", "Lhazaar Principalities", "Mournland", "Mror Holds", "O'Barra",
	"Shadow Marches", "Talenta Plains", "Thrane", "Valenar", "Zilargo"

];

// card names for USA map (48 Territories):
var USA_CARD_NAMES = [

	"Alabama", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
	"Delaware", "Florida", "Georgia", "Idaho", "Illinois", "Indiana", "Iowa",
	"Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts",
	"Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", 
	"Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York",
	"North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
	"Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah",
	"Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"

];

// card names for Easteros map (66 Territories):
var EASTEROS_CARD_NAMES = [

	"Ashford", "Bear Island", "Blackhaven", "Brightwater Keep", "Cape Kraken",
	"Cape Wrath", "Casterly Rock", "Cornfield", "Crackclaw Point", "Dragonstone",
	"Duskendale", "Golden Grove", "Golden Tooth", "Grassy Vale", "Gulltown",
	"Harrenhall", "Haystack Hall", "Highgarden", "Iron Islands", "King's Landing",
	"Kingswood", "Lannisport", "Lonely Hills", "Long Lake", "Old Oak", "Oldtown",
	"Prince's Pass", "Riverrun", "Salt Shore", "Saltpans", "Sandstone",
	"Sea Dragon Point", "Sharp Point", "Silver Hill", "Skagos", "Skyreach",
	"Starfall", "Stoney Sept", "Stoney Shore", "Storm's End", "Summerhall",
	"Sunspear", "Tarth", "The Arbor", "The Barrowlands", "The Boneway",
	"The Crag", "The Eyrie", "The Fingers", "The Gift", "The Grey Cliffs",
	"The Mountains of the Moon", "The Neck", "The Rills", "The Trident",
	"The Twins", "The Wolfswood", "Three Towers", "Torrhen's Square", "Tumbleton",
	"Uplands", "West Vale", "White Harbor", "Widow's Watch", "Winterfell",
	"Yronwood"

]

// copy card structure into each card for Easy map.
for (i = 0; i < EASY_CARDS.length; i++)
{
	EASY_CARDS[i] = card;
}

// copy card structure into each card for Medium map.
for (i = 0; i < MEDIUM_CARDS.length; i++)
{
	MEDIUM_CARDS[i] = card;
}

// copy card structure into each card for Hard map.
for (i = 0; i < HARD_CARDS.length; i++)
{
	HARD_CARDS[i] = card;
}

// copy card structure into each card for Khorvaire map.
for (i = 0; i < KHORVAIRE_CARDS.length; i++)
{
	KHORVAIRE_CARDS[i] = card;
}

// copy card structure into each card for USA map.
for (i = 0; i < USA_CARDS.length; i++)
{
	USA_CARDS[i] = card;
}

// copy card structure into each card for Easteros map.
for (i = 0; i < EASTEROS_CARDS.length; i++)
{
	EASTEROS_CARDS[i] = card;
}


// EASY MAP CARD VALUE ASSIGNMENTS
EASY_CARDS[0].id = "Australia";
EASY_CARDS[0].name = "Australia";
EASY_CARDS[0].region = "Australia"
EASY_CARDS[0].stars = 1;
EASY_CARDS[0].filepath = "../images/Cards/Easy/Australia.png"

/*
EASY_CARDS[1].id = "EasternEurope";
EASY_CARDS[1].name = "Eastern Europe";
EASY_CARDS[1].region = "Europe"
EASY_CARDS[1].stars = 1;
EASY_CARDS[1].filepath = "../images/Cards/Easy/Eastern Europe.png"

EASY_CARDS[2].id = "LowerNorthAmerica";
EASY_CARDS[2].name = "Lower North America";
EASY_CARDS[2].region = "North America"
EASY_CARDS[2].stars = 1;
EASY_CARDS[2].filepath = "../images/Cards/Easy/Lower North America.png"
*/
// test...






