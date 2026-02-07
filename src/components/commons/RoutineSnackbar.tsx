import AlarmIcon from '@/icons/AlarmIcon';
import { useSnackbarStore } from '@/stores/homes/snackbarStore';
import { useEffect, useRef } from 'react';

const RoutineSnackbar = () => {
  const { open, durationMs, hide } = useSnackbarStore();
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!open) return;

    if (timerRef.current) window.clearTimeout(timerRef.current);

    timerRef.current = window.setTimeout(() => {
      hide();
      timerRef.current = null;
    }, durationMs);

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = null;
    };
  }, [open, durationMs, hide]);

  if (!open) return null;

  return (
    <div className="fixed left-0 right-0 bottom-28.5 z-9999 px-4">
      <div className="flex justify-start items-center gap-2.5 rounded-xl bg-gray-700 text-screen-0 px-4 py-3">
        <AlarmIcon className="size-6" />
        <span className="typo-body_reg14">
          미래의 날짜의 루틴은 완료할 수 없어요.
        </span>
      </div>
    </div>
  );
};

export default RoutineSnackbar;
