function update() {

    // 전체 배경 프레임 업데이트
    foundation = new Frame(
        0, 0, // x, y
        max(windowWidth, mainFrame.width), // width
        max(windowHeight, mainFrame.height), // height
        foundation.color, // color
        foundation.strockColor // strockColor
    );

    /// 게임 화면 프레임 업데이트
    mainFrame = new Frame(
        (foundation.width - mainFrame.width) / 2,
        (foundation.height - mainFrame.height) / 2, // x, y
        mainFrame.width, mainFrame.height, // width, height
        mainFrame.color, mainFrame.strockColor // color, strockColor
    );

    // 틱 업데이트
    // 지금 시간이 마지막 틱 시간보다 TICK_INTERVAL 이상 지났다면
    // gameTick() 함수 호출
    const currentTime = millis();
    if (tickInterval) {
        while (currentTime - lastTickTime >= tickInterval) {
            gameTick();             // 로직 업데이트
            lastTickTime = currentTime - (currentTime % tickInterval);
        }
    }
}

// 이 안에서만 "시간 흐름" 처리
function gameTick() {
    tick++;

    if (currentScreen instanceof GameScreen) {
        currentScreen.update(currentScreen);
    }
}