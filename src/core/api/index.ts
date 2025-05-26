import { ApiResponse, GENERAL_ERROR_MESSAGE, ModalKeys } from "@/core/domain";
import { logout, openModal, setMessage } from "@/core/services";
import { convertKeys, getCookie, toCamelCase, toSnakeCase } from "@/core/utils";
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

export const axiosApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
});

const onErrorResponse = (err: unknown) => {
  const { response } = err as AxiosError;
  const data = response?.data as ApiResponse<unknown>;
  setMessage(ModalKeys.GENERAL_MESSAGE, data.message ?? GENERAL_ERROR_MESSAGE);
  openModal(ModalKeys.GENERAL_MESSAGE);
  if (response?.status === 401) {
    logout();
    window.location.href = "/";
  }
};

const onResponse = (respone: AxiosResponse<unknown, unknown>) => {
  const responseApi = JSON.parse(
    JSON.stringify(respone.data)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) as ApiResponse<any>;
  responseApi.data = convertKeys(responseApi.data, toCamelCase);
  respone.data = responseApi;
  return respone;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onRequest = (request: InternalAxiosRequestConfig<any>) => {
  const token = getCookie("token");
  request.headers.set("Authorization", "Bearer " + token);
  request.data = convertKeys(request.data, toSnakeCase);
  return request;
};

axiosApi.interceptors.response.use(onResponse, onErrorResponse);
axiosApi.interceptors.request.use(onRequest);
