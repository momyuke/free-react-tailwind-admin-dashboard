import Button from "@/components/ui/button/Button";
import { ModalKeys } from "@/core/domain";
import { openModal } from "@/core/services";
import { BoxIcon } from "@/icons";
import { useCallback } from "react";

export const AddButton = () => {
  const onClick = useCallback(() => {
    openModal(ModalKeys.ADD_CLIENT);
  }, []);
  return (
    <div className="flex justify-end ">
      <Button
        size="md"
        variant="primary"
        onClick={onClick}
        startIcon={<BoxIcon className="size-5" />}
      >
        Add Project
      </Button>
    </div>
  );
};
