import { create } from "zustand";
import type { BaseModal } from "@/types/modals/Modal.types";

const useBaseModal = create<BaseModal>((set) => ({
  isModalOpen: false,
  modalType: "",
  options: { position: "center" },

  setModalType: (type) => set({ modalType: type }),
  openModal: (type, options) =>
    set({
      isModalOpen: true,
      modalType: type,
      options: {
        position: options?.position ?? "center",
      },
    }),

  closeModal: () => set({ isModalOpen: false, modalType: "" }),
}));

export default useBaseModal;
