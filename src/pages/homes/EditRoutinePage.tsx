import DownChevronIcon from '@/icons/DownChevronIcon';
import LeftChevronIcon from '@/icons/LeftChevronIcon';
import useBaseModal from '@/stores/modals/baseModal';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import DeleteIcon from '@/icons/DeleteIcon';
import { formatRepeatLabel } from '@/utils/homes/routineUtils';
import { useNavigate, useParams } from 'react-router-dom';
import type { AlarmValue, RepeatValue } from '@/types/routines/Routine.types';
import { useRoutineStore } from '@/stores/routines/routineStore';

// 루틴 제목 최대 길이
const MAX_TITLE_LENGTH = 50;

const EditRoutinePage = () => {
  const { openModal } = useBaseModal();
  const navigate = useNavigate();
  const { memberRoutineId } = useParams();
  const id = Number(memberRoutineId);

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
    fetchRoutineInfo,
    updateRoutine,
    isLoading,
  } = useRoutineStore();

  // 루틴 제목 입력 상태
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);

  const hasTitle = title !== null && title.trim().length > 0;

  useEffect(() => {
    if (!Number.isFinite(id)) {
      navigate('/lived', { replace: true });
      return;
    }

    fetchRoutineInfo(id).catch((e) => {
      console.error('루틴 상세 조회 실패', e);
      navigate('/lived', { replace: true });
    });

    return () => {
      resetDraft();
    };
  }, [id, fetchRoutineInfo, resetDraft, navigate]);

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
    if (title !== null && !title.trim()) return false;
    if (repeat.type === 'NONE') return false;
    if (alarm.enabled && !alarm.time) return false;
    return true;
  }, [title, repeat, alarm]);

  // 루틴 제목 입력 핸들러
  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    if (target.innerText.length > MAX_TITLE_LENGTH) {
      target.innerText = target.innerText.slice(0, MAX_TITLE_LENGTH);
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(target);
      range.collapse(false);
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  };

  // 루틴 제목 입력 포커스 핸들러
  const handleFocus = () => {
    setIsTitleFocused(true);
    setTimeout(() => {
      if (!titleRef.current) return;
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(titleRef.current);
      range.collapse(false);
      sel?.removeAllRanges();
      sel?.addRange(range);
    }, 0);
  };

  // 루틴 제목 입력 포커스 아웃 핸들러
  const handleBlur = () => {
    setIsTitleFocused(false);
    if (!titleRef.current) return;
    setTitle(titleRef.current.innerText);
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

  // 루틴 수정 완료 핸들러
  const handleSubmit = async () => {
    if (!canSubmit || isLoading) return;

    try {
      await updateRoutine(id);
      navigate('/lived');
    } catch (e) {
      console.error('루틴 수정 실패', e);
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
        <span className="typo-h2_bold20 text-gray-900">루틴 수정</span>

        <DeleteIcon
          className="absolute right-3 w-6 h-6 flex items-center justify-center"
          onClick={() =>
            openModal('deleteRoutineModal', {
              position: 'bottom',
              props: { memberRoutineId },
            })
          }
        />
      </div>

      <div className="flex flex-col flex-1 justify-between py-11">
        <div className="flex flex-col gap-11">
          <div className="flex items-center justify-center">
            <div className="relative">
              {/* 루틴 제목 입력 */}
              <div
                ref={titleRef}
                contentEditable
                suppressContentEditableWarning
                onFocus={handleFocus}
                onBlur={handleBlur}
                onInput={handleInput}
                onKeyDown={handleKeyDown}
                className={`w-26.5 h-26.5 rounded-lg flex items-center justify-center px-2.5 py-2.5 outline-none typo-body_reg14 text-center whitespace-pre-wrap break-all overflow-y-auto transition-colors ${
                  isTitleFocused || hasTitle
                    ? 'bg-primary-20 text-gray-900'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                {!hasTitle && !isTitleFocused ? '루틴 제목' : title}
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
          수정 완료
        </div>
      </div>
    </div>
  );
};

export default EditRoutinePage;
