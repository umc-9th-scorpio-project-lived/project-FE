import CheckCircleIcon from "@/icons/CheckCircleIcon";
import useBaseModal from "@/stores/modals/baseModal";

const TreeVisibilityModal = () => {
  const { closeModal } = useBaseModal();

  return (
    <div className="bg-white p-4 rounded-t-xl">
      <div className="w-full py-3 text-center">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">루틴 나무 공개 범위</h2>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3.5">
          <button
            onClick={() => {
              /* 공개 범위 변경 로직 */
            }}
            className="flex gap-2"
          >
            <CheckCircleIcon className="w-6 h-6 text-primary-50" />
            <span className="typo-body_reg16 text-gray-900">친구 공개</span>
          </button>

          <button
            onClick={() => {
              /* 공개 범위 변경 로직 */
            }}
            className="flex gap-2"
          >
            <CheckCircleIcon className="w-6 h-6 text-gray-300" />
            <span className="typo-body_reg16 text-gray-900">일부 공개</span>
          </button>

          <button
            onClick={() => {
              /* 공개 범위 변경 로직 */
            }}
            className="flex gap-2"
          >
            <CheckCircleIcon className="w-6 h-6 text-gray-300" />
            <span className="typo-body_reg16 text-gray-900">나만 보기</span>
          </button>
        </div>

        <button
          onClick={closeModal}
          className="w-full py-3 bg-primary-50 text-white rounded-4xl cursor-pointer"
        >
          수정 완료
        </button>
      </div>
    </div>
  );
};

export default TreeVisibilityModal;
