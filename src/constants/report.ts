export const REPORT_TARGET_TYPE = ['POST', 'COMMENT'] as const;
export type ReportTargetType = (typeof REPORT_TARGET_TYPE)[number];

export const REPORT_REASON = [
  { id: 0, type: 'ABUSE', content: '욕설, 혐오 표현 사용' },
  { id: 1, type: 'ADULT', content: '음란, 부적절한 콘텐츠' },
  { id: 2, type: 'SPAM', content: '상업성, 홍보성 내용' },
  { id: 3, type: 'JUNK', content: '도배 및 장난성 글' },
  { id: 4, type: 'PRIVACY', content: '개인정보 침해' },
  { id: 5, type: 'COPYRIGHT', content: '저작권 침해' },
  { id: 6, type: 'CRIME', content: '범죄 행위 유도 및 범죄 관련 내용' },
  { id: 7, type: 'OTHER', content: '기타' },
] as const;

export type ReportReason = (typeof REPORT_REASON)[number]['type'];
