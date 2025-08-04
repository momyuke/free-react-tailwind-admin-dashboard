import { GenericForm, IInput } from "@/components/form/GenericForm";
import Input from "@/components/form/input/InputField";
import Select, { SelectOption } from "@/components/form/Select";
import { GeneralModal } from "@/components/modal";
import Button from "@/components/ui/button/Button";
import {
  EProjectStatus,
  EProjectType,
  IInvoiceItem,
  invoiceItemDefault,
  IProject,
  ModalKeys,
  projectDefault
} from "@/core/domain";
import { closeModal, editItemForInvoice } from "@/core/services";
import {
  createProject,
  deleteProject,
  editProject,
  removeSelectedProject,
} from "@/core/services/projectServices";
import { useAppStore } from "@/core/stores/appStore";
import {
  camelToReadable,
  formatCurrency,
  getTypedFormData,
  parseCurrency,
} from "@/core/utils";
import { SelectClient } from "@/pages/Project/Components/SelectClient";
import { ChangeEvent, FormEvent, useCallback } from "react";

interface AddOrEditProjectModalProps {
  type: string;
}

export const AddOrEditProjectModal = ({ type }: AddOrEditProjectModalProps) => {
  const { selectedProject } = useAppStore();
  const isAdd = type === ModalKeys.ADD_PROJECT;
  const wordingTitle = isAdd ? "Add" : "Edit";
  const wordingButtonSubmit = isAdd ? "Add Project" : "Save Changes";
  const excludeFields = [
    "isActive",
    "createdAt",
    "createdBy",
    "id",
    "clientName",
  ];

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const data = new FormData(e.currentTarget ?? undefined);
      let cost = data.get("cost") as string;
      cost = cost.split("Rp. ")[1];
      data.set("cost", String(parseCurrency(cost)));
      const project: IProject = getTypedFormData<IProject>(data);
      if (isAdd) {
        return createProject(project);
      }
      project.id = selectedProject?.id ?? "";
      return editProject(project);
    },
    [isAdd, selectedProject?.id]
  );

  const onClose = () => {
    removeSelectedProject();
  };

  const optionSelectStatus = Object.values(EProjectStatus).map((e) => {
    return {
      label: e,
      value: e,
    } as SelectOption;
  });

  const typeSelectStatus = Object.values(EProjectType).map((e) => {
    return {
      label: e,
      value: e,
    } as SelectOption;
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^\d]/g, ""); // Remove non-digit
    const numericValue = parseInt(rawValue || "0", 10);
    const formatted = formatCurrency(numericValue);
    e.target.value = "Rp. " + formatted;
  };

  const inputs = Object.entries(projectDefault)
    .filter(([key]) => !excludeFields.includes(key))
    .map(([key, value]) => {
      switch (key) {
        case "status":
          return {
            key,
            label: camelToReadable(key),
            render: (
              <Select
                name="status"
                options={optionSelectStatus}
                defaultValue={selectedProject?.status}
                onChange={() => ""}
              />
            ),
          };

        case "cost":
          return {
            key,
            label: camelToReadable(key),
            render: (
              <>
                <Input
                  onChange={handleChange}
                  name={String(key)}
                  defaultValue={
                    "Rp. " + formatCurrency(selectedProject?.cost ?? 0)
                  }
                  placeholder={"0"}
                  required
                />
              </>
            ),
          };

        case "type":
          return {
            key,
            label: camelToReadable(key),
            render: (
              <Select
                name="type"
                options={typeSelectStatus}
                defaultValue={selectedProject?.type}
                onChange={() => ""}
              />
            ),
          };

        case "clientId":
          return {
            key,
            label: "Client",
            render: <SelectClient defaultValue={selectedProject?.clientId} />,
          };

        default:
          return {
            key: key,
            label: camelToReadable(key),
            type: typeof value,
            onChange: (e) => {
              if (typeof value == "number") {
                if (parseInt(e.target.value) < 0) e.target.value = "0";
              }
            },
          } as IInput<IProject>;
      }
    }) as unknown as IInput<IProject>[];

  return (
    <GeneralModal
      modalKey={type}
      onClose={onClose}
      showCloseButton
      isAbleToEscape
    >
      <p>{wordingTitle} Project</p>

      <GenericForm
        onSubmit={onSubmit}
        inputs={inputs}
        data={selectedProject}
        wordingButton={wordingButtonSubmit}
      />
    </GeneralModal>
  );
};

export const AddItemInvoiceModal = () => {
  const { selectedInvoice } = useAppStore();
  const excludedField = ['id', 'invoiceId']
  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const data = new FormData(e.currentTarget ?? undefined);
      let cost = data.get("price") as string;
      cost = cost.split("Rp. ")[1];
      data.set("price", String(parseCurrency(cost)));
      const invoiceItem: IInvoiceItem = getTypedFormData<IInvoiceItem>(data);
      console.log(selectedInvoice)
      invoiceItem.invoiceId = selectedInvoice?.id
      return editItemForInvoice(invoiceItem);
    },
    [selectedInvoice?.id]
  );

  const onClose = () => {
    removeSelectedProject();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^\d]/g, ""); // Remove non-digit
    const numericValue = parseInt(rawValue || "0", 10);
    const formatted = formatCurrency(numericValue);
    e.target.value = "Rp. " + formatted;
  };
  

  const inputs = Object.entries(invoiceItemDefault)
    .filter(([key]) => !excludedField.includes(key))
    .map(([key, value]) => {
      switch (key) {
        case "price":
          return {
            key,
            label: camelToReadable(key),
            render: (
              <>
                <Input
                  onChange={handleChange}
                  name={String(key)}
                  defaultValue={
                    "Rp. " + formatCurrency(0)
                  }
                  placeholder={"0"}
                  required
                />
              </>
            ),
          };
        default:
          return {
            key: key,
            label: camelToReadable(key),
            type: typeof value,
          } as IInput<IInvoiceItem>;
      }
    }) as unknown as IInput<IInvoiceItem>[];

  return (
    <GeneralModal
      modalKey={ModalKeys.ADD_ITEM_INVOICE}
      onClose={onClose}
      showCloseButton
      isAbleToEscape
    >
      <p>Add Item for Invoice {selectedInvoice?.id}</p>
      <GenericForm<IInvoiceItem>
        onSubmit={onSubmit}
        isOverflow={false}
        inputs={inputs}
      />
    </GeneralModal>
  );
};

export const DeleteProjectModal = () => {
  const { selectedProject } = useAppStore();

  const onClose = () => {
    removeSelectedProject();
  };

  const onCancel = () => {
    closeModal(ModalKeys.DELETE_PROJECT);
  };

  const onDelete = () => {
    deleteProject(selectedProject?.id ?? "");
  };

  return (
    <GeneralModal
      modalKey={ModalKeys.DELETE_PROJECT}
      isAbleToEscape
      onClose={onClose}
    >
      <div className="mt-10">
        <h2 className="text-lg">
          Are you sure want to delete project {selectedProject?.id}
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
