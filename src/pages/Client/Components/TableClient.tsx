import { Loading } from "@/components/common/Loading";
import { GenericTable } from "@/components/ui/table/GenericTable";
import { Client, LoadingKeys } from "@/core/domain";
import { useFetchDispatch } from "@/core/hooks/useFetchDispatch";
import { getClients } from "@/core/services";
import { useAppStore } from "@/core/stores/appStore";

export const TableClient = () => {
  const { clients, isOpen } = useAppStore();

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

  return <GenericTable<Client> data={clients} />;
};
