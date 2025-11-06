function update() {
    foundation = new Frame(
        max(windowWidth, gameScreen.width),
        max(windowHeight, gameScreen.height),
        foundation.color,
        foundation.strockColor
    );

    screenStartPosition = new Position(
        (foundation.width - gameScreen.width) / 2,
        (foundation.height - gameScreen.height) / 2
    );
}