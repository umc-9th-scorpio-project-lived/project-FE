import type { RoutineTreeVisibility } from '@/types/members/Member.types';

export const toVisibilityLabel = (v?: RoutineTreeVisibility) => {
  if (v === 'FRIENDS') return '친구 공개';
  if (v === 'PARTIAL') return '일부 공개';
  if (v === 'PRIVATE') return '나만 보기';
};

// 날짜 형식을 "YYYY.MM.DD" 문자열로 포맷
export const formatUserDate = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}.${m}.${d}`;
};
