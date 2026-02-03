import {
  REPORT_REASON,
  type ReportReason,
  type ReportTargetType,
} from '@/constants/report';
import CloseIcon from '@/icons/CloseIcon';
import { report } from '@/services/posts/report';
import useBaseModal from '@/stores/modals/baseModal';
import { useState } from 'react';

type ReportModalProps = {
  targetType: ReportTargetType;
  targetId: number;
};

const ReportPostModal = () => {
  const { closeModal, modalProps } = useBaseModal();

  const { targetType, targetId } = modalProps as ReportModalProps;

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
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="bg-screen-0 p-6 rounded-t-xl">
      <div className="relative flex items-center justify-center w-full mb-6">
        <span className="flex typo-h2_bold20">신고 사유</span>
        <CloseIcon className="absolute right-0 w-4 h-4" onClick={closeModal} />
      </div>
      {/*신고 사유 리스트*/}
      <div className="flex flex-col gap-4 my-2 text-gray-900 text-body_16">
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
                className={`w-5 h-5 rounded-full border flex items-center justify-center
                  ${select ? 'border-black' : 'border-gray-300'}
                  `}
              >
                {select && (
                  <span className="w-2.5 h-2.5 rounded-full bg-black" />
                )}
              </span>
              <span>{content}</span>
            </button>
          );
        })}
      </div>
      {/*상세 사유*/}
      {selectReason && (
        <textarea
          className="w-full h-32 p-2 my-2 border border-gray-300 text-[14px] resize-none"
          placeholder="상세 사유를 작성해 주세요.(선택)"
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
        />
      )}
      <button
        disabled={!isValid}
        onClick={handleSubmit}
        className={`w-full py-3 mt-4 text-[18px] font-bold rounded-full ${isValid ? 'bg-black text-screen-0' : 'bg-gray-100 text-gray-400'}`}
      >
        신고하기
      </button>
    </div>
  );
};

export default ReportPostModal;
