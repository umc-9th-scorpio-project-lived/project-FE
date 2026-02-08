import { authApi } from '@/api';
import type { LogoutResult } from '@/types/auths/Auth.types';

const logout = async (): Promise<LogoutResult> => {
  return await authApi.post('/auth/logout');
};

export default logout;
