import { authApi } from '@/api';
import type {
  DeleteAllSearchResult,
  DeleteSearchResult,
  SearchHistoryResult,
} from '@/types/communities/Search.types';

// 검색어 기록 조회
export const getSearchHistory = (): Promise<SearchHistoryResult> => {
  return authApi.get(`/posts/search/history`);
};

// 검색어 개별 삭제
export const deleteSearch = async (
  historyId: number
): Promise<DeleteSearchResult> => {
  return authApi.delete(`/posts/search/history/${historyId}`);
};

// 검색어 전체 삭제
export const deleteAllSearch = async (): Promise<DeleteAllSearchResult> => {
  return authApi.delete(`/posts/search/history`);
};
