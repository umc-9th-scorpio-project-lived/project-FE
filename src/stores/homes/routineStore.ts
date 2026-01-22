import type { AlarmValue, RepeatValue, RoutineValue } from "@/types/homes/Routine.types";
import { create } from "zustand";

// 루틴 추가/수정 일괄 관리를 위해 draft 상태 사용
type RoutineState = {
  draft: RoutineValue;

  setTitle: (title: string) => void;
  setIcon: (icon: string | null) => void;
  setRepeat: (repeat: RepeatValue) => void;
  setAlarm: (alarm: AlarmValue) => void;

  resetDraft: () => void;
};

// 루틴 초기값 설정
const initialDraft: RoutineValue = {
  title: null,
  icon: null,
  repeat: { type: "NONE" },
  alarm: { enabled: false, time: "오후 12:00" },
};

export const useRoutineStore = create<RoutineState>((set) => ({
  draft: initialDraft,

  // 제목 설정
  setTitle: (title) =>
    set((s) => ({
      draft: { ...s.draft, title },
    })),

  // 아이콘 설정
  setIcon: (icon) =>
    set((s) => ({
      draft: { ...s.draft, icon },
    })),

  // 반복 주기 설정
  setRepeat: (repeat) =>
    set((s) => ({
      draft: { ...s.draft, repeat },
    })),

  // 알람 설정
  setAlarm: (alarm) =>
    set((s) => ({
      draft: { ...s.draft, alarm },
    })),

  // draft 초기화
  resetDraft: () => set({ draft: initialDraft }),
}));
