const barWidth = 20;
const barHeight = 100;

class InterfaceManager {
  constructor() {
    this.unitButtons = [];
    this.unitTypes = [];
    this.ultimateButton = null;
    this.ultimateImage = null;
    /// type: Button
    this.buttons = [
      new ImageButton(
        mainFrame.width / 2 + 60,
        15,
        20,
        20,
        assetList["pause"],
        () => (tickInterval = TICK_INTERVAL.pause)
      ),
      new ImageButton(
        mainFrame.width / 2 + 90,
        15,
        20,
        20,
        assetList["play"],
        () => (tickInterval = TICK_INTERVAL.normal)
      ),
      new ImageButton(
        mainFrame.width / 2 + 120,
        15,
        20,
        20,
        assetList["fast_forward"],
        () => {
          if (tickInterval == TICK_INTERVAL.normal) {
            tickInterval = TICK_INTERVAL.fast_2_times;
          } else if (tickInterval == TICK_INTERVAL.fast_2_times) {
            tickInterval = TICK_INTERVAL.fast_4_times;
          } else if (tickInterval == TICK_INTERVAL.fast_4_times) {
            tickInterval = TICK_INTERVAL.fast_8_times;
          } else {
            tickInterval = TICK_INTERVAL.normal;
          }
        }
      ),
    ];
    this.playerManager = null;
    this.enemyManager = null;
    this.topInterfaceFrame = new Frame(
      mainFrame.width - mainFrame.width, // x
      0, // y
      mainFrame.width,
      100, // width, height
      "#FFFFFF",
      "#000000" // color, strockColor
    );
    this.bottomInterfaceFrame = new Frame(
      mainFrame.width - mainFrame.width, // x
      mainFrame.height - 200, // y
      mainFrame.width,
      200, // width, height
      "#FFFFFF",
      "#000000" // color, strockColor
    );
    this.hpBarFrame = new Frame(
      this.topInterfaceFrame.x,
      this.topInterfaceFrame.y + this.topInterfaceFrame.height - 10,
      this.topInterfaceFrame.width,
      10,
      "#FFFFFF",
      "#000000"
    );
  }

  update() { }

  render() {
    this.drawTopInterface();
    this.drawBottomInterface();
  }

  setUnitTypes(unitTypes) {
    this.unitTypes = unitTypes;
  }

  setPlayerManager(playerManager) {
    this.playerManager = playerManager;
  }

  setEnemyManager(enemyManager) {
    this.enemyManager = enemyManager;
  }

  setButtons(buttons) {
    this.buttons = buttons;
  }

  mousePressed(x, y) {
    let handled = false;

    this.unitButtons.forEach((button) => {
      if (button.contains(x, y)) {
        button.onPressed();
        handled = true;
      }
    });

    // 궁극기 버튼 체크
    if (this.ultimateButton && this.ultimateButton.contains(x, y)) {
      this.ultimateButton.onPressed();
      handled = true;
    }

    this.buttons.forEach((button) => {
      if (button.contains(x, y)) {
        button.onPressed();
        handled = true;
      }
    });

    return handled;
  }

  /// 상단 인터페이스 프레임
  drawTopInterface() {
    // 배경 (투명 또는 반투명)
    // fill(255, 255, 255, 0);
    // noStroke();
    // rect(this.topInterfaceFrame.x, this.topInterfaceFrame.y, this.topInterfaceFrame.width, this.topInterfaceFrame.height);

    this.drawPlayerInfo();
    this.drawCenterInfo();
    this.drawEnemyInfo();

    this.buttons.forEach((button) => {
      button.render();
    });
  }

