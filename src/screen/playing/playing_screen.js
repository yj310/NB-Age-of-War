class PlayingScreen extends GameScreen {
    constructor() {
        super();

        /// type: Unit[]
        this.units = [];
        this.lastUnitId = -1;

        /// type: Button[]
        this.unitButtons = [];

        /// type: Frame[]
        this.topInterfaceFrames = [];
        this.bottomInterfaceFrames = [];

        /// type: Image[]
        // this.unitImages = [];

        this.topInterfaceFrame = new Frame(
            mainFrame.width - mainFrame.width, // x
            0, // y
            mainFrame.width, 100, // width, height
            '#FFFFFF', '#000000' // color, strockColor
        );

        this.bottomInterfaceFrame = new Frame(
            mainFrame.width - mainFrame.width, // x
            mainFrame.height - 200, // y
            mainFrame.width, 200, // width, height
            '#FFFFFF', '#000000' // color, strockColor
        );
    }

    onEnter() {
        this.setFirstStage();
    }

    update(screen) {
        this.units.forEach(unit => {
            unit.update();
        });
    }

    render(screen) {
        if (!(screen instanceof GameScreen)) return;
        drawPlaying(screen);

        translate(mainFrame.x, mainFrame.y);
        this.unitButtons.forEach(button => {
            button.render();
        });

        this.units.forEach(unit => {
            unit.render();
        });

        resetMatrix();
    }

    mousePressed(mouseX, mouseY) {
        this.unitButtons.forEach(button => {
            if (button.contains(mouseX, mouseY)) {
                button.onPressed();
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
        this.unitButtons = [];
        this.addUnitButton(0, (id) => new Unit1(id));
        this.addUnitButton(1, (id) => new Unit2(id));
        this.addUnitButton(2, (id) => new Unit3(id));
        this.addUnitButton(3, (id) => new Unit4(id));
        this.addUnitButton(4, (id) => new Unit5(id));
    }

    addUnitButton(index, createUnit) {
        const margin = 15;
        const padding = 10;
        const unitWidth = 80;
        const unitHeight = 80;

        const unitId = this.lastUnitId + 1;

        this.unitButtons.push(
            new ImageButton(
                this.bottomInterfaceFrame.x + margin + ((unitWidth + padding) * index),
                this.bottomInterfaceFrame.y + margin,
                unitWidth,
                unitHeight,
                unit1ImageList[index],
                () => this.addUnit(createUnit(unitId)),
            )
        );

        this.lastUnitId = unitId;
    }
}
