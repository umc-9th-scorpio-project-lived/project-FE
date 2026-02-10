import LeftChevronIcon from '@/icons/LeftChevronIcon';
import useOnboardingStore from '@/stores/onboarding/onboardingStore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CHIPS = [
  { id: 1, label: '집안일 미룸' },
  { id: 2, label: '정신없는 아침' },
  { id: 3, label: '할 일 까먹음' },
  { id: 4, label: '생활비 관리' },
  { id: 5, label: '외로움' },
  { id: 6, label: '불규칙한 식습관' },
  { id: 7, label: '건강 관리' },
  { id: 8, label: '식사 준비' },
  { id: 9, label: '늦은 취침 시간' },
] as const;

const ConcernPage = () => {
  const navigate = useNavigate();
  const { concerns, setConcerns } = useOnboardingStore();

  // store에 값이 있으면 초기 선택값으로 반영
  const [selected, setSelected] = useState<number[]>(concerns ?? []);

  const selectedCount = selected.length;
  const isOverSelected = selectedCount > 5;
  // 다음 버튼 활성화 조건
  const isButtonEnabled = selectedCount > 0 && !isOverSelected;

  const toggleChip = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  const handleNext = () => {
    if (!isButtonEnabled) return;
    setConcerns(selected);
    navigate('/onboardings/routine');
  };

  return (
    <main className="h-dvh font-suite">
      <section className="flex-1 flex h-full w-full max-w-125 flex-col px-4 pt-5 justify-between pb-8">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            {/* 상단 뒤로가기 */}
            <div className="h-11 w-full py-1.25">
              <button
                type="button"
                onClick={() => navigate('/onboardings/basic-info')}
                className="h-8.5 w-8.5 text-gray-900"
                aria-label="뒤로가기"
              >
                <LeftChevronIcon className="size-6" />
              </button>
            </div>

            {/* 진행바 */}

            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-30" />
              <span className="h-1.5 w-8 rounded-full bg-primary-50" />
              <span className="h-1.5 w-1.5 rounded-full bg-primary-30" />
            </div>

            {/* 타이틀 */}
            <div className="flex flex-col gap-1">
              <div className="typo-h2_bold20">
                자취하면서 <br />
                어떤 점이 가장 고민되시나요?
              </div>
              <p className="typo-body_reg14">최대 5개 선택 가능해요.</p>
            </div>
          </div>

          {/* 칩 영역 */}
          <div className="px-0.5 flex flex-wrap gap-3">
            {CHIPS.map(({ id, label }) => {
              const isActive = selected.includes(id);
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => toggleChip(id)}
                  className={`h-11.5 rounded-lg px-4 typo-body_reg16 transition
              ${isActive ? 'bg-primary-50 text-screen-0' : 'bg-gray-50 text-gray-600'}`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 에러 멘트 */}
        <div className="flex flex-col gap-2">
          {isOverSelected && (
            <p className="text-center typo-body_bold14 text-alert-50 ">
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
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleNext();
              }
            }}
            className={`h-12.5 w-full rounded-full
              flex items-center justify-center typo-body_bold18
              ${
                isButtonEnabled
                  ? 'bg-primary-50 text-screen-0'
                  : 'bg-gray-100 text-gray-400 pointer-events-none'
              }
`}
          >
            {selectedCount}개 선택하기
          </div>
        </div>
      </section>
    </main>
  );
};

export default ConcernPage;
