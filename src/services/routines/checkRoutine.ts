import { authApi } from '@/api';
import type { ApiResponse } from '@/types/Api.types';

// 루틴 완료 여부 토글 API
const toggleRoutineCheck = async (memberRoutineId: number, date: string) => {
  const res = await authApi.patch<ApiResponse<boolean>>(
    `/routines/${memberRoutineId}/check?date=${date}`
  );

  return res.data;
};

export default toggleRoutineCheck;
