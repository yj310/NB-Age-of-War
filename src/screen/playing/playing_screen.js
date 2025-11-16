class PlayingScreen extends GameScreen {
    constructor() {
        super();
        /// type: Unit[]
        this.units = [];
        /// type: Button[]
        this.unitButtons = [];

        /// type: Frame[]
        this.topInterfaceFrames = [];
        this.bottomInterfaceFrames = [];

        /// type: Image[]
        // this.unitImages = [];

        this.topInterfaceFrame = new Frame(
            gameScreen.width - gameScreen.width, // x
            0, // y
            gameScreen.width, 100, // width, height
            '#FFFFFF', '#000000' // color, strockColor
        );

        this.bottomInterfaceFrame = new Frame(
            gameScreen.width - gameScreen.width, // x
            gameScreen.height - 200, // y
            gameScreen.width, 200, // width, height
            '#FFFFFF', '#000000' // color, strockColor
        );
    }

    onEnter() {
        this.setFirstStage();
    }

    render(screen) {
        if (!(screen instanceof GameScreen)) return;
        drawPlaying(screen);

        this.unitButtons.forEach(button => {
            button.render(gameScreen);
        });
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

    setFirstStage() {
        const margin = 15;
        const padding = 10;
        const unitWidth = 80;
        const unitHeight = 80;

        this.unitButtons = [];
        for (let i = 0; i < 5; i++) {

            this.unitButtons.push(
                new ImageButton(
                    gameScreen.x + this.bottomInterfaceFrame.x + margin + ((unitWidth + padding) * i),
                    gameScreen.y + this.bottomInterfaceFrame.y + margin,
                    unitWidth,
                    unitHeight,
                    unit1ImageList[i],
                    () => this.addUnit(new Unit(1)),
                )
            );
        }
    }

}