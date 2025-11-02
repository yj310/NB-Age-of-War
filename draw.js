/// --------------[Draw Entity]--------------

function drawGameScreen() {
    rectMode(CORNER);

    if (windowWidth > gameScreen.width) {
        rectMode(CENTER);
        translate(windowWidth / 2, windowHeight / 2);
        rect(0, 0, gameScreen.width, gameScreen.height);
    } else {
        y = windowHeight / 2 - gameScreen.height / 2;
        rect(0, y, gameScreen.width, gameScreen.height);
    }

    resetMatrix();
}

function drawEntity() {
}


