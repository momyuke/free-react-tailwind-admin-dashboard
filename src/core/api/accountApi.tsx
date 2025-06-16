import { axiosApi } from "@/core/api";
import {
  ApiResponse,
  APP_PATH_API,
  PaginationRequest,
  PaginationResponse,
  User,
} from "@/core/domain";

const ACCOUNT = `${APP_PATH_API}/account`;

export const getAccountsApi = async ({
  page,
  perPage,
}: PaginationRequest): Promise<PaginationResponse<User>> => {
  const result = await axiosApi.get(
    `${ACCOUNT}/list?page=${page}&limit=${perPage}`
  );
  const response: ApiResponse<PaginationResponse<User>> = result.data;
  return response.data;
};

export const deleteAccountApi = async (id: string) => {
  const response = await axiosApi.delete(`${ACCOUNT}/delete/${id}`);
  return response.data as ApiResponse<unknown>;
};

export const changeStatusAccountApi = async (id: string) => {
  const response = await axiosApi.put(`${ACCOUNT}/status/${id}`);
  return response.data as ApiResponse<unknown>;
};
