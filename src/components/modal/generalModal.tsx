import { Modal } from "@/components/ui/modal";
import { useAppStore } from "@/core/stores/appStore";
import { ReactNode, useCallback } from "react";

interface GeneralModalProps {
  children?: ReactNode;
  modalKey: string;
  showCloseButton?: boolean;
  className?: string;
  childClassName?: string;
}

export const GeneralModal = ({
  modalKey,
  children,
  showCloseButton = false,
  className,
  childClassName,
}: GeneralModalProps) => {
  const { isOpen, closeModal } = useAppStore();
  const isKeyOpen = isOpen[modalKey] ?? "";
  const onClose = useCallback(() => {
    closeModal(modalKey);
  }, []);

  return (
    <Modal
      className={className}
      childClassname={childClassName}
      showCloseButton={showCloseButton}
      isOpen={isKeyOpen}
      onClose={onClose}
    >
      {children}
    </Modal>
  );
};
