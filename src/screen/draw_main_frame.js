function drawMainFrame(color = "#FFFFFF") {
    rectMode(CORNER);
    fill(color);

    // mainFrame.x, y는 update.js에서 이미 화면 중앙 기준으로 계산됨
    push();
    translate(mainFrame.x, mainFrame.y);
    rect(0, 0, mainFrame.width, mainFrame.height);
    
    drawMuteButton();
    pop();
}

function drawMuteButton() {
    // 게임 플레이 중에는 상단 인터페이스 바에 버튼이 있으므로 여기서는 그리지 않음
    if (gameState === GameState.playing) return;

    const btnX = mainFrame.width - 50;
    const btnY = 10;
    const btnSize = 40;

    // 버튼 배경 (선택적)
    noStroke();
    // fill(200, 100); 
    // rect(btnX, btnY, btnSize, btnSize, 5);

    // 아이콘 이미지
    const icon = isMuted ? assetList["mute"] : assetList["volume"];
    if (icon) {
        image(icon, btnX + 5, btnY + 5, 30, 30);
    }
}