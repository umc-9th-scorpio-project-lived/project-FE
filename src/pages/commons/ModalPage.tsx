import BottomTestModal from "@/components/modals/BottomTestModal";
import CenterTestModal from "@/components/modals/CenterTestModal";
import FruitInfoModal from "@/components/modals/FruitInfoModal";
import FruitModal from "@/components/modals/FruitModal";
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
        {modalType === "centerModal" && <CenterTestModal />}
        {modalType === "bottomModal" && <BottomTestModal />}
        {modalType === "fruitInfoModal" && <FruitInfoModal />}
        {modalType === "fruitModal" && <FruitModal />}
      </ModalBackground>
    </>
  );
};

export default ModalPage;
