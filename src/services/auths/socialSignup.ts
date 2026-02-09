import { authApi } from '@/api';
import type { SignupRequest, SignupResult } from '@/types/auths/Auth.types';

const signup = async (body: SignupRequest): Promise<SignupResult> => {
  return await authApi.post('/auth/signup', body);
};

export default signup;
