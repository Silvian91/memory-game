//functionality for shuffling cards:
let cards = document.getElementsByClassName("card");
cards = Array.from(cards);

const shuffled = shuffle(cards);
const deck = document.getElementsByClassName('deck')[0];
deck.innerHTML = '';
shuffled.forEach(item => deck.appendChild(item));

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

const hasClass = (element, className) => element.classList.contains(className);
const openCard = 0;
const storedCards = [];
const turnedCards = [];

const hasMatchedCards = (storedCards) => {
  return storedCards.length === 2 &&
           storedCards[0].className === storedCards[1].className
}

//functionality for restarting the game:
const restartButton = document.querySelector('.fa-repeat');
const restartGame = (event) => {
  window.location.reload(true);
}

//timer start and stop functionality:
let firstCardClicked = (event) => {
  const card = event.target;
  let timer = setInterval(iteration, 1000);
  let counter = 0;
  function iteration() {
    document.querySelector('.timer').innerHTML = counter++;
    if (document.querySelectorAll('.match').length == 16) {
      clearInterval(timer);
    }
  }
  cards.forEach(card => card.removeEventListener('click', firstCardClicked));
}

//functionality for increasing moves and changing stars:
let moves = 1;
const movesHTMLSelector = document.querySelector('.moves');
const firstStar = document.querySelector('.first');
const secondStar = document.querySelector('.second');
const thirdStar = document.querySelector('.third');
function increaseMoves() {
   movesHTMLSelector.innerHTML = moves++;
   if (movesHTMLSelector.innerHTML == 20) {
   firstStar.classList.add('fa-star-o');
   }
   if (movesHTMLSelector.innerHTML == 40) {
   secondStar.classList.add('fa-star-o');
   }
   if (movesHTMLSelector.innerHTML == 60) {
   thirdStar.classList.add('fa-star-o');
   }
}

//functionality for clicking and matching/not matching cards:
const cardClicked = (event) => {
  const card = event.target;
  const open = hasClass(card, 'open');
  const alreadyCLicked = document.getElementsByClassName('match');
  const getCardsForStar = document.getElementsByClassName('red');
  card.classList.add('open', 'show');
  card.removeEventListener('click', alreadyCLicked);
  turnedCards.push(card);
  storedCards.push(card.childNodes[1]);
  increaseMoves();
  if (hasMatchedCards(storedCards)) {
    turnedCards.forEach(card => card.classList.add('match'));
    storedCards.splice(0, 2);
    turnedCards.splice(0, 2);
  } else if (turnedCards[1]) {
    turnedCards[1].classList.add('red');
    const timerFunction = setTimeout(function() {
      const incorrectCards = document.querySelectorAll('.show:not(.match)');
      Array.from(incorrectCards).forEach(card => {
        card.classList.remove('open', 'show', 'red');
      });
    }, 500);
    storedCards.splice(0, 2);
    turnedCards.splice(0, 2);
  }
}

// click events for timer and cards:
cards.forEach(card => {
  card.addEventListener('click', cardClicked);
  card.addEventListener('click', firstCardClicked);
});

restartButton.addEventListener('click', restartGame);

/*
* set up the event listener for a card. If a card is clicked:
*  - display the card's symbol (put this functionality in another function that you call from this one)
*  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
*  - if the list already has another card, check to see if the two cards match
*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
*    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
*     if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
*/
