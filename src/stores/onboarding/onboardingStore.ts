import { create } from 'zustand';

type Gender = '남성' | '여성' | '기타' | '';

type OnboardingState = {
  livingYear: string;
  gender: Gender;
  birth: string;

  concerns: number[];
  routineIds: number[];
  notificationStatus: 1 | 2 | 0;

  setConcerns: (concerns: number[]) => void;
  setRoutineIds: (ids: number[]) => void;
  setNotificationStatus: (v: 1 | 2) => void;

  setLivingYear: (v: string) => void;
  setGender: (v: Gender) => void;
  setBirth: (v: string) => void;

  reset: () => void;
};

const useOnboardingStore = create<OnboardingState>((set) => ({
  livingYear: '',
  gender: '',
  birth: '',

  concerns: [],
  routineIds: [],
  notificationStatus: 0,

  setConcerns: (concerns) => set({ concerns }),
  setRoutineIds: (ids) => set({ routineIds: ids }),
  setNotificationStatus: (v) => set({ notificationStatus: v }),

  setLivingYear: (v) => set({ livingYear: v }),
  setGender: (v) => set({ gender: v }),
  setBirth: (v) => set({ birth: v }),

  reset: () =>
    set({
      livingYear: '',
      gender: '',
      birth: '',
      concerns: [],
      routineIds: [],
      notificationStatus: 0,
    }),
}));

export default useOnboardingStore;
