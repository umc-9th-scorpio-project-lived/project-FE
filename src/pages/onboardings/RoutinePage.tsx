import LeftChevronIcon from '@/icons/LeftChevronIcon';
import useBaseModal from '@/stores/modals/baseModal';
import useOnboardingStore from '@/stores/onboarding/onboardingStore';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import getRoutinesByConcerns, {
  type RecommendedRoutine,
} from '@/services/recommendations/getRoutinesByConcerns';

const RoutinePage = () => {
  const navigate = useNavigate();
  const { openModal } = useBaseModal();

  const { concerns, setRoutineIds } = useOnboardingStore();

  const [routines, setRoutines] = useState<RecommendedRoutine[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const isStartEnabled = useMemo(() => selected.length > 0, [selected]);

  useEffect(() => {
    const fetch = async () => {
      if (!concerns || concerns.length === 0) return;

      setIsLoading(true);
      try {
        const res = await getRoutinesByConcerns(concerns);
        setRoutines(res);
      } catch (e) {
        console.error(e);
        setRoutines([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, [concerns]);

  const toggleRoutine = (routineId: number) => {
    setSelected((prev) =>
      prev.includes(routineId)
        ? prev.filter((v) => v !== routineId)
        : [...prev, routineId]
    );
  };

  return (
    <main className="h-dvh bg-white font-suite overflow-hidden">
      <section className="mx-auto flex h-dvh w-full flex-col px-4 overflow-hidden pt-10">
        {/* 상단 */}
        <div className="h-11 w-full py-1.25">
          <button
            type="button"
            onClick={() => navigate('/onboardings/concern')}
            className="h-8.5 w-8.5 text-gray-900"
            aria-label="뒤로가기"
          >
            <LeftChevronIcon className="size-6" />
          </button>
        </div>

        {/* 진행바 */}
        <div className="flex flex-col gap-7 pt-6">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-30" />
            <span className="h-1.5 w-1.5 rounded-full bg-primary-30" />
            <span className="h-1.5 w-8 rounded-full bg-primary-50" />
          </div>
        </div>

        {/* 타이틀 */}
        <div className="pt-7 pb-10">
          <div className="typo-h2_bold20 text-gray-900">
            고민에 맞는 루틴을 준비했어요!
          </div>
          <div className="pt-1 typo-body_reg14 text-gray-900">
            앞서 선택하신 고민에 맞춰 제안해 드릴게요.
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="flex flex-col gap-4 pb-6 w-full">
            {isLoading && (
              <div className="typo-body_reg14 text-gray-500">
                추천 루틴 불러오는 중...
              </div>
            )}

            {!isLoading &&
              routines.map((r) => {
                const active = selected.includes(r.routineId);

                return (
                  <div
                    key={r.routineId}
                    role="button"
                    tabIndex={0}
                    aria-pressed={active}
                    onClick={() => toggleRoutine(r.routineId)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleRoutine(r.routineId);
                      }
                    }}
                    className={`h-12.5 w-full rounded-lg px-4
                      flex items-center gap-3 cursor-pointer select-none transition
                      ${active ? 'bg-primary-50 text-screen-0' : 'bg-gray-50 text-gray-600'}`}
                  >
                    <span className="typo-body_bold16">{r.title}</span>
                  </div>
                );
              })}
          </div>
        </div>

        {/* 하단 (고정) */}
        <div className="pb-8 pt-2 flex flex-col gap-2">
          <div
            role="button"
            tabIndex={0}
            onClick={() => {
              setRoutineIds([]); // ✅ store에 반영
              setSelected([]); // UI도 초기화
              openModal('pushAlarmModal');
            }}
            className="w-full cursor-pointer select-none text-center typo-body_bold14 text-gray-700"
          >
            루틴 추천 받지 않기
          </div>

          <div
            role="button"
            tabIndex={isStartEnabled ? 0 : -1}
            aria-disabled={!isStartEnabled}
            onClick={() => {
              if (!isStartEnabled) return;
              setRoutineIds(selected); // ✅ store에 반영 (number[])
              openModal('pushAlarmModal');
            }}
            className={`h-12.5 w-full rounded-full
              flex items-center justify-center typo-body_bold18 transition
              ${isStartEnabled ? 'bg-primary-50 text-screen-0 cursor-pointer' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
          >
            시작하기
          </div>
        </div>
      </section>
    </main>
  );
};

export default RoutinePage;
