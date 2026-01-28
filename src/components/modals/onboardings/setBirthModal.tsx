import Wheel from "@/components/commons/Wheel";
import CalendarIcon from "@/icons/CalendarIcon";
import useBaseModal from "@/stores/modals/baseModal";
import { useMemo, useState } from "react";

const ITEM_H = 56;

// 휠 데이터 배열
const YEAR_LIST = Array.from({ length: 100 }, (_, i) => i + 1926);
const MONTH_LIST = Array.from({ length: 12 }, (_, i) => i + 1);
const DATE_LIST = Array.from({ length: 31 }, (_, i) => i + 1);

type DateValue = {
  year: number;
  month: number;
  date: number;
};

type Props = {
  initialValue?: DateValue;
  onApply?: (value: DateValue) => void;
};

const SetBirthModal = ({ initialValue, onApply }: Props) => {
  const { closeModal } = useBaseModal();

  // 초기 선택값
  const initial = useMemo(
    () => ({
      year: initialValue?.year ?? 2000,
      month: initialValue?.month ?? 1,
      date: initialValue?.date ?? 1,
    }),
    [initialValue?.year, initialValue?.month, initialValue?.date],
  );

  const [year, setYear] = useState<number>(initial.year);
  const [month, setMonth] = useState<number>(initial.month);
  const [date, setDate] = useState<number>(initial.date);

  const handleApply = () => {
    onApply?.({ year, month, date });
    closeModal();
  };

  return (
    <div className="w-full bg-white rounded-2xl pt-2">
      {/* 헤더 */}
      <div className="flex justify-start items-center gap-2.5 py-3 pl-4">
        <CalendarIcon className="size-6" />
        <span className="typo-body_bold18 text-gray-900">생년월일</span>
      </div>

      {/* 휠 영역 */}
      <div className="relative flex items-center justify-center mt-2 mb-6">
        <div className="pointer-events-none absolute w-full" style={{ top: ITEM_H }}>
          <div className="mx-12 border-t-[0.5px] border-gray-500" />
        </div>
        <div className="pointer-events-none absolute w-full" style={{ bottom: ITEM_H }}>
          <div className="mx-12 border-b-[0.5px] border-gray-500" />
        </div>

        <div className="flex items-center gap-6">
          {/* 년 */}
          <div className="flex items-center">
            <Wheel<number>
              items={YEAR_LIST}
              value={year}
              onChange={setYear}
              width="50px"
              itemHeight={56}
              visibleRows={3}
              renderItem={(y, selected) => (
                <span
                  className={`transition-all duration-200 typo-body_bold18 ${
                    selected ? "text-gray-900" : "text-gray-500"
                  }`}
                >
                  {y}
                </span>
              )}
            />
          </div>

          {/* 월 */}
          <div className="flex items-center">
            <Wheel<number>
              items={MONTH_LIST}
              value={month}
              onChange={setMonth}
              width="40px"
              loop
              itemHeight={56}
              visibleRows={3}
              renderItem={(m, selected) => (
                <span
                  className={`transition-all duration-200 typo-body_bold18 ${
                    selected ? "text-gray-900" : "text-gray-500"
                  }`}
                >
                  {m}
                </span>
              )}
            />
          </div>

          {/* 일 */}
          <div className="flex items-center">
            <Wheel<number>
              items={DATE_LIST}
              value={date}
              onChange={setDate}
              width="40px"
              loop
              itemHeight={56}
              visibleRows={3}
              renderItem={(d, selected) => (
                <span
                  className={`transition-all duration-200 typo-body_bold18 ${
                    selected ? "text-gray-900" : "text-gray-500"
                  }`}
                >
                  {d}
                </span>
              )}
            />
          </div>
        </div>
      </div>

      {/* 버튼 */}
      <div className="flex gap-2.5 items-center justify-center px-5 py-5">
        <div
          role="button"
          onClick={closeModal}
          className="w-full py-4 rounded-lg typo-body_bold16 text-center transition bg-gray-100 text-gray-400"
        >
          취소
        </div>
        <div
          role="button"
          onClick={handleApply}
          className="w-full py-4 rounded-lg typo-body_bold16 text-center transition bg-primary-50 text-screen-0"
        >
          확인
        </div>
      </div>
    </div>
  );
};

export default SetBirthModal;
