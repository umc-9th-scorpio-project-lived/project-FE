import { authApi } from '@/api';
import type { RoutineInfoResult } from '@/types/routines/Routine.types';

// 루틴 상세 정보 조회 API
const getRoutineInfo = (
  memberRoutineId: number
): Promise<RoutineInfoResult> => {
  return authApi.get(
    `/routines/${memberRoutineId}`
  ) as Promise<RoutineInfoResult>;
};

export default getRoutineInfo;
