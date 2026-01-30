import { AI_RECOMMENDS, CATEGORY_RECOMMENDS } from "@/components/homes/mockRoutines";
import CheckCircleIcon from "@/icons/CheckCircleIcon";
import LeftChevronIcon from "@/icons/LeftChevronIcon";
import RefreshIcon from "@/icons/RefreshIcon";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type RecommendTab = "AI" | "CATEGORY";

const RecommendPage = () => {
  const navigate = useNavigate();

  // 루틴 추천 페이지 탭 상태
  const [tab, setTab] = useState<RecommendTab>("AI");

  const isAI = tab === "AI";
  const isCategory = tab === "CATEGORY";

  // 탭별 선택 상태
  const [selectedByTab, setSelectedByTab] = useState<Record<RecommendTab, Set<string>>>({
    AI: new Set(),
    CATEGORY: new Set(),
  });

  const selectedIds = selectedByTab[tab];
  const selectedCount = selectedIds.size;

  // const isSelected = (id: string) => selectedIds.has(id);

  const toggleSelect = (id: string) => {
    setSelectedByTab((prev) => {
      const next = { ...prev };
      const set = new Set(next[tab]);
      if (set.has(id)) set.delete(id);
      else set.add(id);
      next[tab] = set;
      return next;
    });
  };

  // 탭 변경 시 선택값 초기화
  const changeTab = (nextTab: RecommendTab) => {
    setTab(nextTab);
    setSelectedByTab((prev) => ({
      ...prev,
      [nextTab]: new Set(),
    }));
  };

  return (
    <div className="w-full h-dvh bg-primary-50 pt-10 flex flex-col">
      {/* 헤더 */}
      <div className="w-full py-2 px-4">
        <div className="relative flex w-full items-center justify-center">
          <LeftChevronIcon
            className="absolute left-0 w-7 h-7 text-screen-0"
            onClick={() => navigate(-1)}
          />
          <span className="typo-h2_bold20 text-screen-0">루틴 추천</span>
        </div>
      </div>

      {/* 탭 */}
      <div className="w-full flex items-center justify-start p-4 gap-4">
        <div
          role="button"
          onClick={() => changeTab("AI")}
          className={`${isAI ? "typo-body_bold16 text-screen-0" : "typo-body_reg16 text-gray-100"}`}
        >
          AI 맞춤 추천
        </div>

        <div
          role="button"
          onClick={() => changeTab("CATEGORY")}
          className={`${isCategory ? "typo-body_bold16 text-screen-0" : "typo-body_reg16 text-gray-100"}`}
        >
          카테고리 별 추천
        </div>
      </div>

      {/* 콘텐츠 영역 */}
      <div
        className={`relative w-full flex flex-col flex-1 overflow-y-auto rounded-t-2xl px-4 pt-6 bg-screen-0 ${isAI ? "pb-41.5" : "pb-25"}`}
      >
        {isAI && (
          <div className="flex flex-col gap-4 overflow-y-auto">
            {AI_RECOMMENDS.map((item) => {
              const selected = selectedIds.has(item.id);

              return (
                <div
                  key={item.id}
                  role="button"
                  onClick={() => toggleSelect(item.id)}
                  className={`relative w-full flex flex-col px-2.5 py-5 gap-2 rounded-lg transition-colors bg-gray-50`}
                >
                  <div className="typo-body_reg16 text-gray-900">
                    {item.emoji ? `${item.emoji} ` : ""}
                    {item.title}
                  </div>
                  {item.subText && (
                    <div className="typo-body_reg12 text-gray-700">{item.subText}</div>
                  )}

                  {selected && (
                    <div className="absolute inset-0 bg-[#E9F4CC]/90 rounded-lg flex items-end justify-end p-2 transition-colors">
                      <CheckCircleIcon className="size-6 text-primary-50" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {isCategory && (
          <div className="overflow-y-auto flex flex-col gap-6">
            {CATEGORY_RECOMMENDS.map((cat) => (
              <div key={cat.id} className="w-full flex flex-col gap-3">
                <span className="typo-body_bold18 text-gray-900">
                  {cat.emoji} {cat.title}
                </span>

                <div className="max-w-full overflow-x-auto flex gap-2.5">
                  {cat.routines.map((r) => {
                    const selected = selectedIds.has(r.id);

                    return (
                      <div
                        key={r.id}
                        role="button"
                        onClick={() => toggleSelect(r.id)}
                        className={`relative shrink-0 w-26.5 h-26.5 p-2 flex justify-center items-center text-center rounded-lg typo-body_reg14 transition-colors bg-gray-50 text-gray-900`}
                      >
                        {r.title}

                        {selected && (
                          <div className="absolute inset-0 bg-[#E9F4CC]/90 rounded-lg flex items-end justify-end p-2 transition-colors">
                            <CheckCircleIcon className="size-6 text-primary-50" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 버튼 */}
        <div className="absolute bottom-0 left-0 right-0 px-4 flex flex-col gap-5 items-center justify-center pb-11 pt-2 bg-screen-0">
          {isAI && (
            <div className="flex gap-1.5 justify-center items-center px-6 py-3 bg-screen-0 border border-primary-50 rounded-4xl shadow-mini">
              <RefreshIcon className="w-4 h-4 text-primary-50" />
              <span className="typo-body_reg14 text-gray-900">새로운 추천 받기</span>
            </div>
          )}
          <div
            className={`w-full text-center py-3 rounded-4xl typo-body_bold16 transition-colors ${selectedCount === 0 ? "bg-gray-100 text-gray-400" : "bg-primary-50 text-screen-0"}`}
            onClick={() => {
              if (selectedCount > 0) {
                navigate("/lived");
              }
            }}
          >
            {selectedCount}개 선택하기
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendPage;
