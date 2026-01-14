import { useMemo, useState } from "react";
import useBaseModal from "@/stores/modals/baseModal";
import { WEEK_LABELS } from "@/constants";
import {
  addDays,
  getCalendarGridStartDate,
  getMonthStartDate,
  normalizeDate,
} from "@/utils/homes/homeUtils";
import { WeekIntervalWheel } from "./NumberWheel";

/** 반복 설정 타입 */
export type RepeatValue =
  | { type: "DATE"; dates: number[]; isLastDayOfMonth?: boolean }
  | {
      type: "INTERVAL";
      every: number;
      unit: "WEEK";
      days: number[]; // 0~6
      isEveryday?: boolean;
    }
  | { type: "NONE" };

type Props = {
  initialValue?: RepeatValue;
  onApply?: (summary: string, value: RepeatValue) => void;
};

const SetRepeatModal = ({ initialValue, onApply }: Props) => {
  const { closeModal } = useBaseModal();

  const [tab, setTab] = useState<"DATE" | "WEEK">(
    initialValue?.type === "INTERVAL" ? "WEEK" : "DATE",
  );

  /** 캘린더 기준 월(오늘 기준) */
  const [monthDate, setMonthDate] = useState<Date>(normalizeDate(new Date()));

  /** DATE 탭 상태 */
  const [selectedDates, setSelectedDates] = useState<number[]>(
    initialValue?.type === "DATE" ? initialValue.dates : [],
  );
  const [lastDay, setLastDay] = useState<boolean>(
    initialValue?.type === "DATE" ? !!initialValue.isLastDayOfMonth : false,
  );

  /** WEEK 탭 상태 */
  const [weekDays, setWeekDays] = useState<number[]>(
    initialValue?.type === "INTERVAL" ? initialValue.days : [],
  );
  const [isEveryday, setIsEveryday] = useState<boolean>(
    initialValue?.type === "INTERVAL" ? !!initialValue.isEveryday : false,
  );
  const [everyWeeks, setEveryWeeks] = useState<number>(
    initialValue?.type === "INTERVAL" ? initialValue.every : 1,
  );

  /** 해당 월의 1일(말일 구하려고) */
  const monthStart = useMemo(() => getMonthStartDate(monthDate), [monthDate]);
  const month = monthStart.getMonth();
  const year = monthStart.getFullYear();

  /** 그리드(6주 x 7일 = 42칸) 시작 일요일 */
  const gridStart = useMemo(() => getCalendarGridStartDate(monthStart), [monthStart]);

  const calendarCells = useMemo(() => {
    return Array.from({ length: 42 }, (_, i) => addDays(gridStart, i));
  }, [gridStart]);

  const isApplyEnabled = useMemo(() => {
    if (tab === "DATE") return selectedDates.length > 0 || lastDay;
    return isEveryday || weekDays.length > 0;
  }, [tab, selectedDates.length, lastDay, isEveryday, weekDays.length]);

  /** 날짜 선택 토글(일자만 저장: 1~31) */
  const handleToggleDate = (d: number) => {
    setSelectedDates((prev) => {
      const has = prev.includes(d);
      const next = has ? prev.filter((x) => x !== d) : [...prev, d];
      next.sort((a, b) => a - b);
      return next;
    });
  };

  /** 요일 선택 토글 */
  const handleToggleWeekday = (w: number) => {
    setIsEveryday(false);
    setWeekDays((prev) => {
      const has = prev.includes(w);
      const next = has ? prev.filter((x) => x !== w) : [...prev, w];
      next.sort((a, b) => a - b);
      return next;
    });
  };

  /** 매일 선택 */
  const handleToggleEveryday = () => {
    setIsEveryday((prev) => {
      const next = !prev;
      if (next) setWeekDays([0, 1, 2, 3, 4, 5, 6]);
      else setWeekDays([]);
      return next;
    });
  };

  const makeSummary = (): { summary: string; value: RepeatValue } => {
    if (!isApplyEnabled) return { summary: "", value: { type: "NONE" } };

    if (tab === "DATE") {
      const parts: string[] = [];
      if (selectedDates.length > 0) parts.push(selectedDates.join(","));
      if (lastDay) parts.push("마지막 날");

      // 예: "매달 3,13일" / "매달 마지막 날"
      const summary =
        parts.length === 1 && parts[0] === "마지막 날"
          ? "매달 마지막 날"
          : `매달 ${parts.join(",")}일`.replace(",마지막 날일", ",마지막 날");

      return {
        summary,
        value: { type: "DATE", dates: selectedDates, isLastDayOfMonth: lastDay },
      };
    }

    const dayLabels =
      isEveryday || weekDays.length === 7 ? "매일" : weekDays.map((d) => WEEK_LABELS[d]).join(",");

    const summary = dayLabels === "매일" ? "매일" : `${everyWeeks}주마다 ${dayLabels}`;

    return {
      summary,
      value: {
        type: "INTERVAL",
        every: everyWeeks,
        unit: "WEEK",
        days: weekDays,
        isEveryday: dayLabels === "매일",
      },
    };
  };

  const handleApply = () => {
    const { summary, value } = makeSummary();
    if (!summary) return;
    onApply?.(summary, value);
    closeModal();
  };

  return (
    <div className="bg-white rounded-t-2xl px-4 pt-4 pb-12">
      {/* 탭 */}
      <div className="w-full bg-gray-50 rounded-sm flex gap-2.5">
        <div
          role="button"
          onClick={() => setTab("DATE")}
          className={`flex-1 px-2.5 py-1.5 rounded-sm flex items-center justify-center
            ${
              tab === "DATE"
                ? "bg-screen-0 text-primary-50 border border-primary-50 typo-body_bold16"
                : "text-gray-400 typo-body_reg16"
            }`}
        >
          지정 날짜
        </div>
        <div
          role="button"
          onClick={() => setTab("WEEK")}
          className={`flex-1 px-2.5 py-1.5 rounded-sm flex items-center justify-center
            ${
              tab === "WEEK"
                ? "bg-screen-0 text-primary-50 border border-primary-50 typo-body_bold16"
                : "text-gray-400 typo-body_reg16"
            }`}
        >
          특정 간격
        </div>
      </div>

      {/* DATE */}
      {tab === "DATE" && (
        <div className="pt-6">
          {/* 캘린더 그리드 */}
          <div className="grid grid-cols-7 gap-y-4 gap-x-2 px-2">
            {calendarCells.map((date) => {
              const isThisMonth = date.getMonth() === month;
              const day = date.getDate();
              const active = selectedDates.includes(day) && isThisMonth;

              return (
                <button
                  key={date.toISOString()}
                  type="button"
                  disabled={!isThisMonth}
                  onClick={() => handleToggleDate(day)}
                  className={[
                    "h-10 w-10 mx-auto rounded-full typo-body_bold16",
                    !isThisMonth ? "text-gray-300" : "text-gray-900 hover:bg-gray-100",
                    active ? "bg-primary-500 text-white hover:bg-primary-500" : "",
                  ].join(" ")}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* 매달 마지막 날 */}
          <div className="mt-6 flex items-center gap-2 text-gray-500">
            <div
              role="button"
              onClick={() => setLastDay((p) => !p)}
              className={[
                "h-5 w-5 rounded-full flex items-center justify-center border",
                lastDay ? "bg-gray-200 border-gray-300" : "border-gray-300",
              ].join(" ")}
              aria-pressed={lastDay}
            >
              <span className="text-xs">{lastDay ? "✓" : ""}</span>
            </div>
            <span className="typo-body_reg12 text-gray-500">매달 마지막 날</span>
          </div>

          {/* 선택 chip */}
          <div className="mt-5 border-t border-gray-200 pt-4">
            <div className="flex flex-wrap gap-3">
              {selectedDates.map((d) => (
                <div
                  key={`date-chip-${d}`}
                  className="h-12 min-w-12 px-4 rounded-full bg-primary-500 text-white flex items-center justify-center typo-body_bold16"
                >
                  {d}
                </div>
              ))}
              {lastDay && (
                <div className="h-12 px-4 rounded-full bg-primary-500 text-white flex items-center justify-center typo-body_bold16">
                  마지막 날
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* WEEK */}
      {tab === "WEEK" && (
        <div className="">
          <div className="flex flex-col gap-4">
            <div className="typo-body_bold14 text-gray-900">요일 선택</div>

            <div className="flex items-center justify-center gap-3 flex-wrap">
              {WEEK_LABELS.map((label, idx) => {
                const active = weekDays.includes(idx) && !isEveryday;
                return (
                  <div
                    key={label}
                    role="button"
                    onClick={() => handleToggleWeekday(idx)}
                    className={`flex items-center justify-center w-9 h-9 p-2.5 rounded-full typo-body_reg16 text-gray-900
                      ${active ? "bg-primary-30" : "bg-gray-100"}`}
                  >
                    {label}
                  </div>
                );
              })}
            </div>
            {/* 매일 선택 */}
            <div className="flex items-center justify-start gap-1 text-gray-500">
              <div
                role="button"
                onClick={handleToggleEveryday}
                className={`h-3.5 w-3.5 rounded-full flex items-center justify-center border
                  ${
                    isEveryday
                      ? "bg-gray-500/30 border-transparent"
                      : "bg-transparent border-gray-500/30"
                  }`}
                aria-pressed={isEveryday}
              ></div>
              <span className="typo-body_14">매일 선택</span>
            </div>
          </div>

          {/* 반복 주기 */}
          <div className="flex flex-col gap-4">
            {/* <div className="typo-body_bold14 text-gray-900">반복 주기</div>

            <div className="flex items-center justify-center flex-col">
              <div className="flex w-64 items-center justify-center border-b border-gray-900 gap-6">
                <NumberWheel value={everyWeeks} onChange={setEveryWeeks} min={1} max={5} />
                <span className="typo-body_bold14 text-gray-600">주마다</span>
              </div>
              <div className="flex w-64 h-14 items-center justify-center gap-3"></div>
            </div> */}
            <WeekIntervalWheel value={everyWeeks} onChange={setEveryWeeks} min={1} max={5} />
          </div>
        </div>
      )}

      {/* 적용 */}
      <div
        role="button"
        onClick={handleApply}
        className={`w-full py-4 rounded-full typo-body_bold18 text-center transition
            ${isApplyEnabled ? "bg-primary-50 text-screen-0" : "bg-gray-100 text-gray-300"}`}
      >
        적용
      </div>
    </div>
  );
};

export default SetRepeatModal;
