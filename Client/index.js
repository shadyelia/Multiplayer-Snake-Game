let _backGroundColoer = "#231f20";
let _snakColour = "#c2c2c2";
let _foodColour = "#e66916";

const socket = io('http://localhost:3000');

const gameScreen = document.getElementById('gameScreen');

let canvas, ctx;

const gameState = {
    player: {
        pos: {
            x: 3,
            y: 10,
        },
        vel: {
            x: 1,
            y: 0,
        },
        snake: [
            { x: 1, y: 10 },
            { x: 2, y: 10 },
            { x: 3, y: 10 },
        ]
    },
    food: {
        x: 7,
        y: 7
    },
    gridSize: 20
}


function generateColour() {
    var letters = '0123456789ABCDEF';
    var colour = '#';
    for (var i = 0; i < 6; i++) {
        colour += letters[Math.floor(Math.random() * 16)];
    }
    return colour
}

function getRandomColour(tokenColours) {
    let colour = generateColour();

    while (tokenColours.indexOf(colour) >= 0) {
        colour = generateColour();
    }

    return colour;
}


function init() {
    _snakColour = getRandomColour([_backGroundColoer]);
    _foodColour = getRandomColour([_snakColour, _backGroundColoer]);

    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = canvas.height = 600;

    ctx.fillRect(0, 0, canvas.width, canvas.height);

    document.addEventListener('keydown', keydown);
}

init();


function keydown(e) {

}

function paintGame(state) {
    ctx.fillStyle = _backGroundColoer;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const food = state.food;
    const gridSize = state.gridSize;
    const size = canvas.width / gridSize;

    ctx.fillStyle = _foodColour
    ctx.fillRect(food.x * size, food.y * size, size, size);

    paintPlayer(state.player, size, _snakColour);
}

function paintPlayer(playerState, size, _snakColour) {
    let snake = playerState.snake;

    ctx.fillStyle = _snakColour;
    for (let cell of snake) {
        ctx.fillRect(cell.x * size, cell.y * size, size, size);
    }
}

paintGame(gameState);

socket.on("init", function (data) {
    console.log(data);
});