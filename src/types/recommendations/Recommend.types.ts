// AI 루틴 추천 리스트 조회 API 응답
export type AiRecommendItem = {
  routineId: number;
  title: string;
  emoji: string;
  baseRoutineTitle: string;
};

// 카테고리별 전체 추천 루틴 조회 API 카테고리 별 루틴
export type CategoryRecommendRoutine = {
  routineId: number;
  title: string;
  emoji: string;
};

// 카테고리별 전체 추천 루틴 조회 API 카테고리
export type CategoryRecommendCategory = {
  categoryName: string;
  categoryEmoji: string;
  routines: CategoryRecommendRoutine[];
};

// 카테고리별 전체 추천 루틴 조회 API 응답
export type CategoryRecommendResult = {
  categories: CategoryRecommendCategory[];
};

// 추천 루틴 일괄 등록 API 요청
export type RecommendBatchRequest = {
  routinIds: number[];
};
