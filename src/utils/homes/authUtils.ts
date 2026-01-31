import type { GenderEnum, LivingPeriod } from '@/types/auths/Auth.types';

export const yyyymmddToDate = (v: string) => {
  const s = v.replaceAll('.', '').replaceAll('-', '');
  if (s.length !== 8) return '';
  return `${s.slice(0, 4)}-${s.slice(4, 6)}-${s.slice(6, 8)}`;
};

export const toGenderEnum = (g: string): GenderEnum => {
  if (g === '남성') return 'MALE';
  if (g === '여성') return 'FEMALE';
  return 'NONE';
};

export const toLivingPeriod = (v: string): LivingPeriod => {
  if (!v) return 'PRE';
  const s = v.replaceAll(' ', '');

  if (s === '예비 자취인') return 'PRE';
  if (s === '1년 ~ 3년 사이') return '1-3Y';
  if (s === '3년 ~ 5년 사이') return '3-5Y';
  if (s === '5년 이상') return 'OVER5Y';

  return 'PRE';
};

export const toIdListFromString = (arr: string[]) =>
  arr.map((x) => Number(x)).filter((n) => Number.isFinite(n) && n > 0);
