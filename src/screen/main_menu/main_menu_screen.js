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
        textAlign(CENTER, CENTER);


        this.drawTitleText();
        this.drawPressAnyKey();

        resetMatrix();
    }

    keyPressed(key) {
        setGameState(GameState.mainMenu);
    }

    mousePressed(mouseX, mouseY) {
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
