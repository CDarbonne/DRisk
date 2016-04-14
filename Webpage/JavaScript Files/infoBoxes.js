//Get the modal
var ContactModal = document.getElementById('ContactModal');

//Get the button to open the modal
var contactBtn = document.getElementById("Contact");

//Get the button to start the game in the setup menu
var rulesBtn = document.getElementById("GameRules");

//Get the <span> element that closes the modal
var span = document.getElementsByClassName("closeModal")[0];

//When the user clicks on the button, open the modal
contactBtn.onclick = function() {
	ContactModal.style.display = "block";
}

//When the user clicks on <span> (X), close the modal
span.onclick = function() {
	ContactModal.style.display = "none";
}
