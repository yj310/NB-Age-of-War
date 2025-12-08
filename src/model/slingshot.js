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

    // 기준점 기준:
    // (0, 0) = 손잡이와 가지가 갈라지는 분기점
    // 아래(+Y)로 손잡이, 위(-Y)로 두 가지가 올라감

    const lightR = 196, lightG = 145, lightB = 84;   // 기본 나무색
    const darkR = 150, darkG = 100, darkB = 60;     // 나무 그림자색

    // 손잡이 (세로 막대) - 두께 일정
    noStroke();
    fill(lightR, lightG, lightB);
    rect(-6, -6, 12, 36, 4); // x, y, w, h

    // 중앙 어두운 나무결 (살짝 그림자)
    fill(darkR, darkG, darkB);
    rect(-6, -3, 4, 32, 4);

    // 오른쪽 가지 ------------------------------------------------
    push();
    translate(0, 0);
    rotate(PI / 10);           // 오른쪽으로 살짝 기울이기

    // 오른쪽 나무 막대
    fill(lightR, lightG, lightB);
    rect(-5, -32, 10, 30, 4);

    // 중앙 어두운 나무결
    fill(darkR, darkG, darkB);
    rect(-5, -32, 4, 30, 4);

    // 오른쪽 밴드
    fill(80, 55, 35);
    rect(-5, -30, 10, 8, 3);

    // 오른쪽 윗면
    fill(lightR, lightG, lightB);
    rect(-5, -36, 10, 6, 3);
    pop();

    // 왼쪽 가지 -------------------------------------------------
    push();
    translate(0, 0);           // 분기점에서 시작
    rotate(-PI / 10);          // 왼쪽으로 살짝 기울이기

    // 왼쪽 나무 막대
    fill(lightR, lightG, lightB);
    rect(-5, -32, 10, 30, 4);  // 분기점에서 위로 올라가는 막대

    // 중앙 어두운 나무결
    fill(darkR, darkG, darkB);
    rect(-5, -32, 4, 30, 4);

    // 왼쪽 밴드 (끈 감은 부분)
    fill(80, 55, 35);
    rect(-5, -30, 10, 8, 3);

    // 왼쪽 윗면 (밝은 나무색 원통 윗면)
    fill(lightR, lightG, lightB);
    rect(-5, -36, 10, 6, 3);
    pop();


    // --------------------------------------------------------------------
    // 새총 고무줄 & 포켓
    // 고무줄은 화면 좌표 기준으로 대략 가지 윗부분에 연결되도록 고정 좌표 사용
    const leftBandX = -12;
    const leftBandY = -28;
    const rightBandX = 12;
    const rightBandY = -28;

    if (this.loadedUnit) {
      const unitOffsetX = this.loadedUnit.dragOffsetX - this.x;
      const unitOffsetY = this.loadedUnit.dragOffsetY - this.y;

      // 고무줄
      stroke(0);
      strokeWeight(2);
      line(leftBandX, leftBandY, unitOffsetX, unitOffsetY);
      line(rightBandX, rightBandY, unitOffsetX, unitOffsetY);

      // 포켓 (가죽 부분)
      noStroke();
      fill(100, 70, 40, 200);
      ellipse(unitOffsetX, unitOffsetY, 14, 10);

      // 장전된 유닛 렌더링 (기존 로직 유지)
      push();
      translate(unitOffsetX, unitOffsetY);
      tint(255, 200); // 반투명

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
        image(
          this.loadedUnit.image,
          -this.loadedUnit.width / 2,
          -this.loadedUnit.height / 2,
          this.loadedUnit.width,
          this.loadedUnit.height
        );
      } else {
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
      // 조준 중일 때 고무줄 표시 (포켓만 마우스 위치로 이동)
      const pullX = cos(this.aimAngle) * this.aimPower;
      const pullY = sin(this.aimAngle) * this.aimPower;

      stroke(0);
      strokeWeight(2);
      line(leftBandX, leftBandY, pullX, pullY);
      line(rightBandX, rightBandY, pullX, pullY);

      noStroke();
      fill(120, 90, 60, 150);
      ellipse(pullX, pullY, 16, 12);
    }

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

    // ------------------------------------------------------------------
    // 당긴 방향 계산
    // "새총 줄이 시작하는 위치 → 유닛을 걸고 당긴 위치" 벡터의
    // **반대 방향**으로 날아가도록 계산한다.
    //
    // 줄 시작 위치는 렌더링에서 사용한 왼/오른쪽 밴드의 중간 지점으로 본다.
    const leftBandX = -12;
    const leftBandY = -28;
    const rightBandX = 12;
    const rightBandY = -28;

    // 월드 좌표계에서의 줄 시작(중간) 위치
    const bandStartX = this.x + (leftBandX + rightBandX) / 2;
    const bandStartY = this.y + (leftBandY + rightBandY) / 2;

    // 줄 시작점 → 유닛이 놓인 위치
    const pullDx = releaseX - bandStartX;
    const pullDy = releaseY - bandStartY;
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

