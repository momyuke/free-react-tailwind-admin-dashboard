import { createClientApi, getClientApi } from "@/core/api/clientApi";
import {
  Client,
  GENERAL_ERROR_MESSAGE,
  LoadingKeys,
  ModalKeys,
  PaginationKeys,
} from "@/core/domain";
import {
  closeAllModal,
  closeModal,
  openModal,
  setMessage,
} from "@/core/services/modalServices";
import {
  setPagination,
  SetPaginationProps,
} from "@/core/services/paginationServices";
import { useAppStore } from "@/core/stores/appStore";

export const getClients = async () => {
  const { setState } = useAppStore;
  openModal(LoadingKeys.LOADING_CLIENT);
  try {
    const response = await getClientApi();
    const pagination: SetPaginationProps = {
      key: PaginationKeys.CLIENT,
      perPage: response.perPage,
      page: response.page,
    };
    setPagination(pagination);
    setState(() => ({ clients: response.items }));
  } catch (e) {
    setMessage(ModalKeys.GENERAL_MESSAGE, GENERAL_ERROR_MESSAGE);
    openModal(ModalKeys.GENERAL_MESSAGE);
    console.log(e);
  } finally {
    closeModal(LoadingKeys.LOADING_CLIENT);
  }
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
    getClients();
  } catch (e) {
    console.log(e);
    setMessage(ModalKeys.GENERAL_MESSAGE, GENERAL_ERROR_MESSAGE);
    openModal(ModalKeys.GENERAL_MESSAGE);
  } finally {
    closeAllModal();
  }
};
