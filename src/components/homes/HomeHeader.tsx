import { useHomeDateStore } from '@/stores/homes/homeStore';
import SlideCalendar from './SlideCalendar';
import useBaseModal from '@/stores/modals/baseModal';
import {
  formatDate,
  getWeekStartDate,
  isSameDay,
  normalizeDate,
} from '@/utils/homes/homeUtils';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import getHomeRoutine from '@/services/routines/getHomeRoutine';
import { useRoutineStore } from '@/stores/routines/routineStore';
import { useNotificationStore } from '@/stores/notifications/notificationStore';

const HomeHeader = () => {
  const { selectedDate, weekStartDate, resetToToday } = useHomeDateStore();
  const { data, setHomeRoutine } = useRoutineStore();
  const hasUnreadAlarm = useNotificationStore((s) =>
    [...s.routine, ...s.community].some((n) => !n.isRead)
  );
  const { openModal } = useBaseModal();
  const navigate = useNavigate();

  const todayDate = normalizeDate(new Date());
  const todayWeekStartDate = getWeekStartDate(todayDate);

  const isSelectedToday = isSameDay(selectedDate, todayDate);
  const isViewingCurrentWeek = isSameDay(weekStartDate, todayWeekStartDate);

  useEffect(() => {
    const date = formatDate(selectedDate);

    getHomeRoutine(date).then((result) => {
      setHomeRoutine(result);
    });
  }, [selectedDate, setHomeRoutine]);

  return (
    <div className="w-full flex flex-col gap-5 px-4 pt-10 rounded-b-lg shadow-soft bg-screen-0">
      <div className="flex flex-col gap-1.25">
        <div className="flex justify-between h-10 items-center">
          <div className="text-[22px] font-normal">{data?.dateTitle}</div>
          <div
            className={`h-6 w-6 ${hasUnreadAlarm ? 'bg-active-alarm' : 'bg-alarm'}`}
            onClick={() =>
              navigate('/lived/alarm', { state: { initialTab: 'ROUTINE' } })
            }
          />
        </div>

        <div className="flex justify-between items-center h-10">
          <div className="flex justify-start items-center gap-1">
            <div
              className="bg-calender h-6 w-6"
              role="button"
              onClick={() =>
                openModal('selectDateModal', { position: 'bottom' })
              }
            />
            <div className="typo-body_reg16">{data?.fullDate}</div>
          </div>

          {!(isSelectedToday && isViewingCurrentWeek) && (
            <div
              role="button"
              onClick={resetToToday}
              className="w-14 flex justify-center items-center typo-body_reg12 text-gray-900 bg-gray-100 rounded-2xl px-2.5 py-1.5"
            >
              오늘
            </div>
          )}
        </div>
      </div>

      <div>
        <SlideCalendar />
      </div>
    </div>
  );
};

export default HomeHeader;
