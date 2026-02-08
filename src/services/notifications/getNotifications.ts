import { authApi } from '@/api';
import type { ApiResponse } from '@/types/Api.types';
import type {
  NotificationItem,
  NotificationQueryTarget,
} from '@/types/notifications/Notification.types';

// 알림 목록 조회 API
const getNotifications = async (targetType: NotificationQueryTarget) => {
  const res = await authApi.get<ApiResponse<NotificationItem[]>>(
    '/notifications',
    {
      params: { targetType },
    }
  );

  return res.data;
};

export default getNotifications;
