type ModalType = "livingYearModal" | "centerModal" | "bottomModal" | "pushAlarmModal";

type ModalPosition = "center" | "bottom";

interface ModalOptions {
  position?: ModalPosition;
  onConfirm?: () => void;
}

export interface BaseModal {
  isModalOpen: boolean;
  modalType: ModalType | "";
  options: {
    position: ModalPosition;
    onConfirm?: () => void;
  };

  setModalType: (type: ModalType) => void;
  openModal: (type: ModalType, options?: ModalOptions) => void;
  closeModal: () => void;
}
