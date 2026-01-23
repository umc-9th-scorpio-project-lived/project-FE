import useBaseModal from "@/stores/modals/baseModal";

const CenterTestModal = () => {
  const { closeModal } = useBaseModal();

  return (
    <div className="bg-white rounded-xl p-6 text-center">
      <h2 className="text-lg font-semibold mb-2">중앙 모달 테스트</h2>
      <p className="text-sm text-gray-600 mb-4">좌우 여백 있고, 화면 중앙에 떠야 합니다.</p>
      <button onClick={closeModal} className="px-4 py-2 bg-black text-white rounded-md">
        닫기
      </button>
    </div>
  );
};

export default CenterTestModal;
