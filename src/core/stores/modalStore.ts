import { ModalStoreState } from "@/core/domain/storeDomain";

export const createModalStore = (): ModalStoreState => {
  return {
    isOpen: {},
    messages: {},
  };
};
