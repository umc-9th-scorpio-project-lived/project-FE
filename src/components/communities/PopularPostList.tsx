import { useEffect, useState } from 'react';
import PopularPostCard from './PopularPostCard';
import { getPopularPostList } from '@/services/posts/post';
import type { PopularPost } from '@/types/communities/PopularPost';
import { useNavigate } from 'react-router-dom';

const PopularPostList = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState<PopularPost[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const res = await getPopularPostList();
      setPosts(res.content);
    };
    fetch();
  }, []);

  if (posts.length === 0) return null;

  return (
    <div className="flex py-3 px-4 overflow-x-auto gap-5 flex-nowrap -mr-4">
      {posts.map((post) => (
        <PopularPostCard
          key={post.postId}
          title={post.title}
          content={post.content}
          likeCount={post.likeCount}
          commentCount={post.commentCount}
          onClick={() => navigate(`/lived/community/${post.postId}`)}
        />
      ))}
    </div>
  );
};

export default PopularPostList;
