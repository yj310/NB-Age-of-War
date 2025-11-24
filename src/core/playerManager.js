class PlayerManager {
  constructor() {
    this.home = new Home();
    this.home.playerManager = this; // Home에 PlayerManager 참조 추가
    this.units = [];
    this.spawnQueue = []; // 대기 유닛
    this.unitTypes = [];
    this.lastUnitId = 0;
    this.mp = 50;
    this.maxMp = 100;
    this.hp = 100;
    this.maxHp = 100;
    this.Level = 1;
    this.maxLevel = 3;
    
    // 새총을 집 지붕 위에 배치
    const slingshotX = this.home.x + this.home.width / 2;
    const slingshotY = this.home.y - 10; // 지붕 위
    this.slingshot = new Slingshot(slingshotX, slingshotY);
  }

  update(others) {
    if (this.mp < this.maxMp && tick % 10 === 0) {
      this.mp += 1;
    }
    this.units.forEach((unit) => unit.update(others));

    // 죽은 유닛 제거
    this.units = this.units.filter((unit) => unit.isAlive());

    // 유닛 스폰 체크
    this.trySpawnUnitsFromQueue();
  }

  render() {
    this.home.render();
    this.slingshot.render();
    // 새총에 장전되지 않은 유닛만 렌더링
    this.units.forEach((unit) => {
      if (this.slingshot.loadedUnit !== unit) {
        unit.render();
      }
    });
  }

  setUnitTypes(unitTypes) {
    this.unitTypes = unitTypes;
  }

  addUnit(unitType) {
    if (!(unitType instanceof UnitType)) return;

    /// MP 가 부족하면 유닛을 추가하지 않음
    if (this.mp < unitType.mpCost) return;
    this.mp -= unitType.mpCost;

    const unitId = this.lastUnitId + 1;
    const unit = new Unit(
      unitId,
      unitType.image,
      1,
      this.home.x + this.home.width,
      floorY - unitType.height,
      unitType.width,
      unitType.height,
      unitType.velocityX,
      unitType.velocityY,
      unitType.hp,
      EntityType.UNIT,
      unitType.damage,
      unitType.attackCooldown,
      unitType.attackRange
    );
    this.lastUnitId = unitId;
    
    // 바로 스폰하지 않고 대기열에 넣기
    this.spawnQueue.push(unit);
  }
  removeUnit(unit) {
    if (!(unit instanceof Unit)) return;
    this.units = this.units.filter((u) => u !== unit);
  }

  trySpawnUnitsFromQueue() {
    if (this.spawnQueue.length === 0) return;
    if (!this.canSpawnUnit()) return;

    const nextUnit = this.spawnQueue.shift();
    this.units.push(nextUnit);
  }

  canSpawnUnit() {
    const spawnX = this.home.x + this.home.width;

    // 앞에 있는 units 중에서 스폰위치와 겹치는지 체크
    return !this.units.some((unit) => {
      return unit.x < spawnX + unit.width && unit.x + unit.width > spawnX;
    });
  }
}
