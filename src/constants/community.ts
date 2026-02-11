export const COMMUNITY_CATEGORIES = {
  ALL: {
    label: '전체',
    code: null,
  },
  SELF_LIFE: {
    label: '자취 일상',
    code: 'SELF_LIFE',
  },
  COUNSEL: {
    label: '고민 상담소',
    code: 'COUNSEL',
  },
  RECOMMEND: {
    label: '추천템',
    code: 'RECOMMEND',
  },
  TIP: {
    label: '자취 꿀팁',
    code: 'TIP',
  },
} as const;

export type CommunityCategoryKey = keyof typeof COMMUNITY_CATEGORIES;

export type CommunityCategoryLabel =
  (typeof COMMUNITY_CATEGORIES)[CommunityCategoryKey]['label'];

export type CommunityCategory = Exclude<
  (typeof COMMUNITY_CATEGORIES)[CommunityCategoryKey]['code'],
  null
>;
