import LeftChevronIcon from "@/icons/LeftChevronIcon";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const ROUTINES = [
  { id: "stretch", label: "3분 아침 스트레칭", emoji: "🧘" },
  { id: "account", label: "가계부 작성", emoji: "💸" },
  { id: "dish", label: "밥 먹고 바로 설거지 하기", emoji: "🍽️" },
  { id: "breakfast", label: "간단한 아침 챙겨 먹기", emoji: "☕" },
  { id: "bed", label: "일어나자마자 이불 정리", emoji: "🛏️" },
  { id: "laundry", label: "옷 세탁하기", emoji: "🧺" },
  { id: "desk", label: "책상 정리 하기", emoji: "🗂️" },
  { id: "monthly-plan", label: "한 달 소비 계획하기", emoji: "🗓️" },
  { id: "cook", label: "하루 한 끼 해먹기", emoji: "🍚" },
] as const;

const RoutinePage = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);

  const isStartEnabled = useMemo(() => selected.length > 0, [selected]);

  const toggleRoutine = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));
  };

  return (
    <main className="h-dvh bg-white font-suite overflow-hidden">
      <section className="mx-auto flex h-dvh w-full  flex-col px-4 overflow-hidden">
        {/* 상단 */}
        <div className="h-11 w-full py-[5px] pt-6">
          <button
            type="button"
            onClick={() => navigate("/onboardings/concern")}
            className="h-[34px] w-[34px] text-gray-900"
            aria-label="뒤로가기"
          >
            <LeftChevronIcon className="size-6" />
          </button>
        </div>

        {/* 진행바 */}
        <div className="flex flex-col gap-8 pt-10">
          <div className="flex items-center gap-2">
            <span className="h-[6px] w-[6px] rounded-full bg-primary-30" />
            <span className="h-[6px] w-[6px] rounded-full bg-primary-30" />
            <span className="h-[6px] w-[32px] rounded-full bg-primary-50" />
          </div>
        </div>

        {/* 타이틀 */}
        <div className="pt-8 pb-10">
          <div className="typo-h2_bold20 text-gray-900">고민에 맞는 루틴을 준비했어요!</div>
          <div className="pt-1 typo-body_reg14 text-gray-900">
            앞서 선택하신 고민에 맞춰 제안해 드릴게요.
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="flex flex-col gap-4 pb-6 px-4 w-full">
            {ROUTINES.map((r) => {
              const active = selected.includes(r.id);

              return (
                <div
                  key={r.id}
                  role="button"
                  tabIndex={0}
                  aria-pressed={active}
                  onClick={() => toggleRoutine(r.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleRoutine(r.id);
                    }
                  }}
                  className={`h-[50px] w-full rounded-[8px] px-4
                    flex items-center gap-3 cursor-pointer select-none transition
                    ${active ? "bg-primary-50 text-screen-0" : "bg-gray-50 text-gray-600"}`}
                >
                  <span className="typo-body_bold16">{r.emoji}</span>
                  <span className="typo-body_bold16">{r.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 하단 (고정) */}
        <div className="pb-8 flex flex-col gap-2">
          <div
            role="button"
            tabIndex={0}
            onClick={() => {
              setSelected([]);
              navigate("/onboardings/push-guide");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSelected([]);
                navigate("/onboardings/push-guide");
              }
            }}
            className="w-full cursor-pointer select-none text-center typo-body_bold14 text-gray-700"
          >
            루틴 추천 받지 않기
          </div>
          <div>
            <div
              role="button"
              tabIndex={isStartEnabled ? 0 : -1}
              aria-disabled={!isStartEnabled}
              onClick={() => {
                if (!isStartEnabled) return;
                navigate("/onboardings/push-guide");
              }}
              onKeyDown={(e) => {
                if (!isStartEnabled) return;
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  navigate("/onboardings/push-guide");
                }
              }}
              className={`h-[50px] w-full rounded-full
                flex items-center justify-center typo-body_bold18 transition
      ${
        isStartEnabled
          ? "bg-primary-50 text-screen-0 cursor-pointer"
          : "bg-gray-100 text-gray-400 cursor-not-allowed"
      }
    `}
            >
              시작하기
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default RoutinePage;
