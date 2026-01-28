import MiniCloseIcon from "@/icons/MiniCloseIcon";
import RightChevronIcon from "@/icons/RightChevronIcon";
import useBaseModal from "@/stores/modals/baseModal";
import { useNavigate } from "react-router-dom";

// TODO: 제목, 달성률 props로 전달받기
const FruitModal = () => {
  const { closeModal } = useBaseModal();

  const navigate = useNavigate();

  return (
    <div className="bg-screen-0 rounded-2xl pt-6.5 px-4 pb-7 flex flex-col gap-5.5 relative">
      <button onClick={closeModal} className="absolute top-3 right-3 cursor-pointer">
        <MiniCloseIcon className="w-2.5 h-2.5 text-gray-900" />
      </button>

      <span className="typo-body_bold18 text-gray-900">정해진 시간에 일어나기</span>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <div className="typo-body_reg12 text-gray-900">달성률</div>
          <div className="typo-body_reg12 text-gray-900">90%</div>
        </div>

        <div className="relative w-full">
          <div className="w-full min-h-2 bg-gray-100 rounded-sm"></div>
          <div className="absolute top-0 left-0 w-9/10 min-h-2 bg-primary-50 rounded-sm"></div>
        </div>
      </div>

      <button
        onClick={() => {
          closeModal();
          navigate("/lived/tree/tracker");
        }}
        className="px-3.5 py-3 w-full bg-primary-20 rounded-lg flex justify-between items-center cursor-pointer"
      >
        <div className="typo-body_reg14">🏃🏼‍♀ 루틴 트래커 확인하기</div>
        <RightChevronIcon className="w-4.5 h-4.5" />
      </button>
    </div>
  );
};

export default FruitModal;
