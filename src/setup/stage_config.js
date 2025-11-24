function createStageUnitConfig(stage, imageList) {
  // 스테이지별 설정이 다르면 조건 분기 가능
  switch (stage) {
    case 1:
      return [
        new UnitType(imageList[0], 10, 30, 30, 0.4, 0, 50, 10, 30, 5),
        new UnitType(imageList[1], 15, 30, 30, 0.4, 0, 60, 12, 30, 5),
        new UnitType(imageList[2], 20, 30, 30, 0.4, 0, 70, 15, 30, 5),
        new UnitType(imageList[3], 30, 30, 30, 0.4, 0, 80, 18, 30, 5),
        new UnitType(imageList[4], 50, 30, 30, 0.4, 0, 100, 25, 30, 5),
      ];

    default:
      return []; // 없는 스테이지는 빈 배열
  }
}
