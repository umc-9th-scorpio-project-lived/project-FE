import DeleteRoutineModal from "@/components/modals/homes/DeleteRoutineModal";
import SelectDateModal from "@/components/modals/homes/SelectDateModal";
import SelectIconModal from "@/components/modals/homes/SelectIconModal";
import SetAlarmModal from "@/components/modals/homes/SetAlarmModal";
import SetRepeatCycleModal from "@/components/modals/homes/SetRepeatCycleModal";
import BottomTestModal from "@/components/modals/BottomTestModal";
import CenterTestModal from "@/components/modals/CenterTestModal";
import ModalBackground from "@/components/modals/ModalBackground";
import useBaseModal from "@/stores/modals/baseModal";
import { useEffect } from "react";

const ModalPage = () => {
  const { isModalOpen, modalType, modalProps } = useBaseModal();

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
        {modalType === "selectDateModal" && <SelectDateModal />}
        {modalType === "setRepeatCycleModal" && <SetRepeatCycleModal {...(modalProps ?? {})} />}
        {modalType === "setAlarmModal" && <SetAlarmModal {...(modalProps ?? {})} />}
        {modalType === "selectIconModal" && <SelectIconModal {...(modalProps ?? {})} />}
        {modalType === "deleteRoutineModal" && <DeleteRoutineModal {...(modalProps ?? {})} />}
      </ModalBackground>
    </>
  );
};

export default ModalPage;
