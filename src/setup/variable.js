let tick = 0;
let lastTickTime = 0;
let tickInterval = 100; // 100ms = 0.1초마다 한 틱 (1초에 10틱)
let TICK_INTERVAL = {
  normal: 100,
  fast_2_times: 50,
  fast_4_times: 10,
  fast_8_times: 5,
  pause: null,
}



/// 전체 배경
/// type: Frame
let foundation = null;

/// 게임 화면
/// type: Frame
let mainFrame = null;

/// 게임 상태
/// type: GameState
let gameState = GameState.mainMenu;

/// 현재 화면
/// type: Screen
let currentScreen = null;

/// 이미지 
/// type: Image[]
let unit1ImageList = null;

/// 아이콘 에셋
/// type: Image[]
let assetList;

/// 홈 이미지
/// type: Image
let homeImage = null;


// 적 홈 이미지
/// type: Image
let enemyHomeImage = null;


/// 이전 마우스 위치
/// type: int
let prevMouseX = 0;
let prevMouseY = 0;

/// 메인 프레임 기준 마우스 위치
/// type: int
let mouseXInMainFrame = 0;
let mouseYInMainFrame = 0;

const EntityType = Object.freeze({
  UNIT: "unit",
  ENEMY: "enemy",
  ATTACK: "attack",
});
