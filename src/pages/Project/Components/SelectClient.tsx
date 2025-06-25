import Select, { SelectOption } from "@/components/form/Select";
import { PaginationKeys } from "@/core/domain";
import { useFetchDispatch } from "@/core/hooks/useFetchDispatch";
import { getClients } from "@/core/services";
import { useAppStore } from "@/core/stores/appStore";

interface ISelectClientProps {
  defaultValue?: string;
}

export const SelectClient = ({ defaultValue }: ISelectClientProps) => {
  const { clients, paginations } = useAppStore();

  useFetchDispatch(
    () => {
      const { perPage } = paginations[PaginationKeys.CLIENT] ?? { perPage: 0 };
      if (perPage >= 1000) return;
      getClients({ page: 1, perPage: 1000 });
    },
    [],
    { componentDidMounted: true }
  );

  const clientOptions = clients.map((e) => {
    return { label: e.name, value: e.id } as SelectOption;
  });

  return (
    <Select
      name="clientId"
      defaultValue={defaultValue}
      options={clientOptions}
      onChange={() => ""}
    />
  );
};
