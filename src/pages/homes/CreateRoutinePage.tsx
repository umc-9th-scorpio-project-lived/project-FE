import DownChevronIcon from '@/icons/DownChevronIcon';
import LeftChevronIcon from '@/icons/LeftChevronIcon';
import MiniCloseIcon from '@/icons/MiniCloseIcon';
import useBaseModal from '@/stores/modals/baseModal';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import useCoachModal from '@/hooks/useCoachModal';
import { formatRepeatLabel } from '@/utils/homes/routineUtils';
import { useNavigate } from 'react-router-dom';
import type { AlarmValue, RepeatValue } from '@/types/routines/Routine.types';
import { useRoutineStore } from '@/stores/routines/routineStore';
import { useHomeDateStore } from '@/stores/homes/homeStore';
import { formatDate } from '@/utils/homes/homeUtils';
import RoutineSnackbar from '@/components/commons/RoutineSnackbar';
import { useSnackbarStore } from '@/stores/homes/snackbarStore';

// 루틴 제목 최대 길이
const MAX_TITLE_LENGTH = 50;

const CreateRoutinePage = () => {
  const { openModal } = useBaseModal();
  const navigate = useNavigate();

  // 아이콘 선택 코치 모달 - 계정당 1회 노출 설정
  const { openCoach, close: closeCoach } = useCoachModal('coach:icon');

  // 루틴 상태 관리
  const title = useRoutineStore((s) => s.draft.title);
  const icon = useRoutineStore((s) => s.draft.icon);
  const repeat = useRoutineStore((s) => s.draft.repeat);
  const alarm = useRoutineStore((s) => s.draft.alarm);

  const {
    setTitle,
    setRepeat,
    setAlarm,
    resetDraft,
    createRoutine,
    isLoading,
  } = useRoutineStore();

  const { selectedDate } = useHomeDateStore();

  // 루틴 제목 입력 상태
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [localTitle, setLocalTitle] = useState(title ?? '');
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      useSnackbarStore.getState().hide();
    };
  }, []);

  useEffect(() => {
    if (isTitleFocused) return;
    setLocalTitle(title ?? '');
    if (titleRef.current) titleRef.current.innerText = title ?? '';
  }, [title, isTitleFocused]);

  const hasTitle = localTitle.trim().length > 0;

  // 커서를 맨 뒤로 이동
  const moveCursorToEnd = (el: HTMLDivElement) => {
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(el);
    range.collapse(false);
    sel?.removeAllRanges();
    sel?.addRange(range);
  };

  // 최초 진입 시 draft 초기화
  useEffect(() => {
    resetDraft();
  }, []);

  // store title이 바뀌었을 때 contentEditable DOM 동기화
  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    if (isTitleFocused) return;
    const next = title ?? '';
    if (el.innerText !== next) el.innerText = next;
  }, [title, isTitleFocused]);

  // 반복 주기 라벨
  const repeatLabel = useMemo(() => formatRepeatLabel(repeat), [repeat]);

  // 알람 설정 라벨
  const alarmTimeLabel = useMemo(() => {
    const fallback = '오후 12:00';
    return alarm.enabled ? alarm.time || fallback : fallback;
  }, [alarm.enabled, alarm.time]);

  // 적용 버튼 활성화 여부
  const canSubmit = useMemo(() => {
    if (!localTitle.trim()) return false;
    if (repeat.type === 'NONE') return false;
    if (alarm.enabled && !alarm.time) return false;
    return true;
  }, [localTitle, repeat, alarm]);

  // 루틴 제목 입력 핸들러
  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    let next = el.innerText;

    if (next.length > MAX_TITLE_LENGTH) {
      next = next.slice(0, MAX_TITLE_LENGTH);
      el.innerText = next;
      moveCursorToEnd(el);
    }

    setLocalTitle(next);
  };

  // 루틴 제목 입력 포커스 핸들러
  const handleFocus = () => {
    setIsTitleFocused(true);

    setTimeout(() => {
      const el = titleRef.current;
      if (!el) return;
      if (el.innerText.trim().length > 0) moveCursorToEnd(el);
    }, 0);
  };

  // 루틴 제목 입력 포커스 아웃 핸들러
  const handleBlur = () => {
    setIsTitleFocused(false);

    const next = titleRef.current?.innerText ?? '';
    setLocalTitle(next);
    setTitle(next);
  };

  // 엔터 입력 방지
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') e.preventDefault();
  };

  // 뒤로가기 핸들러
  const handleClickBack = () => {
    resetDraft();
    navigate('/lived');
  };

  const handleSubmit = async () => {
    if (!canSubmit || isLoading) return;

    try {
      const startDate = formatDate(selectedDate);
      await createRoutine(startDate);

      resetDraft();
      navigate('/lived');
    } catch (e) {
      console.error('루틴 생성 실패', e);
    }
  };

  // 반복 주기 모달 오픈 핸들러
  const openRepeatModal = () => {
    openModal('setRepeatCycleModal', {
      position: 'bottom',
      props: {
        initialValue: repeat,
        onApply: (_summary: string, value: RepeatValue) => setRepeat(value),
      },
    });
  };

  // 알람 설정 모달 오픈 핸들러
  const openAlarmModal = () => {
    openModal('setAlarmModal', {
      position: 'bottom',
      props: {
        initialValue: alarm,
        onApply: (value: AlarmValue) => setAlarm(value),
      },
    });
  };

  return (
    <div className="w-full min-h-dvh px-4 pt-10 flex flex-col">
      <div className="relative flex w-full py-2 items-center justify-center">
        <LeftChevronIcon
          className="absolute left-0 w-7 h-7 text-gray-900"
          onClick={handleClickBack}
        />
        <span className="typo-h2_bold20 text-gray-900">루틴 추가</span>
      </div>

      <div className="flex flex-col flex-1 justify-between py-11">
        <div className="flex flex-col gap-11">
          <div className="flex items-center justify-center">
            <div className="relative">
              {/* 루틴 제목 입력 */}
              <div
                className={`w-26.5 h-26.5 rounded-lg px-2.5 py-2.5 transition-colors flex
      ${isTitleFocused ? 'items-center justify-start' : 'items-center justify-center'}
      ${isTitleFocused || hasTitle ? 'bg-primary-20' : 'bg-gray-100'}`}
                onClick={() => titleRef.current?.focus()}
              >
                {!hasTitle && !isTitleFocused && (
                  <div className="absolute inset-0 flex items-center justify-center px-2.5 py-2.5 pointer-events-none">
                    <span className="typo-body_reg14 text-gray-500">
                      루틴 제목
                    </span>
                  </div>
                )}

                <div
                  ref={titleRef}
                  contentEditable
                  suppressContentEditableWarning
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onInput={handleInput}
                  onKeyDown={handleKeyDown}
                  className={`w-full outline-none typo-body_reg14 whitespace-pre-wrap break-keep text-center wrap-normal
        ${isTitleFocused || hasTitle ? 'text-gray-900' : 'text-gray-500'}`}
                />
              </div>

              {/* 루틴 아이콘 선택 버튼 */}
              <button
                type="button"
                onClick={() =>
                  openModal('selectIconModal', { position: 'bottom' })
                }
                className="absolute -right-4 -bottom-4 w-9 h-9 rounded-full bg-gray-100 border border-screen-0 flex items-center justify-center"
              >
                <span className="typo-body_reg16 leading-none">
                  {icon ?? '👍'}
                </span>
              </button>

              {/* 아이콘 설정 코치 모달 */}
              {openCoach && (
                <>
                  <div className="fixed inset-0 z-40" onClick={closeCoach} />
                  <div className="absolute left-26 top-34.5 -translate-x-1/2 z-50">
                    <div className="relative bg-gray-700 text-screen-0 rounded-sm p-3.75 inline-block min-w-56.25">
                      <div className="flex gap-3 justify-center items-center ">
                        <div className="typo-body_reg12 text-screen-0 text-center whitespace-pre-line">
                          루틴 완료시 나타나는 아이콘입니다.
                          <br />
                          탭하여 변경 가능합니다.
                        </div>

                        <MiniCloseIcon
                          className="w-2.5 h-2.5 text-screen-0"
                          onClick={closeCoach}
                        />
                      </div>
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2">
                        <div className="w-4 h-4 bg-gray-700 rotate-45 rounded-xs" />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* 반복 주기/알람 설정 */}
          <div className="flex flex-col gap-3">
            {/* 반복 주기 설정 */}
            <div className="flex flex-col gap-2.5">
              <div className="typo-body_reg16 text-gray-900">반복 주기</div>
              <button
                type="button"
                onClick={openRepeatModal}
                className="w-full rounded-lg bg-gray-50 flex items-center justify-between px-4 py-4.5"
              >
                <span
                  className={
                    repeat.type === 'NONE'
                      ? 'typo-body_reg16 text-gray-500'
                      : 'typo-body_bold16 text-gray-900'
                  }
                >
                  {repeatLabel}
                </span>
                <DownChevronIcon className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* 알람 설정 */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between py-1 pr-0.5">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-timer" />
                  <span className="typo-bold_reg16 text-gray-900">알림</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setAlarm(
                        alarm.enabled
                          ? { enabled: false, time: alarm.time ?? '12:00' }
                          : { enabled: true, time: alarm.time ?? '12:00' }
                      )
                    }
                    className={`w-6 h-3 rounded-full relative transition-colors ${
                      alarm.enabled ? 'bg-primary-50' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 w-2 h-2 rounded-full bg-gray-50 transition-transform ${
                        alarm.enabled ? 'translate-x-0.5' : '-translate-x-2.5'
                      }`}
                    />
                  </button>

                  <span className="typo-body_reg12 text-gray-700">
                    {alarm.enabled ? '있음' : '없음'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                disabled={!alarm.enabled}
                onClick={openAlarmModal}
                className="w-full rounded-lg bg-gray-50 flex items-center justify-between px-4 py-4.5"
              >
                <span
                  className={
                    alarm.enabled
                      ? 'typo-body_bold16 text-gray-900'
                      : 'typo-body_reg16 text-gray-500'
                  }
                >
                  {alarmTimeLabel}
                </span>
                <DownChevronIcon className="w-6 h-6 text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        <div className="relative">
          {/* CTA */}
          <div
            role="button"
            className={`w-full rounded-full typo-body_bold18 py-3 text-center ${
              canSubmit
                ? 'bg-primary-50 text-screen-0'
                : 'bg-gray-100 text-gray-400'
            }`}
            onClick={() => {
              if (!canSubmit) return;
              handleSubmit();
            }}
          >
            루틴 추가하기
          </div>

          <div className="absolute w-full -top-20">
            <RoutineSnackbar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRoutinePage;
