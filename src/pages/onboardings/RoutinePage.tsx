import LeftChevronIcon from '@/icons/LeftChevronIcon';
import useBaseModal from '@/stores/modals/baseModal';
import useOnboardingStore from '@/stores/onboarding/onboardingStore';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import getRoutinesByConcerns, {
  type RecommendedRoutine,
} from '@/services/recommendations/getRoutinesByConcerns';

const shuffle = <T,>(arr: T[]) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

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
        setRoutines(shuffle(res));
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
    <main className="h-dvh font-suite overflow-hidden">
      <section className="flex-1 flex h-full w-full max-w-125 flex-col px-4 pt-5 justify-between pb-8">
        <div className="flex flex-col gap-6">
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
          <div className="flex flex-col gap-7">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-30" />
              <span className="h-1.5 w-1.5 rounded-full bg-primary-30" />
              <span className="h-1.5 w-8 rounded-full bg-primary-50" />
            </div>
          </div>

          {/* 타이틀 */}
          <div className="flex flex-col gap-1">
            <div className="typo-h2_bold20 text-gray-900">
              고민에 맞는 루틴을 준비했어요!
            </div>
            <div className="typo-body_reg14 text-gray-900">
              앞서 선택하신 고민에 맞춰 제안해 드릴게요.
            </div>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto mt-6">
          <div className="flex flex-col gap-4 w-full pt-4 pb-5">
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
                      flex items-center gap-3.5 cursor-pointer select-none transition
                      ${active ? 'bg-primary-50 text-screen-0' : 'bg-gray-50 text-gray-600'}`}
                  >
                    <span className="typo-body_bold16">{r.title}</span>
                  </div>
                );
              })}
          </div>
        </div>

        {/* 하단 (고정) */}
        <div className="pt-2 flex flex-col gap-2">
          <div
            role="button"
            tabIndex={0}
            onClick={() => {
              setRoutineIds([]);
              setSelected([]);
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
              setRoutineIds(selected);
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
