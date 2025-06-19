import { Loading } from "@/components/common/Loading";
import Switch from "@/components/form/switch/Switch";
import { ActionButton } from "@/components/ui/button/ActionButton";
import { Column, GenericTable } from "@/components/ui/table/GenericTable";
import { Pagination } from "@/components/ui/table/Pagination";
import {
  defaultUser,
  LoadingKeys,
  ModalKeys,
  PaginationKeys,
  User,
} from "@/core/domain";
import { useFetchDispatch } from "@/core/hooks/useFetchDispatch";
import {
  changeStatusAccount,
  getAccounts,
  openModal,
  selectAccount,
} from "@/core/services";
import { useAppStore } from "@/core/stores/appStore";
import { camelToReadable } from "@/core/utils";
import { useCallback, useMemo } from "react";
const excludeField = ["accountId", "createdAt", "roleId", "token"];

export default function TableAccounts() {
  const { accounts, isOpen } = useAppStore();
  const onDelete = useCallback((account: User) => {
    selectAccount(account);
    openModal(ModalKeys.DELETE_ACCOUNT);
  }, []);

  const columns: Column<User>[] = useMemo(() => {
    return Object.keys({
      ...defaultUser,
      ...{ actions: "" },
    })
      .filter((e) => !excludeField.includes(e))
      .map((key) => {
        switch (key) {
          case "actions":
            return {
              key,
              label: camelToReadable(key),
              render: (_: unknown, data: User) => (
                <ActionButton<User>
                  data={data}
                  onDelete={onDelete}
                  showDeleteButton
                  showUpdateButton
                />
              ),
            } as unknown as Column<User>;

          case "isActive":
            return {
              key,
              label: camelToReadable(key),
              render(value, account) {
                return (
                  <Switch
                    label=""
                    defaultChecked={value === 1}
                    onChange={() => changeStatusAccount(account.accountId)}
                  />
                );
              },
            };

          case "isSuperAdmin":
            return {
              key,
              label: camelToReadable(key),
              render(value) {
                return <p>{value === false ? "NO" : "YES"}</p>;
              },
            };
          default:
            return {
              key,
              label: camelToReadable(key),
              render: null,
            } as unknown as Column<User>;
        }
      });
  }, [onDelete]);

  useFetchDispatch(
    () => {
      getAccounts({ page: 1, perPage: 10 });
    },
    [],
    { componentDidMounted: true }
  );

  const onChange = (page: number, perPage: number) => {
    getAccounts({ page, perPage });
  };

  if (isOpen[LoadingKeys.LOADING_ACCOUNT]) {
    return <Loading />;
  }

  return (
    <div>
      <GenericTable<User> data={accounts} columns={columns} />
      <Pagination paginationKey={PaginationKeys.ACCOUNT} onChange={onChange} />
    </div>
  );
}
