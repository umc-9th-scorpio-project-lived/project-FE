export const COMMUNITY_CATEGORIES_LABEL = [
  "전체",
  "자취 일상",
  "고민 상담소",
  "추천템",
  "자취 꿀팁",
] as const;

export const COMMUNITY_CATEGORIES = ["SELF_LIFE", "COUNSEL", "RECOMMEND", "TIP"] as const;

export type CommunityCategoryLabel = (typeof COMMUNITY_CATEGORIES_LABEL)[number];
export type CommunityCategory = (typeof COMMUNITY_CATEGORIES)[number];
