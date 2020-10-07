function getRandomColour(tokenColours) {
    let colour = generateColor();

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


