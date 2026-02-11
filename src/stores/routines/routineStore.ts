import { ROUTINE_ERROR_CODE } from '@/constants';
import toggleRoutineCheck from '@/services/routines/checkRoutine';
import createRoutine from '@/services/routines/createRoutine';
import deleteRoutine from '@/services/routines/deleteRoutine';
import editRoutine from '@/services/routines/editRoutine';
import getRoutineInfo from '@/services/routines/getRoutineInfo';

import {
  EMPTY_HOME_ROUTINE,
  type AlarmValue,
  type DeleteRoutineRequest,
  type HomeRoutineResult,
  type RepeatValue,
  type RoutineValue,
} from '@/types/routines/Routine.types';
import {
  getErrorCode,
  toCreateRoutineRequest,
  toDraftFromRoutineInfo,
  toEditRoutineRequest,
} from '@/utils/homes/routineUtils';
import { create } from 'zustand';
import { useSnackbarStore } from '../homes/snackbarStore';

// 루틴 초기 draft
const initialDraft: RoutineValue = {
  title: null,
  icon: null,
  repeat: { type: 'NONE' },
  alarm: { enabled: false, time: '오후 12:00' },
};

type HomeRoutineState = {
  data: HomeRoutineResult;
  isLoading: boolean;

  setHomeRoutine: (data: HomeRoutineResult) => void;
  clearHomeRoutine: () => void;
  toggleRoutine: (memberRoutineId: number, date: string) => Promise<void>;
  draft: RoutineValue;

  setTitle: (title: string) => void;
  setIcon: (icon: string | null) => void;
  setRepeat: (repeat: RepeatValue) => void;
  setAlarm: (alarm: AlarmValue) => void;

  resetDraft: () => void;

  createRoutine: (startDate: string) => Promise<void>;

  fetchRoutineInfo: (memberRoutineId: number) => Promise<void>;

  updateRoutine: (memberRoutineId: number) => Promise<void>;

  deleteRoutine: (
    memberRoutineId: number,
    body: DeleteRoutineRequest
  ) => Promise<void>;
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
    } catch (err) {
      set({ data: prev });

      const code = getErrorCode(err);

      if (code === ROUTINE_ERROR_CODE.FUTURE_DATE_CHECK) {
        useSnackbarStore.getState().show();
      }
    }
  },
  draft: initialDraft,

  setTitle: (title) => set((s) => ({ draft: { ...s.draft, title } })),
  setIcon: (icon) => set((s) => ({ draft: { ...s.draft, icon } })),
  setRepeat: (repeat) => set((s) => ({ draft: { ...s.draft, repeat } })),
  setAlarm: (alarm) => set((s) => ({ draft: { ...s.draft, alarm } })),

  resetDraft: () => set({ draft: initialDraft }),

  createRoutine: async (startDate) => {
    const { draft, data } = get();

    set({ isLoading: true });
    try {
      const payload = toCreateRoutineRequest(draft, startDate);

      await createRoutine(payload);

      set({ isLoading: false, data });
      get().resetDraft();
    } catch (e) {
      set({ isLoading: false });
      throw e;
    }
  },

  fetchRoutineInfo: async (memberRoutineId) => {
    set({ isLoading: true });

    try {
      const info = await getRoutineInfo(memberRoutineId);
      const nextDraft = toDraftFromRoutineInfo(info);

      get().setTitle(nextDraft.title ?? '루틴 제목');
      get().setIcon(nextDraft.icon);
      get().setRepeat(nextDraft.repeat);
      get().setAlarm(nextDraft.alarm);

      set({ isLoading: false });
    } catch (e) {
      set({ isLoading: false });
      throw e;
    }
  },

  updateRoutine: async (memberRoutineId) => {
    const { draft } = get();

    set({ isLoading: true });
    try {
      const payload = toEditRoutineRequest(draft);
      await editRoutine(memberRoutineId, payload);

      set({ isLoading: false });
      get().resetDraft();
    } catch (e) {
      set({ isLoading: false });
      throw e;
    }
  },

  deleteRoutine: async (memberRoutineId, body) => {
    const prev = get().data;

    set({
      isLoading: true,
      data: {
        ...prev,
        routines: prev.routines.filter(
          (r) => r.memberRoutineId !== memberRoutineId
        ),
      },
    });

    try {
      await deleteRoutine(memberRoutineId, body);
      set({ isLoading: false });
      get().resetDraft();
    } catch (e) {
      set({ isLoading: false, data: prev });
      throw e;
    }
  },
}));
