/*======================== AMMAP MAP CREATION FUNCTION ========================*/


			var map;
			AmCharts.theme = AmCharts.themes.black;
			// add all your code to this method, as this will ensure that page is loaded
			AmCharts.ready(function() {
			    // create AmMap object
			    map = new AmCharts.AmMap();
				map.balloon.color = "#000000"

			    // set path to images


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
					//selectable: true,
			        selectedColor : "blue"
					
			    };

			    // let's say we want a small map to be displayed, so let's create and add it to the map
			    map.smallMap = new AmCharts.SmallMap();

			    // write the map to container div
			    map.write("mapdiv");
                           
                           
						   //This is the function that changes color of the individual
						   //areas
                           function test() {
                            // generate random color
                            //var color = Math.floor( Math.random() * 0xffffff );
    
                            // update US color in data
                            var area = map.getObjectById("Winterfell");
                            area.color = '#5e3513';
                            area.colorReal = area.color;
    
                            // make the chart take in new color
                            //map.returnInitialColor(area);
							}





/*============================= COLOR CHANGING FUNCTIONS ==========================*/

//This is the function that changes color of the individual areas
function changeColor(id) {

	this.id = id;
	console.log(id);

	// generate random color
    //var color = Math.floor( Math.random() * 0xffffff );

	// update US color in data
	var area = map.getObjectById(id);
	area.color = '#5e3513';
	area.colorReal = area.color;
    
	// make the chart take in new color
	//map.returnInitialColor(area);
}


/*=============================TEST LOCAL STORAGE==================================*/

var numPlayers = JSON.parse(localStorage.getItem('numPlayers'));
var teamColor = JSON.parse(localStorage.getItem('teamColor'));
var teamName = JSON.parse(localStorage.getItem('teamName'));
var mapSelect = JSON.parse(localStorage.getItem('mapSelect'));



console.log("testing");
console.log(numPlayers);	
console.log(teamColor);
console.log(teamName);
console.log(mapSelect);			
		


/*============================== ONCLICK FUNCTIONS ==================================*/

var attacker;
var defender;
var attackBool = 0;

map.addListener("clickMapObject", function (event) {
						
	var selectedArea = event.mapObject.id;
	var selectedColor = selectedArea;
	console.log("selected area: " + selectedArea);
	changeColor(selectedArea);
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





