import { axiosApi } from "@/core/api";
import {
  ApiResponse,
  APP_PATH_API,
  PaginationResponse,
  User,
} from "@/core/domain";

export const getAccountsApi = async (): Promise<User[]> => {
  const result = await axiosApi.get(`${APP_PATH_API}/account/list`);
  const response: ApiResponse<PaginationResponse<User>> =
    result.data as ApiResponse<PaginationResponse<User>>;
  return response.data.items;
};
