import React, { useEffect, useMemo, useRef } from 'react';
import { useDebouncedSnap } from '@/hooks/useDebounceSnap';

type ScrollBehavior = 'auto' | 'smooth';

type WheelProps<T> = {
  items: T[];
  value: T;
  onChange: (v: T) => void;

  width?: string | number;
  itemHeight?: number;
  visibleRows?: number;
  loop?: boolean;
  snapDelay?: number;

  getKey?: (item: T) => string;
  renderItem?: (item: T, selected: boolean) => React.ReactNode;
};

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

export default function Wheel<T>({
  items,
  value,
  onChange,
  width = 60,
  itemHeight = 56,
  visibleRows = 3,
  loop = false,
  snapDelay = 150,
  getKey,
  renderItem,
}: WheelProps<T>) {
  const ref = useRef<HTMLDivElement | null>(null);

  const isTwoOptionWheel = items.length === 2 && !loop;
  const baseSize = items.length;

  const extendedItems = useMemo(() => {
    if (!loop) return items;
    return [...items, ...items, ...items];
  }, [items, loop]);

  const scrollToIndex = (idx: number, behavior: ScrollBehavior = 'auto') => {
    const el = ref.current;
    if (!el) return;
    el.scrollTo({ top: idx * itemHeight, behavior });
  };

  const scrollToValue = (v: T) => {
    const idx = items.indexOf(v);
    if (idx < 0) return;

    const targetIdx = loop ? idx + baseSize : idx;
    scrollToIndex(targetIdx, 'auto');
  };

  useEffect(() => {
    scrollToValue(value);
  }, []);

  const emitNearest = () => {
    const el = ref.current;
    if (!el) return;

    let idx = Math.round(el.scrollTop / itemHeight);

    if (loop) {
      if (idx < baseSize) {
        idx += baseSize;
        scrollToIndex(idx, 'auto');
      } else if (idx >= baseSize * 2) {
        idx -= baseSize;
        scrollToIndex(idx, 'auto');
      }
    } else if (isTwoOptionWheel) {
      idx = clamp(idx, 0, 1);
    } else {
      idx = clamp(idx, 0, baseSize - 1);
    }

    const actualIdx = loop ? idx % baseSize : idx;
    const next = items[actualIdx];

    if (next !== value) onChange(next);
  };

  const snapToNearest = () => {
    const el = ref.current;
    if (!el) return;

    const idx = Math.round(el.scrollTop / itemHeight);
    scrollToIndex(idx, 'smooth');
  };

  const { schedule: scheduleSnap } = useDebouncedSnap(snapToNearest, snapDelay);

  return (
    <div
      className="relative overflow-hidden"
      style={{ height: itemHeight * visibleRows, width }}
    >
      <div
        ref={ref}
        onScroll={() => {
          emitNearest();
          scheduleSnap();
        }}
        className="h-full w-full overflow-y-auto scrollbar-hide"
        style={{
          paddingTop: itemHeight,
          paddingBottom: itemHeight,
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        {extendedItems.map((item, i) => {
          const key = getKey?.(item) ?? `${String(item)}-${i}`;
          const selected = item === value;

          return (
            <div
              key={key}
              className="flex items-center justify-center"
              style={{ height: itemHeight }}
            >
              {renderItem ? (
                renderItem(item, selected)
              ) : (
                <span
                  className={`transition-all duration-200 ${
                    selected
                      ? 'typo-body_bold16 text-gray-900'
                      : 'typo-body_reg16 text-gray-600'
                  }`}
                >
                  {String(item)}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
