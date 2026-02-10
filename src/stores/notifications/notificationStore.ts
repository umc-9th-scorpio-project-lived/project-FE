import { create } from 'zustand';
import getNotifications from '@/services/notifications/getNotifications';
import type { ApiError } from '@/types/Api.types';
import type {
  NotificationItem,
  NotificationSettingsResult,
  PatchNotificationSettingsRequest,
} from '@/types/notifications/Notification.types';
import patchNotificationSettings from '@/services/notifications/patchNotificationSettings';
import { normalizeSettings } from '@/utils/notifications/notificationUtils';
import getNotificationSettings from '@/services/notifications/getNotificationSettings';
import patchNotification from '@/services/notifications/patchNotifications';

type NotificationState = {
  routine: NotificationItem[];
  community: NotificationItem[];

  isLoading: boolean;
  error: ApiError | null;
  hasFetched: boolean;

  settings: NotificationSettingsResult | null;
  isSettingsLoading: boolean;
  settingsError: ApiError | null;
  hasFetchedSettings: boolean;

  fetchNotifications: () => Promise<void>;
  clear: () => void;

  fetchSettings: () => Promise<void>;
  updateSettings: (next: PatchNotificationSettingsRequest) => Promise<void>;

  toggleAll: () => Promise<void>;
  toggleRoutine: () => Promise<void>;
  toggleStatistics: () => Promise<void>;
  toggleMarketing: () => Promise<void>;
  toggleCommunity: () => Promise<void>;
  toggleComment: () => Promise<void>;
  toggleTrendingPost: () => Promise<void>;

  markRead: (id: number) => Promise<void>;
  markAllRead: () => Promise<void>; // 일단 로컬만 (API 나오면 교체)
};

export const useNotificationStore = create<NotificationState>((set, get) => ({
  routine: [],
  community: [],

  isLoading: false,
  error: null,
  hasFetched: false,

  settings: null,
  isSettingsLoading: false,
  settingsError: null,
  hasFetchedSettings: false,

  // 알림 목록 조회
  fetchNotifications: async () => {
    const { hasFetched, isLoading } = get();
    if (hasFetched || isLoading) return;

    set({ isLoading: true, error: null });

    try {
      const [
        routineAlarm,
        routineReport,
        routineTree,
        community,
        comment,
        communityHot,
      ] = await Promise.all([
        getNotifications('ROUTINE_ALARM'),
        getNotifications('ROUTINE_REPORT'),
        getNotifications('ROUTINE_TREE'),
        getNotifications('COMMUNITY'),
        getNotifications('COMMENT'),
        getNotifications('COMMUNITY_HOT'),
      ]);

      const routineList = [
        ...(routineAlarm.result ?? []),
        ...(routineReport.result ?? []),
        ...(routineTree.result ?? []),
      ];

      const communityList = [
        ...(community.result ?? []),
        ...(comment.result ?? []),
        ...(communityHot.result ?? []),
      ];

      set({
        routine: routineList,
        community: communityList,
        hasFetched: true,
      });
    } catch (e) {
      set({ error: e as ApiError });
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

  fetchSettings: async () => {
    const { hasFetchedSettings, isSettingsLoading } = get();
    if (hasFetchedSettings || isSettingsLoading) return;

    set({ isSettingsLoading: true, settingsError: null });

    try {
      const res = await getNotificationSettings();
      set({
        settings: res,
        hasFetchedSettings: true,
      });
    } catch (e) {
      set({ settingsError: e as ApiError });
    } finally {
      set({ isSettingsLoading: false });
    }
  },

  updateSettings: async (next) => {
    const prev = get().settings;

    const normalized = normalizeSettings(next);

    set({ settings: normalized, settingsError: null });

    try {
      const res = await patchNotificationSettings(normalized);
      set({ settings: res });
    } catch (e) {
      set({ settings: prev ?? null, settingsError: e as ApiError });
      throw e;
    }
  },

  toggleAll: async () => {
    const s = get().settings;
    if (!s) return;

    const nextValue = !s.allEnabled;

    await get().updateSettings({
      allEnabled: nextValue,
      routineEnabled: nextValue,
      statsEnabled: nextValue,
      communityEnabled: nextValue,
      hotPostEnabled: nextValue,
      commentEnabled: nextValue,
      marketingEnabled: nextValue,
    });
  },

  toggleRoutine: async () => {
    const s = get().settings;
    if (!s) return;

    await get().updateSettings({ ...s, routineEnabled: !s.routineEnabled });
  },

  toggleStatistics: async () => {
    const s = get().settings;
    if (!s) return;

    await get().updateSettings({
      ...s,
      statsEnabled: !s.statsEnabled,
    });
  },

  toggleMarketing: async () => {
    const s = get().settings;
    if (!s) return;

    await get().updateSettings({ ...s, marketingEnabled: !s.marketingEnabled });
  },

  toggleCommunity: async () => {
    const s = get().settings;
    if (!s) return;

    const nextValue = !s.communityEnabled;

    await get().updateSettings({
      ...s,
      communityEnabled: nextValue,
      commentEnabled: nextValue,
      hotPostEnabled: nextValue,
    });
  },

  toggleComment: async () => {
    const s = get().settings;
    if (!s) return;

    await get().updateSettings({ ...s, commentEnabled: !s.commentEnabled });
  },

  toggleTrendingPost: async () => {
    const s = get().settings;
    if (!s) return;

    await get().updateSettings({
      ...s,
      hotPostEnabled: !s.hotPostEnabled,
    });
  },

  markRead: async (id) => {
    const { routine, community } = get();

    const mark = (list: NotificationItem[]) =>
      list.map((n) => (n.id === id ? { ...n, isRead: true } : n));

    set({
      routine: mark(routine),
      community: mark(community),
    });

    try {
      await patchNotification(id);
    } catch (e) {
      set({ routine, community, error: e as ApiError });
      throw e;
    }
  },

  markAllRead: async () => {
    const prevRoutine = get().routine;
    const prevCommunity = get().community;

    const markAll = (list: NotificationItem[]) =>
      list.map((n) => ({ ...n, isRead: true }));

    set({
      routine: markAll(prevRoutine),
      community: markAll(prevCommunity),
      error: null,
    });

    const ids = [...prevRoutine, ...prevCommunity]
      .filter((n) => !n.isRead)
      .map((n) => n.id);

    if (ids.length === 0) return;

    // 동시 요청 제한 개수
    const CONCURRENCY = 10;

    try {
      for (let i = 0; i < ids.length; i += CONCURRENCY) {
        const chunk = ids.slice(i, i + CONCURRENCY);
        await Promise.all(chunk.map((id) => patchNotification(id)));
      }
    } catch (e) {
      set({
        routine: prevRoutine,
        community: prevCommunity,
        error: e as ApiError,
      });
      throw e;
    }
  },
}));
