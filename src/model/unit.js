class Unit {
    constructor(
        id,
        image,
        level,
        x, y,
        width, height,
        velocityX, velocityY
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
    }

    render() {
        if (this.image) {
            image(this.image, this.x, this.y, this.width, this.height);
        } else {
            rect(this.x, this.y, this.width, this.height);
        }
    }

    update() {
        this.x += this.velocityX;
        this.y += this.velocityY;
    }
}
