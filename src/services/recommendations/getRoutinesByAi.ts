import { authApi } from '@/api';
import type { AiRecommendItem } from '@/types/recommendations/Recommend.types';

// AI 루틴 추천 리스트 조회 API
const getRoutinesByAi = async (): Promise<AiRecommendItem[]> => {
  return await authApi.get<AiRecommendItem[], AiRecommendItem[]>(
    '/recommendations/ai'
  );
};

export default getRoutinesByAi;
