import { create } from 'zustand';

type SnackbarState = {
  open: boolean;
  durationMs: number;

  // 스낵바 열기
  show: (durationMs?: number) => void;

  // 스낵바 닫기
  hide: () => void;
};

export const useSnackbarStore = create<SnackbarState>((set) => ({
  open: false,
  durationMs: 3000,

  show: (durationMs = 3000) => {
    set({ open: true, durationMs });
  },

  hide: () => set({ open: false }),
}));
