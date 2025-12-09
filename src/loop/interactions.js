/// 키보드 입력
function keyPressed() {
    // 오디오 컨텍스트 시작 시도
    if (getAudioContext().state !== 'running') {
        userStartAudio();
    }

    if (currentScreen instanceof GameScreen) {
        currentScreen.keyPressed(key);
    }
}

/// 마우스 입력
function mousePressed() {
    // 오디오 컨텍스트 시작 시도 (브라우저 정책 대응)
    if (getAudioContext().state !== 'running') {
        userStartAudio().then(() => {
            // 오디오 컨텍스트가 시작된 후 음악이 꺼져있다면 재생
            checkAndPlayMusic();
        });
    } else {
        checkAndPlayMusic();
    }

    mouseXInMainFrame = mouseX - mainFrame.x;
    mouseYInMainFrame = mouseY - mainFrame.y;

    // 음소거 버튼 클릭 체크
    const btnX = mainFrame.width - 50;
    const btnY = 10;
    const btnSize = 40;

    if (mouseXInMainFrame >= btnX && mouseXInMainFrame <= btnX + btnSize &&
        mouseYInMainFrame >= btnY && mouseYInMainFrame <= btnY + btnSize) {
        toggleMute();
        return;
    }

    /// mouseX, mouseY
    if (currentScreen instanceof GameScreen) {
        currentScreen.mousePressed(mouseXInMainFrame, mouseYInMainFrame);
    }
}

function checkAndPlayMusic() {
    if (gameState === GameState.mainMenu && homeMusic && !homeMusic.isPlaying()) {
        homeMusic.loop();
    } else if (gameState === GameState.playing && gameMusic && !gameMusic.isPlaying()) {
        gameMusic.loop();
    }
}

function toggleMute() {
    isMuted = !isMuted;
    if (isMuted) {
        outputVolume(0);
    } else {
        outputVolume(1);
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

/// 마우스 드래그
function mouseDragged() {
    mouseXInMainFrame = mouseX - mainFrame.x;
    mouseYInMainFrame = mouseY - mainFrame.y;

    if (currentScreen instanceof GameScreen) {
        currentScreen.mouseDragged(mouseXInMainFrame, mouseYInMainFrame);
    }
}

/// 마우스 릴리즈
function mouseReleased() {
    mouseXInMainFrame = mouseX - mainFrame.x;
    mouseYInMainFrame = mouseY - mainFrame.y;

    if (currentScreen instanceof GameScreen) {
        currentScreen.mouseReleased(mouseXInMainFrame, mouseYInMainFrame);
    }
}