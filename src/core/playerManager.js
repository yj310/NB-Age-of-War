class PlayerManager {
  constructor() {
    this.home = new Home();
    this.units = [];
    this.unitTypes = [];
    this.lastUnitId = 0;
    this.mp = 50;
    this.maxMp = 100;
    this.hp = 100;
    this.maxHp = 100;
    this.Level = 1;
    this.maxLevel = 3;
  }

  update() {
    if (this.mp < this.maxMp && tick % 10 === 0) {
      this.mp += 1;
    }

    this.units.forEach((unit) => {
      unit.update();
    });
  }

  render() {
    this.home.render();
    this.units.forEach((unit) => unit.render());
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
      EntityType.UNIT
    );
    this.lastUnitId = unitId;
    this.units.push(unit);
  }
  removeUnit(unit) {
    if (!(unit instanceof Unit)) return;
    this.units = this.units.filter((u) => u !== unit);
  }
}
