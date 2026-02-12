import Toggle from '@/components/users/Toggle';
import LeftChevronIcon from '@/icons/LeftChevronIcon';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useNotificationStore } from '@/stores/notifications/notificationStore';

const NotificationsPage = () => {
  const navigate = useNavigate();

  const settings = useNotificationStore((s) => s.settings);
  const fetchSettings = useNotificationStore((s) => s.fetchSettings);

  const toggleAll = useNotificationStore((s) => s.toggleAll);
  const toggleRoutine = useNotificationStore((s) => s.toggleRoutine);
  const toggleStatistics = useNotificationStore((s) => s.toggleStatistics);
  const toggleCommunity = useNotificationStore((s) => s.toggleCommunity);
  const toggleComment = useNotificationStore((s) => s.toggleComment);
  const toggleTrendingPost = useNotificationStore((s) => s.toggleTrendingPost);
  const toggleMarketing = useNotificationStore((s) => s.toggleMarketing);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const allEnabled = settings?.allEnabled ?? false;
  const routineEnabled = settings?.routineEnabled ?? false;
  const statisticsEnabled = settings?.statsEnabled ?? false;
  const communityEnabled = settings?.communityEnabled ?? false;
  const commentEnabled = settings?.commentEnabled ?? false;
  const trendingPostEnabled = settings?.hotPostEnabled ?? false;
  const marketingEnabled = settings?.marketingEnabled ?? false;

  return (
    <div className="w-full h-full flex flex-col gap-5.5 overflow-y-auto overflow-x-hidden">
      <div className="flex justify-center items-center pt-10 px-4 relative">
        <button
          onClick={() => navigate('/lived/my')}
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
            <Toggle checked={allEnabled} handleToggle={toggleAll} />
          </div>
        </div>

        <div className="flex justify-between items-center py-1.5">
          <span className="typo-body_bold14 text-gray-900">루틴 알림</span>
          <div className="px-1">
            <Toggle checked={routineEnabled} handleToggle={toggleRoutine} />
          </div>
        </div>

        <div className="flex justify-between items-center py-1.5">
          <span className="typo-body_bold14 text-gray-900">통계 분석 알림</span>
          <div className="px-1">
            <Toggle
              checked={statisticsEnabled}
              handleToggle={toggleStatistics}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center py-1.5">
            <span className="typo-body_bold14 text-gray-900">
              커뮤니티 알림
            </span>
            <div className="px-1">
              <Toggle
                checked={communityEnabled}
                handleToggle={toggleCommunity}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 pl-14">
            <div className="flex justify-between items-center py-1.5">
              <span className="typo-body_bold14 text-gray-900">댓글 알림</span>
              <div className="px-1">
                <Toggle checked={commentEnabled} handleToggle={toggleComment} />
              </div>
            </div>

            <div className="flex justify-between items-center py-1.5">
              <span className="typo-body_bold14 text-gray-900">
                실시간 인기글 알림
              </span>
              <div className="px-1">
                <Toggle
                  checked={trendingPostEnabled}
                  handleToggle={toggleTrendingPost}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center py-1.5">
          <span className="typo-body_bold14 text-gray-900">
            마케팅 정보 알림
          </span>
          <div className="px-1">
            <Toggle checked={marketingEnabled} handleToggle={toggleMarketing} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
