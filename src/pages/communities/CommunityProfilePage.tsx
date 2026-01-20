import CameraIcon from "@/icons/CameraIcon";
import LeftChevronIcon from "@/icons/LeftChevronIcon";
import WriteIcon from "@/icons/WirteIcon";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

const CommunityProfilePage = () => {
  const [selectedTab, setSelectedTab] = useState("작성한 글");
  const [editMode, setEditMode] = useState(false);
  const [communityName, setCommunityName] = useState("미지근하고 현실적 전기");
  const [image, setImage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);
  const ImageInputRef = useRef<HTMLInputElement>(null);

  const handleSvgClick = () => {
    ImageInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return null;

    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
  };

  const handleEditProfile = () => {
    setEditMode((prev) => !prev);
  };

  const resizeWidth = () => {
    if (!inputRef.current || !spanRef.current) return;

    spanRef.current.textContent = communityName || inputRef.current.value;
    inputRef.current.style.width = `${spanRef.current.offsetWidth}px`;
  };

  useEffect(() => {
    resizeWidth();
  }, [communityName, editMode]);

  return (
    <div className="flex flex-col min-h-screen">
      {/*네브바*/}
      <div className="flex justify-between items-center text-gray-900 mx-4 my-2">
        <div className="flex gap-3">
          <NavLink to="/lived/community" className="flex items-center justify-center">
            <LeftChevronIcon className="w-6 h-6 text-gray-900 pt-0.5" />
          </NavLink>
          <span className="typo-h2_bold20">커뮤니티 프로필</span>
        </div>
      </div>
      {/*프로필창*/}
      <div className="flex flex-col border-b border-gray-100 px-4 py-5 gap-[15px]">
        <div className="flex gap-2.5">
          <div
            className="relative w-20 h-20 rounded-full bg-gray-50 bg-no-repeat bg-center bg-cover"
            style={{ backgroundImage: image ? `url(${image})` : undefined }}
          >
            {editMode && (
              <button
                className="flex absolute items-center justify-center w-5 h-5 rounded-full bg-gray-200 top-0 right-0"
                onClick={handleSvgClick}
              >
                <CameraIcon className="w-3.5 h-3.5 text-gray-600" />
                <input
                  type="file"
                  accept="image/*"
                  ref={ImageInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
              </button>
            )}
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <div className="flex gap-2 items-center">
              <div className="flex gap-1">
                {editMode ? ( // 여기 editMode시에 닉네임 수정하는 곳과 옆쪽 자취년차 사이가 약간 뜸. 수정 완료 버튼을 누르면 문제 없긴함
                  <div className="flex items-center gap-1">
                    <WriteIcon className="w-4 h-4 text-gray-700" />
                    <div className="relative inline-block">
                      <input
                        ref={inputRef}
                        className="font-bold"
                        maxLength={12}
                        value={communityName}
                        onChange={(e) => setCommunityName(e.target.value)}
                        style={{
                          minWidth: "40px",
                          boxSizing: "content-box",
                        }}
                      />
                      <span
                        ref={spanRef}
                        className="typo-body_bold16"
                        style={{ position: "absolute", visibility: "hidden", whiteSpace: "pre" }}
                      ></span>
                    </div>
                  </div>
                ) : (
                  <div className="typo-body_bold16">{communityName}</div>
                )}
              </div>
              <div className="text-[12px] text-gray-600">자취 1년차</div>
            </div>
            {/*대형열매 5개*/}
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
          className={`p-2 rounded-lg text-center text-body_12 text-gray-900 ${editMode ? "bg-primary-30" : "bg-gray-100 "}`}
          onClick={handleEditProfile}
        >
          {editMode ? "프로필 수정 완료" : "프로필 수정"}
        </button>
      </div>
      {/*게시글 구분. 후에 게시글 구분하며 컴포넌트로 뺄지도*/}
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
