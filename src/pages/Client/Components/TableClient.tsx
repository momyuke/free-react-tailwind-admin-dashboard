import { Loading } from "@/components/common/Loading";
import Switch from "@/components/form/switch/Switch";
import { Column, GenericTable } from "@/components/ui/table/GenericTable";
import { Pagination } from "@/components/ui/table/Pagination";
import { setStatusClientApi } from "@/core/api/clientApi";
import {
  Client,
  defaultClient,
  LoadingKeys,
  PaginationKeys,
} from "@/core/domain";
import { useFetchDispatch } from "@/core/hooks/useFetchDispatch";
import { getClients } from "@/core/services";
import { useAppStore } from "@/core/stores/appStore";
import { camelToReadable } from "@/core/utils";
import { ActionButton } from "@/pages/Client/Components/ActionButton";
import { useMemo } from "react";
const excludeField = ["id", "createdAt"];

export const TableClient = () => {
  const { clients, isOpen } = useAppStore();

  const onChangeStatus = (id: string) => {
    setStatusClientApi(id);
  };

  const columns: Column<Client>[] = useMemo(() => {
    return Object.keys({
      ...defaultClient,
      ...{ action: "" },
    })
      .filter((e) => !excludeField.includes(e))
      .map((key) => {
        switch (key) {
          case "action":
            return {
              key,
              label: camelToReadable(key),
              render: (_: unknown, data: Client) => (
                <ActionButton client={data} />
              ),
            } as unknown as Column<Client>;

          case "isActive":
            return {
              key,
              label: camelToReadable(key),
              render(value, client) {
                return (
                  <Switch
                    label=""
                    defaultChecked={value === 1}
                    onChange={() => onChangeStatus(client.id)}
                  />
                );
              },
            };

          default:
            return {
              key,
              label: camelToReadable(key),
              render: null,
            } as unknown as Column<Client>;
        }
      });
  }, []);

  useFetchDispatch(
    () => {
      getClients({ page: 1, perPage: 10 });
    },
    [],
    { componentDidMounted: true }
  );

  const onChange = (page: number, perPage: number) => {
    getClients({ page, perPage });
  };

  if (isOpen[LoadingKeys.LOADING_CLIENT]) {
    return <Loading />;
  }

  return (
    <div>
      <GenericTable<Client> data={clients} columns={columns} />
      <Pagination key={PaginationKeys.CLIENT} onChange={onChange} />
    </div>
  );
};
