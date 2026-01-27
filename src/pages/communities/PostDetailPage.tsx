import CommunityCommentList from "@/components/communities/CommunityCommentList";
import CommunityHamburger from "@/components/communities/CommunityHamburger";
import PostFooter from "@/components/communities/PostFooter";
import BookmarkIcon from "@/icons/BookmarkIcon";
import CommentIcon from "@/icons/CommentIcon";
import KebabIcon from "@/icons/KebabIcon";
import LeftChevronIcon from "@/icons/LeftChevronIcon";
import LikeIcon from "@/icons/LikeIcon";
import { mockPosts } from "@/mocks/post";
import useBaseModal from "@/stores/modals/baseModal";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

const PostDetailPage = () => {
  const { postId } = useParams<{ postId: string }>(); //더미 데이터에서 게시글의 id를 가져오기(일시적)
  const post = mockPosts.find((p) => p.id === Number(postId));
  if (!post) {
    return <div className="p-4">게시글을 찾을 수 없습니다.</div>;
  }

  const { isModalOpen } = useBaseModal();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(post?.likeCount ?? 0);
  const [isLiked, setIsLiked] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      setOpen(false);
    }
  }, [isModalOpen]);

  const handleLikeToggle = () => {
    if (isLiked) {
      setLikeCount((c) => Math.max(0, c - 1));
    } else {
      setLikeCount((c) => c + 1);
    }
    setIsLiked((prev) => !prev);
  };

  return (
    <div className="flex flex-col w-full min-h-screen pt-2 pb-[100px]">
      {/*네브바*/}
      <div className="flex px-4 justify-between">
        <NavLink to="/lived/community" className="w-6 h-6 flex items-center justify-center">
          <LeftChevronIcon className="w-7 h-7 text-gray-900 pt-0.5" />
        </NavLink>
        <div className="relative flex gap-2">
          <BookmarkIcon
            className={`w-7 h-7 transition-colors ${isBookmarked ? "fill-current text-primary-40" : "fill-none text-gray-700"}`}
            onClick={() => setIsBookmarked(!isBookmarked)}
          />
          <KebabIcon
            className="w-7 h-7 text-gray-700 fill-none"
            onClick={() => setOpen((prev) => !prev)}
          />
          {open && !isModalOpen && (
            <div className="absolute top-8 right-0 z-50">
              <CommunityHamburger type="post" />
            </div>
          )}
        </div>
      </div>
      {/*게시글 본문*/}
      <div className="flex flex-col px-4 py-3 gap-2 border-b-2 border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-13.5 h-13.5 rounded-full bg-gray-500" />
          <div className="flex flex-col gap-0.5">
            <span className="typo-body_reg16 text-gray-900">민</span>
            <div className="flex items-center gap-1">
              <span className="typo-body_reg12 text-gray-600">{post?.category}</span>
              <div className="w-0.5 h-0.5 bg-[#9C9C9C]" />
              <span className="typo-body_reg12 text-gray-400">조회 539</span>
              <div className="w-0.5 h-0.5 bg-[#9C9C9C]" />
              <span className="typo-body_reg12 text-gray-400">{post?.createdAt}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="typo-body_reg16 text-gray-900">{post?.title}</span>
          <span className="typo-body_reg12 text-gray-800 whitespace-pre-line">{post?.content}</span>
        </div>
        {post.imageCount > 0 && (
          <div className="flex gap-3 overflow-x-auto">
            {Array.from({ length: post.imageCount }).map((_, index) => (
              <div key={index} className="w-26 h-26 rounded-lg bg-gray-500"></div>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          <div className="flex gap-1">
            <LikeIcon
              className={`w-4 h-4 ${isLiked ? "text-primary-40" : "text-gray-200"}`}
              onClick={handleLikeToggle}
            />
            <span className="h-4 text-[11px] text-gray-900">{likeCount}</span>
          </div>
          <div className="flex gap-1">
            <CommentIcon className="w-4 h-4 text-primary-40" />
            <span className="h-4 text-[11px] text-gray-900">{post?.commentCount}</span>
          </div>
        </div>
      </div>
      <CommunityCommentList />
      {!isModalOpen && <PostFooter />}
    </div>
  );
};

export default PostDetailPage;
