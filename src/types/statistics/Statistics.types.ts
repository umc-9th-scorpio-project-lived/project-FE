export type FruitType = 'NONE' | 'GROWING' | 'NORMAL' | 'GOLD';

export type Fruit = {
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
  fruitList: Fruit[];
};

export type RoutineAchievement = {
  title: string;
  achievementRate: number;
  memberId: number;
  year: number;
  month: number;
  memberRoutineId: number;
};

export type YearMonth = {
  year: number;
  month: number;
};

export type RoutineYearMonth = {
  memberRoutineId: number;
  year: number;
  month: number;
};

type DailyRoutineStatus = {
  day: number;
  status: 'SUCCESS' | 'FAIL' | 'UNACTIVE';
};

type RoutineTracker = {
  memberRoutineId: number;
  title: string;
  achievementRate: number;
  statusMessage: string;
  days: DailyRoutineStatus[];
};

export type TrackersStatistics = {
  fruitSummaryDTO: FruitsSummary;
  routineTrackers: RoutineTracker[];
  year: number;
  month: number;
};