  drawPlayerInfo() {
    const startX = this.topInterfaceFrame.x + 10;
    const startY = this.topInterfaceFrame.y + 10;

    // 아바타 (Placeholder)
    fill('#AAAAAA');
    stroke('#000000');
    strokeWeight(2);
    rect(startX, startY, 50, 50, 10); // Rounded rect

    // 텍스트: 우리 기지
    noStroke();
    fill('#000000');
    textAlign(LEFT, TOP);
    textSize(14);
    textStyle(BOLD);
    text("우리 기지", startX + 60, startY);

    // HP Bar
    const hpBarWidth = 150;
    const hpBarHeight = 15;
    const hpRatio = this.playerManager.hp / this.playerManager.maxHp;

    // HP Bar Background
    fill('#333333');
    rect(startX + 60, startY + 20, hpBarWidth, hpBarHeight, 5);

    // HP Bar Fill
    fill('#44FF44');
    rect(startX + 60, startY + 20, hpBarWidth * hpRatio, hpBarHeight, 5);

    // HP Text
    fill('#FFFFFF');
    textSize(10);
    textAlign(CENTER, CENTER);
    text("HP", startX + 60 + 15, startY + 20 + hpBarHeight / 2);

    // Level & XP
    fill('#000000');
    textSize(14);
    textAlign(LEFT, TOP);
    text(`LV.${this.playerManager.Level}`, startX + 60, startY + 40);

    // XP Bar
    const xpBarWidth = 100;
    const xpBarHeight = 10;
    const xpRatio = this.playerManager.xp / this.playerManager.maxXp;

    // XP Bar Background
    fill('#333333');
    rect(startX + 100, startY + 42, xpBarWidth, xpBarHeight, 5);

    // XP Bar Fill
    fill('#4488FF');
    rect(startX + 100, startY + 42, xpBarWidth * xpRatio, xpBarHeight, 5);

    // XP Text
    fill('#FFFFFF');
    textSize(8);
    textAlign(CENTER, CENTER);
    text(`(XP ${Math.floor(xpRatio * 100)}%)`, startX + 100 + xpBarWidth / 2, startY + 42 + xpBarHeight / 2);
  }

  drawCenterInfo() {
    const centerX = this.topInterfaceFrame.x + this.topInterfaceFrame.width / 2;
    const startY = this.topInterfaceFrame.y + 10;

    // Timer (Center)
    fill('#333333');
    stroke('#000000');
    strokeWeight(2);
    rect(centerX - 40, startY, 80, 30, 10);

    noStroke();
    fill('#FFFFFF');
    textSize(18);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);

    // Convert tick to time (assuming 10 ticks = 1 sec)
    const totalSeconds = Math.floor(tick / 10);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    text(timeString, centerX, startY + 15);

    // Gold (MP) - Left of Timer
    // Move further left to avoid overlap
    const coinX = centerX - 100;

    fill('#FFD700'); // Gold color
    stroke('#000000');
    strokeWeight(1);
    circle(coinX, startY + 15, 20); // Coin icon

    noStroke();
    fill('#000000');
    textSize(12);
    textAlign(CENTER, CENTER);
    text("G", coinX, startY + 15);

