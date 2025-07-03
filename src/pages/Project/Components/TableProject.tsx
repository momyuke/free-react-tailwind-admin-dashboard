import { Loading } from "@/components/common/Loading";
import Switch from "@/components/form/switch/Switch";
import { ActionButton } from "@/components/ui/button/ActionButton";
import { Column, GenericTable } from "@/components/ui/table/GenericTable";
import { Pagination } from "@/components/ui/table/Pagination";
import {
  EProjectStatus,
  IProject,
  LoadingKeys,
  ModalKeys,
  PaginationKeys,
  projectDefault,
} from "@/core/domain";
import { useFetchDispatch } from "@/core/hooks/useFetchDispatch";
import { openModal } from "@/core/services";
import {
  getProjects,
  selectProject,
  setStatusActiveProject,
} from "@/core/services/projectServices";
import { useAppStore } from "@/core/stores/appStore";
import { camelToReadable } from "@/core/utils";
import { useCallback, useMemo } from "react";
const excludeField = ["id", "createdAt", "clientId"];

export const TableProject = () => {
  const { projects, isOpen } = useAppStore();

  const onDelete = useCallback((project: IProject) => {
    selectProject(project);
    openModal(ModalKeys.DELETE_PROJECT);
  }, []);

  const onUpdate = useCallback((project: IProject) => {
    selectProject(project);
    openModal(ModalKeys.UPDATE_PROJECT);
  }, []);

  const onChangeStatus = (id: string) => {
    setStatusActiveProject(id);
  };

  const columns: Column<IProject>[] = useMemo(() => {
    return Object.keys({
      ...projectDefault,
      ...{ invoice: "" },
      ...{ action: "" },
    })
      .filter((e) => !excludeField.includes(e))
      .map((key) => {
        switch (key) {
          case "action":
            return {
              key,
              label: camelToReadable(key),
              render: (_: unknown, data: IProject) => (
                <ActionButton<IProject>
                  data={data}
                  showDeleteButton
                  showUpdateButton
                  onDelete={onDelete}
                  onUpdate={onUpdate}
                />
              ),
            } as unknown as Column<IProject>;

          case "invoice":
            return {
              key,
              label: camelToReadable(key),
              render: (_: unknown, data: IProject) => {
                const isInvoice = data.status === EProjectStatus.INVOICING;
                return (
                  <ActionButton<IProject>
                    data={data}
                    showUpdateButton
                    onUpdate={onUpdate}
                    disabledUpdateButton={!isInvoice}
                    updateWordingButton="Create Invoice"
                  />
                );
              },
            } as unknown as Column<IProject>;

          case "isActive":
            return {
              key,
              label: camelToReadable(key),
              render(value, project) {
                return (
                  <Switch
                    label=""
                    defaultChecked={value === 1}
                    onChange={() => onChangeStatus(project.id)}
                  />
                );
              },
            };

          default:
            return {
              key,
              label: camelToReadable(key),
              render: null,
            } as unknown as Column<IProject>;
        }
      });
  }, [onDelete, onUpdate]);

  useFetchDispatch(
    () => {
      getProjects({ page: 1, perPage: 10 });
    },
    [],
    { componentDidMounted: true }
  );

  const onChange = (page: number, perPage: number) => {
    getProjects({ page, perPage });
  };

  if (isOpen[LoadingKeys.LOADING_PROJECT]) {
    return <Loading />;
  }

  return (
    <div>
      <GenericTable<IProject> data={projects} columns={columns} />
      <Pagination paginationKey={PaginationKeys.PROJECT} onChange={onChange} />
    </div>
  );
};
