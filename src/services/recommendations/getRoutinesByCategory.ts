import { authApi } from '@/api';
import type { CategoryRecommendResult } from '@/types/recommendations/Recommend.types';

// 카테고리별 전체 추천 루틴 조회 API
const getRoutineByCategory = async (): Promise<CategoryRecommendResult> => {
  return await authApi.get<CategoryRecommendResult, CategoryRecommendResult>(
    '/recommendations/categories'
  );
};

export default getRoutineByCategory;
