import toggleRoutineCheck from '@/services/routines/checkRoutine';
import {
  EMPTY_HOME_ROUTINE,
  type HomeRoutineResult,
} from '@/types/routines/Routine.types';
import { create } from 'zustand';

type HomeRoutineState = {
  data: HomeRoutineResult;
  isLoading: boolean;

  setHomeRoutine: (data: HomeRoutineResult) => void;
  clearHomeRoutine: () => void;
  toggleRoutine: (memberRoutineId: number, date: string) => Promise<void>;
};

export const useRoutineStore = create<HomeRoutineState>((set, get) => ({
  data: EMPTY_HOME_ROUTINE,
  isLoading: false,

  // 홈 루틴 데이터 설정
  setHomeRoutine: (data) =>
    set({
      data: {
        ...data,
        routines: data.routines ?? [],
      },
    }),

  // 홈 루틴 데이터 초기화
  clearHomeRoutine: () => set({ data: EMPTY_HOME_ROUTINE }),

  // 루틴 완료 여부 토글
  toggleRoutine: async (memberRoutineId, date) => {
    const prev = get().data;

    set({
      data: {
        ...prev,
        routines: prev.routines.map((r) =>
          r.memberRoutineId === memberRoutineId
            ? { ...r, isDone: !r.isDone }
            : r
        ),
      },
    });

    try {
      await toggleRoutineCheck(memberRoutineId, date);
    } catch {
      set({ data: prev });
    }
  },
}));
