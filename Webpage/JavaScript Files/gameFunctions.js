/*============================= GLOBAL VARIABLES/LOCAL STORAGE ==============================*/

var PLAYER = [];

var numPlayers = JSON.parse(localStorage.getItem('numPlayers'));
var mapSelect = JSON.parse(localStorage.getItem('mapSelect'));


for (var i = 1; i <= numPlayers; i++) {

	var teamColor = JSON.parse(localStorage.getItem('teamColor' + i));
	var teamName = JSON.parse(localStorage.getItem('teamName' + i));

	PLAYER[i] = {
		name: teamName,
		color: teamColor,
		turn: 0
	};
}

//TEST FOR PLAYER CONSTRUCTOR
for (var i = 1; i <= numPlayers; i++) {

	console.log(PLAYER[i]);
}


var mapArray = [];

switch(mapSelect) {
    case "Easy":
        mapArray = EASY_CARDS;
        break;
    case "Medium":
        mapArray = MEDIUM_CARDS;
        break;
    case "Hard":
        mapArray = HARD_CARDS;
        break;
    case "US":
        mapArray = USA_CARDS;
        break;
    case "Khorvaire":
        mapArray = KHORVAIRE_CARDS;
        break;
    case "Easteros":
        mapArray = EASTEROS_CARDS;
        break;
    default:
        window.alert("SOMETHING WENT WRONG! I DONT KNOW WHAT, BUT SOMETHING IS VERY WRONG! GET OUT OF HERE QUICK!");
}



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
                           

/*============================= COLOR CHANGING FUNCTIONS ==========================*/

//This is the function that changes color of the individual areas
function changeColor(id, color) {

	
	this.id = id;
	this.color = color;
	//console.log(id);

	/*PHP to get the army color based on playerID
	*/
	
	
	
	// generate random color
    //var color = Math.floor( Math.random() * 0xffffff );

	// update US color in data
	var area = map.getObjectById(id);
	console.log(area);
	area.color = color;
	area.colorReal = area.color;
    
	// make the chart take in new color
	//map.returnInitialColor(area);
}


/*======================== REGION ASSIGNMENT ========================*/


var mapArrayLength = mapArray.length;
var regionAssignArray = [];
/*
for (var i = 0; i < mapArrayLength; i++)
{
	regionAssignArray[i] = i;
}
*/

shuffle(mapArray); //Shuffles the array of regions for random region assignment
var regionsPerPlayer = (mapArrayLength / numPlayers); //Variable to define the number of regions per player. the last player will recieve any leftover regions
var arrayCounter = 0; //Used to iterate through the region array
console.log(regionsPerPlayer);
var i;
for (i = 1; i <= numPlayers; i++) {

	console.log("PLAYER " + i);
	for (var x = 1; x <= regionsPerPlayer; x++, arrayCounter++) {
		console.log(arrayCounter + " " + mapArray[arrayCounter].id + " " + PLAYER[i].color);
		changeColor(mapArray[arrayCounter].id, PLAYER[i].color);
	}
}

if (arrayCounter != mapArrayLength) {
	for (var x = arrayCounter; x < mapArrayLength; x++, arrayCounter++) {
		console.log(arrayCounter + " " + mapArray[arrayCounter].id + " " + PLAYER[i-1].color);
		changeColor(mapArray[arrayCounter].id, PLAYER[i-1].color);
	}
}
    map.write("mapdiv");


function shuffle(array) {
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


/*============================== ONCLICK FUNCTIONS ==================================*/

var attacker;
var defender;
var attackBool = 0;

map.addListener("clickMapObject", function (event) {
						
	
	var selectedArea = event.mapObject.id;
	var selectedColor = selectedArea;
	console.log("selected area: " + selectedArea);
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





/*=========================== TEAM TERRITORY CHOOSING ==============================*/





