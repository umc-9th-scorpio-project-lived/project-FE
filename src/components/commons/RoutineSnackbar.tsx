import AlarmIcon from '@/icons/AlarmIcon';
import { useSnackbarStore } from '@/stores/homes/snackbarStore';
import { useEffect, useRef } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: {
    y: 0,
    opacity: 0,
    transition: {
      type: 'tween',
      duration: 0.2,
      ease: 'easeIn',
    },
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 0.2,
      ease: 'easeOut',
    },
  },
};

const contentVariants: Variants = {
  hidden: {
    scale: 0.98,
    transition: {
      type: 'tween',
      duration: 0.2,
      ease: 'easeIn',
    },
  },
  visible: {
    scale: 1,
    transition: {
      type: 'tween',
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

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

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed left-0 right-0 bottom-28.5 z-9999 px-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="flex justify-start items-center gap-2.5 rounded-xl bg-gray-700 text-screen-0 px-4 py-3"
            variants={contentVariants}
          >
            <AlarmIcon className="size-6" />
            <span className="typo-body_reg14">
              미래의 날짜의 루틴은 완료할 수 없어요.
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RoutineSnackbar;
