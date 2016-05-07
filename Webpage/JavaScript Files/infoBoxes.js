

//Get the <span> element that closes the modal
var span = document.getElementById("closeModal");
console.log(span);

//Get the modal
var ContactModal = document.getElementById('ContactModal');
ContactModal.style.display = "none";

//Get the button to open the modal
var contactBtn = document.getElementById("Contact");

//When the user clicks on the button, open the contact modal
contactBtn.onclick = function() {
	if (ContactModal.style.display == "none") {
		ContactModal.style.display = "block";
	}
	else if (ContactModal.style.display == "block") {
		ContactModal.style.display = "none";
	}
}

//When the user clicks on <span> (X), close the modal
span.onclick = function() {
	ContactModal.style.display = "none";
}
/*
var LeaderboardModal = document.getElementById('LeaderboardModal');

//Get the button to open the modal
var LeaderboardBtn = document.getElementById("Leaderboard");

//When the user clicks on the button, open the Leaderboard modal
LeaderboardBtn.onclick = function() {
	LeaderboardModal.style.display = "block";
}

//When the user clicks on <span> (X), close the modal
span.onclick = function() {
	LeaderboardModal.style.display = "none";
}


var GameRulesModal = document.getElementById('GameRulesModal');

//Get the button to open the modal
var GameRulesBtn = document.getElementById("GameRules");

//When the user clicks on the button, open the Leaderboard modal
GameRulesBtn.onclick = function() {
	GameRulesModal.style.display = "block";
}

//When the user clicks on <span> (X), close the modal
span.onclick = function() {
	GameRulesModal.style.display = "none";
}*/