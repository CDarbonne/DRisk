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
					selectable: true,
			        selectedColor : "green"
					
			    };

			    // let's say we want a small map to be displayed, so let's create and add it to the map
			    map.smallMap = new AmCharts.SmallMap();

			    // write the map to container div
			    map.write("mapdiv");

				
		


/*============================== ONCLICK FUNCTIONS ==================================*/

var attacker;
var defender;
var attackBool = 0;

map.addListener("clickMapObject", function (event) {
						
	var selectedArea = event.mapObject.title;
	var selectedColor = selectedArea;
	//window.alert("You selected " +  selectedArea);
	selectedColor.color = '#fff00';
	selectedColor.colorReal = selectedColor.color;
	map.returnInitialColor(selectedColor);

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
});

});


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
        else if(attackDice[i] === defendDice[j])
        {
            //Console test output
            console.log("Tie, Defenders win.");
        }
    }
}
}
