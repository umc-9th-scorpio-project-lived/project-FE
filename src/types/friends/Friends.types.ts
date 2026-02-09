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

type Friend = {
  memberId: number;
  name: string;
};

export type FriendsData = {
  friendList: Friend[];
  totalCount: number;
};

export type InvitationData = {
  inviterId: number;
  inviterName: string;
  invitationUrl: string;
};

export type FriendshipData = {
  friendshipId: number;
  inviterName: string;
  connectedAt: string;
};
