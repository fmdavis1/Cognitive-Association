
let sequence = [];
let humanSequence = []
let level = 0;

const startButton = document.querySelector('.js.start')

function startGame (){
    startButton.classList.add('hidden')
}
startButton.addEventListener('click', startGame);

const info = document.querySelector('js.info');

function nextRound(){
    level += 1;
    const nextSequece = sequence;


}

function startGame(){
    startButton.classList.add('hidden');
    info.classList.remove('hidden')
    info.textContent = "Wait for the computer";
}