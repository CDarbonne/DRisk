/*============================= GLOBAL VARIABLES/LOCAL STORAGE ==============================*/

var PLAYER = []; //Array to store Players information. Temporary until database functionality is available
var GAMESETUP = true;
var PLAYERTURN;

var numPlayers = JSON.parse(localStorage.getItem('numPlayers'));
var mapSelect = JSON.parse(localStorage.getItem('mapSelect'));

for (var i = 1; i <= numPlayers; i++) {

	var teamColor = JSON.parse(localStorage.getItem('teamColor' + i));
	var teamName = JSON.parse(localStorage.getItem('teamName' + i));

	PLAYER[i - 1] = {
		name: teamName,
		color: teamColor
	};
}

/*
//TEST FOR PLAYER CONSTRUCTOR
for (var i = 1; i <= numPlayers; i++) {

	console.log(PLAYER[i]);
}
*/





/*======================== AMMAP MAP CREATION FUNCTION ========================*/


			var map;
			AmCharts.theme = AmCharts.themes.black;
			// add all your code to this method, as this will ensure that page is loaded
			AmCharts.ready(function() {
			    // create AmMap object
			    map = new AmCharts.AmMap();
				map.balloon.color = "#000000"
				map.zoomOnDoubleClick = false;
				
			    
				/*Allows you to add a title to the map
				map.addTitle("Easteros", 25);
				map.areasSettings = {
				unlistedAreasColor: "#000000",
				unlistedAreasAlpha: 0.1
				}; */
				

			    /* create data provider object
			     mapVar tells the map name of the variable of the map data. You have to
			     view source of the map file you included in order to find the name of the
			     variable - it's the very first line after commented lines.

			     getAreasFromMap indicates that amMap should read all the areas available
			     in the map data and treat them as they are included in your data provider.
			     in case you don't set it to true, all the areas except listed in data
			     provider will be treated as unlisted.
			    */
			    var dataProvider = {
			        mapVar: AmCharts.maps.worldLow,
			        getAreasFromMap:true
             
			    };
			    // pass data provider to the map object
			    map.dataProvider = dataProvider;

			    /* create areas settings
			     * autoZoom set to true means that the map will zoom-in when clicked on the area
			     * selectedColor indicates color of the clicked area.
			     */
			    map.areasSettings = {
			        autoZoom: false,
					selectable: true,
			        rollOverOutlineColor: "#000000",
					//rollOverColor: "#62B4EB",
					
					
			    };

			    // let's say we want a small map to be displayed, so let's create and add it to the map
			    map.smallMap = new AmCharts.SmallMap();

			    // write the map to container div
			    map.write("mapdiv");
                      
function testDataprovider() {
	console.log("We got here boys");
	dataProvider.getAreasFromMap = false;
	map.dataProvider = dataProvider;
	map.write("mapdiv");
}
/*============================= COLOR CHANGING FUNCTION ==========================*/

//This is the function that changes color of the individual areas
function changeColor(id, color) {

	
	this.id = id;
	this.color = color;

	// update color in data
	var area = map.getObjectById(id); //Find map territory object by id
	//console.log(area);
	area.color = color; //Set the color attribute of the territory object to the player color
	area.colorReal = area.color;

	if (GAMESETUP == false) { //If game is setting up, do not update each time because it will cause the browser to take ~6 seconds to load instead of immediately
    	map.write("mapdiv"); //Update the map with the changes
	}

	
}


/*======================== REGION ASSIGNMENT ========================*/

var mapArray = [];
var mapVar;

switch(mapSelect) {
    case "Easy":
        for (var i = 0; i < 12; i++) {
		    mapArray[i] = {
		    	id: EASY_CARDS[i].id,
		    	region: EASY_CARDS[i].region
		    };
		}
        break;
    case "Medium":
        for (var i = 0; i < 21; i++) {
		    mapArray[i] = {
		    	id: MEDIUM_CARDS[i].id,
		    	region: MEDIUM_CARDS[i].region
		    };
		}
        break;
    case "Hard":
        for (var i = 0; i < 42; i++) {
		    mapArray[i] = {
		    	id: HARD_CARDS[i].id,
		    	region: HARD_CARDS[i].region
		    };
		}
        break;
    case "US":
        for (var i = 0; i < 48; i++) {
		    mapArray[i] = {
		    	id: USA_CARDS[i].id,
		    	region: USA_CARDS[i].region
		    };
		}
        break;
    case "Khorvaire":
        for (var i = 0; i < 16; i++) {
		    mapArray[i] = {
		    	id: KHORVAIRE_CARDS[i].id,
		    	region: KHORVAIRE_CARDS[i].region
		    };
		}
        break;
    case "Easteros":
    	for (var i = 0; i < 66; i++) {
		    mapArray[i] = {
		    	id: EASTEROS_CARDS[i].id,
		    	region: EASTEROS_CARDS[i].region
		    };
		}
        break;
    default:
        window.alert("SOMETHING WENT WRONG! I DONT KNOW WHAT, BUT SOMETHING IS VERY WRONG! GET OUT OF HERE QUICK!");
}

var mapArrayLength = mapArray.length;

for (var i = 0; i < numPlayers; i++) { //Regions shuffled one time for each player in the game to increase randomization
	shuffle(mapArray); //Shuffles the array of regions
}

shuffle(PLAYER); //Shuffles the array of players so that the order is random, thus fair

var regionsPerPlayer = (mapArrayLength / numPlayers); //Variable to define the number of regions per player. the last player will recieve any leftover regions
var arrayCounter = 0; //Used to iterate through the region array

for (var i = 0; i < numPlayers; i++) {

	console.log("PLAYER " + i);
	for (var x = 1; x <= regionsPerPlayer; x++, arrayCounter++) {
		console.log(arrayCounter + " " + mapArray[arrayCounter].id + " " + PLAYER[i].color);
		changeColor(mapArray[arrayCounter].id, PLAYER[i].color);
	}
}

if (arrayCounter != mapArrayLength) { //If there are any remaining unassigned territories due to uneven division, the last player gets them to balance the disadvantage of going last
	for (var x = arrayCounter; x < mapArrayLength; x++, arrayCounter++) {
		console.log(arrayCounter + " " + mapArray[arrayCounter].id + " " + PLAYER[numPlayers - 1].color);
		changeColor(mapArray[arrayCounter].id, PLAYER[numPlayers - 1].color);
	}
}

console.log(mapArray);

map.write("mapdiv"); //Update the map with the changes
GAMESETUP = false; //Set to false so that all subsequent color changes will be automatically updated by the changeColor() function

/*================================== GAME SETUP =====================================*/

PLAYERTURN = 0; //Make the game begin on Player 1's turn

/*============================== ONCLICK FUNCTIONS ==================================*/

var attacker;
var defender;
var attackBool = 0;

map.addListener("clickMapObject", function (event) {
						
	//testDataprovider();
	var selectedArea = event.mapObject.id;
	var selectedColor = selectedArea;
	console.log("selected area: " + selectedArea + " color: " + selectedArea.color);
	//changeColor(selectedArea);
	//test();

	selectedColor.colorReal = selectedColor.color;
	//map.returnInitialColor(selectedColor);
	
	if (yourTurn == 1) {
		if (attackBool == 0)
		{
			attacker = selectedArea;
			console.log(attacker);
			attackBool++;
		}

		else if (attackBool == 1)
		{
			defender = selectedArea;
			console.log(defender);
			attack(attacker, defender);
			attackBool = 0;
		}
	}
});//listener function

});//ammap ready function


