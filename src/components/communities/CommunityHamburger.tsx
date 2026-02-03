import useBaseModal from '@/stores/modals/baseModal';
import { useNavigate } from 'react-router-dom';

interface CommunityHamburgerProps {
  type: 'myPost' | 'post' | 'myComment' | 'comment';
  postId?: number;
  commentId?: number;
  onDelete?: () => Promise<void> | void;
  onEdit?: () => void;
}

const CommunityHamburger = ({
  type,
  postId,
  commentId,
  onDelete,
  onEdit,
}: CommunityHamburgerProps) => {
  const { openModal } = useBaseModal();
  const navigate = useNavigate();

  const openDeleteClick = () => {
    if (!onDelete) return;

    const modalId = type === 'myPost' ? 'postDeleteModal' : '';
    openModal(modalId, {
      position: 'center',
      onConfirm: onDelete,
    });
  };

  return (
    <div className="w-24 h-15 pb-">
      {type === 'post' && (
        <div
          className="flex items-center justify-center w-full h-1/2 rounded-sm border-[0.5px] border-gray-300 px-3 py-2 bg-screen-0 text-[11px] text-gray-900 text-center"
          onClick={() =>
            openModal('reportPostModal', {
              position: 'bottom',
              props: { targetType: 'POST', targetId: postId },
            })
          }
        >
          글 신고하기
        </div>
      )}
      {type === 'myPost' && (
        <div>
          <div
            className="flex items-center justify-center w-full h-1/2 rounded-t-sm border-[0.5px] border-b-0 border-gray-300 px-3 py-2 bg-screen-0 text-[11px] text-gray-900 text-center"
            onClick={() => {
              if (!postId) return;
              navigate(`/lived/community/${postId}/edit`);
            }}
          >
            수정하기
          </div>
          <div
            className="flex items-center justify-center w-full h-1/2 rounded-b-sm border-[0.5px] border-gray-300 px-3 py-2 bg-screen-0 text-[11px] text-gray-900 text-center"
            onClick={openDeleteClick}
          >
            삭제하기
          </div>
        </div>
      )}
      {type === 'comment' && (
        <div>
          <div className="flex items-center justify-center w-full h-1/2 rounded-t-sm border-[0.5px] border-b-0 border-gray-300 px-3 py-2 bg-screen-0 text-[11px] text-gray-900 text-center">
            차단하기
          </div>
          <div
            className="flex items-center justify-center w-full h-1/2 rounded-b-sm border-[0.5px] border-gray-300 px-3 py-2 bg-screen-0 text-[11px] text-gray-900 text-center"
            onClick={() =>
              openModal('reportPostModal', {
                position: 'bottom',
                props: { targetType: 'COMMENT', targetId: commentId },
              })
            }
          >
            댓글 신고하기
          </div>
        </div>
      )}
      {type === 'myComment' && (
        <div>
          <div
            className="flex items-center justify-center w-full h-1/2 rounded-t-sm border-[0.5px] border-b-0 border-gray-300 px-3 py-2 bg-screen-0 text-[11px] text-gray-900 text-center"
            onClick={onEdit}
          >
            수정하기
          </div>
          <div
            className="flex items-center justify-center w-full h-1/2 rounded-b-sm border-[0.5px] border-gray-300 px-3 py-2 bg-screen-0 text-[11px] text-gray-900 text-center"
            onClick={onDelete}
          >
            삭제하기
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityHamburger;
