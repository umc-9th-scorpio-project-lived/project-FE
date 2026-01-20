import CommentIcon from "@/icons/CommentIcon";
import LikeIcon from "@/icons/LikeIcon";

interface PopularPostCardProps {
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

const PopularPostCard = ({ title, content, likeCount, commentCount }: PopularPostCardProps) => {
  return (
    <article className="flex w-[300px] bg-gray-50 rounded-xl shrink-0 p-3 last:mr-4">
      <div className="flex flex-col gap-2">
        <span className="typo-body_reg14 text-gray-900">{title}</span>
        <span className="typo-body_reg12 text-gray-600 line-clamp-2 whitespace-pre-line">
          {content}
        </span>
        <div className="flex text-[11px] text-gray-900 gap-2">
          <div className="flex gap-1">
            <LikeIcon className="w-4 h-4 text-primary-40" />
            <p>{likeCount}</p>
          </div>
          <div className="flex gap-1">
            <CommentIcon className="w-4 h-4 text-primary-40" />
            <p>{commentCount}</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PopularPostCard;
