import { authApi } from '@/api';
import type { ApiResponse } from '@/types/Api.types';
import type { BlockMembersResult } from '@/types/members/Member.types';

// 차단 목록 조회 API
const getBlockMembers = async (): Promise<BlockMembersResult> => {
  return await authApi.get<ApiResponse<BlockMembersResult>, BlockMembersResult>(
    '/members/blocks'
  );
};

export default getBlockMembers;
