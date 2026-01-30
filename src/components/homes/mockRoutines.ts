export type RoutineMock = {
  routineId: null;
  customTitle: string;
  isAlarmOn: boolean;
  alarmTime: string; // "HH:mm:ss"
  repeatType: "DAILY" | "WEEKLY" | "MONTHLY";
  repeatValue: string; // "EVERYDAY" | "MON_WED_FRI" ... 등
  startDate: string; // "YYYY-MM-DD"
  customIcon: string;
};

export type RecommendRoutineItem = {
  id: string;
  title: string;
  /** 카드에 찍을 이모지 (타이틀에 포함해도 되는데 분리해두면 UI 제어가 쉬움) */
  emoji?: string;
  /** AI 탭의 보조 설명 */
  subText?: string;
};

export type RecommendCategory = {
  id: string;
  title: string; // "생활 습관"
  emoji: string; // "🛏️"
  routines: RecommendRoutineItem[];
};

export const MOCK_ROUTINES: RoutineMock[] = [
  {
    routineId: null,
    customTitle: "일어나자마자 이불 정리하기",
    isAlarmOn: false,
    alarmTime: "00:00:00",
    repeatType: "DAILY",
    repeatValue: "EVERYDAY",
    startDate: "2026-01-10",
    customIcon: "🛏️",
  },
  {
    routineId: null,
    customTitle: "독서 20분",
    isAlarmOn: true,
    alarmTime: "22:00:00",
    repeatType: "DAILY",
    repeatValue: "EVERYDAY",
    startDate: "2026-01-10",
    customIcon: "📚",
  },
  {
    routineId: null,
    customTitle: "운동 30분",
    isAlarmOn: true,
    alarmTime: "19:00:00",
    repeatType: "WEEKLY",
    repeatValue: "MON_WED_FRI",
    startDate: "2026-01-10",
    customIcon: "💪",
  },
  {
    routineId: null,
    customTitle: "하루 계획 3줄 쓰기",
    isAlarmOn: true,
    alarmTime: "08:40:00",
    repeatType: "DAILY",
    repeatValue: "EVERYDAY",
    startDate: "2026-01-10",
    customIcon: "✍️",
  },
  {
    routineId: null,
    customTitle: "집중 타이머 25분",
    isAlarmOn: false,
    alarmTime: "00:00:00",
    repeatType: "DAILY",
    repeatValue: "EVERYDAY",
    startDate: "2026-01-10",
    customIcon: "⏰",
  },
  {
    routineId: null,
    customTitle: "세수 + 스킨케어",
    isAlarmOn: true,
    alarmTime: "07:10:00",
    repeatType: "DAILY",
    repeatValue: "EVERYDAY",
    startDate: "2026-01-10",
    customIcon: "🧴",
  },
  {
    routineId: null,
    customTitle: "방 환기 5분",
    isAlarmOn: true,
    alarmTime: "11:00:00",
    repeatType: "DAILY",
    repeatValue: "EVERYDAY",
    startDate: "2026-01-10",
    customIcon: "🌬️",
  },
  {
    routineId: null,
    customTitle: "커피는 점심 이후 금지",
    isAlarmOn: false,
    alarmTime: "00:00:00",
    repeatType: "DAILY",
    repeatValue: "EVERYDAY",
    startDate: "2026-01-10",
    customIcon: "☕️",
  },
  {
    routineId: null,
    customTitle: "저녁 설거지",
    isAlarmOn: true,
    alarmTime: "20:30:00",
    repeatType: "DAILY",
    repeatValue: "EVERYDAY",
    startDate: "2026-01-10",
    customIcon: "🍽️",
  },
  {
    routineId: null,
    customTitle: "냉장고 정리 10분",
    isAlarmOn: false,
    alarmTime: "00:00:00",
    repeatType: "WEEKLY",
    repeatValue: "SUN",
    startDate: "2026-01-10",
    customIcon: "🧊",
  },
  {
    routineId: null,
    customTitle: "쓰레기 분리수거",
    isAlarmOn: true,
    alarmTime: "21:00:00",
    repeatType: "WEEKLY",
    repeatValue: "TUE_THU",
    startDate: "2026-01-10",
    customIcon: "🗑️",
  },
];

export const AI_RECOMMENDS: RecommendRoutineItem[] = [
  {
    id: "ai:clear-table-after-meal",
    emoji: "🥄",
    title: "밥 먹고 테이블 바로 치우기",
    subText: "'일어나자마자 이불 정리하기' 루틴과 함께해요",
  },
  {
    id: "ai:ventilate-room",
    emoji: "🪟",
    title: "일어나자마자 창문열어 환기하기",
    subText: "'일어나자마자 이불 정리하기' 루틴과 함께해요",
  },
  {
    id: "ai:warm-water",
    emoji: "💧",
    title: "일어나서 따뜻한 물 한 잔 마시기",
    subText: "'일어나자마자 이불 정리하기' 루틴과 함께해요",
  },
];

