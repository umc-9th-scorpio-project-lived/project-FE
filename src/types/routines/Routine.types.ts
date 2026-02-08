// 루틴 생성 API 요청 타입
export type CreateRoutineRequest = {
  title: string;
  emoji: string;
  repeatType: string;
  repeatInterval: number;
  repeatValues: string[];
  isAlarmon: boolean;
  alarmTime: string;
  startDate: string;
  repeatValueAsString: string;
};

// 루틴 삭제 API 요청 타입
export type DeleteRoutineRequest = {
  deleteType: string;
  targetDate: string;
};

// 루틴 수정 API 요청 타입
export type EditRoutineRequest = {
  title: string;
  emoji: string;
  repeatType: string;
  repeatInterval: number;
  repeatValues: string[];
  alarmTime: string;
  isAlarmOn: boolean;
  joinedRepeatValue: string;
};

// 루틴 아이템
export type HomeRoutineItem = {
  memberRoutineId: number;
  title: string;
  emoji: string;
  alarmTime: string;
  isDone: boolean;
};

// 홈 화면 텍스트 및 루틴 목록 타입
export type HomeRoutineResult = {
  dateTitle: string;
  fullDate: string;
  progressMessage: string;
  routines: HomeRoutineItem[];
};

// 홈 루틴 초기값
export const EMPTY_HOME_ROUTINE: HomeRoutineResult = {
  dateTitle: '',
  fullDate: '',
  progressMessage: '',
  routines: [],
};

export type RoutineInfoResult = {
  memberRoutineId: number;
  title: string;
  emoji: string;
  repeatType: string;
  repeatInterval: number;
  repeatValue: string;
  alarmTime: string;
  isAlarmOn: boolean;
};

// 루틴 주기 타입
export type RepeatValue =
  | { type: 'DATE'; dates: number[]; isLastDayOfMonth?: boolean }
  | {
      type: 'INTERVAL';
      every: number;
      unit: 'WEEK';
      days: number[]; // 0~6 (일~토)
      isEveryday?: boolean;
    }
  | { type: 'NONE' };

// 알림 설정 타입
export type AlarmValue = { enabled: boolean; time: string };

// 루틴 타입
export type RoutineValue = {
  title: string | null;
  icon: string | null;
  repeat: RepeatValue;
  alarm: AlarmValue;
};
