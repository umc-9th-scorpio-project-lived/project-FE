import { authApi } from '@/api';
import type {
  FriendFruitsStatistics,
  FriendYearMonth,
} from '@/types/friends/Friends.types';

export const getFriendFruitsStatistics = async (
  friendYearMonth: FriendYearMonth
): Promise<FriendFruitsStatistics> => {
  return await authApi.get(`/friends/${friendYearMonth.friendId}/tree`, {
    params: { year: friendYearMonth.year, month: friendYearMonth.month },
  });
};
