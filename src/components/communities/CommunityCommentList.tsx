import CommentIcon from '@/icons/CommentIcon';
import KebabIcon from '@/icons/KebabIcon';
import LikeIcon from '@/icons/LikeIcon';
import { useEffect, useState } from 'react';
import CommunityHamburger from './CommunityHamburger';
import useBaseModal from '@/stores/modals/baseModal';
import type { Comment } from '@/types/communities/Comment.types';
import { formatRelativeTime } from '@/utils/communites/timeUtils';

interface CommentProps {
  comments: Comment[];
  onDeleteComment: (commentId: number) => void;
  onEditRequest: (commentId: number, content: string) => void;
  onReplyRequest: (parentCommentId: number) => void;
  onLikeToggle: (commentId: number) => void;
}

const CommunityCommentList = ({
  comments,
  onDeleteComment,
  onEditRequest,
  onReplyRequest,
  onLikeToggle,
}: CommentProps) => {
  const [openCommentId, setOpenCommentId] = useState<number | null>(null);

  // 모달
  const { isModalOpen } = useBaseModal();
  useEffect(() => {
    if (isModalOpen) {
      setOpenCommentId(null);
    }
  }, [isModalOpen]);

  // 조건 검사
  const getValidReplies = (replies?: (Comment | null)[]) => {
    if (!Array.isArray(replies)) return [];

    return replies.filter((r): r is Comment => r !== null && r.author !== null);
  };

  const safeComments = comments.filter((c): c is Comment => {
    if (!c) return false;

    if (
      c.content === '삭제된 댓글입니다.' &&
      getValidReplies(c.replies).length === 0
    )
      return false;
    return true;
  });

  const sortedComments = [...safeComments].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  const sortedReplies = (replies?: (Comment | null)[]) =>
    replies
      ?.filter((r): r is Comment => r !== null && r.author !== null)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

  if (safeComments.length === 0) {
    return (
      <div className="flex w-full items-center justify-center mt-6 typo-body_reg16 text-gray-400">
        첫 댓글을 남겨주세요.
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col py-4 px-4 gap-8">
        {sortedComments.map((comment) => (
          <div key={comment.commentId} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2.5">
              <div className="gap-1">
                <div className="relative flex w-full justify-between">
                  <div className="flex gap-1.5">
                    <img
                      className="w-13.5 h-13.5 rounded-full bg-gray-500"
                      src={comment?.author.profileImageUrl || undefined}
                    />
                    <div className="flex flex-col gap-1">
                      <span className="typo-body_bold16 text-gray-900">
                        {comment.author
                          ? comment.author.nickname
                          : '알 수 없음'}
                      </span>
                      <span className="text-[11px] text-[#9C9C9C]">
                        {formatRelativeTime(comment.createdAt)}
                      </span>
                    </div>
                  </div>
                  <KebabIcon
                    className="w-6 h-6 text-gray-400"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenCommentId(
                        openCommentId === comment.commentId
                          ? null
                          : comment.commentId
                      );
                    }}
                  />
                  {openCommentId === comment.commentId && !isModalOpen && (
                    <div className="absolute right-0 top-8 z-50">
                      <CommunityHamburger
                        type="comment"
                        commentId={comment.commentId}
                        onDelete={() => onDeleteComment(comment.commentId)}
                        onEdit={() => {
                          onEditRequest(comment.commentId, comment.content);
                          setOpenCommentId(null);
                        }}
                      />
                    </div>
                  )}
                </div>
                <span className="typo-body_reg14 text-gray-900">
                  {comment.content}
                </span>
              </div>
              <div className="flex gap-2.5">
                <div
                  className="flex gap-1"
                  onClick={() => onLikeToggle(comment.commentId)}
                >
                  <LikeIcon
                    className={`w-4 h-4 ${comment.isLiked ? 'text-primary-40' : 'text-gray-200'}`}
                  />
                  <span className="h-4 text-[11px] text-gray-900">
                    {comment.likeCount}
                  </span>
                </div>
                <div className="flex gap-1">
                  <CommentIcon className="w-4 h-4 text-gray-200" />
                  <span
                    className="h-4 text-[11px] text-gray-900"
                    onClick={() => onReplyRequest(comment.commentId)}
                  >
                    댓글달기
                  </span>
                </div>
              </div>
            </div>
            {sortedReplies(comment.replies)?.map((reply) => (
              <div key={reply.commentId} className="flex flex-col pl-5 gap-2.5">
                <div className="gap-1">
                  <div className="flex relative w-full justify-between">
                    <div className="flex gap-1.5">
                      <img
                        className="w-13.5 h-13.5 rounded-full bg-gray-500"
                        src={reply?.author.profileImageUrl || undefined}
                      />
                      <div className="flex flex-col gap-1">
                        <span className="typo-body_bold16 text-gray-900">
                          {reply.author.nickname}
                        </span>
                        <span className="text-[11px] text-[#9C9C9C]">
                          {formatRelativeTime(reply.createdAt)}
                        </span>
                      </div>
                    </div>
                    <KebabIcon
                      className="w-6 h-6 text-gray-400"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenCommentId(
                          openCommentId === reply.commentId
                            ? null
                            : reply.commentId
                        );
                      }}
                    />
                    {openCommentId === reply.commentId && !isModalOpen && (
                      <div className="absolute right-0 top-8 z-50">
                        <CommunityHamburger
                          type="myComment"
                          commentId={reply.commentId}
                          onDelete={() => onDeleteComment(reply.commentId)}
                          onEdit={() => {
                            onEditRequest(reply.commentId, reply.content);
                            setOpenCommentId(null);
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <span className="typo-body_reg14 text-gray-900">
                    {reply.content}
                  </span>
                </div>
                <div className="flex gap-2.5">
                  <div
                    className="flex gap-1"
                    onClick={() => onLikeToggle(reply.commentId)}
                  >
                    <LikeIcon
                      className={`w-4 h-4 ${reply.isLiked ? 'text-primary-40' : 'text-gray-200'}`}
                    />
                    <span className="h-4 text-[11px] text-gray-900">
                      {reply.likeCount}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityCommentList;
