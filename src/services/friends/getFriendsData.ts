import { authApi } from '@/api';
import type { FriendsData } from '@/types/friends/Friend.types';

export const getFriendsData = async (): Promise<FriendsData> => {
  return await authApi.get('/friends');
};
