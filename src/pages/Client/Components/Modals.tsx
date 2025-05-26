import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { GeneralModal } from "@/components/modal";
import Button from "@/components/ui/button/Button";
import { Client, ModalKeys } from "@/core/domain";
import { createClient } from "@/core/services";
import { getTypedFormData } from "@/core/utils";
import { BoxIcon } from "@/icons";
import { FormEvent, useCallback, useRef } from "react";

interface AddOrEditClientModalProps {
  type: string;
  client?: Client;
}

export const AddOrEditClientModal = ({
  type,
  client,
}: AddOrEditClientModalProps) => {
  const isAdd = type === ModalKeys.ADD_CLIENT;
  const wordingTitle = isAdd ? "Add" : "Edit";
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(formRef.current ?? undefined);
    console.log(data.get("phoneNumber"));
    console.log(typeof data.get("phoneNumber"));
    const client: Client = getTypedFormData<Client>(data, {
      allowAsIsKey: ["phoneNumber"],
    });
    createClient(client);
  }, []);

  return (
    <GeneralModal modalKey={type} showCloseButton isAbleToEscape>
      <p>{wordingTitle} Client</p>
      <form
        onSubmit={onSubmit}
        ref={formRef}
        className="mt-10 flex flex-col gap-5"
      >
        {!isAdd && (
          <div>
            <Label htmlFor="id">Client ID</Label>
            <Input type="text" name="id" value={client?.id} disabled />
          </div>
        )}
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            name="name"
            placeholder="PT Senang Susah"
            required
          />
        </div>
        <div>
          <Label htmlFor="pic">PIC</Label>
          <Input type="text" name="pic" placeholder="Depp Johnny" required />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name="email"
            placeholder="info@gmail.com"
            required
          />
        </div>
        <div>
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            type="text"
            name="phoneNumber"
            placeholder="628123456890"
            required
          />
        </div>
        <div>
          <Label htmlFor="address">Address</Label>
          <Input
            type="text"
            name="address"
            placeholder="Jl. Sisingamangaraja IX"
            required
          />
        </div>
        <div className="flex justify-end mt-10">
          <Button
            size="md"
            type="submit"
            startIcon={<BoxIcon className="size-5" />}
          >
            Add Client
          </Button>
        </div>
      </form>
    </GeneralModal>
  );
};
