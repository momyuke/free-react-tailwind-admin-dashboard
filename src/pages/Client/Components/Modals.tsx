import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { GeneralModal } from "@/components/modal";
import Button from "@/components/ui/button/Button";
import { Client, ModalKeys } from "@/core/domain";
import {
  closeModal,
  createClient,
  deleteClient,
  editClient,
  removeSelectedClient,
} from "@/core/services";
import { useAppStore } from "@/core/stores/appStore";
import { getTypedFormData } from "@/core/utils";
import { BoxIcon } from "@/icons";
import { FormEvent, useCallback } from "react";

interface AddOrEditClientModalProps {
  type: string;
}

export const AddOrEditClientModal = ({ type }: AddOrEditClientModalProps) => {
  const { selectedClient } = useAppStore();
  const isAdd = type === ModalKeys.ADD_CLIENT;
  const wordingTitle = isAdd ? "Add" : "Edit";

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
      client.id = selectedClient?.id ?? "";
      return editClient(client);
    },
    [isAdd, selectedClient?.id]
  );

  const onClose = () => {
    removeSelectedClient();
  };

  return (
    <GeneralModal
      modalKey={type}
      onClose={onClose}
      showCloseButton
      isAbleToEscape
    >
      <p>{wordingTitle} Client</p>
      <form onSubmit={onSubmit} className="mt-10 flex flex-col gap-5">
        {/* {!isAdd && (
          <div>
            <Label htmlFor="id">Client ID</Label>
            <Input type="text" name="id" value={selectedClient?.id} disabled />
          </div>
        )} */}
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            name="name"
            defaultValue={selectedClient?.name}
            placeholder="PT Senang Susah"
            required
          />
        </div>
        <div>
          <Label htmlFor="pic">PIC</Label>
          <Input
            type="text"
            name="pic"
            defaultValue={selectedClient?.pic}
            placeholder="Depp Johnny"
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name="email"
            defaultValue={selectedClient?.email}
            placeholder="info@gmail.com"
            required
          />
        </div>
        <div>
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            type="number"
            name="phoneNumber"
            placeholder="628123456890"
            defaultValue={selectedClient?.phoneNumber}
            required
          />
        </div>
        <div>
          <Label htmlFor="address">Address</Label>
          <Input
            type="text"
            name="address"
            placeholder="Jl. Sisingamangaraja IX"
            defaultValue={selectedClient?.address}
            required
          />
        </div>
        <div className="flex justify-end mt-10">
          <Button
            size="md"
            type="submit"
            startIcon={<BoxIcon className="size-5" />}
          >
            {wordingTitle} Client
          </Button>
        </div>
      </form>
    </GeneralModal>
  );
};

export const DeleteClientModal = () => {
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
      showCloseButton
      isAbleToEscape
      onClose={onClose}
    >
      <div className="mt-10">
        <h2 className="text-lg">
          Are you sure want to delete client {selectedClient?.name}
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
