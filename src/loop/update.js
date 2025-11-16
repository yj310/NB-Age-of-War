function update() {

    // 전체 배경 프레임 업데이트
    foundation = new Frame(
        0, 0, // x, y
        max(windowWidth, gameScreen.width), // width
        max(windowHeight, gameScreen.height), // height
        foundation.color, // color
        foundation.strockColor // strockColor
    );

    /// 게임 화면 프레임 업데이트
    gameScreen = new Frame(
        (foundation.width - gameScreen.width) / 2,
        (foundation.height - gameScreen.height) / 2, // x, y
        gameScreen.width, gameScreen.height, // width, height
        gameScreen.color, gameScreen.strockColor // color, strockColor
    );

    // 틱 업데이트
    // 지금 시간이 마지막 틱 시간보다 TICK_INTERVAL 이상 지났다면
    // gameTick() 함수 호출
    const currentTime = millis();
    while (currentTime - lastTickTime >= TICK_INTERVAL) {
        gameTick();             // 로직 업데이트
        lastTickTime += TICK_INTERVAL;
    }
}

// 이 안에서만 "시간 흐름" 처리
function gameTick() {
    tick++;


    // updatePlayer();
    // updateEnemies();
}