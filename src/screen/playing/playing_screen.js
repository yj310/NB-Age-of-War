const floorY = 320;

class PlayingScreen extends GameScreen {
  constructor() {
    super();
    
    this.enemyHome = new EnemyHome();

    this.playerManager = new PlayerManager();

    this.unitTypes = [];

    /// type: Button[]
    this.unitButtons = [];

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

    /// type: Frame[]
    this.topInterfaceFrame = new Frame(
      mainFrame.width - mainFrame.width, // x
      0, // y
      mainFrame.width,
      100, // width, height
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
    this.bottomInterfaceFrame = new Frame(
      mainFrame.width - mainFrame.width, // x
      mainFrame.height - 200, // y
      mainFrame.width,
      200, // width, height
      "#FFFFFF",
      "#000000" // color, strockColor
    );
  }

  onEnter() {
    this.setFirstStage();
  }

  update(screen) {
    this.playerManager.update();
  }

  render(screen) {
    if (!(screen instanceof GameScreen)) return;

    /// 메인 프레임
    drawMainFrame();

    translate(mainFrame.x, mainFrame.y);
    rectMode(CORNER);

    /// 게임 필드
    this.drawGameField();

    /// 인터페이스
    this.drawTopInterface();
    this.drawBottomInterface();

    this.playerManager.render();

    resetMatrix();
  }

  mousePressed(mouseX, mouseY) {
    this.unitButtons.forEach((button) => {
      if (button.contains(mouseX, mouseY)) {
        button.onPressed();
      }
    });

    this.buttons.forEach((button) => {
      if (button.contains(mouseX, mouseY)) {
        button.onPressed();
      }
    });
  }

  setFirstStage() {
    this.unitTypes = createStageUnitConfig(1, unit1ImageList)
    this.playerManager.setUnitTypes(this.unitTypes);

    this.unitButtons = [];
    this.addUnitButton(0);
    this.addUnitButton(1);
    this.addUnitButton(2);
    this.addUnitButton(3);
    this.addUnitButton(4);
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

  /// 게임 필드 그리기
  drawGameField() {
    // this.home.render();
    this.enemyHome.render();
    this.playerManager.render();


    /// 유닛
    // this.units.forEach((unit) => {
    //   unit.render();
    // });
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
    text(
      "MP: " + this.playerManager.mp,
      this.topInterfaceFrame.x + 10,
      this.topInterfaceFrame.y + 10
    );
    text(
      "HP: " + this.playerManager.hp,
      this.topInterfaceFrame.x + 10,
      this.topInterfaceFrame.y + 30
    );
    noFill();

    this.buttons.forEach((button) => {
      button.render();
    });
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
}
