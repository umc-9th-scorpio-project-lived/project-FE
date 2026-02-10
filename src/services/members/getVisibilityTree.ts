import { authApi } from '@/api';
import type { ApiResponse } from '@/types/Api.types';
import type { VisibilityTreeResult } from '@/types/members/Member.types';

// 루틴 나무 공개 범위 조회 API
const getVisibilityTree = async (): Promise<VisibilityTreeResult> => {
  return await authApi.get<
    ApiResponse<VisibilityTreeResult>,
    VisibilityTreeResult
  >('/members/me/visibility');
};

export default getVisibilityTree;
