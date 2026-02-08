import { authApi } from '@/api';
import type { WithdrawResult } from '@/types/auths/Auth.types';

const withdraw = async (): Promise<WithdrawResult> => {
  return await authApi.post('/auth/withdraw');
};

export default withdraw;
