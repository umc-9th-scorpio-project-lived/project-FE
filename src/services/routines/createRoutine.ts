import { authApi } from '@/api';
import type { CreateRoutineRequest } from '@/types/routines/Routine.types';

const createRoutine = async (content: CreateRoutineRequest) => {
  return authApi.post(`/routines?memberId=${1}`, content);
};

export default createRoutine;
