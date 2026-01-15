import ClockIcon from "@/icons/ClockIcon";
import MiniCloseIcon from "@/icons/MiniCloseIcon";

const SearchList = () => {
  return (
    <>
      <div className="flex flex-col gap-2.5 p-2.5">
        <div className="flex px-4 justify-between">
          <span className="typo-body_reg12 text-gray-700">최근 검색</span>
          <span className="text-[11px] text-gray-600">검색어 전체 삭제</span>
        </div>
        <div className="flex flex-col gap-5 px-3.5">
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <ClockIcon className="w-3 h-3" />
              <span className="typo-body_reg16 text-[#4E4E4E]">정수기</span>
            </div>
            <MiniCloseIcon className="w-4 h-4" />
          </div>
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <ClockIcon className="w-3 h-3" />
              <span className="typo-body_reg16 text-[#4E4E4E]">물</span>
            </div>
            <MiniCloseIcon className="w-4 h-4" />
          </div>
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <ClockIcon className="w-3 h-3" />
              <span className="typo-body_reg16 text-[#4E4E4E]">다진 마늘</span>
            </div>
            <MiniCloseIcon className="w-4 h-4" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchList;
