import { create } from 'zustand';
import type { ApiError } from '@/types/Api.types';
import type {
  AnnouncementItem,
  BlockMember,
  VisibilityTreeResult,
  PatchVisibilityTreeRequest,
  UserProfileResult,
} from '@/types/members/Member.types';
import getAnnouncements from '@/services/members/getAnnouncements';
import unblockMember from '@/services/members/unblockMember';
import getBlockMembers from '@/services/members/getBlockMembers';
import getVisibilityTree from '@/services/members/getVisibilityTree';
import patchVisibilityTree from '@/services/members/patchVisibilityTree';
import getUserProfile from '@/services/members/getUserProfile';

type MemberState = {
  announcementList: AnnouncementItem[];

  blockedMembers: BlockMember[];
  blockedHasNext: boolean;
  blockedNextCursor: number | null;

  treeVisibility: VisibilityTreeResult | null;

  userProfile: UserProfileResult | null;

  isLoading: boolean;
  error: ApiError | null;

  fetchAnnouncements: () => Promise<void>;

  fetchBlockedMembers: (cursor?: number | null) => Promise<void>;
  unblock: (blockedMemberId: number) => Promise<void>;

  fetchTreeVisibility: () => Promise<void>;
  updateTreeVisibility: (body: PatchVisibilityTreeRequest) => Promise<void>;

  fetchUserProfile: () => Promise<void>;

  clear: () => void;
};

export const useMemberStore = create<MemberState>((set, get) => ({
  announcementList: [],

  blockedMembers: [],
  blockedHasNext: false,
  blockedNextCursor: null,

  treeVisibility: null,

  userProfile: null,

  isLoading: false,
  error: null,

  fetchAnnouncements: async () => {
    set({ isLoading: true, error: null });

    try {
      const res = await getAnnouncements();
      set({ announcementList: res.announcementList, isLoading: false });
    } catch (err) {
      set({ error: err as ApiError, isLoading: false });
    }
  },

  // 차단 목록 조회
  fetchBlockedMembers: async (cursor) => {
    set({ isLoading: true, error: null });

    try {
      const res = await getBlockMembers();

      const isFirst = cursor == null;

      set((state) => ({
        blockedMembers: isFirst
          ? res.content
          : [...state.blockedMembers, ...res.content],
        blockedHasNext: res.hasNext,
        blockedNextCursor: res.nextCursor,
        isLoading: false,
      }));
    } catch (err) {
      set({ error: err as ApiError, isLoading: false });
    }
  },

  // 차단 해제
  unblock: async (blockedMemberId) => {
    const prev = get().blockedMembers;

    set({
      blockedMembers: prev.filter((m) => m.memberId !== blockedMemberId),
      error: null,
    });

    try {
      await unblockMember(blockedMemberId);
    } catch (err) {
      set({ blockedMembers: prev, error: err as ApiError });
      throw err;
    }
  },

  fetchTreeVisibility: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await getVisibilityTree();
      set({ treeVisibility: res, isLoading: false });
    } catch (err) {
      set({ error: err as ApiError, isLoading: false });
    }
  },

  updateTreeVisibility: async (body) => {
    set({ isLoading: true, error: null });

    try {
      const res = await patchVisibilityTree(body);
      set({ treeVisibility: res, isLoading: false });
    } catch (err) {
      set({ error: err as ApiError, isLoading: false });
      throw err;
    }
  },

  fetchUserProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await getUserProfile();
      set({ userProfile: res, isLoading: false });
    } catch (err) {
      set({ error: err as ApiError, isLoading: false });
    }
  },

  clear: () => set({ announcementList: [], isLoading: false, error: null }),
}));
