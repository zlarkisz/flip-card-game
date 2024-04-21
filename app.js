const section = document.querySelector("section");
const playerLivesCount = document.querySelector("span");
let playerLives = 6;

playerLivesCount.textContent = playerLives;

function getData() {
  return [
    { imgSrc: "./images/anya1.jpeg", name: "Anya1" },
    { imgSrc: "./images/anya2.jpeg", name: "Anya2" },
    { imgSrc: "./images/anya3.jpeg", name: "Anya3" },
    { imgSrc: "./images/gleb1.jpg", name: "Gleb1" },
    { imgSrc: "./images/gleb2.jpeg", name: "Gleb2" },
    { imgSrc: "./images/haska1.jpeg", name: "Haska1" },
    { imgSrc: "./images/haska2.jpeg", name: "Haska2" },
    { imgSrc: "./images/persic1.jpeg", name: "Persic1" },
    { imgSrc: "./images/anya1.jpeg", name: "Anya1" },
    { imgSrc: "./images/anya2.jpeg", name: "Anya2" },
    { imgSrc: "./images/anya3.jpeg", name: "Anya3" },
    { imgSrc: "./images/gleb1.jpg", name: "Gleb1" },
    { imgSrc: "./images/gleb2.jpeg", name: "Gleb2" },
    { imgSrc: "./images/haska1.jpeg", name: "Haska1" },
    { imgSrc: "./images/haska2.jpeg", name: "Haska2" },
    { imgSrc: "./images/persic1.jpeg", name: "Persic1" },
  ];
}

function randomize() {
  const cardData = getData();

  cardData.sort(() => Math.random() - 0.5);

  return cardData;
}

function createCard() {
  const cardData = randomize();

  cardData.forEach((element) => {
    const card = document.createElement("div");
    const face = document.createElement("img");
    const back = document.createElement("div");

    card.classList = "card";
    face.classList = "face";
    back.classList = "back";

    card.setAttribute("name", element.name);
    face.src = element.imgSrc;

    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

    card.addEventListener("click", (e) => {
      card.classList.toggle("toggleCard");
      checkCards(e);
    });
  });
}

function checkCards({ target }) {
  const clickedCard = target;

  clickedCard.classList.add("flipped");

  const flippedCards = document.querySelectorAll(".flipped");
  const toggleCards = document.querySelectorAll(".toggleCard");
  console.log(flippedCards);

  if (flippedCards.length === 2) {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.getAttribute("name") === secondCard.getAttribute("name")) {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      firstCard.style.pointerEvents = "none";
      secondCard.style.pointerEvents = "none";
    } else {
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        setTimeout(() => card.classList.remove("toggleCard"), 1000);
      });

      playerLives--;
      playerLivesCount.textContent = playerLives;

      if (playerLives === 0) {
        restartGame();
      }
    }
  }

  if (toggleCards.length === 16) {
    restartGame("👍 You Win! 👍");
  }
}

function restartGame(alertText = "👎 Try Again 👎") {
  const cardData = randomize();
  const faces = document.querySelectorAll(".face");
  const cards = document.querySelectorAll(".card");
  section.style.pointerEvents = "none";

  cardData.forEach((item, index) => {
    cards[index].classList.remove("toggleCard");

    setTimeout(() => {
      cards[index].style.pointerEvents = "all";
      cards[index].setAttribute("name", item.name);
      faces[index].src = item.imgSrc;

      section.style.pointerEvents = "all";
    }, 1000);
  });

  playerLives = 5;
  playerLivesCount.textContent = playerLives;

  setTimeout(() => alert(alertText), 500);
}

createCard();
