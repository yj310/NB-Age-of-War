class MainMenuScreen extends GameScreen {
    render() {
        drawMainMenu();
    }

    keyPressed(key) {
        setGameState(GameState.playing);
    }

    mousePressed(mouseX, mouseY) {
        setGameState(GameState.playing);
    }
}
