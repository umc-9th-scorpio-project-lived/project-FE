import useBaseModal from '@/stores/modals/baseModal';
import { useNavigate } from 'react-router-dom';
import logout from '@/services/auths/logout';
import { deleteFcmToken } from '@/services/notifications/deleteFcmToken';
import { getFcmToken } from '@/services/notifications/getFcmToken';

const LogoutModal = () => {
  const { closeModal } = useBaseModal();
  const navigate = useNavigate();

  return (
    <div className="w-fit bg-white rounded-2xl p-5 text-center">
      <div className="typo-body_bold18 text-gray-900 pt-5 pb-10">
        로그아웃 하시겠어요?
      </div>

      <div className="flex justify-center gap-2.5">
        <button
          onClick={closeModal}
          className="w-38 h-14 bg-primary-50 rounded-lg cursor-pointer"
        >
          <span className="text-screen-0 typo-body_bold16">취소</span>
        </button>
        <button
          onClick={async () => {
            try {
              try {
                const fcmToken = await getFcmToken();
                if (fcmToken) {
                  await deleteFcmToken(fcmToken);
                }
              } catch {
                // 실패해도 로그아웃은 진행
              }
              await logout();
            } catch {
              // 로그아웃 API 실패해도 클라이언트 상태는 정리
            } finally {
              localStorage.removeItem('accessToken');
              closeModal();
              navigate('/', { replace: true });
            }
          }}
          className="w-38 h-14 bg-gray-100 rounded-lg"
        >
          <span className="text-gray-400 typo-body_bold16">로그아웃</span>
        </button>
      </div>
    </div>
  );
};

export default LogoutModal;
