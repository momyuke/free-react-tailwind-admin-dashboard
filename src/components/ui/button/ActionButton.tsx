import Button from "@/components/ui/button/Button";
import { useCallback } from "react";

interface ActionButtonProps<T> {
  data: T;
  onDelete?: (data: T) => void;
  onUpdate?: (data: T) => void;
  showUpdateButton?: boolean;
  showDeleteButton?: boolean;
  disabledUpdateButton?: boolean;
  disabledDeleteButton?: boolean;
  updateWordingButton?: string;
  deleteWordingButton?: string;
}

export function ActionButton<T>({
  data,
  onDelete,
  onUpdate,
  showDeleteButton = false,
  showUpdateButton = false,
  updateWordingButton = 'Update',
  deleteWordingButton = 'Delete',
  disabledDeleteButton = false,
  disabledUpdateButton = false,
}: ActionButtonProps<T>) {
  const onClickDelete = useCallback(() => {
    if (onDelete) {
      onDelete(data);
    }
  }, [data, onDelete]);

  const onClickUpdate = useCallback(() => {
    if (onUpdate) {
      onUpdate(data);
    }
  }, [data, onUpdate]);

  return (
    <div className="flex gap-1">
      {showUpdateButton && (
        <Button
          useVariant={false}
          onClick={onClickUpdate}
          className="bg-green-500 text-white"
          disabled={disabledUpdateButton}
        >
          {updateWordingButton}
        </Button>
      )}
      {showDeleteButton && (
        <Button
          onClick={onClickDelete}
          useVariant={false}
          className="bg-pink-500 text-white"
          disabled={disabledDeleteButton}
        >
          {deleteWordingButton}
        </Button>
      )}
    </div>
  );
}
