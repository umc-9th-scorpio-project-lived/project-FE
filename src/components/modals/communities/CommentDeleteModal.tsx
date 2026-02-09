import useBaseModal from '@/stores/modals/baseModal';

const CommentDeleteModal = () => {
  const { closeModal, options } = useBaseModal();

  const handleDelete = async () => {
    await options?.onConfirm?.();
    closeModal();
  };

  return (
    <div className="flex flex-col w-full bg-screen-0 rounded-2xl text-center">
      <div className="flex flex-col px-12 pt-9 pb-3 gap-2.5">
        <span className="typo-body_bold18 text-[#080808]">
          작성하신 댓글을 삭제할까요?
        </span>
        <span className="typo-body_reg14 text-[#080808]">
          해당 작업은 되돌릴 수 없어요.
        </span>
      </div>
      <div className="flex items-center justify-center p-5 gap-2.5">
        <button
          onClick={closeModal}
          className="w-1/2 px-5 py-3 bg-gray-100 text-gray-400 rounded-lg text-[16px] font-bold"
        >
          취소
        </button>
        <button
          onClick={handleDelete}
          className="w-1/2 px-5 py-3 bg-primary-50 text-screen-0 rounded-lg text-[16px] font-bold"
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default CommentDeleteModal;
