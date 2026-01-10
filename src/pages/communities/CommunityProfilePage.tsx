import { useState } from "react";
import { NavLink } from "react-router-dom";

const CommunityProfilePage = () => {
  const [selectedTab, setSelectedTab] = useState("작성한 글");

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex justify-between items-center text-gray-900 mx-4 my-2">
        <div className="flex gap-3">
          <NavLink to="/lived/community" className="flex items-center justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 12 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.75 0.75L0.75 10.75L10.75 20.75"
                stroke="#1A1E22"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </NavLink>
          <span className="typo-h2_reg20">커뮤니티 프로필</span>
        </div>
      </div>
      <div className="flex flex-col border-b border-gray-100 px-4 py-5 gap-[15px]">
        <div className="flex gap-2.5">
          <div className="w-20 h-20 rounded-full bg-gray-50"></div>
          <div className="flex flex-col gap-2 justify-center">
            <div className="flex gap-2">
              <div className="typo-body_bold14">미지근하고 현실적인 전기장판</div>
              <div className="text-[11px] text-gray-600">자취 1년차</div>
            </div>
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-[#2E2E2E]"></div>
              <div className="w-8 h-8 rounded-full bg-[#2E2E2E]"></div>
              <div className="w-8 h-8 rounded-full bg-[#2E2E2E]"></div>
              <div className="w-8 h-8 rounded-full bg-[#2E2E2E]"></div>
              <div className="w-8 h-8 rounded-full bg-[#2E2E2E]"></div>
            </div>
          </div>
        </div>
        <div className="p-2 rounded-lg bg-gray-100 text-center text-body_12 text-gray-900">
          프로필 수정
        </div>
      </div>
      <div className="flex justify-between w-full text-[14px]">
        <button
          className={`w-full p-2.5 border-b ${selectedTab === "작성한 글" ? "border-black" : "border-[#D9D9D9]"}`}
          onClick={() => setSelectedTab("작성한 글")}
        >
          작성한 글
        </button>
        <button
          className={`w-full p-2.5 border-b ${selectedTab === "댓글단 글" ? "border-black" : "border-[#D9D9D9]"}`}
          onClick={() => setSelectedTab("댓글단 글")}
        >
          댓글단 글
        </button>
        <button
          className={`w-full p-2.5 border-b ${selectedTab === "저장한 글" ? "border-black" : "border-[#D9D9D9]"}`}
          onClick={() => setSelectedTab("저장한 글")}
        >
          저장한 글
        </button>
      </div>
    </div>
  );
};

export default CommunityProfilePage;
