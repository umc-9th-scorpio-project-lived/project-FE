export type SearchHistory = {
  historyId: number;
  keyword: string;
  searchedAt: string;
};

export type SearchHistoryResult = {
  histories: SearchHistory[];
};

export type DeleteSearchResult = {
  historyId: number;
};

export type DeleteAllSearchResult = {
  deletedCount: number;
};
