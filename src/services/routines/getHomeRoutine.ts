import { authApi } from '@/api';
import type { HomeRoutineResult } from '@/types/routines/Routine.types';

// 홈 화면 루틴 관련 정보 조회 API
const getHomeRoutine = async (date: string): Promise<HomeRoutineResult> => {
  return await authApi.get(`/routines/home?date=${date}`);
};

export default getHomeRoutine;
