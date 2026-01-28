import DeleteRoutineModal from "@/components/modals/homes/DeleteRoutineModal";
import SelectDateModal from "@/components/modals/homes/SelectDateModal";
import SelectIconModal from "@/components/modals/homes/SelectIconModal";
import SetAlarmModal from "@/components/modals/homes/SetAlarmModal";
import SetRepeatCycleModal from "@/components/modals/homes/SetRepeatCycleModal";
import LivingYearModal from "@/components/modals/LivingYearModal";
import PushAlarmModal from "@/components/modals/PushAlarmModal";
import ModalBackground from "@/components/modals/ModalBackground";
import PostDeleteModal from "@/components/modals/communities/PostDeleteModal";
import ReportPostModal from "@/components/modals/communities/ReportPostModal";
import SearchDeleteModal from "@/components/modals/communities/SearchDeleteModal";
import TreeVisibilityModal from "@/components/modals/users/TreeVisibilityModal";
import UnblockModal from "@/components/modals/users/UnblockModal";
import useBaseModal from "@/stores/modals/baseModal";
import SetStatisticsMonthModal from "@/components/modals/trees/SetStatisticsMonthModal";
import { useEffect } from "react";
import SetStatisticsWeekModal from "@/components/modals/trees/SetStatisticsWeekModal";
import SetTrackerMonthModal from "@/components/modals/trees/SetTrackerMonthModal";
import SetBirthModal from "@/components/modals/onboardings/setBirthModal";
import FruitInfoModal from "@/components/modals/trees/FruitInfoModal";
import FruitModal from "@/components/modals/trees/FruitModal";
import LogoutModal from "@/components/modals/users/LogoutModal";
import DeleteAccountModal from "@/components/modals/users/DeleteAccountModal";

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
        {modalType === "selectDateModal" && <SelectDateModal />}
        {modalType === "setRepeatCycleModal" && <SetRepeatCycleModal {...(modalProps ?? {})} />}
        {modalType === "setAlarmModal" && <SetAlarmModal {...(modalProps ?? {})} />}
        {modalType === "selectIconModal" && <SelectIconModal {...(modalProps ?? {})} />}
        {modalType === "deleteRoutineModal" && <DeleteRoutineModal {...(modalProps ?? {})} />}
        {modalType === "livingYearModal" && <LivingYearModal />}
        {modalType === "pushAlarmModal" && <PushAlarmModal />}
        {modalType === "fruitInfoModal" && <FruitInfoModal />}
        {modalType === "fruitModal" && <FruitModal />}
        {modalType === "searchDeleteModal" && <SearchDeleteModal />}
        {modalType === "reportPostModal" && <ReportPostModal />}
        {modalType === "postDeleteModal" && <PostDeleteModal />}
        {modalType === "logoutModal" && <LogoutModal />}
        {modalType === "deleteAccountModal" && <DeleteAccountModal />}
        {modalType === "treeVisibilityModal" && <TreeVisibilityModal />}
        {modalType === "unblockModal" && <UnblockModal />}
        {modalType === "setStatisticsMonthModal" && (
          <SetStatisticsMonthModal {...(modalProps ?? {})} />
        )}
        {modalType === "setStatisticsWeekModal" && (
          <SetStatisticsWeekModal {...(modalProps ?? {})} />
        )}
        {modalType === "setTrackerMonthModal" && <SetTrackerMonthModal {...(modalProps ?? {})} />}
        {modalType === "setBirthModal" && <SetBirthModal {...(modalProps ?? {})} />}
      </ModalBackground>
    </>
  );
};

export default ModalPage;
