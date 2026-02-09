import { authApi } from '@/api';
import type { InvitationData } from '@/types/friends/Friend.types';

export const getInvitationData = async (): Promise<InvitationData> => {
  return await authApi.get('/friends/invite');
};
