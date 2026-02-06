import AlarmIcon from '@/icons/AlarmIcon';
import CheckIcon from '@/icons/CheckIcon';
import DeleteIcon from '@/icons/DeleteIcon';
import useToast from '@/stores/toasts/baseToast';
import { useEffect, useState } from 'react';

const ToastPage = () => {
  const { isToastOpen, message, type } = useToast();
  const [fadeOut, setFadeOut] = useState(false);

  const iconMap = {
    check: <CheckIcon className="w-6 h-6 text-primary-50" />,
    alert: <AlarmIcon className="w-6 h-6 text-primary-20" />,
    delete: (
      <DeleteIcon
        className="w-6 h-6"
        primaryColor="#9FD416"
        secondaryColor="#E8F6C2"
      />
    ),
  };

  useEffect(() => {
    if (!isToastOpen) return;
    setFadeOut(false);

    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isToastOpen]);

  if (!isToastOpen) return null;

  return (
    <div
      className={`flex fixed bottom-25 left-0 right-0 justify-center transition-opacity duration-300 ease-in-out ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
    >
      <div className="max-w-125 w-full p-4">
        <div className="flex items-center bg-gray-700 rounded-lg px-4 py-3 gap-2.5">
          {iconMap[type]}
          <span className="typo-body-reg-14 text-screen-0">{message}</span>
        </div>
      </div>
    </div>
  );
};

export default ToastPage;
