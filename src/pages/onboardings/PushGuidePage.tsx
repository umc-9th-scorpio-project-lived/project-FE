import LeftChevronIcon from '@/icons/LeftChevronIcon';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type StepItem = {
  img: string;
  title: string;
  desc: string;
};

const STEPS: StepItem[] = [
  {
    img: '/images/onboardings/alarm-push-step-01.png',
    title: '모바일 PUSH 알림 설정 방법',
    desc: '1. 살아보니 사이트 접속 후,\n공유 버튼 클릭',
  },
  {
    img: '/images/onboardings/alarm-push-step-02.png',
    title: '모바일 PUSH 알림 설정 방법',
    desc: '2. 더보기 > 홈 화면에 추가 버튼 클릭하기',
  },
  {
    img: '/images/onboardings/alarm-push-step-03.png',
    title: '모바일 PUSH 알림 설정 방법',
    desc: '3. 제목에 ‘살아보니’ 입력 후\n추가 버튼 클릭하기',
  },
  {
    img: '/images/onboardings/alarm-push-step-04.png',
    title: '모바일 PUSH 알림 설정 방법',
    desc: '4. 앱처럼 푸시 알림을 받을 수 있어요!',
  },
];

const PushGuidePage = () => {
  const navigate = useNavigate();

  // 현재 스텝
  const [step, setStep] = useState(0);
  const current = STEPS[step];

  // 스와이프를 실제로 한 번이라도 했는지
  const [hasSwiped, setHasSwiped] = useState(false);

  const startXRef = useRef<number | null>(null);

  // 완료
  const handleDone = () => {
    navigate('/lived');
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
      const next =
        diff < 0 ? Math.min(prev + 1, STEPS.length - 1) : Math.max(prev - 1, 0);

      if (next !== prev) setHasSwiped(true);

      return next;
    });
  };

  const handleKeyActivate = (
    e: React.KeyboardEvent<HTMLDivElement>,
    cb: () => void
  ) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    e.preventDefault();
    cb();
  };

  return (
    <main className="h-dvh min-h-dvh font-suite">
      <section className="flex-1 relative flex h-full w-full max-w-125 flex-col px-4 pt-5 pb-8 justify-between">
        <div className="flex flex-col gap-7.5">
          {/* 상단 뒤로가기 */}
          <div className="h-11 w-full py-1.25">
            <button
              type="button"
              onClick={handleBack}
              className="h-8.5 w-8.5 text-gray-900"
              aria-label="뒤로가기"
            >
              <LeftChevronIcon className="size-6" />
            </button>
          </div>

          {/* 본문: 스와이프로 step 넘기기 */}
          <div
            className="flex flex-col gap-6 items-center justify-center"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* 이미지 */}
            <div className="h-82.5 border border-gray-400 rounded-lg overflow-hidden">
              <img
                src={current.img}
                alt={`푸시 알림 가이드 ${step + 1}`}
                className="h-full object-cover"
                draggable={false}
              />
            </div>

            {/* 텍스트 */}
            <div className="flex flex-col items-center justify-center gap-4 h-23.75">
              <div className="typo-h2_bold20 text-gray-900">
                {current.title}
              </div>
              <p className="typo-body_reg18 text-gray-900 whitespace-pre-line text-center">
                {current.desc}
              </p>
            </div>

            {/* 점 인디케이터 */}
            <div className="flex items-center justify-center gap-3">
              {STEPS.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-2.5 w-2.5 rounded-full ${
                    idx === step ? 'bg-primary-50' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 하단 영역 */}
        {/* 완료 버튼 */}
        <div
          role="button"
          tabIndex={hasSwiped ? 0 : -1}
          aria-disabled={!hasSwiped}
          onClick={() => hasSwiped && handleDone()}
          onKeyDown={(e) => {
            if (!hasSwiped) return;
            handleKeyActivate(e, handleDone);
          }}
          className={`h-12.5 w-full rounded-4xl
              flex items-center justify-center typo-body_bold18
              ${
                hasSwiped
                  ? 'bg-primary-50 text-screen-0'
                  : 'bg-gray-100 text-gray-400 pointer-events-none'
              }
            `}
        >
          확인했어요!
        </div>
      </section>
    </main>
  );
};

export default PushGuidePage;
