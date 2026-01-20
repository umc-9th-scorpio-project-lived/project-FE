import BottomTestModal from "@/components/modals/BottomTestModal";
import CenterTestModal from "@/components/modals/CenterTestModal";
import ModalBackground from "@/components/modals/ModalBackground";
import ReportPostModal from "@/components/modals/ReportPostModal";
import SearchDeleteModal from "@/components/modals/SearchDeleteModal";
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
        {modalType === "searchDeleteModal" && <SearchDeleteModal />}
        {modalType === "reportPostModal" && <ReportPostModal />}
      </ModalBackground>
    </>
  );
};

export default ModalPage;
