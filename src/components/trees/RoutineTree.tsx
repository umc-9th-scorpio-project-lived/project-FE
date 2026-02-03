import GoldenFruitIcon from '@/icons/GoldenFruitIcon';
import GrowingFruitIcon from '@/icons/GrowingFruitIcon';
import NormalFruitIcon from '@/icons/NormalFruitIcon';
import RoutineTreeLogIcon from '@/icons/RoutineTreeLogIcon';
import RoutineTreeMiddleIcon from '@/icons/RoutineTreeMiddleIcon';
import RoutineTreeTopIcon from '@/icons/RoutineTreeTopIcon';
import useBaseModal from '@/stores/modals/baseModal';
import type {
  Fruit,
  FruitType,
  FruitsStatistics,
} from '@/types/statistics/Statistics.types';

interface FruitWithPosition extends Fruit {
  top: number;
  left: number;
  middleIconIndex: number;
}

interface RoutineTreeProps {
  isFruitClickable?: boolean;
  width?: number; // px 단위
  fruitsData?: FruitsStatistics;
}

const RoutineTree = ({
  isFruitClickable = true,
  width,
  fruitsData = {
    summary: {
      goldCount: 0,
      normalCount: 0,
      growingCount: 0,
    },
    fruitList: [],
  },
}: RoutineTreeProps) => {
  // 종류별 열매 개수 총합
  const fruitCount =
    fruitsData.summary.goldCount +
    fruitsData.summary.growingCount +
    fruitsData.summary.normalCount;

  // 열매가 맺히는 부분(RoutineTreeMiddleIcon.tsx) 개수 계산
  const middleIconCount =
    fruitCount <= 5 ? 2 : 2 + Math.ceil((fruitCount - 5) / 3);

  // 기본 크기 (px 단위)
  const BASE_WIDTH = 280.73; // RoutineTreeMiddleIcon의 너비

  // scale factor 계산
  let scale = 1;
  if (width) {
    // 너비만 주어진 경우
    scale = width / BASE_WIDTH;
  }

  /** px을 rem 단위로 바꾸고 scale을 적용하는 함수 */
  const toScaledRem = (pixel: number) => {
    return (pixel / 16) * scale;
  };

  /** index번째 RoutineTreeMiddleIcon의 위치를 계산해주는 함수 */
  const getMiddleIconTop = (index: number) => {
    const spacing = 85.12; // 두 RoutineTreeMiddleIcon 사이 간격
    const baseTop = 82; // 첫 번재 RoutineTreeMiddleIcon의 위치

    return toScaledRem(baseTop + (middleIconCount - index - 1) * spacing);
  };

  /** 줄기 아이콘(RoutineTreeLogIcon)의 위치를 계산해주는 함수 */
  const getLogIconTop = () => {
    const baseTop = 312.31; // 열매가 1~5개일 때 줄기 위치
    const additionalHeight = (middleIconCount - 2) * 85.12;

    return toScaledRem(baseTop + additionalHeight);
  };

  /** 열매 위치를 계산해주는 함수 */
  const getFruits = (fruitsData: FruitsStatistics): FruitWithPosition[] => {
    const fruits: FruitWithPosition[] = [];

    fruitsData.fruitList.map((fruit, index) => {
      // 1번째 열매: 2번째 RoutineTreeMiddleIcon 좌측
      if (index === 0) {
        fruits.push({
          ...fruit,
          top: toScaledRem(84.82),
          left: toScaledRem(36.25),
          middleIconIndex: middleIconCount - 2, // 2번째 RoutineTreeMiddleIcon
        });
      }

      // 2번째 열매: 1번째 RoutineTreeMiddleIcon 우측
      if (index === 1) {
        fruits.push({
          ...fruit,
          top: toScaledRem(79.94),
          left: toScaledRem(166),
          middleIconIndex: middleIconCount - 1, // 1번째 RoutineTreeMiddleIcon
        });
      }

      // 3번째 열매: 2번째 RoutineTreeMiddleIcon 우측
      if (index === 2) {
        fruits.push({
          ...fruit,
          top: toScaledRem(84.82),
          left: toScaledRem(191),
          middleIconIndex: middleIconCount - 2, // 2번째 RoutineTreeMiddleIcon
        });
      }

      // 4번째 열매: 2번째 RoutineTreeMiddleIcon 중앙
      if (index === 3) {
        fruits.push({
          ...fruit,
          top: toScaledRem(90.82),
          left: toScaledRem(117),
          middleIconIndex: middleIconCount - 2, // 2번째 RoutineTreeMiddleIcon
        });
      }

      // 5번째 열매: 1번째 RoutineTreeMiddleIcon 좌측
      if (index === 4) {
        fruits.push({
          ...fruit,
          top: toScaledRem(75.94),
          left: toScaledRem(63),
          middleIconIndex: middleIconCount - 1, // 1번째 RoutineTreeMiddleIcon
        });
      }

      // 6번째 열매부터는 중앙 -> 좌측 -> 우측 순서로 배치하는 것을 반복
      if (index >= 5) {
        const middleIconIndex =
          middleIconCount - (Math.floor((index + 1) / 3) + 1);
        const position = (index - 5) % 3; // 0: 중앙, 1: 좌측, 2: 우측

        if (position === 0) {
          // 중앙
          fruits.push({
            ...fruit,
            top: toScaledRem(90.82),
            left: toScaledRem(117),
            middleIconIndex,
          });
        } else if (position === 1) {
          // 좌측
          fruits.push({
            ...fruit,
            top: toScaledRem(84.82),
            left: toScaledRem(36.25),
            middleIconIndex,
          });
        } else {
          // 우측
          fruits.push({
            ...fruit,
            top: toScaledRem(84.82),
            left: toScaledRem(191),
            middleIconIndex,
          });
        }
      }
    });

    return fruits;
  };

  const fruits = getFruits(fruitsData);

  /** 문자열로 열매 종류를 입력하면 아이콘을 반환해주는 함수 */
  const getFruitIcon = (fruitType: FruitType) => {
    switch (fruitType) {
      case 'GOLD':
        return (
          <GoldenFruitIcon
            style={{
              width: `${toScaledRem(49)}rem`,
              height: `${toScaledRem(50.66)}rem`,
            }}
          />
        );

      case 'NORMAL':
        return (
          <NormalFruitIcon
            style={{
              width: `${toScaledRem(49)}rem`,
              height: `${toScaledRem(50.66)}rem`,
            }}
          />
        );

      case 'GROWING':
        return (
          <GrowingFruitIcon
            style={{
              width: `${toScaledRem(49)}rem`,
              height: `${toScaledRem(50.66)}rem`,
            }}
          />
        );
    }
  };

  // 나무의 전체 높이를 동적으로 계산
  const treeHeight = getLogIconTop() + toScaledRem(90.33); // 90.33px은 RoutineTreeLogIcon 높이

  const { openModal } = useBaseModal();
  const handleFruitClick = () => {
    openModal('fruitModal', { position: 'center' });
  };

  return (
    // 상단 나뭇잎 / 중단 나뭇잎 / 줄기로 나뉜 루틴 나무 아이콘과 열매들을 위치에 맞게 배치하는 div
    // tailwind css는 동적으로 계산한 클래스명을 인식하지 못하므로 style을 사용해 배치
    <div
      className="flex flex-col items-center relative"
      style={{ minHeight: `${treeHeight}rem` }}
    >
      {/* 나무 줄기 부분 */}
      <RoutineTreeLogIcon
        className="relative"
        style={{
          width: `${toScaledRem(90.33)}rem`,
          height: `${toScaledRem(90.33)}rem`,
          top: `${getLogIconTop()}rem`,
        }}
      />

      {/* 열매가 맺히는 부분 */}
      {Array.from({ length: middleIconCount }).map((_, middleIconIndex) => (
        <div
          key={middleIconIndex}
          className="absolute"
          style={{ top: `${getMiddleIconTop(middleIconIndex)}rem` }}
        >
          <div className="relative">
            <RoutineTreeMiddleIcon
              style={{
                width: `${toScaledRem(280.73)}rem`,
                height: `${toScaledRem(170.12)}rem`,
              }}
            />

            {/* 열매 */}
            {fruits
              .filter((fruit) => fruit.middleIconIndex === middleIconIndex)
              .map((fruit, fruitIndex) => (
                <button
                  key={fruitIndex}
                  onClick={handleFruitClick}
                  disabled={!isFruitClickable}
                  className={`absolute ${isFruitClickable ? 'cursor-pointer' : 'cursor-default'}`}
                  style={{ top: `${fruit.top}rem`, left: `${fruit.left}rem` }}
                >
                  {getFruitIcon(fruit.type)}
                </button>
              ))}
          </div>
        </div>
      ))}

      {/* 열매가 맺히지 않는 부분(나무 상단부) */}
      <RoutineTreeTopIcon
        className="absolute"
        style={{
          width: `${toScaledRem(218.36)}rem`,
          height: `${toScaledRem(151.64)}rem`,
        }}
      />
    </div>
  );
};

export default RoutineTree;
