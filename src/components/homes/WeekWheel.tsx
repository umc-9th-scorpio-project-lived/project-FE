import { useDebouncedSnap } from '@/hooks/useDebounceSnap';
import { useEffect, useMemo, useRef } from 'react';

type ScrollBehavior = 'auto' | 'smooth';

type WeekWheelProps = {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
};

const ROW_HEIGHT = 56;
const VISIBLE_ROWS = 2;
const WHEEL_HEIGHT = ROW_HEIGHT * VISIBLE_ROWS;

// 선택 기준 == 윗칸 중앙
const SELECT_CENTER_Y = ROW_HEIGHT / 2;
// 음수 스크롤 방지용 상단 스페이서
const TOP_PADDING = SELECT_CENTER_Y;

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

// 반복 주기 - 특정 간격 주 선택 휠
export const WeekWheel = ({
  value,
  onChange,
  min = 1,
  max = 5,
}: WeekWheelProps) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const options = useMemo(() => {
    const arr: number[] = [];
    for (let i = min; i <= max; i += 1) arr.push(i);
    return arr;
  }, [min, max]);

  // idx -> scrollTop (TOP_PADDING 고려)
  const getScrollTopForIndex = (idx: number) =>
    TOP_PADDING + idx * ROW_HEIGHT - SELECT_CENTER_Y; // = idx*ROW_HEIGHT

  // scrollTop -> idx (TOP_PADDING 고려)
  const getIndexFromScrollTop = (top: number) =>
    (top - TOP_PADDING + SELECT_CENTER_Y) / ROW_HEIGHT;

  const scrollToValue = (v: number, behavior: ScrollBehavior = 'auto') => {
    const el = scrollRef.current;
    if (!el) return;
    const idx = options.indexOf(v);
    if (idx < 0) return;
    el.scrollTo({ top: getScrollTopForIndex(idx), behavior });
  };

  useEffect(() => {
    scrollToValue(clamp(value, min, max), 'auto');
  }, []);

  const snapToNearest = () => {
    const el = scrollRef.current;
    if (!el) return;

    const rawIndex = getIndexFromScrollTop(el.scrollTop);
    const nearestIndex = clamp(Math.round(rawIndex), 0, options.length - 1);
    const nextValue = options[nearestIndex];

    el.scrollTo({
      top: getScrollTopForIndex(nearestIndex),
      behavior: 'smooth',
    });
    if (nextValue !== value) onChange(nextValue);
  };

  const { schedule: scheduleSnap } = useDebouncedSnap(snapToNearest, 120);

  return (
    <div
      className="flex justify-center w-full"
      style={{ height: WHEEL_HEIGHT }}
    >
      <div
        className="relative overflow-hidden w-64"
        style={{ height: WHEEL_HEIGHT }}
      >
        <div
          className="pointer-events-none absolute left-0 top-0 w-full border-b-[0.5px] border-gray-500"
          style={{ height: ROW_HEIGHT }}
        />
        <div
          className="absolute right-18 top-0 flex items-center typo-body_bold14 text-gray-600 z-10"
          style={{ height: ROW_HEIGHT }}
        >
          주마다
        </div>

        <div
          ref={scrollRef}
          onScroll={scheduleSnap}
          className="h-full w-full overflow-y-auto scrollbar-hide"
          style={{
            paddingRight: 125,
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          {options.map((n) => {
            return (
              <div
                key={n}
                className="snap-center flex items-center justify-end pr-6"
                style={{ height: ROW_HEIGHT }}
              >
                <span className="transition-all duration-200 typo-body_bold18 text-gray-900">
                  {n}
                </span>
              </div>
            );
          })}
          <div style={{ height: ROW_HEIGHT }} />
        </div>
      </div>
    </div>
  );
};
