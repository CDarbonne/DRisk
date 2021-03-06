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

// create EASY map cards (12 territories):
EASY_CARDS[0] = new Card("Australia", "Easy", "Australia", 1, "images/Cards/Easy/Australia.png");
EASY_CARDS[1] = new Card("EasternEurope", "Easy", "Europe", 1, "images/Cards/Easy/EasternEurope.png");
EASY_CARDS[2] = new Card("LowerNorthAmerica", "Easy", "NorthAmerica", 1, "images/Cards/Easy/LowerNorthAmerica.png");
EASY_CARDS[3] = new Card("LowerSouthAmerica", "Easy", "SouthAmerica", 1, "images/Cards/Easy/LowerSouthAmerica.png");
EASY_CARDS[4] = new Card("NorthAsia", "Easy", "Asia", 2, "images/Cards/Easy/NorthAsia.png");
EASY_CARDS[5] = new Card("NorthwestAfrica", "Easy", "Africa", 2, "images/Cards/Easy/NorthwestAfrica.png");
EASY_CARDS[6] = new Card("SoutheastAfrica", "Easy", "Africa", 1, "images/Cards/Easy/SoutheastAfrica.png");
EASY_CARDS[7] = new Card("SoutheastAsia", "Easy", "Asia", 1, "images/Cards/Easy/SoutheastAsia.png");
EASY_CARDS[8] = new Card("SouthwestAsia", "Easy", "Asia", 1, "images/Cards/Easy/SouthwestAsia.png");
EASY_CARDS[9] = new Card("UpperNorthAmerica", "Easy", "NorthAmerica", 2, "images/Cards/Easy/UpperNorthAmerica.png");
EASY_CARDS[10] = new Card("UpperSouthAmerica", "Easy", "SouthAmerica", 1, "images/Cards/Easy/UpperSouthAmerica.png");
EASY_CARDS[11] = new Card("WesternEurope", "Easy", "Europe", 2, "images/Cards/Easy/WesternEurope.png");

// create MEDIUM map cards (21 territories):
MEDIUM_CARDS[0] = new Card("Alaska", "Medium", "NorthAmerica", 1, "images/Cards/Medium/Alaska.png");
MEDIUM_CARDS[1] = new Card("Argentina", "Medium", "SouthAmerica", 1, "images/Cards/Medium/Argentina.png");
MEDIUM_CARDS[2] = new Card("AustralianIslands", "Medium", "Australia", 1, "images/Cards/Medium/AustralianIslands.png");
MEDIUM_CARDS[3] = new Card("AustralianMainland", "Medium", "Australia", 2, "images/Cards/Medium/AustralianMainland.png");
MEDIUM_CARDS[4] = new Card("Brazil", "Medium", "SouthAmerica", 2, "images/Cards/Medium/Brazil.png");
MEDIUM_CARDS[5] = new Card("Canada", "Medium", "NorthAmerica", 1, "images/Cards/Medium/Canada.png");
MEDIUM_CARDS[6] = new Card("CentralAmerica", "Medium", "NorthAmerica", 1, "images/Cards/Medium/CentralAmerica.png");
MEDIUM_CARDS[7] = new Card("China", "Medium", "Asia", 1, "images/Cards/Medium/China.png");
MEDIUM_CARDS[8] = new Card("EasternEurope", "Medium", "Europe", 1, "images/Cards/Medium/EasternEurope.png");
MEDIUM_CARDS[9] = new Card("GreatBritain", "Medium", "Europe", 1, "images/Cards/Medium/GreatBritain.png");
MEDIUM_CARDS[10] = new Card("Greenland", "Medium", "NorthAmerica", 1, "images/Cards/Medium/Greenland.png");
MEDIUM_CARDS[11] = new Card("Iceland", "Medium", "Europe", 1, "images/Cards/Medium/Iceland.png");
MEDIUM_CARDS[12] = new Card("India", "Medium", "Asia", 1, "images/Cards/Medium/India.png");
MEDIUM_CARDS[13] = new Card("Japan", "Medium", "Asia", 2, "images/Cards/Medium/Japan.png");
MEDIUM_CARDS[14] = new Card("Madagascar", "Medium", "Africa", 1, "images/Cards/Medium/Madagascar.png");
MEDIUM_CARDS[15] = new Card("MiddleEast", "Medium", "Asia", 1, "images/Cards/Medium/MiddleEast.png");
MEDIUM_CARDS[16] = new Card("NorthwestAfrica", "Medium", "Africa", 2, "images/Cards/Medium/NorthwestAfrica.png");
MEDIUM_CARDS[17] = new Card("Russia", "Medium", "Asia", 2, "images/Cards/Medium/Russia.png");
MEDIUM_CARDS[18] = new Card("SoutheastAfrica", "Medium", "Africa", 1, "images/Cards/Medium/SoutheastAfrica.png");
MEDIUM_CARDS[19] = new Card("UnitedStates", "Medium", "NorthAmerica", 2, "images/Cards/Medium/UnitedStates.png");
MEDIUM_CARDS[20] = new Card("WesternEurope", "Medium", "Europe", 2, "images/Cards/Medium/WesternEurope.png");

