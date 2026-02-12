import RoutineTree from '@/components/trees/RoutineTree';
import GoldenFruitIcon from '@/icons/GoldenFruitIcon';
import GrowingFruitIcon from '@/icons/GrowingFruitIcon';
import InfoIcon from '@/icons/InfoIcon';
import LeftChevronIcon from '@/icons/LeftChevronIcon';
import NormalFruitIcon from '@/icons/NormalFruitIcon';
import { getFruitsStatistics } from '@/services/statistics/getFruitsStatistics';
import useBaseModal from '@/stores/modals/baseModal';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const ArchivedTreePage = () => {
  /* 루틴나무 페이지용 body 배경색 */
  useEffect(() => {
    document.body.classList.add('tree-page-body');
    return () => {
      document.body.classList.remove('tree-page-body');
    };
  }, []);

  const [searchParams] = useSearchParams();
  const year = searchParams.get('year');
  const month = searchParams.get('month');

  const { data, isPending, isError } = useQuery({
    queryKey: [year, month, 'fruitsStatistics'],
    queryFn: () =>
      getFruitsStatistics({ year: Number(year), month: Number(month) }),
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: 1,
  });

  const navigate = useNavigate();

  const { openModal } = useBaseModal();

  return (
    // 늘어난 루틴나무 아이콘 아래 여백을 위해 pb-4 추가
    <div className="bg-gray-50 w-full h-screen overflow-y-auto pb-4">
      <div className="pt-10 px-4 flex items-center gap-2">
        <button
          onClick={() => navigate('/lived/tree/archive')}
          className="cursor-pointer"
        >
          <LeftChevronIcon className="w-7 h-7 text-gray-900" />
        </button>

        <span className="typo-h2_bold20 text-gray-900">
          {year}.{month}의 루틴나무
        </span>
      </div>

      <div className="pt-6 px-4">
        <div className="flex items-center gap-1.5">
          <span className="typo-body_reg16 text-gray-900">
            이 달에 맺힌 열매
          </span>
          <button
            onClick={() => openModal('fruitInfoModal', { position: 'center' })}
            className="cursor-pointer"
          >
            <InfoIcon className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {isPending || isError ? (
        <div className="pt-4 pb-15.5 px-4 flex items-center gap-5">
          <div className="flex items-center gap-2">
            <GoldenFruitIcon className="w-12.5" />
            <span className="typo-body_bold14 text-gray-900">0개</span>
          </div>

          <div className="flex items-center gap-2">
            <NormalFruitIcon className="w-12.5" />
            <span className="typo-body_bold14 text-gray-900">0개</span>
          </div>

          <div className="flex items-center gap-2">
            <GrowingFruitIcon className="w-12.5" />
            <span className="typo-body_bold14 text-gray-900">0개</span>
          </div>
        </div>
      ) : (
        <div className="pt-4 pb-15.5 px-4 flex items-center gap-5">
          <div className="flex items-center gap-2">
            <GoldenFruitIcon className="w-12.5" />
            <span className="typo-body_bold14 text-gray-900">{`${data?.summary.goldCount}개`}</span>
          </div>

          <div className="flex items-center gap-2">
            <NormalFruitIcon className="w-12.5" />
            <span className="typo-body_bold14 text-gray-900">{`${data?.summary.normalCount}개`}</span>
          </div>

          <div className="flex items-center gap-2">
            <GrowingFruitIcon className="w-12.5" />
            <span className="typo-body_bold14 text-gray-900">{`${data?.summary.growingCount}개`}</span>
          </div>
        </div>
      )}

      {isPending || isError ? (
        <RoutineTree isFruitClickable={false} />
      ) : (
        <RoutineTree isFruitClickable={true} fruitsData={data} />
      )}
    </div>
  );
};

export default ArchivedTreePage;
