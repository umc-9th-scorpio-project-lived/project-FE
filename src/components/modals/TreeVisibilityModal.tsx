import CheckCircleIcon from "@/icons/CheckCircleIcon";
import CheckIcon from "@/icons/CheckIcon";
import useBaseModal from "@/stores/modals/baseModal";
import { useState } from "react";

const TreeVisibilityModal = () => {
  const { closeModal } = useBaseModal();

  // 루틴 나무 공개 범위별 선택 상태를 관리하는 상태 변수들
  const [isFriendsOnly, setIsFriendsOnly] = useState(false);
  const [isSomeoneSelected, setIsSomeoneSelected] = useState(true);
  const [isPrivate, setIsPrivate] = useState(false);

  /** 모든 공개 범위 상태를 초기화(false)하고 새로운 선택지를 활성화하기 위한 헬퍼 함수 */
  const resetVisibility = () => {
    setIsFriendsOnly(false);
    setIsSomeoneSelected(false);
    setIsPrivate(false);
  };

  return (
    <div className="h-[50vh] bg-white p-4 rounded-t-2xl flex flex-col overflow-y-auto overflow-x-hidden">
      <div className="w-full py-3 text-center">
        <div className="typo-h2_reg20 text-gray-900 mb-2">루틴 나무 공개 범위</div>
      </div>

      <div className="flex flex-col flex-1 justify-between gap-5">
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

          <div className="flex flex-col gap-2.5">
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
            {isSomeoneSelected ? (
              <div className="h-38 pl-4 pr-18 flex flex-col gap-2 overflow-y-auto overflow-x-hidden">
                <div className="w-full flex justify-between">
                  <span className="typo-body_reg16 text-gray-900">친구1</span>
                  <button>
                    <CheckIcon className="w-6 h-6 text-primary-50" />
                  </button>
                </div>
                <div className="w-full flex justify-between">
                  <span className="typo-body_reg16 text-gray-900">친구2</span>
                  <button>
                    <CheckIcon className="w-6 h-6 text-gray-900" />
                  </button>
                </div>
                <div className="w-full flex justify-between">
                  <span className="typo-body_reg16 text-gray-900">친구3</span>
                  <button>
                    <CheckIcon className="w-6 h-6 text-gray-900" />
                  </button>
                </div>
                <div className="w-full flex justify-between">
                  <span className="typo-body_reg16 text-gray-900">친구4</span>
                  <button>
                    <CheckIcon className="w-6 h-6 text-gray-900" />
                  </button>
                </div>
                <div className="w-full flex justify-between">
                  <span className="typo-body_reg16 text-gray-900">친구5</span>
                  <button>
                    <CheckIcon className="w-6 h-6 text-gray-900" />
                  </button>
                </div>
                <div className="w-full flex justify-between">
                  <span className="typo-body_reg16 text-gray-900">친구6</span>
                  <button>
                    <CheckIcon className="w-6 h-6 text-gray-900" />
                  </button>
                </div>
                <div className="w-full flex justify-between">
                  <span className="typo-body_reg16 text-gray-900">친구7</span>
                  <button>
                    <CheckIcon className="w-6 h-6 text-gray-900" />
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>

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
