const barWidth = 20;
const barHeight = 100;

class InterfaceManager {
  constructor() {
    this.unitButtons = [];
    this.unitTypes = [];
    /// type: Button
    this.buttons = [
      new ImageButton(
        mainFrame.width - 80,
        10,
        20,
        20,
        assetList["pause"],
        () => (tickInterval = TICK_INTERVAL.pause)
      ),
      new ImageButton(
        mainFrame.width - 55,
        10,
        20,
        20,
        assetList["play"],
        () => (tickInterval = TICK_INTERVAL.normal)
      ),
      new ImageButton(
        mainFrame.width - 30,
        10,
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

  update() {}

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
    fill(this.topInterfaceFrame.color);
    stroke(this.topInterfaceFrame.strockColor);

    rect(
      this.topInterfaceFrame.x,
      this.topInterfaceFrame.y,
      this.topInterfaceFrame.width,
      this.topInterfaceFrame.height
    );

    noStroke();

    textAlign(LEFT, TOP);
    textSize(16);
    fill("#000000");
    // player mp, hp
    text(
      "MP: " + this.playerManager.mp,
      this.topInterfaceFrame.x + 10,
      this.topInterfaceFrame.y + 10
    );
    noFill();

    this.drawPlayerHp();
    this.drawEnemyHp();
    this.buttons.forEach((button) => {
      button.render();
    });
  }

  drawPlayerHp() {
    if (!this.playerManager) return;

    // PlayerHome 하단 기준
    const barX = this.playerManager.home.x - barWidth - 5; // 홈 왼쪽에 위치
    const barY =
      this.playerManager.home.y + this.playerManager.home.height - barHeight; // 하단에서 시작

    const hpRatio = this.playerManager.hp / this.playerManager.maxHp;

    // 바 테두리
    stroke("#000000");
    noFill();
    rect(barX, barY, barWidth, barHeight);

    // HP 채워진 부분 (아래에서 위)
    noStroke();
    fill("#44FF44"); // 플레이어 HP는 녹색
    rect(barX, barY + barHeight * (1 - hpRatio), barWidth, barHeight * hpRatio);
  }

  drawEnemyHp() {
    const barX =
      this.topInterfaceFrame.x +
      this.enemyManager.enemyHome.x +
      this.enemyManager.enemyHome.width +
      5;
    const barY =
      this.enemyManager.enemyHome.y +
      this.enemyManager.enemyHome.height -
      barHeight;

    const hpRatio = this.enemyManager.hp / this.enemyManager.maxHp;
    // 바 테두리
    stroke("#000000");
    noFill();
    rect(barX, barY, barWidth, barHeight);

    // HP 채워진 부분(아래에서 위로)
    noStroke();
    fill("#FF4444");
    rect(barX, barY + barHeight * (1 - hpRatio), barWidth, barHeight * hpRatio);
  }

  /// 하단 인터페이스 프레임
  drawBottomInterface() {
    fill(this.bottomInterfaceFrame.color);
    stroke(this.bottomInterfaceFrame.strockColor);
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
  }

  addUnitButton(index) {
    const margin = 15;
    const padding = 10;
    const unitWidth = 80;
    const unitHeight = 80;

    this.unitButtons.push(
      new UnitButton(
        this.bottomInterfaceFrame.x + margin + (unitWidth + padding) * index,
        this.bottomInterfaceFrame.y + margin,
        unitWidth,
        unitHeight,
        unit1ImageList[index],
        () => this.playerManager.addUnit(this.unitTypes[index]),
        this.unitTypes[index].mpCost
      )
    );
  }
}
