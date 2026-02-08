import { authApi } from '@/api';
import type { RecommendBatchRequest } from '@/types/recommendations/Recommend.types';

// 추천 루틴 일괄 등록 API
const addRecommendBatch = async (
  body: RecommendBatchRequest
): Promise<string> => {
  return await authApi.post<string, string, RecommendBatchRequest>(
    '/recommendations/batch',
    body
  );
};

export default addRecommendBatch;
