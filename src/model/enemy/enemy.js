class Enemy {
  constructor(id, image, level, x, y, width, height, velocityX, velocityY, hp, type, damage = 10, attackCooldown = 30, attackRange = 5, spriteSheet = null, animations = null) {
    this.id = id;
    this.image = image;
    this.level = level;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.maxHp = hp;
    this.hp = hp;
    this.type = type;
    this.damage = damage;
    this.attackCooldown = attackCooldown;
    this.currentAttackCooldown = 0;
    this.attackRange = attackRange;
    this.attackAnimationOffset = 0;
    this.attackAnimationDirection = 1;
    this.damageNumbers = [];
    this.spriteSheet = spriteSheet;
    this.animations = animations;
    this.currentAnimation = "idle";
    this.currentFrame = 0;
    this.frameCounter = 0;
  }

  render() {
    // 공격 애니메이션 적용된 위치
    const renderX = this.x + this.attackAnimationOffset;

    // 빨간색 아우라 렌더링 (뒤에 그리기)
    this.renderRedAura(renderX);

    // 이미지 좌우 반전
    push();
    translate(renderX + this.width, this.y);
    scale(-1, 1);

    // 스프라이트 시트가 있으면 애니메이션 프레임을 그림
    if (this.spriteSheet && this.animations && this.animations[this.currentAnimation]) {
      const anim = this.animations[this.currentAnimation];
      const spacing = anim.spacing || 0;
      const sx = anim.startX + (this.currentFrame * (anim.frameWidth + spacing));
      const sy = anim.startY;

      image(
        this.spriteSheet,
        0,
        0,
        this.width,
        this.height,
        sx,
        sy,
        anim.frameWidth,
        anim.frameHeight
      );
    } else if (this.image) {
      image(this.image, 0, 0, this.width, this.height);
    } else {
      rect(0, 0, this.width, this.height);
    }

    pop();

    // HP 바 렌더링
    this.renderHpBar(renderX);

    // 데미지 숫자 렌더링
    this.renderDamageNumbers(renderX);
  }
  
  renderRedAura(renderX) {
    // 부드러운 빨간색 아우라 효과를 위해 여러 개의 반투명 원형 그리기
    const centerX = renderX + this.width / 2;
    const centerY = this.y + this.height / 2;
    const maxRadius = Math.max(this.width, this.height) / 2 + 8; // 아우라 크기
    const layers = 8; // 레이어 개수 (많을수록 부드러움)
    
    // 여러 개의 반투명 빨간색 원형을 겹쳐서 부드러운 글로우 효과 생성
    for (let i = layers; i > 0; i--) {
      const radius = maxRadius * (i / layers);
      const alpha = 30 / i; // 안쪽일수록 더 진함
      
      fill(255, 0, 0, alpha);
      noStroke();
      ellipse(centerX, centerY, radius * 2, radius * 2);
    }
    
    noFill();
  }
  
  renderHpBar(renderX) {
    const barWidth = this.width;
    const barHeight = 4;
    const barX = renderX;
    const barY = this.y - 8;
    
    // 배경 (빨간색)
    fill(200, 0, 0);
    rect(barX, barY, barWidth, barHeight);
    
    // 현재 HP (초록색)
    const hpRatio = this.hp / this.maxHp;
    fill(0, 200, 0);
    rect(barX, barY, barWidth * hpRatio, barHeight);
    
    // 테두리
    noFill();
    stroke(0);
    strokeWeight(1);
    rect(barX, barY, barWidth, barHeight);
    noStroke();
  }
  
  renderDamageNumbers(renderX) {
    for (let i = this.damageNumbers.length - 1; i >= 0; i--) {
      const dmg = this.damageNumbers[i];
      dmg.life--;
      
      if (dmg.life <= 0) {
        this.damageNumbers.splice(i, 1);
        continue;
      }
      
      const alpha = dmg.life / dmg.maxLife;
      const offsetY = (dmg.maxLife - dmg.life) * 2;
      
      // 데미지 숫자 위치를 현재 적 위치 기준으로 업데이트
      const currentX = renderX + this.width / 2;
      
      fill(255, 0, 0, 255 * alpha);
      textSize(16);
      textAlign(CENTER);
      text(`-${dmg.value}`, currentX, dmg.y - offsetY);
      noFill();
    }
  }

  // 애니메이션 프레임 업데이트
  updateAnimation() {
    if (!this.spriteSheet || !this.animations) return;

    const anim = this.animations[this.currentAnimation];
    if (!anim) return;

    this.frameCounter++;

    // speed 값에 따라 프레임 변경 속도 조절
    if (this.frameCounter >= anim.speed) {
      this.frameCounter = 0;
      this.currentFrame = (this.currentFrame + 1) % anim.frameCount;
    }
  }

  // 애니메이션 변경
  setAnimation(animName) {
    if (!this.spriteSheet || !this.animations) return;

    if (this.currentAnimation !== animName && this.animations[animName]) {
      this.currentAnimation = animName;
      this.currentFrame = 0;
      this.frameCounter = 0;
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
    // 애니메이션 프레임 업데이트
    this.updateAnimation();

    const prevX = this.x;
    const prevY = this.y;

    // 공격 쿨다운 감소
    if (this.currentAttackCooldown > 0) {
      this.currentAttackCooldown--;
    }

    // 공격 애니메이션 업데이트
    if (this.attackAnimationOffset !== 0) {
      this.attackAnimationOffset += this.attackAnimationDirection * 2;
      if (Math.abs(this.attackAnimationOffset) >= 5) {
        this.attackAnimationDirection *= -1;
      }
      if (this.attackAnimationOffset * this.attackAnimationDirection < 0) {
        this.attackAnimationOffset = 0;
        this.attackAnimationDirection = 1;
      }
    }

    // 애니메이션 상태 변경
    if (this.currentAttackCooldown > this.attackCooldown * 0.6) {
      // 공격 중이면 attack 애니메이션
      this.setAnimation('idle');
    } else if (Math.abs(this.velocityX) > 0.1 || Math.abs(this.velocityY) > 0.1) {
      // 이동 중이면 walk 애니메이션
      this.setAnimation('walk');
    } else {
      // 정지 상태면 idle 애니메이션
      this.setAnimation('idle');
    }

    // 밀려나는 속도 감쇠 (마찰 효과)
    this.velocityX *= 0.95;
    this.velocityY *= 0.95;
    
    // 원래 이동 방향으로 복귀 (왼쪽으로 이동)
    const originalVelocityX = -0.4; // 원래 속도 (EnemyManager에서 설정된 값)
    if (Math.abs(this.velocityX - originalVelocityX) > 0.1) {
      // 원래 속도로 점진적으로 복귀
      this.velocityX += (originalVelocityX - this.velocityX) * 0.1;
    } else {
      this.velocityX = originalVelocityX;
    }
    
    // 수직 속도는 0으로 복귀
    if (Math.abs(this.velocityY) > 0.1) {
      this.velocityY *= 0.9;
    } else {
      this.velocityY = 0;
    }
    
    // 1. 이동 먼저 시도
    this.x += this.velocityX;
    this.y += this.velocityY;

    // 2. 충돌 체크 및 전투
    for (const other of others) {
      if (other === this) continue;

      if (this.isColliding(other)) {
        // 🔹 UNIT과 충돌 → 이동 멈추고 공격
        if (other.type === EntityType.UNIT) {
          this.x = prevX;
          this.y = prevY;
          
          // 충돌 중이면 공격 범위 내로 간주 (공격 가능)
          if (this.currentAttackCooldown === 0) {
            this.attackTarget(other);
          }
        }

        // 🔹 다른 ENEMY 충돌 → 이동 멈춤
        if (other.type === EntityType.ENEMY) {
          this.x = prevX;
          this.y = prevY;
        }
      }
    }
    
    // 3. 집(Home)과 충돌 체크 - 집 앞에 도달했는지
    for (const other of others) {
      if (other === this) continue;
      
      // Home 클래스인지 확인
      if (other.constructor && other.constructor.name === 'Home') {
        // 집의 오른쪽 가장자리
        const homeRightEdge = other.x + other.width;
        const distanceToHome = homeRightEdge - this.x;
        
        // 집 앞 공격 범위 내에 있으면 멈추고 공격
        if (distanceToHome <= other.attackRange && distanceToHome >= -this.width) {
          this.x = prevX;
          this.y = prevY;
          
          // 공격 쿨다운이 끝나면 집 공격
          if (this.currentAttackCooldown === 0) {
            this.attackHome(other);
          }
        }
      }
    }
  }
  
  // 집 공격
  attackHome(home) {
    if (!home || !home.playerManager) return;
    
    // 집의 HP 감소
    const damage = Math.min(this.damage, home.playerManager.hp);
    home.playerManager.hp -= damage;
    
    // 공격 쿨다운 설정
    this.currentAttackCooldown = this.attackCooldown;
    
    // 공격 애니메이션 시작
    this.attackAnimationOffset = 3;
    this.attackAnimationDirection = -1;
  }
  
  attackTarget(target) {
    if (!target || target.hp <= 0) return;
    
    // 데미지 적용
    const actualDamage = Math.min(this.damage, target.hp);
    target.hp -= actualDamage;
    
    // 데미지 숫자 표시
    if (target.damageNumbers) {
      target.damageNumbers.push({
        value: actualDamage,
        x: target.x + target.width / 2,
        y: target.y,
        life: 30,
        maxLife: 30
      });
    }
    
    // 공격 쿨다운 설정
    this.currentAttackCooldown = this.attackCooldown;
    
    // 공격 애니메이션 시작
    this.attackAnimationOffset = 3;
    this.attackAnimationDirection = -1;
  }

  attack() {}
  
  isAlive() {
    return this.hp > 0;
  }
}
