import { create } from 'zustand';

type ToastType = 'check' | 'alert' | 'delete';
type ToastMessage =
  | string
  | {
      title: string;
      description?: string;
    };

interface ToastState {
  isToastOpen: boolean;
  message: ToastMessage;
  type: ToastType;
  showToast: (message: ToastMessage, type?: ToastType) => void;
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
