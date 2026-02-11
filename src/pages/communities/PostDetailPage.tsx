import CommunityCommentList from '@/components/communities/CommunityCommentList';
import CommunityHamburger from '@/components/communities/CommunityHamburger';
import PostFooter from '@/components/communities/PostFooter';
import BookmarkIcon from '@/icons/BookmarkIcon';
import CloseIcon from '@/icons/CloseIcon';
import CommentIcon from '@/icons/CommentIcon';
import KebabIcon from '@/icons/KebabIcon';
import LeftChevronIcon from '@/icons/LeftChevronIcon';
import LikeIcon from '@/icons/LikeIcon';
import RightChevronIcon from '@/icons/RightChevronIcon';
import {
  commentLike,
  createComment,
  deleteComment,
  editComment,
  getCommentList,
} from '@/services/posts/comment';
import {
  deletePost,
  getPostDetail,
  postLike,
  postScrap,
} from '@/services/posts/post';
import { useAuthStore } from '@/stores/auths/auth';
import useBaseModal from '@/stores/modals/baseModal';
import useToast from '@/stores/toasts/baseToast';
import type { Comment } from '@/types/communities/Comment.types';
import type { PostDetail } from '@/types/communities/PostDetail.types';
import { formatRelativeTime } from '@/utils/communites/timeUtils';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

type CommentType = 'create' | 'reply' | 'edit';

const PostDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 뒤로가기
  const handleBack = () => {
    if (location.state?.from === 'mypage') {
      navigate(`/lived/community/profile`);
      return;
    } else if (location.state?.from === 'search') {
      navigate(`/lived/community/search`);
      return;
    } else {
      navigate('/lived/community');
    }
  };

  // postId
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<PostDetail | null>(null);
  const myMemberId = useAuthStore((s) => s.memberId);
  const isMyPost = myMemberId !== null && post?.author.userId === myMemberId;

  useEffect(() => {
    if (!postId) return;

    const fetchPostDetail = async () => {
      try {
        const res = await getPostDetail(Number(postId));
        setPost(res);
      } catch (e) {
        console.error(e);
      }
    };

    fetchPostDetail();
  }, [postId]);

  // 모달
  const { isModalOpen } = useBaseModal();
  const { showToast } = useToast();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      setOpen(false);
    }
  }, [isModalOpen]);

  // 스크랩
  const [scrapped, setScrapped] = useState(false);

  useEffect(() => {
    if (!post) return;

    setScrapped(post.isScrapped);
  }, [post]);

  const handleScrapToggle = async () => {
    if (!postId) return;

    try {
      const res = await postScrap(Number(postId));
      setScrapped(res.isScrapped);
    } catch (e) {
      console.log('스크랩 토글 실패', e);
    }
  };

  // 좋아요
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    if (!post) return;

    setIsLiked(post.isLiked);
    setLikeCount(post.likeCount);
  }, [post]);

  const handleLikeToggle = async () => {
    if (!postId) return;

    try {
      const res = await postLike(Number(postId));
      setIsLiked(res.isLiked);
      setLikeCount(res.likeCount);
    } catch (e) {
      console.log('좋아요 토글 실패', e);
    }
  };

  // 게시글 삭제
  const handleDeletePost = async () => {
    if (!postId) return;

    await deletePost(Number(postId));
    showToast('작성하신 글을 삭제했어요.', 'delete');
    navigate('/lived/community');
  };

  // 댓글
  const [comments, setComments] = useState<Comment[]>([]);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState('');
  const [commentMode, setCommentMode] = useState<CommentType>('create');
  const [targetCommentId, setTargetCommentId] = useState<number | null>(null);

  const fetchComments = async () => {
    if (!postId) return;

    const res = await getCommentList({ postId: Number(postId) });
    setComments(res.comments);
  };

  useEffect(() => {
    if (!postId) return;
    fetchComments();
  }, [postId]);

  const handleCreateComment = async (content: string) => {
    if (!postId) return;

    await createComment(Number(postId), { content });
    await fetchComments();
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!postId) return;

    try {
      await deleteComment(Number(postId), commentId);
      await fetchComments();
      showToast('해당 댓글을 삭제했어요.', 'delete');
    } catch (e) {
      console.error(e);
    }
  };

  const handleRemoveCommentUI = (commentId: number) => {
    setComments((prev) =>
      prev
        .filter((c): c is Comment => c !== null && c.commentId !== commentId)
        .map((c) => ({
          ...c,
          replies: c.replies?.filter(
            (r): r is Comment => r !== null && r?.commentId !== commentId
          ),
        }))
    );
  };

  const handleEditComment = (commentId: number, content: string) => {
    setCommentMode('edit');
    setEditingCommentId(commentId);
    setEditingContent(content);
  };

  const handleReplyRequest = (parentCommentId: number) => {
    setCommentMode('create');

    setTimeout(() => {
      setTargetCommentId(parentCommentId);
      setCommentMode('reply');
    }, 0);
  };

  const handleCommentLikeToggle = async (commentId: number) => {
    try {
      const res = await commentLike(Number(postId), commentId);

      setComments((prev) =>
        prev.map((comment) => {
          if (!comment) return comment;

          if (comment.commentId === commentId) {
            return {
              ...comment,
              isLiked: res.isLiked,
              likeCount: res.likeCount,
            };
          }
          if (Array.isArray(comment.replies)) {
            return {
              ...comment,
              replies: comment.replies?.map((reply) => {
                if (!reply) return reply;

                if (reply.commentId === commentId) {
                  return {
                    ...reply,
                    isLiked: res.isLiked,
                    likeCount: res.likeCount,
                  };
                }
                return reply;
              }),
            };
          }
          return comment;
        })
      );
    } catch (e) {
      console.error(e);
    }
  };

  // 이미지
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const showPrevImage = () => {
    if (!post || setSelectedImage === null) return;
    setSelectedImage((prev) => {
      if (prev === null || prev === 0) return prev;
      return prev - 1;
    });
  };

  const showNextImage = () => {
    if (!post || setSelectedImage === null) return;
    setSelectedImage((prev) => {
      if (!post || prev === null) return prev;
      if (prev === post.images.length - 1) return prev;
      return prev + 1;
    });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;

    const diff = touchStartX - e.changedTouches[0].clientX;

    if (diff > 50) showNextImage();
    if (diff < -50) showPrevImage();

    setTouchStartX(null);
  };

  return (
    <div className="flex flex-col w-full min-h-dvh pt-10 pb-25">
      <div className="flex flex-col gap-2.5">
        {/*네브바*/}
        <div className="flex px-4 justify-between">
          <LeftChevronIcon
            className="w-7 h-7 text-gray-900 pt-0.5"
            onClick={handleBack}
          />
          <div className="relative flex gap-2">
            <BookmarkIcon
              className={`w-7 h-7 transition-colors ${scrapped ? 'fill-current text-primary-40' : 'fill-none text-gray-700'}`}
              onClick={handleScrapToggle}
            />
            <KebabIcon
              className="w-7 h-7 text-gray-700 fill-none"
              onClick={() => setOpen((prev) => !prev)}
            />
            {open && !isModalOpen && (
              <div className="absolute top-8 right-0 z-50">
                <CommunityHamburger
                  type={isMyPost ? 'myPost' : 'post'}
                  postId={post?.postId}
                  onDelete={handleDeletePost}
                />
              </div>
            )}
          </div>
        </div>
        {/*게시글 본문*/}
        <div className="flex flex-col px-4 py-3 gap-2 border-b-2 border-gray-100">
          <div className="flex items-center gap-2.5">
            <img
              className="w-13.5 h-13.5 rounded-full bg-gray-500"
              src={post?.author.profileImageUrl || undefined}
            />
            <div className="flex flex-col gap-0.5">
              <span className="typo-body_reg16 text-gray-900">
                {post?.author.nickname}
              </span>
              <div className="flex items-center gap-1">
                <span className="typo-body_reg12 text-gray-600">
                  {post?.categoryLabel}
                </span>
                <div className="w-0.5 h-0.5 bg-[#9C9C9C]" />
                <span className="typo-body_reg12 text-gray-400">
                  조회 {post?.viewCount}
                </span>
                <div className="w-0.5 h-0.5 bg-[#9C9C9C]" />
                <span className="typo-body_reg12 text-gray-400">
                  {post?.createdAt && formatRelativeTime(post.createdAt)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="typo-body_reg16 text-gray-900">{post?.title}</span>
            <span className="typo-body_reg12 text-gray-800 whitespace-pre-line">
              {post?.content}
            </span>
          </div>

          {/* 사진 리스트 */}
          {post && post?.images.length > 0 && (
            <div className="flex gap-3 overflow-x-auto">
              {post?.images.map((image, index) => (
                <img
                  key={image.imageId}
                  src={image.imageUrl}
                  className="w-26 h-26 rounded-lg bg-gray-500"
                  onClick={() => setSelectedImage(index)}
                ></img>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <div className="flex gap-1">
              <LikeIcon
                className={`w-4 h-4 ${isLiked ? 'text-primary-40' : 'text-gray-200'}`}
                onClick={handleLikeToggle}
              />
              <span className="h-4 text-[11px] text-gray-900">{likeCount}</span>
            </div>
            <div className="flex gap-1">
              <CommentIcon className="w-4 h-4 text-primary-40" />
              <span className="h-4 text-[11px] text-gray-900">
                {post?.commentCount}
              </span>
            </div>
          </div>
        </div>
      </div>
      <CommunityCommentList
        postId={Number(postId)}
        comments={comments}
        onDeleteComment={handleDeleteComment}
        onReportComment={handleRemoveCommentUI}
        onEditRequest={handleEditComment}
        onReplyRequest={handleReplyRequest}
        onLikeToggle={handleCommentLikeToggle}
      />
      {!isModalOpen && (
        <PostFooter
          value={editingContent}
          mode={commentMode}
          onSubmitComment={async (content) => {
            if (!postId) return;

            if (commentMode === 'create') {
              await handleCreateComment(content);
            }

            if (commentMode === 'edit' && editingCommentId) {
              await editComment(Number(postId), editingCommentId, { content });
            }

            if (commentMode === 'reply' && targetCommentId) {
              await createComment(Number(postId), {
                content,
                parentCommentId: targetCommentId,
              });
            }

            setCommentMode('create');
            setEditingCommentId(null);
            setTargetCommentId(null);
            setEditingContent('');

            await fetchComments();
          }}
        />
      )}
      {selectedImage !== null && post && (
        <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
          <CloseIcon
            className="absolute w-5 h-5 top-4 right-4 text-screen-0"
            onClick={() => setSelectedImage(null)}
          />
          <LeftChevronIcon
            className="absolute w-5 h-5 left-4 text-screen-0"
            onClick={showPrevImage}
          />
          <img
            src={post.images[selectedImage].imageUrl}
            className="max-w-full max-h-full"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            draggable={false}
          />
          <RightChevronIcon
            className="absolute w-5 h-5 right-4 text-screen-0"
            onClick={showNextImage}
          />
          <div className="absolute bottom-6 flex gap-4">
            {post.images.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${selectedImage === index ? 'bg-gray-100' : 'bg-gray-600'}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetailPage;
