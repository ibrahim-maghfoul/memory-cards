const cardsContainer = document.getElementById("cards-container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const currentEl = document.getElementById("current");
const showBtn = document.getElementById("show");
const hideBtn = document.getElementById("hide");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const addCardBtn = document.getElementById("add-card");
const clearBtn = document.getElementById("clear");
const addContainer = document.getElementById("add-container");

// Functions

// keep track of cureent card
let currentActiveCard = 0;

//Store DOM cards
const cardsEl = [];

// Store card data
const cardsData = getCardsData();

// const cardsData = [
//   {
//     question: "What is PHP?",
//     answer: "It's a programming languge",
//   },
//   {
//     question: "What is Java?",
//     answer: "It's a programming languge",
//   },
//   {
//     question: "What is HTML?",
//     answer: "hypertext markup language",
//   },
// ];

// Creat all cards

function createCards() {
  cardsData.forEach((card, index) => createCard(card, index));
}

//Create a single card
function createCard(data, index) {
  const card = document.createElement("div");
  card.classList.add("card");
  if (index === 0) {
    card.classList.add("active");
  }
  card.innerHTML = `<div class="inner-card">
  <div class="inner-card-front">
    <p>${data.question}</p>
  </div>
  <div class="inner-card-back">
    <p>${data.answer}</p>
  </div>
</div>`;

  card.addEventListener("click", () => {
    card.classList.toggle("show-answer");
  });
  // add to dom cards

  cardsEl.push(card);
  cardsContainer.appendChild(card);

  updateCurentText();
}

//Show number of cards
function updateCurentText() {
  currentEl.innerText = `${currentActiveCard + 1} /${cardsEl.length}`;
}

// Get cards from locate storage
function getCardsData() {
  const cards = JSON.parse(localStorage.getItem("cards"));
  return cards === null ? [] : cards;
}

// Set Cards Data in local storage
function setCardsData(cards) {
  localStorage.setItem("cards", JSON.stringify(cards));
  window.location.reload();
}

createCards();

// Event Listners

nextBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card left";
  currentActiveCard = currentActiveCard + 1;

  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1;
  }

  cardsEl[currentActiveCard].className = "card active";
  updateCurentText();
});
prevBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card right";
  currentActiveCard = currentActiveCard - 1;

  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }

  cardsEl[currentActiveCard].className = "card active";
  updateCurentText();
});

showBtn.addEventListener("click", () => addContainer.classList.add("show"));

hideBtn.addEventListener("click", () => addContainer.classList.remove("show"));

addCardBtn.addEventListener("click", () => {
  const question = questionEl.value;
  const answer = answerEl.value;

  if (question.trim() && answer.trim()) {
    const newCard = { question, answer };
    createCard(newCard);

    questionEl.value = "";
    answerEl.value = "";

    addContainer.classList.remove("show");
    cardsData.push(newCard);
    setCardsData(cardsData);
  }
});

clearBtn.addEventListener("click", () => {
  localStorage.clear();
  cardsContainer.innerHTML = "";
  window.location.reload();
});
