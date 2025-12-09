class MainMenuScreen extends GameScreen {
    constructor() {
        super();
        this.showCredits = false; // 제작자 정보 화면 표시 여부
    }

    onEnter() {
        this.showCredits = false; // 화면 진입 시 초기화
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

        // 로고 이미지 왼쪽 상단에 렌더링
        if (logoImage) {
            image(logoImage, 20, 20, 50, 50);
        }

        // 정보 버튼 (음소거 버튼 왼쪽에)
        if (infoImage) {
            const infoBtnX = mainFrame.width - 100; // 음소거 버튼(mainFrame.width - 50)보다 왼쪽
            const infoBtnY = 10;
            const infoBtnSize = 40;
            image(infoImage, infoBtnX + 5, infoBtnY + 5, 30, 30);
        }

        drawMuteButton();

        textAlign(CENTER, CENTER);


        this.drawTitleText();
        this.drawPressAnyKey();

        // 제작자 정보 화면 (메인 화면 위에 오버레이)
        if (this.showCredits) {
            this.drawCreditsScreen();
        }

        resetMatrix();
    }

    keyPressed(key) {
        setGameState(GameState.mainMenu);
    }

    mousePressed(mouseX, mouseY) {
        // 제작자 정보 화면이 열려있으면 닫기 버튼 체크
        if (this.showCredits) {
            const boxHeight = 550;
            const boxY = (mainFrame.height - boxHeight) / 2;
            const closeX = mainFrame.width / 2 - 50;
            const closeY = boxY + boxHeight - 60;
            const closeWidth = 100;
            const closeHeight = 40;

            if (mouseX >= closeX && mouseX <= closeX + closeWidth &&
                mouseY >= closeY && mouseY <= closeY + closeHeight) {
                this.showCredits = false;
                return;
            }
        }

        // Info 버튼 클릭 체크
        const infoBtnX = mainFrame.width - 100;
        const infoBtnY = 10;
        const infoBtnSize = 40;

        if (mouseX >= infoBtnX && mouseX <= infoBtnX + infoBtnSize &&
            mouseY >= infoBtnY && mouseY <= infoBtnY + infoBtnSize) {
            this.showCredits = true;
            return;
        }

        // 로고 이미지 클릭 체크
        const logoX = 20;
        const logoY = 20;
        const logoSize = 50;

        if (mouseX >= logoX && mouseX <= logoX + logoSize &&
            mouseY >= logoY && mouseY <= logoY + logoSize) {
            window.open('https://mediamba.ssu.ac.kr/', '_blank');
            return;
        }

        // 제작자 정보 화면이 열려있으면 게임 시작 안함
        if (this.showCredits) {
            return;
        }

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
        text(
            "unit_1_1.png, unit_1_2.png, unit_1_3.png, unit_1_4.png, unit_1_5.png ",
            mainFrame.width / 2,
            boxY + 405
        );

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
