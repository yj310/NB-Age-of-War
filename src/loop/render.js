function render() {
    createCanvas(foundation.width, foundation.height);
    background(foundation.color);


    if (currentScreen instanceof GameScreen) {
        currentScreen.render(currentScreen);
    }
}