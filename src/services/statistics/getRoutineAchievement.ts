import { authApi } from '@/api';
import type {
  RoutineAchievement,
  RoutineYearMonth,
} from '@/types/statistics/Statistics.types';

export const getRoutineAchievement = async (
  routineYearMonth: RoutineYearMonth
): Promise<RoutineAchievement> => {
  return await authApi.get(
    `/statistics/routines/${routineYearMonth.memberRoutineId}/popup`,
    {
      params: routineYearMonth,
    }
  );
};
