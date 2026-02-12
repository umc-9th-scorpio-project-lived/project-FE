import MiniCloseIcon from '@/icons/MiniCloseIcon';
import PlusIcon from '@/icons/PlusIcon';
import React, { useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useCoachModal from '@/hooks/useCoachModal';
import { useRoutineStore } from '@/stores/routines/routineStore';
import { useHomeDateStore } from '@/stores/homes/homeStore';
import { formatDate } from '@/utils/homes/homeUtils';
import HomeFloatingButton from './HomeFloatingButton';

const LONG_PRESS_MS = 500;
const MOVE_CANCEL_PX = 8;

const HomeContent = () => {
  const navigate = useNavigate();

  const { toggleRoutine } = useRoutineStore();
  const routines = useRoutineStore((s) => s.data?.routines);

  const { selectedDate } = useHomeDateStore();

  const date = formatDate(selectedDate);

  const { openCoach: openCoach, close: closeCoach } =
    useCoachModal('coach:home');

  const totalCount = routines.length;

  const doneCount = useMemo(
    () => routines.filter((r) => r.isDone).length,
    [routines]
  );

  const headerText =
    totalCount === 0
      ? '루틴을 시작해볼까요?'
      : doneCount === 0
        ? '아직 완료하지 않은 루틴이 있어요!'
        : doneCount === totalCount
          ? '오늘 루틴이 모두 완료되었어요!'
          : `루틴 ${doneCount}/${totalCount} 진행 중!`;

  const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressTriggered = useRef(false);
  const startPt = useRef<{ x: number; y: number } | null>(null);

  const clearPress = () => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
    startPt.current = null;
  };

  const handlePressStart = (e: React.PointerEvent, memberRoutineId: number) => {
    longPressTriggered.current = false;
    startPt.current = { x: e.clientX, y: e.clientY };

    pressTimer.current = setTimeout(() => {
      longPressTriggered.current = true;
      navigate(`/lived/edit/${memberRoutineId}`);
    }, LONG_PRESS_MS);
  };

  const handlePressMove = (e: React.PointerEvent) => {
    if (!startPt.current) return;
    const dx = Math.abs(e.clientX - startPt.current.x);
    const dy = Math.abs(e.clientY - startPt.current.y);
    if (dx > MOVE_CANCEL_PX || dy > MOVE_CANCEL_PX) {
      clearPress();
    }
  };

  const handlePressEnd = (memberRoutineId: number) => {
    if (pressTimer.current) clearTimeout(pressTimer.current);

    if (!longPressTriggered.current) toggleRoutine(memberRoutineId, date);

    clearPress();
  };

  const handlePressCancel = () => {
    clearPress();
  };

  return (
    <div className="relative flex flex-col gap-3.5 px-4 pt-6 h-[calc(100%-200px)]">
      <span className="typo-body_reg16 text-gray-900">{headerText}</span>

      <div className="absolute bottom-4 right-4 z-10">
        <HomeFloatingButton />
      </div>

      <div className="relative flex-1 min-h-0 overflow-y-auto pb-6">
        <div className="grid grid-cols-3 gap-5 justify-items-center">
          {routines.map((r) => {
            const isDone = r.isDone;

            return (
              <div
                key={r.memberRoutineId}
                className={`relative w-26.5 h-26.5 rounded-lg flex items-center justify-center select-none
                  ${isDone ? 'bg-primary-30' : 'bg-primary-20'}`}
                style={{ touchAction: 'manipulation' }}
                onPointerDown={(e) => handlePressStart(e, r.memberRoutineId)}
                onPointerMove={handlePressMove}
                onPointerUp={() => handlePressEnd(r.memberRoutineId)}
                onPointerCancel={handlePressCancel}
                onPointerLeave={handlePressCancel}
              >
                <span className="typo-body_reg14 px-3.5 text-center line-clamp-3 whitespace-pre-wrap break-keep wrap-normal">
                  {r.title}
                </span>

                {isDone && (
                  <div className="absolute inset-0 bg-screen-0/80 flex items-center justify-center">
                    <span className="text-3xl">{r.emoji}</span>
                  </div>
                )}
              </div>
            );
          })}
          <div
            className="w-26.5 h-26.5 flex flex-col gap-3.5 justify-center items-center bg-gray-50 rounded-lg"
            onClick={() => navigate('/lived/create')}
          >
            <PlusIcon className="w-5 h-5 text-gray-700" />
            <span className="typo-body_reg14">루틴 추가하기</span>
          </div>
        </div>

        {totalCount > 0 && openCoach && (
          <>
            <div className="fixed inset-0 z-40" onClick={closeCoach} />
            <div className="absolute left-20 top-30 -translate-x-1/2 z-50">
              <div className="relative bg-gray-700 text-screen-0 rounded-sm p-4">
                <div className="flex gap-3 items-center">
                  <div className="typo-body_reg12 text-center">
                    꾹 누르면 루틴을
                    <br />
                    수정할 수 있어요!
                  </div>
                  <MiniCloseIcon className="w-2.5 h-2.5" onClick={closeCoach} />
                </div>
                <div className="absolute -top-1 left-8 -translate-x-1/2">
                  <div className="w-4 h-4 bg-gray-700 rotate-45 rounded-xs" />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomeContent;
