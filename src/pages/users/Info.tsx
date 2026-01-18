import MiniLeftChevronIcon from "@/icons/MiniLeftChevronIcon";
import MiniRightChevronIcon from "@/icons/MiniRightChevronIcon";
import { NavLink, useNavigate } from "react-router-dom";

const Info = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex flex-col gap-5.5 overflow-y-auto overflow-x-hidden">
      <div className="flex justify-center items-center pt-13 px-4 relative">
        <button
          onClick={() => navigate("/lived/my")}
          className="flex justify-center items-center absolute left-4 cursor-pointer"
        >
          <MiniLeftChevronIcon className="w-5 h-5 text-gray-900" />
        </button>
        <span className="typo-h2_reg20 text-gray-900">정보</span>
      </div>

      <div className="w-full px-4 flex flex-col gap-5">
        <NavLink to="#" className="w-full flex justify-between items-center">
          <span className="typo-body_bold14 text-gray-900">이용약관</span>
          <MiniRightChevronIcon className="w-6 h-6 text-gray-900" />
        </NavLink>
        <NavLink to="#" className="w-full flex justify-between items-center">
          <span className="typo-body_bold14 text-gray-900">개인정보정책</span>
          <MiniRightChevronIcon className="w-6 h-6 text-gray-900" />
        </NavLink>
      </div>
    </div>
  );
};

export default Info;
