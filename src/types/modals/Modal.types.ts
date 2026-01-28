type ModalPosition = "center" | "bottom";

interface ModalOptions {
  position?: ModalPosition;
  onConfirm?: () => void;
}

export interface BaseModal {
  isModalOpen: boolean;
  modalType: string;
  options: {
    position: ModalPosition;
    onConfirm?: () => void;
  };

  setModalType: (type: string) => void;
  openModal: (type: string, options?: ModalOptions) => void;
  closeModal: () => void;
}
