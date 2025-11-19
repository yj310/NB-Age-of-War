const floorY = 320;

class PlayingScreen extends GameScreen {
  constructor() {
    super();

    this.enemyHome = new EnemyHome();
    this.playerManager = new PlayerManager();
    this.interfaceManager = new InterfaceManager();

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

    this.interfaceManager.render();
    this.playerManager.render();

    resetMatrix();
  }

  mousePressed(x, y) {
    this.interfaceManager.mousePressed(x, y);

    this.buttons.forEach((button) => {
      if (button.contains(x, y)) {
        button.onPressed();
      }
    });
  }

  setFirstStage() {
    this.unitTypes = createStageUnitConfig(1, unit1ImageList);
    this.playerManager.setUnitTypes(this.unitTypes);
    this.interfaceManager.setUnitTypes(this.unitTypes);
    this.interfaceManager.setPlayerManager(this.playerManager);
    this.interfaceManager.setButtons(this.buttons);

    this.unitButtons = [];
    this.interfaceManager.addUnitButton(0);
    this.interfaceManager.addUnitButton(1);
    this.interfaceManager.addUnitButton(2);
    this.interfaceManager.addUnitButton(3);
    this.interfaceManager.addUnitButton(4);
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
}
