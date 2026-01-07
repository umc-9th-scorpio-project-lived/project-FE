import useBaseModal from "@/stores/modals/baseModal";

const BottomTestModal = () => {
  const { closeModal } = useBaseModal();

  return (
    <div className="bg-white p-6 rounded-t-xl">
      <h2 className="text-lg font-semibold mb-2">하단 모달 테스트</h2>
      <p className="text-sm text-gray-600 mb-4">좌우 여백 없이 하단에 붙어야 합니다.</p>
      <button onClick={closeModal} className="w-full py-3 bg-black text-white rounded-md">
        닫기
      </button>
    </div>
  );
};

export default BottomTestModal;
