import {
  getMyCommentPostList,
  getMyPostList,
  getMyScrapPostList,
} from '@/services/posts/post';
import type { Post } from '@/types/communities/Post.types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostList from './PostList';

const ProfilePostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('작성한 글');

  const handlePostClick = (post: Post) => {
    navigate(`/lived/community/${post.postId}`);
  };

  const tab = selectedTab;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let res;

        if (tab === '작성한 글') {
          res = await getMyPostList();
        } else if (tab === '댓글단 글') {
          res = await getMyCommentPostList();
        } else {
          res = await getMyScrapPostList();
        }
        setPosts(res.content);
      } catch (e) {
        console.error(e);
      }
    };

    fetchPosts();
  }, [tab]);

  return (
    <div className="flex flex-col justify-between w-full typo-body_reg14">
      <div className="flex">
        <button
          className={`w-full p-2.5 border-b ${selectedTab === '작성한 글' ? 'border-black' : 'border-[#D9D9D9]'}`}
          onClick={() => setSelectedTab('작성한 글')}
        >
          작성한 글
        </button>
        <button
          className={`w-full p-2.5 border-b ${selectedTab === '댓글단 글' ? 'border-black' : 'border-[#D9D9D9]'}`}
          onClick={() => setSelectedTab('댓글단 글')}
        >
          댓글단 글
        </button>
        <button
          className={`w-full p-2.5 border-b ${selectedTab === '저장한 글' ? 'border-black' : 'border-[#D9D9D9]'}`}
          onClick={() => setSelectedTab('저장한 글')}
        >
          저장한 글
        </button>
      </div>
      {posts.length === 0 && tab === '작성한 글' ? (
        <div className="flex flex-col w-full items-center justify-center mt-6 typo-body_reg14 text-gray-900 gap-4">
          <span>아직 작성하신 글이 없어요.</span>
          <span>커뮤니티에 첫 글을 남겨보세요.</span>
        </div>
      ) : posts.length === 0 && tab === '댓글단 글' ? (
        <div className="flex flex-col w-full items-center justify-center mt-6 typo-body_reg14 text-gray-900 gap-4">
          <span>아직 댓글다신 글이 없어요.</span>
          <span>커뮤니티에 첫 댓글을 남겨보세요.</span>
        </div>
      ) : posts.length === 0 && tab === '저장한 글' ? (
        <div className="flex flex-col w-full items-center justify-center mt-6 typo-body_reg14 text-gray-900 gap-4">
          <span>아직 저장하신 글이 없어요.</span>
          <span>나중에 다시 보고 싶은 글, 저장해둘 수 있어요!.</span>
        </div>
      ) : (
        <PostList posts={posts} onPostClick={handlePostClick} />
      )}
    </div>
  );
};

export default ProfilePostList;
