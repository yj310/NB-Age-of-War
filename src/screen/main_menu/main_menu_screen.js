class MainMenuScreen extends GameScreen {
    onEnter() { }

    render(screen) {
        drawMainMenu(screen);
    }

    keyPressed(key) {
        setGameState(GameState.mainMenu);
    }

    mousePressed(mouseX, mouseY) {
        setGameState(GameState.playing);
    }
}
