import type { RoutineTreeVisibility } from '@/types/members/Member.types';

export const toVisibilityLabel = (v?: RoutineTreeVisibility) => {
  if (v === 'FRIENDS') return '친구 공개';
  if (v === 'PARTIAL') return '일부 공개';
  if (v === 'PRIVATE') return '나만 보기';
};
