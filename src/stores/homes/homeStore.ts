import { getWeekStartDate, normalizeDate } from "@/utils/homes/homeUtils";
import { create } from "zustand";

type HomeDateState = {
  // 홈에서 선택된 날짜
  selectedDate: Date;

  // 선택 날짜가 속한 주의 시작일
  weekStartDate: Date;

  // 날짜 선택 + 해당 날짜의 주 시작일 동기화
  setSelectedDate: (date: Date) => void;

  // 주 시작일을 이전 주(7일 전)로 이동
  goPrevWeek: () => void;

  // 주 시작일을 다음 주(7일 후)로 이동
  goNextWeek: () => void;

  // 오늘 날짜로 초기화
  resetToToday: () => void;
};

export const useHomeDateStore = create<HomeDateState>((set) => ({
  // 초기 선택 날짜 (오늘)
  selectedDate: normalizeDate(new Date()),

  // 초기 주 시작일 (오늘이 속한 주의 일요일)
  weekStartDate: getWeekStartDate(new Date()),

  // 날짜를 선택하면 선택 날짜/주 시작일을 함께 갱신
  setSelectedDate: (date) =>
    set({
      selectedDate: normalizeDate(date),
      weekStartDate: getWeekStartDate(date),
    }),

  // weekStartDate 기준으로 7일 이전 주로 이동
  goPrevWeek: () =>
    set((state) => ({
      weekStartDate: getWeekStartDate(new Date(state.weekStartDate.getTime() - 7 * 86400000)),
    })),

  // weekStartDate 기준으로 7일 다음 주로 이동
  goNextWeek: () =>
    set((state) => ({
      weekStartDate: getWeekStartDate(new Date(state.weekStartDate.getTime() + 7 * 86400000)),
    })),

  // 상태를 오늘 기준으로 리셋
  resetToToday: () =>
    set({
      selectedDate: normalizeDate(new Date()),
      weekStartDate: getWeekStartDate(new Date()),
    }),
}));