// create HARD map cards (42 territories):
HARD_CARDS[0] = new Card("Afghanistan", "Hard", "Asia", 2, "images/Cards/Hard/Afghanistan.png");
HARD_CARDS[1] = new Card("Alaska", "Hard", "NorthAmerica", 1, "images/Cards/Hard/Alaska.png");
HARD_CARDS[2] = new Card("Alberta", "Hard", "NorthAmerica", 1, "images/Cards/Hard/Alberta.png");
HARD_CARDS[3] = new Card("Argentina", "Hard", "SouthAmerica", 1, "images/Cards/Hard/Argentina.png");
HARD_CARDS[4] = new Card("Brazil", "Hard", "SouthAmerica", 1, "images/Cards/Hard/Brazil.png");
HARD_CARDS[5] = new Card("CentralAmerica", "Hard", "NorthAmerica", 1, "images/Cards/Hard/CentralAmerica.png");
HARD_CARDS[6] = new Card("China", "Hard", "Asia", 1, "images/Cards/Hard/China.png");
HARD_CARDS[7] = new Card("Congo", "Hard", "Africa", 2, "images/Cards/Hard/Congo.png");
HARD_CARDS[8] = new Card("EastAfrica", "Hard", "Africa", 1, "images/Cards/Hard/EastAfrica.png");
HARD_CARDS[9] = new Card("EasternAustralia", "Hard", "Australia", 2, "images/Cards/Hard/EasternAustralia.png");
HARD_CARDS[10] = new Card("EasternUnitedStates", "Hard", "NorthAmerica", 1, "images/Cards/Hard/EasternUnitedStates.png");
HARD_CARDS[11] = new Card("Egypt", "Hard", "Africa", 1, "images/Cards/Hard/Egypt.png");
HARD_CARDS[12] = new Card("GreatBritain", "Hard", "Europe", 2, "images/Cards/Hard/GreatBritain.png");
HARD_CARDS[13] = new Card("Greenland", "Hard", "NorthAmerica", 1, "images/Cards/Hard/Greenland.png");
HARD_CARDS[14] = new Card("Iceland", "Hard", "Europe", 1, "images/Cards/Hard/Iceland.png");
HARD_CARDS[15] = new Card("India", "Hard", "Asia", 1, "images/Cards/Hard/India.png");
HARD_CARDS[16] = new Card("Indonesia", "Hard", "Australia", 1, "images/Cards/Hard/Indonesia.png");
HARD_CARDS[17] = new Card("Irkutsk", "Hard", "Asia", 2, "images/Cards/Hard/Irkutsk.png");
HARD_CARDS[18] = new Card("Japan", "Hard", "Asia", 2, "images/Cards/Hard/Japan.png");
HARD_CARDS[19] = new Card("Kamchatka", "Hard", "Asia", 1, "images/Cards/Hard/Kamchatka.png");
HARD_CARDS[20] = new Card("Madagascar", "Hard", "Africa", 1, "images/Cards/Hard/Madagascar.png");
HARD_CARDS[21] = new Card("MiddleEast", "Hard", "Asia", 1, "images/Cards/Hard/MiddleEast.png");
HARD_CARDS[22] = new Card("Mongolia", "Hard", "Asia", 1, "images/Cards/Hard/Mongolia.png");
HARD_CARDS[23] = new Card("NewGuinea", "Hard", "Australia", 1, "images/Cards/Hard/NewGuinea.png");
HARD_CARDS[24] = new Card("NorthAfrica", "Hard", "Africa", 1, "images/Cards/Hard/NorthAfrica.png");
HARD_CARDS[25] = new Card("NorthernEurope", "Hard", "Europe", 1, "images/Cards/Hard/NorthernEurope.png");
HARD_CARDS[26] = new Card("NorthwestTerritory", "Hard", "NorthAmerica", 2, "images/Cards/Hard/NorthwestTerritory.png");
HARD_CARDS[27] = new Card("Ontario", "Hard", "NorthAmerica", 2, "images/Cards/Hard/Ontario.png");
HARD_CARDS[28] = new Card("Peru", "Hard", "SouthAmerica", 1, "images/Cards/Hard/Peru.png");
HARD_CARDS[29] = new Card("Quebec", "Hard", "NorthAmerica", 1, "images/Cards/Hard/Quebec.png");
HARD_CARDS[30] = new Card("Scandinavia", "Hard", "Europe", 1, "images/Cards/Hard/Scandinavia.png");
HARD_CARDS[31] = new Card("Siam", "Hard", "Asia", 1, "images/Cards/Hard/Siam.png");
HARD_CARDS[32] = new Card("Siberia", "Hard", "Asia", 1, "images/Cards/Hard/Siberia.png");
HARD_CARDS[33] = new Card("SouthAfrica", "Hard", "Africa", 1, "images/Cards/Hard/SouthAfrica.png");
HARD_CARDS[34] = new Card("SouthernEurope", "Hard", "Europe", 1, "images/Cards/Hard/SouthernEurope.png");
HARD_CARDS[35] = new Card("Ukraine", "Hard", "Europe", 1, "images/Cards/Hard/Ukraine.png");
HARD_CARDS[36] = new Card("Ural", "Hard", "Asia", 2, "images/Cards/Hard/Ural.png");
HARD_CARDS[37] = new Card("Venezuela", "Hard", "SouthAmerica", 2, "images/Cards/Hard/Venezuela.png");
HARD_CARDS[38] = new Card("WesternAustralia", "Hard", "Australia", 1, "images/Cards/Hard/WesternAustralia.png");
HARD_CARDS[39] = new Card("WesternEurope", "Hard", "Europe", 2, "images/Cards/Hard/WesternEurope.png");
HARD_CARDS[40] = new Card("WesternUnitedStates", "Hard", "NorthAmerica", 1, "images/Cards/Hard/WesternUnitedStates.png");
HARD_CARDS[41] = new Card("Yakutsk", "Hard", "Asia", 2, "images/Cards/Hard/Yakutsk.png");

