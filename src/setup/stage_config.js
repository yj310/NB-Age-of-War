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
          spriteSheetList[0],
          (animations = {
            // 유닛 0번 애니메이션
            idle: {
              frameCount: 2,
              frameWidth: 45,
              frameHeight: 35,
              startX: 0,
              startY: 0,
              speed: 10,
              scale: 1.0,
            },
            walk: {
              frameCount: 10,
              frameWidth: 45,
              frameHeight: 45,
              startX: 0,
              startY: 80,
              speed: 5,
              scale: 0.3,
              spacing: 15,
            },
            attack: {
              frameCount: 2,
              frameWidth: 45,
              frameHeight: 35,
              startX: 0,
              startY: 70,
              speed: 3,
              scale: 1.0,
            },
          })
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
          "Zelda",
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
          "Mario",
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
          "Boo",
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
