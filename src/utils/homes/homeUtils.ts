import { WEEK_LABELS } from "@/constants";

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
export const getMonthStartDate = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);

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

// "수요일, 1월 12일" 텍스트 포맷
export const formatDateTitle = (d: Date) => {
  const weekday = WEEK_LABELS[d.getDay()];
  const month = d.getMonth() + 1;
  const date = d.getDate();
  return `${weekday}요일, ${month}월 ${date}일`;
};

// "오늘 / 내일 / 어제 / n일 후 / n일 전" 텍스트 포맷
export const formatTopTitle = (selected: Date) => {
  const today = normalizeDate(new Date());
  const gap = getDayOffset(selected, today);

  if (gap === 0) return "오늘";
  if (gap === 1) return "내일";
  if (gap === -1) return "어제";
  if (gap > 1) return `${gap}일 후`;
  return `${Math.abs(gap)}일 전`;
};
