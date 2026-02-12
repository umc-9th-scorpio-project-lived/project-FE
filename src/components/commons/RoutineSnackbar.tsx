import AlarmIcon from '@/icons/AlarmIcon';
import {
  useSnackbarStore,
  type RoutineSnackbarKey,
} from '@/stores/homes/snackbarStore';
import React, { useEffect, useRef, useState } from 'react';

const FADE_OUT_DURATION_MS = 300;

const SNACKBAR_META: Record<
  RoutineSnackbarKey,
  { Icon: React.FC<{ className?: string }>; text: string }
> = {
  ROUTINE_FUTURE_DATE: {
    Icon: AlarmIcon,
    text: '미래의 날짜의 루틴은 완료할 수 없어요.',
  },
  ROUTINE_DUPLICATE_NAME: {
    Icon: AlarmIcon,
    text: '동일한 제목의 루틴은 추가할 수 없어요. \n새로운 루틴 제목을 입력해주세요',
  },
  EDIT_DUPLICATE_NAME: {
    Icon: AlarmIcon,
    text: '동일한 제목의 루틴으로는 수정할 수 없어요. \n새로운 루틴 제목을 입력해주세요',
  },
};

const RoutineSnackbar = () => {
  const { open, snackbarKey, durationMs, hide } = useSnackbarStore();

  const [visible, setVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const hideTimerRef = useRef<number | null>(null);
  const fadeTimerRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const snackbarMeta = snackbarKey ? SNACKBAR_META[snackbarKey] : null;
  const { Icon, text } = snackbarMeta || { Icon: AlarmIcon, text: '' };

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

  if (!open || !snackbarKey) return null;

  return (
    <div
      className={`w-full z-9999 transition-opacity duration-300 ease-in-out ${opacityClass}`}
    >
      <div className="flex justify-start items-center gap-2.5 rounded-xl bg-gray-700 text-screen-0 px-4 py-3">
        <Icon className="size-6" />
        <span className="typo-body_reg14 whitespace-pre-line">{text} </span>
      </div>
    </div>
  );
};

export default RoutineSnackbar;
