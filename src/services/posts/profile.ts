import { authApi } from '@/api';
import type {
  CommunityProfileResult,
  EditCommunityProfileRequest,
} from '@/types/communities/Profile.types';

// 커뮤니티 프로필 기본 정보 조회
export const getCommunityProfile = (): Promise<CommunityProfileResult> => {
  return authApi.get(`/members/me/community`);
};

// 커뮤니티 프로필 수정
export const EditCommunityProfile = async (
  body: EditCommunityProfileRequest
): Promise<CommunityProfileResult> => {
  const formdata = new FormData();

  const requestBlob = new Blob([JSON.stringify(body.request)], {
    type: 'application/json',
  });

  formdata.append('request', requestBlob);

  if (body.image) {
    formdata.append('image', body.image);
  }

  return authApi.patch(`/members/me/community`, formdata, {
    headers: {
      'Content-Type': undefined,
    },
  });
};
