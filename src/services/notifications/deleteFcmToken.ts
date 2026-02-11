import { authApi } from '@/api';

export const deleteFcmToken = (token: string) => {
  return authApi.delete('/api/notifications/token', {
    data: { token },
  });
};
