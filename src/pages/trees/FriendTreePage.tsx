import RoutineTree from '@/components/trees/RoutineTree';
import GoldenFruitIcon from '@/icons/GoldenFruitIcon';
import GrowingFruitIcon from '@/icons/GrowingFruitIcon';
import InfoIcon from '@/icons/InfoIcon';
import KebabIcon from '@/icons/KebabIcon';
import LeftChevronIcon from '@/icons/LeftChevronIcon';
import NormalFruitIcon from '@/icons/NormalFruitIcon';
import { deleteFriend } from '@/services/friends/deleteFriend';
import { getFriendFruitsStatistics } from '@/services/friends/getFriendFruitsStatistics';
import useBaseModal from '@/stores/modals/baseModal';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const FriendTreePage = () => {
  const { friendId } = useParams();

  const { data, isPending, isError } = useQuery({
    queryKey: [friendId, 'friendFruitsStatistics'],
    queryFn: () =>
      getFriendFruitsStatistics({
        friendId: Number(friendId),
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
      }),
  });

  const navigate = useNavigate();

  const { openModal } = useBaseModal();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  if (isPending || isError) {
    return <div className="bg-gray-50 w-full h-screen"></div>;
  }

  return (
    // 늘어난 루틴나무 아이콘 아래 여백을 위해 pb-4 추가
    <div className="bg-gray-50 w-full h-screen overflow-y-auto pb-4">
      <div className="pt-10 px-4 flex justify-between items-center relative">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/lived/tree')}
            className="cursor-pointer"
          >
            <LeftChevronIcon className="w-7 h-7 text-gray-900" />
          </button>
          <span className="typo-h2_bold20 text-gray-900">
            {data.friendName}의 루틴나무
          </span>
        </div>

        <button
          onClick={() => {
            setIsDeleteModalOpen((prev) => !prev);
          }}
          className="cursor-pointer"
        >
          <KebabIcon className="w-7 h-7 text-gray-700" />
        </button>

        <button
          onClick={() => {
            deleteFriend(Number(friendId));
          }}
          className={`absolute right-4 -bottom-10 rounded-sm border-[0.5px] border-gray-300 bg-screen-0 px-4 py-2 flex justify-center items-center ${
            isDeleteModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <span className="typo-body_reg12 text-gray-900">친구 삭제하기</span>
        </button>
      </div>

      <div className="pt-6 px-4">
        <div className="flex items-center gap-1.5">
          <span className="typo-body_reg16 text-gray-900">
            이번 달에 맺힌 열매
          </span>
          <button
            onClick={() => openModal('fruitInfoModal', { position: 'center' })}
            className="cursor-pointer"
          >
            <InfoIcon className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="pt-4 pb-15.5 px-4 flex items-center gap-5">
        <div className="flex items-center gap-2">
          <GoldenFruitIcon className="w-12.5" />
          <span className="typo-body_bold14 text-gray-900">
            {data.treeData.summary.goldCount}개
          </span>
        </div>

        <div className="flex items-center gap-2">
          <NormalFruitIcon className="w-12.5" />
          <span className="typo-body_bold14 text-gray-900">
            {data.treeData.summary.normalCount}개
          </span>
        </div>

        <div className="flex items-center gap-2">
          <GrowingFruitIcon className="w-12.5" />
          <span className="typo-body_bold14 text-gray-900">
            {data.treeData.summary.growingCount}개
          </span>
        </div>
      </div>

      <RoutineTree isFruitClickable={false} fruitsData={data.treeData} />
    </div>
  );
};

export default FriendTreePage;
