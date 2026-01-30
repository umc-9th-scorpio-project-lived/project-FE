import CommentIcon from "@/icons/CommentIcon";
import LikeIcon from "@/icons/LikeIcon";
import type { Post } from "@/types/communities/Post.types";

interface PostCardProps {
  post: Post;
  showCategory?: boolean;
  showStates?: boolean;
  onClick?: (post: Post) => void;
}

const PostCard = ({ post, showCategory = true, showStates = true, onClick }: PostCardProps) => {
  const { categoryLabel, title, content, imageCount, likeCount, commentCount, createdAt } = post;
  const hasImage = imageCount > 0;

  return (
    <section
      className="flex flex-col py-2.5 border-b border-gray-100 gap-2.5 overflow-auto"
      onClick={() => onClick?.(post)}
    >
      {showCategory && (
        <div className="flex items-center bg-primary-20 rounded-sm px-2.5 w-fit h-6 typo-body_reg12 text-gray-600">
          {categoryLabel}
        </div>
      )}
      <div className="flex justify-between gap-1.5">
        <article className="flex flex-col gap-1.5">
          <div className="text-gray-900 typo-body_bold14 line-clamp-1">{title}</div>
          <div className="typo-body_reg12 text-gray-600 line-clamp-2 whitespace-pre-line">
            {content}
          </div>
        </article>
        {hasImage && (
          <div className="relative w-16 h-16 bg-gray-400 rounded-lg shrink-0">
            <p className="absolute text-center w-4 h-4 bg-gray-100 rounded-tl-lg text-[10px] right-0 bottom-0">
              {imageCount}
            </p>
          </div>
          /// 나중에 이미지 삽입
        )}
      </div>
      {showStates && (
        <div className="flex text-[11px] justify-between">
          <div className="flex gap-2 text-gray-900">
            <div className="flex gap-1">
              <LikeIcon className="w-4 h-4 text-primary-40" />
              <p>{likeCount}</p>
            </div>
            <div className="flex gap-1">
              <CommentIcon className="w-4 h-4 text-primary-40" />
              <p>{commentCount}</p>
            </div>
          </div>
          <div className="text-gray-300">{createdAt}</div>
        </div>
      )}
    </section>
  );
};

export default PostCard;
