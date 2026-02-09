import { authApi } from '@/api';
import type { ReissueResult } from '@/types/auths/Auth.types';
import { AxiosHeaders } from 'axios';

const reissue = async (): Promise<ReissueResult> => {
  return await authApi.post('/auth/reissue', undefined, {
    headers: new AxiosHeaders({}),
  });
};

export default reissue;
