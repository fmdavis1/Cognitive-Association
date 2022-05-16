
let sequence = [];
let humanSequence = []
let level = 0;

const startButton = document.querySelector('.js-start')
const info = document.querySelector('.js-info');
const heading = document.querySelector('.js-heading');
const tileContainer = document.querySelector('.js-container');

// 5 This function resets the game to beginning and removes the .hidden class from start button.

function resetGame(text) {
    alert(text);
    sequence = []
    humanSequence = []
    level = 0;
    startButton.classList.remove('hidden');
    heading.textContent = 'Cognitive Connection';
    info.classList.add('hidden');
    tileContainer.classList.add('unclickable');

}
//  3 This function removes the unclickable attribute from the tiles so the player can begin play.  As the play clicks on each tile the eventlistener is activated and the handClick function begins.
function humanTurn(level) {
    tileContainer.classList.remove('unclickable');
    info.textContent = `Your turn ${level} Tap${level > 1 ? 's' : ''}`;
}


// 2b-1 This function activates each tile in te sequece and adds sound to it.
function activateTile(color) {
    const tile = document.querySelector(`[data-tile='${color}']`)
    const sound = document.querySelector(`[data-sound='${color}']`)
console.log(tile)
    tile.classList.add('activated');
    sound.play();

    setTimeout(() => {
        tile.classList.remove('activated');
    }, 300);
}

//  2b Function playRound runs the the sequence of color with a forEach loop.  With each loop through it activates tiles and deactivates tiles by calling activateTile funciton.

function playRound(nextSequence) {
    nextSequence.forEach((color, index) => {
        setTimeout(() => {
            activateTile(color);

        }, (index + 1) * 600);
    
    });
}

//  2a This function creates the random colored tile to be added to the sequence.
function nextStep() {
    const tiles = ['red', 'green', 'blue', 'yellow']
    const random = tiles[Math.floor(Math.random() * tiles.length)]

    return random;
}

//  2.The nextRound function starts each round of the game. Makes tiles unclickable while computer sets up and runs through sequence.  This is done by going to nextStep function and the playRound function. Then humanTurn Level provides for human player to run through sequence.
function nextRound() {
    level += 1;

    tileContainer.classList.add('unclickable');
    info.textContent = "Wait for the computer"
    heading.textContent = `Level ${level} of 5`;
    const nextSequence = [...sequence];
    nextSequence.push(nextStep());
    playRound(nextSequence);

    sequence = [...nextSequence];
    setTimeout(() => {
        humanTurn(level);
    }, level * 600 + 1000);

}
// This function determines if the tile clicked on by human player matches computer sequence.  From there it determines outcome.  If a miss, oops messaage and  game resets;  if completion, congrats message and game resets; if successful completion of a round,  a success message and moves to the nextRound which continues/repeats until and error is made or game is completed successful.

function handleClick(tile) {
    const index = humanSequence.push(tile) - 1;
    console.log(index)
    const sound = document.querySelector(`[data-sound='${tile}']`);
    sound.play();

    const remainingTaps = sequence.length - humanSequence.length;

    // if (humanSequence[index] !== sequence[index]) {
    //     console.log(index)
        // info.textContent = 'You get a second chance!';
        // playRound(sequence[index])
        // console.log(index)
    
     if(humanSequence[index] !== sequence[index]){
    //      console.log(sequence[index])
    //      playRound(sequence[index]);
    //  }else if(humanSequence[index] !== sequence[index])
     resetGame('Oops! Game over, you pressed the wrong tile');
        return;
        }
    
    
    if (humanSequence.length === sequence.length) {
        if (humanSequence.length === 5) {
            resetGame('Congrats! You completed all the levels');
        }
        humanSequence = [];
        info.textContent = 'Succes! Keep going!';
        setTimeout(() => {
            nextRound();
        }, 1000);
        return;
    }

    info.textContent = `Your turn ${remainingTaps} Tap${remainingTaps > 1 ? 's' : ''}`;
}

//  1.  Function to start game.  Hides the start button and removes the hidden attriute from the info section. Then goes to nextRound function.
function startGame() {
    startButton.classList.add('hidden')
    info.classList.remove('hidden')
    info.textContent = "Wait for the computer";
    nextRound();

}
//EventListener added to button to start game.
startButton.addEventListener('click', startGame);

//Eventlistener for tile container.  Listens for when  a tile is clicked. Used to initiate handClick function.

tileContainer.addEventListener('click', (event) => {
    const {tile } = event.target.dataset;
    // console.log(event)
    // console.log({tile})
    // console.log(tile)

    if (tile) handleClick(tile)
})

