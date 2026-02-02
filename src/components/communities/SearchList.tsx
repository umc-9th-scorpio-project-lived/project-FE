import ClockIcon from '@/icons/ClockIcon';
import CloseIcon from '@/icons/CloseIcon';
import {
  deleteAllSearch,
  deleteSearch,
  getSearchHistory,
} from '@/services/posts/search';
import useBaseModal from '@/stores/modals/baseModal';
import type { SearchHistory } from '@/types/communities/Search.types';
import { useEffect, useState } from 'react';

type SearchListProps = {
  onSelectedKeyword?: (keyword: string) => void;
};

const SearchList = ({ onSelectedKeyword }: SearchListProps) => {
  const { openModal } = useBaseModal();

  const [histories, setHistories] = useState<SearchHistory[]>([]);
  const fetchHistories = async () => {
    try {
      const res = await getSearchHistory();
      setHistories(res.histories);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchHistories();
  }, []);

  // 검색어 전체 삭제
  const handleClear = async () => {
    try {
      await deleteAllSearch();
      setHistories([]);
    } catch (e) {
      console.error(e);
    }
  };

  // 해당 검색어만 삭제
  const handleDelete = async (historyId: number) => {
    try {
      await deleteSearch(historyId);
      setHistories((prev) =>
        prev.filter((item) => item.historyId !== historyId)
      );
    } catch (e) {
      console.error(e);
    }
  };

  if (histories.length === 0) {
    return (
      <div className="flex w-full items-center justify-center mt-6 typo-body_reg16 text-gray-400">
        최근 검색어가 없습니다.
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-2.5 p-2.5">
        <div className="flex px-4 justify-between">
          <span className="typo-body_reg12 text-gray-600">최근 검색</span>
          <span
            className="typo-body_reg12 text-gray-600"
            onClick={() =>
              openModal('searchDeleteModal', {
                position: 'center',
                onConfirm: handleClear,
              })
            }
          >
            검색어 전체 삭제
          </span>
        </div>
        <div className="flex flex-col gap-5 px-3.5">
          {histories.map((item) => (
            <div
              key={item.historyId}
              className="flex justify-between items-center"
            >
              <div
                className="flex gap-2 items-center"
                onClick={() => onSelectedKeyword?.(item.keyword)}
              >
                <ClockIcon className="w-3 h-3" />
                <span className="typo-body_reg16 text-gray-700">
                  {item.keyword}
                </span>
              </div>
              <CloseIcon
                className="w-4 h-4 cursor-pointer"
                onClick={() => handleDelete(item.historyId)}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchList;
