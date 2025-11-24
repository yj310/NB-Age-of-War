class Enemy {
  constructor(id, image, level, x, y, width, height, velocityX, velocityY, hp, type, damage = 10, attackCooldown = 30, attackRange = 5) {
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
  }

  render() {
    // 공격 애니메이션 적용된 위치
    const renderX = this.x + this.attackAnimationOffset;
    
    if (this.image) {
      image(this.image, renderX, this.y, this.width, this.height);
    } else {
      rect(renderX, this.y, this.width, this.height);
    }
    
    // HP 바 렌더링
    this.renderHpBar(renderX);
    
    // 데미지 숫자 렌더링
    this.renderDamageNumbers(renderX);
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
