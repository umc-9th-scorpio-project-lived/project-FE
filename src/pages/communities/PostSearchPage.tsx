import SearchList from "@/components/communities/SearchList";
import CloseIcon from "@/icons/CloseIcon";
import LeftChevronIcon from "@/icons/LeftChevronIcon";
import { useState } from "react";
import { NavLink } from "react-router-dom";

type UIState = "default" | "pressed" | "activate";

const PostSearchPage = () => {
  const [searchWord, setSearchWord] = useState("");
  const [state, setState] = useState<UIState>("default");

  return (
    <>
      <div className="border-b-[0.5px] border-gray-400 pt-10">
        {/*네브바*/}
        <div className="flex items-center mx-4 my-3.5 gap-5">
          <div className="flex w-8/9 gap-1.5">
            <NavLink to="/lived/community" className="flex items-center justify-center">
              <LeftChevronIcon className="w-6 h-6 text-gray-900 pt-0.5" />
            </NavLink>
            {state !== "activate" && (
              <input
                className="w-full h-8 bg-gray-100 py-2.5 px-4 rounded-full text-[14px] text-gray-900 outline-none"
                placeholder="생활 팁이나 고민을 검색해보세요."
                value={searchWord}
                onChange={(e) => setSearchWord(e.target.value)}
                onClick={() => setState("pressed")}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setState("activate");
                }}
              />
            )}
            {state === "activate" && (
              <div className="flex items-center w-full h-8 py-2.5 px-4 typo-body_bold16 text-gray-900">
                {searchWord}
              </div>
            )}
          </div>
          <CloseIcon
            className="w-5 h-5 text-gray-900"
            onClick={() => {
              setSearchWord("");
              setState("default");
            }}
          />
        </div>
      </div>
      {state === "default" && <SearchList />}
      {state === "activate" && (
        <div className="p-4">
          {/*일단 2가지 경우 다 뜨게 퍼블리싱. 후에 검색 결과 필터링 기능을 추가 하면 조건부로 실행하게 수정*/}
          <div className="typo-body_reg12 text-gray-600">{searchWord}에 대한 검색 결과입니다.</div>
          <div className="typo-body_reg12 text-gray-600">
            {searchWord}에 대한 검색 결과가 존재하지 않습니다.
          </div>
        </div>
      )}
    </>
  );
};

export default PostSearchPage;
