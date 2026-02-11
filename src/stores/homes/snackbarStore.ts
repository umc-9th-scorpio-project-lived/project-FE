import { create } from 'zustand';

export type RoutineSnackbarKey =
  | 'ROUTINE_FUTURE_DATE'
  | 'ROUTINE_DUPLICATE_NAME';

type SnackbarState = {
  open: boolean;
  snackbarKey: RoutineSnackbarKey | null;
  durationMs: number;

  // 스낵바 열기
  show: (payload: {
    snackbarKey: RoutineSnackbarKey;
    durationMs?: number;
  }) => void;

  // 스낵바 닫기
  hide: () => void;
};

const DEFAULT_DURATION = 3000;

export const useSnackbarStore = create<SnackbarState>((set) => ({
  open: false,
  snackbarKey: null,
  durationMs: DEFAULT_DURATION,

  show: ({ snackbarKey, durationMs }) =>
    set({
      open: true,
      snackbarKey,
      durationMs: durationMs ?? DEFAULT_DURATION,
    }),

  hide: () => set({ open: false }),
}));
