import RoutineTree from "@/components/trees/RoutineTree";
import GoldenFruitIcon from "@/icons/GoldenFruitIcon";
import GrowingFruitIcon from "@/icons/GrowingFruitIcon";
import InfoIcon from "@/icons/InfoIcon";
import KebabIcon from "@/icons/KebabIcon";
import LeftChevronIcon from "@/icons/LeftChevronIcon";
import NormalFruitIcon from "@/icons/NormalFruitIcon";
import useBaseModal from "@/stores/modals/baseModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FriendTreePage = () => {
  const navigate = useNavigate();

  const { openModal } = useBaseModal();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <div className="bg-gray-50 w-full h-screen overflow-y-auto">
      <div className="pt-13.5 px-4 flex justify-between items-center relative">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate("/lived/tree")} className="cursor-pointer">
            <LeftChevronIcon className="w-7 h-7 text-gray-900" />
          </button>
          <span className="typo-h2_bold20 text-gray-900">이수민의 루틴나무</span>
        </div>

        <button
          onClick={() => {
            setIsDeleteModalOpen((prev) => !prev);
          }}
          className="cursor-pointer"
        >
          <KebabIcon className="w-7 h-7 text-gray-700" />
        </button>

        <button
          onClick={() => {
            /* 친구 삭제 로직 */
          }}
          className={`absolute right-4 -bottom-12 rounded-sm border border-gray-300 bg-screen-0 px-4 py-2 typo-body_reg12 text-gray-900 ${
            isDeleteModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          친구 삭제하기
        </button>
      </div>

      <div className="pt-6 px-4">
        <div className="flex items-center gap-1.5">
          <span className="typo-body_reg16 text-gray-900">이번 달에 맺힌 열매</span>
          <button
            onClick={() => openModal("fruitInfoModal", { position: "center" })}
            className="cursor-pointer"
          >
            <InfoIcon className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* 열매 개수 계산 로직 필요 */}
      <div className="pt-4 pb-15.5 px-4 flex items-center gap-7.5">
        <div className="flex items-center gap-1.5">
          <GoldenFruitIcon className="w-12.5" />
          <span className="typo-body_bold14 text-gray-900">8개</span>
        </div>

        <div className="flex items-center gap-1.5">
          <NormalFruitIcon className="w-12.5" />
          <span className="typo-body_bold14 text-gray-900">8개</span>
        </div>

        <div className="flex items-center gap-1.5">
          <GrowingFruitIcon className="w-12.5" />
          <span className="typo-body_bold14 text-gray-900">4개</span>
        </div>
      </div>

      <RoutineTree />
    </div>
  );
};

export default FriendTreePage;
