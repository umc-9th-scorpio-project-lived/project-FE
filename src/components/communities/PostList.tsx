import type { Post } from '@/types/communities/Post.types';
import PostCard from './PostCard';

type PostListProps = {
  posts: Post[];
  onPostClick?: (post: Post) => void;
};

const PostList = ({ posts, onPostClick }: PostListProps) => {
  return (
    <div className="flex flex-col px-4 gap-6 pt-2.5">
      {posts.map((post) => (
        <PostCard key={post.postId} post={post} onClick={onPostClick} />
      ))}
    </div>
  );
};

export default PostList;
