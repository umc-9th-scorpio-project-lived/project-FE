import { authApi } from '@/api';
import type { DeleteRoutineRequest } from '@/types/routines/Routine.types';

const deleteRoutine = (
  memberRoutineId: number,
  body: DeleteRoutineRequest
): Promise<void> => {
  return authApi.delete(`/routines/${memberRoutineId}`, {
    data: body,
  }) as Promise<void>;
};

export default deleteRoutine;
