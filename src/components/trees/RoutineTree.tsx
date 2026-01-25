import GoldenFruitIcon from "@/icons/GoldenFruitIcon";
import GrowingFruitIcon from "@/icons/GrowingFruitIcon";
import NormalFruitIcon from "@/icons/NormalFruitIcon";
import RoutineTreeLogIcon from "@/icons/RoutineTreeLogIcon";
import RoutineTreeMiddleIcon from "@/icons/RoutineTreeMiddleIcon";
import RoutineTreeTopIcon from "@/icons/RoutineTreeTopIcon";
import useBaseModal from "@/stores/modals/baseModal";

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

const RoutineTree = () => {
  // 임시 루틴 배열 (추후 API로 불러오기)
  const routines: Routine[] = [
    { title: "일어나자마자 이불 정리하기", achievement: 20 },
    { title: "정해진 시간에 일어나기", achievement: 90 },
    { title: "정해진 시간에 일어나기", achievement: 90 },
  ];

  // 열매가 맺히는 루틴의 개수 (달성률 30% 이상)
  const fruitCount = routines.filter((routine) => routine.achievement >= 30).length;

  // 열매가 맺히는 부분(RoutineTreeMiddleIcon.tsx) 개수 계산
  const middleIconCount = fruitCount <= 5 ? 2 : 2 + Math.ceil((fruitCount - 5) / 3);

  /** index번째 RoutineTreeMiddleIcon의 위치를 계산해주는 함수 */
  const getMiddleIconTop = (index: number) => {
    const spacing = 21.5; // 두 RoutineTreeMiddleIcon 사이 간격
    const baseTop = 20.5; // 첫 번재 RoutineTreeMiddleIcon의 위치

    return (baseTop + (middleIconCount - index - 1) * spacing) * 0.25;
  };

  /** 줄기 아이콘(RoutineTreeLogIcon)의 위치를 계산해주는 함수 */
  const getLogIconTop = () => {
    const baseTop = 76.5; // 열매가 1~5개일 때 줄기 위치
    const additionalHeight = (middleIconCount - 2) * 21.5;

    return (baseTop + additionalHeight) * 0.25;
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
            top: 21 * 0.25,
            left: 9 * 0.25,
            type: fruitType,
            middleIconIndex: middleIconCount - 2, // 2번째 RoutineTreeMiddleIcon
          });
        }

        // 2번째 열매: 1번째 RoutineTreeMiddleIcon 우측
        if (index === 1) {
          fruits.push({
            top: 20 * 0.25,
            left: 41.5 * 0.25,
            type: fruitType,
            middleIconIndex: middleIconCount - 1, // 1번째 RoutineTreeMiddleIcon
          });
        }

        // 3번째 열매: 2번째 RoutineTreeMiddleIcon 우측
        if (index === 2) {
          fruits.push({
            top: 21 * 0.25,
            left: 48 * 0.25,
            type: fruitType,
            middleIconIndex: middleIconCount - 2, // 2번째 RoutineTreeMiddleIcon
          });
        }

        // 4번째 열매: 2번째 RoutineTreeMiddleIcon 중앙
        if (index === 3) {
          fruits.push({
            top: 22.5 * 0.25,
            left: 29.5 * 0.25,
            type: fruitType,
            middleIconIndex: middleIconCount - 2, // 2번째 RoutineTreeMiddleIcon
          });
        }

        // 5번째 열매: 1번째 RoutineTreeMiddleIcon 좌측
        if (index === 4) {
          fruits.push({
            top: 19 * 0.25,
            left: 16 * 0.25,
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
              top: 22.5 * 0.25,
              left: 29.5 * 0.25,
              type: fruitType,
              middleIconIndex,
            });
          } else if (position === 1) {
            // 좌측
            fruits.push({
              top: 21 * 0.25,
              left: 9 * 0.25,
              type: fruitType,
              middleIconIndex,
            });
          } else {
            // 우측
            fruits.push({
              top: 21 * 0.25,
              left: 48 * 0.25,
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
        return <GoldenFruitIcon className="w-12.5" />;
      case "normal":
        return <NormalFruitIcon className="w-12.5" />;
      case "growing":
        return <GrowingFruitIcon className="w-12.5" />;
    }
  };

  // 나무의 전체 높이를 동적으로 계산
  const treeHeight = getLogIconTop() + 5.65; // 5.65rem은 RoutineTreeLogIcon 높이

  const { openModal } = useBaseModal();
  const handleFruitClick = () => {
    openModal("fruitModal", { position: "center" });
  };

  return (
    // 상단 나뭇잎 / 중단 나뭇잎 / 줄기로 나뉜 루틴 나무 아이콘과 열매들을 위치에 맞게 배치하는 div
    // tailwind css는 동적으로 계산한 클래스명을 인식하지 못하므로 style을 사용해 배치
    <div className="flex flex-col items-center relative" style={{ minHeight: `${treeHeight}rem` }}>
      {/* 나무 줄기 부분 */}
      <RoutineTreeLogIcon className="w-22.5 relative" style={{ top: `${getLogIconTop()}rem` }} />

      {/* 열매가 맺히는 부분 */}
      {Array.from({ length: middleIconCount }).map((_, middleIconIndex) => (
        <div
          key={middleIconIndex}
          className="absolute"
          style={{ top: `${getMiddleIconTop(middleIconIndex)}rem` }}
        >
          <div className="relative">
            <RoutineTreeMiddleIcon className="w-70" />

            {/* 열매 */}
            {fruits
              .filter((fruit) => fruit.middleIconIndex === middleIconIndex)
              .map((fruit, fruitIndex) => (
                <button
                  key={fruitIndex}
                  onClick={handleFruitClick}
                  className={`absolute cursor-pointer`}
                  style={{ top: `${fruit.top}rem`, left: `${fruit.left}rem` }}
                >
                  {getFruitIcon(fruit.type)}
                </button>
              ))}
          </div>
        </div>
      ))}

      {/* 열매가 맺히지 않는 부분(나무 상단부) */}
      <RoutineTreeTopIcon className="w-54.5 absolute" />
    </div>
  );
};

export default RoutineTree;
