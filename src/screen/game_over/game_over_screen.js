class GameOverScreen extends GameScreen {
    onEnter() { }

    render(screen) {
        drawMainFrame();

        translate(mainFrame.x, mainFrame.y);
        textAlign(CENTER, CENTER);

        this.drawGameOverText();
        this.drawPressAnyKey();

        resetMatrix();
    }

    keyPressed(key) {
        setGameState(GameState.mainMenu);
    }

    mousePressed(mouseX, mouseY) {
        setGameState(GameState.mainMenu);
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
        text("클릭하거나 키를 눌러 메인 메뉴로", mainFrame.width / 2, 500);
    }

    drawGameOverText() {
        fill("#FF0000");
        textSize(48);
        text("게임 오버", mainFrame.width / 2, 200);
        
        fill("#000000");
        textSize(24);
        text("집이 파괴되었습니다...", mainFrame.width / 2, 280);
    }
}

