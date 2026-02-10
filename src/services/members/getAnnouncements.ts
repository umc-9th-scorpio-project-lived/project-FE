import { authApi } from '@/api';
import type { ApiResponse } from '@/types/Api.types';
import type { AnnouncementListResult } from '@/types/members/Member.types';

// 공지사항 목록 조회 API
const getAnnouncements = async (): Promise<AnnouncementListResult> => {
  return await authApi.get<
    ApiResponse<AnnouncementListResult>,
    AnnouncementListResult
  >('/members/me/announcements');
};

export default getAnnouncements;
