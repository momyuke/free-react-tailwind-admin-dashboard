import { Modal } from "@/components/ui/modal";
import { closeModal } from "@/core/services";
import { useAppStore } from "@/core/stores/appStore";
import { ReactNode, useCallback } from "react";

interface GeneralModalProps {
  children?: ReactNode;
  modalKey: string;
  showCloseButton?: boolean;
  className?: string;
  childClassName?: string;
  isAbleToEscape?: boolean;
  /**
   * Would be called after closing the modal
   */
  onClose?: () => void;
}

export const GeneralModal = ({
  modalKey,
  children,
  showCloseButton = false,
  className = "max-w-[700px] p-6 lg:p-10 m-10",
  childClassName,
  isAbleToEscape = true,
  onClose,
}: GeneralModalProps) => {
  const { isOpen } = useAppStore();
  const isKeyOpen = isOpen[modalKey] ?? "";
  const onCloseModal = useCallback(() => {
    closeModal(modalKey);
    if (onClose) onClose();
  }, [modalKey, onClose]);

  return (
    <Modal
      className={`dark:text-white ${className}`}
      childClassname={childClassName}
      showCloseButton={showCloseButton}
      isOpen={isKeyOpen}
      onClose={onCloseModal}
      isAbleToEscape={isAbleToEscape}
    >
      {children}
    </Modal>
  );
};
