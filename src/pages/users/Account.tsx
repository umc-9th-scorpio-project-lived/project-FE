const Account = () => {
  return (
    <div className="w-full h-full flex flex-col gap-5.5 overflow-y-auto overflow-x-hidden">
      {/* 뒤로가기 버튼(<) */}
      <div className="flex justify-center typo-h2_reg20 text-gray-900 pt-13 px-4">계정 관리</div>

      <div className="py-5 px-4 flex flex-col gap-11">
        <div className="flex flex-col gap-5">
          <div className="w-full flex justify-between items-center">
            <span className="typo-body_bold14 text-gray-900">계정</span>
            <span className="typo-body_bold14 text-gray-400">example@example.com</span>
          </div>
          <div className="w-full flex justify-between items-center">
            <span className="typo-body_bold14 text-gray-900">루틴 시작일</span>
            <span className="typo-body_bold14 text-gray-400">2025.09.02</span>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <button
            onClick={() => {
              /* 로그아웃 로직 */
            }}
            className="w-full flex justify-between items-center"
          >
            <span className="typo-body_bold14 text-gray-900">로그아웃</span>
          </button>
          <button
            onClick={() => {
              /* 계정 삭제 로직 */
            }}
            className="w-full flex justify-between items-center"
          >
            <span className="typo-body_bold14 text-alert-50">계정 삭제</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
