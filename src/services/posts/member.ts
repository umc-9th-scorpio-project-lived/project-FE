import { authApi } from '@/api';
import type {
  BlockMemberRequest,
  BlockMemberResponse,
} from '@/types/communities/Member.types';

// 사용자 차단
export const blockMember = async (
  body: BlockMemberRequest
): Promise<BlockMemberResponse> => {
  return authApi.post(`/members/blocks`, body);
};
