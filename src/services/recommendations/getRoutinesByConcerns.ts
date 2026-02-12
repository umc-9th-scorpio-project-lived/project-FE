import { baseApi } from '@/api';

export type RecommendedRoutine = {
  routineId: number;
  title: string;
  emoji: string;
};

const getRoutinesByConcerns = async (
  concernIds: number[]
): Promise<RecommendedRoutine[]> => {
  const result = await baseApi.get<RecommendedRoutine[], RecommendedRoutine[]>(
    '/recommendations/concerns',
    { params: { concernIds } }
  );

  return result;
};

export default getRoutinesByConcerns;
