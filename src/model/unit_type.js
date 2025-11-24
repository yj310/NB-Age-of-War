class UnitType {
    constructor(
        image,
        mpCost,
        width,
        height,
        velocityX,
        velocityY,
        hp,
        damage = 10,
        attackCooldown = 30,
        attackRange = 5
    ) {
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
    }
}