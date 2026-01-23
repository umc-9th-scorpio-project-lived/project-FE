import CloseIcon from "@/icons/CloseIcon";
import MiniGoldenFruitIcon from "@/icons/MiniGoldenFruitIcon";
import MiniGrowingFruitIcon from "@/icons/MiniGrowingFruitIcon";
import MiniNormalFruitIcon from "@/icons/MiniNormalFruitIcon";
import useBaseModal from "@/stores/modals/baseModal";

const FruitInfoModal = () => {
  const { closeModal } = useBaseModal();

  return (
    <div className="bg-gray-50 rounded-2xl py-6 px-7 flex justify-between items-center relative">
      <button onClick={closeModal} className="absolute top-2.5 right-2.5 cursor-pointer">
        <CloseIcon className="w-2.5 h-2.5 text-gray-900" />
      </button>

      <div className="flex flex-col items-center gap-1">
        <span className="typo-body_bold12 text-gray-900">황금 열매</span>
        <MiniGoldenFruitIcon className="w-6.5" />
        <span className="typo-body_reg12 text-gray-900">달성률 90% 이상</span>
      </div>

      <div className="flex flex-col items-center gap-1">
        <span className="typo-body_bold12 text-gray-900">열매</span>
        <MiniNormalFruitIcon className="w-6.5" />
        <span className="typo-body_reg12 text-gray-900">달성률 60% 이상</span>
      </div>

      <div className="flex flex-col items-center gap-1">
        <span className="typo-body_bold12 text-gray-900">성장 중</span>
        <MiniGrowingFruitIcon className="w-6.5" />
        <span className="typo-body_reg12 text-gray-900">달성률 30% 이상</span>
      </div>
    </div>
  );
};

export default FruitInfoModal;
