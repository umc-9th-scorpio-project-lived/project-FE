import CheckCircleIcon from "@/icons/CheckCircleIcon";
import useBaseModal from "@/stores/modals/baseModal";
import { useState } from "react";

const TreeVisibilityModal = () => {
  const { closeModal } = useBaseModal();

  // 루틴 나무 공개 범위별 선택 상태를 관리하는 상태 변수들
  const [isFriendsOnly, setIsFriendsOnly] = useState(true);
  const [isSomeoneSelected, setIsSomeoneSelected] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);

  /** 모든 공개 범위 상태를 초기화(false)하고 새로운 선택지를 활성화하기 위한 헬퍼 함수 */
  const resetVisibility = () => {
    setIsFriendsOnly(false);
    setIsSomeoneSelected(false);
    setIsPrivate(false);
  };

  return (
    <div className="bg-white p-4 rounded-t-xl">
      <div className="w-full py-3 text-center">
        <div className="typo-body_bold18 text-gray-900 mb-2">루틴 나무 공개 범위</div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3.5">
          <button
            onClick={() => {
              resetVisibility();
              setIsFriendsOnly(true);
            }}
            className="flex gap-2 cursor-pointer"
          >
            <CheckCircleIcon
              className={`w-6 h-6 ${isFriendsOnly ? "text-primary-50" : "text-gray-300"}`}
            />
            <span className="typo-body_reg16 text-gray-900">친구 공개</span>
          </button>

          <button
            onClick={() => {
              resetVisibility();
              setIsSomeoneSelected(true);
            }}
            className="flex gap-2 cursor-pointer"
          >
            <CheckCircleIcon
              className={`w-6 h-6 ${isSomeoneSelected ? "text-primary-50" : "text-gray-300"}`}
            />
            <span className="typo-body_reg16 text-gray-900">일부 공개</span>
          </button>

          <button
            onClick={() => {
              resetVisibility();
              setIsPrivate(true);
            }}
            className="flex gap-2 cursor-pointer"
          >
            <CheckCircleIcon
              className={`w-6 h-6 ${isPrivate ? "text-primary-50" : "text-gray-300"}`}
            />
            <span className="typo-body_reg16 text-gray-900">나만 보기</span>
          </button>
        </div>

        <button
          onClick={closeModal}
          className="w-full py-3 bg-primary-50 text-white rounded-4xl cursor-pointer"
        >
          수정 완료
        </button>
      </div>
    </div>
  );
};

export default TreeVisibilityModal;
