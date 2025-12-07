class Unit {
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

    // 스프라이트 애니메이션 관련 속성
    this.spriteSheet = spriteSheet;
    this.animations = animations
    this.currentAnimation = "idle";
    this.currentFrame = 0;
    this.frameCounter = 0;
    
    // 드래그/던지기 관련 속성
    this.isDragged = false;
    this.isThrown = false;
    this.gravity = 0.3;
    this.dragOffsetX = 0;
    this.dragOffsetY = 0;
    this.lastMouseX = 0;
    this.lastMouseY = 0;
    this.throwVelocityX = 0;
    this.throwVelocityY = 0;
    
    // 새총 발사 관련 속성
    this.isSlingshotFired = false;
    this.slingshotTargetX = 0;
    this.slingshotTargetY = 0;
    this.slingshotDamage = 0;
    this.explosionRadius = 50; // 폭발 반경
  }

  render() {
    // 새총에 장전된 유닛은 렌더링하지 않음 (새총에서 렌더링)
    // 드래그 중이면 마우스 위치로 이동
    let renderX = this.x;
    let renderY = this.y;

    if (this.isDragged) {
      renderX = this.dragOffsetX - this.width / 2;
      renderY = this.dragOffsetY - this.height / 2;

      // 드래그 중 시각적 피드백 (반투명 + 테두리)
      tint(255, 200);
      stroke(0, 150, 255);
      strokeWeight(2);
    } else {
      // 공격 애니메이션 적용
      renderX += this.attackAnimationOffset;
    }

    // 스프라이트 시트가 있으면 애니메이션 프레임을 그림
    if (this.spriteSheet && this.animations && this.animations[this.currentAnimation]) {
      const anim = this.animations[this.currentAnimation];
      const spacing = anim.spacing || 0;
      const sx = anim.startX + (this.currentFrame * (anim.frameWidth + spacing));
      const sy = anim.startY;


      image(
        this.spriteSheet,
        renderX,
        renderY,
        this.width,
        this.height,
        sx,
        sy,
        anim.frameWidth,
        anim.frameHeight
      );
    } else if (this.image) {
      // 스프라이트 시트가 없으면 기본 이미지 사용
      image(this.image, renderX, renderY, this.width, this.height);
    } else {
      rect(renderX, renderY, this.width, this.height);
    }

    // 드래그 중이면 효과 리셋
    if (this.isDragged) {
      noTint();
      noStroke();
    }

    // HP 바 렌더링
    this.renderHpBar(renderX);

    // 데미지 숫자 렌더링
    this.renderDamageNumbers(renderX);
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
      
      // 데미지 숫자 위치를 현재 유닛 위치 기준으로 업데이트
      const currentX = renderX + this.width / 2;
      
      fill(255, 0, 0, 255 * alpha);
      textSize(16);
      textAlign(CENTER);
      text(`-${dmg.value}`, currentX, dmg.y - offsetY);
      noFill();
    }
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

  // 애니메이션 프레임 업데이트
  updateAnimation() {
    if (!this.spriteSheet || !this.animations) return;

    const anim = this.animations[this.currentAnimation];
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

  update(others = []) {
    // 드래그 중이면 업데이트 스킵
    if (this.isDragged) {
      return;
    }

    // 애니메이션 프레임 업데이트
    this.updateAnimation();

    const prevX = this.x;
    const prevY = this.y;

    // 던져진 상태면 중력 적용
    if (this.isThrown) {
      // 새총으로 발사된 경우 바닥/적/상대편 집 충돌 체크
      if (this.isSlingshotFired) {
        // 중력 적용
        this.throwVelocityY += this.gravity;
        
        // 이동
        this.x += this.throwVelocityX;
        this.y += this.throwVelocityY;
        
        // 바닥 충돌 체크
        const hitGround = this.y + this.height >= floorY;
        if (hitGround) {
          // 바닥에 닿으면 폭발 데미지 처리
          this.explode(others);
          // 유닛 제거 (죽음)
          this.hp = 0;
          return;
        }
        
        // 적과 충돌 체크
        for (const other of others) {
          if (other === this) continue;
          
          if (other.type === EntityType.ENEMY && this.isColliding(other)) {
            // 적과 충돌 시 폭발 데미지 처리
            this.explode(others);
            // 유닛 제거 (죽음)
            this.hp = 0;
            return;
          }
        }
        
        // 상대편 집(EnemyHome)과 충돌 체크
        for (const other of others) {
          if (other === this) continue;
          
          // EnemyHome은 type이 없을 수 있으므로 클래스 이름으로 체크
          if (other.constructor && other.constructor.name === 'EnemyHome' && this.isColliding(other)) {
            // 상대편 집과 충돌 시 폭발 데미지 처리
            this.explode(others);
            // 유닛 제거 (죽음)
            this.hp = 0;
            return;
          }
        }
        
        // 새총 발사된 유닛은 여기서 종료 (일반 충돌 체크 안 함)
        return;
      } else {
        // 일반 던지기
        this.throwVelocityY += this.gravity;
        this.x += this.throwVelocityX;
        this.y += this.throwVelocityY;
        
        // 바닥 충돌 체크
        if (this.y + this.height >= floorY) {
          this.y = floorY - this.height;
          this.throwVelocityY = 0;
          // 바닥에 닿으면 던지기 상태 해제하고 일반 이동으로 전환
          if (Math.abs(this.throwVelocityX) < 0.1) {
            this.isThrown = false;
            this.throwVelocityX = 0;
            this.throwVelocityY = 0;
          } else {
            // 바닥 마찰
            this.throwVelocityX *= 0.9;
          }
        }
      }
    } else {
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
        this.setAnimation("attack");
      } else if (Math.abs(this.velocityX) > 0.1 || Math.abs(this.velocityY) > 0.1) {
        // 이동 중이면 walk 애니메이션
        this.setAnimation("walk");
      } else {
        // 정지 상태면 idle 애니메이션
        this.setAnimation('idle');
      }

      // 1. 이동 먼저 시도
      this.x += this.velocityX;
      this.y += this.velocityY;
    }

    // 2. 충돌 체크 및 전투 (던져진 상태가 아닐 때만)
    if (!this.isThrown) {
      for (const other of others) {
        if (other === this) continue;

        if (this.isColliding(other)) {
          // 🔹 ENEMY와 충돌 → 이동 멈추고 공격
          if (other.type === EntityType.ENEMY) {
            this.x = prevX;
            this.y = prevY;
            
            // 충돌 중이면 공격 범위 내로 간주 (공격 가능)
            if (this.currentAttackCooldown === 0) {
              this.attackTarget(other);
            }
          }

          // 🔹 다른 Unit과 충돌 → 이동 멈춤
          if (other.type === EntityType.UNIT) {
            this.x = prevX;
            this.y = prevY;
          }
        }
      }
      
      // 3. 적 집(EnemyHome)과 충돌 체크 - 집 앞에 도달했는지
      for (const other of others) {
        if (other === this) continue;
        
        // EnemyHome 클래스인지 확인
        if (other.constructor && other.constructor.name === 'EnemyHome') {
          // 집의 왼쪽 가장자리
          const homeLeftEdge = other.x;
          const distanceToHome = this.x + this.width - homeLeftEdge;
          
          // 집 앞 공격 범위 내에 있으면 멈추고 공격
          if (distanceToHome <= other.attackRange && distanceToHome >= -this.width) {
            this.x = prevX;
            this.y = prevY;
            
            // 공격 쿨다운이 끝나면 집 공격
            if (this.currentAttackCooldown === 0) {
              this.attackEnemyHome(other);
            }
          }
        }
      }
    } else {
      // 던져진 상태일 때는 적과 충돌 시 데미지
      for (const other of others) {
        if (other === this) continue;
        
        if (this.isColliding(other) && other.type === EntityType.ENEMY) {
          // 적에게 데미지
          const damage = Math.min(this.damage * 2, other.hp); // 던지기 데미지는 2배
          other.hp -= damage;
          
          if (other.damageNumbers) {
            other.damageNumbers.push({
              value: damage,
              x: other.x + other.width / 2,
              y: other.y,
              life: 30,
              maxLife: 30
            });
          }
          
          // 던지기 상태 해제하고 일반 상태로 전환
          this.isThrown = false;
          this.throwVelocityX = 0;
          this.throwVelocityY = 0;
          break;
        }
      }
    }
  }
  
  // 유닛을 드래그 시작
  startDrag(mouseX, mouseY) {
    this.isDragged = true;
    this.dragOffsetX = mouseX;
    this.dragOffsetY = mouseY;
    this.lastMouseX = mouseX;
    this.lastMouseY = mouseY;
  }
  
  // 드래그 중 위치 업데이트
  updateDrag(mouseX, mouseY) {
    if (!this.isDragged) return;
    this.dragOffsetX = mouseX;
    this.dragOffsetY = mouseY;
    // 던지기 속도 계산을 위한 마지막 위치 저장
    this.lastMouseX = mouseX;
    this.lastMouseY = mouseY;
  }
  
  // 드래그 종료 및 던지기
  endDrag(mouseX, mouseY) {
    if (!this.isDragged) return;
    
    this.isDragged = false;
    
    // 던지기 속도 계산 (마우스 이동 방향과 거리 기반)
    const deltaX = mouseX - this.lastMouseX;
    const deltaY = mouseY - this.lastMouseY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    // 최소 거리 이상 움직였을 때만 던지기
    if (distance > 10) {
      this.isThrown = true;
      this.throwVelocityX = deltaX * 0.3; // 속도 조절
      this.throwVelocityY = deltaY * 0.3;
    } else {
      // 움직임이 적으면 원래 위치로
      this.isThrown = false;
      this.throwVelocityX = 0;
      this.throwVelocityY = 0;
    }
  }
  
  // 마우스가 유닛 위에 있는지 확인
  isPointInside(px, py) {
    return (
      px >= this.x &&
      px <= this.x + this.width &&
      py >= this.y &&
      py <= this.y + this.height
    );
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
    this.attackAnimationOffset = -3;
    this.attackAnimationDirection = 1;
  }
  
  // 적 집 공격
  attackEnemyHome(enemyHome) {
    if (!enemyHome || !enemyHome.enemyManager) return;
    
    // 적 집의 HP 감소
    const damage = Math.min(this.damage, enemyHome.enemyManager.hp);
    enemyHome.enemyManager.hp -= damage;
    
    // 공격 쿨다운 설정
    this.currentAttackCooldown = this.attackCooldown;
    
    // 공격 애니메이션 시작
    this.attackAnimationOffset = -3;
    this.attackAnimationDirection = 1;
  }
  isColliding(other) {
    return (
      this.x < other.x + other.width &&
      this.x + this.width > other.x &&
      this.y < other.y + other.height &&
      this.y + this.height > other.y
    );
  }

  attack() {}
  
  isAlive() {
    return this.hp > 0;
  }
  
  // 폭발 데미지 처리
  explode(others) {
    if (!this.slingshotDamage) return;
    
    // 폭발 시각 효과 (선택적)
    // 여기서는 데미지만 처리
    
    for (const other of others) {
      if (other === this) continue;
      
      // 적에게만 데미지 적용
      if (other.type !== EntityType.ENEMY) continue;
      
      // 거리 계산 (폭발 중심은 현재 유닛 위치)
      const explosionX = this.x + this.width / 2;
      const explosionY = this.y + this.height / 2;
      const otherCenterX = other.x + other.width / 2;
      const otherCenterY = other.y + other.height / 2;
      const dx = otherCenterX - explosionX;
      const dy = otherCenterY - explosionY;
      const distance = sqrt(dx * dx + dy * dy);
      
      // 폭발 반경 내에 있으면 데미지 및 밀려남
      if (distance <= this.explosionRadius) {
        const damage = Math.min(this.slingshotDamage, other.hp);
        other.hp -= damage;
        
        if (other.damageNumbers) {
          other.damageNumbers.push({
            value: damage,
            x: otherCenterX,
            y: other.y,
            life: 30,
            maxLife: 30
          });
        }
        
        // 적을 뒤로 밀어내기 (폭발 중심에서 멀어지는 방향)
        // 거리에 반비례하여 밀려나는 힘 계산 (가까울수록 강하게)
        const knockbackPower = (1 - distance / this.explosionRadius) * 8; // 최대 8의 힘
        const knockbackAngle = atan2(dy, dx); // 폭발 중심에서 적으로의 방향
        
        // 적의 velocity에 밀려나는 힘 추가 (뒤로 밀려나므로 반대 방향)
        other.velocityX += cos(knockbackAngle) * knockbackPower;
        other.velocityY += sin(knockbackAngle) * knockbackPower * 0.5; // 수직 방향은 약하게
      }
    }
    
    // 상대편 집(EnemyHome)에도 데미지 적용
    for (const other of others) {
      if (other === this) continue;
      
      if (other.constructor && other.constructor.name === 'EnemyHome') {
        const explosionX = this.x + this.width / 2;
        const explosionY = this.y + this.height / 2;
        const homeCenterX = other.x + other.width / 2;
        const homeCenterY = other.y + other.height / 2;
        const dx = homeCenterX - explosionX;
        const dy = homeCenterY - explosionY;
        const distance = sqrt(dx * dx + dy * dy);
        
        // 폭발 반경 내에 있으면 데미지
        if (distance <= this.explosionRadius && other.enemyManager) {
          const damage = Math.min(this.slingshotDamage, other.enemyManager.hp);
          other.enemyManager.hp -= damage;
        }
      }
    }
  }
}
