import { create } from 'zustand';
import type { ApiError } from '@/types/Api.types';
import type { SignupRequest, SignupResult } from '@/types/auths/Auth.types';
import signup from '@/services/auths/socialSignup';

type SignupState = {
  isSigningUp: boolean;
  signupError: ApiError | null;
  signupAction: (body: SignupRequest) => Promise<SignupResult | null>;
};

export const useSignupStore = create<SignupState>((set) => ({
  isSigningUp: false,
  signupError: null,

  signupAction: async (body) => {
    set({ isSigningUp: true, signupError: null });
    try {
      const res = await signup(body);
      set({ isSigningUp: false });
      return res;
    } catch (e) {
      set({ isSigningUp: false, signupError: e as ApiError });
      return null;
    }
  },
}));
