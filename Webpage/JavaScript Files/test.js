	
/*============================== CARD FUNCTIONS ===================================*/
		
//function displayDeck(deck, id) {
function displayDeck(id) {
  var div = document.getElementById(id);
  var functionNumber;
  
  var count = 0;
  //deck.forEach(function(e) {

  console.log(id);
  console.log(document.getElementById(id));
  console.log(document.getElementById("card"));

  
    //var currentCard = '<div id="'+e.suit+e.num+'" class="moveContainer" onmousedown="generalFunction('+functionNumber+', this);">';
	var currentCard = '<div id="Australia" class="moveContainer">';
    currentCard += '    <div class="cardContainer">';
    currentCard += '      <div class="cardFront"><img src="../images/Cards/Easy/Australia.png" width="100"/></div>';
    //currentCard += '      <div class="cardBack"><img src="../images/Cards/back.gif" /></div>';
    currentCard += '    </div>';
    currentCard += '</div>';

    if (count == 0) {
      div.innerHTML = currentCard;
    }
    else {
    div.innerHTML = div.innerHTML + currentCard;
    }
    //count++;
  //});
}		
		
function moveCardOverTime(card, xPos, yPos, time) {
  // m = moveContainer
  var m = document.getElementById(''+card.suit+card.num);

  m.style.transition = 'all '+time+'ms';
  m.style.transform = 'translate('+xPos+'px,'+yPos+'px)';
  m.classList.toggle('moveCard');
}

console.log("end");


displayDeck("card");
		