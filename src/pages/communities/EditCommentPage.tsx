import LeftChevronIcon from '@/icons/LeftChevronIcon';
import { editComment, getCommentList } from '@/services/posts/comment';
import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';

const EditCommentPage = () => {
  const { postId, commentId } = useParams<{
    postId: string;
    commentId: string;
  }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [content, setContent] = useState(location.state?.content ?? '');
  const isFormValid = content.trim().length > 0;

  useEffect(() => {
    if (!postId || !commentId) return;

    if (!location.state?.content) return;

    const fetchComment = async () => {
      try {
        const res = await getCommentList({ postId: Number(postId) });
        const targetComment = res.comments
          .flatMap((c) => [c, ...(c.replies ?? [])])
          .find((c) => c && c.commentId === Number(commentId));
        if (targetComment) {
          setContent(targetComment.content);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchComment();
  }, [postId, commentId, location.state]);

  const handleSubmit = async () => {
    if (!postId || !commentId) return;
    await editComment(Number(postId), Number(commentId), { content });
    navigate(`/lived/community/${postId}`);
  };

  return (
    <div className="flex flex-col h-dvh pb-25 pt-10">
      {/* 네브바 */}
      <div className="flex justify-between items-center text-gray-900 my-2 mx-4">
        <div className="flex gap-3">
          <NavLink
            to={`/lived/community/${postId}`}
            className="flex items-center justify-center"
          >
            <LeftChevronIcon className="w-6 h-6 text-gray-900 pt-0.5" />
          </NavLink>
          <span className="typo-h2_bold20 text-gray-900">댓글 수정</span>
        </div>
        <button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className={`typo-body_bold14 ${isFormValid ? 'text-gray-900' : 'text-gray-500'}`}
        >
          완료
        </button>
      </div>
      {/* 본문 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex flex-col flex-1 py-5 gap-5.5 overflow-hidden border-b border-gray-100">
          <textarea
            className="flex-1 px-4 resize-none overflow-y-auto text-[16px] text-gray-900 outline-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onInput={(e) => {
              const target = e.currentTarget;
              target.style.height = 'auto';
              target.style.height = `${target.scrollHeight}px`;
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EditCommentPage;
