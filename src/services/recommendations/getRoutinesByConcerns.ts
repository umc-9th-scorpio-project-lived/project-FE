import { baseApi } from '@/api';

export type RecommendedRoutine = {
  routineId: number;
  title: string;
  emoji: string;
};

const getRoutinesByConcerns = async (
  concernIds: number[]
): Promise<RecommendedRoutine[]> => {
  return await baseApi.get('/recommendations/concerns', {
    params: { concernIds },
  });
};

export default getRoutinesByConcerns;
