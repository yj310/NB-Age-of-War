/// --------------[Main]--------------

function setup() {
    initialData();
}

function draw() {
    update();

    createCanvas(foundation.width, foundation.height);
    background(foundation.color);

    drawGameScreen();
    drawEntity();
    drawInterface();
}
