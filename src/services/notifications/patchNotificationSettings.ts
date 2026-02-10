import { authApi } from '@/api';
import type { ApiResponse } from '@/types/Api.types';
import type {
  NotificationSettingsResult,
  PatchNotificationSettingsRequest,
} from '@/types/notifications/Notification.types';

// 알림 설정 수정 API
const patchNotificationSettings = async (
  body: PatchNotificationSettingsRequest
): Promise<NotificationSettingsResult> => {
  return await authApi.patch<
    ApiResponse<NotificationSettingsResult>,
    NotificationSettingsResult,
    PatchNotificationSettingsRequest
  >('/notifications/settings', body);
};

export default patchNotificationSettings;
