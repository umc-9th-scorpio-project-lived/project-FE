import { create } from 'zustand';
import getNotifications from '@/services/notifications/getNotifications';
import type { ApiError } from '@/types/Api.types';
import type { NotificationItem } from '@/types/notifications/Notification.types';

type NotificationState = {
  routine: NotificationItem[];
  community: NotificationItem[];

  isLoading: boolean;
  error: ApiError | null;
  hasFetched: boolean;

  fetchNotifications: () => Promise<void>;
  clear: () => void;

  // 로컬 읽음 처리 (임시)
  markReadLocal: (id: number) => void;
  markAllReadLocal: () => void;
};

export const useNotificationStore = create<NotificationState>((set, get) => ({
  routine: [],
  community: [],

  isLoading: false,
  error: null,
  hasFetched: false,

  // 알림 목록 조회
  fetchNotifications: async () => {
    const { hasFetched, isLoading } = get();
    if (hasFetched || isLoading) return;

    set({ isLoading: true, error: null });

    try {
      const [routineRes, communityRes] = await Promise.all([
        getNotifications('ROUTINE'),
        getNotifications('COMMUNITY'),
      ]);

      set({
        routine: routineRes.result ?? [],
        community: communityRes.result ?? [],
        hasFetched: true,
      });
    } catch (e) {
      set({
        error: e as ApiError,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  clear: () =>
    set({
      routine: [],
      community: [],
      isLoading: false,
      error: null,
      hasFetched: false,
    }),

  // 읽음 처리 API 확인 후 수정 예정
  markReadLocal: (id) => {
    const { routine, community } = get();

    const mark = (list: NotificationItem[]) =>
      list.map((n) => (n.id === id ? { ...n, isRead: true } : n));

    set({
      routine: mark(routine),
      community: mark(community),
    });
  },

  // 읽음 처리 API 확인 후 수정 예정
  markAllReadLocal: () => {
    const { routine, community } = get();

    const markAll = (list: NotificationItem[]) =>
      list.map((n) => ({ ...n, isRead: true }));

    set({
      routine: markAll(routine),
      community: markAll(community),
    });
  },
}));
