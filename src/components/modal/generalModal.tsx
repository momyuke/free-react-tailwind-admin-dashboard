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
}

export const GeneralModal = ({
  modalKey,
  children,
  showCloseButton = false,
  className = "max-w-[700px] p-6 lg:p-10 m-10",
  childClassName,
  isAbleToEscape = true,
}: GeneralModalProps) => {
  const { isOpen } = useAppStore();
  const isKeyOpen = isOpen[modalKey] ?? "";
  const onClose = useCallback(() => {
    closeModal(modalKey);
  }, [modalKey]);

  return (
    <Modal
      className={className}
      childClassname={childClassName}
      showCloseButton={showCloseButton}
      isOpen={isKeyOpen}
      onClose={onClose}
      isAbleToEscape={isAbleToEscape}
    >
      {children}
    </Modal>
  );
};
