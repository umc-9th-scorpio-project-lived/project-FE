import { authApi } from '@/api';
import type { PatchNotificationSettingsRequest } from '@/types/notifications/Notification.types';

// 알림 설정 수정 API
const patchNotificationSettings = async (
  patch: PatchNotificationSettingsRequest
): Promise<void> => {
  await authApi.patch('/notifications/settings', patch);
};

export default patchNotificationSettings;
