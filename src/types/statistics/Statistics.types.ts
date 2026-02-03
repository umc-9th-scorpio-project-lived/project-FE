export type FruitType = 'NONE' | 'GROWING' | 'NORMAL' | 'GOLD';

export type FruitInfo = {
  memberRoutineId: number;
  type: FruitType;
};

type FruitsSummary = {
  goldCount: number;
  normalCount: number;
  growingCount: number;
};

export type FruitsStatistics = {
  summary: FruitsSummary;
  fruitList: FruitInfo[];
};

export type YearMonth = {
  year: number;
  month: number;
};
