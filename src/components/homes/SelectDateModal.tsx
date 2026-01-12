import { useEffect, useMemo, useState } from "react";
import useBaseModal from "@/stores/modals/baseModal";
import { useHomeDateStore } from "@/stores/homes/homeStore";
import { WEEK_LABELS } from "@/constants";
import {
  addMonths,
  getCalendarGridStartDate,
  getMonthStartDate,
  isSameDay,
  normalizeDate,
} from "@/utils/homes/homeUtils";

const SelectDateModal = () => {
  const { closeModal } = useBaseModal();

  const { selectedDate, setSelectedDate } = useHomeDateStore();

  const [currentMonth, setCurrentMonth] = useState<Date>(() => getMonthStartDate(selectedDate));

  useEffect(() => {
    setCurrentMonth(getMonthStartDate(selectedDate));
  }, [selectedDate]);

  const calendarTitle = useMemo(() => {
    const y = currentMonth.getFullYear();
    const m = currentMonth.getMonth() + 1;
    return `${y}년 ${m}월`;
  }, [currentMonth]);

  const calendarGrid = useMemo(() => {
    const start = getCalendarGridStartDate(currentMonth);

    return Array.from({ length: 42 }, (_, i) => {
      const x = new Date(start);
      x.setDate(start.getDate() + i);
      return x;
    });
  }, [currentMonth]);

  const isInCurrentMonth = (d: Date) =>
    d.getFullYear() === currentMonth.getFullYear() && d.getMonth() === currentMonth.getMonth();

  const handlePrevMonth = () => setCurrentMonth((prev) => getMonthStartDate(addMonths(prev, -1)));
  const handleNextMonth = () => setCurrentMonth((prev) => getMonthStartDate(addMonths(prev, 1)));

  const handleSelectDate = (d: Date) => {
    const picked = normalizeDate(d);
    setSelectedDate(picked);
    closeModal?.();
  };

  return (
    <div className="bg-white w-full rounded-t-2xl px-4 pt-4 pb-5 flex flex-col gap-4">
      <div className="flex flex-col gap-2.5">
        {/* 헤더: 아이콘 + 타이틀 */}
        <div className="flex items-center gap-2.5 justify-start py-3 px-1.5">
          <div className="bg-calender w-6 h-6" />

          <div className="typo-h2_bold20 text-gray-900">날짜를 선택해주세요</div>
        </div>

        {/* 월 이동 */}
        <div className="flex items-center justify-between">
          <div
            role="button"
            onClick={handlePrevMonth}
            className="w-6 h-6 bg-calendar_left_chevron"
            aria-label="이전 달"
          />

          <div className="typo-body_bold16 text-gray-900">{calendarTitle}</div>

          <div
            role="button"
            onClick={handleNextMonth}
            className="w-6 h-6 bg-calendar_right_chevron"
            aria-label="다음 달"
          />
        </div>
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7 gap-x-1 w-fit mx-auto place-items-center">
        {WEEK_LABELS.map((w) => (
          <div
            key={w}
            className="w-11 h-11 typo-body_bold14 text-gray-900 flex items-center justify-center"
          >
            {w}
          </div>
        ))}

        {calendarGrid.map((d) => {
          const inMonth = isInCurrentMonth(d);
          const isSelected = isSameDay(d, selectedDate);

          const disabled = !inMonth;

          return (
            <button
              key={d.toISOString()}
              type="button"
              disabled={disabled}
              onClick={() => handleSelectDate(d)}
              className={["", disabled ? "text-transparent" : "text-gray-900"].join(" ")}
              aria-label={`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`}
            >
              <span
                className={[
                  "w-11 h-11 rounded-full flex items-center justify-center typo-body_bold14 ",
                  isSelected ? "text-white bg-primary-50" : "",
                  disabled ? "text-transparent" : "text-gray-900",
                ].join(" ")}
              >
                {d.getDate()}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SelectDateModal;
