import AlarmIcon from '@/icons/AlarmIcon';
import { useSnackbarStore } from '@/stores/homes/snackbarStore';
import { useEffect, useRef, useState } from 'react';

const FADE_OUT_DURATION_MS = 300;

const RoutineSnackbar = () => {
  const { open, durationMs, hide } = useSnackbarStore();

  const [visible, setVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const hideTimerRef = useRef<number | null>(null);
  const fadeTimerRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!open) {
      setVisible(false);
      setFadeOut(false);

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (fadeTimerRef.current) window.clearTimeout(fadeTimerRef.current);
      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);

      rafRef.current = null;
      fadeTimerRef.current = null;
      hideTimerRef.current = null;
      return;
    }

    setFadeOut(false);
    setVisible(false);

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setVisible(true);
      rafRef.current = null;
    });

    if (fadeTimerRef.current) window.clearTimeout(fadeTimerRef.current);
    if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);

    const fadeStartMs = Math.max(0, durationMs - FADE_OUT_DURATION_MS);

    fadeTimerRef.current = window.setTimeout(() => {
      setFadeOut(true);
      fadeTimerRef.current = null;
    }, fadeStartMs);

    hideTimerRef.current = window.setTimeout(() => {
      hide();
      hideTimerRef.current = null;
    }, durationMs);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (fadeTimerRef.current) window.clearTimeout(fadeTimerRef.current);
      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);

      rafRef.current = null;
      fadeTimerRef.current = null;
      hideTimerRef.current = null;
    };
  }, [open, durationMs, hide]);

  if (!open) return null;

  const opacityClass = fadeOut
    ? 'opacity-0'
    : visible
      ? 'opacity-100'
      : 'opacity-0';

  return (
    <div
      className={`absolute w-full bottom-28 z-9999 px-4 transition-opacity duration-300 ease-in-out ${opacityClass}`}
    >
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
