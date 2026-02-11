import { authApi } from '@/api';
import type { ApiResponse } from '@/types/Api.types';
import type { UnblockMemberResult } from '@/types/members/Member.types';

// 차단 해제 API
const unblockMember = async (
  blockedMemberId: number
): Promise<UnblockMemberResult> => {
  return await authApi.delete<
    ApiResponse<UnblockMemberResult>,
    UnblockMemberResult
  >(`/members/blocks/${blockedMemberId}`);
};

export default unblockMember;
