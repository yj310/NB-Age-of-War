function drawMainFrame(color = "#FFFFFF") {
    rectMode(CORNER);
    fill(color);

    if (windowWidth > mainFrame.width) {
        rectMode(CENTER);
        translate(windowWidth / 2, windowHeight / 2);
        rect(0, 0, mainFrame.width, mainFrame.height);
    } else {
        y = windowHeight / 2 - mainFrame.height / 2;
        rect(0, y, mainFrame.width, mainFrame.height);
    }

    resetMatrix();
}