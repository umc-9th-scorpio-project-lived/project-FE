import useBaseModal from '@/stores/modals/baseModal';
import useOnboardingStore from '@/stores/onboarding/onboardingStore';
import { useEffect, useRef, useState } from 'react';

const OPTIONS = [
  '예비 자취인',
  '1년 ~ 3년 사이',
  '3년 ~ 5년 사이',
  '5년 이상',
] as const;

const SHEET_ANIM_MS = 500;
const DIM_ANIM_MS = 400;
const AUTO_CLOSE_MS = 2000;

export default function LivingYearModal() {
  const { closeModal } = useBaseModal();
  const { livingYear, setLivingYear } = useOnboardingStore();

  // 모달 내부에서만 임시 선택 후 닫을 때 확정
  const [picked, setPicked] = useState<string>(livingYear ?? '');
  const hasPicked = Boolean(picked);

  const [isClosing, setIsClosing] = useState(false);

  // 오픈 애니메이션
  const [isOpen, setIsOpen] = useState(false);

  const autoCloseTimer = useRef<number | null>(null);
  const closeTimer = useRef<number | null>(null);

  const clearTimers = () => {
    if (autoCloseTimer.current) window.clearTimeout(autoCloseTimer.current);
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    autoCloseTimer.current = null;
    closeTimer.current = null;
  };

  const requestClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    setIsOpen(false);

    closeTimer.current = window.setTimeout(() => {
      closeModal();
    }, SHEET_ANIM_MS);
  };

  const handleDimClick = () => {
    if (picked) setLivingYear(picked);
    clearTimers();
    requestClose();
  };

  const handlePick = (opt: string) => {
    setPicked(opt);
    setLivingYear(opt);

    clearTimers();
    autoCloseTimer.current = window.setTimeout(() => {
      requestClose();
    }, AUTO_CLOSE_MS);
  };

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setIsOpen(true));
    return () => {
      window.cancelAnimationFrame(id);
      clearTimers();
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-[${DIM_ANIM_MS}ms] ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
      onClick={handleDimClick}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`absolute bottom-0 left-0 right-0 mx-auto w-full max-w-125
          rounded-t-2xl bg-screen-0
          transition-transform duration-500 ease-out
          ${isOpen && !isClosing ? 'translate-y-0' : 'translate-y-full'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 타이틀 */}
        <div className="px-5.25 pt-6 pb-5">
          <div className="typo-body_bold18 text-gray-900">
            자취 연차를 선택해주세요.
          </div>
        </div>

        {/* 리스트 */}
        <div className="px-3.75 pb-8">
          <div className="flex flex-col gap-2.5">
            {OPTIONS.map((opt) => {
              const isActive = picked === opt;

              // // default / active / unactive
              const itemClass = isActive
                ? 'bg-primary-50 text-screen-0 shadow-mini' // active
                : hasPicked
                  ? 'bg-gray-50 text-gray-200' // unactive
                  : 'bg-gray-50 text-gray-500'; // default

              return (
                <div
                  key={opt}
                  role="button"
                  tabIndex={0}
                  onClick={() => handlePick(opt)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handlePick(opt);
                    }
                  }}
                  className={`h-14 w-full rounded-lg px-4
                    flex items-center typo-body_bold16 ${itemClass}`}
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
