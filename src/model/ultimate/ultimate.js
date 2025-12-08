class Ultimate {
  constructor(
    id,
    x,
    y,
    width,
    height,
    spriteSheet = null,
    animations = null,
    damage = 999999,
    moveSpeed = 8
  ) {
    this.id = id;
    this.startX = x;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.spriteSheet = spriteSheet;
    this.animations = animations;
    this.damage = damage;
    this.moveSpeed = moveSpeed;

    // Animation properties
    this.currentAnimation = "move";
    this.currentFrame = 0;
    this.frameCounter = 0;

    // State properties
    this.lifetime = 0;
    this.isActive = true;
    this.phase = "moveRight"; // moveRight -> moveLeft -> disappear
    this.targetX = mainFrame.width;
    this.direction = 1; // 1: right, -1: left
  }

  update(enemies = []) {
    this.lifetime++;

    // Check if out of bounds
    if (this.x < -this.width * 2 || this.x > mainFrame.width + this.width) {
      this.isActive = false;
      return;
    }

    // Update animation
    this.updateAnimation();

    // Phase-based behavior
    if (this.phase === "moveRight") {
      // Move to the right
      this.x += this.moveSpeed;
      this.direction = 1;

      // Attack nearby enemies while moving
      this.attackNearbyEnemies(enemies);

      // Switch to left when reaching right edge
      if (this.x >= this.targetX - this.width) {
        this.phase = "moveLeft";
        this.targetX = this.startX - this.width;
        this.direction = -1;
      }
    } else if (this.phase === "moveLeft") {
      // Move to the left
      this.x -= this.moveSpeed;
      this.direction = -1;

      // Attack nearby enemies while moving
      this.attackNearbyEnemies(enemies);

      // Disappear when reaching starting position
      if (this.x <= this.targetX) {
        this.phase = "disappear";
        this.setAnimation("disappear");
      }
    } else if (this.phase === "disappear") {
      // Deactivate immediately when disappear phase starts
      this.isActive = false;
    }
  }

  attackNearbyEnemies(enemies = []) {
    // Kill all nearby enemies
    for (const enemy of enemies) {
      if (enemy.type === EntityType.ENEMY && this.isNearby(enemy)) {
        const actualDamage = Math.min(this.damage, enemy.hp);
        enemy.hp -= actualDamage;

        // Show damage number
        if (enemy.damageNumbers) {
          enemy.damageNumbers.push({
            value: actualDamage,
            x: enemy.x + enemy.width / 2,
            y: enemy.y,
            life: 30,
            maxLife: 30
          });
        }
      }
    }
  }

  isNearby(enemy) {
    // Check if enemy is close to ultimate character
    const attackRange = 100;
    const centerX = this.x + this.width / 2;
    const centerY = this.y + this.height / 2;
    const enemyCenterX = enemy.x + enemy.width / 2;
    const enemyCenterY = enemy.y + enemy.height / 2;

    const distance = dist(centerX, centerY, enemyCenterX, enemyCenterY);
    return distance <= attackRange;
  }

  updateAnimation() {
    if (!this.spriteSheet || !this.animations) return;

    const anim = this.animations[this.currentAnimation];
    if (!anim) return;

    this.frameCounter++;

    // Change frame based on speed
    if (this.frameCounter >= anim.speed) {
      this.frameCounter = 0;
      this.currentFrame = (this.currentFrame + 1) % anim.frameCount;
    }
  }

  setAnimation(animName) {
    if (!this.spriteSheet || !this.animations) return;

    if (this.currentAnimation !== animName && this.animations[animName]) {
      this.currentAnimation = animName;
      this.currentFrame = 0;
      this.frameCounter = 0;
    }
  }

  render() {
    if (!this.isActive) return;

    push();

    // Flip horizontally when moving left
    if (this.direction === -1) {
      translate(this.x + this.width, this.y);
      scale(-1, 1);
    }

    // Render sprite animation
    if (this.spriteSheet && this.animations && this.animations[this.currentAnimation]) {
      const anim = this.animations[this.currentAnimation];
      const spacing = anim.spacing || 0;
      const sx = anim.startX + (this.currentFrame * (anim.frameWidth + spacing));
      const sy = anim.startY;

      if (this.direction === -1) {
        // Flipped rendering
        image(
          this.spriteSheet,
          0, 0,
          this.width,
          this.height,
          sx,
          sy,
          anim.frameWidth,
          anim.frameHeight
        );
      } else {
        // Normal rendering
        image(
          this.spriteSheet,
          this.x,
          this.y,
          this.width,
          this.height,
          sx,
          sy,
          anim.frameWidth,
          anim.frameHeight
        );
      }
    } else {
      // Default rendering for debug
      if (this.direction === -1) {
        fill(255, 215, 0, 200);
        stroke(255, 165, 0);
        strokeWeight(3);
        rect(0, 0, this.width, this.height);
      } else {
        fill(255, 215, 0, 200);
        stroke(255, 165, 0);
        strokeWeight(3);
        rect(this.x, this.y, this.width, this.height);
      }
    }

    pop();
  }

  isAlive() {
    return this.isActive;
  }
}
