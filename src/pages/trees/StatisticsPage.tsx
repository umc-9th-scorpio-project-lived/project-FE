import { useEffect, useState } from 'react';
import RadialProgress from '@/components/trees/RadialProgress';
import CheckCircleIcon from '@/icons/CheckCircleIcon';
import DownChevronIcon from '@/icons/DownChevronIcon';
import LeftChevronIcon from '@/icons/LeftChevronIcon';
import { useNavigate } from 'react-router-dom';
import useBaseModal from '@/stores/modals/baseModal';
import type { YearMonth } from '@/types/statistics/Statistics.types';

const StatisticsPage = () => {
  const navigate = useNavigate();
  const [isWeekly, setIsWeekly] = useState(true);

  const { openModal } = useBaseModal();

  /** 해당 월의 첫 번째 날이 몇 번째 요일인지 알려주는 함수 */
  const getFirstDayOfMonth = (year: number, month: number): number => {
    return new Date(year, month - 1, 1).getDay();
  };

  /** 해당 월에 며칠까지 있는지 알려주는 함수 */
  const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month, 0).getDate();
  };

  /** 입력한 날이 몇 주차인지 계산해주는 함수 */
  const getWeek = (year: number, month: number, date: number): number => {
    return Math.floor((date + getFirstDayOfMonth(year, month) - 1) / 7 + 1);
  };

  const [weeklyPeriod, setWeeklyPeriod] = useState<{
    month: number;
    week: number;
  }>({
    month: new Date().getMonth() + 1,
    week: getWeek(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      new Date().getDate()
    ),
  });

  // 연/월, 달력 관리 로직
  const [monthlyPeriod, setMonthlyPeriod] = useState<YearMonth>({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });

  const [firstDayOfMonth, setFirstDayOfMonth] = useState(
    getFirstDayOfMonth(new Date().getFullYear(), new Date().getMonth() + 1)
  );

  const [daysInMonth, setDaysInMonth] = useState(
    getDaysInMonth(new Date().getFullYear(), new Date().getMonth() + 1)
  );

  const [calendarDays, setCalendarDays] = useState([
    ...Array(firstDayOfMonth).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]); // 달력 칸 생성을 위한 배열 (빈 칸 + 날짜)

  useEffect(() => {
    setFirstDayOfMonth(
      getFirstDayOfMonth(monthlyPeriod.year, monthlyPeriod.month)
    );

    setDaysInMonth(getDaysInMonth(monthlyPeriod.year, monthlyPeriod.month));
  }, [monthlyPeriod]);

  useEffect(() => {
    setCalendarDays([
      ...Array(firstDayOfMonth).fill(null),
      ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ]);
  }, [firstDayOfMonth, daysInMonth]);

  return (
    <div className="bg-primary-50 h-dvh flex flex-col gap-4 overflow-y-auto overflow-x-hidden">
      <div className="pt-10 flex justify-center items-center relative">
        <button
          onClick={() => navigate('/lived/tree')}
          className="absolute left-4 cursor-pointer"
        >
          <LeftChevronIcon className="w-7 h-7 text-screen-0" />
        </button>

        <span className="typo-h2_bold20 text-screen-0">통계 분석</span>
      </div>

      <div className="flex items-center gap-4 pl-4">
        <button onClick={() => setIsWeekly(true)} className="cursor-pointer">
          <span
            className={`${isWeekly ? 'typo-body_bold16 text-screen-0' : 'typo-body_reg16 text-gray-100'}`}
          >
            주간 통계
          </span>
        </button>
        <button onClick={() => setIsWeekly(false)} className="cursor-pointer">
          <span
            className={`${isWeekly ? 'typo-body_reg16 text-gray-100' : 'typo-body_bold16 text-screen-0'}`}
          >
            월간 통계
          </span>
        </button>
      </div>

      <div className="p-4 flex-1 bg-screen-0 rounded-t-2xl">
        {isWeekly ? (
          <button
            onClick={() => {
              openModal('setStatisticsMonthModal', {
                position: 'bottom',
                props: {
                  initialValue: weeklyPeriod,
                  onApply: (value: { month: number; week: number }) => {
                    setWeeklyPeriod(value);
                  },
                },
              });
            }}
            className="border border-primary-50 rounded-2xl px-2.5 py-1.5 flex items-center gap-1"
          >
            <span className="typo-body_reg12 text-gray-900">
              {weeklyPeriod.month}월 {weeklyPeriod.week}주차
            </span>
            <DownChevronIcon className="w-4 h-4 text-primary-50" />
          </button>
        ) : (
          <button
            onClick={() => {
              openModal('setStatisticsWeekModal', {
                position: 'bottom',
                props: {
                  initialValue: monthlyPeriod,
                  onApply: (value: { year: number; month: number }) => {
                    setMonthlyPeriod(value);
                  },
                },
              });
            }}
            className="border border-primary-50 rounded-2xl px-2.5 py-1.5 flex items-center gap-1"
          >
            <span className="typo-body_reg12 text-gray-900">
              {monthlyPeriod.year}년 {monthlyPeriod.month}월
            </span>
            <DownChevronIcon className="w-4 h-4 text-primary-50" />
          </button>
        )}

        <div className="pt-7 flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <span className="typo-body_reg16 text-gray-900">
              이번 주 루틴이 차근차근 채워지고 있어요! 🏃🏼‍♀
            </span>
            <div className="w-full bg-gray-50 rounded-2xl py-4 flex justify-center items-center gap-6.5">
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-1">
                  <CheckCircleIcon className="w-4 h-4 text-primary-50" />
                  <span className="typo-body_reg14 text-gray-900">
                    루틴 완료율
                  </span>
                </div>

                <span className="typo-h1_bold24 text-[40px] text-gray-900">
                  60%
                </span>
              </div>

              <div>
                <RadialProgress current={12} total={20} />
              </div>
            </div>
          </div>

          {isWeekly ? (
            <div className="w-full flex flex-col gap-4">
              <div className="typo-body_reg16 text-gray-900">
                <div>월요일의 루틴 완료율이 줄어들었어요. 🥲</div>
                <div>루틴을 조정해보는 건 어때요?</div>
              </div>

              <div className="w-full flex justify-between px-1">
                <div className="flex flex-col items-center gap-1">
                  <div className="typo-body_bold14 text-gray-800">일</div>
                  <div className="border-[0.5px] border-gray-100 w-9 h-9 rounded-full bg-[linear-gradient(0deg,theme(--color-primary-50)_0%,transparent_90%)] flex justify-center items-center">
                    <span className="typo-body_reg12 text-gray-800">5</span>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="typo-body_bold14 text-gray-800">월</div>
                  <div className="border-[0.5px] border-gray-100 w-9 h-9 rounded-full bg-[linear-gradient(0deg,theme(--color-primary-50)_0%,transparent_40%)] flex justify-center items-center">
                    <span className="typo-body_reg12 text-gray-800">6</span>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="typo-body_bold14 text-gray-800">화</div>
                  <div className="border-[0.5px] border-gray-100 w-9 h-9 rounded-full bg-[linear-gradient(0deg,theme(--color-primary-50)_0%,transparent_120%)] flex justify-center items-center">
                    <span className="typo-body_reg12 text-gray-800">7</span>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="typo-body_bold14 text-gray-800">수</div>
                  <div className="border-[0.5px] border-gray-100 w-9 h-9 rounded-full bg-[linear-gradient(0deg,theme(--color-primary-50)_0%,transparent_80%)] flex justify-center items-center">
                    <span className="typo-body_reg12 text-gray-800">8</span>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="typo-body_bold14 text-gray-800">목</div>
                  <div className="border-[0.5px] border-gray-100 w-9 h-9 rounded-full bg-[linear-gradient(0deg,theme(--color-primary-50)_0%,transparent_50%)] flex justify-center items-center">
                    <span className="typo-body_reg12 text-gray-800">9</span>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="typo-body_bold14 text-gray-800">금</div>
                  <div className="border-[0.5px] border-gray-100 w-9 h-9 rounded-full bg-[linear-gradient(0deg,theme(--color-primary-50)_0%,transparent_50%)] flex justify-center items-center">
                    <span className="typo-body_reg12 text-gray-800">10</span>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="typo-body_bold14 text-gray-800">토</div>
                  <div className="border-[0.5px] border-gray-100 w-9 h-9 rounded-full bg-[linear-gradient(0deg,theme(--color-primary-50)_0%,transparent_80%)] flex justify-center items-center">
                    <span className="typo-body_reg12 text-gray-800">11</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-col gap-4">
              <div className="typo-body_reg16 text-gray-900">
                이번 달 루틴 달력이에요 🗓️
              </div>

              <div className="w-full flex justify-center">
                <div className="grid grid-cols-7 gap-x-1 place-items-center">
                  <div className="w-10.5 h-10.5 flex justify-center items-center typo-body_bold14 text-gray-900">
                    일
                  </div>
                  <div className="w-10.5 h-10.5 flex justify-center items-center typo-body_bold14 text-gray-900">
                    월
                  </div>
                  <div className="w-10.5 h-10.5 flex justify-center items-center typo-body_bold14 text-gray-900">
                    화
                  </div>
                  <div className="w-10.5 h-10.5 flex justify-center items-center typo-body_bold14 text-gray-900">
                    수
                  </div>
                  <div className="w-10.5 h-10.5 flex justify-center items-center typo-body_bold14 text-gray-900">
                    목
                  </div>
                  <div className="w-10.5 h-10.5 flex justify-center items-center typo-body_bold14 text-gray-900">
                    금
                  </div>
                  <div className="w-10.5 h-10.5 flex justify-center items-center typo-body_bold14 text-gray-900">
                    토
                  </div>
                  {calendarDays.map((day, index) => {
                    if (day === null) {
                      return (
                        <div className="w-10.5 h-10.5" key={`empty-${index}`} />
                      );
                    } else {
                      return (
                        <div
                          key={day}
                          className="w-10.5 h-10.5 rounded-full flex justify-center items-center typo-body_bold14 text-gray-900"
                          style={{
                            background: `linear-gradient(0deg, #9FD416 0%, transparent ${50}%)`, // 완료율에 의한 그래디언트 비율 변경 로직 추가 필요
                          }}
                        >
                          {day}
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-4">
            <div className="typo-body_reg16 text-gray-900">
              성장 중인 대형 열매 2개가 있어요!
            </div>

            <div className="flex gap-4">
              <div className="flex-1 py-4 bg-primary-20 rounded-2xl flex justify-center items-center gap-3">
                <div className="flex flex-col items-center">
                  <div className="typo-body_bold14 text-gray-900">
                    최대 연속일
                  </div>
                  <div className="typo-body_bold14 text-gray-900">
                    200일 달성
                  </div>
                </div>
                <div className="w-14 h-14 rounded-full bg-screen-0 flex flex-col justify-center items-center">
                  <div className="typo-body_bold14 text-gray-900">145</div>
                  <div className="typo-body_reg12 text-gray-700">/200</div>
                </div>
              </div>
              <div className="flex-1 py-4 bg-primary-20 rounded-2xl flex justify-center items-center gap-3">
                <div className="flex flex-col items-center">
                  <div className="typo-body_bold14 text-gray-900">
                    10월에 루틴
                  </div>
                  <div className="typo-body_bold14 text-gray-900">
                    60개 완료
                  </div>
                </div>
                <div className="w-14 h-14 rounded-full bg-screen-0 flex flex-col justify-center items-center">
                  <div className="typo-body_bold14 text-gray-900">12</div>
                  <div className="typo-body_reg12 text-gray-700">/60</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
