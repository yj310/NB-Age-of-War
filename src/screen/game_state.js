let GameState = {
    mainMenu: 0,   // 게임 시작 화면
    manual: 1,   // 게임 설명 화면
    settings: 2,   // 설정 화면
    playing: 3,    // 게임 진행
    paused: 4,     // 일시정지
    gameOver: 5,   // 게임 오버
}

function setGameState(state) {
    gameState = state;

    switch (state) {
        case GameState.mainMenu:
            currentScreen = new MainMenuScreen();
            break;

        case GameState.playing:
            currentScreen = new PlayingScreen();
            break;
    }
}