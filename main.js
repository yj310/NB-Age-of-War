/// --------------[Main]--------------

function setup() {
    setData();
}

function draw() {
    update();

    createCanvas(foundation.width, foundation.height);
    background(foundation.color);
    
    drawGameScreen();
    drawEntity();
}
