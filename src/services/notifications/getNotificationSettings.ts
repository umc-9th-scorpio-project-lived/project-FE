import { authApi } from '@/api';
import type { ApiResponse } from '@/types/Api.types';
import type { NotificationSettingsResult } from '@/types/notifications/Notification.types';

// 알림 설정 조회 API
const getNotificationSettings =
  async (): Promise<NotificationSettingsResult> => {
    return await authApi.get<
      ApiResponse<NotificationSettingsResult>,
      NotificationSettingsResult
    >('/notifications/settings');
  };

export default getNotificationSettings;
