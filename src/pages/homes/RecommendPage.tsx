import CheckCircleIcon from '@/icons/CheckCircleIcon';
import LeftChevronIcon from '@/icons/LeftChevronIcon';
import RefreshIcon from '@/icons/RefreshIcon';
import { useRecommendStore } from '@/stores/recommendations/recommendStore';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type RecommendTab = 'AI' | 'CATEGORY';

const makeAiKey = (index: number) => `AI::${index}`;
const makeCatKey = (routineId: number) => `CATEGORY::${routineId}`;

const RecommendPage = () => {
  const navigate = useNavigate();

  // 루틴 추천 페이지 탭 상태
  const [tab, setTab] = useState<RecommendTab>('AI');

  const isAI = tab === 'AI';
  const isCategory = tab === 'CATEGORY';

  const {
    ai,
    categories,
    isLoading,
    isAiLoading,
    fetchAi,
    fetchCategories,
    addSelectedCategroyRoutine,
    addSelectedAiRoutines,
  } = useRecommendStore();

  // 탭별 선택 상태
  const [selectedByTab, setSelectedByTab] = useState<
    Record<RecommendTab, Set<string>>
  >({
    AI: new Set(),
    CATEGORY: new Set(),
  });

  const selectedIds = selectedByTab[tab];
  const selectedCount = selectedIds.size;

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

  useEffect(() => {
    void (async () => {
      try {
        await Promise.all([fetchAi(), fetchCategories()]);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [fetchAi, fetchCategories]);

  const parseNumberKey = (key: string): number | null => {
    const parts = key.split('::');
    const n = Number(parts[1]);
    return Number.isFinite(n) ? n : null;
  };

  const handleSubmit = async () => {
    if (selectedCount === 0) return;

    if (isAI) {
      const indexes = Array.from(selectedIds)
        .map(parseNumberKey)
        .filter((v): v is number => v !== null);

      const routines = indexes
        .map((i) => ai[i])
        .filter(Boolean)
        .map((item) => ({ title: item.title, emoji: item.emoji }));

      if (routines.length === 0) return;

      await addSelectedAiRoutines(routines);
      navigate('/lived');
      return;
    }

    const routineIds = Array.from(selectedIds)
      .map(parseNumberKey)
      .filter((v): v is number => v !== null);

    if (routineIds.length === 0) return;

    await addSelectedCategroyRoutine(routineIds);
    navigate('/lived');
  };

  const emptyText = useMemo(() => {
    if (isAI) return 'AI 추천 루틴이 없어요.';
    return '카테고리 추천 루틴이 없어요.';
  }, [isAI]);

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
          onClick={() => changeTab('AI')}
          className={`${isAI ? 'typo-body_bold16 text-screen-0' : 'typo-body_reg16 text-gray-100'}`}
        >
          AI 맞춤 추천
        </div>

        <div
          role="button"
          onClick={() => changeTab('CATEGORY')}
          className={`${isCategory ? 'typo-body_bold16 text-screen-0' : 'typo-body_reg16 text-gray-100'}`}
        >
          카테고리 별 추천
        </div>
      </div>

      {/* 콘텐츠 영역 */}
      <div
        className={`relative w-full flex flex-col flex-1 overflow-y-auto rounded-t-2xl px-4 pt-6 bg-screen-0 ${isAI ? 'pb-41.5' : 'pb-25'}`}
      >
        {/* 로딩 */}
        {isAiLoading && (
          <div className="w-full py-10 text-center typo-body_reg14 text-gray-500">
            불러오는 중...
          </div>
        )}

        {/* AI */}
        {isAI && !isLoading && (
          <div className="flex flex-col gap-4 overflow-y-auto">
            {ai.length === 0 ? (
              <div className="w-full py-10 text-center typo-body_reg14 text-gray-500">
                {emptyText}
              </div>
            ) : (
              ai.map((item, index) => {
                const id = makeAiKey(index);
                const selected = selectedIds.has(id);

                return (
                  <div
                    key={id}
                    role="button"
                    onClick={() => toggleSelect(id)}
                    className="relative w-full flex flex-col px-2.5 py-5 gap-2 rounded-lg transition-colors bg-gray-50"
                  >
                    <div className="typo-body_reg16 text-gray-900">
                      {item.emoji ? `${item.emoji} ` : ''}
                      {item.title}
                    </div>

                    {!!item.baseRoutineTitle && (
                      <div className="typo-body_reg12 text-gray-700">
                        {item.baseRoutineTitle} 기반 추천
                      </div>
                    )}

                    {selected && (
                      <div className="absolute inset-0 bg-[#E9F4CC]/90 rounded-lg flex items-end justify-end p-2 transition-colors">
                        <CheckCircleIcon className="size-6 text-primary-50" />
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* CATEGORY */}
        {isCategory && !isLoading && (
          <div className="overflow-y-auto flex flex-col gap-6">
            {categories.length === 0 ? (
              <div className="w-full py-10 text-center typo-body_reg14 text-gray-500">
                {emptyText}
              </div>
            ) : (
              categories.map((category) => (
                <div
                  key={`${category.categoryName}-${category.categoryEmoji}`}
                  className="w-full flex flex-col gap-3"
                >
                  <span className="typo-body_bold18 text-gray-900">
                    {category.categoryEmoji} {category.categoryName}
                  </span>

                  <div className="max-w-full overflow-x-auto flex gap-2.5">
                    {category.routines.map((r) => {
                      const id = makeCatKey(r.routineId);
                      const selected = selectedIds.has(id);

                      return (
                        <div
                          key={id}
                          role="button"
                          onClick={() => toggleSelect(id)}
                          className="relative shrink-0 w-26.5 h-26.5 p-2 flex justify-center items-center rounded-lg typo-body_reg14 transition-colors bg-gray-50 text-gray-900 whitespace-pre-wrap break-keep text-center wrap-normal"
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
              ))
            )}
          </div>
        )}

        {/* 버튼 */}
        <div className="absolute bottom-0 left-0 right-0 px-4 flex flex-col gap-5 items-center justify-center pb-11 pt-2 bg-screen-0">
          {isAI && (
            <div
              className="flex gap-1.5 justify-center items-center px-6 py-3 bg-screen-0 border border-primary-50 rounded-4xl shadow-mini"
              onClick={() => fetchAi(true)}
            >
              <RefreshIcon className="w-4 h-4 text-primary-50" />
              <span className="typo-body_reg14 text-gray-900">
                새로운 추천 받기
              </span>
            </div>
          )}
          <div
            className={`w-full text-center py-3 rounded-4xl typo-body_bold16 transition-colors ${selectedCount === 0 ? 'bg-gray-100 text-gray-400' : 'bg-primary-50 text-screen-0'}`}
            onClick={handleSubmit}
          >
            {selectedCount}개 선택하기
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendPage;
