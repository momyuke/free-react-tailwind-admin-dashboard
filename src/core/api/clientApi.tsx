import { axiosApi } from "@/core/api";
import {
  ApiResponse,
  Client,
  CLIENT_PATH_API,
  PaginationRequest,
  PaginationResponse,
} from "@/core/domain";

export const getClientApi = async ({
  page = 1,
  perPage = 10,
}: PaginationRequest): Promise<PaginationResponse<Client>> => {
  const result = await axiosApi.get(
    `${CLIENT_PATH_API}/list?page=${page}&limit=${perPage}`
  );
  const response: ApiResponse<PaginationResponse<Client>> =
    result.data as ApiResponse<PaginationResponse<Client>>;
  return response.data;
};

export const createClientApi = async (client: Client) => {
  const response = await axiosApi.post(`${CLIENT_PATH_API}/create`, client);
  return response.data as ApiResponse<unknown>;
};

export const editClientApi = async (client: Client) => {
  const response = await axiosApi.put(
    `${CLIENT_PATH_API}/edit/${client.id}`,
    client
  );
  return response.data as ApiResponse<unknown>;
};

export const deleteClientApi = async (id: string) => {
  const response = await axiosApi.delete(`${CLIENT_PATH_API}/delete/${id}`);
  return response.data as ApiResponse<unknown>;
};

export const setStatusClientApi = async (id: string) => {
  const response = await axiosApi.put(`${CLIENT_PATH_API}/status/${id}`);
  return response.data as ApiResponse<unknown>;
};
