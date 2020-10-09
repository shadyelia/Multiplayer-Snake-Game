let _backgroundColor = 'green';
let _foodColour = 'red';
let _snakeColour = '#c2c2c2';
let _snakeTwoColour = "red";

//const socket = io('http://localhost:3000');
const socket = io('https://snake-multiple.herokuapp.com/');

const gameScreen = document.getElementById('gameScreen');
const initialScreen = document.getElementById('initialScreen');
const newGameBtn = document.getElementById('newGameButton');
const joinGameBtn = document.getElementById('joinGameButton');
const gameCodeInput = document.getElementById('gameCodeInput');
const gameCodeDisplay = document.getElementById('gameCodeDisplay');

const playerOneScore = document.getElementById('playerOneScore');
const playerTwoScore = document.getElementById('playerTwoScore');

const fruit = document.getElementById("fruit");
const virus = document.getElementById("virus");


newGameBtn.addEventListener('click', newGame);
joinGameBtn.addEventListener('click', joinGame);



function getRandomColour(tokenColours) {
    let colour = generateColour();

    while (tokenColours.indexOf(colour) >= 0) {
        colour = generateColour();
    }

    return colour;
}

function generateColour() {
    var letters = '0123456789ABCDEF';
    var colour = '#';
    for (var i = 0; i < 6; i++) {
        colour += letters[Math.floor(Math.random() * 16)];
    }
    return colour
}


function newGame() {
    socket.emit('newGame');
    init();
}

function joinGame() {
    const code = gameCodeInput.value;
    socket.emit('joinGame', code);
    init();
}

let canvas, ctx;
let playerNumber;
let gameActive = false;

function init() {
    _snakeColour = getRandomColour([_backgroundColor]);
    _foodColour = getRandomColour([_snakeColour, _backgroundColor]);
    _snakeTwoColour = getRandomColour([_snakeColour, _backgroundColor, _foodColour]);

    initialScreen.style.display = "none";
    gameScreen.style.display = "block";

    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    // canvas.width = canvas.height = 600;

    // ctx.fillStyle = _backgroundColor;
    // ctx.fillRect(0, 0, canvas.width, canvas.height);

    document.addEventListener('keydown', keydown);
    gameActive = true;
}

function keydown(e) {
    socket.emit('keydown', e.keyCode);
}

function paintGame(state) {
    ctx.fillStyle = _backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let food = state.food;
    let vir = state.virus;
    let gridsize = state.gridsize;
    let size = canvas.width / gridsize;

    ctx.drawImage(fruit, food.x * size, food.y * size, size, size);
    ctx.drawImage(virus, vir.x * size, vir.y * size, size, size);

    //ctx.fillStyle = _foodColour;
    //ctx.fillRect(food.x * size, food.y * size, size, size);

    paintPlayer(state.players[0], size, _snakeColour);
    playerOneScore.innerHTML = "Player one score : " + String(state.players[0].score);

    paintPlayer(state.players[1], size, _snakeTwoColour);
    playerTwoScore.innerHTML = "Player two score : " + String(state.players[1].score);
}

function paintPlayer(playerState, size, colour) {
    let snake = playerState.snake;

    ctx.fillStyle = colour;
    for (let cell of snake) {
        ctx.fillRect(cell.x * size, cell.y * size, size, size);
    }
}

socket.on("init", function handleInit(number) {
    playerNumber = number;
});



socket.on('gameState', function handleGameState(gameState) {
    if (!gameActive) {
        return;
    }
    gameState = JSON.parse(gameState);
    requestAnimationFrame(() => paintGame(gameState));
})

socket.on('gameOver', function handleGameOver(data) {
    if (!gameActive) {
        return;
    }
    data = JSON.parse(data);

    gameActive = false;

    if (data.winner === playerNumber) {
        alert('You Win!');
    } else {
        alert('You Lose :(');
    }
});

socket.on('gameCode', function handleGameCode(gameCode) {
    gameCodeDisplay.innerText = gameCode;
});

socket.on('unknownCode', function handleUnknownCode() {
    reset();
    alert('Unknown Game Code')
});

socket.on('tooManyPlayers', function handleTooManyPlayers() {
    reset();
    alert('This game is already in progress');
});

function reset() {
    playerNumber = null;
    gameCodeInput.value = '';
    initialScreen.style.display = "block";
    gameScreen.style.display = "none";
}