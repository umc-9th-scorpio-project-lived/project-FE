import { authApi } from '@/api';

export const deleteFcmToken = (token: string) => {
  return authApi.delete('/notifications/token', {
    data: { token },
  });
};
