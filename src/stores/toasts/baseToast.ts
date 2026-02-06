import { create } from 'zustand';

type ToastType = 'check' | 'alert' | 'delete';

interface ToastState {
  isToastOpen: boolean;
  message: string;
  type: ToastType;
  showToast: (message: string, type?: ToastType) => void;
}

const useToast = create<ToastState>((set) => ({
  isToastOpen: false,
  message: '',
  type: 'check',

  showToast: (message, type = 'check') => {
    set({ isToastOpen: true, message, type });

    setTimeout(() => {
      set({ isToastOpen: false });
    }, 3000);
  },
}));

export default useToast;
