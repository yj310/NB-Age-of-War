class PlayingScreen extends GameScreen {

    constructor() {
        super();
        /// type: Unit[]

    }

    onEnter() {
    }

    render(gameScreen) {
        if (!(gameScreen instanceof GameScreen)) return;
        drawPlaying(gameScreen);
    }


    mousePressed(mouseX, mouseY) {
        this.unitButtons.forEach(button => {
            if (button.contains(mouseX, mouseY)) {
                this.addUnit(button.unit);
            }
        });
    }

    addUnit(unit) {
        if (!(unit instanceof Unit)) return;
        this.units.push(unit);
    }

    removeUnit(unit) {
        if (!(unit instanceof Unit)) return;
        this.units = this.units.filter(u => u !== unit);
    }


}