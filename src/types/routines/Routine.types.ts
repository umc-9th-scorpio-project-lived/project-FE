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

// 루틴 조회 API 응답 타입
export type GetRoutinesResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    dateTitle: string;
    fullDate: string;
    progressMessage: string;
    routines: [
      {
        memberRoutineId: 0;
        title: string;
        emoji: string;
        alarmTime: string;
        isDone: boolean;
      },
    ];
  };
};
