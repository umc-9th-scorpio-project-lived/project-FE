import LeftChevronIcon from '@/icons/LeftChevronIcon';
import { useMemberStore } from '@/stores/members/memberStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NoticePage = () => {
  const navigate = useNavigate();

  const { announcementList, isLoading, fetchAnnouncements } = useMemberStore();

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  return (
    <div className="w-full h-full flex flex-col gap-5.5 overflow-y-auto overflow-x-hidden">
      <div className="flex justify-center items-center pt-10 px-4 relative">
        <button
          onClick={() => navigate('/lived/my')}
          className="flex justify-center items-center absolute left-4 cursor-pointer"
        >
          <LeftChevronIcon className="w-7 h-7 text-gray-900" />
        </button>
        <span className="typo-h2_reg20 text-gray-900">공지사항</span>
      </div>

      {isLoading ? (
        <div className="px-5 py-2.5">로딩중...</div>
      ) : announcementList.length === 0 ? (
        <div className="px-5 py-6 text-center typo-body_reg14 text-gray-400">
          아직 등록된 공지사항이 없습니다.
        </div>
      ) : (
        announcementList.map((n, idx) => (
          <div
            key={n.id}
            className={`w-full border-b-[0.5px] border-gray-200 px-5 py-2.5 flex flex-col gap-1 ${idx === 0 ? 'border-t-[0.5px]' : ''}`}
          >
            <span className="typo-body_bold14 text-gray-900">{n.title}</span>
            <span className="typo-body_reg14 text-gray-400">
              {new Date(n.createdAt)
                .toLocaleDateString('ko-KR')
                .replaceAll('. ', '.')
                .replace(/\.$/, '')}
            </span>
          </div>
        ))
      )}
    </div>
  );
};

export default NoticePage;
