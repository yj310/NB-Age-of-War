/// --------------[Basic Action]--------------
function setup() {
    setData();
    createCanvas(400, 400);
}

function draw() {
    background(220);
    drawEntity();
}

/// --------------[Set Data]--------------
function setData() {
    /// 데이터 초기화
}

/// --------------[Interaction]--------------
function mousePressed() {
    /// 마우스 입력
    /// mouseX, mouseY
}

function keyPressed() {
    /// 키보드 입력
    // if (key === '') { }
    // if (keyCode === LEFT_ARROW) {}
}

/// --------------[Draw Entity]--------------
function drawEntity() {
    rect(0, 0, 100, 100);
}
