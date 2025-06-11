import {
  createClientApi,
  deleteClientApi,
  editClientApi,
  getClientApi,
  setStatusClientApi,
} from "@/core/api/clientApi";
import {
  Client,
  GENERAL_ERROR_MESSAGE,
  LoadingKeys,
  ModalKeys,
  PaginationKeys,
  PaginationRequest,
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

export const getClients = async ({ page, perPage }: PaginationRequest) => {
  const { setState } = useAppStore;
  openModal(LoadingKeys.LOADING_CLIENT);
  try {
    const response = await getClientApi({ page, perPage });
    const pagination: SetPaginationProps = {
      key: PaginationKeys.CLIENT,
      perPage: perPage || 10,
      page,
      count: response.totalCount,
    };
    setPagination(pagination);
    setState(() => ({ clients: response.items }));
  } catch (e) {
    setMessage(ModalKeys.GENERAL_MESSAGE, GENERAL_ERROR_MESSAGE);
    openModal(ModalKeys.GENERAL_MESSAGE);
    console.info(e);
  } finally {
    closeModal(LoadingKeys.LOADING_CLIENT);
  }
};

const getClientWithPagination = () => {
  const { getState } = useAppStore;
  const { paginations } = getState();
  getClients(paginations[PaginationKeys.CLIENT]);
};

export const createClient = async (client: Client) => {
  openModal(LoadingKeys.LOADING_CUD_CLIENT);
  try {
    const response = await createClientApi(client);
    setMessage(
      ModalKeys.GENERAL_MESSAGE,
      response.message ?? "Success Add Client Data"
    );
    openModal(ModalKeys.GENERAL_MESSAGE);
    getClientWithPagination();
  } catch (e) {
    console.info(e);
    setMessage(ModalKeys.GENERAL_MESSAGE, GENERAL_ERROR_MESSAGE);
    openModal(ModalKeys.GENERAL_MESSAGE);
  } finally {
    closeModal(LoadingKeys.LOADING_CUD_CLIENT);
    closeModal(ModalKeys.ADD_CLIENT);
  }
};

export const editClient = async (client: Client) => {
  openModal(LoadingKeys.LOADING_CUD_CLIENT);
  try {
    const response = await editClientApi(client);
    setMessage(
      ModalKeys.GENERAL_MESSAGE,
      response.message ?? "Success Edit Client Data"
    );
    openModal(ModalKeys.GENERAL_MESSAGE);
    getClientWithPagination();
    removeSelectedClient();
  } catch (e) {
    console.info(e);
    setMessage(ModalKeys.GENERAL_MESSAGE, GENERAL_ERROR_MESSAGE);
    openModal(ModalKeys.GENERAL_MESSAGE);
  } finally {
    closeModal(LoadingKeys.LOADING_CUD_CLIENT);
    closeModal(ModalKeys.UPDATE_CLIENT);
  }
};

export const setStatusClient = async (id: string) => {
  setStatusClientApi(id);
};

export const deleteClient = async (id: string) => {
  openModal(LoadingKeys.LOADING_CUD_CLIENT);
  try {
    const response = await deleteClientApi(id);
    setMessage(
      ModalKeys.GENERAL_MESSAGE,
      response.message ?? "Success Delete Client Data"
    );
    openModal(ModalKeys.GENERAL_MESSAGE);
    getClientWithPagination();
    removeSelectedClient();
  } catch (e) {
    console.info(e);
    setMessage(ModalKeys.GENERAL_MESSAGE, GENERAL_ERROR_MESSAGE);
    openModal(ModalKeys.GENERAL_MESSAGE);
  } finally {
    closeModal(LoadingKeys.LOADING_CUD_CLIENT);
    closeModal(ModalKeys.DELETE_CLIENT);
  }
};

export const selectClient = (client?: Client) => {
  const { setState } = useAppStore;
  setState(() => ({ selectedClient: client }));
};

export const removeSelectedClient = () => {
  const { setState } = useAppStore;
  setState(() => ({ selectedClient: undefined }));
};
