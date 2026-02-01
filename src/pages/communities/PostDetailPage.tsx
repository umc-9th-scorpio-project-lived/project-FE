import CommunityCommentList from '@/components/communities/CommunityCommentList';
import CommunityHamburger from '@/components/communities/CommunityHamburger';
import PostFooter from '@/components/communities/PostFooter';
import BookmarkIcon from '@/icons/BookmarkIcon';
import CommentIcon from '@/icons/CommentIcon';
import KebabIcon from '@/icons/KebabIcon';
import LeftChevronIcon from '@/icons/LeftChevronIcon';
import LikeIcon from '@/icons/LikeIcon';
import { deletePost, getPostDetail, postLike } from '@/services/posts/post';
import useBaseModal from '@/stores/modals/baseModal';
import type { PostDetail } from '@/types/communities/PostDetail.types';
import { formatRelativeTime } from '@/utils/communites/timeUtils';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

const PostDetailPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<PostDetail | null>(null);
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

  const { isModalOpen } = useBaseModal();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (isModalOpen) {
      setOpen(false);
    }
  }, [isModalOpen]);

  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);
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

  const handleDeletePost = async () => {
    if (!postId) return;

    await deletePost(Number(postId));
    navigate('/lived/community');
  };

  return (
    <div className="flex flex-col w-full min-h-screen pt-10 pb-25">
      {/*네브바*/}
      <div className="flex px-4 justify-between">
        <NavLink
          to="/lived/community"
          className="w-6 h-6 flex items-center justify-center"
        >
          <LeftChevronIcon className="w-7 h-7 text-gray-900 pt-0.5" />
        </NavLink>
        <div className="relative flex gap-2">
          <BookmarkIcon
            className={`w-7 h-7 transition-colors ${isBookmarked ? 'fill-current text-primary-40' : 'fill-none text-gray-700'}`}
            onClick={() => setIsBookmarked(!isBookmarked)}
          />
          <KebabIcon
            className="w-7 h-7 text-gray-700 fill-none"
            onClick={() => setOpen((prev) => !prev)}
          />
          {open && !isModalOpen && (
            <div className="absolute top-8 right-0 z-50">
              <CommunityHamburger
                type="myPost"
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
          <div className="w-13.5 h-13.5 rounded-full bg-gray-500" />
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
        {post && post?.images.length > 0 && (
          <div className="flex gap-3 overflow-x-auto">
            {post?.images.map((image) => (
              <img
                key={image.imageId}
                src={image.imageUrl}
                className="w-26 h-26 rounded-lg bg-gray-500"
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
      <CommunityCommentList />
      {!isModalOpen && <PostFooter />}
    </div>
  );
};

export default PostDetailPage;
