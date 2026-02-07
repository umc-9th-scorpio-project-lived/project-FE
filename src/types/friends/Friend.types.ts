import type { FruitsStatistics } from '../statistics/Statistics.types';

export type FriendFruitsStatistics = {
  friendName: string;
  treeData: FruitsStatistics;
};

export type FriendYearMonth = {
  friendId: number;
  year: number;
  month: number;
};

export type FriendTreeArchiveParams = {
  friendId: number;
  page: number;
  size: number;
};

type Member = {
  memberId: number;
  name: string;
};

export type FriendsData = {
  friendList: Member[];
  totalCount: number;
};
