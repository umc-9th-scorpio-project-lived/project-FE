import useBaseModal from "@/stores/modals/baseModal";

const UnblockModal = () => {
  const { closeModal } = useBaseModal();

  return (
    <div className="bg-white rounded-xl p-5 text-center">
      <div className="typo-body_bold18 text-gray-900 pt-5 pb-10">차단을 해제하시겠어요?</div>

      <div className="flex justify-center gap-2.5">
        <button onClick={closeModal} className="w-38 h-14 bg-gray-100 rounded-lg cursor-pointer">
          <span className="text-gray-400 typo-body_bold16">취소</span>
        </button>
        <button
          onClick={() => {
            /* 차단 해제 로직 */
          }}
          className="w-38 h-14 bg-primary-50 rounded-lg"
        >
          <span className="text-gray-50 typo-body_bold16">차단 해제</span>
        </button>
      </div>
    </div>
  );
};

export default UnblockModal;
