import { create } from 'zustand';

export type SocialProvider = 'KAKAO' | 'GOOGLE';

type SocialAuthState = {
  socialId: string;
  provider: SocialProvider | '';
  name: string;
  email: string;

  setSocialAuth: (v: {
    socialId: string;
    provider: SocialProvider;
    name: string;
    email: string;
  }) => void;
  resetSocialAuth: () => void;
};

export const useSocialAuthStore = create<SocialAuthState>((set) => ({
  socialId: '',
  provider: '',
  name: '',
  email: '',

  setSocialAuth: ({ socialId, provider, name, email }) =>
    set({ socialId, provider, name, email }),
  resetSocialAuth: () =>
    set({ socialId: '', provider: '', name: '', email: '' }),
}));
