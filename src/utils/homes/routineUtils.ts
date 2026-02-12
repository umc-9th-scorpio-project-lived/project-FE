import { WEEK_LABELS } from '@/constants';
import type {
  AlarmValue,
  CreateRoutineRequest,
  EditRoutineRequest,
  RepeatValue,
  RoutineInfoResult,
  RoutineValue,
} from '@/types/routines/Routine.types';
import { formatAlarmTime, normalizeAlarmTime } from './homeUtils';

type Ampm = '오전' | '오후';

type AlarmParts = {
  ampm: Ampm;
  hour: number; // "1" ~ "12"
  minute: string; // "00" ~ "59"
};

// 알람 형식 파싱 유틸
export const parseAlarm = (timeText?: string): AlarmParts => {
  // 기본값: 오후 12:00
  if (!timeText) return { ampm: '오후', hour: 12, minute: '00' };

  // 공백을 기준으로 "오전/오후" "HH:mm" 분리
  const [ampmText, hmText] = timeText.split(' ');
  // :을 기준으로 "HH" "mm" 분리
  const [hourText, minuteText] = hmText.split(':');

  const hour = Math.min(12, Math.max(1, Number(hourText || 12)));
  const minute = String(minuteText ?? '00').padStart(2, '0');
  const ampm: Ampm = ampmText === '오전' ? '오전' : '오후';

  return { ampm, hour, minute };
};

// 반복 주기 draft 타입
export type RepeatDraft =
  | {
      tab: 'DATE';
      selectedDates: number[]; // 1~31
      lastDay: boolean; // 매달 마지막 날
    }
  | {
      tab: 'WEEK';
      weekDays: number[]; // 0~6
      isEveryday: boolean;
      everyWeeks: number; // 1~5
    };

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

// 반복 주기 라벨 포맷 유틸
export const formatRepeatLabel = (repeat: RepeatValue): string => {
  if (repeat.type === 'NONE') return '주기를 선택해주세요.';

  // 지정 날짜
  if (repeat.type === 'DATE') {
    const dates = repeat.dates ?? [];
    const hasLastDay = !!repeat.isLastDayOfMonth;

    const datesForSummary = hasLastDay ? dates.filter((d) => d !== 31) : dates;

    const parts: string[] = [];
    if (datesForSummary.length > 0)
      parts.push(`${datesForSummary.join(', ')}일`);
    if (hasLastDay) parts.push('마지막 날');

    if (parts.length === 1 && parts[0] === '마지막 날') return '매달 마지막 날';
    return `매달 ${parts.join(', ')}`;
  }

  // 특정 간격
  const isEveryday = repeat.isEveryday || repeat.days.length === 7;
  const every = repeat.every ?? 1;
  if (isEveryday) {
    return every === 1 ? '매일' : `${every}주마다-매일`;
  }

  const dayText = repeat.days
    .map((d: string | number) => WEEK_LABELS[Number(d)])
    .join(', ');
  return `${every}주마다-${dayText}`;
};

export const formatRepeatResult = (
  draft: RepeatDraft
): { summary: string; value: RepeatValue; isValid: boolean } => {
  // 지정 날짜
  if (draft.tab === 'DATE') {
    const hasAny = draft.selectedDates.length > 0 || draft.lastDay;
    if (!hasAny)
      return { summary: '', value: { type: 'NONE' }, isValid: false };

    const selected = [...draft.selectedDates].sort((a, b) => a - b);

    // lastDay가 켜져 있을 경우 31 강제 포함
    const dates =
      draft.lastDay && !selected.includes(31)
        ? [...selected, 31].sort((a, b) => a - b)
        : selected;

    const datesForSummary = draft.lastDay
      ? dates.filter((d) => d !== 31)
      : dates;

    const parts: string[] = [];
    if (datesForSummary.length > 0)
      parts.push(`${datesForSummary.join(',')}일`);
    if (draft.lastDay) parts.push('마지막 날');

    const summary =
      parts.length === 1 && parts[0] === '마지막 날'
        ? '매달 마지막 날'
        : `매달 ${parts.join(',')}`;

    return {
      summary,
      value: { type: 'DATE', dates, isLastDayOfMonth: draft.lastDay },
      isValid: true,
    };
  }

  // 특정 간격
  const hasAny = draft.isEveryday || draft.weekDays.length > 0;
  if (!hasAny) return { summary: '', value: { type: 'NONE' }, isValid: false };

  const days =
    draft.isEveryday || draft.weekDays.length === 7
      ? ([0, 1, 2, 3, 4, 5, 6] as number[])
      : [...draft.weekDays].sort((a, b) => a - b);

  const isEveryday = draft.isEveryday || days.length === 7;
  const every = clamp(draft.everyWeeks || 1, 1, 5);

  const dayLabels = isEveryday
    ? '매일'
    : days.map((d) => WEEK_LABELS[d]).join(',');
  const summary = dayLabels === '매일' ? '매일' : `${every}주마다 ${dayLabels}`;

  return {
    summary,
    value: {
      type: 'INTERVAL',
      unit: 'WEEK',
      every,
      days,
      isEveryday,
    },
    isValid: true,
  };
};