    fill('#FFD700');
    textSize(20);
    textAlign(LEFT, CENTER);
    textStyle(BOLD);
    // Add some padding for the number
    text(this.playerManager.mp, coinX + 15, startY + 15);
  }

  drawEnemyInfo() {
    const endX = this.topInterfaceFrame.x + this.topInterfaceFrame.width - 10;
    const startY = this.topInterfaceFrame.y + 10;

    // Avatar (Placeholder)
    fill('#AAAAAA');
    stroke('#000000');
    strokeWeight(2);
    rect(endX - 50, startY, 50, 50, 10);

    // 텍스트: 적 기지
    noStroke();
    fill('#000000');
    textAlign(RIGHT, TOP);
    textSize(14);
    textStyle(BOLD);
    text("적 기지", endX - 60, startY);

    // HP Bar
    const hpBarWidth = 150;
    const hpBarHeight = 15;
    const hpRatio = this.enemyManager.hp / this.enemyManager.maxHp;

    // HP Bar Background
    fill('#333333');
    rect(endX - 60 - hpBarWidth, startY + 20, hpBarWidth, hpBarHeight, 5);

    // HP Bar Fill (오른쪽에서 왼쪽으로 줄어듦)
    fill('#FF4444');
    rect(endX - 60 - hpBarWidth + (hpBarWidth * (1 - hpRatio)), startY + 20, hpBarWidth * hpRatio, hpBarHeight, 5);

    // HP Text
    fill('#FFFFFF');
    textSize(10);
    textAlign(CENTER, CENTER);
    text("HP", endX - 60 - 15, startY + 20 + hpBarHeight / 2);

    // Level
    fill('#000000');
    textSize(14);
    textAlign(RIGHT, TOP);
    // Enemy level is not directly available in EnemyManager usually, but let's assume 1 or add it.
    // Checking EnemyManager... it doesn't have level property shown in previous view_file.
    // I'll use a placeholder or check if I can access it.
    text("적 LV.5", endX - 60, startY + 40);
  }

  /// 하단 인터페이스 프레임
  drawBottomInterface() {
    const tabHeight = 40;
    const tabWidth = 150;

    // Tabs
    textSize(16);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);

    // Tab 1: Unit Production (Active)
    fill('#F5F5DC'); // Beige/Cream color for active tab
    stroke('#000000');
    strokeWeight(2);
    // Draw tab shape (rounded top)
    rect(this.bottomInterfaceFrame.x + 20, this.bottomInterfaceFrame.y - tabHeight, tabWidth, tabHeight + 5, 10, 10, 0, 0);

    fill('#000000');
    noStroke();
    text("유닛 생산", this.bottomInterfaceFrame.x + 20 + tabWidth / 2, this.bottomInterfaceFrame.y - tabHeight / 2);

    // Tab 2: Tower/Weapon (Inactive)
    fill('#A0A0A0'); // Darker for inactive
    stroke('#000000');
    strokeWeight(2);
    rect(this.bottomInterfaceFrame.x + 20 + tabWidth + 5, this.bottomInterfaceFrame.y - tabHeight + 5, tabWidth, tabHeight, 10, 10, 0, 0);

    fill('#505050');
    noStroke();
    text("타워/무기", this.bottomInterfaceFrame.x + 20 + tabWidth + 5 + tabWidth / 2, this.bottomInterfaceFrame.y - tabHeight + 5 + tabHeight / 2);

    // Main Panel
    fill('#F5F5DC'); // Beige/Cream background
    stroke('#000000');
    strokeWeight(2);
    rect(
      this.bottomInterfaceFrame.x,
      this.bottomInterfaceFrame.y,
      this.bottomInterfaceFrame.width,
      this.bottomInterfaceFrame.height
    );

    noStroke();
    noFill();

    /// 유닛 버튼
    this.unitButtons.forEach((button) => {
      button.render();
    });

    /// 궁극기 버튼
    if (this.ultimateButton) {
      this.ultimateButton.render();
    }
  }

  addUnitButton(index) {
    const margin = 20;
    const padding = 15;
    const unitWidth = 100; // Card width
    const unitHeight = 120; // Card height

    const button = new UnitButton(
      this.bottomInterfaceFrame.x + margin + (unitWidth + padding) * index,
      this.bottomInterfaceFrame.y + margin + 10, // Add some top margin inside panel
      unitWidth,
      unitHeight,
      unit1SpriteImageList[index],
      () => this.playerManager.addUnit(this.unitTypes[index], index),
      this.unitTypes[index].mpCost,
      "#FFFFFF",
      "#000000",
      index, // 유닛 타입 인덱스 전달
      this.playerManager // PlayerManager 참조 전달
    );

    this.unitButtons.push(button);
  }

  addUltimateButton(image, onActivate) {
    const margin = 20;
    const padding = 15;
    const unitWidth = 100;
    const ultimateSize = 120;

    // 유닛 버튼 개수를 기준으로 오른쪽에 배치
    const unitButtonCount = this.unitButtons.length;
    const xPosition = this.bottomInterfaceFrame.x + margin + (unitWidth + padding) * unitButtonCount + padding;

    // 700x700 이미지에서 중앙 640x640만 사용
    const imageCrop = {
      sx: 60,  // (700 - 640) / 2
      sy: 60,  // (700 - 640) / 2
      sWidth: 640,
      sHeight: 640
    };

    this.ultimateButton = new ImageButton(
      xPosition,
      this.bottomInterfaceFrame.y + margin + 10,
      ultimateSize,
      ultimateSize,
      image,
      onActivate || (() => console.log("궁극기 발동!")),
      null,
      null,
      imageCrop
    );
  }

  removeUltimateButton() {
    this.ultimateButton = null;
  }
}
