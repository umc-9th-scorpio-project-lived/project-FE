import Wheel from '@/components/commons/Wheel';
import useBaseModal from '@/stores/modals/baseModal';
import { useMemo, useState } from 'react';

const ITEM_H = 74;

// 휠 데이터 배열
const YEAR_LIST = Array.from({ length: 2 }, (_, i) => i + 2025);
const MONTH_LIST = Array.from({ length: 12 }, (_, i) => i + 1);

type PeriodValue = {
  year: number;
  month: number;
};

type Props = {
  initialValue?: PeriodValue;
  onApply?: (value: PeriodValue) => void;
};

const SetStatisticsMonthModal = ({ initialValue, onApply }: Props) => {
  const { closeModal } = useBaseModal();

  // 초기 선택값
  const initial = useMemo(
    () => ({
      year: initialValue?.year ?? 2025,
      month: initialValue?.month ?? 1,
    }),
    [initialValue?.year, initialValue?.month]
  );

  const [year, setYear] = useState<number>(initial.year);
  const [month, setMonth] = useState<number>(initial.month);

  const handleApply = () => {
    onApply?.({ year, month });
    closeModal();
  };

  return (
    <div className="bg-white rounded-t-2xl px-4 pt-4 pb-14">
      {/* 헤더 */}
      <div className="flex justify-start items-center py-3 typo-h2_reg20 text-gray-900 px-1">
        기간을 선택해주세요.
      </div>

      {/* 휠 영역 */}
      <div className="relative flex items-center justify-center">
        <div
          className="pointer-events-none absolute w-full"
          style={{ top: ITEM_H }}
        >
          <div className="border-t-[0.5px] border-gray-600" />
        </div>
        <div
          className="pointer-events-none absolute w-full"
          style={{ bottom: ITEM_H }}
        >
          <div className="border-b-[0.5px] border-gray-600" />
        </div>

        <div className="flex items-center gap-12">
          {/* 년 */}
          <div className="flex items-center">
            <Wheel<number>
              items={YEAR_LIST}
              value={year}
              onChange={setYear}
              width="50px"
              itemHeight={74}
              visibleRows={3}
              renderItem={(y, selected) => (
                <span
                  className={`transition-all duration-200 typo-body_bold18 ${
                    selected ? 'text-gray-900' : 'text-gray-600'
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
              width="50px"
              loop
              itemHeight={74}
              visibleRows={3}
              renderItem={(m, selected) => (
                <span
                  className={`transition-all duration-200 typo-body_bold18 ${
                    selected ? 'text-gray-900' : 'text-gray-600'
                  }`}
                >
                  {m}월
                </span>
              )}
            />
          </div>
        </div>
      </div>

      {/* 적용 버튼 */}
      <div className="pt-6">
        <div
          role="button"
          onClick={handleApply}
          className="w-full py-4 rounded-lg typo-body_bold18 text-center transition bg-primary-50 text-screen-0"
        >
          적용
        </div>
      </div>
    </div>
  );
};

export default SetStatisticsMonthModal;
