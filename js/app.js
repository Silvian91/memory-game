let cards = document.getElementsByClassName("card");
cards = Array.from(cards);

const shuffled = shuffle(cards);
let deck = document.getElementsByClassName('deck')[0];
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

const hasClass = (element, className) =>
element.classList.contains(className)

let openCard = 0;
let storedCards = [];
let turnedCards = [];

const cardClicked = (event) => {
  const card = event.target;
  const open = hasClass(card, 'open');
  const solved = false; // calculate if this card has class 'solved'
  if (open) {
    console.log('card is already opened')
  } else {
    card.classList.add('open', 'show');
    const alreadyCLicked = document.getElementsByClassName('match')
    card.removeEventListener('click', alreadyCLicked);
    turnedCards.push(card);
    storedCards.push(card.childNodes[1]);
    if (storedCards[0].className === storedCards[1].className) {
      turnedCards[0].classList.add('match');
      turnedCards[1].classList.add('match');
      storedCards.splice(0, 2);
      turnedCards.splice(0, 2);
    } else {
      turnedCards[1].classList.add('incorrect');
      let timerFunction = setTimeout(function() {
        let incorrectCards = document.querySelectorAll('.show:not(.match)');
        for (var i = 0; i <= incorrectCards.length; i++) {
          incorrectCards[i].classList.remove('open', 'show', 'incorrect');
          incorrectCards[i].classList.remove('open', 'show', 'incorrect');
        }
      }, 500);
      storedCards.splice(0, 2);
      turnedCards.splice(0, 2);
    }
  }
}

cards.forEach((card) =>
card.addEventListener('click', cardClicked)
);

/*
* set up the event listener for a card. If a card is clicked:
*  - display the card's symbol (put this functionality in another function that you call from this one)
*  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
*  - if the list already has another card, check to see if the two cards match
*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
*    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
*    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
*/
