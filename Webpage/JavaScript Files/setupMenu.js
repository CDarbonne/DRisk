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

//When the user clicks on the button, the game will create a game based on the settings chosen
startBtn.onclick = function() {
	var numPlayerSelect = document.getElementById("numPlayers");
	var teamColorSelect = document.getElementById("teamColor");
	var teamName = document.getElementById("TeamName");
	var mapSelect = document.getElementById("mapSelect");
	console.log(numPlayerSelect.value);
	console.log(teamColorSelect.value);
	console.log(mapSelect.value);
	console.log(teamName.value);
	window.location.href = 'Maps/EasyMap.html';
	//document.write("<script src="EasyMap.js" type="text/javascript"></script>");
}

/*//When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
}*/