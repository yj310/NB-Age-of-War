let tick = 0;
let lastTickTime = 0;
const TICK_INTERVAL = 100; // 100ms = 0.1초마다 한 틱 (1초에 10틱)

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

/// 이전 마우스 위치
/// type: int
let prevMouseX = 0;
let prevMouseY = 0;