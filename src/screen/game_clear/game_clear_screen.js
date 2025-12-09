class GameClearScreen extends GameScreen {
    constructor() {
        super();
        this.showCredits = false;
        this.enterTick = 0;
    }

    onEnter() {
        this.showCredits = false;
        this.enterTick = tick;
    }

    render(screen) {
        drawMainFrame();

        translate(mainFrame.x, mainFrame.y);
        textAlign(CENTER, CENTER);

        // 3초(약 30틱, 1틱 = 0.1초) 후 자동으로 크레딧 표시
        if (!this.showCredits && tick - this.enterTick >= 30) {
            this.showCredits = true;
        }

        if (!this.showCredits) {
            this.drawGameClearText();
            this.drawPressAnyKey();
        } else {
            this.drawCreditsScreen();
        }

        resetMatrix();
    }

    keyPressed(key) {
        // Credits 화면이 표시되면 메인 메뉴로
        if (this.showCredits) {
            setGameState(GameState.mainMenu);
        } else {
            // 클리어 화면에서 키를 누르면 Credits 표시
            this.showCredits = true;
        }
    }

    mousePressed(mouseX, mouseY) {
        // Credits 화면에서 닫기 버튼 체크
        if (this.showCredits) {
            const boxHeight = 550;
            const boxY = (mainFrame.height - boxHeight) / 2;
            const closeX = mainFrame.width / 2 - 50;
            const closeY = boxY + boxHeight - 60;
            const closeWidth = 100;
            const closeHeight = 40;

            if (mouseX >= closeX && mouseX <= closeX + closeWidth &&
                mouseY >= closeY && mouseY <= closeY + closeHeight) {
                setGameState(GameState.mainMenu);
                return;
            }
        } else {
            // 클리어 화면에서 클릭하면 Credits 표시
            this.showCredits = true;
        }
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
        text("클릭하거나 키를 눌러 크레딧 보기", mainFrame.width / 2, 500);
    }

    drawGameClearText() {
        fill("#00AA00");
        textSize(48);
        text("게임 클리어!", mainFrame.width / 2, 200);

        fill("#000000");
        textSize(24);
        text("적의 집을 파괴했습니다!", mainFrame.width / 2, 280);
    }

    drawCreditsScreen() {
        // 반투명 배경
        fill(0, 0, 0, 200);
        noStroke();
        rect(0, 0, mainFrame.width, mainFrame.height);

        // 제작자 정보 박스
        const boxWidth = 800;
        const boxHeight = 550;
        const boxX = (mainFrame.width - boxWidth) / 2;
        const boxY = (mainFrame.height - boxHeight) / 2;

        // 박스 배경
        fill(255, 255, 255, 250);
        stroke(0);
        strokeWeight(3);
        rect(boxX, boxY, boxWidth, boxHeight, 10);

        // 제목
        noStroke();
        fill(0);
        textSize(36);
        textAlign(CENTER, CENTER);
        text("Credits", mainFrame.width / 2, boxY + 40);

        // 게임 이름
        textSize(24);
        text("인형 왕국 대작전!", mainFrame.width / 2, boxY + 90);

        // 개발자
        textSize(18);
        fill(50, 100, 200);
        text("👥 개발자", mainFrame.width / 2, boxY + 130);
        fill(0);
        textSize(14);
        text("김나윤(20253309), 이연지(20251693)", mainFrame.width / 2, boxY + 155);
        text("숭실대학교 미디어경영학과 | 미디어앤테크", mainFrame.width / 2, boxY + 175);

        // 사용한 P5.js 주요 기능들
        textSize(18);
        fill(50, 100, 200);
        text("🎨 사용한 P5.js 주요 기능들", mainFrame.width / 2, boxY + 220);
        fill(0);
        textSize(14);
        text("render(), update(), loadSound()", mainFrame.width / 2, boxY + 245);
        text("이미지 렌더링, 사운드 재생, 마우스/키보드 인터랙션", mainFrame.width / 2, boxY + 265);

        // AI 사용 비율
        textSize(18);
        fill(50, 100, 200);
        text("🤖 AI 사용 비율", mainFrame.width / 2, boxY + 310);
        fill(0);
        textSize(14);
        text("코드: 40%, AI: 60%", mainFrame.width / 2, boxY + 335);

        // AI를 활용한 콘텐츠 - 이미지
        textSize(18);
        fill(50, 100, 200);
        text("🖼️ AI 활용 콘텐츠 - 이미지", mainFrame.width / 2, boxY + 380);
        fill(0);
        textSize(14);
        text("unit_1_1.png, unit_1_2.png, unit_1_3.png, unit_1_4.png, unit_1_5.png", mainFrame.width / 2, boxY + 405);

        // 닫기 버튼
        const closeX = mainFrame.width / 2 - 50;
        const closeY = boxY + boxHeight - 60;
        const closeWidth = 100;
        const closeHeight = 40;

        fill(100, 150, 255);
        stroke(0);
        strokeWeight(2);
        rect(closeX, closeY, closeWidth, closeHeight, 5);

        fill(255);
        noStroke();
        textSize(18);
        text("닫기", mainFrame.width / 2, closeY + 20);
    }
}

