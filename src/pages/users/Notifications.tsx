import Toggle from "@/components/users/Toggle";

const Notifications = () => {
  return (
    <div className="w-full h-full flex flex-col gap-5.5 overflow-y-auto overflow-x-hidden">
      {/* 뒤로가기 버튼(<) */}
      <div className="flex justify-center typo-h2_reg20 text-gray-900 pt-13 px-4">알림 설정</div>

      <div className="w-full flex flex-col px-4 gap-5">
        <div className="flex justify-between items-center py-1.5">
          <span className="typo-body_bold14 text-gray-900">전체 알림 설정</span>
          <div className="px-1">
            <Toggle />
          </div>
        </div>

        <div className="flex justify-between items-center py-1.5">
          <span className="typo-body_bold14 text-gray-900">루틴 알림</span>
          <div className="px-1">
            <Toggle />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center py-1.5">
            <span className="typo-body_bold14 text-gray-900">커뮤니티 알림</span>
            <div className="px-1">
              <Toggle />
            </div>
          </div>

          <div className="flex flex-col pl-14">
            <div className="flex justify-between items-center py-1.5">
              <span className="typo-body_bold14 text-gray-900">게시글 좋아요 알림</span>
              <div className="px-1">
                <Toggle />
              </div>
            </div>

            <div className="flex justify-between items-center py-1.5">
              <span className="typo-body_bold14 text-gray-900">댓글 알림</span>
              <div className="px-1">
                <Toggle />
              </div>
            </div>

            <div className="flex justify-between items-center py-1.5">
              <span className="typo-body_bold14 text-gray-900">댓글 좋아요 알림</span>
              <div className="px-1">
                <Toggle />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center py-1.5">
          <span className="typo-body_bold14 text-gray-900">마케팅 정보 알림</span>
          <div className="px-1">
            <Toggle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
