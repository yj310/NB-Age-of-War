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

    // 드래그 중인 유닛
    this.draggedUnit = null;
  }

  onEnter() {
    this.setFirstStage();
  }

  update(screen) {
    // 새총 발사된 유닛이 상대편 집과 충돌하는지 체크하기 위해 enemyHome 추가
    const allEntities = [
      ...this.enemyManager.enemies,
      ...this.playerManager.units,
      this.enemyManager.enemyHome, // 상대편 집 추가
      this.playerManager.home // 내 집 추가
    ];

    this.playerManager.update(allEntities);
    this.enemyManager.update([
      ...this.enemyManager.enemies,
      ...this.playerManager.units,
      this.playerManager.home // 내 집 추가
    ]);

    // 게임 상태 체크
    if (this.playerManager.hp <= 0) {
      // 게임 오버
      setGameState(GameState.gameOver);
    } else if (this.enemyManager.hp <= 0) {
      // 게임 클리어
      setGameState(GameState.gameClear);
    }
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
    // 인터페이스 버튼 클릭 체크 먼저
    if (this.interfaceManager.mousePressed(x, y)) {
      return;
    }

    // 유닛 드래그 시작 체크
    for (let i = this.playerManager.units.length - 1; i >= 0; i--) {
      const unit = this.playerManager.units[i];
      if (unit.isPointInside(x, y) && !unit.isDragged && !unit.isThrown) {
        unit.startDrag(x, y);
        this.draggedUnit = unit;
        break;
      }
    }
  }

  mouseDragged(x, y) {
    // 드래그 중인 유닛 위치 업데이트
    if (this.draggedUnit && this.draggedUnit.isDragged) {
      this.draggedUnit.updateDrag(x, y);

      // 새총에 장전되어 있으면 조준 업데이트
      if (this.playerManager.slingshot.loadedUnit === this.draggedUnit) {
        this.playerManager.slingshot.updateAim(x, y);
      } else {
        // 새총 범위 내에 들어가면 장전
        if (this.playerManager.slingshot.isUnitInRange(this.draggedUnit)) {
          this.playerManager.slingshot.loadUnit(this.draggedUnit);
        }
      }
    }
  }

  mouseReleased(x, y) {
    // 새총에 장전되어 있으면 발사
    if (this.draggedUnit && this.playerManager.slingshot.loadedUnit === this.draggedUnit) {
      const firedUnit = this.playerManager.slingshot.fire(x, y);
      if (firedUnit) {
        // 발사된 유닛은 목표 지점 설정
        firedUnit.slingshotTargetX = x;
        firedUnit.slingshotTargetY = y;
      }
      this.draggedUnit = null;
    } else if (this.draggedUnit && this.draggedUnit.isDragged) {
      // 일반 던지기
      this.draggedUnit.endDrag(x, y);
      this.draggedUnit = null;
    }
  }

  setFirstStage() {
    this.unitTypes = createStageUnitConfig(1, [], unit1SpriteImageList);
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
