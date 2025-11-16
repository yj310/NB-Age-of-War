class GameScreen {
    constructor(manager) {
        this.manager = manager; // 상태 전환에 사용할 참조
    }

    // 이 화면으로 들어올 때 1번 호출
    onEnter() { }

    // 이 화면에서 나갈 때 1번 호출
    onExit() { }

    // 매 프레임 업데이트 (dt: 초 단위 delta time)
    update(dt) { }

    // 매 프레임 그리기
    render(gameScreen) { }

    // 키 입력 처리
    keyPressed(key) { }

    // 마우스 입력 처리
    mousePressed(mouseX, mouseY) { }

    // 마우스 이동 처리
    mouseMoved(prevMouseX, prevMouseY, currentMouseX, currentMouseY) { }
}
