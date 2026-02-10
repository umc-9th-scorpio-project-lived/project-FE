export type AlarmTab = 'ROUTINE' | 'COMMUNITY';
export type CommunityCategory = 'ALL' | 'COMMENT';

// 알림 목록 조회 API 쿼리 요청 타입
export type NotificationTarget =
  | 'ROUTINE'
  | 'ROUTINE_ALARM'
  | 'ROUTINE_REPORT'
  | 'ROUTINE_TREE'
  | 'COMMUNITY'
  | 'COMMENT'
  | 'COMMUNITY_HOT'
  | string;

// 알림 목록 조회 API 응답 타입
export type NotificationItem = {
  id: number;
  memberId: number;
  title: string;
  content: string;
  emoji: string;
  target: string;
  targetId: number;
  isRead: boolean;
  createdAt: string;
};

// 알림 설정 조회 result
export type NotificationSettingsResult = {
  allEnabled: boolean;

  routineEnabled: boolean;
  statsEnabled: boolean;

  communityEnabled: boolean;
  hotPostEnabled: boolean;
  commentEnabled: boolean;

  marketingEnabled: boolean;
};

// 알림 설정 수정 request body
export type PatchNotificationSettingsRequest = {
  allEnabled: boolean;

  routineEnabled: boolean;
  statsEnabled: boolean;

  communityEnabled: boolean;
  hotPostEnabled: boolean;
  commentEnabled: boolean;

  marketingEnabled: boolean;
};

// 알림 읽음 처리 API result
export type PatchNotificationResult = string;
