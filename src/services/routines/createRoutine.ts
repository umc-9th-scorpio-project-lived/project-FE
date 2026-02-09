import { authApi } from '@/api';
import type { CreateRoutineRequest } from '@/types/routines/Routine.types';

const createRoutine = async (content: CreateRoutineRequest) => {
  return authApi.post(`/routines`, content);
};

export default createRoutine;
