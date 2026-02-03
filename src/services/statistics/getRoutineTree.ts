import { authApi } from '@/api';
import type {
  RoutineTreeResponse,
  YearMonth,
} from '@/types/statistics/Statistics.types';

export const getRoutineTree = async (
  yearMonth: YearMonth
): Promise<RoutineTreeResponse> => {
  const { data } = await authApi.get('/statistics/tree', {
    params: yearMonth,
  });

  return data;
};
