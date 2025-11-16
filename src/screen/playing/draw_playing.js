
function drawPlaying(gameScreen) {
    drawGameScreen();
    drawEntity();
    drawInterface();
}

function drawEntity() { }

function drawInterface() {
    translate(gameScreen.x, gameScreen.y);
    rectMode(CORNER);

    drawTopInterface();
    drawBottomInterface();

    resetMatrix();
}

function drawTopInterface() {
    /// 상단 인터페이스 설정
    topInterfaceFrame = new Frame(
        gameScreen.width - gameScreen.width, // x
        0, // y
        gameScreen.width, 100, // width, height
        '#FFFFFF', '#000000' // color, strockColor
    );

    /// 상단 인터페이스 프레임
    rect(
        topInterfaceFrame.x,
        topInterfaceFrame.y,
        topInterfaceFrame.width,
        topInterfaceFrame.height
    );

}

function drawBottomInterface() {
    /// 하단 인터페이스 설정
    bottomInterfaceFrame = new Frame(
        gameScreen.width - gameScreen.width, // x
        gameScreen.height - 200, // y
        gameScreen.width, 200, // width, height
        '#FFFFFF', '#000000' // color, strockColor
    );

    /// 하단 인터페이스 프레임
    rect(
        bottomInterfaceFrame.x,
        bottomInterfaceFrame.y,
        bottomInterfaceFrame.width,
        bottomInterfaceFrame.height
    );

    /// 유닛 목록 그리기
    drawUnitList();

}

function drawUnitList() {
    unitCount = 5;
    margin = 15;
    padding = 10;
    unitWidth = 80;
    unitHeight = 80;

    for (let i = 0; i < unitCount; i++) {
        rect(
            bottomInterfaceFrame.x + margin + (unitWidth + padding) * i,
            bottomInterfaceFrame.y + margin,
            unitWidth,
            unitHeight
        );
        unitImage = unit1ImageList[i];
        // 이미지가 로드되었는지 확인
        if (unitImage) {
            image(
                unitImage,
                bottomInterfaceFrame.x + margin + (unitWidth + padding) * i,
                bottomInterfaceFrame.y + margin,
                unitWidth,
                unitHeight
            );
        } else {
            // 이미지가 아직 로드되지 않았으면 사각형으로 표시
            rect(
                bottomInterfaceFrame.x + margin + (unitWidth + padding) * i,
                bottomInterfaceFrame.y + margin,
                unitWidth,
                unitHeight
            );
        }
    }
} 
