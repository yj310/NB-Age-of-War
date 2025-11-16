/// 키보드 입력
function keyPressed() {
    if (currentScreen instanceof GameScreen) {
        currentScreen.keyPressed(key);
    }
}

/// 마우스 입력
function mousePressed() {
    /// mouseX, mouseY
    if (currentScreen instanceof GameScreen) {
        currentScreen.mousePressed(mouseX, mouseY);
    }
}

/// 마우스 이동
function mouseMoved() {
    prevMouseX = mouseX;
    prevMouseY = mouseY;

    let hasMouseMoved = prevMouseX !== mouseX || prevMouseY !== mouseY;

    /// 마우스 이동이 없으면 종료
    if (!hasMouseMoved) return;


    if (currentScreen instanceof GameScreen) {
        currentScreen.mouseMoved(prevMouseX, prevMouseY, mouseX, mouseY);
    }
}