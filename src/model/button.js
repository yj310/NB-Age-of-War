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
        strockColor,
        imageCrop = null // { sx, sy, sWidth, sHeight }
    ) {
        super(x, y, width, height, onPressed, color, strockColor);
        this.image = image;
        this.imageCrop = imageCrop;
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
            if (this.imageCrop) {
                // 이미지 크롭 사용
                image(
                    this.image,
                    this.x, this.y, this.width, this.height,
                    this.imageCrop.sx, this.imageCrop.sy, this.imageCrop.sWidth, this.imageCrop.sHeight
                );
            } else {
                // 전체 이미지 사용
                image(this.image, this.x, this.y, this.width, this.height);
            }
        }
    }
}

class EmojiButton extends Button {
    constructor(
        x, y,
        width, height,
        emojiGetter, // function returning string (e.g. () => isMuted ? "🔇" : "🔊")
        onPressed,
        color,
        strockColor
    ) {
        super(x, y, width, height, onPressed, color, strockColor);
        this.emojiGetter = emojiGetter;
    }

    render() {
        // Button Background
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
        // rect(this.x, this.y, this.width, this.height); // Optional background

        // Emoji Text
        fill(0);
        textSize(this.width * 0.8); // Adjust size relative to button width
        textAlign(CENTER, CENTER);
        text(this.emojiGetter(), this.x + this.width / 2, this.y + this.height / 2);
    }
}

class UnitButton extends ImageButton {
    constructor(
        x, y,
        width,
        height,
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
        // Card Background
        fill(this.color);
        stroke(this.strockColor);
        strokeWeight(2);
        rect(this.x, this.y, this.width, this.height, 10); // Rounded corners

        // Unit Image
        if (this.image) {
            const imgSize = this.width - 20;
            image(this.image, this.x + 20, this.y + 10, imgSize, imgSize, 25, 0, 106, 106);
        }

        // Cost Area
        const costHeight = 25;
        fill('#FFD700'); // Gold background for cost
        noStroke();
        rect(this.x, this.y + this.height - costHeight, this.width, costHeight, 0, 0, 10, 10); // Bottom rounded corners

        // Cost Text & Icon
        fill('#000000');
        textAlign(CENTER, CENTER);
        textSize(14);
        textStyle(BOLD);

        // Simple Coin Icon (Circle)
        fill('#FFA500');
        circle(this.x + 20, this.y + this.height - costHeight / 2, 12);

        fill('#000000');
        text(this.mpCost, this.x + this.width / 2 + 10, this.y + this.height - costHeight / 2);

        // 대기 중인 유닛 개수 표시 (Badge style)
        if (this.unitTypeIndex >= 0 && this.playerManager) {
            const queueCount = this.playerManager.getQueueCount(this.unitTypeIndex);
            if (queueCount > 0) {
                // Badge background
                fill('#FF4444');
                stroke('#FFFFFF');
                strokeWeight(2);
                circle(this.x + this.width - 10, this.y + 10, 24);

                // Count text
                fill('#FFFFFF');
                noStroke();
                textSize(14);
                textAlign(CENTER, CENTER);
                text(queueCount, this.x + this.width - 10, this.y + 10);
            }
        }

        // Reset styles
        noStroke();
        noFill();
    }
}