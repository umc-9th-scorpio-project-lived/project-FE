import { useNavigate } from "react-router-dom";

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex flex-col gap-7 overflow-y-auto overflow-x-hidden">
      {/* 뒤로가기 버튼(<) */}
      <div className="flex justify-center typo-h2_reg20 text-gray-900 pt-13 px-4">개인정보보호</div>

      <div className="w-full flex flex-col gap-9 px-4">
        <div className="flex flex-col gap-1">
          <span className="typo-body_reg16 text-gray-900">차단</span>

          <div className="flex flex-col gap-2.5">
            <button onClick={() => navigate("blocked")} className="flex justify-between">
              <span className="typo-body_bold14 text-gray-900">차단 목록</span>
              {/* > 아이콘 */}
            </button>

            <span className="typo-body_reg12 text-gray-300">
              차단된 사용자는 차단한 사용자의 컨텐츠를 볼 수 없고, 좋아요, 댓글을 보낼 수 없습니다.
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="typo-body_reg16 text-gray-900">루틴 나무</span>

          <div className="flex flex-col gap-2.5">
            <button
              onClick={() => {
                /* 공개 범위 설정 로직 */
              }}
              className="flex justify-between"
            >
              <span className="typo-body_bold14 text-gray-900">루틴 나무 공개 범위</span>
              <div className="flex">
                <span className="typo-body_bold14 text-gray-700">친구 공개</span>
                {/* > 아이콘 */}
              </div>
            </button>

            <span className="typo-body_reg12 text-gray-300">
              내 루틴 나무를 공개하는 대상 범위를 설정할 수 있습니다.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
