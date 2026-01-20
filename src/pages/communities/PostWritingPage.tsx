import Category from "@/components/communities/Category";
import ImageError from "@/components/communities/ImageError";
import PostWriteFooter from "@/components/communities/PostWriteFooter";
import { COMMUNITY_CATEGORIES } from "@/constants/community";
import LeftChevronIcon from "@/icons/LeftChevronIcon";
import MiniCloseIcon from "@/icons/MiniCloseIcon";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const PostWritingPage = () => {
  const navigate = useNavigate();
  const writeCategories = COMMUNITY_CATEGORIES.filter((category) => category !== "전체");
  const [selectedCategory, setSelectedCategory] = useState("자취 일상");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [ImageLimitError, setImageLimitError] = useState(false);
  const isFormValid = title.trim().length > 0 && content.trim().length > 0;

  useEffect(() => {
    if (!ImageLimitError) return;

    const timer = setTimeout(() => {
      setImageLimitError(false);
    }, 3000); // 3초 후에 사라지게 설정
    return () => clearTimeout(timer);
  }, [ImageLimitError]);

  const handleSubmit = async () => {
    if (!isFormValid) return;

    try {
      navigate("/lived/community");
      // 후에 작성한 내용이 업로드 되도록 코드 수정
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddImages = (files: FileList | null) => {
    if (!files) return;

    const newFile = Array.from(files);
    // 이미 선택된 이미지와 새로 선택한 이미지의 수를 더해서 10을 초과하면 오류 메시지 출력
    if (images.length + newFile.length > 10) {
      setImageLimitError(true);
      return;
    }

    const urls = newFile.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...urls]);
  };

  // 이미지 삭제
  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col min-h-screen pb-24">
      {/*네브바*/}
      <div className="flex justify-between items-center text-gray-900 my-2 mx-4">
        <div className="flex gap-3">
          <NavLink to="/lived/community" className="flex items-center justify-center">
            <LeftChevronIcon className="w-6 h-6 text-gray-900 pt-0.5" />
          </NavLink>
          <span className="typo-h2_bold20 text-gray-900">글쓰기</span>
        </div>
        <button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className={`typo-body_bold14 ${isFormValid ? "text-gray-900" : "text-gray-500"}`}
        >
          완료
        </button>
      </div>
      {/*게시글 입력*/}
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onInput={(e) => {
              const target = e.currentTarget;
              target.style.height = "auto";
              target.style.height = `${target.scrollHeight}px`;
            }}
          />
          <textarea
            className="resize-none overflow-hidden text-[14px] text-gray-900"
            placeholder="자취하며 겪은 이야기, 무엇이든 괜찮아요. 
후기, 팁, 고민까지 자유롭게 남겨주세요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
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
                    <MiniCloseIcon className="w-1/2 h-1/2 text-gray-900" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/*경고문*/}
      <div className="flex flex-col text-[11px] text-[#B4B4B4] pt-4 mx-4">
        <span>
          *주제에 맞지 않는 글이나 커뮤니티 이용정책에 위배되는 글은 <br /> 신고의 대상이 됩니다.
        </span>
        <span>*일정 수 이상의 신고를 받으면 작성한 글이 숨김 및 삭제될 수 있습니다.</span>
      </div>
      <PostWriteFooter AddImage={handleAddImages} />
      {ImageLimitError && <ImageError />}
    </div>
  );
};

export default PostWritingPage;
