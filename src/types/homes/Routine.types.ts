// 루틴 주기 타입
export type RepeatValue =
  | { type: "DATE"; dates: number[]; isLastDayOfMonth?: boolean }
  | {
      type: "INTERVAL";
      every: number;
      unit: "WEEK";
      days: number[]; // 0~6 (일~토)
      isEveryday?: boolean;
    }
  | { type: "NONE" };

// 알림 설정 타입
export type AlarmValue = { enabled: boolean; time: string };

// 루틴 타입
export type RoutineValue = {
  title: string | null;
  icon: string | null;
  repeat: RepeatValue;
  alarm: AlarmValue;
};
