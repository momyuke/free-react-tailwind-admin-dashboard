import { GenericTable } from "@/components/ui/table/GenericTable";
import { User } from "@/core/domain";
import { useFetchDispatch } from "@/core/hooks/useFetchDispatch";
import { getAccounts } from "@/core/services";
import { useAppStore } from "@/core/stores/appStore";

export default function TableAccounts() {
  const { accounts } = useAppStore();

  useFetchDispatch(
    () => {
      getAccounts();
    },
    [],
    { componentDidMounted: true }
  );
  return <GenericTable<User> data={accounts} />;
}
