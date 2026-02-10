// 차단된 멤버 1명
export type BlockMember = {
  blockId: number;
  memberId: number;
  nickname: string;
  profileImageUrl: string | null;
};

// 차단 목록 조회 result (cursor pagination)
export type BlockMembersResult = {
  content: BlockMember[];
  hasNext: boolean;
  nextCursor: number | null;
};

// 차단 해제 result
export type UnblockMemberResult = {
  unblockedMemberId: number;
};

// 공지사항 아이템
export type AnnouncementItem = {
  id: number;
  title: string;
  content: string;
  createdAt: string; // ISO string
};

// 공지사항 목록 조회 result
export type AnnouncementListResult = {
  announcementList: AnnouncementItem[];
};

// 내 기본 프로필 정보
export type UserProfileResult = {
  memberId: number;
  name: string;
};

// 루틴나무 공개 범위
export type RoutineTreeVisibility = 'FRIENDS' | 'PARTIAL' | 'PRIVATE';

// 루틴나무 공개 범위 조회 result
export type VisibilityTreeResult = {
  visibility: RoutineTreeVisibility;
  targetMemberIds: number[];
};

// 공개 범위 설정 요청 body
export type PatchVisibilityTreeRequest = {
  visibility: RoutineTreeVisibility;
  targetMemberIds?: number[]; // PARTIAL일 때 필수
};

// 공개 범위 설정 result
export type PatchVisibilityTreeResult = {
  visibility: RoutineTreeVisibility;
  targetMemberIds: number[];
};
