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

/// 게임 배경 이미지
/// type: Image
let backgroundImage = null;

/// 타이틀 배경 이미지
/// type: Image
let titleBackgroundImage = null;

/// 게임 상태
/// type: GameState
let gameState = GameState.mainMenu;

/// 현재 화면
/// type: Screen
let currentScreen = null;

/// 이미지 
/// type: Image[]
let unit1SpriteImageList = null;

/// 아이콘 에셋
/// type: Image[]
let assetList;

/// 홈 이미지
/// type: Image
let homeImage = null;


// 적 홈 이미지
/// type: Image
let enemyHomeImage = null;

/// 궁극기 버튼 이미지
/// type: Image
let ultimateImage = null;

/// 궁극기 스프라이트 시트
/// type: Image
let ultimateSpriteSheet = null;

/// 배경 음악
/// type: p5.SoundFile
let homeMusic = null;
let gameMusic = null;


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

// 새총 폭발 시 화면 흔들림 효과 세기
let screenShakePower = 0;

/// 음소거 상태
let isMuted = false;
