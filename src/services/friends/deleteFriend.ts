import { authApi } from '@/api';

export const deleteFriend = async (friendId: number): Promise<string> => {
  return await authApi.delete(`/friends/${friendId}`);
};
