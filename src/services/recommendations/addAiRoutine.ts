import { authApi } from '@/api';
import type { AiBatchRequest } from '@/types/recommendations/Recommend.types';

// AI 추천 루틴 일괄 등록 API
const addAiRoutine = async (body: AiBatchRequest): Promise<string> => {
  return await authApi.post<string, string, AiBatchRequest>(
    '/recommendations/ai/batch',
    body
  );
};

export default addAiRoutine;
