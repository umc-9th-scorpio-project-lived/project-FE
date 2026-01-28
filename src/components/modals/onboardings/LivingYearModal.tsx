import useBaseModal from "@/stores/modals/baseModal";
import useOnboardingStore from "@/stores/onboarding/onboardingStore";
import { useState } from "react";

const OPTIONS = ["예비 자취인", "1년 ~ 3년 사이", "3년 ~ 5년 사이", "5년 이상"] as const;

export default function LivingYearModal() {
  const { closeModal } = useBaseModal();
  const { livingYear, setLivingYear } = useOnboardingStore();

  // 모달 내부에서만 임시 선택(닫을 때 확정)
  const [picked, setPicked] = useState<string>(livingYear ?? "");
  const hasPicked = Boolean(picked);

  // 바텀시트 밖 클릭 시: 선택값 반영 + 시트 닫기
  const handleDimClick = () => {
    if (picked) setLivingYear(picked);
    closeModal();
  };

  return (
    // (바깥 영역)
    <div className="fixed inset-0" onClick={handleDimClick}>
      <div
        className="absolute bottom-0 left-0 right-0 mx-auto w-full max-w-[500px] rounded-t-[16px] bg-screen-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 타이틀 */}
        <div className="px-[21px] pt-6 pb-5">
          <div className="typo-body_bold18 text-gray-900">자취 연차를 선택해주세요.</div>
        </div>

        {/* 리스트 */}
        <div className="px-[15px] pb-8">
          <div className="flex flex-col gap-[10px]">
            {OPTIONS.map((opt) => {
              const isActive = picked === opt;

              // // default / active / unactive
              const itemClass = isActive
                ? "bg-primary-50 text-screen-0 shadow-mini" // active
                : hasPicked
                  ? "bg-gray-50 text-gray-200" // unactive
                  : "bg-gray-50 text-gray-500"; // default

              return (
                <div
                  key={opt}
                  role="button"
                  tabIndex={0}
                  onClick={() => setPicked(opt)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setPicked(opt);
                    }
                  }}
                  className={`h-[56px] w-full rounded-[8px] px-4
                    flex items-center
                    typo-body_bold16
                    ${itemClass}`}
                >
                  {opt}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
