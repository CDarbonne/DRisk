function moveCardOverTime(card, xPos, yPos, time) {
  // m = moveContainer
  var m = document.getElementById(card.id);
  console.log(m);


  m.style.transition = 'all '+time+'ms';
  m.style.transform = 'translate('+xPos+'px,'+yPos+'px)';
  m.classList.toggle('moveCard');
}

function flipCardOverTime(card, time) {
	// f = flipContainer
  var m = document.getElementById(''+card.id);
  var f = m.getElementsByClassName('flipContainer')[0];

  f.style.transition = 'all '+time+'ms';
  f.classList.toggle('flipCard');
  if ((localStorage.getItem('replayBool') == 1) && localStorage.getItem('initialFlipBool') == 1) {
    return;
  }
  card.isFaceUp = !card.isFaceUp;

}

function dealDeck(cardArray, coordinatesArray, moveTime, intervalTime) {
  var cardDistributerCounter = 0;

  /*
  var cardDistributerInterval = setInterval(function() {
    moveCardOverTime(cardArray[cardDistributerCounter],
      coordinatesArray[cardDistributerCounter][0],
      coordinatesArray[cardDistributerCounter][1],
      moveTime);
*/

	var cardDistributerInterval = setInterval(function() {
    moveCardOverTime(cardArray[cardDistributerCounter],
      coordinatesArray[cardDistributerCounter][0],
      coordinatesArray[cardDistributerCounter][1],
      moveTime);
	
    cardDistributerCounter++;
    if(cardDistributerCounter === cardArray.length) {
      clearInterval(cardDistributerInterval);
    }
  }, intervalTime);
}
