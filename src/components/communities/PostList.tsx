import type { Post } from "@/types/communities/Post.types";
import PostCard from "./PostCard";

type PostListProps = {
  posts: Post[];
  cardOptions?: {
    showCategory?: boolean;
    showStates?: boolean;
  };
  onPostClick?: (post: Post) => void;
};

const PostList = ({ posts, cardOptions, onPostClick }: PostListProps) => {
  return (
    <div className="flex flex-col px-4 gap-6 pt-2.5">
      {posts.map((post) => (
        <PostCard
          key={post.postId}
          post={post}
          showCategory={cardOptions?.showCategory}
          showStates={cardOptions?.showStates}
          onClick={onPostClick}
        />
      ))}
    </div>
  );
};

export default PostList;
