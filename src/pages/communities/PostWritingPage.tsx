import Category from "@/components/communities/Category";
import ImageError from "@/components/communities/ImageError";
import PostFooter from "@/components/communities/PostFooter";
import { COMMUNITY_CATEGORIES } from "@/constants/community";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const PostWritingPage = () => {
  const writeCategories = COMMUNITY_CATEGORIES.filter((category) => category !== "전체");
  const [selectedCategory, setSelectedCategory] = useState("자취 일상");
  const [images, setImages] = useState<string[]>([]);
  const [ImageLimitError, setImageLimitError] = useState(false);

  useEffect(() => {
    if (!ImageLimitError) return;

    const timer = setTimeout(() => {
      setImageLimitError(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [ImageLimitError]);

  const handleAddImages = (files: FileList | null) => {
    if (!files) return;

    const newFile = Array.from(files);
    if (images.length + newFile.length > 10) {
      setImageLimitError(true);
      return;
    }

    const urls = newFile.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...urls]);
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col min-h-screen pb-24">
      <div className="flex justify-between items-center text-gray-900 my-2 mx-4">
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
          <span className="typo-h2_reg20">글쓰기</span>
        </div>
        <NavLink to="/lived/community" className="typo-body_bold14">
          완료
        </NavLink>
      </div>
      <div className="flex flex-col py-5 px-4 gap-5.5 border-b border-gray-100">
        <Category
          categories={writeCategories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
        <div className="flex flex-col w-full gap-2.5">
          <textarea
            rows={1}
            className="resize-none overflow-hidden text-[16px] font-bold text-gray-900"
            placeholder="제목을 입력하세요."
            onInput={(e) => {
              const target = e.currentTarget;
              target.style.height = "auto";
              target.style.height = `${target.scrollHeight}px`;
            }}
          />
          <textarea
            className="resize-none overflow-hidden text-[14px] font-bold text-gray-800"
            placeholder="자취하며 겪은 이야기, 무엇이든 괜찮아요. 
후기, 팁, 고민까지 자유롭게 남겨주세요."
            onInput={(e) => {
              const target = e.currentTarget;
              target.style.height = "auto";
              target.style.height = `${target.scrollHeight}px`;
            }}
          />
          {images.length > 0 && (
            <div className="flex pt-4 -mr-4 gap-2.5 overflow-x-auto overflow-y-visible flex-nowrap">
              {images.map((src, index) => (
                <div key={index} className="relative shrink-0">
                  <img
                    src={src}
                    alt={`preview-${index}`}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <button
                    className="absolute -top-2 -right-2 bg-gray-200 text-gray-900 w-5 h-5 rounded-full flex items-center justify-center"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <svg
                      width="8"
                      height="8"
                      viewBox="0 0 8 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.45459 7.72683L4.09095 4.09047M4.09095 4.09047L7.72732 0.454102M4.09095 4.09047L0.45459 0.454102M4.09095 4.09047L7.72732 7.72683"
                        stroke="#1A1E22"
                        stroke-width="0.909091"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col text-[11px] text-[#B4B4B4] pt-4 mx-4">
        <span>
          *주제에 맞지 않는 글이나 커뮤니티 이용정책에 위배되는 글은 <br /> 신고의 대상이 됩니다.
        </span>
        <span>*일정 수 이상의 신고를 받으면 작성한 글이 숨김 및 삭제될 수 있습니다.</span>
      </div>
      <PostFooter AddImage={handleAddImages} />
      {ImageLimitError && <ImageError />}
    </div>
  );
};

export default PostWritingPage;
