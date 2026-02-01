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
