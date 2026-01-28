import LeftChevronIcon from "@/icons/LeftChevronIcon";
import MiniRightChevronIcon from "@/icons/MiniRightChevronIcon";
import useBaseModal from "@/stores/modals/baseModal";
import { useNavigate } from "react-router-dom";

const PrivacyPage = () => {
  const navigate = useNavigate();
  const { openModal } = useBaseModal();

  return (
    <div className="w-full h-full flex flex-col gap-7 overflow-y-auto overflow-x-hidden">
      <div className="flex justify-center items-center pt-10 px-4 relative">
        <button
          onClick={() => navigate("/lived/my")}
          className="flex justify-center items-center absolute left-4 cursor-pointer"
        >
          <LeftChevronIcon className="w-7 h-7 text-gray-900" />
        </button>
        <span className="typo-h2_reg20 text-gray-900">개인정보보호</span>
      </div>

      <div className="w-full flex flex-col gap-9 px-4">
        <div className="flex flex-col gap-1">
          <span className="typo-body_reg16 text-gray-900">차단</span>

          <div className="flex flex-col gap-2.5">
            <button
              onClick={() => navigate("blocked")}
              className="flex justify-between items-center cursor-pointer"
            >
              <span className="typo-body_bold14 text-gray-900">차단 목록</span>
              <MiniRightChevronIcon className="w-6 h-6 text-gray-900" />
            </button>

            <span className="typo-body_reg12 text-gray-300">
              차단된 사용자는 차단한 사용자의 컨텐츠를 볼 수 없고, 좋아요, 댓글을 보낼 수 없습니다.
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="typo-body_reg16 text-gray-900">루틴 나무</span>

          <div className="flex flex-col gap-2.5">
            <button
              onClick={() => openModal("treeVisibilityModal", { position: "bottom" })}
              className="flex justify-between items-center cursor-pointer"
            >
              <span className="typo-body_bold14 text-gray-900">루틴 나무 공개 범위</span>
              <div className="flex items-center gap-3">
                <span className="typo-body_bold14 text-gray-700">일부 공개</span>
                <MiniRightChevronIcon className="w-6 h-6 text-gray-900" />
              </div>
            </button>

            <span className="typo-body_reg12 text-gray-300">
              내 루틴 나무를 공개하는 대상 범위를 설정할 수 있습니다.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
