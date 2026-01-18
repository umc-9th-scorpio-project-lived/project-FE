import useBaseModal from "@/stores/modals/baseModal";

const LogoutModal = () => {
  const { closeModal } = useBaseModal();

  return (
    <div className="bg-white rounded-xl p-5 text-center">
      <h2 className="text-lg font-semibold text-gray-900 pt-5 pb-10">로그아웃 하시겠어요?</h2>
      <div className="flex justify-center gap-2.5">
        <button onClick={closeModal} className="w-38 h-14 bg-primary-50 rounded-lg cursor-pointer">
          <span className="text-gray-50 typo-body_bold16">취소</span>
        </button>
        <button
          onClick={() => {
            /* 로그아웃 로직 */
          }}
          className="w-38 h-14 bg-gray-50 rounded-lg"
        >
          <span className="text-gray-500 typo-body_bold16">로그아웃</span>
        </button>
      </div>
    </div>
  );
};

export default LogoutModal;
