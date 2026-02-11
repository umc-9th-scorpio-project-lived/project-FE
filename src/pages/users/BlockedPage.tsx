import LeftChevronIcon from '@/icons/LeftChevronIcon';
import { useMemberStore } from '@/stores/members/memberStore';
import useBaseModal from '@/stores/modals/baseModal';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BlockedPage = () => {
  const navigate = useNavigate();
  const { openModal } = useBaseModal();

  const { blockedMembers, isLoading, fetchBlockedMembers } = useMemberStore();

  useEffect(() => {
    fetchBlockedMembers(null);
  }, [fetchBlockedMembers]);

  return (
    <div className="w-full h-full flex flex-col gap-5 overflow-y-auto overflow-x-hidden">
      <div className="flex justify-center items-center pt-10 px-4 relative">
        <button
          onClick={() => navigate('/lived/my/privacy')}
          className="flex justify-center items-center absolute left-4 cursor-pointer"
        >
          <LeftChevronIcon className="w-7 h-7 text-gray-900" />
        </button>
        <span className="typo-h2_reg20 text-gray-900">차단 목록</span>
      </div>

      {isLoading ? (
        <span className="typo-body_reg14 text-gray-400 pl-6.5 py-2.5">
          로딩중...
        </span>
      ) : blockedMembers.length === 0 ? (
        <span className="typo-body_bold14 text-gray-700 pl-6.5 py-2.5">
          차단된 목록이 없습니다.
        </span>
      ) : (
        <div className="w-full p-2.5 flex flex-col">
          {blockedMembers.map((m, idx) => (
            <div
              key={m.blockId}
              className={`flex justify-between items-center p-2.5 ${
                idx !== 0 ? 'border-t border-gray-100' : ''
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="min-w-11.5 min-h-11.5 w-11.5 h-11.5 rounded-full bg-gray-300 overflow-hidden">
                  {m.profileImageUrl ? (
                    <img
                      src={m.profileImageUrl}
                      alt={`${m.nickname} 프로필`}
                      className="w-full h-full object-cover"
                    />
                  ) : null}
                </div>

                <span className="typo-body_bold14 text-gray-900 truncate">
                  {m.nickname}
                </span>
              </div>

              <button
                onClick={() =>
                  openModal('unblockModal', {
                    position: 'center',
                    props: {
                      blockedMemberId: m.memberId,
                      nickname: m.nickname,
                    },
                  })
                }
                className="cursor-pointer shrink-0"
              >
                <span className="typo-body_bold14 text-gray-900">해제</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlockedPage;
