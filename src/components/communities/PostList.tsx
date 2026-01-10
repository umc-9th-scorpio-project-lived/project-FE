import type { Post } from "@/types/Post.types";
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
    <div>
      {posts.map((post) => (
        <PostCard
          key={post.id}
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
