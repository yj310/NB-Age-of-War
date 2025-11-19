class Enemy {
  constructor(id, image, level, x, y, width, height, velocityX, velocityY, hp, type) {
    this.id = id;
    this.image = image;
    this.level = level;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.hp = hp;
    this.type = type
  }

  render() {
    if (this.image) {
      image(this.image, this.x, this.y, this.width, this.height);
    } else {
      rect(this.x, this.y, this.width, this.height);
    }
  }

  isColliding(other) {
    return (
      this.x < other.x + other.width &&
      this.x + this.width > other.x &&
      this.y < other.y + other.height &&
      this.y + this.height > other.y
    );
  }

  update(others = []) {
    const prevX = this.x;
    const prevY = this.y;

    // 1. 이동 먼저 시도
    this.x += this.velocityX;
    this.y += this.velocityY;

    // 2. 충돌 체크
    for (const other of others) {
      if (other === this) continue;

      if (this.isColliding(other)) {
        // 🔹 UNIT과 충돌 → 이동 멈춤
        if (other.type === EntityType.UNIT) {
          this.x = prevX;
          this.y = prevY;
        }

        // 🔹 공격(hitbox)과 충돌 → HP 감소
        // if (other.type === "attack") {
        //   this.hp -= other.damage ?? 1; // damage 없으면 1 기본
        //   console.log(`Enemy ${this.id} hit! HP: ${this.hp}`);
        // }
      }
    }
  }

  attack() {}
}
