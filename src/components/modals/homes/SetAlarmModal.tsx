import useBaseModal from "@/stores/modals/baseModal";
import { useMemo, useState } from "react";
import TimeWheel from "../../homes/TimeWheel";
import type { AlarmValue } from "@/types/homes/Routine.types";
import { parseAlarm } from "@/utils/homes/routineUtils";

const ITEM_H = 56;

const AMPM_LIST = ["오후", "오전"] as const;
const HOUR_LIST = Array.from({ length: 12 }, (_, i) => String(i + 1));
const MINUTE_LIST = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"));

type Props = {
  initialValue?: AlarmValue;
  onApply?: (value: AlarmValue) => void;
};

const SetAlarmModal = ({ initialValue, onApply }: Props) => {
  const { closeModal } = useBaseModal();

  const initial = useMemo(() => parseAlarm(initialValue?.time), [initialValue?.time]);

  // 초기 상태 설정
  const [ampm, setAmpm] = useState<(typeof AMPM_LIST)[number]>(initial.ampm);
  const [hour, setHour] = useState(String(initial.hour));
  const [minute, setMinute] = useState(initial.minute);

  const handleApply = () => {
    const time = `${ampm} ${Number(hour)}:${minute}`;
    onApply?.({ enabled: true, time });
    closeModal();
  };

  return (
    <div className="bg-white rounded-t-2xl px-5 pt-4 pb-12">
      {/* 헤더 */}
      <div className="flex gap-2.5 py-3 items-center justify-start">
        <div className="bg-timer w-6 h-6" />
        <span className="typo-h2_reg20">알림 시간을 선택해주세요</span>
      </div>

      {/* 타임 피커 영역 */}
      <div className="relative flex items-center justify-center mt-8 mb-14 px-3.5">
        <div className="pointer-events-none absolute w-full" style={{ top: ITEM_H }}>
          <div className="mx-3.5 border-t-[0.5px] border-gray-600" />
        </div>
        <div className="pointer-events-none absolute w-full" style={{ bottom: ITEM_H }}>
          <div className="mx-3.5 border-b-[0.5px] border-gray-600" />
        </div>

        <div className="flex items-center">
          <TimeWheel items={[...AMPM_LIST]} value={ampm} onChange={setAmpm} width="60px" />
          <TimeWheel items={HOUR_LIST} value={hour} onChange={setHour} width="60px" />
          <span className="typo-body_bold18 text-gray-900 mx-1">:</span>
          <TimeWheel items={MINUTE_LIST} value={minute} onChange={setMinute} width="60px" />
        </div>
      </div>

      {/* 적용 버튼 */}
      <div
        role="button"
        onClick={handleApply}
        className="w-full py-4 rounded-lg typo-body_bold18 text-center transition bg-primary-50 text-screen-0"
      >
        적용
      </div>
    </div>
  );
};

export default SetAlarmModal;
