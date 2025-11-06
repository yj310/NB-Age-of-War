class Frame {
    constructor(width, height, color, strockColor) {
        this.width = width;
        this.height = height;
        this.color = color;
        this.strockColor = strockColor;
    }
}

class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

/// 전체 배경
let foundation = null;

/// 게임 화면
let gameScreen = null;

let screenStartPosition = null;

/// 이미지
let unit1ImageList = null;
