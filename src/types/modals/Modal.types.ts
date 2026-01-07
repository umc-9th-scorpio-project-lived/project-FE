type ModalPosition = "center" | "bottom";

interface ModalOptions {
  position?: ModalPosition;
}

export interface BaseModal {
  isModalOpen: boolean;
  modalType: string;
  options: {
    position: ModalPosition;
  };

  setModalType: (type: string) => void;
  openModal: (type: string, options?: ModalOptions) => void;
  closeModal: () => void;
}
