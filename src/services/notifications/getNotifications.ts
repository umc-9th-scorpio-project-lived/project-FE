import { authApi } from '@/api';
import type { ApiResponse } from '@/types/Api.types';
import type {
  NotificationItem,
  NotificationTarget,
} from '@/types/notifications/Notification.types';

// 알림 목록 조회 API
const getNotifications = (targetType: NotificationTarget) => {
  return authApi.get<ApiResponse<NotificationItem[]>, NotificationItem[]>(
    '/notifications',
    { params: { targetType } }
  );
};

export default getNotifications;
