import { authApi } from '@/api';
import type { ApiResponse } from '@/types/Api.types';
import type { UserProfileResult } from '@/types/members/Member.types';

// 기본 프로필 정보 조회 API
const getUserProfile = async (): Promise<UserProfileResult> => {
  return await authApi.get<ApiResponse<UserProfileResult>, UserProfileResult>(
    '/members/me'
  );
};

export default getUserProfile;
