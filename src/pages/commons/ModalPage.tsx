import BottomTestModal from "@/components/modals/BottomTestModal";
import CenterTestModal from "@/components/modals/CenterTestModal";
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
        {/* 
      예시 형식입니다! 팝업 모달 추가할 때 아래 형식처럼 추가해서 사용하시면 됩니다.
      퍼블리싱 진행하실 때 해당 주석은 삭제해주세요!
      {modalType === "loadingModal" && <LoadingModal />} */}
        {modalType === "centerModal" && <CenterTestModal />}
        {modalType === "bottomModal" && <BottomTestModal />}
      </ModalBackground>
    </>
  );
};

export default ModalPage;
