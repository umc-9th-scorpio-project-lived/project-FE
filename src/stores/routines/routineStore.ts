import toggleRoutineCheck from '@/services/routines/checkRoutine';
import createRoutine from '@/services/routines/createRoutine';
import getRoutineInfo from '@/services/routines/getRoutineInfo';
import {
  EMPTY_HOME_ROUTINE,
  type AlarmValue,
  type CreateRoutineRequest,
  type HomeRoutineResult,
  type RepeatValue,
  type RoutineInfoResult,
  type RoutineValue,
} from '@/types/routines/Routine.types';
import { normalizeAlarmTime } from '@/utils/homes/homeUtils';
import { create } from 'zustand';

// 루틴 초기 draft
const initialDraft: RoutineValue = {
  title: null,
  icon: null,
  repeat: { type: 'NONE' },
  alarm: { enabled: false, time: '오후 12:00' },
};

// draft -> 서버 요청 변환
const toCreateRoutineRequest = (
  draft: RoutineValue,
  startDate: string
): CreateRoutineRequest => {
  const title = (draft.title ?? '').trim();
  const emoji = draft.icon ?? '👍';

  // repeat 변환
  let repeatType = 'NONE';
  let repeatInterval = 1;
  let repeatValues: string[] = [];
  let repeatValueAsString = '';

  const r = draft.repeat;

  if (r.type === 'INTERVAL') {
    // 예: WEEKLY
    repeatType = 'WEEKLY';
    repeatInterval = r.every ?? 1;
    repeatValues = (r.days ?? []).map(String); // [0..6]
    repeatValueAsString = r.isEveryday
      ? '매일'
      : `${repeatInterval}주마다 ${repeatValues.join(',')}`;
  } else if (r.type === 'DATE') {
    // 예: MONTHLY (서버 스펙에 맞게 필요하면 바꿔)
    repeatType = 'MONTHLY';
    repeatInterval = 1;

    const dates = (r.dates ?? []).slice().sort((a, b) => a - b);
    const hasLastDay = !!r.isLastDayOfMonth;

    // 마지막 날을 서버가 "31"로 받는 구조면 그대로 두고,
    // 서버가 별도 플래그를 원하면 여기에서 repeatValues 구성 바꿔주면 됨.
    repeatValues = dates.map(String);
    repeatValueAsString = hasLastDay
      ? `${repeatValues.join(',')},LAST`
      : repeatValues.join(',');
  }

  const isAlarmon = !!draft.alarm.enabled;
  const alarmTime = isAlarmon ? normalizeAlarmTime(draft.alarm.time) : '';

  return {
    title,
    emoji,
    repeatType,
    repeatInterval,
    repeatValues,
    isAlarmon,
    alarmTime,
    startDate,
    repeatValueAsString,
  };
};

const toDraftFromRoutineInfo = (info: RoutineInfoResult): RoutineValue => {
  const title = info.title ?? null;
  const icon = info.emoji ?? null;

  // alarm
  const isAlarmOn = !!info.isAlarmOn;
  const alarmTimeRaw = typeof info.alarmTime === 'string' ? info.alarmTime : '';
  const alarmTime =
    alarmTimeRaw.length >= 5 ? alarmTimeRaw.slice(0, 5) : '12:00';

  const alarm: AlarmValue = isAlarmOn
    ? { enabled: true, time: alarmTime }
    : { enabled: false, time: '오후 12:00' };

  // repeat
  const repeatType = info.repeatType ?? 'NONE'; // WEEKLY / MONTHLY / NONE
  const repeatInterval = Number(info.repeatInterval ?? 1);

  const repeatValueRaw =
    typeof info.repeatValue === 'string' ? info.repeatValue : '';
  const tokens = repeatValueRaw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  let repeat: RepeatValue = { type: 'NONE' };

  if (repeatType === 'WEEKLY') {
    const days = tokens
      .map((v) => Number(v))
      .filter((n) => Number.isFinite(n) && n >= 0 && n <= 6);

    repeat =
      days.length > 0
        ? {
            type: 'INTERVAL',
            every: repeatInterval || 1,
            unit: 'WEEK',
            days,
            isEveryday: days.length === 7,
          }
        : { type: 'NONE' };
  }

  if (repeatType === 'MONTHLY') {
    // 월간: "1,15,31" or "1,15,LAST" 같은 형태를 가정
    const isLastDayOfMonth = tokens.includes('LAST');

    const dates = tokens
      .filter((v) => v !== 'LAST')
      .map((v) => Number(v))
      .filter((n) => Number.isFinite(n) && n >= 1 && n <= 31)
      .sort((a, b) => a - b);

    repeat =
      dates.length > 0 || isLastDayOfMonth
        ? { type: 'DATE', dates, isLastDayOfMonth }
        : { type: 'NONE' };
  }

  return { title, icon, repeat, alarm };
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

      // 필요 시 여기에서 canSubmit 같은 검증도 가능
      await createRoutine(payload);

      // 생성 후 홈 리스트를 즉시 갱신하고 싶다면:
      // 1) 서버가 생성된 루틴을 응답으로 주는 경우, 그걸 push
      // 2) 아니면 "홈 루틴 재조회 API" 호출해서 setHomeRoutine
      // 여기서는 최소한으로 draft만 초기화 + 로딩 해제만.
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

      // draft 프리필
      get().setTitle(nextDraft.title ?? '제목 없음');
      get().setIcon(nextDraft.icon);
      get().setRepeat(nextDraft.repeat);
      get().setAlarm(nextDraft.alarm);

      set({ isLoading: false });
    } catch (e) {
      set({ isLoading: false });
      throw e;
    }
  },
}));
