import { Loading } from "@/components/common/Loading";
import { Column, GenericTable } from "@/components/ui/table/GenericTable";
import { Client, LoadingKeys } from "@/core/domain";
import { useFetchDispatch } from "@/core/hooks/useFetchDispatch";
import { getClients } from "@/core/services";
import { useAppStore } from "@/core/stores/appStore";
import { camelToReadable } from "@/core/utils";
import { ActionButton } from "@/pages/Client/Components/ActionButton";
import { useMemo } from "react";

export const TableClient = () => {
  const { clients, isOpen } = useAppStore();

  const columns: Column<Client>[] = useMemo(() => {
    return Object.keys({
      ...(clients[0] as Client),
      ...{ action: "" },
    }).map((key) => {
      switch (key) {
        case "action":
          return {
            key,
            label: camelToReadable(key),
            render: (_: unknown, data: Client) => (
              <ActionButton client={data} />
            ),
          } as unknown as Column<Client>;

        default:
          return {
            key,
            label: camelToReadable(key),
            render: null,
          } as unknown as Column<Client>;
      }
    });
  }, [clients]);

  useFetchDispatch(
    () => {
      getClients();
    },
    [],
    { componentDidMounted: true }
  );
  if (isOpen[LoadingKeys.LOADING_CLIENT]) {
    return <Loading />;
  }

  return <GenericTable<Client> data={clients} columns={columns} />;
};
