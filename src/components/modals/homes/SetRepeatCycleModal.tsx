import { useMemo, useState } from 'react';
import useBaseModal from '@/stores/modals/baseModal';
import { WEEK_LABELS } from '@/constants';
import { WeekWheel } from '../../homes/WeekWheel';
import CheckCircleIcon from '@/icons/CheckCircleIcon';
import type { RepeatValue } from '@/types/homes/Routine.types';
import { formatRepeatResult } from '@/utils/homes/routineUtils';

type Props = {
  initialValue?: RepeatValue;
  onApply?: (summary: string, value: RepeatValue) => void;
};

const SetRepeatModal = ({ initialValue, onApply }: Props) => {
  const { closeModal } = useBaseModal();

  const [tab, setTab] = useState<'DATE' | 'WEEK'>(
    initialValue?.type === 'INTERVAL' ? 'WEEK' : 'DATE'
  );

  // DATE 탭 상태
  const [selectedDates, setSelectedDates] = useState<number[]>(
    initialValue?.type === 'DATE' ? initialValue.dates : []
  );
  const [lastDay, setLastDay] = useState<boolean>(
    initialValue?.type === 'DATE' ? !!initialValue.isLastDayOfMonth : false
  );

  // WEEK 탭 상태
  const [weekDays, setWeekDays] = useState<number[]>(
    initialValue?.type === 'INTERVAL' ? initialValue.days : []
  );
  const [isEveryday, setIsEveryday] = useState<boolean>(
    initialValue?.type === 'INTERVAL' ? !!initialValue.isEveryday : false
  );
  const [everyWeeks, setEveryWeeks] = useState<number>(
    initialValue?.type === 'INTERVAL' ? initialValue.every : 1
  );

  const isApplyEnabled = useMemo(() => {
    if (tab === 'DATE') return selectedDates.length > 0 || lastDay;
    return isEveryday || weekDays.length > 0;
  }, [tab, selectedDates.length, lastDay, isEveryday, weekDays.length]);

  const dateItems = useMemo(
    () => Array.from({ length: 31 }, (_, i) => i + 1),
    []
  );

  // 날짜 선택 토글(1~31)
  const handleToggleDate = (d: number) => {
    setSelectedDates((prev) => {
      const has = prev.includes(d);
      const next = has ? prev.filter((x) => x !== d) : [...prev, d];
      next.sort((a, b) => a - b);

      if (d === 31 && has && lastDay) setLastDay(false);

      return next;
    });
  };

  // 요일 선택 토글
  const handleToggleWeekday = (w: number) => {
    setIsEveryday(false);
    setWeekDays((prev) => {
      const has = prev.includes(w);
      const next = has ? prev.filter((x) => x !== w) : [...prev, w];
      next.sort((a, b) => a - b);
      return next;
    });
  };

  // "매일" 선택 토글
  const handleToggleEveryday = () => {
    setIsEveryday((prev) => {
      const next = !prev;
      if (next) setWeekDays([0, 1, 2, 3, 4, 5, 6]);
      else setWeekDays([]);
      return next;
    });
  };

  // "매달 마지막 날" 토글
  const handleToggleLastDay = () => {
    setLastDay((prev) => {
      const next = !prev;

      setSelectedDates((dates) => {
        const has31 = dates.includes(31);

        // 마지막 날 ON이면 31을 강제로 포함
        if (next && !has31) return [...dates, 31].sort((a, b) => a - b);

        // 마지막 날 OFF이면 31을 제거
        if (!next && has31) return dates.filter((d) => d !== 31);

        return dates;
      });

      return next;
    });
  };

  // 입력 값 포맷
  const result = useMemo(() => {
    if (tab === 'DATE') {
      return formatRepeatResult({ tab: 'DATE', selectedDates, lastDay });
    }
    return formatRepeatResult({
      tab: 'WEEK',
      weekDays,
      isEveryday,
      everyWeeks,
    });
  }, [tab, selectedDates, lastDay, weekDays, isEveryday, everyWeeks]);

  const handleApply = () => {
    if (!result.isValid) return;
    onApply?.(result.summary, result.value);
    closeModal();
  };

  return (
    <div className="bg-white rounded-t-2xl px-4 pt-7 pb-12">
      {/* 탭 */}
      <div className="w-full bg-gray-50 rounded-sm flex gap-2.5">
        <div
          role="button"
          onClick={() => setTab('DATE')}
          className={`flex-1 p-2.5 rounded-sm flex items-center justify-center
            ${
              tab === 'DATE'
                ? 'bg-screen-0 text-primary-50 border border-primary-50 typo-body_bold16'
                : 'text-gray-400 typo-body_reg16'
            }`}
        >
          지정 날짜
        </div>
        <div
          role="button"
          onClick={() => setTab('WEEK')}
          className={`flex-1 p-2.5 rounded-sm flex items-center justify-center
            ${
              tab === 'WEEK'
                ? 'bg-screen-0 text-primary-50 border border-primary-50 typo-body_bold16'
                : 'text-gray-400 typo-body_reg16'
            }`}
        >
          특정 간격
        </div>
      </div>

      {/* 지정 날짜 */}
      {tab === 'DATE' && (
        <div>
          <div className="mt-1.5 pt-4 px-5">
            {/* 1~31 그리드 */}
            <div className="grid grid-cols-7 gap-1">
              {dateItems.map((day) => {
                const active = selectedDates.includes(day);

                return (
                  <div
                    key={`day-${day}`}
                    role="button"
                    onClick={() => handleToggleDate(day)}
                    className={`flex items-center justify-center h-11 w-11 rounded-full typo-body_bold14 gray-900",
                      ${active ? 'bg-primary-50 text-screen-0' : ''}`}
                  >
                    {day}
                  </div>
                );
              })}
            </div>

            {/* 매달 마지막 날 버튼 */}
            <div className="flex items-center gap-1 pb-4 pt-1 border-b-[0.5px] border-gray-700">
              <CheckCircleIcon
                className={`w-4 h-4 ${lastDay ? 'text-primary-50' : 'text-gray-100'}`}
                onClick={handleToggleLastDay}
              />
              <span className="typo-body_reg12 text-gray-600">
                매달 마지막 날
              </span>
            </div>
          </div>

          {/* 날짜 선택 chip */}
          <>
            <div className="grid grid-cols-7 gap-1 flex-wrap min-h-21 px-5 pt-3 pb-7">
              {selectedDates.map((d) => (
                <div
                  key={`date-chip-${d}`}
                  className="h-11 w-11 rounded-full bg-primary-50 text-screen-0 flex items-center justify-center typo-body_bold14"
                >
                  {d}
                </div>
              ))}
            </div>
          </>
        </div>
      )}

      {/* 특정 간격 */}
      {tab === 'WEEK' && (
        <div className="flex flex-col gap-5 pt-8 pb-9">
          <div className="flex flex-col gap-4">
            <div className="typo-body_bold14 text-gray-900">요일 선택</div>

            {/* 요일 선택 chip */}
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {WEEK_LABELS.map((label, idx) => {
                const active = weekDays.includes(idx);
                return (
                  <div
                    key={label}
                    role="button"
                    onClick={() => handleToggleWeekday(idx)}
                    className={`flex items-center justify-center w-9 h-9 rounded-full typo-body_reg16
                      ${active ? 'bg-primary-50 text-screen-0' : 'bg-gray-100 text-gray-900'}`}
                  >
                    {label}
                  </div>
                );
              })}
            </div>

            {/* 매일 버튼 */}
            <div className="flex items-center justify-start gap-1">
              <CheckCircleIcon
                className={`w-4 h-4 ${isEveryday ? 'text-primary-50' : 'text-gray-100'}`}
                onClick={handleToggleEveryday}
              />
              <span className="typo-body_reg12 text-gray-600">매일</span>
            </div>
          </div>

          {/* 반복 주기 */}
          <div className="flex flex-col gap-4">
            <span className="typo-body_bold14 text-gray-900">반복 주기</span>
            <WeekWheel
              value={everyWeeks}
              onChange={setEveryWeeks}
              min={1}
              max={5}
            />
          </div>
        </div>
      )}

      {/* 적용 버튼 */}
      <div
        role="button"
        onClick={handleApply}
        className={`w-full py-4 rounded-lg typo-body_bold18 text-center transition
            ${isApplyEnabled ? 'bg-primary-50 text-screen-0' : 'bg-gray-100 text-gray-400'}`}
      >
        적용
      </div>
    </div>
  );
};

export default SetRepeatModal;
