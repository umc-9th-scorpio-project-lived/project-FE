import MiniGoldenFruitIcon from "@/icons/MiniGoldenFruitIcon";
import MiniGrowingFruitIcon from "@/icons/MiniGrowingFruitIcon";
import MiniNormalFruitIcon from "@/icons/MiniNormalFruitIcon";
import RoutineTreeLogIcon from "@/icons/RoutineTreeLogIcon";
import RoutineTreeMiddleIcon from "@/icons/RoutineTreeMiddleIcon";
import RoutineTreeTopIcon from "@/icons/RoutineTreeTopIcon";

// 임시 루틴 타입
type Routine = {
  title: string;
  achievement: number;
};

// 임시 열매 타입
type Fruit = {
  top: number;
  left: number;
  type: "golden" | "normal" | "growing";
  middleIconIndex: number;
};

const MiniRoutineTree = () => {
  // 임시 루틴 배열 (추후 API로 불러오기)
  const routines: Routine[] = [
    { title: "일어나자마자 이불 정리하기", achievement: 20 },
    { title: "정해진 시간에 일어나기", achievement: 90 },
    { title: "정해진 시간에 일어나기", achievement: 90 },
    { title: "정해진 시간에 일어나기", achievement: 90 },
    { title: "정해진 시간에 일어나기", achievement: 90 },
    { title: "정해진 시간에 일어나기", achievement: 90 },
    { title: "정해진 시간에 일어나기", achievement: 90 },
    { title: "정해진 시간에 일어나기", achievement: 90 },
    { title: "정해진 시간에 일어나기", achievement: 90 },
    { title: "정해진 시간에 일어나기", achievement: 90 },
  ];

  // 열매가 맺히는 루틴의 개수 (달성률 30% 이상)
  const fruitCount = routines.filter((routine) => routine.achievement >= 30).length;

  // 열매가 맺히는 부분(RoutineTreeMiddleIcon.tsx) 개수 계산
  const middleIconCount = fruitCount <= 5 ? 2 : 2 + Math.ceil((fruitCount - 5) / 3);

  /** px을 rem 단위로 바꿔주는 함수 */
  const toRem = (pixel: number) => {
    return pixel / 16;
  };

  /** index번째 RoutineTreeMiddleIcon의 위치를 계산해주는 함수 */
  const getMiddleIconTop = (index: number) => {
    const spacing = 40.4; // 두 RoutineTreeMiddleIcon 사이 간격(px)
    const baseTop = 32.56; // 첫 번째 RoutineTreeMiddleIcon의 위치(px)

    return toRem(baseTop + (middleIconCount - index - 1) * spacing);
  };

  /** 줄기 아이콘(RoutineTreeLogIcon)의 위치를 계산해주는 함수 */
  const getLogIconTop = () => {
    const baseTop = 133.17; // 열매가 1~5개일 때 줄기 위치
    const additionalHeight = (middleIconCount - 2) * 40.4;

    return toRem(baseTop + additionalHeight);
  };

  /** 열매 종류(황금, 일반, 성장 중)를 구분해주는 함수 */
  const getFruitType = (achievement: number): "golden" | "normal" | "growing" => {
    if (achievement >= 90) return "golden";
    if (achievement >= 60) return "normal";
    return "growing";
  };

  /** 열매 위치와 종류를 계산해주는 함수 */
  const getFruits = (): Fruit[] => {
    const fruits: Fruit[] = [];

    routines
      .filter((routine) => routine.achievement >= 30)
      .forEach((routine, index) => {
        const fruitType = getFruitType(routine.achievement);

        // 1번째 열매: 2번째 RoutineTreeMiddleIcon 좌측
        if (index === 0) {
          fruits.push({
            top: toRem(31.29),
            left: toRem(12.3),
            type: fruitType,
            middleIconIndex: middleIconCount - 2, // 2번째 RoutineTreeMiddleIcon
          });
        }

        // 2번째 열매: 1번째 RoutineTreeMiddleIcon 우측
        if (index === 1) {
          fruits.push({
            top: toRem(33.72),
            left: toRem(65.46),
            type: fruitType,
            middleIconIndex: middleIconCount - 1, // 1번째 RoutineTreeMiddleIcon
          });
        }

        // 3번째 열매: 2번째 RoutineTreeMiddleIcon 우측
        if (index === 2) {
          fruits.push({
            top: toRem(32.09),
            left: toRem(84.9),
            type: fruitType,
            middleIconIndex: middleIconCount - 2, // 2번째 RoutineTreeMiddleIcon
          });
        }

        // 4번째 열매: 2번째 RoutineTreeMiddleIcon 중앙
        if (index === 3) {
          fruits.push({
            top: toRem(36.05),
            left: toRem(47.61),
            type: fruitType,
            middleIconIndex: middleIconCount - 2, // 2번째 RoutineTreeMiddleIcon
          });
        }

        // 5번째 열매: 1번째 RoutineTreeMiddleIcon 좌측
        if (index === 4) {
          fruits.push({
            top: toRem(30.55),
            left: toRem(23.4),
            type: fruitType,
            middleIconIndex: middleIconCount - 1, // 1번째 RoutineTreeMiddleIcon
          });
        }

        // 6번째 열매부터는 중앙 -> 좌측 -> 우측 순서로 배치하는 것을 반복
        if (index >= 5) {
          const middleIconIndex = middleIconCount - (Math.floor((index + 1) / 3) + 1);
          const position = (index - 5) % 3; // 0: 중앙, 1: 좌측, 2: 우측

          if (position === 0) {
            // 중앙
            fruits.push({
              top: toRem(36.05),
              left: toRem(47.61),
              type: fruitType,
              middleIconIndex,
            });
          } else if (position === 1) {
            // 좌측
            fruits.push({
              top: toRem(31.29),
              left: toRem(12.3),
              type: fruitType,
              middleIconIndex,
            });
          } else {
            // 우측
            fruits.push({
              top: toRem(32.09),
              left: toRem(84.9),
              type: fruitType,
              middleIconIndex,
            });
          }
        }
      });

    return fruits;
  };

  const fruits = getFruits();

  /** 문자열로 열매 종류를 입력하면 아이콘을 반환해주는 함수 */
  const getFruitIcon = (fruitType: "golden" | "normal" | "growing") => {
    switch (fruitType) {
      case "golden":
        return <MiniGoldenFruitIcon className="w-5" />;
      case "normal":
        return <MiniNormalFruitIcon className="w-5" />;
      case "growing":
        return <MiniGrowingFruitIcon className="w-5" />;
    }
  };

  // 나무의 전체 높이를 동적으로 계산
  const treeHeight = getLogIconTop() + 2.24; // 2.24rem은 RoutineTreeLogIcon 높이

  return (
    // 상단 나뭇잎 / 중단 나뭇잎 / 줄기로 나뉜 루틴 나무 아이콘과 열매들을 위치에 맞게 배치하는 div
    // tailwind css는 동적으로 계산한 클래스명을 인식하지 못하므로 style을 사용해 배치
    <div className="flex flex-col items-center relative" style={{ minHeight: `${treeHeight}rem` }}>
      {/* 나무 줄기 부분 */}
      <RoutineTreeLogIcon
        className="relative"
        style={{ width: 35.83, height: 35.83, top: `${getLogIconTop()}rem` }}
      />

      {/* 열매가 맺히는 부분 */}
      {Array.from({ length: middleIconCount }).map((_, middleIconIndex) => (
        <div
          key={middleIconIndex}
          className="absolute"
          style={{ top: `${getMiddleIconTop(middleIconIndex)}rem` }}
        >
          <div className="relative">
            <RoutineTreeMiddleIcon style={{ width: 111.37, height: 67.49 }} />

            {/* 열매 */}
            {fruits
              .filter((fruit) => fruit.middleIconIndex === middleIconIndex)
              .map((fruit, fruitIndex) => (
                <div
                  key={fruitIndex}
                  className="absolute"
                  style={{ top: `${fruit.top}rem`, left: `${fruit.left}rem` }}
                >
                  {getFruitIcon(fruit.type)}
                </div>
              ))}
          </div>
        </div>
      ))}

      {/* 열매가 맺히지 않는 부분(나무 상단부) */}
      <RoutineTreeTopIcon className="absolute" style={{ width: 86.63, height: 60.16 }} />
    </div>
  );
};

export default MiniRoutineTree;
