class UnitType {
    constructor(
        name,
        image,
        mpCost,
        width,
        height,
        velocityX,
        velocityY,
        hp,
        damage = 10,
        attackCooldown = 30,
        attackRange = 5,
        spriteSheet = null,
        animations = null,
        collisionWidth = null,
        collisionHeight = null
    ) {
        this.name = name;
        this.image = image;
        this.mpCost = mpCost;
        this.width = width;
        this.height = height;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.hp = hp;
        this.damage = damage;
        this.attackCooldown = attackCooldown;
        this.attackRange = attackRange;
        this.spriteSheet = spriteSheet;
        this.animations = animations;
        // 충돌 감지 사이즈 (기본값: width/2, height)
        this.collisionWidth = collisionWidth !== null ? collisionWidth : width / 2;
        this.collisionHeight = collisionHeight !== null ? collisionHeight : height;
    }
}