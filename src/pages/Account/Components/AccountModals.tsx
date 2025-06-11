import { GeneralModal } from "@/components/modal";
import Button from "@/components/ui/button/Button";
import { ModalKeys } from "@/core/domain";
import {
  closeModal,
  deleteAccount,
  removeSelectedAccount,
} from "@/core/services";
import { useAppStore } from "@/core/stores/appStore";

export const DeleteAccountModal = () => {
  const { selectedAccount } = useAppStore();

  const onClose = () => {
    removeSelectedAccount();
  };

  const onCancel = () => {
    closeModal(ModalKeys.DELETE_ACCOUNT);
  };

  const onDelete = () => {
    deleteAccount(selectedAccount?.accountId ?? "");
  };

  return (
    <GeneralModal
      modalKey={ModalKeys.DELETE_ACCOUNT}
      showCloseButton
      isAbleToEscape
      onClose={onClose}
    >
      <div className="mt-10">
        <h2 className="text-lg">
          Are you sure want to delete account: {selectedAccount?.fullName}
        </h2>
        <div className="flex justify-end mt-6 gap-3">
          <Button
            onClick={onCancel}
            useVariant={false}
            className="bg-green-500 text-white"
          >
            Cancel
          </Button>
          <Button
            onClick={onDelete}
            useVariant={false}
            className="bg-red-500 text-white"
          >
            Delete
          </Button>
        </div>
      </div>
    </GeneralModal>
  );
};
