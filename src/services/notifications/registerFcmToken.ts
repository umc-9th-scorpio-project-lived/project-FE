import { authApi } from '@/api';

export type RegisterFcmTokenRequest = {
  token: string;
};

export type RegisterFcmTokenResult = string;

const registerFcmToken = async (
  token: string
): Promise<RegisterFcmTokenResult> => {
  return await authApi.post('/notifications/token', {
    token,
  } satisfies RegisterFcmTokenRequest);
};

export default registerFcmToken;
