import { useNavigate } from "react-router-dom";
import useBaseModal from "@/stores/modals/baseModal";
import AlarmIcon from "@/icons/AlarmIcon";

export default function PushAlarmModal() {
  const navigate = useNavigate();
  const { closeModal } = useBaseModal();

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="
        relative w-full rounded-2xl bg-screen-0
        flex flex-col items-center
        gap-8.5
        px-5 py-5
      "
    >
      {/* content */}
      <div className="flex flex-col items-center gap-3.75">
        {/* 아이콘 */}
        <div className="flex items-center justify-center pt-4.5">
          <AlarmIcon className="h-12.5 w-12.5" />
        </div>

        {/* 타이틀 */}
        <div className="text-center typo-body_bold18 text-gray-900">
          알림으로 하루의 리듬을 가볍게 맞춰보세요!
        </div>

        {/* 설명 */}
        <div className="text-center typo-body_reg16 text-gray-900">
          설정한 루틴 시간에 알림을 보내드려요.
          <br />
          꾸준한 습관 형성을 도와드릴게요!
        </div>
      </div>

      {/* buttons */}
      <div className="mt-auto flex w-full flex-col gap-[10px]">
        <div
          role="button"
          onClick={() => {
            closeModal();
            navigate("/onboardings/push-guide");
          }}
          className="flex justify-center items-center h-[51px] w-full rounded-[8px] bg-primary-50 typo-body_bold16 text-screen-0"
        >
          알림 받기
        </div>

        <div
          role="button"
          onClick={() => {
            closeModal();
            navigate("/lived");
          }}
          className="flex justify-center items-center h-[51px] w-full rounded-[8px] bg-gray-100 typo-body_bold16 text-gray-400"
        >
          나중에 설정할게요
        </div>
      </div>
    </div>
  );
}
