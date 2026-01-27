import LeftChevronIcon from "@/icons/LeftChevronIcon";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

type StepItem = {
  img: string;
  title: string;
  desc: string;
};

const STEPS: StepItem[] = [
  {
    img: "/images/onboardings/alarm-push-step-01.png",
    title: "모바일 PUSH 알림 설정 방법",
    desc: "살아보니 사이트 접속 후\n공유 버튼 클릭",
  },
  {
    img: "/images/onboardings/alarm-push-step-02.png",
    title: "모바일 PUSH 알림 설정 방법",
    desc: "더보기 > 홈 화면에 추가 버튼 클릭하기",
  },
  {
    img: "/images/onboardings/alarm-push-step-03.png",
    title: "모바일 PUSH 알림 설정 방법",
    desc: "제목에 ‘살아보니’ 입력 후\n추가 버튼 클릭하기",
  },
  {
    img: "/images/onboardings/alarm-push-step-04.png",
    title: "모바일 PUSH 알림 설정 방법",
    desc: "앱처럼 푸시 알림을 받을 수 있어요!",
  },
];

const PushGuidePage = () => {
  const navigate = useNavigate();

  // 현재 스텝
  const [step, setStep] = useState(0);
  const isLast = step === STEPS.length - 1;
  const current = STEPS[step];

  const startXRef = useRef<number | null>(null);

  // 완료
  const handleDone = () => {
    navigate("/lived");
  };

  // 뒤로가기
  const handleBack = () => {
    if (step === 0) navigate(-1);
    else setStep((prev) => prev - 1);
  };

  // 스와이프 시작
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    startXRef.current = e.touches[0].clientX;
  };

  // 스와이프 끝
  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (startXRef.current === null) return;

    const endX = e.changedTouches[0].clientX;
    const diff = endX - startXRef.current;
    startXRef.current = null;

    if (Math.abs(diff) < 40) return;

    setStep((prev) => {
      if (diff < 0) return Math.min(prev + 1, STEPS.length - 1);
      return Math.max(prev - 1, 0);
    });
  };

  const handleKeyActivate = (e: React.KeyboardEvent<HTMLDivElement>, cb: () => void) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    cb();
  };

  return (
    <main className="min-h-dvh font-suite">
      <section className="relative mx-auto flex min-h-dvh w-full max-w-[500px] flex-col px-4">
        {/* 상단 뒤로가기 */}
        <div className="h-11 w-full py-[5px] pt-6">
          <button
            type="button"
            onClick={handleBack}
            className="h-[34px] w-[34px] text-gray-900"
            aria-label="뒤로가기"
          >
            <LeftChevronIcon className="size-6" />
          </button>
        </div>

        {/* 본문: 스와이프로만 step 넘기기 */}
        <div className="flex flex-col" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          {/* 이미지 */}
          <div className="pt-10 flex justify-center">
            <img
              src={current.img}
              alt={`푸시 알림 가이드 ${step + 1}`}
              className="h-[340px] w-[220px] object-contain"
              draggable={false}
            />
          </div>

          {/* 텍스트 */}
          <div className="pt-9 text-center">
            <div className="typo-h2_bold20 text-gray-900">{current.title}</div>
            <p className="pt-4 typo-body_reg18 text-gray-900 whitespace-pre-line">{current.desc}</p>
          </div>
        </div>

        {/* 점 인디케이터 */}
        <div className="absolute left-1/2 top-[618px] -translate-x-1/2">
          <div className="flex items-center justify-center gap-[12px]">
            {STEPS.map((_, idx) => (
              <span
                key={idx}
                className={`h-[10px] w-[10px] rounded-full ${idx === step ? "bg-primary-50" : "bg-gray-200"}`}
              />
            ))}
          </div>
        </div>

        <div className="flex-1" />

        {/* 하단 영역 */}
        <div className="pb-8">
          {/* 스킵 */}
          <div
            role="button"
            tabIndex={0}
            onClick={handleDone}
            onKeyDown={(e) => handleKeyActivate(e, handleDone)}
            className="mx-auto pb-2 w-fit typo-body_bold14 text-gray-700 cursor-pointer"
          >
            나중에 설정할게요
          </div>

          {/* 완료 버튼 */}
          <div
            role="button"
            tabIndex={0}
            aria-disabled={!isLast}
            onClick={() => isLast && handleDone()}
            onKeyDown={(e) => {
              if (!isLast) return;
              handleKeyActivate(e, handleDone);
            }}
            className={`h-[50px] w-full rounded-full
              flex items-center justify-center typo-body_bold18
              ${isLast ? "bg-primary-50 text-screen-0" : "bg-gray-100 text-gray-400 pointer-events-none"}
`}
          >
            완료
          </div>
        </div>
      </section>
    </main>
  );
};

export default PushGuidePage;
