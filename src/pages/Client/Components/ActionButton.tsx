import Button from "@/components/ui/button/Button";
import { Client, ModalKeys } from "@/core/domain";
import { openModal, selectClient } from "@/core/services";
import { useCallback } from "react";

interface ActionButtonProps {
  client?: Client;
}

export const ActionButton = ({ client }: ActionButtonProps) => {
  const onDelete = useCallback(() => {
    selectClient(client);
    openModal(ModalKeys.DELETE_CLIENT);
  }, [client]);

  const onUpdate = useCallback(() => {
    selectClient(client);
    openModal(ModalKeys.UPDATE_CLIENT);
  }, [client]);
  return (
    <div className="flex gap-1">
      <Button
        onClick={onDelete}
        useVariant={false}
        className="bg-pink-500 text-white"
      >
        Delete
      </Button>
      <Button
        useVariant={false}
        onClick={onUpdate}
        className="bg-green-500 text-white"
      >
        Update
      </Button>
    </div>
  );
};
