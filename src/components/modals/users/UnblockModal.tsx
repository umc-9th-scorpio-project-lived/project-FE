import { useMemberStore } from '@/stores/members/memberStore';
import useBaseModal from '@/stores/modals/baseModal';

type UnblockModalProps = {
  blockedMemberId: number;
  nickname?: string;
};

const UnblockModal = () => {
  const { closeModal, modalProps } = useBaseModal();
  const { unblock } = useMemberStore();

  const props = modalProps as UnblockModalProps | undefined;

  const handleUnblockMember = async () => {
    if (!props?.blockedMemberId) return;

    try {
      await unblock(props.blockedMemberId);
    } finally {
      closeModal();
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 text-center">
      <div className="typo-body_bold18 text-gray-900 pt-5 pb-10">
        차단을 해제하시겠어요?
      </div>

      <div className="flex justify-center gap-2.5">
        <button
          onClick={closeModal}
          className="w-38 h-14 bg-gray-100 rounded-lg cursor-pointer"
        >
          <span className="text-gray-400 typo-body_bold16">취소</span>
        </button>
        <button
          onClick={handleUnblockMember}
          className="w-38 h-14 bg-primary-50 rounded-lg"
        >
          <span className="text-screen-0 typo-body_bold16">차단 해제</span>
        </button>
      </div>
    </div>
  );
};

export default UnblockModal;