// create KHORVAIRE map cards (16 territories):
KHORVAIRE_CARDS[0] = new Card("Aundair", "Khorvaire", "CentralKhorvaire", 1, "images/Cards/Khorvaire/Aundair.png");
KHORVAIRE_CARDS[1] = new Card("Breland", "Khorvaire", "CentralKhorvaire", 2, "images/Cards/Khorvaire/Breland.png");
KHORVAIRE_CARDS[2] = new Card("Darguun", "Khorvaire", "CentralKhorvaire", 1, "images/Cards/Khorvaire/Darguun.png");
KHORVAIRE_CARDS[3] = new Card("DemonWastes", "Khorvaire", "WesternKhorvaire", 2, "images/Cards/Khorvaire/DemonWastes.png");
KHORVAIRE_CARDS[4] = new Card("Droaam", "Khorvaire", "WesternKhorvaire", 1, "images/Cards/Khorvaire/Droaam.png");
KHORVAIRE_CARDS[5] = new Card("EldeenReaches", "Khorvaire", "WesternKhorvaire", 2, "images/Cards/Khorvaire/EldeenReaches.png");
KHORVAIRE_CARDS[6] = new Card("Karnath", "Khorvaire", "EasternKhorvaire", 2, "images/Cards/Khorvaire/Karnath.png");
KHORVAIRE_CARDS[7] = new Card("LhazaarPrincipalities", "Khorvaire", "EasternKhorvaire", 2, "images/Cards/Khorvaire/LhazaarPrincipalities.png");
KHORVAIRE_CARDS[8] = new Card("Mournland", "Khorvaire", "CentralKhorvaire", 1, "images/Cards/Khorvaire/Mournland.png");
KHORVAIRE_CARDS[9] = new Card("MrorHolds", "Khorvaire", "EasternKhorvaire", 1, "images/Cards/Khorvaire/MrorHolds.png");
KHORVAIRE_CARDS[10] = new Card("OBarra", "Khorvaire", "EasternKhorvaire", 1, "images/Cards/Khorvaire/OBarra.png");
KHORVAIRE_CARDS[11] = new Card("ShadowMarches", "Khorvaire", "WesternKhorvaire", 1, "images/Cards/Khorvaire/ShadowMarches.png");
KHORVAIRE_CARDS[12] = new Card("TalentaPlains", "Khorvaire", "EasternKhorvaire", 1, "images/Cards/Khorvaire/TalentaPlains.png");
KHORVAIRE_CARDS[13] = new Card("Thrane", "Khorvaire", "CentralKhorvaire", 2, "images/Cards/Khorvaire/Thrane.png");
KHORVAIRE_CARDS[14] = new Card("Valenar", "Khorvaire", "EasternKhorvaire", 1, "images/Cards/Khorvaire/Valenar.png");
KHORVAIRE_CARDS[15] = new Card("Zilargo", "Khorvaire", "CentralKhorvaire", 1, "images/Cards/Khorvaire/Zilargo.png");

