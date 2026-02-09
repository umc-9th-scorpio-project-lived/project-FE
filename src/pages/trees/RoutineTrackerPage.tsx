import DownChevronIcon from '@/icons/DownChevronIcon';
import LeftChevronIcon from '@/icons/LeftChevronIcon';
import MiniGoldenFruitIcon from '@/icons/MiniGoldenFruitIcon';
import MiniGrowingFruitIcon from '@/icons/MiniGrowingFruitIcon';
import MiniNormalFruitIcon from '@/icons/MiniNormalFruitIcon';
import { getTrackersStatistics } from '@/services/statistics/getTrackersStatistics';
import useBaseModal from '@/stores/modals/baseModal';
import type { YearMonth } from '@/types/statistics/Statistics.types';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RoutineTrackerPage = () => {
  const navigate = useNavigate();
  const { openModal } = useBaseModal();

  const [period, setPeriod] = useState<YearMonth>({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });

  const { data, isPending, isError } = useQuery({
    queryKey: [period.year, period.month, 'trackersStatistics'],
    queryFn: () => getTrackersStatistics(period),
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: 1,
  });

  return (
    <div className="bg-gray-50 w-full h-dvh overflow-y-auto flex flex-col items-center gap-6">
      <div className="w-full bg-primary-50 rounded-b-2xl pt-10 pb-5">
        <div className="px-4 py-2 flex justify-center items-center gap-7 relative">
          <button
            onClick={() => navigate('/lived/tree')}
            className="flex justify-center items-center cursor-pointer"
          >
            <LeftChevronIcon className="text-screen-0 w-7 h-7 absolute left-4" />
          </button>

          <div className="typo-h2_bold20 text-screen-0">루틴 트래커</div>
        </div>
      </div>

      <div className="w-full px-4 pb-6 flex flex-col gap-6">
        <div className="w-full flex justify-between items-center">
          <button
            onClick={() => {
              /* 날짜 수정 로직 */
              openModal('setTrackerMonthModal', {
                position: 'bottom',
                props: {
                  initialValue: period,
                  onApply: (value: { year: number; month: number }) => {
                    setPeriod(value);
                  },
                },
              });
            }}
            className="border border-primary-50 rounded-2xl bg-screen-0 px-2.5 py-1.5 flex items-center gap-1"
          >
            <span className="typo-body_reg12 text-gray-900">
              {period.year}년 {period.month}월
            </span>
            <DownChevronIcon className="w-4 h-4 text-primary-50" />
          </button>

          {isPending || isError ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <MiniGoldenFruitIcon className="h-7" />
                <span className="typo-body_reg12 text-gray-900">0개</span>
              </div>

              <div className="flex items-center gap-1">
                <MiniNormalFruitIcon className="h-7" />
                <span className="typo-body_reg12 text-gray-900">0개</span>
              </div>

              <div className="flex items-center gap-1">
                <MiniGrowingFruitIcon className="h-7" />
                <span className="typo-body_reg12 text-gray-900">0개</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <MiniGoldenFruitIcon className="h-7" />
                <span className="typo-body_reg12 text-gray-900">{`${data.fruitSummaryDTO.goldCount}개`}</span>
              </div>

              <div className="flex items-center gap-1">
                <MiniNormalFruitIcon className="h-7" />
                <span className="typo-body_reg12 text-gray-900">{`${data.fruitSummaryDTO.normalCount}개`}</span>
              </div>

              <div className="flex items-center gap-1">
                <MiniGrowingFruitIcon className="h-7" />
                <span className="typo-body_reg12 text-gray-900">{`${data.fruitSummaryDTO.growingCount}개`}</span>
              </div>
            </div>
          )}
        </div>

        {isPending || isError ? (
          <></>
        ) : (
          data.routineTrackers.map((tracker) => (
            <div
              key={tracker.memberRoutineId}
              className="w-full px-4 py-6.5 bg-screen-0 rounded-2xl flex flex-col gap-5.5"
            >
              <div className="typo-body_bold18 text-gray-900">
                {tracker.title}
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <div className="typo-body_reg12 text-gray-900">달성률</div>
                  <div className="typo-body_reg12 text-gray-900">{`${tracker.achievementRate}%`}</div>
                </div>

                <div className="relative w-full">
                  <div className="w-full min-h-2 bg-gray-100 rounded-sm"></div>
                  <div
                    className="absolute top-0 left-0 min-h-2 bg-primary-50 rounded-sm"
                    style={{ width: `${tracker.achievementRate}%` }}
                  ></div>
                </div>
              </div>

              <div className="px-4 py-3 border border-primary-50 rounded-lg">
                <div className="typo-body_reg14 text-gray-900">
                  {tracker.statusMessage}
                </div>
              </div>

              <div className="w-full flex justify-center">
                <div className="px-4 grid grid-cols-8 gap-x-1 gap-y-2 place-items-center">
                  {tracker.days.map((day) => {
                    if (day.status === 'SUCCESS') {
                      return (
                        <div
                          key={day.day}
                          className="w-8 h-8 bg-primary-40 rounded-lg flex items-center justify-center typo-body_reg16 text-screen-0"
                        >
                          {day.day}
                        </div>
                      );
                    } else if (day.status === 'FAIL') {
                      return (
                        <div
                          key={day.day}
                          className="w-8 h-8 bg-primary-10 rounded-lg flex items-center justify-center typo-body_reg16 text-gray-300"
                        >
                          {day.day}
                        </div>
                      );
                    } else if (day.status === 'UNACTIVE') {
                      return (
                        <div
                          key={day.day}
                          className="w-8 h-8 bg-screen-0 rounded-lg flex items-center justify-center typo-body_reg16 text-gray-200"
                        >
                          {day.day}
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RoutineTrackerPage;
