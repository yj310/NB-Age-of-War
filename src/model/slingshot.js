class Slingshot {
  constructor(x, y) {
    this.x = x; // 새총 중심 X 위치
    this.y = y; // 새총 중심 Y 위치
    this.width = 40; // 새총 너비
    this.height = 50; // 새총 높이
    this.loadedUnit = null; // 장전된 유닛
    this.aimAngle = 0; // 조준 각도
    this.aimPower = 0; // 조준 파워 (당긴 거리)
    this.isAiming = false; // 조준 중인지
    this.range = 80; // 장전 가능 범위
    this.initialDragX = 0; // 유닛이 장전될 때의 초기 드래그 X 위치
    this.initialDragY = 0; // 유닛이 장전될 때의 초기 드래그 Y 위치
  }

  render() {
    push();
    translate(this.x, this.y);

    // 새총 본체 (Y자 모양)
    stroke(139, 69, 19); // 갈색
    strokeWeight(4);

    // 왼쪽 지지대
    line(-15, 0, -10, -30);
    // 오른쪽 지지대
    line(15, 0, 10, -30);
    // 가로 연결대
    line(-10, -30, 10, -30);

    // 새총 고무줄 (장전 중일 때)
    if (this.loadedUnit) {
      stroke(0, 0, 0);
      strokeWeight(2);
      const unitOffsetX = this.loadedUnit.dragOffsetX - this.x;
      const unitOffsetY = this.loadedUnit.dragOffsetY - this.y;
      // 왼쪽 고무줄
      line(-10, -30, unitOffsetX, unitOffsetY);
      // 오른쪽 고무줄
      line(10, -30, unitOffsetX, unitOffsetY);

      // 장전된 유닛 렌더링
      push();
      translate(unitOffsetX, unitOffsetY);
      tint(255, 200); // 반투명

      // 스프라이트 시트가 있으면 애니메이션 프레임을 그림
      if (this.loadedUnit.spriteSheet && this.loadedUnit.animations && this.loadedUnit.animations[this.loadedUnit.currentAnimation]) {
        const anim = this.loadedUnit.animations[this.loadedUnit.currentAnimation];
        const spacing = anim.spacing || 0;
        const sx = anim.startX + (this.loadedUnit.currentFrame * (anim.frameWidth + spacing));
        const sy = anim.startY;

        image(
          this.loadedUnit.spriteSheet,
          -this.loadedUnit.width / 2,
          -this.loadedUnit.height / 2,
          this.loadedUnit.width,
          this.loadedUnit.height,
          sx,
          sy,
          anim.frameWidth,
          anim.frameHeight
        );
      } else if (this.loadedUnit.image) {
        // 기본 이미지 사용
        image(
          this.loadedUnit.image,
          -this.loadedUnit.width / 2,
          -this.loadedUnit.height / 2,
          this.loadedUnit.width,
          this.loadedUnit.height
        );
      } else {
        // 이미지가 없으면 네모로 표시
        fill(100, 100, 200, 200);
        rect(
          -this.loadedUnit.width / 2,
          -this.loadedUnit.height / 2,
          this.loadedUnit.width,
          this.loadedUnit.height
        );
        noFill();
      }

      noTint();
      pop();
    } else if (this.isAiming) {
      // 조준 중일 때 고무줄 표시
      stroke(100, 100, 100);
      strokeWeight(2);
      const pullX = cos(this.aimAngle) * this.aimPower;
      const pullY = sin(this.aimAngle) * this.aimPower;
      line(-10, -30, pullX, pullY);
      line(10, -30, pullX, pullY);
    }

    // 새총 받침대 (원형)
    fill(139, 69, 19);
    noStroke();
    ellipse(0, 0, 20, 20);

    // 장전 범위 표시 (디버그용, 선택적)
    if (this.loadedUnit) {
      noFill();
      stroke(255, 255, 0);
      strokeWeight(1);
      ellipse(0, 0, this.range * 2, this.range * 2);
    }

    pop();
  }

  // 유닛이 새총 범위 내에 있는지 확인
  isUnitInRange(unit) {
    if (!unit || !unit.isDragged) return false;

    const dx = unit.dragOffsetX - this.x;
    const dy = unit.dragOffsetY - this.y;
    const distance = sqrt(dx * dx + dy * dy);

    return distance <= this.range;
  }

  // 유닛 장전
  loadUnit(unit) {
    if (!unit || !this.isUnitInRange(unit)) return false;

    this.loadedUnit = unit;
    this.isAiming = true;
    // 유닛을 새총 위치로 이동
    unit.dragOffsetX = this.x;
    unit.dragOffsetY = this.y;
    // 초기 드래그 위치 저장 (발사 방향 계산용)
    this.initialDragX = unit.dragOffsetX;
    this.initialDragY = unit.dragOffsetY;
    return true;
  }

  // 조준 업데이트 (마우스 위치 기반)
  updateAim(mouseX, mouseY) {
    if (!this.loadedUnit) return;

    // 마우스를 당긴 방향 (새총에서 마우스로)
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    this.aimAngle = atan2(dy, dx);
    this.aimPower = min(sqrt(dx * dx + dy * dy), 60); // 최대 당김 거리

    // 유닛을 당긴 위치로 이동 (시각적 피드백)
    this.loadedUnit.dragOffsetX = mouseX;
    this.loadedUnit.dragOffsetY = mouseY;
  }

  // 발사
  fire(targetX, targetY) {
    if (!this.loadedUnit) return null;

    const unit = this.loadedUnit;

    // 유닛이 현재 있는 위치 (드래그해서 놓은 위치)
    const releaseX = unit.dragOffsetX;
    const releaseY = unit.dragOffsetY;

    // 당긴 방향 계산 (초기 위치에서 놓은 위치로)
    const pullDx = releaseX - this.initialDragX;
    const pullDy = releaseY - this.initialDragY;
    const pullDistance = sqrt(pullDx * pullDx + pullDy * pullDy);

    // 실제 새총처럼 당긴 방향의 반대 방향으로 발사
    // 당긴 각도의 반대 방향 (180도 회전)
    const pullAngle = atan2(pullDy, pullDx);
    const fireAngle = pullAngle + PI; // 반대 방향

    // 발사 속도 계산 (당긴 거리에 비례, 더 강하게)
    const power = min(pullDistance / 2, 20); // 최대 속도 제한 증가
    const velocityX = cos(fireAngle) * power;
    const velocityY = sin(fireAngle) * power;

    // 목표 지점은 발사 방향으로 충분히 멀리 설정 (또는 무한대로)
    // 실제로는 바닥/적/집에 닿을 때까지 날아가므로 목표 지점은 참고용
    const farDistance = 2000; // 충분히 먼 거리
    const targetX_final = releaseX + cos(fireAngle) * farDistance;
    const targetY_final = releaseY + sin(fireAngle) * farDistance;

    // 유닛을 발사 상태로 설정
    unit.isDragged = false;
    unit.isThrown = true;
    unit.isSlingshotFired = true; // 새총 발사 표시
    unit.slingshotTargetX = targetX_final; // 참고용 목표 지점
    unit.slingshotTargetY = targetY_final;
    unit.slingshotDamage = unit.maxHp * 2; // 체력 * 2 데미지
    // 유닛을 놓은 위치에서 발사 (새총 중심이 아닌)
    unit.x = releaseX;
    unit.y = releaseY;
    unit.throwVelocityX = velocityX;
    unit.throwVelocityY = velocityY;

    // 새총 발사된 유닛은 일반 이동 속도 초기화
    unit.velocityX = 0;
    unit.velocityY = 0;

    // 새총 초기화
    const firedUnit = this.loadedUnit;
    this.loadedUnit = null;
    this.isAiming = false;
    this.aimAngle = 0;
    this.aimPower = 0;
    this.initialDragX = 0;
    this.initialDragY = 0;

    return firedUnit;
  }

  // 장전 해제
  unload() {
    this.loadedUnit = null;
    this.isAiming = false;
    this.aimAngle = 0;
    this.aimPower = 0;
    this.initialDragX = 0;
    this.initialDragY = 0;
  }
}