// create USA map cards (48 territories):
USA_CARDS[0] = new Card("Alabama", "USA", "South", 1, "images/Cards/USA/Alabama.png");
USA_CARDS[1] = new Card("Arizona", "USA", "Southwest", 1, "images/Cards/USA/Arizona.png");
USA_CARDS[2] = new Card("Akansas", "USA", "South", 1, "images/Cards/USA/Akansas.png");
USA_CARDS[3] = new Card("California", "USA", "West", 2, "images/Cards/USA/California.png");
USA_CARDS[4] = new Card("Colorado", "USA", "West", 1, "images/Cards/USA/Colorado.png");
USA_CARDS[5] = new Card("Connecticut", "USA", "NewEngland", 1, "images/Cards/USA/Connecticut.png");
USA_CARDS[6] = new Card("Delaware", "USA", "MidAtlantic", 1, "images/Cards/USA/Delaware.png");
USA_CARDS[7] = new Card("Florida", "USA", "South", 2, "images/Cards/USA/Florida.png");
USA_CARDS[8] = new Card("Georgia", "USA", "South", 1, "images/Cards/USA/Georgia.png");
USA_CARDS[9] = new Card("Idaho", "USA", "West", 1, "images/Cards/USA/Idaho.png");
USA_CARDS[10] = new Card("Illinois", "USA", "MidWest", 1, "images/Cards/USA/Illinois.png");
USA_CARDS[11] = new Card("Indiana", "USA", "MidWest", 1, "images/Cards/USA/Indiana.png");
USA_CARDS[12] = new Card("Iowa", "USA", "MidWest", 1, "images/Cards/USA/Iowa.png");
USA_CARDS[13] = new Card("Kansas", "USA", "MidWest", 2, "images/Cards/USA/Kansas.png");
USA_CARDS[14] = new Card("Kentucky", "USA", "South", 1, "images/Cards/USA/Kentucky.png");
USA_CARDS[15] = new Card("Louisiana", "USA", "South", 2, "images/Cards/USA/Louisiana.png");
USA_CARDS[16] = new Card("Maine", "USA", "NewEngland", 1, "images/Cards/USA/Maine.png");
USA_CARDS[17] = new Card("Maryland", "USA", "MidAtlantic", 1, "images/Cards/USA/Maryland.png");
USA_CARDS[18] = new Card("Massachusetts", "USA", "NewEngland", 2, "images/Cards/USA/Massachusetts.png");
USA_CARDS[19] = new Card("Michigan", "USA", "MidWest", 2, "images/Cards/USA/Michigan.png");
USA_CARDS[20] = new Card("Minnesota", "USA", "MidWest", 1, "images/Cards/USA/Minnesota.png");
USA_CARDS[21] = new Card("Mississippi", "USA", "South", 1, "images/Cards/USA/Mississippi.png");
USA_CARDS[22] = new Card("Missouri", "USA", "MidWest", 2, "images/Cards/USA/Missouri.png");
USA_CARDS[23] = new Card("Montana", "USA", "West", 2, "images/Cards/USA/Montana.png");
USA_CARDS[24] = new Card("Nebraska", "USA", "MidWest", 1, "images/Cards/USA/Nebraska.png");
USA_CARDS[25] = new Card("Nevada", "USA", "West", 1, "images/Cards/USA/Nevada.png");
USA_CARDS[26] = new Card("NewHampshire", "USA", "NewEngland", 1, "images/Cards/USA/NewHampshire.png");
USA_CARDS[27] = new Card("NewJersey", "USA", "MidAtlantic", 1, "images/Cards/USA/NewJersey.png");
USA_CARDS[28] = new Card("NewMexico", "USA", "SouthWest", 1, "images/Cards/USA/NewMexico.png");
USA_CARDS[29] = new Card("NewYork", "USA", "MidAtlantic", 2, "images/Cards/USA/NewYork.png");
USA_CARDS[30] = new Card("NorthCarolina", "USA", "South", 1, "images/Cards/USA/NorthCarolina.png");
USA_CARDS[31] = new Card("NorthDakota", "USA", "MidWest", 1, "images/Cards/USA/NorthDakota.png");
USA_CARDS[32] = new Card("Ohio", "USA", "MidWest", 1, "images/Cards/USA/Ohio.png");
USA_CARDS[33] = new Card("Oklahoma", "USA", "Southwest", 1, "images/Cards/USA/Oklahoma.png");
USA_CARDS[34] = new Card("Oregon", "USA", "West", 1, "images/Cards/USA/Oregon.png");
USA_CARDS[35] = new Card("Pennsylvania", "USA", "MidAtlantic", 1, "images/Cards/USA/Pennsylvania.png");
USA_CARDS[36] = new Card("RhodeIsland", "USA", "NewEngland", 1, "images/Cards/USA/RhodeIsland.png");
USA_CARDS[37] = new Card("SouthCarolina", "USA", "South", 1, "images/Cards/USA/SouthCarolina.png");
USA_CARDS[38] = new Card("SouthDakota", "USA", "MidWest", 1, "images/Cards/USA/SouthDakota.png");
USA_CARDS[39] = new Card("Tennessee", "USA", "South", 1, "images/Cards/USA/Tennessee.png");
USA_CARDS[40] = new Card("Texas", "USA", "Southwest", 2, "images/Cards/USA/Texas.png");
USA_CARDS[41] = new Card("Utah", "USA", "West", 1, "images/Cards/USA/Utah.png");
USA_CARDS[42] = new Card("Vermont", "USA", "NewEngland", 1, "images/Cards/USA/Vermont.png");
USA_CARDS[43] = new Card("Virginia", "USA", "South", 2, "images/Cards/USA/Virginia.png");
USA_CARDS[44] = new Card("Washington", "USA", "West", 1, "images/Cards/USA/Washington.png");
USA_CARDS[45] = new Card("WestVirginia", "USA", "South", 1, "images/Cards/USA/WestVirginia.png");
USA_CARDS[46] = new Card("Wisconsin", "USA", "MidWest", 1, "images/Cards/USA/Wisconsin.png");
USA_CARDS[47] = new Card("Wyoming", "USA", "West", 1, "images/Cards/USA/Wyoming.png");

// create EASTEROS map cards (66 territories):
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



