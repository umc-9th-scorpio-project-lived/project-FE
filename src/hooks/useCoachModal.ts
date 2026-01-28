import { useEffect, useState } from "react";

const useCoachModal = (storageKey: string, defaultOpenCoach = true) => {
  const [openCoach, setOpenCoach] = useState(false);

  useEffect(() => {
    if (!defaultOpenCoach) return;

    const haveSeenCoach = localStorage.getItem(storageKey) === "1";
    if (!haveSeenCoach) setOpenCoach(true);
  }, [storageKey, defaultOpenCoach]);

  const close = () => {
    setOpenCoach(false);
    localStorage.setItem(storageKey, "1");
  };

  return { openCoach, close, setOpenCoach };
};

export default useCoachModal;
