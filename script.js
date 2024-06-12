const cardsArray = [
    { name: 'apple', img: '🍎' },
    { name: 'banana', img: '🍌' },
    { name: 'cherry', img: '🍒' },
    { name: 'grape', img: '🍇' },
    { name: 'lemon', img: '🍋' },
    { name: 'orange', img: '🍊' },
    { name: 'peach', img: '🍑' },
    { name: 'pear', img: '🍐' }
];

let gameBoard = document.getElementById('game-board');
let restartButton = document.getElementById('restart-button');
let congratsMessage = document.getElementById('congrats-message');
let movesElement = document.getElementById('moves');
let timeElement = document.getElementById('time');
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let timer = null;
let time = 0;
let firstMoveMade = false;

function initGame() {
    cards = [...cardsArray, ...cardsArray]; // Duplicate cards array for pairs
    cards.sort(() => 0.5 - Math.random()); // Shuffle cards
    gameBoard.innerHTML = '';
    congratsMessage.classList.add('hidden');
    moves = 0;
    movesElement.textContent = moves;
    matchedPairs = 0;
    time = 0;
    timeElement.textContent = time;
    clearInterval(timer);
    firstMoveMade = false;

    cards.forEach(card => {
        let cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.name = card.name;
        cardElement.innerHTML = `
            <div class="card-front">${card.img}</div>
            <div class="card-back"></div>
        `;
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

function startTimer() {
    timer = setInterval(() => {
        time++;
        timeElement.textContent = time;
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

function flipCard() {
    if (!firstMoveMade) {
        firstMoveMade = true;
        startTimer();
    }

    if (flippedCards.length < 2 && !this.classList.contains('flip')) {
        this.classList.add('flip');
        flippedCards.push(this);
        moves++;
        movesElement.textContent = moves;

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    let [card1, card2] = flippedCards;

    if (card1.dataset.name === card2.dataset.name) {
        matchedPairs++;
        if (matchedPairs === cardsArray.length) {
            stopTimer();
            setTimeout(() => {
                congratsMessage.classList.remove('hidden');
            }, 500);
        }
    } else {
        card1.classList.remove('flip');
        card2.classList.remove('flip');
    }
    flippedCards = [];
}

restartButton.addEventListener('click', initGame);
initGame();
