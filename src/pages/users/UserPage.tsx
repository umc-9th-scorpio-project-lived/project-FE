import MiniRightChevronIcon from '@/icons/MiniRightChevronIcon';
import MiniRoutineTreeIcon from '@/icons/MiniRoutineTreeIcon';
import { useMemberStore } from '@/stores/members/memberStore';
import useBaseModal from '@/stores/modals/baseModal';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const UserPage = () => {
  const { openModal } = useBaseModal();
  const { fetchUserProfile, userProfile } = useMemberStore();

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  return (
    <div className="w-full h-full flex flex-col gap-4.5 overflow-y-auto overflow-x-hidden pb-25">
      <span className="typo-h2_bold20 text-gray-900 pt-10 px-4">
        마이페이지
      </span>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <div>
            <span className="typo-body_bold16 text-gray-800">
              {userProfile?.name}
            </span>
            <span className="typo-body_reg16 text-gray-800">의 루틴나무</span>
          </div>

          <MiniRoutineTreeIcon className="h-27.5" />

          <button className="px-8 py-3 bg-gray-100 text-gray-800 rounded-3xl">
            <span className="typo-body_bold14 text-gray-800">
              루틴나무 변경하기
            </span>
          </button>
        </div>

        <div>
          <div className="w-full px-4 py-5 border-t-4 border-gray-50 flex flex-col gap-5">
            <NavLink
              to="notice"
              className="w-full flex justify-between items-center"
            >
              <span className="typo-body_bold14 text-gray-900">공지사항</span>
              <MiniRightChevronIcon className="w-6 h-6 text-gray-900" />
            </NavLink>
            <NavLink
              to="inquiry"
              className="w-full flex justify-between items-center"
            >
              <span className="typo-body_bold14 text-gray-900">문의하기</span>
              <MiniRightChevronIcon className="w-6 h-6 text-gray-900" />
            </NavLink>
            <NavLink
              to="info"
              className="w-full flex justify-between items-center"
            >
              <span className="typo-body_bold14 text-gray-900">정보</span>
              <MiniRightChevronIcon className="w-6 h-6 text-gray-900" />
            </NavLink>
          </div>

          <div className="w-full px-4 py-5 border-t-4 border-gray-50 flex flex-col gap-5">
            <NavLink
              to="account"
              className="w-full flex justify-between items-center"
            >
              <span className="typo-body_bold14 text-gray-900">계정 관리</span>
              <MiniRightChevronIcon className="w-6 h-6 text-gray-900" />
            </NavLink>
            <NavLink
              to="notifications"
              className="w-full flex justify-between items-center"
            >
              <span className="typo-body_bold14 text-gray-900">알림 설정</span>
              <MiniRightChevronIcon className="w-6 h-6 text-gray-900" />
            </NavLink>
            <NavLink
              to="privacy"
              className="w-full flex justify-between items-center"
            >
              <span className="typo-body_bold14 text-gray-900">
                개인정보보호
              </span>
              <MiniRightChevronIcon className="w-6 h-6 text-gray-900" />
            </NavLink>
            <div className="w-full flex justify-between items-center">
              <span className="typo-body_bold14 text-gray-900">버전</span>
              <span className="typo-body_bold14 text-gray-400">1.0.0</span>
            </div>
            <button
              onClick={() => openModal('logoutModal', { position: 'center' })}
              className="w-full flex justify-between items-center cursor-pointer"
            >
              <span className="typo-body_bold14 text-gray-900">로그아웃</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
