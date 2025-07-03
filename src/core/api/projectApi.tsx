import { axiosApi } from "@/core/api";
import {
  ApiResponse,
  APP_PATH_API,
  IProject,
  PaginationRequest,
  PaginationResponse
} from "@/core/domain";

const PROJECT = `${APP_PATH_API}/project`;

export const getProjectsApi = async ({
  page,
  perPage,
}: PaginationRequest): Promise<PaginationResponse<IProject>> => {
  const result = await axiosApi.get(
    `${PROJECT}/list?page=${page}&per_page=${perPage}`
  );
  const response: ApiResponse<PaginationResponse<IProject>> = result.data;
  return response.data;
};


export const createProjectApi = async (project: IProject) => {
  const response = await axiosApi.post(`${PROJECT}/create`, project);
  return response.data as ApiResponse<unknown>;
};

export const editProjectApi = async (project: IProject) => {
  const response = await axiosApi.put(
    `${PROJECT}/edit/${project.id}`,
    project
  );
  return response.data as ApiResponse<unknown>;
};

export const deleteProjectsApi = async (id: string) => {
  const response = await axiosApi.delete(`${PROJECT}/delete/${id}`);
  return response.data as ApiResponse<unknown>;
};

export const changeActiveProjectsApi = async (id: string) => {
  const response = await axiosApi.put(`${PROJECT}/status/${id}`);
  return response.data as ApiResponse<unknown>;
};
