// 날짜를 00:00:00으로 정규화
export const normalizeDate = (d: Date) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};

// 주 시작일을 일요일로 정규화
export const getWeekStartDate = (d: Date) => {
  const x = normalizeDate(d);
  x.setDate(x.getDate() - x.getDay());
  return x;
};

// 날짜 형식을 "YYYY-MM-DD" 문자열로 포맷
export const formatDate = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

// 날짜(년/월/일) 동일 여부
export const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

// 날짜에 일수 더하기
export const addDays = (d: Date, days: number) => {
  const x = new Date(d);
  x.setDate(x.getDate() + days);
  return x;
};

// 월 이동
export const addMonths = (d: Date, diff: number) => {
  const x = new Date(d);
  x.setMonth(x.getMonth() + diff);
  return x;
};

// 해당 달의 1일
export const getMonthStartDate = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth(), 1);

// 달력 그리드 시작일(해당 달 1일이 속한 주의 일요일)
export const getCalendarGridStartDate = (monthDate: Date) => {
  const first = getMonthStartDate(monthDate);
  const day = first.getDay(); // 0=일
  const x = new Date(first);
  x.setDate(first.getDate() - day);
  return x;
};

// 두 날짜의 일수 차이 (a - b)
export const getDayOffset = (a: Date, b: Date) => {
  const A = normalizeDate(a).getTime();
  const B = normalizeDate(b).getTime();
  return Math.round((A - B) / 86400000);
};

// "오전/오후 h:mm" 또는 "HH:mm" 형식의 시간을 "HH:mm" 24시간 형식으로 정규화
export const normalizeAlarmTime = (time?: string | null): string => {
  if (!time) return '';

  if (/^\d{2}:\d{2}$/.test(time)) {
    return time;
  }

  // 오전/오후 hh:mm 형태 처리
  const match = time.match(/(오전|오후)\s*(\d{1,2}):(\d{2})/);
  if (!match) return '';

  const [, meridiem, h, m] = match;
  let hour = Number(h);

  if (meridiem === '오후' && hour < 12) hour += 12;
  if (meridiem === '오전' && hour === 12) hour = 0;

  return `${hour.toString().padStart(2, '0')}:${m}`;
};
