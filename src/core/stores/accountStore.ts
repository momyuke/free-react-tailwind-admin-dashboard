import { AccountStoreState } from "@/core/domain/storeDomain";

export const createAccountStore = (): AccountStoreState => {
  return {
    accounts: [],
    selectedAccount: undefined,
  };
};
