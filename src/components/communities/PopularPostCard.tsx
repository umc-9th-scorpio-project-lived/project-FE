import CommentIcon from '@/icons/CommentIcon';
import LikeIcon from '@/icons/LikeIcon';

interface PopularPostCardProps {
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
  onClick?: () => void;
}

const PopularPostCard = ({
  title,
  content,
  likeCount,
  commentCount,
  onClick,
}: PopularPostCardProps) => {
  const isEmpty = !title && !content;

  return (
    <article
      className="flex w-75 h-25.75 bg-gray-50 rounded-lg shrink-0 px-3 py-2 last:mr-4"
      onClick={onClick}
    >
      {isEmpty ? (
        <div className="flex items-center justify-center w-full h-full">
          <span className="flex typo-body_reg12 text-gray-600">
            실시간 인기글이 아직 등록되지 않았어요.
          </span>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
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
      )}
    </article>
  );
};

export default PopularPostCard;
