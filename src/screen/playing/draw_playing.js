
function drawPlaying() {
    drawGameScreen();
    drawEntity();
    drawInterface();
}

function drawEntity() { }

function drawInterface() {
    translate(screenStartPosition.x, screenStartPosition.y);
    rectMode(CORNER);

    drawTopInterface();
    drawBottomInterface();

    resetMatrix();
}

function drawTopInterface() {
    /// 상단 인터페이스 설정
    topInterfaceFrame = new Frame(gameScreen.width, 100, '#FFFFFF', '#000000');
    topInterfaceStartPosition = new Position(
        gameScreen.width - topInterfaceFrame.width,
        0
    );

    /// 상단 인터페이스 프레임
    rect(
        topInterfaceStartPosition.x,
        topInterfaceStartPosition.y,
        topInterfaceFrame.width,
        topInterfaceFrame.height
    );

}

function drawBottomInterface() {
    /// 하단 인터페이스 설정
    bottomInterfaceFrame = new Frame(gameScreen.width, 200, '#FFFFFF', '#000000');
    bottomInterfaceStartPosition = new Position(
        gameScreen.width - bottomInterfaceFrame.width,
        gameScreen.height - bottomInterfaceFrame.height
    );

    /// 하단 인터페이스 프레임
    rect(
        bottomInterfaceStartPosition.x,
        bottomInterfaceStartPosition.y,
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
            bottomInterfaceStartPosition.x + margin + (unitWidth + padding) * i,
            bottomInterfaceStartPosition.y + margin,
            unitWidth,
            unitHeight
        );
        unitImage = unit1ImageList[i];
        // 이미지가 로드되었는지 확인
        if (unitImage) {
            image(
                unitImage,
                bottomInterfaceStartPosition.x + margin + (unitWidth + padding) * i,
                bottomInterfaceStartPosition.y + margin,
                unitWidth,
                unitHeight
            );
        } else {
            // 이미지가 아직 로드되지 않았으면 사각형으로 표시
            rect(
                bottomInterfaceStartPosition.x + margin + (unitWidth + padding) * i,
                bottomInterfaceStartPosition.y + margin,
                unitWidth,
                unitHeight
            );
        }
    }
} 
