import ClockIcon from "@/icons/ClockIcon";
import CloseIcon from "@/icons/CloseIcon";
import useBaseModal from "@/stores/modals/baseModal";
import { useState } from "react";

const SearchList = () => {
  const { openModal } = useBaseModal();
  const [searches, setSearches] = useState<string[]>(["정수기", "물", "다진 마늘"]);

  const handleClear = () => {
    // 검색어 전체 삭제
    setSearches([]);
  };

  const handleDelete = (index: number) => {
    // 해당 검색어만 삭제
    setSearches((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="flex flex-col gap-2.5 p-2.5">
        <div className="flex px-4 justify-between">
          <span className="typo-body_reg12 text-gray-700">최근 검색</span>
          <span
            className="text-[11px] text-gray-600"
            onClick={() =>
              openModal("searchDeleteModal", { position: "center", onConfirm: handleClear })
            }
          >
            검색어 전체 삭제
          </span>
        </div>
        <div className="flex flex-col gap-5 px-3.5">
          {searches.map((keyword, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <ClockIcon className="w-3 h-3" />
                <span className="typo-body_reg16 text-[#4E4E4E]">{keyword}</span>
              </div>
              <CloseIcon className="w-4 h-4 cursor-pointer" onClick={() => handleDelete(index)} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchList;
