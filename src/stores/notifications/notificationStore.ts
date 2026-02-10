import { create } from 'zustand';
import getNotifications from '@/services/notifications/getNotifications';
import type { ApiError } from '@/types/Api.types';
import type {
  NotificationItem,
  NotificationSettingsResult,
  PatchNotificationSettingsRequest,
} from '@/types/notifications/Notification.types';
import patchNotificationSettings from '@/services/notifications/patchNotificationSettings';
// import { normalizeSettings } from '@/utils/notifications/notificationUtils';
import getNotificationSettings from '@/services/notifications/getNotificationSettings';
import patchNotification from '@/services/notifications/patchNotifications';

type LeafSettings = Pick<
  PatchNotificationSettingsRequest,
  | 'routineEnabled'
  | 'statsEnabled'
  | 'commentEnabled'
  | 'hotPostEnabled'
  | 'marketingEnabled'
>;

const pickLeaf = (s: NotificationSettingsResult): LeafSettings => ({
  routineEnabled: s.routineEnabled,
  statsEnabled: s.statsEnabled,
  commentEnabled: s.commentEnabled,
  hotPostEnabled: s.hotPostEnabled,
  marketingEnabled: s.marketingEnabled,
});

const getDerived = (s: LeafSettings) => {
  const communityEnabled = s.commentEnabled && s.hotPostEnabled;
  const allEnabled =
    s.routineEnabled &&
    s.statsEnabled &&
    s.marketingEnabled &&
    s.commentEnabled &&
    s.hotPostEnabled;

  return { communityEnabled, allEnabled };
};

const toPatchPayload = (s: LeafSettings): PatchNotificationSettingsRequest => ({
  ...s,
  ...getDerived(s),
});

type NotificationState = {
  routine: NotificationItem[];
  community: NotificationItem[];

  isLoading: boolean;
  error: ApiError | null;
  hasFetched: boolean;

  settingsLeaf: LeafSettings | null;
  isSettingsLoading: boolean;
  settingsError: ApiError | null;
  hasFetchedSettings: boolean;

  allEnabled: () => boolean;
  communityEnabled: () => boolean;

  fetchNotifications: () => Promise<void>;
  clear: () => void;

  fetchSettings: () => Promise<void>;
  updateLeafSettings: (patch: Partial<LeafSettings>) => Promise<void>;

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

  settingsLeaf: null,
  isSettingsLoading: false,
  settingsError: null,
  hasFetchedSettings: false,

  allEnabled: () => {
    const s = get().settingsLeaf;
    return s ? getDerived(s).allEnabled : false;
  },
  communityEnabled: () => {
    const s = get().settingsLeaf;
    return s ? getDerived(s).communityEnabled : false;
  },

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
        settingsLeaf: pickLeaf(res),
        hasFetchedSettings: true,
      });
    } catch (e) {
      set({ settingsError: e as ApiError });
    } finally {
      set({ isSettingsLoading: false });
    }
  },

  updateLeafSettings: async (patch) => {
    const prev = get().settingsLeaf;
    if (!prev) return;

    const nextLeaf: LeafSettings = { ...prev, ...patch };
    set({ settingsLeaf: nextLeaf, settingsError: null });

    try {
      const payload = toPatchPayload(nextLeaf);
      const res = await patchNotificationSettings(payload);
      set({ settingsLeaf: pickLeaf(res) });
    } catch (e) {
      set({ settingsLeaf: prev, settingsError: e as ApiError });
      throw e;
    }
  },

  // updateSettings: async (next) => {
  //   const prev = get().settings;

  //   const normalized = normalizeSettings(next);

  //   set({ settings: normalized, settingsError: null });

  //   try {
  //     const res = await patchNotificationSettings(normalized);
  //     set({ settings: res });
  //   } catch (e) {
  //     set({ settings: prev ?? null, settingsError: e as ApiError });
  //     throw e;
  //   }
  // },

  toggleAll: async () => {
    const s = get().settingsLeaf;
    if (!s) return;

    const nextValue = !getDerived(s).allEnabled;

    await get().updateLeafSettings({
      routineEnabled: nextValue,
      statsEnabled: nextValue,
      commentEnabled: nextValue,
      hotPostEnabled: nextValue,
      marketingEnabled: nextValue,
    });
  },

  toggleRoutine: async () => {
    const s = get().settingsLeaf;
    if (!s) return;
    await get().updateLeafSettings({ routineEnabled: !s.routineEnabled });
  },

  toggleStatistics: async () => {
    const s = get().settingsLeaf;
    if (!s) return;
    await get().updateLeafSettings({ statsEnabled: !s.statsEnabled });
  },

  toggleMarketing: async () => {
    const s = get().settingsLeaf;
    if (!s) return;
    await get().updateLeafSettings({ marketingEnabled: !s.marketingEnabled });
  },

  toggleCommunity: async () => {
    const s = get().settingsLeaf;
    if (!s) return;

    const nextValue = !getDerived(s).communityEnabled;

    await get().updateLeafSettings({
      commentEnabled: nextValue,
      hotPostEnabled: nextValue,
    });
  },

  toggleComment: async () => {
    const s = get().settingsLeaf;
    if (!s) return;
    await get().updateLeafSettings({ commentEnabled: !s.commentEnabled });
  },

  toggleTrendingPost: async () => {
    const s = get().settingsLeaf;
    if (!s) return;
    await get().updateLeafSettings({ hotPostEnabled: !s.hotPostEnabled });
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
