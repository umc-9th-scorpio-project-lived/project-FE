import DownChevronIcon from '@/icons/DownChevronIcon';
import LeftChevronIcon from '@/icons/LeftChevronIcon';
import MiniCloseIcon from '@/icons/MiniCloseIcon';
import { useRoutineStore } from '@/stores/homes/routineStore';
import useBaseModal from '@/stores/modals/baseModal';
import React, { useMemo, useRef, useState } from 'react';
import type { AlarmValue, RepeatValue } from '@/types/homes/Routine.types';
import DeleteIcon from '@/icons/DeleteIcon';
import useCoachModal from '@/hooks/useCoachModal';
import { formatRepeatLabel } from '@/utils/homes/routineUtils';
import { useNavigate } from 'react-router-dom';
import createRoutine from '@/services/routines/createRoutine';
import type { CreateRoutineRequest } from '@/types/routines/Routine.types';

// 루틴 제목 최대 길이
const MAX_TITLE_LENGTH = 50;

// 루틴 생성/수정 페이지 통합 관리
type Mode = 'create' | 'edit';

const HomeRoutinePage = ({ mode = 'create' as Mode }) => {
  const { openModal } = useBaseModal();
  const navigate = useNavigate();

  // 아이콘 선택 코치 모달 - 계정당 1회 노출 설정
  const { openCoach: openCoach, close: closeCoach } =
    useCoachModal('coach:icon');

  // 루틴 상태 관리
  const title = useRoutineStore((s) => s.draft.title);
  const icon = useRoutineStore((s) => s.draft.icon);
  const repeat = useRoutineStore((s) => s.draft.repeat);
  const alarm = useRoutineStore((s) => s.draft.alarm);

  const { setTitle, setRepeat, setAlarm, resetDraft } = useRoutineStore();

  // 루틴 제목 입력 상태
  const [isTitleFocused, setIsTitleFocused] = useState(false);

  const titleRef = useRef<HTMLDivElement>(null);
  const hasTitle = title !== null && title.trim().length > 0;

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

  const dummyRoutine: CreateRoutineRequest = {
    title: 'test routine',
    emoji: '👍',
    repeatType: 'WEEKLY',
    repeatInterval: 1,
    repeatValues: ['0', '2', '4'],
    isAlarmon: true,
    alarmTime: '13:30',
    startDate: '2026-02-01',
    repeatValueAsString: 'string',
  };

  const handleTestCreate = async () => {
    try {
      const res = await createRoutine(dummyRoutine);
      console.log('✅ 루틴 생성 성공', res.data);
    } catch (e) {
      console.error('❌ 루틴 생성 실패', e);
    }
  };

  // 페이지 타이틀 및 CTA 라벨
  const pageTitle = mode === 'edit' ? '루틴 수정' : '루틴 추가';
  const ctaLabel = mode === 'edit' ? '수정 완료' : '루틴 추가하기';

  return (
    <div className="w-full min-h-dvh px-4 pt-10 flex flex-col">
      <div className="relative flex w-full py-2 items-center justify-center">
        <LeftChevronIcon
          className="absolute left-0 w-7 h-7 text-gray-900"
          onClick={handleClickBack}
        />
        <span className="typo-h2_bold20 text-gray-900">{pageTitle}</span>

        {/* 수정 모드일 경우 루틴 삭제 버튼 노출 */}
        {mode === 'edit' && (
          <DeleteIcon
            className="absolute right-3 w-6 h-6 flex items-center justify-center"
            onClick={() =>
              openModal('deleteRoutineModal', { position: 'bottom' })
            }
          />
        )}
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

              {/* 아이콘 설정 코치 모달 */}
              {openCoach && (
                <>
                  <div className="fixed inset-0 z-40" onClick={closeCoach} />
                  <div className="absolute left-26 top-34.5 -translate-x-1/2 z-50">
                    <div className="relative bg-gray-700 text-screen-0 rounded-sm p-4 w-56">
                      <div className="flex gap-3 justify-center items-center ">
                        <div className="typo-body_reg12 text-screen-0 text-center z-10">
                          루틴 완료 시 나타나는 아이콘입니다.
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

          {/* 반복 주기 설정 */}
          <div className="flex flex-col gap-3">
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
                          ? { enabled: false, time: alarm.time ?? '오후 12:00' }
                          : { enabled: true, time: alarm.time ?? '오후 12:00' }
                      )
                    }
                    className={`w-6 h-3 rounded-full relative transition-colors ${
                      alarm.enabled ? 'bg-primary-50' : 'bg-gray-200'
                    }`}
                  >
                    {/* 알람 토글 */}
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

        {/* CTA 버튼 */}
        <div
          role="button"
          className={`w-full rounded-full typo-body_bold18 py-3 text-center ${
            canSubmit
              ? 'bg-primary-50 text-screen-0'
              : 'bg-gray-100 text-gray-400'
          }`}
          onClick={() => {
            if (!canSubmit) return;
            console.log({ title, icon, repeat, alarm });
            resetDraft();
            handleTestCreate();
            navigate('/lived');
          }}
        >
          {ctaLabel}
        </div>
      </div>
    </div>
  );
};

export default HomeRoutinePage;
