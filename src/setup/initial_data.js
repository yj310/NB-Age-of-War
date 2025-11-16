/// 데이터 초기화
function initialData() {
    /// 틱 초기화
    tick = 0;
    lastTickTime = millis();

    /// 전체 배경 프레임 초기화
    foundation = new Frame(
        windowWidth,
        windowHeight,
        '#333333',
        '#000000');

    /// 게임 화면 프레임 초기화
    gameScreen = new Frame(
        800,
        600,
        '#FFFFFF',
        '#000000');

    /// 게임 상태 초기화
    gameState = GameState.mainMenu;
    currentScreen = new MainMenuScreen();

    // 이미지 로드
    unit1ImageList = [
        loadImage('assets/images/unit_1_1.png'),
        loadImage('assets/images/unit_1_2.png'),
        loadImage('assets/images/unit_1_3.png'),
        loadImage('assets/images/unit_1_4.png'),
        loadImage('assets/images/unit_1_5.png'),
    ];
}
