import MiniLeftChevronIcon from "@/icons/MiniLeftChevronIcon";
import useBaseModal from "@/stores/modals/baseModal";
import { useNavigate } from "react-router-dom";

const Blocked = () => {
  const navigate = useNavigate();
  const { openModal } = useBaseModal();

  return (
    <div className="w-full h-full flex flex-col gap-5 overflow-y-auto overflow-x-hidden">
      <div className="flex items-center pt-13 px-4 gap-1">
        <button
          onClick={() => navigate("/lived/my")}
          className="flex justify-center items-center cursor-pointer"
        >
          <MiniLeftChevronIcon className="w-5 h-5 text-gray-900" />
        </button>
        <span className="typo-h2_reg20 text-gray-900">차단 목록</span>
      </div>

      {/* <span className="typo-body_bold14 text-gray-700 pl-6.5 py-2.5">차단된 목록이 없습니다.</span> */}

      <div className="w-full p-2.5 flex flex-col gap-2.5">
        <div className="flex justify-between items-center p-2.5">
          <div className="flex items-center gap-3">
            <div className="min-w-11.5 min-h-11.5 rounded-full bg-gray-300"></div>
            <span className="typo-body_bold14 text-gray-900">몬냥이</span>
          </div>

          <button
            onClick={() => openModal("unblockModal", { position: "center" })}
            className="cursor-pointer"
          >
            <span className="typo-body_bold14 text-gray-900">해제</span>
          </button>
        </div>

        <div className="flex justify-between items-center p-2.5 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div className="min-w-11.5 min-h-11.5 rounded-full bg-gray-300"></div>
            <span className="typo-body_bold14 text-gray-900">팬텀</span>
          </div>

          <button
            onClick={() => openModal("unblockModal", { position: "center" })}
            className="cursor-pointer"
          >
            <span className="typo-body_bold14 text-gray-900">해제</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blocked;
