import Divider from "@/components/users/Divider";
import { NavLink } from "react-router-dom";

const UserPage = () => {
  return (
    <div className="w-full h-full flex flex-col overflow-y-auto overflow-x-hidden">
      <span className="typo-h2_bold20 text-gray-900 pt-13 px-4">마이페이지</span>

      <div className="flex flex-col items-center gap-4 pt-6 pb-4">
        <div className="text-gray-800">
          <span className="typo-body_bold16">홍길동</span>
          <span className="typo-body_reg16">의 루틴나무</span>
        </div>

        <div className="w-23 h-26 bg-gray-400"></div>

        <button className="px-8 py-3 bg-gray-100 text-gray-800 rounded-3xl">
          <span className="typo-body_bold14">루틴나무 변경하기</span>
        </button>
      </div>

      <Divider />

      <div className="w-full px-4 py-5 flex flex-col gap-5">
        <NavLink to="notice" className="w-full flex justify-between items-center">
          <span className="typo-body_bold14 text-gray-900">공지사항</span>
        </NavLink>
        <NavLink to="inquiry" className="w-full flex justify-between items-center">
          <span className="typo-body_bold14 text-gray-900">문의하기</span>
        </NavLink>
        <NavLink to="info" className="w-full flex justify-between items-center">
          <span className="typo-body_bold14 text-gray-900">정보</span>
        </NavLink>
      </div>

      <Divider />

      <div className="w-full px-4 py-5 flex flex-col gap-5">
        <NavLink to="account" className="w-full flex justify-between items-center">
          <span className="typo-body_bold14 text-gray-900">계정 관리</span>
        </NavLink>
        <NavLink to="notifications" className="w-full flex justify-between items-center">
          <span className="typo-body_bold14 text-gray-900">알림 설정</span>
        </NavLink>
        <NavLink to="privacy" className="w-full flex justify-between items-center">
          <span className="typo-body_bold14 text-gray-900">개인정보보호</span>
        </NavLink>
        <div className="w-full flex justify-between items-center">
          <span className="typo-body_bold14 text-gray-900">버전</span>
          <span className="typo-body_bold14 text-gray-400">1.0.0</span>
        </div>
        <button
          onClick={() => {
            /* 로그아웃 로직 */
          }}
          className="w-full flex justify-between items-center"
        >
          <span className="typo-body_bold14 text-gray-900">로그아웃</span>
        </button>
      </div>
    </div>
  );
};

export default UserPage;
