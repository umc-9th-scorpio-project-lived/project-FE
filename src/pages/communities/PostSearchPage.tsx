import SearchList from "@/components/communities/SearchList";
import CloseIcon from "@/icons/CloseIcon";
import LeftChevronIcon from "@/icons/LeftChevronIcon";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const PostSearchPage = () => {
  const [searchWord, setSearchWord] = useState("");

  return (
    <>
      <div className="border-b border-gray-400">
        <div className="flex items-center mx-4 my-2 gap-5">
          <div className="flex w-8/9 gap-1.5">
            <NavLink to="/lived/community" className="flex items-center justify-center">
              <LeftChevronIcon className="w-6 h-6 text-gray-900 pt-0.5" />
            </NavLink>
            <input
              className="w-full h-8 bg-gray-100 py-2.5 px-4 rounded-full typo-body_bold14 text-gray-900"
              placeholder="생활 팁이나 고민을 검색해보세요."
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
            />
          </div>
          <CloseIcon className="w-5 h-5 text-gray-900" />
        </div>
      </div>
      <SearchList />
    </>
  );
};

export default PostSearchPage;
