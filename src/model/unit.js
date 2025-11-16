class Unit {
    constructor(id, image, level, x, y, width, height, velocityX, velocityY) {
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

class Unit1 extends Unit {
    constructor(
        id,
        image = unit1ImageList[0],
        level = 1,
        x = 0,
        y = 300,
        width = 30,
        height = 30,
        velocityX = 0.4,
        velocityY = 0
    ) {
        super(id, image, level, x, y, width, height, velocityX, velocityY);
    }
}

class Unit2 extends Unit {
    constructor(
        id,
        image = unit1ImageList[1],
        level = 1,
        x = 0,
        y = 300,
        width = 30,
        height = 30,
        velocityX = 0.4,
        velocityY = 0
    ) {
        super(id, image, level, x, y, width, height, velocityX, velocityY);
    }
}

class Unit3 extends Unit {
    constructor(
        id,
        image = unit1ImageList[2],
        level = 1,
        x = 0,
        y = 300,
        width = 30,
        height = 30,
        velocityX = 0.4,
        velocityY = 0
    ) {
        super(id, image, level, x, y, width, height, velocityX, velocityY);
    }
}

class Unit4 extends Unit {
    constructor(
        id,
        image = unit1ImageList[3],
        level = 1,
        x = 0,
        y = 300,
        width = 30,
        height = 30,
        velocityX = 0.4,
        velocityY = 0
    ) {
        super(id, image, level, x, y, width, height, velocityX, velocityY);
    }
}

class Unit5 extends Unit {
    constructor(
        id,
        image = unit1ImageList[4],
        level = 1,
        x = 0,
        y = 300,
        width = 30,
        height = 30,
        velocityX = 0.4,
        velocityY = 0
    ) {
        super(id, image, level, x, y, width, height, velocityX, velocityY);
    }
}