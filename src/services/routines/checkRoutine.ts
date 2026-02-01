import { authApi } from '@/api';

// 루틴 완료 여부 토글 API
const toggleRoutineCheck = async (
  memberRoutineId: number,
  date: string
): Promise<boolean> => {
  return await authApi.patch(`/routines/${memberRoutineId}/check?date=${date}`);
};

export default toggleRoutineCheck;
