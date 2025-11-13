const images = [
  "hello kitty surf.jpg",
  "my melody.jpg",
  "kuromi.jpg",
  "keroppi.jpg",
  "cinemorool.jpg",
  "Hello kitty.jpg",
  "sanrio.jpg",
  "love.jpg"
];

const gameContainer = document.querySelector(".memory-game");
const flipSound = document.getElementById("flip-sound");
const matchSound = document.getElementById("match-sound");
const errorSound = document.getElementById("error-sound");
const winSound = document.getElementById("win-sound");

let cards = [...images, ...images]; // cria pares
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

// Embaralha as cartas
cards.sort(() => 0.5 - Math.random());

// Cria as cartas na tela
cards.forEach(img => {
  const card = document.createElement("div");
  card.classList.add("memory-card");
  card.innerHTML = `
    <img class="front-face" src="${img}" alt="">
    <div class="back-face">?</div>
  `;
  card.addEventListener("click", flipCard);
  gameContainer.appendChild(card);
});

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");
  flipSound.play();

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch =
    firstCard.querySelector(".front-face").src ===
    secondCard.querySelector(".front-face").src;

  if (isMatch) {
    disableCards();
  } else {
    playErrorSound();
    unflipCards();
  }
}

function disableCards() {
  matchSound.play();
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();

  // Verifica vitória
  if (document.querySelectorAll(".flip").length === cards.length) {
    setTimeout(() => {
      winSound.play();
      alert("🎉 Parabéns! Você completou o jogo!");
    }, 500);
  }
}

function playErrorSound() {
  errorSound.currentTime = 0;
  errorSound.play();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}