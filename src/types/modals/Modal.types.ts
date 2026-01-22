type ModalPosition = "center" | "bottom";

interface ModalOptions {
  position?: ModalPosition;
  props?: Record<string, unknown>;
}

export interface BaseModal {
  isModalOpen: boolean;
  modalType: string;
  options: {
    position: ModalPosition;
  };
  modalProps?: Record<string, unknown>;

  setModalType: (type: string) => void;
  openModal: (type: string, options?: ModalOptions) => void;
  closeModal: () => void;
}
