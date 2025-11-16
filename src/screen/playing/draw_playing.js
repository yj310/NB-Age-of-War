
function drawPlaying(screen) {
    drawGameScreen();
    drawEntity();
    drawInterface(screen);
}

function drawEntity() { }

function drawInterface(screen) {
    translate(gameScreen.x, gameScreen.y);
    rectMode(CORNER);

    drawTopInterface(screen);
    drawBottomInterface(screen);

    resetMatrix();
}

/// 상단 인터페이스 프레임
function drawTopInterface(screen) {
    rect(
        screen.topInterfaceFrame.x,
        screen.topInterfaceFrame.y,
        screen.topInterfaceFrame.width,
        screen.topInterfaceFrame.height
    );
}

function drawBottomInterface(screen) {
    /// 하단 인터페이스 프레임
    rect(
        screen.bottomInterfaceFrame.x,
        screen.bottomInterfaceFrame.y,
        screen.bottomInterfaceFrame.width,
        screen.bottomInterfaceFrame.height
    );

    /// 유닛 목록 그리기
    // drawUnitList();

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
        }
    }
} 
