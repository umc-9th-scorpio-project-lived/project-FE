import { create } from 'zustand';
import type { FriendsData } from '@/types/friends/Friends.types';
import { getFriendsData } from '@/services/friends/getFriendsData';

type FriendsState = {
  data: FriendsData | null;
  isLoading: boolean;
  error: unknown | null;

  selectedIds: number[];

  fetchFriends: (name?: string) => Promise<void>;
  toggleSelected: (memberId: number) => void;
  setSelectedIds: (ids: number[]) => void;
  clearSelected: () => void;
};

export const useFriendsStore = create<FriendsState>((set, get) => ({
  data: null,
  isLoading: false,
  error: null,

  selectedIds: [],

  fetchFriends: async (name) => {
    set({ isLoading: true, error: null });
    try {
      const data = await getFriendsData(name);
      set({ data, isLoading: false });
    } catch (e) {
      set({ error: e, isLoading: false });
    }
  },

  toggleSelected: (memberId) => {
    const { selectedIds } = get();
    const has = selectedIds.includes(memberId);
    set({
      selectedIds: has
        ? selectedIds.filter((id) => id !== memberId)
        : [...selectedIds, memberId],
    });
  },

  setSelectedIds: (ids) => set({ selectedIds: ids }),
  clearSelected: () => set({ selectedIds: [] }),
}));
