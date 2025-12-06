class Mario extends Unit {
  constructor(
    id,
    image,
    level,
    x,
    y,
    width,
    height,
    velocityX,
    velocityY,
    hp,
    type,
    damage = 10,
    attackCooldown = 30,
    attackRange = 5,
    spriteSheet = null,
    animations = null
  ) {
    // 부모 클래스 생성자 호출
    super(
      id,
      image,
      level,
      x,
      y,
      width,
      height,
      velocityX,
      velocityY,
      hp,
      type,
      damage,
      attackCooldown,
      attackRange,
      spriteSheet,
      (animations = {
        idle: {
          frameCount: 2,
          frameWidth: 80,
          frameHeight: 105,
          startX: 0,
          startY: 0,
          speed: 10,
          scale: 1.0,
        },
        walk: {
          frameCount: 4,
          frameWidth: 80,
          frameHeight: 105,
          startX: 0,
          startY: 105,
          speed: 5,
        },
        attack: {
          frameCount: 2,
          frameWidth: 32,
          frameHeight: 32,
          startX: 0,
          startY: 64,
          speed: 3,
          scale: 1.0,
        },
      })
    );

    // Mario만의 고유 속성 추가
    this.isMario = true;
  }

  // Mario만의 고유 메서드를 여기에 추가할 수 있습니다
  // 예: 특별한 공격, 스킬 등
}
