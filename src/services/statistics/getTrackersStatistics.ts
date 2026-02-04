import { authApi } from '@/api';
import type {
  TrackersStatistics,
  YearMonth,
} from '@/types/statistics/Statistics.types';

export const getTrackersStatistics = async (
  yearMonth: YearMonth
): Promise<TrackersStatistics> => {
  return await authApi.get('/statistics/calender', { params: yearMonth }); // calendar 오타 수정하기
};
