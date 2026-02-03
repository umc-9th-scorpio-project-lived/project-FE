import { authApi } from '@/api';
import type {
  FruitsStatistics,
  YearMonth,
} from '@/types/statistics/Statistics.types';

export const getFruitsStatistics = async (
  yearMonth: YearMonth
): Promise<FruitsStatistics> => {
  return await authApi.get('/statistics/tree', {
    params: yearMonth,
  });
};
