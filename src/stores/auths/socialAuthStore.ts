import { create } from 'zustand';

export type SocialProvider = 'KAKAO' | 'GOOGLE';

type SocialAuthState = {
  socialId: string;
  provider: SocialProvider | '';
  name: string;

  setSocialAuth: (v: {
    socialId: string;
    provider: SocialProvider;
    name: string;
  }) => void;
  resetSocialAuth: () => void;
};

export const useSocialAuthStore = create<SocialAuthState>((set) => ({
  socialId: '',
  provider: '',
  name: '',

  setSocialAuth: ({ socialId, provider, name }) =>
    set({ socialId, provider, name }),
  resetSocialAuth: () => set({ socialId: '', provider: '', name: '' }),
}));
