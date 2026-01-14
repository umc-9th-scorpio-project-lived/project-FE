import useBaseModal from "@/stores/modals/baseModal";
import { useState } from "react";
import TimeWheel from "./TimeWheel";

const ITEM_H = 56;

const SetAlarmModal = () => {
  const { closeModal } = useBaseModal();

  // 초기 상태 설정
  const [ampm, setAmpm] = useState("오후");
  const [hour, setHour] = useState("12");
  const [minute, setMinute] = useState("00");

  const ampmList = ["오후", "오전"];
  const hourList = Array.from({ length: 12 }, (_, i) => String(i + 1));
  const minuteList = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"));

  const handleApply = () => {
    console.log(`선택된 시간: ${ampm} ${hour}:${minute}`);
    closeModal();
  };

  return (
    <div className="bg-white rounded-t-2xl p-4 pb-12">
      {/* 헤더 */}
      <div className="flex gap-2.5 py-3 items-center justify-start">
        <div className="bg-timer w-6 h-6" /> {/* 기존 아이콘 클래스 유지 */}
        <span className="typo-h2_bold20">알림 시간을 선택해주세요</span>
      </div>

      {/* 타임 피커 영역 */}
      <div className="relative flex items-center justify-center my-8">
        {/* 중앙 하이라이트 가로선 (사진처럼 두 줄) */}
        <div
          className="pointer-events-none absolute w-full border-t border-gray-200"
          style={{ top: ITEM_H }}
        />
        <div
          className="pointer-events-none absolute w-full border-b border-gray-200"
          style={{ bottom: ITEM_H }}
        />

        <div className="flex items-center">
          {/* 오전/오후 휠 */}
          <TimeWheel items={ampmList} value={ampm} onChange={setAmpm} width="80px" />

          {/* 시간 휠 */}
          <TimeWheel items={hourList} value={hour} onChange={setHour} width="60px" />

          {/* 콜론 (고정) */}
          <span className="typo-body_bold18 text-gray-900 mx-1">:</span>

          {/* 분 휠 */}
          <TimeWheel items={minuteList} value={minute} onChange={setMinute} width="60px" />
        </div>

        {/* 상하단 그라데이션 마스크 */}
        <div className="pointer-events-none absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-white to-transparent z-10" />
        <div className="pointer-events-none absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent z-10" />
      </div>

      {/* 적용 버튼 */}
      <div
        role="button"
        onClick={handleApply}
        className="typo-body_bold18 text-screen-0 w-full py-4 rounded-full bg-primary-50 text-center"
      >
        적용
      </div>
    </div>
  );
};

export default SetAlarmModal;
