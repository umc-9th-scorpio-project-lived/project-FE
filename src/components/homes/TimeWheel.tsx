import { useEffect, useRef, useMemo } from "react";

type TimeWheelProps = {
  items: string[];
  value: string;
  onChange: (v: string) => void;
  width?: string;
};

const ITEM_H = 56;
const VISIBLE_ITEMS = 3;

const TimeWheel = ({ items, value, onChange, width = "60px" }: TimeWheelProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  // 1. 무한 루프를 위해 데이터를 3세트 복사합니다.
  const extendedItems = useMemo(() => [...items, ...items, ...items], [items]);
  const originalLength = items.length;

  // 초기 위치 설정 (중간 세트의 해당 값 위치로 이동)
  const syncToValue = (v: string) => {
    const el = ref.current;
    if (!el) return;
    const baseIdx = items.indexOf(v);
    if (baseIdx < 0) return;
    // 중간 세트(index + length)로 이동
    el.scrollTo({ top: (baseIdx + originalLength) * ITEM_H });
  };

  useEffect(() => {
    syncToValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScroll = () => {
    const el = ref.current;
    if (!el) return;

    const scrollTop = el.scrollTop;
    const currentIdx = Math.round(scrollTop / ITEM_H);

    // 2. 경계 검사: 첫 번째 세트 끝이나 세 번째 세트 시작 부분에 도달하면 중앙으로 '점프'
    if (currentIdx < originalLength) {
      // 위로 너무 올라가면 아래쪽 동일 위치로 점프
      el.scrollTo({ top: (currentIdx + originalLength) * ITEM_H });
    } else if (currentIdx >= originalLength * 2) {
      // 아래로 너무 내려가면 위쪽 동일 위치로 점프
      el.scrollTo({ top: (currentIdx - originalLength) * ITEM_H });
    }

    // 3. 현재 중앙 세트 기준 실제 인덱스 계산 후 값 변경 알림
    const actualIdx = currentIdx % originalLength;
    const newValue = items[actualIdx];
    if (newValue !== value) {
      onChange(newValue);
    }
  };

  const snap = () => {
    const el = ref.current;
    if (!el) return;
    const idx = Math.round(el.scrollTop / ITEM_H);
    el.scrollTo({ top: idx * ITEM_H, behavior: "smooth" });
  };

  const scheduleSnap = () => {
    const el = ref.current as any;
    if (!el) return;
    window.clearTimeout(el._t);
    el._t = window.setTimeout(snap, 150);
  };

  return (
    <div className="relative overflow-hidden" style={{ height: ITEM_H * VISIBLE_ITEMS, width }}>
      <div
        ref={ref}
        onScroll={() => {
          handleScroll();
          scheduleSnap();
        }}
        className="h-full w-full overflow-y-auto snap-y snap-mandatory scrollbar-hide"
        style={{
          // 무한 휠에서는 데이터 자체가 앞뒤로 존재하므로 padding이 필요 없습니다.
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {extendedItems.map((item, idx) => (
          <div
            key={`${item}-${idx}`} // 중복된 값이 있으므로 index를 조합하여 key 생성
            className="snap-center flex items-center justify-center"
            style={{ height: ITEM_H }}
          >
            <span
              className={`transition-all duration-200 ${
                item === value ? "typo-body_bold18 text-gray-900" : "typo-body_reg16 text-gray-400"
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
