import useBaseModal from "@/stores/modals/baseModal";

const SearchDeleteModal = () => {
  const { closeModal, options } = useBaseModal();

  const handleDelete = () => {
    options?.onConfirm?.();
    closeModal();
  };

  return (
    <div className="flex flex-col bg-screen-0 rounded-xl p-6 text-center">
      <span className="typo-body_reg14 text-gray-800 mb-1">검색어를 정말 삭제할까요?</span>
      <span className="typo-body_reg14 text-gray-800 mb-2">해당 작업은 되돌릴 수 없습니다.</span>
      <div className="flex items-center justify-center gap-4">
        <button onClick={closeModal} className="w-3/7 px-4 py-2 bg-black text-white rounded-xl">
          취소
        </button>
        <button onClick={handleDelete} className="w-3/7 px-4 py-2 bg-black text-white rounded-xl">
          삭제
        </button>
      </div>
    </div>
  );
};

export default SearchDeleteModal;
