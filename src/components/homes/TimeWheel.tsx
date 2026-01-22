import { useDebouncedSnap } from "@/hooks/useDebounceSnap";
import { useEffect, useMemo, useRef } from "react";

type TimeWheelProps<T extends string> = {
  items: T[];
  value: T;
  onChange: (v: T) => void;
  width?: string;
};

const ROW_HEIGHT = 56;
const VISIBLE_ROWS = 3;

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

const TimeWheel = <T extends string>({
  items,
  value,
  onChange,
  width = "60px",
}: TimeWheelProps<T>) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const isTwoOptionWheel = items.length === 2;

  if (isTwoOptionWheel) {
    const scrollToValue = (v: T) => {
      const el = scrollRef.current;
      if (!el) return;
      const idx = clamp(items.indexOf(v), 0, 1);
      el.scrollTo({ top: idx * ROW_HEIGHT, behavior: "auto" });
    };

    useEffect(() => {
      scrollToValue(value);
    }, []);

    const snapToNearest = () => {
      const el = scrollRef.current;
      if (!el) return;

      const index = clamp(Math.round(el.scrollTop / ROW_HEIGHT), 0, 1);
      const nextValue = items[index];

      el.scrollTo({ top: index * ROW_HEIGHT, behavior: "smooth" });
      if (nextValue !== value) onChange(nextValue);
    };

    const { schedule: scheduleSnap } = useDebouncedSnap(snapToNearest, 220);

    return (
      <div
        className="relative overflow-hidden"
        style={{ height: ROW_HEIGHT * VISIBLE_ROWS, width }}
      >
        <div
          ref={scrollRef}
          onScroll={scheduleSnap}
          className="h-full w-full overflow-y-auto scrollbar-hide"
          style={{
            paddingTop: ROW_HEIGHT,
            paddingBottom: ROW_HEIGHT,
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {items.map((item) => (
            <div
              key={item}
              className="flex items-center justify-center"
              style={{ height: ROW_HEIGHT }}
            >
              <span
                className={`transition-all duration-200 ${
                  item === value
                    ? "typo-body_bold16 text-gray-900"
                    : "typo-body_reg16 text-gray-600"
                }`}
              >
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 시 : 분 영역
  const tripledItems = useMemo(() => [...items, ...items, ...items], [items]);
  const baseSize = items.length;

  const scrollToValue = (v: T) => {
    const el = scrollRef.current;
    if (!el) return;
    const baseIndex = items.indexOf(v);
    if (baseIndex < 0) return;

    // 중간 세트로 이동
    el.scrollTo({ top: (baseIndex + baseSize) * ROW_HEIGHT });
  };

  useEffect(() => {
    scrollToValue(value);
  }, []);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    const index = Math.round(el.scrollTop / ROW_HEIGHT);

    // 경계 도달 시 중앙 세트로 점프
    if (index < baseSize) {
      el.scrollTo({ top: (index + baseSize) * ROW_HEIGHT });
    } else if (index >= baseSize * 2) {
      el.scrollTo({ top: (index - baseSize) * ROW_HEIGHT });
    }

    const actualIdx = index % baseSize;
    const next = items[actualIdx];
    if (next !== value) onChange(next);
  };

  const snapToNearest = () => {
    const el = scrollRef.current;
    if (!el) return;

    const index = Math.round(el.scrollTop / ROW_HEIGHT);
    el.scrollTo({ top: index * ROW_HEIGHT, behavior: "smooth" });
  };

  const { schedule: scheduleSnap } = useDebouncedSnap(snapToNearest, 150);

  return (
    <div className="relative overflow-hidden" style={{ height: ROW_HEIGHT * VISIBLE_ROWS, width }}>
      <div
        ref={scrollRef}
        onScroll={() => {
          handleScroll();
          scheduleSnap();
        }}
        className="h-full w-full overflow-y-auto snap-y snap-mandatory scrollbar-hide"
        style={{
          paddingTop: ROW_HEIGHT,
          paddingBottom: ROW_HEIGHT,
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {tripledItems.map((item, idx) => (
          <div
            key={`${item}-${idx}`}
            className="snap-center flex items-center justify-center"
            style={{ height: ROW_HEIGHT }}
          >
            <span
              className={`transition-all duration-200 ${
                item === value ? "typo-body_bold16 text-gray-900" : "typo-body_reg16 text-gray-600"
              }`}
            >
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeWheel;
