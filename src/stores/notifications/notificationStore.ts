import { create } from 'zustand';
import getNotifications from '@/services/notifications/getNotifications';
import type { ApiError } from '@/types/Api.types';
import type {
  NotificationItem,
  NotificationSettingsResult,
  PatchNotificationSettingsRequest,
} from '@/types/notifications/Notification.types';
import getNotificationSettings from '@/services/notifications/getNotificationSettings';
import patchNotification from '@/services/notifications/patchNotifications';
import patchNotificationSettings from '@/services/notifications/patchNotificationSettings';

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
  refetchSettings: () => Promise<void>;
  updateSettings: (patch: PatchNotificationSettingsRequest) => Promise<void>;

  toggleAll: () => Promise<void>;
  toggleRoutine: () => Promise<void>;
  toggleStatistics: () => Promise<void>;
  toggleMarketing: () => Promise<void>;
  toggleCommunity: () => Promise<void>;
  toggleComment: () => Promise<void>;
  toggleTrendingPost: () => Promise<void>;

  markRead: (id: number) => Promise<void>;
  markAllRead: () => Promise<void>;
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

  // 알림 설정 조회
  fetchSettings: async () => {
    const { hasFetchedSettings, isSettingsLoading } = get();
    if (hasFetchedSettings || isSettingsLoading) return;

    set({ isSettingsLoading: true, settingsError: null });

    try {
      const res = await getNotificationSettings();
      console.log(res);
      set({ settings: res, hasFetchedSettings: true });
    } catch (e) {
      set({ settingsError: e as ApiError });
    } finally {
      set({ isSettingsLoading: false });
    }
  },

  // 알림 설정 목록 재조회
  refetchSettings: async () => {
    const { isSettingsLoading } = get();
    if (isSettingsLoading) return;

    set({ isSettingsLoading: true, settingsError: null });

    try {
      const res = await getNotificationSettings();
      set({ settings: res, hasFetchedSettings: true });
    } catch (e) {
      set({ settingsError: e as ApiError });
    } finally {
      set({ isSettingsLoading: false });
    }
  },

  // 알림 설정 수정
  updateSettings: async (patch) => {
    const prev = get().settings;
    if (!prev) return;

    set({ settings: { ...prev, ...patch }, settingsError: null });

    try {
      await patchNotificationSettings(patch);
      await get().refetchSettings();
    } catch (e) {
      set({ settings: prev, settingsError: e as ApiError });
      throw e;
    }
  },

  // 알림 토글 관리
  toggleAll: async () => {
    const s = get().settings;
    if (!s) return;
    await get().updateSettings({ allEnabled: !s.allEnabled });
  },
  toggleRoutine: async () => {
    const s = get().settings;
    if (!s) return;
    await get().updateSettings({ routineEnabled: !s.routineEnabled });
  },
  toggleStatistics: async () => {
    const s = get().settings;
    if (!s) return;
    await get().updateSettings({ statsEnabled: !s.statsEnabled });
  },
  toggleMarketing: async () => {
    const s = get().settings;
    if (!s) return;
    await get().updateSettings({ marketingEnabled: !s.marketingEnabled });
  },
  toggleCommunity: async () => {
    const s = get().settings;
    if (!s) return;

    const next = !s.communityEnabled;

    if (next) {
      await get().updateSettings({
        communityEnabled: true,
        commentEnabled: true,
        hotPostEnabled: true,
      });
    } else {
      await get().updateSettings({
        communityEnabled: false,
        commentEnabled: false,
        hotPostEnabled: false,
      });
    }
  },
  toggleComment: async () => {
    const s = get().settings;
    if (!s) return;

    await get().updateSettings({ commentEnabled: !s.commentEnabled });

    const after = get().settings;
    if (!after) return;

    const shouldBe = after.commentEnabled && after.hotPostEnabled;
    if (after.communityEnabled !== shouldBe) {
      await get().updateSettings({ communityEnabled: shouldBe });
    }
  },
  toggleTrendingPost: async () => {
    const s = get().settings;
    if (!s) return;

    await get().updateSettings({ hotPostEnabled: !s.hotPostEnabled });

    const after = get().settings;
    if (!after) return;

    const shouldBe = after.commentEnabled && after.hotPostEnabled;
    if (after.communityEnabled !== shouldBe) {
      await get().updateSettings({ communityEnabled: shouldBe });
    }
  },

  // 알림 읽기
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

  // 모든 알림 읽기
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
