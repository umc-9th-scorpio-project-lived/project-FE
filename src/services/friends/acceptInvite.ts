import { authApi } from '@/api';
import type { FriendshipData } from '@/types/friends/Friends.types';

export const acceptInvite = async (
  inviterId: number
): Promise<FriendshipData> => {
  return await authApi.post(`/friends/accept/${inviterId}`);
};
