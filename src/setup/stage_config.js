function createStageUnitConfig(stage, imageList = [], spriteSheetList = []) {
  // 스테이지별 설정이 다르면 조건 분기 가능
  switch (stage) {
    case 1:
      return [
        new UnitType(
          "Kerby",
          imageList[0],
          10,
          32,
          32,
          0.4,
          0,
          50,
          10,
          30,
          5,
          spriteSheetList[0]
        ),
        new UnitType(
          "WaddleDee",
          imageList[1],
          15,
          32,
          32,
          0.4,
          0,
          60,
          12,
          30,
          5,
          spriteSheetList[1]
        ),
        new UnitType(
          "Unit",
          imageList[2],
          20,
          32,
          32,
          0.4,
          0,
          70,
          15,
          30,
          5,
          spriteSheetList[2]
        ),
        new UnitType(
          "Unit",
          imageList[3],
          30,
          32,
          32,
          0.4,
          0,
          80,
          18,
          30,
          5,
          spriteSheetList[3]
        ),
        new UnitType(
          "Unit",
          imageList[4],
          50,
          32,
          32,
          0.4,
          0,
          100,
          25,
          30,
          5,
          spriteSheetList[4]
        ),
      ];

    default:
      return []; // 없는 스테이지는 빈 배열
  }
}
