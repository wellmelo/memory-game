const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const nomeplayer = document.querySelector('.nomeplayer');

const timer = document.querySelector('.timer');
const timerMinutes = document.querySelector('.timer-minutes');
const timerSeconds = document.querySelector('.timer-seconds');

const timerMinutesmodal = document.querySelector('.timer-minutesmodal');
const timerSecondsmodal = document.querySelector('.timer-secondsmodal');

const timerdois = document.querySelector('.timerdois');
const refresh = document.querySelector('.refresh');

// MODAL 1
// Pega o modal
var modal = document.getElementById('myModal');

// Pega o botão que abre o modal
var btn = document.getElementById('myBtn');

// Pega o elemento <span> que fecha o modal
var span = document.getElementsByClassName('close')[0];

// Quando o usuário clicar em <span> (x), feche o modal
span.onclick = function () {
    modal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};
// FIM MODAL 1

// MODAL 2
// Get the modal
var modal2 = document.getElementById('myModal2');

// Get the button that opens the modal
var btn2 = document.getElementById('myBtn2');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName('close2')[0];

// When the user clicks the button, open the modal
btn2.onclick = function () {
    modal2.style.display = 'block';
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal2.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal2) {
        modal2.style.display = 'none';
    }
};
// FIM MODAL 2

const characters = [
    'vedita',
    'freeza',
    'chaos',
    'dabura',
    'cell',
    'goku',
    'magromajinboo',
    'mrsatan',
    'picolo',
    'majinboogordo',
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    refresh.style.display = 'none';

    return element;
};

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if (disabledCards.length === 2) {
        clearInterval(this.loop);

        // Salva o tempo no localStorage
        const time = timerCombined.innerHTML;
        localStorage.setItem('tempo', time);

        // Quando ganha, exibe o modal
        modal.style.display = 'block';
        refresh.style.display = 'inline';
    }
};

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter === secondCharacter) {
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secondCard = '';

        checkEndGame();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';
        }, 500);
    }
};

const revealCard = ({ target }) => {
    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }

    if (firstCard === '') {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    } else if (secondCard === '') {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();
    }
};

const createCard = (character) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../images/${character}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character);

    return card;
};

const loadGame = () => {
    const duplicateCharacters = [...characters, ...characters];

    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

    shuffledArray.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    });
};

const startTimer = () => {
    let seconds = 0;

    this.loop = setInterval(() => {
        seconds++;

        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        // Atualiza o timer de minutos e segundos combinados
        timerCombined.innerHTML =
            String(minutes).padStart(2, '0') +
            ':' +
            String(remainingSeconds).padStart(2, '0');

        timerCombined2.innerHTML =
            String(minutes).padStart(2, '0') +
            ':' +
            String(remainingSeconds).padStart(2, '0');

        // Atualiza o timer de minutos e segundos separados
        timerMinutes.innerHTML = String(minutes).padStart(2, '0');
        timerSeconds.innerHTML = String(remainingSeconds).padStart(2, '0');
    }, 1000);
};

const playerName = localStorage.getItem('player');
const tempo = localStorage.getItem('tempo');

// cria um objeto com o nome do jogador e o tempo que ele levou para finalizar o jogo
const jogador = {
    nome: localStorage.getItem('player'),
    tempo: localStorage.getItem('tempo'),
};

// adiciona o objeto ao array de ranking
const ranking = [];
ranking.push(jogador);

// classifica o array de ranking com base no tempo de cada jogador
ranking.sort(function (a, b) {
    return a.tempo - b.tempo;
});

// seleciona o elemento onde o ranking será exibido
const rankingContainer = document.getElementById('ranking');

// classifica o array de ranking com base no tempo de cada jogador
ranking.sort(function (a, b) {
    return a.tempo - b.tempo;
});

// percorre o array de ranking e cria elementos HTML para cada posição do ranking
ranking.forEach(function (jogador, indice) {
    // cria um elemento de lista
    const listaItem = document.createElement('li');
    listaItem.textContent = `${indice + 1}. ${jogador.player} - ${
        jogador.tempo
    } segundos`;

    // adiciona o elemento de lista ao container do ranking
    rankingContainer.appendChild(listaItem);
});

window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player');
    nomeplayer.innerHTML = localStorage.getItem('player');

    startTimer();
    loadGame();
};

console.log(localStorage);
