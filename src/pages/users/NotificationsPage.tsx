import Toggle from "@/components/users/Toggle";
import LeftChevronIcon from "@/icons/LeftChevronIcon";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const NotificationsPage = () => {
  const navigate = useNavigate();

  // 알림 카테고리별 활성화 여부를 관리하는 상태 변수들
  const [isAllEnabled, setIsAllEnabled] = useState(false);
  const [isRoutineEnabled, setIsRoutineEnabled] = useState(false);
  const [isCommunityEnabled, setIsCommunityEnabled] = useState(false);
  const [isPostLikeEnabled, setIsPostLikeEnabled] = useState(false);
  const [isCommentEnabled, setIsCommentEnabled] = useState(false);
  const [isCommentLikeEnabled, setIsCommentLikeEnabled] = useState(false);
  const [isMarketingEnabled, setIsMarketingEnabled] = useState(false);

  /** 전체 알림을 토글하고, 상태에 따라 모든 하위 알림 항목들을 일괄 활성화/비활성화 */
  const handleToggleAll = () => {
    setIsAllEnabled((prev) => !prev);

    if (!isAllEnabled) {
      setIsRoutineEnabled(true);
      setIsCommunityEnabled(true);
      setIsPostLikeEnabled(true);
      setIsCommentEnabled(true);
      setIsCommentLikeEnabled(true);
      setIsMarketingEnabled(true);
    } else {
      setIsRoutineEnabled(false);
      setIsCommunityEnabled(false);
      setIsPostLikeEnabled(false);
      setIsCommentEnabled(false);
      setIsCommentLikeEnabled(false);
      setIsMarketingEnabled(false);
    }
  };

  /** 커뮤니티 알림을 토글하고, 상태에 따라 커뮤니티 하위 알림(게시글 좋아요, 댓글, 댓글 좋아요)을 일괄 활성화/비활성화 */
  const handleToggleCommunity = () => {
    setIsCommunityEnabled((prev) => !prev);

    if (!isCommunityEnabled) {
      setIsPostLikeEnabled(true);
      setIsCommentEnabled(true);
      setIsCommentLikeEnabled(true);
    } else {
      setIsPostLikeEnabled(false);
      setIsCommentEnabled(false);
      setIsCommentLikeEnabled(false);
    }
  };

  // 모든 하위 알림이 활성화되면 전체 알림도 활성화, 하나라도 비활성화되면 전체 알림 비활성화
  useEffect(() => {
    const isRestEnabled =
      isRoutineEnabled &&
      isCommunityEnabled &&
      isPostLikeEnabled &&
      isCommentEnabled &&
      isCommentLikeEnabled &&
      isMarketingEnabled;

    if (!isRestEnabled && isAllEnabled) {
      setIsAllEnabled(false);
    }

    if (isRestEnabled && !isAllEnabled) {
      setIsAllEnabled(true);
    }
  }, [
    isRoutineEnabled,
    isCommunityEnabled,
    isPostLikeEnabled,
    isCommentEnabled,
    isCommentLikeEnabled,
    isMarketingEnabled,
  ]);

  // 커뮤니티 하위 알림(게시글 좋아요, 댓글, 댓글 좋아요)이 모두 활성화되면 커뮤니티 알림도 활성화, 하나라도 비활성화되면 커뮤니티 알림 비활성화
  useEffect(() => {
    const isAllCommunityEnabled = isPostLikeEnabled && isCommentEnabled && isCommentLikeEnabled;

    if (!isAllCommunityEnabled && isCommunityEnabled) {
      setIsCommunityEnabled(false);
    }

    if (isAllCommunityEnabled && !isCommunityEnabled) {
      setIsCommunityEnabled(true);
    }
  }, [isPostLikeEnabled, isCommentEnabled, isCommentLikeEnabled]);

  return (
    <div className="w-full h-full flex flex-col gap-5.5 overflow-y-auto overflow-x-hidden">
      <div className="flex justify-center items-center pt-13 px-4 relative">
        <button
          onClick={() => navigate("/lived/my")}
          className="flex justify-center items-center absolute left-4 cursor-pointer"
        >
          <LeftChevronIcon className="w-7 h-7 text-gray-900" />
        </button>
        <span className="typo-h2_reg20 text-gray-900">알림 설정</span>
      </div>

      <div className="w-full flex flex-col px-4 gap-5">
        <div className="flex justify-between items-center py-1.5">
          <span className="typo-body_bold14 text-gray-900">전체 알림 설정</span>
          <div className="px-1">
            <Toggle checked={isAllEnabled} handleToggle={handleToggleAll} />
          </div>
        </div>

        <div className="flex justify-between items-center py-1.5">
          <span className="typo-body_bold14 text-gray-900">루틴 알림</span>
          <div className="px-1">
            <Toggle
              checked={isRoutineEnabled}
              handleToggle={() => {
                setIsRoutineEnabled((prev) => !prev);
              }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center py-1.5">
            <span className="typo-body_bold14 text-gray-900">커뮤니티 알림</span>
            <div className="px-1">
              <Toggle
                checked={isCommunityEnabled}
                handleToggle={() => {
                  handleToggleCommunity();
                }}
              />
            </div>
          </div>

          <div className="flex flex-col pl-14">
            <div className="flex justify-between items-center py-1.5">
              <span className="typo-body_bold14 text-gray-900">게시글 좋아요 알림</span>
              <div className="px-1">
                <Toggle
                  checked={isPostLikeEnabled}
                  handleToggle={() => {
                    setIsPostLikeEnabled((prev) => !prev);
                  }}
                />
              </div>
            </div>

            <div className="flex justify-between items-center py-1.5">
              <span className="typo-body_bold14 text-gray-900">댓글 알림</span>
              <div className="px-1">
                <Toggle
                  checked={isCommentEnabled}
                  handleToggle={() => {
                    setIsCommentEnabled((prev) => !prev);
                  }}
                />
              </div>
            </div>

            <div className="flex justify-between items-center py-1.5">
              <span className="typo-body_bold14 text-gray-900">댓글 좋아요 알림</span>
              <div className="px-1">
                <Toggle
                  checked={isCommentLikeEnabled}
                  handleToggle={() => {
                    setIsCommentLikeEnabled((prev) => !prev);
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center py-1.5">
          <span className="typo-body_bold14 text-gray-900">마케팅 정보 알림</span>
          <div className="px-1">
            <Toggle
              checked={isMarketingEnabled}
              handleToggle={() => {
                setIsMarketingEnabled((prev) => !prev);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
