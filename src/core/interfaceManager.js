class InterfaceManager {
  constructor() {
    this.unitButtons = [];
    this.unitTypes = [];
    this.buttons = [];
    this.playerManager = null;
    this.topInterfaceFrame = new Frame(
      mainFrame.width - mainFrame.width, // x
      0, // y
      mainFrame.width,
      100, // width, height
      "#FFFFFF",
      "#000000" // color, strockColor
    );
    this.bottomInterfaceFrame = new Frame(
      mainFrame.width - mainFrame.width, // x
      mainFrame.height - 200, // y
      mainFrame.width,
      200, // width, height
      "#FFFFFF",
      "#000000" // color, strockColor
    );
    this.hpBarFrame = new Frame(
      this.topInterfaceFrame.x,
      this.topInterfaceFrame.y + this.topInterfaceFrame.height - 10,
      this.topInterfaceFrame.width,
      10,
      "#FFFFFF",
      "#000000"
    );
  }

  update() {}

  render() {
    this.drawTopInterface();
    this.drawBottomInterface();
  }

  setUnitTypes(unitTypes) {
    this.unitTypes = unitTypes;
  }

  setPlayerManager(playerManager) {
    this.playerManager = playerManager;
  }

  setButtons(buttons) {
    this.buttons = buttons;
  }
  
  mousePressed(x, y) {
    this.unitButtons.forEach((button) => {
      if (button.contains(x, y)) {
        button.onPressed();
      }
    });

    this.buttons.forEach((button) => {
      if (button.contains(x, y)) {
        button.onPressed();
      }
    });
  }

  /// 상단 인터페이스 프레임
  drawTopInterface() {
    fill(this.topInterfaceFrame.color);
    stroke(this.topInterfaceFrame.strockColor);

    rect(
      this.topInterfaceFrame.x,
      this.topInterfaceFrame.y,
      this.topInterfaceFrame.width,
      this.topInterfaceFrame.height
    );

    noStroke();

    textAlign(LEFT, TOP);
    textSize(16);
    fill("#000000");
    text(
      "MP: " + this.playerManager.mp,
      this.topInterfaceFrame.x + 10,
      this.topInterfaceFrame.y + 10
    );
    text(
      "HP: " + this.playerManager.hp,
      this.topInterfaceFrame.x + 10,
      this.topInterfaceFrame.y + 30
    );
    noFill();

    this.buttons.forEach((button) => {
      button.render();
    });
  }

  /// 하단 인터페이스 프레임
  drawBottomInterface() {
    fill(this.bottomInterfaceFrame.color);
    stroke(this.bottomInterfaceFrame.strockColor);
    rect(
      this.bottomInterfaceFrame.x,
      this.bottomInterfaceFrame.y,
      this.bottomInterfaceFrame.width,
      this.bottomInterfaceFrame.height
    );

    noStroke();
    noFill();

    /// 유닛 버튼
    this.unitButtons.forEach((button) => {
      button.render();
    });
  }

  addUnitButton(index) {
    const margin = 15;
    const padding = 10;
    const unitWidth = 80;
    const unitHeight = 80;

    this.unitButtons.push(
      new UnitButton(
        this.bottomInterfaceFrame.x + margin + (unitWidth + padding) * index,
        this.bottomInterfaceFrame.y + margin,
        unitWidth,
        unitHeight,
        unit1ImageList[index],
        () => this.playerManager.addUnit(this.unitTypes[index]),
        this.unitTypes[index].mpCost
      )
    );
  }
}