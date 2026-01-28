import LeftChevronIcon from "@/icons/LeftChevronIcon";
import useBaseModal from "@/stores/modals/baseModal";
import { useNavigate } from "react-router-dom";

const AccountPage = () => {
  const navigate = useNavigate();

  const { openModal } = useBaseModal();

  return (
    <div className="w-full h-full flex flex-col gap-5.5 overflow-y-auto overflow-x-hidden">
      <div className="flex justify-center items-center pt-10 px-4 relative">
        <button
          onClick={() => navigate("/lived/my")}
          className="flex justify-center items-center absolute left-4 cursor-pointer"
        >
          <LeftChevronIcon className="w-7 h-7 text-gray-900" />
        </button>
        <span className="typo-h2_reg20 text-gray-900">계정 관리</span>
      </div>

      <div className="py-5 px-4 flex flex-col gap-11">
        <div className="flex flex-col gap-5">
          <div className="w-full flex justify-between items-center">
            <span className="typo-body_bold14 text-gray-900">계정</span>
            <span className="typo-body_bold14 text-gray-400">example@example.com</span>
          </div>

          <div className="w-full flex justify-between items-center">
            <span className="typo-body_bold14 text-gray-900">루틴 시작일</span>
            <span className="typo-body_bold14 text-gray-400">2025.09.02</span>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <button
            onClick={() => openModal("logoutModal", { position: "center" })}
            className="w-full flex justify-between items-center cursor-pointer"
          >
            <span className="typo-body_bold14 text-gray-900">로그아웃</span>
          </button>

          <button
            onClick={() => openModal("deleteAccountModal", { position: "center" })}
            className="w-full flex justify-between items-center cursor-pointer"
          >
            <span className="typo-body_bold14 text-alert-50">계정 삭제</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
