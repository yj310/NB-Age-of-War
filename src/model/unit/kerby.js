class Kerby extends Unit {
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
    animations = {
      // 유닛 0번 애니메이션
      idle: {
        frameCount: 2,
        frameWidth: 45,
        frameHeight: 35,
        startX: 0,
        startY: 0,
        speed: 10,
        scale: 1.0,
      },
      walk: {
        frameCount: 10,
        frameWidth: 45,
        frameHeight: 45,
        startX: 0,
        startY: 80,
        speed: 5,
        scale: 0.3,
        spacing: 15,
      },
      attack: {
        frameCount: 2,
        frameWidth: 45,
        frameHeight: 35,
        startX: 0,
        startY: 70,
        speed: 3,
        scale: 1.0,
      },
    }
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
      animations
    );

    // Kerby만의 고유 속성 추가
    this.isKerby = true;
  }

  // Kerby만의 고유 메서드를 여기에 추가할 수 있습니다
  // 예: 특별한 공격, 스킬 등

  // 부모 메서드를 오버라이드할 수도 있습니다
  // render() {
  //   super.render();
  //   // Kerby만의 추가 렌더링
  // }

  // update(others = []) {
  //   super.update(others);
  //   // Kerby만의 추가 로직
  // }
}
