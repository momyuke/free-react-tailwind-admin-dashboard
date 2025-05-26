import { useAppStore } from "@/core/stores/appStore";

export const closeModal = (key: string) => {
  const { setState } = useAppStore;
  setState((state) => ({
    ...state,
    isOpen: {
      ...state.isOpen,
      [key]: false,
    },
  }));
};

export const closeAllModal = () => {
  const { setState } = useAppStore;
  setState((state) => ({
    ...state,
    isOpen: {},
  }));
};

export const openModal = (key: string) => {
  const { setState } = useAppStore;
  setState((state) => ({
    ...state,
    isOpen: {
      ...state.isOpen,
      [key]: true,
    },
  }));
};

export const setMessage = (key: string, message: string) => {
  const { setState } = useAppStore;
  setState((state) => ({
    ...state,
    messages: {
      ...state.messages,
      [key]: message,
    },
  }));
};
