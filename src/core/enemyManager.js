class EnemyManager {
  constructor() {
    this.enemyHome = new EnemyHome();
    this.units = [];
    this.unitTypes = [];
    this.lastUnitId = 0;

    this.mp = 50;
    this.maxMp = 100;

    this.hp = 100;
    this.maxHp = 100;

    this.level = 1;
    this.maxLevel = 3;
  }

  update() {
    // MP 자동 회복
    if (this.mp < this.maxMp && tick % 10 === 0) {
      this.mp += 1;
    }

    // 적 유닛 업데이트
    this.units.forEach((unit) => unit.update());

    // 간단한 AI: MP가 충분하면 랜덤으로 유닛 생성
    this.autoSpawnUnit();
  }

  render() {
    this.enemyHome.render();
    this.units.forEach((unit) => unit.render());
  }

  setUnitTypes(unitTypes) {
    this.unitTypes = unitTypes;
  }

  /// 자동 적 생성 AI
  autoSpawnUnit() {
    if (!this.unitTypes || this.unitTypes.length === 0) return;

    // 랜덤하게 스폰 가능성 (프레임 * 확률)
    if (random() < 0.01) {
      // MP가 충분한 유닛 타입만 필터링
      const affordable = this.unitTypes.filter((t) => this.mp >= t.mpCost);
      if (affordable.length === 0) return;

      // 랜덤 유닛 선택
      const unitType = random(affordable);

      this.addUnit(unitType);
    }
  }

  addUnit(unitType) {
    if (!unitType) return;

    // MP 부족 시 생성 불가
    if (this.mp < unitType.mpCost) return;
    this.mp -= unitType.mpCost;

    const unitId = ++this.lastUnitId;

    const unit = new Unit(
      unitId,
      unitType.image,
      -1, // 방향: 왼쪽으로 이동
      this.enemyHome.x, // 오른쪽 집에서 스폰됨
      floorY - unitType.height,
      unitType.width,
      unitType.height,
      -unitType.velocityX, // 왼쪽 방향
      unitType.velocityY,
      EntityType.ENEMY
    );

    this.units.push(unit);
  }

  removeUnit(unit) {
    if (!(unit instanceof Unit)) return;
    this.units = this.units.filter((u) => u !== unit);
  }
}
