import { authApi } from '@/api';
import type { CategoryBatchRequest } from '@/types/recommendations/Recommend.types';

// 카테고리 별 추천 루틴 일괄 등록 API
const addCategoryRoutine = async (
  body: CategoryBatchRequest
): Promise<string> => {
  return await authApi.post<string, string, CategoryBatchRequest>(
    '/recommendations/batch',
    body
  );
};

export default addCategoryRoutine;
