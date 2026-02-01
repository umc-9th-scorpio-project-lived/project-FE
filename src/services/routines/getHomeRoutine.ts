import { authApi } from '@/api';
import type { ApiResponse } from '@/types/Api.types';
import type { HomeRoutineResult } from '@/types/routines/Routine.types';

// 홈 화면 루틴 관련 정보 조회 API
const getHomeRoutine = async (date: string) => {
  const res = await authApi.get<ApiResponse<HomeRoutineResult>>(
    `/routines/home?date=${date}`,
    {}
  );
  return res.data;
};

export default getHomeRoutine;
