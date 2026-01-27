import DeleteRoutineModal from "@/components/modals/homes/DeleteRoutineModal";
import SelectDateModal from "@/components/modals/homes/SelectDateModal";
import SelectIconModal from "@/components/modals/homes/SelectIconModal";
import SetAlarmModal from "@/components/modals/homes/SetAlarmModal";
import SetRepeatCycleModal from "@/components/modals/homes/SetRepeatCycleModal";
import BottomTestModal from "@/components/modals/BottomTestModal";
import CenterTestModal from "@/components/modals/CenterTestModal";
import DeleteAccountModal from "@/components/modals/DeleteAccountModal";
import LogoutModal from "@/components/modals/LogoutModal";
import ModalBackground from "@/components/modals/ModalBackground";
import TreeVisibilityModal from "@/components/modals/TreeVisibilityModal";
import UnblockModal from "@/components/modals/UnblockModal";
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
        {modalType === "logoutModal" && <LogoutModal />}
        {modalType === "deleteAccountModal" && <DeleteAccountModal />}
        {modalType === "treeVisibilityModal" && <TreeVisibilityModal />}
        {modalType === "unblockModal" && <UnblockModal />}
      </ModalBackground>
    </>
  );
};

export default ModalPage;
