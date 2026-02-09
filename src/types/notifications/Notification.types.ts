export type AlarmTab = 'ROUTINE' | 'COMMUNITY';
export type CommunityCategory = 'ALL' | 'COMMENT';

// 알림 목록 조회 API 쿼리 요청 타입
export type NotificationQueryTarget = 'ROUTINE' | 'COMMUNITY' | 'COMMENT';

// 알림 목록 조회 API 응답 타입
export type NotificationItem = {
  id: number;
  memberId: number;
  title: string;
  content: string;
  target: string;
  targetId: number;
  isRead: boolean;
  createdAt: string;
};
