/// 게임 시작 화면
function drawMainMenu(screen) {
    drawMainFrame();

    translate(mainFrame.x, mainFrame.y);
    textAlign(CENTER, CENTER);


    drawTitleText();
    drawPressAnyKey();

    resetMatrix();
}

function drawPressAnyKey() {
    textSize(18);

    /// 텍스트 투명도 계산
    maxTransparency = 255;
    minTransparency = 50;
    value = (tick * 10) % ((maxTransparency - minTransparency) * 2);
    if (value <= (maxTransparency - minTransparency)) {
        transparency = value + minTransparency;
    } else {
        value = value - (maxTransparency - minTransparency);
        transparency = minTransparency + (maxTransparency - minTransparency) - value;
    }

    fill(`  #000000${transparency.toString(16)}`);
    text("press any key to start", mainFrame.width / 2, 500);
}

function drawTitleText() {
    fill("#000000");
    textSize(48);
    text("인형 왕국 대작전!", mainFrame.width / 2, 150);

}