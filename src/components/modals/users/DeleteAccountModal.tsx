import useBaseModal from '@/stores/modals/baseModal';
import withdraw from '@/services/auths/withdraw';
import { useNavigate } from 'react-router-dom';

const DeleteAccountModal = () => {
  const { closeModal } = useBaseModal();
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl text-center">
      <div className="px-7 pt-7 pb-3.5 flex flex-col gap-2.5">
        <div className="typo-body_bold18 text-gray-900">
          계정을 영구적으로 삭제하시겠어요?
        </div>

        <div>
          <div className="typo-body_reg14 text-gray-900">
            탈퇴 버튼 선택 시, 계정은 삭제되며 복구가 불가능합니다.
          </div>
          <div className="typo-body_reg14 text-gray-900">
            정말로 탈퇴하시겠어요?
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-2.5 p-5">
        <button
          onClick={closeModal}
          className="w-38 h-14 bg-gray-100 rounded-lg cursor-pointer"
        >
          <span className="text-gray-400 typo-body_bold16">계속 사용하기</span>
        </button>

        <button
          onClick={async () => {
            try {
              await withdraw();
            } catch (e) {
              // 401/500 등이어도 아래 finally에서 동일 처리
            } finally {
              localStorage.removeItem('accessToken');
              closeModal();
              navigate('/', { replace: true });
            }
          }}
          className="w-38 h-14 bg-primary-50 rounded-lg"
        >
          <span className="text-screen-0 typo-body_bold16">네 탈퇴할게요</span>
        </button>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
