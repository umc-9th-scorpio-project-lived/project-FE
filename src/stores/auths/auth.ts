import { create } from 'zustand';

type AuthState = {
  memberId: number | null;
  setMemberId: (id: number) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  memberId: null,
  setMemberId: (id) => set({ memberId: id }),
}));
