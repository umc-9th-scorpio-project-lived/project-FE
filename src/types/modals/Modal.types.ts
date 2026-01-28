type ModalPosition = "center" | "bottom";

interface ModalOptions {
  position?: ModalPosition;
  props?: Record<string, unknown>;
  onConfirm?: () => void;
}

export interface BaseModal {
  isModalOpen: boolean;
  modalType: string;
  options: {
    position: ModalPosition;
    onConfirm?: () => void;
  };
  modalProps?: Record<string, unknown>;

  setModalType: (type: string) => void;
  openModal: (type: string, options?: ModalOptions) => void;
  closeModal: () => void;
}
