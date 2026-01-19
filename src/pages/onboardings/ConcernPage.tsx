import LeftChevronIcon from "@/icons/LeftChevronIcon";
import useOnboardingStore from "@/stores/onboarding/onboardingStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CHIPS = [
  "집안일 미룸",
  "정신없는 아침",
  "할 일 까먹음",
  "생활비 관리",
  "외로움",
  "불규칙한 식습관",
  "건강 관리",
  "식사 준비",
  "늦은 취침 시간",
] as const;

const ConcernPage = () => {
  const navigate = useNavigate();
  const { concerns, setConcerns } = useOnboardingStore();

  // store에 값이 있으면 초기 선택값으로 반영
  const [selected, setSelected] = useState<string[]>(concerns ?? []);

  const selectedCount = selected.length;
  const isOverSelected = selectedCount > 5;
  // 다음 버튼 활성화 조건
  const isButtonEnabled = selectedCount > 0 && !isOverSelected;

  const toggleChip = (chip: string) => {
    setSelected((prev) => {
      // 선택 해제
      if (prev.includes(chip)) return prev.filter((v) => v !== chip);

      return [...prev, chip];
    });
  };

  const handleNext = () => {
    if (!isButtonEnabled) return;
    setConcerns(selected);
    navigate("/onboardings/routine");
  };

  return (
    <main className="min-h-dvh font-suite">
      <section className="mx-auto flex min-h-dvh w-full max-w-[500px] flex-col px-4">
        {/* 상단 뒤로가기 */}
        <div className="h-11 w-full py-[5px] pt-6">
          <button
            type="button"
            onClick={() => navigate("/onboardings/basic-info")}
            className="h-[34px] w-[34px] text-gray-900"
            aria-label="뒤로가기"
          >
            <LeftChevronIcon className="size-6" />
          </button>
        </div>

        {/* 진행바 */}
        <div className="pt-10">
          <div className="flex items-center gap-2">
            <span className="h-[6px] w-[6px] rounded-full bg-primary-30" />
            <span className="h-[6px] w-[32px] rounded-full bg-primary-50" />
            <span className="h-[6px] w-[6px] rounded-full bg-primary-30" />
          </div>
        </div>

        {/* 타이틀 */}
        <div className="pt-8">
          <div className="typo-h2_bold20">
            자취하면서 <br />
            어떤 점이 가장 고민되시나요?
          </div>
          <p className="pt-2 typo-body_reg14">최대 5개 선택 가능해요.</p>
        </div>

        {/* 칩 영역 */}
        <div className="pt-8 px-0.5 flex flex-wrap gap-3">
          {CHIPS.map((chip) => {
            const isActive = selected.includes(chip);
            return (
              <button
                key={chip}
                type="button"
                onClick={() => toggleChip(chip)}
                className={[
                  "h-11.5 rounded-[8px] px-4 typo-body_reg16 transition",
                  isActive ? "bg-primary-50 text-screen-0" : "bg-gray-50 text-gray-600",
                ].join(" ")}
              >
                {chip}
              </button>
            );
          })}
        </div>

        {/* 에러 멘트 */}
        <div className="mt-auto pb-8">
          {isOverSelected && (
            <p className="pb-2 text-center typo-body_bold14 text-alert-50 ">
              최대 5개까지 선택 가능합니다.
            </p>
          )}

          {/* 다음 버튼 */}
          <div
            role="button"
            tabIndex={0}
            aria-disabled={!isButtonEnabled}
            onClick={() => isButtonEnabled && handleNext()}
            onKeyDown={(e) => {
              if (!isButtonEnabled) return;
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleNext();
              }
            }}
            className={[
              "h-[50px] w-full rounded-full",
              "flex items-center justify-center",
              "typo-body_bold18",
              isButtonEnabled
                ? "bg-primary-50 text-screen-0"
                : "bg-gray-100 text-gray-400 pointer-events-none",
            ].join(" ")}
          >
            {selectedCount}개 선택하기
          </div>
        </div>
      </section>
    </main>
  );
};

export default ConcernPage;
