const cards = document.querySelectorAll(".card"),
  timeTag = document.querySelector(".time b"),
  flipsTag = document.querySelector(".flips b"),
  refreshBtn = document.querySelector(".details button");
const timeLeftElement = document.querySelector(".time-left");
const timerPop = document.querySelector(".win-pop");
const timesUpPop = document.querySelector(".times-up-pop");
const closeButton = timesUpPop.querySelector(".close-button");

closeButton.addEventListener("click", () => {
  timesUpPop.classList.remove("active");
  startGame();
});

let maxTime = 20;
let timeLeft = maxTime;
let flips = 0;
let matchedCard = 0;
let isPlaying = false;
let cardOne = null;
let cardTwo = null;
let timer = null;

function initTimer() {
  if (timeLeft <= 0) {
    clearInterval(timer);
    timeLeft = 0;
    timeTag.innerText = timeLeft;
    timeLeftElement.textContent = timeLeft;
    timesUpPop.classList.add("active");
  } else {
    timeLeft--;
    timeTag.innerText = timeLeft;
    timeLeftElement.textContent = timeLeft;
  }
}

function flipCard({ target: clickedCard }) {
  if (!isPlaying) {
    isPlaying = true;
    timer = setInterval(initTimer, 1000);
  }
  if (clickedCard !== cardOne && !cardOne) {
    cardOne = clickedCard;
    cardOne.classList.add("flip");
  } else if (clickedCard !== cardOne && !cardTwo) {
    cardTwo = clickedCard;
    cardTwo.classList.add("flip");
    disableCardClick(); // Disable card clicks until we check for a match
    checkForMatch();
  }
}

function checkForMatch() {
  if (cardOne && cardTwo) {
    let cardOneImg = cardOne.querySelector(".back-view img").src;
    let cardTwoImg = cardTwo.querySelector(".back-view img").src;

    if (cardOneImg === cardTwoImg) {
      matchedCard++;
      cardOne.removeEventListener("click", flipCard);
      cardTwo.removeEventListener("click", flipCard);
      cardOne = null;
      cardTwo = null;
      enableCardClick(); // Re-enable card clicks
      if (matchedCard === 6) {
        clearInterval(timer);
        timerPop.classList.add("active");
      }
    } else {
      setTimeout(() => {
        cardOne.classList.remove("flip");
        cardTwo.classList.remove("flip");
        cardOne = null;
        cardTwo = null;
        enableCardClick(); // Re-enable card clicks
      }, 1000);
    }
  }
}

function disableCardClick() {
  cards.forEach(card => card.removeEventListener("click", flipCard));
}

function enableCardClick() {
  cards.forEach(card => card.addEventListener("click", flipCard));
}

function startGame() {
  timeLeft = maxTime;
  flips = 0;
  matchedCard = 0;
  cardOne = null;
  cardTwo = null;
  clearInterval(timer);
  timeTag.innerText = timeLeft;
  flipsTag.innerText = flips;
  isPlaying = false;
  enableCardClick();
  shuffleCard();
}

function shuffleCard() {
  // Implement card shuffling logic here
}

startGame();

refreshBtn.addEventListener("click", startGame);
