/// 데이터 초기화
function initialData() {
    /// 틱 초기화
    tick = 0;
    lastTickTime = millis();

    /// 전체 배경 프레임 초기화
    foundation = new Frame(
        0, 0, // x, y
        windowWidth, windowHeight, // width, height
        '#333333', '#000000' // color, strockColor
    );

    /// 게임 화면 프레임 초기화
    mainFrame = new Frame(
        0, 0, // x, y
        800, 600, // width, height
        '#FFFFFF', '#000000' // color, strockColor
    );

    /// 게임 상태 초기화
    gameState = GameState.mainMenu;
    setGameState(gameState);

    // 이미지 로드
    unit1ImageList = [
        loadImage('assets/images/unit_1_1.png'),
        loadImage('assets/images/unit_1_2.png'),
        loadImage('assets/images/unit_1_3.png'),
        loadImage('assets/images/unit_1_4.png'),
        loadImage('assets/images/unit_1_5.png'),
    ];
    assetList = {
        "pause": loadImage('assets/images/pause.png'),
        "play": loadImage('assets/images/play.png'),
        "fast_forward": loadImage('assets/images/fast_forward.png'),
    };
    homeImage = loadImage('assets/images/home.png');
}
