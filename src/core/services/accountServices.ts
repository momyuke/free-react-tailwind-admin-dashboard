import { deleteAccountApi, getAccountsApi } from "@/core/api/accountApi";
import {
  GENERAL_ERROR_MESSAGE,
  LoadingKeys,
  ModalKeys,
  PaginationKeys,
  PaginationRequest,
  User,
} from "@/core/domain";
import {
  closeModal,
  openModal,
  setMessage,
} from "@/core/services/modalServices";
import {
  setPagination,
  SetPaginationProps,
} from "@/core/services/paginationServices";
import { useAppStore } from "@/core/stores/appStore";

export const getAccounts = async ({ page, perPage }: PaginationRequest) => {
  const { setState } = useAppStore;
  openModal(LoadingKeys.LOADING_ACCOUNT);
  const response = await getAccountsApi({ page, perPage });
  const pagination: SetPaginationProps = {
    key: PaginationKeys.ACCOUNT,
    perPage: perPage || 10,
    page,
    count: response.totalCount,
  };
  setPagination(pagination);
  setState(() => ({ accounts: response.items }));
  closeModal(LoadingKeys.LOADING_ACCOUNT);
};

const getClientWithPagination = () => {
  const { getState } = useAppStore;
  const { paginations } = getState();
  getAccounts(paginations[PaginationKeys.ACCOUNT]);
};

export const removeSelectedAccount = () => {
  const { setState } = useAppStore;
  setState(() => ({ selectedAccount: undefined }));
};

export const selectAccount = (account?: User) => {
  const { setState } = useAppStore;
  setState(() => ({ selectedAccount: account }));
};

export const deleteAccount = async (id: string) => {
  openModal(LoadingKeys.LOADING_CUD_ACCOUNT);
  try {
    const response = await deleteAccountApi(id);
    setMessage(
      ModalKeys.GENERAL_MESSAGE,
      response.message ?? "Success Delete Account Data"
    );
    openModal(ModalKeys.GENERAL_MESSAGE);
    getClientWithPagination();
    removeSelectedAccount();
  } catch (e) {
    console.info(e);
    setMessage(ModalKeys.GENERAL_MESSAGE, GENERAL_ERROR_MESSAGE);
    openModal(ModalKeys.GENERAL_MESSAGE);
  } finally {
    closeModal(LoadingKeys.LOADING_CUD_ACCOUNT);
    closeModal(ModalKeys.DELETE_ACCOUNT);
  }
};
