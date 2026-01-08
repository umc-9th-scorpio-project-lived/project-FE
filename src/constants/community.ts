export const COMMUNITY_CATEGORIES = [
  "전체",
  "자취 일상",
  "추천템",
  "고민 상담소",
  "자취 꿀팁",
] as const;

export type CommunityCategory = (typeof COMMUNITY_CATEGORIES)[number];
