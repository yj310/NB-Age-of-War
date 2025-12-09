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

    // 궁극기 리스트
    this.ultimates = [];
    this.ultimateIdCounter = 0;
    this.ultimateUsed = false;
  }

  onEnter() {
    this.setFirstStage();

    if (homeMusic && homeMusic.isPlaying()) {
      homeMusic.stop();
    }
    if (gameMusic && !gameMusic.isPlaying()) {
      gameMusic.loop();
    }
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

    // 궁극기 업데이트
    for (let i = this.ultimates.length - 1; i >= 0; i--) {
      const ultimate = this.ultimates[i];
      ultimate.update(this.enemyManager.enemies);

      // isActive가 false인 궁극기 제거
      if (!ultimate.isActive) {
        this.ultimates.splice(i, 1);
      }
    }

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

     for (const ultimate of this.ultimates) {
       ultimate.render();
     }
   

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
    this.interfaceManager.addUltimateButton(ultimateImage, () => this.activateUltimate());
  }

  activateUltimate() {
    // 이미 사용한 경우 무시
    if (this.ultimateUsed) {
      console.log("궁극기는 한 번만 사용할 수 있습니다!");
      return;
    }

    console.log("궁극기 발동!");
    this.ultimateUsed = true;

    // 궁극기 버튼 제거
    this.interfaceManager.removeUltimateButton();

    // 궁극기 생성
    const ultimate = new Ultimate(
      this.ultimateIdCounter++,
      0, // 시작 x 위치
      floorY - 100, // y 위치 (바닥 위)
      50, // width
      50, // height
      ultimateSpriteSheet, // spriteSheet
      {
        move: {
          frameCount: 4,
          frameWidth: 160,
          frameHeight: 145,
          startX: 440,
          startY: 315,
          speed: 2,
          scale: 0.3,
          spacing: 40,
        },
      }, // animations (직접 추가)
      999999, // damage
      8 // moveSpeed
    );

    this.ultimates.push(ultimate);
  }

  /// 게임 필드 그리기
  drawGameField() {
    push();

    // 폭발 시 화면 흔들림 (shake)
    if (typeof screenShakePower !== "undefined" && screenShakePower > 0) {
      const shakeX = random(-screenShakePower, screenShakePower);
      const shakeY = random(-screenShakePower, screenShakePower);
      translate(shakeX, shakeY);

      screenShakePower *= 0.88;
      if (screenShakePower < 0.4) {
        screenShakePower = 0;
      }
    }

    if (backgroundImage) {
      image(backgroundImage, 0, 0, mainFrame.width, mainFrame.height);
    }
    this.playerManager.render();
    this.enemyManager.render();

    // 새총 폭발 이펙트 렌더링
    if (typeof renderSlingshotExplosions === "function") {
      renderSlingshotExplosions();
    }

    pop();
  }
}
