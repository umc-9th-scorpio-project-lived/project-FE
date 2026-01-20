import useBaseModal from "@/stores/modals/baseModal";

interface CommunityHamburgerProps {
  type: "myPost" | "post" | "myComment" | "comment";
}

const CommunityHamburger = ({ type }: CommunityHamburgerProps) => {
  const { openModal } = useBaseModal();

  return (
    <div className="w-24 h-15 pb-">
      {type === "post" && (
        <div
          className="w-full h-1/2 rounded-sm border-[0.5px] border-gray-300 px-3 py-2 bg-screen-0 text-[11px] text-gray-900 text-center"
          onClick={() => openModal("reportPostModal", { position: "bottom" })}
        >
          글 신고하기
        </div>
      )}
      {(type === "myPost" || type === "myComment") && (
        <div>
          <div className="w-full h-1/2 rounded-sm border-t-[0.5px] border-gray-300 px-3 py-2 bg-screen-0 text-[11px] text-gray-900 text-center">
            수정하기
          </div>
          <div className="w-full h-1/2 rounded-sm border-b-[0.5px] border-gray-300 px-3 py-2 bg-screen-0 text-[11px] text-gray-900 text-center">
            삭제하기
          </div>
        </div>
      )}
      {type === "comment" && (
        <div>
          <div className="w-full h-1/2 rounded-t-sm border-[0.5px] border-gray-300 px-3 py-2 bg-screen-0 text-[11px] text-gray-900 text-center">
            차단하기
          </div>
          <div className="w-full h-1/2 rounded-b-sm border-[0.5px] border-gray-300 px-3 py-2 bg-screen-0 text-[11px] text-gray-900 text-center">
            댓글 신고하기
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityHamburger;
