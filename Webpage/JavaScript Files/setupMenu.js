//Get the modal
var modal = document.getElementById('setupMenu');

//Get the button to open the modal
var playBtn = document.getElementById("playGame");

//Get the button to start the game in the setup menu
var startBtn = document.getElementById("StartButton");

//Get the <span> element that closes the modal
var span = document.getElementById("closeMenu");

//When the user clicks on the button, open the modal
playBtn.onclick = function() {
	modal.style.display = "block";
}

//When the user clicks on <span> (X), close the modal
span.onclick = function() {
	modal.style.display = "none";
}

//object = document.getElementById("numPlayers");
//object.oninput = adjustMenu();

//When the user changes the number of players:
function adjustMenu() {

	var numPlayerSelect = document.getElementById("numPlayers");

	console.log("yo");
	console.log(numPlayerSelect.value);

	if (numPlayerSelect.value >= 1) {

		var div = document.getElementById("menuBody");

		var newMenu =" <p>";
        newMenu +="Number of Players: ";
        newMenu +="<select id = \"numPlayers\" oninput = \"adjustMenu()\">";
        newMenu +="   <option value=\"Number of Players\">---------------</option>";
            
        for (var x = 1; x <= 4; x++) {

        	console.log(x);
        	if (x == numPlayerSelect.value){
        	newMenu +="   <option value=\"" + x + "\" selected= \"selected\">" + x + "</option>";
        	console.log("selected");
        	}
        	else {
        	newMenu +="   <option value=\"" + x + "\">" + x + "</option>";
        	}


        }
        newMenu +=" </select>";

		for (var i = 1; i <= numPlayerSelect.value; i++) {

			newMenu +="	<p>";
	        newMenu +="<h4>Player " + i + "</h4>";
	        newMenu +="    Team Color:";
	        newMenu +="    <select id = \"teamColor" + i + "\" >";
	        newMenu +="      <option value=\"Team Color\">----------------</option>";
	        newMenu +="      <option value=\"Red\">Red</option>";
	        newMenu +="      <option value=\"Green\">Green</option>";
	        newMenu +="       <option value=\"Purple\">Purple</option>";
	        newMenu +="       <option value=\"Blue\">Blue</option>";
	        newMenu +="       <option value=\"Yellow\">Yellow</option>";
	        newMenu +="    </select>";
	        newMenu +=" </p><p>";
	        newMenu +="    Team Name: <input type = \"text\" name = \"TeamName\" id = \"TeamName" + i + "\">";
	        newMenu +=" </p><p>";
	        

	        

			//console.log("got here");
		}

		
        newMenu +=" <p><br>";
        newMenu +="    Map:";
        newMenu +="    <select id = \"mapSelect\" required>";
        newMenu +="       <option value=\"Map\">----------------</option>";
        newMenu +="       <option value=\"Easy\">Easy</option>";
        newMenu +="       <option value=\"Medium\">Medium</option>";
        newMenu +="       <option value=\"Hard\">Hard</option>";
        newMenu +="       <option value=\"US\">United States</option>";
        newMenu +="       <option value=\"Khorvaire\">Khorvaire</option>";
        newMenu +="       <option value=\"Easteros\">Easteros</option>";

        newMenu +="    </select>";
        newMenu +=" </p>";
		div.innerHTML = newMenu;
	}
}

//When the user clicks on the button, the game will create a game based on the settings chosen
startBtn.onclick = function() {

	//Get the values chosen for game setup
	var numPlayerSelect = document.getElementById("numPlayers");
	var mapSelect = document.getElementById("mapSelect");

	if (numPlayerSelect.value == "Number of Players") {
		window.alert("Please fill in all available fields!");
		console.log("Users are dumb...");
		return;
	}

	
	for (var i = 1; i <= numPlayerSelect.value; i++) {

		var teamColorSelect = document.getElementById("teamColor" + i);
		var teamName = document.getElementById("TeamName" + i);

		if (numPlayerSelect.value == "Number of Players" || teamColorSelect.value == "Team Color" || teamName.value == "" || mapSelect.value == "Map") {
				window.alert("Please fill in all available fields!");
				console.log("Users are dumb...");
				return;
		}

		else {
			localStorage.setItem('teamColor' + i, JSON.stringify(teamColorSelect.value));
	    	localStorage.setItem('teamName' + i, JSON.stringify(teamName.value));
		}

	}
		/*
		//Erase all previously saved values
		localStorage.setItem('numPlayers', JSON.stringify(0));
		localStorage.setItem('teamColor', JSON.stringify(0));
		localStorage.setItem('teamName', JSON.stringify(0));
		localStorage.setItem('mapSelect', JSON.stringify(0));
		*/

		//Save new values for setup
	    localStorage.setItem('numPlayers', JSON.stringify(numPlayerSelect.value));
	    localStorage.setItem('mapSelect', JSON.stringify(mapSelect.value));

/*
	    //Test values recieved
		console.log(numPlayerSelect.value);
		console.log(teamColorSelect.value);
		console.log(mapSelect.value);
		console.log(teamName.value);
*/
		//Load game page
		//window.location.href = 'Maps/'+mapSelect.value+'Map.html';
		window.location.href = 'Maps/SuperMap.html';

}



//When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
}