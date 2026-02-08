interface RadialProgressProps {
  current: number;
  total: number;
}

const RadialProgress = ({ current, total }: RadialProgressProps) => {
  const radius = 70;
  const circumference = 2 * Math.PI * radius; // 전체 원 둘레

  // 원의 75%만 트랙으로 사용
  const gaugeRatio = 0.75;
  const totalTrackLength = circumference * gaugeRatio;

  // 입력된 값의 비율 계산
  const progressRatio =
    total === 0 ? 0 : Math.min(Math.max(current / total, 0), 1);

  // 전체 둘레에서 (실제 게이지 길이 * 진행률) 만큼을 뺀 값이 offset이 된다.
  const strokeDashoffset = circumference - totalTrackLength * progressRatio;

  return (
    <div className="relative flex items-center justify-center w-42 h-42">
      {/* 배경 원 (디자인상의 연두색 원) */}
      <div className="absolute w-29 h-29 rounded-full bg-primary-20" />

      <svg className="absolute transform -rotate-225 w-37.5 h-37.5 overflow-visible">
        {/* Gray Track: 배경이 되는 회색 바 */}
        <circle
          cx="75"
          cy="75"
          r={radius}
          strokeWidth="14.84"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - totalTrackLength}
          strokeLinecap="round"
          className="stroke-gray-200"
        />
        {/* Active Track: 진행률이 표시되는 연두색 바 */}
        <circle
          cx="75"
          cy="75"
          r={radius}
          strokeWidth="14.84"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="stroke-primary-50"
        />
      </svg>

      {/* 텍스트 영역 */}
      <div className="relative flex flex-col items-center justify-center gap-1">
        <span className="typo-h2_reg20 text-gray-900">{current}</span>
        <div className="w-9 h-0 border-t border-gray-200" />
        <span className="typo-body_bold14 text-gray-700">{total}</span>
      </div>
    </div>
  );
};

export default RadialProgress;
