import { GeneralModal } from "@/components/modal/generalModal";
import { useAppStore } from "@/core/stores/appStore";

interface MessageModalProps {
  modalKey: string;
  className?: string;
  childClassName?: string;
}

export const MessageModal = ({
  modalKey,
  className = "max-w-[500px] p-6 lg:p-10 m-10",
  childClassName = "text-center mt-5",
}: MessageModalProps) => {
  const { messages } = useAppStore();
  const message = messages[modalKey] ?? "Mantap";

  return (
    <GeneralModal
      modalKey={modalKey}
      className={className}
      childClassName={childClassName}
      showCloseButton={true}
    >
      <p className="dark:text-sky-50 ">{message}</p>
    </GeneralModal>
  );
};
