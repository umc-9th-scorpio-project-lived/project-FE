import { authApi } from '@/api';
import type { ApiResponse } from '@/types/Api.types';
import type { PatchNotificationResult } from '@/types/notifications/Notification.types';

// 알림 읽음 처리 API
const patchNotification = async (
  notificationId: number
): Promise<PatchNotificationResult> => {
  return await authApi.patch<
    ApiResponse<PatchNotificationResult>,
    PatchNotificationResult
  >(`/notifications/${notificationId}/read`);
};

export default patchNotification;
