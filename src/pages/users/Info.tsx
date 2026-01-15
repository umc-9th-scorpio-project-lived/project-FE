import { NavLink } from "react-router-dom";

const Info = () => {
  return (
    <div className="w-full h-full flex flex-col gap-5.5 overflow-y-auto overflow-x-hidden">
      {/* 뒤로가기 버튼(<) */}
      <div className="flex justify-center typo-h2_reg20 text-gray-900 pt-13 px-4">정보</div>

      <div className="w-full px-4 flex flex-col gap-5">
        <NavLink to="#" className="w-full flex justify-between items-center">
          <span className="typo-body_bold14 text-gray-900">이용약관</span>
          {/* > 아이콘 */}
        </NavLink>
        <NavLink to="#" className="w-full flex justify-between items-center">
          <span className="typo-body_bold14 text-gray-900">개인정보정책</span>
          {/* > 아이콘 */}
        </NavLink>
      </div>
    </div>
  );
};

export default Info;
