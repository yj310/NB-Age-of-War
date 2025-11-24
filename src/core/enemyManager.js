class EnemyManager {
  constructor() {
    this.enemyHome = new EnemyHome();
    // enemyHome에 enemyManager 참조 추가 (폭발 데미지용)
    this.enemyHome.enemyManager = this;
    this.enemies = [];
    this.spawnQueue = []; // 대기 중인 적들

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

    // 적 유닛 이동/공격 업데이트
    this.enemies.forEach((enemy) => enemy.update(others));

    // 죽은 적 제거
    this.enemies = this.enemies.filter((enemy) => enemy.isAlive());

    // 대기열에서 스폰 가능한지 체크
    this.trySpawnEnemiesFromQueue();

    // AI 자동 생성
    this.autoSpawnEnemy();
  }

  render() {
    this.enemyHome.render();
    this.enemies.forEach((enemy) => enemy.render());
  }

  setEnemyTypes(enemyTypes) {
    this.enemyTypes = enemyTypes;
  }

  // enemy 자동 생성 AI
  autoSpawnEnemy() {
    if (!this.enemyTypes || this.enemyTypes.length === 0) return;

    // 30틱마다 한번만 스폰 시도 (빈도 감소)
    if (tick % 30 === 0) {
      if (random() < 0.15) {
        // 15% 확률 (기존 30%에서 감소)
        const affordable = this.enemyTypes.filter((t) => this.mp >= t.mpCost);
        if (affordable.length === 0) return;

        const enemyType = random(affordable);
        this.addEnemy(enemyType);
      }
    }
  }

  // 대기열에 추가
  addEnemy(enemyType) {
    if (!enemyType) return;

    // MP 부족
    if (this.mp < enemyType.mpCost) return;
    this.mp -= enemyType.mpCost;

    const enemyId = ++this.lastEnemyId;

    const enemy = new Enemy(
      enemyId,
      enemyType.image,
      -1, // 왼쪽 이동
      this.enemyHome.x - enemyType.width, // 오른쪽 집에서 생성
      floorY - enemyType.height,
      enemyType.width,
      enemyType.height,
      -enemyType.velocityX,
      enemyType.velocityY,
      enemyType.hp,
      EntityType.ENEMY,
      enemyType.damage,
      enemyType.attackCooldown,
      enemyType.attackRange
    );

    // 바로 스폰하지 말고 대기열에 넣음
    this.spawnQueue.push(enemy);
  }

  // 스폰 위치가 비었는지 체크
  canSpawnEnemy() {
    const spawnX = this.enemyHome.x - 50; // 집 왼쪽 바로 앞

    return !this.enemies.some((enemy) => {
      return enemy.x < spawnX + enemy.width && enemy.x + enemy.width > spawnX;
    });
  }

  // 대기열에서 실제 스폰
  trySpawnEnemiesFromQueue() {
    if (this.spawnQueue.length === 0) return;
    if (!this.canSpawnEnemy()) return;

    const nextEnemy = this.spawnQueue.shift();
    this.enemies.push(nextEnemy);
  }

  removeEnemy(enemy) {
    if (!(enemy instanceof Enemy)) return;
    this.enemies = this.enemies.filter((e) => e !== enemy);
  }
}
