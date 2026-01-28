type ModalType = "livingYearModal" | "centerModal" | "bottomModal" | "pushAlarmModal" | string;

type ModalPosition = "center" | "bottom";

interface ModalOptions {
  position?: ModalPosition;
  props?: Record<string, unknown>;
  onConfirm?: () => void;
}

export interface BaseModal {
  isModalOpen: boolean;
  modalType: ModalType | string;
  options: {
    position: ModalPosition;
    onConfirm?: () => void;
  };
  modalProps?: Record<string, unknown>;

  setModalType: (type: ModalType) => void;
  openModal: (type: ModalType, options?: ModalOptions) => void;
  closeModal: () => void;
}
