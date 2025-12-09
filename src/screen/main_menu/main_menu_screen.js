class MainMenuScreen extends GameScreen {
    onEnter() {
        if (gameMusic && gameMusic.isPlaying()) {
            gameMusic.stop();
        }
        if (homeMusic && !homeMusic.isPlaying()) {
            homeMusic.loop();
        }
    }

    render(screen) {
        drawMainFrame();

        translate(mainFrame.x, mainFrame.y);

        if (titleBackgroundImage) {
            image(titleBackgroundImage, 0, 0, mainFrame.width, mainFrame.height);
        }

        drawMuteButton();

        textAlign(CENTER, CENTER);


        this.drawTitleText();
        this.drawPressAnyKey();

        resetMatrix();
    }

    keyPressed(key) {
        setGameState(GameState.mainMenu);
    }

    mousePressed(mouseX, mouseY) {
        // 브라우저 정책상 첫 인터랙션에서 오디오 컨텍스트가 켜지므로,
        // 첫 클릭 시 바로 게임이 시작되지 않고 오디오가 켜지도록 처리
        if (getAudioContext().state !== 'running') {
            return;
        }
        setGameState(GameState.playing);
    }

    drawPressAnyKey() {
        textSize(24);

        /// 텍스트 투명도 계산
        const maxTransparency = 255;
        const minTransparency = 50;
        let value = (tick * 20) % ((maxTransparency - minTransparency) * 2);
        let transparency = 255;
        if (value <= (maxTransparency - minTransparency)) {
            transparency = value + minTransparency;
        } else {
            value = value - (maxTransparency - minTransparency);
            transparency = minTransparency + (maxTransparency - minTransparency) - value;
        }

        // 텍스트 가독성을 위해 외곽선 추가
        stroke(0);
        strokeWeight(4);
        fill(255, 255, 255, transparency);
        text("화면을 클릭하여 시작하세요", mainFrame.width / 2, 500);
        noStroke();
    }

    drawTitleText() {
        // 제목 가독성을 위해 외곽선 추가
        stroke(255);
        strokeWeight(6);
        fill("#000000");
        textSize(60);
        text("인형 왕국 대작전!", mainFrame.width / 2, 150);
        noStroke();
    }
}
