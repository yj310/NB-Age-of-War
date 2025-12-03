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
        animations = null
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
    }
}