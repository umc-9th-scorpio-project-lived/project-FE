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
          <div className="relative w-16 h-16 rounded-full bg-gray-50">
            {editMode && (
              <div className="flex absolute items-center justify-center w-5 h-5 rounded-full bg-gray-100 bottom-0 right-0 text-gray-600">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 30 27"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11.667 27.0001H18.333C23.0145 27.0001 25.356 27.0001 27.0375 25.8976C27.7632 25.4223 28.3882 24.8086 28.8765 24.0916C30 22.4416 30 20.1421 30 15.5461C30 10.9501 30 8.65057 28.8765 7.00057C28.3882 6.28356 27.7632 5.66986 27.0375 5.19457C25.9575 4.48507 24.6045 4.23157 22.533 4.14157C21.5445 4.14157 20.694 3.40657 20.5005 2.45407C20.3526 1.75637 19.9684 1.13112 19.4128 0.683996C18.8571 0.236868 18.1642 -0.00471722 17.451 6.97962e-05H12.549C11.067 6.97962e-05 9.7905 1.02757 9.4995 2.45407C9.306 3.40657 8.4555 4.14157 7.467 4.14157C5.397 4.23157 4.044 4.48657 2.9625 5.19457C2.23731 5.67001 1.61291 6.2837 1.125 7.00057C0 8.65057 0 10.9486 0 15.5461C0 20.1436 8.9407e-08 22.4401 1.1235 24.0916C1.6095 24.8056 2.2335 25.4191 2.9625 25.8976C4.644 27.0001 6.9855 27.0001 11.667 27.0001ZM15 9.40957C11.5485 9.40957 8.7495 12.1561 8.7495 15.5446C8.7495 18.9331 11.55 21.6841 15 21.6841C18.45 21.6841 21.2505 18.9361 21.2505 15.5476C21.2505 12.1591 18.45 9.40957 15 9.40957ZM15 11.8636C12.93 11.8636 11.25 13.5121 11.25 15.5461C11.25 17.5786 12.93 19.2271 15 19.2271C17.07 19.2271 18.75 17.5786 18.75 15.5461C18.75 13.5136 17.07 11.8636 15 11.8636ZM22.083 10.6366C22.083 9.95857 22.6425 9.40957 23.334 9.40957H24.999C25.689 9.40957 26.25 9.95857 26.25 10.6366C26.2468 10.9649 26.1135 11.2786 25.8792 11.5086C25.6449 11.7387 25.3289 11.8664 25.0005 11.8636H23.334C23.1713 11.8652 23.0099 11.8347 22.8589 11.7739C22.708 11.7131 22.5705 11.6231 22.4544 11.5092C22.3382 11.3952 22.2456 11.2595 22.1819 11.1098C22.1182 10.9601 22.0846 10.7993 22.083 10.6366Z"
                  />
                </svg>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <div className="flex gap-2">
              <div className="flex gap-1">
                {editMode && (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_1029_5524)">
                      <path
                        d="M18.419 0.980103L15.9612 3.43791L22.5627 10.0395L25.0205 7.58167C26.2901 6.31213 26.2901 4.25549 25.0205 2.98596L23.0198 0.980103C21.7502 -0.289429 19.6936 -0.289429 18.4241 0.980103H18.419ZM14.8135 4.58557L2.97641 16.4278C2.44828 16.9559 2.06234 17.611 1.84906 18.327L0.0514059 24.436C-0.0755473 24.8676 0.0412496 25.3297 0.356093 25.6446C0.670937 25.9594 1.13305 26.0762 1.55961 25.9543L7.66859 24.1567C8.38461 23.9434 9.03969 23.5574 9.56781 23.0293L21.4151 11.1871L14.8135 4.58557Z"
                        fill="#4C5054"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1029_5524">
                        <rect width="26" height="26" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                )}
                <div className="typo-body_bold14">미지근하고 현실적인 전기장판</div>
              </div>
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
