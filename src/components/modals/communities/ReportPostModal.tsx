import {
  REPORT_REASON,
  type ReportReason,
  type ReportTargetType,
} from '@/constants/report';
import { report } from '@/services/posts/report';
import useBaseModal from '@/stores/modals/baseModal';
import useToast from '@/stores/toasts/baseToast';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type ReportModalProps = {
  targetType: ReportTargetType;
  targetId: number;
  onSuccess?: () => void;
};

const ReportPostModal = () => {
  const { closeModal, modalProps } = useBaseModal();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const { targetType, targetId, onSuccess } = modalProps as ReportModalProps;

  const [selectReason, setSelectReason] = useState<ReportReason | null>(null);
  const [detail, setDetail] = useState('');

  const isValid = selectReason !== null;

  const handleSubmit = async () => {
    if (!selectReason) return;

    try {
      await report({
        targetType,
        targetId,
        reason: selectReason,
        detail: detail || null,
      });
      closeModal();
      showToast(
        '해당 신고 사유가 접수되었습니다. \n신고된 내용은 검토하여 조치할 예정입니다.',
        'check'
      );
      if (targetType === 'POST') {
        navigate('/lived/community');
      }
      if (targetType === 'COMMENT') {
        onSuccess?.();
        return;
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="bg-screen-0 px-6 pt-2 pb-6 rounded-t-xl">
      <div className="relative flex items-center justify-center w-full mb-6"></div>
      {/*신고 사유 리스트*/}
      <div className="flex flex-col gap-4.5 pb-2 text-body_16">
        {REPORT_REASON.map(({ id, type, content }) => {
          const select = selectReason === type;

          return (
            <button
              key={id}
              type="button"
              className="flex items-center gap-2"
              onClick={() => setSelectReason(type)}
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center ${select ? 'bg-gray-900' : 'bg-gray-200'}`}
              >
                <span className="w-3 h-3 rounded-full bg-screen-0" />
              </span>
              <span>{content}</span>
            </button>
          );
        })}
      </div>
      {/*상세 사유*/}
      {selectReason && (
        <textarea
          className="w-full h-28 rounded-sm p-2 my-2 border-[0.5px] border-gray-300 text-[14px] resize-none"
          placeholder="상세 사유를 작성해 주세요.(선택)"
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
        />
      )}
      <button
        disabled={!isValid}
        onClick={handleSubmit}
        className={`w-full py-3 mt-4 text-[18px] font-bold rounded-full ${isValid ? 'bg-primary-50 text-screen-0' : 'bg-gray-100 text-gray-400'}`}
      >
        신고하기
      </button>
    </div>
  );
};

export default ReportPostModal;
