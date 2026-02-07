import { authApi } from '@/api';
import type { FriendTreeArchiveParams } from '@/types/friends/Friend.types';
import type { TreeArchive } from '@/types/statistics/Statistics.types';

export const getFriendTreeArchive = async (
  friendTreeArchiveParams: FriendTreeArchiveParams
): Promise<TreeArchive> => {
  return await authApi.get(
    `friends/${friendTreeArchiveParams.friendId}}/trees`,
    {
      params: {
        page: friendTreeArchiveParams.page,
        size: friendTreeArchiveParams.size,
      },
    }
  );
};
