import BottomTestModal from "@/components/modals/BottomTestModal";
import CenterTestModal from "@/components/modals/CenterTestModal";
import LivingYearModal from "@/components/modals/LivingYearModal";
import ModalBackground from "@/components/modals/ModalBackground";
import useBaseModal from "@/stores/modals/baseModal";
import { useEffect } from "react";

const ModalPage = () => {
  const { isModalOpen, modalType } = useBaseModal();

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  if (!isModalOpen) return null;

  return (
    <>
      <ModalBackground>
        {modalType === "livingYearModal" && <LivingYearModal />}{" "}
        {modalType === "centerModal" && <CenterTestModal />}
        {modalType === "bottomModal" && <BottomTestModal />}
      </ModalBackground>
    </>
  );
};

export default ModalPage;
