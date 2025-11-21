const floorY = 320;

class PlayingScreen extends GameScreen {
  constructor() {
    super();

    this.playerManager = new PlayerManager();
    this.interfaceManager = new InterfaceManager();
    this.enemyManager = new EnemyManager();

    this.unitTypes = [];

    /// type: Button[]
    this.unitButtons = [];
  }

  onEnter() {
    this.setFirstStage();
  }

  update(screen) {
    this.playerManager.update([...this.enemyManager.enemies, ...this.playerManager.units]);
    this.enemyManager.update([
      ...this.enemyManager.enemies,
      ...this.playerManager.units,
    ]);

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
    this.enemyManager.render();

    resetMatrix();
  }

  mousePressed(x, y) {
    this.interfaceManager.mousePressed(x, y);
  }

  setFirstStage() {
    this.unitTypes = createStageUnitConfig(1, unit1ImageList);
    this.playerManager.setUnitTypes(this.unitTypes);
    this.interfaceManager.setUnitTypes(this.unitTypes);
    this.enemyManager.setEnemyTypes(this.unitTypes);
    this.interfaceManager.setPlayerManager(this.playerManager);
    this.interfaceManager.setEnemyManager(this.enemyManager);

    this.unitButtons = [];
    this.interfaceManager.addUnitButton(0);
    this.interfaceManager.addUnitButton(1);
    this.interfaceManager.addUnitButton(2);
    this.interfaceManager.addUnitButton(3);
    this.interfaceManager.addUnitButton(4);
  }

  /// 게임 필드 그리기
  drawGameField() {
    this.playerManager.render();
    this.enemyManager.render();
  }
}
