class EnemyManager {
  constructor() {
    this.enemyHome = new EnemyHome();
    this.enemies = [];
    this.enemyTypes = [];
    this.lastEnemyId = 0;

    this.mp = 50;
    this.maxMp = 100;

    this.hp = 100;
    this.maxHp = 100;

    this.level = 1;
    this.maxLevel = 3;
  }

  update(others = []) {
    // MP 자동 회복
    if (this.mp < this.maxMp && tick % 10 === 0) {
      this.mp += 1;
    }

    // 적 유닛 업데이트
    this.enemies.forEach((enemy) => enemy.update(others));

    // 간단한 AI: MP가 충분하면 랜덤으로 유닛 생성
    this.autoSpawnEnemy();
  }

  render() {
    this.enemyHome.render();
    this.enemies.forEach((enemy) => enemy.render());
  }

  setEnemyTypes(enemyTypes) {
    this.enemyTypes = enemyTypes;
  }

  /// 자동 적 생성 AI
  autoSpawnEnemy() {
    if (!this.enemyTypes || this.enemyTypes.length === 0) return;

    // 랜덤하게 스폰 가능성 (프레임 * 확률)
    if (random() < 0.01) {
      // MP가 충분한 유닛 타입만 필터링
      const affordable = this.enemyTypes.filter((t) => this.mp >= t.mpCost);
      if (affordable.length === 0) return;

      // 랜덤 유닛 선택
      const enemyType = random(affordable);

      this.addEnemy(enemyType);
    }
  }

  addEnemy(enemyType) {
    if (!enemyType) return;

    // MP 부족 시 생성 불가
    if (this.mp < enemyType.mpCost) return;
    this.mp -= enemyType.mpCost;

    const enemyId = ++this.lastEnemyId;

    const enemy = new Enemy(
      enemyId,
      enemyType.image,
      -1, // 방향: 왼쪽으로 이동
      this.enemyHome.x, // 오른쪽 집에서 스폰됨
      floorY - enemyType.height,
      enemyType.width,
      enemyType.height,
      -enemyType.velocityX, // 왼쪽 방향
      enemyType.velocityY,
      enemyType.hp,
      EntityType.ENEMY
    );

    this.enemies.push(enemy);
  }

  removeEnemy(Enemy) {
    if (!(Enemy instanceof Enemy)) return;
    this.enemies = this.enemies.filter((u) => u !== Enemy);
  }
}