/*============================== ATTACK FUNCTIONS ===================================*/
function attack(attacker, defender) {
	//Declaring variables to represent the number of dice used by the attacker and defender after user input is scanned in
	var numAttackDice;
	var numDefendDice;
	console.log("THE ATTACK HAS BEGUN!");

	//Assigns the number of dice used by the attacker based on user input
	var userAttackDice = prompt("Please enter the number of dice the attacker will roll (1-3)");
	if(userAttackDice !== null)
	{
	    numAttackDice = userAttackDice;
	}

	/*/Assigns the number of dice used by the defender based on user input
	var userDefendDice = prompt("Please enter the number of dice the attacker will roll (1-2)");
	if(userDefendDice !== null)
	{
	    numDefendDice = userDefendDice;
	}*/
	numDefendDice = userAttackDice;
	//Creates an array to hold the attacker dice values to be compared later
	var attackDice = new Array();

	//Fills array with random possible dice values of 1-6
	for(i = 0; i < numAttackDice; i++)
	{
	    var tempDice = Math.floor((Math.random() * 6) + 1);
	    attackDice[i] = tempDice;
	}

	//Testing output results
	console.log("Attackers rolled : " +attackDice.toString());

	//Creates an array to hold the defenders dice values to be compared later
	var defendDice = new Array();

	//Fills the array with random possible dice values of 1-6
	for(i = 0; i < numDefendDice; i++)
	{
	    var tempDice2 = Math.floor((Math.random() *6) + 1);
	    defendDice[i] = tempDice2;
	}

	//Testing output results
	console.log("Defenders rolled : " + defendDice);

	//Compares each value in the attacker array against each value in the defender array to determine winner
	for(i = 0; i < attackDice.length; i++)
	{
	    for(j = 0; j < defendDice.length; j++)
	    {
	        if(attackDice[i] > defendDice[j])
	        {
	            //Console test output
	            console.log(attackDice[i] + " beats " + defendDice[j]);
	        }
	        else if(attackDice[i] < defendDice[j])
	        {
	            //Console test output
	            console.log(attackDice[i] + " loses to " + defendDice[j]);
	        }
	        else if(attackDice[i] == defendDice[j])
	        {
	            //Console test output
	            console.log("Tie, Defenders win.");
	        }
	    }
	}
}





/*=========================== MISCELLANEOUS FUNCTIONS ==============================*/

function shuffle(array) { //Shuffles the contents of an array and returns the result
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}




