import React, { useEffect, useMemo, useRef } from "react";

type WeekIntervalWheelProps = {
  value: number; // 1~5
  onChange: (v: number) => void;
  min?: number; // default 1
  max?: number; // default 5
};

const ITEM_H = 56; // 한 칸의 높이
const VISIBLE_ITEMS = 3; // 한 번에 보일 아이템 개수 (중앙 1개 + 위아래 1개씩)
const WHEEL_HEIGHT = ITEM_H * VISIBLE_ITEMS;

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

export const WeekIntervalWheel = ({
  value,
  onChange,
  min = 1,
  max = 5,
}: WeekIntervalWheelProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const items = useMemo(() => {
    const arr: number[] = [];
    for (let i = min; i <= max; i += 1) arr.push(i);
    return arr;
  }, [min, max]);

  const syncToValue = (v: number, behavior: ScrollBehavior = "auto") => {
    const el = ref.current;
    if (!el) return;
    const idx = items.indexOf(v);
    if (idx < 0) return;
    // 중앙에 위치시키기 위해 스크롤 조정
    el.scrollTo({ top: idx * ITEM_H, behavior });
  };

  useEffect(() => {
    syncToValue(clamp(value, min, max), "auto");
  }, []);

  const snap = () => {
    const el = ref.current;
    if (!el) return;

    const rawIdx = el.scrollTop / ITEM_H;
    const idx = clamp(Math.round(rawIdx), 0, items.length - 1);
    const next = items[idx];

    el.scrollTo({ top: idx * ITEM_H, behavior: "smooth" });
    if (next !== value) onChange(next);
  };

  const scheduleSnap = () => {
    const el = ref.current as any;
    if (!el) return;
    window.clearTimeout(el._t);
    el._t = window.setTimeout(snap, 150);
  };

  return (
    <div className="flex justify-center w-full">
      <div
        className="relative flex items-center justify-center overflow-hidden"
        style={{ height: WHEEL_HEIGHT, width: "200px" }}
      >
        {/* 중앙 선택 영역 하이라이트 (구분선) */}
        <div
          className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 w-full border-t border-b border-gray-900"
          style={{ height: ITEM_H }}
        />

        {/* 오른쪽 고정 텍스트: "주마다" */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 typo-body_bold14 text-gray-600 z-10">
          주마다
        </div>

        {/* 숫자 스크롤 영역 */}
        <div
          ref={ref}
          onScroll={scheduleSnap}
          className="h-full w-full overflow-y-auto snap-y snap-mandatory scrollbar-hide"
          style={{
            paddingTop: ITEM_H, // 위쪽 여백 (첫 번째 숫자가 중앙에 오게)
            paddingBottom: ITEM_H, // 아래쪽 여백 (마지막 숫자가 중앙에 오게)
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {items.map((n) => {
            const active = n === value;
            return (
              <div
                key={n}
                className="snap-center flex items-center justify-center"
                style={{ height: ITEM_H }}
              >
                <span
                  className={`
                  transition-all duration-200 pr-12
                  ${active ? "typo-body_bold18 text-gray-900 scale-110" : "typo-body_reg16 text-gray-400"}
                `}
                >
                  {n}
                </span>
              </div>
            );
          })}
        </div>

        {/* 위아래 그라데이션 마스크 (부드럽게 사라지는 효과) */}
        <div className="pointer-events-none absolute top-0 left-0 w-full h-10 bg-gradient-to-b from-white to-transparent z-10" />
        <div className="pointer-events-none absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-white to-transparent z-10" />
      </div>
    </div>
  );
};
