import { authApi } from '@/api';
import type { FriendsData } from '@/types/friends/Friends.types';

export const getFriendsData = async (name?: string): Promise<FriendsData> => {
  return await authApi.get('/friends', { params: { name: name } });
};
