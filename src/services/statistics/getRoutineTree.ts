import { authApi } from '@/api';
import type {
  RoutineTreeResponse,
  YearMonth,
} from '@/types/statistics/Statistics.types';

export const getRoutineTree = async (
  yearMonth: YearMonth
): Promise<RoutineTreeResponse> => {
  return await authApi.get('/statistics/tree', {
    params: yearMonth,
  });
};
