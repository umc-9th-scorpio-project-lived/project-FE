import { baseApi } from '@/api';

export type RecommendedRoutine = {
  routineId: number;
  title: string;
  emoji: string;
};

const getRoutinesByConcerns = async (
  concernIds: number[]
): Promise<RecommendedRoutine[]> => {
  const { data } = await baseApi.get<RecommendedRoutine[]>(
    '/recommendations/concerns',
    { params: { concernIds } }
  );
  return data;
};

export default getRoutinesByConcerns;
