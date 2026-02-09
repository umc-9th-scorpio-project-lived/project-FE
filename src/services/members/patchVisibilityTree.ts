import { authApi } from '@/api';
import type { ApiResponse } from '@/types/Api.types';
import type {
  PatchVisibilityTreeRequest,
  PatchVisibilityTreeResult,
} from '@/types/members/Member.types';

// 루틴 나무 공개 범위 설정 API
const patchVisibilityTree = async (
  body: PatchVisibilityTreeRequest
): Promise<PatchVisibilityTreeResult> => {
  return await authApi.patch<
    ApiResponse<PatchVisibilityTreeResult>,
    PatchVisibilityTreeResult,
    PatchVisibilityTreeRequest
  >('/members/me/visibility', body);
};

export default patchVisibilityTree;
