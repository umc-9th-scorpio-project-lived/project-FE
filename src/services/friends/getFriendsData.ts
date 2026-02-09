import { authApi } from '@/api';
import type { FriendsData } from '@/types/friends/Friend.types';

export const getFriendsData = async (name?: string): Promise<FriendsData> => {
  return await authApi.get('/friends', { params: { name: name } });
};
