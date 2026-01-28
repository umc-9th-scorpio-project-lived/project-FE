import { create } from "zustand";

type Gender = "남성" | "여성" | "기타" | "";

type OnboardingState = {
  livingYear: string;
  gender: Gender;
  birth: string;
  concerns: string[];

  setConcerns: (concerns: string[]) => void;
  setLivingYear: (v: string) => void;
  setGender: (v: Gender) => void;
  setBirth: (v: string) => void;

  reset: () => void;
};

const useOnboardingStore = create<OnboardingState>((set) => ({
  livingYear: "",
  gender: "",
  birth: "",

  concerns: [],
  setConcerns: (concerns) => set({ concerns }),
  setLivingYear: (v) => set({ livingYear: v }),
  setGender: (v) => set({ gender: v }),
  setBirth: (v) => set({ birth: v }),

  reset: () => set({ livingYear: "", gender: "", birth: "20200101" }),
}));

export default useOnboardingStore;
