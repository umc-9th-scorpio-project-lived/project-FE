import { authApi } from '@/api';
import type { EditRoutineRequest } from '@/types/routines/Routine.types';

// 루틴 완료 여부 토글 API
const editRoutine = (
  memberRoutineId: number,
  body: EditRoutineRequest
): Promise<void> => {
  return authApi.patch(`/routines/${memberRoutineId}`, body) as Promise<void>;
};

export default editRoutine;
