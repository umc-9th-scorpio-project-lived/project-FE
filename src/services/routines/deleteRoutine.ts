import { authApi } from '@/api';
import type { DeleteRoutineRequest } from '@/types/routines/Routine.types';

const deleteRoutine = async (content: DeleteRoutineRequest) => {
  return authApi.delete(`/routines?memberRoutineId=${1}`, content);
};

export default deleteRoutine;
