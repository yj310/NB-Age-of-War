/// 데이터 초기화
function setData() {
    foundation = new Frame(
        windowWidth,
        windowHeight,
        '#333333',
        '#000000');

    gameScreen = new Frame(
        800,
        600,
        '#FFFFFF',
        '#000000');
    // 이미지 로드
    unit1ImageList = [
        loadImage('assets/images/unit_1_1.png'),
        loadImage('assets/images/unit_1_2.png'),
        loadImage('assets/images/unit_1_3.png'),
        loadImage('assets/images/unit_1_4.png'),
        loadImage('assets/images/unit_1_5.png'),
    ];
}
