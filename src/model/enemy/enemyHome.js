class EnemyHome {
  constructor(x = mainFrame.width, y = floorY) {
    this.horizontalRatio = 4;
    this.verticalRatio = 3;
    this.magnification = 40;
    this.width = this.horizontalRatio * this.magnification;
    this.height = this.verticalRatio * this.magnification;
    this.x = x - this.width - 40;
    this.y = y - this.height;
    this.enemyManager = null; // EnemyManager 참조
    this.attackRange = 10; // 집 앞 공격 범위
  }

  update() {}

  render() {
    image(homeImage, this.x, this.y, this.width, this.height);
  }
  
  isColliding(other) {
    return (
      this.x < other.x + other.width &&
      this.x + this.width > other.x &&
      this.y < other.y + other.height &&
      this.y + this.height > other.y
    );
  }
}
