import { getAccountsApi } from "@/core/api/accountApi";
import { User } from "@/core/domain";
import { useAppStore } from "@/core/stores/appStore";

export const getAccounts = async () => {
  const { setState } = useAppStore;
  const accounts: User[] = await getAccountsApi();
  setState(() => ({ accounts: accounts }));
};
