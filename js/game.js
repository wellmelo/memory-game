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
const rankButton = document.querySelector('.rankButton');

// MODAL 1
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById('myBtn');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName('close')[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
    modal.style.display = 'block';
};

// When the user clicks on <span> (x), close the modal
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
    rankButton.style.display = 'none';

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
        rankButton.style.display = 'inline';

        // Recupera os dados do localStorage
        const nomeUsuario = localStorage.getItem('player');
        const tempoJogo = localStorage.getItem('tempo');

        // Cria um objeto que contém as informações do resultado
        const resultado = {
            nome: nomeUsuario,
            tempo: tempoJogo,
        };

        // Recupera o histórico de resultados do localStorage ou cria um novo se não houver
        const historico = JSON.parse(localStorage.getItem('historico')) || [];

        // Adiciona o novo resultado ao histórico
        historico.push(resultado);

        // Classifica o histórico em ordem crescente de tempo
        historico.sort((a, b) => a.tempo - b.tempo);

        // Armazena o histórico atualizado no localStorage
        localStorage.setItem('historico', JSON.stringify(historico));

        // Percorre o histórico e cria elementos HTML para exibir as informações de cada registro
        const rankingList = document.getElementById('ranking-list');
        rankingList.innerHTML = '';
        historico.forEach((resultado, indice) => {
            const item = document.createElement('li');
            const posicao = indice + 1;
            item.innerHTML = `${posicao}º - ${resultado.nome} - ${resultado.tempo}s`;
            rankingList.appendChild(item);
        });
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

window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player');
    nomeplayer.innerHTML = localStorage.getItem('player');

    startTimer();
    loadGame();
};