// draft -> 루틴 생성 API 요청 변환
export const toCreateRoutineRequest = (
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
    repeatType = 'WEEKLY';
    repeatInterval = r.every ?? 1;
    repeatValues = (r.days ?? []).map(String); // [0..6]
    repeatValueAsString = r.isEveryday
      ? '매일'
      : `${repeatInterval}주마다 ${repeatValues.join(',')}`;
  } else if (r.type === 'DATE') {
    repeatType = 'MONTHLY';
    repeatInterval = 1;

    const dates = (r.dates ?? []).slice().sort((a, b) => a - b);
    const hasLastDay = !!r.isLastDayOfMonth;

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

// 서버 응답 -> draft 변환
export const toDraftFromRoutineInfo = (
  info: RoutineInfoResult
): RoutineValue => {
  const title = info.title ?? null;
  const icon = info.emoji ?? null;

  // alarm
  const isAlarmOn = !!info.isAlarmOn;
  const alarmTimeLabel = formatAlarmTime(info.alarmTime); // "오전/오후 h:mm"

  const alarm: AlarmValue = isAlarmOn
    ? { enabled: true, time: alarmTimeLabel }
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
    const isLastDayOfMonth = tokens.includes('L');

    const dates = tokens
      .filter((v) => v !== 'L')
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

// draft -> 루틴 수정 API 요청 변환
export const toEditRoutineRequest = (
  draft: RoutineValue
): EditRoutineRequest => {
  const title = (draft.title ?? '').trim();
  const emoji = draft.icon ?? '👍';

  let repeatType = 'NONE';
  let repeatInterval = 1;
  let repeatValues: string[] = [];

  const r = draft.repeat;

  if (r.type === 'INTERVAL') {
    repeatType = 'WEEKLY';
    repeatInterval = r.every ?? 1;
    repeatValues = (r.days ?? []).map(String); // 0~6
  } else if (r.type === 'DATE') {
    repeatType = 'MONTHLY';
    repeatInterval = 1;

    const dates = (r.dates ?? [])
      .slice()
      .sort((a, b) => a - b)
      .map(String);
    const hasLastDay = !!r.isLastDayOfMonth;

    repeatValues = hasLastDay ? [...dates, 'L'] : dates;
  }

  const isAlarmOn = !!draft.alarm.enabled;
  const alarmTime = isAlarmOn ? normalizeAlarmTime(draft.alarm.time) : '';

  return {
    title,
    emoji,
    repeatType,
    repeatInterval,
    repeatValues,
    alarmTime,
    isAlarmOn,
  } as EditRoutineRequest;
};

type WithCode = { code?: string };
type WithRaw = { raw?: unknown };

const hasCode = (v: unknown): v is WithCode =>
  typeof v === 'object' && v !== null && 'code' in v;

const hasRaw = (v: unknown): v is WithRaw =>
  typeof v === 'object' && v !== null && 'raw' in v;

export const getErrorCode = (err: unknown): string | undefined => {
  if (hasCode(err) && typeof err.code === 'string') return err.code;

  if (hasRaw(err)) {
    const raw = err.raw;

    if (hasCode(raw) && typeof raw.code === 'string') return raw.code;

    if (hasRaw(raw)) {
      const raw2 = raw.raw;
      if (hasCode(raw2) && typeof raw2.code === 'string') return raw2.code;
    }
  }

  return undefined;
};
