import useBaseModal from "@/stores/modals/baseModal";
import useOnboardingStore from "@/stores/onboarding/onboardingStore";

const OPTIONS = ["예비 자취인", "1년 ~ 3년 사이", "3년 ~ 5년 사이", "5년 이상"] as const;

export default function LivingYearModal() {
  const { closeModal } = useBaseModal();
  const { livingYear, setLivingYear } = useOnboardingStore();

  const handleSelect = (value: string) => {
    setLivingYear(value);
    closeModal();
  };

  return (
    <div className="w-full rounded-t-xl bg-screen-0">
      <div className="px-6 pt-8 pb-5">
        <div className="typo-body_bold18 text-gray-900">자취 연차를 선택해주세요.</div>
      </div>

      <div className="px-4 pb-8">
        <div className="flex flex-col gap-3">
          {OPTIONS.map((opt) => {
            const active = livingYear === opt;

            return (
              <button
                key={opt}
                type="button"
                onClick={() => handleSelect(opt)}
                className={[
                  "h-[56px] w-full rounded-xl px-4 text-left typo-body_bold16",
                  active ? "bg-primary-50 text-white" : "bg-gray-50 text-gray-500",
                ].join(" ")}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
