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
        textSize(18);

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

        fill(`  #999999${transparency.toString(16)}`);
        text("press any key to start", mainFrame.width / 2, 500);
    }

    drawTitleText() {
        fill("#000000");
        textSize(48);
        text("인형 왕국 대작전!", mainFrame.width / 2, 150);

    }
}
