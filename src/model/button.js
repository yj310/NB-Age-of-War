class Button {
    constructor(x, y, width, height, onPressed, color, strockColor) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.onPressed = onPressed;
        this.color = color;
        this.strockColor = strockColor;
    }

    contains(mouseX, mouseY) {
        return (mouseX >= this.x &&
            mouseX <= this.x + this.width &&
            mouseY >= this.y &&
            mouseY <= this.y + this.height);
    }

    render() {
        rect(this.x, this.y, this.width, this.height);
    }
}

class ImageButton extends Button {
    constructor(
        x, y,
        width, height,
        image,
        onPressed,
        color,
        strockColor
    ) {
        super(x, y, width, height, onPressed, color, strockColor);
        this.image = image;
    }

    render() {
        if (this.color) {
            fill(this.color);
        } else {
            noFill();
        }
        if (this.strockColor) {
            stroke(this.strockColor);
        } else {
            noStroke();
        }
        rect(this.x, this.y, this.width, this.height);
        if (this.image) {
            image(this.image, this.x, this.y, this.width, this.height);
        }
    }
}

class UnitButton extends ImageButton {
    constructor(
        x, y,
        width, height,
        image,
        onPressed,
        mpCost,
        color = '#FFFFFF',
        strockColor = '#000000',
        unitTypeIndex = -1,
        playerManager = null
    ) {
        super(x, y, width, height, image, onPressed, color, strockColor);
        this.mpCost = mpCost;
        this.unitTypeIndex = unitTypeIndex;
        this.playerManager = playerManager;
    }

    render() {
        fill(this.color);
        stroke(this.strockColor);
        rect(this.x, this.y, this.width, this.height);
        if (this.image) {
            image(this.image, this.x, this.y, this.width, this.height);
        }

        noStroke();

        textAlign(CENTER, TOP);
        textSize(15);
        fill('#000000');
        text(`Cost: ${this.mpCost}`, this.x + this.width / 2, this.y + this.height + 5);
        
        // 대기 중인 유닛 개수 표시
        if (this.unitTypeIndex >= 0 && this.playerManager) {
            const queueCount = this.playerManager.getQueueCount(this.unitTypeIndex);
            if (queueCount > 0) {
                fill('#FF6600');
                textSize(18);
                text(`대기: ${queueCount}`, this.x + this.width / 2, this.y + this.height + 25);
            }
        }
        
        noFill();
    }
}