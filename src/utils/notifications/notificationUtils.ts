// "N분 전" | "N일 전" | "N주 전" 포맷 유틸
export const formatTimeAgo = (createdAt: string, now = new Date()): string => {
  const created = new Date(createdAt);

  // 유효하지 않은 날짜면 원본(혹은 빈값) 처리
  if (Number.isNaN(created.getTime())) return createdAt;

  const diffMs = now.getTime() - created.getTime();

  // 미래 시간이 들어오면 0분 전 처리
  const safeMs = Math.max(0, diffMs);

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;

  // 0~59분
  const mins = Math.floor(safeMs / minute);
  if (mins < 60) return `${mins}분 전`;

  // 1~6일
  const days = Math.floor(safeMs / day);
  if (days >= 1 && days <= 6) return `${days}일 전`;

  // 1~4주
  const weeks = Math.floor(safeMs / week);
  const clampedWeeks = Math.min(Math.max(1, weeks), 4);
  return `${clampedWeeks}주 전`;
};
