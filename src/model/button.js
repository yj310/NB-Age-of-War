class Button {
    constructor(x, y, width, height, color, strockColor, onPressed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.strockColor = strockColor;
        this.onPressed = onPressed;
    }

    contains(mouseX, mouseY) {
        return (mouseX >= this.x &&
            mouseX <= this.x + this.width &&
            mouseY >= this.y &&
            mouseY <= this.y + this.height);
    }

    render() {
        rect(x, y, unitWidth, unitHeight);
    }
}

class ImageButton extends Button {
    constructor(
        x, y,
        width, height,
        image,
        onPressed,
        color = '#FFFFFF',
        strockColor = '#000000'
    ) {
        super(x, y, width, height, color, strockColor, onPressed);
        this.image = image;
    }

    render() {
        rect(this.x, this.y, this.width, this.height);
        if (this.image) {
            image(this.image, this.x, this.y, this.width, this.height);
        }
    }
}