import Category from "@/components/communities/Category";
import PopularPostList from "@/components/communities/PopularPostList";
import PostList from "@/components/communities/PostList";
import WritingButton from "@/components/communities/WritingButton";
import { COMMUNITY_CATEGORIES } from "@/constants/community";
import SearchIcon from "@/icons/SearchIcon";
import { mockPosts } from "@/mocks/post";
import type { Post } from "@/types/Post.types";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const CommunityPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const navigate = useNavigate();

  const handlePostClick = (post: Post) => {
    navigate(`/lived/community/${post.id}`);
  };

  return (
    <div className="flex flex-col px-4 pb-[100px] w-full min-h-screen">
      <div className="flex justify-between items-center">
        <div className="my-2 typo-h2_bold20 text-[#080808]">커뮤니티</div>
        <div className="flex items-center justify-center gap-2">
          <NavLink
            to="/lived/community/search"
            className="w-6 h-6 flex items-center justify-center"
          >
            <SearchIcon className="w-full h-full text-gray-600" />
          </NavLink>
          <div className="w-6 h-6 bg-alarm bg-center" />
          <NavLink
            to={`/lived/community/profile/:userid`}
            className="w-6 h-6 bg-user bg-center"
          ></NavLink>
        </div>
      </div>
      <Category
        categories={[...COMMUNITY_CATEGORIES]}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />
      <section className="my-2 py-1 -mx-4 border-b border-b-gray-100">
        <div className="px-4 typo-body_reg16 text-gray-900">실시간 인기글</div>
        <PopularPostList />
      </section>
      <PostList posts={mockPosts} onPostClick={handlePostClick} />
      <NavLink to="/lived/community/write">
        <WritingButton />
      </NavLink>
    </div>
  );
};

export default CommunityPage;
