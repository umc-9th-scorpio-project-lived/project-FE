import type { ApiResponse } from '../Api.types';

export type FruitType = 'NONE' | 'GROWING' | 'NORMAL' | 'GOLD';

export type Fruit = {
  memberRoutineId: number;
  type: FruitType;
};

type FruitSummary = {
  goldCount: number;
  normalCount: number;
  growingCount: number;
};

export type RoutineTreeResponse = ApiResponse<{
  summary: FruitSummary;
  fruitList: Fruit[];
}>;

export type YearMonth = {
  year: number;
  month: number;
};
