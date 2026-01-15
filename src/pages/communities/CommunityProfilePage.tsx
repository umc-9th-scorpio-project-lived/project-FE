import CameraIcon from "@/icons/CameraIcon";
import LeftChevronIcon from "@/icons/LeftChevronIcon";
import WriteIcon from "@/icons/WirteIcon";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const CommunityProfilePage = () => {
  const [selectedTab, setSelectedTab] = useState("작성한 글");
  const [editMode, setEditMode] = useState(false);

  const handleEditProfile = () => {
    setEditMode((prev) => !prev);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex justify-between items-center text-gray-900 mx-4 my-2">
        <div className="flex gap-3">
          <NavLink to="/lived/community" className="flex items-center justify-center">
            <LeftChevronIcon className="w-6 h-6 text-gray-900 pt-0.5" />
          </NavLink>
          <span className="typo-h2_reg20">커뮤니티 프로필</span>
        </div>
      </div>
      <div className="flex flex-col border-b border-gray-100 px-4 py-5 gap-[15px]">
        <div className="flex gap-2.5">
          <div className="relative w-20 h-20 rounded-full bg-gray-50">
            {editMode && (
              <div className="flex absolute items-center justify-center w-5 h-5 rounded-full bg-gray-100 bottom-0 right-0 text-gray-600">
                <CameraIcon className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <div className="flex gap-2">
              <div className="flex gap-1">
                {editMode && <WriteIcon className="w-4 h-4 text-gray-700" />}
                <div className="typo-body_bold16">미지근하고 현실적인 전기장판</div>
              </div>
              <div className="text-[12px] text-gray-600">자취 1년차</div>
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
        <button
          className={`p-2 rounded-lg text-center text-body_12 text-gray-900 ${editMode ? "bg-[#E1F2B7]" : "bg-gray-100 "}`}
          onClick={handleEditProfile}
        >
          {editMode ? "프로필 수정 완료" : "프로필 수정"}
        </button>
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