export const CATEGORY_RECOMMENDS: RecommendCategory[] = [
  {
    id: "cat:lifestyle",
    title: "생활 습관",
    emoji: "🛏️",
    routines: [
      { id: "cat:lifestyle:wake-up-fixed-time", title: "정해진 시간에 일어나기" },
      { id: "cat:lifestyle:sleep-8h", title: "8시간 이상 수면하기" },
      { id: "cat:lifestyle:ventilate-once", title: "하루 한 번 방 환기하기" },
      { id: "cat:lifestyle:make-bed", title: "일어나자마자 이불 정리하기" },
      { id: "cat:lifestyle:align-shoes", title: "신발 가지런히 두기" },
      { id: "cat:lifestyle:write-account-book", title: "가계부 작성하기" },
      { id: "cat:lifestyle:monthly-spending-plan", title: "한달 소비 계획 하기" },
      { id: "cat:lifestyle:morning-stretch-3m", title: "3분 아침 스트레칭" },
      { id: "cat:lifestyle:no-clothes-on-bed", title: "침대 위 옷 쌓지 않기" },
    ],
  },
  {
    id: "cat:cleaning",
    title: "청소",
    emoji: "🧹",
    routines: [
      { id: "cat:cleaning:laundry", title: "옷 세탁하기" },
      { id: "cat:cleaning:wash-dishes-right-away", title: "밥 먹고 바로 설거지하기" },
      { id: "cat:cleaning:fold-laundry", title: "빨래 개기" },
      { id: "cat:cleaning:desk-organize", title: "책상 정리하기" },
      { id: "cat:cleaning:trash-3", title: "눈에 보이는 쓰레기 3개 버리기" },
      { id: "cat:cleaning:music-cleaning", title: "좋아하는 노래 틀고 청소하기" },
      { id: "cat:cleaning:mirror", title: "화장실 거울 닦기" },
      { id: "cat:cleaning:10m-everyday", title: "하루에 10분씩 매일 청소 하기" },
      { id: "cat:cleaning:take-out-trash-when-full", title: "쓰레기 봉투 차면 바로 내놓기" },
    ],
  },
  {
    id: "cat:health",
    title: "건강",
    emoji: "💊",
    routines: [
      { id: "cat:health:water-1l", title: "물 1L 마시기" },
      { id: "cat:health:stretch-before-sleep", title: "잠들기 전 스트레칭 하기" },
      { id: "cat:health:walk-10m", title: "가벼운 산책 10분 하기" },
      { id: "cat:health:stairs", title: "계단 이용하기" },
      { id: "cat:health:eye-rest", title: "눈 휴식하기" },
      { id: "cat:health:exercise-30m", title: "30분 이상 운동 하기" },
      { id: "cat:health:supplements", title: "영양제 챙기기" },
      { id: "cat:health:not-lie-down-after-meal", title: "밥 먹고 바로 눕지 않기" },
    ],
  },
  {
    id: "cat:eating",
    title: "식습관",
    emoji: "🍽️",
    routines: [
      { id: "cat:eating:cook-one-meal", title: "하루 한 끼 직접 챙겨먹기" },
      { id: "cat:eating:fruit-after-meal", title: "식후 과일 즐기기" },
      { id: "cat:eating:coffee-1", title: "하루에 커피 1잔만 마시기" },
      { id: "cat:eating:light-breakfast", title: "가벼운 아침 챙겨먹기" },
      { id: "cat:eating:fridge-3-throw", title: "냉장고 안에서 버릴 것 3개 찾기" },
      { id: "cat:eating:macro-balance", title: "탄단지 비율 맞춰 식사하기" },
      { id: "cat:eating:enjoy-20m", title: "식사 20분이상 즐기기" },
    ],
  },
  {
    id: "cat:mind",
    title: "마음 돌보기",
    emoji: "🧘",
    routines: [
      { id: "cat:mind:shopping-for-me", title: "나를 위한 쇼핑하기" },
      { id: "cat:mind:meditation", title: "명상하기" },
      { id: "cat:mind:gratitude-journal", title: "감사일기 작성하기" },
      { id: "cat:mind:discard-one-thought", title: "오늘 버릴 생각 하나 고르기" },
      { id: "cat:mind:one-line-praise", title: "오늘 한 줄 칭찬하기" },
      { id: "cat:mind:call-family", title: "가족들에게 안부 전화하기" },
      { id: "cat:mind:digital-detox", title: "디지털 디톡스하기" },
    ],
  },
];
