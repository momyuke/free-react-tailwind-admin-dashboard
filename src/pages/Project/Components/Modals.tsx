import { GenericForm, IInput } from "@/components/form/GenericForm";
import { GeneralModal } from "@/components/modal";
import Button from "@/components/ui/button/Button";
import { Client, IProject, ModalKeys, projectDefault } from "@/core/domain";
import {
  closeModal,
  createClient,
  deleteClient,
  editClient,
  removeSelectedClient,
} from "@/core/services";
import { removeSelectedProject } from "@/core/services/projectServices";
import { useAppStore } from "@/core/stores/appStore";
import { camelToReadable, getTypedFormData } from "@/core/utils";
import { BoxIcon } from "@/icons";
import { FormEvent, useCallback } from "react";

interface AddOrEditClientModalProps {
  type: string;
}

export const AddOrEditProjectModal = ({ type }: AddOrEditClientModalProps) => {
  const { selectedProject } = useAppStore();
  const isAdd = type === ModalKeys.ADD_PROJECT;
  const wordingTitle = isAdd ? "Add" : "Edit";
  const wordingButtonSubmit = isAdd ? "Add Project" : "Save Changes";
  const excludeFields = [
    "isActive",
    "createdAt",
    "createdBy",
    "id",
    "clientId",
  ];

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const data = new FormData(e.currentTarget ?? undefined);
      console.log(data.get("id"));
      const client: Client = getTypedFormData<Client>(data, {
        allowAsIsKey: ["phoneNumber"],
      });
      if (isAdd) {
        return createClient(client);
      }
      client.id = selectedProject?.id ?? "";
      return editClient(client);
    },
    [isAdd, selectedProject?.id]
  );

  const onClose = () => {
    removeSelectedProject();
  };

  const inputs = Object.entries(projectDefault)
    .filter(([key]) => !excludeFields.includes(key))
    .map(([key, value]) => {
      switch (key) {
        case "status":
          return {};
        default:
          return {
            key: key,
            label: camelToReadable(key),
            type: typeof value,
          } as IInput<IProject>;
      }
    });

  return (
    <GeneralModal
      modalKey={type}
      onClose={onClose}
      showCloseButton
      isAbleToEscape
    >
      <p>{wordingTitle} Project</p>

      <GenericForm onSubmit={onSubmit} inputs={inputs} data={selectedProject} />
      <div className="flex justify-end mt-10">
        <Button
          size="md"
          type="submit"
          startIcon={<BoxIcon className="size-5" />}
        >
          {wordingButtonSubmit}
        </Button>
      </div>
    </GeneralModal>
  );
};

export const DeleteProjectModal = () => {
  const { selectedClient } = useAppStore();

  const onClose = () => {
    removeSelectedClient();
  };

  const onCancel = () => {
    closeModal(ModalKeys.DELETE_CLIENT);
  };

  const onDelete = () => {
    deleteClient(selectedClient?.id ?? "");
  };

  return (
    <GeneralModal
      modalKey={ModalKeys.DELETE_CLIENT}
      isAbleToEscape
      onClose={onClose}
    >
      <div className="mt-10">
        <h2 className="text-lg">
          Are you sure want to delete project {selectedClient?.name}
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
            className="bg-pink-500 text-white"
          >
            Delete
          </Button>
        </div>
      </div>
    </GeneralModal>
  );
};
