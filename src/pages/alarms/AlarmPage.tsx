import LeftChevronIcon from '@/icons/LeftChevronIcon';
import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, useMotionValue, animate } from 'framer-motion';
import { useNotificationStore } from '@/stores/notifications/notificationStore';
import type { NotificationItem } from '@/types/notifications/Notification.types';
import {
  formatTimeAgo,
  toNotificationTargetLabel,
} from '@/utils/notifications/notificationUtils';
import AlarmIcon from '@/icons/AlarmIcon';

type AlarmTab = 'ROUTINE' | 'COMMUNITY';
type CommunityCategory = 'ALL' | 'COMMENT' | 'TRENDING';

type AlarmLocationState = {
  initialTab?: AlarmTab;
};

const COMMUNITY_CATEGORIES: { label: string; value: CommunityCategory }[] = [
  { label: '전체', value: 'ALL' },
  { label: '댓글', value: 'COMMENT' },
  { label: '실시간 인기글', value: 'TRENDING' },
];

const REVEAL_PX = 80; // 오른쪽 버튼 노출 폭
const OPEN_THRESHOLD = 40; // 드래그 고정 기준

type Props = {
  children: React.ReactNode;
  onRead?: () => void;
  disabled?: boolean;
};

export const SwipeRow = ({ children, onRead, disabled = false }: Props) => {
  const x = useMotionValue(0);
  const isOpenRef = useRef(false);

  const snap = () => {
    if (disabled) {
      animate(x, 0, { type: 'spring', stiffness: 500, damping: 40 });
      isOpenRef.current = false;
      return;
    }

    const cur = x.get();
    const open = cur <= -OPEN_THRESHOLD;

    isOpenRef.current = open;
    animate(x, open ? -REVEAL_PX : 0, {
      type: 'spring',
      stiffness: 500,
      damping: 40,
    });
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div className="absolute inset-y-0 right-0 w-20 flex items-center justify-center bg-gray-100">
        <button
          className={`typo-body_reg14 text-gray-900 ${disabled ? 'opacity-40' : ''}`}
          disabled={disabled}
          onClick={() => {
            if (disabled) return;
            onRead?.();
            animate(x, 0, { type: 'spring', stiffness: 500, damping: 40 });
            isOpenRef.current = false;
          }}
        >
          읽음
        </button>
      </div>

      {/* 드래그 되는 부분 */}
      <motion.div
        className="relative bg-screen-0"
        style={{ x, touchAction: 'pan-y' }}
        drag={disabled ? false : 'x'}
        dragConstraints={{ left: -REVEAL_PX, right: 0 }}
        dragElastic={0.1}
        onDragEnd={snap}
        onPointerDown={() => {
          if (disabled) return;
          if (isOpenRef.current) {
            animate(x, 0, { type: 'spring', stiffness: 500, damping: 40 });
            isOpenRef.current = false;
          }
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

const AlarmPage = () => {
  const navigate = useNavigate();
  const location = useLocation() as { state?: AlarmLocationState };

  const { routine, community, fetchNotifications, markRead, markAllRead } =
    useNotificationStore();

  // 알람 페이지 탭 상태
  const [tab, setTab] = useState<AlarmTab>(
    () => location.state?.initialTab ?? 'ROUTINE'
  );

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const routineList = routine;

  const communityAll = community;
  const communityComments = community.filter((n) => n.target === 'COMMENT');
  const communityTrending = community.filter(
    (n) => n.target === 'COMMUNITY_HOT'
  );

  const handleClickNotification = (target: NotificationItem['target']) => {
    if (target === 'ROUTINE_TREE') {
      navigate('/lived/tree');
      return;
    }

    if (target === 'ROUTINE_REPORT') {
      navigate('/lived/tree/statistics');
      return;
    }

    if (
      target === 'COMMUNITY' ||
      target === 'COMMENT' ||
      target === 'COMMUNITY_HOT'
    ) {
      navigate('/lived/community/profile');
      return;
    }
  };

  // 커뮤니티 카테고리 상태
  const [selectedCategory, setSelectedCategory] =
    useState<CommunityCategory>('ALL');

  const handleChangeTab = (next: AlarmTab) => {
    setTab(next);
    if (next === 'COMMUNITY') setSelectedCategory('ALL');
  };

  const isRoutine = tab === 'ROUTINE';
  const isCommunity = tab === 'COMMUNITY';

  let list: NotificationItem[] = [];

  if (isRoutine) list = routineList;

  if (isCommunity) {
    if (selectedCategory === 'ALL') list = communityAll;
    if (selectedCategory === 'COMMENT') list = communityComments;
    if (selectedCategory === 'TRENDING') list = communityTrending;
  }

  return (
    <div className="w-full h-dvh pt-10">
      {/* 헤더 */}
      <div className="w-full py-2 px-4">
        <div className="relative flex w-full items-center justify-center">
          <LeftChevronIcon
            className="absolute left-0 w-7 h-7 text-gray-900"
            onClick={() => navigate(-1)}
          />
          <span className="typo-h2_bold20 text-gray-900">알림</span>
          <span
            className="absolute right-0 typo-body_reg12 text-gray-900"
            role="button"
            onClick={() => markAllRead()}
          >
            모두 읽음
          </span>
        </div>
      </div>
      {/* 탭 */}
      <div className="w-full flex">
        <div
          role="button"
          onClick={() => handleChangeTab('ROUTINE')}
          className={`w-1/2 py-2.5 text-center typo-body_bold18 ${
            isRoutine
              ? ' text-primary-50 border-b border-primary-50'
              : ' text-gray-400'
          }`}
        >
          루틴
        </div>

        <div
          role="button"
          onClick={() => handleChangeTab('COMMUNITY')}
          className={`w-1/2 py-2.5 text-center typo-body_bold18 ${
            isCommunity
              ? 'text-primary-50 border-b border-primary-50'
              : 'text-gray-400'
          }`}
        >
          커뮤니티
        </div>
      </div>

      {/* 커뮤니티 카테고리 chip */}
      {isCommunity && communityAll.length > 0 && (
        <div className="w-full flex gap-2 px-4 py-2.5">
          {COMMUNITY_CATEGORIES.map(({ label, value }) => {
            const active = selectedCategory === value;

            return (
              <div
                key={value}
                role="button"
                onClick={() => setSelectedCategory(value)}
                className={`typo-body_reg12 py-2 px-3 rounded-2xl transition-colors
            ${active ? 'bg-primary-50 text-screen-0' : 'bg-gray-50 text-gray-800'}
          `}
              >
                {label}
              </div>
            );
          })}
        </div>
      )}

      {/* 알림 리스트 */}
      <div className="flex flex-col w-full">
        {list.length === 0 && isRoutine ? (
          <div className="flex flex-col gap-7.5 w-full items-center justify-center px-4 pt-18.75">
            <AlarmIcon className="size-20" />
            <span className="typo-body_reg16 text-gray-900 text-center">
              아직 루틴 알람이 없어요.
              <br />
              <br />
              하나 만들어볼까요?
            </span>
          </div>
        ) : list.length === 0 && isCommunity ? (
          <div className="flex flex-col gap-7.5 w-full items-center justify-center px-4 pt-18.75">
            <AlarmIcon className="size-20" />
            <span className="typo-body_reg16 text-gray-900">
              아직 커뮤니티 알람이 없어요.
            </span>
          </div>
        ) : (
          list.map((item) => (
            <SwipeRow
              key={item.id}
              disabled={item.isRead}
              onRead={() => {
                void markRead(item.id);
              }}
            >
              <div
                className={`w-full flex p-4 gap-5 items-center ${item.isRead ? 'bg-none' : 'bg-primary-10'} ${item.target === 'ROUTINE_TREE' || item.target === 'ROUTINE_REPORT' ? 'cursor-pointer' : ''}`}
                onClick={() => handleClickNotification(item.target)}
              >
                {/* 아이콘 */}
                <div className="text-[28px]">{item.emoji}</div>

                {/* 내용 */}
                <div className="w-full flex flex-col gap-0.5">
                  <div className="w-full flex justify-between items-center typo-body_reg12 text-gray-300">
                    <span>{toNotificationTargetLabel(item.target)}</span>
                    <span>{formatTimeAgo(item.createdAt)}</span>
                  </div>

                  <div className="flex flex-col items-start justify-center text-gray-900">
                    <span className="typo-body_reg16">{item.title}</span>
                    <span className="typo-body_reg12">{item.content}</span>
                  </div>
                </div>
              </div>
            </SwipeRow>
          ))
        )}
      </div>
    </div>
  );
};

export default AlarmPage;
