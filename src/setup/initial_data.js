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
        1100, 600, // width, height (양 진영 집 사이 거리를 더 넓히기 위해 가로 영역 확장)
        '#FFFFFF', '#000000' // color, strockColor
    );

    /// 게임 상태 초기화
    gameState = GameState.mainMenu;
    setGameState(gameState);

    // 이미지 로드
    backgroundImage = loadImage("assets/images/background.png");
    titleBackgroundImage = loadImage("assets/images/title_background.png");
    unit1SpriteImageList = [
        loadImage("assets/unit/unit_1.png"),
        loadImage("assets/unit/unit_2.png"),
        loadImage("assets/unit/unit_3.png"),
        loadImage("assets/unit/unit_4.png"),
        loadImage("assets/unit/unit_5.png"),
    ];
    assetList = {
        "pause": loadImage('assets/images/pause.png'),
        "play": loadImage('assets/images/play.png'),
        "fast_forward": loadImage('assets/images/fast_forward.png'),
        "mute": loadImage('assets/images/mute.png'),
        "volume": loadImage('assets/images/volume.png'),
    };
    homeImage = loadImage('assets/images/home.png');
    enemyHomeImage = loadImage("assets/images/home.png");
    ultimateImage = loadImage('assets/ultimate/question_box.png');
    ultimateSpriteSheet = loadImage('assets/ultimate/ultimate_1.png');
}
