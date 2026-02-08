import Category from '@/components/communities/Category';
import PopularPostList from '@/components/communities/PopularPostList';
import PostList from '@/components/communities/PostList';
import WritingButton from '@/components/communities/WritingButton';
import {
  COMMUNITY_CATEGORIES,
  type CommunityCategory,
  type CommunityCategoryLabel,
} from '@/constants/community';
import SearchIcon from '@/icons/SearchIcon';
import { getPostList } from '@/services/posts/post';
import type { Post } from '@/types/communities/Post.types';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const CommunityPage = () => {
  // 카테고리 상태
  const categories: CommunityCategoryLabel[] = Object.values(
    COMMUNITY_CATEGORIES
  ).map((c) => c.label);
  const [selectedCategory, setSelectedCategory] =
    useState<CommunityCategoryLabel>('전체');
  const getCategoryCodeByLabel = (
    label: CommunityCategoryLabel
  ): CommunityCategory | undefined => {
    const found = Object.values(COMMUNITY_CATEGORIES).find(
      (c) => c.label === label
    );
    return found?.code ?? undefined;
  };

  // 게시글 상태
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  const handlePostClick = (post: Post) => {
    navigate(`/lived/community/${post.postId}`);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const categoryCode = getCategoryCodeByLabel(selectedCategory);

        const res = await getPostList({
          category: categoryCode,
        });

        setPosts(res.content);
      } catch (e) {
        console.error(e);
      }
    };

    fetchPosts();
  }, [selectedCategory]);

  return (
    <div className="flex flex-col pb-25 w-full min-h-screen pt-10">
      {/*네브바*/}
      <div className="flex justify-between items-center px-4">
        <div className="my-2 typo-h2_bold20 text-gray-900">커뮤니티</div>
        <div className="flex items-center justify-center gap-2">
          <NavLink
            to="/lived/community/search"
            className="w-6 h-6 flex items-center justify-center"
          >
            <SearchIcon className="w-full h-full text-gray-600" />
          </NavLink>
          <div className="w-6 h-6 bg-alarm bg-center" />
          <NavLink
            to={`/lived/community/profile`}
            className="w-6 h-6 bg-user bg-center"
          ></NavLink>
        </div>
      </div>
      <Category
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />
      {/*인기글 게시글*/}
      <section className="my-2 py-1 border-b border-b-gray-100">
        <div className="px-4 typo-body_reg16 text-gray-900">실시간 인기글</div>
        <PopularPostList />
      </section>
      {/*게시글*/}
      {posts.length === 0 ? (
        <div className="flex w-full items-center justify-center mt-6 typo-body_reg16 text-gray-400">
          등록된 게시글이 없습니다.
        </div>
      ) : (
        <PostList posts={posts} onPostClick={handlePostClick} />
      )}
      <NavLink to="/lived/community/write">
        <WritingButton />
      </NavLink>
    </div>
  );
};

export default CommunityPage;
