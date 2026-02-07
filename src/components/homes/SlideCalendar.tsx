import React, { useMemo, useRef, type PointerEvent } from 'react';
import { useHomeDateStore } from '@/stores/homes/homeStore';
import { WEEK_LABELS } from '@/constants';
import { addDays, isSameDay } from '@/utils/homes/homeUtils';
import { useRoutineStore } from '@/stores/routines/routineStore';

const SWIPE_THRESHOLD_PX = 40; // 스와이프로 인정할 최소 가로 이동 거리
const LOCK_THRESHOLD_PX = 8; // 축 잠금(가로/세로)을 결정하기 위한 최소 이동 거리

type Props = {
  onChange?: (date: Date) => void;
};

const SlideCalendar = ({ onChange }: Props) => {
  const {
    selectedDate,
    weekStartDate,
    setSelectedDate,
    goPrevWeek,
    goNextWeek,
  } = useHomeDateStore();

  const routines = useRoutineStore((s) => s.data?.routines ?? []);

  // 현재 주(weekStartDate) 기준 7일 배열
  const weekDates = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => addDays(weekStartDate, i));
  }, [weekStartDate]);

  // 선택 날짜가 현재 주 안에 포함되는지 여부
  const isSelectedDateInWeek = useMemo(() => {
    return weekDates.some((d) => isSameDay(d, selectedDate));
  }, [weekDates, selectedDate]);

  // 날짜 클릭/선택 처리
  const handleSelectDate = (d: Date) => {
    setSelectedDate(d);
    onChange?.(d);
  };

  // 현재 추적 중인 pointerId
  const pointerIdRef = useRef<number | null>(null);

  // 제스처 시작 지점(좌표/시간)
  const startRef = useRef({ x: 0, y: 0, t: 0 });

  // 사용자가 가로로 스와이프하는지(week 이동), 세로 스크롤하는지 축을 잠금
  const lockedAxisRef = useRef<'x' | 'y' | null>(null);

  const didDragRef = useRef(false);

  // 포인터 다운: 제스처 시작점 기록 + 포인터 캡처
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    pointerIdRef.current = e.pointerId;
    startRef.current = { x: e.clientX, y: e.clientY, t: Date.now() };
    lockedAxisRef.current = null;
    didDragRef.current = false;
  };

  // 포인터 이동: 축 잠금 결정 + 가로 제스처면 브라우저 기본 스크롤 방지
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (pointerIdRef.current !== e.pointerId) return;

    const dx = e.clientX - startRef.current.x;
    const dy = e.clientY - startRef.current.y;

    if (!lockedAxisRef.current) {
      if (Math.abs(dx) < LOCK_THRESHOLD_PX && Math.abs(dy) < LOCK_THRESHOLD_PX)
        return;
      lockedAxisRef.current = Math.abs(dx) >= Math.abs(dy) ? 'x' : 'y';
    }

    if (lockedAxisRef.current === 'x' && Math.abs(dx) >= SWIPE_THRESHOLD_PX) {
      didDragRef.current = true;
      e.preventDefault();
    }
  };

  // 포인터 업: 스와이프 조건 충족 시 스와이프 진행 + 캡처 해제
  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (pointerIdRef.current !== e.pointerId) return;

    const dx = e.clientX - startRef.current.x;
    const dy = e.clientY - startRef.current.y;

    pointerIdRef.current = null;

    // 세로 스크롤로 판정되면 스와이프 되지 않음
    if (lockedAxisRef.current === 'y') return;

    // 가로 스크롤일 경우면 스와이프 진행
    if (Math.abs(dx) >= SWIPE_THRESHOLD_PX && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) goNextWeek();
      else goPrevWeek();
    }
  };

  const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!didDragRef.current) return;
    e.preventDefault();
    e.stopPropagation();
    didDragRef.current = false;
  };

  return (
    <div className="w-full">
      <div
        className="w-full"
        style={{ touchAction: 'pan-y' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClickCapture={onClickCapture}
      >
        <div className="grid grid-cols-7 gap-4">
          {weekDates.map((d, idx) => {
            const isSelected = !!selectedDate && isSameDay(d, selectedDate);

            const isActiveDay =
              !!selectedDate &&
              isSelectedDateInWeek &&
              d.getDay() === selectedDate.getDay();

            const total = isSelected ? routines.length : 0;
            const done = isSelected
              ? routines.filter((r) => r.isDone).length
              : 0;

            const ratio = total > 0 ? done / total : 0;
            const isAllDone = total > 0 && done === total;

            const showProgress = isSelected && total > 0;

            const gradientCss =
              'linear-gradient(180deg, #FFFFFF 0%, #CFE691 22%, #8FC600 100%)';

            const fullColor = '#9FD416';

            return (
              <div
                key={d.toISOString()}
                role="button"
                tabIndex={0}
                onClick={() => handleSelectDate(d)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelectDate(d);
                  }
                }}
                className="flex flex-col items-center select-none"
              >
                <span
                  className={`typo-body_reg12 leading-none flex justify-center items-center ${isActiveDay ? 'text-primary-50' : 'text-gray-700'}`}
                >
                  {WEEK_LABELS[idx]}
                </span>

                <div className="py-1.25">
                  <span
                    className={[
                      'typo-body_reg16 leading-none min-w-9 min-h-9',
                      'flex items-center justify-center rounded-full',
                      ' relative overflow-hidden',
                      showProgress
                        ? 'border border-primary-50'
                        : 'border border-transparent',
                    ].join(' ')}
                  >
                    {showProgress && (
                      <span
                        aria-hidden
                        className="absolute inset-0 overflow-hidden rounded-full"
                      >
                        <span
                          className="absolute left-0 bottom-0 w-full"
                          style={{
                            height: `${ratio * 100}%`,
                            background: isAllDone ? fullColor : gradientCss,
                          }}
                        />
                      </span>
                    )}

                    <span
                      className={`relative z-10 ${showProgress && isAllDone ? 'text-screen-0' : 'text-gray-900'}`}
                    >
                      {d.getDate()}
                    </span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SlideCalendar;
