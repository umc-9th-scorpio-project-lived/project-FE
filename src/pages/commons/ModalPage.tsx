import BottomTestModal from "@/components/modals/BottomTestModal";
import CenterTestModal from "@/components/modals/CenterTestModal";
import FruitInfoModal from "@/components/modals/FruitInfoModal";
import FruitModal from "@/components/modals/FruitModal";
import DeleteAccountModal from "@/components/modals/DeleteAccountModal";
import LogoutModal from "@/components/modals/LogoutModal";
import ModalBackground from "@/components/modals/ModalBackground";
import PostDeleteModal from "@/components/modals/PostDeleteModal";
import ReportPostModal from "@/components/modals/ReportPostModal";
import SearchDeleteModal from "@/components/modals/SearchDeleteModal";
import TreeVisibilityModal from "@/components/modals/TreeVisibilityModal";
import UnblockModal from "@/components/modals/UnblockModal";
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
        {modalType === "searchDeleteModal" && <SearchDeleteModal />}
        {modalType === "reportPostModal" && <ReportPostModal />}
        {modalType === "postDeleteModal" && <PostDeleteModal />}
        {modalType === "logoutModal" && <LogoutModal />}
        {modalType === "deleteAccountModal" && <DeleteAccountModal />}
        {modalType === "treeVisibilityModal" && <TreeVisibilityModal />}
        {modalType === "unblockModal" && <UnblockModal />}
      </ModalBackground>
    </>
  );
};

export default ModalPage;
