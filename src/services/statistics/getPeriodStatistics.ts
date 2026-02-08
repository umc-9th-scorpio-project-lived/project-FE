import { authApi } from '@/api';
import type {
  PeriodSelection,
  PeriodStatistics,
} from '@/types/statistics/Statistics.types';

export const getPeriodStatistics = async (
  periodSelection: PeriodSelection
): Promise<PeriodStatistics> => {
  return await authApi.get('/statistics/me', { params: periodSelection });
};
