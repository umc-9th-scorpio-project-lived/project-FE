import useBaseModal from "@/stores/modals/baseModal";
import React, { useEffect } from "react";

interface ModalBackgroundProps {
  children: React.ReactNode;
}

const ModalBackground = ({ children }: ModalBackgroundProps) => {
  const { closeModal, options } = useBaseModal();
  const position = options.position ?? "center";

  const preventScroll = () => {
    document.documentElement.style.overflow = "hidden";
  };

  const allowScroll = () => {
    document.documentElement.style.overflow = "auto";
  };

  useEffect(() => {
    preventScroll();
    return () => {
      allowScroll();
    };
  }, []);

  const layoutClass =
    position === "center" ? "grid place-items-center px-4" : "flex items-end px-0";

  const contentClass = position === "center" ? "w-full max-w-[420px]" : "w-full";

  return (
    <div
      onClick={() => closeModal()}
      className="max-w-[500px] min-w-[375px] w-full fixed inset-0 mx-auto bg-black/25 z-50 overflow-hidden"
    >
      <div className={`h-full w-full ${layoutClass}`}>
        <div className={contentClass} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalBackground;
