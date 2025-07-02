import { GenericForm, IInput } from "@/components/form/GenericForm";
import Select, { SelectOption } from "@/components/form/Select";
import { GeneralModal } from "@/components/modal";
import Button from "@/components/ui/button/Button";
import {
  EProjectStatus,
  EProjectType,
  IProject,
  ModalKeys,
  projectDefault
} from "@/core/domain";
import {
  closeModal
} from "@/core/services";
import {
  createProject,
  deleteProject,
  editProject,
  removeSelectedProject,
} from "@/core/services/projectServices";
import { useAppStore } from "@/core/stores/appStore";
import { camelToReadable, getTypedFormData } from "@/core/utils";
import { SelectClient } from "@/pages/Project/Components/SelectClient";
import { FormEvent, useCallback } from "react";

interface AddOrEditProjectModalProps {
  type: string;
}

export const AddOrEditProjectModal = ({ type }: AddOrEditProjectModalProps) => {
  const { selectedProject } = useAppStore();
  const isAdd = type === ModalKeys.ADD_PROJECT;
  const wordingTitle = isAdd ? "Add" : "Edit";
  const wordingButtonSubmit = isAdd ? "Add Project" : "Save Changes";
  const excludeFields = ["isActive", "createdAt", "createdBy", "id"];

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const data = new FormData(e.currentTarget ?? undefined);
      console.log(data.get("id"));
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
            label: camelToReadable(key),
            render: <SelectClient defaultValue={selectedProject?.clientId}/>,
          };
          
        default:
          return {
            key: key,
            label: camelToReadable(key),
            type: typeof value,
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
          Are you sure want to delete project {selectedProject?.clientId}
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
