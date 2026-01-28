import CloseIcon from "@/icons/CloseIcon";
import useBaseModal from "@/stores/modals/baseModal";
import { useState } from "react";

const REPORT_REASONS = [
  "욕설, 혐오 표현 사용",
  "음란, 부적절한 콘텐츠",
  "상업성, 홍보성 내용",
  "도배 및 장난성 글",
  "개인정보 침해",
  "저작권 침해",
  "범죄 행위 유도 및 범죄 관련 내용",
  "기타",
];

const ReportPostModal = () => {
  const { closeModal } = useBaseModal();

  const [selectReason, setSelectReason] = useState<string | null>(null);
  const [detail, setDetail] = useState("");

  const isSubmit = selectReason !== null;

  return (
    <div className="bg-screen-0 p-6 rounded-t-xl">
      <div className="relative flex items-center justify-center w-full mb-6">
        <span className="flex typo-h2_bold20">신고 사유</span>
        <CloseIcon className="absolute right-0 w-4 h-4" onClick={closeModal} />
      </div>
      {/*신고 사유 리스트*/}
      <div className="flex flex-col gap-4 my-2 text-gray-900 text-body_16">
        {REPORT_REASONS.map((reason) => {
          const select = selectReason === reason;

          return (
            <button
              key={reason}
              type="button"
              className="flex items-center gap-2"
              onClick={() => setSelectReason(reason)}
            >
              <span
                className={`w-5 h-5 rounded-full border flex items-center justify-center
                  ${select ? "border-black" : "border-gray-300"}
                  `}
              >
                {select && <span className="w-2.5 h-2.5 rounded-full bg-black" />}
              </span>
              <span>{reason}</span>
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
        disabled={!isSubmit}
        onClick={closeModal}
        className={`w-full py-3 mt-4 text-[18px] font-bold rounded-full ${isSubmit ? "bg-black text-screen-0" : "bg-gray-100 text-gray-400"}`}
      >
        신고하기
      </button>
    </div>
  );
};

export default ReportPostModal;
