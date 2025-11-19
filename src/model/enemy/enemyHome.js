class EnemyHome {
  constructor(x = mainFrame.width, y = floorY) {
    this.horizontalRatio = 4;
    this.verticalRatio = 3;
    this.magnification = 40;
    this.width = this.horizontalRatio * this.magnification;
    this.height = this.verticalRatio * this.magnification;
    this.x = x - this.width - 40;
    this.y = y - this.height;
  }

  update() {}

  render() {
    image(homeImage, this.x, this.y, this.width, this.height);
  }
}
