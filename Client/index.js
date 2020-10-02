

let _backGroundColoer = "#231f20";
let _snakColour = "#c2c2c2";
let _foodColour = "#e66916";

const gameScreen = document.getElementById('gameScreen');

let canvas, ctx;

function init() {
    _snakColour = getRandomColour({ _backGroundColoer });
    _foodColour = getRandomColour({ _snakColour, _backGroundColoer });

    canvas = document.getElementById('canvas');
    ctx = document.getElementById('2d');

    canvas.width = canvas.height = 800;

    ctx.fillStyle = _backGroundColoer;
    ctx.fillRect = (0, 0, canvas.width, canvas.height);

    document.addEventListener('keydown', keydown);
}

function keydown(e) {

}

init();